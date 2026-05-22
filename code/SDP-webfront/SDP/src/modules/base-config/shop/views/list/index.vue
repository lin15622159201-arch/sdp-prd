<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      >
        <template #shopType>
          <DictionarySelect
            v-model="params.shopType"
            :dictionary="DICTIONARY_KEY.SHOP_TYPE"
            clearable
          />
        </template>
        <template #businessOperatorId>
          <UserSelect
            v-model="params.businessOperatorId"
            clearable
          />
        </template>
      </sc-search-area>
    </template>

    <template #header>
      <el-button
        v-if="XZDP"
        type="primary"
        :icon="Plus"
        @click="handleAdd()"
      >
        新增
      </el-button>
      <el-tooltip
        v-if="QYDP"
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
        v-if="QYDP"
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
        row-key="shopId"
        height="100%"
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

    <AddShopDialog
      v-model="addDialogVisible"
      :data="currentRow"
      @success="handleSearch(1)"
    />
    <DetailShopDialog
      v-model="detailDialogVisible"
      :data="currentRow"
    />
  </sc-app-page>
</template>

<script setup lang="ts">
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useBatch } from './hooks/use-batch';
import { useTable } from './hooks/use-table-columns';
import { ref } from 'vue';
import { ScTable } from '@toy/business-components';
import { usePermissionConfig } from '../../use-permission-config';
import { fetchShopPage } from '../../api';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { Plus } from '@element-plus/icons-vue';
import AddShopDialog from './components/add-dialog.vue';
import DetailShopDialog from './components/detail-dialog.vue';
import { IShopPageResItem } from '../../api/type';
import UserSelect from '@/components/user-select';
import { YES_NO_NUMBER_ENUM } from '@/constant';

const { QYDP, XZDP } = usePermissionConfig();

const tableRef = ref<InstanceType<typeof ScTable>>();
const addDialogVisible = ref(false);
const detailDialogVisible = ref(false);
const currentRow = ref<IShopPageResItem>();

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
    api: fetchShopPage,
    params: {
      pageNum: 1,
      pageSize: 20,
    },
    handleParams: (paramsObj) => {
      paramsObj.expired = paramsObj.expired === YES_NO_NUMBER_ENUM.ALL ? undefined : paramsObj.expired;
      return paramsObj;
    }
  },
});
handleSearch();

const { canBatchEnable, canBatchDisable, handleBatchEnable, handleSelectionChange } = useBatch({
  onBatchSuccess: () => {
    tableRef.value?.clearSelection();
    handleSearch();
  },
});

const handleAdd = (row?: IShopPageResItem) => {
  addDialogVisible.value = true;
  currentRow.value = row;
};

const { tableColumns } = useTable({
  onEdit: (row) => {
    handleAdd(row);
  },
  onDetail: (row) => {
    detailDialogVisible.value = true;
    currentRow.value = row;
  },
});
</script>
