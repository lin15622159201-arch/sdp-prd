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
        width="110"
        fixed="right"
      >
        <template #default="{ $index }">
          <el-button
            v-if="$index < 2"
            type="primary"
            text
            size="small"
            :controls="false"
            @click="handleClearRow($index)"
          >
            清空
          </el-button>
          <el-button
            v-if="$index === 0"
            type="primary"
            text
            size="small"
            :controls="false"
            @click="handleCalculateDown()"
          >
            向下计算
          </el-button>
          <el-button
            v-if="$index === 1"
            type="primary"
            text
            size="small"
            :controls="false"
            @click="handleDiffDown()"
          >
            向下复制
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang='ts'>
import { ITemuPartRes } from '@/api/temu/type';
import NumberBasis from '@/components/number-basis/package/number-basis.vue';
import { computed, ref, watch } from 'vue';
import { ISizeTempSizeResSizeItem } from '../../../api/types';
import { ISizeDiffEditDiffItem } from '@/modules/base-config/size-diff/api/types';

const props = defineProps<{
  /** 选中的尺码列表 */
  sizes: string[];
  /** 选中的部位 */
  parts: ITemuPartRes;
  /** 默认尺码值 */
  defaultSizes?: ISizeTempSizeResSizeItem[];
  /** 默认档差值 */
  defaultDiffs?: ISizeDiffEditDiffItem[];
}>();

interface SizeFormRow {
  [key: string]: string | number | undefined;
}

const DIFF_ROW_NAME = '档差';

// 创建空数据模板
const createSizeRows = (size: string, values: ISizeTempSizeResSizeItem['values'] = []) => {
  const row: SizeFormRow = { size };
  const diffRow: SizeFormRow = { size: DIFF_ROW_NAME }; // 档差
  props.parts.forEach((item) => {
    const target = values.find(v => Number(v.part) === Number(item.id));
    row[item.id] = target?.value;
    diffRow[item.id] = target?.diff;
  });
  return [row, diffRow];
};
// 清空表格行数据
const clearRowData = (row: SizeFormRow) => {
  Object.keys(row).forEach((key) => {
    if (key !== 'size') {
      row[key] = undefined;
    }
  });
};

// 根据选中的尺码动态生成表格数据
const originTableData = ref<SizeFormRow[]>([]);
// 去掉最后一个档差行
const tableData = computed(() => originTableData.value.slice(0, originTableData.value.length - 1));

const getDiffValue = (size: string, partId: number) => {
  const diffItemParts = props.defaultDiffs?.find(diff => diff.size === size)?.parts;
  return diffItemParts?.find(p => Number(p.partId) === Number(partId))?.diff;
};

watch(
  () => [props.sizes, props.parts],
  () => {
    const sizes = props.sizes || [];
    const newTableData: SizeFormRow[] = [];

    if (sizes.length === 0) {
      originTableData.value = newTableData;
      return;
    }

    if (!props.sizes.length || !props.parts.length) {
      return;
    }

    sizes.forEach((size) => {
      if (originTableData.value.length > 0) {
        const existingRowIndex = originTableData.value.findIndex(row => row.size === size);
        const row = originTableData.value[existingRowIndex];
        if (existingRowIndex !== -1) {
          // 已存在该尺码行，保留数据
          newTableData.push(row);
          // 如果该尺码存在档差行，也保留档差行数据
          const diffRow = originTableData.value[existingRowIndex + 1] || createSizeRows(size)[1];

          // 判断part是不是新增的
          props.parts.forEach((part) => {
            if (!(part.id in row)) {
              // 新增的part，使用默认档差值
              diffRow[part.id] = getDiffValue(size, Number(part.id));
            }
          });

          newTableData.push({ ...diffRow });
          return;
        }
      }
      // 没有该尺寸行,创建新行
      const defaultValues = props.defaultSizes?.find(item => item.size === size)?.values || [];
      props.parts.forEach((part) => {
        const defaultDiff = getDiffValue(size, Number(part.id));
        if (defaultDiff) {
          const target = defaultValues.find(v => Number(v.part) === Number(part.id));
          if (!target) {
            defaultValues.push({
              part: Number(part.id),
              partName: part.name,
              value: undefined,
              diff: defaultDiff,
            });
          } else if (!target.diff) {
            target.diff = defaultDiff;
          }
        }
      });
      newTableData.push(...createSizeRows(size, defaultValues));
    });

    originTableData.value = newTableData;
  },
  { deep: true }
);

// 清空单行
const handleClearRow = (index: number) => {
  if (index === 0) {
    tableData.value.forEach((item) => {
      if (item.size !== DIFF_ROW_NAME) {
        clearRowData(item);
      }
    });
  } else if (index === 1) {
    tableData.value.forEach((item) => {
      if (item.size === DIFF_ROW_NAME) {
        clearRowData(item);
      }
    });
  }
};
// 向下复制
const handleDiffDown = () => {
  const targetRow = tableData.value?.[1] ?? {};
  if (Object.keys(targetRow).length === 0) return;
  tableData.value.forEach((row, index) => {
    if (row.size === DIFF_ROW_NAME) {
      Object.assign(tableData.value[index], targetRow);
    }
  });
};
// 向下计算
const handleCalculateDown = () => {
  tableData.value.forEach((row, index) => {
    if (row.size === DIFF_ROW_NAME) return;
    if (index === 0) return;
    // 上一行的档差行
    const lastDiffRow = JSON.parse(JSON.stringify(tableData.value[index - 1]));
    // 上一行的尺码行
    const lastRow = JSON.parse(JSON.stringify(tableData.value[index - 2]));
    (Object.keys(lastDiffRow) as (keyof SizeFormRow)[]).forEach((key) => {
      const lastRowValue = lastRow[key];
      const lastDiffValue = lastDiffRow[key];
      if (key !== 'size') {
        if ((!!lastDiffValue || lastDiffValue === 0) && (!!lastRowValue || lastRowValue === 0)) {
          row[key] = String(Number(lastRowValue) + Number(lastDiffValue));
        }
      }
    });
  });
};

// 获取尺码值数据
const getSizeValues = (): ISizeTempSizeResSizeItem[] => {
  const result: ISizeTempSizeResSizeItem[] = [];
  for (let i = 0; i < tableData.value.length; i += 2) {
    const sizeRow = tableData.value[i];
    const diffRow = tableData.value[i + 1];
    const values: ISizeTempSizeResSizeItem['values'] = [];
    props.parts.forEach((part) => {
      values.push({
        part: Number(part.id),
        partName: part.name,
        value: sizeRow[part.id] as number,
        diff: diffRow ? (diffRow[part.id] as number) : 0,
      });
    });
    result.push({
      size: sizeRow.size as string,
      values,
    });
  }
  return result;
};

const reset = () => {
  originTableData.value = [];
};

defineExpose({
  getSizeValues,
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
