<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.personal" @change='init()'>
        <el-radio-button :value="false">全部</el-radio-button>
        <el-radio-button :value="true">我的</el-radio-button>
      </el-radio-group>
      <Tabs
        v-model="activeName"
        :config="config"
        :border="false"
        class="tw-pb-15px"
        :font-size="15"
        @change="handleTabChange"
      />
      <sc-search-area
        v-model="params"
        label-width="70"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      >
        <template #roomIdList>
          <ClothingRoomSelect
            v-model="params.roomIdList"
            clearable
            multiple
          />
        </template>
        <template #styleTypeNames>
          <el-cascader
            v-model="params.styleTypeNames"
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
import { computed, PropType, ref, watch, reactive, onMounted } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import {
  ALLOCATE_STATE_ENUM,
  STYLE_INFO_RECEIVING_ENUM,
  STYLE_INFO_STATE_ENUM,
  REMARK_BIZ_TYPE_ENUMS
} from '@/modules/style-data-manage/large/constant';
import ClothingRoomSelect from '@/components/clothing-room-select';
import { useRoute } from 'vue-router';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import {
  IStyleInfoStatisticsRes, IStyleInfoPageResListItem,
  IOrderInfoLogProdLogsByCodeRes,
  IStyleInfoPageReq
} from '@/modules/style-data-manage/large/api/types';
import { orderInfoLogProdLogsByCode, styleInfoPage } from '@/modules/style-data-manage/large/api';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import {
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { CLOTHES_CENTER_SEARCH_KEY } from '@/modules/clothes-center/constant';
import { handleTimeConsuming } from '@/core/utils/format';

const route = useRoute();

const props = defineProps({
  stateInfo: {
    type: Object as PropType<IStyleInfoStatisticsRes>,
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

const { searchConfig, pimsCategory, pimsCategoryProps } = useSearch();
const activeName = ref('receiving');

const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<IStyleInfoPageReq>({
  request: {
    api: styleInfoPage,
    params: {
      designCode: '',
      styleCodeLike: '',
      styleInfoReceiving: STYLE_INFO_RECEIVING_ENUM.NO,
      state: STYLE_INFO_STATE_ENUM.WAITING,
      // styleTypeNames: [],
      allocateState: ALLOCATE_STATE_ENUM.OUTSIDE,
      roomIdList: [],
      createStart: '',
      createEnd: '',
      submitStart: '',
      submitEnd: '',
      timeConsumingStart: '',
      timeConsumingEnd: '',
      timeConsumingType: TIME_CONSUMING_TYPE_ENUM.HOUR,
      pageNum: 1,
      pageSize: 20,
      personal: false,
    },
    handleParams: (paramsObj) => {
      emits('updateCount');
      if (activeName.value === 'receiving') {
        paramsObj.styleInfoReceiving = STYLE_INFO_RECEIVING_ENUM.NO;
      } else {
        paramsObj.styleInfoReceiving = STYLE_INFO_RECEIVING_ENUM.YES;
        if (activeName.value === 'waiting') {
          paramsObj.state = STYLE_INFO_STATE_ENUM.WAITING;
        } else {
          paramsObj.state = STYLE_INFO_STATE_ENUM.SUBMITED;
        }
      }
      const timeParams = {
        ...handleTimeConsuming(paramsObj.timeConsumingType!, paramsObj.timeConsumingStart, paramsObj.timeConsumingEnd),
      };
      delete paramsObj.timeConsumingType;
      delete paramsObj.timeConsumingStart;
      delete paramsObj.timeConsumingEnd;
      return {
        ...paramsObj,
        ...timeParams,
        styleTypeNames: paramsObj.styleTypeNames?.map((v: any) => {
          return v.join('-');
        }) || []
      };
    },
    handleCustomReset(p, defaultParams) {
      return {
        ...defaultParams,
        personal: p.personal,
        state: p.state,
      };
    }
  },
});

// 操作日志
const drawer = reactive<{ visible: boolean; data: IOrderInfoLogProdLogsByCodeRes; }>({
  visible: false,
  data: [] as IOrderInfoLogProdLogsByCodeRes,
});
/* remark */
useTableDataMapRemark<IStyleInfoPageResListItem>(
  tableData,
  'styleInfoId',
  REMARK_BIZ_TYPE_ENUMS.PRO,
  'remark',
  '' as any,
  'bigBatchListApi'
);
const { tableColumns } = useListColumns({
  activeName,
  reloadFn: () => {
    handleSearch();
  },
  handleOperateLog: async (bizCode: string) => {
    try {
      const { data = [] } = await orderInfoLogProdLogsByCode({ bizCode });
      drawer.data = data || [];
      drawer.visible = true;
    } catch (e) {
      console.error('handleOperateLog error', e);
    }
  }
});

const config = computed(() => {
  return [
    {
      label: '待接单',
      value: 'receiving',
      count: props.stateInfo?.externalUnReceivingCount ?? '0'
    },
    {
      label: '待提交',
      value: 'waiting',
      count: props.stateInfo?.externalUnSubCount ?? '0'
    },
    {
      label: '已提交',
      value: 'submited',
      count: props.stateInfo?.externalSubCount ?? '0'
    },
  ];
});
const handleTabChange = () => {
  handleSearch(1);
};

const init = async (pageNum?: number) => {
  const state = route.query?.state as STYLE_INFO_STATE_ENUM;
  activeName.value = state || 'receiving';
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
