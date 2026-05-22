<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleReset="handleReset"
        :config="searchConfig"
        @handleSearch="handleSearch()"
      >
        <template #designerIdList>
          <DesignerSelect
            v-model='params.designerIdList'
            type='designer'
            multiple
          />
        </template>
        <template #designerGroupCodeList>
          <DesignerSelect
            v-model="params.designerGroupCodeList"
            type="designer-group"
            multiple
            :prop="{
              value: 'designerGroupCode'
            }"
            :is-first-load-cache="true"
          />
        </template>
        <template #chosenIdList>
          <UserSelect
            v-model="params.chosenIdList"
            clearable
            multiple
          />
        </template>
        <template #submitUserIdList>
          <UserSelect
            v-model="params.submitUserIdList"
            clearable
            multiple
          />
        </template>
        <template #category>
          <el-cascader
            v-model="params.categoryArr"
            :options="pimsCategory as any"
            collapse-tags
            show-all-levels
            :props="pimsCategoryProps"
            class="tw-w-100%"
          />
        </template>
        <template #suggestedStyleCodeList>
          <el-cascader
            v-model="params.suggestedStyleCodeArr"
            :options="plmClothingStyle as any"
            collapse-tags
            show-all-levels
            :props="suggestedStyleProps"
            class="tw-w-100%"
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex tw-flex-justify-between">
        <sc-condition-select
          v-model="params.designDemandStatus"
          :incompat="''"
          :condition-info="conditionInfo"
          @conditionChange="handleSearch()"
        />
        <div class="tw-flex-center-y">
          <el-button
            type="primary"
            v-if="RWFP"
            :disabled="selectionList.length === 0 || !canDispatch"
            @click="handleDispatch(ALLOCATE_TYPE_ENUM.DISPATCH, selectionList)"
          >
            任务分配
          </el-button>
          <el-button
            type="primary"
            v-if="FPBG"
            :disabled="selectionList.length === 0 || !canReDispatch"
            @click="handleDispatch(ALLOCATE_TYPE_ENUM.DISPATCH_ALTER, selectionList)"
          >
            分配变更
          </el-button>
          <el-button
            type="danger"
            v-if="TT"
            :disabled="selectionList.length === 0 || !canFail"
            @click="handleFail"
          >
            淘汰
          </el-button>
        </div>
      </div>
    </template>
    <template #main>
      <sc-table
        height="100%"
        :data="tableData"
        :columns="tableColumns"
        :border="true"
        @selection-change="handleSelectionChange"
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
    <operation-drawer
      v-model="drawer.visible"
      :request="postDesignLogBizListApi"
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
<script lang='ts' setup>
import { computed, onActivated, ref } from 'vue';
import { useSearch } from './hooks/use-search';
import { useTableColumns } from './hooks/use-table-columns';
import { getTaskList } from '../../api';
import { useList } from '@/hooks/use-list';
import { useDispatch } from './hooks/use-dispatch';
import { IListItem, IParams } from './types';
import DesignerSelect from '@/components/designer-select';
import { ALLOCATE_TYPE_ENUM, DESIGN_DEMAND_STATUS_ENUM, DESIGN_DEMAND_STATUS_LIST } from '../../constant';
import { postDesignLogBizListApi } from '@/modules/design-center/api/operate-log';
import { remarksSave } from '@/api/basis';
import { REMARK_BIZ_TYPE_ENUM } from '@/constant';
import { useTableDataMapBizRemark } from '@/modules/design-center/develop-bom/views/list/hooks/use-map-remark';
import { usePermissionConfig } from '../../use-permission-config';
import UserSelect from '@/components/user-select';

const conditionInfo = {
  title: '状态：',
  conditionList: [
    {
      value: '',
      label: '全部'
    },
    ...DESIGN_DEMAND_STATUS_LIST,
  ],
};
const { RWFP, FPBG, TT } = usePermissionConfig();
const { handleDispatch } = useDispatch({
  reloadFn() {
    handleSearch();
  },
});
const pimsCategoryProps = {
  label: 'label',
  value: 'value',
};
const suggestedStyleProps = {
  label: 'label',
  value: 'value',
  multiple: true,
};
const { searchConfig, pimsCategory, plmClothingStyle } = useSearch();
const selectionList = ref<IListItem[]>([]);
const handleSelectionChange = (selection: IListItem[]) => {
  selectionList.value = selection;
};
const canDispatch = computed(() => selectionList.value
  .every(v => v.designDemandStatus === DESIGN_DEMAND_STATUS_ENUM.WAIT_DISPATCH));
const canReDispatch = computed(() => selectionList.value
  .every(v => v.designDemandStatus === DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE));
const canFail = computed(() => selectionList.value
  .every(v => [
    DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE,
    DESIGN_DEMAND_STATUS_ENUM.WAIT_DISPATCH,
  ].includes(v.designDemandStatus)));
const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<IListItem, IParams>({
  request: {
    api: getTaskList,
    params: {
      suggestedStyleCodeList: [],
      countrySiteCodeList: [],
      storeIdList: [],
      waveBandCodeList: [],
      categoryArr: [],
      pageNum: 1,
      pageSize: 10,
    },
    handleParams(data) {
      const { categoryArr = [], suggestedStyleCodeArr = [], ...rest } = data;
      selectionList.value = [];
      return {
        ...rest,
        category: categoryArr.length ? categoryArr.at(-1)! : '',
        suggestedStyleCodeList: suggestedStyleCodeArr!.map(v => v.at(-1)!),
      };
    },
  },
});
// 操作日志
const drawer = ref({
  visible: false,
  params: {
    bizId: ''
  },
});
const {
  tableColumns,
  handleDiscarded
} = useTableColumns({
  reloadFn() {
    handleSearch();
  },
  async handleCreateRecord(
    row: any,
    remark: string,
  ) {
    const { designDemandId } = row;
    await remarksSave({
      bizId: designDemandId,
      bizType: REMARK_BIZ_TYPE_ENUM.DESIGN_DEMAND,
      remark,
    });
    await handleSearch();
  },
  handleOperateLog(bizId) {
    drawer.value.params.bizId = bizId;
    drawer.value.visible = true;
  },
});
// 同步 remark
useTableDataMapBizRemark<IListItem>(
  tableData,
  'designDemandId',
  'remark' as keyof IListItem,
);
const handleFail = () => {
  handleDiscarded(selectionList.value.map(v => v.designDemandId));
};
const init = () => {
  handleSearch(params.value.pageNum);
};
onActivated(() => {
  init();
});
</script>
