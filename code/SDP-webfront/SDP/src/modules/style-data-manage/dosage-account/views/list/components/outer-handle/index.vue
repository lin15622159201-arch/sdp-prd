<template>
  <sc-app-page :laside="{ style: 'width: 180px' }">
    <template #fheader>
      <el-radio-group
        v-model="params.personal"
        class="tw-pb-15px"
        @change="handleSearch()"
      >
        <el-radio-button
          :value="false"
        >
          全部
        </el-radio-button>
        <el-radio-button
          :value="true"
        >
          我的
        </el-radio-button>
      </el-radio-group>
      <Tabs
        :config="config"
        :border="false"
        class="tw-pb-15px"
        :font-size="15"
        v-model="activeConfig"
        @change="handleSearch()"
      />
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='75px'
        @handleSearch="handleSearch"
        @handle-reset="handleReset"
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
        <template #roomIdList>
          <query-select
            v-model="params.roomId"
            placeholder='请输入'
            :method="getMakeRooms"
            clearable
            :needInitSearch="true"
            :config="{
              labelKey: 'makerOrRoomName',
              valueKey: 'makerOrRoomId',
              keywordQueryKey: 'makerOrRoom',
              valueQueryKey: 'makerOrRoom',
              dataKey: 'data.list',
            }"
            :query-params="{
              allocateState: ROOM_ALLOCATE_STATE.OUTER
            }"
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
    <template #laside>
      <slot name="laside" />
    </template>
    <template #header>
      <HeaderArea class="clear-form-margin">
        <div class='tw-flex tw-flex-wrap tw-gap-10px'>
          <radio-checkbox
            label="款式类型："
            v-model="params.skcType"
            :options="SKC_TYPE_LIST"
            @change="handleSearch()"
          />
          <radio-checkbox
            label="待更新："
            v-model="params.isUpdate"
            :options="YES_NO_LIST"
            @change="handleSearch()"
          />
        </div>
      </HeaderArea>
    </template>
    <template #main>
      <sc-table
        :columns="columns"
        :data="tableData"
        :table-loading="tableLoading"
        height="100%"
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
          :size="params.pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </template>
    <operation-drawer
      v-model="drawer.visible"
      :request="postExceptionLogApi"
      :config="{
        timeKey: 'createdTime',
        userKey: 'creatorName',
        contentKey: 'content',
        // 不显示remark
        remarkKey: 'string',
      }"
      :requestParams="drawer.params"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { IListItem, IParams } from './types';
import DesignerSelect from '@/components/designer-select';
import { useColumns } from './hooks/use-columns';
import { SKC_TYPE_LIST } from '@/modules/design-center/style-manage/constant';
import { getDosageList, getMakeRooms } from '@/modules/style-data-manage/dosage-account/api';
import {
  YES_NO_ENUM,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM,
  YES_NO_LIST
} from '@/constant';
import { IGetCheckCountStatisticsRes } from '@/modules/style-data-manage/dosage-account/api/types';
import { useAccountStore } from '@/store/account';
import { CHECK_COUNT_STATE_ENUM, ROOM_ALLOCATE_STATE } from '@/modules/style-data-manage/dosage-account/constant';
import { CONFIG_TYPE_ENUM } from './constant';
import {
  CLOTHES_CENTER_SEARCH_KEY,
  LOG_BIZ_TYPE_ENUMS,
  REMARK_BIZ_TYPE_ENUMS
} from '@/modules/clothes-center/constant';
import { useTableDataMapBizRemark } from '../../hooks/use-map-remark';
import { remarkAdd } from '@/modules/clothes-center/api';
import { postExceptionLogApi } from '@/modules/exception-manage/exception-handle/api';
import { ILogListReq } from '@/modules/exception-manage/exception-handle/api/type';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { handleTimeConsuming } from '@/core/utils/format';

