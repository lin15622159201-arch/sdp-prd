import { IFileData } from '@/components/uploader/packages/types';
import { fgClipTask } from './api';
import { IFgClipTaskReqParamsItem } from './api/type';
import { getFileMd5 } from '../utils/file';

export const picGenerateTagTask = async (files: IFileData[]) => {
  const params: IFgClipTaskReqParamsItem[] = [];
  const promiseList: Promise<any>[] = [];
  files.forEach((item) => {
    promiseList.push(new Promise(async (resolve, reject) => {
      const md5Code = await getFileMd5(item.file!);
      params.push({
        md5Code, splitBasePicture: item.url
      });
      try {
        resolve('');
      } catch (error) {
        reject(error);
      }
    }));
  });
  await Promise.all(promiseList);
  const { data } = await fgClipTask({
    params,
  });
  return data;
};
