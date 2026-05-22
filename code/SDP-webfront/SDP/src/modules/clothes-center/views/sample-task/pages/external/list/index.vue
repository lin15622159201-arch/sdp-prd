<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.personal" @change='init(1)'>
        <el-radio-button :value="false">全部</el-radio-button>
        <el-radio-button :value="true">我的</el-radio-button>
      </el-radio-group>
      <Tabs
        v-model="activeTab"
        :config="tabs"
        :border="false"
        class="tw-pb-15px"
        :font-size="15"
        @change="init(1)"
      />
      <sc-search-area
        v-model="params"
        label-width="120"
        @handleSearch="init(1)"
        @handleReset="resetSearch"
        :config="searchConfig"
      >
        <!-- 审版工艺师 -->
        <template #reviewCraftsmanId>
          <UserSelect
            v-model="params.reviewCraftsmanId"
            clearable
          />
        </template>
        <template #designerGroupCodeList>
          <DesignerSelect
            v-model="params.designerGroupCodeList"
            type="designer-group"
            :prop="{
              value: 'designerGroupCode'
            }"
            multiple
            :is-first-load-cache="true"
          />
        </template>
        <template #designerIdList>
          <DesignerSelect
            v-model="params.designerIdList"
            multiple
            :is-first-load-cache="true"
          />
        </template>
        <!-- 纸样师 -->
        <template #patternMakerIdList>
          <UserSelect
            v-model="params.patternMakerIdList"
            clearable
            multiple
          />
        </template>
        <!-- 供应商 -->
        <template #roomIdList>
          <ClothingRoomSelect
            v-model="params.roomIdList"
            clearable
            multiple
            :inner="true"
          />
        </template>
        <!-- 耗时 -->
        <template #timeConsuming>
          <div class="tw-w-full tw-flex">
            <InputNumberRanger
              v-model:range-start="params.timeConsumingStart"
              v-model:range-end="params.timeConsumingEnd"
              :precision="0"
            />
            <div class="tw-w-60px tw-text-right tw-ml-4px">
              <el-select
                v-model="params.timeConsumingType"
                class="tw-w-60px times"
              >
                <el-option
                  v-for="(it, i) in TIME_CONSUMING_TYPE_LIST"
                  :key="i"
                  :label="it.label"
                  :value="it.value"
                />
              </el-select>
            </div>
          </div>
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex tw-mb[10px]">
        <el-button
          type="danger"
          v-if="(activeTab === TABS_ENUM.WAIT_TAKE
            || activeTab === TABS_ENUM.WAIT_SUBMIT) && YCFQ
          "
          @click="openExceptionLaunch"
          :disabled="isDisabledErrBtn"
        >异常发起</el-button>
      </div>
      <div class="tw-flex">
        <el-form-item label="异常：">
          <radio-checkbox
            v-model="params.isAbnormal"
            :options="YES_OR_NO_NUMBER_LIST"
            @change="init(1)"
          />
        </el-form-item>
        <el-form-item label="二次工艺：">
          <radio-checkbox
            v-model="params.isCraft"
            :options="YES_OR_NO_NUMBER_LIST"
            @change="init(1)"
          />
        </el-form-item>
        <el-form-item label="打版类型：">
          <radio-checkbox
            v-model="params.sampleType"
            :options="SAMPLE_TYPE_LIST"
            @change="init(1)"
          />
        </el-form-item>
      </div>
    </template>
    <template #main>
      <sc-table
        height="100%"
        :data="tableData"
        :columns="tableColumns"
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
    <edit-dialog
      v-model:visible="isEditShow"
      :rowData="currentRow"
      :isView="isView"
      @success="init()"
    />
    <!-- 弹窗：加工订单详情 -->
    <ProcessDialog ref="processDiaRef" />
    <!--操作日志-->
    <operation-log-drawer v-model="drawer.visible" :data="drawer.data" />
    <!--弹窗:异常发起 -->
    <error-dialog
      ref="errorDialogRef"
      :launch-buz-type="CLOTHES_STEP_ENUM.DIMENSION"
      :launch-buz-id="selectedList[0]?.dimensionId"
      :clothes-step="CLOTHES_STEP_ENUM.DIMENSION"
      :can-sync-ext="YES_NO_ENUM.YES"
      @success="init()"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, computed, watch, PropType, reactive, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from '../hooks/use-search';
