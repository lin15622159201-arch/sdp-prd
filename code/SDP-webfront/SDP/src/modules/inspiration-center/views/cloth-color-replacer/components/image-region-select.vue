<template>
  <div
    class="editor-wrapper"
    ref="wrapper"
    @mousedown="startCreate($event)"
    :class="{ disabled: props.disabled }"
  >
    <img
      :src="src"
      class="image"
      ref="imgRef"
      @load="onImgLoad"
    />
    <div
      v-if="!rectData"
      class="mask-layer"
      :style="maskStyle"
    >
      <slot name="mask" />
    </div>

    <!-- 选框 -->
    <div
      v-if="rectData && src"
      class="rect"
      :class="{ disabled: props.disabled }"
      :style="{
        left: `${rectData.x}px`,
        top: `${rectData.y}px`,
        width: `${rectData.width}px`,
        height: `${rectData.height}px`,
      }"
      @mousedown.stop="startMove($event)"
    >

      <!-- 删除按钮 -->
      <el-button
        v-show="!disabled && !isCreating && !isMoving && !isResizing"
        class="tw-absolute tw-top-[-24px] tw-right-[-24px] tw-text-16px"
        :icon="Close"
        circle
        type="danger"
        size="small"
        @mousedown.stop
        @click.stop="removeRect"
      />
      <div
        v-for="handle in resizeHandles"
        :key="handle"
        class="handle"
        :class="[handle, { disabled: props.disabled }]"
        @mousedown.stop="startResize($event, handle)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';
import { watch, ref, defineProps, defineEmits, onUnmounted, onMounted, computed } from 'vue';

const props = defineProps<{
  src: string;
  disabled?: boolean;
  defaultRect?: Rect | null;
}>();

const emit = defineEmits<{
  (e: 'change', rect?: Rect): void;
}>();

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const wrapper = ref<HTMLDivElement | null>(null);
const imgRef = ref<HTMLImageElement | null>(null);
const maskSize = ref({ width: 0, height: 0 });

let imgBox: DOMRect;

const rectData = ref<Rect | null>(null);
const scale = ref(1);

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const updateRect = () => {
  const rect = rectData.value;
  if (!imgRef.value || !rect) {
    emit('change');
    return;
  }
  const originRect = {
    x: rect.x / scale.value,
    y: rect.y / scale.value,
    width: rect.width / scale.value,
    height: rect.height / scale.value,
  };
  emit('change', originRect);
};

const initRect = (originRect?: Rect | null) => {
  if (!originRect) {
    rectData.value = null;
    return;
  }
  rectData.value = {
    x: originRect.x * scale.value,
    y: originRect.y * scale.value,
    width: originRect.width * scale.value,
    height: originRect.height * scale.value,
  };
};
const init = () => {
  imgBox = imgRef.value!.getBoundingClientRect();
  maskSize.value = {
    width: imgBox.width,
    height: imgBox.height,
  };
  scale.value = imgBox.width / imgRef.value!.naturalWidth;
  initRect(props.defaultRect);
};
const maskStyle = computed(() => ({
  width: `${maskSize.value.width}px`,
  height: `${maskSize.value.height}px`,
}));

// 拖动手柄
const resizeHandles = ['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br'];
let resizeObserver: ResizeObserver | null = null;

// 图片加载后获取位置
const onImgLoad = () => {
  init();
};
watch(() => props.defaultRect, () => {
  initRect(props.defaultRect);
});

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    if (!imgRef.value) return;
    init();
  });
  resizeObserver.observe(imgRef.value!);
});

//
// 1) 创建选框
//
let startX = 0;
let startY = 0;
let isCreating = false;

const createRect = (e: MouseEvent) => {
  if (!isCreating || !rectData.value || props.disabled) return;

  const mx = clamp(e.clientX - imgBox.left, 0, imgBox.width);
  const my = clamp(e.clientY - imgBox.top, 0, imgBox.height);

  rectData.value = {
    x: Math.min(startX, mx),
    y: Math.min(startY, my),
    width: Math.abs(mx - startX),
    height: Math.abs(my - startY),
  };
};

const startCreate = (e: MouseEvent) => {
  if (!imgBox || props.disabled) return;

  if (e.clientX < imgBox.left || e.clientX > imgBox.right || e.clientY < imgBox.top || e.clientY > imgBox.bottom) { return; }

  isCreating = true;

  startX = e.clientX - imgBox.left;
  startY = e.clientY - imgBox.top;

  rectData.value = { x: startX, y: startY, width: 0, height: 0 };

  window.addEventListener('mousemove', createRect);
  window.addEventListener('mouseup', endCreate);
};

const endCreate = () => {
  if (props.disabled) return;

  isCreating = false;
  window.removeEventListener('mousemove', createRect);
  window.removeEventListener('mouseup', endCreate);
  updateRect();
};

const removeRect = () => {
  rectData.value = null;
  emit('change');
};

