<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.personal" @change='init(1)'>
        <el-radio-button :value="false">全部</el-radio-button>
        <el-radio-button :value="true">我的</el-radio-button>
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
        @handleReset="customReset"
        :config="searchConfig"
      >
        <!-- 审版工艺师 -->
        <template #reviewCraftsmanId>
          <UserSelect
            v-model="params.reviewCraftsmanId"
            clearable
          />
        </template>
        <template #categoryCodes>
          <el-cascader
            v-model="params.categoryCodes"
            :options="(pimsCategory as any)"
            clearable
            :props="pimsCategoryProps"
            class="tw-w-100%"
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
      <!-- 待提交才有 -->
      <div class="tw-flex">
        <el-button
          v-if="RWZP && (params.state === STATUS_LIST_ENUM.WAIT || params.state === STATUS_LIST_ENUM.CALL)"
          type="primary"
          :disabled="!selection.length"
          @click="handleTaskTransfer"
        >任务指派</el-button>
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
import { STATUS_LIST, STATUS_LIST_ENUM } from './constant';
import { useListColumns } from './hooks/use-table-columns';
import { auditCraftOrderPage, auditCraftOrderStateCount } from '../../api';
import UserSelect from '@/components/user-select';
import { useRoute, useRouter } from 'vue-router';
import { useTableDataMapRemark } from '@/modules/exception-manage/exception-handle/hooks/use-map-remark';
import {
  CLOTHES_CENTER_SEARCH_KEY,
  LOG_BIZ_TYPE_ENUMS,
  REMARK_BIZ_TYPE_ENUMS
} from '@/modules/clothes-center/constant';
import {
  TIME_CONSUMING_TYPE_LIST,
  TIME_CONSUMING_TYPE_ENUM
} from '@/constant';

import {
  IAuditCraftOrderPageReq,
  IAuditCraftOrderPageResListItem,
  IAuditCraftOrderStateCountRes,
} from '../../api/types';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { ILogListReq, ILogListRes } from '@/modules/exception-manage/exception-handle/api/type';
import { postExceptionLogApi } from '@/modules/exception-manage/exception-handle/api';
import { cloneDeep } from 'lodash-es';
import { usePermissionConfig } from '../../use-permission-config';
import { useTaskTransferFormDialog } from './hooks/use-task-form-dialog';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { handleTimeConsuming } from '@/core/utils/format';
import NP from 'number-precision';

const { RWZP } = usePermissionConfig();

const pimsCategoryProps = {
  label: 'label',
  value: 'value',
};

interface IParamsReq extends IAuditCraftOrderPageReq {
  categoryCodes?: string[];
  timeConsumingStart?: string;
  timeConsumingEnd?: string;
  timeConsumingType?: TIME_CONSUMING_TYPE_ENUM;
}
const { searchConfig, pimsCategory } = useSearch();
const handleParams = (p: IParamsReq) => {
  const _p = cloneDeep(p);
  if (_p.categoryCodes?.length) {
    _p.category = _p.categoryCodes.join('-');
  } else {
    _p.category = '';
  }
  delete _p.categoryCodes;
  const timeParams = {
    ...handleTimeConsuming(_p.timeConsumingType!, _p.timeConsumingStart, _p.timeConsumingEnd),
  };
  delete _p.timeConsumingType;
  delete _p.timeConsumingStart;
  delete _p.timeConsumingEnd;
  return {
    ..._p,
    ...timeParams,
    showCancel: _p.state === STATUS_LIST_ENUM.COMPLETED,
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
} = useList<IParamsReq, typeof auditCraftOrderPage>({
  request: {
    api: auditCraftOrderPage,
    params: {
      showCancel: false,
      reviewCraftsmanId: '',
      state: STATUS_LIST_ENUM.ALL,
      personal: true,
      categoryCodes: [],
      designCode: '',
      styleCode: '',
      category: '',
      makeClothesType: '',
      createdTimeStart: '',
      createdTimeEnd: '',
      latestSubmitTimeStart: '',
      latestSubmitTimeEnd: '',
      timeConsumingStart: '',
      timeConsumingEnd: '',
      timeConsumingType: TIME_CONSUMING_TYPE_ENUM.HOUR,
      pageNum: 1,
      pageSize: 20,
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

// table勾选项
const selection = ref<IAuditCraftOrderPageResListItem[]>([]);
const handleSelectionChange = (checked: IAuditCraftOrderPageResListItem[]) => {
  selection.value = checked || [];
};

const { handleDialog } = useTaskTransferFormDialog({
  reloadFn: () => {
    init(1);
  },
});

/**
 * @description 任务指派
 */
const handleTaskTransfer = () => {
  handleDialog(selection.value);
};

// 操作日志
const drawer = reactive<{ visible: boolean; data: ILogListRes; }>({
  visible: false,
  data: [] as ILogListRes,
});
const { tableColumns } = useListColumns({
  reloadFn: handleSearch,
  handleOperateLog: async (id: string) => {
    try {
      const param: ILogListReq = {
        bizId: id,
        bizType: LOG_BIZ_TYPE_ENUMS.AUDIT_CRAFT_ORDER,
      };
      const { data = [] } = await postExceptionLogApi(param);
      drawer.data = data || [];
      drawer.visible = true;
    } catch (e) {
      console.error('handleOperateLog error', e);
    }
  },
  isHaveAuditCraftUser(row) {
    let r = false;
    const { reviewCraftsmanId } = row;
    if (reviewCraftsmanId) {
      r = true;
    } else {
      handleDialog([row]);
    }
    return r;
  }
});

const stateCountInfo = ref<IAuditCraftOrderStateCountRes>([]);
const tabList = computed(() => {
  const list = STATUS_LIST.map(v => ({
    ...v,
    count: stateCountInfo.value.find(it => v.value === it.state)?.count || '0'
  }));
  const total = list.reduce((pre, cur) => NP.plus(pre, Number(cur.count)), 0);
  return [
    { label: '全部', value: STATUS_LIST_ENUM.ALL, count: String(total) },
    ...list
  ];
});
const getStateStat = async () => {
  const { data } = await auditCraftOrderStateCount({
    ...handleParams(params.value),
    state: '',
    showCancel: true,
  });
  stateCountInfo.value = data || [];
};
const route = useRoute();
const router = useRouter();
let skc = route.query.skc || '';
let processNodeState = route.query.processNodeState || '';
const init = (pageNum?: number) => {
  if (skc) {
    params.value.designCode = skc as string;
  }
  if (processNodeState) {
    params.value.state = processNodeState as STATUS_LIST_ENUM;
  }
  if (processNodeState || skc) {
    router.replace({
      name: 'ClothesCenterAuditCraftTaskList',
    });
    processNodeState = '';
    skc = '';
  }
  getStateStat();
  handleSearch(pageNum);
};

const customReset = () => {
  handleReset();
  getStateStat();
};

/* remark */
useTableDataMapRemark<IAuditCraftOrderPageResListItem>(
  tableData,
  'auditCraftOrderId',
  REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
  'remark',
);

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

onMounted(() => {
  init(params.value.pageNum);
});
</script>
