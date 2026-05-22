<template>
  <div class="tw-cursor-pointer">
    <el-button
      type="primary"
      class="tw-w-full"
      :disabled="!crop.isModified"
      @click="confirm"
    >
      <el-icon class="icon">
        <check />
      </el-icon>
      <span class="tw-ml-[5px]">确定</span>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '../../store/useEditorStore';
import { Check } from '@element-plus/icons-vue';

const { crop } = useEditorStore();

const confirm = async () => {
  crop.confirmCrop();
};
</script>
