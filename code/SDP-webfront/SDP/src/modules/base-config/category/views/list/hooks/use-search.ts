import { ref, computed } from 'vue';
import { IConfigItem } from '@/components/search-area';

export const useSearch = () => {
  const params = ref({
    name: '',
  });
  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        name: '品类名称',
        component: 'input',
        valueName: 'name',
        placeholder: '请输入',
        labelWidth: '120px',
      },
    ];
  });

  return {
    params,
    searchConfig,
  };
};
