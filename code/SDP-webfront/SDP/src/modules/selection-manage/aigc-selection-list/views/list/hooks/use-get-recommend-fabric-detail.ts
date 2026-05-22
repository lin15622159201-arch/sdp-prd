import { ref, shallowRef } from 'vue';
import { IFabricInfoResFabricListItem } from '../../../api/fabric/type';
import { getFabricInfo } from '../../../api/fabric';

export const useGetRecommendFabricDetail = () => {
  const imageUrl = ref('');
  const fabricList = shallowRef<IFabricInfoResFabricListItem[]>([]);
  const handleGetFabricInfo = async (imageId: string) => {
    const { data } = await getFabricInfo({ pictureId: imageId });
    imageUrl.value = data.pictureUrl;
    fabricList.value = data.fabricList;
  };

  return {
    handleGetFabricInfo,
    imageUrl,
    fabricList,
  };
};
