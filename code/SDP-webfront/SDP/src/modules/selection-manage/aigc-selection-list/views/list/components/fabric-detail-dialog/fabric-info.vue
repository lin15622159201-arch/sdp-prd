<script lang="ts" setup>
import { computed } from 'vue';
import Carousel from '@/components/carousel/index.vue';

import { CopyDocument } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { IFabricFmRes } from '@/modules/selection-manage/aigc-selection-list/api/fabric/type';
import { FABRIC_FACE_LIST } from '@/modules/selection-manage/aigc-selection-list/constant';

const props = defineProps<{
  data: IFabricFmRes;
}>();

const imageUrlList = computed(() => {
  const images = [];
  if (props.data.image) {
    images.push(...props.data.image.split(','));
  }
  if (props.data.detailImage) {
    images.push(...props.data.detailImage.split(','));
  }
  if (props.data.colorCardImage) {
    images.push(...props.data.colorCardImage.split(','));
  }
  return images;
});

const handleCopyCommodityCode = (code: string) => {
  navigator.clipboard.writeText(code);
  ElMessage.success('已复制商品编码');
};

</script>

<template>
  <div class="tw-flex tw-flex-col">
    <div class="tw-flex tw-flex-gap-20px">
      <Carousel
        :urls="imageUrlList"
        :mainImageSize="180"
        :carouselImageSize="50"
      />
      <div class="tw-flex-1 tw-flex tw-flex-col tw-leading-[28px]">
        <span class="tw-font-bold">品名：{{ data.commodityName }}</span>
        <div class="tw-flex tw-flex-gap-100px tw-flex-center-y">
          <span>
            {{ `${data.commodityCode}` }}
            <el-button type="text" @click="() => handleCopyCommodityCode(data.commodityCode)">
              <el-icon><CopyDocument /></el-icon>
            </el-button>
          </span>
        </div>
        <div class="flex">
          <span class="tw-text-[#909299]">参考足米价：</span>
          <span class="tw-text-[#F55656]">¥{{ data.price }}米</span>
        </div>
        <div class="flex">
          <span class="tw-text-[#909299]">基础类别：</span>
          <span>{{ data.category }}</span>
        </div>
        <div class="flex">
          <span class="tw-text-nowrap tw-text-[#909299]">成分：</span>
          <span>
            {{ data.compositions.map(composition => `${composition.percentage}%${composition.name}`).join('、') }}
          </span>
        </div>
        <div class="tw-flex tw-flex-gap-20px">
          <div>
            <span class="tw-text-[#909299]">克重：</span>
            <span>
              {{ `${data.goodsWeight}${data.goodsWeightGapName}${data.goodsWeightUnitName}` }}
            </span>
          </div>
          <div>
            <span class="tw-text-[#909299]">门幅：</span>
            <span>
              {{ `${data.packageWidth}${data.packageWidthGapName}${data.widthUnit}` }}
            </span>
          </div>
        </div>
        <div
          class="tw-flex tw-flex-nowrap tw-divide-y-none tw-divide-x tw-divide-#E7E9F3 tw-divide-solid tw-mt-16px"
        >
          <div class="tw-flex tw-flex-col tw-flex-1">
            <div class="flex">
              <span class="tw-text-nowrap tw-text-[#909299]">弹力：</span>
              <span>
                {{ data.elasticityLayeredDesc }}
              </span>
            </div>
            <div class="flex">
              <span class="tw-text-nowrap tw-text-[#909299]">面料适用季节：</span>
              <span>
                {{ data.seasonDesc }}
              </span>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-flex-1 tw-pl-24px">
            <div class="flex">
              <span class="tw-text-nowrap tw-text-[#909299]">正面纹理：</span>
              <span>
                {{ data.frontTextureDesc }}
              </span>
            </div>
            <div class="flex">
              <span class="tw-text-nowrap tw-text-[#909299]">反面纹理：</span>
              <span>
                {{ data.reverseTextureDesc }}
              </span>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-flex-1 tw-pl-24px">
            <div class="flex">
              <span class="tw-text-nowrap tw-text-[#909299]">面料面数：</span>
              <span>
                {{ $filters.getEnumLabel(FABRIC_FACE_LIST, data.fabricFace) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
