import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { filters } from '@/core/plugins/filter';
import { IDigitalPaintingQueryByPageResListItem } from '../../../api/types';
import {
  DIGITAL_DRAFT_TASK_CODE_STATUS_ENUM,
  DIGITAL_DRAFT_TASK_CODE_STATUS_LIST,
  DIGITAL_DRAFT_TASK_STATUS_ENUM,
  DIGITAL_DRAFT_TASK_STATUS_LIST,
  DIGITAL_DRAFT_TASK_URGENCY_ENUM,
  EDITION_TYPE_ENUM,
  EDITION_TYPE_LIST,
} from '../../../constant';
import { usePermissionConfig } from '../../../use-permission-config';

interface IHandleColumnProps {
  /**
   * 编辑
   */
  handleEdit: (row: IDigitalPaintingQueryByPageResListItem) => void;
  /**
   * 操作日志
   */
  handleLog: (row: IDigitalPaintingQueryByPageResListItem) => void;
  /**
   * 撤回
   */
  handleRecall: (row: IDigitalPaintingQueryByPageResListItem) => void;
  /**
   * 取消
   */
  handleCancel: (row: IDigitalPaintingQueryByPageResListItem) => void;
  /**
   * 审核
   */
  handleAudit: (row: IDigitalPaintingQueryByPageResListItem) => void;
  /**
   * 查看
   */
  handleView: (row: IDigitalPaintingQueryByPageResListItem) => void;
  /**
   * 编码
   */
  handleCode: (row: IDigitalPaintingQueryByPageResListItem) => void;
  /**
   * 重新描稿
   */
  handleRedraft: (row: IDigitalPaintingQueryByPageResListItem) => void;
}

