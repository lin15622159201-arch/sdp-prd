<script lang="ts" setup>
import { getImageSize } from '@/components/photo-editor/utils';
import { fabric } from 'fabric';
import { onMounted, shallowRef, watch } from 'vue';
import { changeControlStyle, updateMaskInnerClipPath } from './flower-canvas-utils';
import Cropzone from './CropZone';
import { IFloralPrintExtractionCreateReqBoxSelectionCoordinates } from '../../api/type';

const props = defineProps({
  /**
   * 原图url
   */
  originImgUrl: {
    type: String,
    default: ''
  },
  /** 是否可以编辑选区 */
  isEdit: {
    type: Boolean,
    default: false
  },
  canvasWidth: {
    type: Number,
    default: 300,
  },
  canvasHeight: {
    type: Number,
    default: 300,
  }
});

/**
 * 裁剪框的最小宽度和高要根据图片的缩放比例，相应的调整
 */
const MIN_CROP_WIDTH = 160;
const MIN_CROP_HEIGHT = 160;

const canvas = shallowRef<fabric.Canvas>();
/**
 * 编辑状态下的选区
 */
const selectedArea = shallowRef<fabric.Rect>();
/** 查看状态下的选区：无边框的一个矩形 */
const showSelectedArea = shallowRef<fabric.Rect>();
const image = shallowRef<fabric.Image>();

// 遮罩元素
const darkMaskRect = shallowRef<fabric.Rect>();

/**
 * 图片宽高等比缩放到canvas中
 * 以高度为基准，然后在宽度
 */
const getScaleImg = async () => {
  const { canvasHeight, canvasWidth, originImgUrl } = props;
  let scaleX = 1;
  let scaleY = 1;
  const { width, height } = await getImageSize(originImgUrl);
  const imgAspectRatio = width / height;
  if (height > canvasHeight) {
    scaleY = canvasHeight / height;
    scaleX = ((height * scaleY) * imgAspectRatio) / width;
    if (scaleX * width > canvasWidth) {
      scaleX = canvasWidth / width;
    }
  } else if (width > canvasWidth) {
    scaleX = canvasWidth / width;
    scaleY = ((width * scaleX) / imgAspectRatio) / height;
    if (scaleY * height > canvasHeight) {
      scaleY = canvasHeight / height;
    }
  }
  return {
    scaleX,
    scaleY,
    width,
    height,
  };
};

const initImg = async () => new Promise((resolve) => {
  const { originImgUrl, canvasWidth, canvasHeight } = props;
  fabric.Image.fromURL(
    originImgUrl,
    async (img) => {
      // 根据canvasHeight，进行缩放图片
      const { scaleX, scaleY, width, height } = await getScaleImg();
      console.log(scaleX);
      img.set({
        left: (canvasWidth - width * scaleX) / 2,
        top: (canvasHeight - height * scaleY) / 2,
        scaleX,
        scaleY,
        hoverCursor: 'default',
        selectable: false,
        hasControls: false,
        hasBorders: false,
      });
      console.log('image==', img);
      image.value = img;
      canvas.value?.add(img);
      canvas.value?.renderAll();
      resolve(img);
    },
    {
      crossOrigin: 'anonymous',
    },
  );
});

const initDarkMask = async () => {
  if (!image.value) {
    image.value = (await initImg() as fabric.Image);
  }
  const { left = 0, top = 0, width = 0, height = 0, scaleX = 1, scaleY = 1 } = image.value!;
  darkMaskRect.value = new fabric.Rect({
    left,
    top,
    width: width * scaleX,
    height: height * scaleY,
    fill: 'rgba(0, 0, 0, 0.4)',
    selectable: false,
    evented: false,
  });
  canvas.value?.add(darkMaskRect.value);
};

const getRectInfoByCoordinates = (
  { xmax, xmin, ymax, ymin }: IFloralPrintExtractionCreateReqBoxSelectionCoordinates
) => {
  const { scaleX = 1, scaleY = 1, top: imgT = 0, left: imgL = 0, width: imgW = 0, height: imgH = 0 } = image.value!;
  let top = ymin > 0 ? ymin * scaleY + imgT : imgT;
  let left = xmin > 0 ? xmin * scaleX + imgL : imgL;
  const minWidth = MIN_CROP_WIDTH * scaleX;
  const minHeight = MIN_CROP_HEIGHT * scaleY;
  const realW = (xmax - xmin) * scaleX;
  const realH = (ymax - ymin) * scaleY;
  let width = realW > 0 ? realW : minWidth;
  let height = realH > 0 ? realH : minHeight;
  const realImgW = imgW * scaleX;
  const realImgH = imgH * scaleY;

  // 如果裁剪框的宽度+x坐标超出了图片的宽度，则将裁剪框的宽度设置为图片的宽度 - 裁剪框的x坐标
  if (left + width > (realImgW + imgL)) {
    width = minWidth;
    left = realImgW + imgL - minWidth;
  }
  if (top + height > (realImgH + imgT)) {
    height = minHeight;
    top = realImgH + imgT - minHeight;
  }

  return {
    minWidth,
    minHeight,
    width,
    height,
    top,
    left,
  };
};

