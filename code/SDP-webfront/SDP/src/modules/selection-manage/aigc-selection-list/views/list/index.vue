<template>
  <sc-app-page class="custom-app-page">
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
        :labelWidth="searchAreaProps.labelWidth"
        :cols="searchAreaProps.cols"
        :showCount="searchAreaProps.showCount"
      >
        <template #creatorName>
          <user-query-select
            ref="userQuerySelect"
            v-model="params.creatorIds"
            multiple
            @handleSearch="handleSearch"
          />
        </template>
        <template #selectorName>
          <query-select-my
            v-model="params.selectorId"
            model-type="id"
            @handleSearch="handleSearch"
          />
        </template>
        <template #taskCode>
          <el-input
            v-model="taskCode"
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex tw-items-center">
        <div class="tw-mr-16px">
          <el-select
            v-model="params.waveBatchCode"
            style="width: 240px;"
            @change="handleSearch(1)"
            clearable
            filterable
          >
            <el-option
              v-for="item in wavesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <sc-condition-select
          v-model="params.pickingState"
          :condition-info="conditionResult"
          @conditionChange="() => handleSearch()"
          class="tw-flex-1"
        />
        <div>
          <el-button
            :loading="exportLoading"
            @click="handleExportData()"
          >
            {{ ('导出数据') }}
          </el-button>
          <el-button
            v-if="DRWBSJ"
            @click="handleImportDataOpenDialog()"
          >{{ ('导入外部数据') }}</el-button>
          <el-dropdown
            v-if="KSBJ"
            @command="quickTag"
          >
            <el-button class="tw-ml-4">
              快速标记
              <el-icon class="el-icon--right">
                <ArrowDown />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in TASK_TYPE_LIST"
                  :key="item.value"
                  :command="item.value"
                  divided
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        
      </div>
    </template>
    <template #main>
      <div class="tw-h-100%">
        <el-scrollbar
          ref="scrollbarRef"
          class="tw-position-relative"
          height="100%"
          always
        >
          <planning-list
            v-model:sign="isSign"
            ref="plnningListRef"
            :scrollEl="scrollbarRef?.wrapRef"
            :data="tableData"
            @success="() => handleCloseBatchSign()"
            @next="(idx: number) => setScrollTop(idx)"
          />
        </el-scrollbar>
      </div>
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
  </sc-app-page>
</template>
<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onActivated } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useRouter } from 'vue-router';
import {
  pickingStylePage,
  pickingStyleCountStatus,
  pickingStyleExport,
} from '@/modules/selection-manage/aigc-selection-list/api';
import {
  IPickingStyleCountStatusRes,
  IPickingStyleCountStatusReq,
} from '@/modules/selection-manage/aigc-selection-list/api/type';
import PlanningList from './components/planning-list.vue';
import { useImportDataDialog } from './hooks/use-import-data-dialog';
import { usePermissionConfig } from '../../use-permission-config';
import QuerySelectMy from '@/components/query-select-my/index.vue';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { ElScrollbar } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import UserQuerySelect from '@/components/user-query-select/index.vue';
import { useAccountStore } from '@/store/account';
import { TASK_TYPE, TASK_TYPE_LIST } from '../../constant';

// 定义接口描述组件拥有的方法
interface UserQuerySelectComponent {
  defaultSeeMe: () => void;
  // 可以添加其他方法或属性
}
const userQuerySelect = ref<UserQuerySelectComponent | null>(null);
const accountStore = useAccountStore();
const { BJ, DRWBSJ, KSBJ } = usePermissionConfig();
const { getEnableDictionaryOptions } = useDictionary();

const wavesOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.WAVEBATCH));
const versionCountStatus = ref({} as IPickingStyleCountStatusRes);
const isSign = ref(false);
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
const plnningListRef = ref<InstanceType<typeof PlanningList> | null>(null);
// 记录列表项滚动高度
const scrollTops = ref<number[]>([]);
// 获取路由实例
const router = useRouter();

const searchAreaProps = computed(() => {
  const labelWidth = '96px';
  const showCount = { xl: 4 };
  const cols = { xl: 6 };
  return {
    labelWidth,
    showCount,
    cols,
  };
});

