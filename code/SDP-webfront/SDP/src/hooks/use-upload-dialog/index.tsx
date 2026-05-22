import { fileItem } from '@/components/custom-form/hooks/use-uploader-format/types';
import { Plus } from '@element-plus/icons-vue';
import { useDialog } from '@toy/business-components';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

type ImgCallback = (imgUrl: string) => void;
export const useUploadDialog = (imgcallback:ImgCallback, options = {
  limit: 1,
  accept: '.png,.jpg,.jpeg',
  tips: '仅上传1 张图片, 支持png、jpg、jpeg图片格式',
  showListTypeImg: true,
  pasteAutoUpload: false,
}) => {
  const uploadList = ref<fileItem>([]);

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '上传图片',
    width: 500,
    confirmText: ('提交'),
    cancelText: ('取消'),
    onConfirm() {
      if (uploadList.value.length === 0) {
        ElMessage.warning('请上传图片!');
        return;
      }
      imgcallback(uploadList.value[0].url);
      closeDialog();
    },
    render() {
      return (
        <uploader
          v-model:modelValue={uploadList.value}
          uploaderStyle='button'
          {...options}
        >
          <div class='tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-text-gray-400 tw-text-lg'>
            <el-icon size={26}><Plus /></el-icon>
          </div>
        </uploader>
      );
    }
  }));

  const handleUpload = () => {
    openDialog();
    uploadList.value = [];
  };

  return {
    handleUpload,
  };
};
