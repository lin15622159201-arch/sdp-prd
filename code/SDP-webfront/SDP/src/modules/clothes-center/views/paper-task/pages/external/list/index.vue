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
        <!-- 审版工艺师 -->
        <template #reviewCraftsmanId>
          <UserSelect
            v-model="params.reviewCraftsmanId"
            clearable
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
          v-if="(activeTab === PAGE_TYPE_STATUS_ENUM.WAIT_DISPATCH
            || activeTab === PAGE_TYPE_STATUS_ENUM.WAIT) && YCFQ
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
      :can-sync-ext="YES_NO_ENUM.YES"
      @success="init()"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from '../hooks/use-search';
import { useListColumns } from '../hooks/use-table-columns';
import {
  REMARK_BIZ_TYPE_ENUMS,
  SAMPLE_TYPE_LIST,
  CLOTHES_CENTER_SEARCH_KEY,
  LOG_BIZ_TYPE_ENUMS,
} from '@/modules/clothes-center/constant';
import {
  YES_OR_NO_NUMBER_LIST,
  YES_NO_ENUM,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import { patternClothesQueryByPage } from '../../../api/index';
import DesignerSelect from '@/components/designer-select';
import ClothingRoomSelect from '@/components/clothing-room-select';
import UserSelect from '@/components/user-select';
import { useRoute, useRouter } from 'vue-router';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import { PAGE_TYPE_STATUS_ENUM } from '../../../constant';
import { ElMessage } from 'element-plus';
import { useOpenBlank } from '@/hooks-transfer/use-router-blank';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { IPatternClothesQueryByPageResListItem, IPatternClothesQueryByPageReq } from '../../../api/types';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import { usePermissionConfig } from '../../../use-permission-config';
import { useTabs } from '../hooks/use-tab';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { handleTimeConsuming } from '@/core/utils/format';

defineProps({
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
const { YCFQ } = usePermissionConfig();
const activeTab = ref(PAGE_TYPE_STATUS_ENUM.WAIT_DISPATCH);

const { tabs, getStateStatByNode } = useTabs();

const { searchConfig } = useSearch();
const handleParams = (customParams:any) => {
  const { ...rest } = customParams;
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
    clothesStepNodeState: activeTab.value,
    showCancel: activeTab.value === PAGE_TYPE_STATUS_ENUM.SUBMIT
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
      clothesStepNodeState: '',
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
      reviewCraftsmanId: '',
      roomIdList: [],
      seperateFinishTimeStart: '',
      seperateFinishTimeEnd: '',
      patternFinishTimeStart: '',
      patternFinishTimeEnd: '',
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
const getStateStat = async () => {
  emits('updateCount', {
    ...handleParams(params.value),
    clothesStepNodeState: '',
    clothesStep: '',
    clothesNode: '',
    showCancel: undefined
  });
};
const resetSearch = () => {
  handleReset();
  getStateStat();
  getStateStatByNode(handleParams(params.value));
};
const selectedList = ref<IPatternClothesQueryByPageResListItem[]>([]);
const handleSelectionChange = (rows: IPatternClothesQueryByPageResListItem[]) => {
  selectedList.value = rows;
};
// 操作日志
const drawer = reactive<{ visible: boolean; data: ISampleClothesLogListRes; }>({
  visible: false,
  data: [] as ISampleClothesLogListRes,
});
const processDiaRef = ref();
const { tableColumns } = useListColumns({
  activeTab,
  handleEdit: (row, behavior) => {
    if (row.isAbnormal === YES_NO_ENUM.YES && behavior === 'modify') {
      ElMessage.error('存在未处理异常的任务');
      return;
    }
    const { href } = router.resolve(
      {
        name: behavior === 'view' ? 'ClothesCenterPatternTaskDetail' : 'ClothesCenterPatternTaskEdit',
        params: {
          id: row?.patternId,
        },
        query: {
          componentName: route.query.componentName,
          state: activeTab.value
        }
      }
    );
    useOpenBlank(href);
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
useTableDataMapRemark<IPatternClothesQueryByPageResListItem>(
  tableData,
  'clothesId',
  REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
  'remark',
);

let skc = route.query.skc || '';
let processNodeState = route.query.processNodeState || '';
let state = route.query?.state as string;
const init = async (pageNum?: number) => {
  if (skc) {
    params.value.designCode = skc as string;
  }
  if (processNodeState) {
    activeTab.value = processNodeState as string;
  }
  if (state) {
    activeTab.value = state;
  }
  if (processNodeState || state || skc) {
    router.replace({
      name: 'ClothesCenterPatternTask',
      query: {
        componentName: route.query.componentName,
      }
    });
    processNodeState = '';
    state = '';
    skc = '';
  }
  handleSearch(pageNum);
  getStateStat();
  getStateStatByNode({
    ...handleParams(params.value),
    clothesStepNodeState: '',
    clothesStep: '',
    clothesNode: ''
  });
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
