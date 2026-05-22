import { useTableColumns } from '@toy/business-components';
// import { resizeImgByWidth } from '@/core/utils/helper';
import {
  ISampleClothesInfoDetailResAuditCraftOrderDetailVoSewRequireItem
} from '../../../api/types';

export const useDesignTableColumns = () => {
  const { columns } = useTableColumns<ISampleClothesInfoDetailResAuditCraftOrderDetailVoSewRequireItem>(() => {
    return [
      {
        label: '部件名称',
        minWidth: '150',
        align: 'center',
        prop: 'componentName',
      },
      {
        label: '版型结构分解',
        align: 'center',
        minWidth: '120',
        prop: 'structuralDesc',
      },
      {
        label: '车缝要求',
        align: 'center',
        minWidth: '120',
        prop: 'sewingRequires',
      },
    ];
  });
  return {
    designTableColumns: columns
  };
};
