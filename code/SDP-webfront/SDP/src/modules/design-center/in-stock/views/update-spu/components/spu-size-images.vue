<template>
  <ContentCard title="尺码表">
    <el-form-item
      label="尺码表"
      prop="sizeImages"
      :rules="rules.sizeImages"
    >
      <Uploader
        v-model="sizeImages"
        accept=".jpg,.jpeg,.png,.webp"
        uploader-style="button"
        :multiple="true"
        :limit="3"
        :size-limit="15"
        size="mini"
        tips="支持上传.jpg .png .webp格式的图片，最大图片数量3张。"
      />
    </el-form-item>
  </ContentCard>
</template>

<script setup lang='ts'>
import { computed, PropType } from 'vue';
import { IFormData } from '../types';
import ContentCard from './content-card.vue';
import { FormRules } from 'element-plus';
import { IFile } from '@/components/uploader/packages/types';

const formData = defineModel({
  type: Object as PropType<IFormData>,
  required: true
});

const rules: FormRules = {
  sizeImages: [
    {
      required: true,
      message: '请上传商品图',
      trigger: 'change'
    },
    {
      validator: (rule, value, cb) => {
        if (value.length <= 0) {
          cb(new Error('商品图不能为空'));
          return;
        }
        cb();
      },
      trigger: 'change'
    }
  ]
};

const sizeImages = computed<IFile[]>({
  get() {
    return formData.value.sizeImages.map((item) => {
      return {
        url: item
      };
    });
  },
  set(val) {
    formData.value.sizeImages = val.map(item => item.url);
  }
});
</script>
