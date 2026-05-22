<template>
  <div class="tw-text-[14px] tw-color-[#18181A] tw-font-bold">画布大小</div>
  <div class="tw-flex tw-mt-[10px]">
    <el-input
      :formatter="(value: number) => `宽 ${Math.round(value)}`"
      :parser="(value: string) => value.replace(/\宽\s?|[^\d]/g, '')"
      v-model="workspace.size.width"
      class="tw-mr-[5px]"
      @keydown.enter.stop="updateWorkspaceSize"
      @input="() => (isInputChange = true)"
    />
    <el-input
      :formatter="(value: number) => `高 ${Math.round(value)}`"
      :parser="(value: string) => value.replace(/\高\s?|[^\d]/g, '')"
      v-model="workspace.size.height"
      @keydown.enter.stop="updateWorkspaceSize"
      @input="() => (isInputChange = true)"
    />
  </div>
  <el-button
    type="primary"
    class="tw-w-full tw-mt-16px"
    @click="updateWorkspaceSize"
    :disabled="!isInputChange"
  >
    <el-icon class="icon">
      <check />
    </el-icon>
    <span class="tw-ml-[5px]">确定</span>
  </el-button>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ElInput, ElMessage } from 'element-plus';
import { Check } from '@element-plus/icons-vue';
import { useEditorStore } from '../../store/useEditorStore';

const { workspace, originImage, getCanvas } = useEditorStore();
const isInputChange = ref(false);

const checkSize = (width: number, heigt: number) => width < 512 || width > 5000 || heigt < 512 || heigt > 5000;

const updateWorkspaceSize = () => {
  const { width, height } = workspace.size;
  if (checkSize(width, height)) {
    ElMessage.warning('画布最小宽高512*512 最大 5000');
    return;
  }
  workspace.setSize(width, height);
  isInputChange.value = false;
};

onMounted(() => {
  originImage.image?.set({
    selectable: true,
  });
  getCanvas().renderAll();
});
onUnmounted(() => {
  getCanvas().discardActiveObject();
  originImage.image?.set({
    selectable: false,
  });
  getCanvas().renderAll();
});
</script>
