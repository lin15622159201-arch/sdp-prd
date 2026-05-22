<!-- 产品属性 -->
<template>
  <div class="tw-flex tw-gap-4">
    <div v-if="mainImgUrl">
      <el-image
        :src="mainImgUrl"
        fit="contain"
        class="tw-w-32 tw-rounded"
        :preview-src-list="[mainImgUrl]"
      />
    </div>
    <ScResponsiveRow>
      <el-form-item label="设计师">
        {{ detailData.designerName }}
      </el-form-item>
      <el-form-item label="设计组">
        {{ detailData.designerGroupName }}
      </el-form-item>
      <el-form-item label="SPU创建时间">
        {{ filters.formatTime(detailData.createdTime) }}
      </el-form-item>
      <el-form-item label="品类">
        {{ detailData.categoryName }}
      </el-form-item>
      <el-form-item label="波段">
        {{ detailData.waveBandName }}
      </el-form-item>
      <el-form-item label="款式标签">
        {{ detailData.styleLabelName }}
      </el-form-item>
      <el-form-item label="款式级别">
        {{ detailData.styleLevelName }}
      </el-form-item>
      <el-form-item label="店铺">
        {{ detailData.storeName }}
      </el-form-item>
      <el-form-item label="品质等级">
        {{ detailData.qualityLevelName }}
      </el-form-item>
      <el-form-item label="织造方式">
        {{ detailData.weaveModeName }}
      </el-form-item>
      <el-form-item label="季节">
        {{ detailData.seasonName }}
      </el-form-item>
      <el-form-item label="尺码组">
        {{ detailData.sizeStandardName }}
      </el-form-item>
      <el-form-item label="印花类型">
        {{ detailData.printingName }}
      </el-form-item>
      <el-form-item label="视觉形式">
        {{ detailData.visualFormName }}
      </el-form-item>
      <el-form-item label="版型">
        {{ detailData.patternName }}
      </el-form-item>
      <el-form-item label="风格">
        {{ detailData.clothingStyleName }}
      </el-form-item>
      <el-form-item label="弹性">
        {{ detailData.elasticName }}
      </el-form-item>
      <el-form-item label="场景">
        {{ detailData.sceneName }}
      </el-form-item>
      <el-form-item label="SKU分类">
        {{ detailData.skuClassName }}
      </el-form-item>
      <el-form-item
        class="tw-mb-0"
        label="商品链接"
        :col="{
          xs: 24, sm: 24, md: 24, lg: 24, xl: 24
        }"
      >
        {{ detailData.commodityLink }}
      </el-form-item>
    </ScResponsiveRow>
  </div>
</template>

<script setup lang='ts'>
import { IStyleOnShelvesDetailRes } from '@/modules/goods-manage/api/listing/type';
import { FormInstance } from 'element-plus';
import { computed, ref } from 'vue';
import { filters } from '@/core/plugins/filter';
import { useRoute } from 'vue-router';

const props = defineProps<{
  /** 详情数据 */
  detailData: IStyleOnShelvesDetailRes;
  /** temu的素材图 */
  temuMaterialImgUrl?: string;
}>();

const route = useRoute();

const mainImgUrl = computed(() => {
  const { skcList, styleType } = props.detailData;
  if (route.query.productId) {
    // 如果是商品列的详情页，直接显示传入的temuMaterialImgUrl（商品主图）
    return props.temuMaterialImgUrl;
  }
  if (styleType === '现货款') {
    return skcList?.[0].mainImgUrl;
  }
  // 显示非视频的图，即materialType为0的图
  const targetSkc = skcList?.find(skc => skc.pictures?.some(picture => String(picture.materialType) === '0'));
  if (targetSkc) {
    const pic = targetSkc.pictures?.find(picture => String(picture.materialType) === '0');
    return pic?.cropImgUrl || pic?.pictureUrl;
  }
  return '';
});

const formRef = ref<FormInstance>();

defineExpose({
  formRef,
});
</script>
