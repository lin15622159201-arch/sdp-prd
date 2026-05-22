<!--面辅料采购跟进-->
<template>
  <sc-app-page>
    <template #fheader>
      <el-tabs
        v-model="params.taskState"
        class="header-tabs"
        @tab-click="handleTabChange"
      >
        <el-tab-pane
          v-for="item of tabsList"
          :key="item.value"
          :label="`${item.label}（${item.count}）`"
          :name="item.value"
        />
      </el-tabs>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='105px'
        @handleSearch="handleSearch"
        @handle-reset="cusntomReset"
      >
        <template #creatorId>
          <UserSelect
            v-model="params.creatorId"
            clearable
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <el-button
        v-if="XJ"
        type="primary"
        @click="handleAdd"
      >
        新建
      </el-button>
      <el-button
        v-if="DC"
        type="primary"
        :disabled="!tableData.length"
        @click="handleExport"
      >
        导出
      </el-button>
    </template>
    <!-- 主体内容 -->
    <template #main>
      <sc-table
        class="tw-h-full"
        key="table"
        :data="tableData"
        :columns="columns"
        v-loading="tableLoading"
        @selection-change="selectionChange"
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
          :size="params.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
    <!-- 新建/编辑/重新描稿 -->
    <digital-draft-dialog
      v-model="digitalDraftDialogObj.visible"
      :id="currentRow?.digitalPaintingId"
      :title="digitalDraftDialogObj.title"
      :operation-type="digitalDraftDialogObj.operationType"
      :isShowEditSkcCode="digitalDraftDialogObj.isShowEditSkcCode"
      @success="init"
    />
    <!-- 取消弹窗 -->
    <cancel-dialog
      v-model="isShowCancelDialog"
      :id="currentRow?.digitalPaintingId"
      @success="init"
    />
    <!-- 审核弹窗 -->
    <audit-dialog
      v-model="auditDialogObj.visible"
      :id="currentRow?.digitalPaintingId"
      :operation-type="auditDialogObj.operationType"
      :title="auditDialogObj.title"
      @success="init"
    />
    <!-- 编码 -->
    <code-dialog
      v-model="isShowCodeDialog"
      :id="currentRow?.digitalPaintingId"
      :commodityCode="currentRow?.commodityCode"
      @success="init"
    />
    <!-- 操作日志弹窗 -->
    <operation-drawer
      title="操作日志"
      v-model="drawer.visible"
      :request="postExceptionLogApi"
      :config="{
        timeKey: 'createdTime',
        userKey: 'creatorName',
        contentKey: 'content',
        // 不显示remark
        remarkKey: 'string',
      }"
      :requestParams="drawer.params"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { TabsPaneContext } from 'element-plus';
import {
  digitalPaintingCountByState,
  digitalPaintingQueryByPage
} from '../../api';
import type {
  IDigitalPaintingQueryByPageReq,
  IDigitalPaintingQueryByPageResListItem,
} from '../../api/types';
import { useSearch } from './hooks/use-search';
import { usePermissionConfig } from '../../use-permission-config';
import { useList } from '@toy/v-use';
import { useListTableColumns } from './hooks/use-table-columns';
import {
  DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM,
  DIGITAL_DRAFT_TASK_STATUS_LIST,
} from '../../constant';
import useHandleOperation from './hooks/use-handle-operation';
import DigitalDraftDialog from '../../components/digitalDraftDialog/index.vue';
import CancelDialog from '../../components/cancelDialog.vue';
import AuditDialog from '../../components/auditDialog.vue';
import CodeDialog from '../../components/codeDialog.vue';
import { cloneDeep } from 'lodash-es';
import { ceil, plus } from '@toy/utils';
import UserSelect from '@/modules/common/components/user-select';
import { exportByBlob } from '@/core/utils/file-download';
import { postExceptionLogApi } from '@/modules/exception-manage/exception-handle/api';

const { XJ, DC } = usePermissionConfig();
const tabsList = ref(cloneDeep(DIGITAL_DRAFT_TASK_STATUS_LIST));
const getTabsListConut = async () => {
  const { data } = await digitalPaintingCountByState();
  const allCount = data?.map(n => n.count).reduce((pre, cur) => plus(pre, cur), 0);
  tabsList.value.forEach((item) => {
    const count = data?.find(n => n.taskState === item.value)?.count;
    item.count = count?.toString() || '0';
  });
  tabsList.value[0].count = allCount.toString() || '0';
};

const { searchConfig } = useSearch();
const selection = ref<IDigitalPaintingQueryByPageResListItem[]>([]);
const selectionChange = (val: IDigitalPaintingQueryByPageResListItem[]) => {
  selection.value = val;
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
} = useList<IDigitalPaintingQueryByPageReq>({
  request: {
    api: digitalPaintingQueryByPage,
    params: {
      taskCode: null,
      taskState: '',
      styleCode: null,
      designCode: null,
      designerId: null,
      designerName: null,
      creatorId: null,
      createdTimeStart: null,
      createdTimeEnd: null,
      urgentType: null,
      flowerCode: null,
      pageNum: 1,
      pageSize: 20,
    },
    handleCustomReset(p, defaultParams) {
      return {
        ...defaultParams,
        taskState: p.taskState,
      };
    },
  },
  response: {
    handleResponseData(list: IDigitalPaintingQueryByPageResListItem[]) {
      list.forEach((item) => {
        if (item.paintingFee) {
          item.paintingFee = ceil(item.paintingFee, 2);
        }
      });
      return list;
    }
  }
});

const init = () => {
  getTabsListConut();
  handleSearch();
};

const cusntomReset = () => {
  handleReset();
  getTabsListConut();
};

const {
  isShowCodeDialog,
  auditDialogObj,
  currentRow,
  isShowCancelDialog,
  digitalDraftDialogObj,
  drawer,
  handleEdit,
  handleLog,
  handleRecall,
  handleCancel,
  handleAudit,
  handleView,
  handleCode,
  handleRedraft,
} = useHandleOperation(init);
const { columns } = useListTableColumns({
  handleEdit,
  handleLog,
  handleRecall,
  handleCancel,
  handleAudit,
  handleView,
  handleCode,
  handleRedraft,
});

/**
 * 切换tab
 */
const handleTabChange = (tab: TabsPaneContext, event: Event) => {
  params.value.taskState = tab.paneName;
  init();
};

/**
 * 新建
 */
const handleAdd = (): void => {
  currentRow.value = null;
  digitalDraftDialogObj.title = '新建任务';
  digitalDraftDialogObj.operationType = DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.NEW;
  digitalDraftDialogObj.isShowEditSkcCode = true;
  digitalDraftDialogObj.visible = true;
};

const handleExport = async () => {
  await exportByBlob({
    url: '/sdp-sample-clothes/web/v1/digital-painting/export/excel',
    method: 'post',
    loading: true,
    data: {
      ...params.value,
      digitalPaintingIdList: selection.value.map(n => n.digitalPaintingId),
    }
  });
  init();
};

onBeforeMount(() => {
  params.value.taskState = tabsList.value[0].value;
  init();
});

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .condition {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    padding-right: 30px;
    .el-form-item {
      margin-right: 40px;
      margin-bottom: 0;
      :deep(.el-form-item__label) {
        font-size: 14px;
        font-weight: bold;
      }
      :deep(.el-checkbox__label) {
        font-weight: 400;
        font-size: 12px;
      }
    }
  }
  .operation {
    flex-shrink: 0;
  }
}
:deep(.table-operation-area) {
  .el-button {
    display: block;
    margin-left: 0;
  }
}
</style>
