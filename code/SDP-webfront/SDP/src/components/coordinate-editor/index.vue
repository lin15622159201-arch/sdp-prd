<template>
  <div class="coordinate_editor_container">
    <Tools
      v-model="curTool"
      @change="handleChangeTool"
      v-if="showTools"
    />
    <div class="main">
      <div id="workspace" ref="workspaceEl">
        <canvas ref="canvasEl" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, PropType } from 'vue';
import Tools from './tools.vue';
import { useControls } from './hooks/useControls';
import { useBasic } from './hooks/useBasic';
import { fabric } from 'fabric';
import { BOXES_TYPE_ENUM } from './constant';
import { ElMessage } from 'element-plus';
import { IData } from './types';
import { isEmpty } from '@toy/utils';

interface ObjectWithId {
  type: string;
  id?: string;
}
const props = defineProps({
  data: {
    type: Object as PropType<IData>,
    required: true,
  },
  showTools: {
    type: Boolean,
    default: true,
  },
  defaultTool: {
    type: Number as PropType<BOXES_TYPE_ENUM>,
  }
});
const {
  init: initBasic,
  workspaceEl,
  fabricEl,
  canvasEl,
  initEvent,
  imgZoomRatio,
  drawInit,
  curTool,
  handleChangeTool
} = useBasic();
const { init: initControls } = useControls({ canvas: fabricEl });
// 点击提交
const getPoints = () => {
  const json = fabricEl.value?.toJSON([
    'id',
    'gradientAngle',
    'hasControls',
    'arrowWidth',
    'objectCaching'
  ])!;
  let points: { x: number; y: number; }[] = [];

  const isPolygon = json.objects.some(v => v.type === 'polygon');
  if (!isPolygon) {
    // const rect = json.objects
    //   .find(v => v.type === 'rect'
    //     && !['workspace', 'bg'].includes(v.id!))! as unknown as InstanceType<typeof fabric.Rect>;
    const rect = (json.objects as ObjectWithId[])
      .find(v => v.type === 'rect'
        && v.id && !['workspace', 'bg'].includes(v.id))! as unknown as InstanceType<typeof fabric.Rect>;
    if (!rect) {
      ElMessage.error('请框选素材区域');
      throw new Error('请框选素材区域');
    }
    const { width, height, left, top, scaleX, scaleY } = rect;
    points = [
      { x: left!, y: top! },
      { x: left! + (width! * scaleX!), y: top! + (height! * scaleY!) },
    ];
    if (Math.abs(points[0].x - points[1].x) * Math.abs(points[0].y - points[1].y) < 500) {
      ElMessage.error('框选的区域过小，请重新框选');
      throw new Error('框选的区域过小，请重新框选');
    }
  } else {
    const polygon = json.objects.find(v => v.type === 'polygon')! as unknown as InstanceType<typeof fabric.Polygon>;
    if (!polygon) {
      ElMessage.error('请框选素材区域');
      throw new Error('请框选素材区域');
    }
    const { left, top, scaleX, scaleY, flipX, flipY } = polygon;
    const minLeft = Math.min(...polygon.points!.map(v => v.x));
    const minTop = Math.min(...polygon.points!.map(v => v.y));
    const maxLeft = Math.max(...polygon.points!.map(v => v.x));
    const maxTop = Math.max(...polygon.points!.map(v => v.y));
    polygon.points!.forEach((v) => {
      const { x, y } = v;
      let pointX = 0;
      let pointY = 0;
      if (flipX) {
        if (x === maxLeft) {
          pointX = left!;
        } else {
          pointX = left! + (maxLeft - x) * scaleX!;
        }
      } else if (x === minLeft) {
        pointX = left!;
      } else {
        pointX = left! + (x - minLeft) * scaleX!;
      }
      if (flipY) {
        if (y === maxTop) {
          pointY = top!;
        } else {
          pointY = top! + (maxTop - y) * scaleY!;
        }
      } else if (y === minTop) {
        pointY = top!;
      } else {
        pointY = top! + (y - minTop) * scaleY!;
      }
      points.push({
        x: pointX,
        y: pointY
      });
    });
    // 回到原点 闭合多边形
    points.push(points[0]);
    if (
      (Math.max(...points.map(v => v.x)) - Math.min(...points.map(v => v.x)))
      * (
        Math.max(...points.map(v => v.y)) - Math.min(...points.map(v => v.y))
      ) < 500
    ) {
      ElMessage.error('框选的区域过小，请重新框选');
      throw new Error('框选的区域过小，请重新框选');
    }
  }
  return {
    boxesType: isPolygon ? BOXES_TYPE_ENUM.POLYGON : BOXES_TYPE_ENUM.RECT,
    boxesList: points.map(v => ({
      x: v.x / imgZoomRatio.value,
      y: v.y / imgZoomRatio.value
    })),
  };
};
onMounted(async () => {
  await initBasic(props.data);
  await initControls();
  await drawInit();
  await initEvent();
  if (!isEmpty(props.defaultTool)) {
    await handleChangeTool(props.defaultTool!);
  }
});
const getClipImage = () => {
  return new Promise((resolve) => {
    // 创建一个离屏 Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const { boxesList, boxesType } = getPoints();
    let points = boxesList;
    if (boxesType === BOXES_TYPE_ENUM.RECT) {
      points = [
        {
          x: points[0].x,
          y: points[0].y,
        },
        {
          x: points[1].x,
          y: points[0].y,
        },
        {
          x: points[1].x,
          y: points[1].y,
        },
        {
          x: points[0].x,
          y: points[1].y,
        },
      ];
    }
    const minX = Math.min(...points.map(v => v.x));
    const minY = Math.min(...points.map(v => v.y));
    const maxX = Math.max(...points.map(v => v.x));
    const maxY = Math.max(...points.map(v => v.y));
    const canvasWidth = maxX - minX;
    const canvasHeight = maxY - minY;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.beginPath();
    ctx.moveTo(points[0].x - minX, points[0].y - minY);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x - minX, points[i].y - minY);
    }
    ctx.closePath();
    ctx.clip();
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = props.data.referencePicture;
    img.onload = () => {
      ctx.drawImage(
        img,
        -minX,
        -minY,
      );
      const base64 = canvas.toDataURL()!;
      resolve(base64);
    };
  });
};
defineExpose({
  getPoints,
  getClipImage
});
</script>
<style lang="scss" scoped>
.coordinate_editor_container {
  display: flex;
  width: 100%;
  height: 100%;
  .main {
    position: relative;
    flex: 1;
    min-width: 0;
    padding: 10px;
    #workspace {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
