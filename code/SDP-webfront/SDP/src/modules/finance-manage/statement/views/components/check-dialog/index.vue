<template>
  <el-dialog
    v-model="show"
    :title="props.isView ? '查看' : '核实明细'"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="handleClose"
    @open="handleOpen"
    width="70%"
    class="el-dialog-inner-scroll"
  >
    <div>
      <sc-detail-card
        :title="`${$filters.getEnumLabel(BILLTYPE_LIST, detailBillInfo?.billType!)}账单`"
        class="tw-mb-8px tw-px-0! tw-py-0!"
      >
        <div>
          <sc-responsive-row>
            <sc-detail-item label="账单号：">{{ detailBillInfo?.billCode || '-' }}</sc-detail-item>
            <sc-detail-item label="账单周期：">
              {{ `${detailBillInfo?.year || ''}年 ${detailBillInfo?.month || ''}月` }}
            </sc-detail-item>
            <sc-detail-item label="账单类型：">
              {{ $filters.getEnumLabel(BILLTYPE_LIST, detailBillInfo?.billType!) }}
            </sc-detail-item>
            <template v-if="billType === BILLTYPE_ENUM.ACCESSORIES_ORDER">
              <sc-detail-item label="辅料开发占比：">{{ detailBillInfo?.percentage || '-' }}%</sc-detail-item>
              <sc-detail-item label="辅料补贴金额：">{{ detailBillInfo?.subsidyAmount || '-' }}</sc-detail-item>
            </template>
          </sc-responsive-row>
          <sc-table
            max-height="400px"
            :data="statisticsVosData"
            :columns="tableColumns"
          />
        </div>
      </sc-detail-card>
      <sc-detail-card title="账单明细" class="tw-mb-8px tw-px-0! tw-py-0!">
        <div>
          <template v-if="searchConfig.length">
            <sc-search-area
              v-model="params"
              label-width="120"
              @handleSearch="handleSearch"
              @handleReset="handleReset"
              :config="searchConfig"
            >
              <template #designerIdList>
                <DesignerSelect
                  v-model="params.designerCode"
                  :is-first-load-cache="true"
                />
              </template>
            </sc-search-area>
          </template>
          <div class="tw-flex tw-justify-between tw-items-center tw-mb-8px">
            <el-button
              v-if="DCMX"
              type="primary"
              @click="handleDownLoad"
              :loading="downloadLoading"
            >导出明细</el-button>
            <el-radio-group v-model="params.abnormalFlag" @change="handleTabChange">
              <el-radio-button label="全部" value="all" />
              <el-radio-button label="异常" value="1" />
            </el-radio-group>
          </div>
          <sc-table
            height="100%"
            :data="tableData"
            :columns="detailTableColumns"
            @sort-change="handleSort"
          />
          <el-row
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
          <el-button @click="handleSave">保存</el-button>
          <el-button @click="handleConfirm" type="primary">提交核实</el-button>
        </template>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, toRefs } from 'vue';
import { ElMessageBox } from 'element-plus';
import { useListColumns } from './hooks/use-table-columns';
import { useSearch } from './hooks/use-search';
import { useDetailListColumns } from './hooks/use-columns';
import {
  financeBillBillDetailByBillId,
  financeBillSubmitVerifyBill,
  financeBillSaveVerifyBill,
  financeBillFabricCuttingExport,
  financeBillDigitalCuttingExport,
  financeBillThreeDCuttingExport,
  financeBillAccessoriesExport
} from '../../../api';
import {
  IFinanceBillBillDetailByBillIdRes,
  SortInfo
} from '../../../api/types';
import { BILLTYPE_LIST, BILLTYPE_ENUM } from '@/modules/finance-manage/constant';
import DesignerSelect from '@/components/designer-select';
import { useBillDetail } from '../hooks/use-bill-detail';
import { usePermissionConfig } from '../../../use-permission-config';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  // 账单ID
  billId: {
    type: String,
    default: ''
  },
  // 总账单id
  totalBillId: {
    type: String,
    default: ''
  },
  isView: {
    type: Boolean,
    default: false
  }
});
const { DCMX } = usePermissionConfig();
const emits = defineEmits(['update:visible', 'success']);
const detailBillInfo = ref<IFinanceBillBillDetailByBillIdRes>({}); // 子帐单统计详细
// 存储所有页面异常数据及原因
const abnormalDataMap = reactive<any>({});
const { isView } = toRefs(props);
const { tableColumns: detailTableColumns } = useDetailListColumns({
  detailBillInfo,
  abnormalDataMap,
  isView,
});
const { searchConfig } = useSearch({
  detailBillInfo
});
const { tableColumns } = useListColumns();
const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:visible', value),
});
const statisticsVosData = computed(() => {
  const {
    excludingTaxAmount, inclusiveTaxAmount, taxRate,
    orderCount, reconciledAmount, allowanceAmount,
    diffAmount
  } = detailBillInfo.value || {};
  const sumObj = {
    platform: '总计',
    orderCount,
    reconciledAmount,
    diffAmount,
    allowanceAmount,
    taxRate,
    excludingTaxAmount,
    inclusiveTaxAmount,
  };
  return [...(detailBillInfo.value?.statisticsVos || []), sumObj];
});

