<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='120px'
        @handleSearch="handleSearch"
        @handle-reset="handleReset"
      >
        <template #threeCategory>
          <el-cascader
            v-model="params.threeCategory"
            clearable
            style="width: 100%"
            :show-all-levels="false"
            :options="(categoryTreeList as any)"
            :props="{
              label: 'label',
              value: 'label',
            }"
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <operation>
        <router-link
          :to="{
            name: 'BaseConfigSizeTemplateDetail'
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
          style="margin-left: 10px"
          @click="handleOpen"
        >
          启用
        </el-button>
        <el-button
          v-if="permissionRef.TY"
          :disabled="!selectedIds.length"
          type="danger"
          @click="handleClose"
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

        <template #templateName="{ row }">
          <router-link
            v-if="permissionRef.BJ"
            :to="{
              name: 'BaseConfigSizeTemplateDetail',
              query: {
                templateCode: row.templateCode,
              },
            }"
          >
            {{ row.templateName }}
          </router-link>
          <span v-else>{{ row.templateName }}</span>
        </template>

        <template #oprate="{ row }">
          <span>{{ row.operatorName }} {{ $filters.formatTime(row.operationTime) }}</span>
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
          :size="(params.pageSize as number)"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </template>

    <log-drawer
      :id="logData.id"
      v-model="logData.visible"
      :buz-type="BUZ_TYPE.SIZE_TEMPLATE"
      log-type="BASEINFO"
      content-key="content"
    />
  </sc-app-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useList } from '@/hooks/use-list';
import usePermissionConfig from './hooks/use-permission-config';
import usePermission from '@/hooks-transfer/use-permission';
import type {
  ISizeTemplatePageReq,
  ISizeTemplatePageListItem,
  ISizeTemplatePageLogListItem,
} from './api/type';
import { getSizeTempalteList, changeSizeTempalteStatus } from './api';
import { selectionChange, useHandleOpen, useHandleClose } from '../../utils/index';
import LogDrawer from '@/modules/common/components/log-drawer';
import { defineColumns } from '@/components/custom-table';
import useCategory from './hooks/use-category';
import { BUZ_TYPE, ENABLE_STATE_LIST } from '../../constant';
import useSearchConfig from './hooks/use-search-config';

interface IlogData {
  visible: boolean;
  data: Array<ISizeTemplatePageLogListItem | undefined> ;
  id: string | undefined;
}

interface Params extends ISizeTemplatePageReq {
  createdTime?: string;
}

export default defineComponent({
  components: {
    LogDrawer,
  },
  setup() {
    const { searchConfig } = useSearchConfig();
    // 权限配置
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
    } = useList<ISizeTemplatePageListItem, Params>({
      request: {
        api: getSizeTempalteList,
        params: {
          pageNum: 1,
          pageSize: 20,
          createdTimeBegin: '',
          createdTimeEnd: '',
          isEnabled: '',
          templateName: '',
          threeCategory: '',
        },
        handleParams: (paramsObj) => {
          // 对创建时间数据进行处理
          // [paramsObj.createdTimeBegin, paramsObj.createdTimeEnd] = paramsObj.createdTime || ['', ''];
          // delete paramsObj.createdTime;

          paramsObj.threeCategory = paramsObj.threeCategory?.[2] || '';
          return paramsObj;
        },
      },
    });
    // 实现多选操作，获得选中的id列表
    const selectedIds = ref<string[]>([]);
    const handleSelectionChange = (lists: ISizeTemplatePageListItem[]) => {
      selectedIds.value = selectionChange(lists);
    };

    // 启用触发方法
    const handleOpen = () => {
      useHandleOpen({
        selectedIds: selectedIds.value,
        api: changeSizeTempalteStatus,
        callback: () => handleSearch(params.value.pageNum as number), // 启用完成后重新查询到当前页面数据
      });
    };
    // 停用触发方法
    const handleClose = () => {
      useHandleClose({
        selectedIds: selectedIds.value,
        api: changeSizeTempalteStatus,
        callback: () => handleSearch(params.value.pageNum as number), // 启用完成后重新查询到当前页面数据
      });
    };
    // 操作日志数据
    const logData = reactive<IlogData>({
      id: '',
      data: [],
      visible: false,
    });
    const openLogModal = (row: ISizeTemplatePageListItem) => {
      logData.id = row.id;
      logData.visible = true;
    };

    const { categoryTreeList } = useCategory(true);

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
        label: '模板名称',
        prop: 'templateName',
        slotKey: 'templateName',
        minWidth: '100',
        align: 'center',
      },
      {
        label: '状态',
        prop: 'isEnabled',
        enum: ENABLE_STATE_LIST,
        minWidth: '60',
        align: 'center',
      },
      {
        label: '商品三级品类',
        prop: 'threeCategory',
        minWidth: '100',
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

    onMounted(() => {
      handleSearch();
    });

    return {
      searchConfig,
      column,
      permissionRef,
      params,
      tableData,
      tableTotal,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      categoryTreeList,
      handleOpen,
      handleClose,
      logData,
      openLogModal,
      BUZ_TYPE,
      ENABLE_STATE_LIST,
      selectedIds,
    };
  },
});
</script>

<style scoped lang="scss">
.oprate {
  margin-left: 20px;
  color: var(--el-color-primary);
  cursor: pointer;
}

</style>
