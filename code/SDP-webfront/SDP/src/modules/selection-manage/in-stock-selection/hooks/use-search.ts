import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();

  const optionTransformed = (data:IDictionaryItem[]) => {
    return data.map(item => ({
      value: item.label,
      label: item.label,
    }));
  };

  const SHOP_LIST = computed(() => {
    return optionTransformed(getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST)) || [];
  });
  const CARGOTARY_LIST = computed(() => {
    return optionTransformed(getDictionaryOptions(DICTIONARY_KEY.CARGOTARY)) || [];
  });
  const SUPPLY_MODE_LIST = computed(() => {
    return optionTransformed(getDictionaryOptions(DICTIONARY_KEY.SUPPLY_MODE)) || [];
  });
  const STOCKGOODS_TYPE_LIST = computed(() => {
    return optionTransformed(getDictionaryOptions(DICTIONARY_KEY.STOCKGOODS_TYPE)) || [];
  });
  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        name: '供应商：',
        component: 'input',
        valueName: 'supplierName',
        props: {
          placeholder: '请输入供应商名称',
        },
      },
      {
        name: '现货类型：',
        component: 'select',
        valueName: 'spotTypeName',
        options: STOCKGOODS_TYPE_LIST.value,
        props: {
          placeholder: '请选择现货类型',
        }
      },
      {
        name: '货盘类型',
        component: 'select',
        valueName: 'palletTypeName',
        options: CARGOTARY_LIST.value,
        props: {
          placeholder: '请选择货盘类型',
        },
      },
      {
        name: '店铺',
        component: 'select',
        valueName: 'storeName',
        options: SHOP_LIST.value,
        props: {
          placeholder: '请选择店铺',
        },
      },
      {
        name: '创建时间：',
        component: 'datePicker',
        valueName: ['createdStartTime', 'createdEndTime'],
        placeholder: ['开始时间', '结束时间'],
        props: {
          type: 'datetimerange',
          dateFormat: 'YYYY-MM-DD HH:mm',
          format: 'YYYY-MM-DD HH:mm',
        },
      },
      {
        name: '创建人：',
        component: 'slot',
        slotName: 'creatorName',
      },
      {
        name: '选款时间：',
        component: 'datePicker',
        valueName: ['selectionStartTime', 'selectionEndTime'],
        placeholder: ['开始时间', '结束时间'],
        props: {
          type: 'datetimerange',
          dateFormat: 'YYYY-MM-DD HH:mm',
          format: 'YYYY-MM-DD HH:mm',
        },
      },
      {
        name: '选款人：',
        component: 'slot',
        slotName: 'styleSelectorName',
      },
      {
        name: '供给方式：',
        component: 'select',
        valueName: 'supplyModeName',
        options: SUPPLY_MODE_LIST.value,
        props: {
          placeholder: '请选择供给方式',
        },
      },
      {
        name: '选款编号',
        component: 'input',
        valueName: 'styleSelectionCode',
        props: {
          placeholder: '请输入选款编号',
        },
      },
      {
        name: '供应商款号',
        component: 'input',
        valueName: 'supplierStyleCode',
        props: {
          placeholder: '请输入供应商款号',
        },
      },
      {
        name: '关联款号',
        component: 'input',
        valueName: 'spuCode',
        props: {
          placeholder: '请输入关联款号',
        }
      }
    ];
  });

  return {
    searchConfig,
  };
};
