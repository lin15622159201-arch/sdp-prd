import { useDialog } from '@toy/business-components';
import { FormRules, FormInstance, ElMessage } from 'element-plus';
import { ref } from 'vue';
import UserSelect from '@/components/user-select';
import { useResetRef } from '@toy/v-use';
import { IAuditCraftOrderPageResListItem } from '../../../api/types';
import { auditCraftOrderAssignReviewCraftsman } from '../../../api';

export const useTaskTransferFormDialog = (props: {
  reloadFn: () => void;
}) => {
  const { reloadFn } = props;

  const formElRef = ref<FormInstance>();
  const setFormElRef = (el: FormInstance) => {
    formElRef.value = el;
  };
  const [formData, reset] = useResetRef({
    userId: '',
    userName: '',
    auditCraftOrderIds: [] as string[],
  });

  const rules:FormRules = {
    userId: {
      required: true,
      message: '请选择审版工艺师',
    },
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '维护处理人',
    width: 400,
    onClose() {
      reset();
    },
    async onConfirm() {
      console.log('save=', formData.value);
      await formElRef.value?.validate();
      await auditCraftOrderAssignReviewCraftsman({
        auditCraftOrderIds: formData.value.auditCraftOrderIds,
        userId: formData.value.userId,
        userName: formData.value.userName,
      });
      ElMessage.success('任务指派成功！');
      closeDialog();
      reloadFn();
    },
    render() {
      return (
        <el-form ref={setFormElRef} rules={rules} model={formData.value}>
          <el-form-item label='审版工艺师' prop='userId'>
            <UserSelect
              v-model={formData.value.userId}
              clearable
              onChange={(val:any, data:any) => {
                console.log('val=', val, data);
                formData.value.userName = data?.name || '';
              }}
            />
          </el-form-item>
        </el-form>
      );
    },
  }));

  const handleDialog = (selectedList: IAuditCraftOrderPageResListItem[]) => {
    formData.value.auditCraftOrderIds = selectedList.map(item => item.auditCraftOrderId!);
    openDialog();
    formElRef.value?.clearValidate();
  };

  return {
    handleDialog,
  };
};
