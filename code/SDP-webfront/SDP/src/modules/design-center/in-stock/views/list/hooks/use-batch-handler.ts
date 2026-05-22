import { computed, shallowRef } from 'vue';
import { IListItem, IParams, ISpotStyleSkcNew } from '../types';
import { fetchSpotStyleBatchOnShelves } from '../../../api';
import { ElMessage } from 'element-plus';
import { exportByBlob } from '@/core/utils/file-download';
import { packFilesToZip } from '@/core/utils/download';
import { YES_NO_STRING_ENUM } from '@/constant';

export const useBatchHandler = (onSuccess?: () => void) => {
  const selection = shallowRef<IListItem[]>([]);
  const isNotSelected = computed(() => selection.value.length === 0);

  /**
 * @description 是否可以下载图片
 * 1、勾选的只有SKC的时候，【下载图片】按钮置灰；
 * 2、勾选的存在SPU和SKC时，只下载SPU的图片，SKC过滤不处理；
 */
  const hasSpuSelected = computed(() => {
    if (selection.value.length === 0) return false;
    return selection.value.some(v => !v.isChild);
  });

  const canCancel = computed(() => selection.value.some(v => v.cancelled === YES_NO_STRING_ENUM.NO));

  const handleSelectionChange = (checked: IListItem[]) => {
    console.log('checked', checked);
    selection.value = checked || [];
  };

  /**
   * 批量导出
   */
  const handleBatchExport = async (data: IParams) => {
    if (selection.value.length) {
      const skcs = selection.value.filter(item => item.isChild);
      data.skcCode = skcs.map(item => item.skcCode).join(',');
    }
    await exportByBlob({
      url: '/sdp-curation/web/v1/spot-style/export-excel',
      method: 'post',
      loading: true,
      data
    });
  };

  /**
  * 推送上架
  */
  const handleBatchPush = async () => {
    const isSkcsValid = (skcs?: ISpotStyleSkcNew[]) => {
      // 至少有一个SKC资料状态为已完善 + 未取消 + 待推送
      return skcs?.some(item => item.dataCompleted === YES_NO_STRING_ENUM.YES && item.upcoming === YES_NO_STRING_ENUM.NO && item.cancelled === YES_NO_STRING_ENUM.NO);
    };
    // SPU 资料已完善 + 存在可推送的SKC
    const validSelection = selection.value.filter(v => !v.isChild && v.dataCompleted === YES_NO_STRING_ENUM.YES && isSkcsValid(v.skcs));
    if (validSelection.length === 0) {
      ElMessage.warning('请选择资料完善的SPU，且存在待推送、资料完善且未取消的SKC');
      return;
    }
    await fetchSpotStyleBatchOnShelves(validSelection.map(v => v.taskId));
    ElMessage.success('批量上架成功');
    onSuccess && onSuccess();
  };

  const handleDownloadImage = async (data: IListItem[]) => {
    // 过滤掉skc的数据
    const spuList = data.filter(v => !v.isChild && (v.productImages?.length || v.mainImgUrl));
    if (!spuList.length) {
      ElMessage.success('所选款式中没有可下载的图片');
      return;
    }
    packFilesToZip(spuList.map((item) => {
      return {
        children: item.productImages?.map((v, index) => {
          return {
            url: v.imageUrl,
            name: String(index),
          };
        }) || [item.mainImgUrl],
        url: '',
        name: item.taskCode,
      };
    }), '现货管理-款式商品图');
  };

  return {
    selection,
    isNotSelected,
    canCancel,
    handleSelectionChange,
    handleDownloadImage,
    handleBatchExport,
    handleBatchPush,
    hasSpuSelected
  };
};
