<!--拒绝驳回-->
<template>
  <el-dialog
    v-model="show"
    title="拒绝驳回"
    width="460px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @closed="close()"
  >
    <el-form
      ref="formRef"
      label-width="125px"
      :model="form"
      :rules="rules"
      class="app-fheader-custom-form"
    >
      <el-form-item label="拒绝驳回原因：" prop="rollbackReason">
        <el-input
          v-model="form.rollbackReason"
          maxlength="50"
          show-word-limit
          style="width: 300px"
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

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue';
import type { ElForm } from 'element-plus';

export default defineComponent({
  name: 'RefuseReject',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  emits: ['update:visible', 'submit'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const form = ref({ rollbackReason: '' });

    const rules = {
      rollbackReason: [{ required: true, message: '原因不能为空' }],
    };
    const show = computed({
      get: () => props.visible,
      set: (value: boolean) => emit('update:visible', value),
    });
    const close = () => {
      show.value = false;
      nextTick(() => {
        formRef.value?.resetFields();
      });
    };
    const save = async () => {
      await formRef.value?.validate();
      emit('submit', form.value.rollbackReason);
      close();
    };
    return {
      formRef,
      rules,
      close,
      form,
      show,
      save,
    };
  },
});
</script>

<style scoped lang="scss">
//
</style>
