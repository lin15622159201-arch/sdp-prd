export enum MAKE_CLOTHES_TYPE {
  /** 纸样 */
  PAPER = '0',
  /** 实物 */
  MATERIAL = '1',
  /** 3d样 */
  THREE = '2',
}

export const MAKE_CLOTHES_TYPE_LIST = [
  { value: MAKE_CLOTHES_TYPE.MATERIAL, label: '实物样' },
  { value: MAKE_CLOTHES_TYPE.PAPER, label: '仅纸样' },
  { value: MAKE_CLOTHES_TYPE.THREE, label: '3D样' },
];

export const MAKE_CLOTHES_TYPE_LIST2 = [
  { value: MAKE_CLOTHES_TYPE.MATERIAL, label: '实物样' },
  { value: MAKE_CLOTHES_TYPE.THREE, label: '3D样' },
];

export const MAKE_CLOTHES_TYPE_TAGS_LIST = [
  { value: MAKE_CLOTHES_TYPE.PAPER, label: '仅纸样' },
  { value: MAKE_CLOTHES_TYPE.THREE, label: '3D样' },
];

/**
 * 导出默认（数组） 组件使用
 */
export default {
  MAKE_CLOTHES_TYPE_LIST,
  MAKE_CLOTHES_TYPE_TAGS_LIST,
  MAKE_CLOTHES_TYPE_LIST2,
};
