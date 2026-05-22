<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.personal" @change="init(1)">
        <el-radio-button label="全部" :value="false" />
        <el-radio-button label="我的" :value="true" />
      </el-radio-group>
      <Tabs
        v-model="params.auditStatus"
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
        <!-- 质检师 -->
        <template #qualityCheckerId>
          <UserSelect
            v-model="params.qualityCheckerId"
            clearable
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
          v-if="params.auditStatus === STATUS_LIST_ENUM.WAIT && YCFQ"
          @click="openExceptionLaunch"
          :disabled="isDisabledErrBtn"
        >异常发起</el-button>
      </div>
      <div class="tw-flex tw-flex-wrap tw-gap-10px">
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
      :launch-buz-type="CLOTHES_STEP_ENUM.AUDIT"
      :launch-buz-id="selectedList[0]?.sampleAuditId"
      :clothes-step="CLOTHES_STEP_ENUM.AUDIT"
      @success="init()"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick, reactive, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from '../hooks/use-search';
import { useListColumns } from '../hooks/use-table-columns';
import {
  REMARK_BIZ_TYPE_ENUMS,
  SAMPLE_TYPE_LIST,
  PROCESS_NODE_CODE_ENUM,
  PROCESS_STEP_CODE_ENUM,
  CLOTHES_CENTER_SEARCH_KEY,
} from '@/modules/clothes-center/constant';
import {
  YES_OR_NO_NUMBER_LIST, YES_NO_ENUM,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import { useRoute, useRouter } from 'vue-router';
import { sampleAuditPage } from '../api/index';
import DesignerSelect from '@/components/designer-select';
import UserSelect from '@/components/user-select';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import { ElMessage } from 'element-plus';
import { STATUS_LIST, STATUS_LIST_ENUM } from '../constant';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { ISampleAuditPageReq, ISampleAuditPageResListItem } from '../api/types';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import { usePermissionConfig } from '@/modules/clothes-center/views/style-audit/use-permission-config';
import { useStepState } from '@/modules/clothes-center/hooks/use-step-state';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { handleTimeConsuming } from '@/core/utils/format';

const $router = useRouter();
const { YCFQ } = usePermissionConfig();
const handleParams = (paramsObj: ISampleAuditPageReq) => {
  const { auditStatus, ...rest } = paramsObj;
  const timeParams = {
    ...handleTimeConsuming(rest.timeConsumingType!, rest.timeConsumingStart, rest.timeConsumingEnd),
  };
  delete rest.timeConsumingType;
  delete rest.timeConsumingStart;
  delete rest.timeConsumingEnd;
  return {
    ...rest,
    ...timeParams,
    auditStatus,
    showCancel: auditStatus === STATUS_LIST_ENUM.COMPLETED,
    clothesStepNodeState: '',
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
    api: sampleAuditPage,
    params: {
      clothesStepNodeState: '',
      showCancel: false,
      personal: false,
      clothesStep: PROCESS_STEP_CODE_ENUM.AUDIT,
      clothesNode: PROCESS_NODE_CODE_ENUM.SAMPLE_AUDIT,
      auditStatus: STATUS_LIST_ENUM.WAIT,
      sampleType: '',
      isAbnormal: '',
      isCraft: '',
      designCode: '',
      styleCode: '',
      designerIdList: [],
      designerGroupCodeList: [],
      sampleTypeList: [],
      makeClothesType: '',
      qualityCheckerId: '',
      patternMakerIdList: [],
      purchaserIdList: [],
      saleGroupList: [],
      waveBandCodeList: [],
      startAuditTime: '',
      endAuditTime: '',
      auditCreatedTimeStart: '',
      auditCreatedTimeEnd: '',
      timeConsumingStart: '',
      timeConsumingEnd: '',
      timeConsumingType: TIME_CONSUMING_TYPE_ENUM.HOUR,
      pageNum: 1,
      pageSize: 20,
    },
    handleParams,
    handleCustomReset(p, defaultParams) {
      return {
        ...defaultParams,
        clothesStep: p.clothesStep,
        clothesNode: p.clothesNode,
        personal: p.personal,
      };
    },
  },
});

const { searchConfig } = useSearch(params);

const { getStepNodeStateCountList, stepNodeStateCountData } = useStepState();

const getStateStat = async () => {
  await getStepNodeStateCountList({
    ...handleParams(params.value),
    clothesStep: PROCESS_STEP_CODE_ENUM.AUDIT,
    clothesNode: PROCESS_NODE_CODE_ENUM.SAMPLE_AUDIT,
    personal: params.value.personal,
    clothesStepNodeState: '',
    auditStatus: '',
  });
};

const resetSearch = () => {
  handleReset();
  getStateStat();
};

const processDiaRef = ref();
// 操作日志
const drawer = reactive<{ visible: boolean; data: ISampleClothesLogListRes; }>({
  visible: false,
  data: [] as ISampleClothesLogListRes,
});
const { tableColumns } = useListColumns({
  handleAudit: (row, behavior) => {
    if (row.isAbnormal === YES_NO_ENUM.YES && behavior === 'modify') {
      ElMessage.error('存在未处理异常的任务');
      return;
    }
    $router.push(
      {
        name: behavior === 'view' ? 'ClothesCenterStyleAuditDetail' : 'ClothesCenterStyleAuditEdit',
        params: {
          id: row.sampleAuditId,
        },
      }
    );
  },
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
useTableDataMapRemark<ISampleAuditPageResListItem>(
  tableData,
  'clothesId',
  REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
  'remark',
);

const selectedList = ref<ISampleAuditPageResListItem[]>([]);
const handleSelectionChange = (rows: ISampleAuditPageResListItem[]) => {
  selectedList.value = rows;
};
// 按钮前置校验 单选&环节状态='待分单'
const isDisabledErrBtn = computed(() => {
  return selectedList.value?.length !== 1;
});
// 异常发起
const errorDialogRef = ref();
const openExceptionLaunch = () => {
  errorDialogRef.value.open(selectedList.value[0]);
};

const tabList = computed(() => {
  const arr = stepNodeStateCountData.value
    .filter(v => v!.processStepCode === PROCESS_STEP_CODE_ENUM.AUDIT
        && v.processNodeCode === PROCESS_NODE_CODE_ENUM.SAMPLE_AUDIT);
  return STATUS_LIST.map((v) => {
    const { count = '0', unFinishCount = '0' } = arr.find(it => v.value === it.nodeStateCode) || {};
    return {
      ...v,
      count: v.value === STATUS_LIST_ENUM.COMPLETED ? count : unFinishCount
    };
  });
});

const route = useRoute();
const router = useRouter();

let skc = route.query.skc || '';
let processNodeState = route.query.processNodeState || '';
const init = async (pageNum?: number) => {
  if (skc) {
    params.value.designCode = skc as string;
  }
  if (processNodeState) {
    params.value.auditStatus = processNodeState as STATUS_LIST_ENUM;
  }
  if (skc || processNodeState) {
    router.replace({
      name: 'ClothesCenterStyleAuditList',
      query: {
        componentName: route.query.componentName,
      }
    });
    skc = '';
    processNodeState = '';
  }
  getStateStat();
  handleSearch(pageNum);
};

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

onMounted(() => {
  init(params.value.pageNum);
});
</script>
