<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.personal" @change='init()'>
        <el-radio-button :value="false">全部</el-radio-button>
        <el-radio-button :value="true">我的</el-radio-button>
      </el-radio-group>
      <Tabs
        v-model="params.isAllocated"
        :config="tabList"
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
        <!-- 分单员 -->
        <template #allocateeIdList>
          <UserSelect
            v-model="params.allocateeIdList"
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
    <template #header>
      <el-button
        v-if="params.isAllocated === STYLE_INFO_IS_ALLOCATED_ENUM.NO && FD"
        type="primary"
        @click="() => handleOpenDialog(selectionList.map(item => item.styleInfoId))"
        :disabled="!selectionList.length"
      >
        分单
      </el-button>
      <el-button
        v-if="params.isAllocated === STYLE_INFO_IS_ALLOCATED_ENUM.YES && CH"
        type="primary"
        :disabled="!selectionList.length"
        @click="handleRecall"
      >
        撤回
      </el-button>
    </template>
    <template #main>
      <sc-table
        height="100%"
        :data="tableData"
        :columns="tableColumns"
        @selection-change="handleSelectChange"
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
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import {
  STYLE_INFO_IS_ALLOCATED_LIST,
  STYLE_INFO_IS_ALLOCATED_ENUM,
  STYLE_INFO_STATE_ENUM,
  REMARK_BIZ_TYPE_ENUMS
} from '@/modules/style-data-manage/large/constant';
import { useAllocateDialog } from './hooks/use-allocate-dialog';
import { computed, PropType, ref, watch, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import UserSelect from '@/components/user-select';
import ClothingRoomSelect from '@/components/clothing-room-select';
import { useRoute } from 'vue-router';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import {
  IOrderInfoLogProdLogsByCodeRes,
  IStyleInfoStatisticsRes, IStyleInfoPageResListItem,
  IStyleInfoPageReq
} from '@/modules/style-data-manage/large/api/types';
import { orderInfoLogProdLogsByCode, styleInfoPage, styleInfoBack } from '@/modules/style-data-manage/large/api';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import { usePermissionConfig } from '@/modules/style-data-manage/large/use-permission-config';
import {
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { CLOTHES_CENTER_SEARCH_KEY } from '@/modules/clothes-center/constant';
import { handleTimeConsuming } from '@/core/utils/format';

const route = useRoute();
const { FD, CH } = usePermissionConfig();

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
      isAllocated: STYLE_INFO_IS_ALLOCATED_ENUM.NO,
      styleCodeLike: '',
      styleTypeNames: [],
      allocateeIdList: [],
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
    handleCustomReset: (p, defaultParams) => {
      return {
        ...defaultParams,
        isAllocated: p.isAllocated,
        personal: p.personal,
      };
    }
  },
});

const { searchConfig, pimsCategory, pimsCategoryProps } = useSearch({
  params
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
  params,
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

const selectionList = ref<IStyleInfoPageResListItem[]>([]);
const handleSelectChange = (list: IStyleInfoPageResListItem[]) => {
  selectionList.value = list;
};

const { handleOpenDialog } = useAllocateDialog({
  reloadFn: () => {
    emits('updateCount');
    handleSearch(params.value.pageNum);
  },
});

// 撤回
const handleRecall = async () => {
  // 点击后判断对应分单数据是否为已提交状态，若是则提示；存在已完成的数据，不可撤回
  const hasSubmited = selectionList.value.some(item => item.state === STYLE_INFO_STATE_ENUM.SUBMITED);
  if (hasSubmited) {
    ElMessage.error('存在已提交的分单数据，不可撤回');
    return;
  }
  await styleInfoBack(selectionList.value.map(item => item.styleInfoId));
  ElMessage.success('撤回成功');
  emits('updateCount');
  handleSearch(params.value.pageNum);
};

const tabList = computed(() => {
  return STYLE_INFO_IS_ALLOCATED_LIST.map((item) => {
    return {
      ...item,
      count: (props.stateInfo as any)?.[item.countKey] || '0',
    };
  });
});

const handleTabChange = () => {
  handleSearch(1);
};

const init = async (pageNum?: number) => {
  handleSearch(pageNum);
};

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

// 监听路由变化
onMounted(() => {
  watch(
    () => route.query.componentName,
    () => {
      init(params.value.pageNum);
    },
    { immediate: true }
  );
});

</script>
