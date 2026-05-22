<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      />
    </template>

    <template #header>
      <el-button
        v-if="XZMB"
        type="primary"
        :icon="Plus"
        @click="handleAdd()"
      >
        新增
      </el-button>
      <el-tooltip
        v-if="PLQYMB"
        content="请选择至少一个停用状态的数据"
        placement="top"
        :disabled="canBatchEnable"
      >
        <el-button
          :disabled="!canBatchEnable"
          type="primary"
          plain
          @click="handleBatchEnable(true)"
        >
          批量启用
        </el-button>
      </el-tooltip>
      <el-tooltip
        v-if="PLTYMB"
        content="请选择至少一个启用状态的数据"
        placement="top"
        :disabled="canBatchDisable"
      >
        <el-button
          :disabled="!canBatchDisable"
          type="danger"
          plain
          @click="handleBatchEnable(false)"
        >
          批量停用
        </el-button>
      </el-tooltip>
    </template>

    <template #main>
      <sc-table
        ref="tableRef"
        row-key="templateId"
        :data="tableData"
        :columns="tableColumns"
        @selection-change="handleSelectionChange"
      />
    </template>

    <template #ffooter>
      <el-row
        style="width: 100%"
        type="flex"
        justify="end"
      >
        <pagination
          :total="tableTotal"
          :current-page="params.pageNum"
          :page-size="params.pageSize"
          :page-sizes="[20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>

    <AddDialog
      v-model="addDialogVisible"
      :operation-type="operationType"
      :data="currentRow"
      @success="handleSearch(1)"
    />
  </sc-app-page>
</template>

<script setup lang="ts">
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useBatch } from './hooks/use-batch';
import { useTable } from './hooks/use-table-columns';
import { onActivated, ref } from 'vue';
import { ScTable } from '@toy/business-components';
import { usePermissionConfig } from '../../use-permission-config';
import { Plus } from '@element-plus/icons-vue';
import AddDialog from './components/add-dialog.vue';
import { fetchSizeTempPage } from '../../api';
import type { ISizeTempPageResItem } from '../../api/types';

const { PLQYMB, PLTYMB, XZMB } = usePermissionConfig();

const tableRef = ref<InstanceType<typeof ScTable>>();
const addDialogVisible = ref(false);
const currentRow = ref<ISizeTempPageResItem>();

const { searchConfig } = useSearch();

const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList({
  request: {
    api: fetchSizeTempPage,
    params: {
      pageNum: 1,
      pageSize: 20,
    },
    handleParams(data) {
      if (data.catId && Array.isArray(data.catId)) {
        data.catId = data.catId[data.catId.length - 1];
      }
      return data;
    }
  },
});
onActivated(() => {
  handleSearch();
});

const { canBatchEnable, canBatchDisable, handleBatchEnable, handleSelectionChange } = useBatch({
  onBatchSuccess: () => {
    tableRef.value?.clearSelection();
    handleSearch();
  },
});

const operationType = ref<'add' | 'edit' | 'copy'>('add');
const handleAdd = (type: typeof operationType.value = 'add', row?: ISizeTempPageResItem) => {
  addDialogVisible.value = true;
  currentRow.value = row;
  operationType.value = type;
};

const { tableColumns } = useTable({
  onEdit: (row) => {
    operationType.value = 'edit';
    handleAdd('edit', row);
  },
  onCopy: (row) => {
    operationType.value = 'copy';
    handleAdd('copy', row);
  },
});
</script>
