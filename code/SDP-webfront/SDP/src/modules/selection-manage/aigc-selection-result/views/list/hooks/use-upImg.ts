import { ref } from 'vue';
import { ElLoading } from 'element-plus';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Dayjs from 'dayjs';


export const useUpImg = (imgsData: any, cd: Function) => {
  downloadImages(imgsData, cd);
};


// 生成格式化时间戳 (YYYYMMDD_HHmmss)
const getTimeStamp = () => {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    '_',
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join('');
};

// 下载单张图片
const fetchImage = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`下载失败: ${url}`);
  return response.blob();
};

// 获取文件扩展名
const getFileExtension = (url: any) => {
  return url.split('.').pop().split('?')[0] || 'png';
};

// 主下载压缩函数
const downloadImages = async (imageUrls: any, cd: Function) => {
  try {
    const zip = new JSZip();
    const timestamp = getTimeStamp();
    
    // 并行下载并添加所有图片
    await Promise.all(imageUrls.map(async (item: any) => {
      const blob = await fetchImage(item.url);
      const extension = getFileExtension(item.url);
      const filename = `${item.name}.${extension}`;
      zip.file(filename, blob);
    }));

    // 生成并保存ZIP文件
    const zipBlob = await zip.generateAsync({ 
      type: 'blob',
      // compression: 'DEFLATE',  // 使用压缩
      // compressionOptions: {
      //   level: 9              // 最大压缩率
      // }
    });
    
    saveAs(zipBlob, `选款结果_${timestamp}.zip`);
    cd && cd();
    console.log('压缩包创建成功！');
  } catch (error: any) {
    console.error('处理失败:', error);
    alert(`处理失败: ${error.message}`);
  }
};

