import { IConfigItem } from '@toy/business-components';
import { SEWING_COMPONENT_STATUS_LIST } from '../constant';
import { computed } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

const { getDictionaryOptions } = useDictionary();
const useSearchConfig = () => {
  const PROTOTYPE_CATEGORY_OPTIONS = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PROTOTYPE_CATEGORY, 3, 1, true);
  });

  const searchConfig = computed<IConfigItem[]>(
    () => [
      {
        component: 'input',
        name: '模板名称',
        valueName: 'templateName'
      },
      {
        component: 'select',
        name: '状态',
        valueName: 'state',
        options: SEWING_COMPONENT_STATUS_LIST,
        props: {
          clearable: true,
        }
      },
      {
        component: 'select',
        name: '板房品类',
        valueName: 'roomCategorys',
        options: PROTOTYPE_CATEGORY_OPTIONS.value,
        props: {
          clearable: true,
          multiple: true,
        }
      },
    ]
  );
  return {
    searchConfig
  };
};

export default useSearchConfig;
