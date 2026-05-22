import type { Ref } from 'vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

import {
  getReferSizeTempalteApi,
} from '../api';
import type {
  ITemplateListItem,
} from '../api/type';

interface IArg {
  threeCategory: Ref<string>;
}

function useSizeTemplate({ threeCategory }: IArg) {
  const templateListData = ref({
    list: [] as ITemplateListItem[],
    loading: false,
    templateCode: '',
  });
  const handleSearchTemplate = async (query?: string) => {
    if (!query) return;
    if (!threeCategory?.value) {
      ElMessage.warning('请先选择三级品类');
      return;
    }

    try {
      templateListData.value.loading = true;
      const { data } = await getReferSizeTempalteApi({
        templateName: query?.trim() || '',
        threeCategory: threeCategory.value,
      });

      templateListData.value.list = data.filter(item => item.isEnabled === '1');
    } finally {
      templateListData.value.loading = false;
    }
  };

  return {
    templateListData,
    handleSearchTemplate,
  };
}

export default useSizeTemplate;
