import { useDialog } from '@toy/business-components';
import { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import { IMAGE_UPDATE_TASK_TYPE_ENUM } from '../../../constant';

interface IFormData {
  taskType: IMAGE_UPDATE_TASK_TYPE_ENUM;
}
/**
 * 创建任务前弹窗
 * @param onSuccess
 * @returns
 */
export const useBeforeCreateDialog = (onSuccess: (data: IFormData) => void) => {
  const formElRef = ref<FormInstance>();
  const formData = reactive({
    taskType: IMAGE_UPDATE_TASK_TYPE_ENUM.IMAGE
  });
  const rules = {
    taskType: [
      { required: true, message: '请选择任务类型', trigger: 'change' },
    ],
  };

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '请先选择修图任务类型',
    width: 400,
    showClose: false,
    showCancelBtn: false,
    async onConfirm() {
      await formElRef.value?.validate();
      onSuccess(formData);
      closeDialog();
    },
    render() {
      return (
        <el-form ref={formElRef} rules={rules} model={formData} label-width='80px'>
          <el-form-item label='任务类型' prop='taskType'>
            <el-radio-group v-model={formData.taskType}>
              <el-radio label={IMAGE_UPDATE_TASK_TYPE_ENUM.IMAGE}>图片</el-radio>
              <el-radio label={IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO}>视频</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      );
    },
  }));

  return { openDialog };
};
