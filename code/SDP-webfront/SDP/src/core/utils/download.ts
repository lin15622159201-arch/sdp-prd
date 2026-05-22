import { ref } from 'vue';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { ElLoading } from 'element-plus';

export const download = (data: Blob | File, fileName: string) => {
  const url = URL.createObjectURL(data);
  const downloadEl = document.createElement('a');
  downloadEl.href = url;
  downloadEl.download = fileName;
  document.body.appendChild(downloadEl);
  downloadEl.click();
  document.body.removeChild(downloadEl);
};
const loading = ref<ReturnType<typeof ElLoading.service>>();
// 打包下载图片/pdf（两个以上才打包）
export interface IFileItem {
  url: string;
  name: string;
  // 是否需要转换成指定扩展
  convertTo?: 'txt';
  // 需要转换的内容
  content?: string;
}
const jsZip = new JSZip();
const fileNameMap = new Map();
// 防止出现文件名一致，丢失文件的情况
const getFileName = (name: string, type: string, map?: Map<string, boolean>) => {
  let fileName = `${name}.${type}`;
  let i = 1;
  while ((map || fileNameMap).has(fileName)) {
    fileName = `${name}(${i}).${type}`;
    i += 1;
  }
  return fileName;
};

/**
 * 将单个文件添加到文件夹中
 * @param file
 * @param folder
 * @returns
 */
export const packFileToFolder = (file: IFileItem, folder: JSZip, index?: number) => {
  const _fileNameMap = new Map();
  let { name } = file;
  name = name.split('.').at(0) || (`未命名${index ?? ''}`);
  // 支持将字符串转txt文件
  if (file.convertTo === 'txt' && file.content) {
    const fileName = getFileName(name, 'txt', _fileNameMap);
    return Promise.resolve(folder?.file(fileName, file.content));
  }
  let type = file.url?.split('.')?.at(-1)?.split('?')[0]!;
  if (type.includes('/')) {
    type = '';
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(file.url).then((res) => {
        res.blob().then((blob) => {
          const fileName = type ? getFileName(name, type, _fileNameMap) : name;
          _fileNameMap.set(fileName, true);
          resolve(folder?.file(fileName, blob, { binary: true }));
        });
      });
    } catch (e) {
      reject('下载错误');
    }
  });
};
/**
 * 将多个文件打包到文件夹中
 * @param fileList
 * @param folderName
 * @returns
 */
export const packFiles = (fileList: IFileItem[], folderName: string) => {
  const folder = jsZip.folder(folderName);
  const promise = [];
  for (let i = 0; i < fileList.length; i++) {
    const item = packFileToFolder(fileList[i], folder!, i);
    promise.push(item);
  }
  return promise;
};

/**
 * @description fileList 文件列表
 * @param fileList
 * @param name
 */
export const downLoadZip = async (fileList: IFileItem[], name: string = '附件') => {
  try {
    if (!fileList.length) return;

    loading.value = ElLoading.service({
      lock: true,
      text: '正在打包中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });

    await Promise.all(packFiles(fileList, name));

    jsZip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, `${name}.zip`);
      jsZip.remove(name);
      loading.value?.close();
    });
  } catch (e) {
    console.log('打包下载失败');
    loading.value?.close();
  }
};

export interface IPackFile extends IFileItem {
  children?: IPackFile[];
  name: string;
}
/**
 * 添加多个文件到文件夹中，支持文件夹嵌套
 * @param files
 * @param folder
 */
const packFilesToFolder = async (files: IPackFile[], folder: JSZip) => {
  const promises: Promise<any>[] = [];

  files.forEach((file, index) => {
    if (Array.isArray(file.children) && file.children.length) {
      const subFolder = folder.folder(file.name || `未命名${index}`);
      promises.push(packFilesToFolder(file.children, subFolder!));
    } else {
      const filePromise = packFileToFolder(file, folder, index);
      promises.push(filePromise);
    }
  });

  await Promise.all(promises);
};
/**
 * @description 批量打包多个文件，支持文件夹嵌套
 * @param fileList
 * @param name
 */
export const packFilesToZip = async (files: IPackFile[], name: string = '附件') => {
  if (!files.length) {
    throw new Error('打包文件为空');
  }

  loading.value = ElLoading.service({
    lock: true,
    text: '正在打包中...',
    background: 'rgba(0, 0, 0, 0.7)',
  });

  try {
    // 清除之前的文件名称缓存
    fileNameMap.clear();
    const rootFolder = jsZip.folder(name);
    await packFilesToFolder(files, rootFolder!);

    const content = await jsZip.generateAsync({ type: 'blob' });
    FileSaver.saveAs(content, `${name}.zip`);
    jsZip.remove(name);
  } catch (e) {
    console.error('打包下载失败', e);
  } finally {
    loading.value?.close();
  }
};

/**
 * url：可访问的文件地址
 */
export const handleDownLoadFile = (url: string, fileName: string) => {
  loading.value = ElLoading.service({
    lock: true,
    text: '正在下载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  });

  try {
    const length = url?.split('.').length;
    const type = url?.split('.')?.[length - 1];
    fetch(url).then((res) => {
      res.blob().then((blob) => {
        const downUrl = window.URL.createObjectURL(blob);
        const downloadElement = document.createElement('a');
        const name = fileName.split('.')[0];
        document.body.appendChild(downloadElement);
        downloadElement.href = downUrl;
        downloadElement.download = `${name}.${type}`;
        downloadElement.click();
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(downUrl);
        loading.value?.close();
      });
    });
  } catch (e) {
    console.log('下载错误');
  }
};

const downloadFile = async (url: string, name: string) => {
  const res = await fetch(url);
  const blob = await res.blob();

  const strList = url.split('.');
  const type = strList[strList.length - 1];

  const downUrl = window.URL.createObjectURL(blob);
  const downloadElement = document.createElement('a');
  document.body.appendChild(downloadElement);
  downloadElement.href = downUrl;
  downloadElement.download = `${name}.${type}`;
  downloadElement.click();
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(downUrl);
};

export const batchDownloadFile = async (files: { url: string; name: string; }[], showLoading = true) => {
  const batchSize = 10;
  const delay = 1000;

  if (showLoading) {
    loading.value = ElLoading.service({
      lock: true,
      text: '正在下载中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  }

  const result: { isSuccess: boolean; name: string; url: string; }[] = [];

  const downloadBatch = async (batch: { url: string; name: string; }[]) => {
    const promiseList = batch.map((file) => {
      return new Promise(async (resolve, reject) => {
        try {
          await downloadFile(file.url, file.name);
          resolve(null);
        } catch {
          reject('下载错误');
        }
      });
    });

    const batchResult = await Promise.allSettled(promiseList);
    batchResult.forEach((item, index) => {
      result.push({
        isSuccess: item.status === 'fulfilled',
        name: batch[index].name,
        url: batch[index].url,
      });
    });
  };

  const delayPromise = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });

  const processBatches = async (remainingFiles: { url: string; name: string; }[]) => {
    if (remainingFiles.length === 0) {
      return;
    }

    const batch = remainingFiles.slice(0, batchSize);
    const remaining = remainingFiles.slice(batchSize);

    await downloadBatch(batch);
    await delayPromise(delay);
    await processBatches(remaining);
  };

  await processBatches(files);

  if (showLoading) {
    loading.value?.close();
  }

  return result;
};
