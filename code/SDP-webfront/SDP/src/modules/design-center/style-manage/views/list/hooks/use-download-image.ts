import { ElLoading } from 'element-plus';
import { IListItem } from '../types';
import { ref } from 'vue';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import Dayjs from 'dayjs';
import { bomMaterialPicture } from '../../../api';

type IFileItem = {
  spuCode: string;
  children: {
    /**
     * skc图片：包括：设计图：designPicture，AIGC图：demandDesignInfo.inspirationImageList
     * 二次工艺图片：developBomInfo.craftPictureList，辅料图：accessoriesPictureList
     */
    files: {
      name: string;
      url: string;
    }[];
  }[];
};

const getMaterialFiles = async (data: IListItem[]) => {
  try {
    const designCodeList = data.map(it => it.designCode!);
    const { data: resData } = await bomMaterialPicture({ designCodeList });
    resData.forEach((v) => {
      const item = data.find(it => it.designCode === v.designCode);
      if (item) {
        item.accessoriesPictureList = v.accessoriesPictureList;
      }
    });
  } catch (error) {
    console.error('获取物料图片失败', error);
    data.forEach((v) => {
      v.accessoriesPictureList = [];
    });
  }
};

/**
 * @description 下载图片处理
 * @returns 每个spu的所有图片都放在一个spu文件夹下
 */
export const useDownloadImage = () => {
  const loading = ref<ReturnType<typeof ElLoading.service>>();
  /** 打包数据 */
  const handlePackFiles = (
    skcItem: IFileItem['children'][0],
    jsZip: InstanceType<typeof JSZip>
  ) => {
    const promise = [];
    const fileNameMap = new Map();
    // 防止出现文件名一致，丢失文件的情况
    const getFileName = (name: string, type: string) => {
      let fileName = `${name}.${type}`;
      let i = 1;
      while (fileNameMap.has(fileName)) {
        fileName = `${name}(${i}).${type}`;
        i += 1;
      }
      return fileName;
    };
    const { files } = skcItem;
    for (let i = 0; i < files.length; i++) {
      const { url } = files[i];
      let { name } = files[i];
      name = name.split('.').at(0)!;
      const type = files[i].url?.split('.')?.at(-1)!;
      const item = new Promise((resolve, reject) => {
        fetch(url, {
          cache: 'no-cache'
        }).then((res) => {
          res.blob().then((blob) => {
            const fileName = getFileName(name, type);
            fileNameMap.set(fileName, true);
            resolve(jsZip.file(fileName, blob, { binary: true }));
          });
        }).catch((error) => {
          console.log('下载错误', url, error);
          resolve(true);
        });
      });
      promise.push(item);
    }
    return promise;
  };
  /** 打包数据并且下载 */
  const downloadFiles = async (files: IFileItem[]) => {
    return new Promise(async (resolve) => {
      try {
        const zipName = Dayjs().format('YYYY-MM-DD HH:mm:ss');
        const jsZip = new JSZip();
        // eslint-disable-next-line no-await-in-loop
        const arr: any[] = [];
        files.forEach((v) => {
          const cur = jsZip.folder(v.spuCode)!;
          v.children.forEach((it) => {
            arr.push(...handlePackFiles(it, cur));
          });
        });
        await Promise.all(arr);
        // eslint-disable-next-line no-await-in-loop
        const content = await jsZip.generateAsync({ type: 'blob' });
        FileSaver.saveAs(content, `${zipName}.zip`);
        files.forEach((v) => {
          jsZip.remove(v.spuCode);
        });
        resolve(true);
      } catch (e) {
        console.log('打包下载失败');
        loading.value?.close();
      }
    });
  };
  const handleDownloadImage = async (data: IListItem[]) => {
    // await getMaterialFiles(data); designPicture
    console.log('data==', data);
    const files: IFileItem[] = [];
    data.forEach((v: any) => {
      const materialInfo = v.materialInfo.filter((v0: { materialType: number; }) => v0.materialType === 0).map((v1: { materialUrl: string; }) => v1.materialUrl);
      let row = files.find(it => it.spuCode === v.designCode);
      if (!v.designPicture && !v.accessoriesPictureList?.length && !v.developBomInfo?.craftPictureList?.length
        && !v.demandDesignInfo?.inspirationImageList?.length && !materialInfo.length) return;
      if (!row) {
        row = {
          spuCode: v.designCode!,
          children: [],
        };
        files.push(row);
      }
      const designPictures = v.designPicture ? v.designPicture?.split(',') : [];
      // const materialInfo = v.materialInfo.filter((v0: { materialType: number; }) => v0.materialType === 0).map((v1: { materialUrl: string; }) => v1.materialUrl);
      const imgs = designPictures.concat(
        v.demandDesignInfo?.inspirationImageList || [],
        v.accessoriesPictureList || [],
        v.developBomInfo?.craftPictureList || [],
        materialInfo || [],
      ).map((it: any) => ({
        name: it.split('/').at(-1)!,
        url: it,
      })) || [];
      row.children.push({
        files: imgs,
      });
    });
    if (!files.length) return;
    loading.value = ElLoading.service({
      lock: true,
      text: '正在打包中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    console.log('files==', files);
    await downloadFiles(files);
    loading.value?.close();
  };
  return {
    handleDownloadImage,
  };
};
