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
      <el-button
        v-if="XZ"
        type="primary"
        @click="handleAdd"
      >
        新建
      </el-button>
    </template>
    <template #main>
      <sc-table
        class="tw-h-full"
        key="table"
        :data="tableData"
        :columns="tableColumns"
        v-loading="tableLoading"
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
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </template>
    <operation-drawer
      v-model="drawer.visible"
      title='操作日志'
      :request="getOperationLog"
      :config="{
        timeKey: 'createdTime',
        userKey: 'creatorName',
        contentKey: 'content',
        // 不显示remark
        remarkKey: 'string',
      }"
      :requestParams="drawer.params"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { useList } from '@toy/v-use';
import useSearchConfig from '../hooks/use-search-config';
import { useListColumns } from '../hooks/use-table-columns';
import usePermissionConfig from '../use-permission-config';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { auditCraftComponentQueryByPage } from '../api';
import { getOperationLog } from '@/modules/base-config/api';

const router = useRouter();
const { XZ } = usePermissionConfig();
const { searchConfig } = useSearchConfig();
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
} = useList({
  request: {
    // 调用获取取消原因的接口
    api: auditCraftComponentQueryByPage,
    // 数据参数
    params: {
      pageNum: 1,
      pageSize: 20,
      componentName: '',
      state: '',
    },
  },
});

handleSearch();

// 操作日志
const drawer = reactive({
  visible: false,
  params: {
    buzId: '',
    buzType: 'AUDIT_CRAFT_COMPONENT'
  },
});

const { tableColumns } = useListColumns({
  reload: handleSearch,
  handleLog(row) {
    drawer.params.buzId = row.componentId;
    drawer.visible = true;
  },
});

const handleAdd = () => {
  router.push(
    {
      name: 'NewBaseConfigAuditCraftComponentLibrary',
    }
  );
};

</script>

<style lang="scss" scoped>
//
</style>
