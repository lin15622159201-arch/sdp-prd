<template>
  <div class="tw-flex-1 list-wrap">
    <div
      v-for="(item) in data"
      :key="item.pickingId"
      class="list"
      :class="{
        'list-selected': sign && selecteds.includes(item.pickingId),
      }"
    >
      <div class="tw-flex tw-items-center tw-justify-between tw-min-h-20px">
        <div class="tw-flex tw-items-center tw-color-[#606266] tw-flex-wrap tw-flex-1 tw-mr-20px text-wrap">
          <el-tooltip :content="item.externalCategory">
            <p class="tw-ml-36px tw-shrink-0 tw-max-w-360px ellipsis">外部品类：{{ item.externalCategory }}</p>
          </el-tooltip>
          <el-tooltip :content="item.identifyCategoryName">
            <p class="tw-ml-36px tw-shrink-0 tw-max-w-360px ellipsis">
              算法品类：{{ item.identifyCategoryName }}
            </p>
          </el-tooltip>
          <p class="tw-ml-36px tw-shrink-0">灵感波次：{{ item.waveBatchName }}</p>
          <p class="tw-ml-36px tw-shrink-0">编号：{{ item.taskCode }}</p>
          <p class="tw-ml-36px tw-shrink-0">创建人：{{ item.creatorName }}</p>
          <p class="tw-ml-36px tw-shrink-0">数据来源：{{ item.dataSourceType }}</p>
          <p class="tw-ml-36px tw-shrink-0">{{('灵感来源')}}：{{ item.inspirationSourceType }}</p>
          <p class="tw-ml-36px tw-shrink-0">国家站点：{{ item.countrySiteName }}</p>
          <p class="tw-ml-36px tw-shrink-0">竞品划线价(US)：{{ item.retailPrice }}</p>
          <p class="tw-ml-36px tw-shrink-0">竞品售价(US)：{{ item.salePrice }}</p>
        </div>
        <div class="tw-flex tw-items-center">
          <div v-if="!sign" class="tw-flex tw-justify-end tw-mr-20px">
            <el-button
              v-if="XTJL"
              link
              type="primary"
              @click="toCheck(item)"
            >{{('选图记录')}}</el-button>
            <el-button
              v-if="BJ"
              link
              type="primary"
              @click="toSign(item.pickingId, item)"
            >{{('标记')}}</el-button>
          </div>
        </div>
      </div>
      <div class="tw-flex tw-mt-14px tw-gap-12px">
        <div class="tw-shrink-0 tw-mr-12px tw-ml-12px tw-w-16px">
          <el-checkbox
            v-if="sign && isBatch"
            v-model="item.select"
            @change="(val) => selectPlan(item.pickingId, val)"
          />
        </div>
        <div class="tw-w-180px tw-flex-shrink-0 tw-mr-20px ">
          <div class="tw-w-160px tw-h-160px tw-mb-16px tw-rd-6px tw-overflow-hidden">
            <el-image
              :src="resizeImgByWidth(getRefImgUrl(item), 200)"
              fit='cover'
              style="width: 100%; height: 100%"
              :preview-src-list="[getRefImgUrl(item)]"
              preview-teleported
            />
          </div>
        </div>
        <div :class="`tw-flex ${item.dataSourceType === '风格化衍生' ? 'tw-flex-wrap tw-gap-10px' : 'tw-flex-col tw-gap-3 tw-w-100% tw-max-w-850px'}`">
          <div
            v-for="styleItem in item.pickingStyleDetails"
            :key="styleItem.pickingStyleId"
            :class="`tw-w-${item.dataSourceType === '风格化衍生' ? '230px' : '100%'} tw-mb-20px tw-position-relative tw-mb-12px`"
          >
            <div v-if="styleItem.styleTag" class="tw-flex tw-gap-2 tw-mb-10px">
              <el-button
                type="primary"
                link
                @click="handleShowRecommendFabricDialog(styleItem.styleTag.pictureId)"
              >
                查看面料推荐
              </el-button>

              <el-tag v-if="styleItem.styleTag.promiseEnabled === PROMISE_ENABLED_ENUM.YES" type="success">
                面料可履约
              </el-tag>
              <el-tag v-else-if="styleItem.styleTag.promiseEnabled === PROMISE_ENABLED_ENUM.NO" type="info">
                无可履约面料
              </el-tag>
              <el-tag v-if="styleItem.styleTag.fabricConsistent === FABRIC_CONSISTENT_ENUM.YES" type="success">
                面料一致
              </el-tag>
              <el-tag v-else-if="styleItem.styleTag.fabricConsistent === FABRIC_CONSISTENT_ENUM.NO" type="warning">
                面料需替换
              </el-tag>
            </div>
            <div
              class="tw-b-1px tw-b-solid tw-pt-10px tw-pl-10px tw-b-rd-4px"
              :class="{
                ['tw-b-color-#DCDFE6']: !styleItem.select,
                ['tw-b-color-#409EFF']: styleItem.select,
              }"
            >
              <div class="tw-pl-10px tw-position-absolute tw-top-0 tw-left-[-40px] tw-flex tw-justify-between tw-z-10">
                <el-checkbox
                  v-if="sign && selecteds.includes(item.pickingId)"
                  v-model="styleItem.select"
                  :key="styleItem.pickingStyleId"
                  class="tw-w-32px"
                  @change="handleSelectChange"
                  :disabled="styleItem.pickingState === PICK_STATE_ENUM.YES"
                />
              </div>
              <div
                class="tw-position-absolute tw-bottom-0 tw-left-0 tw-flex tw-justify-start tw-z-10"
              >
                <div>
                  <el-tag v-if="styleItem.pickingState === PICK_STATE_ENUM.YES" type="success">可用</el-tag>
                  <el-tag v-else-if="styleItem.pickingState === PICK_STATE_ENUM.NO" type="danger">不可用</el-tag>
                  <el-tag v-if="styleItem.pickingState === PICK_STATE_ENUM.WAIT" type="warning">未选择</el-tag>
                </div>
              </div>
              <el-scrollbar class="tw-w-100%">
                <VueDraggableNext
                  v-model="styleItem.pickingStyleImages"
                  @end="() => onDragEnd(styleItem.pickingStyleImages)"
                  :disabled="!sign || isBatch || !selecteds.includes(item.pickingId) || !styleItem.select"
                  class="tw-flex tw-min-h-200px"
                >
                  <card
                    v-for="(imageItem, imageIndex) in styleItem.pickingStyleImages"
                    :scrollEl="scrollEl"
                    :key="imageItem.pickingStyleId"
                    :image-index="imageIndex"
                    :picture-url="imageItem.pictureUrl"
                    :preview-srcs="styleItem.previewSrcs"
                    :is-sign="sign && selecteds.includes(item.pickingId) && styleItem.select"
                    :is-main="imageItem.mainImageType === YES_NO_NUMBER_ENUM.YES"
                    :is-eliminate="imageItem.eliminateType === YES_NO_NUMBER_ENUM.YES"
                    @eliminate="() => handleOpenEliminateReasonDialog(imageItem)"
                    @set-main="() => setMainPic(styleItem.pickingStyleImages, imageIndex)"
                    @select="(val: boolean) =>
                      imageItem.fixImageType = val ? YES_NO_NUMBER_ENUM.YES : YES_NO_NUMBER_ENUM.NO"
                    @preview="() => handlePreview(imageIndex, styleItem.pickingStyleImages)"
                  />
                </VueDraggableNext>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RecommendFabricDialog
      v-model:visible="fabricDialog.visible"
      :image-id="fabricDialog.imageId"
    />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType, ref, defineEmits } from 'vue';
