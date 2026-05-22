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
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="取消原因：" prop="cancelReason">
        <el-input
          v-model.trim="formData.cancelReason"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入"
          resize="none"
          :maxlength="100"
          show-word-limit
          clearable
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
import type { PropType } from 'vue';
import { computed, ref, nextTick } from 'vue';
import type { ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import { IListItem } from '../views/list/types';
import { fetchSpotStyleBatchCancel, fetchSpotStyleBatchCancelSkc } from '../api';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  selection: {
    type: Array as PropType<IListItem[]>,
    default: () => [],
  },
});

interface IEmit {
  (e: 'update:modelValue', val: boolean): void;
  (e: 'success'): void;
}

interface IFormData {
  /** 取消原因 */
  cancelReason: string;
}

const emits = defineEmits<IEmit>();

const formRef = ref<InstanceType<typeof ElForm> | null>(null);

const [formData, resetFormData] = useResetRef<IFormData>({
  cancelReason: '',
});

const rules = {
  cancelReason: [{ required: true, message: '原因不能为空' }],
};

const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:modelValue', value),
});

const close = () => {
  resetFormData();
  show.value = false;
  nextTick(() => {
    formRef.value?.resetFields();
  });
};

const save = async () => {
  await formRef.value?.validate();
  const skcIds: Set<string> = new Set();
  props.selection.forEach((item) => {
    if (item.isChild) {
      skcIds.add(item.skcId);
    } else {
      item.skcs?.forEach((skc) => {
        skcIds.add(skc.skcId);
      });
    }
  });
  await fetchSpotStyleBatchCancelSkc([...skcIds].map(skcId => ({ skcId, message: formData.value.cancelReason })));
  ElMessage.success('取消成功');
  emits('success');
  close();
};
</script>
