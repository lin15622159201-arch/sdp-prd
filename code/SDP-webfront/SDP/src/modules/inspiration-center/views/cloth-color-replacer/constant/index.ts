/**
 * 换装区域枚举
 */
export enum REPLACE_REGION_ENUM {
  /** 上装 */
  TOP = 'top garment',
  /** 下装 */
  BOTTOM = 'bottom garment',
  /** 连体装 */
  ONE_PIECE = 'one-piece garment'
}
/**
 * 换装区域列表
 */
export const REPLACE_REGION_LIST = [
  { label: '上装', value: REPLACE_REGION_ENUM.TOP },
  { label: '下装', value: REPLACE_REGION_ENUM.BOTTOM },
  { label: '连体装', value: REPLACE_REGION_ENUM.ONE_PIECE }
];
