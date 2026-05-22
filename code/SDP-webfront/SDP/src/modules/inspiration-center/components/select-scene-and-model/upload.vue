<script lang="ts" setup>
import { computed, ref } from 'vue';
import Item from './item.vue';
import { useUpload } from '../../hooks/use-upload';
import { ElMessage } from 'element-plus';
import { Delete, Plus } from '@element-plus/icons-vue';

const emit = defineEmits<{
  (e: 'upload-success', url: string): void;
}>();

defineProps({
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const imageUrl = defineModel({
  type: String,
  default: '',
});

const { handleInputFile, uploadedFiles } = useUpload({
  fileSize: 20,
  fileCount: 1,
  allowedExtensions: ['jpg', 'jpeg', 'png'],
  onUploadError(_, errorMsg) {
    ElMessage.error(errorMsg);
  },
  onAllUploadSuccess: (taskList) => {
    const { url } = taskList[0];
    emit('upload-success', url);
  },
});

const img = computed(() => uploadedFiles.value[0]?.url || '');

const FileInputRef = ref<HTMLInputElement>();
const handleTriggerUpload = () => {
  FileInputRef.value?.click();
};

</script>

<template>
  <Item
    label="上传参考图"
    :img="img"
    :is-selected="isSelected"
    @click="imageUrl = img"
  >
    <div v-if="!img" class="tw-w-110px tw-h-110px tw-absolute tw-left-0 tw-top-0">
      <input
        ref="FileInputRef"
        type="file"
        :multiple="false"
        accept=".png,.jpg,.jpeg"
        @input.stop="handleInputFile"
        class="tw-w-110px tw-h-110px tw-opacity-0 tw-cursor-pointer"
      />
      <el-icon
        class="tw-text-32px tw-absolute tw-left-50% tw-top-50% -tw-translate-50%"
        @click.stop="handleTriggerUpload"
      >
        <Plus />
      </el-icon>
    </div>
    <div
      v-else
      class="tw-w-24px tw-h-24px tw-absolute
      tw-right-0 tw-top-0 tw-bg-[rgba(63,65,77,0.7)] tw-text-white
      tw-cursor-pointer tw-flex tw-justify-center tw-items-center"
      @click.stop="uploadedFiles = []"
    >
      <el-icon><Delete /></el-icon>
    </div>
  </Item>
</template>
