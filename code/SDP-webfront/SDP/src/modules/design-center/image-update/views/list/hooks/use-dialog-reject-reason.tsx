import { useDialog } from '@toy/business-components';
import { IImageUpdatePageItem } from '../../../api/type';
import { ref } from 'vue';

export const useRejectReasonDialog = () => {
  const item = ref({
    reason: '',
    notPassDescribePicture: '',
  });
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '审核不通过原因',
    showCancelBtn: false,
    showConfirmBtn: false,
    onClose() {},
    async onConfirm() {
      closeDialog();
    },
    render() {
      return (
        <div>
          <p class='tw-mb-4'>{item.value.reason}</p>
          <custom-image class='tw-w-500px' src={item.value.notPassDescribePicture} preview-src-list={[item.value.notPassDescribePicture]} />
        </div>
      );
    },
  }));

  const openRejectReasonDialog = (row: IImageUpdatePageItem) => {
    item.value = {
      reason: row.reason,
      notPassDescribePicture: row.notPassDescribePicture,
    };
    openDialog();
  };

  return { openRejectReasonDialog };
};
