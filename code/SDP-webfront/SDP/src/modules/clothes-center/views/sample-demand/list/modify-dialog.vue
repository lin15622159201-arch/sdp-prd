<template>
  <el-dialog
    :modelValue="props.visible"
    title="打版需求编辑"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="handleClose"
    @open="handleOpen"
    :width="500"
  >
    <div>
      <el-form
        :model="formData"
        label-width="100px"
        ref="formElRef"
        label-suffix="："
      >
        <el-form-item
          prop="sampleTimes"
          label="版次"
        >
          <span>{{ formData.sampleTimes }}</span>
        </el-form-item>
        <el-form-item
          prop="skc"
          label="SKC"
        >
          <span>{{ formData.skc }}</span>
        </el-form-item>
        <el-form-item
          prop="color"
          label="颜色"
        >
          <span>{{ formData.color }}</span>
        </el-form-item>
        <el-form-item
          prop="type"
          label="打版方式"
        >
          <el-radio-group v-model="formData.makeClothesType">
            <el-radio
              v-for="(item, index) in MAKE_CLOTHES_TYPE_LIST"
              :value="item.value"
              :key="index"
              :disabled="getMakeClothesTypeDisabled(item.value)"
            >{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="sampleSize"
          label="尺码"
          :rules="[{ required: true, message: '请选择尺码', trigger: 'change' }]"
        >
          <el-select
            v-model="formData.sampleSize"
            placeholder="请选择尺码"
            clearable
            :disabled="formData.allowChangeSampleSize === YES_NO_ENUM.NO"
          >
            <el-option
              v-for="item in PLM_SIZE_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="样衣件数"
          prop="sampleAmount"
          v-if="[
            MAKE_CLOTHES_TYPE_ENUM.ACTUAL,
            MAKE_CLOTHES_TYPE_ENUM.THREE_AND_ACTUAL,
          ].includes(formData.makeClothesType)"
          :rules="[{ required: true, message: '请选择样衣件数', trigger: ['change', 'blur'] }]"
        >
          <el-select
            v-model="formData.sampleAmount"
            placeholder="请选择"
            :disabled="formData.allowChangeSampleAmount === YES_NO_ENUM.NO"
          >
            <el-option
              v-for="(val, i) in Array(15).fill(1)"
              :key="i"
              :value="i + 1"
              :label="i + 1"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose()">取消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm()"
        >提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { ElForm, ElMessage } from 'element-plus';
import { requirementSummaryOpenEdit, requirementSummaryEdit } from '../api';
import { IRequirementSummaryOpenEditResMakeClothesTypesItem } from '../api/types';
import { MAKE_CLOTHES_TYPE_ENUM, MAKE_CLOTHES_TYPE_LIST } from '@/modules/clothes-center/constant';
import { YES_NO_ENUM } from '@/constant';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  rowData: {
    type: Object,
    required: true,
  }
});

const emits = defineEmits(['update:visible', 'confirm']);
const { getDictionaryOptions } = useDictionary();
// 纸样尺寸
const PLM_SIZE_OPTIONS = computed(() => {
  const list = getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE);
  if (!props.rowData.sizeStandardCode) return [];
  const row = list
    .find(v => v.value === props.rowData.sizeStandardCode)?.children?.[0];
  if (!row) return [];
  return row.label.split(',').map(v => ({
    label: v,
    value: v
  }));
});
const formElRef = ref<InstanceType<typeof ElForm> | null>(null);

const formData = ref({
  sampleTimes: '',
  skc: '',
  color: '',
  makeClothesTypes: [] as any,
  sampleSize: '',
  sampleAmount: '',
  makeClothesType: '' as MAKE_CLOTHES_TYPE_ENUM,
  allowChangeSampleSize: '',
  allowChangeSampleAmount: '',
});

const handleOpen = async () => {
  const { data } = await requirementSummaryOpenEdit({ sampleClothesId: props.rowData?.clothesId });
  formData.value.sampleTimes = data.sampleTimes!;
  formData.value.skc = data.skc!;
  formData.value.color = data.color!;
  formData.value.makeClothesTypes = data.makeClothesTypes || [];
  formData.value.makeClothesType = props.rowData?.makeClothesType || '';
  formData.value.sampleSize = props.rowData?.sampleSize || '';
  // 存在返回0的情况，需处理
  formData.value.sampleAmount = (data.sampleAmount && data.sampleAmount !== '0') ? data?.sampleAmount : '';
  formData.value.allowChangeSampleSize = data.allowChangeSampleSize || '';
  formData.value.allowChangeSampleAmount = data.allowChangeSampleAmount || '';
};
const handleClose = () => {
  emits('update:visible', false);
};

const handleConfirm = async () => {
  await formElRef.value?.validate();
  await requirementSummaryEdit({
    sampleClothesId: props.rowData?.clothesId,
    makeClothesType: formData.value.makeClothesType,
    sampleSize: formData.value.sampleSize,
    sampleAmount: [
      MAKE_CLOTHES_TYPE_ENUM.ACTUAL,
      MAKE_CLOTHES_TYPE_ENUM.THREE_AND_ACTUAL,
    ].includes(formData.value.makeClothesType) ? formData.value.sampleAmount : '',
  });
  ElMessage.success('操作成功');
  handleClose();
  emits('confirm');
};

const getMakeClothesTypeDisabled = (value: MAKE_CLOTHES_TYPE_ENUM) => {
  // eslint-disable-next-line vue/max-len
  const row = formData.value.makeClothesTypes?.find((v: IRequirementSummaryOpenEditResMakeClothesTypesItem) => v.code === value);
  return !row?.name;
};
</script>
