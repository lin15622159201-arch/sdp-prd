<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        label-width="70"
        @handleSearch="handleSearchList"
        @handleReset="handleReset"
        :config="searchConfig"
      >
        <template #totalBillMonth>
          <el-date-picker
            v-model="params.totalBillMonth"
            type="month"
            placeholder="请选择"
            value-format="YYYY-MM"
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex tw-justify-between">
        <Tabs
          v-model="activeTab"
          :config="tabList"
          :border="false"
          class="tw-pb-15px"
          :font-size="15"
          @change="handleTabChange"
        />
        <el-button
          v-if="XZDZD"
          type='primary'
          :disabled="!selectedList.length || selectedList.length > 1"
          @click="handleDownloadBill"
          :loading="downloadLoading"
        >
          下载对账单
        </el-button>
      </div>
    </template>
    <template #main>
      <sc-table
        ref="tableElRef"
        height="100%"
        :data="tableData"
        :columns="tableColumns"
        row-key="billCode"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :lazy="true"
        :load="rowLoadHandle"
        @selection-change="handleSelectionChange"
        :row-class-name="getRowClass"
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
    <!--操作日志-->
    <operation-log-drawer v-model="drawer.visible" :data="drawer.data" />
    <!-- 确认对账 -->
    <confirm-dialog
      v-model:visible="confirmDialogShow"
      :totalBillId="billId"
      :isView="isConfirmView"
      @success="handleSuccess"
    />
    <!-- 核实明细 -->
    <check-dialog
      v-model:visible="checkDialogShow"
      :totalBillId="totalBillIdValue"
      :billId="billId"
      :isView="isCheckView"
      @success="handleSuccess"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, nextTick } from 'vue';
import { useList } from '@toy/v-use';
import {
  financeTotalBillPage,
  financeBillFinanceBillByTotalBillId,
  financeTotalBillReconciledStatusSummary,
  finroyalLogPage,
  financeTotalBillExport
} from '../../api';
import {
  IFinanceTotalBillPageResListItem,
  IFinroyalLogPageRes,
  IFinanceBillFinanceBillByTotalBillIdResItem
} from '../../api/types';
import { useSearch } from './hooks/use-search';
import { RECONCILED_STATUS_LIST, LOG_BIZ_TYPE_ENUMS } from '@/modules/finance-manage/constant';
import { useListColumns } from './hooks/use-table-columns';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import confirmDialog from '../components/confirm-dialog/index.vue';
import checkDialog from '../components/check-dialog/index.vue';
import { usePermissionConfig } from '../../use-permission-config';
import type { ElTable } from 'element-plus';

const { XZDZD } = usePermissionConfig();

const countData = ref<any>({});
const getCount = async () => {
  const res = await financeTotalBillReconciledStatusSummary();
  countData.value = res.data || {};
};

// const showTable = ref(true);
// const setTableExpendCloseWhenResearch = () => {
//   showTable.value = false;
//   setTimeout(() => {
//     showTable.value = true;
//   }, 10);
// };
const formatVersionNo = (list: IFinanceTotalBillPageResListItem[]) => {
  list.forEach((item) => {
    item.billCode = item.totalBillCode;
    item.hasChildren = true;
  });
  // setTableExpendCloseWhenResearch();
};

const activeTab = ref('');
type IScTable = InstanceType<typeof ElTable> & {
  elementRef:InstanceType<typeof ElTable> | null;
};
const tableElRef = ref<IScTable | null>(null);
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
    api: financeTotalBillPage,
    params: {
      totalBillMonth: '',
      reconciledStatus: '',
      pageNum: 1,
      pageSize: 20,
    },
    handleParams: (paramsObj) => {
      // 更新统计数据
      getCount();
      return {
        ...paramsObj,
        reconciledStatus: activeTab.value,
      };
    }
  },
  response: {
    handleResponseData(list) {
      formatVersionNo(list);
      return list;
    },
  },
});

const { searchConfig } = useSearch();
const tabList = computed(() => {
  return RECONCILED_STATUS_LIST.map((item) => {
    return {
      ...item,
      count: String(countData.value[item.countKey] ?? '0'),
    };
  });
});

