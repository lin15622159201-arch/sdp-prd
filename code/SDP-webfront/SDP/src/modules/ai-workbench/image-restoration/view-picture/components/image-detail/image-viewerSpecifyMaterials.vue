<!-- eslint-disable @typescript-eslint/brace-style -->
<!-- eslint-disable vue/max-len -->
<!-- eslint-disable no-mixed-operators -->
<script lang="ts" setup>
import { ref, computed, watch, PropType, defineModel } from 'vue';

const emit = defineEmits<{
  (event: 'tab-change', type: string): void;
}>();
const props = defineProps({
  originalImageUrl: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  faceImageUrl: {
    type: String,
    default: '',
  },
  isShowFaceImgUrl: {
    type: Boolean,
    default: true,
  },
  materials: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  generateItem: {
    type: Object,
    default: () => {
      return {};
    }
  },
  materialLibraryId: {
    type: String,
    default: '',
  },
  generateWaterImages: {
    type: Object,
    default: () => {
      return {};
    }
  },
  curPicIndex: {
    type: Number,
    default: 0
  }
});

const MAX_SCALE = 7;
const MIN_SCALE = 1;
const ZOOM_RATE = 1.2;

const imageTransStyle = ref('translate(0, 0);');
const imageRef = ref<HTMLImageElement | null>(null);
const wrapRef = ref<HTMLDivElement | null>(null);

let startMove = false;
let startPos = {
  x: 0,
  y: 0,
};

const getTransform = (dom: HTMLElement) => {
  const arr = getComputedStyle(dom).transform.split(',');
  return {
    transX: Number.isNaN(+arr[arr.length - 2]) ? 0 : +arr[arr.length - 2], // 获取translateX
    transY: Number.isNaN(+arr[arr.length - 1].split(')')[0]) ? 0 : +arr[arr.length - 1].split(')')[0], // 获取translateX
    multiple: +arr[3] // 获取图片缩放比例
  };
};

/**
 * 获取边框限制的transform的x, y偏移量
 * innerDOM: 内盒子DOM
 * outerDOM: 边框盒子DOM
 * moveX: 盒子的x移动距离
 * moveY: 盒子的y移动距离
 */
const limitBorder = (innerDOM: HTMLElement, outerDOM: HTMLElement, moveX: number, moveY: number, multiple: number) => {
  const { clientWidth: innerWidth, clientHeight: innerHeight, offsetLeft: innerLeft, offsetTop: innerTop } = innerDOM;
  const { clientWidth: outerWidth, clientHeight: outerHeight } = outerDOM;
  let transX;
  let transY;
  // 放大的图片超出box时 图片最多拖动到与边框对齐
  if (innerWidth * multiple > outerWidth || innerHeight * multiple > outerHeight) {
    if (innerWidth * multiple > outerWidth && innerWidth * multiple > outerHeight) {
      transX = Math.min(Math.max(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2);
      transY = Math.min(Math.max(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2);
    } else if (innerWidth * multiple > outerWidth && !(innerWidth * multiple > outerHeight)) {
      transX = Math.min(Math.max(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2);
      transY = Math.max(Math.min(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2);
    } else if (!(innerWidth * multiple > outerWidth) && innerWidth * multiple > outerHeight) {
      transX = Math.max(Math.min(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2);
      transY = Math.min(Math.max(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2);
    }
  }
  // 图片小于box大小时 图片不能拖出边框
  else {
    transX = Math.max(Math.min(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2);
    transY = Math.max(Math.min(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2);
  }
  return { transX, transY };
};

const handleStartMove = (e: MouseEvent) => {
  e.preventDefault();
  const transf = getTransform(imageRef.value!);
  const { clientX, clientY } = e;

  startPos = {
    x: clientX - transf.transX,
    y: clientY - transf.transY,
  };
  startMove = true;
};

const handleMove = (e: MouseEvent) => {
  if (!imageRef.value || !wrapRef.value || !startMove) return;
  e.preventDefault();
  const { multiple } = getTransform(imageRef.value);
  const moveX = e.clientX - startPos.x;
  const moveY = e.clientY - startPos.y;

  const newTransf = limitBorder(imageRef.value, wrapRef.value, moveX, moveY, multiple);
  imageTransStyle.value = `matrix(${multiple}, 0, 0, ${multiple}, ${newTransf.transX}, ${newTransf.transY})`;
};
const handleStopMove = () => {
  startMove = false;
};

const handleScale = (e: WheelEvent) => {
  if (!imageRef.value || !wrapRef.value) return;
  const transf = getTransform(imageRef.value);
  if (e.deltaY < 0) {
    transf.multiple *= ZOOM_RATE; // 放大DELTA倍
  } else {
    transf.multiple /= ZOOM_RATE; // 缩小DELTA倍
  }
  const newTransf = limitBorder(imageRef.value, wrapRef.value, transf.transX, transf.transY, transf.multiple);
  imageTransStyle.value = `matrix(${transf.multiple}, 0, 0, ${transf.multiple}, ${newTransf.transX}, ${newTransf.transY})`;
};

const resetImagePos = () => {
  imageTransStyle.value = 'translate(0, 0);';
};

watch(() => props.isShowFaceImgUrl, () => {
  resetImagePos();
});

const tabPosition = defineModel<string>('tabPosition');
const reset = () => {
  resetImagePos();
};

watch(() => props.curPicIndex, () => {
  tabPosition.value = 'bodyRepairUrl';
});

defineExpose({
  reset,
});

const originalTmage = ref<boolean>(true);
const changeFun = (v: any) => {
  // emit('tab-change', v);
};
</script>

<template>
  <div
    class="tw-flex tw-relative tw-h-full tw-overflow-hidden tw-gap-12px"
  >
    <div class="tw-h-full tw-object-cover p-r">
      
      <el-radio-group
        v-model="originalTmage"
        class='tabs-box'
      >
        <el-radio-button :value="true">原图</el-radio-button>
        <!-- <el-radio-button value="right">模特图</el-radio-button> -->
      </el-radio-group>
      <img
        class="tw-h-full tw-object-cover"
        :src="originalImageUrl"
        lazy
        :draggable="false"
      >
    </div>
    <div
      ref="wrapRef"
      class="tw-flex tw-relative tw-h-full tw-overflow-hidden"
    >

      <div
        ref="imageRef"
        class="tw-h-full tw-object-cover tw-relative"
        :style="`transform: ${imageTransStyle}`"
        @mousedown.stop="handleStartMove"
        @mouseup.stop="handleStopMove"
        @mouseleave="handleStopMove"
        @mousemove="handleMove"
        @wheel.stop="handleScale"
      >
        <img
          class="tw-h-full tw-object-cover"
          :src="generateWaterImages[tabPosition || '']"
          lazy
          :draggable="false"
        >
        <div class="tw-absolute tw-left-0px tw-top-0px tw-w-100%">
          <el-radio-group
            v-model="tabPosition"
            class='tabs-box'
            @change="changeFun"
          >
            <el-radio-button v-if="generateWaterImages.bodyRepairUrl" value="bodyRepairUrl">肢体修复</el-radio-button>
            <el-radio-button v-if="generateWaterImages.faceRepairUrl" value="faceRepairUrl">脸部修复</el-radio-button>
            <el-radio-button v-if="generateWaterImages.imageSuperResolutionRepairUrl" value="imageSuperResolutionRepairUrl">图片超分</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.p-r {
  position: relative;
}
.tabs-box {
  position: absolute;
}
</style>
