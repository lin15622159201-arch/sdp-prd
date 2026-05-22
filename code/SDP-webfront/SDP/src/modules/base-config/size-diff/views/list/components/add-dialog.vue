<template>
  <el-dialog
    v-model="selfVisible"
    :title="isEdit ? '编辑档差规则' : '新增档差规则'"
    width="80%"
    :show-close="true"
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    top="10vh"
    @open="onOpen"
    @close="onClose"
  >
    <el-form
      ref="formRef"
      class="form-box"
      :model="formData"
      label-width="80px"
      :rules="formRules"
    >
      <el-form-item prop="sizeCode" label="尺码">
        <DictionarySelect
          v-model="formData.sizeCode"
          :dictionary="DICTIONARY_KEY.PLM_STANDARY_SIZE"
          class="tw-w-400px!"
          :disabled="isEdit"
        />
      </el-form-item>
      <el-form-item v-if="formData.sizeCode" prop="sizes">
        <template #label>
          <el-checkbox v-model="isSizesAllChecked" :indeterminate="isSizesIndeterminate"> 全选 </el-checkbox>
        </template>
        <el-checkbox-group v-model="formData.sizes">
          <el-checkbox
            v-for="item in sizeOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="parts" label="尺码参数">
        <el-checkbox-group v-if="partOptions?.length" v-model="formData.parts">
          <el-checkbox
            v-for="item in partOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-checkbox-group>
        <span v-else class="tw-text-red">该品类暂无可选尺码参数</span>
      </el-form-item>
      <el-form-item
        label="档差"
        required
        class="tw-mb-0"
      >
        <SizeTable
          ref="sizeTableRef"
          class="tw-w-full"
          :sizes="selectedSizeOptions"
          :parts="selectedPartOptions"
          :default-diffs="formData.diffs"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { ISizeDiffCreateReq, ISizeDiffPageResItem } from '../../../api/types';
import SizeTable from './size-table.vue';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { fetchSizeDiffCreate, fetchSizeDiffEdit } from '../../../api';
import { useAddOptions } from '../hooks/use-add-options';
import { useDictionary } from '@/hooks/use-dictionary';
import DictionarySelect from '@/components/dictionary-select/index.vue';

interface IFormData extends ISizeDiffCreateReq {
  sizes: string[];
  parts: string[];
}

interface Props {
  modelValue: boolean;
  operationType: 'add' | 'edit';
  data?: ISizeDiffPageResItem;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isEdit = computed(() => props.operationType === 'edit');

const selfVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
});

const formRef = ref<FormInstance>();
const sizeTableRef = ref<InstanceType<typeof SizeTable>>();

const initFormData = (): IFormData => ({
  sizeCode: '',
  sizeName: '',
  part: '',
  size: '',
  diffs: [],
  sizes: [],
  parts: [],
});
const formData = reactive<IFormData>(initFormData());

const formRules: FormRules<IFormData> = {
  sizeCode: [{ required: true, message: '请选择尺码组', trigger: 'change' }],
  sizes: [{ required: true, message: '请选择尺码', trigger: 'change' }],
  parts: [{ required: true, message: '请选择尺码参数', trigger: 'change' }],
};

const {
  partOptions,
  sizeOptions,
  selectedSizeOptions,
  selectedPartOptions,
  isSizesAllChecked,
  isSizesIndeterminate,
} = useAddOptions(formData);

const { getDictionaryOptions } = useDictionary();

const onOpen = () => {
  if (isEdit.value && props.data) {
    const { sizeCode, sizeName, part, size, diffs } = props.data;
    const sizes = size.split(',');
    const parts = part.split(',');
    Object.assign(formData, { sizeCode, sizeName, sizes, parts, diffs });
  }
};

const onClose = () => {
  formRef.value?.resetFields();
  Object.assign(formData, initFormData());
  sizeTableRef.value?.reset();
  selfVisible.value = false;
};

const handleConfirm = async () => {
  await formRef.value?.validate();

  const diffs = sizeTableRef.value?.getDiffs() || [];
  const isEmpty = (val: number) => !val && val !== 0;
  if (diffs.some(item => item.parts.some(v => isEmpty(v.diff)))) {
    ElMessage.warning('档差值不能为空，请完善档差信息');
    return;
  }

  if (isEdit.value) {
    await fetchSizeDiffEdit({
      sizeDiffId: props.data!.sizeDiffId,
      part: formData.parts.join(','),
      size: formData.sizes.join(','),
      diffs,
    });
    ElMessage.success('编辑成功');
  } else {
    const sizeName = getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE)
      .find(item => item.value === formData.sizeCode)?.label || '';
    await fetchSizeDiffCreate({
      sizeCode: formData.sizeCode,
      sizeName,
      part: formData.parts.join(','),
      size: formData.sizes.join(','),
      diffs,
    });
    ElMessage.success('创建成功');
  }
  selfVisible.value = false;
  emit('success');
};
</script>
