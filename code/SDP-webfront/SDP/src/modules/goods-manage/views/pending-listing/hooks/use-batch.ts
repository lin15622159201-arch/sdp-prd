import { fetchProductBatchPublish, fetchPushShopReview, checkBeforeBatchPublish } from '@/modules/goods-manage/api/listing';
import type { IStyleOnShelvesPageItem } from '@/modules/goods-manage/api/listing/type';
import { RELEASE_STATUS_ENUM, REVIEW_STATUS_ENUM, SHOP_REVIEW_STATUS_ENUM } from '@/modules/goods-manage/constant';
import { copyText } from '@/core/utils/helper';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, readonly, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useReminderDialog } from './use-reminder';

interface IProps {
  onBatchSuccess?: () => void;
}
export const useBatch = ({ onBatchSuccess }: IProps = {}) => {
  const router = useRouter();
  const selectedRows = ref<IStyleOnShelvesPageItem[]>([]);
  const hasSelected = computed(() => selectedRows.value.length > 0);
  const releaseDisabledTips = '请选择审核状态为【已通过】且【店主已审核】，发布状态为【待发布】或【发布失败】的款式';
  // 是否可以发布商品
  const canRelease = computed(() => {
    return hasSelected.value && selectedRows.value.every((row) => {
      if (row.reviewStatus !== REVIEW_STATUS_ENUM.APPROVED) {
        // 审核状态不为【已通过】的款式不可发布
        return false;
      }
      if (row.shopReviewStatus !== SHOP_REVIEW_STATUS_ENUM.PASS) {
        // 店铺审核状态不为【已通过】的款式不可发布
        return false;
      }
      // 发布状态为【待发布】或【发布失败】的款式才可发布
      return [RELEASE_STATUS_ENUM.PENDING, RELEASE_STATUS_ENUM.RELEASE_FAILED].includes(row.releaseStatus);
    });
  });

  const pushShopReviewDisabledTips = '请选择审核状态有【店主已驳回】的款式';
  // 是否可以推送店主审核
  const canPushShopReview = computed(() => {
    // 只有【店主已驳回】状态可推送
    return hasSelected.value && selectedRows.value.every(row => row.shopReviewStatus === SHOP_REVIEW_STATUS_ENUM.REJECTED);
  });
  const { handleOpenDialog } = useReminderDialog();
  const handleBatchMarkListed = async () => {
    const { data } = await checkBeforeBatchPublish(selectedRows.value?.map(v => v.styleId));
    handleOpenDialog(data.productSkcList, onBatchSuccess);
    // await ElMessageBox.confirm(
    //   `确定要发布选中的 ${selectedRows.value.length} 个商品吗?`,
    //   '提示',
    //   {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   }
    // );
    // await fetchProductBatchPublish(selectedRows.value.map(row => row.styleId));
    // onBatchSuccess?.();
  };

  const handleBatchPushShopReview = async () => {
    await ElMessageBox.confirm(
      `确定将选中的 ${selectedRows.value.length} 个商品推送店主审核吗?`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    await fetchPushShopReview({ styleIds: selectedRows.value.map(row => row.styleId) });
    onBatchSuccess?.();
  };

  const handleBatchAudit = () => {
    // 待审核的款式才能批量审核
    const canBatchAudit = hasSelected.value && selectedRows.value.every(row => row.reviewStatus === REVIEW_STATUS_ENUM.PENDING);
    if (!canBatchAudit) {
      ElMessage.warning('请选择审核状态为【待审核】的款式');
      return;
    }
    const spuCodes = selectedRows.value.map(row => row.styleCode);
    router.push({
      name: 'GoodsManageApproveListing',
      params: { styleId: selectedRows.value[0].styleId },
      query: { spuCodes: spuCodes.join(',') }
    });
  };

  /**
   * 批量复制SPU编码
   */
  const handleBatchCopySPU = async () => {
    if (!hasSelected.value) {
      ElMessage.warning('请至少选择一个款式');
      return;
    }
    const spuCodes = selectedRows.value.map(row => row.styleCode);
    await copyText(spuCodes.join(' '));
    ElMessage.success('复制成功');
  };

  /**
   * 批量复制SKC编码
   */
  const handleBatchCopySKC = async () => {
    if (!hasSelected.value) {
      ElMessage.warning('请至少选择一个款式');
      return;
    }
    const skcCodes: string[] = [];
    selectedRows.value.forEach((row) => {
      row.skcList.forEach((skc) => {
        skcCodes.push(skc.skcCode);
      });
    });
    await copyText(skcCodes.join(' '));
    ElMessage.success('复制成功');
  };

  const handleSelectionChange = (rows: IStyleOnShelvesPageItem[]) => {
    selectedRows.value = rows;
  };

  return {
    selectedRows: readonly(selectedRows),
    hasSelected,
    canRelease,
    releaseDisabledTips,
    pushShopReviewDisabledTips,
    canPushShopReview,
    handleSelectionChange,
    handleBatchMarkListed,
    handleBatchPushShopReview,
    handleBatchAudit,
    handleBatchCopySPU,
    handleBatchCopySKC,
  };
};
