// import { handleDownLoadFile } from '@/core/utils/download';
// import { getImgName } from './image';
import {
  styleGenAbortApi,
  styleGenDeletedApi,
  styleGenRetryApi,
} from '../api';
import { ElMessage, ElMessageBox } from 'element-plus';
// import { imageDownloadLog } from '../../api/log';
// import { DOWNLOAD_TYPE_ENUM, DOWNLOAD_ACTION_ENUM } from '../../api/log/constant';
// import { IImageDownloadLogReq } from '../../api/log/types';

// type LogReq = Omit<IImageDownloadLogReq, 'downloadAction' | 'downloadType'>;

// export const handleCopyLog = async (req: LogReq) => {
//   await imageDownloadLog({
//     ...req,
//     downloadType: DOWNLOAD_TYPE_ENUM.DESIGN_MATERIAL,
//     downloadAction: DOWNLOAD_ACTION_ENUM.COPY,
//   });
// };

// export const handleDownloadLog = async (req: LogReq) => {
//   await imageDownloadLog({
//     ...req,
//     downloadType: DOWNLOAD_TYPE_ENUM.DESIGN_MATERIAL,
//     downloadAction: DOWNLOAD_ACTION_ENUM.DOWNLOAD,
//   });
// };

// export const handleDownload4KLog = async (req: LogReq) => {
//   await imageDownloadLog({
//     ...req,
//     downloadType: DOWNLOAD_TYPE_ENUM.DESIGN_MATERIAL,
//     downloadAction: DOWNLOAD_ACTION_ENUM.DOWNLOAD_4K,
//   });
// };

// export const handleDownloadImg = async (
//   url: string,
//   taskCode: string,
//   taskId: string,
//   pictureId: string,
// ) => {
//   await handleDownloadLog({
//     taskId,
//     taskCode,
//     imageList: [{
//       imageId: pictureId,
//       imageUrl: url,
//       imageName: getImgName(url),
//     }],
//   });
//   await handleDownLoadFile(url, getImgName(url));
// };

export const handleBatchAbort = async (taskIds: string[], cb?: Function) => {
  await ElMessageBox.confirm('确定要中止吗?', '提示', {
    type: 'warning'
  });
  await styleGenAbortApi(taskIds);
  ElMessage.success('中止成功');
  cb && cb();
};

export const handleBatchDelete = async (taskIds: string[], cb?: Function) => {
  await ElMessageBox.confirm('确定要删除吗?', '提示', {
    type: 'warning'
  });
  await styleGenDeletedApi(taskIds);
  ElMessage.success('删除成功');
  cb && cb();
};

export const handleBatchRetry = async (taskIds: string[], cb?: Function) => {
  await ElMessageBox.confirm('确定要重试吗?', '提示', {
    type: 'warning'
  });
  await styleGenRetryApi(taskIds);
  ElMessage.success('重试成功');
  cb && cb();
};

// export const taskDelete = async (taskCode: string, cb?: Function) => {
//   await ElMessageBox.confirm('确定删除吗？', '提示');
//   await smartDevelopStyleDeleted(taskCode);
//   ElMessage.success('删除成功');
//   cb && cb();
// };

// export const taskRetry = async (taskId: string, cb?: Function) => {
//   await smartDevelopStyleRetry(taskId);
//   ElMessage.success('重试成功');
//   cb && cb();
// };

// export const taskAbort = async (taskId: string, cb?: Function) => {
//   await ElMessageBox.confirm('确定中止吗？', '提示');
//   await smartDevelopStyleAbort(taskId);
//   ElMessage.success('中止成功');
//   cb && cb();
// };
