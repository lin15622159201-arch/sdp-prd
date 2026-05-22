import { TASK_TYPE } from './aigc-selection-list/constant';

/**
 * 获取参考图/灵感图 URL
 */
export const getRefImgUrl = (item: { origin?: string; inspirationImage: string; postureFissionRefImgUrl?: string; sourceImage?: string; refImgUrl?: string; }) => {
  // let url = item.inspirationImage;
  // if (item.origin === TASK_TYPE.PoseFission || item.origin === TASK_TYPE.styleGen || item.origin === TASK_TYPE.postureFission) {
  //   url = item.refImgUrl || item.postureFissionRefImgUrl || '';
  // } else if (item.origin === TASK_TYPE.PatternTryon) {
  //   url = item.sourceImage || '';
  // }
  // return url;
  let url = '';
  if (item.origin === TASK_TYPE.AIDesign) {
    url = item.inspirationImage;
  } else {
    url = item.refImgUrl || item.postureFissionRefImgUrl || '';
  }
  return url;
};
