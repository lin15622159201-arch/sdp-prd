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
        <!-- 分单员 -->
        <template #allocateeIdList>
          <UserSelect
            v-model="params.allocateeIdList"
            clearable
            multiple
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
        <!-- 分单结果 -->
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
          v-if="activeTab === TABS_ENUM.WAIT && YCFQ"
          @click="openExceptionLaunch"
          :disabled="isDisabledErrBtn"
        >异常发起</el-button>
        <el-button
          type="primary"
          :disabled="!selectedList.length"
          v-if="activeTab === TABS_ENUM.WAIT && FD"
          @click="handleDispatch"
        >分单</el-button>
        <el-button
          type="primary"
          :disabled="!selectedList.length"
          v-if="activeTab === TABS_ENUM.DISPATCH && CH"
          @click="handleRecall"
        >撤回</el-button>
      </div>
      <div class="tw-flex">
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
import { PropType, ref, watch, computed, reactive, toRefs, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from '../hooks/use-search';
import { useListColumns } from '../hooks/use-table-columns';
import { CLOTHES_CENTER_SEARCH_KEY, REMARK_BIZ_TYPE_ENUMS, SAMPLE_TYPE_LIST } from '@/modules/clothes-center/constant';
import {
  YES_OR_NO_NUMBER_LIST,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import { dimensionPage, dimensionRecall } from '../../../api';
import { IDimensionPageResListItem, IDimensionRecallReqListItem } from '../../../api/types';
import UserSelect from '@/components/user-select';
import DesignerSelect from '@/components/designer-select';
import ClothingRoomSelect from '@/components/clothing-room-select';
import { useDispatch } from '../hooks/use-dispatch';
import { useRoute, useRouter } from 'vue-router';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { TABS_ENUM } from './constant';
import { useTabs } from './hooks/use-tab';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import { useStepState } from '@/modules/clothes-center/hooks/use-step-state';
import { usePermissionConfig } from '../../../use-permission-config';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { handleTimeConsuming } from '@/core/utils/format';

const route = useRoute();
const router = useRouter();
const { YCFQ, FD, CH } = usePermissionConfig();

const activeTab = ref(TABS_ENUM.WAIT);
const { findStepNodeByName } = useStepState();

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
const { stepNodeStateCountData } = toRefs(props);
const { tabs } = useTabs({ stepNodeStateCountData });
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
    ...tabs.value.find(v => v.value === activeTab.value)!.params!,
    showCancel: activeTab.value === TABS_ENUM.DISPATCH
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
      isAllocated: '0', // 3D任务是否已分单(1:是,0:不是)
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
      sampleType: '',
      roomIdList: [],
      patternMakerIdList: [],
      seperateStartTimeStart: '',
      seperateStartTimeEnd: '',
      seperateFinishTimeStart: '',
      seperateFinishTimeEnd: '',
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
const { searchConfig } = useSearch({ activeTab });
// 操作日志
const drawer = reactive<{ visible: boolean; data: ISampleClothesLogListRes; }>({
  visible: false,
  data: [] as ISampleClothesLogListRes,
});
const processDiaRef = ref();
const { tableColumns } = useListColumns({
  activeTab,
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

const selectedList = ref<IDimensionPageResListItem[]>([]);

const handleSelectionChange = (rows: IDimensionPageResListItem[]) => {
  selectedList.value = rows;
};

const handleTabChange = () => {
  params.value.roomIdList = [];
  selectedList.value = [];
  init(1);
};

const getState = () => {
  emits('updateCount', {
    ...handleParams(params.value),
    clothesStepNodeState: '',
    clothesStep: '',
    clothesNode: '',
    isAllocated: '',
    isOutsourced: '',
  });
};

const resetSearch = () => {
  handleReset();
  getState();
};

// 撤回
const handleRecall = async () => {
  const list: IDimensionRecallReqListItem[] = selectedList.value.map(item => (
    {
      clothesId: item.clothesId!,
      dimensionId: item.dimensionId!,
    }
  ));
  await dimensionRecall({ list });
  init(1);
};

const getPageNode = async () => {
  if (props.componentName) {
    const menu = findStepNodeByName(props.componentName, props.menusList!);
    params.value.clothesStep = menu.processStep;
    params.value.clothesNode = menu.processNode;
  }
};

const { handleDispatch } = useDispatch({
  reloadFn: () => {
    init();
  },
  selectedList
});
let skc = route.query.skc || '';
let processNodeState = route.query.processNodeState || '';
const init = async (pageNum?: number) => {
  if (skc) {
    params.value.designCode = skc as string;
  }
  if (processNodeState) {
    activeTab.value = processNodeState === '1' ? TABS_ENUM.DISPATCH : TABS_ENUM.WAIT;
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
  handleSearch(pageNum);
  getState();
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
