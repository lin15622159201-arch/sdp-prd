import { useTableColumns } from '@toy/business-components';
import { filters } from '@/core/plugins/filter';
import { ALL_BILLTYPE_LIST } from '@/modules/finance-manage/constant';
import { IWebFinanceTotalBillResPlatformBillMapKeyItem } from '../../../../api/types';

// 平台账单表格

interface IPrams {
  platform: string;
}
export const usePlatformColumns = ({ platform }: IPrams) => {
  const { columns } = useTableColumns<IWebFinanceTotalBillResPlatformBillMapKeyItem>(() => {
    return [
      {
        minWidth: '120',
        align: 'center',
        renderHeader() {
          return `平台：${platform || '-'}`;
        },
        children: [
          {
            label: '账单类型',
            minWidth: '120',
            render(row) {
              return `${filters.getEnumLabel(ALL_BILLTYPE_LIST, row.billType!)}`;
            }
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
            minWidth: '120',
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
        ]
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
