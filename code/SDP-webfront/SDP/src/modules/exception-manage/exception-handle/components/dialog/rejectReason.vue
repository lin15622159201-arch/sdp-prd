<!--驳回原因-->
<template>
  <el-dialog
    v-model="show"
    title="驳回原因"
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
      <el-form-item label="驳回原因：" prop="applyRejectReason">
        <el-input
          v-model="form.applyRejectReason"
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
  name: 'rejectReason.vue',
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
    const form = ref({ applyRejectReason: '' });

    const rules = {
      applyRejectReason: [{ required: true, message: '原因不能为空' }],
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
      emit('submit', form.value.applyRejectReason);
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
