import { ref, watch } from 'vue';
import { TGetCanvas } from '../types';
import { fabric } from 'fabric';
// import useImage from './useImage';

export default function useBlur(getCanvas: TGetCanvas) {
  // 虚化程度 0 ～ 100
  const blur = ref(0);
  const image = ref<any>(null);
  const setImage = (img: any) => {
    image.value = img;
  };
  // 虚化应用
  const applyBlur = () => {
    if (image.value?.image) {
      image.value.image.filters = [
        new fabric.Image.filters.Blur({
          blur: blur.value / 1000,
        }),
      ];
      image.value.image.applyFilters();
      getCanvas().renderAll();
    }
  };
  watch(blur, () => {
    applyBlur();
  });

  return {
    blur,
    applyBlur,
    setImage,
  };
}
