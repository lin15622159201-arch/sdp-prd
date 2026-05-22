<!--确认收货-->
<template>
  <el-dialog
    v-model="show"
    title="确认收货"
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
      <el-form-item
        label="收货件数："
        prop="receivedNum"
      >
        <input-number
          v-model="form.receivedNum"
          :max="99"
          :min="0"
          clearable
          placeholder="请输入 收货件数"
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
import type { PropType } from 'vue';
import { computed, defineComponent, ref, nextTick } from 'vue';
import type { ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { PATTERN_SEW_COMBINE_ENUM } from '@/modules/exception-manage/exception-handle/constant';

export default defineComponent({
  name: 'RepairReceipt',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: true,
    },
    sampleAmount: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['update:visible', 'submit'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const form = ref({ receivedNum: '' });
    const rules = {
      receivedNum: [
        { required: true, message: '请输入 收货件数', trigger: 'blur' },
        { validator(_: any, value: any, callback: any) {
          if (value === '') {
            callback(new Error('请输入'));
          } else {
            callback();
          }
        },
        trigger: 'blur' },
      ],
    };

    // 弹框状态
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

    // 提交
    const save = async () => {
      await formRef.value?.validate();
      const sampleAmount = props.sampleAmount || '0';
      if (sampleAmount && (window.parseInt(form.value.receivedNum, 10) > window.parseInt(sampleAmount, 10))) {
        ElMessage.warning('收货件数不可大于打版件数!');
        return;
      }
      emit('submit', form.value.receivedNum);
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
