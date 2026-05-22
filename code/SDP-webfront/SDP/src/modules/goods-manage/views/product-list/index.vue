<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleSearch="handleSearchWithCount"
        @handleReset="myHandleReset"
        :config="searchConfig"
      >
        <template #styleCode>
          <KeySelectSearch
            v-model="params"
            :trim="false"
            key-width="88px"
            :key-list="styleCodeKeySelectList"
          >
            <template #default="{ keyValue }">
              <el-input
                :placeholder="['styleCode', 'skcCode'].includes(keyValue) ? '支持批量，用“,”、空格或换行隔开' : '请输入'"
                clearable
                v-model="(params[keyValue as keyof IProductPageReq] as string)"
              />
            </template>
          </KeySelectSearch>
        </template>
        <template #user>
          <KeySelectSearch
            v-model="params"
            key-width="80px"
            :key-list="userKeySelectList"
          >
            <template #default="{ keyValue }">
              <DesignerSelect
                v-if="keyValue === 'designerId'"
                v-model="params.designerId"
                show-read-me-btn
              />
              <UserQuerySelect v-else v-model="(params[keyValue as keyof IProductPageReq] as string)" />
            </template>
          </KeySelectSearch>
        </template>
      </sc-search-area>
    </template>

    <template #header>
      <el-row justify="space-between" align="bottom">
        <div class="tw-flex tw-flex-wrap tw-items-center">
          <sc-condition-select
            v-model="params.skcStatus"
            :condition-info="{
              title: '商品状态：',
              conditionList: statusConditionList
            }"
            class="tw-mr-4"
            @conditionChange="handleSearch(1)"
          />
          <div class="tw-mb-5px tw-flex-center-y">
            商品标签：
            <el-checkbox
              :model-value="params.labels?.includes('待更新')"
              @change="handleWait"
            >
              待更新({{ waitToUpdateCount }})
            </el-checkbox>
          </div>
        </div>
        <div>
          <el-dropdown>
            <el-button>
              批量操作<el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleBatchCopySPU">复制SPU</el-dropdown-item>
                <el-dropdown-item @click="handleBatchCopySKC">复制SKC</el-dropdown-item>
                <el-dropdown-item @click="handleBatchCopySKU">复制SKU</el-dropdown-item>
                <el-dropdown-item @click="handleBatchCopyPlatSPU">复制平台SPU</el-dropdown-item>
                <el-dropdown-item @click="handleBatchCopyPlatSKC">复制平台SKC</el-dropdown-item>
                <el-dropdown-item @click="handleBatchCopyPlatSKU">复制平台SKU</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-tooltip
            v-if="CJ"
            :content="testPriceDisabledTips"
            placement="top"
            :disabled="canTestPrice"
          >
            <el-button
              class="tw-mb-5px tw-ml-3"
              :disabled="!canTestPrice"
              type="primary"
              @click="handleBatchTestPrice()"
            >
              测价通过
            </el-button>
          </el-tooltip>
        </div>
      </el-row>
    </template>

    <template #main>
      <sc-table
        :key="tableKey"
        ref="tableRef"
        row-key="styleCode"
        height="100%"
        :data="tableData"
        :columns="tableColumns"
        :span-method="tableSpanMethod"
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
  </sc-app-page>
</template>

<script setup lang="ts">
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useBatch } from './hooks/use-batch';
import { useTable } from './hooks/use-table-columns';
import { onActivated, ref } from 'vue';
import { ScTable } from '@toy/business-components';
import KeySelectSearch from '@/components/key-select-search/index.vue';
import UserQuerySelect from '@/components/user-query-select/index.vue';
import DesignerSelect from '@/components/designer-select';
import { usePermissionConfig } from '../../use-permission-config';
import { fetchProductPage, fetchProductStateTotal } from '../../api/product';
import { IProductPageReq } from '../../api/product/type';
import { useTableSpan } from './hooks/use-table-span';
import { SKC_STATUS_ENUM, SKC_STATUS_OPTIONS } from './constant';
import { ArrowDown } from '@element-plus/icons-vue';

const { CJ } = usePermissionConfig();
const waitToUpdateCount = ref(0);
const tableRef = ref<InstanceType<typeof ScTable>>();

const { searchConfig } = useSearch();

const statusConditionList = ref([{ value: '', label: '全部' }, ...SKC_STATUS_OPTIONS]);

const userKeySelectList: { label: string; value: keyof IProductPageReq; }[] = [
  { label: '设计师', value: 'designerId' },
  { label: '运营人', value: 'businessOperatorId' },
  { label: '上架人', value: 'onShelvesId' },
];

const styleCodeKeySelectList: typeof userKeySelectList = [
  { label: 'SPU', value: 'styleCode' },
  { label: 'SKC', value: 'skcCode' },
  { label: 'SKU', value: 'skuCode' },
  { label: '平台SPU', value: 'platformProductId' },
  { label: '平台SKC', value: 'platformSkcId' },
  { label: '平台SKU', value: 'platformSkuId' },
];

const { tableColumns } = useTable();
const { tableKey, tableSpanMethod, spanTableData } = useTableSpan(tableColumns);

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
    api: fetchProductPage,
    params: {
      pageNum: 1,
      pageSize: 20,
    },
  },
  response: {
    handleResponseData: spanTableData,
  }
});

const myHandleReset = () => {
  handleReset();
  getStatusCount();
};

const getStatusCount = async () => {
  const res = await fetchProductStateTotal({
    ...params.value,
    pageSize: 1000000
  });
  const statusCountList = SKC_STATUS_OPTIONS.map((item) => {
    const count = res.data?.find(i => Number(i.taskStatus) === item.value)?.total || 0;
    return { ...item, label: `${item.label}（${count}）` };
  });
  statusConditionList.value = [{ value: '', label: '全部' }, ...statusCountList];
  waitToUpdateCount.value = res.data?.find(i => Number(i.taskStatus) === SKC_STATUS_ENUM.TO_BE_UPDATED)?.total || 0;
};
const handleSearchWithCount = async () => {
  getStatusCount();
  await handleSearch();
};
onActivated(() => {
  handleSearchWithCount();
});

const {
  canTestPrice,
  testPriceDisabledTips,
  handleBatchTestPrice,
  handleBatchCopySPU,
  handleBatchCopySKC,
  handleBatchCopySKU,
  handleBatchCopyPlatSPU,
  handleBatchCopyPlatSKC,
  handleBatchCopyPlatSKU,
  handleSelectionChange
} = useBatch({
  onBatchSuccess: () => {
    tableRef.value?.clearSelection();
    handleSearchWithCount();
  },
});
const handleWait = (v: any) => {
  const { labels } = params.value;
  if (v) {
    params.value.labels = [...new Set([...(labels || []), '待更新'])];
  } else {
    params.value.labels = labels?.filter(label => label !== '待更新') || [];
  }
  handleSearch();
};
</script>
