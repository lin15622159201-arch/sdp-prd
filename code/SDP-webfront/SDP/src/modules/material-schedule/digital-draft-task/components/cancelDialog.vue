<template>
  <el-dialog
    v-model="show"
    title="取消"
    width="440px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @closed="close()"
  >
    <el-form
      ref="formRef"
      label-width="95px"
      :model="form"
      :rules="rules"
      class="app-fheader-custom-form"
    >
      <el-form-item label="取消原因：" prop="reason">
        <el-input
          v-model="form.reason"
          maxlength="50"
          show-word-limit
          :autosize="{ minRows: 3, maxRows: 5 }"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ElMessage, type ElForm } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import { digitalPaintingCancel } from '../api';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    require: true,
  },
  id: {
    type: String,
    default: '',
  },
});

interface IEmits {
  (e: 'update:modelValue', visible: boolean): void;
  (e: 'success'): void;
}

const emit = defineEmits<IEmits>();

interface IForm {
  reason: string;
}

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const [form, reset] = useResetRef<IForm>({
  reason: '',
});

const rules = {
  reason: [{ required: true, message: '原因不能为空' }],
};
const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:modelValue', value),
});
const close = () => {
  reset();
  formRef.value?.resetFields();
  show.value = false;
};

const save = async () => {
  await formRef.value?.validate();
  await digitalPaintingCancel({
    digitalPaintingId: props.id,
    cancelReason: form.value.reason,
  });
  ElMessage.success('取消成功');
  emit('success');
  close();
};
</script>

<style scoped lang="scss">
//
</style>
