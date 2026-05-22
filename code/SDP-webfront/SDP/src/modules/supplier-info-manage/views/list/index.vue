<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        label-width="100"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      />
    </template>
    <template #main>
      <sc-table
        height="100%"
        :data="tableData"
        :columns="tableColumns"
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
          :page-size="params.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
    <!-- 详情 -->
    <detail-dialog v-model:visible="detailDialogShow" :id="roomId" />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useList } from '@toy/v-use';
import { getOutCloudRoomList } from '@/modules/distribute-room-manage/api';
import type { CooperationItem } from '@/modules/distribute-room-manage/api/types';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import detailDialog from './components/detail-dialog/index.vue';
import { YES_NO_ENUM } from '@/constant';

const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<CooperationItem>({
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
      externalRoomEnum: 'SUPPLIER_ROOM', // 面料供应商
      regionId: '', // 业务归属
      enable: '', // 启用状态
      pageNum: 1,
      pageSize: 20,
      createdTimeStart: '',
      createdTimeEnd: '',
      digitalDraftAble: YES_NO_ENUM.YES,
    },
  },
});

const { searchConfig } = useSearch();
const detailDialogShow = ref(false);
const roomId = ref('');
const { tableColumns } = useListColumns({
  handleToDetail: (row) => {
    detailDialogShow.value = true;
    roomId.value = row.roomId;
  },
});

handleSearch();
</script>
