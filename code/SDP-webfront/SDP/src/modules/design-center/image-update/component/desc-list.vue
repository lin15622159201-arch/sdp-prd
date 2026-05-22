<template>
  <div class="desc-list">
    <div v-if="mainPictureDescribe?.repairDescribe" class="tw-mb-8">
      <div class="title tw-font-bold tw-mb-2">修图需求说明</div>
      <p class="tw-text-gray-700 tw-break-all">{{ mainPictureDescribe.repairDescribe }}</p>
      <CustomImage
        v-if="mainPictureDescribe?.repairAttachment"
        :src="mainPictureDescribe.repairAttachment"
        class="tw-w-48px tw-h-48px tw-mt-2"
        :preview-src-list="[mainPictureDescribe.repairAttachment]"
      />
    </div>
    <template
      v-for="(item, index) in imageList"
      :key="item.pictureId"
    >
      <div :class="index < imageList.length - 1 ? 'tw-mb-4' : ''">
        <div class="title tw-font-bold tw-mb-2">修图需求说明{{ index + 1 }}</div>
        <p class="tw-text-gray-700 tw-break-all tw-leading-normal">{{ item.pictureDescribe || '-' }}</p>
        <CustomImage
          v-if="item.attachment"
          :src="item.attachment"
          class="tw-w-48px tw-h-48px tw-mt-2"
          :preview-src-list="[item.attachment]"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { PropType } from 'vue';
import { IImageUpdateDetailRes, IImageUpdatePicture } from '../api/type';

defineProps({
  mainPictureDescribe: {
    type: Object as PropType<Pick<IImageUpdateDetailRes, 'repairDescribe' | 'repairAttachment'>>,
    default: null
  },
  imageList: {
    type: Array as PropType<IImageUpdatePicture[]>,
    default: () => []
  },
});
</script>
