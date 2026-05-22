<!--SKC管理-->
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
        :config="params.sameGroup === 'YES' ? searchConfig.filter(v => v.name !== '设计组别') : searchConfig"
        v-model="params"
        label-width='105px'
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
        <template #developerId>
          <user-query-select
            ref="userQuerySelect"
            :multiple="true"
            v-model="params.designerIdList"
            @handleSearch="init"
          />
        </template>
        <template #categoryNameList>
          <el-cascader
            v-model="params.categoryNameList"
            :options="(pimsCategory as any)"
            collapse-tags
            class='tw-w100%'
            clearable
            show-all-levels
            :props="pimsCategoryProps"
          />
        </template>
        <template #spuCode>
          <el-input
            v-model="params.styleCode"
            placeholder="支持批量，用空格或“,”分割"
          />
        </template>
        <template #skcCode>
          <el-input
            v-model="params.designCode"
            placeholder="支持批量，用空格或“,”分割"
          />
        </template>
        {/**
        <template #color>
          <ColorCascader
            v-model="params.colors"
            filterable
            clearable
            collapse-tags
            class='tw-w100%'
            show-all-levels
            isCanSelectedAll
            :colorProps="colorProps"
          />
        </template>
        */}
      </sc-search-area>
    </template>
    <template #header>
      <div class='tw-flex tw-flex-items-center tw-flex-justify-between tw-pb-2px'>
        <div class='tw-flex tw-flex-items-center'>
          <el-button
            v-if="SJSBG"
            type="primary"
            :disabled="!canChangeDesigner"
            @click="handleChangeDesigner"
          >
            设计师变更
          </el-button>
          <el-button
            type="warning"
            v-if="DYBD"
            :disabled="!designOrderMultiplePrintBtnUsable"
            @click="openDesignOrderMultiplePrint"
          >
            打印版单
          </el-button>
          <el-button
            type="primary"
            v-if="DC"
            @click="handleExport"
          >
            导出
          </el-button>
          <el-button
            v-if="XZTP"
            type="primary"
            :disabled="selection?.length === 0"
            @click="handleDownloadImage(selection)"
          >
            下载图片
          </el-button>
          <TaskCollection
            v-if="FSD"
            :selectionList="selection"
          />
        </div>
        <div class='tw-flex tw-flex-item-center'>
          <el-button
            v-if="TSPLM"
            type="primary"
            :disabled="!selection.length"
            @click="handlePushPlm"
          >
            推送PLM
          </el-button>
          <el-button
            v-if="TSSJ"
            type="primary"
            :disabled="!selection.length"
            @click="pushListing"
          >
            推送上架
          </el-button>
          <el-button
            v-if="QXSKC"
            type="danger"
            :disabled="!canCancel"
            @click="handleCancelStyleNum"
          >
            取消SKC
          </el-button>
          <el-button
            v-if="FS"
            :disabled="!canCreateSkc"
            @click="handleColorsMakingBtn"
          >
            复色
          </el-button>
          <el-button
            v-if="XJSPU"
            type="primary"
            @click="handleCreateSpu"
          >
            新建SPU
          </el-button>
        </div>
      </div>
      <div class="header">
        <div class="condition">
          <el-form-item label="款式资料：">
            <radio-checkbox
              v-model="params.prototypeStatus"
              :options="PROTOTYPE_STATUS_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="取消：">
            <radio-checkbox
              v-model="params.isCanceled"
              :options="YES_OR_NO_NUMBER_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="动销：">
            <radio-checkbox
              v-model="params.isOnSale"
              :options="YES_NO_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="款式类别：">
            <radio-checkbox
              v-model="params.skcType"
              :options="SKC_TYPE_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="核价：">
            <radio-checkbox
              v-model="params.checkPriceState"
              :options="YES_OR_NO_NUMBER_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="上架状态：">
            <radio-checkbox
              v-model="params.listingStatus"
              :options="LISTING_STATUS_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="推送PLM状态：">
            <radio-checkbox
              v-model="params.pushPlmStatus"
              :options="PLM_STATUS_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="前置拆版：">
            <radio-checkbox
              v-model="params.preDisassemblyState"
              :options="YES_OR_NO_NUMBER_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="测价通过：">
            <radio-checkbox
              v-model="params.pricePassedState"
              :options="YES_OR_NO_NUMBER_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="拆版完成：">
            <radio-checkbox
              v-model="params.disassemblyFinished"
              :options="YES_OR_NO_NUMBER_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
        </div>
      </div>
    </template>
    <!-- 主体内容 -->
    <template #main>
      <div
        v-loading="tableLoading"
        class="tw-h-100%"
      >
        <sc-table
          v-loading="tableLoading"
          height="100%"
          :columns="columns"
          :data="tableData"
          is-selection
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
          :pageSizes="[20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
    <operation-drawer
      v-model="drawer.visible"
      title='操作日志'
      :request="logListApi"
      :config="{
        timeKey: 'createdTime',
        userKey: 'creatorName',
        contentKey: 'content',
        // 不显示remark
        remarkKey: 'string',
      }"
      :requestParams="drawer.params"
    />
    <!--弹窗：取消选择-->
    <CancelCode
      v-model:visible="cancelStyleNumVisible"
      :selection="selection"
      @update-list="handleSearch()"
    />
    <!-- 打印设计版单弹窗 -->
    <PrintMultipleDialog
      v-model:visible="designOrderPrintMultipleState.visible"
      :print-info-data-list="designOrderPrintMultipleState.dataList"
      title="打印设计版单"
      width="800px"
      @print="beginMultiplePrint"
    />
    <!-- 打印的设计版单表单内容 -->
    <DesignOrderMultiplePrint
      v-show="false"
      ref="designOrderPrintRef"
      :print-info-data-list="designOrderPrintMultipleState.dataConfirmedList"
      type="analy"
    />
    <!-- 设计师变更 -->
    <ChangeDesignerDialog
      v-model="changeDesignerDialogState.visible"
      :selection="changeDesignerDialogState.selection"
      @success="handleSearch()"
    />
    <!-- 新建/重新描稿
    <digital-draft-dialog
      v-model="digitalDraftDialogObj.visible"
      :designCode="digitalDraftDialogObj?.designCode"
      :title="digitalDraftDialogObj.title"
      :operation-type="digitalDraftDialogObj.operationType"
      @success="handleSearch"
    />
    -->
  </sc-app-page>
