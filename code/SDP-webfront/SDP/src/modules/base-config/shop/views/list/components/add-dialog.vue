<template>
  <el-dialog
    v-model="selfVisible"
    :title="dialogTitle"
    width="480px"
    :show-close="true"
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    @close="onClose"
    @open="onOpen"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="平台" prop="platformCode">
        <el-input
          v-if="isEdit"
          v-model="formData.platformName"
          disabled
        />
        <DictionarySelect
          v-else
          v-model="formData.platformCode"
          :dictionary="DICTIONARY_KEY.PLATFORM"
          placeholder="请选择平台"
          :disabled="isEdit"
        />
      </el-form-item>

      <el-form-item label="店铺类型" prop="shopType">
        <DictionarySelect
          v-model="formData.shopType"
          :dictionary="DICTIONARY_KEY.SHOP_TYPE"
          placeholder="请选择店铺类型"
          :disabled="isEdit"
        />
      </el-form-item>

      <el-form-item label="关联主体" prop="subjectCode">
        <el-input
          v-if="isEdit"
          v-model="formData.subjectName"
          disabled
        />
        <DictionarySelect
          v-else
          v-model="formData.subjectCode"
          :dictionary="DICTIONARY_KEY.RELATED_SUBJECT"
          placeholder="请选择关联主体"
        />
      </el-form-item>

      <el-form-item label="店铺名称" prop="shopName">
        <el-input
          v-model.trim="formData.shopName"
          placeholder="请输入店铺名称"
          maxlength="20"
          show-word-limit
          clearable
        />
      </el-form-item>

      <el-form-item label="运营人员" prop="businessOperatorId">
        <UserSelect
          v-if="selfVisible"
          ref="userSelectRef"
          v-model="formData.businessOperatorId"
          placeholder="请选择运营人员"
          :default-options="userDefaultOptions"
        />
      </el-form-item>

      <el-form-item label="标签" prop="labels">
        <el-cascader
          v-model="formData.labels"
          :options="labelOptions"
          class="tw-w-400px"
          placeholder="请选择标签"
          clearable
          collapse-tags
          :max-collapse-tags="3"
          :props="{
            multiple: true,
            emitPath: false
          }"
        />
      </el-form-item>

      <el-form-item label="商品token" prop="productToken">
        <el-input
          type="textarea"
          v-model.trim="formData.productToken"
          placeholder="请输入商品token"
          maxlength="256"
          show-word-limit
          clearable
        />
      </el-form-item>

      <el-form-item label="订单token" prop="orderToken">
        <el-input
          type="textarea"
          v-model.trim="formData.orderToken"
          placeholder="请输入订单token"
          maxlength="256"
          show-word-limit
          clearable
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import UserSelect from '@/components/user-select';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { fetchShopBatchCreate, fetchShopEdit } from '../../../api';
import type { IShopCreateReq, IShopPageResItem } from '../../../api/type';
import { useDictionary } from '@/hooks/use-dictionary';

interface Props {
  modelValue: boolean;
  data?: IShopPageResItem;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { getDictionaryLabel, getDictionaryOptions } = useDictionary();
const labelOptions = computed(() => getDictionaryOptions(DICTIONARY_KEY.SHOP_LABEL) as Array<{ label: string; value: string; }>);

const isEdit = computed(() => !!props.data?.shopId);
const dialogTitle = computed(() => (isEdit.value ? '编辑店铺' : '新增店铺'));

const selfVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
});

const formRef = ref<FormInstance>();
const userSelectRef = ref<InstanceType<typeof UserSelect>>();

// 用户选择器的默认选项（用于编辑回显）
const userDefaultOptions = computed(() => {
  if (isEdit.value && props.data?.businessOperatorId && props.data?.businessOperatorName) {
    return [{
      id: props.data.businessOperatorId,
      name: props.data.businessOperatorName,
      code: '',
      phone: '',
    }];
  }
  return [];
});

const formData = reactive<IShopCreateReq & { labels: string[]; }>({
  platformCode: '',
  platformName: '',
  subjectCode: '',
  subjectName: '',
  shopName: '',
  shopType: '',
  productToken: '',
  orderToken: '',
  label: '',
  labels: [],
  businessOperatorId: '',
  businessOperatorName: '',
});

const rules: FormRules<IShopCreateReq> = {
  platformCode: [{ required: true, message: '请选择平台', trigger: 'change' }],
  shopType: [{ required: true, message: '请选择店铺类型', trigger: 'change' }],
  subjectCode: [{ required: true, message: '请选择关联主体', trigger: 'change' }],
  shopName: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
  businessOperatorId: [{ required: true, message: '请选择运营人员', trigger: 'change' }],
  productToken: [{ required: true, message: '请输入商品token', trigger: 'blur' }],
};

const onClose = () => {
  formRef.value?.resetFields();
  selfVisible.value = false;
};

const handleConfirm = async () => {
  if (!formRef.value) return;

  await formRef.value.validate();

  try {
    const { labels, ...params } = formData;
    const businessOperatorName = userSelectRef.value?.getLabel() || '';

    const submitData = {
      ...params,
      businessOperatorName,
      label: labels.join(','),
    };

    if (isEdit.value) {
      await fetchShopEdit({
        ...submitData,
        shopId: props.data!.shopId!,
      });
      ElMessage.success('编辑成功');
    } else {
      const platformName = getDictionaryLabel(
        DICTIONARY_KEY.PLATFORM,
        formData.platformCode
      );
      const subjectName = getDictionaryLabel(DICTIONARY_KEY.RELATED_SUBJECT, formData.subjectCode);
      await fetchShopBatchCreate([{
        ...submitData,
        platformName,
        subjectName,
      }]);
      ElMessage.success('新增成功');
    }

    onClose();
    emit('success');
  } catch (error) {
    console.error(isEdit.value ? '编辑店铺失败:' : '新增店铺失败:', error);
  }
};

const onOpen = () => {
  // 编辑模式：回填数据
  if (isEdit.value && props.data) {
    Object.assign(formData, {
      platformCode: props.data.platformCode || '',
      platformName: props.data.platformName || '',
      subjectCode: props.data.subjectCode || '',
      subjectName: props.data.subjectName || '',
      shopName: props.data.shopName || '',
      shopType: props.data.shopType || '',
      productToken: props.data.productToken || '',
      orderToken: props.data.orderToken || '',
      label: props.data.label || '',
      labels: props.data.label?.split(',').filter(Boolean) || [],
      businessOperatorId: props.data.businessOperatorId?.toString() || '',
      businessOperatorName: props.data.businessOperatorName || '',
    });
    console.log('🚀 ~ onOpen ~ props.data:', props.data);
  }
};
</script>
