<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group
        v-model='params.sameGroup'
        @change="init()"
        class='tw-pb-10px'
      >
        <el-radio-button
          v-for="(item, index) in radioGroupList"
          :key="index"
          :value="item.value"
        >{{ item.lable }}</el-radio-button>
      </el-radio-group>
      <sc-search-area
        v-model="params"
        @handleReset="handleResetFun"
        :config="searchConfig"
        @handleSearch="init()"
      >
        <template #developerId>
          <user-query-select
            ref="userQuerySelect"
            v-model="params.creatorId"
            @handleSearch="init"
          />
        </template>
        <template #taskCode>
          <el-input
            v-model="params.taskCode"
            placeholder="支持批量，用空格或“,”分割"
          />
        </template>
        <template #spuCode>
          <el-input
            v-model="params.spuCode"
            placeholder="支持批量，用空格或“,”分割"
          />
        </template>
        <template #styleCheckerId>
          <user-query-select
            ref="userQuerySelect"
            v-model="params.styleCheckerId"
            @handleSearch="handleSearch"
          />
        </template>
        <template #category>
          <el-cascader
            v-model="params.categoryArr"
            :options="pimsCategory as any"
            collapse-tags
            show-all-levels
            :props="pimsCategoryProps"
            class="tw-w-100%"
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex tw-flex-justify-between">
        <sc-condition-select
          v-model="params.taskStatus"
          :incompat="''"
          :condition-info="conditionInfo"
          @conditionChange="handleSearch()"
        />
        <div class="tw-flex-center-y">
          <el-button
            v-if="SCRW"
            :disabled="selectionList.length ? false : true"
            @click="delFun"
          >
            删除任务
          </el-button>
          <el-button
            v-if="SBBQ"
            :disabled="selectionList.length ? false : true"
            @click="recognize"
          >
            识别标签
          </el-button>
          <TaskCollection
            v-if="FS"
            :selectionList="selectionList"
            status="taskStatus"
            :statusCode="DESIGN_DEMAND_STATUS_TYPE.FINISH"
          />
          <el-button
            v-if="PLKK"
            :disabled="selectionList.length ? false : true"
            type="primary"
            @click="batchPayment"
          >
            批量开款
          </el-button>
          <el-button
            v-if="SK"
            :disabled="selectionList.length ? false : true"
            type="primary"
            @click="reviewTask"
          >
            审款
          </el-button>
          <el-button
            type="primary"
            v-if="CJRW"
            @click="creaTeask"
          >
            创建任务
          </el-button>
        </div>
      </div>
    </template>
    <template #main>
      <sc-table
        height="100%"
        :data="tableData"
        :columns="tableColumns"
        :border="true"
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
          :page-sizes="[20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
    <operation-drawer
      v-model="drawer.visible"
      :request="postDesignLogBizToTypeListApi"
      :config="{
        timeKey: 'createdTime',
        userKey: 'creatorName',
        contentKey: 'content',
        // 不显示remark
        remarkKey: 'string',
      }"
      :requestParams="drawer.params"
    />
    <el-image-viewer
      v-if="showPreview"
      :url-list="imgUrl"
      show-progress
      :initial-index="0"
      @close="showPreview = false"
    />
  </sc-app-page>
</template>
<script lang='ts' setup>
import { computed, onActivated, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSearch } from './hooks/use-search';
import { useTableColumns } from './hooks/use-table-columns';
import { getTaskList, developStyleStateTotalApi } from '../../api';
import { DevelopStyleStateTotalResItem } from '../../api/types';
import { useList } from '@/hooks/use-list';
import { useDispatch } from './hooks/use-dispatch';
import { IListItem, IParams } from './types';
import DesignerSelect from '@/components/designer-select';
import { DESIGN_DEMAND_STATUS_TYPE_LIST, DESIGN_DEMAND_STATUS_TYPE, IDENTIFY_STATUS } from '../../constant';
import { postDesignLogBizToTypeListApi } from '@/modules/design-center/api/operate-log';
import { remarksSaveToType } from '@/api/basis';
// import { REMARK_BIZ_TYPE_ENUM } from '@/constant';
import { useTableDataMapBizRemarkToStyle } from '@/modules/design-center/develop-bom/views/list/hooks/use-map-remark';
import { usePermissionConfig } from '../../use-permission-config';
// import UserSelect from '@/components/user-select';
import UserQuerySelect from '@/components/user-query-select/index.vue';
import usePersistTempData from './hooks/usePersistTempData';
import { ElMessage } from 'element-plus';
import { handleBatchDelete, handleRecognize } from '../lib/task';
import TaskCollection from '../../components/taskCollection/index.vue';
import { useAccountStore } from '@/store/account';

const { set, remove } = usePersistTempData();
const router = useRouter();
const conditionInfo = ref<any>({
  title: '状态：',
  conditionList: [
    {
      value: '',
      label: '全部'
    },
  ],
});

