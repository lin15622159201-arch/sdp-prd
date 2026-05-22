import { v4 as uuid } from 'uuid';
import { ref } from 'vue';
import { fabric } from 'fabric';
import { useWorkSpace } from './useWorkspace';
import { useEvent } from './useEvent';
import { FabricElType, IData } from '../types';
import { useDraw } from './useDraw';
import { BOXES_TYPE_ENUM } from '../constant';

export const useBasic = () => {
  // 不能用ref 使用proxy代理会导致库内部判断目标是否一致时引用地址不一致 导致大量bug
  const fabricEl: FabricElType = {
    value: null
  };
  const canvasEl = ref();
  // 只读当前图片标注
  const readCurrentFileLog = ref(false);
  const {
    init: workspaceInit,
    // handleZoom,
    workspaceEl,
    imgZoomRatio,
    workspaceConfig
    // curZoomRatio,
  } = useWorkSpace({ canvas: fabricEl });
  const { init: drawInit, curTool, handleChangeTool } = useDraw({
    canvas: fabricEl,
    workspaceConfig
  });
  const {
    init: initEvent,
  } = useEvent({ canvas: fabricEl, workspaceConfig });

  // 绘制标注记录内容
  const loadJson = (json: { x: number; y: number; }[], type: BOXES_TYPE_ENUM) => {
    return new Promise((resolve) => {
      if (type === BOXES_TYPE_ENUM.RECT) {
        const x1 = json[0].x;
        const y1 = json[0].y;
        const x2 = json[1].x;
        const y2 = json[1].y;
        fabricEl.value!.add(new fabric.Rect({
          left: x1 * imgZoomRatio.value,
          top: y1 * imgZoomRatio.value,
          width: (x2 - x1) * imgZoomRatio.value,
          height: (y2 - y1) * imgZoomRatio.value,
          strokeWidth: 1,
          fill: 'rgba(0,0,255,0.3)',
          stroke: 'rgba(0,0,255,1)',
          id: uuid(),
          strokeUniform: true,
          objectCaching: false,
          perPixelTargetFind: true,
          lockSkewingX: true,
          lockSkewingY: true,
        }));
      } else {
        // 切掉最后一个闭合的点
        json.splice(-1);
        const points: Array<{ x: number; y: number; }> = json.map(v => ({
          x: v.x * imgZoomRatio.value,
          y: v.y * imgZoomRatio.value,
        }));
        fabricEl.value!.add(new fabric.Polygon(
          points,
          {
            fill: 'rgba(0, 0, 255, 0.3)',
            stroke: 'rgba(0,0,255,1)',
            strokeWidth: 1,
            id: uuid(),
            strokeUniform: true,
            objectCaching: false,
            perPixelTargetFind: true,
            selectable: true,
            lockSkewingX: true,
            lockSkewingY: true,
          }
        ));
      }
      fabricEl.value?.renderAll();
      resolve(true);
    });
  };
  // 初始化
  const init = async (data: IData) => {
    // 初始化fabric
    fabricEl.value = new fabric.Canvas(canvasEl.value!, {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
      selection: false,
    });
    await workspaceInit(data.referencePicture);
    if (data.boxesList?.length) {
      loadJson(data.boxesList, data.boxesType);
    }
  };
  return {
    readCurrentFileLog,
    imgZoomRatio,
    init,
    workspaceEl,
    fabricEl,
    canvasEl,
    initEvent,
    workspaceConfig,
    drawInit,
    curTool,
    handleChangeTool
  };
};
