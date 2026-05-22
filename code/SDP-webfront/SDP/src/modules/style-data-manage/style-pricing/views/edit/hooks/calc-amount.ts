import {
  ICheckPriceDetailResCraftDemandCostInfoListItem,
  ICheckPriceDetailResMaterialCostInfoListItem,
  ICheckPriceDetailResOtherCostInfoListItem,
  ICheckPriceDetailResProcessCostInfoListItem
} from '@/modules/style-data-manage/style-pricing/api/types';
import { isEmpty } from '@toy/utils';
import NP from 'number-precision';

/**
 * 面辅料损耗用量
 * 损耗用量=单件用量*(1+损耗率)
 */
export const getMaterialWasteAmount = (item: ICheckPriceDetailResMaterialCostInfoListItem) => {
  if (!isEmpty(item.dosageAccount) && !isEmpty(item.waste)) {
    return NP.round(NP.times(item.dosageAccount!, NP.plus(1, NP.divide(item.waste!, 100))), 2);
  }
  return '';
};

/**
 * 小单损耗用量
 * 小单损耗用量=单件用量*小单倍率
 */
export const getMaterialSmallWasteAmount = (item: ICheckPriceDetailResMaterialCostInfoListItem) => {
  if (!isEmpty(item.dosageAccount) && !isEmpty(item.smallOrderWaste)) {
    return NP.round(NP.times(item.dosageAccount!, NP.plus(1, NP.divide(item.smallOrderWaste!, 100))), 2);
  }
  return '';
};

/**
 * 散剪价
 * 大货进价 * 倍率
 */
export const getMaterialFragmentPrice = (item: ICheckPriceDetailResMaterialCostInfoListItem, ratio: string) => {
  if (!isEmpty(item.bulkPrice)) {
    return NP.round(NP.times(item.bulkPrice!, ratio), 2);
  }
  return '';
};

/**
 * 面料辅料计算金额
 * 金额=单件用量*确认价
 */
export const getMaterialTotalAmount = (item: ICheckPriceDetailResMaterialCostInfoListItem) => {
  if (!isEmpty(item.price) && !isEmpty(item.dosageAccount)) {
    return NP.round(NP.times(item.price!, item.dosageAccount!), 2);
  }
  return '';
};

/**
 * 面料辅料含损金额
 * 单件用量*（1+损耗）*确认价
 * tips: 不进行前置四舍五入，汇总才对总金额做处理
 */
export const getMaterialWasteTotalAmount = (item: ICheckPriceDetailResMaterialCostInfoListItem) => {
  if (!isEmpty(item.price) && !isEmpty(item.waste) && !isEmpty(item.dosageAccount)) {
    return NP.times(
      item.dosageAccount!,
      NP.plus(1, NP.divide(item.waste!, 100)),
      item.price! // 确认价
    );
  }
  return '';
};
/**
 * 小单含损金额
 * 小单含损金额=单件用量*（1+小单损耗）*大货进价*倍率
 * tips: 不进行前置四舍五入，汇总才对总金额做处理
 */
export const getMaterialSmallWasteTotalAmount = (item: ICheckPriceDetailResMaterialCostInfoListItem, ratio: string) => {
  if (!isEmpty(item.smallOrderWaste) && !isEmpty(item.dosageAccount) && !isEmpty(item.bulkPrice) && !isEmpty(ratio)) {
    return NP.times(
      item.dosageAccount!,
      NP.plus(1, NP.divide(item.smallOrderWaste!, 100)),
      item.bulkPrice!,
      ratio
    );
  }
  return '';
};

// 工艺损耗用量 含损用量=单件用量*（1+损耗率）
export const getCraftWasteAmount = (item: ICheckPriceDetailResCraftDemandCostInfoListItem) => {
  if (!isEmpty(item.craftDosageAccount) && !isEmpty(item.waste)) {
    return NP.round(NP.times(item.craftDosageAccount!, NP.plus(1, NP.divide(item.waste!, 100))), 2);
  }
  return '';
};

// 工艺计算金额 金额=单件用量*大货进价
export const getCraftTotalAmount = (item: ICheckPriceDetailResCraftDemandCostInfoListItem) => {
  if (!isEmpty(item.samplePrice) && !isEmpty(item.craftDosageAccount)) {
    // 金额=单件用量*大货进价
    return NP.round(NP.times(item.craftDosageAccount!, item.samplePrice!), 2);
  }

  return '';
};

/**
 * 工艺计算金额 含损金额=单件用量*（1+损耗）*确认价
 * tips: 不进行前置四舍五入，汇总才对总金额做处理
 */
export const getCraftWasteTotalAmount = (item: ICheckPriceDetailResCraftDemandCostInfoListItem) => {
  if (!isEmpty(item.samplePrice) && !isEmpty(item.waste) && !isEmpty(item.craftDosageAccount)) {
    return NP.times(
      item.craftDosageAccount!,
      NP.plus(1, NP.divide(item.waste!, 100)),
      item.samplePrice! // 确认价
    );
  }
  return '';
};

/**
 * 物流其他费用
 * tips: 不进行前置四舍五入，汇总才对总金额做处理
 */
export const getOtherCostAmount = (item: ICheckPriceDetailResOtherCostInfoListItem) => {
  if (!isEmpty(item.price) && !isEmpty(item.num)) {
    return NP.times(item.price!, item.num!);
  }
  return '';
};

/**
 * 加工费用 金额计算
 *  (车缝）金额 = 工时（分）*分钟工资
 * （裁剪、后道、专机/手工）金额 = 单价
 * tips: 不进行前置四舍五入，汇总才对总金额做处理
 */
export const getProcessAmount = (item: ICheckPriceDetailResProcessCostInfoListItem, isAllFlag: boolean = true) => {
  // 2 表示车缝
  if (item.processStepCode === '02') {
    if (!isEmpty(item.workingHour) && !isEmpty(item.minutelyPay)) {
      return NP.times(item.workingHour, item.minutelyPay!);
    }
    return '';
  }
  // 是否计算全部
  if (isAllFlag) {
    return isEmpty(item.price) ? '' : Number(item.price);
  }
  return '';
};

/**
 * 加工费用 金额计算
 *  工时（分)= (车缝）金额 / 分钟工资
 */
export const getProcessAmountItem = (item: ICheckPriceDetailResProcessCostInfoListItem) => {
  let value: number | string = '';
  let prop = '';
  // 若工时有值，分钟没值，则动态调整分钟
  if (!isEmpty(item.amount) && !isEmpty(item.workingHour) && isEmpty(item.minutelyPay)) {
    value = NP.divide(item.amount!, item.workingHour);
    prop = 'minutelyPay';
  } else if (!isEmpty(item.amount) && !isEmpty(item.minutelyPay) && isEmpty(item.workingHour)) {
    // 若分钟有值，工时没值，则动态调整工时
    value = NP.divide(item.amount!, item.minutelyPay);
    prop = 'workingHour';
  } else if (!isEmpty(item.amount) && !isEmpty(item.workingHour) && !isEmpty(item.minutelyPay)) {
    // 若两个值都有值，则动态调整工时
    value = NP.divide(item.amount!, item.minutelyPay);
    prop = 'workingHour';
  }
  return {
    prop,
    value
  };
};
