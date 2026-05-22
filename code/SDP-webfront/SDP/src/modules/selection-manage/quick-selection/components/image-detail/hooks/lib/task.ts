import { handleDownLoadFile } from '@/core/utils/download';
import { aigcTaskImgLog, addImgDownloadLogBatch } from './api';
import { IMG_LOG_TYPE_ENUM } from '../../../constant';
import { getImgName, getImgTaskName } from './image';
import {
  abortBatch,
  deletedBatch,
  retryBatch,
  smartDevelopStyleAbort,
  smartDevelopStyleDeleted,
  smartDevelopStyleRetry,
} from '../../../api';
import { ElMessage, ElMessageBox } from 'element-plus';

export const handleCopyLog = async (
  index: number,
  url: string,
  taskCode: string,
  taskId: string,
  aigcTaskId: string
) => {
  await aigcTaskImgLog({
    aigcTaskId,
    taskId,
    taskCode,
    taskName: getImgTaskName(taskCode, index),
    taskType: '2000',
    imgName: getImgName(url),
    imgUrl: url,
    type: IMG_LOG_TYPE_ENUM.COPY
  });
};

const handleDownloadLog = async (index: number, url: string, taskCode: string, taskId: string, aigcTaskId: string) => {
  await aigcTaskImgLog({
    aigcTaskId,
    taskId,
    taskCode,
    taskName: getImgTaskName(taskCode, index),
    taskType: '2000',
    imgName: getImgName(url),
    imgUrl: url,
    type: IMG_LOG_TYPE_ENUM.DOWNLOAD
  });
};

export type BatchReq = { index: number; url: string; taskCode: string; taskId: string; aigcTaskId: string; }[];

export const batchDownloadLog = async (
  req: BatchReq
) => {
  await addImgDownloadLogBatch(req.map(item => ({
    aigcTaskId: item.aigcTaskId,
    taskId: item.taskId,
    taskCode: item.taskCode,
    taskName: getImgTaskName(item.taskCode, item.index),
    taskType: '2000',
    imgName: getImgName(item.url),
    imgUrl: item.url,
    type: IMG_LOG_TYPE_ENUM.DOWNLOAD
  })));
};

export const batchCopyLog = async (
  req: BatchReq
) => {
  await addImgDownloadLogBatch(req.map(item => ({
    aigcTaskId: item.aigcTaskId,
    taskId: item.taskId,
    taskCode: item.taskCode,
    taskName: getImgTaskName(item.taskCode, item.index),
    taskType: '2000',
    imgName: getImgName(item.url),
    imgUrl: item.url,
    type: IMG_LOG_TYPE_ENUM.COPY
  })));
};

export const handleDownloadImg = async (
  url: string,
  index: number,
  taskCode: string,
  taskId: string,
  aigcTaskId: string
) => {
  await handleDownloadLog(index, url, taskCode, taskId, aigcTaskId);
  await handleDownLoadFile(url, getImgName(url));
};

export const handleBatchAbort = async (taskCodes: string[], cb?: Function) => {
  await ElMessageBox.confirm('确定要中止吗?', '提示', {
    type: 'warning'
  });
  await abortBatch({ taskCodes });
  ElMessage.success('中止成功');
  cb && cb();
};

export const handleBatchDelete = async (taskCodes: string[], cb?: Function) => {
  await ElMessageBox.confirm('确定要删除吗?', '提示', {
    type: 'warning'
  });
  await deletedBatch({ taskCodes });
  ElMessage.success('删除成功');
  cb && cb();
};

export const handleBatchRetry = async (taskCodes: string[], cb?: Function) => {
  await ElMessageBox.confirm('确定要重试吗?', '提示', {
    type: 'warning'
  });
  await retryBatch({ taskCodes });
  ElMessage.success('重试成功');
  cb && cb();
};

export const taskDelete = async (taskCode: string, cb?: Function) => {
  await ElMessageBox.confirm('确定删除吗？', '提示');
  await smartDevelopStyleDeleted(taskCode);
  ElMessage.success('删除成功');
  cb && cb();
};

export const taskRetry = async (taskCode: string, cb?: Function) => {
  await smartDevelopStyleRetry(taskCode);
  ElMessage.success('重试成功');
  cb && cb();
};

export const taskAbort = async (taskCode: string, cb?: Function) => {
  await ElMessageBox.confirm('确定中止吗？', '提示');
  await smartDevelopStyleAbort(taskCode);
  ElMessage.success('中止成功');
  cb && cb();
};
