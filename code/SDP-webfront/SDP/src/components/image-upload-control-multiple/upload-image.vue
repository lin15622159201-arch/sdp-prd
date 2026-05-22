<script lang="ts" setup>
import { defineModel, ref, watch, toRaw, PropType } from 'vue';

import { ElMessage } from 'element-plus';
import { useUpload } from './use-upload';

const emit = defineEmits<{
  (event: 'change', picUrl: string): void;
  (event: 'upload-success', picUrl: string[]): void;
}>();
const props = defineProps({
  // Images: {
  //   type: Array as PropType<GenerateFlatList>,
  //   default: () => [],
  // },
  limit: {
    type: Number,
    default: 20,
  },
  fileSize: {
    type: Number,
    default: 20,
  },
  allowedExtensions: {
    type: Array as PropType<string[]>,
    default: () => ['jpg', 'jpeg', 'png'],
  }
});
const picUrl = defineModel({
  type: String,
  default: '',
});

const ACCEPT = props.allowedExtensions.map(v => `.${v}`).join(',');

const { handleDrop, handleInputFile, handlePaste, uploadedFiles } = useUpload({
  fileSize: props.fileSize,
  fileCount: props.limit,
  allowedExtensions: props.allowedExtensions,
  clearBeforeSelect: true,
  onUploadError(_, errorMsg) {
    ElMessage.error(errorMsg);
  },
  onAllUploadSuccess: (taskList: { url: string; }[]) => {
    const urls: string[] = taskList.map((v: { url: string; }) => v.url);
    emit('upload-success', urls);
  },
});

watch(uploadedFiles, () => {
  const rawFiles = toRaw(uploadedFiles.value);
  picUrl.value = rawFiles[0]?.url || '';
}, {
  deep: true
});

watch(picUrl, () => {
  const rawFiles = toRaw(uploadedFiles.value);
  const notInFiles = !!rawFiles.find(file => file.url !== picUrl.value);
  if (notInFiles) {
    uploadedFiles.value = picUrl.value ? [{ url: picUrl.value }] : [];
    emit('change', picUrl.value);
  }
});

const InputRef = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => {
  const inputRef = toRaw(InputRef.value);
  if (inputRef) {
    inputRef.value = '';
    inputRef.click();
  }
};

</script>

<template>
  <div
    class="image-viewer"
    @paste="handlePaste"
    @drop="handleDrop"
    @dragover="e => e.preventDefault()"
    @dragenter="e => e.preventDefault()"
    @dragend="e => e.preventDefault()"
  >
    <div class="image-viewer__content" style="height: 200px;padding-bottom: initial;">
      <!-- <img
        v-if="picUrl"
        class="image-viewer__content__image"
        :src="picUrl"
        alt="pattern"
      /> -->
      <input
        ref="InputRef"
        class="image-viewer__content__input"
        type="file"
        :multiple="true"
        :accept="ACCEPT"
        @input="handleInputFile"
      >
      <slot name="content" :triggerFileInput="triggerFileInput" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-viewer {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__content {
    display: flex;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    border: 2px dashed #D2D2D2;
    background: #F2F2F5;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    &__image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &__input {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      opacity: 0;
      z-index: -10;
    }
  }
}
</style>
