import { useTableColumns } from '@toy/business-components';
import { filters } from '@/core/plugins/filter';
import { BILLTYPE_LIST } from '@/modules/finance-manage/constant';
import { IWebFinanceTotalBillResBillTypeStatisticsVosItem } from '../../../../api/types';

// 对账单
export const useListColumns = () => {
  const { columns } = useTableColumns<IWebFinanceTotalBillResBillTypeStatisticsVosItem>(() => {
    return [
      {
        label: '类型',
        minWidth: '120',
        render(row) {
          return row.isSum ? '合计' : `${filters.getEnumLabel(BILLTYPE_LIST, row.billType!)}`;
        }
      },
      {
        label: '单量',
        minWidth: '120',
        prop: 'orderCount',
      },
      {
        label: '结算金额（含税）',
        minWidth: '120',
        prop: 'inclusiveTaxAmount',
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
