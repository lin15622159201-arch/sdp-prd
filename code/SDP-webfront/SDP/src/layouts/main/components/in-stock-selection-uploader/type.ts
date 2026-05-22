import { IMPORT_TYPE_ENUM } from '@/modules/selection-manage/in-stock-selection/constant';
import { BATCH_STATUS, UPLOAD_STATUS } from './constant';
import { COMPONENT_REGISTRY } from './registry';

export type IUploaderTask = {
  uploadId: string;
  batchId: string;
  file?: File;
  fileName: string;
  size: number;
  url: string;
  uploadStatus: UPLOAD_STATUS;
  batchStatus: BATCH_STATUS;
  progress: string;
  title: string;
  /**
   * 上传成功后业务组件的props
   */
  actionComponentProps?: Record<string, any>;
  /**
   * 上传成功后业务组件
   */
  actionComponent?: keyof typeof COMPONENT_REGISTRY;
  /**
   * 上传成功后回调, 缓存起来用于重试
   */
  onSuccess?: (res: OnSuccessRes) => Promise<{ id: string; }>;
  /**
   * 上传失败原因
   */
  message?: string;
  /**
   * 导入类型
   */
  importType?: IMPORT_TYPE_ENUM;
};

type OnSuccessRes = {
  /**
   * 文件名称
   */
  fileName: string;
  /**
   * 文件url
   */
  url: string;
  /**
   * 原文件
   */
  file: File;
  /**
   * 任务id
   */
  taskId: string;
};

export type IAddUploaderTaskPayload = {
  file: File;
  onSuccess?: (res: OnSuccessRes) => Promise<{ id: string; }>;
  onError?: (err: Error) => void;
  title?: string;
  actionComponent?: keyof typeof COMPONENT_REGISTRY;
};

export type IUpdateSuccessComponentPropsPayload = {
  taskId: string;
  props: Record<string, any>;
};
