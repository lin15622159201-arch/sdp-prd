import { useBfgDictionary } from '@/hooks/use-bfg-dictionary';
import { DICTIONARY_KEY } from '@/hooks/use-bfg-dictionary/constant';
import { shallowRef } from 'vue';
import { IGalleryListItem } from './type';

export const useDict = () => {
  const { getDictionaryOptionsSync } = useBfgDictionary();

  async function getList(key: DICTIONARY_KEY): Promise<IGalleryListItem[]> {
    const data = await getDictionaryOptionsSync(key);
    return data.map((item) => {
      return {
        id: item.valueCode || '',
        name: item.dictValue || '',
        url: item.extValue2 || '',
      };
    });
  }

  const modelGallery = shallowRef<IGalleryListItem[]>([]);

  const sceneGallery = shallowRef<IGalleryListItem[]>([]);

  const init = () => {
    getList(DICTIONARY_KEY.SCENE_GALLERY).then((data) => {
      sceneGallery.value = data;
    });
    getList(DICTIONARY_KEY.MODEL_GALLERY).then((data) => {
      modelGallery.value = data;
      console.log('modelGallery', modelGallery.value);
    });
  };

  init();

  return {
    modelGallery,
    sceneGallery,
  };
};
