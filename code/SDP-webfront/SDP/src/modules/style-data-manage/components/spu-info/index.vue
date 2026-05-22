<template>
  <div>
    <div class="tw-text-16px tw-font-bold tw-pb-10px tw-pt-5px">
      {{spuInfo?.styleCode}}
    </div>
    <div class="tw-flex">
      <custom-image
        class="tw-w-120px tw-h-120px tw-flex-shrink-0 tw-rounded-4px"
        :src="spuInfo?.designPictureList?.[0]"
        :preview-src-list="spuInfo?.designPictureList"
        fit="cover"
      />
      <div class="tw-flex-1 tw-pl-20px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="款式品类:">
              {{spuInfo?.categoryName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="SPU创建人:">
              {{spuInfo?.creatorName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="波段:">
              {{spuInfo?.waveBandName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="织造方式:">
              {{spuInfo?.weaveMode}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期望成本:">
              {{spuInfo?.suggestedSellingPrice}}
              元
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供给方式:">
              {{spuInfo?.supplyModeName}}
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { IStyleInfoDetailRes } from '../../large/api/types';

defineProps({
  spuInfo: {
    type: Object as PropType<IStyleInfoDetailRes['spuInfoVo']>
  },
});

</script>
