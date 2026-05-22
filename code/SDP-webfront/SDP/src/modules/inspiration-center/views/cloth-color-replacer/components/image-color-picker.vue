<template>
  <el-dialog
    v-model="visible"
    title="图片取色"
    fullscreen
    @close="handleClose"
  >
    <div class="tw-flex tw-items-center tw-gap-4">

      <!-- 上传或展示图片 -->
      <div class="tw-flex-1 tw-min-w-0">
        <div class="title">花型图案</div>
        <div class="image-container">
          <el-upload
            v-if="!imageSrc"
            class="uploader tw-h-full tw-w-full"
            drag
            :auto-upload="false"
            :show-file-list="false"
            accept="image/*"
            @change="handleUpload"
          >
            <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
            <div class="el-upload__text">
              拖拽图片到此或 <em>点击上传</em>
            </div>
          </el-upload>

          <div
            v-else
            class="canvas-wrapper"
          >
            <!-- 画布渲染图片 -->
            <canvas
              ref="canvasRef"
              class="tw-max-h-full cursor-picker"
              @click="handlePickColor"
              @mousemove="handleMouseMove"
              @mouseleave="showPreview = false"
            />
            <!-- 颜色预览框 -->
            <div
              v-show="showPreview"
              class="color-preview"
              :style="{
                left: `${previewPos.x + 12}px`,
                top: `${previewPos.y + 12}px`,
                backgroundColor: hoverColor
              }"
            >
              {{ hoverColor }}
            </div>
          </div>
        </div>
      </div>

      <!-- 取色结果 -->
      <div class="tw-flex-1">
        <div class="title">预览图</div>
        <div
          class="image-container border"
          :style="{ backgroundColor: pickedColor || 'transparent' }"
        >{{ pickedColor ? '' : '请从左边图片中取色' }}</div>
      </div>
    </div>

    <template #footer>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';

interface Props {
  modelValue: boolean;
  url?: string;
}

const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue', 'confirm']);

const visible = ref(props.modelValue);
const imageSrc = ref<string | null>(props.url || null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const pickedColor = ref<string | null>(null);
const hoverColor = ref('');
const showPreview = ref(false);
const previewPos = ref({ x: 0, y: 0 });

/** 渲染图片到 canvas */
const drawImageToCanvas = () => {
  if (!canvasRef.value || !imageSrc.value) return;
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d')!;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imageSrc.value;
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.style.height = 'auto';
    canvas.style.width = 'auto';
  };
};

watch(
  () => props.modelValue,
  async (val) => {
    visible.value = val;
    if (val && props.url) {
      imageSrc.value = props.url;
      await nextTick();
      drawImageToCanvas();
    } else {
      imageSrc.value = '';
    }
  }
);

watch(visible, val => emits('update:modelValue', val));

/** 上传图片 */
const handleUpload = (file: any) => {
  const { raw } = file;
  if (!raw) return;
  imageSrc.value = URL.createObjectURL(raw);
  nextTick(drawImageToCanvas);
};


/** 工具函数：根据鼠标事件获取颜色 */
const getColorFromCanvas = (e: MouseEvent) => {
  if (!canvasRef.value) return '';
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d')!;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
};

/** 点击吸色 */
const handlePickColor = (e: MouseEvent) => {
  const color = getColorFromCanvas(e);
  if (color) pickedColor.value = color;
};

/** 悬停实时预览 */
const handleMouseMove = (e: MouseEvent) => {
  const color = getColorFromCanvas(e);
  if (color) hoverColor.value = color;
  previewPos.value = { x: e.clientX, y: e.clientY };
  showPreview.value = true;
};

/** 关闭 */
const handleClose = () => {
  visible.value = false;
  pickedColor.value = null;
};

/** 确认取色 */
const handleConfirm = () => {
  if (!pickedColor.value) {
    ElMessage.warning('请先选择颜色');
    return;
  }
  emits('confirm', pickedColor.value);
  visible.value = false;
};
</script>

<style lang="scss" scoped>
.uploader {
  :deep(.el-upload) {
    height: 100%;
    .el-upload-dragger {
      height: 100%;
      padding-top: 200px;
    }
  }
}
.title {
  margin-bottom: 8px;
}
.image-container {
  display: flex;
  max-height: calc(100vh - 200px);
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}
.border {
  border: 1px solid var(--el-border-color);
}
.cursor-picker {
  cursor: url('@/assets/pick-color.svg') 8 8, crosshair;
}
.canvas-wrapper {
  display: flex;
  position: relative;
  background-color: #000;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.color-preview {
  position: fixed;
  z-index: 1000;
  padding: 4px 6px;
  border: 1px solid #ddd;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  pointer-events: none; /* 防止挡鼠标 */
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}
</style>
