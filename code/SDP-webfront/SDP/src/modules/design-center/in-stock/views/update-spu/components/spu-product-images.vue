<template>
  <ContentCard title="商品图">
    <el-form-item
      label="商品图"
      prop="productImages"
      :rules="rules.productImages"
    >
      <Uploader
        v-model="productImages"
        accept=".jpg,.jpeg,.png,.webp"
        :multiple="true"
        :limit="20"
        :size-limit="15"
        uploader-style="button"
        size="mini"
        tips="支持上传.jpg .png .webp格式的图片，最大图片数量20张。"
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
  productImages: [
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

const productImages = computed<IFile[]>({
  get() {
    return formData.value.productImages.map((item) => {
      return {
        url: item
      };
    });
  },
  set(val) {
    formData.value.productImages = val.map(item => item.url);
  }
});
</script>
