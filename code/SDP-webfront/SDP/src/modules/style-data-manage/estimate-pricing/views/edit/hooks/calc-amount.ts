import {
  IEstimateCheckPriceDetailResMaterialCostInfoListItem,
  IEstimateCheckPriceDetailResCraftDemandCostInfoListItem,
} from '@/modules/style-data-manage/estimate-pricing/api/types';
import { isEmpty } from '@toy/utils';
import NP from 'number-precision';

/**
 * 面料辅料含损金额
 * 含损金额=预估用量*（1+预估损耗）*确认价
 * tips: 不进行前置四舍五入，汇总才对总金额做处理
 */
export const getMaterialWasteTotalAmount = (item: IEstimateCheckPriceDetailResMaterialCostInfoListItem) => {
  if (!isEmpty(item.price) && !isEmpty(item.waste) && !isEmpty(item.dosageAccount)) {
    return NP.times(
      item.dosageAccount!, // 预估用量
      NP.plus(1, NP.divide(item.waste!, 100)),
      item.price! // 大货进价
    );
  }
  return '';
};

/**
 * 工艺计算金额 含损金额=预估用量*（1+预估损耗）*确认价
 * tips: 不进行前置四舍五入，汇总才对总金额做处理
 */
export const getCraftWasteTotalAmount = (item: IEstimateCheckPriceDetailResCraftDemandCostInfoListItem) => {
  if (!isEmpty(item.samplePrice) && !isEmpty(item.waste) && !isEmpty(item.craftDosageAccount)) {
    return NP.times(
      item.craftDosageAccount!, // 含损用量
      NP.plus(1, NP.divide(item.waste!, 100)),
      item.samplePrice! // 大货进价
    );
  }
  return '';
};

/**
 * 面辅料损耗用量
 * 损耗用量=单件用量*(1+损耗率)
 * isDivide：是否针对损耗率进行除法计算，默认为true
 */
// eslint-disable-next-line vue/max-len
export const getMaterialWasteAmount = (item: IEstimateCheckPriceDetailResMaterialCostInfoListItem, isDivide: boolean = true) => {
  if (!isEmpty(item.dosageAccount) && !isEmpty(item.waste)) {
    const waste = isDivide ? NP.divide(item.waste!, 100) : item.waste;
    return NP.round(NP.times(item.dosageAccount!, NP.plus(1, waste!)), 2);
  }
  return '';
};

/**
 * 面料辅料计算金额
 * 金额=单件用量*大货进价
 */
export const getMaterialTotalAmount = (item: IEstimateCheckPriceDetailResMaterialCostInfoListItem) => {
  if (!isEmpty(item.price) && !isEmpty(item.dosageAccount)) {
    return NP.round(NP.times(item.price!, item.dosageAccount!), 2);
  }
  return '';
};

// 工艺损耗用量
export const getCraftWasteAmount = (item: IEstimateCheckPriceDetailResCraftDemandCostInfoListItem) => {
  if (!isEmpty(item.craftDosageAccount) && !isEmpty(item.waste)) {
    return NP.round(NP.times(item.craftDosageAccount!, NP.plus(1, NP.divide(item.waste!, 100))), 2);
  }
  return '';
};

// 工艺计算金额 金额=单件用量*大货进价
export const getCraftTotalAmount = (item: IEstimateCheckPriceDetailResCraftDemandCostInfoListItem) => {
  if (!isEmpty(item.samplePrice) && !isEmpty(item.craftDosageAccount)) {
    // 金额=单件用量*大货进价
    return NP.round(NP.times(item.craftDosageAccount!, item.samplePrice!), 2);
  }

  return '';
};

// 获取面料数据
export const getMaterialList = (materialCostInfoList: IEstimateCheckPriceDetailResMaterialCostInfoListItem[]) => {
  const materialList = materialCostInfoList
    .filter(item => item.bomMaterialType === '1')
    .map((v) => {
      const [,, category2] = v.categoryName?.split('[-]') || [];
      let defaultWaste = v.waste;
      if (isEmpty(v.waste)) {
        if (category2 === '针织') {
          defaultWaste = '10';
        } else if (category2 === '梭织') {
          defaultWaste = '8';
        } else if (category2 === '辅料' || category2 === '特殊辅料') {
          defaultWaste = '8';
        } else if (category2 === '二次工艺') {
          defaultWaste = '0';
        }
      } else {
        defaultWaste = `${NP.times(v.waste!, 100)}`;
      }
      return {
        ...v,
        waste: defaultWaste
      };
    });
  return materialList;
};

// 获取辅料数据
export const getAccessoriesList = (materialCostInfoList: IEstimateCheckPriceDetailResMaterialCostInfoListItem[]) => {
  const accessoriesList = materialCostInfoList
    .filter(item => ['2', '3', '4'].includes(item.bomMaterialType!))
    .map(v => ({
      ...v,
      waste: `${v.waste ? NP.times(v.waste, 100) : '5'}`
    }));
  return accessoriesList;
};
