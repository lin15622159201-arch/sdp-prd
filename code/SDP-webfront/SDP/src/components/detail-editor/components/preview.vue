<template>
  <div class="preview">
    <canvas
      ref="previewCanvasEl"
      id="preview-canvas"
      width="600"
      height="600"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, watch, onMounted } from 'vue';
import { DISPOSE_MASK_ENUM } from '../types';
import { imageToImageData } from '@/core/utils/image';

const props = defineProps({
  // mask图
  maskUrl: {
    type: String,
    required: true,
  },
  // 处理方式
  disposeType: {
    type: String as PropType<DISPOSE_MASK_ENUM>,
    required: true,
  },
  // 待处理图
  disposeImageData: {
    type: ImageData,
    required: false,
  }
});
const previewCanvasEl = ref<HTMLCanvasElement>();
const renderImageData = (imageData: ImageData) => {
// 创建一个临时 canvas，用于存放 ImageData
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
  const targetCtx = previewCanvasEl.value!.getContext('2d') as CanvasRenderingContext2D;

  // 设置临时 canvas 的宽高与 ImageData 相同
  const { width: imageWidth, height: imageHeight } = imageData;
  tempCanvas.width = imageWidth;
  tempCanvas.height = imageHeight;

  // 将 ImageData 渲染到临时 canvas 上
  tempCtx.putImageData(imageData, 0, 0);

  const { width: targetWidth, height: targetHeight } = previewCanvasEl.value!;
  const scale = Math.min(targetWidth / imageWidth, targetHeight / imageHeight);

  const scaledWidth = Math.floor(imageWidth * scale);
  const scaledHeight = Math.floor(imageHeight * scale);

  const xDiff = Math.floor((targetWidth - scaledWidth) / 2);
  const yDiff = Math.floor((targetHeight - scaledHeight) / 2);
  // 使用 drawImage 将临时 canvas 绘制到目标 canvas 上，并进行缩放
  targetCtx.drawImage(tempCanvas, xDiff, yDiff, scaledWidth, scaledHeight);
};
const mergeMask = async () => {
  const referenceImageData = await imageToImageData(props.maskUrl);
  if (!props.disposeImageData) {
    renderImageData(referenceImageData);
    return;
  }
  const disposeData = props.disposeImageData.data;
  const disposeDataLength = disposeData.length;
  const referenceData = referenceImageData.data;
  const isRemove = props.disposeType === DISPOSE_MASK_ENUM.REMOVE;

  for (let i = 0; i < disposeDataLength; i += 4) {
    const disposeR = disposeData[i];
    const disposeG = disposeData[i + 1];
    const disposeB = disposeData[i + 2];

    // 非黑色，需要处理的点
    if (!(disposeR === 0 && disposeG === 0 && disposeB === 0)) {
      const referenceR = referenceData[i];
      const referenceG = referenceData[i + 1];
      const referenceB = referenceData[i + 2];
      if (isRemove) {
        if (referenceR === 255 && referenceG === 255 && referenceB === 255) {
          // 直接减去即可
          referenceData[i] = Math.abs(disposeR - referenceR);
          referenceData[i + 1] = Math.abs(disposeG - referenceG);
          referenceData[i + 2] = Math.abs(disposeB - referenceB);
        } else {
          referenceData[i] = 0;
          referenceData[i + 1] = 0;
          referenceData[i + 2] = 0;
        }
      } else {
        referenceData[i] = Math.min(disposeR + referenceR, 255);
        referenceData[i + 1] = Math.min(disposeG + referenceG, 255);
        referenceData[i + 2] = Math.min(disposeB + referenceB, 255);
      }
    }
  }

  // 渲染 referenceData
  renderImageData(referenceImageData);
};

watch(() => [props.maskUrl, props.disposeType, props.disposeImageData], () => {
  mergeMask();
});
onMounted(() => {
  mergeMask();
});
</script>

<style scoped lang="scss">
.preview {
  width: 300px;
  height: 300px;
  overflow: hidden;
}
#preview-canvas {
  width: 600px;
  height: 600px;
  scale: 0.5; // 保证图片质量
  transform: translate(-50%, -50%);
}
</style>
