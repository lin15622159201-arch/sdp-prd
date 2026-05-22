<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.personal" @change='init(1)'>
        <el-radio-button :value="false">全部</el-radio-button>
        <el-radio-button :value="true">我的</el-radio-button>
      </el-radio-group>
      <Tabs
        v-model="params.clothesStepNodeState"
        :config="tabList"
        :border="false"
        class="tw-pb-15px"
        :font-size="15"
        @change="init(1)"
      />
      <sc-search-area
        v-model="params"
        label-width="120"
        @handleSearch="init(1)"
        @handleReset="resetSearch()"
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
          v-if="params.clothesStepNodeState === STATUS_LIST_ENUM.WAIT && YCFQ"
          type="danger"
          :disabled="isDisabledErrBtn"
          @click="openExceptionLaunch"
        >异常发起</el-button>
        <el-button
          type="primary"
          :disabled="!selectedLst.length"
          v-if="params.clothesStepNodeState === STATUS_LIST_ENUM.WAIT && BDJJ"
          @click="handleHandoverClick"
        >版单交接</el-button>
        <el-button
          type="primary"
          @click="handleHandover"
          v-if="params.clothesStepNodeState === STATUS_LIST_ENUM.WAIT && BDJJ"
        >扫码交接</el-button>
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
    <!-- 扫码交接 -->
    <handover-dialog
      v-model:visible="isHandoverShow"
      @confirm="init(params.pageNum)"
    />
    <!-- 弹窗：加工订单详情 -->
    <ProcessDialog ref="processDiaRef" />
    <!--操作日志-->
    <operation-log-drawer v-model="drawer.visible" :data="drawer.data" />
    <!--弹窗:异常发起 -->
    <error-dialog
      ref="errorDialogRef"
      :launch-buz-type="CLOTHES_STEP_ENUM.TAKE_OVER"
      :clothes-step="CLOTHES_STEP_ENUM.TAKE_OVER"
      :launch-buz-id="selectedLst[0]?.clothesId"
      @success="init()"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from '../hooks/use-search';
import {
  REMARK_BIZ_TYPE_ENUMS, SAMPLE_TYPE_LIST,
  PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM,
  CLOTHES_CENTER_SEARCH_KEY
} from '@/modules/clothes-center/constant';
import {
  YES_OR_NO_NUMBER_LIST,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import { STATUS_LIST, STATUS_LIST_ENUM } from '../constant';
import { useListColumns } from '../hooks/use-table-columns';
import handoverDialog from './handover-dialog.vue';
import { takeOverPage, takeOverSampleClothes } from '../api';
import DesignerSelect from '@/components/designer-select';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import {
  ITakeOverPageResListItem,
  ITakeOverPageReq
} from '@/modules/clothes-center/views/prototype-handover/api/types';
import { useRoute, useRouter } from 'vue-router';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import { usePermissionConfig } from '../use-permission-config';
import { useStepState } from '@/modules/clothes-center/hooks/use-step-state';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import UserSelect from '@/components/user-select';
import { handleTimeConsuming } from '@/core/utils/format';

const { searchConfig } = useSearch();
const { YCFQ, BDJJ } = usePermissionConfig();
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
    showCancel: rest.clothesStepNodeState === STATUS_LIST_ENUM.COMPLETED
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
} = useList<ITakeOverPageReq>({
  request: {
    api: takeOverPage,
    params: {
      showCancel: true,
      clothesStepNodeState: '0',
      designerIdList: [],
      designerGroupCodeList: [],
      makeClothesType: '',
      styleCode: '',
      designCode: '',
      isAbnormal: '',
      isCraft: '',
      sampleType: '',
      sampleTypeList: [],
      styleCodeList: [],
      patternMakerIdList: [],
      dimensionDesignerIdList: [],
      waveBandCodeList: [],
      takeOverStartTimeStart: '',
      takeOverStartTimeEnd: '',
      takeOverTimeStart: '',
      takeOverTimeEnd: '',
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
        state: p.state,
        personal: p.personal,
      };
    },
  },
});

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

/* remark */
useTableDataMapRemark<ITakeOverPageResListItem>(
  tableData,
  'clothesId',
  REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
  'remark',
);
const processDiaRef = ref();

// 操作日志
const drawer = reactive<{ visible: boolean; data: ISampleClothesLogListRes; }>({
  visible: false,
  data: [] as ISampleClothesLogListRes,
});
const { tableColumns } = useListColumns({
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
const selectedLst = ref<ITakeOverPageResListItem[]>([]);
const handleSelectionChange = (rows: ITakeOverPageResListItem[]) => {
  selectedLst.value = rows;
};

const isHandoverShow = ref(false);
const handleHandover = () => {
  isHandoverShow.value = true;
};

const { getStepNodeStateCountList, stepNodeStateCountData } = useStepState();

const getStateStat = async () => {
  await getStepNodeStateCountList({
    clothesStep: PROCESS_STEP_CODE_ENUM.TAKE_OVER,
    clothesNode: PROCESS_NODE_CODE_ENUM.TAKE_OVER,
    ...handleParams(params.value),
    clothesStepNodeState: '',
    showCancel: true,
  });
};

const resetSearch = () => {
  handleReset();
  getStateStat();
};

const handleHandoverClick = async () => {
  await takeOverSampleClothes({ sampleClothesIds: selectedLst.value.map(item => item.clothesId) });
  init(1);
};

const tabList = computed(() => {
  const arr = stepNodeStateCountData.value
    .filter(v => v!.processStepCode === PROCESS_STEP_CODE_ENUM.TAKE_OVER
        && v.processNodeCode === PROCESS_NODE_CODE_ENUM.TAKE_OVER);
  return STATUS_LIST.map((v) => {
    const { count = '0', unFinishCount = '0' } = arr.find(it => v.value === it.nodeStateCode) || {};
    return {
      ...v,
      count: v.value === STATUS_LIST_ENUM.COMPLETED ? count : unFinishCount
    };
  });
});

// 按钮前置校验 单选&环节状态='待分单'
const isDisabledErrBtn = computed(() => {
  return selectedLst.value?.length !== 1;
});
// 异常发起
const errorDialogRef = ref();
const openExceptionLaunch = () => {
  const { processStepDesc = '', processNodeDesc = '', processNodeStateDesc = '' } = selectedLst.value[0];
  const desc = processStepDesc ? `${processStepDesc}-${processNodeDesc}-${processNodeStateDesc}` : '';
  errorDialogRef.value.open(selectedLst.value[0], desc);
};

const route = useRoute();
const router = useRouter();
let skc = route.query.skc || '';
let processNodeState = route.query.processNodeState || '';
const init = (pageNum?: number) => {
  if (skc) {
    params.value.designCode = skc as string;
  }
  if (processNodeState) {
    params.value.clothesStepNodeState = processNodeState as string;
  }
  if (processNodeState || skc) {
    router.replace({
      name: 'ClothesCenterPrototypeHandoverList',
    });
    processNodeState = '';
    skc = '';
  }
  getStateStat();
  handleSearch(pageNum);
};

onMounted(() => {
  init(params.value.pageNum);
});

</script>
