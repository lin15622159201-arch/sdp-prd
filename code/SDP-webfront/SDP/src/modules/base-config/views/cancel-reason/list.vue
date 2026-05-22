<template>
  <!-- 取消原因 -->
  <sc-app-page>
    <!-- 存放查询栏的头部 -->
    <template #fheader>
      <el-form
        class="fixed-el-form-item-height"
        :model="params"
        label-width="110px"
        @keyup.enter="handleSearch()"
      >
        <el-form-item label="取消原因">
          <el-input
            v-model="params.cancelReason"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="params.status"
            placeholder="请选择"
            style="width: 170px;"
            clearable
          >
            <el-option
              v-for="item of STATUS_LIST"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="(params.createdTime as any)"
            type="daterange"
            value-format="YYYY-MM-DD HH:mm:ss"
            :default-time="[new Date(2000, 0, 0, 0, 0, 0), new Date(2000, 0, 0, 23, 59, 59)]"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
          />
        </el-form-item>
        <el-form-item label-width="40px">
          <el-button
            type="primary"
            @click="handleSearch()"
          >
            查询
          </el-button>
          <el-button
            @click="handleReset()"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </template>
    <!-- 存放新建启用停用按钮的头部 -->
    <template #header>
      <Operation>
        <el-button
          v-if="$has(permissionConfig.XJ)"
          type="primary"
          @click="handleCreate"
        >
          新建
        </el-button>
        <el-button
          v-if="$has(permissionConfig.QY)"
          type="success"
          @click="handleOpen"
        >
          启用
        </el-button>
        <el-button
          v-if="$has(permissionConfig.TY)"
          type="danger"
          @click="handleClose"
        >
          停用
        </el-button>
      </Operation>
    </template>
    <!-- 存放列表表格 -->
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
          align="center"
        />
        <el-table-column
          label="ID"
          prop="id"
          align="center"
        >
          <template #default="{ row }">
            <span
              v-if="$has(permissionConfig.BJ)"
              class="cur_p link-color"
              @click="handleEdit(row)"
            >{{ row.id }}</span>
            <span v-else>
              {{ row.id }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="取消原因"
          prop="cancelReason"
          align="center"
        />
        <el-table-column
          label="是否收费"
          prop="isCharge"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{ $filters.getEnumLabel(YES_OR_NO_NUMBER_LIST, row.isCharge) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="isEnabled"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{ $filters.getEnumLabel(ENABLE_STATE_LIST, row.isEnabled) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作记录"
          align="center"
          width="270"
          prop="logStrFirst"
          fixed="right"
        >
          <template #default="{ row }">
            <span>{{ row.logStrFirst }}</span>
            <span
              v-if="$has(permissionConfig.CZRZ)"
              class="oprate"
              @click="openLogModal(row)"
            > 操作日志</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 存放分页 -->
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
      :is-edit="editData.isEdit"
      :data="editData.data"
      @refreshList="handleSearch(params.pageNum)"
    />
    <LogDrawer
      :id="logData.id"
      v-model="logData.visible"
      :buz-type="BUZ_TYPE.CANCEL_REASON"
      log-type="BASEINFO"
      content-key="content"
    />
  </sc-app-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useList } from '@/hooks/use-list';
import type { ICancelReasonPageReq, ICancelReasonPageListItem, ICancelReasonPageLogListItem } from './api/type';
import { getCancelReason, changeCancelStatus } from './api/index';
import { selectionChange, useHandleOpen, useHandleClose } from '../../utils/index';
import EditDialog from './components/edit-dialog.vue';
import LogDrawer from '@/modules/common/components/log-drawer';
import { YES_OR_NO_NUMBER_LIST } from '@/constant';
import { BUZ_TYPE, ENABLE_STATE_LIST, STATUS_ENUM, STATUS_LIST } from '../../constant';
import usePermissionConfig from './hooks/use-permission-config';

interface IlogData {
  visible: boolean;
  data: Array<ICancelReasonPageLogListItem | undefined> ;
  id: string | undefined;
}

export default defineComponent({
  components: {
    EditDialog,
    LogDrawer,
  },
  setup() {
    // 获取列表数据以及相关方法
    const {
      params,
      tableData,
      tableTotal,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
    } = useList<ICancelReasonPageListItem, ICancelReasonPageReq>({
      request: {
        // 调用获取取消原因的接口
        api: getCancelReason,
        // 数据参数
        params: {
          cancelReason: '',
          status: STATUS_ENUM.ALL,
          createdTime: [],
          pageNum: 1,
          pageSize: 20,
        },
        // 处理数据
        handleParams: (paramsObj) => {
          // 处理创建时间数据
          [paramsObj.createdTimeBegin, paramsObj.createdTimeEnd] = paramsObj.createdTime || ['', ''];
          delete paramsObj.createdTime;
          // 处理状态数据
          if (paramsObj.status === '') {
            paramsObj.isEnabled = '';
          } else if (paramsObj.status !== STATUS_ENUM.ALL) {
            paramsObj.isEnabled = paramsObj.status === STATUS_ENUM.OPEN ? '1' : '0';
          }
          delete paramsObj.status;
          return paramsObj;
        },
      },
    });
    // 获取相关按钮权限
    const permissionConfig = usePermissionConfig();
    // 实现多选操作，获得选中的id列表
    let selectedIds: Array<string | number> = reactive([]);
    const handleSelectionChange = (lists: ICancelReasonPageListItem[]) => {
      selectedIds = selectionChange(lists);
    };
    // 初始化方法
    const init = () => {
      handleSearch();
    };
    init();
    // 启用触发方法
    const handleOpen = async () => {
      useHandleOpen({
        selectedIds,
        api: changeCancelStatus,
        callback: () => handleSearch(params.value.pageNum), // 启用完成后重新查询到当前页面数据
      });
    };
    // 停用触发方法
    const handleClose = async () => {
      useHandleClose({
        selectedIds,
        api: changeCancelStatus,
        callback: () => handleSearch(params.value.pageNum), // 启用完成后重新查询到当前页面数据
      });
    };
    // 绑定编辑弹窗数据
    const editData = reactive({
      visible: false, // 是否弹窗
      isEdit: true, // 是否编辑
      data: {},
    });
    // 新建方法
    const handleCreate = () => {
      editData.visible = true;
      editData.data = {};
      editData.isEdit = false;
    };
    // 编辑方法
    const handleEdit = (row: ICancelReasonPageListItem) => {
      editData.visible = true;
      editData.data = { ...row };
      editData.isEdit = true;
    };
    // 操作日志数据
    const logData = reactive<IlogData>({
      id: '',
      data: [],
      visible: false,
    });
    const openLogModal = (row: ICancelReasonPageListItem) => {
      logData.id = row.id;
      logData.visible = true;
    };

    return ({
      YES_OR_NO_NUMBER_LIST,
      BUZ_TYPE,
      ENABLE_STATE_LIST,
      STATUS_LIST,
      params,
      tableData,
      tableTotal,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
      permissionConfig,
      handleSelectionChange,
      handleOpen,
      handleClose,
      editData,
      handleCreate,
      handleEdit,
      openLogModal,
      logData,
    });
  },
});
</script>

<style scoped>
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
