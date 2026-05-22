<!--异常处理列表-->
<template>
  <sc-app-page>
    <template #fheader>
      <el-tabs
        v-model="activeName"
        class="header-tabs"
        @tab-click="handleTabChange"
      >
        <el-tab-pane
          v-for="item of tabsList"
          :key="item.value"
          :label="`${item.label}（${item.count}）`"
          :name="item.value"
        />
      </el-tabs>
      <search-area
        v-model="params"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      >
        <!-- <template #techniqueGroup>
          <TechniqueGroupSelect
            v-model="params.techniqueGroup"
            clearable
          />
        </template> -->
        <template #designerIdList>
          <DesignerSelect
            v-model="params.designerIdList"
            clearable
            multiple
            :is-first-load-cache="true"
          />
        </template>
        <template #designerGroupCodeList>
          <DesignerSelect
            v-model="params.designerGroupCodeList"
            :type="DESIGNER_TYPE.DESIGNER_GROUP"
            clearable
            multiple
            :prop="{
              label: 'designerGroupName',
              value: 'designerGroupCode',
            }"
            :is-first-load-cache="true"
          />
        </template>
        <template #patternMakerIdList>
          <UserSelect
            v-model="params.patternMakerIdList"
            clearable
            multiple
          />
        </template>
        <template #timeConsuming>
          <div class="tw-w-full tw-flex">
            <!-- <input-number v-model="params.timeConsumingStart" />
            <p>-</p>
            <input-number v-model="params.timeConsumingEnd" /> -->
            <InputNumberRanger
              v-model:range-start="params.timeConsumingStart"
              v-model:range-end="params.timeConsumingEnd"
              :precision="0"
            />
            <p class="tw-w-60px tw-text-right">
              小时
            </p>
          </div>
        </template>
        <template #sponsorIdList>
          <UserSelect
            v-model="params.sponsorIdList"
            clearable
            multiple
          />
        </template>
        <template #responsibleIdList>
          <UserSelect
            v-model="params.responsibleIdList"
            clearable
            multiple
          />
        </template>
        <template #handlerIdList>
          <UserSelect
            v-model="params.handlerIdList"
            clearable
            multiple
          />
        </template>
        <template #cancelerIdList>
          <UserSelect
            v-model="params.cancelerIdList"
            clearable
            multiple
          />
        </template>
      </search-area>
    </template>
    <template #header>
      <div>
        <!--待处理-->
        <section v-show="activeName === EXCEPTION_STEP_ENUMS.PENDING">
          <el-button
            v-if="BH"
            type="primary"
            :disabled="multipleSelectDisable"
            @click="openRejectDialog"
          >
            驳回
          </el-button>
          <el-button
            v-if="KSCL"
            type="primary"
            :disabled="singleSelectDisable"
            @click="openHandlingStartDialog"
          >
            开始处理
          </el-button>
        </section>
        <!--处理中-->
        <section v-show="activeName === EXCEPTION_STEP_ENUMS.PROCESSING">
          <el-button
            v-if="SQJA"
            type="primary"
            :disabled="singleSelectDisable"
            @click="handleApplySettle"
          >
            申请结案
          </el-button>
        </section>
        <!--驳回待审核-->
        <section
          v-show="activeName === EXCEPTION_STEP_ENUMS.REJECTED_WAIT_REVIEW"
        >
          <el-button
            v-if="TYBH"
            type="primary"
            :disabled="singleSelectDisable"
            @click="handleAgreeReject"
          >
            同意驳回
          </el-button>
          <el-button
            v-if="JJBH"
            type="primary"
            :disabled="singleSelectDisable"
            @click="openRefuseRejectDialog"
          >
            拒绝驳回
          </el-button>
        </section>
        <!--结案待审核-->
        <section
          v-show="activeName === EXCEPTION_STEP_ENUMS.CLOSE_PENDING_REVIEW"
        >
          <el-button
            v-if="TYJA"
            type="primary"
            :disabled="singleSelectDisable"
            @click="handleAgreeClose"
          >
            同意结案
          </el-button>
          <el-button
            v-if="JJJA"
            type="primary"
            :disabled="singleSelectDisable"
            @click="handleRefuseCloseDialog"
          >
            拒绝结案
          </el-button>
        </section>
      </div>
    </template>
    <!-- 主体内容 -->
    <template #main>
      <el-table
        :key="activeName"
        v-loading="tableLoading"
        :data="tableData"
        border
        class="tw-h-full tw-w-full"
        @selection-change="handleSelectionChange"
        @sort-change="handleSort"
      >
        <el-table-column
          fixed="left"
          type="selection"
          width="55"
        />
        <el-table-column
          label="异常单号"
          min-width="120px"
          fixed="left"
        >
          <template #default="{ row }">
            <span>{{ row.exceptionCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="SKC" min-width="150px">
          <template #default="{ row }">
            <div class="flex flex-dir-column">
              <div class="flex flex-dir-row">
                <el-tag
                  v-if="row.isUrgent === YES_NO_ENUM.YES"
                  type="danger"
                >
                  急
                </el-tag>
                <TagTooltip
                  v-if="row.isCancel === YES_NO_ENUM.YES"
                  tooltip-type="exception-cancel"
                  :row="row"
                >
                  <el-tag type="danger">
                    取消
                  </el-tag>
                </TagTooltip>
                <TagTooltip
                  v-if="
                    row.styleReferType === STYLE_REFER_TYPE_ENUM.REFER
                  "
                  tooltip-type="REFER"
                  :row="row"
                >
                  <el-tag>
                    套版
                  </el-tag>
                </TagTooltip>
                <TagTooltip
                  v-if="
                    row.styleReferType === STYLE_REFER_TYPE_ENUM.DERI
                  "
                  tooltip-type="DERI"
                  :row="row"
                >
                  <el-tag>
                    衍生
                  </el-tag>
                </TagTooltip>
                <TagTooltip
                  v-if="row.quoteDesignCode"
                  tooltip-type="modifyStyle"
                  :row="row"
                >
                  <el-tag>
                    改款
                  </el-tag>
                </TagTooltip>
                <TagTooltip
                  v-if="row.referenceDesignCode"
                  tooltip-type="referCode"
                  :row="row"
                >
                  <el-tag>
                    参考
                  </el-tag>
                </TagTooltip>
              </div>
              <sc-copy-text :text="row.designCode" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="图片" min-width="100px">
          <template #default="{ row }">
            <ImageViewer
              v-if="getPictureList(row)?.length"
              class="align-center"
              :list="getPictureList(row)"
            >
              <template #default="{ view }">
                <el-image
                  class="img-thumbnail__table tw-w-70px tw-h-70px"
                  fit="cover"
                  :src="resizeImgByWidth(getPictureList(row)?.[0])"
                  @click="view(0)"
                />
              </template>
            </ImageViewer>
          </template>
        </el-table-column>
        <el-table-column label="相关人员" min-width="150px">
          <template #default="{ row }">
            <p><b>设计师：</b> {{ row.designerName }} </p>
            <p><b>纸样师：</b> {{ row.patternMakerName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="打版类型" min-width="150px">
          <template #default="{ row }">
            <span>{{
              $filters.getEnumLabel(EXCEPTION_SAMPLE_TYPE_LIST, row.sampleType)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="异常类型" min-width="100px">
          <template #default="{ row }">
            <TagTooltip
              tooltip-type="exception-desc"
              :row="row"
            >
              <span>{{ row.exceptionTypeName }}</span>
            </TagTooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="发起人"
          prop="sponsorName"
          min-width="150px"
        />
        <!--以下在已取消tab中不展示-->
        <template v-if="activeName !== EXCEPTION_STEP_ENUMS.CANCELLED">
          <el-table-column
            label="发起阶段"
            prop=""
            min-width="150px"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <!-- <span>{{
                $filters.getEnumLabel(
                  exceptionStepOption,
                  row.exceptionProcessStep
                )
              }}</span> -->
              <span>
                {{ row.exceptionProcessStepDesc || '' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="责任部门"
            prop="responsibleDepartment"
            min-width="150px"
          />
          <el-table-column
            label="责任人"
            prop="responsibleName"
            min-width="150px"
          />
          <!--只在全部tab展示-->
          <el-table-column
            v-if="EXCEPTION_STEP_ENUMS.ALL === activeName"
            label="异常环节"
            min-width="150px"
          >
            <template #default="{ row }">
              <div class="flex flex-dir-column flex-justify-between">
                <span>{{
                  $filters.getEnumLabel(EXCEPTION_STEP_LIST, row.exceptionState)
                }}</span>
              </div>
            </template>
          </el-table-column>
          <!--including：['处理中'，'结案待审核'，'已结案']-->
          <el-table-column
            v-if="
              [
                // EXCEPTION_STEP_ENUMS.PROCESSING,
                EXCEPTION_STEP_ENUMS.CLOSE_PENDING_REVIEW,
                EXCEPTION_STEP_ENUMS.CLOSED,
              ].includes(activeName)
            "
            label="处理人"
            prop="handlerName"
            min-width="150px"
          >
            <template #default="{ row }">
              <span
                v-if="
                  activeName === EXCEPTION_STEP_ENUMS.CLOSED
                    || activeName === EXCEPTION_STEP_ENUMS.CLOSE_PENDING_REVIEW
                "
              >
                {{ row.applyDoneHandlerName || '-' }}
              </span>
              <span v-else>
                {{ row.handlerName }}
              </span>
            </template>
          </el-table-column>
          <!--including：['待处理']-->
          <el-table-column
            v-if="activeName === EXCEPTION_STEP_ENUMS.PENDING"
            label="拒绝驳回原因"
            prop="rejectRejectedReason"
            min-width="150px"
          />
          <!--including：['处理中']-->
          <el-table-column
            v-if="activeName === EXCEPTION_STEP_ENUMS.PROCESSING"
            label="拒绝结案原因"
            prop="rejectFinishReason"
            min-width="150px"
          />
          <!--including：['驳回待审核'，'已️驳回']-->
          <el-table-column
            v-if="
              [
                EXCEPTION_STEP_ENUMS.REJECTED_WAIT_REVIEW,
                EXCEPTION_STEP_ENUMS.REJECTED,
              ].includes(activeName)
            "
            label="驳回原因"
            prop="rejectedReason"
            min-width="150px"
          />
          <el-table-column
            label="当前耗时"
            min-width="150px"
            :sortable="true"
          >
            <template #default="{ row }">
              <span v-html="handleCostTime({ row })" />
            </template>
          </el-table-column>
        </template>
        <!--以下仅在已取消tab中展示-->
        <template v-else>
          <el-table-column label="取消环节" min-width="150px">
            <template #default="{ row }">
              <span>{{
                $filters.getEnumLabel(EXCEPTION_CANCEL_STEP_LIST, row.cancelProcessStep)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="取消人"
            prop="cancelerName"
            min-width="150px"
          />
          <el-table-column label="取消时间" min-width="150px">
            <template #default="{ row }">
              <div class="flex flex-dir-column flex-justify-between">
                <span>{{ $filters.formatTime(row.cancelTime) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="取消原因"
            min-width="150px"
            show-overflow-tooltip
            prop="cancelReason"
          />
        </template>
        <el-table-column
          label="操作记录"
          width="240px"
          fixed="right"
        >
          <template #default="{ row }">
            <remark-record
              v-model="row.remark"
              name-key="createdName"
              time-key="createdTime"
              desc-key="remark"
              :handle-create="(val: string) => handleCreateRecord(row, val)"
            >
              <template #append>
                <el-button
                  type="primary"
                  text
                  @click="handleOperateLog(row.exceptionId)"
                >
                  操作日志
                </el-button>
              </template>
            </remark-record>
          </template>
        </el-table-column>
      </el-table>
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
    <!--操作日志-->
    <operation-log-drawer v-model="drawer.visible" :data="drawer.data" />
    <!--弹窗:待处理-驳回原因-->
    <reject-reason v-model:visible="rejectVisible" @submit="handleReject" />
    <!--弹窗:待处理-开始处理-->
    <handling-start
      v-model:visible="handlingStartVisible"
      @submit="handleHandlingStart"
    />
    <!--弹窗:驳回待审核-拒绝驳回-->
    <refuse-reject
      v-model:visible="refuseRejectVisible"
      @submit="handleRefuseReject"
    />
    <!--弹窗:结案待审核-拒绝结案-->
    <refuse-close
      v-model:visible="refuseCloseVisible"
      @submit="handleRefuseClose"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { usePermissionConfig } from '../use-permission-config';
import {
  EXCEPTION_STEP_ENUMS, EXCEPTION_STEP_LIST, EXCEPTION_CANCEL_STEP_LIST,
  REMARK_BIZ_TYPE_ENUMS,
  LOG_BIZ_TYPE_ENUMS,
  STYLE_REFER_TYPE_ENUM,
  EXCEPTION_SAMPLE_TYPE_LIST,
} from '../constant';
import {
  IAgreeCloseReq,
  IAgreeOverruleReq,
  IApplyCloseReq,
  IExceptionHandleReq,
  IExceptionPageListItem,
  IExceptionProcesStepItem,
  IExceptionRejectReq,
  IExceptionStateCountRes,
  ILogListReq,
  ILogListRes,
  IRejectCloseReq,
  IRejectOverruleReq,
  IRemarkAddReq } from '../api/type';
import {
  deleteExceptionHandleApi,
  patchExceptionHandleApi,
  patchExceptionRejectApi,
  postExceptionHandleApi,
  postExceptionLogApi,
  postExceptionPageApi,
  postExceptionRejectApi,
  postExceptionStateCountApi,
  postRemarkAddApi,
  putExceptionHandleApi,
  putExceptionRejectApi } from '../api';
import { useList } from '@toy/v-use';
import { useSearch } from '../hooks/use-search';
// import TechniqueGroupSelect from '@/modules/common/components/technique-group-select';
import DesignerSelect from '@/modules/common/components/designer-select';
import { DESIGNER_TYPE } from '@/modules/common/components/designer-select/constant';
import UserSelect from '@/modules/common/components/user-select';
import { cloneDeep } from 'lodash-es';
import { ElMessage, TabsPaneContext } from 'element-plus';
import { useTableDataMapRemark } from '../hooks/use-map-remark';
import { YES_NO_ENUM } from '@/constant/global';
import { resizeImgByWidth } from '@/core/utils/helper';
import TagTooltip from '../components/tag-tooltip/index.vue';
import HandlingStart from '../components/dialog/handlingStart.vue';
import RefuseClose from '../components/dialog/refuseClose.vue';
import RefuseReject from '../components/dialog/refuseReject.vue';
import RejectReason from '../components/dialog/rejectReason.vue';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';

const { handleCostTime } = useTimerangeDistance();
const { searchConfig } = useSearch();
const { BH, KSCL, SQJA, TYBH, JJBH, JJJA, TYJA } = usePermissionConfig();
const activeName = ref<EXCEPTION_STEP_ENUMS>(EXCEPTION_STEP_ENUMS.ALL);

// 更新tab上count数
const countData = ref<IExceptionStateCountRes>({
  total: '0',
  stateEnumList: [],
  stateItemList: [],
});
const getCounts = async () => {
  const { data } = await postExceptionStateCountApi({});
  countData.value = data;
};
interface TabItem {
  label: string;
  value: EXCEPTION_STEP_ENUMS;
  count: string | number;
}
const countListRes = {} as {
  [key in EXCEPTION_STEP_ENUMS | '']: string | number;
};
const tabsList = computed(() => {
  countData.value?.stateItemList
        && countData.value.stateItemList.forEach((item) => {
          countListRes[item.state] = parseInt(item.count, 10);
        });
  return ([...EXCEPTION_STEP_LIST] as TabItem[]).map((item) => {
    item.count = item.value !== EXCEPTION_STEP_ENUMS.ALL
      ? countListRes[item.value] || '0'
      : countData.value?.total || '0';
    return item;
  });
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
} = useList({
  request: {
    api: postExceptionPageApi,
    params: {
      pageNum: 1,
      pageSize: 20,
      exceptionState: EXCEPTION_STEP_ENUMS.ALL, // 异常环节
      // search
      designCode: '', // SKC
      techniqueGroup: '', // 技术组别
      sampleClothingExceptionTypeList: [], // 异常类型
      exceptionProcessStepList: [] as IExceptionProcesStepItem[], // 发起阶段
      exceptionProcessStepList2: [] as (string[] | undefined), // 处理环节
      designerIdList: [], // 设计师
      designerGroupCodeList: [], // 设计组别
      patternMakerIdList: [], // 纸样师
      sampleTypeList: [], // 打版类型
      timeConsumingStart: '', // 当前耗时-开始
      timeConsumingEnd: '', // 当前耗时-结束
      sponsorIdList: [], // 发起人
      departmentIdList: [], // 责任部门
      responsibleIdList: [], // 责任人
      handlerIdList: [], // 处理人
      createdTime: [], // 创建时间
      cancelTime: [], // 取消时间
      cancelerIdList: [], // 取消人
      cancelProcessStepList: [], // 取消环节
      // check & radio
      isUrgent: '', // 是否紧急
      isCanceled: '', // 是否取消
      // sort
      timeConsumingSort: '', // 排序
      copyReferType: '',
      extendReferType: '',
      isChange: '',
      isReference: '',
    },
    handleParams(p) {
      const _p = cloneDeep(p);
      if (_p.exceptionProcessStepList2?.length) {
        const list:IExceptionProcesStepItem[] = [];
        _p.exceptionProcessStepList2.forEach((item: string) => {
          const arr = item.split('-');
          list.push({
            exceptionProcessStep: arr[0],
            exceptionProcessNode: arr[1],
            exceptionProcessNodeState: arr[2],
          });
        });
        _p.exceptionProcessStepList = list;
      }
      delete _p.exceptionProcessStepList2;
      return _p;
    },
  },
});

// table勾选项
const selection = ref<IExceptionPageListItem[]>([]);
const handleSelectionChange = (checked: IExceptionPageListItem[]) => {
  selection.value = checked || [];
};

// 按钮控制-单选操作
const singleSelectDisable = computed(() => {
  return selection.value?.length !== 1;
});

// 按钮控制-多选操作
const multipleSelectDisable = computed(() => {
  return selection.value?.length <= 0;
});
interface SortInfo {
  column: Record<string, unknown>;
  order: 'ascending' | 'descending' | '';
  prop: string;
  [propsName: string]: any;
}
// table排序
const handleSort = (sort: SortInfo): void => {
  const { order } = sort;
  params.value.timeConsumingSort = order || '';
  handleSearch();
};

const handleTabChange = (tab: TabsPaneContext, event: Event) => {
  activeName.value = tab.paneName as EXCEPTION_STEP_ENUMS;

  // // 已取消-不展示['当前耗时','发起人','责任部门','责任人','异常环节','处理人','创建时间']
  const cancelHiddenKeys = ['timeConsuming', 'sponsorIdList', 'departmentIdList', 'responsibleIdList'];
  // 已取消-展示:['取消时间','取消人','取消环节']
  const cancelShowKeys = ['cancelTime', 'cancelerIdList', 'cancelProcessStepList'];

  const { ALL, CANCELLED, PROCESSING } = EXCEPTION_STEP_ENUMS;
  // 异常环节
  const exceptionState = searchConfig.value[searchConfig.value.findIndex(n => n.id === 'exceptionState')];
  const createdTime = searchConfig.value[searchConfig.value.findIndex(n => n.id === 'createdTime')]; // 创建时间
  const handlerIdList = searchConfig.value[searchConfig.value.findIndex(n => n.id === 'handlerIdList')]; // 处理人

  // 异常环节including:['全部']
  if (![ALL].includes(activeName.value)) {
    params.value.exceptionState = EXCEPTION_STEP_ENUMS.ALL;
  }
  exceptionState.isHiden = ![ALL].includes(activeName.value);

  // 创建时间excluding:['全部','已取消']
  if ([ALL, CANCELLED].includes(activeName.value)) {
    params.value.createdTimeStart = '';
    params.value.createdTimeEnd = '';
  }
  createdTime.isHiden = [ALL, CANCELLED].includes(activeName.value);

  // 处理人including:['处理中']
  if (![PROCESSING].includes(activeName.value)) {
    params.value.handlerIdList = [];
  }
  handlerIdList.isHiden = ![PROCESSING].includes(activeName.value);

  if (activeName.value === CANCELLED) {
    searchConfig.value.forEach((item) => {
      if (cancelHiddenKeys.includes(item.id as string)) {
        item.isHiden = true;
      }
      if (cancelShowKeys.includes(item.id as string)) {
        item.isHiden = false;
      }
    });
  } else {
    searchConfig.value.forEach((item) => {
      if (cancelHiddenKeys.includes(item.id as string)) {
        item.isHiden = false;
      }
      if (cancelShowKeys.includes(item.id as string)) {
        item.isHiden = true;
      }
    });
  }
  params.value.exceptionState = cloneDeep(activeName.value);
  params.value.pageNum = 1;
  handleSearch();
  getCounts();
};

const init = () => {
  handleSearch();
  getCounts();
};

// 按钮区域 start ⬇️
// 待处理-驳回
const rejectVisible = ref<boolean>(false);
const openRejectDialog = () => {
  rejectVisible.value = true;
};
const handleReject = async (applyRejectReason: string = '') => {
  const param: IExceptionRejectReq = {
    applyRejectReason,
    exceptionIdList: selection.value?.map(item => item.exceptionId),
  };
  await postExceptionRejectApi(param);
  ElMessage.success('提交成功！');
  init();
};

// 待处理-开始处理
const handlingStartVisible = ref<boolean>(false);
const openHandlingStartDialog = () => {
  handlingStartVisible.value = true;
};
interface SelectedObjItem {
  label?: string;
  value?: string | number;
}
const handleHandlingStart = async (handlerInfo: SelectedObjItem = {}) => {
  const param: IExceptionHandleReq = {
    exceptionIdList: selection.value?.map(item => item.exceptionId),
    handlerId: handlerInfo.value || '',
    handlerName: handlerInfo.label || '',
  };
  await postExceptionHandleApi(param);
  ElMessage.success('提交成功！');
  init();
};

// 处理中-申请结案
const handleApplySettle = async () => {
  const param: IApplyCloseReq = {
    exceptionIdList: selection.value?.map(item => item.exceptionId),
  };
  await putExceptionHandleApi(param);
  ElMessage.success('提交成功！');
  init();
};

// 驳回待审核-同意驳回
const handleAgreeReject = async () => {
  const param: IAgreeOverruleReq = {
    exceptionIdList: selection.value?.map(item => item.exceptionId),
  };
  await putExceptionRejectApi(param);
  ElMessage.success('提交成功！');
  await init();
};

// 驳回待审核-拒绝驳回
const refuseRejectVisible = ref<boolean>(false);
const openRefuseRejectDialog = () => {
  refuseRejectVisible.value = true;
};
const handleRefuseReject = async (rollbackReason: string = '') => {
  const param: IRejectOverruleReq = {
    exceptionIdList: selection.value?.map(item => item.exceptionId),
    rollbackReason,
  };
  await patchExceptionRejectApi(param);
  ElMessage.success('提交成功！');
  init();
};

// 结案待审核-同意结案
const handleAgreeClose = async () => {
  const param: IAgreeCloseReq = {
    exceptionIdList: selection.value?.map(item => item.exceptionId),
  };
  await patchExceptionHandleApi(param);
  ElMessage.success('提交成功！');
  await init();
};

// 结案待审核-拒绝结案
const refuseCloseVisible = ref<boolean>(false);
const handleRefuseCloseDialog = () => {
  refuseCloseVisible.value = true;
};
const handleRefuseClose = async (rollbackFinishReason: string = '') => {
  const param: IRejectCloseReq = {
    exceptionIdList: selection.value?.map(item => item.exceptionId),
    rollbackFinishReason,
  };
  await deleteExceptionHandleApi(param);
  ElMessage.success('提交成功！');
  init();
};
// 按钮区域 end ⬆️

// 同步 remark
useTableDataMapRemark<IExceptionPageListItem>(
  tableData,
  'exceptionId',
  REMARK_BIZ_TYPE_ENUMS.ANOMALY,
  'remark' as keyof IExceptionPageListItem,
);

// 添加备注记录
const handleCreateRecord = async (
  row: IExceptionPageListItem,
  remark: string,
) => {
  const { exceptionId } = row;
  const remarkParams: IRemarkAddReq = {
    bizId: exceptionId,
    bizType: REMARK_BIZ_TYPE_ENUMS.ANOMALY,
    remark,
  };
  try {
    await postRemarkAddApi(remarkParams);
    await handleSearch();
  } catch (e) {
    console.error('handleCreateRecord error', e);
  }
};

// 操作日志
const drawer = reactive<{ visible: boolean; data: ILogListRes; }>({
  visible: false,
  data: [] as ILogListRes,
});
const handleOperateLog = async (exceptionId: string) => {
  try {
    const param: ILogListReq = {
      bizId: exceptionId,
      bizType: LOG_BIZ_TYPE_ENUMS.ANOMALY,
    };
    const { data = [] } = await postExceptionLogApi(param);
    drawer.data = data || [];
    drawer.visible = true;
  } catch (e) {
    console.error('handleOperateLog error', e);
  }
};

// 判断图片取值
const getPictureList = (row: IExceptionPageListItem) => {
  if (row.customerPictureList?.length) {
    return row.customerPictureList;
  }
  return row.designPictureList;
};

onBeforeMount(() => {
  getCounts();
  handleSearch();
});

</script>

<style lang="scss" scoped>
.el-tag {
  margin: 5px;
}
</style>
