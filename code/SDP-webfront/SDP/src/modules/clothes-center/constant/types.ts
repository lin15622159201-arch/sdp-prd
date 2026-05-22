import { IFile } from '@/components/upload/package/type';

export enum VALIDATE_STATUS {
  SILENCE = 'SILENCE', // 未被发起
  PENDING = 'PENDING', // 已被发起，但未有校验结果
  SUCCESS = 'SUCCESS', // 校验结果为成功
  FAIL = 'FAIL', // 校验结果为失败
}
export interface IFileExt extends IFile {
  id: string;
  validateStatus: VALIDATE_STATUS;
  angle: string; // 正面、侧面、背面、其他
  launchCount: number;
  failMsg: string; // 校验失败后的提示信息
}

/**
 * 当前耗时排序 ascending:升序,descending:降序
 */
export enum TIMECONSUMING_SORT_ENUM {
  /**
   * 升序
   */
  ASCENDING = 'ascending',
  /**
   * 降序
   */
  DESCENDING = 'descending'
}
