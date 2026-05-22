<!-- 产品属性 -->
<template>
  <div class="tw-w-100%">
    <el-popover
      ref="popoverRef"
      placement="bottom-start"
      :width="530"
      trigger="click"
      popper-class="color-picker-popover"
      :disabled="disabled"
    >
      <template #reference>
        <el-input
          v-model="modelValue"
          placeholder="请选择颜色"
          readonly
          :disabled="disabled"
          class="color-picker-input"
        >
          <template #suffix>
            <el-icon><ArrowDown /></el-icon>
          </template>
        </el-input>
      </template>
      <div
        class="tw-flex"
        style="align-items: flex-start;"
      >
        <div class="tw-w-150px s-h-300">
          <div class="tw-p-10px">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索颜色"
              size="small"
              clearable
              @input="handleSearch"
            />
          </div>
          <div
            class="tw-flex-center-y tw-m-t-5px tw-m-b-5px tw-cursor-pointer tw-p-x-10px"
            v-for="(c, index) in displayColorOptions"
            @click="handleColorName(index)"
            :key="index"
          >
            <div class="tw-w-80px" :style="`color: ${colorIndex === index ? '#605CE5' : ''}`">{{ c.name }}</div>
            <el-icon :color="`${colorIndex === index ? '#605CE5' : ''}`"><ArrowRight /></el-icon>
          </div>
        </div>
        <div class="flex-box-color">
          <div
            v-for="i in displayColorOptions[colorIndex]?.children || []"
            :key="i.specId"
            @click="handleSelect(i)"
            class="tw-w-25% tw-flex-center-xy tw-pb-5px tw-pt-5px tw-pl-10px tw-pr-10px tw-cursor-pointer hover:tw-bg-gray-100"
          >
            <div
              class="color-box-bg"
              :style="`background-color: rgba${i.valueExtendInfo};`"
            />
            <div class="tw-p-l-5px tw-w-55px">{{ i.name }}</div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang='ts'>
import { ref, PropType, computed } from 'vue';
import { ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import { useForm } from '../../hooks/use-form';


const { colorOptions } = useForm();
const modelValue = defineModel({
  type: String,
  default: '',
});

defineProps<{
  disabled: boolean;
}>();

const popoverRef = ref<any>(null);

const handleSelect = (item:any) => {
  modelValue.value = item.name;
  popoverRef.value?.hide?.();
};

const colorIndex = ref<number>(0);
const handleColorName = (index: number) => {
  colorIndex.value = index;
};

// 搜索功能
const searchKeyword = ref('');
const filteredColorOptions = ref<any[]>([]);

const handleSearch = () => {
  if (!searchKeyword.value) {
    filteredColorOptions.value = [];
    colorIndex.value = 0;
    return;
  }
  const keyword = searchKeyword.value.toLowerCase();
  // 过滤颜色选项
  const result: any[] = [];
  colorOptions.value.forEach((category: any) => {
    const matchedChildren = category.children?.filter((color: any) => color?.name?.toLowerCase()?.includes(keyword));
    if (matchedChildren?.length > 0) {
      result.push({
        ...category,
        children: matchedChildren
      });
    }
  });
  filteredColorOptions.value = result;
  // 搜索后默认选中第一个分类
  colorIndex.value = 0;
};

// 获取要显示的颜色选项
const displayColorOptions = computed(() => {
  if (searchKeyword.value && filteredColorOptions.value.length > 0) {
    return filteredColorOptions.value;
  }
  return colorOptions.value;
});
</script>
<style scoped>
  .form-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px
  }
  .flex-box-color {
    display: flex;
    flex-wrap: wrap;
    width: 380px;
    max-height: 260px;
    overflow-y: auto;
  }
  .color-box-bg {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: red;
  }
  .s-h-300 {
    width: 150px;
    height: 260px;
    overflow-y: scroll;
  }
  :deep(.color-picker-input .el-input__wrapper) {
    cursor: pointer;
  }
</style>
