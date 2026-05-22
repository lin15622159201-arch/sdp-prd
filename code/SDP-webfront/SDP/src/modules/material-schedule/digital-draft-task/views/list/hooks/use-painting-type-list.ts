import { ref } from 'vue';
import { digitalPaintingListPaintingType } from '../../../api';
import { IDigitalPaintingListPaintingTypeItem } from '../../../api/types';

const usePaintingTypeList = () => {
  /**
   * 描稿类型选项
   */
  const paintingTypeOptions = ref<IDigitalPaintingListPaintingTypeItem[]>([]);

  const getPaintingTypeOptions = async () => {
    const { data } = await digitalPaintingListPaintingType();
    paintingTypeOptions.value = data || [];
  };
  getPaintingTypeOptions();
  return {
    paintingTypeOptions,
  };
};
export default usePaintingTypeList;
