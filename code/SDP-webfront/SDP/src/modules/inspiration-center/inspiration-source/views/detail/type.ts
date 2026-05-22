import { TASK_STATUS_ENUM } from '@/modules/inspiration-center/inspiration-source/constant';

export interface ITableItem {
  /** 任务id */
  id: string;
  /** 供给方式 */
  supplyName: string;
  /** 任务编号 */
  taskCode: string;
  /** 提交人 */
  submitor: string;
  /** 提交时间 */
  submitedTime: string;
  /** 任务状态 */
  status: TASK_STATUS_ENUM;
  /** 波次 */
  waveBatchName: string;
  downstreamTaskId?: string;
  generationType?: string;
}