const activeConfig = ref(CONFIG_TYPE_ENUM.WAIT_ACCEPTING);
const props = defineProps({
  stateCount: {
    type: Object as PropType<IGetCheckCountStatisticsRes>
  },
});
const emits = defineEmits(['getStateCount']);
const config = computed(() => {
  console.log('props.stateCount', props.stateCount);

  return [
    {
      label: `待接单(${props.stateCount?.externalUnReceivingCount || '0'})`,
      value: CONFIG_TYPE_ENUM.WAIT_ACCEPTING,
      params: {
        checkCountReceiving: YES_NO_ENUM.NO,
        isAllocated: YES_NO_ENUM.YES,
      },
    },
    {
      label: `待核算(${props.stateCount?.externalUncheckedCount || '0'})`,
      value: CONFIG_TYPE_ENUM.WAIT_CALCULATE,
      params: {
        checkCountReceiving: YES_NO_ENUM.YES,
        checkCountState: CHECK_COUNT_STATE_ENUM.WAIT_CALCULATE,
        isAllocated: YES_NO_ENUM.YES,
      },
    },
    {
      label: `已核算(${props.stateCount?.externalCheckedCount || '0'})`,
      value: CONFIG_TYPE_ENUM.CALCULATE,
      params: {
        checkCountReceiving: YES_NO_ENUM.YES,
        checkCountState: CHECK_COUNT_STATE_ENUM.CALCULATED,
        isAllocated: YES_NO_ENUM.YES,
      },
    },
  ];
});
const { searchConfig } = useSearch();
const accountStore = useAccountStore();
const {
  params,
  tableTotal,
  tableData,
  tableLoading,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<IParams>({
  request: {
    api: getDosageList,
    params: {
      roomId: '',
      personal: false,
      styleCode: '',
      designCode: '',
      isOutsourced: YES_NO_ENUM.YES,
      countCreatedTimeStart: '',
      countCreatedTimeEnd: '',
      finishTimeStart: '',
      finishTimeEnd: '',
      timeConsumingStart: '',
      timeConsumingEnd: '',
      timeConsumingType: TIME_CONSUMING_TYPE_ENUM.HOUR,
      pageNum: 1,
      pageSize: 20,
    },
    handleParams(custom) {
      const { roomId, ...rest } = custom;
      emits('getStateCount');
      const timeParams = {
        ...handleTimeConsuming(rest.timeConsumingType!, rest.timeConsumingStart, rest.timeConsumingEnd),
      };
      delete rest.timeConsumingType;
      delete rest.timeConsumingStart;
      delete rest.timeConsumingEnd;
      return {
        ...rest,
        roomIdList: roomId ? [roomId] : [],
        ...config.value.find(v => v.value === activeConfig.value)?.params,
        ...timeParams,
      };
    },
    handleCustomReset(p, defaultParams) {
      return {
        ...defaultParams,
        personal: p.personal,
        isOutsourced: p.isOutsourced,
      };
    }
  },
});
// 同步 remark
useTableDataMapBizRemark(
  tableData,
  'checkCountId',
  REMARK_BIZ_TYPE_ENUMS.DOSAGE_ACCOUNT,
  'remark',
);
// 操作日志
const drawer = ref({
  visible: false,
  params: {
    bizCode: '',
    bizType: LOG_BIZ_TYPE_ENUMS.CHECK_COUNT,
    containSampleClothesLog: true,
  } as ILogListReq,
});

const { columns } = useColumns({
  activeConfig,
  async handleCreateRecord(
    row: IListItem,
    remark: string,
  ) {
    const { checkCountId } = row;
    await remarkAdd({
      bizId: checkCountId,
      bizType: REMARK_BIZ_TYPE_ENUMS.DOSAGE_ACCOUNT,
      remark,
    });
    await handleSearch();
  },
  handleOperateLog(bizId) {
    drawer.value.params.bizCode = bizId;
    drawer.value.visible = true;
  },
});

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

onMounted(() => {
  handleSearch(params.value.pageNum);
});

</script>
