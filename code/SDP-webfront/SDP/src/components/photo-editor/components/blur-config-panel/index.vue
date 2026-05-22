<template>
  <div class="tw-text-[14px] tw-mt-[21px] tw-mb-[11px] tw-color-[#18181A] tw-flex tw-justify-between">
    <span class="tw-text-[14px] tw-color-[#18181A] tw-font-bold tw-mb-[11px]">虚化程度</span>
    <span>{{ blur.blur }}</span>
  </div>
  <el-slider
    :show-tooltip="false"
    v-model="blur.blur"
    :step="1"
    :min="0"
    :max="100"
    @change="
      () => {
        blur.applyBlur();
        history.addRecord();
      }
    "
  />
</template>

<script lang="ts" setup>
import { useEditorStore } from '../../store/useEditorStore';
import { ElSlider } from 'element-plus';

const { blur, history } = useEditorStore();
</script>
