import { ref } from 'vue';
import { useDialog } from '@toy/business-components';
import ReminderList from '../components/reminderList.vue';
import type { IStyleOnShelvesPageItem } from '@/modules/goods-manage/api/listing/type';
import { ElMessage } from 'element-plus';

export const useReminderDialog = () => {
  const data = ref<any>([]);
  const funs = ref<any>({});
  const timeReminder = ref();
  const confirm = () => {
    funs.value._fun && funs.value._fun();
    ElMessage.success('发布成功');
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '发布提醒',
    width: 800,
    class: 'clear-dialog-body-padding',
    showConfirmBtn: false,
    showCancelBtn: false,
    render: () => {
      return (
        <ReminderList
          onConfirm={() => {
            confirm();
          }}
          mockData={data.value}
          closeDialog={closeDialog}
          key={timeReminder.value}
        />
      );
    }
  }));

  const handleOpenDialog = async (row: IStyleOnShelvesPageItem[], onBatchSuccess: any) => {
    funs.value._fun = onBatchSuccess;
    data.value = row;
    timeReminder.value = new Date().getTime();
    openDialog();
  };

  return {
    handleOpenDialog,
  };
};
