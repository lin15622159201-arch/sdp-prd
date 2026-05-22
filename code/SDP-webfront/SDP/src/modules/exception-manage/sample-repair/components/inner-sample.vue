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
          :label="`${item.label}${item.count !== -1 ? `（${item.count}）` : ''}`"
          :name="item.value"
        />
      </el-tabs>
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
        <template #repairmanId>
          <UserSelect
            v-model="params.repairmanId"
            clearable
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <Operation>
        <!--待进行-->
        <section v-if="activeName === REPAIR_STEP_ENUMS.PENDING">
          <el-button
            v-if="FQYC"
            size="small"
            type="primary"
            :disabled="singleSelectDisable"
            @click="openExceptionLaunch"
          >
            发起异常
          </el-button>
          <el-button
            v-if="KSFX"
            size="small"
            type="primary"
            :disabled="singleSelectDisable"
            @click="openRepairStartDialog"
          >
            开始返修
          </el-button>
        </section>
        <!--进行中-->
        <section v-if="activeName === REPAIR_STEP_ENUMS.INPROGESS">
          <el-button
            v-if="FQYC"
            size="small"
            type="primary"
            :disabled="singleSelectDisable"
            @click="openExceptionLaunch"
          >
            发起异常
          </el-button>
          <el-button
            v-if="PDBG"
            size="small"
            type="primary"
            :disabled="singleSelectDisable"
            @click="openRepairChange"
          >
            排单变更
          </el-button>
          <el-button
            v-if="FXWC"
            size="small"
            type="primary"
            :disabled="multipleSelectDisable"
            @click="() => {
              if (isAbnormalRows(selection)) {
                return;
              }
              confirmationTimeData.visible = true
            }"
          >
            返修完成
          </el-button>
        </section>
        <template #content>
          <el-form
            :inline="true"
          >
            <el-form-item v-if="activeName !== REPAIR_STEP_ENUMS.COMPLETED" label="异常：">
              <radio-checkbox
                v-model="params.isAbnormal"
                :options="YES_NO_LIST"
                @change="handleSearch()"
              />
            </el-form-item>
            <el-form-item v-if="activeName === REPAIR_STEP_ENUMS.COMPLETED" label="取消：">
              <radio-checkbox
                v-model="params.isCancel"
                :options="YES_NO_LIST"
                @change="handleSearch()"
              />
            </el-form-item>
          </el-form>
        </template>
      </Operation>
    </template>
    <template #main>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        class="tw-h-full"
        border
        style="width: 100%"
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
        <el-table-column label="图片" min-width="100px">
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
        <el-table-column label="相关人员" min-width="150px">
          <template #default="{ row }">
            <div class="flex flex-dir-column flex-justify-between">
              <p><b>纸样师：</b> {{ row.patternMakerName }}</p>
              <p><b>车缝师：</b> {{ row.sewerName }} </p>
              <p v-if="activeName !== REPAIR_STEP_ENUMS.PENDING"><b>返修人：</b> {{ row.repairmanName }} </p>
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
        <el-table-column min-width="120px">
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
              <!-- <span class="align-center">{{row.estimatedTime?row.estimatedTime+'h':''}}</span> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="150px">
          <template #header>
            <div class="tw-flex tw-flex-items-center">
              <div>
                <p>预估耗时</p>
                <p v-show="REPAIR_STEP_ENUMS.COMPLETED === activeName">
                  实际耗时
                </p>
              </div>
              <tag-tooltip>
                <template #content>
                  <p class="margin-bottom-5">
                    预估耗时 = 返修发起人维护的预估耗时；
                  </p>
                  <div v-show="REPAIR_STEP_ENUMS.COMPLETED === activeName">
                    <p class="margin-bottom-5">
                      实际耗时：内部返修实际耗时 = 返修人维护的实际耗时；
                    </p>
                    <p>外部返修实际耗时=内部确定的外版房返修人维护的实际耗时</p>
                  </div>
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
            <p v-if="row.actualCostTime" v-show="REPAIR_STEP_ENUMS.COMPLETED === activeName">
              实际{{ $filters.getEnumLabel(PATTERN_SEW_COMBINE_TYPE_LIST, row.repairTypeSecond) }}
              耗时：{{ row.actualCostTime }}h
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="当前耗时"
          min-width="150"
          :sortable="true"
        >
          <template #default="{ row }">
            <div class="flex flex-dir-column flex-justify-between">
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
    <!--弹窗:开始返修-->
    <repair-start
      v-model:visible="repairStartVisible"
      :selection="selection[0]"
      @submit="handleRepairStart"
    />
    <!--弹窗:发起异常-->
    <error-dialog
      ref="errorDialogRef"
      :launch-buz-type="CLOTHES_STEP_ENUM.REPAIR"
      :launch-buz-id="selection?.[0]?.repairId"
      :can-sync-ext="YES_NO_ENUM.YES"
      @success="handleSearch()"
    />
    <!--弹窗:排单变更-->
    <repair-change
      v-model:visible="repairChangeVisible"
      :selection="selection[0]"
      @submit="handleRepairChange"
    />
    <!-- 返修完成 -->
    <confirmation-time
      v-model="confirmationTimeData.visible"
      :handler="confirmationTimeData.handler"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { useList } from '@toy/v-use';
