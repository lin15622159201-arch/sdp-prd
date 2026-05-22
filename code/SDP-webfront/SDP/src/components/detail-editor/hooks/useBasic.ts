import { shallowRef } from 'vue';
import { fabric } from '@/fabric';
import useWorkspace from './useWorkspace';
import useImage from './useImage';
import useFilter from './useFilter';

interface IProps {
  change: (imageData: ImageData) => void;
}

export const useBasic = ({ change }: IProps) => {
  const canvas = shallowRef<fabric.Canvas>();
  const imageFilter = useFilter();
  const filter = imageFilter.createMaskFilter();
  const getCanvas = () => {
    if (canvas.value) {
      return canvas.value;
    }
    throw new Error('canvas is not defined');
  };

  const workspace = useWorkspace(getCanvas);
  // 批量添加mask图
  const addMaskImages = (maskImages: string[]) => {
    for (let i = 0; i < maskImages.length; i++) {
      fabric.Image.fromURL(
        maskImages[i],
        (img) => {
          img.set({
            originX: 'center',
            originY: 'center',
            hoverCursor: 'default',
            selectable: false,
          });
          img.filters = [filter];
          img.applyFilters();
          getCanvas().add(img);
          getCanvas().renderAll();
        },
        {
          crossOrigin: 'anonymous',
        },
      );
    }
  };
  const maskImage = useImage({
    getCanvas,
    change,
  });

  const init = (fabricCanvas: fabric.Canvas, worksSpaceEl: HTMLElement) => {
    canvas.value = fabricCanvas;
    workspace.initResizeObserve(worksSpaceEl);
  };

  return {
    addMaskImages,
    init,
    canvas,
    workspace,
    maskImage,
  };
};
