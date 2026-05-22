<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.personal" @change='init(1)'>
        <el-radio-button :value="false">全部</el-radio-button>
        <el-radio-button :value="true">我的</el-radio-button>
      </el-radio-group>
      <Tabs
        v-model="params.state"
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
      </sc-search-area>
    </template>
    <template #header>
      <div class="main_header">
        <sc-condition-select
          v-model="params.clothesStepList"
          :incompat="''"
          multiple
          clearable
          :condition-info="conditionInfo"
          @conditionChange="init(1)"
          v-if="[STATE_ENUM.DOING, ''].includes(params.state)"
        />
        <div class="tw-flex tw-flex-justify-between">
          <div class="tw-flex tw-flex-items-center clear-form-margin">
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
          <div>
            <el-button
              type="danger"
              @click="handleCancel"
              v-if="QXXQ && ![
                STATE_ENUM.CANCELED,
                STATE_ENUM.COMPLETED,
              ].includes(params.state as STATE_ENUM)"
              :disabled="selectedList.length === 0"
            >取消需求</el-button>
          </div>
        </div>
      </div>
    </template>
    <template #main>
      <sc-table
        height="100%"
        :data="tableData"
        :columns="tableColumns"
        is-selection
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
    <!-- 需求编辑 -->
    <modify-dialog
      v-model:visible="isModifyShow"
      :rowData="currentData"
      @confirm="init"
    />
    <!-- 弹窗：加工订单详情 -->
    <ProcessDialog ref="processDiaRef" />
    <!--操作日志-->
    <operation-log-drawer v-model="drawer.visible" :data="drawer.data" />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from '../hooks/use-search';
