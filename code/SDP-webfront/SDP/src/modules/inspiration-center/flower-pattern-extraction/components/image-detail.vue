<script lang="ts" setup>
import { ref, watch, computed, watchEffect, onUnmounted, nextTick, onBeforeMount } from 'vue';
import { CloseBold, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { ElScrollbar, ElMessage } from 'element-plus';
import { useWheelZoomEvent } from '@/hooks/use-whell-zoom-event';
import { useDragEvent } from '@/hooks/use-drag-event';
import { handleCopyLog, handleDownloadImg } from '../lib';
import FlowerImgCanvas from './flower-img-canvas/index.vue';
import { useEditFLowerPhotoMaskDialog } from './edit-flower-mask-dialog';
import { IFloralPrintExtractionDetailRes } from '../api/type';
import { getFloralPrintExtractionDetail, saveEliminateWrinklesResult, sendToPatternLibrary } from '../api';
import { cloneDeep, debounce } from 'lodash-es';
// import { HD_TASK_MODE } from '../../constant';
// import { useLoopGetHDImage } from '@/modules/inspiration-center/hooks/use-get-hd-image';

import { useDownloadHDImage } from '@/hooks/download/use-download-hd-image';
import { TASK_MODE } from '@/hooks/download/use-download-hd-image/constant';

const emit = defineEmits(['update:visible']);

const props = defineProps<{
  /** 是否展示 */
  visible: boolean;
}>();

/** 当前选中图片的下标 */
const curPicIndex = ref(0);
const isShowFlowerImgCanvas = ref(false);
const detailObj: IFloralPrintExtractionDetailRes = {
  taskId: '',
  taskCode: '',
  originalImage: '',
  generateImages: [],
  boxSelectionCoordinates: [],
  aigcTaskId: '',
};
const detail = ref<IFloralPrintExtractionDetailRes>(cloneDeep(detailObj));

const flowerCanvasRef = ref<InstanceType<typeof FlowerImgCanvas> | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
const { handleWheelEvent, resetWheelEvent, scale } = useWheelZoomEvent();
const { handleMouseDown, resetDragEvent, offsetX, offsetY } = useDragEvent(imageRef);
const styleObject = computed(() => {
  return {
    transform: `scale(${scale.value})
    translate3d(${offsetX.value / scale.value}px, ${offsetY.value / scale.value}px, 0)`,
  };
});

watch(() => props.visible, () => {
  if (props.visible) {
    resetWheelEvent();
    resetDragEvent();
  }
});

const curImg = computed(() => {
  return detail.value.generateImages[curPicIndex.value];
});

// const { startLoop, stopLoop } = useLoopGetHDImage({});

// // 点击下载4k图片
// const handleDownload4K = debounce(() => {
//   const { taskId } = detail.value;
//   startLoop({
//     originTaskId: taskId,
//     pictureId: curImg.value!.pictureId,
//     pictureUrl: curImg.value!.pictureUrl,
//     taskMode: HD_TASK_MODE.FLOWER_PATTERN_EXTRACT,
//     picIndex: curPicIndex.value,
//   });
// });

const { startLoop, stopLoop, isLooping } = useDownloadHDImage({
  isFullScreenLoading: false,
});

const handleDownloadHD = debounce(async () => {
  const { taskId } = detail.value;
  await startLoop({
    originTaskId: taskId,
    pictureId: curImg.value!.pictureId,
    pictureUrl: curImg.value!.pictureUrl,
    taskMode: TASK_MODE.FLOWER_PATTERN_EXTRACT,
  });
  ElMessage.success('高清图生成中，可稍后再回来下载');
});
const handleSelect = (picIndex: number) => {
  stopLoop();
  resetWheelEvent();
  resetDragEvent();
  curPicIndex.value = picIndex;
};

const handleClose = () => {
  detail.value = cloneDeep(detailObj);
  isShowFlowerImgCanvas.value = false;
  emit('update:visible', false);
};

const scrollBarRef = ref<InstanceType<typeof ElScrollbar> | null>(null);
watchEffect(() => {
  if (scrollBarRef.value) {
    const IMAGE_WIDTH = 96 + 16;
    const index = curPicIndex.value;
    const left = index * IMAGE_WIDTH;
    scrollBarRef.value?.setScrollLeft(left);
  }
});
const handleScroll = (e: WheelEvent) => {
  let left = scrollBarRef.value?.wrapRef?.scrollLeft;
  if (typeof left === 'number') {
    left += e.deltaY;
    scrollBarRef.value?.setScrollLeft(left);
  }
};

/** 下载图片 */
const handleDownload = async () => {
  const url = detail.value.generateImages[curPicIndex.value].pictureUrl;
  handleDownloadImg(url, curPicIndex.value, { id: detail.value.taskId, code: detail.value.taskCode });
};
/** 复制图片 */
const handleCopyLink = async () => {
  const url = curImg.value!.pictureUrl;
  await navigator.clipboard.writeText(url);
  ElMessage.success('已复制图片链接');
  handleCopyLog(curPicIndex.value, url, { id: detail.value.taskId, code: detail.value.taskCode });
};

const switchPicture = (code: string) => {
  const maxIndex = detail.value.generateImages.length - 1;
  const minIndex = 0;
  switch (code) {
    case 'ArrowRight':
      if (curPicIndex.value < maxIndex) {
        curPicIndex.value += 1;
      } else {
        curPicIndex.value = minIndex;
      }
      break;
    case 'ArrowLeft':
      if (curPicIndex.value > 0) {
        curPicIndex.value -= 1;
      } else {
        curPicIndex.value = maxIndex;
      }
      break;
    default:
      break;
  }
};
/**
 * 生成图片名称
 * 规则： 图片名称+'-1',图片名称+'-2',
 * 1、找到当前图片名称长度
 * 2、截取到最后一个'-'的位置，数字加一，没有则为1；
 */
const generatePictureName = () => {
  const { pictureName, pictureUrl } = curImg.value;
  let name = pictureName;
  const { generateImages = [] } = detail.value;
  const imgs = cloneDeep(generateImages).filter(n => n.pictureUrl !== pictureUrl);
  if (!pictureName.includes('-')) {
    name = `${pictureName}-0`;
  }
  const curImgNameLen = name.split('-').length;
  const matchNameItems = imgs.map(n => n.pictureName).filter((m) => {
    const nameStr = m.substring(0, pictureName.length);
    const nameStrLen = m.split('-').length;
    return nameStr === pictureName && nameStrLen === curImgNameLen;
  });
  if (matchNameItems.length) {
    const maxIndex = Math.max(...matchNameItems.map(n => Number(n.split('-').at(-1))));
    return `${pictureName}-${maxIndex + 1}`;
  }
  return `${pictureName}-1`;
};

const shortcut = (event: KeyboardEvent) => {
  const { code } = event;
  switchPicture(code);
};
const { handleOpenDialog } = useEditFLowerPhotoMaskDialog({
  async handleRmoveWiinklesSuccess(url) {
    console.log(url);
    try {
      await saveEliminateWrinklesResult({
        taskCode: detail.value.taskCode,
        image: url,
        pictureName: generatePictureName(),
      });
      const { data } = await getFloralPrintExtractionDetail(detail.value.taskCode);
      detail.value = data;
      ElMessage.success('消除褶皱成功！');
    } catch (error) {
      console.error(error);
    }
  }
});
// 点击打开消除褶皱弹窗
const handleRemoveFold = () => {
  console.log(generatePictureName());
  handleOpenDialog({
    url: curImg.value.pictureUrl,
    refOriPatchUrl: curImg.value ? curImg.value?.patchImage : '',
    maskUrl: '',
  });
};

const init = () => {
  document.addEventListener('keydown', shortcut);
};

init();

onUnmounted(() => {
  document.removeEventListener('keydown', shortcut);
  stopLoop();
});

const initDetail = async (d: IFloralPrintExtractionDetailRes, cUrl: string) => {
  detail.value = d;
  isShowFlowerImgCanvas.value = true;
  const index = d.generateImages.findIndex(n => n.pictureUrl === cUrl);
  if (index > -1) {
    curPicIndex.value = index;
  }
  await nextTick();
  flowerCanvasRef.value?.watchImgAndCoordinates(detail.value.boxSelectionCoordinates[0]);
};

const handleSendToPatternLibrary = async () => {
  await sendToPatternLibrary(curImg.value!.pictureId);
  ElMessage.success('发送成功');
};

defineExpose({
  initDetail
});

const realH = ref(700);
const realW = ref(600);
const resizeWidthAndHeight = async () => {
  await nextTick();
  const windowH = window.innerHeight - 216;
  realH.value = windowH;
  realW.value = window.innerWidth * 0.4;
  setTimeout(() => {
    flowerCanvasRef.value?.initCanvas();
    flowerCanvasRef.value?.initCoordinates(detail.value.boxSelectionCoordinates[0]);
  });
};
onBeforeMount(() => {
  resizeWidthAndHeight();
});

window.addEventListener('resize', () => {
  resizeWidthAndHeight();
});

</script>

<template>
  <div
    v-if="visible"
    :class="
      `${visible ? 'tw-z-[999]' : ''} tw-flex tw-fixed
    tw-left-0 tw-top-0 tw-h-100vh tw-w-100vw tw-overflow-hidden
    `"
  >
    <div class="tw-flex tw-flex-col tw-flex-1 tw-bg-#000000/[0.8] tw-p-10px">
      <div
        class="tw-flex tw-justify-center tw-items-start tw-flex-1
          tw-overflow-hidden tw-p-40px tw-gap-8px"
      >
        <el-icon
          class="
          tw-text-white tw-text-20px
          tw-rounded-full tw-flex tw-items-center tw-justify-center
          tw-h-40px tw-w-40px tw-cursor-pointer
          tw-bg-#606266/[0.8]
          "
          @click="handleClose"
        >
          <CloseBold />
        </el-icon>
        <div
          class="tw-relative tw-flex tw-justify-center tw-h-full tw-box-border"
        >
          <div
            class="tw-bg-[#fff] tw-b-rd-[8px] tw-mr-[10px] tw-relative tw-overflow-hidden"
            @click.stop
            :style="{ height: `${realH}px`, width: `${realW}px` }"
          >
            <FlowerImgCanvas
              v-if="isShowFlowerImgCanvas"
              ref="flowerCanvasRef"
              :origin-img-url="detail.originalImage"
              :canvas-height="realH"
              :canvas-width="realW"
            />
            <span
              class="
                img-title
                tw-absolute
                tw-left-[0px]
                tw-top-[0px]
                text-size-12
                tw-leading-none
                tw-p-[8px]
                tw-color-[#fff]
                tw-bg-primary
                tw-font-bold
              "
            >
              原图
            </span>
          </div>
          <div
            class="tw-relative tw-bg-[#fff] tw-b-rd-[8px] tw-overflow-hidden"
            @click.stop
            :style="{ height: `${realH}px`, width: `${realW}px` }"
          >
            <img
              :style="styleObject"
              ref="imageRef"
              class="image-detail_img tw-cursor-grab"
              @wheel.prevent="handleWheelEvent"
              @mousedown.prevent="handleMouseDown"
              :src="curImg?.pictureUrl"
            >
            <span
              class="
                img-title
                tw-absolute
                tw-left-[0px]
                tw-top-[0px]
                text-size-12
                tw-leading-none
                tw-p-[8px]
                tw-color-[#fff]
                tw-bg-primary
                tw-font-bold
              "
            >
              生成图
            </span>
          </div>
          <div class="tw-flex tw-flex-col tw-justify-between tw-ml-10px tw-h-100%">
            <div class="tw-flex tw-flex-col tw-gap-8px">
              <el-button
                type="primary"
                size="default"
                class="tw-ml-0!"
                @click="handleDownload"
              >
                下载
              </el-button>
              <el-button
                type="primary"
                size="default"
                class="tw-ml-0!"
                @click="handleCopyLink"
              >
                复制链接
              </el-button>
              <el-button
                v-loading="isLooping"
                type="primary"
                size="default"
                class="tw-ml-0!"
                @click="handleDownloadHD"
              >
                下载高清图片
              </el-button>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-8px">
              <div class="tw-text-white tw-pb-5px tw-font-bold">发送到:</div>

              <el-button
                type="primary"
                class="tw-ml-0!"
                @click="handleSendToPatternLibrary"
              >
                图案库
              </el-button>
            </div>
            <!-- <div class="tw-flex tw-flex-col tw-gap-8px">
              <div class="tw-text-white tw-font-bold">发送到:</div>
              <el-button
                type="primary"
                size="default"
                class="tw-ml-0!"
                @click="handleRemoveFold"
              >
                消除褶皱
              </el-button>
            </div> -->
          </div>
        </div>
      </div>
      <div
        class="
        tw-flex tw-self-center tw-justify-center
        tw-max-w-60vw tw-overflow-hidden tw-shrink-0
        tw-px-16px tw-py-10px tw-rounded-4px tw-items-center"
      >
        <el-button
          size="large"
          :icon="ArrowLeft"
          class="tw-mr-10px"
          circle
          @click="switchPicture('ArrowLeft')"
        />
        <el-scrollbar ref="scrollBarRef">
          <div class="tw-flex tw-flex-nowrap tw-gap-16px" @wheel.stop="handleScroll">
            <template v-for="(item, index) in detail.generateImages" :key="index">
              <el-image
                :class="`
              tw-min-h-96px tw-min-w-96px tw-cursor-pointer
              tw-max-h-96px tw-max-w-96px tw-rounded-4px
              ${
                  index === curPicIndex
                    ? 'tw-border-4px tw-border-solid tw-border-[#605CE5]'
                    : ''
                }
              `"
                fit="cover"
                :src="item.pictureUrl"
                @click="handleSelect(index)"
              />
            </template>
          </div>
        </el-scrollbar>
        <el-button
          :icon="ArrowRight"
          class="tw-ml-10px"
          size="large"
          circle
          @click="switchPicture('ArrowRight')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-detail {
  &_img {
    display: block;
    width: 100%;
    height: 100%;
    user-select: none;
    border-radius: 8px;
    object-fit: contain;
    -webkit-user-drag: none;
  }
  .img-title {
    border-radius: 6px 4px 4px 0;
  }
}
</style>
