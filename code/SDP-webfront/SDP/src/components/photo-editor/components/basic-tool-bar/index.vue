<template>
  <!--  <div class="tw-flex tw-flex-center-x tw-flex-1 tw-pl-[120px]">
    <icon-button
      @click="history.clean"
      class="tw-w-[64px] tw-h-[64px] tw-py-[5px] tw-mr-[14px]"
      :icon="IconClean"
      :active-icon="IconCleanActive"
      text="清除"
    />
    <icon-button
      @click="history.undo"
      class="tw-w-[64px] tw-h-[64px] tw-py-[5px] tw-mr-[14px]"
      :icon="IconBack"
      :active-icon="IconBackActive"
      text="上一步"
    />
    <icon-button
      @click="history.redo"
      class="tw-w-[64px] tw-h-[64px] tw-py-[5px] tw-mr-[49px]"
      :icon="IconNext"
      :active-icon="IconNextActive"
      text="下一步"
    />
  </div>-->
  <div>
    <el-button class="tw-w-[88px] tw-font-normal tw-color-[#606166]" @click="emits('cancel')">取消</el-button>
    <el-button
      class="tw-w-[88px]"
      :loading="saving"
      type="primary"
      @click="finish"
    >{{ confirmButtonText }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import IconClean from '@/assets/photo-edit/icon_clean.png';
// import IconCleanActive from '@/assets/photo-edit/icon_clean_active.png';
// import IconBack from '@/assets/photo-edit/icon_back.png';
// import IconBackActive from '@/assets/photo-edit/icon_back_active.png';
// import IconNext from '@/assets/photo-edit/icon_next.png';
// import IconNextActive from '@/assets/photo-edit/icon_next_active.png';
// import IconButton from '../icon-button/index.vue';
import { useEditorStore } from '../../store/useEditorStore';
import { useToolBarStore, TOOL_ENUM } from '../../store/useToolBarStore';
import { RETURN_TYPE } from '../../types';

interface IProps {
  returnType: RETURN_TYPE;
  confirmButtonText: string;
}

const props = defineProps<IProps>();

const editorStore = useEditorStore();
// const { history, exportHook } = editorStore;
const { exportHook } = editorStore;
const toolbarStore = useToolBarStore();

const saving = ref(false);

// onSave和onCancel事件通知父组件
const emits = defineEmits<{
  (e: 'save', data: string): void;
  (e: 'cancel'): void;
}>();

const finish = async () => {
  if (toolbarStore.activeTool === TOOL_ENUM.croping) {
    await editorStore.crop.confirmCrop();
  }
  saving.value = true;
  const { getOriginUrl, getOriginData } = exportHook;
  const originURL = props.returnType === RETURN_TYPE.URL ? await getOriginUrl() : await getOriginData();
  emits('save', originURL);
  saving.value = false;
};
</script>

<style scoped lang="scss">
:deep(.el-switch__label.is-active) {
  color: #18181a;
}
</style>
