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
        <template #content>
          <el-form
            :inline="true"
          >
            <!-- <el-form-item label="紧急：">
              <radio-checkbox
                v-model="params.isUrgent"
                :options="YES_NO_LIST"
                @change="handleSearch()"
              />
            </el-form-item> -->
            <el-form-item label="取消：">
              <radio-checkbox
                v-model="params.isCancel"
                :options="YES_NO_LIST"
                @change="handleSearch()"
              />
            </el-form-item>
            <el-form-item label="返修分单：">
              <radio-checkbox
                v-model="params.roomType"
                :options="REPAIR_OUT_IN_LIST"
                @change="handleSearch()"
              />
            </el-form-item>
            <!-- <el-form-item label="套版：">
              <radio-checkbox
                v-model="params.copyReferType"
                :options="YES_NO_LIST"
                @change="handleSearch()"
              />
            </el-form-item>
            <el-form-item label="衍生：">
              <radio-checkbox
                v-model="params.extendReferType"
                :options="YES_NO_LIST"
                @change="handleSearch()"
              />
            </el-form-item> -->
            <!-- <el-form-item label="改款：">
              <radio-checkbox
                v-model="params.isChange"
                :options="YES_NO_LIST"
                @change="handleSearch()"
              />
            </el-form-item>
            <el-form-item label="参考">
              <RadioCheckbox
                v-model="params.isReference"
                :options="YES_NO_LIST"
                @change="handleSearch()"
              />
            </el-form-item> -->
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
        <!-- <el-table-column
          type="selection"
          fixed="left"
          width="55"
        /> -->
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
            样衣<br>版本
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
          label="收货件数"
          prop="receivedNum"
          min-width="150px"
        />
        <el-table-column label="相关人员" min-width="150px">
          <template #default="{ row }">
            <div>
              <p><b>纸样师：</b> {{ row.patternMakerName }}</p>
              <p><b>车缝师：</b> {{ row.sewerName }} </p>
              <p><b>返修人：</b> {{ row.repairmanName }} </p>
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
            <div>
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
                <div>
                  <div>
                    <span><b>返修原因：</b>{{ row.repairReasonName }}</span>
                  </div>
                  <div class="tw-mt-10px">
                    <span><b>返修责任方：</b>{{ row.responsiblePartyName }}</span>
                  </div>
                  <div class="tw-mt-10px">
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
            <div class="tw-flex tw-items-center">
              <div>
                <p>预估耗时</p>
                <p>实际耗时</p>
              </div>
              <tag-tooltip>
                <template #content>
                  <p class="margin-bottom-5">
                    预估耗时 = 返修发起人维护的预估耗时；
                  </p>
                  <p class="margin-bottom-5">
                    实际耗时：内部返修实际耗时 = 返修人维护的实际耗时；
                  </p>
                  <p>外部返修实际耗时 = 内部确定的外版房返修人维护的实际耗时</p>
                </template>
                <div class="icon-wrapper flex flex-align-center tw-ml-5px">
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
            <p v-if="row.actualCostTime">
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
            <div class="flex flex-dir-column flex-justify-between">
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
  </sc-app-page>
</template>

<script lang="ts" setup>
import { useList } from '@toy/v-use';
import { postRepairAllPageApi } from '../api';
import useDict from '../hooks/use-dict';
import UserSelect from '@/modules/common/components/user-select';
import ClothingRoomSelect from '@/modules/common/components/clothing-room-select';
import {
  CRAFTS_REQUIRE_LIST,
  DESIGN_DEV_TYPE_LIST,
  REPAIR_STEP_ENUMS,
  REPAIR_OUT_IN_LIST,
} from '../constant';
import { YES_NO_LIST, YES_NO_ENUM } from '@/constant/global';
import { onMounted, reactive, ref } from 'vue';
import { IAllPageListItem } from '../api/type';
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
import { QuestionFilled } from '@element-plus/icons-vue';
import useCompletedSearchConfig from '../hooks/use-completed-search-config';

const { PLM_REPAIR_REASON_OPTIONS } = useDict();
const { searchConfig } = useCompletedSearchConfig();

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
    api: postRepairAllPageApi,
    params: {
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
      roomIdList: [], // 供应商
      repairmanId: '', // 返修人

      // deliveryTypeName: '', // 交期类型
      // deliveryTime: [], // 开发交期
      effectivenessType: '', // 开发时效
      effectivenessTimeStart: '', // 开发时效最小天数
      effectivenessTimeEnd: '', // 开发时效最大天数

      // check & radio
      repairState: REPAIR_STEP_ENUMS.ALLCOMPLETED,
      isUrgent: '', // 是否紧急
      isCancel: '', // 是否取消
      roomType: '', // 返修分单
      copyReferType: '',
      extendReferType: '',
      isChange: '', // 改款
      isReference: '', // 参考
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
  },
});

// 开发时效类型改变，初始化天数输入框
const handleEffectiveChange = () => {
  params.value.effectivenessTimeStart = '';
  params.value.effectivenessTimeEnd = '';
};

// 同步 remark
useTableDataMapRemark<IAllPageListItem>(
  tableData,
  'repairId',
  REMARK_BIZ_TYPE_ENUMS.REPAIR,
  'remark' as keyof IAllPageListItem,
);

// 添加备注记录
const handleCreateRecord = async (row: IAllPageListItem, remark: string) => {
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

// table排序
const handleSort = (sort: SortInfo): void => {
  const { order } = sort;
  params.value.timeConsumingSort = order || '';
  handleSearch();
};

// 判断图片取值
const getPictureList = (row: IAllPageListItem) => {
  if (row.customerPictureList?.length) {
    return row.customerPictureList;
  }
  return row.designPictureList;
};

// 处理时效与当前耗时
const { handleAgingTime, handleCostTime, handleTimeRangeSplit } = useTimerangeDistance();

// table勾选项
const selection = ref<IAllPageListItem[]>([]);
const handleSelectionChange = (checked: IAllPageListItem[]) => {
  selection.value = checked || [];
};

onMounted(() => {
  handleSearch();
});

</script>

<style lang="scss" scoped>
//
</style>
