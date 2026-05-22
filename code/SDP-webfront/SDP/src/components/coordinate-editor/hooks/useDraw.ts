import { v4 as uuid } from 'uuid';
import { fabric } from 'fabric';
import { ref, Ref } from 'vue';
import { FabricElType, PolygonPoints } from '../types';
import { cloneDeep, throttle } from 'lodash-es';
import { ElMessage } from 'element-plus';
import { BOXES_TYPE_ENUM } from '../constant';

interface IProps {
  canvas: FabricElType;
  workspaceConfig: Ref<{ width: number; height: number; }>;
}

interface CanvasInter {
  id?: string;
}

/** 绘制图像 */
export const useDraw = (props: IProps) => {
  const { canvas, workspaceConfig } = props;
  const isDrawing = ref(false);
  // 当前选中工具
  const curTool = ref<BOXES_TYPE_ENUM | ''>('');
  // 当前正在绘制的对象
  const curObject = ref();
  // 存储多边形的顶点
  let polygonPoints: PolygonPoints = [];
  // 当前绘制中的多边形边界线
  let tempLine: InstanceType<typeof fabric.Line> | null;
  // 记录起始点
  const pointer = ref({
    x: 0,
    y: 0,
  });
  // 修改工具
  const handleChangeTool = (val: BOXES_TYPE_ENUM) => {
    const cur = curTool.value === val ? '' : val;
    curTool.value = cur;
    if (cur === BOXES_TYPE_ENUM.RECT) {
      polygonPoints = [];
      tempLine = null;
    }
    canvas.value?.discardActiveObject();
    canvas.value?.renderAll();
  };
  // 隐藏部分控件
  const setHideControls = (object: fabric.Object) => {
    object.setControlsVisibility({
      mtr: false,
    } as any);
  };
  // 计算向量 (x1, y1) -> (x2, y2) 和 (x1, y1) -> (x3, y3) 的叉积
  const crossProduct = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ) => {
    return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
  };

  // 判断两条线段是否相交
  const isIntersect = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) => {
    const d1 = crossProduct(x1, y1, x2, y2, x3, y3);
    const d2 = crossProduct(x1, y1, x2, y2, x4, y4);
    const d3 = crossProduct(x3, y3, x4, y4, x1, y1);
    const d4 = crossProduct(x3, y3, x4, y4, x2, y2);

    // 检查线段是否相交
    if (d1 * d2 < 0 && d3 * d4 < 0) {
      return true;
    }
    return false;
  };
  // 计算两点之间的欧几里得距离
  const pointDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };
  // 计算点 (px, py) 到线段 (x1, y1) -> (x2, y2) 的最短距离
  const pointToSegmentDistance = (x1: number, y1: number, x2: number, y2: number, px: number, py: number) => {
    const lineLenSquared = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    // 如果线段长度为 0，返回点到 (x1, y1) 的距离
    if (lineLenSquared === 0) return pointDistance(px, py, x1, y1);
    // 投影点的参数 t
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / lineLenSquared;
    // 限制 t 在 [0, 1] 之间
    t = Math.max(0, Math.min(1, t));
    // 投影点的坐标
    const projX = x1 + t * (x2 - x1);
    const projY = y1 + t * (y2 - y1);

    // 返回投影点到 (px, py) 的距离
    return pointDistance(px, py, projX, projY);
  };
  // 判断一条直线和一条折线是否相交
  const isLineIntersectPolyline = (x: number, y: number, isDbClick: boolean, threshold = 15) => {
    const originPoint = polygonPoints!.at(-1)!;
    if (polygonPoints.length < 2) return false;
    if (!isDbClick) {
      const curPointDistance = pointToSegmentDistance(
        polygonPoints.at(-2)!.x,
        polygonPoints.at(-2)!.y,
        polygonPoints.at(-1)!.x,
        polygonPoints.at(-1)!.y,
        x,
        y
      );
      if (curPointDistance <= threshold) {
        return true;
      }
    }
    const line: PolygonPoints = [
      { x: originPoint.x, y: originPoint.y },
      { x, y }
    ];
    const polyline: PolygonPoints = cloneDeep(polygonPoints);
    polyline.splice(-1, 1);
    if (isDbClick) {
      polyline.splice(0, 1);
    }
    // 直线的两个点
    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line;
    // 遍历折线的每一段
    for (let i = 0; i < polyline.length - 1; i++) {
      const { x: x3, y: y3 } = polyline[i];
      const { x: x4, y: y4 } = polyline[i + 1];
      // 如果直线与当前线段相交，返回 true
      if (isIntersect(x1, y1, x2, y2, x3, y3, x4, y4)) {
        return true;
      }
      // 如果不相交，计算每个端点到另一条线段的最短距离
      const dist1 = pointToSegmentDistance(x3, y3, x4, y4, x1, y1);
      const dist2 = pointToSegmentDistance(x3, y3, x4, y4, x2, y2);
      const dist3 = pointToSegmentDistance(x1, y1, x2, y2, x3, y3);
      const dist4 = pointToSegmentDistance(x1, y1, x2, y2, x4, y4);
      if (dist1 <= threshold || dist2 <= threshold || dist3 <= threshold || dist4 <= threshold) {
        return true;
      }
    }
    // 如果所有线段都没有相交，返回 false
    return false;
  };
  const removeEl = () => {
    const el = canvas.value!;
    const lines = [
      ...el.getObjects('rect').filter((v: any) => v.id !== 'bg'),
      ...el.getObjects('polygon'),
      ...el.getObjects('line'),
    ].filter((v: any) => !['workspace', 'bg'].includes(v.id || ''));
    if (lines.length) {
      el.remove(...lines);
    }
  };
  // 判断是否接近起点
  const checkIsStartPoint = (event: fabric.IEvent<MouseEvent>) => {
    const el = canvas.value!;
    const point = el.getPointer(event.e);
    // 检测是否接近起点，如果是则闭合多边形
    if (polygonPoints.length > 2) {
      const firstPoint = polygonPoints[0];
      const distance = Math.sqrt((firstPoint.x - point.x) ** 2 + (firstPoint.y - point.y) ** 2);
      return distance < 10;
    }
    return false;
  };
  // 判断是否存在重复的点
  const checkHasRepeatPoint = (event: fabric.IEvent<MouseEvent>) => {
    const el = canvas.value!;
    const point = el.getPointer(event.e);
    return polygonPoints.some(p => p.x === point.x && p.y === point.y);
  };
  const mousedown = (event: fabric.IEvent<MouseEvent>) => {
    const el = canvas.value!;
    const target = event.target as fabric.Object & { id?: string; };
    // 点击的不为workspace 说明选中了某元素
    if (event.target && !/^workspace/.test(target?.id || '') && event.target.type !== 'line') {
      setHideControls(event.target!);
      canvas.value?.requestRenderAll();
      return;
    }
    if (curTool.value === '') return;
    const { x, y } = el.getPointer(event.e);
    if (x < 0 || y < 0 || x > workspaceConfig.value.width || y > workspaceConfig.value.height) {
      return;
    }
    el.discardActiveObject();
    el.requestRenderAll();
    isDrawing.value = true;
    switch (curTool.value) {
      case BOXES_TYPE_ENUM.RECT: {
        removeEl();
        // 第一次点击生成元素
        pointer.value = el.getPointer(event.e);
        curObject.value = new fabric.Rect({
          width: 0,
          height: 0,
          left: pointer.value.x,
          top: pointer.value.y,
          strokeWidth: 1,
          fill: 'rgba(0,0,255,0.3)',
          stroke: 'rgba(0,0,255,1)',
          id: uuid(),
          strokeUniform: true,
          objectCaching: false,
          perPixelTargetFind: true,
          lockSkewingX: true,
          lockSkewingY: true
        });
        el.add(curObject.value);
        break;
      }
      case BOXES_TYPE_ENUM.POLYGON: {
        const curPointer = el.getPointer(event.e);
        const point = new fabric.Point(curPointer.x, curPointer.y);
        if (!tempLine) {
          // 添加点到多边形顶点数组
          polygonPoints.push(point);
          removeEl();
          const line = new fabric.Line([point.x, point.y, point.x, point.y], {
            stroke: 'rgba(0,0,255,1)',
            selectable: false,
            evented: false,
            objectCaching: false,
            perPixelTargetFind: true,
            hoverCursor: 'none',
            id: uuid(),
          });
          el.add(line);
          tempLine = new fabric.Line([point.x, point.y, point.x, point.y], {
            stroke: 'rgba(0,0,255,1)',
            selectable: false,
            evented: false,
            objectCaching: false,
            perPixelTargetFind: true,
            hoverCursor: 'none',
            id: uuid(),
          });
          el.add(tempLine);
        } else {
          if (isLineIntersectPolyline(curPointer.x, curPointer.y, false, 0)) {
            return;
          }
          // 检测是否接近起点，如果是则闭合多边形
          if (checkIsStartPoint(event)) {
            // 移除临时线段
            if (curObject.value) {
              curObject.value = null;
            }
            removeEl();
            // 形成闭合多边形
            const polygon = new fabric.Polygon(polygonPoints.map(p => ({ x: p.x, y: p.y })), {
              fill: 'rgba(0, 0, 255, 0.3)',
              stroke: 'rgba(0,0,255,1)',
              strokeWidth: 1,
              id: uuid(),
              strokeUniform: true,
              objectCaching: false,
              perPixelTargetFind: true,
              selectable: true,
              lockSkewingX: true,
              lockSkewingY: true
            });
            el.add(polygon);
            polygonPoints = [];
            tempLine = null;
            el.renderAll();
            return;
          }
          if (checkHasRepeatPoint(event)) return;
          polygonPoints.push(point);
          const previousPoint = polygonPoints[polygonPoints.length - 2];
          const line = new fabric.Line([previousPoint.x, previousPoint.y, point.x, point.y], {
            stroke: 'rgba(0,0,255,1)',
            fill: 'rgba(0,0,255,0.3)',
            selectable: false,
            objectCaching: false,
            hoverCursor: 'none',
            id: uuid(),
          });
          el.add(line);
        }
        break;
      }
      default:
        break;
    }
  };
  const mousemove = throttle((event: fabric.IEvent<MouseEvent>) => {
    const { e } = event;
    const el = canvas.value!;
    if (!isDrawing.value) return;
    if (
      curTool.value === ''
    ) return;
    switch (curTool.value) {
      case BOXES_TYPE_ENUM.RECT: {
        if (!curObject.value) return;
        el.discardActiveObject();
        const activeObject = el.getActiveObject();
        if (activeObject) return;
        // 后续根据拖拽调整矩形宽高
        let { x, y } = el.getPointer(event.e);
        if (x < 0) {
          x = 0;
        }
        if (y < 0) {
          y = 0;
        }
        if (x > workspaceConfig.value.width) {
          x = workspaceConfig.value.width;
        }
        if (y > workspaceConfig.value.height) {
          y = workspaceConfig.value.height;
        }
        // 以x,y轴最小的点为x,y轴的起始点
        const left = Math.min(x, pointer.value.x);
        const top = Math.min(y, pointer.value.y);
        // 计算新的宽、高
        let width = Math.abs(x - pointer.value.x);
        let height = Math.abs(y - pointer.value.y);
        // 如果是按住shift键 则绘制正方形
        if (event.e.shiftKey) {
          // 如果x轴的结束点大于起始点 则以最长边为正方形长宽
          if (x > pointer.value.x) {
            width = Math.max(width, height);
            height = Math.max(width, height);
          } else {
            // 如果x轴的结束点小于起始点 则以最短边为正方形长宽 否则会导致位置错误
            width = Math.min(width, height);
            height = Math.min(width, height);
          }
        }
        curObject.value.set({
          left,
          top,
          width,
          height,
        });
        el.renderAll();
        break;
      }
      case BOXES_TYPE_ENUM.POLYGON: {
        if (!tempLine) return;
        const { x, y } = el.getPointer(event.e);
        const originPoint = polygonPoints!.at(-1)!;
        if (checkIsStartPoint(event)) {
          event?.target?.setOptions({
            hoverCursor: 'pointer',
          });
        } else if (isLineIntersectPolyline(x, y, false)) {
          event?.target?.setOptions({
            hoverCursor: 'not-allowed',
          });
        } else {
          event?.target?.setOptions?.({
            hoverCursor: 'auto',
          });
        }
        tempLine!.setOptions({
          x2: x,
          y2: y,
          x1: originPoint.x,
          y1: originPoint.y,
        });
        el.renderAll();
        break;
      }
      default:
        break;
    }
  }, 30);
  const mouseup = (event: fabric.IEvent<MouseEvent>) => {
    if (curTool.value === '') return;
    if (!isDrawing.value) return;
    curObject.value?.setCoords();
    // 如果宽度为0 则移除元素 因为正方形 矩形等宽度为0可以视为无效
    if (curObject.value?.width === 0) {
      canvas.value?.remove(curObject.value);
    } else {
      // 否则主动通知元素已经改变
      canvas.value?.fire('object:modified');
    }
    if (curTool.value === BOXES_TYPE_ENUM.RECT) {
      canvas.value?.discardActiveObject();
      curObject.value = null;
      isDrawing.value = false;
    }
    canvas.value?.renderAll();
  };
  const mouseDbClick = (event: fabric.IEvent<MouseEvent>) => {
    const el = canvas.value!;
    // 至少需要3个点形成多边形
    if (polygonPoints.length < 3) return;
    if (isLineIntersectPolyline(polygonPoints[0].x, polygonPoints[0].y, true)) {
      ElMessage.warning('多边形框选的区域异常');
      return;
    }
    if (checkIsStartPoint(event)) {
      const curPointer = el.getPointer(event.e);
      const point = new fabric.Point(curPointer.x, curPointer.y);
      // 添加点到多边形顶点数组
      polygonPoints.push(point);
    }
    // 移除临时线段
    if (curObject.value) {
      el.remove(curObject.value);
      curObject.value = null;
    }
    // 形成闭合多边形
    const polygon = new fabric.Polygon(polygonPoints.map(p => ({ x: p.x, y: p.y })), {
      fill: 'rgba(0, 0, 255, 0.3)',
      stroke: 'rgba(0,0,255,1)',
      strokeWidth: 1,
      id: uuid(),
      strokeUniform: true,
      objectCaching: false,
      perPixelTargetFind: true,
      selectable: true,
      lockSkewingX: true,
      lockSkewingY: true
    });
    el.add(polygon);
    const linesObject = el.getObjects('line');
    el.remove(...linesObject);
    // 清空顶点数组，准备下次绘制
    polygonPoints = [];
    tempLine = null;
    el.renderAll();
  };
  const init = () => {
    destroy();
    canvas.value?.on('mouse:down', mousedown);
    canvas.value?.on('mouse:move', mousemove);
    canvas.value?.on('mouse:up', mouseup);
    canvas.value?.on('mouse:dblclick', mouseDbClick);
  };
  const destroy = () => {
    canvas.value?.off('mouse:down', mousedown as any);
    canvas.value?.off('mouse:move', mousemove as any);
    canvas.value?.off('mouse:up', mouseup as any);
    canvas.value?.off('mouse:dblclick', mouseDbClick as any);
  };
  return {
    init,
    isDrawing,
    handleChangeTool,
    curTool,
  };
};
