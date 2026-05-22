import { computed, ref } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary2';
import { IConfigItem } from '@toy/business-components';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useBfgDictionary } from '@/hooks/use-bfg-dictionary';
import { DICTIONARY_KEY as DICTIONARY_KEY_new } from '@/hooks/use-bfg-dictionary/constant';
import { getCategoryList } from './api/index';

export const useSearch = () => {
  const { getDictionaryOptionsSync } = useBfgDictionary();
  const { getDictionaryOptions } = useDictionary();
  async function getList(key: any) {
    const data = await getDictionaryOptionsSync(key);
    return data.map((item) => {
      return {
        value: item.valueCode || '',
        label: item.dictValue || '',
      };
    });
  }
  interface ModelGalleryInter {
    value?: string;
    label?: string;
  }

  const modelGallery = ref<ModelGalleryInter[]>([]);
  const init = () => {
    // getList(DICTIONARY_KEY.SCENE_GALLERY).then((data) => {
    //   sceneGallery.value = data;
    // });
    getList(DICTIONARY_KEY.MODEL_GALLERY).then((data) => {
      modelGallery.value = data.map((v: ModelGalleryInter) => {
        return {
          ...v,
          value: v.label,
        };
      });
    });
  };

  init();

  const { getEnableDictionaryOptions } = useDictionary();
  const modelBodytypeList = computed(() => getDictionaryOptions(DICTIONARY_KEY.MODEL_BODYTYPE));
  const inspirationImageSource = computed(() => getDictionaryOptions(DICTIONARY_KEY.MATERIAL_SOURCE));
  const backgroundTypeList = computed(() => getDictionaryOptions(DICTIONARY_KEY.BACKGROUNDTYPE));
  const plmReferenceSeason = computed(() => getDictionaryOptions(DICTIONARY_KEY.FG_SEAS));

  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        component: 'slot',
        name: '品类：',
        slotName: 'category',
      },
      {
        component: 'slot',
        name: '款式标签',
        slotName: 'ksbq',
      },
      // {
      //   name: '款式标签',
      //   component: 'select',
      //   valueName: 'ksbq',
      //   options: IDENTIFY_STATUS_LIST,
      // },
      {
        name: '模特人种',
        component: 'select',
        valueName: 'modelRaceName',
        options: modelGallery.value,
      },
      {
        name: '模特体型',
        component: 'select',
        valueName: 'modelBodyTypeName',
        options: modelBodytypeList.value,
        optionValue: 'label'
      },
      {
        component: 'slot',
        name: '背景',
        slotName: 'background',
      },
      // {
      //   name: '背景',
      //   component: 'select',
      //   valueName: 'backgroundNameList',
      //   optionValue: 'dictName',
      //   props: {
      //     multiple: true,
      //     // filterable: true,
      //   },
      //   options: backgroundTypeList.value,
      // },
      {
        name: '季节',
        component: 'select',
        valueName: 'seasonName',
        optionValue: 'label',
        options: plmReferenceSeason.value,
      },
      {
        name: '素材来源',
        component: 'select',
        valueName: 'materialSourceName',
        optionValue: 'label',
        options: inspirationImageSource.value,
      },
    ];
  });

  return {
    searchConfig,
    backgroundTypeList
  };
};


export const ksbqCategoryList = async () => {
  const { getDictionaryOptionsSync } = useBfgDictionary();
  const { getDictionaryOptions } = useDictionary();
  const styleLabelList = ref<any[]>([]);

  // 衣长
  const categoryListYc = await getCategoryList({
    categoryCode: 'FM240402583',
    pageNum: 1,
    pageSize: 1000,
  });
  // 裙长
  const categoryListQc = await getCategoryList({
    categoryCode: 'FM240402584',
    pageNum: 1,
    pageSize: 1000,
  });
  // 裤长
  const categoryListKc = await getCategoryList({
    categoryCode: 'FM240500030',
    pageNum: 1,
    pageSize: 1000,
  });
  // 廓形
  const categoryListDx = await getCategoryList({
    categoryCode: 'FM240402569',
    pageNum: 1,
    pageSize: 1000,
  });
  // 袖长
  const categoryListXc = await getCategoryList({
    categoryCode: 'FM240402575',
    pageNum: 1,
    pageSize: 1000,
  });
  // 版型
  const categoryListXcBx = await getCategoryList({
    categoryCode: 'FM240402568',
    pageNum: 1,
    pageSize: 1000,
  });
  styleLabelList.value = [
    {
      categoryValueEn: 'FM240402583',
      valueCode: '衣长',
      categoryValue: '衣长',
      children: categoryListYc.data.list
    },
    {
      categoryValueEn: 'FM240402584',
      valueCode: '裙长',
      categoryValue: '裙长',
      children: categoryListQc.data.list
    },
    {
      categoryValueEn: 'FM240500030',
      valueCode: '裤长',
      categoryValue: '裤长',
      children: categoryListKc.data.list
    },
    {
      categoryValueEn: 'FM240402569',
      valueCode: '廓形',
      categoryValue: '廓形',
      children: categoryListDx.data.list
    },
    {
      categoryValueEn: 'FM240402575',
      valueCode: '袖长',
      categoryValue: '袖长',
      children: categoryListXc.data.list
    },
    {
      categoryValueEn: 'FM240402568',
      valueCode: '版型',
      categoryValue: '版型',
      children: categoryListXcBx.data.list
    },
  ];
  const mtrzList = ref<any>([]);
  
  // const backgroundTypeList = computed(() => );
  const backgroundTypeList = await getDictionaryOptions(DICTIONARY_KEY.BACKGROUNDTYPE);
  mtrzList.value = await getDictionaryOptionsSync(DICTIONARY_KEY_new.MODEL_GALLERY);
  
  return new Promise((res) => {
    res({
      styleLabelList,
      mtrzList,
      backgroundTypeList,
    });
  });
};
