import { useDialog } from '@toy/business-components';
import { selectionDetail } from '../api';
import { ref } from 'vue';
import { ISelectionDetailRes } from '../api/type';
import { useDetailsColumns } from './use-details-table-columns';
import { useRouter } from 'vue-router';

export type HandleOpenDialog = (styleSelectionId:string) => void;

export function useSelectionDetailsDialog() {
  const $router = useRouter();

  const details = ref<ISelectionDetailRes>({});

  const { tableColumns } = useDetailsColumns();

  const handleOpenNewTab = (styleCode:string) => {
    const url = $router.resolve({
      name: 'DesignCenterInStockSpuDetail',
      params: {
        styleCode,
      }
    });
    window.open(url.href, '_blank');
  };

  const { openDialog, closeDialog } = useDialog(() => ({
    width: 800,
    title: `选款编号：${details.value.styleSelectionCode}`,
    showConfirmBtn: false,
    showCancelBtn: false,
    draggable: false,
    render() {
      return (
        <div>
          <div class='tw-flex'>
            <el-descriptions title='图片' column={2}>
              <el-descriptions-item
                rowspan={2}
                align='center'
              >
                <el-image
                  src={details.value.imageUrl}
                  class='tw-w-160px tw-h-160px tw-rounded-4px'
                  fit='cover'
                  preview-src-list={[details.value.imageUrl]}
                  preview-teleported
                />
              </el-descriptions-item>
            </el-descriptions>
            <div class='tw-flex tw-flex-col tw-flex-1 tw-ml-5'>
              <el-descriptions title='款式信息' column={2}>
                <el-descriptions-item width='290px' label='关联款式：'>
                  <el-button
                    type='primary'
                    link
                    disabled={!details.value.spuCode}
                    onClick={() => handleOpenNewTab(details.value.spuCode as unknown as string)}
                  >
                    {details.value.spuCode}
                  </el-button>
                </el-descriptions-item>
                <el-descriptions-item width='290px' label='供应商款号：'>
                  {details.value.supplierStyleCode}
                </el-descriptions-item>
                <el-descriptions-item label='品类：'>{details.value.categoryName}</el-descriptions-item>
                <el-descriptions-item label='颜色：'>{details.value.color}</el-descriptions-item>
                <el-descriptions-item label='现货类型：'>{details.value.spotTypeName}</el-descriptions-item>
                <el-descriptions-item label='尺码：'>{details.value.size}</el-descriptions-item>
              </el-descriptions>
              <el-descriptions class='tw-mt-4' title='供应商信息' column={2}>
                <el-descriptions-item width='290px' label='供应商：'>
                  {details.value.supplierName}
                </el-descriptions-item>
                <el-descriptions-item width='290px' label='招商名称：'>
                  {details.value.investmentPromotionName}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
          <el-descriptions title='选款记录' />
          <sc-table
            height='400px'
            key='type'
            data={details.value.optLog}
            columns={tableColumns.value}
          />
        </div>
      );
    }
  }));

  const handleOpenDialog: HandleOpenDialog = async (styleSelectionId:string) => {
    openDialog();
    details.value.styleSelectionId = styleSelectionId;
    const { data } = await selectionDetail(styleSelectionId);
    details.value = data;
  };
  return {
    handleOpenDialog,
  };
}