//
// 2) 移动选框
//
let moveOffsetX = 0;
let moveOffsetY = 0;
let isMoving = false;

const startMove = (e: MouseEvent) => {
  if (props.disabled) return;
  if (!rectData.value || props.disabled) return;

  isMoving = true;

  moveOffsetX = e.clientX - (imgBox.left + rectData.value.x);
  moveOffsetY = e.clientY - (imgBox.top + rectData.value.y);

  window.addEventListener('mousemove', moveRect);
  window.addEventListener('mouseup', endMove);
};

const moveRect = (e: MouseEvent) => {
  if (!isMoving || !rectData.value || props.disabled) return;
  const x = clamp(e.clientX - imgBox.left - moveOffsetX, 0, imgBox.width - rectData.value.width);
  const y = clamp(e.clientY - imgBox.top - moveOffsetY, 0, imgBox.height - rectData.value.height);

  rectData.value = {
    ...rectData.value,
    x,
    y,
  };
};

const endMove = () => {
  isMoving = false;
  window.removeEventListener('mousemove', moveRect);
  window.removeEventListener('mouseup', endMove);
  updateRect();
};

//
// 3) Resize（拉伸）
//
let isResizing = false;
let handleType = '';
let resizeStartRect: Rect;

const startResize = (e: MouseEvent, type: string) => {
  if (!rectData.value || props.disabled) return;

  isResizing = true;
  handleType = type;

  resizeStartRect = { ...rectData.value };

  window.addEventListener('mousemove', resizeRect);
  window.addEventListener('mouseup', endResize);
};

const MIN_SIZE = 10;
const resizeRect = (e: MouseEvent) => {
  if (!isResizing || !rectData.value || props.disabled) return;

  const { x: startRX, y: startRY, width: startRWidth, height: startRHeight } = resizeStartRect;
  const dx = e.clientX - imgBox.left - startRX;
  const dy = e.clientY - imgBox.top - startRY;

  const r = { ...resizeStartRect };

  if (handleType.includes('l')) {
    r.x = clamp(startRX + dx, 0, startRX + startRWidth - MIN_SIZE);
    r.width = clamp(startRWidth - dx, MIN_SIZE, startRWidth + startRX);
  }
  if (handleType.includes('r')) {
    r.width = clamp(dx, MIN_SIZE, imgBox.width - startRX);
  }
  if (handleType.includes('t')) {
    r.y = clamp(startRY + dy, 0, startRY + startRHeight - MIN_SIZE);
    r.height = clamp(startRHeight - dy, MIN_SIZE, startRHeight + startRY);
  }
  if (handleType.includes('b')) {
    r.height = clamp(dy, MIN_SIZE, imgBox.height - startRY);
  }

  rectData.value = r;
};

const endResize = () => {
  isResizing = false;
  window.removeEventListener('mousemove', resizeRect);
  window.removeEventListener('mouseup', endResize);
  updateRect();
};


onUnmounted(() => {
  window.removeEventListener('mousemove', createRect);
  window.removeEventListener('mouseup', endCreate);

  window.removeEventListener('mousemove', moveRect);
  window.removeEventListener('mouseup', endMove);

  window.removeEventListener('mousemove', resizeRect);
  window.removeEventListener('mouseup', endResize);
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>

<style scoped>
.editor-wrapper {
  position: relative;
  user-select: none;
  cursor: crosshair;
}
/* 禁用时鼠标变禁止状态 */
.editor-wrapper.disabled {
  cursor: not-allowed;
}
.image {
  display: block;
  max-width: 100%;
  max-height: 100%;
  pointer-events: none;
  border: var(--el-border);
  border-radius: 4px;
}
.mask-layer {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}
.rect {
  position: absolute;
  border: 2px solid #409eff;
  background-color: rgba(64, 158, 255, 0.2);
  box-sizing: border-box;
  cursor: move;
}
.rect.disabled {
  cursor: not-allowed !important;
}
/* 8方向拉伸点 */
.handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #409eff;
  border-radius: 50%;
}
.handle.disabled {
  cursor: not-allowed !important;
}
/* TL TM TR */
.tl {
  left: -5px;
  top: -5px;
  cursor: nw-resize;
}
.tm {
  left: calc(50% - 5px);
  top: -5px;
  cursor: n-resize;
}
.tr {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}
/* ML MR */
.ml {
  left: -5px;
  top: calc(50% - 5px);
  cursor: w-resize;
}
.mr {
  top: calc(50% - 5px);
  right: -5px;
  cursor: e-resize;
}
/* BL BM BR */
.bl {
  left: -5px;
  bottom: -5px;
  cursor: sw-resize;
}
.bm {
  left: calc(50% - 5px);
  bottom: -5px;
  cursor: s-resize;
}
.br {
  right: -5px;
  bottom: -5px;
  cursor: se-resize;
}
</style>
