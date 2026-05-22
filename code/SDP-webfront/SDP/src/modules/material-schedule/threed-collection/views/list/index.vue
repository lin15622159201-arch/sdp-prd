<!--面辅料采购跟进-->
<template>
  <sc-app-page>
    <template #fheader>
      <el-tabs
        v-model="params.gleanState"
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
        <template #designerId>
          <DesignerSelect
            v-model="params.designerId"
            clearable
            :is-first-load-cache="true"
            @change="handleDesignerChange"
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <el-button
        v-if="DC"
        type="primary"
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
          :size="params.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { ElMessageBox, TabsPaneContext } from 'element-plus';
import DesignerSelect from '@/components/designer-select';
import { useSearch } from './hooks/use-search';
import { usePermissionConfig } from '../../use-permission-config';
import { useList } from '@toy/v-use';
import { useListTableColumns } from './hooks/use-table-columns';
import { THREE_D_COLLECTION_TASK_STATUS_ENUM, THREE_D_COLLECTION_TASK_STATUS_LIST } from '../../constant';
import { dimensionGleanCountByState, dimensionGleanQueryByPage } from '../../api';
import { IDimensionGleanQueryByPageReq, IDimensionGleanQueryByPageResListItem } from '../../api/types';
import { cloneDeep } from 'lodash-es';
import { plus } from '@toy/utils';
import { exportByBlob } from '@/core/utils/file-download';
import { IDesignerListItem } from '@/api/basis/types';

const { DC } = usePermissionConfig();
const { searchConfig } = useSearch();
const { columns } = useListTableColumns();
// 列表勾选项
const selection = ref<IDimensionGleanQueryByPageResListItem[]>([]);
const handleSelectionChange = (checked: IDimensionGleanQueryByPageResListItem[]) => {
  selection.value = checked || [];
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
} = useList<IDimensionGleanQueryByPageReq, typeof dimensionGleanQueryByPage>({
  request: {
    api: dimensionGleanQueryByPage,
    params: {
      pageNum: 1,
      pageSize: 20,
      gleanCode: undefined,
      skuCode: undefined,
      designerId: undefined,
      designerName: undefined,
      purchaseState: undefined,
      gleanState: THREE_D_COLLECTION_TASK_STATUS_ENUM.ALL,
    },
    handleParams(p) {
      const _p = cloneDeep(p);
      delete _p.designerId;
      return {
        ..._p,
      };
    },
    handleCustomReset(p, defaultParams) {
      return {
        ...defaultParams,
        gleanState: p.gleanState,
      };
    },
  },
});

const tabsList = ref(cloneDeep(THREE_D_COLLECTION_TASK_STATUS_LIST));
const getTabsListConut = async () => {
  const { data } = await dimensionGleanCountByState();
  const allCount = data?.map(n => n.count).reduce((pre, cur) => plus(pre, cur), 0);
  tabsList.value.forEach((item) => {
    const count = data?.find(n => n.gleanState === item.value)?.count;
    item.count = count?.toString() || '0';
  });
  tabsList.value[0].count = allCount.toString() || '0';
};

const init = () => {
  getTabsListConut();
  handleSearch();
};

const cusntomReset = () => {
  handleReset();
  getTabsListConut();
};

/**
 * 切换tab
 */
const handleTabChange = (tab: TabsPaneContext, event: Event) => {
  params.value.gleanState = tab.paneName as THREE_D_COLLECTION_TASK_STATUS_ENUM;
  init();
};

const handleDesignerChange = (userId: string, user: IDesignerListItem) => {
  params.value.designerId = userId;
  params.value.designerName = user?.designerName;
};

/**
 * 导出
 */
const handleExport = async (): Promise<void> => {
  const ids = selection.value.map(item => item.id);
  await ElMessageBox.confirm(
    `已选中 ${selection.value.length ? selection.value.length : tableTotal.value} 条数据，是否确认导出`,
    '导出',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }
  );
  await exportByBlob({
    url: '/sdp-design/web/v1/dimension-glean/export/excel',
    method: 'post',
    loading: true,
    data: {
      ...params.value,
      ids,
    }
  });
  init();
};

onBeforeMount(() => {
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
</style>
