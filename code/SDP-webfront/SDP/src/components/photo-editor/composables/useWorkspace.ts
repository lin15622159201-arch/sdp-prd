import { fabric } from 'fabric';
import { ref, shallowRef, watch } from 'vue';
import { throttle } from 'lodash-es';
import { TGetCanvas } from '../types';

interface CustomRect extends fabric.Rect {
  id?: string;
}

export default function useWorkspace(getCanvas: TGetCanvas) {
  const createSpaceRect = (width: number, height: number) => {
    const rect: CustomRect = new fabric.Rect({
      fill: 'rgba(255,255,255,1)',
      width,
      height,
      selectable: false,
      originX: 'center',
      originY: 'center',
      // @ts-ignore
      erasable: false,
    });
    rect.set('id', 'workspace');
    return rect;
  };

  const spaceRect = shallowRef(createSpaceRect(100, 100));

  const size = ref({ width: 0, height: 0 });
  // 如果被重新赋值，初始化clipPath和宽高
  watch(spaceRect, () => {
    getCanvas().clipPath = spaceRect.value;
    const { width = 0, height = 0 } = spaceRect.value;
    size.value = { width, height };
  });

  // 缩放比
  const zoomRatio = ref(1);

  // 基于中心点缩放
  const zoomToPoint = (value: number) => {
    const canvas = getCanvas();
    const center = canvas.getCenter();
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), value <= 0.1 ? 0.1 : value);
    zoomRatio.value = value;
    canvas.renderAll();
  };

  const zoomIn = () => {
    let zRatio = getCanvas().getZoom() ?? 0;
    zRatio += 0.1;
    zoomToPoint(zRatio);
  };

  const zoomOut = () => {
    let zRatio = getCanvas().getZoom();
    zRatio -= 0.1;
    zoomToPoint(zRatio);
  };

  // 设置画布大小
  const setSize = (width: number, height: number) => {
    spaceRect.value.set('width', Number(width));
    spaceRect.value.set('height', Number(height));
    size.value = { width, height };
    getCanvas().requestRenderAll();
  };

  // 初始化画布背景
  const initBackground = (width: number, height: number) => {
    if (width === 0 || height === 0) return;
    getCanvas().setDimensions({ width, height });
  };

  const getScale = () => {
    // 画布宽高
    const canvasWidth = getCanvas().getWidth() || -1;
    const canvasHeight = getCanvas().getHeight() || -1;
    // 图片宽高
    const workspaceWidth = spaceRect.value.getScaledWidth() || -1;
    const workspaceHeight = spaceRect.value.getScaledHeight() || -1;
    // 按宽度
    if (canvasWidth / canvasHeight < workspaceWidth / workspaceHeight) {
      return canvasWidth / workspaceWidth;
    } // 按高度缩放
    return canvasHeight / workspaceHeight;
  };

  const initWorkspace = (width: number, height: number) => {
    spaceRect.value = createSpaceRect(width, height);
    setSize(width, height);
    // 超出画布不展示
    getCanvas().add(spaceRect.value);
    getCanvas().renderAll();
    zoomToPoint(getScale() - 0.05);
    setCenterFromObject(spaceRect.value);
  };

  /**
   * 设置画布中心到指定对象中心点上
   * @param {Object} obj 指定的对象
   */
  const setCenterFromObject = (obj: fabric.Rect | fabric.Group | fabric.Image) => {
    const objCenter = obj.getCenterPoint();
    const { viewportTransform, width, height } = getCanvas();
    if (width === undefined || height === undefined || !viewportTransform) return;
    viewportTransform[4] = width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] = height / 2 - objCenter.y * viewportTransform[3];
    getCanvas().setViewportTransform(viewportTransform);
    getCanvas().renderAll();
  };

  // 绑定鼠标滚轮事件
  const bindMouseWheel = () => {
    getCanvas().on('mouse:wheel', (opt) => {
      const delta = window.navigator.userAgent.indexOf('Mac') > 0 ? opt.e.deltaY : -opt.e.deltaY;
      let zRatio = getCanvas().getZoom() ?? 0;
      zRatio += delta / 2000;
      zoomToPoint(zRatio);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  };

  let resizeObserver: ResizeObserver;
  // 监听浏览器窗口变化，自动居中画布
  const initResizeObserve = async (el: HTMLElement) => {
    // 使用promise保证执行顺序，防止initWorkspace在 initBackground之前执行
    return new Promise((resolve) => {
      resizeObserver = new ResizeObserver(
        throttle(() => {
          const { offsetWidth, offsetHeight } = el;
          initBackground(offsetWidth, offsetHeight);
          resolve(null);
          spaceRect.value && setCenterFromObject(spaceRect.value);
        }, 50),
      );
      resizeObserver.observe(el);
    });
  };

  const destroyResizeObserve = () => {
    resizeObserver?.disconnect();
  };

  return {
    zoomRatio,
    zoomIn,
    zoomOut,
    zoomToPoint,
    initWorkspace,
    initBackground,
    initResizeObserve,
    destroyResizeObserve,
    bindMouseWheel,
    setSize,
    spaceRect,
    size,
  };
}

export type TWorkspace = ReturnType<typeof useWorkspace>;
