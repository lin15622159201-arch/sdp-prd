<template>
  <el-dialog
    v-model="selfVisible"
    :title="title"
    center
    :show-close="true"
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="130px"
      :rules="rules"
    >
      <el-form-item
        label="设计组别"
        prop="designerGroupName"
        class="user-transfor"
      >
        <el-select v-model="formData.designerGroupCode" placeholder="请选择">
          <el-option
            v-for="item in groups"
            :key="item.designerGroupCode"
            :label="item.designerGroupName"
            :value="item.designerGroupCode"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">
        取 消
      </el-button>
      <el-button type="primary" @click="handleConfirm">
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType, ComputedRef } from 'vue';
import { defineComponent, ref, computed, reactive } from 'vue';
// import { ElMessageBox } from 'element-plus';
import { designerTransfer } from '../api';
import { useHandleTransfor } from '../../../utils/index';
import type { IDesignerGroupDataListItem } from '../api/type';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { useResetRef } from '@toy/v-use';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    groupLists: {
      type: Array as PropType<IDesignerGroupDataListItem[]>,
      required: true,
    },
    designerGroupCode: {
      type: String,
      required: true,
    },
  },
  emits: ['refreshList', 'update:modelValue'],
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const title = '员工转移';
    const formRef = ref();
    const [formData, resetFormData] = useResetRef({
      designerGroupCode: '',
      groups: [],
    });

    let groups: ComputedRef<IDesignerGroupDataListItem[]> = computed(() => []);

    groups = computed(() => {
      return props.groupLists.filter((it) => {
        return it.designerGroupCode !== props.designerGroupCode;
      });
    });

    // 关闭弹窗
    const handleClose = () => {
      selfVisible.value = false;
      formRef.value.resetFields();
      resetFormData();
    };

    const transforUser = () => {
      const selectGroup: IDesignerGroupDataListItem | undefined = groups.value?.find((it) => {
        return it.designerGroupCode === formData.value.designerGroupCode;
      });
      return useHandleTransfor({
        id: props.id,
        designerGroupCode: selectGroup?.designerGroupCode,
        designerGroupName: selectGroup?.designerGroupName,
        api: designerTransfer,
      });
    };

    // 确认保存
    const handleConfirm = async () => {
      await formRef.value.validate();
      await transforUser();
      formRef.value.resetFields();
      emit('refreshList');
      selfVisible.value = false;
    };

    return {
      formRef,
      selfVisible,
      formData,
      handleClose,
      handleConfirm,
      title,
      rules: {
        designerGroupCode: [{ required: true, message: '请选择设计组别', trigger: ['blur'] }],
      },
      groups,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-transfor{
  :deep(.el-select){
    width: 100%;
  }
}
</style>
