import { ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue';
import { DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM } from '../../../constant';
import { digitalPaintingWithdraw } from '../../../api';
import { IDigitalPaintingQueryByPageResListItem } from '../../../api/types';

const useHandleOperation = (successFn: Function) => {
  const currentRow = ref<IDigitalPaintingQueryByPageResListItem | null>(null);

  const digitalDraftDialogObj = reactive({
    visible: false,
    title: '',
    operationType: DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.NEW,
    isShowEditSkcCode: false,
  });
  /**
   * @description: 编辑
   */
  const handleEdit = (row: IDigitalPaintingQueryByPageResListItem) => {
    console.log('编辑=', row);
    currentRow.value = row;
    digitalDraftDialogObj.title = '编辑任务';
    digitalDraftDialogObj.operationType = DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.EDIT;
    digitalDraftDialogObj.isShowEditSkcCode = false;
    digitalDraftDialogObj.visible = true;
  };

  // 操作日志抽屉
  const drawer = reactive({
    visible: false,
    params: {
      bizId: '',
      bizType: '',
    },
  });
  /**
   * @description: 操作日志
   */
  const handleLog = (row: IDigitalPaintingQueryByPageResListItem) => {
    drawer.params = { bizId: row.digitalPaintingId, bizType: '44' };
    drawer.visible = true;
  };
  /**
   * @description: 撤回
   */
  const handleRecall = async (row: IDigitalPaintingQueryByPageResListItem) => {
    await ElMessageBox.confirm('撤回任务后，供应商系统将不再显示该任务，是否撤回？', '撤回', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await digitalPaintingWithdraw({
      digitalPaintingId: row.digitalPaintingId,
    });
    successFn();
  };

  const isShowCancelDialog = ref(false);
  /**
   * @description: 取消
   */
  const handleCancel = (row: IDigitalPaintingQueryByPageResListItem) => {
    console.log('取消=', row);
    currentRow.value = row;
    isShowCancelDialog.value = true;
  };
  const auditDialogObj = reactive({
    title: '审核',
    visible: false,
    operationType: DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.AUDIT,
  });
  /**
   * @description: 审核
   */
  const handleAudit = (row: IDigitalPaintingQueryByPageResListItem) => {
    currentRow.value = row;
    auditDialogObj.title = '审核';
    auditDialogObj.operationType = DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.AUDIT;
    auditDialogObj.visible = true;
  };
  /**
   * @description: 查看
   */
  const handleView = (row: IDigitalPaintingQueryByPageResListItem) => {
    console.log('查看=', row);
    currentRow.value = row;
    auditDialogObj.title = '详情';
    auditDialogObj.operationType = DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.AUDIT_VIEW;
    auditDialogObj.visible = true;
  };

  const isShowCodeDialog = ref(false);
  /**
   * @description: 编码
   */
  const handleCode = (row: IDigitalPaintingQueryByPageResListItem) => {
    console.log('编码=', row);
    currentRow.value = row;
    isShowCodeDialog.value = true;
  };

  /**
   * @description: 重新描稿
   */
  const handleRedraft = (row: IDigitalPaintingQueryByPageResListItem) => {
    currentRow.value = row;
    digitalDraftDialogObj.title = '重新描稿';
    digitalDraftDialogObj.operationType = DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.REDRAFT;
    digitalDraftDialogObj.isShowEditSkcCode = false;
    digitalDraftDialogObj.visible = true;
  };

  return {
    isShowCodeDialog,
    auditDialogObj,
    currentRow,
    isShowCancelDialog,
    digitalDraftDialogObj,
    drawer,
    handleEdit,
    handleLog,
    handleRecall,
    handleCancel,
    handleAudit,
    handleView,
    handleCode,
    handleRedraft,
  };
};
export default useHandleOperation;
