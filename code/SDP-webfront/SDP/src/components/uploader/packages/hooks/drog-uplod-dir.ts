import { ElMessage } from 'element-plus';

/**
 * @description 判断当前浏览器是否支持拖放、文件夹上传
 *  * @returns {boolean} true - 支持拖放、文件夹上传
 *  * @returns {boolean} false - 不支持拖放、文件夹上传
 */
export const isSupportDragUploadDir = () => {
// 检查是否支持拖放功能
  const isDragAndDropSupported = 'draggable' in document.createElement('div');
  // 检查是否支持文件夹上传
  const isDirectoryUploadSupported = 'webkitdirectory' in document.createElement('input');
  // 只有当所有功能都支持时才返回 true
  return isDragAndDropSupported && isDirectoryUploadSupported;
};

/**
 * 判断当前选择的多个文件中是不是都不是文件夹
 * @param {FileList} files - 用户选择的文件列表
 * @returns {Promise<boolean>} - 返回一个Promise，true=都是文件，false=存在文件夹
 */
export const areAllFiles = (items: DataTransferItemList): Promise<boolean> => {
  return new Promise((resolve) => {
    const promises:Promise<boolean>[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const entry = item.webkitGetAsEntry();
      if (entry && entry.isDirectory) {
        promises.push(Promise.resolve(false));
      } else {
        promises.push(Promise.resolve(true));
      }
    }
    // 等待所有Promise完成
    Promise.all(promises).then((results) => {
      resolve(results.every(result => result));
    });
  });
};

/**
 * @description 判断文件夹列表是否都是空文件夹
 * @param res - 文件夹列表
 * @returns boolean - true=都是空文件夹，false=有非空文件夹， 默认有非空文件夹
 */
export const isAllDirectoryEmpty = (res: [string, File[]][]): boolean => {
  let isEmpty = true;
  for (let i = 0; i < res.length; i++) {
    const [dirName, files] = res[i];
    if (files.length > 0) {
      isEmpty = false;
      break;
    } else {
      console.warn(`${dirName} 是空文件夹！`);
    }
  }
  return isEmpty;
};

/**
 * @description 处理拖放文件夹事件，只处理文件夹下文件，不处理文件夹嵌套文件夹的情况
 * @param {DragEvent} event 拖放事件
 * @param {(files?: FileList | File[] | null, fileDirMap?: Map<File, string>) => void} callback 上传函数
 * @param {string} accept 接受的文件类型
 */
export const handleDropDirectories = async (
  e: DragEvent,
  callback: Function,
  beforeDirDropUpload?: Function,
  accept?: string,
) => {
  const { items } = e.dataTransfer!;
  const isAllFile = await areAllFiles(items);
  if (isAllFile) {
    ElMessage.warning('所选的文件中没有文件夹！');
    throw new Error('所选的文件中没有文件夹！');
  }
  console.log('items==', items, e.dataTransfer?.files);
  const arr: Promise<[string, File[]]>[] = [];
  const dirNameList: string[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const dirEntry = item.webkitGetAsEntry();
    console.log('dirEntry==', dirEntry);

    if (item.kind === 'file' && dirEntry && dirEntry.isDirectory) {
      dirNameList.push(dirEntry.name);
      // eslint-disable-next-line no-undef
      const reader = (dirEntry as FileSystemDirectoryEntry).createReader();
      arr.push(new Promise((resolve) => {
        reader.readEntries((entries) => {
          console.log('entries==', entries);
          Promise.all(
            entries
              .filter(entry => !entry.isDirectory
                && accept?.includes(entry.name.slice(entry.name.lastIndexOf('.') + 1).toLocaleLowerCase()))
              // eslint-disable-next-line no-undef
              .map(entry => new Promise<File>((r) => { (entry as FileSystemFileEntry).file(r); }))
          ).then((data) => {
            resolve([dirEntry.name, data]);
          });
        });
      }));
    } else {
      console.warn(`${dirEntry?.name} 不是文件夹！`);
    }
  }
  console.log('arr==', arr);
  Promise.all(arr).then(async (res) => {
    console.log('res==', res);
    if (isAllDirectoryEmpty(res)) {
      ElMessage.warning('所选的文件夹中没有文件！');
      throw new Error('所选的文件夹中没有文件！');
    }
    if (beforeDirDropUpload) {
      await beforeDirDropUpload(dirNameList);
    }
    const fileDirMap = new Map<File, string>();
    res.forEach((item) => {
      const [dir, files] = item;
      files.forEach((file) => {
        fileDirMap.set(file, dir);
      });
    });
    callback([...fileDirMap.keys()].flat(1), fileDirMap);
  });
};

