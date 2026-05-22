<!--SKC管理-->
<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group
        v-model="params.searchRange"
        @change="handleSearch()"
        class="tw-pb-10px"
      >
        <el-radio-button
          v-for="(item, index) in radioGroupList"
          :key="index"
          :value="item.value"
        >{{ item.lable }}</el-radio-button>
      </el-radio-group>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width="120px"
        @handleSearch="handleSearch"
        @handle-reset="handleReset"
      >
        <template #taskCode>
          <el-input
            v-model="params.taskCode"
            placeholder="支持批量搜索，多个用空格或“,”隔开"
            clearable
          />
        </template>
        <template #skcCode>
          <el-input
            v-model="params.skcCode"
            placeholder="支持批量搜索，多个用空格或“,”隔开"
            clearable
          />
        </template>
        <template #categoryCodes>
          <el-cascader
            v-model="(params.categoryCodes as any)"
            :options="(pimsCategory as any)"
            collapse-tags
            class="tw-w100%"
            show-all-levels
            clearable
            placeholder="请选择品类"
            :props="pimsCategoryProps"
          />
        </template>
        <template #designerName>
          <DesignerSelect
            v-model="params.creatorId"
            placeholder="请选择"
            show-read-me-btn
          />
        </template>
      </sc-search-area>
    </template>

    <template #header>
      <div class="header">
        <div class="condition tw-pb-10px">
          <el-form-item label="商品图：">
            <radio-checkbox
              v-model="params.hasMainImg"
              :options="PRODUCT_IMG_STATUS_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="资料状态：">
            <radio-checkbox
              v-model="params.dataCompleted"
              :options="RESOURCE_STATUS_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="上架状态：">
            <radio-checkbox
              v-model="params.onShelves"
              :options="ON_SHELF_STATUS_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="取消状态：">
            <radio-checkbox
              v-model="params.cancelled"
              :options="YES_NO_STRING_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="动销：">
            <radio-checkbox
              v-model="params.sold"
              :options="YES_NO_STRING_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="推送买手状态：">
            <radio-checkbox
              v-model="params.pushType"
              :options="PUSH_TYPE_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
        </div>
      </div>
      <div class="tw-flex tw-flex-items-center tw-flex-justify-between tw-pb-10px">
        <div class="tw-flex tw-flex-item-center">
          <el-button
            v-if="SJSBG"
            type="primary"
            :disabled="!canChangeDesigner"
            @click="handleChangeDesigner"
          >
            设计师变更
          </el-button>
          <el-button
            v-if="XZTP"
            type="primary"
            :disabled="!hasSpuSelected"
            @click="handleDownloadImage(selection)"
          >
            下载图片
          </el-button>
          <el-button
            v-if="SCTP"
            type="primary"
            @click="() => (isShowUploadDialog = true)"
          > 上传图片 </el-button>
          <el-button
            type="warning"
            v-if="DC"
            @click="handleBatchExport(handleParams(params))"
          > 导出 </el-button>
          <el-dropdown
            :disabled="!hasSpuSelected"
            @command="handleSendTask"
          >
            <el-button class="tw-ml-4" :disabled="!hasSpuSelected">
              发送到
              <el-icon class="el-icon--right">
                <ArrowDown />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in SEND_TASK_TYPE_LIST"
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
        <div class="tw-flex tw-flex-item-center">
          <el-button
            v-if="TSMSXT"
            type="primary"
            @click="pushBuyers"
            :disabled="!canCancel"
          >推送买手系统</el-button>
          <el-button
            v-if="QX"
            type="danger"
            :disabled="!canCancel"
            @click="() => (cancelStyleNumVisible = true)"
          >
            取消
          </el-button>
          <el-button
            v-if="TSSJ"
            type="primary"
            :disabled="!selection.length"
            @click="handleBatchPush"
          > 推送上架 </el-button>
          <el-button
            v-if="XJKH"
            type="primary"
            @click="handleCreateSpu"
          > 创建款式 </el-button>
        </div>
      </div>
    </template>

    <template #main>
      <div class="tw-h-100%">
        <sc-table
          height="100%"
          :columns="columns"
          :data="tableData"
          row-key="id"
          :row-class-name="rowClassName"
          :tree-props="{ children: 'skcs' }"
          @selection-change="handleSelectionChange"
        />
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
          :size="params.pageSize!"
          :pageSizes="[10, 20, 30, 50, 100, 200]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>

    <OperationDrawer
      v-model="drawer.visible"
      title="操作日志"
      :request="getOperationLogList"
      :config="{
        timeKey: 'createdTime',
        userKey: 'creatorName',
        contentKey: 'content',
      }"
      :requestParams="drawer.params"
    />
    <!--弹窗：取消选择-->
    <CancelDialog
      v-model="cancelStyleNumVisible"
      :selection="selection"
      @success="handleSearch()"
    />
    <!-- 弹窗：上传图片 -->
    <UploadImgDialog v-model="isShowUploadDialog" @success="handleSearch()" />
    <!-- 设计师变更 -->
    <ChangeDesignerDialog
      v-model="changeDesignerDialogState.visible"
      :selection="changeDesignerDialogState.selection"
      @success="handleSearch()"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { reactive, ref, onActivated, watch, computed } from 'vue';
