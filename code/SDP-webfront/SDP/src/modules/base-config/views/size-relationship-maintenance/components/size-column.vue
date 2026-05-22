<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ISizeConfig } from '../type';

export default defineComponent({
  name: 'SizeColumn',
  props: {
    column: {
      type: Object as PropType<ISizeConfig>,
      default: () => {},
    },
  },
  setup() {
    const hasChildren = (column: ISizeConfig) => {
      return Array.isArray(column.children) && column.children.length > 0;
    };
    return {
      hasChildren,
    };
  },
});

</script>

<template>
  <el-table-column
    v-if="hasChildren(column)"
    :label="column.name"
    align="center"
  >
    <size-column
      v-for="(child, index) in column.children"
      :key="index"
      :column="child"
    >
      <template #default="scope: any">
        <slot
          v-bind="{
            row: scope.row,
            column: scope.column,
            pid: scope.pid
              ? `${column.sampleSize}-${scope.pid}` : column.sampleSize
          }"
        />
      </template>
    </size-column>
  </el-table-column>
  <el-table-column
    v-else
    :label="column.name"
    header-align="center"
    align="center"
  >
    <template #default="scope">
      <slot
        v-bind="{
          row: scope.row,
          column: scope.column,
          pid: scope.pid
            ? `${column.sampleSize}-${scope.pid}` : column.sampleSize
        }"
      />
    </template>
  </el-table-column>
</template>

<style scoped lang="scss">
//
</style>
