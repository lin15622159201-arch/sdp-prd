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
        <div class="btn-contain">
          <div>
            <router-link
              :to="{
                name: 'BaseConfigSewingComponentDetail'
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
          </div>
          <div>
            <el-button
              v-if="permissionRef.DR"
              class="process-import"
            >
              <input
                ref="inputRef"
                type="file"
                class="process-import__file"
                accept=".xlsx, .xls"
                @change="handleChange"
              >
              导入
            </el-button>
            <el-button
              type="primary"
              @click="handleDownloadFile"
            >
              下载模板
            </el-button>
          </div>
        </div>
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
        <!-- <el-table-column
          type="selection"
          align="center"
        />
        <el-table-column
          label="序号"
          type="index"
          align="center"
          prop="id"
          min-width="80"
        /> -->

        <template #componentName="{ row }">
          <router-link
            v-if="permissionRef.BJ"
            :to="{
              name: 'BaseConfigSewingComponentDetail',
              query: {
                id: row.sewingComponentTemplateId,
              },
            }"
          >
            {{ row.componentName }}
          </router-link>
          <span v-else>{{ row.componentName }}</span>
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
      :buz-type="BUZ_TYPE.SEWING_COMPONENT_TEMPLATE"
      log-type="BASEINFO"
      content-key="content"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useList } from '@/hooks/use-list';
import usePermissionConfig from './hooks/use-permission-config';
import usePermission from '@/hooks-transfer/use-permission';
import { exportByBlob } from '@/core/utils/file-download';

import type {
  ISewingComponentTemplatePageReq,
  ISewingComponentTemplatePageResListItem,
} from './api/type';
import {
  sewingComponentTemplatePag,
  switchStateOpen,
  switchStateClose,
  sewingComponentTemplateImportExcel
} from './api';
import LogDrawer from '@/modules/common/components/log-drawer';
import { defineColumns } from '@/components/custom-table';
import useSearchConfig from './hooks/use-search-config';
import { ENABLE_STATE_LIST, BUZ_TYPE } from '../../constant';

interface IlogData {
  visible: boolean;
  data: Array<ISewingComponentTemplatePageResListItem | undefined> ;
  id: string | undefined;
}

interface Params extends ISewingComponentTemplatePageReq {
  createdTime?: string;
}
const { searchConfig } = useSearchConfig();
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
} = useList<ISewingComponentTemplatePageResListItem, Params>({
  request: {
    api: sewingComponentTemplatePag,
    params: {
      pageNum: 1,
      pageSize: 20,
      createStartTime: '',
      createEndTime: '',
      state: undefined,
      componentName: '',
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
const selectedIds = ref<ISewingComponentTemplatePageResListItem[]>([]);
const handleSelectionChange = (lists: ISewingComponentTemplatePageResListItem[]) => {
  selectedIds.value = lists;
};

const inputRef = ref<HTMLInputElement>();

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
    ids.push(item.sewingComponentTemplateId);
  });
  if (status) {
    await switchStateOpen({
      sewingComponentTemplateIds: ids,
    });
  } else {
    await switchStateClose({
      sewingComponentTemplateIds: ids,
    });
  }
  ElMessage({
    message: `${status ? '启用' : '停用'}成功!`,
    type: 'success',
  });
  handleSearch();
};

const handleDownloadFile = async () => {
  const date = new Date();
  await exportByBlob({
    method: 'get',
    url: '/sdp-clothing-material/web/v1/sewingComponentTemplate/download-excel-template',
    filename: '工序部件库模板.xlsx',
    loading: true,
  });
  ElMessage.success('下载模板成功');
};

const handleFileUpload = async (file: File) => {
  const fileTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ];
  if (!fileTypes.includes(file.type)) {
    ElMessage.warning('必须导入Excel文件');
    return;
  }
  console.log('file==', file);
  const formData = new FormData();
  formData.append('file', file, file.name);
  await sewingComponentTemplateImportExcel(formData);
  ElMessage.success('导入成功');
  handleSearch();
};
const handleChange = async (e: Event) => {
  const { files } = e.target as HTMLInputElement;

  if (files?.length) {
    const file = files[0];
    await handleFileUpload(file);
  }
  nextTick(() => {
    inputRef.value && (inputRef.value!.value = '');
  });
};

// 操作日志数据
const logData = reactive<IlogData>({
  id: '',
  data: [],
  visible: false,
});
const openLogModal = (row: ISewingComponentTemplatePageResListItem) => {
  logData.id = row.sewingComponentTemplateId;
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
    label: '工序部件',
    prop: 'componentName',
    slotKey: 'componentName',
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
.btn-contain {
  display: flex;
  justify-content: space-between;
  .btn {
    margin-left: 12px;
  }
}
.process-import {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  &__file {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    /* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
    bottom: 0;
    opacity: 0;
    cursor: pointer;
    width: 58px;
    height: 30px;
  }
}

</style>
