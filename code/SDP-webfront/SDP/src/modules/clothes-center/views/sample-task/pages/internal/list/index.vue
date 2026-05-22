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
        @change="handleTabChange"
      />
      <sc-search-area
        v-model="params"
        label-width="120"
        @handleSearch="init(1)"
        @handleReset="resetSearch"
        :config="searchConfig"
      >
        <!-- 设计师 -->
        <template #designerIdList>
          <DesignerSelect
            v-model="params.designerIdList"
            multiple
            :is-first-load-cache="true"
          />
        </template>
        <!-- 设计组别 -->
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
        <!-- 审版工艺师 -->
        <template #reviewCraftsmanId>
          <UserSelect
            v-model="params.reviewCraftsmanId"
            clearable
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
        <!-- 3D版师 -->
        <template #dimensionDesignerIdList>
          <UserSelect
            v-model="params.dimensionDesignerIdList"
            clearable
            multiple
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
          v-if="activeTab === TABS_ENUM.WAIT && YCFQ"
          @click="openExceptionLaunch"
          :disabled="isDisabledErrBtn"
        >异常发起</el-button>
        <el-button
          type="primary"
          :disabled="!selectedList.length"
          v-if="activeTab === TABS_ENUM.WAIT && RWZJ"
          @click="handleTaskTransfer"
        >任务转交</el-button>
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
    <!-- 编辑 -->
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
      @success="init()"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType, reactive, ref, watch } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from '../hooks/use-search';
import { useListColumns } from '../hooks/use-table-columns';
import { SAMPLE_TYPE_LIST, REMARK_BIZ_TYPE_ENUMS, CLOTHES_CENTER_SEARCH_KEY } from '@/modules/clothes-center/constant';
import {
  YES_OR_NO_NUMBER_LIST, YES_NO_ENUM,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import {
  useTaskTransferFormDialog
} from '../hooks/use-task-form-dialog';
import { dimensionPage } from '../../../api';
import { IDimensionPageResListItem } from '../../../api/types';
import UserSelect from '@/components/user-select';
import DesignerSelect from '@/components/designer-select';
import { useRoute, useRouter } from 'vue-router';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import EditDialog from '../../../components/edit-dialog/index.vue';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { useTabs } from './hooks/use-tab';
import { TABS_ENUM } from './constant';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import { useStepState } from '@/modules/clothes-center/hooks/use-step-state';
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
const { YCFQ, RWZJ } = usePermissionConfig();
const route = useRoute();
const router = useRouter();
const stepNodeStateCountData = computed(() => props.stepNodeStateCountData);
const { tabs } = useTabs({ stepNodeStateCountData });
const emits = defineEmits(['updateCount']);

const { searchConfig } = useSearch();
const isEditShow = ref(false);
const currentRow = ref<IDimensionPageResListItem>();

const activeTab = ref(TABS_ENUM.WAIT);
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
    ...timeParams,
    clothesStepNodeState: activeTab.value as unknown as string,
    ...tabs.value.find(v => v.value === activeTab.value)!.params!,
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
      isAllocated: '',
      isOutsourced: '',
      dimensionState: '',
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
      sampleType: '',
      sampleTypeList: [],
      dimensionDesignerIdList: [],
      patternMakerIdList: [],
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

const { findStepNodeByName } = useStepState();
const getPageNode = async () => {
  if (props.componentName) {
    const menu = findStepNodeByName(props.componentName, props.menusList!);
    params.value.clothesStep = menu.processStep;
    params.value.clothesNode = menu.processNode;
  }
};

const processDiaRef = ref();

const selectedList = ref<IDimensionPageResListItem[]>([]);

const handleSelectionChange = (rows: IDimensionPageResListItem[]) => {
  selectedList.value = rows;
};

const handleTabChange = () => {
  selectedList.value = [];
  init(1);
};

const { handleDialog } = useTaskTransferFormDialog({
  reloadFn: () => {
    init(1);
  },
  nextFn: () => {
    isEditShow.value = true;
  }
});
// 操作日志
const drawer = reactive<{ visible: boolean; data: ISampleClothesLogListRes; }>({
  visible: false,
  data: [] as ISampleClothesLogListRes,
});
const isView = ref(false);
const { tableColumns } = useListColumns({
  handleEdit: (row, behavior) => {
    // 编辑时异常提示
    if (row.isAbnormal === YES_NO_ENUM.YES && behavior === 'modify') {
      ElMessage.error('存在未处理异常的任务');
      return;
    }
    currentRow.value = row;
    isView.value = behavior === 'view';
    // 点击后校验当前数据是否有分配3D版师，若有则弹窗进入编辑页，若无点击时弹窗维护处理人
    if (!row.dimensionDesignerName && behavior === 'modify') {
      handleDialog('2', [{ ...row }]);
    } else {
      isEditShow.value = true;
    }
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
  emits('updateCount', {
    ...handleParams(params.value),
    clothesStepNodeState: '',
    clothesStep: '',
    clothesNode: '',
    isAllocated: '',
    dimensionState: '',
    isOutsourced: '',
  });
};
const resetSearch = () => {
  handleReset();
  getState();
};

// 任务转交
const handleTaskTransfer = () => {
  handleDialog('1', selectedList.value);
};
let skc = route.query.skc || '';
let processNodeState = route.query.processNodeState || '';
const init = async (pageNum?: number) => {
  if (skc) {
    params.value.designCode = skc as string;
  }
  if (processNodeState) {
    activeTab.value = processNodeState === '1' ? TABS_ENUM.SUBMIT : TABS_ENUM.WAIT;
  }
  if (processNodeState || skc) {
    router.replace({
      name: 'ClothesCenterSampleTaskList',
      query: {
        componentName: route.query.componentName,
      }
    });
    processNodeState = '';
    skc = '';
  }
  getPageNode();
  getState();
  handleSearch(pageNum);
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