/**
 * @description 递归读取文件夹下的所有文件
 * @param dirEntry 当前文件夹
 * @param accept 接受的文件类型
 * @returns Promise<[string, File[]]>
 */
const readDirectoryRecursively = (dirEntry: FileSystemDirectoryEntry, accept?: string): Promise<[string, File[]]> => {
  return new Promise((resolve, reject) => {
    const reader = dirEntry.createReader();
    const entries: FileSystemEntry[] = [];

    const readEntries = () => {
      reader.readEntries((newEntries) => {
        console.log('newEntries==', newEntries);
        if (newEntries.length === 0) {
          // No more entries, process them
          const filePromises: Promise<File>[] = [];
          const dirPromises: Promise<[string, File[]]>[] = [];

          entries.forEach((entry) => {
            if (entry.isDirectory) {
              dirPromises.push(readDirectoryRecursively(entry as FileSystemDirectoryEntry, accept));
            } else if (accept?.includes(entry.name.slice(entry.name.lastIndexOf('.') + 1).toLocaleLowerCase())) {
              filePromises.push(new Promise<File>((r) => { (entry as FileSystemFileEntry).file(r); }));
            }
          });

          Promise.all(filePromises).then((files) => {
            Promise.all(dirPromises).then((nestedResults) => {
              const allFiles = nestedResults.reduce((acc, [_, nestedFiles]) => acc.concat(nestedFiles), files);
              resolve([dirEntry.name, allFiles]);
            });
          }).catch(reject);
        } else {
          // Continue reading entries
          entries.push(...newEntries);
          // 读完了文件夹下的文件，在调用一次，则newEntries.length = 0
          readEntries();
        }
      }, reject);
    };

    readEntries();
  });
};
/**
 * @description 处理拖放文件夹事件，处理文件夹嵌套文件夹的情况
 * @param {DragEvent} event 拖放事件
 * @param {(files?: FileList | File[] | null, fileDirMap?: Map<File, string>) => void} callback 上传函数
 * @param {string} accept 接受的文件类型
 */
export const handleDropDirectories2 = async (
  e: DragEvent,
  callback: Function,
  beforeDirDropUpload?: Function,
  accept?: string,
) => {
  const { items } = e.dataTransfer!;
  const isAllFile = await areAllFiles(items);
  if (isAllFile) {
    ElMessage.warning('所选的文件中没有文件夹！');
    throw new Error('所选的文件中没有文件夹！');
  }
  console.log('items==', items, e.dataTransfer?.files);
  const arr: Promise<[string, File[]]>[] = [];
  const dirNameList: string[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const dirEntry = item.webkitGetAsEntry();
    console.log('dirEntry==', dirEntry);

    if (item.kind === 'file' && dirEntry && dirEntry.isDirectory) {
      dirNameList.push(dirEntry.name);
      arr.push(readDirectoryRecursively(dirEntry as FileSystemDirectoryEntry, accept));
    } else {
      console.warn(`${dirEntry?.name} 不是文件夹！`);
    }
  }
  console.log('arr==', arr);

  const res = await Promise.all(arr);
  console.log('res==', res);
  if (isAllDirectoryEmpty(res)) {
    ElMessage.warning('所选的文件夹中没有文件！');
    throw new Error('所选的文件夹中没有文件！');
  }
  if (beforeDirDropUpload) {
    await beforeDirDropUpload(dirNameList);
  }
  const fileDirMap = new Map<File, string>();
  res.forEach((item) => {
    const [dir, files] = item;
    files.forEach((file) => {
      fileDirMap.set(file, dir);
    });
  });
  callback([...fileDirMap.keys()].flat(1), fileDirMap);
};
