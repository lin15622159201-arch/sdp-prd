import { fabric } from 'fabric';
import { ref, watch } from 'vue';
import { TGetCanvas } from '../types';
import { THistory } from './useHistory';
import { TImage } from './useImage';
import { TWorkspace } from './useWorkspace';
import { useMagicKeys } from '@vueuse/core';
import { useDarkMask } from './useDarkMask';
import useCropMask from './useCropMask';
import { ElMessageBox } from 'element-plus';

interface IUseCropOptions {
  history: THistory;
  workspace: TWorkspace;
  getCanvas: TGetCanvas;
  imageHook: TImage;
}

export default function useCrop({ history, workspace, imageHook, getCanvas }: IUseCropOptions) {
  const darkMaskHook = useDarkMask(workspace, getCanvas);
  const cropMaskHook = useCropMask(getCanvas);
  const ratio = ref('');

  const ratioOptions = ref([
    { label: '原始', value: '' },
    { label: '1:1', value: '1:1' },
    { label: '3:2', value: '3:2' },
    { label: '4:9', value: '4:9' },
    { label: '16:9', value: '16:9' },
    { label: '7:5', value: '7:5' },
  ]);

  const startCrop = async (r = '', scale = 1) => {
    const canvas = getCanvas();
    const size = getRatioSize(r);
    size.width *= scale;
    size.height *= scale;
    const { width, height, left, top } = size;
    const rect = await cropMaskHook.draw(width, height, left, top);
    darkMaskHook.showDarkMask();
    darkMaskHook.setMaskInnerObject(rect);
    canvas.renderAll();
  };

  // 确认裁剪，裁剪后的图片大小为裁剪框大小
  const endCrop = () => {
    cropMaskHook.remove();
    darkMaskHook.hideDarkMask();
    getCanvas().renderAll();
  };

  // 获取截图
  const generateImage = (obj: fabric.Object) => {
    const canvas = getCanvas();
    const cacheZoomRation = workspace.zoomRatio.value;
    // 把图像返回到原来比例，否则生成图像素会是缩放后的
    workspace.zoomToPoint(1);
    const { viewportTransform = [] } = canvas;
    const { top, left, width, height } = obj.getBoundingRect(true);
    const dataURL = canvas.toDataURL({
      multiplier: 1,
      width,
      height,
      left: left + viewportTransform[4],
      top: top + viewportTransform[5],
    });
    workspace.zoomToPoint(cacheZoomRation);
    return dataURL;
  };

  const confirmCrop = async () => {
    await sizeChecker();
    const canvas = getCanvas();
    endCrop();
    const { width, height, left, top } = cropMaskHook.getSize();
    const cropObj = new fabric.Rect({ width, height, left, top, originX: 'center', originY: 'center' });
    const dataURL = generateImage(cropObj);
    canvas.clear();
    workspace.initWorkspace(width, height);
    await imageHook.addImage(dataURL);
    canvas.renderAll();
    // 截图完毕继续显示裁剪框
    history.addRecord();
    // await startCrop();
  };

  const getRatioSize = (r: string) => {
    // 获取画布尺寸
    const { width = -1, height = -1, left = -1, top = -1 } = workspace.spaceRect.value;
    // 计算适合画布尺寸的裁剪框大小
    let cropWidth = width;
    let cropHeight = height;
    // 重新计算比例
    if (r) {
      const [ratioWidth, ratioHeight] = r.split(':').map(Number);
      if (width / height < ratioWidth / ratioHeight) {
        cropHeight = (width * ratioHeight) / ratioWidth;
      } else {
        cropWidth = (height * ratioWidth) / ratioHeight;
      }
    }
    return { width: cropWidth, height: cropHeight, left, top };
  };

  const sizeChecker = async () => new Promise((resolve, reject) => {
    const { width, height } = cropMaskHook.getSize();
    if (width < 512 || height < 512) {
      ElMessageBox.alert('为了保障AI图片质量，图片高宽建议不低于512*512', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
        resetCrop();
      });
      reject(false);
    } else {
      resolve(true);
    }
  });

  // 按下回车，确认裁剪
  const { enter } = useMagicKeys();
  watch(enter, (val) => {
    if (val) {
      // 防止与弹窗的回车事件冲突，导致无法弹出弹窗
      setTimeout(() => {
        confirmCrop();
      }, 100);
    }
  });

  const resetCrop = (val: string = ratio.value) => {
    endCrop();
    startCrop(val);
  };

  // 监听用户选择的裁剪比例
  watch(ratio, (val) => {
    resetCrop(val);
  });

  return {
    ratio,
    ratioOptions,
    isModified: cropMaskHook.isModified,
    confirmCrop,
    startCrop,
    endCrop,
    resetCrop,
  };
}

export type TCrop = ReturnType<typeof useCrop>;
