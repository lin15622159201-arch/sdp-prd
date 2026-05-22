<script lang="ts" setup>
import { ref, watch, defineModel, defineEmits } from 'vue';
import { CloseBold } from '@element-plus/icons-vue';

import ImageViewer from './image-viewerSpecifyMaterials.vue';
import ImageSection from './image-section.vue';
// import TaskDetail from './task-detail.vue';
import Handler from './handler.vue';
import { useImageDetail } from './use-image-detail';
import { useConfig } from './hooks/use-config';
import { type } from 'os';

const visible = defineModel({
  type: Boolean,
  default: false,
});

const props = defineProps({
  pickingId: {
    type: String,
  },
  picIndex: {
    type: Number,
    default: 0
  },
  taskCode: {
    type: String,
  },
  details: {
    type: Object,
    default: () => {
      return {};
    }
  },
  generateItem: {
    type: Object,
    default: () => {
      return {};
    }
  },
});



const curPicIndex = ref(0);

const {
  generateWaterImages,
  detail,
  handleGetDetailByCode,
  faceGenerateWaterImages,
  generateImages,
} = useImageDetail();

watch(() => props.taskCode, () => {
  if (props.taskCode) {
    handleGetDetailByCode(props.taskCode);
  }
});

const ImageViewerRef = ref<InstanceType<typeof ImageViewer> | null>(null);

watch(visible, () => {
  if (ImageViewerRef.value) {
    ImageViewerRef.value.reset();
    tabType.value = 'left';
  }
});

watch(() => [props.picIndex, visible.value], () => {
  if (visible.value) {
    curPicIndex.value = props.picIndex;
  }
});

const handleCurPicIndexChange = () => {
  ImageViewerRef.value?.reset();
};

const handleClose = () => {
  visible.value = false;
};

const {
  handleGetConfig,
  hasPatternExtraction,
} = useConfig();

watch(() => detail.value.categoryCode, (categoryCode) => {
  if (categoryCode) {
    handleGetConfig(categoryCode);
  }
}, {
  immediate: true,
});

const isShowFaceImgUrl = ref(false);
watch(() => [curPicIndex.value, faceGenerateWaterImages.value, visible.value], () => {
  if (visible.value) {
    isShowFaceImgUrl.value = !!faceGenerateWaterImages.value[curPicIndex.value]?.imgUrl;
  } else {
    isShowFaceImgUrl.value = false;
  }
});
const tabType = ref('left');
const tabChange = (types: string) => {
  tabType.value = types;
  // curPicIndex.value = 0;
};
const emit = defineEmits<{
  (event: 'reload'): void;
}>();

const reloadFun = async () => {
  await handleGetDetailByCode(detail.value.taskCode);
  emit('reload');
};
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
      <div class="tw-flex tw-justify-center tw-items-start tw-flex-1 tw-overflow-hidden tw-p-40px tw-gap-8px">
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
        <ImageViewer
          ref="ImageViewerRef"
          :original-image-url="tabType === 'left' 
            ? detail.referencePicture 
            : (detail?.materials ?? [])[curPicIndex % ((detail?.materials ?? []).length)]?.pictureUrl"
          :image-url="generateWaterImages[curPicIndex]?.imgUrl"
          :face-image-url="faceGenerateWaterImages[curPicIndex]?.imgUrl"
          :is-show-face-img-url="isShowFaceImgUrl"
          :details="detail"
          @tab-change="tabChange"
        />
        <Handler
          v-model:is-show-face-img-url="isShowFaceImgUrl"
          :generateImages="generateImages"
          :curPicIndex="curPicIndex"
          :taskCode="detail.taskCode"
          :pickingId="pickingId"
          :taskId="detail.taskId"
          :categoryCode="detail.categoryCode"
          :categoryName="detail.categoryName"
          :aigc-task-id="detail.aigcTaskId"
          :generateMode="detail.generateMode"
          :has-pattern-extraction="hasPatternExtraction"
          :generateItem="detail.generateImages[picIndex]"
          :generateWaterImages="generateWaterImages[curPicIndex]"
          :is-can-show-face-image-url="!!faceGenerateWaterImages[curPicIndex]?.imgUrl"
          @reload="reloadFun"
        />
      </div>
      <ImageSection
        v-model="curPicIndex"
        :image-list="generateWaterImages"
        @change="handleCurPicIndexChange"
      />
    </div>

    <!-- <TaskDetail class="tw-z-[1999]" :detail="detail" /> -->

  </div>
</template>
