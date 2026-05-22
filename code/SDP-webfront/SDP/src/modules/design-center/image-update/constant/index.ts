import { TagProps } from 'element-plus';

/**
 * 开款状态枚举
 */
export enum IMAGE_UPDATE_STATE_ENUM {
  /** 待处理 */
  WAIT = 0,
  /** 待审核 */
  AUDIT = 10,
  /** 已完成 */
  FINISH = 30,
  /** 待返修 */
  REPAIR = 20,
  /** 已取消 */
  CANCEL = 50,
  /** 未创建 */
  NOT_CREATED = 90,
}
/**
 * 开款状态列表
 */
export const IMAGE_UPDATE_STATE_LIST: { label: string; value: IMAGE_UPDATE_STATE_ENUM; type?: TagProps['type']; }[] = [
  { label: '未创建', value: IMAGE_UPDATE_STATE_ENUM.NOT_CREATED, type: 'info' },
  { label: '待处理', value: IMAGE_UPDATE_STATE_ENUM.WAIT, type: 'warning' },
  { label: '待审核', value: IMAGE_UPDATE_STATE_ENUM.AUDIT, type: 'warning' },
  { label: '已完成', value: IMAGE_UPDATE_STATE_ENUM.FINISH, type: 'success' },
  { label: '待返修', value: IMAGE_UPDATE_STATE_ENUM.REPAIR, type: 'danger' },
  { label: '已取消', value: IMAGE_UPDATE_STATE_ENUM.CANCEL, type: 'info' },
];

/**
 * 图片更新任务类型枚举
 */
export enum IMAGE_UPDATE_TASK_TYPE_ENUM {
  /** 图片 */
  IMAGE = 0,
  /** 视频 */
  VIDEO = 1,
}

/**
 * 图片更新任务类型列表
 */
export const IMAGE_UPDATE_TASK_TYPE_LIST = [
  { label: '图片', value: IMAGE_UPDATE_TASK_TYPE_ENUM.IMAGE },
  { label: '视频', value: IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO },
];

/**
 * 图片更新任务类型枚举
 */
export enum IMAGE_UPDATE_AUDIT_RESULT_ENUM {
  YES = 1,
  NO = 0,
}
