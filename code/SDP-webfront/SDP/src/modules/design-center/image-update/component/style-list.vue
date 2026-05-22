<template>
  <div
    v-for="(item, index) in styleList"
    class="style-item tw-p-2 tw-flex tw-items-center tw-mb-2 tw-gap-2"
    :key="item.spuCode"
    :class="{ active: activeIndex === index }"
    @click="activeIndex = index"
  >
    <CustomImage
      v-if="item.skcList?.[0]?.pictures?.[0]?.pictureUrl"
      class="tw-w-56px tw-h-56px tw-overflow-hidden tw-rounded tw-border tw-border-gray-200 tw-border-solid"
      :src="item.skcList[0].pictures[0].pictureUrl"
      :preview-src-list="[item.skcList[0].pictures[0].pictureUrl]"
      fit="cover"
    />
    <div class="tw-text-sm tw-flex-1 tw-h-full">
      <p>SPU编号: {{ item.spuCode }}</p>
      <p class="tw-text-gray-600 tw-mt-1">{{[item.designerGroupName, item.designerName].filter(Boolean).join('-')}}</p>
      <slot
        name="info"
        :data="item"
        :index="index"
      />
    </div>
    <el-popconfirm
      v-if="isEditable"
      title="确定删除吗？"
      @confirm="onRemove(index)"
    >
      <template #reference>
        <el-button
          type="danger"
          class="tw-w-20px"
          text
          size="large"
          :icon="Delete"
          @click.stop
        />
      </template>
    </el-popconfirm>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { IImageUpdateListItem, IImageUpdatePageItem } from '../api/type';
import { Delete } from '@element-plus/icons-vue';

type IItem = IImageUpdateListItem | IImageUpdatePageItem;
const props = defineProps({
  styleList: {
    type: Array as PropType<IItem[]>,
    default: () => [],
  },
  index: {
    type: Number,
    default: 0,
  },
  /** 是否可编辑 */
  isEditable: {
    type: Boolean,
    default: false,
  },
});

const activeIndex = computed({
  get() {
    return props.index;
  },
  set(val) {
    emit('update:index', val);
  }
});

const onRemove = (index: number) => {
  if (index === activeIndex.value) {
    activeIndex.value = 0;
  } else if (index < activeIndex.value) {
    activeIndex.value -= 1;
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  emit('remove', index);
};

const emit = defineEmits<{
  (e: 'update:index', val: number): void;
  (e: 'remove', index: number): void;
}>();
</script>
<style scoped lang="scss">
.style-item {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  cursor: pointer;
  &.active {
    border-color: var(--el-color-primary);
  }
}
</style>
