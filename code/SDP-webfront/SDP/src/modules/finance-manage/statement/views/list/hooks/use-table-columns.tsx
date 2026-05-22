import { useTableColumns } from '@toy/business-components';
import { filters } from '@/core/plugins/filter';
import { usePermissionConfig } from '../../../use-permission-config';
import { Warning } from '@element-plus/icons-vue';
import { IFinanceTotalBillPageResListItem } from '../../../api/types';
import { financeTotalBillVerifyBill } from '../../../api';
import {
  PAYMENT_STATUS_LIST,
  RECONCILED_STATUS_LIST,
  TOTALBILL_STATUS_LIST,
  BILLTYPE_LIST,
  TOTALBILL_STATUS_ENUM
} from '@/modules/finance-manage/constant';
import { ElMessageBox, ElMessage } from 'element-plus';
import { YES_NO_NUMBER_ENUM } from '@/constant';

interface IParams {
  handleToConfirm: (row: IFinanceTotalBillPageResListItem, behavior: string) => void;
  handleOperateLog: (bizId: string) => void;
  handleToCheck: (row: IFinanceTotalBillPageResListItem, behavior: string) => void;
  handleVerifySuccess: (id: string) => void;
}

export const useListColumns = ({ handleToConfirm, handleOperateLog, handleToCheck, handleVerifySuccess }: IParams) => {
  const { QRDZ, XQ, HSMX, CKMX } = usePermissionConfig();
  const handleVerifyBill = async (row: IFinanceTotalBillPageResListItem, behavior: string) => {
    await ElMessageBox.confirm('是否驳回账单？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await financeTotalBillVerifyBill({
      totalBillId: row.totalBillId!,
    });
    ElMessage.success('操作成功');
    handleVerifySuccess(row.totalBillId!);
  };
  const { columns } = useTableColumns<IFinanceTotalBillPageResListItem>(() => {
    return [
      {
        type: 'selection',
        width: '50',
        selectable: row => row.hasChildren,
      },
      {
        label: '账单号',
        minWidth: '170',
        prop: 'billCode',
      },
      {
        label: '账单周期',
        minWidth: '120',
        render(row) {
          return (`${row.year}年 ${row.month}月`);
        }
      },
      {
        label: '账单类型',
        minWidth: '120',
        render(row) {
          return (
            <>
              {row.hasChildren ? '总账单' : filters.getEnumLabel(BILLTYPE_LIST, row.billType!)}
            </>
          );
        }
      },
      {
        label: '对账金额',
        minWidth: '120',
        prop: 'reconciledAmount',
      },
      {
        label: '补贴费用',
        minWidth: '120',
        render(row) {
          return (
            <>
              {row.allowanceAmount}
              {row.hasChildren && (
                <el-tooltip
                  placement='top'
                  v-slots={{
                    default: () => (
                      <el-icon color='red' class='tw-font-size-14px tw-ml-2px'>
                        <Warning />
                      </el-icon>
                    ),
                    content: () => (
                      <div>
                        <div>
                          总补贴费用为
                          {row.allowanceAmount}
                          ，
                        </div>
                        <div>
                          {row?.billSubsidyList?.map(it => (
                            <span>
                              {it.subsidyName}
                              :
                              {' '}
                              {it.subsidyAmount}
                              ；
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  }}
                />
              )}
            </>
          );
        }
      },
      {
        label: '税点',
        minWidth: '120',
        render(row) {
          return `${row.taxRate ? `${row.taxRate} %` : '-'}`;
        }
      },
      {
        label: '（不含税）结算金额',
        minWidth: '130',
        prop: 'excludingTaxAmount',
      },
      {
        label: '（含税）结算金额',
        minWidth: '120',
        prop: 'inclusiveTaxAmount',
      },
      {
        label: '相关人员',
        minWidth: '120',
        render(row) {
          return (
            <>
              <p>
                创建人：
                {row.creatorName || '-'}
              </p>
              <p>
                核实人：
                {row.verifierName || '-'}
              </p>
            </>
          );
        }
      },
      {
        label: '核实状态',
        minWidth: '120',
        prop: 'billStatus',
        type: 'enum',
        options: TOTALBILL_STATUS_LIST,
      },
      {
        label: '对账状态',
        minWidth: '120',
        prop: 'reconciledStatus',
        type: 'enum',
        options: RECONCILED_STATUS_LIST,
      },
      {
        label: '付款状态',
        minWidth: '120',
        prop: 'paymentStatus',
        type: 'enum',
        options: PAYMENT_STATUS_LIST,
      },
      {
        label: '付款单号',
        minWidth: '120',
        prop: 'paymentOrderCode',
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
                核实时间：
                {filters.formatTime(row.verifierTime)}
              </p>
            </>
          );
        }
      },
      {
        label: '操作记录',
        width: '120',
        fixed: 'right',
        render(row) {
          return (
            <div>
              {/* 总账单相关按钮 */}
              { row.hasChildren && (
                <>
                  <el-button
                    type='primary'
                    text
                    onClick={() => handleOperateLog(row.totalBillId!)}
                  >
                    操作日志
                  </el-button>
                  {/* 待对账 && 核实异常 */}
                  { QRDZ.value
                    && row.reconciledStatus === YES_NO_NUMBER_ENUM.NO
                    && row.billStatus === TOTALBILL_STATUS_ENUM.ABNORMAL
                    && (
                      <div class='tw-mb-8px'>
                        <el-button type='primary' onClick={() => handleVerifyBill(row, 'modify')}>
                          驳回账单
                        </el-button>
                      </div>
                    )}
                  {/* 待对账 && 已核实 */}
                  { QRDZ.value
                    && row.reconciledStatus === YES_NO_NUMBER_ENUM.NO
                    && row.billStatus === TOTALBILL_STATUS_ENUM.VERIFIED
                    && (
                      <div class='tw-mb-8px'>
                        <el-button type='primary' onClick={() => handleToConfirm(row, 'modify')}>
                          确认对账
                        </el-button>
                      </div>
                    )}
                  { XQ.value && (
                    <div class='tw-mb-8px'>
                      <el-button type='primary' onClick={() => handleToConfirm(row, 'view')}>
                        查看账单
                      </el-button>
                    </div>
                  )}
                </>
              )}
              {/* 子账单相关按钮 */}
              {
                !row.hasChildren && (
                  <>
                    { HSMX.value && row.billStatus === TOTALBILL_STATUS_ENUM.PENDING_VERIFICATION && (
                      <div class='tw-mb-8px'>
                        <el-button type='primary' onClick={() => handleToCheck(row, 'modify')}>
                          核实明细
                        </el-button>
                      </div>
                    )}
                    { CKMX.value && row.billStatus !== TOTALBILL_STATUS_ENUM.PENDING_VERIFICATION && (
                      <div class='tw-mb-8px'>
                        <el-button type='primary' onClick={() => handleToCheck(row, 'view')}>
                          查看明细
                        </el-button>
                      </div>
                    )}
                  </>
                )
              }
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
