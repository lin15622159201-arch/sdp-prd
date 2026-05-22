<template>
  <sc-app-page :laside="laside">
    <template #laside>
      <slot name="laside" />
    </template>
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
        label-width="80"
        @handleSearch="init(1)"
        @handleReset="resetSeach"
        :config="searchConfig"
      >
        <!-- 审版工艺师 -->
        <template #reviewCraftsmanId>
          <UserSelect
            v-model="params.reviewCraftsmanId"
            clearable
          />
        </template>
        <template #designerIdList>
          <DesignerSelect
            v-model="params.designerIdList"
            multiple
            :is-first-load-cache="true"
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
        <!-- 纸样师 -->
        <template #patternMakerIdList>
          <UserSelect
            v-model="params.patternMakerIdList"
            clearable
            multiple
          />
        </template>
        <!-- 裁剪师 -->
        <template #cutterIdList>
          <UserSelect
            v-model="params.cutterIdList"
            clearable
            multiple
          />
        </template>
        <!-- 车缝师 -->
        <template #sewerIdList>
          <UserSelect
            v-model="params.sewerIdList"
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
          v-if="activeTab !== TABS_ENUM.FINISHED && YCFQ"
          @click="openExceptionLaunch"
          :disabled="isDisabledErrBtn"
        >异常发起</el-button>
        <el-button
          type="primary"
          v-if="activeTab === TABS_ENUM.DOING && NBCF_CFWC"
          :disabled="!selectedList.length || selectedList.length > 1"
          @click="handleOpenFinish"
        >车缝完成</el-button>
        <el-button
          type="primary"
          :disabled="!selectedList.length"
          v-if="activeTab === TABS_ENUM.DOING && NBCF_PDBG"
          @click="handleOpenChange"
        >排单变更</el-button>
        <el-button
          type="primary"
          :disabled="!selectedList.length"
          v-if="activeTab === TABS_ENUM.WAIT && NBCF_KSCF"
          @click="handleOpenStart"
        >开始车缝</el-button>
      </div>
      <div class="tw-flex clear-form-margin">
        <el-form-item label="环节状态：" v-if="activeTab === TABS_ENUM.SEMI">
          <radio-checkbox
            v-model="params.clothesStepNodeState"
            :options="[
              {
                label: '进行中',
                value: '1'
              },
              {
                label: '已完成',
                value: '2'
              },
            ]"
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
    <!-- 弹窗：加工订单详情 -->
    <ProcessDialog ref="processDiaRef" />
    <!--操作日志-->
    <operation-log-drawer v-model="drawer.visible" :data="drawer.data" />
    <finish-dialog
      v-model:visible="isFinishDialogShow"
      :sewId="selectedList[0]?.sewId"
      @confirm="refresh"
    />
    <!--弹窗:异常发起 -->
    <error-dialog
      ref="errorDialogRef"
      :launch-buz-type="CLOTHES_STEP_ENUM.SEW"
      :launch-buz-id="selectedList[0]?.sewId"
      :clothes-step="CLOTHES_STEP_ENUM.SEW"
      @success="init()"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, computed, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import {
  REMARK_BIZ_TYPE_ENUMS,
  SAMPLE_TYPE_LIST,
  PROCESS_NODE_CODE_ENUM,
  CLOTHES_CENTER_SEARCH_KEY
} from '@/modules/clothes-center/constant';
import {
  YES_OR_NO_NUMBER_LIST, YES_NO_ENUM,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import { sewQueryByPage } from '@/modules/clothes-center/views/style-sew/api';
import DesignerSelect from '@/components/designer-select';
import UserSelect from '@/components/user-select';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import { useSewerDialog } from './hooks/use-sewer-dialog';
import { useRoute, useRouter } from 'vue-router';
import { ISewQueryByPageResListItem } from '@/modules/clothes-center/views/style-sew/api/types';
import { TABS_ENUM } from './constant';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { useTabs } from './hooks/use-tabs';
import FinishDialog from './finish-dialog/index.vue';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import { usePermissionConfig } from '@/modules/clothes-center/views/style-sew/use-permission-config';
import { ElMessage } from 'element-plus';
import { isEmpty } from '@toy/utils';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { ASIDE_TYPE_ENUM } from '@/modules/clothes-center/views/style-sew/constant/menus';
import { handleTimeConsuming } from '@/core/utils/format';

const route = useRoute();
const { YCFQ, NBCF_KSCF, NBCF_PDBG, NBCF_CFWC } = usePermissionConfig();

defineProps({
  laside: {
    type: Object,
    default: () => ({}),
  },
  componentName: {
    type: String,
  },
  menusList: {
    type: Array,
  }
});
const emits = defineEmits(['updateCount']);

const activeTab = ref(TABS_ENUM.WAIT);
const { searchConfig } = useSearch(activeTab);
const { tabs, getStateStatByNode } = useTabs();

const handleParamsData = (customParams: any) => {
  const { ...rest } = customParams;
  const row = { ...tabs.value.find(v => v.value === activeTab.value)!.params };
  // 清空所有时间参数
  const resetTimeParams = [
    'semiCraftCreatedTimeStart', 'semiCraftCreatedTimeEnd',
    'semiCraftFinishTimeStart', 'semiCraftFinishTimeEnd',
    'pendingTimeStart', 'pendingTimeEnd',
    'sewProgressTimeStart', 'sewProgressTimeEnd',
    'sewFinishTimeStart', 'sewFinishTimeEnd'
  ];
  // eslint-disable-next-line no-return-assign
  resetTimeParams.forEach(key => (rest[key] = ''));

  // 半成品工艺
  if (activeTab.value === TABS_ENUM.SEMI) {
    row.clothesStepNodeState = params.value.clothesStepNodeState;
    if (!isEmpty(row.clothesStepNodeState)) {
      row.showCancel = row.clothesStepNodeState === '2';
    }
    rest.semiCraftCreatedTimeStart = '';
    rest.semiCraftCreatedTimeEnd = '';
    rest.semiCraftFinishTimeStart = '';
    rest.semiCraftFinishTimeEnd = '';
  }
  // 待进行
  if (activeTab.value === TABS_ENUM.WAIT) {
    rest.pendingTimeStart = rest.createdTimeStart || '';
    rest.pendingTimeEnd = rest.createdTimeEnd || '';
    rest.sewProgressTimeStart = rest.finishTimeStart || '';
    rest.sewProgressTimeEnd = rest.finishTimeEnd || '';
  }
  // 车缝中、完成
  if (activeTab.value === TABS_ENUM.DOING || activeTab.value === TABS_ENUM.FINISHED) {
    rest.sewProgressTimeStart = rest.createdTimeStart || '';
    rest.sewProgressTimeEnd = rest.createdTimeEnd || '';
    rest.sewFinishTimeStart = rest.finishTimeStart || '';
    rest.sewFinishTimeEnd = rest.finishTimeEnd || '';
  }
  const timeParams = {
    // eslint-disable-next-line vue/max-len
    ...handleTimeConsuming(rest.timeConsumingType!, rest.timeConsumingStart, rest.timeConsumingEnd),
  };
  // 删除不必要参数
  ['timeConsumingType', 'timeConsumingStart', 'timeConsumingEnd',
    'finishTimeStart', 'finishTimeEnd', 'createdTimeStart', 'createdTimeEnd']
    .forEach(key => delete rest[key]);
  return {
    ...rest,
    ...row,
    ...timeParams
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
    api: sewQueryByPage,
    params: {
      clothesStepNodeState: '',
      designCode: '',
      styleCode: '',
      isAbnormal: '',
      isCraft: '',
      sampleType: '',
      sampleTypeList: [],
      styleCodeList: [],
      patternMakerIdList: [],
      dimensionDesignerIdList: [],
      designerIdList: [],
      designerGroupCodeList: [],
      waveBandCodeList: [],
      roomIdList: [],
      allocateeIdList: [],
      sewerIdList: [],
      cutterIdList: [],
      semiCraftCreatedTimeStart: '',
      semiCraftCreatedTimeEnd: '',
      semiCraftFinishTimeStart: '',
      semiCraftFinishTimeEnd: '',
      pendingTimeStart: '',
      pendingTimeEnd: '',
      sewProgressTimeStart: '',
      sewProgressTimeEnd: '',
      sewFinishTimeStart: '',
      sewFinishTimeEnd: '',
      finishTimeStart: '',
      finishTimeEnd: '',
      createdTimeStart: '',
      createdTimeEnd: '',
      timeConsumingStart: '',
      timeConsumingEnd: '',
      timeConsumingType: TIME_CONSUMING_TYPE_ENUM.HOUR,
      pageNum: 1,
      pageSize: 20,
      personal: false,
    },
    handleParams(customParams) {
      emits('updateCount');
      return handleParamsData(customParams);
    },
    handleCustomReset(p, defaultParams) {
      return {
        ...defaultParams,
        clothesStep: p.clothesStep,
        clothesNode: p.clothesNode,
        clothesStepNodeState: p.clothesStepNodeState,
        showCancel: p.showCancel,
        personal: p.personal,
      };
    },
  },
});

