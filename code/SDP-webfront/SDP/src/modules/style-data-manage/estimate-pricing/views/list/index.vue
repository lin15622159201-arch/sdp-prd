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
        @change="init()"
      />
      <sc-search-area
        v-model="params"
        label-width="120"
        @handleSearch="init()"
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
        <!-- 核价师 -->
        <template #pricerId>
          <UserSelect
            v-model="params.pricerId"
            clearable
          />
        </template>
        <!-- 开发人 -->
        <template #developer>
          <UserSelect
            v-model="params.developer"
            clearable
          />
        </template>
        <!-- 供应商 -->
        <!-- <template #supplierId>
          <UserSelect
            v-model="params.supplierId"
            clearable
          />
        </template> -->
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
        <!-- 品类 -->
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
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex clear-form-margin">
        <el-form-item label="款式类型：">
          <radio-checkbox
            v-model="params.styleType"
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
      </div>
    </template>
    <template #main>
      <sc-table
        height="100%"
        :data="tableData"
        :columns="tableColumns"
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
import { computed, ref, reactive, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from '../../hooks/use-search';
import { useListColumns } from '../../hooks/use-table-columns';
import { estimateCheckPricePage, estimateCheckPriceCountState } from '../../api';
import UserSelect from '@/components/user-select';
import DesignerSelect from '@/components/designer-select';
import {
  IEstimateCheckPriceCountStateRes,
  IEstimateCheckPricePageResListItem,
  IEstimateCheckPricePageReq
} from '../../api/types';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import {
  REMARK_BIZ_TYPE_ENUMS,
  LOG_BIZ_TYPE_ENUMS,
  CLOTHES_CENTER_SEARCH_KEY
} from '@/modules/clothes-center/constant';
import { postExceptionLogApi } from '@/modules/exception-manage/exception-handle/api';
import { ILogListRes } from '@/modules/exception-manage/exception-handle/api/type';
import {
  STYLE_TYPE_LIST,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM,
  CHECK_PRICE_STATE_LIST,
  CLOTHES_CHECK_PRICESTATE_ENUM
} from '../../constant';
import NP from 'number-precision';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { handleTimeConsuming } from '@/core/utils/format';

interface ITabItem {
  label: string;
  value: string;
  count?: string;
  countKey?: string;
}

const { searchConfig, pimsCategory, pimsCategoryProps } = useSearch();

const stateInfo = ref<IEstimateCheckPriceCountStateRes>([]);

const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<IEstimateCheckPricePageReq>({
  request: {
    api: estimateCheckPricePage,
    params: {
      supplierId: '',
      supplierName: '',
      developer: '',
      supplierStyle: '',
      categoryName: [],
      priceCreatedTimeStart: '',
      priceCreatedTimeEnd: '',
      timeConsumingStart: '',
      timeConsumingEnd: '',
      timeConsumingType: TIME_CONSUMING_TYPE_ENUM.HOUR,
      isCraft: '',
      skcType: '',
      designCode: '',
      styleCode: '',
      designerIdList: [],
      designerGroupCodeList: [],
      pricerId: '',
      clothesCheckPriceState: CLOTHES_CHECK_PRICESTATE_ENUM.WAIT_CHECK_PRICE,
      auditPass: '',
      styleType: '',
      finishTimeStart: '',
      finishTimeEnd: '',
      pageNum: 1,
      pageSize: 20,
      personal: false,
    },
    handleParams: (paramsObj) => {
      const timeParams = {
        ...handleTimeConsuming(paramsObj.timeConsumingType, paramsObj.timeConsumingStart, paramsObj.timeConsumingEnd),
      };
      delete paramsObj.timeConsumingType;
      delete paramsObj.timeConsumingStart;
      delete paramsObj.timeConsumingEnd;
      return {
        ...paramsObj,
        ...timeParams,
        categoryName: paramsObj.categoryName.join('-')
      };
    },
    handleCustomReset: (p, defaultObj) => {
      return {
        ...defaultObj,
        clothesCheckPriceState: p.clothesCheckPriceState,
        personal: p.personal,
      };
    }
  },
});

const getStateStat = async () => {
  const { data } = await estimateCheckPriceCountState({ ...params.value });
  stateInfo.value = data;
};

// 操作日志
const drawer = reactive<{ visible: boolean; data: ILogListRes; }>({
  visible: false,
  data: [] as ILogListRes,
});
/* remark */
useTableDataMapRemark<IEstimateCheckPricePageResListItem>(
  tableData,
  'estimateCheckPriceId',
  REMARK_BIZ_TYPE_ENUMS.ESTIMATE_PEICING,
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
        bizType: LOG_BIZ_TYPE_ENUMS.ESTIMATE_CHECK_PRICE
      });
      drawer.data = data || [];
      drawer.visible = true;
    } catch (e) {
      console.error('handleOperateLog error', e);
    }
  }
});

const tabList = computed<ITabItem[]>((): ITabItem[] => {
  const list = CHECK_PRICE_STATE_LIST.map(v => ({
    ...v,
    count: stateInfo.value.find(it => it.state === v.state)?.count || '0'
  }));
  const totalCount = list.reduce((prev, cur) => NP.plus(prev, Number(cur.count)), 0);
  return [
    { value: '' as CLOTHES_CHECK_PRICESTATE_ENUM, label: '全部', count: String(totalCount) },
    ...list
  ];
});

const init = (pageNum?: number) => {
  handleSearch(pageNum);
  getStateStat();
};

const resetSearch = () => {
  handleReset();
  getStateStat();
};

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

onMounted(() => {
  init(params.value.pageNum);
});
</script>

<style lang="scss">
.times {
  .el-select__wrapper {
    border-radius: 0
  }
}
</style>
