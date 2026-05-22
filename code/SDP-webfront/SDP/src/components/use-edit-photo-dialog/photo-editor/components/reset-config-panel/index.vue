<template>
  <div class="tw-text-[14px] tw-color-[#18181A] tw-font-bold tw-mb-[11px]">重置大小</div>
  <div class="tw-flex tw-mt-[12px]">
    <el-input
      :formatter="(value: number) => `宽 ${Math.round(value)}`"
      :parser="(value: string) => value.replace(/\宽\s?|[^\d]/g, '')"
      @input="() => handleInputChange('width')"
      v-model="originImage.width"
      class="tw-mr-[5px]"
      @keydown.enter.stop="handleChange"
    />
    <el-input
      @input="() => handleInputChange('height')"
      :formatter="(value: number) => `高 ${Math.round(value)}`"
      :parser="(value: string) => value.replace(/\高\s?|[^\d]/g, '')"
      v-model="originImage.height"
      @keydown.enter.stop="handleChange"
    />
  </div>
  <el-checkbox
    class="tw-mt-[16px]"
    label="保持纵横比"
    v-model="originImage.isLockRatio"
  />
  <el-button
    type="primary"
    class="tw-w-full tw-mt-16px"
    @click="handleChange"
    :disabled="!isInputChange"
  >
    <el-icon class="icon">
      <check />
    </el-icon>
    <span class="tw-ml-[5px]">确定</span>
  </el-button>
</template>

<script setup lang="ts">
import { ElInput, ElCheckbox, ElMessage } from 'element-plus';
import { useEditorStore } from '../../store/useEditorStore';
import { Check } from '@element-plus/icons-vue';
import { ref } from 'vue';

const { originImage, history } = useEditorStore();
const lastModified = ref('width');
const isInputChange = ref(false);

const handleInputChange = (inputName: string) => {
  lastModified.value = inputName;
  isInputChange.value = true;
};

// 图片最小宽高512*512 最大 5000
const checkSize = (width: number, heigt: number) => width < 512 || width > 5000 || heigt < 512 || heigt > 5000;

const handleChange = () => {
  let { width, height } = originImage;
  if (checkSize(width, height)) {
    ElMessage.warning('图片最小宽高512*512 最大 5000');
    return;
  }
  if (originImage.isLockRatio) {
    if (lastModified.value === 'width') {
      height = ((originImage.width / originImage.ratio) * 100) / 100;
    } else {
      width = (originImage.height * originImage.ratio * 100) / 100;
    }
  }
  originImage.updateSize(width, height);
  isInputChange.value = false;
  history.addRecord();
};
</script>
