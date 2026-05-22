import { fabric } from '@/fabric';

export type TGetCanvas = () => fabric.Canvas;

export enum DISPOSE_MASK_ENUM {
  'REMOVE' = 'REMOVE',
  'ADD' = 'ADD',
}
