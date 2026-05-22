import { useDialog } from '@toy/business-components';
import { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import { IMAGE_UPDATE_TASK_TYPE_ENUM } from '../../../constant';
import { useRouter } from 'vue-router';
import { fetchImageUpdateListBySpu } from '../../../api';

export const useCreateDialog = () => {
  const router = useRouter();
  const errText = ref('');
  const formElRef = ref<FormInstance>();
  const formData = reactive({
    styleCode: '',
    taskType: IMAGE_UPDATE_TASK_TYPE_ENUM.IMAGE
  });
  const rules = {
    styleCode: [
      { required: true, message: '请输入款号', trigger: 'blur' },
    ],
    taskType: [
      { required: true, message: '请选择任务类型', trigger: 'change' },
    ],
  };

  const clearErrText = () => {
    errText.value = '';
  };

  const onConfirm = async () => {
    errText.value = '';
    await formElRef.value?.validate();
    const spuCodes = formData.styleCode.split(/,| /).map(code => code.trim()).filter(code => code);
    // 检查是否有重复的款号
    if (new Set(spuCodes).size !== spuCodes.length) {
      errText.value = '款号不能重复';
      return;
    }

    const { data } = await fetchImageUpdateListBySpu({
      spuCodes,
      taskType: formData.taskType
    });
    if (data?.length < spuCodes.length) {
      const notExistCodes = data?.length ? spuCodes.filter(code => !data.some(item => item.spuCode === code)) : spuCodes;
      errText.value = `以下款号不存在：${notExistCodes.join(', ')}`;
      return;
    }

    router.push({ name: 'DesignCenterImageUpdateCreate',
      params: {
        taskType: formData.taskType,
        styleCode: spuCodes.join(',')
      } });
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    closeDialog();
  };

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '发起图片/视频更新',
    width: 400,
    onClose() {
      formElRef.value?.resetFields();
      clearErrText();
    },
    onConfirm,
    render() {
      return (
        <el-form ref={formElRef} rules={rules} model={formData} label-width='80px'>
          <el-form-item label='输入款号' prop='styleCode'>
            <el-input v-model={formData.styleCode} placeholder='支持输入多个款号，以","或空格区分' onBlur={() => clearErrText()} />
          </el-form-item>
          <el-form-item label='任务类型' prop='taskType'>
            <el-radio-group v-model={formData.taskType}>
              <el-radio label={IMAGE_UPDATE_TASK_TYPE_ENUM.IMAGE}>图片</el-radio>
              <el-radio label={IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO}>视频</el-radio>
            </el-radio-group>
          </el-form-item>
          {errText.value && <span class='tw-text-red-500 tw-text-sm tw-ml-4'>{errText.value}</span>}
        </el-form>
      );
    },
  }));

  const openCreateDialog = (defaultFormData?: Partial<typeof formData>) => {
    defaultFormData && Object.assign(formData, defaultFormData);
    openDialog();
  };

  return { openCreateDialog };
};
