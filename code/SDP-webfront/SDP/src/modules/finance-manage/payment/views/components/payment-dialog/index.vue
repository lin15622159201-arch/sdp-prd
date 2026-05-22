<template>
  <el-dialog
    :modelValue="props.visible"
    :title="props.isView ? '查看' : '付款'"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="handleClose"
    @open="handleOpen"
    :width="1200"
    class="el-dialog-inner-scroll"
  >
    <div>
      <sc-detail-card
        title="基本信息"
        class="tw-mb-8px tw-px-0! tw-py-0!"
      >
        <el-row>
          <el-col :span="6">
            <sc-detail-item label="付款单号：">
              {{detail?.paymentOrderCode}}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="付款主体：">
              {{detail?.paymentSubject}}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="申请人：">
              {{detail?.applicant}}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="付款状态：">
              {{ $filters.getEnumLabel(STATUS_LIST, detail.paymentStatus!) }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="应付金额：">
              {{detail?.payableAmount}}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="实付金额：">
              {{detail?.paidAmount}}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="创建时间：">
              {{ $filters.formatTime(detail.createdTime) }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="付款时间：">
              {{ $filters.formatTime(detail.paymentTime) }}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="供应商：">
              {{detail?.supplier}}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="银行账号：">
              {{detail?.bankAccount}}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="开户行：">
              {{detail?.bankName}}
            </sc-detail-item>
          </el-col>
          <el-col :span="6">
            <sc-detail-item label="开户支行：">
              {{detail?.branchName}}
            </sc-detail-item>
          </el-col>
        </el-row>
      </sc-detail-card>
      <sc-detail-card
        title="对账单"
        class="tw-mb-8px tw-px-0! tw-py-0!"
      >
        <div class="tw-w-full tw-flex tw-flex-justify-center">
          <div
            class="
            tw-h-[400px] tw-w[80%] tw-overflow-hidden tw-overflow-y-scroll
            tw-border-solid tw-border-[#dcdfe6] tw-border-1px tw-border-solid
            tw-px-[10px] tw-py-[10px]
          "
          >
            <div class="tw-flex tw-flex-col tw-gap-y-10px tw-w-full tw-h-full">
              <div class="tw-text-18px tw-text-center tw-font-blod">
                《合作协议》{{ financeTotalBillDetailVo.month }}月对账单
              </div>
              <div class="tw-flex tw-flex-justify-between">
                <div>甲方：{{ financeTotalBillDetailVo.partyA }}</div>
                <div>乙方：{{ financeTotalBillDetailVo.partyB }}</div>
              </div>
              <div>
                本对账单作为甲乙双方于2024年8月1日签署的《合作协议》的附件，
                适用于《合作协议》的所有约定。
              </div>
              <div>
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
                  <div class="tw-my-8px">甲方确认：{{ financeTotalBillDetailVo.partyA }}</div>
                  <div>{{ $filters.formatTime(financeTotalBillDetailVo.partyAConfirmedAt, 'YYYY-MM-DD') }}</div>
                </div>
                <div>
                  <div class="tw-my-8px">乙方确认：{{ financeTotalBillDetailVo.partyB }}</div>
                  <div v-if="detail.paymentStatus === STATUS_ENUM.WAIT">
                    {{ $filters.formatTime(Date.now(), 'YYYY-MM-DD') }}
                  </div>
                  <div v-else>{{ $filters.formatTime(financeTotalBillDetailVo.partyBConfirmedAt, 'YYYY-MM-DD') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </sc-detail-card>
      <sc-detail-card
        title="本次应付总金额："
        class="tw-mb-8px tw-px-0! tw-py-0!"
      >
        <template #extra>
          <span class="tw-ml-[4px] tw-text-[16px] tw-font-bold tw-text-danger">{{ detail.payableAmount }}</span>
        </template>
      </sc-detail-card>
      <sc-detail-card class="tw-mb-8px tw-px-0! tw-py-0!">
        <template #extra>
          <div class="sc-detail-card__title required">本次实付总金额：</div>
          <input-number
            v-model="amount"
            :precision="2"
            :min="0.01"
            placeholder="请输入"
            class="tw-ml-[4px] tw-w-[200px]"
            :disabled="props.isView"
          />
        </template>
      </sc-detail-card>
    </div>
    <template #footer>
      <div class="tw-flex tw-flex-justify-end tw-py-10px">
        <template v-if="props.isView">
          <el-button @click="handleClose">关闭</el-button>
        </template>
        <template v-else>
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleConfirm" type="primary">确认付款</el-button>
        </template>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useListColumns } from './hooks/use-table-columns';
import { ElMessage, ElMessageBox } from 'element-plus';
import { paymentOrderConfirmPayment, paymentOrderDetail } from '../../../api';
import { IWebPaymentOrderRes, IWebPaymentOrderResFinanceTotalBillDetailVo } from '../../../api/types';
import { STATUS_LIST, STATUS_ENUM } from '../../../constant';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  paymentOrderId: {
    type: String,
    required: true,
  },
  isView: {
    type: Boolean,
    required: false,
  }
});

const emits = defineEmits(['update:visible', 'success']);

const detail = ref<IWebPaymentOrderRes>({});
const financeTotalBillDetailVo = computed(() => {
  return detail.value?.financeTotalBillDetailVo || {} as IWebPaymentOrderResFinanceTotalBillDetailVo;
});

const { tableColumns } = useListColumns();
const amount = ref<string>('');
const handleClose = () => {
  emits('update:visible', false);
};

const getDetail = async () => {
  const { data } = await paymentOrderDetail({
    paymentOrderId: props.paymentOrderId,
  });
  detail.value = data || {};
  if (props.isView) {
    amount.value = data.paidAmount || '';
  } else {
    // 优先取实付金额，再取应付金额
    amount.value = data.paidAmount || data.payableAmount || '';
  }
};

const handleOpen = async () => {
  amount.value = '';
  getDetail();
};

const detailTable = computed(() => {
  const obj = {
    isSum: true,
    inclusiveTaxAmount: financeTotalBillDetailVo.value.inclusiveTaxAmount ?? 0
  };
  if (financeTotalBillDetailVo.value.billTypeStatisticsVos?.length) {
    return [...(financeTotalBillDetailVo.value.billTypeStatisticsVos || []), obj];
  }
  return [];
});

// 合并单元格
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

const handleConfirm = async () => {
  if (!amount.value) {
    ElMessage.warning('请输入金额');
    return;
  }
  await ElMessageBox.confirm('是否已确认付款？', '确认付款', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await paymentOrderConfirmPayment({
    paymentOrderId: props.paymentOrderId,
    paidAmount: amount.value,
  });
  handleClose();
  emits('success');
};
</script>

<style lang="scss">
/* 合并单元格的样式 */
.summary-cell {
  text-align: center !important;
}
</style>
