import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { filters } from '@/core/plugins/filter';
import { IDimensionGleanQueryByPageResListItem } from '../../../api/types';
import {
  THREE_D_COLLECTION_TASK_STATUS_ENUM, THREE_D_COLLECTION_TASK_STATUS_LIST,
  THREE_D_PURCHASE_STATUS_ENUM,
  THREE_D_PURCHASE_STATUS_LIST,
} from '../../../constant';

export const useListTableColumns = () => {
  const { columns } = useTableColumns<IDimensionGleanQueryByPageResListItem>(() => {
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
            <span>{ row.gleanCode }</span>
          );
        }
      },
      {
        label: 'SKC',
        minWidth: '180',
        render(row) {
          const imgs = row.designPictureList || [];
          return (
            <div class='tw-flex tw-flex-items-center'>
              {imgs.length ? (
                <el-image
                  src={resizeImgByWidth(imgs[0], 200)}
                  class='tw-w-80px tw-h-80px'
                  fit='cover'
                  preview-src-list={imgs}
                  preview-teleported
                  lazy
                />
              ) : null}
              <span class='tw-ml-10px'>{ row.customerStyleCode }</span>
            </div>
          );
        }
      },
      {
        label: '物料信息',
        minWidth: '180',
        render(row) {
          return (
            <div>
              <p>
                PID：
                {row.commodityCode}
              </p>
              <p>
                SKU：
                {row.skuCode}
              </p>
              <p>
                色号：
                {row.colorCode}
              </p>
            </div>
          );
        }
      },
      {
        label: '设计师',
        minWidth: '150',
        render(row) {
          return (
            <span>{ row.designerName }</span>
          );
        }
      },
      {
        label: '3D领取人',
        minWidth: '150',
        render(row) {
          return (
            <span>{ row.taskTaker }</span>
          );
        }
      },
      {
        label: '3D任务状态',
        minWidth: '150',
        render(row) {
          let className = '';
          switch (row.gleanState) {
            case THREE_D_COLLECTION_TASK_STATUS_ENUM.WAIT_RECEIVE:
            case THREE_D_COLLECTION_TASK_STATUS_ENUM.WAIT_COLLECT:
            case THREE_D_COLLECTION_TASK_STATUS_ENUM.COLLECTING:
              className = 'text-color-orange';
              break;
            case THREE_D_COLLECTION_TASK_STATUS_ENUM.COLLECTED:
              className = 'text-color-primary';
              break;
            case THREE_D_COLLECTION_TASK_STATUS_ENUM.CLOSE:
              className = 'text-color-red';
              break;
            default:
              className = '';
              break;
          }
          return (
            row.gleanState
             && (
               <span class={className}>
                 { filters.getEnumLabel(THREE_D_COLLECTION_TASK_STATUS_LIST, row.gleanState!) }
               </span>
             )
          );
        }
      },
      {
        label: '关联采购信息',
        minWidth: '180',
        render(row) {
          return (
            <div>
              <p>
                剪版单：
                {row.purchaseCode}
              </p>
              <p>
                散剪价：
                {row.scatteredCuttingPrice && (
                  <span>
                    {row.scatteredCuttingPrice}
                    元 /
                    {row.scatteredCuttingUnit}
                  </span>
                )}
              </p>
              <p>
                实际采购数量：
                {row.quantity}
              </p>
              <p>
                剪版费用：
                {row.cuttingPurchasePrice}
              </p>
            </div>
          );
        }
      },
      {
        label: '采购状态',
        minWidth: '150',
        render(row) {
          let className = '';
          switch (row.purchaseState) {
            case THREE_D_PURCHASE_STATUS_ENUM.PURCHASING:
              className = 'text-color-orange';
              break;
            case THREE_D_PURCHASE_STATUS_ENUM.COMPLETED:
              className = 'text-color-primary';
              break;
            case THREE_D_PURCHASE_STATUS_ENUM.CLOSED:
              className = 'text-color-red';
              break;
            default:
              className = '';
              break;
          }
          return (
            <span class={className}>{ filters.getEnumLabel(THREE_D_PURCHASE_STATUS_LIST, row.purchaseState!) }</span>
          );
        }
      },
      {
        label: '时间',
        minWidth: '200',
        render(row) {
          return (
            <div>
              {row.taskCreatedTime && (
                <p>
                  创建时间：
                  { filters.formatTime(row.taskCreatedTime) }
                </p>
              )}
              {row.taskFinishTime && (
                <p>
                  完成时间：
                  { filters.formatTime(row.taskFinishTime) }
                </p>
              )}
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
