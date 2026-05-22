import { computed, ref } from 'vue';
import { IReplaceColorTaskPageItem } from '../../api/type';
import { ButtonProps, ElMessage, ElMessageBox } from 'element-plus';
import { usePermissionCheck } from './use-permission-check';
import { usePermissionConfig } from '../../use-permission-config';
import { fetchReplaceColorTaskDeleteBatch, fetchReplaceColorTaskRetryBatch, fetchReplaceColorTaskStopBatch } from '../../api';

/**
 * 批量操作
 */
export const useBatchHandler = ({ handleSearch }: { handleSearch:(pageNum?: number)=>void; }) => {
  const { SC, CS, ZZ } = usePermissionConfig();
  const { canTaskRemove, canTaskRetry, canTaskStop } = usePermissionCheck();

  const selectedList = ref<IReplaceColorTaskPageItem[]>([]);
  const canBatchRemove = computed(() => selectedList.value.some(canTaskRemove));
  const canBatchStop = computed(() => selectedList.value.some(canTaskStop));
  const canBatchRetry = computed(() => selectedList.value.some(canTaskRetry));

  const confirmBeforeSubmit = (message: string) => {
    return ElMessageBox.confirm(message, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
  };
  const handleBatchStop = async () => {
    await confirmBeforeSubmit('确定要批量中止吗？');
    await fetchReplaceColorTaskStopBatch(selectedList.value.map(item => item.taskId));
    handleSearch();
    ElMessage.success('批量中止成功');
  };

  const handleBatchRemove = async () => {
    await confirmBeforeSubmit('确定要批量删除吗？');
    await fetchReplaceColorTaskDeleteBatch(selectedList.value.map(item => item.taskId));
    handleSearch();
    ElMessage.success('批量删除成功');
  };

  const handleBatchRetry = async () => {
    await fetchReplaceColorTaskRetryBatch(selectedList.value.map(item => item.taskId));
    handleSearch();
    ElMessage.success('批量重试成功');
  };

  const handleSelectionChange = (val: IReplaceColorTaskPageItem[]) => {
    selectedList.value = val;
  };

  type IButtonConfig = Partial<ButtonProps> & { label: string; isShow?: boolean; disabledTooltip?: string; onClick: () => void; };
  const batchButtonList = computed<IButtonConfig[]>(() => [
    {
      label: '批量中止',
      type: 'danger',
      plain: true,
      isShow: ZZ.value,
      disabled: !canBatchStop.value,
      disabledTooltip: '请先选择当前用户【排队中】或【生成中】的任务',
      onClick: handleBatchStop
    },
    {
      label: '批量删除',
      type: 'danger',
      plain: true,
      isShow: SC.value,
      disabled: !canBatchRemove.value,
      disabledTooltip: '请先选择当前用户【失败】、【超时失败】或【已中止】的任务',
      onClick: handleBatchRemove
    },
    {
      label: '批量重试',
      type: 'primary',
      plain: true,
      isShow: CS.value,
      disabled: !canBatchRetry.value,
      disabledTooltip: '请先选择当前用户【失败】或【超时失败】的任务',
      onClick: handleBatchRetry
    }
  ]);

  return {
    selectedList,
    canBatchRemove,
    canBatchStop,
    canBatchRetry,
    handleBatchRemove,
    handleBatchStop,
    handleBatchRetry,
    batchButtonList,
    handleSelectionChange
  };
};
