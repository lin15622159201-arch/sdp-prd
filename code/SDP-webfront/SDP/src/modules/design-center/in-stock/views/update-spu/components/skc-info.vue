<template>
  <ContentCard title="SKC信息">
    <div class="skc_ul">
      <div
        v-for="(item, index) in formData.skcs"
        :key="index"
        class="skc_item"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="颜色"
              :prop="`skcs[${index}].color`"
              :rules="colorsRule(index)"
            >
              <color-cascader
                v-model="item.color"
                class="tw-w-100%"
                filterable
                show-all-levels
                :props="colorProps"
              />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              label="尺码"
              :prop="`skcs[${index}].sizeStandardCodes`"
              :rules="sizeRule"
            >
              <el-checkbox-group v-model="item.sizeStandardCodes">
                <el-checkbox
                  v-for="item in PLM_STANDARY_SIZE_OPTIONS"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="商品图"
              :prop="`skcs[${index}].productImages`"
              :rules="{
                required: true,
                message: '商品图不能为空',
              }"
            >
              <Uploader
                :model-value="item.productImages.map((url) => ({ url }))"
                @update:model-value="(urls: IFile[]) => item.productImages = urls.map(item => item.url)"
                accept=".jpg,.jpeg,.png,.webp"
                uploader-style="button"
                :multiple="true"
                :limit="20"
                :size-limit="15"
                size="mini"
                tips="支持上传.jpg .png .webp格式的图片，最大图片数量20张。"
              />
            </el-form-item>
          </el-col>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleAddSkc"
              v-if="isCreate && formData.skcs.length - 1 === index"
            >
              添加SKC
            </el-button>
            <el-button
              type="danger"
              @click="() => handleDeleteSkc(index)"
              v-if="isCreate && formData.skcs.length > 1"
            >
              删除
            </el-button>
          </el-form-item>
        </el-row>
      </div>
    </div>
  </ContentCard>
</template>

<script setup lang="ts">
import { onMounted, PropType } from 'vue';
import { IFormData } from '../types';
import ContentCard from './content-card.vue';
import { FormItemRule } from 'element-plus';
import { useDict } from '../hooks/use-dict';
import { IFile } from '@/components/uploader/packages/types';

const formData = defineModel({
  type: Object as PropType<IFormData>,
  required: true,
});

const props = defineProps({
  isCreate: {
    type: Boolean,
    default: false,
  },
});

const { CLOTHING_COLOR_MAP, CLOTHING_COLOR_LABEL_MAP, getColors } = useDict({ formData });

const { PLM_STANDARY_SIZE_OPTIONS } = useDict({
  formData,
});

const colorProps = {
  label: 'label',
  value: 'value',
  multiple: false,
  emitPath: false,
};

const defaultSkcInfo: IFormData['skcs'][0] = {
  color: '',
  colorEnName: '',
  mainImgUrl: '',
  sizeStandardName: '',
  sizeStandardCode: '',
  sizeStandardCodes: [],
  productImages: [],
};

const colorsRule = (index: number): FormItemRule => ({
  required: true,
  validator(_rules, value, cb) {
    if (value?.length === 0) {
      cb('颜色不能为空');
      return;
    }
    const flag = formData.value.skcs.some((v, i) => i !== index && v.color === value);
    if (flag) {
      cb('颜色不能重复');
      return;
    }
    cb();
  },
});

const sizeRule: FormItemRule = {
  required: true,
  validator(_rules, value, cb) {
    if (value?.length === 0) {
      cb('尺码不能为空');
      return;
    }
    cb();
  },
};

/** 新增SKC */
const handleAddSkc = () => {
  formData.value.skcs.push({
    ...defaultSkcInfo,
  });
};
/** 删除SKC */
const handleDeleteSkc = (index: number) => {
  formData.value.skcs.splice(index, 1);
};

/** 格式化skc数据为后端需要的格式  */
const getSkcs = () => {
  return formData.value.skcs.map((item) => {
    const { color, sizeStandardCodes, ...sckData } = item;
    const colorData = CLOTHING_COLOR_MAP.value.get(color);
    const sizeStandardCode = sizeStandardCodes?.filter(Boolean).join('-') || '';
    return {
      ...sckData,
      mainImgUrl: item.productImages[0] || '',
      colorEnName: colorData?.colorEnglishName || '',
      color: colorData?.label || '',
      sizeStandardCode,
      sizeStandardName: sizeStandardCode,
    };
  });
};

onMounted(async () => {
  if (formData.value.skcs.length) {
    // 处理尺码回显
    await getColors();
    formData.value.skcs.forEach((item) => {
      // if (!item.sizeStandardCodes && item.sizeStandardCode) {
      //   item.sizeStandardCodes = item.sizeStandardCode.split('-').filter(Boolean);
      // }
      if (item.sizeStandardCode) {
        item.sizeStandardCodes = [];
        item.sizeStandardCode.split('-').forEach((code: string) => {
          if (PLM_STANDARY_SIZE_OPTIONS.value?.some(option => option.value === code)) {
            item.sizeStandardCodes && item.sizeStandardCodes.push(code);
          }
        });
      }
      const colorData = CLOTHING_COLOR_LABEL_MAP.value.get(item.color);
      if (colorData) {
        item.color = colorData?.value || '';
      }
    });
  }
  if (formData.value.skcs.length === 0) {
    handleAddSkc();
  }
});

defineExpose({
  getSkcs,
});
</script>
