import http from '@/core/http';
import { Method } from 'axios';
import { ElMessage } from 'element-plus';
import { SYSTEM_ENUM } from '@/core/http/env';

interface ExportByBlobParams {
  /**
   * 请求方式
   */
  method: Method;
  /**
   * 接口地址
   */
  url: string;
  /**
   * post接口参数
   */
  data?: any;
  /**
   * get接口参数
   */
  params?: any;
  /**
   * 导出的文件名称
   */
  filename?: string;

  server?: SYSTEM_ENUM;

  loading?: boolean;
}

// 不使用 withCredentials 域名
const notWithCredentials = [
  'img.baibu.la',
  'img.baibu.mobi',
  'img.ibaibu.com',
  'img.ibaibu.cn',
  'img.ibaibu.net',
  'oss.yunbanfang.cn',
];

export function exportByBlob(config: ExportByBlobParams) {
  let { filename } = config;
  const { url, loading = true } = config;

  return new Promise((resolve, reject) => {
    http
      .request({
        ...config,
        loading,
        responseType: 'blob',
        withCredentials: !notWithCredentials.some((str) => {
          return url.includes(str);
        }),
        headers: {
          // img加载过后，防止缓存影响产生跨域问题
          cache: 'no-store',
        },

        // eslint-disable-next-line consistent-return
      })
      .then((res) => {
        const response = res?.data;
        if (response.type === 'application/json') {
          const reader = new FileReader();
          reader.readAsText(response, 'utf-8');
          reader.onload = () => {
            let result: any = {};
            try {
              result = JSON.parse(reader.result as string);
            } catch (e) {
              console.log(e);
              result = response;
            }
            ElMessage.error((result && result.message) || '导出失败');
            reject(result);
          };
        } else {
          try {
            const { headers } = res; // 下载后文件名
            const contentDisposition = headers['content-disposition'];
            const fileName = contentDisposition?.split(';')[1]?.split('filename=')[1];
            const responseFilename = contentDisposition ? decodeURIComponent(fileName) : '';
            // 有传文件名称&不带后缀 使用服务端的文件拓展名
            if (filename && !filename.includes('.')) {
              const splitFileName = responseFilename?.split('.');
              const suffix = splitFileName[splitFileName.length - 1];
              filename += `.${suffix}`;
            } else if (!filename) {
              filename = responseFilename;
            }
          } catch (e) {
            // 默认名称
            console.log(e);
            if (!filename) {
              filename = 'download.xlsx';
            }
          }
          const blob = new Blob([res.data]);
          const downloadElement = document.createElement('a');
          const href = window.URL.createObjectURL(blob); // 创建下载的链接
          downloadElement.href = href;
          downloadElement.download = filename;
          document.body.appendChild(downloadElement);
          downloadElement.click(); // 点击下载
          document.body.removeChild(downloadElement); // 下载完成移除元素
          window.URL.revokeObjectURL(href);
          resolve(res);
        }
      })
      .catch((e: Error) => {
        console.log(e);
        reject(e);
      });
  });
}
