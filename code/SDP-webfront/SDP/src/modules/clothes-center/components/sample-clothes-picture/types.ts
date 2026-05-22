import { IFile } from '@/components/upload/package/type';

export enum PICTURE_ANGLE {
  FRONT = 'front',
  SIDE = 'side',
  BACK = 'back',
  OTHER = 'other',
  DETAIL = 'detail',
}
export const PICTURE_ANGLE_LIST = [
  { value: PICTURE_ANGLE.FRONT, label: '正面' },
  { value: PICTURE_ANGLE.SIDE, label: '侧面' },
  { value: PICTURE_ANGLE.BACK, label: '背面' },
  { value: PICTURE_ANGLE.OTHER, label: '其他' },
];
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
