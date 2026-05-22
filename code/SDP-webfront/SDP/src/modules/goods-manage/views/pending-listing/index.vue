<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleSearch="handleSearchListAndCount(1)"
        @handleReset="myHandleReset"
        :config="searchConfig"
      >
        <template #styleCode>
          <KeySelectSearch
            v-model="params"
            :trim="false"
            key-width="88px"
            :key-list="[
              { label: 'SPU', value: 'styleCode' },
              { label: 'SKC', value: 'designCode' }
            ]"
          >
            <template #default="{ keyValue }">
              <el-input
                placeholder="支持批量，用“,”、空格或换行隔开"
                clearable
                v-model="params[keyValue as keyof IStyleOnShelvesPageReq]"
              />
            </template>
          </KeySelectSearch>
        </template>
        <template #designerId>
          <DesignerSelect v-model="params.designerId" show-read-me-btn />
        </template>
        <template #reviewUserId>
          <UserQuerySelect v-model="params.reviewUserId" />
        </template>
      </sc-search-area>
    </template>

    <template #header>
      <el-row justify="space-between" align="bottom">
        <div>
          <sc-condition-select
            v-for="(item, prop) in conditionStateMap"
            :key="prop"
            v-model="params[prop]"
            :condition-info="item!"
            @conditionChange="handleSearch(1)"
          />
        </div>
        <div class="tw-flex tw-gap-2">
          <el-dropdown>
            <el-button>
              批量操作<el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleBatchAudit">批量审核</el-dropdown-item>
                <el-dropdown-item @click="handleBatchCopySPU">复制SPU</el-dropdown-item>
                <el-dropdown-item @click="handleBatchCopySKC">复制SKC</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-tooltip
            v-if="FBSP"
            :content="pushShopReviewDisabledTips"
            placement="top"
            :disabled="canPushShopReview"
          >
            <el-button
              :disabled="!canPushShopReview"
              type="primary"
              plain
              @click="handleBatchPushShopReview()"
            >
              推送店主审核
            </el-button>
          </el-tooltip>
          <el-tooltip
            v-if="FBSP"
            :content="releaseDisabledTips"
            placement="top"
            :disabled="canRelease"
          >
            <el-button
              :disabled="!canRelease"
              type="primary"
              @click="handleBatchMarkListed()"
            >
              发布商品
            </el-button>
          </el-tooltip>
        </div>
      </el-row>
    </template>

    <template #main>
      <sc-table
        ref="tableRef"
        height="100%"
        row-key="styleCode"
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
  </sc-app-page>
</template>

<script setup lang="ts">
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useBatch } from './hooks/use-batch';
import { useTable } from './hooks/use-table-columns';
import { computed, onActivated, ref } from 'vue';
import { IConditionInfo, ScTable } from '@toy/business-components';
import KeySelectSearch from '@/components/key-select-search/index.vue';
import UserQuerySelect from '@/components/user-query-select/index.vue';
import DesignerSelect from '@/components/designer-select';
import { usePermissionConfig } from '../../use-permission-config';
import { fetchStyleOnShelvesPage, fetchStyleOnShelvesStateTotal } from '../../api/listing';
import { IStyleOnShelvesPageReq, IStyleOnShelvesStateTotalRes } from '../../api/listing/type';
import { RELEASE_STATUS_LIST, REVIEW_STATUS_LIST } from '../../constant';
import { ArrowDown } from '@element-plus/icons-vue';

const { FBSP } = usePermissionConfig();

const tableRef = ref<InstanceType<typeof ScTable>>();

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
    api: fetchStyleOnShelvesPage,
    params: {
      pageNum: 1,
      pageSize: 20,
    },
  },
});

const statusCount = ref<IStyleOnShelvesStateTotalRes>({
  reviewStatus: [],
  releaseStatus: [],
});

const conditionStateMap = computed<Partial<Record<keyof IStyleOnShelvesPageReq, IConditionInfo>>>(() => {
  return {
    reviewStatus: {
      title: '审核状态：',
      conditionList: [{ value: '', label: '全部' }, ...REVIEW_STATUS_LIST.map((item) => {
        const countItem = statusCount.value.reviewStatus.find(status => status.taskStatus === item.value);
        return {
          value: item.value,
          label: `${item.label} (${countItem ? countItem.total : 0})`,
        };
      })],
    },
    // 上架状态
    releaseStatus: {
      title: '上架状态：',
      conditionList: [{ value: '', label: '全部' }, ...RELEASE_STATUS_LIST.map((item) => {
        const countItem = statusCount.value.releaseStatus.find(status => status.taskStatus === item.value);
        return {
          value: item.value,
          label: `${item.label} (${countItem ? countItem.total : 0})`,
        };
      })],
    },
  };
});

const getStatusCount = async () => {
  const { pageNum, pageSize, ...rest } = params.value;
  const { data } = await fetchStyleOnShelvesStateTotal(rest);
  statusCount.value = data;
};

// 查询列表并更新状态数量
const handleSearchListAndCount = (pageNum?: number) => {
  handleSearch(pageNum);
  getStatusCount();
};

const myHandleReset = () => {
  handleReset();
  getStatusCount();
};

onActivated(() => {
  handleSearchListAndCount();
});

const {
  canRelease,
  releaseDisabledTips,
  canPushShopReview,
  pushShopReviewDisabledTips,
  handleBatchMarkListed,
  handleBatchPushShopReview,
  handleSelectionChange,
  handleBatchAudit,
  handleBatchCopySKC,
  handleBatchCopySPU
} = useBatch({
  onBatchSuccess: () => {
    tableRef.value?.clearSelection();
    handleSearch();
  },
});

const { tableColumns } = useTable();
</script>
