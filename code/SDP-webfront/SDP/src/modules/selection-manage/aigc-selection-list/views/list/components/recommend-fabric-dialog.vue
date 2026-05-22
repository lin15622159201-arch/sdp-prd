<script lang="ts" setup>
import { ref, watch } from 'vue';

import FabricDetailDialog from './fabric-detail-dialog/index.vue';
import { useGetRecommendFabricDetail } from '../hooks/use-get-recommend-fabric-detail';
import { IFabricInfoResFabricListItem } from '../../../api/fabric/type';

const visible = defineModel('visible', {
  type: Boolean,
  required: true,
});

const props = defineProps({
  imageId: {
    type: String,
    default: '',
  }
});

const { imageUrl, fabricList, handleGetFabricInfo } = useGetRecommendFabricDetail();

watch(() => [visible.value, props.imageId], () => {
  if (visible.value && props.imageId) {
    handleGetFabricInfo(props.imageId);
  }
});

const fabricDetailDialogData = ref({
  visible: false,
  commodityId: '',
  colorCodes: [] as string[],
});
const handleOpenFabricDetailDialog = (recommendFabric: IFabricInfoResFabricListItem) => {
  fabricDetailDialogData.value = {
    visible: true,
    commodityId: recommendFabric.sourceCommodityId,
    colorCodes: [recommendFabric.colorCode],
  };
};

</script>

<template>
  <el-dialog
    title="面料推荐"
    v-model="visible"
    width="40%"
    draggable
  >
    <div class="tw-flex  tw-gap-10px">
      <div class="tw-flex tw-flex-col tw-flex-1 tw-gap-8px">
        <span class="tw-font-bold">生成图</span>
        <el-image
          class="tw-aspect-square"
          :src="imageUrl"
          fit="fill"
          :lazy="true"
        />
      </div>
      <div class="tw-flex-1 tw-gap-8px">
        <div class="tw-flex tw-flex-col">
          <span class="tw-font-bold">生成图识别面料</span>
          <span>根据生成图识别结果，已自动推荐可履约的面料</span>
        </div>
        <div
          class="tw-flex"
          v-for="(recommendFabric, index) in fabricList"
          :key="index"
        >
          <div class="tw-h-80px tw-w-80px tw-rounded-4px tw-overflow-hidden tw-flex-shrink-0">
            <el-image
              v-if="!recommendFabric.commodityId"
              class="tw-h-full tw-w-full"
              src="https://oss.yunbanfang.cn/tiangong_7c30d2681ca341aa945e62eac162dec1.png"
              fit="contain"
              alt=""
            />
            <el-image
              v-else-if="recommendFabric.colorPicture"
              :class="`tw-h-full tw-w-full`"
              :src="recommendFabric.colorPicture"
              fit="fill"
            />
            <div
              v-else
              :class="`tw-h-full tw-w-full`"
              :style="`background-color: ${recommendFabric.rgb}`"
            />
          </div>
          <div
            class="tw-flex tw-flex-col tw-flex-1 tw-text-[#303133] tw-px-10px tw-gap-8px"
            style="word-break: break-word"
          >
            <div class="tw-font-bold">
              {{ recommendFabric.familyFabricCategory }}
            </div>
            <div :class="`${recommendFabric.commodityId ? '' : 'tw-text-#909299'}`">
              {{ recommendFabric.commodityName }}
            </div>
            <div
              :class="`tw-text-primary tw-cursor-pointer`"
              @click="handleOpenFabricDetailDialog(recommendFabric)"
            >
              {{ recommendFabric.commodityCode }}
            </div>
            <div :class="`${recommendFabric.commodityId ? '' : 'tw-text-#909299'}`">
              {{ recommendFabric.commodityId ? `色号：${recommendFabric.colorCode}` : '未找到商品' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  <FabricDetailDialog
    v-model:visible="fabricDetailDialogData.visible"
    :commodity-id="fabricDetailDialogData.commodityId"
    :default-selected-color-code="fabricDetailDialogData.colorCodes"
    :editing="false"
  />
</template>
