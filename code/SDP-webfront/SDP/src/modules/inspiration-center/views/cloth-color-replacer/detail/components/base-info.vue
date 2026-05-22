<template>
  <div>
    <div class="tw-text-lg tw-font-bold tw-mb-2">模特图</div>
    <el-row :gutter="10">
      <el-col
        v-for="(url, index) in detailData.replaceColorImgUrls"
        :key="url"
        :span="detailData.replaceColorImgUrls?.length === 1 ? 24 : 12"
      >
        <CustomImage
          :src="$filters.ossUrl(url, 260)"
          alt="模特图"
          fit="cover"
          :preview-src-list="detailData.replaceColorImgUrls"
          :initial-index="index"
          class="image-container tw-mb-1 tw-rounded tw-w-full"
        />
      </el-col>
    </el-row>
    <div class="info-item">
      <span class="label">品类：</span>
      <span class="content">{{ detailData.categoryName }}</span>
    </div>
    <div class="info-item">
      <span class="label">换色图案：</span>
      <CustomImage
        v-if="detailData.targetColorUrl"
        class="content"
        :src="detailData.targetColorUrl"
        alt="换色图案"
      />
      <span v-else>--</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { PropType } from 'vue';
import { IReplaceColorTaskDetailRes } from '../../api/type';

defineProps({
  detailData: {
    type: Object as PropType<IReplaceColorTaskDetailRes>,
    default: () => ({})
  }
});
</script>
<style scoped lang='scss'>
.info-item {
  display: flex;
  margin-top: 20px;
  .label {
    width: 80px;
  }
  .content {
    flex: 1;
  }
}
</style>
