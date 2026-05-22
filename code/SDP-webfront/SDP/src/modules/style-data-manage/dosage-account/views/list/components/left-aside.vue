<template>
  <div class="left_aside">
    <div
      v-for="item in config"
      :key="item.value"
      :class="{
        item: true,
        active: item.value === modelValue
      }"
      @click="handleItem(item.value)"
    >
      {{item.label}}（{{item.count}}）
    </div>
  </div>
</template>
<script lang="ts" setup>
import { throttle } from 'lodash-es';
import { PropType } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  config: {
    type: Array as PropType<{
      value: string | number;
      label: string;
      count: string | number;
    }[]>,
    required: true,
  },
  modelValue: {
    type: [Number, String],
    required: true
  },
});
const $router = useRouter();
const emits = defineEmits(['update:modelValue', 'change']);
const handleItem = throttle((val: string | number) => {
  if (props.modelValue === val) return;
  emits('update:modelValue', val);
  emits('change', val);
  $router.replace({
    query: {
      type: val,
    },
  });
});
</script>
<style lang="scss" scoped>
.left_aside {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .item {
    font-size: 13px;
    line-height: 20px;
    cursor: pointer;
    transition: color .3s;
    &:hover {
      color: var(--el-color-primary);
    }
    &.active {
      color: var(--el-color-primary);
    }
  }
}
</style>
