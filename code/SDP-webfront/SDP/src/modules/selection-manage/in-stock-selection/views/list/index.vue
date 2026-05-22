<template>
  <sc-app-page class="custom-app-page">
    <template #fheader>
      <sc-search-area
        v-model="params"
        :config="searchConfig"
        labelWidth="120px"
        @handleSearch="handleRefresh"
        @handle-reset="() => {
          handleReset();
          getSelectionTotal();
        }"
      >
        <template #creatorName>
          <query-select-my
            v-model="params.creatorName"
            model-type="name"
            @handleSearch="handleRefresh"
          />
        </template>
        <template #styleSelectorName>
          <query-select-my
            v-model="params.styleSelectorName"
            model-type="name"
            @handleSearch="handleRefresh"
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex tw-flex-justify-between tw-flex-center-y">
        <sc-condition-select
          v-model="params.styleSelectionStatus"
          :incompat="''"
          :condition-info="conditionInfo"
          @conditionChange="handleRefresh()"
        />
        <div class="tw-flex-center-y">
          <el-button
            v-if="DRXKSJ"
            type="primary"
            plain
            @click="handleImportDataOpenDialog"
          >
            导入选款数据
          </el-button>
          <el-button
            v-if="DCXKSJ"
            :loading="exportLoading"
            @click="handleExportData"
          >
            导出选款数据
          </el-button>
        </div>
      </div>
      <div class="tw-flex tw-justify-end tw-mt-3">
        <el-button
          v-if="XK"
          type="primary"
          @click="handleSelect"
        >
          选款
        </el-button>
        <el-button
          v-if="BJ"
          type="primary"
          plain
          @click="handleQuote"
        >
          报价
        </el-button>
        <el-button
          v-if="QRBJ"
          @click="handleConfirmQuote"
        >
          确认报价
        </el-button>
        <el-button
          v-if="CXXK"
          link
          @click="handleReSelect"
        >
          重新选款
        </el-button>
        <el-button
          v-if="QXXK"
          link
          @click="handleCancel"
        >
          取消选款
        </el-button>
        <el-button
          v-if="SC"
          link
          @click="handleDelete"
        >
          删除
        </el-button>
      </div>
    </template>
    <template #main>
      <sc-table
        height="100%"
        key="styleSelectionId"
        :data="tableData"
        :columns="tableColumns"
        :loading="tableLoading"
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

<script lang="ts" setup>
import { useList } from '@toy/v-use';
import { useSearch } from '../../hooks/use-search';
import { useListColumns } from '../../hooks/use-table-columns';
import { nextTick, ref } from 'vue';
import QuerySelectMy from '@/components/query-select-my/index.vue';
import { useImportDataDialog } from '../../hooks/use-import-data-dialog';
import { SELECTION_STATUS_ENUM, SELECTION_STATUS_LIST } from '../../constant';
import { useRouter } from 'vue-router';
import { ITableItem } from '../../type';
import { ElMessage, ElMessageBox } from 'element-plus';
import { usePermissionConfig } from '../../use-permission-config';
import { selectionCancel, selectionDelete,
  selectionExport, selectionPage, selectionPicking, selectionRemarkCount,
  selectionRePicking } from '../../api';
import { useAccountStore } from '@/store/account';
import sessionSharing from '@/core/http/session-sharing';
import { cloneDeep } from 'lodash-es';

const conditionList = [
  {
    label: '全部',
    value: '',
  },
  ...SELECTION_STATUS_LIST
    .filter(
      item => ![SELECTION_STATUS_ENUM.CANCELED, SELECTION_STATUS_ENUM.FAILED]
        .includes(item.value as SELECTION_STATUS_ENUM)
    ),
];

const conditionInfo = ref({
  title: '选款状态：',
  conditionList: cloneDeep(conditionList),
});

const $router = useRouter();

const accountStore = useAccountStore();
const { account } = accountStore;
const { DRXKSJ, DCXKSJ, XK, BJ, QRBJ, CXXK, QXXK, SC } = usePermissionConfig();
const { searchConfig } = useSearch();
const { tableColumns } = useListColumns();

const selectionList = ref<ITableItem[]>([]);
const handleSelectionChange = (val: ITableItem[]) => {
  selectionList.value = val;
};

