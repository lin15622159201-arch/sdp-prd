import { IConfigItem } from '@toy/business-components';
import { computed, onMounted, ref } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary2';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { styleModelPageApi } from '@/components/favorite-style-models/api/index';
import { StyleModelPageResListItem } from '@/components/favorite-style-models/api/types';

export const useSearch = () => {
  const { getEnableDictionaryOptions } = useDictionary();
  // const { getDictionaryOptions } = useDictionary();
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
    // {
    //   label: '全部',
    //   value: '',
    // },
    {
      label: '用户上传',
      value: 'UPLOAD',
    },
    {
      label: '灵感源',
      value: 'INSPIRATION',
    }
  ];
  const REPAIR_TYPE = [
    {
      label: '全部',
      value: '-1',
    },
    {
      label: '肢体修复',
      value: 1,
    },
    {
      label: '脸部修复',
      value: 2,
    },
    {
      label: '图片超分',
      value: 3,
    },
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
        component: 'slot',
        name: '创建人',
        slotName: 'creator',
      },
      {
        name: '灵感来源',
        component: 'select',
        valueName: 'source',
        options: PLM_STYLE_SOURCE,
      },
      {
        name: '创建时间',
        valueName: ['createdStartTime', 'createdEndTime'],
        component: 'datePicker',
      },
      // {
      //   name: '品类:',
      //   component: 'slot',
      //   slotName: 'category'
      // },
      {
        name: '任务来源',
        component: 'select',
        valueName: 'taskSource',
        options: [
          {
            label: '全部',
            value: '-1'
          },
          ...AI_functionCall_configuration.value,
          {
            label: '用户上传',
            value: 'upload'
          }
        ],
      },
      {
        name: '修复类型',
        component: 'select',
        valueName: 'fixType',
        options: REPAIR_TYPE,
      },
    ];
  });
  return {
    searchConfig,
  };
};