export const useListTableColumns = (props: IHandleColumnProps) => {
  const { BJ, CZRZ, CH, QX, BM, CXMG, CK, SH } = usePermissionConfig();
  const {
    handleEdit,
    handleLog,
    handleRecall,
    handleCancel,
    handleAudit,
    handleView,
    handleCode,
    handleRedraft,
  } = props;

  const { columns } = useTableColumns<IDigitalPaintingQueryByPageResListItem>(() => {
    return [
      {
        type: 'selection',
        width: '50',
        fixed: 'left',
      },
      {
        label: '任务编号',
        minWidth: '150',
        render(row) {
          return (
            <div>
              {CK.value
                ? <p class='text-color-primary tw-cursor-pointer' onClick={() => handleView(row)}>{ row.taskCode }</p>
                : <p>{row.taskCode}</p>}
              <p>
                {row.redoParentCode ? (
                  <el-tooltip
                    effect='dark'
                    content={`原描稿任务为：${row.redoParentCode}`}
                    placement='top-start'
                  >
                    <el-tag type='primary'>重新描稿</el-tag>
                  </el-tooltip>
                ) : null}
                {row.allocateFailReason ? (
                  <el-tooltip
                    effect='dark'
                    content={`动销后自动下单失败，原因：${row.allocateFailReason}`}
                    placement='top-start'
                  >
                    <el-tag type='danger'>下单失败</el-tag>
                  </el-tooltip>
                ) : null}
              </p>
            </div>
          );
        }
      },
      {
        label: '款号',
        minWidth: '150',
        prop: 'designCode',
      },
      {
        label: '花型编号',
        minWidth: '150',
        render(row) {
          return (
            <div>
              <p>{ row.flowerCode }</p>
              <el-tag type={row.editionType === EDITION_TYPE_ENUM.HEAD
                ? 'danger' : 'success'}
              >
                {filters.getEnumLabel(EDITION_TYPE_LIST, row.editionType)}
              </el-tag>
            </div>
          );
        }
      },
      {
        label: '花型图',
        minWidth: '150',
        render(row) {
          return (row.flowerPictureList.length ? (
            <el-image
              src={resizeImgByWidth(row.flowerPictureList[0], 200)}
              class='tw-w-80px tw-h-80px'
              fit='cover'
              preview-src-list={row.flowerPictureList}
              preview-teleported
              lazy
            />
          ) : null);
        }
      },
      {
        label: '描稿类型',
        minWidth: '150',
        prop: 'paintingTypeName',
      },
      {
        label: '打版方式',
        minWidth: '150',
        render(row) {
          return (
            <span>{ row.makeTypeDesc }</span>
          );
        }
      },
      {
        label: '紧急程度',
        minWidth: '150',
        render(row) {
          let className = '';
          if (row.urgentType === DIGITAL_DRAFT_TASK_URGENCY_ENUM.MOVING_URGENCY) {
            className = 'text-color-red tw-font-bold';
          } else if (row.urgentType === DIGITAL_DRAFT_TASK_URGENCY_ENUM.GENERAL_URGENCY) {
            className = 'text-color-orange tw-font-bold';
          }
          return (
            <p>
              <p class={className}>{ row.urgentTypeDesc }</p>
            </p>
          );
        }
      },
      {
        label: '底布信息',
        minWidth: '200',
        render(row) {
          const { baseCloth } = row;
          const materialStr = baseCloth.material?.map(item => `${item.percent
            ? `${item.percent}%` : ''}${item.name}`).join('、');
          return (
            <div>
              <p>
                PID：
                {baseCloth?.commodityCode}
              </p>
              <p>
                品名：
                {baseCloth.commodityName}
              </p>
              <p>
                货号：
                {baseCloth.commodityNumber}
              </p>
              <p>
                克重：
                {baseCloth.weightStrFormat}
              </p>
              {materialStr ? (
                <el-tooltip
                  effect='dark'
                  content={materialStr}
                  placement='top'
                >
                  <p class='tw-truncate'>
                    成分：
                    {materialStr}
                  </p>
                </el-tooltip>
              ) : (
                <p>
                  成分：
                </p>
              )}
            </div>
          );
        }
      },
      {
        label: '面料SKU',
        minWidth: '150',
        render(row) {
          return (
            <span>{ row.fabricSku }</span>
          );
        }
      },
      {
        label: '供应商',
        minWidth: '150',
        prop: 'roomName',
      },
      {
        label: '描稿费用',
        minWidth: '150',
        prop: 'paintingFee',
      },
      {
        label: '花型描述',
        minWidth: '150',
        prop: 'flowerDesc',
        ellipsis: true,
      },
      {
        label: '设计师',
        minWidth: '150',
        prop: 'designerName',
      },
      {
        label: '创建人',
        minWidth: '150',
        prop: 'creatorName',
      },
      {
        label: '任务状态',
        minWidth: '180',
        render(row) {
          let className = '';
          switch (row.taskState) {
            case DIGITAL_DRAFT_TASK_STATUS_ENUM.WAIT_ORDER:
            case DIGITAL_DRAFT_TASK_STATUS_ENUM.WAIT_RECEIVE:
            case DIGITAL_DRAFT_TASK_STATUS_ENUM.DRAFTING:
              className = 'text-color-orange';
              break;
            case DIGITAL_DRAFT_TASK_STATUS_ENUM.SEND:
            case DIGITAL_DRAFT_TASK_STATUS_ENUM.COMPLETED:
              className = 'text-color-primary';
              break;
            case DIGITAL_DRAFT_TASK_STATUS_ENUM.REJECTED:
            case DIGITAL_DRAFT_TASK_STATUS_ENUM.CANCELLED:
              className = 'text-color-red';
              break;
            default:
              className = '';
              break;
          }
          return (
            <div>
              <p class={className}>{ filters.getEnumLabel(DIGITAL_DRAFT_TASK_STATUS_LIST, row.taskState!) }</p>
              { row.taskState === DIGITAL_DRAFT_TASK_STATUS_ENUM.CANCELLED && (
                <p class={className.concat('tw-')}>
                  取消原因：
                  {row.cancelReason}
                </p>
              )}
              {[
                DIGITAL_DRAFT_TASK_STATUS_ENUM.REJECTED,
                DIGITAL_DRAFT_TASK_STATUS_ENUM.COMPLETED,
              ].includes(row.taskState) && (
                row.auditRemark ? (
                  <el-tooltip
                    effect='dark'
                    content={row.auditRemark}
                    placement='top'
                  >
                    <p class='tw-truncate'>
                      审批意见：
                      {row.auditRemark}
                    </p>
                  </el-tooltip>
                )
                  : (
                    <p>
                      审批意见：
                    </p>
                  )
              )}
              {[
                DIGITAL_DRAFT_TASK_STATUS_ENUM.REJECTED,
                DIGITAL_DRAFT_TASK_STATUS_ENUM.COMPLETED,
              ].includes(row.taskState) && row.auditPictureList?.length
                ? (
                  <el-image
                    src={resizeImgByWidth(row.auditPictureList[0], 200)}
                    class='tw-w-80px tw-h-80px'
                    fit='cover'
                    preview-src-list={row.auditPictureList}
                    preview-teleported
                    lazy
                  />
                ) : null}
            </div>
          );
        }
      },
      {
        label: '编码状态',
        minWidth: '100',
        render(row) {
          let className = '';
          switch (row.fabricSkuState) {
            case DIGITAL_DRAFT_TASK_CODE_STATUS_ENUM.WAIT_CODE:
              className = 'text-color-orange';
              break;
            case DIGITAL_DRAFT_TASK_CODE_STATUS_ENUM.ALREADY_CODE:
              className = 'text-color-primary';
              break;
            default:
              className = '';
              break;
          }
          return (
            <span class={className}>
              { filters.getEnumLabel(DIGITAL_DRAFT_TASK_CODE_STATUS_LIST, row.fabricSkuState!) }
            </span>
          );
        }
      },
      {
        label: '时间',
        minWidth: 220,
        render(row) {
          return (
            <div>
              {row.createdTime && (
                <p>
                  创建时间：
                  { filters.formatTime(row.createdTime) }
                </p>
              )}
              {row.receivingTime && (
                <p>
                  接单时间：
                  { filters.formatTime(row.receivingTime) }
                </p>
              )}
              {row.sendTime && (
                <p>
                  寄出时间：
                  { filters.formatTime(row.sendTime) }
                </p>
              )}
              {row.rejectTime && (
                <p>
                  驳回时间：
                  { filters.formatTime(row.rejectTime) }
                </p>
              )}
              {row.finishTime && (
                <p>
                  完成时间：
                  { filters.formatTime(row.finishTime) }
                </p>
              )}
              {row.cancelTime && (
                <p>
                  取消时间：
                  { filters.formatTime(row.cancelTime) }
                </p>
              )}
            </div>
          );
        }
      },
      {
        label: '操作',
        minWidth: '100',
        fixed: 'right',
        render(row) {
          return (
            <div class='table-operation-area'>
              {
                BJ && row.taskState === DIGITAL_DRAFT_TASK_STATUS_ENUM.WAIT_ORDER && (
                  <el-button type='primary' text onClick={() => handleEdit(row)}>
                    编辑
                  </el-button>
                )
              }
              {
                CH && row.taskState === DIGITAL_DRAFT_TASK_STATUS_ENUM.WAIT_RECEIVE && (
                  <el-button type='primary' text onClick={() => handleRecall(row)}>
                    撤回
                  </el-button>
                )
              }
              {
                QX
                && [DIGITAL_DRAFT_TASK_STATUS_ENUM.WAIT_ORDER, DIGITAL_DRAFT_TASK_STATUS_ENUM.WAIT_RECEIVE,
                  DIGITAL_DRAFT_TASK_STATUS_ENUM.DRAFTING].includes(row.taskState) && (
                  <el-button type='primary' text onClick={() => handleCancel(row)}>
                    取消
                  </el-button>
                )
              }
              {
                SH && row.taskState === DIGITAL_DRAFT_TASK_STATUS_ENUM.SEND && (
                  <el-button type='primary' text onClick={() => handleAudit(row)}>
                    审核
                  </el-button>
                )
              }
              {
                BM && row.taskState === DIGITAL_DRAFT_TASK_STATUS_ENUM.COMPLETED && (
                  <el-button type='primary' text onClick={() => handleCode(row)}>
                    编码
                  </el-button>
                )
              }
              {
                CXMG && row.taskState === DIGITAL_DRAFT_TASK_STATUS_ENUM.COMPLETED && (
                  <el-button type='primary' text onClick={() => handleRedraft(row)}>
                    重新描稿
                  </el-button>
                )
              }
              {
                CZRZ && (
                  <el-button type='primary' text onClick={() => handleLog(row)}>
                    操作日志
                  </el-button>
                )
              }
            </div>
          );
        }
      },
    ];
  });
  return {
    columns,
  };
};
