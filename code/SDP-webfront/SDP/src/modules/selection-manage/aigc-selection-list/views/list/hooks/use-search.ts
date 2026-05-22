import { computed, Ref, ref } from 'vue';
import { IConfigItem } from '@toy/business-components';
import {
  PICK_STATE_LIST,
  TASK_TYPE_LIST,
} from '@/modules/selection-manage/aigc-selection-list/constant';
import {
  IPickingStylePageReq,
  IPickingStyleCountStatusRes,
} from '@/modules/selection-manage/aigc-selection-list/api/type';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';

interface IConfig {
  params: Ref<IPickingStylePageReq>;
  versionCountStatus: Ref<IPickingStyleCountStatusRes>;
}
const ORIGIN = [
  {
    label: '全部',
    value: '',
  },
  ...TASK_TYPE_LIST
];
export const useSearch = (config: IConfig) => {
  const { getEnableDictionaryOptions } = useDictionary();
  const countryOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.NATIONAL));
  const { params, versionCountStatus } = config;

  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        name: `${('任务编码')}：`,
        component: 'slot',
        slotName: 'taskCode',
      },
      {
        name: `${('外部品类')}：`,
        component: 'input',
        valueName: 'externalCategory'
      },
      {
        name: `${('创建人')}：`,
        component: 'slot',
        slotName: 'creatorName',
      },
      {
        name: `${('创建时间')}：`,
        component: 'datePicker',
        valueName: ['pickingStartTime', 'pickingEndTime'],
      },
      {
        name: `${('灵感来源')}：`,
        component: 'input',
        valueName: 'inspirationSource',
      },
      {
        name: `${('国家站点')}：`,
        component: 'select',
        valueName: 'countrySiteCode',
        multiple: false,
        options: countryOptions.value,
      },
      {
        name: `${('选款人')}：`,
        component: 'slot',
        slotName: 'selectorName',
      },
      {
        name: `${('选款日期')}：`,
        component: 'datePicker',
        valueName: ['imagePickingStartTime', 'imagePickingEndTime'],
      },
      {
        name: `${('任务类型')}：`,
        component: 'select',
        valueName: 'origin',
        multiple: false,
        options: ORIGIN,
      },
    ];
  });

  const conditionResult = computed(() => {
    return {
      title: '',
      conditionList: (PICK_STATE_LIST.map((i) => {
        let count = versionCountStatus.value[i.key as keyof typeof versionCountStatus.value];
        if (+count > 99) {
          count = '99+';
        }
        count = count ? `(${count})` : '';
        return {
          value: i.value,
          label: `${(i.label)}${count}`,
        };
      })) as { value: string; label: string; }[],
    };
  });

  return {
    searchConfig,
    conditionResult,
  };
};