import { useSearch } from './hooks/use-search';
import { useColumns } from './hooks/use-columns';
import { usePermissionConfig } from '../../use-permission-config';
import { PRODUCT_IMG_STATUS_LIST, RESOURCE_STATUS_LIST } from '../../constant';
import { useList } from '@/hooks/use-list';
import { IListItem, IParams } from './types';
import { fetchSpotStyleListOpt, fetchSpotStylePage } from '../../api';
import CancelDialog from '../../components/cancelDialog.vue';
import UploadImgDialog from '../../components/uploadImgDialog.vue';
import { useRouter } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import DesignerSelect from '@/components/designer-select';
import { useBatchHandler } from './hooks/use-batch-handler';
import { YES_NO_STRING_ENUM, YES_NO_STRING_LIST } from '@/constant';
import { TASK_SOURCE_ENUM, TASK_TYPE_ENUM, TASK_TYPE_LIST } from '@/constant/task';
import { ArrowDown } from '@element-plus/icons-vue';
import { STYLE_QUERY_KEY } from '@/modules/stylish-derivation/posture-fission/views/hooks/use-create-by-style';
import { SYSTEM_ENUM } from '@/core/http/env';
import { useAccountStore } from '@/store/account';
import { IMAGE_UPDATE_TASK_TYPE_ENUM } from '@/modules/design-center/image-update/constant';
import { handleBatchDelete } from '../../lib/task';
import { ElMessage } from 'element-plus';
import ChangeDesignerDialog from '../../components/change-designer-dialog/index.vue';

const { XZTP, SCTP, QX, XJKH, DC, TSSJ, TSMSXT, QBFZ, QBZN, QBWD, SJSBG } = usePermissionConfig();
const { account } = useAccountStore();
const router = useRouter();

// 操作日志
const drawer = reactive({
  visible: false,
  params: [] as string[],
});

const pimsCategoryProps = {
  label: 'label',
  value: 'value',
  emitPath: false,
  multiple: true
};

const { searchConfig, pimsCategory } = useSearch();
// 取消款号dialog
const cancelStyleNumVisible = ref<boolean>(false);
const isShowUploadDialog = ref<boolean>(false);

// table勾选项
const {
  selection,
  hasSpuSelected,
  canCancel,
  handleSelectionChange,
  handleBatchExport,
  handleDownloadImage,
  handleBatchPush
} = useBatchHandler(() => handleSearch());

const SEND_TASK_TYPE_LIST = [TASK_TYPE_ENUM.IMAGE_UPDATE, TASK_TYPE_ENUM.POSE_FISSION, TASK_TYPE_ENUM.VIRTUAL_TRY_ON].map((item) => {
  return TASK_TYPE_LIST.find(t => t.value === item)!;
}).filter(Boolean);

