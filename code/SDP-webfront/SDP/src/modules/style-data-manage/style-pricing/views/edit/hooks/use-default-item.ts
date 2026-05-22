/**
 * 表格默认值
 * @returns
 */
export const useDefaultItem = () => {
  // [工艺费用]表格默认值
  const processCostInfoItem = {
    processStepName: '',
    processStepCode: '',
    processName: '',
    perPieceAmount: '',
    price: '',
    workingHour: '',
    remarks: '',
    unit: '',
    sewingType: '',
    sewingTypeDesc: '',
    minutelyPay: '',
    processType: '',
    processTemplateId: '',
    processStyleTemplateId: '',
    styleName: '',
    processSewingInfos: [],
    smallOrderRate: '',
    orderSendingRate: '',
  };

  // [其他费用]表格默认值
  const otherCostInfoItem = {
    costName: '', // 费用名称
    supplierName: '', //
    phone: '',
    num: '', // 单件净用量
    price: '', // 金额
    unit: '', // 单位
    remarks: '',
    otherCostDescribe: '', // 描述
    smallOrderRate: '',
  };

  return {
    processCostInfoItem,
    otherCostInfoItem
  };
};
