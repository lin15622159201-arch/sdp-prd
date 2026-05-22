<!-- 尺码表 -->
<template>
  <div class="size-form">
    <el-table
      :data="tableData"
      stripe
      border
      class="size-form-table"
    >
      <el-table-column
        prop="size"
        label="尺码"
        width="100"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in parts"
        :key="item.id"
        :label="item.name"
        align="center"
      >
        <template #default="{ row }">
          <number-basis
            v-model="row[item.id]"
            class="tw-w-full"
            size="small"
            clearable
            placeholder="输入数字"
            :precision="1"
            :min="0"
            :max="99999"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="60"
        fixed="right"
      >
        <template #default="{ row }">
          <el-button
            type="primary"
            text
            size="small"
            :controls="false"
            @click="clearRowData(row)"
          >
            清空
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang='ts'>
import NumberBasis from '@/components/number-basis/package/number-basis.vue';
import { ref, watch } from 'vue';
import { ISizeDiffEditDiffItem, ITemuPartListItem } from '../../../api/types';

const props = defineProps<{
  /** 选中的尺码列表 */
  sizes: string[];
  /** 选中的部位 */
  parts: ITemuPartListItem[];
  /** 默认尺码值 */
  defaultDiffs?: ISizeDiffEditDiffItem[];
}>();

interface SizeFormRow {
  [key: string]: string | number | undefined;
}

// 根据选中的尺码动态生成表格数据
const tableData = ref<SizeFormRow[]>([]);

// 清空表格行数据
const clearRowData = (row: SizeFormRow) => {
  Object.keys(row).forEach((key) => {
    if (key !== 'size') {
      row[key] = undefined;
    }
  });
};

watch(
  () => [props.sizes, props.parts, props.defaultDiffs],
  () => {
    const rows: SizeFormRow[] = [];

    props.sizes.forEach((size) => {
      const row: SizeFormRow = { size };
      props.parts.forEach((part) => {
        const diffItemParts = props.defaultDiffs?.find(diff => diff.size === size)?.parts;
        row[part.id] = diffItemParts?.find(p => p.partId === part.id)?.diff;
      });
      rows.push(row);
    });
    tableData.value = rows;
  },
  { deep: true }
);

// 获取尺码值数据
const getDiffs = (): ISizeDiffEditDiffItem[] => {
  const result: ISizeDiffEditDiffItem[] = [];
  tableData.value.forEach((row) => {
    const { size, ...partIds } = row;
    result.push({
      size: size as string,
      parts: Object.keys(partIds).map(id => ({
        partId: id,
        partName: props.parts.find(part => part.id === id)?.name || '',
        diff: row[id] as number,
      })),
    });
  });
  return result;
};

const reset = () => {
  tableData.value = [];
};

defineExpose({
  getDiffs,
  reset
});
</script>

<style scoped lang='scss'>
.size-form {
  .size-form-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .title {
      font-weight: 500;
      font-size: 14px;
    }
  }
  .size-form-table {
    margin-bottom: 0;
  }
  .grade-diff-row {
    display: flex;
    align-items: center;
    padding: 8px;
    border: 1px solid #ebeef5;
    border-top: none;
    background-color: #fafafa;
    .label {
      width: 100px;
      text-align: center;
      font-weight: 500;
      padding-right: 8px;
    }
    .inputs {
      flex: 1;
      display: flex;
      gap: 8px;
      .diff-input {
        width: 120px;
      }
    }
  }
}
</style>
