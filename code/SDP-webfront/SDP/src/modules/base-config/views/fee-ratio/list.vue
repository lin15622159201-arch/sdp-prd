<template>
  <sc-app-page>
    <template #header>
      <Operation>
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
      </Operation>
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
          min-width="80"
          prop="id"
          align="center"
        >
          <template #default="{ row }">
            <span
              v-if="$has(permissionConfig.BJ)"
              class="cur_p link-color"
              @click="showEdit(row)"
            >
              {{ row.id }}
            </span>
            <span v-else>
              {{ row.id }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="外发版房类型"
          min-width="120"
          prop="roomExternalType"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{ $filters.getEnumLabel(ROOM_TYPE_LIST, row.roomExternalType) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="外发纸样倍率"
          min-width="80"
          prop="designExternalRatio"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{ row.designExternalRatio }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="外发车缝倍率"
          min-width="80"
          prop="makeExternalRatio"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{ row.makeExternalRatio }}
            </span>
          </template>
        </el-table-column>
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
              {{ row.logStrFirst }}
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
      :data="(editData.data as IRoomEditionFeePageListItem)"
      :is-edit="editData.isEdit"
      @refreshList="handleSearch(params.pageNum)"
    />
    <!-- <LogDialog
      v-model="logData.visible"
      :id="logData.id"
      :buzType="BUZ_TYPE.EXTERNAL_FEE"
    ></LogDialog> -->
    <LogDrawer
      :id="(logData.id as string)"
      v-model="logData.visible"
      :buz-type="BUZ_TYPE.EXTERNAL_FEE"
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
import { getEditionFee, changeEditionFeeState } from './api';
import { selectionChange, useHandleOpen, useHandleClose } from '../../utils/index';
import type { IRoomEditionFeePageListItem, IRoomEditionFeePageReq, IRoomEditionFeePageLogListItem } from './api/type';
import usePermissionConfig from './hooks/use-permission-config';
import { BUZ_TYPE, OPEN_STATUS, ROOM_TYPE_LIST } from '../../constant';

interface IlogData {
  visible: boolean;
  data: Array<IRoomEditionFeePageLogListItem | undefined> ;
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
    } = useList<IRoomEditionFeePageListItem, IRoomEditionFeePageReq>({
      request: {
        api: getEditionFee,
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
    const showEdit = (row: IRoomEditionFeePageListItem) => {
      editData.isEdit = true;
      editData.data = { ...row };
      editData.visible = true;
    };

    let selectedIds: Array<string | number> = reactive([]);
    const handleSelectionChange = (lists: IRoomEditionFeePageListItem[]) => {
      selectedIds = selectionChange(lists);
    };

    // 启用
    const handleOpen = async () => {
      useHandleOpen({
        selectedIds,
        api: changeEditionFeeState,
        callback: () => handleSearch(params.value.pageNum),
      });
    };
    // 停用
    const handleClose = async () => {
      useHandleClose({
        selectedIds,
        api: changeEditionFeeState,
        callback: () => handleSearch(params.value.pageNum),
      });
    };

    // 操作日志
    const logData = reactive<IlogData>({
      visible: false,
      data: [],
      id: '',
    });

    const openLogModal = (row: IRoomEditionFeePageListItem) => {
      logData.visible = true;
      logData.data = row.logList;
      logData.id = row.id;
    };

    return (
      {
        params,
        tableTotal,
        tableData,
        tableLoading,
        handleSearch,
        handleReset,
        handleSizeChange,
        handleCurrentChange,
        showEdit,
        editData,
        handleCreate,
        handleOpen,
        handleClose,
        logData,
        openLogModal,
        handleSelectionChange,
        ROOM_TYPE_LIST,
        BUZ_TYPE,
        OPEN_STATUS,
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
