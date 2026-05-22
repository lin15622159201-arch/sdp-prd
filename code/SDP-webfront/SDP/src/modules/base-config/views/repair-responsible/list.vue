<template>
  <sc-app-page>
    <template #fheader>
      <el-form
        class="fixed-el-form-item-height"
        :model="params"
        label-width="130px"
        @keyup.enter="handleSearch()"
      >
        <el-form-item
          label="返修/复版责任方"
        >
          <el-input
            v-model="params.reworkingDuty"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="状态"
        >
          <el-select
            v-model="params.status"
            placeholder="请选择"
            class="tw-w-170px"
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

        <el-form-item
          label="创建时间"
        >
          <el-date-picker
            v-model="params.createdTime"
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
    <template #header>
      <Operation>
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
          width="180"
          prop="dutyId"
          align="center"
        >
          <template #default="{ row }">
            <span
              v-if="$has(permissionConfig.BJ)"
              class="cur_p link-color"
              @click="showEdit(row)"
            >
              {{ row.dutyId }}
            </span>
            <span v-else>
              {{ row.dutyId }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="返修/复版责任方"
          min-width="140"
          prop="reworkingDuty"
          align="center"
        />
        <el-table-column
          label="计费规则"
          min-width="100"
          prop="payCostRule"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{ $filters.getEnumLabel(PAY_COST_RULE_LIST, row.payCostRule) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="收费规则"
          min-width="100"
          prop="receiveCostRule"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{ $filters.getEnumLabel(RECEIVE_COST_RULE_LIST, row.receiveCostRule) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="返修计费影响"
          min-width="100"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{
                row.repairChargingAffects
                  .map((v: any) => $filters.getEnumLabel(REPAIR_CHARGE_AFFECT_LIST, v))
                  .filter((v: string) => !isEmpty(v))
                  .join('，')
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="返修类型"
          min-width="100"
          prop="repairTypes"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{ getRepairTypesDes(row.repairTypes) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="状态"
          min-width="80"
          prop="state"
          align="center"
        >
          <template #default="{ row }">
            <span>
              {{ row.state === "1" ? OPEN_STATUS.OPEN : OPEN_STATUS.CLOSE }}
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
      :data="(editData.data as IReworkResponsibilityPageListItem)"
      :is-edit="editData.isEdit"
      @refreshList="handleSearch(params.pageNum)"
    />
    <LogDrawer
      :id="(logData.id as string)"
      v-model="logData.visible"
      :buz-type="BUZ_TYPE.REWORK_RESPONSIBILITY"
      log-type="BASEINFO"
      content-key="content"
    />
  </sc-app-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useList } from '@/hooks/use-list';
import {
  PAY_COST_RULE_LIST,
  RECEIVE_COST_RULE_LIST,
  REPAIR_CHARGE_AFFECT_LIST,
  OPEN_STATUS,
  STATUS_LIST,
  STATUS_ENUM,
  REPAIR_CHARGE_AFFECT,
  BUZ_TYPE,
} from '@/modules/base-config/constant';
import EditDialog from './components/edit-dialog.vue';
import LogDrawer from '@/modules/common/components/log-drawer';
import { getReworkResponsibilityPage, enableResponsibility, disableResponsibility } from './api';
import { useStateOpen, useStateClose } from '../../utils/index';
import type { IReworkResponsibilityPageReq, IReworkResponsibilityPageListItem } from './api/type';
import usePermissionConfig from './hooks/use-permission-config';
import { filters } from '@/core/plugins/filter';
import { isEmpty } from '@toy/utils';

interface IlogData {
  visible: boolean;
  id: string | number | undefined;
}

export default defineComponent({
  components: {
    EditDialog,
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
    } = useList<IReworkResponsibilityPageListItem, IReworkResponsibilityPageReq>({
      request: {
        api: getReworkResponsibilityPage,
        params: {
          status: STATUS_ENUM.ALL,
          pageNum: 1,
          pageSize: 20,
        },
        handleParams: (paramsObj) => {
          [paramsObj.createTimeStart, paramsObj.createTimeEnd] = paramsObj.createdTime || ['', ''];
          delete paramsObj.createdTime;
          if (paramsObj.status === '' || !paramsObj.status) {
            paramsObj.state = '';
          } else if (paramsObj.status !== STATUS_ENUM.ALL) {
            paramsObj.state = paramsObj.status === STATUS_ENUM.OPEN ? '1' : '0';
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

    const getRepairTypesDes = (repairTypes: REPAIR_CHARGE_AFFECT[]) => {
      const typeArr = repairTypes?.map((type: string) => {
        return filters.getEnumLabel(REPAIR_CHARGE_AFFECT_LIST, type);
      });
      return typeArr.join('，');
    };

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
    const showEdit = (row: IReworkResponsibilityPageListItem) => {
      editData.isEdit = true;
      editData.data = { ...row };
      editData.visible = true;
    };

    let selectedIds: Array<string> = reactive([]);
    const handleSelectionChange = (lists: IReworkResponsibilityPageListItem[]) => {
      const ids: Array<string> = [];
      lists?.forEach((it) => {
        ids.push(it.dutyId);
      });
      selectedIds = ids;
    };

    // 启用
    const handleOpen = async () => {
      useStateOpen({
        requestParams: selectedIds,
        selectedIds,
        api: enableResponsibility,
        callback: () => handleSearch(params.value.pageNum),
      });
    };
    // 停用
    const handleClose = async () => {
      useStateClose({
        requestParams: selectedIds,
        selectedIds,
        api: disableResponsibility,
        callback: () => handleSearch(params.value.pageNum),
      });
    };

    // 操作日志
    const logData = reactive<IlogData>({
      visible: false,
      id: '',
    });

    const openLogModal = (row: any) => {
      logData.visible = true;
      logData.id = row.dutyId;
    };

    return (
      {
        isEmpty,
        OPEN_STATUS,
        STATUS_LIST,
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
        BUZ_TYPE,
        permissionConfig,
        PAY_COST_RULE_LIST,
        RECEIVE_COST_RULE_LIST,
        REPAIR_CHARGE_AFFECT_LIST,
        getRepairTypesDes,
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
