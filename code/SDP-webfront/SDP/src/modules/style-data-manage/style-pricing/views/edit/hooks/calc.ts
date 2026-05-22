import { isEmpty } from '@toy/utils';
import NP from 'number-precision';
import { computed, Ref, ComputedRef } from 'vue';
import { IFormData } from './use-detail';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import {
  getMaterialWasteTotalAmount,
  getMaterialSmallWasteTotalAmount,
  getCraftWasteTotalAmount,
  getProcessAmount,
  getOtherCostAmount
} from '@/modules/style-data-manage/style-pricing/views/edit/hooks/calc-amount';

// 定义 stepCode 的类型为联合类型
type StepCode = '01' | '02' | '03' | '04' | '05';

export const useCalc = (
  formData: ComputedRef<IFormData>,
  materiaSmallOrderRate: Ref<string>,
  accessoriesSmallOrderRate: Ref<string>,
  readOnly: Ref<boolean>,
  processStepList?: Ref<IDictionaryItem[]>,
) => {
  // 面料总价
  const materialWasteTotalAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.fabricsCost ?? '', 2);
    }
    if (formData.value?.materialList?.length) {
      return NP.round(formData.value.materialList.reduce((prev, cur) => {
        const totalAmount = getMaterialWasteTotalAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
    return '';
  });
  // 面料小单总价
  const materialSmallWasteTotalAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.smallOrderFabricsCost ?? '', 2);
    }
    if (formData.value?.materialList?.length) {
      return NP.round(formData.value.materialList.reduce((prev, cur) => {
        const totalAmount = getMaterialSmallWasteTotalAmount(cur, materiaSmallOrderRate.value);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
    return '';
  });
  // 辅料总价
  const accessoriesWasteTotalAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.accessoriesCost ?? '', 2);
    }
    if (formData.value?.accessoriesList?.length) {
      return NP.round(formData.value.accessoriesList.reduce((prev, cur) => {
        const totalAmount = getMaterialWasteTotalAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
    return '';
  });
  // 辅料小单总价
  const accessoriesSmallWasteTotalAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.smallOrderAccessoriesCost ?? '', 2);
    }
    if (formData.value?.accessoriesList?.length) {
      return NP.round(formData.value.accessoriesList.reduce((prev, cur) => {
        const totalAmount = getMaterialSmallWasteTotalAmount(cur, accessoriesSmallOrderRate.value);
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
  // 小单工艺总价
  const smallOrderCraftDemandCost = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.smallOrderCraftDemandCost ?? '', 2);
    }
    if (formData.value?.craftDemandCostInfoList?.length) {
      return NP.round(formData.value.craftDemandCostInfoList.reduce((prev, cur) => {
        const totalAmount = getCraftWasteTotalAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
    return '';
  });
  /**
   * 加工费用列表
   */
  const processStepTotalAmountList = computed(() => {
    return (processStepList?.value || []).map((stepItem) => {
      const stepCode = stepItem.value as StepCode;
      // 处理只读模式
      if (readOnly.value) {
        const keyObj: { [key in StepCode]?: keyof IFormData } = {
          '01': 'cuttingCost',
          '02': 'sewingCost',
          '03': 'specialCost',
          '04': 'postProcessingCost',
        };

        const fieldKey = keyObj[stepCode]; // 获取字段
        const fieldValue = fieldKey ? formData.value[fieldKey] : null;

        if (!isEmpty(fieldValue) && !Number.isNaN(Number(fieldValue))) {
          return {
            title: `${stepItem.label}费用`,
            stepCode,
            amount: NP.round(Number(fieldValue), 2),
          };
        }
      }
      // 计算 stepList 总金额
      const stepList = (formData.value.processCostInfoList || []).filter(
        item => item.processStepCode === stepCode
      );
      let amount = stepList.reduce((prev, cur) => {
        const totalAmount = getProcessAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0);

      // 如果是车缝费用，* 发单倍率
      if (stepItem.value === '02') {
        amount = NP.times(amount, (formData.value.orderSendingRate ?? 0));
      }
      return {
        title: `${stepItem.label}费用`,
        stepCode,
        amount: NP.round(amount, 2),
      };
    });
  });
  // 加工总价
  const processTotalAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.processCost ?? '', 2);
    }
    if (processStepTotalAmountList.value?.length) {
      return NP.round(processStepTotalAmountList.value.reduce((prev, cur) => {
        const totalAmount = cur.amount;
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
    return '';
  });
  // 小单加工费用汇总=车缝费用*小单倍率
  const processSmallTotalAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.smallOrderProcessCost ?? '', 2);
    }
    if (formData.value?.processCostInfoList?.length) {
      const total = formData.value.processCostInfoList.reduce((prev, cur) => {
        const totalAmount = getProcessAmount(cur, false); // 只计算车缝汇总
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0);
      return NP.round(NP.times(total, (formData.value.orderSendingRate ?? 0), formData.value.smallOrderRate), 2);
    }
    return '';
  });
  // 其他小单总价
  const smallOrderOtherCost = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.smallOrderOtherCost ?? '', 2);
    }
    if (formData.value?.otherCostInfoList?.length) {
      return NP.round(formData.value.otherCostInfoList.reduce((prev, cur) => {
        const totalAmount = getOtherCostAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
    return '';
  });

  // 其他总价
  const otherCostTotalAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.otherCost ?? '', 2);
    }
    if (formData.value?.otherCostInfoList?.length) {
      return NP.round(formData.value.otherCostInfoList.reduce((prev, cur) => {
        const totalAmount = getOtherCostAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
    return '';
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
        processTotalAmount.value ?? 0,
      ),
      NP.divide(
        (formData.value.profit || 0),
        100,
      ),
    ), 2);
  });
  // 加成费
  const bonusAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.taxationCost ?? '', 2);
    }
    return NP.round(NP.times(
      factoryTaxAmountTotal.value ?? 0,
      NP.divide((formData.value.taxationRatio ?? 0), 100),
    ), 2);
  });
  // 对厂总成本 = 面料费用汇总+辅料费用汇总+工艺费用汇总+加工费用汇总+其他费用汇总
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
  // 对厂不含税价：【面料费用汇总+辅料费用汇总+加工费用汇总】*【1+毛利率】+工艺费用汇总+其他费用汇总
  const factoryNoTaxAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.totalCost ?? '', 2);
    }
    return NP.round(factoryTaxAmountTotal.value, 2);
  });
  // 对厂含税价：【【面料费用汇总+辅料费用汇总+加工费用汇总】*【1+毛利率】+工艺费用汇总+其他费用汇总】*【1+加成点】
  const factoryTaxAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.totalCostExt ?? '', 2);
    }
    return NP.round(NP.times(
      factoryTaxAmountTotal.value ?? 0,
      NP.plus(
        1,
        NP.divide((formData.value.taxationRatio ?? 0), 100),
      ),
    ), 2);
  });
  // 小单总成本
  const smallOrderCostAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.smallOrderPureTotalCost ?? '', 2);
    }
    return NP.round(NP.plus(
      materialSmallWasteTotalAmount.value ?? 0,
      accessoriesSmallWasteTotalAmount.value ?? 0,
      craftWasteTotalAmount.value ?? 0,
      processSmallTotalAmount.value ?? 0,
      otherCostTotalAmount.value ?? 0,
    ), 2);
  });
  // （没有四舍五入的）小单不含税价 【小单面料费用汇总+小单辅料费用汇总】*【1+毛利率】+小单工艺费用汇总+小单加工费用汇总+小单其他费用汇总
  const smallOrderNoTaxAmountTotal = computed(() => {
    return NP.plus(
      NP.times(
        NP.plus(
          materialSmallWasteTotalAmount.value ?? 0,
          accessoriesSmallWasteTotalAmount.value ?? 0,
        ),
        NP.plus(
          1,
          NP.divide((formData.value.profit ?? 0), 100),
        ),
      ),
      craftWasteTotalAmount.value ?? 0,
      processSmallTotalAmount.value ?? 0,
      otherCostTotalAmount.value ?? 0,
    );
  });
  // 小单不含税价 【小单面料费用汇总+小单辅料费用汇总】*【1+毛利率】+小单工艺费用汇总+小单加工费用汇总+小单其他费用汇总
  const smallOrderNoTaxAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.smallOrderTotalCost ?? '', 2);
    }
    return NP.round(smallOrderNoTaxAmountTotal.value, 2);
  });
  // 小单含税价【小单面料费用汇总+小单辅料费用汇总】*【1+毛利率】+小单工艺费用汇总+小单加工费用汇总+小单其他费用汇总】*【1+加成点】
  const smallOrderTaxAmount = computed(() => {
    if (readOnly.value) {
      return NP.round(formData.value.smallOrderTotalCostExt ?? '', 2);
    }
    return NP.round(NP.times(
      smallOrderNoTaxAmountTotal.value ?? 0,
      NP.plus(
        1,
        NP.divide((formData.value.taxationRatio ?? 0), 100),
      ),
    ), 2);
  });
  return {
    materialWasteTotalAmount,
    materialSmallWasteTotalAmount,
    accessoriesWasteTotalAmount,
    accessoriesSmallWasteTotalAmount,
    craftWasteTotalAmount,
    smallOrderCraftDemandCost,
    processTotalAmount,
    processSmallTotalAmount,
    processStepTotalAmountList,
    otherCostTotalAmount,
    smallOrderOtherCost,
    factoryCostAmount,
    factoryNoTaxAmount,
    factoryTaxAmount,
    profitAmount,
    bonusAmount,
    smallOrderCostAmount,
    smallOrderNoTaxAmount,
    smallOrderTaxAmount,
  };
};
