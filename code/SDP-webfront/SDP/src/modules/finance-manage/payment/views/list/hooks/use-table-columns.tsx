import { useTableColumns } from '@toy/business-components';
import { filters } from '@/core/plugins/filter';
import { usePermissionConfig } from '../../../use-permission-config';
import { IPaymentOrderPageResListItem } from '../../../api/types';
import { STATUS_LIST, STATUS_ENUM } from '../../../constant';

interface IParams {
  handleToPayment: (row: IPaymentOrderPageResListItem, behavior: string) => void;
}

export const useListColumns = ({ handleToPayment }: IParams) => {
  const { FK, XQ } = usePermissionConfig();
  const { columns } = useTableColumns<IPaymentOrderPageResListItem>(() => {
    return [
      {
        label: '付款单号',
        minWidth: '120',
        prop: 'paymentOrderCode',
      },
      {
        label: '对账单',
        minWidth: '120',
        prop: 'totalBillCode',
      },
      {
        label: '账单类型',
        minWidth: '120',
        prop: 'billType',
      },
      {
        label: '供应商',
        minWidth: '120',
        prop: 'supplier',
      },
      {
        label: '对账单应付',
        minWidth: '120',
        prop: 'payableAmount',
      },
      {
        label: '实付金额',
        minWidth: '120',
        prop: 'paidAmount',
      },
      {
        label: '申请人',
        minWidth: '120',
        prop: 'applicant',
      },
      {
        label: '付款人',
        minWidth: '120',
        prop: 'payer',
      },
      {
        label: '付款状态',
        minWidth: '120',
        prop: 'paymentStatus',
        type: 'enum',
        options: STATUS_LIST,
      },
      {
        label: '时间',
        minWidth: '150',
        render(row) {
          return (
            <>
              <p>
                创建时间：
                {filters.formatTime(row.createdTime)}
              </p>
              <p>
                付款时间：
                {filters.formatTime(row.paymentTime)}
              </p>
            </>
          );
        }
      },
      {
        label: '操作记录',
        width: '140',
        fixed: 'right',
        render(row) {
          return (
            <div>
              {/* 待付款才显示 */}
              { FK.value && row.paymentStatus === STATUS_ENUM.WAIT && (
                <el-button type='primary' onClick={() => handleToPayment(row, 'modify')}>
                  付款
                </el-button>
              )}
              { XQ.value && (
                <el-button type='primary' onClick={() => handleToPayment(row, 'view')}>
                  查看
                </el-button>
              )}
            </div>
          );
        }
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
