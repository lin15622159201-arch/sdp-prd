import { useTableColumns } from '@toy/business-components';
import { IFinanceBillBillDetailByBillIdResStatisticsVosItem } from '../../../../api/types';

export const useListColumns = () => {
  const { columns } = useTableColumns<IFinanceBillBillDetailByBillIdResStatisticsVosItem>(() => {
    return [
      {
        label: '平台',
        minWidth: '120',
        prop: 'platform',
      },
      {
        label: '任务数',
        minWidth: '120',
        prop: 'orderCount',
      },
      {
        label: '采购结算金额',
        minWidth: '120',
        prop: 'reconciledAmount',
      },
      {
        label: '差异金额',
        minWidth: '120',
        prop: 'diffAmount',
      },
      {
        label: '补贴费用',
        minWidth: '140',
        prop: 'allowanceAmount',
      },
      {
        label: '税点',
        minWidth: '120',
        render(row) {
          return `${row.taxRate ? `${row.taxRate} %` : '-'}`;
        }
      },
      {
        label: '账单金额（不含税）',
        minWidth: '120',
        prop: 'excludingTaxAmount',
      },
      {
        label: '账单金额（含税）',
        minWidth: '120',
        prop: 'inclusiveTaxAmount',
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
