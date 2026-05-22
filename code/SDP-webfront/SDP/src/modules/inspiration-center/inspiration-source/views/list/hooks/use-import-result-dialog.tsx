import { useDialog } from '@toy/business-components';
import { ref, computed } from 'vue';
import { IInspirationImportRes } from '@/modules/inspiration-center/inspiration-source/api/type';

export type HandleOpenDialog = (data: IInspirationImportRes) => void;

export const useImportResultDialog = () => {
  const data = ref({} as IInspirationImportRes);

  const summary = computed(() => `灵感图导入成功 ${data.value.successCount} 条，失败 ${data.value.failCount} 条 数据！`);
  const message = computed(() => data.value.failureDetails || []);

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '导入结果',
    showCancelBtn: false,
    onConfirm() {
      closeDialog();
    },
    render() {
      return (
        <>
          <div>{ summary.value }</div>
          <div class='tw-flex tw-flex-col tw-overflow-scroll tw-h-200px tw-p-x-4 tw-m-t-4 tw-bg-[#F2F2F2] tw-p-b-4'>
            {
              message.value.map((i, idx) => (
                <div class='tw-m-t-4' key={`${idx}-${i.rowNumber}`}>{ `第${i.rowNumber}行${i.reason}` }</div>
              ))
            }
          </div>
        </>
      );
    },
  }));

  const handleOpenDialog: HandleOpenDialog = async (val) => {
    data.value = val;
    openDialog();
  };

  return {
    handleOpenDialog
  };
};
