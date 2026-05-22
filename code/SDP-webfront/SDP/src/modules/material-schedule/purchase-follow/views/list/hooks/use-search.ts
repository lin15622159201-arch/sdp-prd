import { computed, ref } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { DESIGN_ORDER_STATE_LIST } from '@/modules/design-center/develop-bom/constant';

export const useSearch = () => {
  const searchConfig = computed<IConfigItem[]>(() => [
    {
      name: 'SKC',
      component: 'input',
      valueName: 'designCode',
    },
    {
      name: '齐套单号',
      component: 'input',
      valueName: 'materialKittingCode',
    },
    // {
    //   name: '采购单号',
    //   valueName: 'purchaseOrderNo',
    //   component: 'input',
    // },
    {
      valueName: 'cuttingCode',
      name: '剪版单号',
      component: 'input',
    },
    {
      valueName: 'materialPurchaseStatusCodeList',
      name: '物料采购状态',
      component: 'select',
      props: {
        collapseTags: true,
        multiple: true,
      },
      options: DESIGN_ORDER_STATE_LIST,
    },
    {
      name: '设计师',
      component: 'slot',
      slotName: 'designerIdList',
    },
    {
      name: '设计组别',
      component: 'slot',
      slotName: 'designerGroupCodeList',
    },
  ]);

  return {
    searchConfig
  };
};
