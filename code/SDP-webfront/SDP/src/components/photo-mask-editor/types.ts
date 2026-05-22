import { fabric } from '@/fabric';

export type TGetCanvas = () => fabric.Canvas;

// 改款区域涂抹的提示文案
export interface IModifyTips {
  labelTips?: string[];
  descriptionTips?: string;
}
