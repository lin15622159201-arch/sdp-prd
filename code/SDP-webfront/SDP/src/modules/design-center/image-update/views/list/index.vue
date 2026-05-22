<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group
        v-if="radioGroupList.length"
        v-model="searchRange"
        @change="handleSearchWithStatusCount(1)"
        class="tw-pb-10px"
      >
        <el-radio-button
          v-for="(item, index) in radioGroupList"
          :key="index"
          :value="item.value"
        >{{ item.lable }}</el-radio-button>
      </el-radio-group>
      <sc-search-area
        v-model="params"
        :config="searchConfig"
        @handleSearch="handleSearchWithStatusCount"
        @handle-reset="handleReset"
      >
        <template #taskCode>
          <el-input
            v-model="params.taskCode"
            placeholder="支持批量搜索，多个用空格或“,”隔开"
            clearable
          />
        </template>
        <template #spuCode>
          <el-input
            v-model="params.spuCode"
            placeholder="支持批量搜索，多个用空格或“,”隔开"
            clearable
          />
        </template>
        <template #creatorId>
          <UserQuerySelect v-model="params.creatorId" />
        </template>
        <template #desingerName>
          <DesignerSelect
            v-model="params.designerIds"
            show-read-me-btn
            multiple
          />
        </template>
        <template #designerGroupCodes>
          <DesignerSelect
            v-model="params.designerGroupCodes"
            multiple
            type="designer-ground"
          />
        </template>
      </sc-search-area>
    </template>

    <template #header>
      <div class="tw-flex tw-justify-between tw-items-center">
        <sc-condition-select
          v-model="params.taskStatus"
          :condition-info="conditionState"
          @conditionChange="handleSearch(1)"
        />
        <div class="tw-text-right">
          <el-tooltip
            v-for="item in buttonList"
            :key="item.label"
            :content="item.disabledTooltip || '请先选中任务'"
            :disabled="!item.disabled"
            placement="top"
          >
            <el-button
              v-bind="item.elProps"
              :disabled="item.disabled"
              @click="item.onClick()"
            >
              {{ item.label }}
            </el-button>
          </el-tooltip>
        </div>
      </div>
    </template>

    <template #main>
      <div class="tw-h-100%">
        <sc-table
          height="100%"
          :columns="columns"
          :data="tableData"
          row-key="taskCode"
          @selection-change="handleSelectionChange"
        />
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
          :size="params.pageSize!"
          :pageSizes="[10, 20, 30, 50, 100, 200]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
  </sc-app-page>
</template>

<script setup lang="ts">
import DesignerSelect from '@/components/designer-select';
import { useHandler } from './hooks/use-handler';
import { useSearch } from './hooks/use-search';
import { useTable } from './hooks/use-table';
import UserQuerySelect from '@/components/user-query-select/index.vue';
import { computed, onActivated, watch } from 'vue';
import { usePermissionConfig } from '../../use-permission-config';

const { FZQB, FZZN, FZWD } = usePermissionConfig();
const radioGroupList = computed(() => [
  { lable: '全部', value: '', show: FZQB.value },
  { lable: '组内', value: 'group', show: FZZN.value },
  { lable: '我的', value: 'me', show: FZWD.value },
].filter(item => item.show));

const {
  searchConfig,
  conditionState,
  params,
  searchRange,
  tableData,
  tableTotal,
  handleSearch,
  handleSearchWithStatusCount,
  handleReset,
  handleCurrentChange,
  handleSizeChange,
} = useSearch();

watch(
  () => radioGroupList.value,
  (newVal) => {
    if (newVal.length > 0) {
      // 默认选择第一个
      searchRange.value = newVal[0].value;
      handleSearchWithStatusCount();
    }
  },
  { immediate: true }
);

onActivated(() => {
  // keep-alive 激活时重新获取数据
  handleSearchWithStatusCount();
});

const { columns } = useTable({ handleSearch: handleSearchWithStatusCount });

const { buttonList, handleSelectionChange } = useHandler({ handleSearch: handleSearchWithStatusCount });
</script>