import { postRepairInnerPageApi, putRepairChangeApi, putRepairFinishApi, putRepairStartApi } from '../api';
import useDict from '../hooks/use-dict';
import UserSelect from '@/modules/common/components/user-select';
import {
  CRAFTS_REQUIRE_LIST,
  DESIGN_DEV_TYPE_LIST,
  REPAIR_STEP_ENUMS,
} from '../constant';
import { YES_NO_LIST, YES_NO_ENUM } from '@/constant/global';
import { computed, onMounted, reactive, ref } from 'vue';
import { IInnerPageListItem, IRepairChangeReq, IRepairStartReq } from '../api/type';
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
import { ElMessage, TabsPaneContext } from 'element-plus';
import RepairStart from './dialog/repair-start.vue';
import RepairChange from './dialog/repair-change.vue';
import ConfirmationTime from './dialog/confirmation-time.vue';
import ErrorDialog from '@/modules/common/components/error-dialog/index.vue';
import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';
import { QuestionFilled } from '@element-plus/icons-vue';
import { useMenuList } from '../hooks/use-left-menu';
import useInnerSampleSearchConfig from '../hooks/use-inner-sample-search-config';
import useIsAbnormal from '../hooks/use-is-abnormal';

const emits = defineEmits(['getCounts']);
interface SelectedObjItem {
  label?: string;
  value?: string | number;
}

const { PLM_REPAIR_REASON_OPTIONS } = useDict();
const { searchConfig } = useInnerSampleSearchConfig();
const { FQYC, KSFX, PDBG, FXWC } = usePermissionConfig();
const { isAbnormalRows } = useIsAbnormal();

const { menuList } = useMenuList();
const activeName = ref<REPAIR_STEP_ENUMS>(REPAIR_STEP_ENUMS.PENDING);
// 更新tab上count数
interface TabItem { label: string; value: REPAIR_STEP_ENUMS; count?: string | number; }
const staticTabs: TabItem[] = [
  { value: REPAIR_STEP_ENUMS.PENDING, label: '待进行' },
  { value: REPAIR_STEP_ENUMS.INPROGESS, label: '进行中' },
  { value: REPAIR_STEP_ENUMS.COMPLETED, label: '已完成' },
];
const innerMenuItem = menuList.value.find(item => item.resourceName === '内部返修');
const tabsList = computed(() => {
  return staticTabs.map((item) => {
    if (item.value === REPAIR_STEP_ENUMS.COMPLETED) {
      item.count = -1;
    } else {
      item.count = innerMenuItem?.countObj[item.value] || 0;
    }
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
    api: postRepairInnerPageApi,
    params: {
      clothesNode: '702',
      clothesStep: '700',
      repairState: REPAIR_STEP_ENUMS.PENDING,
      // search
      designCode: '', // SKC
      techniqueGroup: '', // 技术组别
      patternMakerIdList: [], // 纸样师
      repairProcessStep: '', // 发起环节
      repairReasonCode: '', // 返修原因编码
      repairReasonName: '', // 返修原因名称
      estimatedTimeMin: '', // 预估耗时
      estimatedTimeMax: '', // 预估耗时
      timeConsumingStart: '', // 当前耗时-开始
      timeConsumingEnd: '', // 当前耗时-结束
      // planDeliveryTime: [], // 期望交期
      createdTime: [], // 创建时间
      // deliveryTypeCode: '', // 交期类型编码
      // deliveryTypeName: '', // 交期类型名称
      // deliveryTime: [], // 开发交期
      effectivenessType: '', // 开发时效
      effectivenessTimeStart: '', // 开发时效最小天数
      effectivenessTimeEnd: '', // 开发时效最大天数
      repairmanId: '', // 返修人
      // check & radio
      isUrgent: '', // 是否紧急
      isAbnormal: '', // 是否异常
      isCancel: '', // 是否取消
      copyReferType: '',
      extendReferType: '',
      isChange: '',
      isReference: '',
      createdTimeStart: '',
      createdTimeEnd: '',
      pageNum: 1,
      pageSize: 20,
    },
    handleParams(objPrams) {
      const searchParams = { ...objPrams };
      // const timeRangeKeys = ['planDeliveryTime', 'deliveryTime'];
      // searchParams = handleTimeRangeSplit(searchParams, timeRangeKeys);
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
        repairState: p.repairState,
      };
    },
  },
});