import {
  PICK_STATE_ENUM,
  PROMISE_ENABLED_ENUM,
  FABRIC_CONSISTENT_ENUM,
  TASK_TYPE,
} from '@/modules/selection-manage/aigc-selection-list/constant';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { CheckboxValueType } from 'element-plus';
import { usePermissionConfig } from '../../../use-permission-config';
import { useRecordDialog } from '../hooks/use-record-dialog';
import { useEliminateReason, IEliminateReasonFormData } from '../hooks/use-eliminate-reason-dialog';
import { VueDraggableNext } from 'vue-draggable-next';
import Card from './card.vue';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  IPicList,
  IDataItem,
} from '../type';
import viewerInstance from '@/components/image-viewer/lib/viewer';
import RecommendFabricDialog from './recommend-fabric-dialog.vue';
import { getRefImgUrl } from '@/modules/selection-manage/utils';

const emits = defineEmits(['onSelect', 'onSign', 'onBatchSign']);
const props = defineProps({
  data: {
    type: Array as PropType<IDataItem[]>,
    default: () => [],
  },
  sign: {
    type: Boolean,
    default: false,
  },
  isBatch: {
    type: Boolean,
    default: false,
  },
  selecteds: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  scrollEl: {
    type: Object as PropType<HTMLElement>
  },
});
const { BJ, XTJL } = usePermissionConfig();

/** 打开单选任务项标记 */
const toSign = (id: string, item: IDataItem) => {
  emits('onSign', item);
};

/** 打开批量任务项标记 */
const selectPlan = (id: string, val: CheckboxValueType) => {
  emits('onBatchSign', id, val);
};

/** 单个选择 */
const handleSelectChange = () => {
  emits('onSelect');
};

const handlePreview = (index: number, data: IPicList[]) => {
  viewerInstance.update(data.map(item => item.pictureUrl.split('?')[0]));
  viewerInstance.view(index);
};

// 选图记录
const { handleOpenDialog } = useRecordDialog();
/** 查看历史记录 */
const toCheck = async (item: IDataItem) => {
  handleOpenDialog(item);
};

/** 拖拽排序 */
const onDragEnd = (arr: IPicList[]) => {
  arr.forEach((i, index) => {
    i.idx = index + 1;
  });
};

/** 淘汰图片 */
const handleEliminate = (data: IPicList, res: IEliminateReasonFormData) => {
  data.eliminateType = YES_NO_NUMBER_ENUM.YES;
  data.eliminateReasonCodes = res.problemCode;
};

/** 淘汰图片 */
const { handleOpenDialog: handleOpenEliminateReasonDialog } = useEliminateReason({
  handleSuccess: handleEliminate,
});

/** 设为主图 */
const setMainPic = (data: IPicList[], idx: number) => {
  data.forEach((item, index) => {
    if (index === idx) {
      item.mainImageType = YES_NO_NUMBER_ENUM.YES;
    } else {
      item.mainImageType = YES_NO_NUMBER_ENUM.NO;
    }
  });
};

const fabricDialog = ref({
  visible: false,
  imageId: '',
});
const handleShowRecommendFabricDialog = (imageId: string) => {
  console.log('查看推荐面料');
  fabricDialog.value = {
    visible: true,
    imageId,
  };
};

</script>
<style lang="scss" scoped>
.list {
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color-light);
  background-color: #fff;
  border-radius: 6px;
  &.list-selected {
    box-shadow: inset 0 0 4px 1px #409EFF;
  }
  .text-wrap {
    & > p {
      margin-bottom: 6px;
    }
  }
  .tab {
    background-color: var(--el-bg-color);
    padding: 6px 12px;
    margin: 0 12px 0 0;
    border: 1px solid var(--el-border-color-light);
    border-radius: 4px;
  }
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
