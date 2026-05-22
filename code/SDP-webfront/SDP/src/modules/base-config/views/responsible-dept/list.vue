<template>
  <sc-app-page>
    <template #header>
      <operation>
        <el-row
          style="width: 100%"
          type="flex"
        >
          <el-button
            v-if="$has(permissionConfig.XJ)"
            type="primary"
            @click="handleCreate()"
          >
            新建
          </el-button>
          <el-button
            v-if="$has(permissionConfig.QY)"
            type="success"
            @click="handleOpen()"
          >
            启用
          </el-button>
          <el-button
            v-if="$has(permissionConfig.TY)"
            type="danger"
            @click="handleClose()"
          >
            停用
          </el-button>
        </el-row>
      </operation>
    </template>
    <template #main>
      <el-table
        v-loading="tableLoading"
        border
        tooltip-effect="dark"
        class="tw-h-full"
        :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="44"
          align="center"
        />
        <el-table-column
          label="ID"
          width="180"
          prop="departmentId"
          align="center"
        >
          <template #default="{ row }">
            <span
              v-if="$has(permissionConfig.BJ)"
              class="cur_p link-color"
              @click="showEdit(row)"
            >
              {{ row.departmentId }}
            </span>
            <span v-else>
              {{ row.departmentId }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="责任部门"
          min-width="140"
          prop="departmentName"
          align="center"
        />
        <el-table-column
          label="责任人"
          min-width="100"
          prop="responsibleName"
          align="center"
        />

        <el-table-column
          label="状态"
          min-width="80"
          prop="isEnabled"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{ row.isEnabled === "1" ? OPEN_STATUS.OPEN : OPEN_STATUS.CLOSE }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作记录"
          width="270"
          align="center"
          prop="logStrFirst"
          fixed="right"
        >
          <template #default="{ row }">
            <span>
              {{ row.reviserName }}，
            </span>
            <span>
              {{ $filters.formatTime(row.revisedTime) }}
            </span>
            <span
              v-if="$has(permissionConfig.RZ)"
              class="oprate"
              @click="openLogModal(row)"
            >
              操作日志
            </span>
          </template>
        </el-table-column>
      </el-table>
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
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </template>
    <EditDialog
      v-model="editData.visible"
      :data="(editData.data as any)"
      :is-edit="editData.isEdit"
      @refreshList="handleSearch(params.pageNum)"
    />
    <!-- <LogDialog
      v-model="logData.visible"
      :id="logData.id"
      :buzType="BUZ_TYPE.RESPONSIBLE_DEPARTMENT"
    ></LogDialog> -->
    <LogDrawer
      :id="(logData.id as string)"
      v-model="logData.visible"
      :buz-type="BUZ_TYPE.RESPONSIBLE_DEPARTMENT"
      log-type="BASEINFO"
      content-key="content"
    />
  </sc-app-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useList } from '@/hooks/use-list';
import EditDialog from './components/edit-dialog.vue';
// import LogDialog from '@/modules/base-info-manage/components/log-dialog.vue';
import LogDrawer from '@/modules/common/components/log-drawer';
import { getResponsibleDepartment, changeStatus } from './api';
import { useStateOpen, useStateClose } from '../../utils/index';
import type { IResponsibleDepartmentPageListItem, IResponsibleDepartmentPageReq } from './api/type';
import usePermissionConfig from './hooks/use-permission-config';
import { BUZ_TYPE, OPEN_STATUS, STATUS_LIST } from '../../constant';

interface IlogData {
  visible: boolean;
  id: string | number | undefined;
}

export default defineComponent({
  components: {
    EditDialog,
    // LogDialog,
    LogDrawer,
  },
  setup() {
    const {
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
    } = useList<IResponsibleDepartmentPageListItem, IResponsibleDepartmentPageReq>({
      request: {
        api: getResponsibleDepartment,
        params: {
          pageNum: 1,
          pageSize: 20,
        },
      },
    });
    const permissionConfig = usePermissionConfig();
    const init = () => {
      handleSearch();
    };

    // 初始化
    init();

    const editData = reactive({
      isEdit: true,
      visible: false,
      data: {},
    });
    // 创建
    const handleCreate = () => {
      editData.isEdit = false;
      editData.data = {};
      editData.visible = true;
    };
    // 修改
    const showEdit = (row: IResponsibleDepartmentPageListItem) => {
      editData.isEdit = true;
      editData.data = { ...row };
      editData.visible = true;
    };

    let selectedIds: Array<string> = reactive([]);
    const handleSelectionChange = (lists: IResponsibleDepartmentPageListItem[]) => {
      const ids: Array<string> = [];
      lists?.forEach((it) => {
        ids.push(it.departmentId);
      });
      selectedIds = ids;
    };

    // 启用
    const handleOpen = async () => {
      useStateOpen({
        requestParams: {
          departmentIds: selectedIds,
          isEnabled: 1,
        },
        selectedIds,
        api: changeStatus,
        callback: () => handleSearch(params.value.pageNum),
      });
    };
    // 停用
    const handleClose = async () => {
      useStateClose({
        requestParams: {
          departmentIds: selectedIds,
          isEnabled: 0,
        },
        selectedIds,
        api: changeStatus,
        callback: () => handleSearch(params.value.pageNum),
      });
    };

    // 操作日志
    const logData = reactive<IlogData>({
      visible: false,
      id: '',
    });

    const openLogModal = (row: IResponsibleDepartmentPageListItem) => {
      logData.visible = true;
      logData.id = row.departmentId;
    };

    return (
      {
        OPEN_STATUS,
        params,
        tableTotal,
        tableData,
        tableLoading,
        handleSearch,
        handleReset,
        handleSizeChange,
        handleCurrentChange,
        STATUS_LIST,
        showEdit,
        editData,
        handleCreate,
        handleOpen,
        handleClose,
        logData,
        openLogModal,
        handleSelectionChange,
        BUZ_TYPE,
        permissionConfig,
      }
    );
  },
});
</script>

<style lang="scss" scoped>
.oprate{
  margin-left: 20px;
  color: var(--el-color-primary);
  cursor: pointer;
}
.cur_p{
  cursor: pointer;
}
.link-color{
  color:#108ee9;
}
</style>
