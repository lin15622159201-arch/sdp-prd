import { computed } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import {
  IDENTIFY_STATUS_LIST,
  SUBMIT_STATUS_LIST,
  DATA_SOURCE_LIST,
} from '@/modules/inspiration-center/inspiration-source/constant';

export const useSearch = () => {
  const { getEnableDictionaryOptions } = useDictionary();
  const wavesOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.WAVEBATCH));
  const countryOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.NATIONAL));
  const supplyOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.SUPPLY_MODE));
  const planOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.PLANNINGSOURCE));

  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        name: '灵感编号：',
        component: 'input',
        valueName: 'inspirationCode',
      },
      {
        component: 'slot',
        name: '创建人：',
        slotName: 'creator',
      },
      {
        name: '灵感创建时间：',
        component: 'datePicker',
        valueName: ['inspirationStartCreatedTime', 'inspirationEndCreatedTime'],
        placeholder: ['开始日期', '结束日期'],
      },
      {
        name: '识别结果：',
        component: 'select',
        valueName: 'identifiedResult',
        options: IDENTIFY_STATUS_LIST,
      },
      {
        name: '灵感图来源：',
        component: 'input',
        valueName: 'inspirationSource',
      },
      {
        name: '国家站点：',
        component: 'select',
        valueName: 'sourceCountrySiteCode',
        options: countryOptions.value,
      },
      {
        name: '供给方式：',
        component: 'select',
        valueName: 'suggestedSupplyModeCode',
        options: supplyOptions.value,
      },
      {
        name: '提交次数：',
        component: 'inputNumber',
        valueName: 'inspirationSubmitCount',
      },
      
      {
        name: '外部品类：',
        component: 'input',
        valueName: 'externalCategory',
      },
      {
        component: 'slot',
        name: '提交人：',
        slotName: 'selector',
      },
      {
        name: '数据来源：',
        component: 'select',
        valueName: 'dataSourceCode',
        options: DATA_SOURCE_LIST,
      },
      {
        name: '企划来源：',
        component: 'select',
        valueName: 'planningSourceCode',
        options: planOptions.value,
      },
      {
        name: '波次：',
        component: 'select',
        valueName: 'waveBatchCode',
        options: wavesOptions.value,
      },
      {
        component: 'slot',
        name: '识别品类：',
        slotName: 'category',
      },
    ];
  });

  const conditionResult = computed(() => {
    return {
      title: '',
      conditionList: SUBMIT_STATUS_LIST,
    };
  });

  return {
    searchConfig,
    conditionResult,
  };
};
