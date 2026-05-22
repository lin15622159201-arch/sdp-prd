<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.personal" @change="init(1)">
        <el-radio-button label="全部" :value="false" />
        <el-radio-button label="我的" :value="true" />
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
        <template #craftTypeList>
          <el-cascader
            v-model="params.craftTypeList"
            :options="craftTypeList"
            :props="{
              value: 'label',
              label: 'label',
            }"
            clearable
            style="width:100%"
          />
        </template>
        <template #timeConsumingStart>
          <div class="tw-flex tw-items-center">
            <input-number
              v-model="params.timeConsumingStart"
              :precision="0"
              :min="0"
              clearable
              class="tw-flex-1"
              @change="handleChangeTimeConsuming"
            />
            <span class="tw-mx[5px]">至</span>
            <input-number
              v-model="params.timeConsumingEnd"
              :disabled="params.timeConsumingStart === ''"
              :precision="0"
              :min="0"
              clearable
              class="tw-flex-1"
              @change="handleChangeTimeConsuming"
            />
            <span class="tw-ml[5px]">小时</span>
          </div>
        </template>
        <template #craftsProcessCode>
          <el-select
            v-model="params.craftsProcessCode"
            placeholder="请选择工艺环节"
            style="width: 100%;"
            clearable
          >
            <el-option
              v-for="item of secondCraftNodeList"
              :key="item.value"
              :value="item.valueCode"
              :label="item.value"
            />
          </el-select>
        </template>
        <template #clothesVersion>
          <input-number
            v-model="params.clothesVersion"
            placeholder="请输入样衣版本"
            :precision="0"
            :min="1"
            clearable
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex tw-mb[10px]">
        <!-- 工艺补充 -->
        <el-button
          v-if="GYBC
            && params.state === CURRENT_NODE_ENUM.SUPPLEMENT_CRAFT"
          :disabled="multiSelectList.length !== 1
            || params.isCraftSupplement !== CRAFT_SUPPLEMENT_ENUM.TO_BE_SUPPLEMENT"
          type="primary"
          @click="handleCraftSupplement"
        >
          工艺补充
        </el-button>
      </div>
      <div class="tw-flex tw-flex-wrap">
        <el-form-item label="异常：" v-if="params.state !== CURRENT_NODE_ENUM.SUPPLEMENT_CRAFT">
          <radio-checkbox
            v-model="params.isAbnormal"
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

    <!-- 补充工艺 -->
    <CraftSupplementDialog
      :id="craftSupplementData.id"
      v-model:visible="craftSupplementData.visible"
      :crafts-require="craftSupplementData.craftsRequire"
      :dict-list="secondCraftNodeList"
      @confirm="init()"
    />
    <!-- 弹窗：加工订单详情 -->
    <ProcessDialog ref="processDiaRef" />
    <!--操作日志-->
    <operation-log-drawer v-model="drawer.visible" :data="drawer.data" />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { nextTick, ref, computed, reactive, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from '../hooks/use-search';
import { usePermissionConfig } from '../use-permission-config';
import { secondCraftStateStatistics, secondCraftList } from '../api';
import {
  ISecondCraftListReq,
  ISecondCraftListResListItem,
  ISecondCraftStateStatisticsResStateStatisticsListItem
} from '../api/types';
import {
  CURRENT_NODE_ENUM,
  CURRENT_NODE_LIST,
  CRAFT_SUPPLEMENT_ENUM,
  DEMAND_FIRST_TYPE,
} from '../constant';
import { YES_OR_NO_NUMBER_LIST, YES_NO_NUMBER_ENUM } from '@/constant';
import { useListColumns } from '../hooks/use-table-columns';
import CraftSupplementDialog from './craft-supplement-dialog.vue';
import DesignerSelect from '@/components/designer-select';
import { useOpsCascader } from '@/hooks-transfer/use-cascader';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import ProcessDialog from '@/modules/clothes-center/components/process-dialog/index.vue';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import {
  CLOTHES_CENTER_SEARCH_KEY,
  LOG_BIZ_TYPE_ENUMS,
  REMARK_BIZ_TYPE_ENUMS
} from '@/modules/clothes-center/constant';
import { ILogListReq, ILogListRes } from '@/modules/exception-manage/exception-handle/api/type';
import { postExceptionLogApi } from '@/modules/exception-manage/exception-handle/api';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { useAccountStore } from '@/store/account';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';

interface ITabItem {
  label: string;
  value: CURRENT_NODE_ENUM;
  count?: string;
}

const { GYBC } = usePermissionConfig();
const accountStore = useAccountStore();

// 状态统计
const tabList = ref<ITabItem[]>([
  { value: '' as CURRENT_NODE_ENUM, label: '全部' },
  ...CURRENT_NODE_LIST,
]);
// 所有的需求类型
const demandTypeList = useOpsCascader(DICTIONARY_KEY.PLM_DEMAND_TYPE);
// 工艺需求类型
const craftTypeList: any = computed(() => {
  return demandTypeList.value?.filter(item => item.value === DEMAND_FIRST_TYPE.CRAFTS) ?? [];
});

// plm_demand_type 工艺类型
const { batchDictListMap } = useDictionary([
  DICTIONARY_KEY.PLM_PROCESS_SEQUENCE,
  DICTIONARY_KEY.PLM_DEMAND_TYPE,
]);
// 二次工艺 - （工艺次序）
const secondCraftNodeList = computed(() => {
  return batchDictListMap.value?.[DICTIONARY_KEY.PLM_PROCESS_SEQUENCE]?.filter((item) => {
    return item.isEnable === YES_NO_NUMBER_ENUM.YES;
  }) ?? [];
});

const handleParams = (paramsObj: ISecondCraftListReq) => {
  const { personal, designerIdList } = paramsObj;
  // 不用取第一级
  const [, category1 = '', category2 = '', category3 = ''] = paramsObj?.craftTypeList ?? [];
  paramsObj.category1 = category1;
  paramsObj.category2 = category2;
  paramsObj.category3 = category3;
  delete paramsObj.craftTypeList;
  // 切换到 补充工艺 时，默认选中 环节状态待补充，切换走则去除
  if (paramsObj.state === CURRENT_NODE_ENUM.SUPPLEMENT_CRAFT) {
    if (params.value.isCraftSupplement === '') {
      params.value.isCraftSupplement = CRAFT_SUPPLEMENT_ENUM.TO_BE_SUPPLEMENT;
      paramsObj.isCraftSupplement = CRAFT_SUPPLEMENT_ENUM.TO_BE_SUPPLEMENT;
    }
  } else {
    params.value.isCraftSupplement = '';
    paramsObj.isCraftSupplement = '';
  }
  return {
    ...paramsObj,
    designerIdList: personal ? [accountStore.account?.id!] : designerIdList,
    showCancel: paramsObj.state === ''
      ? undefined
      : [
        CURRENT_NODE_ENUM.BEING_CLOSED,
        CURRENT_NODE_ENUM.BEING_PROCESSED,
      ].includes(paramsObj.state as CURRENT_NODE_ENUM)
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
    api: secondCraftList,
    params: {
      personal: false,
      state: '',
      designCode: '',
      craftTypeList: [],
      currentStateCreatedTime: [],
      timeConsumingStart: '',
      timeConsumingEnd: '',
      designerIdList: [],
      designerGroupCodeList: [],
      craftsProcessCode: '',
      cancelPreState: '',
      clothesVersion: '',
      undertakeType: '',
      sampleTypeList: [],
      isUrgent: '',
      isAbnormal: '',
      extendReferType: '',
      isChange: '',
      isReference: '',
      waveBandCodeList: [],
      pageNum: 1,
      pageSize: 20,
      showCancel: undefined,
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
const { searchConfig } = useSearch({ params });
const processDiaRef = ref();

// 操作日志
const drawer = reactive<{ visible: boolean; data: ILogListRes; }>({
  visible: false,
  data: [] as ILogListRes,
});
const { tableColumns } = useListColumns({
  params,
  reloadFn: () => {
    init();
  },
  viewProcessOrder: (row) => {
    processDiaRef.value.open(row);
  },
  handleOperateLog: async (secondCraftId: string) => {
    try {
      const param: ILogListReq = {
        bizId: secondCraftId,
        bizType: LOG_BIZ_TYPE_ENUMS.SECOND_CRAFT,
      };
      const { data = [] } = await postExceptionLogApi(param);
      drawer.data = data || [];
      drawer.visible = true;
    } catch (e) {
      console.error('handleOperateLog error', e);
    }
  }
});

// 多选
const multiSelectList = ref<ISecondCraftListResListItem[]>([]);
const handleSelectionChange = (list: ISecondCraftListResListItem[]) => {
  multiSelectList.value = list;
};

// 工艺补充
const craftSupplementData = reactive({
  id: '',
  visible: false,
  craftsRequire: '' as string, // 裁前100、裁后110
});
const handleCraftSupplement = () => {
  const [item] = multiSelectList.value;
  craftSupplementData.id = item?.secondCraftId ?? '';
  craftSupplementData.craftsRequire = item?.craftsRequire ?? '';
  craftSupplementData.visible = true;
};

const handleChangeTimeConsuming = () => {
  const start = params.value.timeConsumingStart!;
  const end = params.value.timeConsumingEnd;
  if (!start.trim()) {
    params.value.timeConsumingEnd = '';
  }
  if (start && end && Number(start) > Number(end)) {
    [
      params.value.timeConsumingStart,
      params.value.timeConsumingEnd,
    ] = [
      params.value.timeConsumingEnd,
      params.value.timeConsumingStart,
    ];
  }
};

const getStateStat = async () => {
  const { data } = await secondCraftStateStatistics({
    ...handleParams(params.value),
    state: '',
  });
  tabList.value.forEach((item) => {
    const obj = data?.stateStatisticsList?.find((it: ISecondCraftStateStatisticsResStateStatisticsListItem) => {
      // 已处理、已关闭、已审核不展示
      return ![
        CURRENT_NODE_ENUM.BEING_PROCESSED,
        CURRENT_NODE_ENUM.TO_WAIT_CHECK,
        CURRENT_NODE_ENUM.BEING_CLOSED,
      ].includes(item.value) && it.secondCraftDemandState === item.value;
    });
    if (obj) {
      item.count = obj?.quantity ?? '0';
    }
  });
  tabList.value[0].count = data?.totalQuantity ?? '0';
};

const resetSearch = () => {
  handleReset();
  getStateStat();
};

/* remark */
useTableDataMapRemark<ISecondCraftListResListItem>(
  tableData,
  'secondCraftId',
  REMARK_BIZ_TYPE_ENUMS.SECOND_CRAFT,
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