const processDiaRef = ref();
// 操作日志
const drawer = reactive<{ visible: boolean; data: ISampleClothesLogListRes; }>({
  visible: false,
  data: [] as ISampleClothesLogListRes,
});
const { tableColumns } = useListColumns({
  activeTab,
  reloadFn: () => {
    init();
  },
  viewProcessOrder: (row) => {
    processDiaRef.value.open(row);
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
useTableDataMapRemark<ISewQueryByPageResListItem>(
  tableData,
  'clothesId',
  REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
  'remark',
);
const isFinishDialogShow = ref(false);
const selectedList = ref<ISewQueryByPageResListItem[]>([]);
const handleSelectionChange = (rows: ISewQueryByPageResListItem[]) => {
  selectedList.value = rows;
};

const handleTabChange = () => {
  selectedList.value = [];
  params.value.clothesStepNodeState = '';
  init(1);
};

const { handleOpen } = useSewerDialog({
  reloadFn: () => {
    refresh();
  },
  selectedList
});

// 车缝完成
const handleOpenFinish = () => {
  const flag = selectedList.value.some(it => it.isAbnormal === YES_NO_ENUM.YES);
  if (flag) {
    ElMessage.error('存在未处理异常的任务');
    return;
  }
  isFinishDialogShow.value = true;
};

// 开始车缝
const handleOpenStart = () => {
  const flag = selectedList.value.some(it => it.isAbnormal === YES_NO_ENUM.YES);
  if (flag) {
    ElMessage.error('存在未处理异常的任务');
    return;
  }
  handleOpen('1');
};

// 排单变更
const handleOpenChange = () => {
  handleOpen('2');
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

const refresh = () => {
  getStateStatByNode({
    ...handleParamsData(params.value),
    clothesNode: '',
    clothesStepNodeState: '',
  });
  handleSearch(1);
};

const resetSeach = () => {
  handleReset();
  getStateStatByNode({
    ...handleParamsData(params.value),
    clothesNode: '',
    clothesStepNodeState: '',
  });
};

let skc = route.query.skc as string;
let processNodeState = route.query.processNodeState || '';
let processNode = route.query.processNode || '';
const router = useRouter();

const init = async (pageNum?: number) => {
  if (skc) {
    params.value.designCode = skc;
  }
  if (processNodeState) {
    // 半成品工艺单独处理tab
    if (processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_HALF_SECOND_CRAFT && processNodeState) {
      params.value.clothesStepNodeState = processNodeState as any;
      activeTab.value = TABS_ENUM.SEMI;
    } else if (processNodeState === '0') {
      activeTab.value = TABS_ENUM.WAIT;
    } else if (processNodeState === '1') {
      activeTab.value = TABS_ENUM.DOING;
    } else {
      activeTab.value = TABS_ENUM.WAIT;
    }
  }
  if (skc || processNodeState || processNode) {
    router.replace({
      name: 'ClothesCenterStyleSewList',
      query: {
        componentName: route.query.componentName,
      }
    });
    skc = '';
    processNodeState = '';
    processNode = '';
  }
  handleSearch(pageNum);
  getStateStatByNode({
    ...handleParamsData(params.value),
    clothesNode: '',
    clothesStepNodeState: '',
  });
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
