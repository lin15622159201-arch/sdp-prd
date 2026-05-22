import { isEmpty } from '@toy/utils';
import NP from 'number-precision';
import { computed, Ref } from 'vue';
import { IFormData } from './use-detail';
import {
  getMaterialWasteTotalAmount,
  getCraftWasteTotalAmount
} from './calc-amount';

export const useCalc = (formData: Ref<IFormData>, readOnly: Ref<boolean>) => {
  // 面料总价
  const materialWasteTotalAmount = computed(() => {
    if (formData.value?.materialList?.length) {
      return NP.round(formData.value.materialList.reduce((prev, cur) => {
        const totalAmount = getMaterialWasteTotalAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
    return '';
  });
  // 辅料总价
  const accessoriesWasteTotalAmount = computed(() => {
    if (formData.value?.accessoriesList?.length) {
      return NP.round(formData.value.accessoriesList.reduce((prev, cur) => {
        const totalAmount = getMaterialWasteTotalAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
    return '';
  });
  // 工艺总价
  const craftWasteTotalAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.craftDemandCost ?? '', 2);
    }
    if (formData.value?.craftDemandCostInfoList?.length) {
      return NP.round(formData.value.craftDemandCostInfoList.reduce((prev, cur) => {
        const totalAmount = getCraftWasteTotalAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
    return '';
  });
  // 加工总价
  const processTotalAmount = computed(() => {
    return NP.round(formData.value?.processCost ?? 0, 2);
  });
  // 其他总价
  const otherCostTotalAmount = computed(() => {
    return NP.round(formData.value?.otherCost ?? 0, 2);
  });
  // 利润=【面料费用汇总+辅料费用汇总+加工费用汇总】*毛利率
  const profitAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.profitCost ?? '', 2);
    }
    return NP.round(NP.times(
      NP.plus(
        materialWasteTotalAmount.value ?? 0,
        accessoriesWasteTotalAmount.value ?? 0,
        processTotalAmount.value ?? 0
      ),
      NP.divide(
        (formData.value.profit || 0),
        100,
      ),
    ), 2);
  });
  // 加成费：对厂不含税价 * 税点
  const bonusAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.taxationCost ?? '', 2);
    }
    return NP.round(NP.times(
      factoryTaxAmountTotal.value ?? 0, // 对厂不含税价
      NP.divide((formData.value.taxationRatio ?? 0), 100),
    ), 2);
  });
  // 对厂总成本 对厂总成本 = 面料费用汇总+辅料费用汇总+工艺费用汇总+加工费用汇总+其他费用汇总
  const factoryCostAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.pureTotalCost ?? '', 2);
    }
    return NP.round(NP.plus(
      materialWasteTotalAmount.value ?? 0,
      accessoriesWasteTotalAmount.value ?? 0,
      craftWasteTotalAmount.value ?? 0,
      processTotalAmount.value ?? 0,
      otherCostTotalAmount.value ?? 0,
    ), 2);
  });
  // （没有四舍五入的）对厂不含税价：【面料费用汇总+辅料费用汇总+加工费用汇总】*【1+毛利率】+工艺费用汇总+其他费用汇总
  const factoryTaxAmountTotal = computed(() => {
    return NP.plus(
      NP.times(
        NP.plus(
          materialWasteTotalAmount.value ?? 0, // 面料费用汇总
          accessoriesWasteTotalAmount.value ?? 0, // 辅料费用汇总
          processTotalAmount.value ?? 0, // 加工费用汇总
        ),
        NP.plus(
          1,
          NP.divide((formData.value.profit ?? 0), 100),
        ),
      ),
      // processTotalAmount.value ?? 0, // 加工费用汇总
      craftWasteTotalAmount.value ?? 0, // 工艺费用汇总
      otherCostTotalAmount.value ?? 0, // 其他费用汇总
    );
  });
  // 对厂不含税价 =【面料费用汇总+辅料费用汇总+加工费用汇总】*【1+毛利率】+工艺费用汇总+其他费用汇总
  const factoryNoTaxAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.totalCost ?? '', 2);
    }
    return NP.round(factoryTaxAmountTotal.value, 2);
  });
  // 对厂含税价 =【【面料费用汇总+辅料费用汇总+加工费用汇总】*【1+毛利率】+工艺费用汇总+其他费用汇总】*【1+加成点】
  const factoryTaxAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.totalCostExt ?? '', 2);
    }
    return NP.round(NP.times(
      factoryTaxAmountTotal.value ?? 0,
      NP.plus(
        1,
        NP.divide((formData.value.taxationRatio || 0), 100),
      ),
    ), 2);
  });
  return {
    materialWasteTotalAmount,
    accessoriesWasteTotalAmount,
    craftWasteTotalAmount,
    processTotalAmount,
    otherCostTotalAmount,
    factoryCostAmount,
    factoryNoTaxAmount,
    factoryTaxAmount,
    profitAmount,
    bonusAmount,
  };
};
