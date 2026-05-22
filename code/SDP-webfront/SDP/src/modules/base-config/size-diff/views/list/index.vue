<template>
  <sc-app-page>
    <template #header>
      <el-button
        type="primary"
        :icon="Plus"
        @click="handleAdd()"
      > 新增 </el-button>
    </template>

    <template #main>
      <sc-table
        ref="tableRef"
        :data="tableData"
        :columns="tableColumns"
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
      v-model="formDialogVisible"
      :operation-type="operationType"
      :data="currentRow"
      @success="handleSearch(1)"
    />
    <DetailDialog v-model="detailVisible" :data="currentRow" />
  </sc-app-page>
</template>

<script setup lang="ts">
import { useList } from '@toy/v-use';
import { useTable } from './hooks/use-table-columns';
import { onActivated, ref } from 'vue';
import { ScTable } from '@toy/business-components';
import { Plus } from '@element-plus/icons-vue';
import AddDialog from './components/add-dialog.vue';
import DetailDialog from './components/detail-dialog.vue';
import { fetchSizeDiffPage } from '../../api';
import type { ISizeDiffPageResItem } from '../../api/types';

const formDialogVisible = ref(false);
const detailVisible = ref(false);
const operationType = ref<'add' | 'edit'>('add');
const currentRow = ref<ISizeDiffPageResItem>();

const { params, tableTotal, tableData, handleSearch, handleSizeChange, handleCurrentChange } = useList({
  request: {
    api: fetchSizeDiffPage,
    params: {
      pageNum: 1,
      pageSize: 20,
    },
  },
});
onActivated(() => {
  handleSearch();
});

const handleAdd = () => {
  currentRow.value = undefined;
  operationType.value = 'add';
  formDialogVisible.value = true;
};

const { tableColumns } = useTable({
  onEdit: (row) => {
    currentRow.value = row;
    operationType.value = 'edit';
    formDialogVisible.value = true;
  },
  onDetail: (row) => {
    currentRow.value = row;
    detailVisible.value = true;
  },
});
</script>
