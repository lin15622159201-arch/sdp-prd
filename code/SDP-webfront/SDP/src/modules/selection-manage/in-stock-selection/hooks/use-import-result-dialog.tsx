import { useDialog } from '@toy/business-components';
import { ref, computed } from 'vue';
import { IMPORT_RESULT_ENUM, IMPORT_TYPE_ENUM, IMPORT_TYPE_LIST } from '../constant';
import { ISelectionImportResultDialogParams } from '../type';

export type HandleOpenDialog = (data:ISelectionImportResultDialogParams) => void;

export const useImportResultDialog = () => {
  const res = ref<ISelectionImportResultDialogParams>({
    successful: IMPORT_RESULT_ENUM.SUCCESS,
    message: '导入成功',
    error: [],
    importType: IMPORT_TYPE_ENUM.CONFIRM_UPDATE_QUOTE,
  });

  const importType = computed(() => {
    const index = IMPORT_TYPE_LIST.findIndex(item => item.value === res.value.importType);
    return index > -1 ? IMPORT_TYPE_LIST[index].label : '';
  });

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '导入结果',
    showCancelBtn: false,
    onConfirm() {
      closeDialog();
    },
    render() {
      return (
        <div>
          <div class='tw-mb-3'>
            <el-text type='info'>导入类型：</el-text>
            <span class='tw-ml-4'>{importType.value}</span>
          </div>
          {
            res.value.successful === IMPORT_RESULT_ENUM.SUCCESS
              ? <p class='tw-pl-4'>{res.value.message}</p> : (
                <div class='tw-flex tw-flex-col tw-bg-gray-100 tw-p-4'>
                  <el-scrollbar max-height='400px'>
                    <p>导入失败，失败原因</p>
                    <div class='tw-pl-4'>
                      {
                        res.value.error?.map(item => (
                          <p class='tw-mt-1'>{item}</p>
                        ))
                      }
                    </div>
                  </el-scrollbar>
                </div>
              )
          }
        </div>
      );
    }
  }));

  const handleOpenDialog: HandleOpenDialog = async (data:ISelectionImportResultDialogParams) => {
    openDialog();
    res.value = data;
    console.log('res.value', res.value);
  };

  return {
    handleOpenDialog
  };
};
