import { BOXES_TYPE_ENUM } from './constant';
import { fabric } from 'fabric';

export interface IData {
  /** 原图图片 */
  referencePicture: string;
  /** 坐标类型 0:矩形 1:多边形 */
  boxesType: BOXES_TYPE_ENUM;
  /** logo坐标 */
  boxesList?: {
    x: number;
    y: number;
  }[];
}

export interface FabricElType {
  value?: null | fabric.Canvas;
  id?: string;
}

export type PolygonPoints = Array<{ x: number; y: number; }>;
export type PolygonLines = Array<{
  start: { x: number; y: number; };
  end: { x: number; y: number; };
}>;