const getOperationLogList = async (params: any) => {
  const res = await fetchSpotStyleListOpt(params);
  return {
    ...res,
    data: res.data?.map((item) => {
      return {
        ...item,
        content: item.optType?.includes('取消') ? `${item.optType} ：${item.content}` : item.content,
      };
    })
  };
};

/**
 * 上架状态列表
 */
const ON_SHELF_STATUS_LIST = [
  { value: 'wait_push', label: '待推送' },
  { value: 'wait_on', label: '待发布' },
  { value: YES_NO_STRING_ENUM.YES, label: '已发布' },
  { value: YES_NO_STRING_ENUM.NO, label: '下架' },
  { value: 'onShelvesFail', label: '发布失败' },
];
/**
 * 推送状态列表
 */
const PUSH_TYPE_LIST = [
  { value: 'wait_push', label: '待推送' },
  { value: 'wait_on', label: '已推送' },
  { value: 'pushFailed', label: '推送失败' },
  { value: 'buyerCancelled', label: '已取消' },
];
const handleParams = (p: IParams) => {
  const { searchRange, hasMainImg, dataCompleted, cancelled, ..._p } = cloneDeep(p);
  if (searchRange) {
    if (searchRange === 'group') {
      _p.sameGroup = YES_NO_STRING_ENUM.YES;
    } else if (searchRange === 'me') {
      _p.creatorId = account?.id;
    }
  }
  if (_p.onShelves) {
    if (_p.onShelves === 'wait_push') {
      _p.upcoming = YES_NO_STRING_ENUM.NO;
      delete _p.onShelves;
      delete _p.onShelvesFail;
    } else if (_p.onShelves === 'wait_on') {
      _p.upcoming = YES_NO_STRING_ENUM.YES;
      delete _p.onShelves;
      delete _p.onShelvesFail;
    } else if (_p.onShelves === 'onShelvesFail') {
      _p.onShelvesFail = YES_NO_STRING_ENUM.YES;
      delete _p.onShelves;
      delete _p.upcoming;
    }
  }
  if (_p.pushType) {
    if (_p.pushType === 'wait_push') {
      _p.pushedBuyer = YES_NO_STRING_ENUM.NO;
      delete _p.pushType;
    } else if (_p.pushType === 'wait_on') {
      _p.pushedBuyer = YES_NO_STRING_ENUM.YES;
      delete _p.pushType;
    } else if (_p.pushType === 'pushFailed') {
      _p.pushFailed = YES_NO_STRING_ENUM.YES;
      delete _p.pushType;
    } else if (_p.pushType === 'buyerCancelled') {
      _p.buyerCancelled = YES_NO_STRING_ENUM.YES;
      delete _p.pushType;
    }
  }

  return {
    ..._p,
    hasMainImg: hasMainImg || undefined,
    dataCompleted: dataCompleted || undefined,
    cancelled: cancelled || undefined,
    onShelves: _p.onShelves || undefined,
    upcoming: _p.upcoming || undefined,
    sold: _p.sold || undefined,
    onShelvesFail: _p.onShelvesFail || undefined,
  };
};

