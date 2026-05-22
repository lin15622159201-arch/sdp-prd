/** 坐标类型 */
export enum BOXES_TYPE_ENUM {
  /** 矩形 */
  RECT = 0,
  /** 多边形 */
  POLYGON = 1,
}

export const TOOLS_LIST = [
  { value: BOXES_TYPE_ENUM.RECT, icon: 'font_family icon-huajuxing', label: '矩形框选' },
  { value: BOXES_TYPE_ENUM.POLYGON, icon: 'font_family icon-huaduobianxing', label: '多边形框选' },
];