</template>

<script lang="ts" setup>
import type { ComponentPublicInstance } from 'vue';
import { reactive, ref, computed, nextTick, onActivated, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useList } from '@/hooks/use-list';
import { useTableMapInfo } from './hooks/use-table-map-Info';
import CancelCode from './components/cancelCode.vue';
import { YES_NO_LIST, YES_OR_NO_NUMBER_LIST } from '@/constant';
// import { postDesignLogListApi } from '@/modules/design-center/api/operate-log';
import PrintMultipleDialog from '@/modules/design-center/components/print-multiple-dialog/index.vue';
import DesignOrderMultiplePrint from '@/modules/design-center/components/design-order-multiple-print.vue';
import ChangeDesignerDialog from './components/change-designer-dialog/index.vue';
import DesignerSelect from '@/components/designer-select';
import { useSearch } from './hooks/use-search';
import { DESIGN_ORDER_INFO_ENUM, PROTOTYPE_STATUS_ENUM, SKC_TYPE_LIST, LISTING_STATUS_LIST, PLM_STATUS, LISTING_STATUS } from '../../constant';
import { useUpdateSPU } from '../../hook/use-update-spu';
import { useColumns } from './hooks/use-columns';
import { IListItem, IParams } from './types';
import { postWebV1PrototypeManagePageApi, actionColorsMaking, fetchMultiplePrototypePrint, logListApi } from '../../api';
import { IPrototypePrintBatchRes } from '../../api/types';
import { useAccountStore } from '@/store/account';
import { usePermissionConfig } from '../../use-permission-config';
import { useDownloadImage } from './hooks/use-download-image';
import { exportByBlob } from '@/core/utils/file-download';
import { handleBatchSearchParam } from '@/core/utils/format';
// import DigitalDraftDialog from '@/modules/material-schedule/digital-draft-task/components/digitalDraftDialog/index.vue';
import { DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM } from '@/modules/material-schedule/digital-draft-task/constant';
// import { cloneDeep } from 'lodash-es';
import UserQuerySelect from '@/components/user-query-select/index.vue';
import TaskCollection from './components/task-collection/index.vue';
import { usePulsPlmDialog } from './hooks/use-dialog-plusPlm';
import { handleBatchAbort } from './hooks/use-push-listing';

