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
        @handleSearch="init"
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
          v-if="activeTab === TABS_ENUM.WAIT && CBFD_FD"
          @click="handleDispatch"
        >分单</el-button>
        <el-button
          type="primary"
          :disabled="isDisabledErrBtn"
          v-if="activeTab === TABS_ENUM.FINISHED && CBFD_CH"
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
      :launch-buz-type="CLOTHES_STEP_ENUM.SEW"
      :launch-buz-id="selectedList[0]?.sewId"
      :clothes-step="CLOTHES_STEP_ENUM.SEW"
      @success="init()"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import {
  SAMPLE_TYPE_LIST,
  REMARK_BIZ_TYPE_ENUMS,
  CLOTHES_CENTER_SEARCH_KEY,
} from '@/modules/clothes-center/constant';
import {
  YES_NO_ENUM, YES_OR_NO_NUMBER_LIST,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import { sewWithdraw, sewQueryByPage } from '../../../api';
import { ISewQueryByPageResListItem } from '../../../api/types';
import DesignerSelect from '@/components/designer-select';
import UserSelect from '@/components/user-select';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import { useRoute, useRouter } from 'vue-router';
import { useDispatch } from './hooks/use-dispatch';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { TAB_LIST, TABS_ENUM } from './constant';
import { useTabs } from '@/modules/clothes-center/views/style-sew/hooks/use-tab';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import { ElMessage } from 'element-plus';
import ClothingRoomSelect from '@/components/clothing-room-select';
import { usePermissionConfig } from '@/modules/clothes-center/views/style-sew/use-permission-config';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import useGetCount from '@/modules/clothes-center/hooks/use-get-count';
import { handleTimeConsuming } from '@/core/utils/format';

const route = useRoute();
const { YCFQ, CBFD_FD, CBFD_CH } = usePermissionConfig();

const props = defineProps({
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
const { searchConfig } = useSearch({ activeTab });
const { stepNodeStateCountData, getStepNodeStateCountList } = useGetCount();
const { tabs } = useTabs({
  stepNodeStateCountData,
  list: TAB_LIST
});

const handleParamsData = (customParams: any) => {
  const { ...rest } = customParams;
  const row = tabs.value.find(v => v.value === activeTab.value)!.params;
  const timeParams = {
    // eslint-disable-next-line vue/max-len
    ...handleTimeConsuming(rest.timeConsumingType!, rest.timeConsumingStart, rest.timeConsumingEnd),
  };
  delete rest.timeConsumingType;
  delete rest.timeConsumingStart;
  delete rest.timeConsumingEnd;
  return {
    ...rest,
    ...row,
    ...timeParams,
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
      showCancel: false,
      clothesStep: '',
      clothesNode: '',
      clothesStepNodeState: YES_NO_ENUM.NO,
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
      allocateFinishTimeStart: '',
      allocateFinishTimeEnd: '',
      allocateCreatedTimeStart: '',
      allocateCreatedTimeEnd: '',
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

const selectedList = ref<ISewQueryByPageResListItem[]>([]);
const handleSelectionChange = (rows: ISewQueryByPageResListItem[]) => {
  selectedList.value = rows;
};

const handleTabChange = () => {
  selectedList.value = [];
  init(1);
};

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

const handleRecall = async () => {
  try {
    await sewWithdraw({ sewId: selectedList.value[0]?.sewId as string });
    ElMessage.success('撤回成功');
    init();
  } catch (err) {
    console.error(err);
  }
};

const { handleDispatch } = useDispatch({
  reloadFn: () => {
    init();
  },
  selectedList
});
const resetSeach = () => {
  handleReset();
  getStepNodeStateCountList({
    ...handleParamsData(params.value),
    clothesStepNodeState: '',
  });
};
let skc = route.query.skc as string;
const router = useRouter();
const init = async (pageNum?: number) => {
  if (skc) {
    params.value.designCode = skc;
  }
  if (skc) {
    router.replace({
      name: 'ClothesCenterStyleSewList',
      query: {
        componentName: route.query.componentName,
      }
    });
    skc = '';
  }
  getStepNodeStateCountList({
    ...handleParamsData(params.value),
    clothesStepNodeState: '',
  });
  handleSearch(pageNum);
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
