<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.personal" @change='init()'>
        <el-radio-button :value="false">全部</el-radio-button>
        <el-radio-button :value="true">我的</el-radio-button>
      </el-radio-group>
      <Tabs
        v-model="params.clothesCheckPriceState"
        :config="tabList"
        :border="false"
        class="tw-pb-15px"
        :font-size="15"
        @change="handleSearch(1)"
      />
      <sc-search-area
        v-model="params"
        label-width="120"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
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
        <!-- 核价师 -->
        <template #pricerId>
          <UserSelect
            v-model="params.pricerId"
            clearable
          />
        </template>
        <!-- 款式品类 -->
        <template #categoryName>
          <el-cascader
            v-model="params.categoryName"
            :options="pimsCategory"
            collapse-tags
            class='tw-w100%'
            show-all-levels
            :props="pimsCategoryProps"
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
      <div class="tw-flex tw-justify-between">
        <div class="tw-flex">
          <el-form-item label="款式类型：">
            <radio-checkbox
              v-model="params.skcType"
              :options="STYLE_TYPE_LIST"
              @change="handleSearch(1)"
            />
          </el-form-item>
          <!-- <el-form-item label="二次工艺：">
          <radio-checkbox
            v-model="params.isCraft"
            :options="YES_OR_NO_NUMBER_LIST"
            @change="handleSearch(1)"
          />
        </el-form-item> -->
          <el-form-item label="审版通过：">
            <radio-checkbox
              v-model="params.auditPass"
              :options="YES_OR_NO_NUMBER_LIST"
              @change="handleSearch(1)"
            />
          </el-form-item>
          <el-form-item label="待更新：">
            <radio-checkbox
              v-model="params.isUpdate"
              :options="YES_OR_NO_NUMBER_LIST"
              @change="handleSearch(1)"
            />
          </el-form-item>
        </div>
        <el-button
          type="primary"
          @click="handleExport"
          v-if="DC && params.clothesCheckPriceState === CLOTHES_CHECK_PRICESTATE_ENUM.HAD_CHECK_PRICE"
          :disabled="!selectedList.length || selectedList.length > 1"
        >
          导出生产核价表
        </el-button>
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
    <!--操作日志-->
    <operation-log-drawer v-model="drawer.visible" :data="drawer.data" />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import { CheckPriceCountState, checkPricePage, checkPriceExportBill } from '../../api';
