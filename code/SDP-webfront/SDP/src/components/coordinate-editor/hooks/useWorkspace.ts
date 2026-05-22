import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import { ref } from 'vue';
import { fill, throttle } from 'lodash-es';
import { hideFullScreenLoading, showFullScreenLoading } from '@/core/http/helper';
import { FabricElType } from '../types';
import { isURL } from '@toy/utils';
import transparentBg from '@/assets/transparent_bg.png';

interface IProps {
  canvas: FabricElType;
}
export const useWorkSpace = (props: IProps) => {
  const { canvas } = props;
  const workspaceEl = ref<HTMLElement>();
  const workspaceObject = ref<fabric.Rect>();
  const resizeObserver = ref<ResizeObserver | null>();
  const workspaceConfig = ref({
    width: 0,
    height: 0,
  });
  // 初始图片缩放比例
  const imgZoomRatio = ref(1);
  const getScale = () => {
    const viewPortWidth = workspaceEl.value?.offsetWidth || 0;
    const viewPortHeight = workspaceEl.value?.offsetHeight || 0;
    const { width, height } = workspaceConfig.value;
    const scale = viewPortHeight / height;
    // 按照宽度
    if (viewPortWidth / viewPortHeight < width / height) {
      return viewPortWidth / width;
    }
    // if (scale > maxScale) {
    //   scale = 2;
    // } else if (scale < minScale) {
    //   scale = 0.1;
    // }
    return scale;
  };
  // 设置画布中心到指定对象中心点上
  const setCenterFromObject = (obj: fabric.Rect) => {
    const { viewportTransform, width, height } = canvas.value!;
    const objCenter = obj.getCenterPoint();
    if (width === undefined || height === undefined || !viewportTransform) return;
    viewportTransform[4] = width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] = height / 2 - objCenter.y * viewportTransform[3];
    canvas.value!.setViewportTransform(viewportTransform);
    canvas.value!.renderAll();
  };
  const setZoomAuto = (scale: number, cb?: (left?: number, top?: number) => void) => {
    const width = workspaceEl.value?.offsetWidth || 0;
    const height = workspaceEl.value?.offsetHeight || 0;
    canvas.value!.setWidth(width);
    canvas.value!.setHeight(height);
    const center = canvas.value!.getCenter();
    canvas.value!.setViewportTransform(fabric.iMatrix.concat());
    canvas.value!.zoomToPoint(new fabric.Point(center.left, center.top), scale);
    // updateZoomRatio();
    if (!workspaceObject.value) return;
    setCenterFromObject(workspaceObject.value!);

    // 超出画布不展示
    workspaceObject.value!.clone((cloned: fabric.Rect) => {
      canvas.value!.clipPath = cloned;
      canvas.value!.requestRenderAll();
    });
    // updateZoomRatio();
    if (cb) cb(workspaceObject.value!.left, workspaceObject.value!.top);
  };
  // 自动缩放
  const auto = () => {
    const scale = getScale();
    setZoomAuto(scale - 0.08);
  };
  // 初始化监听器
  const initResizeObserve = () => {
    resizeObserver.value = new ResizeObserver(
      throttle(() => {
        auto();
      }, 50)
    );
    resizeObserver.value!.observe(workspaceEl.value!);
  };
  // 初始化工作区
  const setWorkspace = () => {
    const { width, height } = workspaceConfig.value;
    const workspace = new fabric.Rect({
      fill: 'rgba(255,255,255,0)',
      width,
      height,
      id: 'workspace',
      stroke: 'rgba(96, 92, 230, 0)',
      strokeUniform: true,
      objectCaching: false,
    });
    workspace.set('selectable', false);
    workspace.set('hasControls', false);
    workspace.hoverCursor = 'default';
    canvas.value!.add(workspace);
    canvas.value!.renderAll();
    workspaceObject.value = workspace;
    auto();
  };
  const loadImage = (url: string) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.onload = async () => {
        resolve(img);
      };
      // url类型需要处理跨域问题 并且不走缓存
      if (isURL(url)) {
        img.crossOrigin = 'anonymous';
        img.src = `${url}?t=${Date.now()}`;
      } else {
        img.src = url;
      }
    });
  };
  // 初始化背景图片
  const setBackgroundImage = (url: string) => {
    return new Promise(async (resolve, reject) => {
      const img = await loadImage(url);
      const transparentImg = await loadImage(transparentBg);
      const { width, height } = img;
      let targetWidth = width;
      let targetHeight = height;
      const wRadio = width / workspaceEl.value!.offsetWidth;
      const hRadio = height / workspaceEl.value!.offsetHeight;
      if (hRadio > wRadio) {
        targetHeight = workspaceEl.value!.offsetHeight;
        targetWidth = width / hRadio;
      } else {
        targetWidth = workspaceEl.value!.offsetWidth;
        targetHeight = height / wRadio;
      }
      workspaceConfig.value = {
        width: targetWidth,
        height: targetHeight,
      };
      canvas.value!.setWidth(targetWidth);
      canvas.value!.setHeight(targetHeight);
      imgZoomRatio.value = targetWidth / width;
      // 创建模式
      const pattern = new fabric.Pattern({
        source: transparentImg, // 图片作为平铺源
        repeat: 'repeat' // 平铺方式，可选 "repeat-x", "repeat-y", "repeat"
      });
      canvas.value!.add(new fabric.Rect({
        id: 'bg',
        // scaleX: imgZoomRatio.value,
        // scaleY: imgZoomRatio.value,
        left: 0,
        top: 0,
        width: targetWidth,
        height: targetHeight,
        fill: pattern,
      }));
      canvas.value!.add(new fabric.Image(img, {
        id: uuid(),
        scaleX: imgZoomRatio.value,
        scaleY: imgZoomRatio.value,
        left: 0,
        top: 0,
        crossOrigin: 'anonymous',
      }));
      resolve(true);
    });
  };
  const init = async (url: string) => {
    destroy();
    canvas.value?.clear();
    showFullScreenLoading();
    await setBackgroundImage(url);
    await setWorkspace();
    hideFullScreenLoading();
    initResizeObserve();
  };
  const destroy = () => {
    resizeObserver.value?.disconnect();
    resizeObserver.value = null;
  };
  return {
    workspaceConfig,
    imgZoomRatio,
    init,
    workspaceEl,
    resetZoom() {
      auto();
    },
  };
};
