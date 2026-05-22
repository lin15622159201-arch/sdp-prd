<script lang="ts" setup>
import { defineModel, PropType } from 'vue';
import { IGalleryListItem, IModelInfo } from '../type';
import Item from '../item.vue';
import { InfoFilled } from '@element-plus/icons-vue';

defineProps({
  list: {
    type: Array as PropType<IGalleryListItem[]>,
    default: () => [],
  },
});

const modelInfo = defineModel({
  type: Object as PropType<IModelInfo>,
  default: () => {},
});

const handleSelect = (item: IGalleryListItem) => {
  modelInfo.value = {
    ...item,
    url: item.url,
    aiModelCode: item.id,
    name: item.name,
    modelMaterialId: '',
  };
};

</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <div class="tw-flex tw-justify-between">
      <div class="tw-flex tw-items-center">
        <span class="tw-text-#3F414D tw-text-16px tw-font-bold">模特人种</span>
        <el-tooltip
          content="仅控制模特人种，随机生成模特脸部"
          placement="right"
          effect="dark"
        >
          <el-icon class="tw-text-primary tw-ml-4px"><InfoFilled /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="tw-flex tw-flex-wrap tw-gap-24px">
      <Item
        v-for="item in list"
        :key="item.id"
        :img="item.url"
        :label="item.name"
        :isSelected="modelInfo.aiModelCode === item.id"
        @click="handleSelect(item)"
      />
    </div>
  </div>
</template>
