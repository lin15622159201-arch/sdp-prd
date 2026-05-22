import { useDialog } from '@toy/business-components';
import BatchUploader from '@/modules/design-center/image-update/component/batch-uploader.vue';
import { ref } from 'vue';
import { IImageUpdatePageItem } from '../../../api/type';

export const useUploadDialog = (onSuccess?: () => void) => {
  const batchUploadRef = ref<InstanceType<typeof BatchUploader>>();
  const styleList = ref<IImageUpdatePageItem[]>([]);
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '批量上传图片/视频',
    confirmText: '提交更新结果',
    width: 1080,
    onClose() {
      batchUploadRef.value?.reset();
    },
    async onConfirm() {
      const res = await batchUploadRef.value?.submit();
      if (res) {
        closeDialog();
        onSuccess?.();
      }
    },
    render() {
      return (
        <BatchUploader ref={batchUploadRef} styleList={styleList.value} isUploadable />
      );
    },
  }));

  const openUploadDialog = (selectedList: IImageUpdatePageItem[]) => {
    styleList.value = selectedList;
    openDialog();
  };

  return { openUploadDialog };
};
