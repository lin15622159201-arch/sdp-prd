import { fabric } from '@/fabric';
import { shallowRef, watch } from 'vue';
import { TGetCanvas } from '../types';
import { TWorkspace } from './useWorkspace';

// 遮罩层
export const useDarkMask = (workspace: TWorkspace, getCanvas: TGetCanvas) => {
  const createDarkMask = () => {
    const { width, height, left, top } = workspace.spaceRect.value;
    return new fabric.Rect({
      width,
      height,
      left,
      top,
      selectable: false,
      fill: 'rgba(0, 0, 0, 0.5)',
      originX: 'center',
      originY: 'center',
    });
  };

  // 遮罩元素
  const darkMaskRect = shallowRef(createDarkMask());

  const updateDarkMaskSize = () => {
    const { width, height, left, top } = workspace.spaceRect.value;
    darkMaskRect.value.set({
      width,
      height,
      left,
      top,
      angle: 0,
    });
    getCanvas().renderAll();
  };

  const updateMaskInnerClipPath = (innerObject: fabric.Object) => {
    const clipPath = new fabric.Rect({
      width: innerObject.getScaledWidth(),
      height: innerObject.getScaledHeight(),
      left: innerObject.left,
      top: innerObject.top,
      inverted: true,
      originX: 'center',
      originY: 'center',
      absolutePositioned: true, // 注意使用绝对定位，否则会因为外层mask影响导致定位偏移
    });
    darkMaskRect.value.set('clipPath', clipPath);
  };

  const setMaskInnerObject = async (innerObject: fabric.Object) => {
    updateMaskInnerClipPath(innerObject);
    innerObject.on('scaling', (e) => {
      e.transform && updateMaskInnerClipPath(e.transform.target);
    });
    innerObject.on('moving', (e) => {
      e.transform && updateMaskInnerClipPath(e.transform.target);
    });
    getCanvas().renderAll();
  };

  // 显示遮罩
  const showDarkMask = async () => {
    const rect = createDarkMask();
    darkMaskRect.value = rect;
    getCanvas().add(rect);
    getCanvas().renderAll();
  };

  const hideDarkMask = () => {
    getCanvas().remove(darkMaskRect.value);
    getCanvas().renderAll();
  };

  // 如果画布宽高变更，更新遮罩宽高
  watch(workspace.size, () => {
    updateDarkMaskSize();
  });

  return {
    showDarkMask,
    hideDarkMask,
    setMaskInnerObject,
    darkMaskRect,
  };
};
