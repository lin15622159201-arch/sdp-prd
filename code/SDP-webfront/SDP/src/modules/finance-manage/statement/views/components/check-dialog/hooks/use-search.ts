import { IConfigItem } from '@toy/business-components';
import { computed, Ref } from 'vue';
import { IFinanceBillBillDetailByBillIdRes } from '../../../../api/types';
import { BILLTYPE_ENUM } from '@/modules/finance-manage/constant';
import { YES_NO_LIST } from '@/constant';

interface IPrams {
  detailBillInfo: Ref<IFinanceBillBillDetailByBillIdRes>;
}

export const useSearch = ({ detailBillInfo }: IPrams) => {
  const commonConfig = [
    {
      name: '设计师',
      component: 'input',
      valueName: 'designerName',
    },
    {
      name: 'SKC',
      component: 'input',
      valueName: 'skcCode',
    },
  ];
  const typeObj: any = {
    // 面料剪版
    [BILLTYPE_ENUM.FABRIC_CUTTING_ORDER]: [
      ...commonConfig,
      {
        name: '采购需求单号',
        component: 'input',
        valueName: 'purchaseOrderNo',
      },
      {
        name: '物料SPU',
        component: 'input',
        valueName: 'spuCode',
      },
      {
        component: 'select',
        valueName: 'handleAbnormal',
        name: '是否异常重推',
        options: YES_NO_LIST,
      },
    ],
    // 3D
    [BILLTYPE_ENUM.THREE_DIMENSIONAL_CUTTING_ORDER]: [
      ...commonConfig,
      {
        name: '3D任务编号',
        component: 'input',
        valueName: 'orderCode',
      },
      {
        name: '物料SPU',
        component: 'input',
        valueName: 'commodityCode',
      },
      {
        component: 'select',
        valueName: 'handleAbnormal',
        name: '是否异常重推',
        options: YES_NO_LIST,
      },
    ],
    // 辅料
    [BILLTYPE_ENUM.ACCESSORIES_ORDER]: [
      ...commonConfig,
      {
        name: '采购需求单号',
        component: 'input',
        valueName: 'purchaseOrderNo',
      },
      {
        name: '物料SPU',
        component: 'input',
        valueName: 'spuCode',
      },
      {
        component: 'select',
        valueName: 'handleAbnormal',
        name: '是否异常重推',
        options: YES_NO_LIST,
      },
    ],
    // 数码描稿
    [BILLTYPE_ENUM.DIGITAL_SKETCH_ORDER]: [
      ...commonConfig,
      {
        name: '描稿任务编号',
        component: 'input',
        valueName: 'orderCode',
      },
      {
        component: 'select',
        valueName: 'handleAbnormal',
        name: '是否异常重推',
        options: YES_NO_LIST,
      },
    ],
  };
  const searchConfig = computed<IConfigItem[]>(() => {
    return detailBillInfo.value?.billType ? typeObj[detailBillInfo.value.billType!] : [];
  });
  return {
    searchConfig,
  };
};
