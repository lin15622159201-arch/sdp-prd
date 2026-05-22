<script setup lang="ts">
import { onMounted, onUpdated, ref, shallowRef } from 'vue';

interface IProps {
  hiddenEmptyContent?: boolean;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    hiddenEmptyContent: false,
  },
);

const isShow = ref(true);
const colRef = shallowRef();

const handleCheckEl = () => {
  if (!props.hiddenEmptyContent) return;

  const el = colRef.value.$el as HTMLDivElement;
  if (!el?.children?.length) {
    isShow.value = false;
    return;
  }
  isShow.value = Array.from(el.children)
    .some((node) => {
      return node.clientHeight > 0;
    });
};

onUpdated(() => requestAnimationFrame(handleCheckEl));

onMounted(() => requestAnimationFrame(handleCheckEl));
</script>

<template>
  <el-col
    v-bind="$attrs"
    ref="colRef"
    :class="{
      'responsive-col__hidden': !isShow
    }"
  >
    <slot />
  </el-col>
</template>

<style lang="scss" scoped>
.responsive-col__hidden {
  position: absolute;
  visibility: hidden;
  z-index: 0;
  opacity: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
  &.is-guttered {
    min-height: 0;
    max-height: 0;
  }
}
</style>
