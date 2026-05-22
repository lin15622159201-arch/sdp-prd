<script lang="ts" setup>
import { defineModel, PropType, computed } from 'vue';

import { InfoFilled } from '@element-plus/icons-vue';

const emit = defineEmits<{
  (e: 'change', code: string): void;
}>();

const categoryCode = defineModel('categoryCode', {
  type: String,
  default: '',
});

const categoryName = defineModel('categoryName', {
  type: String,
  default: '',
});

const props = defineProps({
  categories: {
    type: Array as PropType<{ code: string; label: string; }[]>,
    default: () => [],
  },
  defaultCategoryCode: {
    type: String,
    default: '',
  },
  labels: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const isOther = computed(() => {
  const otherCategory = props.categories.find(item => item.label === '其他');
  return otherCategory?.code === categoryCode.value;
});

const isShowLabel = computed(() => props.defaultCategoryCode === categoryCode.value && !isOther.value);

const handleChange = (code: string) => {
  categoryName.value = props.categories.find(item => item.code === code)?.label || '';
  emit('change', code);
};

</script>

<template>
  <div class="tw-flex tw-flex-col tw-font-bold">
    <span class=" tw-text-#3F414D tw-mb-12px tw-text-16px">款式标签</span>
    <div class="tw-flex tw-flex-col tw-bg-#F2F4FA tw-rounded-8px tw-p-12px">
      <div class="tw-flex tw-gap-8px tw-items-center">

        <span class=" tw-text-#3F414D tw-mb-4px tw-text-14px">品类</span>
        <div class="tw-text-primary tw-flex tw-items-start tw-gap-2px tw-mb-4px">
          <el-tooltip
            content="当前服装品类仍在实验中,生成效果可能欠佳"
            placement="right"
            effect="dark"
          >
            <el-icon><InfoFilled /></el-icon>
          </el-tooltip>
        </div>
      </div>
      <el-select
        v-model="categoryCode"
        :disabled="disabled"
        @change="handleChange"
      >
        <el-option
          v-for="item in categories"
          :key="item.code"
          :label="item.label"
          :value="item.code"
        />
      </el-select>
      <div v-show="isShowLabel" class="tw-flex tw-flex-col tw-mt-12px tw-font-normal">
        <span class=" tw-text-#3F414D tw-mb-4px tw-text-14px">标签</span>
        <div class="tw-flex tw-flex-wrap tw-gap-12px">
          <div
            class="tw-text-white tw-text-12px tw-bg-#A3AACC tw-rounded-4px tw-leading-22px tw-px-4px tw-text-nowrap"
            v-for="(data, index) in labels"
            :key="index"
          >
            {{ data }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
