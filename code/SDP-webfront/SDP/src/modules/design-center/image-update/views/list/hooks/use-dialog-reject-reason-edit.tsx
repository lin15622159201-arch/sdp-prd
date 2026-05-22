import { useDialog } from '@toy/business-components';
import { IImageUpdatePageItem } from '../../../api/type';
import { computed, reactive, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElForm, ElFormItem, ElIcon, ElInput, FormInstance } from 'element-plus';
import Uploader from '@/components/uploader';
import { fetchImageUpdateBatchCheck } from '../../../api';
import { IMAGE_UPDATE_AUDIT_RESULT_ENUM } from '../../../constant';
import { IFile } from '@/components/uploader/packages/types';

export const useRejectReasonEditDialog = (onSuccess: () => void) => {
  const styleData = ref<IImageUpdatePageItem>();
  const formData = reactive({
    reason: '',
    notPassDescribePicture: ''
  });
  const formRef = ref<FormInstance>();

  const rules = {
    reason: [
      { required: true, message: '请输入审核不通过原因', trigger: 'blur' },
    ],
  };
  const uploadList = computed<IFile[]>({
    get() {
      return formData.notPassDescribePicture ? [{ url: formData.notPassDescribePicture }] : [];
    },
    set(val) {
      formData.notPassDescribePicture = val[0]?.url || '';
    }
  });

  const onConfirm = async () => {
    formRef.value?.validate(async (valid) => {
      if (!valid) return;
      await fetchImageUpdateBatchCheck([{
        taskId: styleData.value!.taskId,
        result: IMAGE_UPDATE_AUDIT_RESULT_ENUM.NO,
        ...formData,
        skcList: []
      }]);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      closeDialog();
      onSuccess();
    });
  };

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '审核不通过',
    onClose() {
      formRef.value?.resetFields();
      uploadList.value = [];
    },
    onConfirm,
    render() {
      return (
        <ElForm ref={formRef} rules={rules} model={formData} labelWidth={80}>
          <ElFormItem label='返修说明' prop='reason'>
            <ElInput v-model={formData.reason} type='textarea' rows={3} maxlength={500} showWordLimit />
          </ElFormItem>
          <ElFormItem label='附件' prop='notPassDescribePicture'>
            <Uploader
              v-model={uploadList.value}
              limit={1}
              size='mini'
              accept='.png,.jpg,.jpeg'
              tips='仅上传1 张图片, 支持png、jpg、jpeg图片格式'
              showListTypeImg
              pasteAutoUpload={false}
            >
              <div class='tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-text-gray-400 tw-text-lg'>
                <ElIcon size={26}><Plus /></ElIcon>
              </div>
            </Uploader>
          </ElFormItem>
        </ElForm>
      );
    },
  }));

  const openRejectReasonEditDialog = (data: IImageUpdatePageItem) => {
    styleData.value = data;
    openDialog();
  };

  return { openRejectReasonEditDialog };
};