import { ICheckPricePageResListItem, IEstimateCheckPriceCountStateRes, ICheckPricePageReq } from '../../api/types';
import { STYLE_TYPE_LIST, CLOTHES_CHECK_PRICESTATE_ENUM } from '../../../constant';
import UserSelect from '@/components/user-select';
import DesignerSelect from '@/components/designer-select';
import { STATE_ENUM } from '../../constant';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { ILogListRes } from '@/modules/exception-manage/exception-handle/api/type';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import {
  REMARK_BIZ_TYPE_ENUMS,
  LOG_BIZ_TYPE_ENUMS,
  CLOTHES_CENTER_SEARCH_KEY
} from '@/modules/clothes-center/constant';
import { postExceptionLogApi } from '@/modules/exception-manage/exception-handle/api';
import { usePermissionConfig } from '../../use-permission-config';
import {
  YES_OR_NO_NUMBER_LIST,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { handleTimeConsuming } from '@/core/utils/format';
import NP from 'number-precision';

interface ITabItem {
  label: string;
  value: CLOTHES_CHECK_PRICESTATE_ENUM;
  state: STATE_ENUM;
  count?: string;
}

const { DC } = usePermissionConfig();
const { searchConfig, pimsCategory, pimsCategoryProps } = useSearch();

const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<ICheckPricePageReq>({
  request: {
    api: checkPricePage,
    params: {
      skcType: '',
      designCode: '',
      styleCode: '',
      designerIdList: [],
      designerGroupCodeList: [],
      pricerId: '',
      clothesCheckPriceState: CLOTHES_CHECK_PRICESTATE_ENUM.WAIT_CHECK_PRICE,
      categoryName: [],
      isUpdate: '',
      countCreatedTimeStart: '',
      countCreatedTimeEnd: '',
      finishTimeStart: '',
      finishTimeEnd: '',
      timeConsumingStart: '',
      timeConsumingEnd: '',
      timeConsumingType: TIME_CONSUMING_TYPE_ENUM.HOUR,
      pageNum: 1,
      pageSize: 20,
      personal: false,
    },
    handleParams: (paramsObj) => {
      const { ...rest } = paramsObj;
      const timeParams = {
        ...handleTimeConsuming(rest.timeConsumingType!, rest.timeConsumingStart, rest.timeConsumingEnd),
      };
      delete rest.timeConsumingType;
      delete rest.timeConsumingStart;
      delete rest.timeConsumingEnd;
      return {
        ...rest,
        ...timeParams,
        categoryName: rest.categoryName.join('-'),
      };
    },
    handleCustomReset: (p, defaultParams) => {
      return {
        ...defaultParams,
        clothesCheckPriceState: p.clothesCheckPriceState,
        personal: p.personal,
      };
    }
  },
});

// 操作日志
const drawer = reactive<{ visible: boolean; data: ILogListRes; }>({
  visible: false,
  data: [] as ILogListRes,
});
/* remark */
useTableDataMapRemark<ICheckPricePageResListItem>(
  tableData,
  'checkPriceId',
  REMARK_BIZ_TYPE_ENUMS.STYLE_PEICING,
  'remark',
);
const { tableColumns } = useListColumns({
  reloadFn: () => {
    handleSearch();
  },
  handleOperateLog: async (bizCode: string) => {
    try {
      const { data = [] } = await postExceptionLogApi({
        bizCode,
        bizTypes: [Number(LOG_BIZ_TYPE_ENUMS.CHECK_COUNT), Number(LOG_BIZ_TYPE_ENUMS.CHECK_PRICE)],
        containSampleClothesLog: true,
      });
      drawer.data = data || [];
      drawer.visible = true;
    } catch (e) {
      console.error('handleOperateLog error', e);
    }
  }
});

const TAB_LIST: ITabItem[] = [
  {
    value: CLOTHES_CHECK_PRICESTATE_ENUM.WAIT_CHECK_PRICE,
    label: '待核价',
    state: STATE_ENUM.WAIT_CHECK_PRICE,
  },
  {
    value: CLOTHES_CHECK_PRICESTATE_ENUM.HAD_CHECK_PRICE,
    label: '已核价',
    state: STATE_ENUM.HAD_CHECK_PRICE,
  },
];

const stateCountInfo = ref<IEstimateCheckPriceCountStateRes>([]);
const tabList = computed(() => {
  const list = TAB_LIST.map(v => ({
    ...v,
    count: stateCountInfo.value.find(it => it.state === v.state)?.count || '0'
  }));
  const totalCount = list.reduce((prev, cur) => NP.plus(prev, Number(cur.count)), 0);
  return [
    { value: '' as CLOTHES_CHECK_PRICESTATE_ENUM, label: '全部', count: String(totalCount) },
    ...list
  ];
});

const getStateStat = async () => {
  const { data } = await CheckPriceCountState();
  stateCountInfo.value = data || [];
};

const selectedList = ref<ICheckPricePageResListItem[]>([]);
const handleSelectionChange = (rows: ICheckPricePageResListItem[]) => {
  selectedList.value = rows;
};
// 导出
const handleExport = () => {
  checkPriceExportBill({
    checkPriceId: selectedList.value[0].checkPriceId!
  });
};

const init = (pageNum?: number) => {
  getStateStat();
  handleSearch(pageNum);
};

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

onMounted(() => {
  init(params.value.pageNum);
});

</script>
