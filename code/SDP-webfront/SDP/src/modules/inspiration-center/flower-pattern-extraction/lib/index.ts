import { ElMessage, ElMessageBox } from 'element-plus';
import { handleDownLoadFile } from '@/core/utils/download';
import { aigcTaskImgLog } from '../../api';
import { IMG_LOG_TYPE_ENUM, PLAN_ENUM } from '../../constant';
import { getImgName, getImgTaskName } from '../../utils/image';
import { floralPrintExtractionAbort, floralPrintExtractionDeleted, floralPrintExtractionRetry } from '../api';

/**
 * 中止花型提取任务
 *仅创建人可操作；仅【排队中/生成中】可操作
  * @param taskCode 任务编码
  */
export const abortFlowerPatternExtractionTask = async (taskCode: string) => {
  await ElMessageBox.confirm('是否中止任务？', '提示');
  await floralPrintExtractionAbort(taskCode);
  ElMessage.success('中止成功');
};
/**
 * 删除任务
 * 仅创建人可操作
 * @param taskCode 任务编码
 */
export const deleteFlowerPatternExtractionTask = async (taskCode: string) => {
  await ElMessageBox.confirm('是否删除任务？', '提示');
  await floralPrintExtractionDeleted(taskCode);
  ElMessage.success('删除成功');
};
/**
 * 重试任务
 *  仅创建人可操作；仅【已中止/生成失败】可操作
 * @param taskCode 任务编码
 */
export const repeatFlowerPatternExtractionTask = async (taskCode: string) => {
  await floralPrintExtractionRetry(taskCode);
  ElMessage.success('重试成功');
};

export type Task = { id: string; code: string; };

export const handleCopyLog = async (index: number, url: string, task: Task) => {
  await aigcTaskImgLog({
    aigcTaskId: task.id,
    taskId: task.id,
    taskCode: task.code,
    taskName: getImgTaskName(task.code, index),
    taskType: PLAN_ENUM.STYLE_DERIVATION,
    imgName: getImgName(url),
    imgUrl: url,
    type: IMG_LOG_TYPE_ENUM.COPY
  });
};

const handleDownloadLog = async (index: number, url: string, task: Task) => {
  await aigcTaskImgLog({
    aigcTaskId: task.id,
    taskId: task.id,
    taskCode: task.code,
    taskName: getImgTaskName(task.code, index),
    taskType: PLAN_ENUM.STYLE_DERIVATION,
    imgName: getImgName(url),
    imgUrl: url,
    type: IMG_LOG_TYPE_ENUM.DOWNLOAD
  });
};

export const handleDownloadImg = async (url: string, index: number, task: Task) => {
  handleDownloadLog(index, url, task);
  await handleDownLoadFile(url, getImgName(url));
};
