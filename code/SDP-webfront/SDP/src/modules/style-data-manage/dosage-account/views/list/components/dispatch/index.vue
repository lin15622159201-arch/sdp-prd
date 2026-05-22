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
        v-model="params.isAllocated"
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
        <template #allocateeIdList>
          <UserSelect
            v-model="params.allocateeIdList"
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
          <!-- <radio-checkbox
            label="二次工艺："
            v-model="params.isCraft"
            :options="YES_NO_LIST"
            @change="handleSearch()"
          /> -->
          <radio-checkbox
            label="款式类型："
            v-model="params.skcType"
            :options="SKC_TYPE_LIST"
            @change="handleSearch()"
          />
        </div>
        <template #button>
          <el-button
            type="primary"
            :disabled="selectedList.length === 0"
            v-if="params.isAllocated === YES_NO_ENUM.NO && FD"
            @click="handleDispatch(selectedList.map(v => v.checkCountId))"
          >
            分单
          </el-button>
          <el-button
            type="primary"
            v-if="params.isAllocated === YES_NO_ENUM.YES && CH"
            :disabled="selectedList.length === 0"
            @click="handleBackDispatch()"
          >
            撤回
          </el-button>
        </template>
      </HeaderArea>
    </template>
    <template #main>
      <sc-table
        :columns="columns"
        :data="tableData"
        :table-loading="tableLoading"
        height="100%"
        @selectionChange="onSelectionChange"
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
import UserSelect from '@/components/user-select';
import { useSearch } from './hooks/use-search';
import { IListItem, IParams } from './types';
import DesignerSelect from '@/components/designer-select';
import { useColumns } from './hooks/use-columns';
import { useDispatch } from './hooks/use-dispatch';
import { SKC_TYPE_LIST } from '@/modules/design-center/style-manage/constant';
import { checkCountBack, getDosageList } from '@/modules/style-data-manage/dosage-account/api';
import {
  YES_NO_ENUM,
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';
import { ALLOCATE_STATE_ENUM } from '@/modules/style-data-manage/dosage-account/constant';
import { IGetCheckCountStatisticsRes } from '@/modules/style-data-manage/dosage-account/api/types';
import { useAccountStore } from '@/store/account';
import { remarkAdd } from '@/modules/clothes-center/api';
import {
  CLOTHES_CENTER_SEARCH_KEY,
  LOG_BIZ_TYPE_ENUMS,
  REMARK_BIZ_TYPE_ENUMS
} from '@/modules/clothes-center/constant';
import { useTableDataMapBizRemark } from '../../hooks/use-map-remark';
import { postExceptionLogApi } from '@/modules/exception-manage/exception-handle/api';
import { ILogListReq } from '@/modules/exception-manage/exception-handle/api/type';
import { ElMessage } from 'element-plus';
import { usePermissionConfig } from '@/modules/style-data-manage/dosage-account/use-permission-config';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { handleTimeConsuming } from '@/core/utils/format';

const props = defineProps({
  stateCount: {
    type: Object as PropType<IGetCheckCountStatisticsRes>
  },
});
const { FD, CH } = usePermissionConfig();
const emits = defineEmits(['getStateCount']);
const { searchConfig } = useSearch();
const { handleDispatch } = useDispatch({
  reloadFn() {
    handleSearch();
  }
});
const selectedList = ref<IListItem[]>([]);
const onSelectionChange = (vals: IListItem[]) => {
  selectedList.value = vals;
};
const config = computed(() => {
  return [
    {
      label: `待分单(${props.stateCount?.unallocatedCount || '0'})`,
      value: YES_NO_ENUM.NO,
      params: {
        allocateState: ALLOCATE_STATE_ENUM.BASE,
        isAllocated: YES_NO_ENUM.NO,
      },
    },
    {
      label: `已分单(${props.stateCount?.allocatedCount || '0'})`,
      value: YES_NO_ENUM.YES,
      params: {
        isAllocated: YES_NO_ENUM.YES,
      },
    },
  ];
});
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
      personal: false,
      isAllocated: YES_NO_ENUM.NO,
      styleCode: '',
      designCode: '',
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
    handleParams: (custom) => {
      const { allocateeIdList, ...rest } = custom;
      selectedList.value = [];
      const ids: string[] = [];
      if (allocateeIdList) {
        ids.push(allocateeIdList as unknown as string);
      }
      const timeParams = {
        ...handleTimeConsuming(rest.timeConsumingType!, rest.timeConsumingStart, rest.timeConsumingEnd),
      };
      // 已分单情况下allocateState存在则需要去掉
      if (rest.isAllocated === YES_NO_ENUM.YES && rest.allocateState) {
        delete rest.allocateState;
      }
      delete rest.timeConsumingType;
      delete rest.timeConsumingStart;
      delete rest.timeConsumingEnd;
      emits('getStateCount');

      return {
        ...rest,
        ...timeParams,
        ...config.value.find(v => v.value === rest.isAllocated)?.params,
        allocateeIdList: ids,
        versionNum: '1', // 版本号，默认传1
      };
    },
    handleCustomReset: (p, defaultParams) => {
      return {
        ...defaultParams,
        personal: p.personal,
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
const handleBackDispatch = async () => {
  await checkCountBack(selectedList.value.map(v => v.checkCountId!));
  ElMessage.success('操作成功');
  handleSearch();
};

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

onMounted(() => {
  handleSearch(params.value.pageNum);
});

</script>
