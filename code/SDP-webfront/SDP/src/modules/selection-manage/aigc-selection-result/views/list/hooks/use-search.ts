import { computed } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { PICK_STATE_LIST, TASK_TYPE_LIST } from '@/modules/selection-manage/aigc-selection-list/constant';
import { OPEN_STYLE_STATUS_LIST } from '@/modules/selection-manage/aigc-selection-result/constant';

export const useSearch = () => {
  const { getEnableDictionaryOptions } = useDictionary();
  const wavesOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.WAVEBATCH));
  const countryOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.NATIONAL));
  const ORIGIN = [
    {
      label: '全部',
      value: '',
    },
    ...TASK_TYPE_LIST
  ];
  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        name: '建议类目：',
        component: 'slot',
        slotName: 'category',
      },
      {
        name: '创建人：',
        component: 'slot',
        slotName: 'creator',
      },
      {
        name: '创建时间：',
        component: 'datePicker',
        valueName: ['pickingStartTime', 'pickingEndTime'],
        placeholder: ['开始日期', '结束日期'],
      },
      {
        name: '灵感来源：',
        component: 'input',
        valueName: 'inspirationSource',
      },
      {
        name: '国家站点：',
        component: 'select',
        valueName: 'suggestedCountrySiteCode',
        options: countryOptions.value,
      },
      {
        name: '选款日期：',
        component: 'datePicker',
        valueName: ['imagePickingStartTime', 'imagePickingEndTime'],
        placeholder: ['开始日期', '结束日期'],
      },
      {
        name: '选款人：',
        component: 'slot',
        slotName: 'selector',
      },
      {
        name: '选择结果：',
        component: 'select',
        valueName: 'pickingState',
        options: PICK_STATE_LIST,
      },
      {
        name: '波次：',
        component: 'select',
        valueName: 'suggestedWaveBatchCode',
        options: wavesOptions.value,
        filterable: true,
      },
      {
        name: '开款状态：',
        component: 'select',
        valueName: 'openStyleState',
        options: OPEN_STYLE_STATUS_LIST,
      },
      {
        name: '款号',
        component: 'slot',
        slotName: 'styleNum',
      },
      {
        name: '任务类型',
        component: 'select',
        valueName: 'origin',
        multiple: false,
        options: ORIGIN,
      },
    ];
  });

  return {
    searchConfig,
  };
};
