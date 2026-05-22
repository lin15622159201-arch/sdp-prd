<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      >
        <template #repairReasonCode>
          <el-select v-model="params.repairReasonCode">
            <el-option
              v-for="item in PLM_REPAIR_REASON_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template #patternMakerIdList>
          <UserSelect
            v-model="params.patternMakerIdList"
            clearable
            multiple
          />
        </template>
        <template #estimatedTime>
          <div class="tw-w-full tw-flex">
            <InputNumberRanger
              v-model:range-start="params.estimatedTimeMin"
              v-model:range-end="params.estimatedTimeMax"
              :precision="0"
            />
            <p class="tw-w-60px tw-text-right">
              小时
            </p>
          </div>
        </template>
        <template #timeConsuming>
          <div class="tw-w-full tw-flex">
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
        <template #effectivenessType>
          <div class="switch-label tw-flex tw-pl-10px">
            <el-select
              v-model="params.effectivenessType"
              @change="handleEffectiveChange"
              class="tw-w-96px"
            >
              <el-option
                v-for="(it, i) in DESIGN_DEV_TYPE_LIST"
                :key="i"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
            <div class="tw-flex tw-flex-1 tw-ml-16px">
              <input-number
                v-model="params.effectivenessTimeStart"
                :disabled="!params.effectivenessType"
                :precision="0"
              />
              <p>-</p>
              <input-number
                v-model="params.effectivenessTimeEnd"
                :disabled="!params.effectivenessType"
                :precision="0"
              />
            </div>
          </div>
        </template>
        <template #roomIdList>
          <ClothingRoomSelect
            v-model="params.roomIdList"
            clearable
            multiple
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <operation>
        <el-button
          v-if="
            activeMenu !== MENU_RESOURCE_URL_ENUM.OUTER_CONFIRMATION_TIME
              && FQYC
          "
          type="primary"
          :disabled="btnDisabled"
          @click="openExceptionLaunch"
        >
          发起异常
        </el-button>
        <el-button
          v-if="
            activeMenu === MENU_RESOURCE_URL_ENUM.OUTER_RECEIVE
              && QRSH
          "
          type="primary"
          :disabled="btnDisabled"
          @click="openRepairReceiptDialog"
        >
          确认收货
        </el-button>
        <el-button
          v-if="
            activeMenu === MENU_RESOURCE_URL_ENUM.OUTER_CONFIRMATION_TIME
              && QRHS
          "
          type="primary"
          :disabled="isConfirmationTimeDisabled"
          @click="() => {
            if (isAbnormalRows(selection)) {
              return;
            }
            confirmationTimeData.visible = true
          }"
        >
          确认耗时
        </el-button>
        <template #content>
          <el-form
            :inline="true"
          >
            <el-form-item label="环节状态：">
              <el-radio-group v-model="params.repairState">
                <el-radio
                  v-for="item in checkStatusList"
                  :key="item.value"
                  :label="item.value"
                  @change="() => handleSearch()"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="异常：">
              <radio-checkbox
                v-model="params.isAbnormal"
                :options="YES_NO_LIST"
                @change="handleSearch()"
              />
            </el-form-item>
          </el-form>
        </template>
      </operation>
    </template>
    <template #main>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        class="tw-h-full"
        border
        @selection-change="handleSelectionChange"
        @sort-change="handleSort"
      >
        <el-table-column
          type="selection"
          fixed="left"
          width="55"
          :selectable="(row) => row.isCancel === YES_NO_ENUM.NO"
        />
        <el-table-column
          label="返修单号"
          min-width="150px"
          fixed="left"
        >
          <template #default="{ row }">
            <span>{{ row.repairCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="SKC" min-width="150px">
          <template #default="{ row }">
            <sc-copy-text :text="row.designCode" />
            <div class="tw-flex tw-gap-10px tw-flex-wrap">
              <!-- <el-tag
                v-if="row.isUrgent === YES_NO_ENUM.YES"
                type="danger"
              >
                急
              </el-tag> -->
              <el-tag type="danger" v-if="row.isAbnormal === YES_NO_ENUM.YES">
                异常
              </el-tag>
              <TagTooltip
                v-if="row.isCancel === YES_NO_ENUM.YES"
                tooltip-type="repair-cancel"
                :row="row"
              >
                <el-tag type="danger">
                  取消
                </el-tag>
              </TagTooltip>
              <!-- <TagTooltip
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
              </TagTooltip> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="versionNum" min-width="80px">
          <template #header>
            <p>样衣</p>
            版本
          </template>
        </el-table-column>
        <el-table-column label="图片" width="100px">
          <template #default="{ row }">
            <ImageViewer
              v-if="getPictureList(row)?.length"
              :list="getPictureList(row)"
              class="align-center"
            >
              <template #default="{ view }">
                <el-image
                  class="img-thumbnail__table tw-w-70px tw-h-70px"
                  fit="cover"
                  :src="$filters.ossUrl(getPictureList(row)?.[0])"
                  @click="view(0)"
                />
              </template>
            </ImageViewer>
          </template>
        </el-table-column>
        <el-table-column prop="repairNum" min-width="80px">
          <template #header>
            返修<br>件数
          </template>
        </el-table-column>
        <el-table-column
          v-if="activeMenu === MENU_RESOURCE_URL_ENUM.OUTER_RECEIVE"
          label="收货件数"
          prop="receivedNum"
          min-width="80px"
        />
        <el-table-column label="相关人员" min-width="150px">
          <template #default="{ row }">
            <div class="flex flex-dir-column flex-justify-between">
              <p><b>纸样师：</b> {{ row.patternMakerName }}</p>
              <p><b>车缝师：</b> {{ row.sewerName }} </p>
              <p><b>供应商：</b> {{ row.roomName }} </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="二次工艺&裁剪方法" min-width="180px">
          <template #default="{ row }">
            <div class="desc-lis">
              <p v-for="item in row.craftList" :key="item">
                <b>{{ item.craftsProcessName || $filters.getEnumLabel(CRAFTS_REQUIRE_LIST, item.craftsRequire) }}：</b>
                <span v-for="name in item.nameList" :key="name">{{ name || '-' }}；</span>
              </p>
            </div>
            <el-tag v-if="row.cuttingMethod">
              {{ row.cuttingMethod }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column min-width="135px">
          <template #header>
            返修类型<br>返修耗时
          </template>
          <template #default="{ row }">
            <div class="flex flex-dir-column flex-justify-between">
              <span style="color: #CD001D">{{ $filters.getEnumLabel(PATTERN_SEW_COMBINE_LIST, row.repairType) }}</span>
              <span><b>{{ $filters.getEnumLabel(TIME_CONSUMING_TEXT_LIST, row.repairTypeSecond) }}：
              </b>{{ row.estimatedTime || '-' }}h</span>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column min-width="150px">
          <template #header>
            <p>返修类型</p>
            <p>发起环节</p>
          </template>
          <template #default="{ row }">
            <p style="color: #CD001D" class="tw-pl-12px">
              {{ $filters.getEnumLabel(PATTERN_SEW_COMBINE_LIST, row.repairType) }}
            </p>
            <div class="flex flex-dir-column flex-justify-between">
              <el-popover
                placement="top-start"
                :width="320"
                trigger="hover"
              >
                <template #reference>
                  <el-button type="text">
                    {{ row.repairProcessStepDesc }}
                    <!-- {{ $filters.getEnumLabel(LAUNCH_STEP_LIST,row.repairProcessStep) }} -->
                  </el-button>
                </template>
                <div class="flex flex-dir-column">
                  <div>
                    <span><b>返修原因：</b>{{ row.repairReasonName }}</span>
                  </div>
                  <div class="margin-top-10">
                    <span><b>返修责任方：</b>{{ row.responsiblePartyName }}</span>
                  </div>
                  <div class="margin-top-10">
                    <span><b>返修描述：</b>{{ row.repairDescription }}</span>
                  </div>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="150px">
          <template #header>
            <div class="tw-flex tw-item-center">
              <div>
                <p>预估耗时</p>
                <p v-show="isShowActualCostTimeData">
                  实际耗时
                </p>
              </div>
              <tag-tooltip>
                <template #content>
                  <p
                    :class="{
                      'margin-bottom-5': isShowActualCostTimeData
                    }"
                  >
                    预估耗时 = 返修发起人维护的预估耗时；
                  </p>
                  <p
                    v-show="isShowActualCostTimeData"
                    class="margin-bottom-5"
                  >
                    实际耗时：内部返修实际耗时 = 返修人维护的实际耗时；
                  </p>
                  <p v-show="isShowActualCostTimeData">
                    外部返修实际耗时 = 内部确定的外版房返修人维护的实际耗时；
                  </p>
                </template>
                <div class="icon-wrapper flex flex-align-center">
                  <el-icon>
                    <question-filled />
                  </el-icon>
                </div>
              </tag-tooltip>
            </div>
          </template>
          <template #default="{ row }">
            <p v-if="row.estimatedTime">
              预估{{ $filters.getEnumLabel(PATTERN_SEW_COMBINE_TYPE_LIST, row.repairTypeSecond) }}
              耗时：{{ row.estimatedTime }}h
            </p>
            <p
              v-if="row.actualCostTime"
              v-show="isShowActualCostTimeData"
            >
              实际{{ $filters.getEnumLabel(PATTERN_SEW_COMBINE_TYPE_LIST, row.repairTypeSecond) }}
              耗时：{{ row.actualCostTime }}h
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="期望交期" width="95px">
          <template #default="{row}">
            <span>{{ $filters.formatTime(row.planDeliveryTime,'yyyy-MM-dd') }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="开发交期" width="145">
          <template #default="{row}">
            <div class="flex flex-dir-column flex-justify-between">
              <span><b>交期类型</b>：{{ row.deliveryTypeName }}</span>
              <span>{{ $filters.formatTime(row.deliveryTime) }}</span>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          label="当前耗时"
          min-width="180"
          :sortable="true"
        >
          <template #default="{ row }">
            <div class="tw-flex flex-dir-column flex-justify-between">
              <!-- <span>
                <b>时效</b>:
                <span v-html="handleAgingTime({row,currentTimeKey:'currentLocalTime'})" />
              </span> -->
              <span>
                <b>当前耗时</b>：
                <span v-html="handleCostTime({ row })" />
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作记录"
          width="230px"
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
                <el-button type="text" @click="handleOperateLog(row.repairId)">
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
          :current-page="params?.pageNum"
          :size="params?.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
    <!--操作日志-->
    <operation-log-drawer v-model="drawer.visible" :data="drawer.data" />
    <!--弹窗:发起异常-->
    <error-dialog
      ref="errorDialogRef"
      :launch-buz-type="CLOTHES_STEP_ENUM.REPAIR"
      :launch-buz-id="selection?.[0]?.repairId"
      :can-sync-ext="YES_NO_ENUM.YES"
      @success="handleSearch()"
    />
    <!--弹窗:确认收货 -->
    <repair-receipt
      v-model:visible="repairReceiptVisible"
      :repair-num="selection?.[0]?.repairNum"
      :repair-type="selection?.[0]?.repairType"
      @submit="handleRepairReceipt"
    />
    <!-- 确认耗时 -->
    <confirmation-time
      v-model="confirmationTimeData.visible"
      :handler="confirmationTimeData.handler"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { useList } from '@toy/v-use';
import {
  postRepairOuterPageApi,
  putRepairConfirmCostTimeApi,
  putRepairReceiptApi,
} from '../api';
import useDict from '../hooks/use-dict';
import UserSelect from '@/modules/common/components/user-select';
import ClothingRoomSelect from '@/modules/common/components/clothing-room-select';
import {
  CRAFTS_REQUIRE_LIST,
  DESIGN_DEV_TYPE_LIST,
  REPAIRING_STATUS_LIST,
  WAIT_ORDER_STATUS_LIST,
  RECEIVE_STATUS_LIST,
  CONFIRMATION_TIME_LIST,
  REPAIR_STEP_ENUMS,
} from '../constant';
import { YES_NO_LIST, YES_NO_ENUM } from '@/constant/global';
import { computed, onMounted, PropType, reactive, ref, watch, watchEffect } from 'vue';
import {
  IExternalPageListItem,
  IRepairReceiptReq,
} from '../api/type';
import { ILogListReq, ILogListRes, IRemarkAddReq, SortInfo } from '../../exception-handle/api/type';
import { useTableDataMapRemark } from '../../exception-handle/hooks/use-map-remark';
import {
  LOG_BIZ_TYPE_ENUMS,
  REMARK_BIZ_TYPE_ENUMS,
  STYLE_REFER_TYPE_ENUM,
  PATTERN_SEW_COMBINE_LIST,
  PATTERN_SEW_COMBINE_TYPE_LIST,
} from '../../exception-handle/constant';
import { postExceptionLogApi, postRemarkAddApi } from '../../exception-handle/api';
import TagTooltip from '../../exception-handle/components/tag-tooltip/index.vue';
import OperationLogDrawer from '@/modules/common/components/operation-log-drawer/index.vue';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';
import usePermissionConfig from '../use-permission-config';
import { ElMessage } from 'element-plus';
import ConfirmationTime from './dialog/confirmation-time.vue';
import RepairReceipt from './dialog/repair-receipt.vue';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import { QuestionFilled } from '@element-plus/icons-vue';
import useOuterSampleSearchConfig from '../hooks/use-outer-sample-search-config';
import { MENU_RESOURCE_URL_ENUM } from '../hooks/use-left-menu';
import { computedEager } from '@vueuse/core';
import useIsAbnormal from '../hooks/use-is-abnormal';

const props = defineProps({
  activeMenu: {
    type: String as PropType<MENU_RESOURCE_URL_ENUM>,
    default: '',
  },
});
const emits = defineEmits(['getCounts']);

const { PLM_REPAIR_REASON_OPTIONS } = useDict();
const { searchConfig } = useOuterSampleSearchConfig();
const { FQYC, QRHS, QRSH } = usePermissionConfig();
/** 环节状态 */
const checkStatusList = computed(() => {
  const { activeMenu } = props;
  if (activeMenu === MENU_RESOURCE_URL_ENUM.OUTER_REPAIRING) {
    return REPAIRING_STATUS_LIST;
  }
  if (activeMenu === MENU_RESOURCE_URL_ENUM.OUTER_RECEIVE) {
    return RECEIVE_STATUS_LIST;
  }
  if (activeMenu === MENU_RESOURCE_URL_ENUM.OUTER_CONFIRMATION_TIME) {
    return CONFIRMATION_TIME_LIST;
  }
  return WAIT_ORDER_STATUS_LIST;
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
    api: postRepairOuterPageApi,
    params: {
      clothesNode: '703',
      clothesStep: '700',
      // search
      designCode: '', // SKC
      techniqueGroup: '', // 技术组别
      patternMakerIdList: [], // 纸样师
      // patternMakerName: '', // 纸样师
      repairProcessStep: '', // 发起环节
      // processStep: '', // 发起环节
      repairReasonCode: '', // 返修原因编码
      repairReasonName: '', // 返修原因名称
      estimatedTimeMin: '', // 预估耗时
      estimatedTimeMax: '', // 预估耗时
      timeConsumingStart: '', // 当前耗时-开始
      timeConsumingEnd: '', // 当前耗时-结束
      // planDeliveryTime: [], // 期望交期
      createdTimeStart: '', // 创建时间开始
      createdTimeEnd: '', // 创建时间结束
      createdTime: [], // 创建时间
      roomIdList: [], // 供应商
      // deliveryTypeCode: '', // 交期类型编码
      // deliveryTime: [], // 开发交期
      effectivenessType: '', // 开发时效
      effectivenessTimeStart: '', // 开发时效最小天数
      effectivenessTimeEnd: '', // 开发时效最大天数
      // check & radio
      repairState: checkStatusList.value?.[0].value || '', // 环节状态
      isUrgent: '', // 是否紧急
      isAbnormal: '', // 是否异常
      copyReferType: '', // 套版
      extendReferType: '', // 衍生
      isChange: '', // 改款
      isReference: '', // 参考
      pageNum: 1,
      pageSize: 20,
    },
    handleParams(objPrams) {
      const { activeMenu } = props;
      if (activeMenu === MENU_RESOURCE_URL_ENUM.OUTER_WAIT_ORDER) {
        objPrams.clothesNode = '703';
      } else if (activeMenu === MENU_RESOURCE_URL_ENUM.OUTER_REPAIRING) {
        objPrams.clothesNode = '704';
      } else if (activeMenu === MENU_RESOURCE_URL_ENUM.OUTER_RECEIVE) {
        objPrams.clothesNode = '705';
      } else {
        objPrams.clothesNode = '';
      }
      const searchParams = { ...objPrams };
      // 返修原因code name全都要
      if (searchParams.repairReasonCode) {
        const c = PLM_REPAIR_REASON_OPTIONS.value.find(n => n.value === searchParams.repairReasonCode);
        if (c) {
          searchParams.repairReasonName = c.label;
        }
      }
      return searchParams;
    },
    handleCustomReset(p, defaultParams) {
      return {
        ...defaultParams,
        repairState: checkStatusList.value[0].value || '',
      };
    },
  },
});
watch(
  () => props.activeMenu,
  () => {
    if (checkStatusList.value.length) {
      params.value.repairState = checkStatusList.value[0].value;
    }
    handleReset();
  },
);

// 开发时效类型改变，初始化天数输入框
const handleEffectiveChange = () => {
  params.value.effectivenessTimeStart = '';
  params.value.effectivenessTimeEnd = '';
};

// 同步 remark
useTableDataMapRemark<IExternalPageListItem>(
  tableData,
  'repairId',
  REMARK_BIZ_TYPE_ENUMS.REPAIR,
  'remark' as keyof IExternalPageListItem,
);

// 添加备注记录
const handleCreateRecord = async (row: IExternalPageListItem, remark: string) => {
  const { repairId } = row;
  const remarkParams: IRemarkAddReq = {
    bizId: repairId,
    bizType: REMARK_BIZ_TYPE_ENUMS.REPAIR,
    remark,
  };
  await postRemarkAddApi(remarkParams);
  await handleSearch();
};

// 操作日志
const drawer = reactive<{ visible: boolean; data: ILogListRes; }>({
  visible: false,
  data: [] as ILogListRes,
});
const handleOperateLog = async (repairId: string) => {
  const param: ILogListReq = {
    bizId: repairId,
    bizType: LOG_BIZ_TYPE_ENUMS.REPAIR,
  };
  const { data = [] } = await postExceptionLogApi(param);
  drawer.data = data || [];
  drawer.visible = true;
};

const init = () => {
  emits('getCounts');
  handleSearch();
};

// table排序
const handleSort = (sort: SortInfo): void => {
  const { order } = sort;
  params.value.timeConsumingSort = order || '';
  handleSearch();
};

// 判断图片取值
const getPictureList = (row: IExternalPageListItem) => {
  if (row.customerPictureList?.length) {
    return row.customerPictureList;
  }
  return row.designPictureList;
};

// 处理时效与当前耗时
const { handleAgingTime, handleCostTime, handleTimeRangeSplit } = useTimerangeDistance();

// table勾选项
const selection = ref<IExternalPageListItem[]>([]);
const handleSelectionChange = (checked: IExternalPageListItem[]) => {
  selection.value = checked || [];
};

const isShowActualCostTimeData = ref(false);
watchEffect(() => {
  if ([
    MENU_RESOURCE_URL_ENUM.OUTER_RECEIVE,
    MENU_RESOURCE_URL_ENUM.OUTER_CONFIRMATION_TIME,
  ].includes(props.activeMenu)) {
    isShowActualCostTimeData.value = true;
  } else {
    isShowActualCostTimeData.value = false;
  }
});

watch(
  () => props.activeMenu,
  () => {
    handleSearch();
  },
  // { deep: true }
);

/**
     * 是否禁用 确认耗时按钮
     *
     * true 禁用
     * false 不禁用
     */
const isConfirmationTimeDisabled = computedEager(() => {
  // 没有选择就禁用
  if (!selection.value?.length) {
    return true;
  }
  return !(selection.value.every((item) => {
    /**
         * repairState == '12' && confirmCostState === '0'就是 待确认状态
         */
    return item.repairState === REPAIR_STEP_ENUMS.RECEIVED
          && item.confirmCostState === YES_NO_ENUM.NO;
  }));
});

const confirmationTimeData = reactive({
  visible: false,
  async handler(confirmCostTime: string) {
    const ajaxData = {
      list: selection.value.map((item) => {
        return {
          clothesId: item.clothesId || '',
          repairId: item.repairId || '',
          confirmCostTime,
        };
      }),
    };
    await putRepairConfirmCostTimeApi(ajaxData);
    ElMessage.success('操作成功');
    await init();
  },
});

// 按钮校验
const btnDisabled = computed(() => {
  return !(
    selection.value?.length === 1
        && selection.value?.[0]?.repairState === checkStatusList.value[0].value
  );
});

// 发起异常
const errorDialogRef = ref();
const openExceptionLaunch = () => {
  // errorDialogRef.value.open();
  errorDialogRef.value.open(selection.value[0]);
};
const { isAbnormalRows } = useIsAbnormal();

// 确认收货
const repairReceiptVisible = ref<boolean>(false);
const openRepairReceiptDialog = () => {
  if (isAbnormalRows(selection.value)) {
    return;
  }
  repairReceiptVisible.value = true;
};
const handleRepairReceipt = async (receivedNum: string = '') => {
  const param: IRepairReceiptReq = {
    list: selection.value.map((item) => {
      return {
        clothesId: item.clothesId || '',
        repairId: item.repairId || '',
        receivedNum,
      };
    }),
  };
  await putRepairReceiptApi(param);
  ElMessage.success('提交成功！');
  await init();
};

onMounted(() => {
  handleSearch();
});

</script>

<style lang="scss" scoped>
//
</style>
