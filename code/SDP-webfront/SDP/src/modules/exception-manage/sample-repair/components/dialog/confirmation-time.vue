<script lang="ts" setup>
import type { ElForm, FormRules } from 'element-plus';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { nextTick, ref, watch } from 'vue';
import { ACTUAL_TIME_LIST } from '@/modules/exception-manage/exception-handle/constant';

interface IProps {
  modelValue: boolean;
  handler: (val: string) => Promise<void>;
}
interface IEmits {
  (event: 'update:modelValue', val: boolean): void;
}

const props = withDefaults(
  defineProps<IProps>(),
  {},
);
const emit = defineEmits<IEmits>();
const { visible } = useDialogVisible(props, emit);
const formData = ref({
  confirmCostTime: '',
});
const formRef = ref<InstanceType<typeof ElForm>>();
const rules: FormRules = {
  confirmCostTime: [
    {
      required: true,
      message: '请选择实际耗时',
      trigger: ['change', 'blur'],
    },
  ],
};

const submit = async () => {
  await formRef.value?.validate();

  await props.handler(formData.value.confirmCostTime);

  visible.value = false;
};

watch(visible, () => {
  if (!visible.value) {
    formData.value.confirmCostTime = '';

    nextTick(() => {
      formRef.value?.resetFields();
    });
  }
});

</script>

<template>
  <el-dialog
    v-model="visible"
    title="确认实际耗时"
    :close-on-click-modal="false"
    append-to-body
    center
    custom-class="dialog-width-small el-dialog-inner-scroll"
  >
    <el-form
      ref="formRef"
      label-width="110px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="实际耗时" prop="confirmCostTime">
        <el-select v-model="formData.confirmCostTime" style="width: 100%">
          <el-option
            v-for="item in ACTUAL_TIME_LIST"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">
        取消
      </el-button>
      <el-button type="primary" @click="submit">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
