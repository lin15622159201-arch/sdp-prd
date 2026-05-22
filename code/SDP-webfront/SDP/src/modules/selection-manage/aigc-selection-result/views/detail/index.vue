<template>
  <sc-app-page class="custom-app-page">
    <template #main>
      <div class="tw-h-100%">
        <el-scrollbar
          class="tw-position-relative"
          height="100%"
          always
        >
          <div class="tw-bg-[#fff] tw-mb-20px tw-p-12px">
            <p class="tw-mb-16px">
              <el-text type="primary">灵感图详情</el-text>
            </p>
            <div class="tw-flex">
              <div class="tw-flex tw-gap-2px tw-mr-20px">
                <el-image
                  :src="resizeImgByWidth(getRefImgUrl(inspirationDetail), 200)"
                  class="tw-w-200px tw-h-200px tw-rounded-4px"
                  fit="cover"
                  :preview-src-list="[getRefImgUrl(inspirationDetail)]"
                  preview-teleported
                />
              </div>
              <div>
                <el-tag
                  v-if="openStatus.label"
                  class="tw-mb-12px"
                  :type="openStatus.type"
                >
                  {{ openStatus.label }}
                </el-tag>
                <div class="tw-flex tw-flex-wrap desc">
                  <p class="tw-min-w-200px tw-mr-20px tw-mb-20px">
                    外部品类：<span>{{ inspirationDetail.externalCategory }}</span>
                  </p>
                  <p class="tw-min-w-200px tw-mr-20px tw-mb-20px">
                    数据来源：<span>{{ inspirationDetail.dataSourceType }}</span>
                  </p>
                  <p class="tw-min-w-200px tw-mr-20px tw-mb-20px">
                    灵感图创建时间：<span>{{ $filters.formatTime(inspirationDetail.createdTime) }}</span>
                  </p>
                  <p class="tw-min-w-200px tw-mr-20px tw-mb-20px">
                    创建人：<span>{{ inspirationDetail.creatorName }}</span>
                  </p>
                </div>
                <div class="tw-flex tw-flex-wrap desc">
                  <p class="tw-min-w-200px tw-mr-20px tw-mb-20px">
                    灵感图来源：<span>{{ inspirationDetail.inspirationSourceType }}</span>
                  </p>
                  <p class="tw-min-w-200px tw-mr-20px tw-mb-20px">
                    来源站点：<span>{{ inspirationDetail.countrySiteCode }}</span>
                  </p>
                  <p class="tw-min-w-200px tw-mr-20px tw-mb-20px">
                    灵感图品牌：<span>{{ inspirationDetail.inspirationBrand }}</span>
                  </p>
                </div>
                <div class="tw-flex tw-flex-wrap">
                  <p class="tw-min-w-200px tw-mr-20px tw-mb-20px">
                    划线价：<span>{{ inspirationDetail.retailPrice }}</span>
                  </p>
                  <p class="tw-min-w-200px tw-mr-20px tw-mb-20px">
                    售价：<span>{{ inspirationDetail.salePrice }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="tw-flex tw-mb-20px">
            <div class="tw-flex-1 tw-bg-[#fff] tw-mr-20px tw-p-12px">
              <p class="tw-mb-16px">
                <el-text type="primary">跑图详情</el-text>
              </p>
              <p class="tw-mb-16px">编号：{{ designTaskDetail.aiTaskCode }}</p>
              <p class="tw-mb-16px">
                <span class="tw-mr-20px">品类：{{ designTaskDetail.category }}</span>
                <span>生成模式：{{ $filters.getEnumLabel(GENERATE_MODE_LIST, designTaskDetail.generateMode) }}</span>
              </p>
              <p class="tw-mb-12px">标签：</p>
              <div>
                <el-tag
                  v-for="(item, index) in designTaskDetail.labels"
                  :key="index"
                  class="tw-mr-12px tw-mb-6px"
                >
                  {{ item.key }}：{{ item.value }}
                </el-tag>
              </div>
            </div>
            <div class="tw-flex-1 tw-bg-[#fff] tw-p-12px">
              <p class="tw-mb-16px">
                <el-text type="primary">推荐底布</el-text>
              </p>
              <div class="tw-flex tw-flex-wrap">
                <div
                  v-for="(item, index) in recommendFabricDetails"
                  :key="index"
                  class="tw-b-1px tw-b-solid tw-b-color-#DCDFE6 tw-b-rd-6px tw-p-12px tw-flex tw-mr-20px tw-mb-20px"
                >
                  <el-image
                    :src="resizeImgByWidth(item.colorPicture, 200)"
                    class="tw-w-60px tw-h-60px tw-rounded-4px tw-mr-12px"
                    fit="cover"
                    :preview-src-list="[item.colorPicture]"
                    preview-teleported
                  />
                  <div class="tw-color-[#909399]">
                    <p>{{ item.commodityName }}</p>
                    <p>{{ item.skuCode }}</p>
                    <p>色号：{{ item.colorCode }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tw-bg-[#fff] tw-mb-20px tw-p-12px">
            <p class="tw-mb-16px tw-flex">
              <el-text class="tw-mr-20px" type="primary">选款详情</el-text>
              <el-tag class="tw-mr-20px" :type="selectStatus.type">{{ selectStatus.label }}</el-tag>
            </p>
            <div class="tw-mb-20px tw-mb-20px">
              <div class="tw-flex tw-flex-wrap desc">
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  选款人：<span>{{ pickingDetail.selectorName }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  选款时间：<span>{{ $filters.formatTime(pickingDetail.imagePickingStartTime) }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  选款波次：<span>{{ pickingDetail.suggestedWaveBatchName }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  选款价格：<span>{{ pickingDetail.suggestedPrice }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  选款风格：<span>{{ pickingDetail.suggestedStyleName }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  选款国家：<span>{{ pickingDetail.suggestedCountrySiteName }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  选款场景：<span>{{ pickingDetail.sceneName }}</span>
                </p>
              </div>
              <div class="tw-flex tw-flex-wrap desc">
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  选款店铺：<span>{{ pickingDetail.suggestedShopName }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  建议印花：<span>{{ pickingDetail.suggestedPrintingName }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  备注：<span>{{ pickingDetail.remark }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  货盘类型：<span>{{ pickingDetail.cargoTrayName }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  选款品类：<span>{{ pickingDetail.suggestedCategoryName }}</span>
                </p>
                <p class="tw-min-w-200px tw-mr-20px tw-mb-16px">
                  商品主题：<span>{{ pickingDetail.productThemeName }}</span>
                </p>
              </div>
            </div>
            <div class="tw-flex tw-flex-wrap">
              <div
                v-for="(item, index) in pickingDetail.pickingStyleResultDetails"
                :key="item.pickingPictureId"
                class="tw-position-relative"
              >
                <el-tooltip
                  :disabled="!item.eliminateReason"
                  :content="item.eliminateReason"
                  placement="top"
                  effect="dark"
                >
                  <!-- content to trigger tooltip here -->
                  <el-image
                    :src="resizeImgByWidth(item.pictureUrl, 200)"
                    class="tw-w-200px tw-h-200px tw-rounded-4px tw-mr-12px"
                    fit="cover"
                    :preview-src-list="pickingDetail.pickingStyleResultDetails.map(i => item.pictureUrl)"
                    preview-teleported
                    :initial-index="index"
                  />
                </el-tooltip>
                <div class="tw-flex tw-position-absolute tw-left-0px tw-top-0px">
                  <el-tag
                    v-if="item.mainImageType === YES_NO_NUMBER_ENUM.YES"
                    class="tw-mr-6px"
                    size="small"
                  >
                    主图
                  </el-tag>
                  <el-tag
                    v-if="item.fixImageType === YES_NO_NUMBER_ENUM.YES"
                    class="tw-mr-6px"
                    size="small"
                    type="warning"
                  >
                    修图
                  </el-tag>
                  <el-tag
                    v-if="item.eliminateType === YES_NO_NUMBER_ENUM.YES"
                    class="tw-mr-6px"
                    size="small"
                    type="danger"
                  >
                    淘汰
                  </el-tag>
                </div>

              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </template>
    <template #ffooter>
      <el-row
        style="width: 100%"
        type="flex"
        justify="center"
      >
        <el-button @click="() => router.back()">返回</el-button>
      </el-row>
    </template>
  </sc-app-page>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { resizeImgByWidth } from '@/core/utils/helper';
import { resultDetail } from '@/modules/selection-manage/aigc-selection-result/api';
import { IResultDetailRes } from '@/modules/selection-manage/aigc-selection-result/api/type';
import { OPEN_STYLE_STATUS_LIST } from '@/modules/selection-manage/aigc-selection-result/constant';
import { GENERATE_MODE_LIST } from '@/modules/inspiration-center/inspiration-source/constant';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { useFailReason } from './hooks/use-fail-reason';
import { filters } from '@/core/plugins/filter';
import { getRefImgUrl } from '@/modules/selection-manage/utils';

const router = useRouter();
const route = useRoute();
const detailData = ref({} as IResultDetailRes);

const { failReasonOptions } = useFailReason();

const inspirationDetail = computed(() => detailData.value.inspirationDetail ?? {});
const designTaskDetail = computed(() => detailData.value.designTaskDetail ?? {});
const pickingDetail = computed(() => {
  const pickingDetailData = detailData.value.pickingDetail ?? {};
  return {
    ...pickingDetailData,
    pickingStyleResultDetails: (pickingDetailData?.pickingStyleResultDetails || []).map(pickingStyleResultDetail => ({
      ...pickingStyleResultDetail,
      eliminateReason: pickingStyleResultDetail.eliminateReasonCodes.map(
        code => filters.getEnumLabel(failReasonOptions.value, code.split('>').pop() || '')
      ).join(','),
    })),
  };
});
const recommendFabricDetails = computed(() => detailData.value.recommendFabricDetails ?? []);

const openStatus = computed(() => {
  const { openStyleState } = detailData.value;
  const { label, type } = OPEN_STYLE_STATUS_LIST.find(i => i.value === openStyleState) ?? {};
  return {
    label,
    type: type as 'primary',
  };
});

const selectStatus = computed(() => {
  const { openStyleState, styleSpuCode } = detailData.value;
  const { label, type } = OPEN_STYLE_STATUS_LIST.find(i => i.value === openStyleState) ?? {};
  return {
    label: `${label}(spu: ${styleSpuCode})`,
    type: type as 'primary',
  };
});

const getDetailData = async (id: string) => {
  const { data } = await resultDetail(id);
  detailData.value = data;
};

const init = () => {
  const { id } = route.params;
  getDetailData(id as string);
};
init();

</script>
<style lang="scss" scoped>
.desc {
  & span {
    color: #606266;
  }
}
.custom-app-page {
  :deep(.sc-app-page-layout-center-main) {
    background-color: rgba(255, 255, 255, 0);
    padding: 0 24px 16px 0;
  }
}
</style>
