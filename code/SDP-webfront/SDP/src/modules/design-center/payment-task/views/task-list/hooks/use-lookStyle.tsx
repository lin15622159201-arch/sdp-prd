import { ref } from 'vue';
import { useDialog } from '@toy/business-components';
import ReviewLook from '../../../components/review-look.vue';
import { DevelopStylePageResListItem } from '../../../api/types';

export const useLookStyleDialog = () => {
  const data = ref<DevelopStylePageResListItem[]>([]);
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '同款款式/商品',
    width: 1000,
    class: 'clear-dialog-body-padding',
    showConfirmBtn: false,
    showCancelBtn: false,
    render: () => {
      return (
        <ReviewLook selectList={data.value} />
      );
    }
  }));

  const handleOpenDialog = async (row: DevelopStylePageResListItem) => {
    data.value = [row];
    openDialog();
  };

  return {
    handleOpenDialog,
  };
};
