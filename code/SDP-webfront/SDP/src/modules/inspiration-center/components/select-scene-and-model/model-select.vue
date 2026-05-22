<script lang="ts" setup>
import { defineModel, PropType } from 'vue';
import { IGalleryListItem } from './type';
import Item from './item.vue';

const emit = defineEmits<{
  (event: 'change', model: IGalleryListItem): void;
}>();

defineProps({
  list: {
    type: Array as PropType<IGalleryListItem[]>,
    default: () => [],
  },
});

const currentSceneCode = defineModel({
  type: String,
  default: '',
});

const handleSelect = (item: IGalleryListItem) => {
  currentSceneCode.value = item.id;
  emit('change', item);
};

</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <div class="tw-flex  tw-gap-12px tw-text-16px ">
      <span class="tw-text-#3F414D tw-font-bold">模特人种</span>
    </div>
    <div class="tw-flex tw-flex-wrap tw-gap-24px">
      <Item
        v-for="item in list"
        :key="item.id"
        :img="item.url"
        :label="item.name"
        :isSelected="currentSceneCode === item.id"
        @click="handleSelect(item)"
      />
    </div>
  </div>
</template>