const { CJRW, SK, PLKK, FS, SBBQ, SCRW, QBFZ, QBZN, QBWD } = usePermissionConfig();
// const { handleDispatch } = useDispatch({
//   reloadFn() {
//     handleSearch();
//   },
// });
const pimsCategoryProps = {
  label: 'label',
  value: 'value',
  multiple: true,
};
const suggestedStyleProps = {
  label: 'label',
  value: 'value',
  multiple: true,
};
const { searchConfig, pimsCategory } = useSearch();
const selectionList = ref<IListItem[]>([]);
const handleSelectionChange = (selection: IListItem[]) => {
  selectionList.value = selection;
};
// const canDispatch = computed(() => selectionList.value
//   .every(v => v.designDemandStatus === DESIGN_DEMAND_STATUS_ENUM.WAIT_DISPATCH));
// const canReDispatch = computed(() => selectionList.value
//   .every(v => v.taskStatus === DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE));
// const canFail = computed(() => selectionList.value
//   .every(v => [
//     DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE,
//     DESIGN_DEMAND_STATUS_ENUM.WAIT_DISPATCH,
//   ].includes(v.designDemandStatus)));
const accountStore = useAccountStore();
const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<IListItem, IParams>({
  request: {
    api: getTaskList,
    params: {
      categoryArr: [],
      sameGroup: '',
      pageNum: 1,
      pageSize: 20,
    },
    handleParams(data) {
      const { categoryArr = [], ...rest } = data;
      selectionList.value = [];
      return {
        ...rest,
        categoryCodes: categoryArr!.map(v => v.at(-1)!),
        sameGroup: (data.sameGroup === '' || data.sameGroup === '-1') ? undefined : data.sameGroup,
        creatorId: data.sameGroup === '-1' ? accountStore.account?.id : data.creatorId
      };
    },
  },
});
const radioGroupList = ref<{ lable: string; value: string; }[]>([]);
watch(() => [QBFZ.value, QBZN.value, QBWD.value], () => {
  radioGroupList.value = [];
  QBFZ.value && radioGroupList.value.push({ lable: '全部', value: '' });
  QBZN.value && radioGroupList.value.push({ lable: '组内', value: 'YES' });
  QBWD.value && radioGroupList.value.push({ lable: '我的', value: '-1' });
  params.value.sameGroup = radioGroupList.value?.[0]?.value ?? undefined;
  if (!radioGroupList.value.length) {
    router.push({
      path: '/403',
    });
  }
}, {
  immediate: true,
});
const developStyleStateTotalApiFun = async () => {
  const { categoryArr = [], ...rest } = params.value;
  const { data } = await developStyleStateTotalApi({
    ...params.value as any,
    taskStatus: undefined,
    categoryCodes: categoryArr!.map(v => v.at(-1)!),
    categoryArr: undefined,
    sameGroup: (params.value.sameGroup === '' || params.value.sameGroup === '-1') ? undefined : params.value.sameGroup,
    creatorId: params.value.sameGroup === '-1' ? accountStore.account?.id : params.value.creatorId,
  });
  conditionInfo.value = {
    title: '状态：',
    conditionList: [
      {
        value: '',
        label: '全部'
      },
      ...DESIGN_DEMAND_STATUS_TYPE_LIST?.map((item: { value: number; label: string; }) => {
        return {
          value: item.value,
          label: `${item.label}(${data.find((v: DevelopStyleStateTotalResItem) => v.taskStatus === item.value)?.total ?? '0'})`
        };
      }) ?? [],
    ],
  };
};
// 操作日志
const drawer = ref<any>({
  visible: false,
  params: [],
});
const imgUrl = ref<string[]>([]);
const showPreview = ref(false);
const {
  tableColumns,
  handleDiscarded
} = useTableColumns({
  reloadFn() {
    handleSearch();
  },
  async handleCreateRecord(
    row: any,
    remark: string,
  ) {
    const { taskId } = row;
    await remarksSaveToType({
      taskId,
      remark,
    });
    await handleSearch();
  },
  handleOperateLog(bizId: any) {
    drawer.value.params = [bizId || ''];
    drawer.value.visible = true;
  },
  lookImg(item: IListItem) {
    imgUrl.value = [item.mainImgUrl || '', ...(item.pictures || []).filter(v => v.pictureType !== 'MAIN_IMAGE').map(v => v.imageUrl || '')];
    showPreview.value = true;
  },
});
// 同步 remark
useTableDataMapBizRemarkToStyle<IListItem>(
  tableData,
  'taskId',
  'remark' as keyof IListItem,
);
// const handleFail = () => {
//   // handleDiscarded(selectionList.value.map(v => v.designDemandId));
// };
const init = () => {
  handleSearch();
  developStyleStateTotalApiFun();
  remove('detail-page-data');
};
init();
// onActivated(() => {
//   init();
// });
// 创建任务
const creaTeask = () => {
  const url = router.resolve({
    name: 'DesignCenterPaymentTaskCreate',
  }).href;
  window.open(url, '_blank');
};
// 批量开款
const batchPayment = () => {
  let mag = '';
  if (selectionList.value.filter(v => v.taskStatus !== DESIGN_DEMAND_STATUS_TYPE.WAIT_HANDLE).length) {
    mag = '请选择待开款的数据进行此操作';
  }
  if (selectionList.value.filter(v => ![IDENTIFY_STATUS.COMPLETED, IDENTIFY_STATUS.FAILED].includes(v.identifyStatus || -1)).length) {
    mag = '请选择AI识别状态为已完成/失败的数据进行此操作';
  }
  if (mag) {
    ElMessage.error(mag);
    return;
  }
  set('identifyStatus-page-data', selectionList.value);
  const url = router.resolve({
    name: 'DesignCenterPaymentTaskBatchPayment',
  }).href;
  window.open(url, '_blank');
};
// 开款任务处理
const reviewTask = () => {
  const selectList: any = selectionList.value.filter(v => v.taskStatus === DESIGN_DEMAND_STATUS_TYPE.WAIT_DISPATCH);
  if (!selectList.length) {
    ElMessage.error('最少选择一条待审核的数据');
    return;
  }
  set('detail-page-data', selectList);
  const url = router.resolve({
    name: 'DesignCenterPaymentTaskBatchReviewTask',
  }).href;
  window.open(url, '_blank');
};
// 删除任务
const delFun = () => {
  handleBatchDelete((selectionList.value), init);
};
const recognize = () => {
  handleRecognize((selectionList.value), init);
};
const handleResetFun = () => {
  handleReset();
  init();
};
</script>
