<!-- 审核驳回弹框 -->
<template>
  <el-dialog
    v-model="visibleInner"
    :title="title || '审核不通过'"
    width="520px"
    destroy-on-close
    @closed="onClosed"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="90px"
    >
      <el-form-item label="驳回原因" prop="reason">
        <el-input
          v-model="form.reason"
          type="textarea"
          :rows="5"
          :maxlength="maxlength || 200"
          show-word-limit
          placeholder="请输入驳回原因"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { fetchStyleOnShelvesReview } from '@/modules/goods-manage/api/listing';
import { productCreateApi } from '../api/index';

const props = defineProps<{
  visible: boolean;
  title?: string;
  styleId: string;
  maxlength?: number;
}>();

const emit = defineEmits<{
  (e: 'update:visible', v: boolean): void;
  (e: 'success'): void;
}>();

const formRef = ref<FormInstance>();
const form = reactive({ reason: '' });
const rules = reactive<FormRules>({
  reason: [{ required: true, message: '请输入驳回原因', trigger: 'blur' }]
});

const visibleInner = computed({
  get: () => props.visible,
  set: (v: boolean) => emit('update:visible', v)
});

const close = () => {
  visibleInner.value = false;
};

const onConfirm = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid) => {
    if (!valid) return;
    await productCreateApi({
      styleId: props.styleId,
      pass: false,
      reviewFailReason: form.reason,
    });
    emit('success');
    ElMessage.success('驳回成功');
    visibleInner.value = false;
    form.reason = '';
  });
};

const onClosed = () => {
  form.reason = '';
};
</script>
