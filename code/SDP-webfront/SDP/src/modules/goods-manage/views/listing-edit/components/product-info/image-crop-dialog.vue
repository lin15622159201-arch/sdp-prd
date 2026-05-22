<!-- 调整尺寸弹框 -->
<template>
  <el-dialog
    v-model="visible"
    title="调整尺寸"
    width="1020px"
    top="5vh"
    :close-on-click-modal="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="crop-dialog-content">
      <div
        class="crop-area"
        v-loading="imageLoading"
        element-loading-text="图片加载中，请稍后..."
      >
        <!-- 输入比例 -->
        <div class="crop-header">
          <span class="tw-mr-8">temu 比例 {{ type === 'materialImage' ? '1:1' : '3:4' }}</span>
          <span>宽:</span>
          <el-input-number
            v-model="inputWidth"
            v-bind="numberInputProps"
            class="size-input"
            placeholder="宽"
            disabled
            @change="handleSizeChange"
          />
          <span>高:</span>
          <el-input-number
            v-model="inputHeight"
            v-bind="numberInputProps"
            class="size-input"
            placeholder="高"
            disabled
            @change="handleSizeChange"
          />
        </div>

        <div
          ref="containerRef"
          class="crop-content"
        >
          <div
            class="image-wrapper"
            :style="{
              width: `${imageWidth}px`,
              height: `${imageHeight}px`,
            }"
          >
            <img
              v-if="imageUrl"
              ref="imageRef"
              class="tw-block tw-w-full tw-h-full"
              :src="imageUrl"
              draggable="false"
              :style="{
                transform: `translate(${offsetX}px, ${offsetY}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }"
              @load="handleImageLoaded"
              @mousedown="handleMouseDown"
              @mousemove="handleMouseMove"
              @mouseup="handleMouseUp"
              @mouseleave="handleMouseUp"
            >
            <div
              class="crop-mask"
              :style="{
                width: `${displayCropWidth}px`,
                height: `${displayCropHeight}px`,
              }"
            />
          </div>
        </div>
      </div>

      <!-- 图片列表缩略图 -->
      <div class="image-list">
        <div
          v-for="(item, index) in pictureList"
          :key="index"
          class="thumbnail-item"
          :class="{ active: currentIndex === index }"
          @click="selectPicture(index)"
        >
          <el-image
            :src="item.url"
            :alt="`缩略图${index + 1}`"
            fit="contain"
            class="tw-w-full tw-h-full"
          />
          <div class="size-text">{{ `${item.naturalWidth || '--'} x ${item.naturalHeight || '--'}` }}</div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, computed, nextTick } from 'vue';
import { InputNumberProps, ElLoading } from 'element-plus';
import { baseUrlToHttpUrl } from '@/core/utils/image';
import { useImageSize } from '../../hooks/use-image-size';

interface CropData {
  url: string;
  offsetX: number;
  offsetY: number;
  naturalWidth?: number;
  naturalHeight?: number;
  originUrl?: string; /** 裁剪前的图片地址 */
}

const { getImageSize } = useImageSize();

const props = defineProps<{
  modelValue: boolean;
  images?: { url: string; originUrl?: string; }[];
  type?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'confirm': [data: CropData[]];
}>();

const visible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
});

const numberInputProps: Partial<InputNumberProps> = {
  min: 1,
  max: 9999,
  controls: false,
  size: 'small',
};

// 容器引用
const containerRef = ref<HTMLDivElement>();

// 裁剪区域尺寸
const cropWidth = ref(props.type === 'materialImage' ? 1000 : 1340);
const cropHeight = ref(props.type === 'materialImage' ? 1000 : 1785);
const inputWidth = ref(cropWidth.value);
const inputHeight = ref(cropHeight.value);

// 缩放比例
const scale = ref(1);

// 显示尺寸（缩放后）
const displayCropWidth = computed(() => cropWidth.value * scale.value);
const displayCropHeight = computed(() => cropHeight.value * scale.value);

// 当前图片索引
const currentIndex = ref(0);

// 图片列表数据
const pictureList = ref<CropData[]>([]);

// 当前图片
const imageUrl = computed(() => pictureList.value[currentIndex.value]?.url || '');

// 图片实际显示尺寸
const imageWidth = ref(0);
const imageHeight = ref(0);

// 拖拽状态
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const offsetX = ref(0);
const offsetY = ref(0);
const imageLoading = ref(false);

// 计算缩放比例
const calculateScale = () => {
  if (!containerRef.value) return;

  const containerWidth = containerRef.value.clientWidth;
  const containerHeight = containerRef.value.clientHeight;

  const scaleX = containerWidth / cropWidth.value;
  const scaleY = containerHeight / cropHeight.value;

  // 取较小的缩放比例，确保裁剪框不超出容器，且至少有一条边撑满
  scale.value = Math.min(scaleX, scaleY);
};

// 预加载所有缩略图尺寸
const preloadImageSize = async () => {
  const jobs = pictureList.value.map(async (item, index) => {
    try {
      const imageSize = await getImageSize(item.url);
      if (!imageSize) return;
      const { width, height } = imageSize;
      pictureList.value[index].naturalWidth = width;
      pictureList.value[index].naturalHeight = height;
    } catch (err) {
      console.warn('getImageSize failed', err);
    }
  });
  await Promise.all(jobs);
};

// 居中图片
const centerImageInMask = () => {
  offsetX.value = 0;
  offsetY.value = 0;
};

// 恢复图片上次位置
const restoreImagePosition = () => {
  const current = pictureList.value[currentIndex.value];
  offsetX.value = current.offsetX;
  offsetY.value = current.offsetY;
};

// 已加载的图片 URL 集合
const loadedImageUrls = new Set<string>();
// 图片加载完成
const handleImageLoaded = () => {
  imageLoading.value = false;
  loadedImageUrls.add(imageUrl.value);
};

// 加载当前图片，让图片相对长边填满容器
const loadCurrentImage = async (resetOffset = false) => {
  if (!imageUrl.value) return;
  if (!containerRef.value) return;

  if (!loadedImageUrls.has(imageUrl.value)) {
    // 没有加载过，显示加载中状态
    imageLoading.value = true;
  }

  try {
    // 使用 useImageSize 快速获取尺寸，无需等待完整加载
    const imageSize = await getImageSize(imageUrl.value);
    if (!imageSize) {
      imageLoading.value = false;
      return;
    }

    const { width, height } = imageSize;

    // 计算图片缩放比例，确保裁剪框至少一条边贴紧容器
    const scaleX = width / displayCropWidth.value;
    const scaleY = height / displayCropHeight.value;

    const imageScale = Math.min(scaleX, scaleY);

    imageWidth.value = width / imageScale;
    imageHeight.value = height / imageScale;

    if (resetOffset) {
      // 没有初始化
      centerImageInMask();
    } else {
      // 恢复之前的裁剪框偏移
      restoreImagePosition();
    }
  } catch (error) {
    console.warn('获取图片尺寸失败', error);
    imageLoading.value = false;
  }
};

// 选择缩略图
const selectPicture = (index: number) => {
  // 保存当前图片的偏移
  if (pictureList.value[currentIndex.value]) {
    pictureList.value[currentIndex.value].offsetX = offsetX.value;
    pictureList.value[currentIndex.value].offsetY = offsetY.value;
  }

  currentIndex.value = index;
  loadCurrentImage();
};

// 尺寸变化
const handleSizeChange = () => {
  cropWidth.value = inputWidth.value;
  cropHeight.value = inputHeight.value;
  calculateScale();
  nextTick(() => {
    loadCurrentImage(true);
  });
};

// 鼠标拖拽
const handleMouseDown = (e: MouseEvent) => {
  isDragging.value = true;
  dragStartX.value = e.clientX - offsetX.value;
  dragStartY.value = e.clientY - offsetY.value;
  e.stopPropagation();
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return;
  if (!containerRef.value) return;

  const newOffsetX = e.clientX - dragStartX.value;
  const newOffsetY = e.clientY - dragStartY.value;

  // 限制偏移范围，防止图片移出裁剪框
  const maxOffsetX = (imageWidth.value - displayCropWidth.value) / 2;
  const maxOffsetY = (imageHeight.value - displayCropHeight.value) / 2;
  const minOffsetX = -maxOffsetX;
  const minOffsetY = -maxOffsetY;
  offsetX.value = Math.min(Math.max(newOffsetX, minOffsetX), maxOffsetX);
  offsetY.value = Math.min(Math.max(newOffsetY, minOffsetY), maxOffsetY);
};

const handleMouseUp = () => {
  if (isDragging.value) {
    // 保存当前偏移（转换回原始尺寸）
    pictureList.value[currentIndex.value].offsetX = offsetX.value / scale.value;
    pictureList.value[currentIndex.value].offsetY = offsetY.value / scale.value;
  }
  isDragging.value = false;
};

const handleOpen = async () => {
  const { images } = props;
  if (images && images.length > 0) {
    pictureList.value = images.map(item => ({
      ...item,
      url: item.url || item.originUrl!,
      originUrl: item.originUrl || item.url,
      offsetX: 0,
      offsetY: 0,
    }));
    preloadImageSize();
    await nextTick();
    calculateScale();
    loadCurrentImage(true);
  }
};

// 关闭弹框
const handleClose = () => {
  visible.value = false;
  pictureList.value = [];
  currentIndex.value = 0;
};
const compressImage = (canvas: HTMLCanvasElement, quality: number): string => {
  const dataUrl: string = canvas.toDataURL('image/jpeg', quality);
  const fileSize = ((dataUrl.length - 'data:image/jpeg;base64,'.length) * 3) / 4 / 1024 / 1024;
  if (fileSize > 2 && quality > 0.1) {
    return compressImage(canvas, quality - 0.05);
  } else {
    return dataUrl;
  }
};
const cropAndResizeImage = async (item: CropData): Promise<string> => new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = 'Anonymous'; // 解决跨域问题
  img.onload = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('裁剪图片失败'));
      return;
    }

    // 输出的目标尺寸
    canvas.width = cropWidth.value;
    canvas.height = cropHeight.value;

    const { naturalWidth, naturalHeight, offsetX: savedOffsetX, offsetY: savedOffsetY } = item;
    if (naturalWidth === cropWidth.value && naturalHeight === cropHeight.value) {
      // 尺寸相同，直接返回原图地址
      resolve(item.url);
      return;
    }

    // 计算原图缩放到能容纳裁剪框的比例（基于目标裁剪尺寸 cropWidth x cropHeight）
    const scaleX = naturalWidth! / cropWidth.value;
    const scaleY = naturalHeight! / cropHeight.value;
    const imageScale = Math.min(scaleX, scaleY);

    // 图片在目标坐标系中的尺寸
    const imageWidthInTarget = naturalWidth! / imageScale;
    const imageHeightInTarget = naturalHeight! / imageScale;

    // 裁剪框居中时在图片中的位置（目标坐标系）
    const centerCropLeft = (imageWidthInTarget - cropWidth.value) / 2;
    const centerCropTop = (imageHeightInTarget - cropHeight.value) / 2;

    // 加上偏移（savedOffsetX/Y 是相对于居中位置的偏移，存储时已除以scale）
    const cropLeft = centerCropLeft - (savedOffsetX || 0);
    const cropTop = centerCropTop - (savedOffsetY || 0);

    // 转换到原图坐标系
    const sourceX = cropLeft * imageScale;
    const sourceY = cropTop * imageScale;
    const sourceWidth = cropWidth.value * imageScale;
    const sourceHeight = cropHeight.value * imageScale;

    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      cropWidth.value,
      cropHeight.value,
    );
    // compressImage(canvas, 0.8);
    // const dataUrl = (canvas.toDataURL('image/png'));
    const dataUrl = compressImage(canvas, 1);
    const url = await baseUrlToHttpUrl(dataUrl);
    resolve(url);
  };
  img.onerror = reject;
  img.src = item.url;
});

// 确认
const handleConfirm = async () => {
  // 保存当前图片的偏移（转换回原始尺寸）
  if (pictureList.value[currentIndex.value]) {
    pictureList.value[currentIndex.value].offsetX = offsetX.value / scale.value;
    pictureList.value[currentIndex.value].offsetY = offsetY.value / scale.value;
  }

  // 裁剪所有图片
  const jobs = pictureList.value.map(async (item) => {
    try {
      if (!item.originUrl) {
        // 保存原始图片地址
        item.originUrl = item.url;
      }
      item.url = await cropAndResizeImage(item);
    } catch (err) {
      console.warn('cropAndResizeImage 裁剪图片失败', err);
    }
  });
  const loading = ElLoading.service({ fullscreen: true, text: '图片裁剪中，请稍后...' });
  await Promise.all(jobs).finally(() => {
    loading.close();
  });

  emit('confirm', pictureList.value);
  visible.value = false;
};
</script>

<style scoped lang='scss'>
.crop-dialog-content {
  display: flex;
  gap: 24px;
  .crop-area {
    flex: 1;
    min-width: 0;
    .crop-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 16px;
      font-size: 14px;
      .size-input {
        width: 80px;
      }
    }
    .crop-content {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      height: calc(90vh - 160px);
      min-height: 400px;
      .image-wrapper {
        position: relative;
        flex-shrink: 0; // 避免被父级 flex 收缩导致宽高被挤压
      }
      .crop-mask {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        box-shadow: 0 0 0 9999px rgba(255, 255, 255, 0.7);
        border: 2px solid #409eff;
        pointer-events: none; // 允许拖拽事件穿透到图片
      }
    }
  }
  .image-list {
    display: flex;
    width: 120px;
    flex-direction: column;
    gap: 12px;
    max-height: 600px;
    overflow-y: auto;
    .thumbnail-item {
      position: relative;
      width: 100%;
      height: 120px;
      border: 2px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        border-color: #409eff;
      }
      &.active {
        border-color: #409eff;
        box-shadow: 0 0 8px rgba(64, 158, 255, 0.5);
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .size-text {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>
