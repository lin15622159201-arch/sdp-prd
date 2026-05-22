<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.personal" @change='init(1)'>
        <el-radio-button :value="false">全部</el-radio-button>
        <el-radio-button :value="true">我的</el-radio-button>
      </el-radio-group>
      <Tabs
        v-model="params.clothesStepNodeState"
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
        <!-- 审版工艺师 -->
        <template #reviewCraftsmanId>
          <UserSelect
            v-model="params.reviewCraftsmanId"
            clearable
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex tw-mb[10px]">
        <el-button
          type="danger"
          v-if="params.clothesStepNodeState === PAGE_TYPE_STATUS_ENUM.WAIT_ORDER && YCFQ"
          @click="openExceptionLaunch"
          :disabled="isDisabledErrBtn"
        >异常发起</el-button>
        <el-button
          type="primary"
          :disabled="!selectedList.length"
          v-if="params.clothesStepNodeState === PAGE_TYPE_STATUS_ENUM.WAIT_ORDER && FD"
          @click="handleDispatch"
        >分单</el-button>
        <el-button
          type="primary"
          :disabled="!selectedList.length"
          v-if="params.clothesStepNodeState === PAGE_TYPE_STATUS_ENUM.ORDER && CH"
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
      :launch-buz-type="CLOTHES_STEP_ENUM.PATTERN"
      :launch-buz-id="selectedList[0]?.patternId"
      :clothes-step="CLOTHES_STEP_ENUM.PATTERN"
      @success="init()"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch, PropType, toRefs, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from '../hooks/use-search';
import { useListColumns } from '../hooks/use-table-columns';
import {
  CLOTHES_CENTER_SEARCH_KEY,
  REMARK_BIZ_TYPE_ENUMS,
  SAMPLE_TYPE_LIST,
} from '@/modules/clothes-center/constant';
import {
  YES_OR_NO_NUMBER_LIST,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import { patternClothesQueryByPage, patternClothesWithdraw } from '../../../api';
import { IPatternClothesQueryByPageResListItem, IPatternClothesQueryByPageReq } from '../../../api/types';
import DesignerSelect from '@/components/designer-select';
import ClothingRoomSelect from '@/components/clothing-room-select';
import { useRoute, useRouter } from 'vue-router';
import { useStepState } from '@/modules/clothes-center/hooks/use-step-state';
import { useDispatch } from '../hooks/use-dispatch';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import { PAGE_TYPE_STATUS_ENUM } from '../../../constant';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import UserSelect from '@/components/user-select';
import { usePermissionConfig } from '../../../use-permission-config';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { useTabs } from '../hooks/use-tab';
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

const route = useRoute();
const router = useRouter();
const { YCFQ, FD, CH } = usePermissionConfig();
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
    showCancel: rest.clothesStepNodeState === PAGE_TYPE_STATUS_ENUM.ORDER
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
} = useList<IPatternClothesQueryByPageReq>({
  request: {
    api: patternClothesQueryByPage,
    params: {
      showCancel: false,
      clothesStep: '',
      clothesNode: '',
      clothesStepNodeState: PAGE_TYPE_STATUS_ENUM.WAIT_ORDER,
      isAbnormal: '',
      isCraft: '',
      designerGroupCodeList: [],
      designerIdList: [],
      designCode: '',
      styleCode: '',
      makeClothesType: '',
      sampleType: '',
      allocateeIdList: [],
      sampleTypeList: [],
      styleCodeList: [],
      patternMakerIdList: [],
      dimensionDesignerIdList: [],
      waveBandCodeList: [],
      roomIdList: [],
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
    handleCustomReset(p, defaultParams) {
      const _paramsObj = {
        ...defaultParams,
        clothesStep: p.clothesStep,
        clothesNode: p.clothesNode,
        clothesStepNodeState: p.clothesStepNodeState,
        personal: p.personal,
      };
      return _paramsObj;
    },
    handleParams,
  },
});

const { searchConfig } = useSearch({ params });

const processDiaRef = ref();

// 操作日志
const drawer = reactive<{ visible: boolean; data: ISampleClothesLogListRes; }>({
  visible: false,
  data: [] as ISampleClothesLogListRes,
});
const { tableColumns } = useListColumns({
  viewProcessOrder: (row) => {
    processDiaRef.value.open(row);
  },
  reloadFn: () => {
    init();
  },
  params,
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
useTableDataMapRemark<IPatternClothesQueryByPageResListItem>(
  tableData,
  'clothesId',
  REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
  'remark',
);

const selectedList = ref<IPatternClothesQueryByPageResListItem[]>([]);
const handleSelectionChange = (rows: IPatternClothesQueryByPageResListItem[]) => {
  selectedList.value = rows;
};

const getStateStat = async () => {
  emits('updateCount', {
    ...handleParams(params.value),
    clothesStepNodeState: '',
    clothesStep: '',
    clothesNode: '',
  });
};

const resetSearch = () => {
  handleReset();
  getStateStat();
};

// 撤回
const handleRecall = async () => {
  await patternClothesWithdraw({
    patternIds: selectedList.value.map(item => item.patternId),
  });
  init(1);
};

const { findStepNodeByName } = useStepState();

const getPageNode = async () => {
  if (props.componentName) {
    const menu = findStepNodeByName(props.componentName, props.menusList!);
    params.value.clothesStep = menu.processStep;
    params.value.clothesNode = menu.processNode;
  }
};

const { handleDispatch } = useDispatch({
  reloadFn: () => {
    init(1);
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
    params.value.clothesStepNodeState = processNodeState as string;
  }
  if (processNodeState || skc) {
    router.replace({
      name: 'ClothesCenterPatternTask',
      query: {
        componentName: route.query.componentName,
      }
    });
    processNodeState = '';
    skc = '';
  }
  await getPageNode();
  handleSearch(pageNum);
  getStateStat();
};

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

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
// 监听路由变化
onMounted(() => {
  watch(
    () => route.query.componentName,
    () => {
      init(params.value.pageNum);
    },
    { immediate: true }
  );
});

</script>
