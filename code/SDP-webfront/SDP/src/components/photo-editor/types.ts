import { fabric } from 'fabric';

export type TGetCanvas = () => fabric.Canvas;

// 保存的数据类型
export interface ISaveData {
  maskURL?: string;
  originURL: string;
}

export enum EDITOR_TYPE {
  MASK = 'mask',
  ADVANCED = 'advanced',
}

export enum RETURN_TYPE {
  URL = 'url',
  BASE64 = 'base64',
}

export interface ISize {
  width: number;
  height: number;
  top: number;
  left: number;
}
