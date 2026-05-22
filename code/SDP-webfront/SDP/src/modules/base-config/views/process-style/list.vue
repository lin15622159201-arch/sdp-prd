<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='120px'
        @handleSearch="handleSearch"
        @handle-reset="handleReset"
      />
    </template>
    <template #header>
      <operation>
        <router-link
          :to="{
            name: 'BaseConfigProcessStyleDetail'
          }"
        >
          <el-button v-if="permissionRef.XJ" type="primary">
            新建
          </el-button>
        </router-link>
        <el-button
          v-if="permissionRef.QY"
          type="success"
          :disabled="!selectedIds.length"
          class="btn"
          @click="changeStatus(1)"
        >
          启用
        </el-button>
        <el-button
          v-if="permissionRef.TY"
          :disabled="!selectedIds.length"
          type="danger"
          class="btn"
          @click="changeStatus(0)"
        >
          停用
        </el-button>
      </operation>
    </template>
    <template #main>
      <custom-table
        v-loading="tableLoading"
        border
        :column="column"
        class="tw-h-full"
        :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <template #styleName="{ row }">
          <router-link
            v-if="permissionRef.BJ"
            :to="{
              name: 'BaseConfigProcessStyleDetail',
              query: {
                id: row.processStyleTemplateId,
              },
            }"
          >
            {{ row.styleName }}
          </router-link>
          <span v-else>{{ row.styleName }}</span>
        </template>

        <template #oprate="{ row }">
          <span>{{ row.reviserName }} {{ $filters.formatTime(row.revisedTime) }}</span>
          <span
            v-if="permissionRef.RZ"
            class="oprate"
            @click="openLogModal(row)"
          >
            操作日志
          </span>
        </template>
      </custom-table>
    </template>
    <template #ffooter>
      <el-row
        style="width: 100%"
        justify="end"
      >
        <pagination
          :total="tableTotal"
          :current-page="params.pageNum"
          :size="params.pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </template>

    <log-drawer
      :id="logData.id"
      v-model="logData.visible"
      :buz-type="BUZ_TYPE.PROCESS_STYLE_TEMPLATE"
      log-type="BASEINFO"
      content-key="content"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useList } from '@/hooks/use-list';
import usePermissionConfig from './hooks/use-permission-config';
import usePermission from '@/hooks-transfer/use-permission';

import type {
  IStyleTemplatePageReq,
  IStyleTemplatePageResListItem,
  ISizeTemplatePageLogListItem,
} from './api/type';
import { getStyleTemplatePage, changeStyleTemplateSwitchState } from './api';
import LogDrawer from '@/modules/common/components/log-drawer';
import { defineColumns } from '@/components/custom-table';
import { ENABLE_STATE_LIST, BUZ_TYPE } from '../../constant';
import useSearchConfig from './hooks/use-search-config';

const { searchConfig } = useSearchConfig();
interface IlogData {
  visible: boolean;
  data: Array<ISizeTemplatePageLogListItem | undefined> ;
  id: string | undefined;
}

interface Params extends IStyleTemplatePageReq {
  createdTime?: string;
}

const permissionConfig = usePermissionConfig();
const { permissionRef } = usePermission(permissionConfig);
const {
  params,
  tableData,
  tableTotal,
  tableLoading,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<IStyleTemplatePageResListItem, Params>({
  request: {
    api: getStyleTemplatePage,
    params: {
      pageNum: 1,
      pageSize: 20,
      createStartTime: '',
      createEndTime: '',
      state: undefined,
      styleName: '',
      regionId: '',
    },
    // handleParams: (paramsObj) => {
    //   // 对创建时间数据进行处理
    //   [paramsObj.createStartTime, paramsObj.createEndTime] = paramsObj.createdTime || ['', ''];
    //   delete paramsObj.createdTime;
    //   return paramsObj;
    // },
  },
});
// 实现多选操作，获得选中的id列表
const selectedIds = ref<IStyleTemplatePageResListItem[]>([]);
const handleSelectionChange = (lists: IStyleTemplatePageResListItem[]) => {
  selectedIds.value = lists;
};

// 更改状态
const changeStatus = async (status: number) => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning({
      message: `请选择需要${status ? '启用' : '停用'}启用的记录`,
      type: 'warning',
    });
    return;
  }
  await ElMessageBox.confirm(`是否确认${status ? '启用' : '停用'}?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  const ids: string[] = [];
  selectedIds.value.forEach((item) => {
    ids.push(item.processStyleTemplateId);
  });
  await changeStyleTemplateSwitchState({
    processStyleTemplateIds: ids,
    state: status,
  });
  ElMessage({
    message: `${status ? '启用' : '停用'}成功!`,
    type: 'success',
  });
  handleSearch();
};

// 操作日志数据
const logData = reactive<IlogData>({
  id: '',
  data: [],
  visible: false,
});
const openLogModal = (row: IStyleTemplatePageResListItem) => {
  logData.id = row.processStyleTemplateId;
  logData.visible = true;
};

const column = defineColumns([
  {
    type: 'selection',
    align: 'center',
  },
  {
    type: 'index',
    label: '序号',
    align: 'center',
    minWidth: '80',
  },
  {
    label: '所属区域',
    prop: 'regionName',
    slotKey: 'regionName',
    minWidth: '100',
    align: 'center',
  },
  {
    label: '款式名称',
    prop: 'styleName',
    slotKey: 'styleName',
    minWidth: '100',
    align: 'center',
  },
  {
    label: '状态',
    prop: 'state',
    enum: ENABLE_STATE_LIST,
    minWidth: '60',
    align: 'center',
  },
  {
    label: '创建时间',
    prop: 'createdTime',
    isTime: true,
    align: 'center',
  },
  {
    label: '操作记录',
    slotKey: 'oprate',
    minWidth: '160',
    align: 'center',
    fixed: 'right',
  },
]);
handleSearch();
</script>

<style scoped lang="scss">
.oprate {
  margin-left: 20px;
  color: var(--el-color-primary);
  cursor: pointer;
}
.btn {
  margin-left: 12px;
}

</style>
