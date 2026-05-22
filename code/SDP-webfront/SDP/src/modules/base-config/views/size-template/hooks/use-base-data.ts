import { ref } from 'vue';

import { clothesPartsSize } from '@/api/basis';
import type { IClothesPartsSizeListItem } from '@/api/basis/types';

/**
 * 获取基础资料数据
 */
function useBaseData() {
  const positionList = ref<IClothesPartsSizeListItem[]>([]);

  const handleGetSizeList = async () => {
    const { data } = await clothesPartsSize({
      isEnabled: '1',
    });
    positionList.value = data;
  };

  (function init() {
    handleGetSizeList();
  }());

  return {
    positionList,
  };
}

export default useBaseData;
