<template>
  <el-dialog
    v-model="visible"
    width="600"
    :title="`${titleType}尺寸表模板图`"
    @close="handleCanceDialog"
    @open="handelOpen"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
    >
      <el-form-item
        label="内部品类"
        prop="innerCategoryCodes"
      >
        <el-cascader
          v-model="formData.innerCategoryCodes"
          clearable
          class="tw-w-full"
          :options="(categoryTreeList as any)"
          :props="{
            label: 'label',
            value: 'value',
          }"
        />
      </el-form-item>
      <el-form-item label="尺寸表模板图" prop="imgs">
        <uploader
          v-model="formData.imgs"
          size="mini"
          :limit="9"
          :paste="true"
          accept=".jpg,.png,.jpeg"
        />
      </el-form-item>
      <el-form-item label="量法图" prop="imgs">
        <uploader
          v-model="formData.quantityMethodImgs"
          size="mini"
          :limit="9"
          :paste="true"
          accept=".jpg,.png,.jpeg"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCanceDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="save"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useResetRef } from '@toy/v-use';
import { ElForm } from 'element-plus';
import { computed, nextTick, ref } from 'vue';
import { ISaveSiveTemplateItem, ISizeTemplatePageResListItem } from '../api/type';
import { useDict } from '@/modules/base-config/views/ai-category-mapping/hooks/use-dict';
import { getSizeTemplateDetail, saveSizeTemplate } from '../api';
import { treeFindPath } from '@/core/utils/array';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { IFileData } from '@/components/uploader/packages/types';

const props = defineProps({
  sizeTemplateImageId: {
    type: String,
    default: '',
  },
});
const { categoryTreeList } = useDict();
const emit = defineEmits(['success']);

const titleType = computed(() => {
  return props.sizeTemplateImageId ? '编辑' : '新增';
});

interface IFormDataItem extends ISizeTemplatePageResListItem {
  innerCategoryCodes?: string[];
  imgs?: IFileData[];
  quantityMethodImgs?: IFileData[];
}

const formRef = ref<InstanceType<typeof ElForm> | null>();
const [formData, reset] = useResetRef<IFormDataItem>({
  sizeTemplateImageId: '',
  categoryCode: '',
  categoryName: '',
  sizeTemplateImageUrls: [],
  quantityMethodImageUrls: [],
  remark: '',
  creatorId: '',
  creatorName: '',
  createdTime: '',
  reviserId: '',
  reviserName: '',
  revisedTime: '',
  innerCategoryCodes: [],
  imgs: [],
  quantityMethodImgs: [],
});
const formRules = {
  innerCategoryCodes: [
    { required: true, message: '不能为空' },
  ],
  sizeTemplateImageUrl: [
    { required: true, message: '不能为空' },
  ],
};

const visible = defineModel('visible', {
  type: Boolean,
  default: false,
});
const handelOpen = async () => {
  const { sizeTemplateImageId } = props;
  if (!sizeTemplateImageId) {
    return;
  }
  const { data } = await getSizeTemplateDetail(sizeTemplateImageId);
  formData.value.sizeTemplateImageId = data.sizeTemplateImageId;
  formData.value.innerCategoryCodes = data.categoryCode ? data.categoryCode.split('-') : [];
  formData.value.sizeTemplateImageUrls = data.sizeTemplateImageUrls.length ? data.sizeTemplateImageUrls : [];
  formData.value.imgs = data.sizeTemplateImageUrls?.map((n) => {
    return {
      url: n,
    };
  });
  formData.value.quantityMethodImageUrls = data.quantityMethodImageUrls.length ? data.quantityMethodImageUrls : [];
  formData.value.quantityMethodImgs = data.quantityMethodImageUrls?.map((n) => {
    return {
      url: n,
    };
  });
  nextTick(() => {
    formRef.value?.clearValidate();
  });
};
const handleCanceDialog = () => {
  reset();
  formRef.value?.clearValidate();
  visible.value = false;
};

const save = async () => {
  console.log('form==', formData.value);
  await formRef.value?.validate();
  const { innerCategoryCodes = [], sizeTemplateImageId, imgs, quantityMethodImgs } = formData.value;
  const lastNodeId = innerCategoryCodes[innerCategoryCodes.length - 1];
  const categoryName = treeFindPath<IDictionaryItem>(
    categoryTreeList.value,
    'children',
    data => data.value === lastNodeId,
  ).map(item => item.label).join('-');
  const data:ISaveSiveTemplateItem = {
    sizeTemplateImageId,
    sizeTemplateImageUrls: imgs?.map(item => item.url) ?? [],
    quantityMethodImageUrls: quantityMethodImgs?.map(item => item.url) ?? [],
    categoryCode: innerCategoryCodes?.join('-'),
    categoryName,
    remark: '',
  };
  await saveSizeTemplate(data);
  handleCanceDialog();
  emit('success');
};

</script>

<style lang="scss" scoped>
//
</style>