const handleSearchList = async () => {
  // 目的：先清空再刷新为了避免子项数据未刷新
  tableData.value = [];
  await nextTick();
  handleSearch(1);
};

const handleTabChange = () => {
  handleSearchList();
};

// 操作日志
const drawer = reactive<{ visible: boolean; data: any; }>({
  visible: false,
  data: [] as IFinroyalLogPageRes,
});

const confirmDialogShow = ref(false);
const checkDialogShow = ref(false);
const isConfirmView = ref(false);
const isCheckView = ref(false);
const billId = ref('');
const totalBillIdValue = ref('');

// 获取指定子项数据
const getBillChildList = async (id: string) => {
  if (!id) return [];
  const { data: list } = await financeBillFinanceBillByTotalBillId({ totalBillId: id });
  list.forEach((item) => {
    item.hasChildren = false;
  });
  return list as IFinanceBillFinanceBillByTotalBillIdResItem[];
};

// 指定展开某子项
const refreshRow = async (id: string) => {
  const row = tableData.value.find(item => item.totalBillId === id);
  if (row) {
    row.children = [];
    row.hasChildren = false;
    await nextTick();

    // **重新标记为懒加载**
    row.hasChildren = true;
    await nextTick();

    const { totalBillId = '' } = row;
    const list = await getBillChildList(totalBillId);
    tableElRef.value?.elementRef?.updateKeyChildren(row.billCode!, list);

    tableElRef.value?.toggleRowExpansion(row, true);
  }
};

// 核实明细/驳回成功回调
const handleSuccess = async (id: string) => {
  await handleSearch();
  refreshRow(id);
};

const { tableColumns } = useListColumns({
  // 确认对账/查看对账（总账单）
  handleToConfirm: (row, behavior) => {
    billId.value = row.totalBillId!;
    isConfirmView.value = behavior === 'view';
    confirmDialogShow.value = true;
  },
  // 核实明细/查看明细（子账单）
  handleToCheck: (row, behavior) => {
    billId.value = row.billId!;
    totalBillIdValue.value = row.totalBillId!;
    isCheckView.value = behavior === 'view';
    checkDialogShow.value = true;
  },
  handleOperateLog: async (bizId: string) => {
    try {
      const { data = [] } = await finroyalLogPage({
        bizId,
        bizType: LOG_BIZ_TYPE_ENUMS.RECONCILED_BILL
      });
      drawer.data = data || [];
      drawer.visible = true;
    } catch (e) {
      console.error('handleOperateLog error', e);
    }
  },
  handleVerifySuccess: (id: string) => {
    handleSuccess(id);
  }
});

const rowLoadHandle = async (row: any, treeNode: any, resolve: any) => {
  const { totalBillId = '' } = row;
  const list = await getBillChildList(totalBillId);
  resolve(list);
};

const selectedList = ref<IFinanceTotalBillPageResListItem[]>([]);
const handleSelectionChange = (rows: IFinanceTotalBillPageResListItem[]) => {
  selectedList.value = rows;
};

const downloadLoading = ref(false);
const handleDownloadBill = async () => {
  try {
    downloadLoading.value = true;
    await financeTotalBillExport({
      totalBillId: selectedList.value.map(item => item.totalBillId).join(','),
    });
    downloadLoading.value = false;
  } catch (error) {
    downloadLoading.value = false;
  }
};

// 动态设置标签
const getRowClass = ({ row }: any) => {
  if (row.hasChildren) {
    return 'parent-row'; // 父级行的样式
  }
  return 'child-row'; // 子级行的样式
};

const init = () => {
  handleSearch();
};

init();
</script>

<style lang="scss">
/* 子级行样式 */
.child-row {
  background-color: rgb(239.1, 238.7, 252.4) !important;
  .el-table__indent {
    padding-left: 0 !important;
  }
  &.hover-row {
    background-color: rgb(239.1, 238.7, 252.4) !important;
  }
  &.hover-row > td.el-table__cell {
    background-color: rgb(239.1, 238.7, 252.4) !important;
  }
}
</style>
