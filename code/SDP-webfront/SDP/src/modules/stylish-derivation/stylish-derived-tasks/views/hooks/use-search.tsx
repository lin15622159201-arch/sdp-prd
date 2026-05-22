import { IConfigItem } from '@toy/business-components';
import { computed, onMounted, ref } from 'vue';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { styleModelPageApi } from '@/components/favorite-style-models/api/index';
import { StyleModelPageResListItem } from '@/components/favorite-style-models/api/types';
import { useDictionary } from '@/hooks/use-dictionary2';

export const useSearch = () => {
  const { getEnableDictionaryOptions } = useDictionary();
  // const { getDictionaryOptions } = useDictionary();
  /**
   * 灵感来源枚举
   */
  enum SOURCE_TYPE {
    /** 用户上传 */
    SOURCE_UPLOAD = 'UPLOAD',
    /** 灵感源 */
    SOURCE_INSPIRATION = 'INSPIRATION',
  }

  /**
   * 灵感来源
   */
  const SOURCE_LIST = [
    { value: SOURCE_TYPE.SOURCE_UPLOAD, label: '用户上传' },
    { value: SOURCE_TYPE.SOURCE_INSPIRATION, label: '灵感源' },
  ];
  /** 风格模型 */
  // 加载风格模型数据
  const styleModelList = ref<StyleModelPageResListItem[]>([]);
  const loadStyleModelList = async () => {
    try {
      const { data } = await styleModelPageApi({
        pageNum: 1,
        pageSize: 1000,
        selectCollect: 1,
      });
      styleModelList.value = data.list || [];
    } catch (error) {
      console.error('获取风格模型列表失败:', error);
      styleModelList.value = [];
    }
  };

  loadStyleModelList();
  const PLM_STYLE_SOURCE = [
    {
      label: '全部',
      value: -1,
    },
    {
      label: '未关联姿势裂变',
      value: 0,
    },
    {
      label: '已关联姿势裂变',
      value: 1,
    }
  ];
  const AI_functionCall_configuration = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.AIFUNCTIONCALL_CONFIGURATION));
  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      
      {
        name: '任务编号',
        component: 'input',
        valueName: 'taskCode',
      },
      {
        name: '创建时间',
        valueName: ['createdStartTime', 'createdEndTime'],
        component: 'datePicker',
      },
      {
        component: 'slot',
        name: '创建人',
        slotName: 'creator',
      },
      {
        name: '生成时间',
        valueName: ['generateStartTime', 'generateEndTime'],
        component: 'datePicker',
      },
      // {
      //   name: '品类:',
      //   component: 'slot',
      //   slotName: 'category'
      // },
      {
        name: '风格模型',
        component: 'select',
        valueName: 'styleModelName',
        optionValue: 'styleModelName',
        options: styleModelList.value,
        props: {
          filterable: true,
        }
      },
      {
        name: '关联任务',
        component: 'select',
        valueName: 'related',
        options: PLM_STYLE_SOURCE,
      },
      {
        name: '灵感来源',
        component: 'select',
        valueName: 'source',
        options: [...SOURCE_LIST],
      },
      // {
      //   name: '任务来源',
      //   component: 'select',
      //   valueName: 'taskSource',
      //   options: [
      //     ...AI_functionCall_configuration.value,
      //     {
      //       label: '用户上传',
      //       value: 'upload'
      //     }
      //   ],
      // },
    ];
  });
  return {
    searchConfig,
  };
};
