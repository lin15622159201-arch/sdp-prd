<template>
  <!-- 复版 -->
  <div class="error-dialog">
    <el-dialog
      v-model="show"
      width="500px"
      :title="title"
      :close-on-click-modal="false"
      center
      append-to-body
      @close="close()"
    >
      <sc-form
        :config="formConfig"
        :model="formData"
        ref="formEl"
        label-suffix="："
        label-width="130px"
        :col="{
          xs: 24,
          sm: 24,
          md: 24,
          lg: 24,
          xl: 24,
        }"
      />
      <template #footer>
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElForm } from 'element-plus';
import { useFormConfig } from './use-form-config';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '复版原因',
  },
});
const emits = defineEmits(['update:visible', 'confirm']);

const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:visible', value),
});

const formEl = ref<InstanceType<typeof ElForm> | null>(null);

const formData = ref({
  redoReasonCode: '',
  redoReason: '',
  responsibleParty: '',
  responsiblePartyName: '', // 返修责任方
});
const { formConfig } = useFormConfig(formData);

const close = () => {
  show.value = false;
};

const confirm = async () => {
  await formEl.value?.validate();
  emits('confirm', formData.value);
};

</script>