const router = useRouter();
const digitalDraftDialogObj = ref({
  visible: false,
  title: '新建任务',
  designCode: '',
  operationType: DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.NEW,
});

const { QXSKC, XJSPU, SJSBG, DYBD, FS, XZTP, DC, FSD, TSSJ, TSPLM, QBFZ, QBZN, QBWD } = usePermissionConfig();
const { columns } = useColumns({
  handleOperateLog(designCode: string) {
    drawer.params.prototypeId = designCode;
    drawer.visible = true;
  },
  reloadFn() {
    handleSearch();
  },
  hanldeCreateDraft(row) {
    console.log(row);
    digitalDraftDialogObj.value.designCode = row.designCode ?? '';
    digitalDraftDialogObj.value.visible = true;
  }
});
const { handleDownloadImage } = useDownloadImage();
const { handleCreateSpu } = useUpdateSPU({
  reloadFn() {
    handleSearch();
  },
});
const pimsCategoryProps = {
  label: 'label',
  value: 'label',
  multiple: true,
};
const colorProps = {
  label: 'label',
  value: 'label',
};

const { searchConfig, pimsCategory } = useSearch();
// 取消款号dialog
const cancelStyleNumVisible = ref<boolean>(false);

// table勾选项
const selection = ref<IListItem[]>([]);
const handleSelectionChange = (checked: IListItem[]) => {
  selection.value = checked || [];
};

