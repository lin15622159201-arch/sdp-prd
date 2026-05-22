<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        label-width="70"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      />
    </template>
    <template #header>
      <Tabs
        v-model="activeTab"
        :config="tabList"
        :border="false"
        class="tw-pb-15px"
        :font-size="15"
        @change="handleTabChange"
      />
    </template>
    <template #main>
      <sc-table
        height="100%"
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
    <!-- 付款 -->
    <payment-dialog
      v-model:visible="dialogShow"
      :paymentOrderId="paymentOrderId"
      :isView="isView"
      @success="handleSearch()"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import { STATUS_LIST, STATUS_ENUM } from '../../constant';
import { paymentOrderPage, paymentOrderPaymentStatusSummary } from '../../api';
import { IPaymentOrderPageRes } from '../../api/types';
import paymentDialog from '../components/payment-dialog/index.vue';

const countData = ref<any>({});
const getCount = async () => {
  const res = await paymentOrderPaymentStatusSummary();
  countData.value = res.data || {};
};

const activeTab = ref(STATUS_ENUM.ALL);
const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<IPaymentOrderPageRes>({
  request: {
    api: paymentOrderPage,
    params: {
      totalBillCode: '',
      paymentOrderCode: '',
      paymentStatus: '',
      pageNum: 1,
      pageSize: 20,
    },
    handleParams: (paramsObj) => {
      // 更新统计数据
      getCount();
      return {
        ...paramsObj,
        paymentStatus: activeTab.value,
      };
    }
  },
});

const { searchConfig } = useSearch();
const dialogShow = ref(false);
const paymentOrderId = ref('');
const isView = ref(false);

const { tableColumns } = useListColumns({
  handleToPayment: (row, behavior) => {
    paymentOrderId.value = row.paymentOrderId!;
    isView.value = behavior === 'view';
    dialogShow.value = true;
  },
});

const tabList = computed(() => {
  return STATUS_LIST.map((item) => {
    return {
      ...item,
      count: String(countData.value[item.countKey] ?? '0'),
    };
  });
});

const handleTabChange = () => {
  handleSearch(1);
};

const init = async () => {
  handleSearch(1);
};

init();
</script>
