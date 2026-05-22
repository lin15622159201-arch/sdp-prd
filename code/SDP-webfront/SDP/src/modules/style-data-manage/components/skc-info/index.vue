<template>
  <div
    class="tw-border-1px tw-border-[var(--el-border-color)] tw-border-solid tw-p-10px tw-rounded-4px"
  >
    <div class="tw-text-16px tw-font-bold tw-pb-10px tw-pt-5px">
      {{skcInfo?.designCode}}
    </div>
    <div class="tw-flex">
      <custom-image
        class="tw-w-120px tw-h-120px tw-flex-shrink-0 tw-rounded-4px"
        :src="skcInfo?.designPictureList?.[0]"
        :preview-src-list="skcInfo?.designPictureList"
        fit="cover"
      />
      <div class="tw-flex-1 tw-pl-20px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="SPU:">
              {{skcInfo?.styleCode}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="款式品类:">
              {{skcInfo?.categoryName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设计师:">
              {{skcInfo?.designerName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="颜色:">
              {{skcInfo?.color}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供给方式:">
              {{skcInfo?.supplyModeName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="波段:">
              {{skcInfo?.waveBandName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期望成本:">
              {{skcInfo?.suggestedSellingPrice}}
              元
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="织造方式:">
              {{skcInfo?.weaveMode}}
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { IGetDosageInfoRes } from '../../dosage-account/api/types';

defineProps({
  skcInfo: {
    type: Object as PropType<IGetDosageInfoRes['skcInfoVo']>
  },
});

</script>