const handleTabChange = async (tab: TabsPaneContext, event: Event) => {
  activeName.value = tab.paneName as REPAIR_STEP_ENUMS;
  emits('getCounts');
  // 处理不同tab中显示和隐藏的查询条件项
  const repairmanId = searchConfig.value.find((n:any) => n.slotName === 'repairmanId');// 返修人
  // 处理人excluding:['待进行']
  if (repairmanId) {
    repairmanId.isHidden = activeName.value === REPAIR_STEP_ENUMS.PENDING;
  }
  if (activeName.value === REPAIR_STEP_ENUMS.PENDING) {
    params.value.repairmanId = '';
  }
  params.value.repairState = activeName.value;
  await handleSearch();
};

// 开发时效类型改变，初始化天数输入框
const handleEffectiveChange = () => {
  params.value.effectivenessTimeStart = '';
  params.value.effectivenessTimeEnd = '';
};

// 同步 remark
useTableDataMapRemark<IInnerPageListItem>(
  tableData,
  'repairId',
  REMARK_BIZ_TYPE_ENUMS.REPAIR,
  'remark' as keyof IInnerPageListItem,
);

// 添加备注记录
const handleCreateRecord = async (row: IInnerPageListItem, remark: string) => {
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
const getPictureList = (row: IInnerPageListItem) => {
  if (row.customerPictureList?.length) {
    return row.customerPictureList;
  }
  return row.designPictureList;
};

// 处理时效与当前耗时
const { handleAgingTime, handleCostTime, handleTimeRangeSplit } = useTimerangeDistance();

// table勾选项
const selection = ref<IInnerPageListItem[]>([]);
const handleSelectionChange = (checked: IInnerPageListItem[]) => {
  selection.value = checked || [];
};
// 按钮控制-仅可单选操作
const singleSelectDisable = computed(() => {
  return selection.value?.length !== 1;
});
// 按钮控制-多选操作
const multipleSelectDisable = computed(() => {
  return selection.value?.length <= 0;
});

// 发起异常
const errorDialogRef = ref();
const openExceptionLaunch = () => {
  errorDialogRef.value.open(selection.value[0]);
};

// 开始返修
const repairStartVisible = ref<boolean>(false);
const openRepairStartDialog = () => {
  if (isAbnormalRows(selection.value)) {
    return;
  }
  repairStartVisible.value = true;
};
const handleRepairStart = async (handlerInfo: SelectedObjItem = {}) => {
  const param: IRepairStartReq = {
    list: selection.value.map((item) => {
      return {
        clothesId: item.clothesId || '',
        repairId: item.repairId || '',
        repairmanId: handlerInfo?.value || '',
        repairmanName: handlerInfo?.label || '',
      };
    }),
  };
  await putRepairStartApi(param);
  ElMessage.success('提交成功！');
  await init();
};

// 排单变更
const repairChangeVisible = ref(false);
const openRepairChange = () => {
  repairChangeVisible.value = true;
};
const handleRepairChange = async (handlerInfo: SelectedObjItem = {}) => {
  const param: IRepairChangeReq = {
    list: selection.value.map((item) => {
      return {
        clothesId: item.clothesId || '',
        repairId: item.repairId || '',
        repairmanId: handlerInfo?.value || '',
        repairmanName: handlerInfo?.label || '',
      };
    }),
  };
  await putRepairChangeApi(param);
  ElMessage.success('提交成功！');
  await init();
};

const confirmationTimeData = reactive({
  visible: false,
  async handler(confirmCostTime: string) {
    const ajaxData = {
      list: selection.value.map((item) => {
        return {
          repairId: item.repairId || '',
          clothesId: item.clothesId || '',
          confirmCostTime,
        };
      }),
    };
    await putRepairFinishApi(ajaxData);
    ElMessage.success('提交成功！');
    init();
  },
});

onMounted(() => {
  handleSearch();
});

</script>

<style lang="scss" scoped>
//
</style>
