import { useTableColumns } from '@toy/business-components';
import { Ref } from 'vue';
import {
  ISampleClothesInfoDetailResAuditCraftOrderDetailVoReferSize,
  ISampleClothesInfoDetailResAuditCraftOrderDetailVoReferSizeSizeTableItem
} from '../../../api/types';

interface IProps {
  referSize: Ref<ISampleClothesInfoDetailResAuditCraftOrderDetailVoReferSize>;
}
export const useSizeTableColumns = ({ referSize }: IProps) => {
  const { columns } = useTableColumns<ISampleClothesInfoDetailResAuditCraftOrderDetailVoReferSizeSizeTableItem>(() => {
    return [
      {
        label: '部位',
        minWidth: '150',
        align: 'center',
        prop: 'positionName',
      },
      {
        label: '尺寸维度',
        align: 'center',
        minWidth: '140',
        prop: 'dimension',
      },
      {
        label: '量法',
        align: 'center',
        minWidth: '140',
        prop: 'measuringMethod',
      },
      {
        align: 'center',
        minWidth: '90',
        renderHeader: () => {
          return (
            <div>
              纸样尺寸 /
              {' '}
              {referSize.value?.patternSize}
            </div>
          );
        },
        render: (row) => {
          return (
            <>{row.patternSize || '-'}</>
          );
        }
      },
      {
        label: '允差范围',
        align: 'center',
        minWidth: '90',
        render: (row) => {
          return (
            <>
              <span class='tw-mr[4px]'>±</span>
              {row.tolerance}
            </>
          );
        },
      },
      {
        label: '备注',
        align: 'center',
        minWidth: '90',
        prop: 'remark',
      },
    ];
  });
  return {
    sizeTableColumns: columns
  };
};
