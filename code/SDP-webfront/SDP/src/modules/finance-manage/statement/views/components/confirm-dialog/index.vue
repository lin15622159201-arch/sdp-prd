<template>
  <el-dialog
    :modelValue="props.visible"
    :title="props.isView ? '查看账单' : '确认对账'"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="handleClose"
    @open="handleOpen"
    width="70%"
    class="el-dialog-inner-scroll"
  >
    <div>
      <div class="tw-w-full tw-flex tw-flex-justify-center">
        <div
          class="
            tw-h-[400px] tw-w-full tw-overflow-hidden tw-overflow-y-scroll
            tw-border-solid tw-border-[#dcdfe6] tw-border-1px tw-border-solid
            tw-px-[10px] tw-py-[10px]
          "
        >
          <div class="tw-flex tw-flex-col tw-gap-y-10px tw-w-full tw-h-full">
            <div>
              <div class="tw-text-18px tw-text-center tw-font-blod">《合作协议》{{ detailIndfo.month }}月对账单</div>
              <div class="tw-flex tw-flex-justify-between">
                <div>甲方：{{ detailIndfo.partyA }}</div>
                <div>乙方：{{ detailIndfo.partyB }}</div>
              </div>
              <div class="tw-mt-[8px]">
                本对账单作为甲乙双方于2024年8月1日签署的《合作协议》的附件，适用于《合作协议》的所有约定。
              </div>
            </div>
            <div class="tw-flex-1">
              <sc-table
                height="100%"
                :data="detailTable"
                :columns="tableColumns"
                :span-method="mergeCells"
                :cell-class-name="cellClassName"
              />
            </div>
            <div class="tw-flex tw-flex-justify-between">
              <div>
                <div class="tw-my-8px">甲方确认：{{ detailIndfo.partyA }}</div>
                <div>{{ $filters.formatTime(detailIndfo.partyAConfirmedAt, 'YYYY-MM-DD') }}</div>
              </div>
              <div>
                <div class="tw-my-8px">乙方确认：{{ detailIndfo.partyB }}</div>
                <div v-if="detailIndfo.reconciledStatus === YES_NO_NUMBER_ENUM.NO">
                  {{ $filters.formatTime(Date.now(), 'YYYY-MM-DD') }}
                </div>
                <div v-else>{{ $filters.formatTime(detailIndfo.partyBConfirmedAt, 'YYYY-MM-DD') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <sc-detail-card
        title="平台账单"
        class="tw-my-8px tw-px-0! tw-py-0!"
      >
        <div v-if="detailIndfo.platformBillMap">
          <div
            v-for="(billData, key) in detailIndfo.platformBillMap"
            :key="key"
            class="tw-mb-20px"
          >
            <sc-table
              height="100%"
              :data="billData"
              :columns="platformColumns(key)"
            />
          </div>
        </div>
        <el-empty v-else description="暂无" />
      </sc-detail-card>
      <sc-detail-card
        title="账单明细"
        class="tw-my-8px tw-px-0! tw-py-0!"
      >
        <div>
          <Tabs
            v-model="activeTab"
            :config="tabList"
            :border="false"
            class="tw-pb-15px"
            :font-size="15"
            @change="handleTabChange"
          />
          <template v-if="detailTableColumns.length">
            <sc-table
              height="100%"
              :data="tableData"
              :columns="detailTableColumns"
            />
          </template>
          <el-row
            v-if="billId"
            style="width: 100%"
            type="flex"
            justify="end"
            class="tw-mt-10px"
          >
            <pagination
              :total="tableTotal"
              :current-page="params.pageNum"
              :page-size="params.pageSize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-row>
        </div>
      </sc-detail-card>
    </div>
    <template #footer>
      <div class="tw-flex tw-flex-justify-end tw-py-10px">
        <template v-if="props.isView">
          <el-button @click="handleClose">关闭</el-button>
        </template>
        <template v-else>
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleConfirm" type="primary">提交</el-button>
        </template>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import { useListColumns } from './hooks/use-table-columns';
import { useDetailListColumns } from './hooks/use-columns';
import { BILLTYPE_LIST, BILLTYPE_ENUM } from '@/modules/finance-manage/constant';
import { ElMessageBox, ElMessage } from 'element-plus';
import { financeTotalBillDetail, financeTotalBillConfirmBill } from '../../../api';
import {
  IWebFinanceTotalBillRes,
} from '../../../api/types';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { useBillDetail } from '../hooks/use-bill-detail';
import { usePlatformColumns } from './hooks/use-platform-columns';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  isView: {
    type: Boolean,
    default: false
  },
  // 总账单ID
  totalBillId: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['update:visible', 'success']);

const detailIndfo = ref<IWebFinanceTotalBillRes>({});
const activeTab = ref<BILLTYPE_ENUM>(BILLTYPE_ENUM.FABRIC_CUTTING_ORDER);
const billType = computed(() => {
  return activeTab.value;
});
const billId = computed(() => {
  const { billTypeStatisticsVos = [] } = detailIndfo.value;
  const cur = billTypeStatisticsVos.find(item => item.billType === billType.value);
  return cur?.billId || '';
});

const { tableColumns } = useListColumns();
const { tableColumns: detailTableColumns } = useDetailListColumns({
  billType
});

const platformColumns = computed(() => (key: string) => {
  const { tableColumns: platformTableColumns } = usePlatformColumns({ platform: key });
  return platformTableColumns.value;
});

const {
  params,
  tableData,
  tableTotal,
  handleSearch,
  handleSizeChange,
  handleCurrentChange,
} = useBillDetail({
  billType,
  billId
});

const handleClose = () => {
  emits('update:visible', false);
};

const getDeatil = async () => {
  const { data } = await financeTotalBillDetail({
    totalBillId: props.totalBillId
  });
  detailIndfo.value = data;
};

const handleOpen = async () => {
  activeTab.value = BILLTYPE_ENUM.FABRIC_CUTTING_ORDER;
  detailIndfo.value = {};
  tableData.value = [];
  await getDeatil();
  if (billId.value) {
    handleSearch(1);
  }
};

const detailTable = computed(() => {
  const obj = {
    isSum: true,
    inclusiveTaxAmount: detailIndfo.value.inclusiveTaxAmount ?? 0
  };
  return [...(detailIndfo.value.billTypeStatisticsVos || []), obj];
});

// 合并单元格
// eslint-disable-next-line consistent-return
const mergeCells = ({
  rowIndex, columnIndex
}: { rowIndex: number; columnIndex: number; }) => {
  const isSummaryRow = rowIndex === detailTable.value.length - 1;
  if (isSummaryRow) {
    if (columnIndex === 0) {
      return [1, 2];
    }
    if (columnIndex === 2) {
      return [1, 1];
    }
    return [0, 0];
  }
  return [1, 1]; // 默认单元格不合并
};

// 设置动态样式
const cellClassName = ({ rowIndex, columnIndex }: any) => {
  if (rowIndex === detailTable.value.length - 1 && columnIndex === 0) {
    return 'summary-cell'; // 为统计行合并的单元格添加样式
  }
  return '';
};

const tabList = computed(() => {
  const { billTypeStatisticsVos = [] } = detailIndfo.value;
  return BILLTYPE_LIST.map((item) => {
    return {
      ...item,
      count: String(billTypeStatisticsVos.find(v => v.billType === item.value)?.orderCount ?? '0'),
    };
  });
});
const handleTabChange = () => {
  tableData.value = [];
  if (billId.value) {
    nextTick(() => {
      handleSearch(1);
    });
  }
};

// 确认
const handleConfirm = async () => {
  await ElMessageBox.confirm('确认对账将自动生成财务付款单，是否确认提交?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await financeTotalBillConfirmBill({
    totalBillId: props.totalBillId
  });
  ElMessage.success('操作成功');
  emits('success', props.totalBillId);
  handleClose();
};
</script>

<style lang="scss">
/* 合并单元格的样式 */
.summary-cell {
  text-align: center !important;
}
</style>