const billType = computed(() => {
  return detailBillInfo.value?.billType || '';
});

const billId = computed(() => {
  return props.billId;
});

const {
  params,
  tableData,
  tableTotal,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
  initParams
} = useBillDetail({
  billType,
  billId,
  abnormalDataMap
});

const handleClose = () => {
  emits('update:visible', false);
};

const getDeatil = async () => {
  const { data } = await financeBillBillDetailByBillId({
    billId: props.billId
  });
  detailBillInfo.value = data || {};
};
const handleOpen = async () => {
  tableData.value = [];
  // 清空重置数据
  if (abnormalDataMap) {
    Object.keys(abnormalDataMap).forEach((key) => {
      delete abnormalDataMap[key];
    });
  }
  params.value = initParams();
  await getDeatil();
  handleSearch();
};

// 保存
const handleSave = async () => {
  await financeBillSaveVerifyBill({
    totalBillId: props.totalBillId,
    billId: props.billId,
    billType: billType.value,
    abnormalBill: abnormalDataMap
  });
  emits('success', props.totalBillId);
  handleClose();
};

// 提交核实
const handleConfirm = async () => {
  const { length } = Object.keys(abnormalDataMap);
  if (!length) {
    await ElMessageBox.confirm('该子账单已核实无异常明细数据，是否确认提交？', '核实确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
  }
  if (length > 0) {
    await ElMessageBox.confirm(`您已标记「${length}」条异常明细数据，是否确认提交？`, '核实确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
  }
  await financeBillSubmitVerifyBill({
    totalBillId: props.totalBillId,
    billId: props.billId,
    billType: billType.value,
    abnormalBill: abnormalDataMap
  });
  emits('success', props.totalBillId);
  handleClose();
};

// 切换
const handleTabChange = () => {
  handleSearch(1);
};

const downloadLoading = ref(false);
// 导出明细
const handleDownLoad = async () => {
  try {
    const api: any = {
      [BILLTYPE_ENUM.FABRIC_CUTTING_ORDER]: financeBillFabricCuttingExport,
      [BILLTYPE_ENUM.DIGITAL_SKETCH_ORDER]: financeBillDigitalCuttingExport,
      [BILLTYPE_ENUM.THREE_DIMENSIONAL_CUTTING_ORDER]: financeBillThreeDCuttingExport,
      [BILLTYPE_ENUM.ACCESSORIES_ORDER]: financeBillAccessoriesExport,
    };
    downloadLoading.value = true;
    await api[billType.value]({
      ...params.value,
      abnormalFlag: params.value.abnormalFlag === 'all' ? '' : params.value.abnormalFlag,
      billId: billId.value,
      pageNum: 1,
      pageSize: tableTotal.value,
    });
    downloadLoading.value = false;
  } catch (error) {
    downloadLoading.value = false;
  }
};

// table排序
const handleSort = (sort: SortInfo): void => {
  const { order } = sort;
  params.value.diffAmountOrderBy = order === 'descending' ? '1' : '2';
  handleSearch();
};
</script>
