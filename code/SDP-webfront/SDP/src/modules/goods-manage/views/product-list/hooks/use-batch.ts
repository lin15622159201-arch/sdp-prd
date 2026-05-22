import { IProductPageResItem } from '@/modules/goods-manage/api/product/type';
import { computed, readonly, ref } from 'vue';
import { PRODUCT_TAG_ENUM } from '../constant';
import { fetchProductBatchTestPrice } from '@/modules/goods-manage/api/product';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { ElMessage } from 'element-plus';
import { copyText } from '@/core/utils/helper';

interface IProps {
  onBatchSuccess?: () => void;
}
export const useBatch = ({ onBatchSuccess }: IProps = {}) => {
  const selectedRows = ref<IProductPageResItem[]>([]);
  const hasSelected = computed(() => selectedRows.value.length > 0);
  const testPriceDisabledTips = '请选择【未测价通过】的数据';
  const canTestPrice = computed(() => {
    return (
      hasSelected.value && selectedRows.value.every(row => !row.labels?.includes(PRODUCT_TAG_ENUM.PRICE_TEST_PASSED))
    );
  });

  const handleBatchTestPrice = async () => {
    await fetchProductBatchTestPrice(
      selectedRows.value.map(row => ({
        productId: row.productId,
        pass: YES_NO_NUMBER_ENUM.YES,
      })),
    );
    onBatchSuccess?.();
  };

  const handleSelectionChange = (rows: IProductPageResItem[]) => {
    selectedRows.value = rows;
  };

  /**
   * 批量复制SPU编码
   */
  const handleBatchCopySPU = async () => {
    if (!hasSelected.value) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    const codes = selectedRows.value.map(row => row.styleCode);
    await copyText(codes.join(' '));
    ElMessage.success('复制成功');
  };

  /**
   * 批量复制SKC编码
   */
  const handleBatchCopySKC = async () => {
    if (!hasSelected.value) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    const codes: string[] = [];
    selectedRows.value.forEach((row) => {
      row.skcs.forEach((skc) => {
        skc.skcCode && codes.push(skc.skcCode);
      });
    });
    if (!codes.length) {
      ElMessage.warning('没有可复制的SKC编码');
      return;
    }
    await copyText(codes.join(' '));
    ElMessage.success('复制成功');
  };

  /**
   * 批量复制SKU编码
   */
  const handleBatchCopySKU = async () => {
    if (!hasSelected.value) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    const codes: string[] = [];
    selectedRows.value.forEach((row) => {
      row.skcs.forEach((skc) => {
        skc.skus.forEach((sku) => {
          sku.skuCode && codes.push(sku.skuCode);
        });
      });
    });
    if (!codes.length) {
      ElMessage.warning('没有可复制的SKU编码');
      return;
    }
    await copyText(codes.join(' '));
    ElMessage.success('复制成功');
  };

  /**
   * 批量复制平台SPU编码
   */
  const handleBatchCopyPlatSPU = async () => {
    if (!hasSelected.value) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    const codes = selectedRows.value.map(row => row.platformProductId).filter(Boolean);
    if (!codes.length) {
      ElMessage.warning('没有可复制的平台SPU编码');
      return;
    }
    await copyText(codes.join(' '));
    ElMessage.success('复制成功');
  };

  /**
   * 批量复制平台SKC编码
   */
  const handleBatchCopyPlatSKC = async () => {
    if (!hasSelected.value) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    const codes: string[] = [];
    selectedRows.value.forEach((row) => {
      row.skcs.forEach((skc) => {
        skc.platformSkcId && codes.push(skc.platformSkcId.toString());
      });
    });
    if (!codes.length) {
      ElMessage.warning('没有可复制的平台SKC编码');
      return;
    }
    await copyText(codes.join(' '));
    ElMessage.success('复制成功');
  };

  /**
   * 批量复制平台SKU编码
   */
  const handleBatchCopyPlatSKU = async () => {
    if (!hasSelected.value) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    const codes: string[] = [];
    selectedRows.value.forEach((row) => {
      row.skcs.forEach((skc) => {
        skc.skus.forEach((sku) => {
          sku.platformSkuId && codes.push(sku.platformSkuId.toString());
        });
      });
    });
    if (!codes.length) {
      ElMessage.warning('没有可复制的平台SKU编码');
      return;
    }
    await copyText(codes.join(' '));
    ElMessage.success('复制成功');
  };

  return {
    selectedRows: readonly(selectedRows),
    hasSelected,
    canTestPrice,
    testPriceDisabledTips,
    handleSelectionChange,
    handleBatchTestPrice,
    handleBatchCopySPU,
    handleBatchCopySKC,
    handleBatchCopySKU,
    handleBatchCopyPlatSPU,
    handleBatchCopyPlatSKC,
    handleBatchCopyPlatSKU,
  };
};
