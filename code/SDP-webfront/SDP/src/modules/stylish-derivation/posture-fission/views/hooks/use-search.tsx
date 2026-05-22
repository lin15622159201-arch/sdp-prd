import { IConfigItem } from '@toy/business-components';
import { computed, onMounted, ref } from 'vue';
// import { useDictionary } from '@/hooks/use-dictionary';
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
  const AI_functionCall_configuration = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.AIFUNCTIONCALL_CONFIGURATION));

  const fgclothtypeLit = computed(() => {
    return getEnableDictionaryOptions(DICTIONARY_KEY.FGCLOTHTYPE).filter(v => !((v.attributes || []).find(v1 => v1.code === 'posture_fission')?.name === '0'));
  });
  const poseChangeratio = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.POSECHANGE_RATIO));
  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      
      {
        name: '任务编号',
        component: 'input',
        valueName: 'taskCode',
      },
      {
        name: '创建时间',
        valueName: ['createdTimeStart', 'createdTimeEnd'],
        component: 'datePicker',
      },
      {
        component: 'slot',
        name: '创建人',
        slotName: 'creator',
      },
      {
        name: '生成时间',
        valueName: ['generateTimeStart', 'generateTimeEnd'],
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
        name: '任务来源',
        component: 'select',
        valueName: 'taskSource',
        options: [
          ...AI_functionCall_configuration.value,
          {
            label: '用户上传',
            value: 'upload'
          }
        ],
      },
      {
        name: '灵感来源',
        component: 'select',
        valueName: 'source',
        options: PLM_STYLE_SOURCE,
      },
    ];
  });
  return {
    searchConfig,
    fgclothtypeLit,
    poseChangeratio
  };
};
