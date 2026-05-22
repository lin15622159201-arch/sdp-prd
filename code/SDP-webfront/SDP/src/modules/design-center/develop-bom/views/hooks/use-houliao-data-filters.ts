import {
  DEMAND_CATEGORY_2_ENUM,
} from '../../constant/index';

export const fabricColorNameFilter = (skuCombinationType: string, skuCombination: string) => {
  if (skuCombinationType === '0') {
    try {
      const skuCombinationObject = JSON.parse(skuCombination || '{}');
      return skuCombinationObject['色系'] || '';
    } catch (_) { console.error(_); return ''; }
  }
  return '';
};

export const fabricPictureFilter = (pictureList: any[]) => {
  if (!pictureList.length) return [];
  // 先找商品主图(pictureType === '1')，如果有则筛出
  // if (pictureList.some(item => item?.pictureType === '1')) {
  //   return pictureList.filter(item => item?.pictureType === '1').map(item2 => item2.pictureUrl || '');
  // }
  // 如果没有商品主图，则找sku主图(pictureType === '6')，如果有则筛出
  if (pictureList.some(item => item?.pictureType === '6')) {
    return pictureList.filter(item => item?.pictureType === '6').map(item2 => item2.pictureUrl || '');
  }
  // 如果没有sku主图，则找色卡图(pictureType === '3')，如果有则筛出
  if (pictureList.some(item => item?.pictureType === '3')) {
    return pictureList.filter(item => item?.pictureType === '3').map(item2 => item2.pictureUrl || '');
  }
  return [];
};

// 找到skuPriceVos数组下元素的salesRegionId === '1'(全国)所对应元素
export const fabricSkuPriceVosFilter = (skuPriceVos: any[]) => {
  if (!skuPriceVos.length) return {};
  return skuPriceVos.find(item => item.salesRegionId === '1') || {};
};

export const fabricCommodityTypeFilter = (categoryNo1: string) => {
  if (categoryNo1 === '1') {
    return DEMAND_CATEGORY_2_ENUM.PURE;
  }
  if (categoryNo1 === '2') {
    return DEMAND_CATEGORY_2_ENUM.FLOWER;
  }
  return '';
};
export const assistPictureFilter = (pictureList: any[]) => {
  if (!pictureList.length) return [];
  return pictureList.map(item => item.picturePath);
};