// 同步 备注、样衣开发
const { format } = useTableMapInfo();
const accountStore = useAccountStore();
const handleParams = (paramsObj: IParams) => {
  const {
    categoryNameList,
    waveBandCodeList,
    designerIdList,
    // colors = [],
    styleCode,
    designCode,
    sameGroup,
    ...rest
  } = paramsObj;
  // let color = '';
  // if (colors.length === 2) {
  //   color = colors.at(-1)!;
  // }
  if (styleCode) {
    const { value, values } = handleBatchSearchParam(styleCode);
    rest.styleCodeList = values;
    params.value.styleCode = value;
  }
  if (designCode) {
    const { value, values } = handleBatchSearchParam(designCode);
    rest.designCodeList = values;
    params.value.designCode = value;
  }
  return {
    ...rest,
    // color,
    designerIdList: sameGroup === '-1' ? [accountStore.account?.id!] : designerIdList,
    categoryNameList: categoryNameList?.map((v: any) => {
      return v.join('-');
    }) || [],
    waveBandCodeList,
    sameGroup: (sameGroup === '-1' || sameGroup === '') ? undefined : sameGroup,
    designerGroupCodeList: sameGroup === 'YES' ? undefined : paramsObj.designerGroupCodeList,
    imageUpdateStatus: paramsObj.imageUpdateStatus === '-1' ? '' : paramsObj.imageUpdateStatus,
  } as any;
};
const canChangeDesigner = computed(() => {
  if (selection.value.length === 0) return false;
  return selection.value.every(v => !v.isCanceled);
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
} = useList<IListItem, IParams>({
  request: {
    api: postWebV1PrototypeManagePageApi,
    params: {
      pageNum: 1,
      pageSize: 20,
      // colors: [],
      sameGroup: '',
    },
    handleParams,
    handleCustomReset(p, defaultParams) {
      return {
        ...defaultParams,
        sameGroup: p.sameGroup,
      };
    },
  },
  response: {
    async handleResponseData(list) {
      selection.value = [];
      const data = await format(list);
      return data;
    },
  }
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
const canCancel = computed(() => {
  return selection.value.length === 1 && !selection.value[0].isCanceled;
});
/** 能点击复色 */
const canCreateSkc = computed(() => {
  return selection.value.length === 1 && !selection.value[0].isCanceled;
});
const handleExport = async () => {
  const exportDesignCodeList = selection.value.map(v => v.designCode);
  await exportByBlob({
    url: '/sdp-curation/web/v1/prototype-manage/export/excel',
    method: 'post',
    loading: true,
    data: {
      ...handleParams(params.value),
      exportDesignCodeList,
    }
  });
};
const handleColorsMakingBtn = async () => {
  await actionColorsMaking({ prototypeId: selection.value?.[0].prototypeId || '' });
  ElMessage.success('操作成功');
  await handleSearch();
};
/**
 * 取消按钮
 */
const handleCancelStyleNum = () => {
  cancelStyleNumVisible.value = true;
};
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
  changeDesignerDialogState.selection = selection.value || [];
  changeDesignerDialogState.visible = true;
};
/**
 * 设计版单打印
 */
const designOrderMultiplePrintBtnUsable = computed(() => {
  return selection.value.length > 0
      && selection.value.every(v => v.prototypeStatus === DESIGN_ORDER_INFO_ENUM.ALREADY);
});
const designOrderPrintRef = ref<ComponentPublicInstance & { startPrint: () => void; } | null>(null);
const designOrderPrintMultipleState = reactive({
  visible: false,
  dataList: [] as IPrototypePrintBatchRes,
  dataConfirmedList: [] as IPrototypePrintBatchRes,
});
const openDesignOrderMultiplePrint = async () => {
  if (selection.value.length > 10) {
    ElMessage.warning('一次最多同时打印10条数据');
    return;
  }
  const prototypeIdList: string[] = selection.value.map(v => v.prototypeId!) || [];
  const { data = [] } = await fetchMultiplePrototypePrint({ prototypeIdList });
  designOrderPrintMultipleState.dataList = data;
  designOrderPrintMultipleState.visible = true;
};
const beginMultiplePrint = async (confirmedDataList: IPrototypePrintBatchRes) => {
  designOrderPrintMultipleState.visible = false;
  designOrderPrintMultipleState.dataConfirmedList = confirmedDataList;
  await nextTick();
  await designOrderPrintRef.value!.startPrint();
};

// 操作日志
const drawer = reactive({
  visible: false,
  params: {
    prototypeId: ''
  },
});
const init = () => {
  handleSearch(params.value.pageNum);
};

onActivated(() => {
  init();
});
const { openAuditDialog } = usePulsPlmDialog(handleSearch);
const handlePushPlm = () => {
  if (selection.value.filter(v => (v.prototypeStatus !== 2 || v.pushPlmStatus === 3 || v.isCanceled)).length) {
    ElMessage.error('所选数据不包含推送PLM状态为【已取消】SKC状态为【取消】款式资料为【未提交】');
    return;
  }
  openAuditDialog(selection.value);
};
const props = { value: 'id', label: 'name', disabled: 'unable' };
// 款式资料
const PROTOTYPE_STATUS_LIST = computed(() => {
  return [
    { value: PROTOTYPE_STATUS_ENUM.WAITING, label: '未提交', disabled: params.value.pushPlmStatus === PLM_STATUS.LISTED },
    { value: PROTOTYPE_STATUS_ENUM.DONE, label: '已提交' },
  ];
});
// 推送PLM状态
const PLM_STATUS_LIST = computed(() => {
  return [
    { value: PLM_STATUS.PENDING_PUSH, label: '待推送' },
    { value: PLM_STATUS.LISTED, label: '已推送', disabled: params.value.prototypeStatus === PROTOTYPE_STATUS_ENUM.WAITING },
    { value: PLM_STATUS.PUSHFAILED, label: '推送失败' },
    { value: PLM_STATUS.CANCEL, label: '取消' },
  ];
});
// 推送上架
const pushListing = () => {
  if (selection.value.filter(v => (v.prototypeStatus !== 2 || (v.listingStatus !== LISTING_STATUS.PENDING_PUSH && v.listingStatus !== LISTING_STATUS.NOLISTED) || v.isCanceled)).length) {
    ElMessage.error('请选择上架状态状态为【待推送/上架失败】;款式资料为【已提交】;skc非取消状态的数据执行此操作');
  } else {
    handleBatchAbort((selection.value?.map(v => v.prototypeId) ?? []) as string[], handleSearch);
  }
};
</script>
<script lang="ts">
export default {
  name: 'DesignCodeList',
  inheritAttrs: false,
  customOptions: {},
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
      // margin-right: 40px;
      margin-bottom: 0;
      // margin-bottom: 6px;
      :deep(.el-form-item__label) {
        // font-size: 13px;
        font-weight: bold;
      }
      :deep(.el-checkbox__label) {
        font-weight: 400;
        // font-size: 12px;
      }
    }
  }
}
</style>