/** 获取当前任务数量信息 */
const getCountStatus = async (p: IPickingStyleCountStatusReq) => {
  p.pickingState = '';
  const { data } = await pickingStyleCountStatus(p);
  versionCountStatus.value = data;
};
const { account } = accountStore;
// const { id } = account;
const id = account?.id ?? '';
onMounted(() => {
  if (userQuerySelect.value) {
    userQuerySelect.value.defaultSeeMe();
  }
});
const taskCode = ref('');
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
    api: pickingStylePage,
    params: {
      externalCategory: '',
      pickingCreatorName: '',
      pickingStartTime: '',
      pickingEndTime: '',
      inspirationSource: '',
      countrySiteCode: '',
      selectorId: '',
      imagePickingStartTime: '',
      imagePickingEndTime: '',
      waveBatchCode: '',
      pickingState: '',
      creatorIds: [id],
      pageNum: 1,
      pageSize: 20,
    },
    handleParams(p) {
      // 查询列表时查一下数量
      getCountStatus({ ...p });
      p.taskCode = taskCode.value.split(',').filter(Boolean);
      // 重置选图
      isSign.value = false;
      plnningListRef.value?.resetData();
      scrollTops.value = [];
      return p;
    },
    handleCustomReset(_, defaultParams) {
      taskCode.value = '';
      return defaultParams;
    },
  },
});
const { searchConfig, conditionResult } = useSearch({ params, versionCountStatus });
const { handleOpenDialog: handleImportDataOpenDialog } = useImportDataDialog({ handleSuccess: () => handleSearch(1) });

/** 批量标记 */
const batchSign = () => {
  plnningListRef.value?.selectAll();
  isSign.value = true;
};

const handleCloseBatchSign = () => {
  isSign.value = false;
  handleSearch(params.value.pageNum);
};

/**
 * 查看下一款时设置滚动条
 * @param nextIndex 列表项下标
 */
const setScrollTop = async (nextIndex: number) => {
  if (nextIndex === 0) {
    // 下标从0开始时重新请求
    params.value.pageNum += 1;
    await handleSearch(params.value.pageNum);
    const nextId = tableData.value[nextIndex].pickingId;
    if (nextId) {
      plnningListRef.value?.toSign(nextId);
      await nextTick();
      scrollbarRef.value?.setScrollTop(0);
    } else {
      plnningListRef.value?.handleCancle();
    }
  } else {
    scrollbarRef.value?.setScrollTop(scrollTops.value[nextIndex]);
  }
};

const exportLoading = ref(false);
/**
 * 导出数据
 */
const handleExportData = async () => {
  exportLoading.value = true;
  console.log('params.value', params.value, taskCode.value);

  await pickingStyleExport({
    ...params.value,
    taskCode: taskCode.value.split(',').filter(Boolean),
  }).finally(() => {
    exportLoading.value = false;
  });
};

watch(() => tableData.value, async () => {
  await nextTick();
  const listRef = plnningListRef.value?.$el.querySelector('.list-wrap')?.querySelectorAll('.list') ?? [];
  scrollTops.value = [...listRef].map((i: HTMLElement) => i.offsetTop);
});

const init = async () => {
  handleSearch();
};
init();
onActivated(() => {
  handleSearch(params.value.pageNum);
});
// 快速标记
const quickTag = (type: TASK_TYPE) => {
  const routeUrl = {
    [TASK_TYPE.AIDesign]: 'quick-selection',
    [TASK_TYPE.PoseFission]: 'quick-selection-fission',
    [TASK_TYPE.PatternTryon]: `quick-selection-fission/${TASK_TYPE.PatternTryon}`,
    [TASK_TYPE.styleGen]: `quick-selection-fission/${TASK_TYPE.styleGen}`,
    [TASK_TYPE.postureFission]: `quick-selection-fission/${TASK_TYPE.postureFission}`,
  }[type];
  if (routeUrl) {
    router.push(`/selection-manage/${routeUrl}`);
  }
};

</script>
<style lang="scss" scoped>
.custom-app-page {
  :deep(.sc-app-page-layout-center-main) {
    background-color: rgba(255, 255, 255, 0);
    padding: 0 24px 16px 0;
  }
}
</style>
