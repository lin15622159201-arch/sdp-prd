<script lang="ts" setup>
import { ElScrollbar } from 'element-plus';
import {
  ref,
  watchEffect,
  PropType,
  defineModel,
  onMounted,
  onUnmounted,
  watch,
} from 'vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { ImageList } from './type';

const emit = defineEmits<{
  (e: 'change'): void;
}>();

const props = defineProps({
  imageList: {
    type: Array as PropType<ImageList>,
    default: () => [],
  },
});

const curPicIndex = defineModel({
  type: Number,
  default: 0,
});

const scrollBarRef = ref<InstanceType<typeof ElScrollbar> | null>(null);
const scrollBarRefScroll = ref<HTMLInputElement | null>(null);
watchEffect(() => {
  if (scrollBarRef.value) {
    // const PADDING = 32;
    const IMAGE_WIDTH = 96 + 16;
    const left = curPicIndex.value * IMAGE_WIDTH;
    // scrollBarRef.value?.setScrollLeft(left);
  }
});
const handleScroll = (e: WheelEvent) => {
  let left = scrollBarRef.value?.wrapRef?.scrollLeft;
  if (typeof left === 'number') {
    left += e.deltaY;
    // scrollBarRef.value?.setScrollLeft(left);
  }
};

const handleSelect = (index: number) => {
  curPicIndex.value = index;
  emit('change');
};

const handlePre = () => {
  const newCurPicIndex = curPicIndex.value - 1;
  curPicIndex.value = Math.max(newCurPicIndex, 0);
};

const handleNext = () => {
  const newCurPicIndex = curPicIndex.value + 1;
  curPicIndex.value = Math.min(newCurPicIndex, props.imageList.length - 1);
};

const container = ref<HTMLElement | null>(null);
const selectedImg = ref<HTMLImageElement | null>(null);
watch(
  () => curPicIndex.value,
  async () => {
    setTimeout(() => {
      container.value = document.querySelector('.imgContainer');
      selectedImg.value = document.querySelector('.selectedImg');
      if (!container.value || !selectedImg.value) return;
      const containerRect = container.value.getBoundingClientRect();
      const imgRect = selectedImg.value.getBoundingClientRect();
      const distanceFromLeft = imgRect.left - containerRect.left;
      const distanceFromRight = containerRect.right - imgRect.right;
      if (distanceFromRight < 0) {
        if (scrollBarRefScroll.value) {
          scrollBarRefScroll.value.scrollTo({
            left: scrollBarRefScroll.value.scrollLeft + Math.abs(distanceFromRight),
            behavior: 'smooth',
          });
        }
      }
      if (distanceFromLeft < 0) {
        if (scrollBarRefScroll.value) {
          scrollBarRefScroll.value.scrollTo({
            left: scrollBarRefScroll.value.scrollLeft - Math.abs(distanceFromLeft),
            behavior: 'smooth',
          });
        }
      }
    });
  },
  {
    immediate: true,
  }
);
const shortcut = (event: KeyboardEvent) => {
  // 如果打开面料咨询弹窗，则不响应快捷键
  const { code } = event;
  switch (code) {
    case 'ArrowRight':
      handleNext();
      break;
    case 'ArrowLeft':
      handlePre();
      break;
    default:
      break;
  }
  event.preventDefault();
};
const interDom = ref(null);
const bodyObserver = ref<any>(null);
onMounted(() => {
  document.addEventListener('keydown', shortcut);
  const observeOptions = {
    childList: true,
    subtree: false,
  };
  const handleMutation = (mutationsList: any) => {
    mutationsList.forEach((mutation: any) => {
      if (mutation.type === 'childList') {
        Array.from(mutation.addedNodes).forEach((node: any) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.id === 'category-dialog-container') {
              document.removeEventListener('keydown', shortcut);
            } else {
              const targetEl = node.querySelector('#category-dialog-container');
              if (targetEl) {
                document.removeEventListener('keydown', shortcut);
              }
            }
          }
        });
        Array.from(mutation.removedNodes).forEach((node: any) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.id === 'category-dialog-container') {
              document.addEventListener('keydown', shortcut);
            } else {
              const targetEl = node.querySelector('#category-dialog-container');
              if (targetEl) {
                document.addEventListener('keydown', shortcut);
              }
            }
          }
        });
      }
    });
  };
  bodyObserver.value = new MutationObserver(handleMutation);
  bodyObserver.value.observe(document.body, observeOptions);
});

onUnmounted(() => {
  document.removeEventListener('keydown', shortcut);
  bodyObserver.value.disconnect();
});



</script>

<template>
  <div
    class="tw-flex tw-self-center tw-justify-center tw-items-center tw-max-w-60vw tw-overflow-hidden tw-shrink-0 tw-px-16px tw-py-10px tw-rounded-4px tw-gap-10px"
  >
    <el-button
      size="large"
      :icon="ArrowLeft"
      circle
      @click="handlePre"
    />
    <el-scrollbar ref="scrollBarRef">
      <div
        ref="scrollBarRefScroll"
        class="tw-flex tw-flex-nowrap tw-gap-16px tw-overflow-y-hidden imgContainer"
        @wheel.stop="handleScroll"
      >
        <div
          v-for="(image, index) in imageList"
          :key="index"
          :class="`tw-w-96px tw-min-w-96px tw-cursor-pointer tw-h-96px tw-rounded-4px tw-relative
          ${
            index === curPicIndex
              ? 'tw-border-4px tw-border-solid tw-border-[#605CE5] selectedImg'
              : ''
          }
          `"
        >
          <el-image
            class="tw-w-full tw-h-full tw-rounded-4px"
            fit="cover"
            :src="image.imgUrl"
            @click="handleSelect(index)"
          />

          <!-- <div
            class="tw-h-12px tw-w-12px tw-rounded-4px tw-absolute tw-right-4px tw-top-4px"
            :style="{ background: image.color }"
          /> -->
        </div>
      </div>
    </el-scrollbar>
    <el-button
      size="large"
      :icon="ArrowRight"
      circle
      @click="handleNext"
    />
  </div>
</template>
