<template>
  <div>
    <div class="tw-flex tw-items-center tw-justify-between tw-mt-[-8px]">
      <div class="tw-font-bold">{{ label }}修图需求说明{{ index !== undefined ? (index + 1) : '' }}</div>
      <el-tooltip :content="descData.attachment ? '最多只能上传一张图片' : '上传图片'" placement="top">
        <el-button
          :disabled="!!descData.attachment"
          :icon="Picture"
          type="primary"
          size="large"
          text
          @click="handleUploadImage()"
        />
      </el-tooltip>
    </div>
    <template v-if="descData">
      <el-input
        type="textarea"
        v-model.trim="descData.pictureDescribe"
        show-word-limit
        maxlength="500"
        clearable
        :rows="3"
      />
      <div class="tw-w-56px tw-mt-4 tw-relative" v-if="descData.attachment">
        <CustomImage
          class="tw-w-full"
          :src="descData.attachment"
          :preview-src-list="[descData.attachment]"
        />
        <el-button
          class="tw-absolute tw-top-[-8px] tw-right-[-8px]"
          type="danger"
          :icon="Close"
          circle
          size="small"
          @click="descData.attachment = ''"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Close, Picture } from '@element-plus/icons-vue';
import { useUploadDialog } from '@/hooks/use-upload-dialog';

const descData = defineModel({
  type: Object as PropType<{ pictureDescribe: string; attachment?: string; }>,
  required: true,
});

defineProps({
  index: Number,
  label: String
});

const { handleUpload } = useUploadDialog((url) => {
  descData.value.attachment = url;
});

const handleUploadImage = () => {
  handleUpload();
};
</script>
