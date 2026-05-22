<script lang="ts" setup>
/**
 * 更改设计师dialog
 */
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { PropType, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import DesignerSelect from '@/components/designer-select';
import { IListItem } from '../../types';
import { actionChangeDesigner } from '@/modules/design-center/style-manage/api';
import { IPrototypeManageDesignerChangeReq } from '@/modules/design-center/style-manage/api/types';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  selection: {
    type: Array as PropType<IListItem[]>,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'success']);

const { visible: selfVisible } = useDialogVisible(props, emit);

/**
 * form相关
 */
const formRef = ref<FormInstance>();
const formModel = reactive<{ designerId: string; }>({
  designerId: '',
});
const formRules = reactive<FormRules>(
  {
    designerId: [
      { required: true, message: '必填', trigger: 'change' },
    ],
  },
);

const handleConfirm = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    const requestParam: IPrototypeManageDesignerChangeReq = {
      prototypeIdList: props.selection?.map(v => v?.prototypeId || ''),
      designerId: formModel.designerId,
    };
    await actionChangeDesigner(requestParam);
    ElMessage.success('操作成功');
    emit('success');
    selfVisible.value = false;
  }
};

const resetVar = () => {
  formModel.designerId = '';
  formRef.value?.clearValidate();
};
const handleOpen = async () => {
  resetVar();
};
const handleClose = () => {
  resetVar();
};

</script>
<template>
  <el-dialog
    v-model="selfVisible"
    width="400px"
    title="变更设计师"
    append-to-body
    @open="handleOpen"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      label-position="right"
    >
      <el-form-item
        label="设计师"
        prop="designerId"
      >
        <DesignerSelect
          v-model="formModel.designerId"
          style="width: 100%"
          :prop="{
            label: 'designerName',
            value: 'designerId',
          }"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="selfVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.label {
    font-weight: bold;
}
.margin-left-30 {
    margin-left: 30px;
}
.margin-bottom-8 {
    margin-bottom: 8px;
}
:deep(.el-form-item__label) {
    font-weight: bold;
}
</style>
