<template>
  <div class="tw-text-[14px] tw-color-[#18181A] tw-font-bold">旋转</div>
  <div class="tw-pt-[12px] tw-flex">
    <el-button class="tw-flex-1 tw-h-[32px]" @click="handleRotate">
      <img
        src="@/assets/photo-edit/icon_rotate_inner.png"
        alt="旋转"
        class="tw-w-[14px] tw-h-[14px] tw-mr-[5px]"
      />
      <span class="tw-text-[14px] tw-font-normal">旋转</span>
    </el-button>
    <el-button class="tw-flex-1 tw-h-[32px]" @click="handleFlipX">
      <img
        src="@/assets/photo-edit/icon_overturn.png"
        alt="翻转"
        class="tw-w-[14px] tw-h-[14px] tw-mr-[5px]"
      />
      <span class="tw-text-[14px] tw-font-normal">翻转</span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '../../store/useEditorStore';

const { rotate, history } = useEditorStore();
const handleRotate = () => {
  rotate.rotate();
  history.addRecord();
};
const handleFlipX = () => {
  rotate.flipX();
  history.addRecord();
};
</script>
