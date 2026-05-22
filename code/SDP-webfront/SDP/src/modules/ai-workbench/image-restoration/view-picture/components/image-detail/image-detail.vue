<script lang="ts" setup>
import { ref, watch, defineModel, defineEmits, computed } from 'vue';
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
  picIndex: {
    type: Number,
    default: 0
  },
  taData: {
    default: () => {
      return {};
    }
  },
  isFission: {
    type: Boolean,
    default: false,
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

watch(() => props.taData, () => {
  handleGetDetailByCode(props.taData);
}, {
  immediate: true,
  deep: true,
});

const ImageViewerRef = ref<InstanceType<typeof ImageViewer> | null>(null);

watch(() => visible.value, () => {
  tabPosition.value = generateWaterImages.value[curPicIndex.value]?.imgUrlName ?? '';
});

watch(() => [props.picIndex, visible.value], () => {
  if (visible.value) {
    curPicIndex.value = props.picIndex;
    ismodelUrl.value = false;
  }
});

const handleCurPicIndexChange = () => {
  ImageViewerRef.value?.reset();
};

const handleClose = () => {
  visible.value = false;
};

const {
  hasPatternExtraction,
} = useConfig();


const isShowFaceImgUrl = ref(false);
watch(() => [curPicIndex.value, faceGenerateWaterImages.value, visible.value], () => {
  if (visible.value) {
    isShowFaceImgUrl.value = !!faceGenerateWaterImages.value[curPicIndex.value]?.imgUrl;
  } else {
    isShowFaceImgUrl.value = false;
  }
  setTimeout(() => {
    tabPosition.value = generateWaterImages.value[curPicIndex.value]?.imgUrlName ?? '';
  });
  console.log('generateWaterImages.value[curPicIndex.value]', generateWaterImages.value[curPicIndex.value]);
});

const emit = defineEmits<{
  (event: 'reload'): void;
}>();

// const reloadFun = async () => {
//   await handleGetDetailByCode(detail.value.taskCode);
//   emit('reload');
// };
const pickingId = ref<string>('');
const ismodelUrl = ref<boolean>(false);

watch(() => [detail.value.materialLibraryId, visible.value], (newMaterialLibraryId) => {
  if (detail.value.materialLibraryId) {
    ismodelUrl.value = true;
  } else {
    ismodelUrl.value = false;
  }
}, {
  immediate: true,
});

const modelPhoto = computed(() => {
  const modeUrl = detail.value.materials.find((v: any) => v.materialId === generateWaterImages.value[curPicIndex.value]?.groupId) ?? {};
  return modeUrl.refImgUrl;
});
const tabPosition = ref<string>('');
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
        <!-- :original-image-url="detail.referencePicture"左边参考图 -->
        <ImageViewer
          ref="ImageViewerRef"
          v-model:tabPosition="tabPosition"
          :original-image-url="modelPhoto"
          :image-url="generateWaterImages[curPicIndex]?.imgUrl"
          :generateWaterImages="generateWaterImages[curPicIndex]"
          :face-image-url="faceGenerateWaterImages[curPicIndex]?.imgUrl"
          :is-show-face-img-url="isShowFaceImgUrl"
          :curPicIndex="curPicIndex"
          :materials="detail.materials"
          :materialLibraryId="detail.materialLibraryId"
        />
        <Handler
          v-model:is-show-face-img-url="isShowFaceImgUrl"
          :generateImages="generateImages"
          :curPicIndex="curPicIndex"
          :taskCode="detail.taskCode"
          :pickingId="pickingId || ''"
          :taskId="detail.taskId"
          v-model:tabPosition="tabPosition"
          :generateWaterImages="generateWaterImages[curPicIndex]"
          :is-can-show-face-image-url="!!faceGenerateWaterImages[curPicIndex]?.imgUrl"
          :isFission="isFission"
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