const {
  params,
  tableTotal,
  tableData,
  tableLoading,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList({
  request: {
    api: selectionPage,
    params: {
      supplierName: '',
      palletTypeName: '',
      storeName: '',
      supplyModeName: '',
      styleSelectionCode: '',
      supplierStyleCode: '',
      spuCode: '',
      styleSelectionStatus: undefined,
      styleSelectorName: '',
      creatorName: '',
      selectionStartTime: '',
      selectionEndTime: '',
      createdStartTime: '',
      createdEndTime: '',
      spotTypeName: '',
      pageNum: 1,
      pageSize: 20,
    },
  }
});

/**
 * 获取选款总数
 */
const getSelectionTotal = async () => {
  const { data } = await selectionRemarkCount({
    ...params.value,
    styleSelectionStatus: undefined,
  });

  data.forEach((v) => {
    const index = conditionList.findIndex(item => v.styleSelectionStatus && (item.value
    === SELECTION_STATUS_ENUM[v.styleSelectionStatus]));

    if (index !== -1 && v.total !== 0) {
      conditionInfo.value.conditionList[index].label = `${conditionList[index].label}(${v.total})`;
    } else if (index !== -1) {
      conditionInfo.value.conditionList[index].label = `${conditionList[index].label}`;
    }
  });
};

/**
 * 刷新
 */
const handleRefresh = () => {
  handleSearch();
  getSelectionTotal();
};

handleRefresh();

const { handleOpenDialog: handleImportDataOpenDialog } = useImportDataDialog({ handleSuccess: () => handleRefresh() });

/** 批量删除选款数据 */
const handleDelete = async () => {
  if (selectionList.value.length === 0) {
    ElMessage.error('请至少勾选一项!');
    return;
  }
  const canDelete = selectionList.value
    .every(v => v.styleSelectionStatus === SELECTION_STATUS_ENUM.WAIT_SELECTION && v.creatorId === account?.id);
  if (!canDelete) {
    ElMessage.error('仅本人【待选款】的数据才能删除');
    return;
  }
  await ElMessageBox.confirm('确认删除任务？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await selectionDelete({
    ids: selectionList.value.map(v => v.styleSelectionId!),
  });
  handleRefresh();
};

const exportLoading = ref(false);

/** 跳转打开新标签页 */
const handleOpenNewTab = async (name: string) => {
  // 生成唯一存储键
  const storageKey = `TABLE_DATA_${name}_${Date.now()}`;
  // 使用sessionSharing存储数据
  await sessionSharing(storageKey, () => selectionList.value, {
    watch: false,
    expireTime: 0,
  });
  await nextTick();
  await new Promise((resolve) => { setTimeout(resolve, 50); });
  const url = $router.resolve({
    name,
    query: { storageKey }
  });

  window.open(url.href, '_blank');
};

/** 批量导出选款数据 */
const handleExportData = async () => {
  exportLoading.value = true;
  try {
    await selectionExport(params.value);
  } finally {
    exportLoading.value = false;
  }
};

/** 取消选款 */
const handleCancel = async () => {
  if (selectionList.value.length === 0) {
    ElMessage.error('请至少勾选一项!');
    return;
  }
  // 仅【选款中】且选款人=自己时 可操作
  const canCancel = selectionList.value
    .every(v => (v.styleSelectionStatus === SELECTION_STATUS_ENUM.SELECTING && v.styleSelectorId === account?.id));
  if (!canCancel) {
    ElMessage.error('仅本人【选款中】的数据才能取消选款');
    return;
  }
  await selectionCancel({
    ids: selectionList.value.map(v => v.styleSelectionId!),
  });
  handleRefresh();
};

/** 重新选款 */
const handleReSelect = async () => {
  if (selectionList.value.length === 0) {
    ElMessage.error('请至少勾选一项!');
    return;
  }
  const canReSelect = selectionList.value
    .every(v => v.styleSelectionStatus === SELECTION_STATUS_ENUM.OBSOLETE);
  if (!canReSelect) {
    ElMessage.error('仅【已淘汰】的数据才能重新选款');
    return;
  }
  await selectionRePicking({ ids: selectionList.value.map(v => v.styleSelectionId!) });
  // 仅【已淘汰】状态可操作
  await handleOpenNewTab('AigcSelectionManageInStockSelectionBatchSelection');
  handleRefresh();
};

/** 确认报价 */
const handleConfirmQuote = async () => {
  if (selectionList.value.length === 0) {
    ElMessage.error('请至少勾选一项!');
    return;
  }
  const isSelectionListEmpty = selectionList.value
    .every(v => v.styleSelectionStatus === SELECTION_STATUS_ENUM.WAIT_CONFIRM
    && v.styleSelectorId === account?.id);
  if (!isSelectionListEmpty) {
    ElMessage.error('仅本人【待确认】的数据才能确认报价');
    return;
  }
  await handleOpenNewTab('AigcSelectionManageInStockSelectionBatchConfirm');
};

/** 报价 */
const handleQuote = async () => {
  if (selectionList.value.length === 0) {
    ElMessage.error('请至少勾选一项!');
    return;
  }
  const canQuote = selectionList.value
    .every(v => v.styleSelectionStatus === SELECTION_STATUS_ENUM.WAIT_QUOTE);
  if (!canQuote) {
    ElMessage.error('仅【待报价】的数据才能报价');
    return;
  }
  // 仅【待报价】状态
  await handleOpenNewTab('AigcSelectionManageInStockSelectionBatchQuote');
};

/** 选款 */
const handleSelect = async () => {
  if (selectionList.value.length === 0) {
    ElMessage.error('请至少勾选一项!');
    return;
  }
  const canSelect = selectionList.value
    .every(v => v.styleSelectionStatus === SELECTION_STATUS_ENUM.WAIT_SELECTION
    || (v.styleSelectionStatus === SELECTION_STATUS_ENUM.SELECTING && v.styleSelectorId === account?.id));
  if (!canSelect) {
    ElMessage.error('仅【待选款】及本人【选款中】的数据才能操作选款');
    return;
  }
  await selectionPicking({
    ids: selectionList.value.map(v => v.styleSelectionId!),
  });
  // 仅【待选款】状态，或【选款中】且选款人=自己时
  await handleOpenNewTab('AigcSelectionManageInStockSelectionBatchSelection');
  handleRefresh();
};

</script>