import { STATUS_LIST, STATE_ENUM } from '../constant';
import {
  CLOTHES_CENTER_SEARCH_KEY,
  PROCESS_STEP_CODE_ENUM,
  REMARK_BIZ_TYPE_ENUMS,
  SAMPLE_TYPE_LIST
} from '@/modules/clothes-center/constant';
import {
  YES_OR_NO_NUMBER_LIST,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import { useListColumns } from '../hooks/use-table-columns';
import modifyDialog from './modify-dialog.vue';
import {
  stateCount,
  requirementSummaryPage,
  requirementSummaryCancelSampleClothes,
  requirementSummaryStepCount
} from '../api';
import {
  IRequirementSummaryPageRes,
  IRequirementSummaryPageResListItem,
  IRequirementSummaryStepCountRes,
  IStateCountRes,
  IStateCountResItem
} from '../api/types';
import DesignerSelect from '@/components/designer-select';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { ElMessageBox } from 'element-plus';
import { usePermissionConfig } from '../use-permission-config';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { cloneDeep } from 'lodash-es';
import { handleTimeConsuming } from '@/core/utils/format';

const { searchConfig } = useSearch();
const { QXXQ } = usePermissionConfig();
const isModifyShow = ref(false);
const currentData = ref({});
const selectedList = ref<IRequirementSummaryPageRes['list']>([]);
const handleSelectionChange = (vals: IRequirementSummaryPageRes['list']) => {
  selectedList.value = vals || [];
};
const stepCountInfo = ref<IRequirementSummaryStepCountRes>();
const getStepCountInfo = async () => {
  const { data } = await requirementSummaryStepCount();
  stepCountInfo.value = data;
};
const conditionInfo = computed(() => {
  const list = [
    {
      value: PROCESS_STEP_CODE_ENUM.AUDIT_CRAFT_ORDER,
      label: '审版工艺单'
    },
    {
      value: PROCESS_STEP_CODE_ENUM.PATTERN,
      label: '纸样'
    },
    {
      value: PROCESS_STEP_CODE_ENUM.DIMENSION,
      label: '3D'
    },
    {
      value: PROCESS_STEP_CODE_ENUM.SEW,
      label: '车版'
    },
    {
      value: PROCESS_STEP_CODE_ENUM.AUDIT,
      label: '审版'
    },
    {
      value: PROCESS_STEP_CODE_ENUM.REPAIR,
      label: '返修'
    },
  ];
  return {
    title: '环节：',
    conditionList: [
      ...list.map(v => ({
        ...v,
        label: `${v.label}(${stepCountInfo.value?.[v.value] || '0'})`
      }))
    ]
  };
});

const handleParamsData = (data: any) => {
  const { clothesStepList, ...rest } = data;
  selectedList.value = [];
  let list = [...clothesStepList];
  if ([STATE_ENUM.DOING, ''].includes(rest.state)) {
    if (list.includes('')) {
      list = [];
    } else if (list.includes(PROCESS_STEP_CODE_ENUM.SEW)) {
      list.push(PROCESS_STEP_CODE_ENUM.QC);
    }
  } else {
    list = [];
  }
  const timeParams = {
    ...handleTimeConsuming(rest.timeConsumingType, rest.timeConsumingStart, rest.timeConsumingEnd),
  };
  delete rest.timeConsumingType;
  delete rest.timeConsumingStart;
  delete rest.timeConsumingEnd;
  getStepCountInfo();
  return {
    ...rest,
    ...timeParams,
    clothesStepList: list,
    showCancel: rest.state === ''
      ? undefined
      : [STATE_ENUM.COMPLETED, STATE_ENUM.CANCELED].includes(data.state as STATE_ENUM)
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
    api: requirementSummaryPage,
    params: {
      state: '',
      designCode: '',
      styleCode: '',
      designerIdList: [],
      designerGroupCodeList: [],
      makeClothesType: '',
      isAbnormal: '',
      isCraft: '',
      sampleType: '',
      sampleTypeList: [],
      styleCodeList: [],
      dimensionDesignerIdList: [],
      patternMakerIdList: [],
      waveBandCodeList: [],
      firstSampleCreatedTimeStart: '',
      firstSampleCreatedTimeEnd: '',
      auditPassTimeStart: '',
      auditPassTimeEnd: '',
      timeConsumingStart: '',
      timeConsumingEnd: '',
      timeConsumingType: TIME_CONSUMING_TYPE_ENUM.HOUR,
      pageNum: 1,
      pageSize: 20,
      clothesStepList: [''],
      personal: false,
    },
    handleParams(data) {
      return handleParamsData(data);
    },
    handleCustomReset(p, defaultParams) {
      return {
        ...defaultParams,
        state: p.state,
        personal: p.personal,
        clothesStepList: p.clothesStepList,
      };
    },
  },
});
const stateCountInfo = ref<IStateCountRes>([]);
const tabList = computed(() => {
  let count = 0;
  const list = STATUS_LIST.map((item) => {
    const obj = stateCountInfo.value?.find((it: IStateCountResItem) => it.state === item.value);
    count += Number(obj?.count || 0);
    return {
      ...item,
      label: `${item.label}(${obj?.count ?? '0'})`
    };
  });
  return [
    {
      value: '',
      label: `全部(${count})`
    },
    ...list
  ];
});
const processDiaRef = ref();

// 操作日志
const drawer = reactive<{ visible: boolean; data: ISampleClothesLogListRes; }>({
  visible: false,
  data: [] as ISampleClothesLogListRes,
});
const { tableColumns } = useListColumns({
  handleEdit: (row) => {
    isModifyShow.value = true;
    currentData.value = row;
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

const getStateStat = async () => {
  const p = cloneDeep(params.value);
  const { data } = await stateCount(handleParamsData(p));
  stateCountInfo.value = data;
};

const resetSearch = () => {
  handleReset();
  getStateStat();
};

const handleCancel = async () => {
  await ElMessageBox.confirm('取消打版需求后将不可恢复，是否确认取消？', '取消打版需求');
  await requirementSummaryCancelSampleClothes({
    sampleClothesIds: selectedList.value.map(v => v.clothesId!)
  });
  init();
};
/* remark */
useTableDataMapRemark<IRequirementSummaryPageResListItem>(
  tableData,
  'clothesId',
  REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
  'remark',
);

const init = (pageNum?: number) => {
  getStateStat();
  handleSearch(pageNum);
};
usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

onMounted(() => {
  init(params.value.pageNum);
});

</script>
<style lang="scss" scoped>
.main_header {
  :deep(.sc-condition-select-title) {
    font-size: 12px;
  }
}
</style>
