<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      />
    </template>
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
        calss="tw-h-full"
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
          min-width="100"
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
          label="部位名称"
          min-width="80"
          prop="clothesPartsName"
          align="center"
        />
        <el-table-column
          label="尺寸维度"
          min-width="50"
          prop="sizeDimensions"
          align="center"
        >
          <template #default="{ row }">
            <span>
              x{{ row.sizeDimensions }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="允差范围（cm）"
          min-width="100"
          prop="errorRange"
          align="center"
        />
        <el-table-column
          label="量法"
          min-width="260"
          prop="measuringMethod"
          align="center"
        >
          <template #default="{ row }">
            <div v-for="(item, index) in row.partsMeasurementVOList" :key="index">
              <span>量法{{ index + 1 }}，</span>
              <span>{{ item.measuringMethod }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="80"
          prop="isEnabledName"
          align="center"
        />
        <el-table-column
          label="操作记录"
          width="260"
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
      :data="(editData.data as any)"
      :is-edit="editData.isEdit"
      @refreshList="handleSearch(params.pageNum)"
    />
    <LogDrawer
      :id="(logData.id as string)"
      v-model="logData.visible"
      :buz-type="BUZ_TYPE.CLOTHES_PARTS"
      log-type="BASEINFO"
      content-key="content"
    />
  </sc-app-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useList } from '@/hooks/use-list';
import { BUZ_TYPE, STATUS_ENUM, STATUS_LIST } from '@/modules/base-config/constant';
import EditDialog from './components/edit-dialog.vue';
import LogDrawer from '@/modules/common/components/log-drawer/index';
import { getClothesPartSize, changeStatus } from './api';
import { selectionChange, useHandleOpen, useHandleClose } from '../../utils/index';
import type {
  IClothesPartsSizePageListItem,
  IClothesPartsSizePageReq,
  IClothesPartsSizePageLogListItem,
} from './api/type';
import usePermissionConfig from './hooks/use-permission-config';
import useSearchConfig from './hooks/use-search-config';

interface IlogData {
  visible: boolean;
  data: Array<IClothesPartsSizePageLogListItem | undefined> ;
  id: string | number | undefined;
}

export default defineComponent({
  components: {
    EditDialog,
    LogDrawer,
  },
  setup() {
    const { searchConfig } = useSearchConfig();
    const {
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
    } = useList<IClothesPartsSizePageListItem, IClothesPartsSizePageReq>({
      request: {
        api: getClothesPartSize,
        params: {
          clothesPartsName: '',
          status: STATUS_ENUM.ALL,
          createdTimeBegin: '',
          createdTimeEnd: '',
          pageNum: 1,
          pageSize: 20,
        },
        handleParams: (paramsObj) => {
          if (paramsObj.status === '' || !paramsObj.status) {
            paramsObj.isEnabled = '';
          } else if (paramsObj.status !== STATUS_ENUM.ALL) {
            paramsObj.isEnabled = paramsObj.status === STATUS_ENUM.OPEN ? '1' : '0';
          }
          delete paramsObj.status;

          return paramsObj;
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
    const showEdit = (row: IClothesPartsSizePageListItem) => {
      editData.isEdit = true;
      editData.data = { ...row };
      editData.visible = true;
    };

    let selectedIds: Array<string | number> = reactive([]);
    const handleSelectionChange = (lists: IClothesPartsSizePageListItem[]) => {
      selectedIds = selectionChange(lists);
    };

    // 启用
    const handleOpen = async () => {
      useHandleOpen({
        selectedIds,
        api: changeStatus,
        callback: () => handleSearch(params.value.pageNum),
      });
    };
    // 停用
    const handleClose = async () => {
      useHandleClose({
        selectedIds,
        api: changeStatus,
        callback: () => handleSearch(params.value.pageNum),
      });
    };

    // 操作日志
    const logData = reactive<IlogData>({
      visible: false,
      data: [],
      id: '',
    });

    const openLogModal = (row: IClothesPartsSizePageListItem) => {
      logData.visible = true;
      logData.data = row.logList;
      logData.id = row.id;
    };

    return (
      {
        searchConfig,
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