import { useListColumns } from '../hooks/use-table-columns';
import {
  SAMPLE_TYPE_LIST,
  REMARK_BIZ_TYPE_ENUMS,
  PROCESS_STEP_CODE_ENUM,
  CLOTHES_CENTER_SEARCH_KEY
} from '@/modules/clothes-center/constant';
import {
  YES_OR_NO_NUMBER_LIST, YES_NO_ENUM,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import { dimensionPage } from '../../../api';
import EditDialog from '../../../components/edit-dialog/index.vue';
import { IDimensionPageResListItem } from '../../../api/types';
import UserSelect from '@/components/user-select';
import DesignerSelect from '@/components/designer-select';
import ClothingRoomSelect from '@/components/clothing-room-select';
import { useRoute, useRouter } from 'vue-router';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import { useTabs } from './hooks/use-tab';
import { TABS_ENUM } from './constant';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import { usePermissionConfig } from '../../../use-permission-config';
import { ElMessage } from 'element-plus';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { handleTimeConsuming } from '@/core/utils/format';

const props = defineProps({
  stepNodeStateCountData: {
    type: Array as PropType<IStepNodeStateCountRes>,
    required: true
  },
  componentName: {
    type: String,
  },
  menusList: {
    type: Array,
  }
});
const emits = defineEmits(['updateCount']);
const { YCFQ } = usePermissionConfig();

const route = useRoute();
const router = useRouter();
const activeTab = ref(TABS_ENUM.WAIT_TAKE);
const { tabs, getStateStatByNode } = useTabs();
const { searchConfig } = useSearch();

const isEditShow = ref(false);
const currentRow = ref<IDimensionPageResListItem>();
const handleParams = (custom: any) => {
  const { ...rest } = custom;
  const timeParams = {
    ...handleTimeConsuming(rest.timeConsumingType!, rest.timeConsumingStart, rest.timeConsumingEnd),
  };
  delete rest.timeConsumingType;
  delete rest.timeConsumingStart;
  delete rest.timeConsumingEnd;
  return {
    ...rest,
    ...tabs.value.find(v => v.value === activeTab.value)!.params!,
    ...timeParams,
    clothesStepNodeState: tabs.value.find(v => v.value === activeTab.value)!.nodeStateCode,
    showCancel: activeTab.value === TABS_ENUM.SUBMIT
  };
};
const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList({
  request: {
    api: dimensionPage,
    params: {
      showCancel: false,
      isCraft: '',
      isAbnormal: '',
      designerGroupCodeList: [],
      designerIdList: [],
      patternMakerId: '',
      designCode: '',
      styleCode: '',
      makeClothesType: '',
      waveBandCodeList: [],
      allocateeIdList: [],
      sampleTypeList: [],
      dimensionDesignerIdList: [],
      roomIdList: [],
      seperateFinishTimeStart: '',
      seperateFinishTimeEnd: '',
      dimensionFinishTimeStart: '',
      dimensionFinishTimeEnd: '',
      timeConsumingStart: '',
      timeConsumingEnd: '',
      timeConsumingType: TIME_CONSUMING_TYPE_ENUM.HOUR,
      pageNum: 1,
      pageSize: 20,
      personal: false,
    },
    handleParams,
    handleCustomReset(p, defaultParams) {
      return {
        ...defaultParams,
        clothesStep: p.clothesStep,
        clothesNode: p.clothesNode,
        clothesStepNodeState: p.clothesStepNodeState,
        personal: p.personal,
      };
    },
  },
});

const processDiaRef = ref();
const isView = ref(false);
// 操作日志
const drawer = reactive<{ visible: boolean; data: ISampleClothesLogListRes; }>({
  visible: false,
  data: [] as ISampleClothesLogListRes,
});
const { tableColumns } = useListColumns({
  handleEdit: (row, behavior) => {
    // 编辑时异常提示
    if (row.isAbnormal === YES_NO_ENUM.YES && behavior === 'modify') {
      ElMessage.error('存在未处理异常的任务');
      return;
    }
    isView.value = behavior === 'view';
    currentRow.value = row;
    isEditShow.value = true;
  },
  viewProcessOrder: (row) => {
    processDiaRef.value.open(row);
  },
  reloadFn: () => {
    init();
  },
  handleOperateLog: async (clothesId: string) => {
    try {
      const { data = [] } = await getWebV1LogSampleClothesListApi({
        clothesId
      });
      drawer.data = data || [];
      drawer.visible = true;
    } catch (e) {
      console.error('handleOperateLog error', e);
    }
  }
});

/* remark */
useTableDataMapRemark<IDimensionPageResListItem>(
  tableData,
  'clothesId',
  REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
  'remark',
);

const getState = () => {
  getStateStatByNode({
    ...handleParams(params.value),
    clothesStepNodeState: '',
    clothesStep: '',
    clothesNode: '',
    // isAllocated: YES_NO_ENUM.YES,
    isOutsourced: YES_NO_ENUM.YES,
    dimensionState: '',
    dimensionReceiving: '',
    // showCancel: true,
  });
  emits('updateCount', {
    ...handleParams(params.value),
    clothesStepNodeState: '',
    clothesNode: '',
    clothesStep: '',
    isAllocated: '',
    dimensionState: '',
    dimensionReceiving: '',
    isOutsourced: '',
  });
};

const resetSearch = () => {
  handleReset();
  getState();
};

let skc = route.query.skc || '';
let processNodeState = route.query.processNodeState || '';
// 504 = 外部处理-待提交（0），已提交（1）， 503 = 外部处理-待接单（1）
let processNode = route.query.processNode || '';
const init = async (pageNum?: number) => {
  if (skc) {
    params.value.designCode = skc as string;
  }
  if (processNodeState) {
    if (processNode === '504') {
      activeTab.value = processNodeState === '1' ? TABS_ENUM.SUBMIT : TABS_ENUM.WAIT_SUBMIT;
    } else {
      activeTab.value = TABS_ENUM.WAIT_TAKE;
    }
  }
  if (processNodeState || skc || processNode) {
    router.replace({
      name: 'ClothesCenterSampleTaskList',
      query: {
        componentName: route.query.componentName,
      }
    });
    processNodeState = '';
    processNode = '';
    skc = '';
  }
  handleSearch(pageNum);
  getState();
};
const selectedList = ref<IDimensionPageResListItem[]>([]);

const handleSelectionChange = (rows: IDimensionPageResListItem[]) => {
  selectedList.value = rows;
};
// 按钮前置校验 单选&环节状态='待分单'
const isDisabledErrBtn = computed(() => {
  return selectedList.value?.length !== 1;
});
// 异常发起
const errorDialogRef = ref();
const openExceptionLaunch = () => {
  const { processStepDesc = '', processNodeDesc = '', processNodeStateDesc = '' } = selectedList.value[0];
  const desc = processStepDesc ? `${processStepDesc}-${processNodeDesc}-${processNodeStateDesc}` : '';
  errorDialogRef.value.open(selectedList.value[0], desc);
};

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

// 监听路由变化
watch(
  () => route.query.componentName,
  () => {
    onMounted(() => {
      init(params.value.pageNum);
    });
  },
  { immediate: true }
);

</script>
