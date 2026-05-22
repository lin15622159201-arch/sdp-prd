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
        <!-- 纸样师 -->
        <template #patternMakerIdList>
          <UserSelect
            v-model="params.patternMakerIdList"
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
          v-if="activeTab === TABS_ENUM.WAIT && QTQS_QS"
          type="primary"
          @click="handleCollect"
          :disabled="!isOnlyRow"
        >齐套签收</el-button>
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
      :launch-buz-type="CLOTHES_STEP_ENUM.SEW"
      :launch-buz-id="selectedList[0]?.clothesId"
      :clothes-step="CLOTHES_STEP_ENUM.SEW"
      @success="init()"
    />
    <CollectDialog
      v-model:visible="collectDia.visible"
      :code="currentRow?.designCode || ''"
      :data="collectDia.data"
      @confirm="confirm"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, computed, watch, reactive, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import {
  SAMPLE_TYPE_LIST,
  REMARK_BIZ_TYPE_ENUMS,
  CLOTHES_CENTER_SEARCH_KEY
} from '@/modules/clothes-center/constant';
import {
  YES_OR_NO_NUMBER_LIST, YES_NO_ENUM,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import {
  materialPage, materialSign, materialCheckMaterial, materialSignMaterialList,
  forceSign
} from './api';
import DesignerSelect from '@/components/designer-select';
import UserSelect from '@/components/user-select';
import { ElMessage, ElMessageBox } from 'element-plus';
import { IMaterialPageResListItem, IMaterialSignMaterialListResItem } from './api/types';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import { useRoute, useRouter } from 'vue-router';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import { getWebV1LogSampleClothesListApi } from '@/modules/design-center/api/design-code';
import { ISampleClothesLogListRes } from '@/modules/design-center/api/design-code/types';
import { TAB_LIST, TABS_ENUM } from './constant';
import { useTabs } from '@/modules/clothes-center/views/style-sew/hooks/use-tab';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import CollectDialog from './components/collect-dialog/index.vue';
import { usePermissionConfig } from '@/modules/clothes-center/views/style-sew/use-permission-config';
import { isEmpty } from '@toy/utils';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { ASIDE_TYPE_ENUM } from '../../constant/menus';
import useGetCount from '@/modules/clothes-center/hooks/use-get-count';
import { handleTimeConsuming } from '@/core/utils/format';

const route = useRoute();
const router = useRouter();
const { YCFQ, QTQS_QS } = usePermissionConfig();

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
const { searchConfig } = useSearch();
const emits = defineEmits(['updateCount']);

const { stepNodeStateCountData, getStepNodeStateCountList } = useGetCount();

const activeTab = ref(TABS_ENUM.WAIT);
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
    api: materialPage,
    params: {
      showCancel: false,
      clothesStep: '',
      clothesNode: '',
      designCode: '',
      styleCode: '',
      designerIdList: [],
      designerGroupCodeList: [],
      waveBandCodeList: [],
      patternMakerId: '',
      isAbnormal: '',
      isCraft: '',
      sampleWay: '',
      sampleTypeList: [],
      styleCodeList: [],
      patternMakerIdList: [],
      dimensionDesignerIdList: [],
      materialSignTimeStart: '',
      materialSignTimeEnd: '',
      materialCreatedTimeStart: '',
      materialCreatedTimeEnd: '',
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

const checkError = async (row: IMaterialPageResListItem) => {
  if (row.isAbnormal === YES_NO_ENUM.YES) {
    ElMessage.error('存在未处理异常的任务');
    return Promise.reject(false);
  }
  return Promise.resolve(true);
};

const selectedList = ref<IMaterialPageResListItem[]>([]);
const currentRow = computed(() => selectedList.value[0]);
const handleSelectionChange = (rows: IMaterialPageResListItem[]) => {
  selectedList.value = rows;
};
const isOnlyRow = computed(() => {
  return selectedList.value.length === 1;
});

const collectDia = reactive({
  visible: false,
  data: [] as IMaterialSignMaterialListResItem[],
  isOnWayFlag: false, // 是否有在途的齐套单
});

const confirm = async (isEnforceSign: boolean = false) => {
  if (isEnforceSign) {
    // 强制签收
    await forceSign({
      designCode: currentRow.value.designCode!,
      isEnforceSign: '1'
    });
    ElMessage.success('签收完成');
  } else {
    await materialSign({
      designCode: currentRow.value.designCode!,
    });
    if (collectDia.isOnWayFlag) {
      ElMessage.warning('仍有在途齐套单等发货后再签收');
    } else {
      ElMessage.success('签收完成');
    }
  }
  collectDia.visible = false;
  init(1);
};

const handleCollect = async () => {
  await checkError(currentRow.value);
  const { data } = await materialCheckMaterial({ designCode: currentRow.value.designCode! });
  /**
    * 0:没有有齐套单，直接签收
    * 1:最少有一单待签收状态，前端可直接弹出待签收齐套单信息进行签收
    * 2:仍有在途的齐套单，前端需要提示:请待齐套单发货后再签收
    * 3:不是首单，没有在途的齐套单，前端需要提示:是否强制签收
    * 4:首单，没有在途的齐套单，不需要弹出齐套单直接签收
    * 12:最少有一单待签收状态，且还有其他在途的齐套单，前端提交了签收之后弹出提示:仍有在途齐套单等发货后再签收
   */
  if ([0, 4].includes(data)) {
    await confirm(true);
  } else if ([1, 12].includes(data)) {
    const { data: listData = [] } = await materialSignMaterialList({ designCode: currentRow.value.designCode! });
    collectDia.data = listData;
    collectDia.visible = true;
    collectDia.isOnWayFlag = data === 12;
  } else if (data === 2) {
    ElMessage.warning('请待齐套单发货后再签收');
  } else if (data === 3) {
    const res = await ElMessageBox.confirm('存在加工单目前无在途齐套单，是否强制签收？', '提示', {
      showCancelButton: true,
      type: 'warning',
    });
    if (res) {
      await confirm(true);
    }
  }
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
useTableDataMapRemark<IMaterialPageResListItem>(
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

const resetSearch = () => {
  handleReset();
  getStepNodeStateCountList({
    ...handleParamsData(params.value),
    clothesStepNodeState: '',
  });
};

let skc = route.query.skc as string;
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
  handleSearch(pageNum);
  getStepNodeStateCountList({
    ...handleParamsData(params.value),
    clothesStepNodeState: '',
  });
};

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

// 监听路由变化
onMounted(() => {
  watch(
    () => route.query.componentName,
    () => {
      if (!isEmpty(route.query.componentName)) {
        init(params.value.pageNum);
      }
    },
    { immediate: true }
  );
});

</script>