/**
 * @description 构造核价\try on信息到表格里
 */
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
    api: fetchSpotStylePage,
    params: {
      pageNum: 1,
      pageSize: 20,
      searchRange: 'all',
    },
    handleParams,
  },
  response: {
    async handleResponseData(list) {
      selection.value = [];
      return list?.map((spu) => {
        const newSpu: IListItem = {
          ...spu,
          id: spu.taskId,
          skcs: spu.skcs?.map(({ sizeStandardCode, ...v }) => ({
            ...v,
            isChild: true,
            id: v.skcId!,
            taskId: spu.taskId,
            sizeStandardCode: spu.sizeStandardCode,
            skcSizeStandardCode: sizeStandardCode
          })),
        };
        return newSpu;
      });
    },
  },
});
const radioGroupList = ref<{ lable: string; value: 'all' | 'group' | 'me' | undefined; }[]>([]);
watch(() => [QBFZ.value, QBZN.value, QBWD.value], () => {
  radioGroupList.value = [];
  QBFZ.value && radioGroupList.value.push({ lable: '全部', value: 'all' });
  QBZN.value && radioGroupList.value.push({ lable: '组内', value: 'group' });
  QBWD.value && radioGroupList.value.push({ lable: '我的', value: 'me' });
  params.value.searchRange = radioGroupList.value?.[0]?.value ?? undefined;
  if (!radioGroupList.value.length) {
    router.push({
      path: '/403',
    });
  }
}, {
  immediate: true,
});
const { columns } = useColumns({
  reloadFn() {
    handleSearch();
  },
  handleOperateLog(taskId: string) {
    drawer.params = [taskId];
    drawer.visible = true;
  },
});

const rowClassName = (data: { row: IListItem; rowIndex: number; }) => {
  const { row } = data;
  if (row.isChild) {
    return 'child-row';
  }
  return '';
};
const handleCreateSpu = () => {
  router.push({
    name: 'DesignCenterInStockCreateSpu',
  });
};

// 点击发送到
const handleSendTask = async (taskType: TASK_TYPE_ENUM) => {
  const commonQuery = { taskSource: TASK_SOURCE_ENUM.SPOT_STYLE };
  const styleCodeStr = selection.value.filter(item => !item.isChild).map(item => item.taskCode).join(',');
  if (styleCodeStr?.split(',').filter((v: string) => !v).length) {
    ElMessage.error('没有spu编号不能进行发送操作');
    return;
  }
  switch (taskType) {
    case TASK_TYPE_ENUM.IMAGE_UPDATE:
      router.push({ name: 'DesignCenterImageUpdateCreate',
        params: { styleCode: styleCodeStr, taskType: IMAGE_UPDATE_TASK_TYPE_ENUM.IMAGE },
        query: {
          ...commonQuery
        } });
      break;

    case TASK_TYPE_ENUM.POSE_FISSION:
      router.push({ name: 'PostureFissionAdd', query: { [STYLE_QUERY_KEY]: styleCodeStr, ...commonQuery } });
      break;

    case TASK_TYPE_ENUM.VIRTUAL_TRY_ON:
      router.push({
        name: 'Webview',
        query: {
          domain: SYSTEM_ENUM.FASHION_DESIGN,
          path: '/#/inspiration-center/virtual-change/create',
          activeMenu: `Webview?domain=${SYSTEM_ENUM.FASHION_DESIGN}&path=/#/inspiration-center/virtual-change/list`,
          query: JSON.stringify({ [STYLE_QUERY_KEY]: styleCodeStr, ...commonQuery })
        }
      });
      break;
    default:
      break;
  }
};

onActivated(() => {
  handleSearch(params.value.pageNum);
});

// 推送买手系统
const pushBuyers = () => {
  handleBatchDelete((selection.value), handleSearch);
};

// 设计师变更
const canChangeDesigner = computed(() => {
  return !!selection.value.some(v => !v.isChild);
});
/**
 * 变更设计师
 */
const changeDesignerDialogState = reactive<{
  visible: boolean;
  selection: IListItem[];
}>({
  visible: false,
  selection: [],
});
const handleChangeDesigner = () => {
  changeDesignerDialogState.selection = selection.value?.filter(v => !v.isChild) ?? [];
  changeDesignerDialogState.visible = true;
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .condition {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 40px;
    .el-form-item {
      margin-bottom: 0;
      :deep(.el-form-item__label) {
        font-weight: bold;
      }
      :deep(.el-checkbox__label) {
        font-weight: 400;
      }
    }
  }
}
:deep(.child-row) {
  background-color: var(--el-table-row-hover-bg-color);
}
</style>
