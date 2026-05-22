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
        <template #roomIdList>
          <ClothingRoomSelect
            v-model="params.roomIdList"
            clearable
            multiple
            :inner="true"
          />
        </template>
        <template #repairmanId>
          <UserSelect
            v-model="params.repairmanId"
            clearable
          />
        </template>
        <template #cancelUserIdList>
          <UserSelect
            v-model="params.cancelUserIdList"
            clearable
            multiple
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
            <el-form-item label="异常：">
              <radio-checkbox
                v-model="params.isAbnormal"
                :options="YES_NO_LIST"
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
            </el-form-item>
            <el-form-item label="改款：">
              <radio-checkbox
                v-model="params.isChange"
                :options="YES_NO_LIST"
                @change="handleSearch()"
              />
            </el-form-item> -->
            <!-- <el-form-item label="参考">
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
        <el-table-column min-width="180px">
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
                  <p>
                    外部返修实际耗时 = 内部确定的外版房返修人维护的实际耗时；
                  </p>
                </template>
                <div>
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
        <el-table-column label="取消环节" min-width="150px">
          <template #default="{ row }">
            <span>{{ $filters.getEnumLabel(REPAIR_STATE_ALL_LIST, row.repairState) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="取消人"
          min-width="150px"
          prop="cancelUserName"
        />
        <el-table-column label="取消时间" min-width="180px">
          <template #default="{ row }">
            <span>{{ $filters.formatTime(row.cancelTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="取消原因"
          min-width="150px"
          show-overflow-tooltip
          prop="cancelReason"
        />
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
import { CRAFTS_REQUIRE_LIST, REPAIR_STATE_ALL_LIST, REPAIR_STEP_ENUMS } from '../constant';
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
import { QuestionFilled } from '@element-plus/icons-vue';
import useCancelSearchConfig from '../hooks/use-cancel-search-config';

const { PLM_REPAIR_REASON_OPTIONS } = useDict();
const { searchConfig } = useCancelSearchConfig();

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
      isCancelPage: '1',
      designCode: '', // SKC
      techniqueGroup: '', // 技术组别
      // cancelProcessStep: '', // 取消环节
      repairState: '', // 取消环节

      cancelTime: [], // 取消时间
      repairProcessStep: '', // 发起环节
      repairReasonCode: '', // 返修原因编码
      repairReasonName: '', // 返修原因名称
      cancelUserIdList: [], // 取消人
      repairmanId: '', // 返修人
      estimatedTimeMin: '', // 预估耗时
      estimatedTimeMax: '', // 预估耗时
      roomIdList: [], // 供应商

      // check & radio
      isUrgent: '', // 是否紧急
      isAbnormal: '', // 是否异常
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
      searchParams.repairState = searchParams.repairState || REPAIR_STEP_ENUMS.CANCELLED;
      return searchParams;
    },
  },
});

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
