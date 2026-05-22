import { computed, readonly, ref } from 'vue';
import { fetchShopBatchEnable } from '../../../api';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { IShopPageResItem } from '../../../api/type';
import { ElMessageBox } from 'element-plus';

interface IProps {
  onBatchSuccess?: () => void;
}
export const useBatch = ({ onBatchSuccess }: IProps = {}) => {
  const selectedRows = ref<IShopPageResItem[]>([]);
  const hasSelected = computed(() => selectedRows.value.length > 0);
  const canBatchEnable = computed(() => {
    return hasSelected.value && selectedRows.value.some(row => row.enable === YES_NO_NUMBER_ENUM.NO);
  });
  const canBatchDisable = computed(() => {
    return hasSelected.value && selectedRows.value.some(row => row.enable === YES_NO_NUMBER_ENUM.YES);
  });

  const handleBatchEnable = async (isEnable: boolean) => {
    const enable = isEnable ? YES_NO_NUMBER_ENUM.YES : YES_NO_NUMBER_ENUM.NO;
    const rowsToProcess = selectedRows.value.filter(row => row.enable !== enable);
    if (rowsToProcess.length === 0) {
      return;
    }
    try {
      if (!isEnable) {
        await ElMessageBox.confirm(
          '确定要批量停用吗?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        );
      }
      await fetchShopBatchEnable(rowsToProcess.map(row => ({ shopId: row.shopId!, enable })));
      onBatchSuccess?.();
    } catch (error) {
      // 用户取消操作
    }
  };

  const handleSelectionChange = (rows: IShopPageResItem[]) => {
    selectedRows.value = rows;
  };

  return {
    selectedRows: readonly(selectedRows),
    hasSelected,
    canBatchEnable,
    canBatchDisable,
    handleSelectionChange,
    handleBatchEnable,
  };
};
