<template>
  <div class="tw-flex tw-flex-center-x tw-flex-1 tw-pl-[120px]">
    <icon-button
      @click="history.clean"
      class="tw-w-[64px] tw-h-[64px] tw-py-[5px] tw-mr-[14px]"
      :icon="IconClean"
      :active-icon="IconCleanActive"
      text="清空"
    />
    <icon-button
      @click="history.undo"
      class="tw-w-[64px] tw-h-[64px] tw-py-[5px] tw-mr-[14px]"
      :icon="IconBack"
      :active-icon="IconBackActive"
      text="撤销"
    />
    <icon-button
      @click="history.redo"
      class="tw-w-[64px] tw-h-[64px] tw-py-[5px] tw-mr-[49px]"
      :icon="IconNext"
      :active-icon="IconNextActive"
      text="重做"
    />
  </div>
  <div>
    <el-button
      class="tw-w-[88px] tw-font-normal tw-color-[#606166]"
      @click="emits('cancel')"
    >取消</el-button>
    <el-button
      class="tw-w-[88px]"
      type="primary"
      @click="finish"
    >完成</el-button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import IconButton from '../icon-button/index.vue';
import IconClean from '@/assets/photo-edit/icon_clean.png';
import IconCleanActive from '@/assets/photo-edit/icon_clean_active.png';
import IconBack from '@/assets/photo-edit/icon_back.png';
import IconBackActive from '@/assets/photo-edit/icon_back_active.png';
import IconNext from '@/assets/photo-edit/icon_next.png';
import IconNextActive from '@/assets/photo-edit/icon_next_active.png';
import { useEditorStore } from '../../store/useEditorStore';

const editorStore = useEditorStore();
const { history } = editorStore;

const emits = defineEmits<{
  (e: 'save', url: string): void;
  (e: 'cancel'): void;
}>();

const finish = async () => {
  emits('save', '');
};
</script>