/**
 * 初始化编辑的裁剪框
 */
const initSelectedArea = (coordinates: IFloralPrintExtractionCreateReqBoxSelectionCoordinates) => {
  const { left, top, width, height, minHeight, minWidth } = getRectInfoByCoordinates(coordinates);
  selectedArea.value = new Cropzone(canvas.value!, darkMaskRect.value!, image.value!, {
    left,
    top,
    width,
    height,
    maxWidth: 300,
    maxHeight: 300,
    minWidth,
    minHeight,
    strokeWidth: 0,
    cornerSize: 16,
    fill: 'transparent',
    hasRotatingPoint: false,
    hasBorders: false,
    lockScalingFlip: true,
    lockRotation: true,
    lockSkewingX: true,
    lockSkewingY: true,
    cornerStyle: 'circle',
    cornerStrokeColor: 'blue',
    transparentCorners: false,
    lineWidth: 1,
    borderColor: 'blue',
  });
  console.log('selectedArea', selectedArea.value);
  selectedArea.value?.setControlVisible('mtr', false); // 隐藏旋转控制点
  changeControlStyle(selectedArea.value!);
  canvas.value!.setActiveObject(selectedArea.value!);
  canvas.value?.add(selectedArea.value!);
};

/**
 * 初始化仅查看时候的选区
 */
const initShowSelectedArea = async (coordinates: IFloralPrintExtractionCreateReqBoxSelectionCoordinates) => {
  const { left, top, width, height } = getRectInfoByCoordinates(coordinates);
  showSelectedArea.value = new fabric.Rect({
    left,
    top,
    width,
    height,
    fill: 'transparent',
    strokeWidth: 0,
    inverted: true,
    hasControls: false,
    hasBorders: false,
    lockMovementX: true,
    lockMovementY: true,
    selectable: false,
  });
  updateMaskInnerClipPath(showSelectedArea.value, darkMaskRect.value!);
  canvas.value?.add(showSelectedArea.value);
};

/**
 * 初始化识别区域
 */
const initCoordinates = async (coordinates: IFloralPrintExtractionCreateReqBoxSelectionCoordinates) => {
  const { isEdit } = props;
  await initDarkMask();
  if (isEdit) {
    initSelectedArea(coordinates);
  } else {
    initShowSelectedArea(coordinates);
  }
  canvas.value?.renderAll();
};

/**
 * 修复详情中原图裁剪框显示的问题
 * @param coordinates 坐标
 */
const watchImgAndCoordinates = (coordinates: IFloralPrintExtractionCreateReqBoxSelectionCoordinates) => {
  watch(
    () => [image.value, coordinates],
    () => {
      initCoordinates(coordinates);
    },
    {
      immediate: true,
      deep: true,
    }
  );
};

/**
 * 初始化
 */
const initCanvas = async () => {
  canvas.value = new fabric.Canvas('flower-img-canvas', {
    width: props.canvasWidth,
    height: props.canvasHeight,
    selection: false,
    preserveObjectStacking: true,
    backgroundColor: '#EFF0F5',
  });
  if (props.originImgUrl) {
    await initImg();
  }
  canvas.value.renderAll();
};

/**
 * 获取当前裁剪区域，返回给接口
 * 基于图片的左上角为坐标起点
 */
const saveCropInfo = () => {
  const { left = 0, top = 0, width, height } = selectedArea.value!.getBoundingRect(false, true);
  console.log(left, top, width, height);
  const { scaleX = 1, scaleY = 1, left: imgL = 0, top: imgT = 0 } = image.value!;
  const xmin = Math.ceil((left - imgL) / scaleX);
  const xmax = Math.ceil((left - imgL + width) / scaleX);
  const ymin = Math.ceil((top - imgT) / scaleY);
  const ymax = Math.ceil((top - imgT + height) / scaleY);
  return {
    xmin,
    xmax,
    ymin,
    ymax,
  };
};

onMounted(() => {
  initCanvas();
});

defineExpose({
  initCanvas,
  initCoordinates,
  saveCropInfo,
  watchImgAndCoordinates
});

</script>

<template>
  <div class="flower-img-canvas-wrapper">
    <canvas
      id="flower-img-canvas"
      :width="canvasWidth"
      :height="canvasHeight"
    />
  </div>
</template>

<style lang="scss" scope>
//
</style>
