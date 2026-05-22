import { IMAGE_UPDATE_STATE_ENUM } from '../constant';

/**
 * 检查任务是否可以上传
 */
export const checkTaskCanUpload = (taskState: IMAGE_UPDATE_STATE_ENUM) => [IMAGE_UPDATE_STATE_ENUM.WAIT, IMAGE_UPDATE_STATE_ENUM.REPAIR].includes(taskState);
/**
 * 检查任务是否可以提交审核
 */
export const checkTaskCanAudit = (taskState: IMAGE_UPDATE_STATE_ENUM) => taskState === IMAGE_UPDATE_STATE_ENUM.AUDIT;
/**
 * 检查任务是否可以取消
 */
export const checkTaskCanCancel = (taskState: IMAGE_UPDATE_STATE_ENUM) => [IMAGE_UPDATE_STATE_ENUM.WAIT, IMAGE_UPDATE_STATE_ENUM.REPAIR, IMAGE_UPDATE_STATE_ENUM.AUDIT].includes(taskState);
