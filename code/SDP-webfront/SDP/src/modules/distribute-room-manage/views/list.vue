<template>
  <sc-app-page class="cooperation-room-list">
    <template #fheader>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='120px'
        @handleSearch="handleSearch"
        @handle-reset="handleReset"
      >
        <template #addressDetail>
          <address-picker
            class="tw-w-full"
            v-model:province="params.roomAddressProvince"
            v-model:city="params.roomAddressCity"
            v-model:area="params.roomAddressArea"
          />
        </template>
        <!-- <template #serviceType>
          <el-select
            v-model="params.serviceType"
            clearable
            placeholder="请选择服务类型"
          >
            <el-option
              v-for="(item, key) in SERVICETYPEMAP"
              :key="key"
              :label="item"
              :value="item"
            />
          </el-select>
        </template> -->
        <!-- <template #goodAtCategorys>
          <el-cascader
            v-model="params.goodAtCategorys"
            clearable
            :options="(categoryTreeList as any)"
            :props="{
              label: 'label',
              value: 'label',
              checkStrictly: true
            }"
            style="width: 100%;"
          />
        </template> -->
      </sc-search-area>
    </template>

    <template #header>
      <operation>
        <el-button
          v-if="$has(permissionConfig.CZMM)"
          type="warning"
          class="tw-mr-5px"
          :disabled="!selectedList.length"
          @click="handleResetPasswordBatch"
        >
          重置密码
        </el-button>
        <router-link
          :to="getAddRouterLinkParams()"
        >
          <el-button
            v-if="$has(permissionConfig.XZBF)"
            type="primary"
          >
            新增版房
          </el-button>
        </router-link>
      </operation>
    </template>

    <template #main>
      <div class="table-list">
        <el-table
          v-loading="tableLoading"
          class="tw-h-full"
          :data="tableData"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          />
          <el-table-column
            prop="roomCode"
            label="版房编码"
            width="150"
            align="left"
          >
            <template #default="{ row }">
              <router-link
                v-if="$has(permissionConfig.BFXQ)"
                :to="getRouterLinkParams(row, 'detail')"
                target="_blank"
              >
                {{ row.roomCode }}
              </router-link>
              <span v-else>
                {{ row.roomCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="purchaserName"
            label="版房信息"
            min-width="150"
            align="left"
          >
            <template #default="{ row }">
              <div class="align-left">
                <div>
                  {{ row.roomName }}
                </div>
                <div class="gray">
                  {{ row.roomAddressProvince }}{{ row.roomAddressCity }}{{ row.roomAddressArea }}
                  {{ row.roomDetailAddress }}
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="address"
            label="服务信息"
            min-width="225"
            align="left"
          >
            <template #default="{ row }">
              <div class="align-left">
                <p>
                  类型：{{ (row.serviceType || []).join('，') }}
                </p>
                <el-tooltip
                  :content="`品类：${(row.goodAtCategory || []).join(',')}`"
                  placement="bottom-start"
                >
                  <span class="gray text-omit tw-flex-1">
                    品类：{{ (row.goodAtCategory || []).join(',') }}
                  </span>
                </el-tooltip>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="createdTime"
            label="创建时间"
            width="180"
            align="left"
          >
            <template #default="{ row }">
              {{ $filters.formatTime(row.createdTime) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="enable"
            label="启用状态"
            width="120"
            align="left"
          >
            <template #default="{ row }">
              <span class="tw-mr-10px">
                {{ $filters.getEnumLabel(ROOM_ENABLE_LIST, row.enable) }}
              </span>
              <el-switch
                v-if="$has(permissionConfig.QYZT)"
                v-model="row.enable"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="YES"
                inactive-value="NO"
                @change="handleEnable(row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            align="center"
            fixed="right"
          >
            <template #default="{ row }">
              <router-link
                v-if="$has(permissionConfig.BFBJ)"
                class="margin-right-10 margin-top-10"
                :to="getRouterLinkParams(row, 'edit')"
              >
                <el-button type="primary">
                  编辑
                </el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useList } from '@/hooks/use-list';
// import Tooltip from '@/components/tooltip/main.vue';
import { useOpsCascader } from '@/hooks-transfer/use-cascader';
// import { useDictionary } from '@/hooks/use-dict';
import type {
  EXTERNAL_ROOM_DETAIL_LISTS } from '../constant';
import {
  SERVICETYPEMAP,
  USER_MANAGEMENT_ROOM_REGION_LIST,
  USER_MANAGEMENT_ROOM_ENABLE_LIST,
  ROOM_ENABLE_LIST,
} from '../constant';
import type { SearchParamsType, CooperationItem } from '../api/types';

import {
  getOutCloudRoomList,
  updateEnable,
  // resetRoomPasswordBatch,
  batchResetRoomPwd,
} from '../api';
import { getExternalRoomEnum, getRouterLinkName } from '../utils/index';
import { ElMessage, ElMessageBox } from 'element-plus';
import usePermissionConfig from './hooks/use-permission-config';
import { cloneDeep } from 'lodash-es';
import useSearchConfig from './hooks/use-search-config';

export default defineComponent({
  components: {
    // Tooltip,
  },
  setup() {
    const { searchConfig } = useSearchConfig();
    const {
      params,
      tableData,
      tableTotal,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
    } = useList<CooperationItem, SearchParamsType>({
      request: {
        api: getOutCloudRoomList,
        params: {
          serviceType: '',
          roomAddressProvince: '',
          roomAddressCity: '',
          roomAddressArea: '',
          goodAtCategorys: [],
          roomName: '',
          // 版房类型
          externalRoomEnum: '',
          regionId: '', // 业务归属
          enable: '', // 启用状态
          pageNum: 1,
          pageSize: 20,
          createdTimeStart: '',
          createdTimeEnd: '',
        },
        handleParams: (paramsObj) => {
          const _paramsObj = cloneDeep(paramsObj);
          const goodAtCategory = (_paramsObj.goodAtCategorys || []).join('-') || null;
          _paramsObj.goodAtCategory = goodAtCategory!;
          delete _paramsObj.goodAtCategorys;
          if (_paramsObj.createdTimeStart) {
            _paramsObj.createdTimeStart = _paramsObj.createdTimeStart.toString();
          }
          if (_paramsObj.createdTimeEnd) {
            _paramsObj.createdTimeEnd = _paramsObj.createdTimeEnd.toString();
          }
          console.log('_paramsObj==', _paramsObj);

          // 携带版房类型查询
          _paramsObj.externalRoomEnum = getExternalRoomEnum(); // 不携带默认是合作版房类型
          return _paramsObj;
        },
      },
    });
    const permissionConfig = usePermissionConfig();

    // 款式品类
    const categoryTreeList = useOpsCascader('clothing_category');

    // 搜索
    const init = () => {
      handleSearch();
    };

    init();

    // 变更启用状态
    const handleEnable = async (row: CooperationItem) => {
      try {
        await updateEnable(row.roomId);
        ElMessage.success('操作成功');
      } finally {
        handleSearch();
      }
    };

    // 重置密码 - 批量操作
    const selectedList = ref<string[]>([]);

    const handleSelectionChange = (list: CooperationItem[]) => {
      selectedList.value = list.map(item => item.roomId);
    };
    const handleResetPasswordBatch = async () => {
      if (!selectedList.value.length) {
        ElMessage.warning('请至少选择一项');
        return;
      }
      await ElMessageBox.confirm(
        `<h3>
            确定对以下
            <b class="text-color-red"> ${selectedList.value.length} </b>
            个用户重置密码？
          </h3>
          <p class="text-color-grey padding-10">（重置密码会以短信的形式发送给用户）</p>
          `,
        '重置密码',
        { dangerouslyUseHTMLString: true, center: true },
      );
      // 批量操作
      await batchResetRoomPwd({ roomIds: selectedList.value });
      ElMessage.success('重置成功');
      handleSearch();
    };

    const getAddRouterLinkParams = () => {
      const type = 'add';
      const name = getRouterLinkName(type);
      return {
        name,
        query: { operate: type },
      };
    };

    // 跳转到详情
    const getRouterLinkParams = (row: CooperationItem, type: keyof typeof EXTERNAL_ROOM_DETAIL_LISTS) => {
      const name = getRouterLinkName(type);
      return {
        name,
        query: { operate: type, id: row.roomId },
      };
    };

    return {
      searchConfig,
      USER_MANAGEMENT_ROOM_REGION_LIST,
      USER_MANAGEMENT_ROOM_ENABLE_LIST,
      selectedList,
      handleResetPasswordBatch,
      handleSelectionChange,
      handleEnable,

      params,
      tableData,
      tableTotal,
      tableLoading,

      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,

      SERVICETYPEMAP,
      categoryTreeList,
      getRouterLinkParams,
      getAddRouterLinkParams,
      permissionConfig,
      ROOM_ENABLE_LIST,
    };
  },
});
</script>

<style lang="scss" scoped>
.cooperation-room-list {
  .gray {
    color: #9e9e9e;
  }
  .text-omit {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    width: 100%;
  }
}
</style>
