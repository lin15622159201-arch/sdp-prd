<template>
  <el-pagination
    v-bind="$attrs"
    background
    :layout="layout"
    :page-sizes="pageSizes"
    :page-size="size"
    :pager-count="pagerCount"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  emits: ['size-change', 'current-change'],
  name: 'pagination',
  props: {
    size: {
      type: Number,
      default: 10,
    },

    pagerCount: {
      type: Number,
      default: 7,
    },

    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => {
        return [10, 20, 30, 50];
      },
    },

    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },

    // 是否固定到顶部
    autoScroll: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { emit }) {
    const $ScrollTo = (val = 0) => {
      window.scrollTo(0, val);
    };
    const handleSizeChange = (val: number) => {
      emit('size-change', val);
      if (props.autoScroll) {
        $ScrollTo();
      }
    };
    const handleCurrentChange = (val: number) => {
      emit('current-change', val);
      if (props.autoScroll) {
        $ScrollTo();
      }
    };
    return {
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>
