import { useTableColumns } from '@toy/business-components';
import { ITableItem } from '../type';
import { useSelectionDetailsDialog } from './use-selection-details-dialog';
import { useRemarkDialog } from './use-remark-dialog';
import { resizeImgByWidth } from '@/core/plugins/helper';
import { SELECTION_STATUS_LIST } from '../constant';
import { useRouter } from 'vue-router';

export const useListColumns = () => {
  const { handleOpenDialog: handleOpenDetailsDialog } = useSelectionDetailsDialog();
  const { handleOpenDialog: handleOpenRemarkDialog } = useRemarkDialog();
  const $router = useRouter();
  const handleOpenNewTab = (styleCode:string) => {
    const url = $router.resolve({
      name: 'DesignCenterInStockSpuDetail',
      params: {
        styleCode,
      }
    });
    window.open(url.href, '_blank');
  };

  const { columns, switchValue } = useTableColumns<ITableItem>(() => {
    return [
      {
        type: 'selection',
        minWidth: '44',
        label: 'check',
        showConfig: {
          default: true,
        }
      },
      {
        label: '选款编号',
        minWidth: '120',
        render(row) {
          return (
            <div
              class='tw-text-primary'
              onClick={() => handleOpenDetailsDialog(row.styleSelectionId as unknown as string)}
            >
              {row.styleSelectionCode}
            </div>
          );
        }
      },
      {
        label: '供应商',
        minWidth: '120',
        render(row) {
          return (
            <div>
              <p>
                <el-text type='info'>供应商：</el-text>
                <span>{row.supplierName}</span>
              </p>
              <p>
                <el-text type='info'>供应商款号：</el-text>
                <span>{row.supplierStyleCode}</span>
              </p>
            </div>
          );
        }
      },
      {
        label: '图片',
        minWidth: '120',
        render(row) {
          return (
            <div class='tw-flex tw-flex-wrap tw-gap-2px'>
              <el-image
                src={resizeImgByWidth(row.imageUrl, 300)}
                class='tw-w-100px tw-h-100px tw-rounded-4px'
                fit='cover'
                preview-src-list={[row.imageUrl]}
                preview-teleported
              />
            </div>
          );
        }
      },
      {
        label: '状态',
        minWidth: '80',
        render(row) {
          return (
            <div class='tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1'>
              <sc-status-label
                options={SELECTION_STATUS_LIST}
                value={row.styleSelectionStatus}
                mode='tag'
              />
            </div>
          );
        }
      },
      {
        label: '品类',
        minWidth: '80',
        prop: 'categoryName',
      },
      {
        label: '颜色',
        minWidth: '60',
        prop: 'color',
      },
      {
        label: '价格',
        minWidth: '120',
        render(row) {
          return (
            <div>
              <p>
                <el-text type='info'>价格：</el-text>
                <span>{row.price}</span>
              </p>
              <p>
                <el-text type='info'>采购价：</el-text>
                <span>{row.purchasePrice}</span>
              </p>
              <p>
                <el-text type='info'>期望价格：</el-text>
                <span>{row.expectedPrice}</span>
              </p>
            </div>
          );
        }
      },
      {
        label: '尺码',
        minWidth: '60',
        prop: 'size',
      },
      {
        label: '建款信息',
        minWidth: '170',
        render(row) {
          return (
            <div>
              <p>
                <el-text type='info'>供给方式：</el-text>
                <span>{row.supplyModeName}</span>
              </p>
              <p>
                <el-text type='info'>货盘类型：</el-text>
                <span>{row.palletTypeName}</span>
              </p>
              <p>
                <el-text type='info'>现货类型：</el-text>
                <span>{row.spotTypeName}</span>
              </p>
              {
                row.spuCode && (
                  <p>
                    <el-text type='info'>关联款号：</el-text>
                    <el-button
                      type='primary'
                      link
                      onClick={() => handleOpenNewTab(row.spuCode as unknown as string)}
                    >
                      {row.spuCode}
                    </el-button>
                  </p>
                )
              }
            </div>
          );
        }
      },
      {
        label: '选款信息',
        minWidth: '190',
        render(row) {
          return (
            <div>
              <p>
                <el-text type='info'>选款人：</el-text>
                <span>{row.styleSelectorName}</span>
              </p>
              <p>
                <el-text type='info'>选款时间：</el-text>
                <span>{row.selectionTime}</span>
              </p>
            </div>
          );
        }
      },
      {
        label: '创建信息',
        minWidth: '190',
        render(row) {
          return (
            <div>
              <p>
                <el-text type='info'>招商名称：</el-text>
                <span>{row.investmentPromotionName}</span>
              </p>
              <p>
                <el-text type='info'>创建人：</el-text>
                <span>{row.creatorName}</span>
              </p>
              <p>
                <el-text type='info'>创建时间：</el-text>
                <span>{row.createdTime}</span>
              </p>
            </div>
          );
        }
      },
      {
        label: '操作',
        width: '120',
        fixed: 'right',
        render(row) {
          return (
            <el-button
              link
              type='primary'
              onClick={() => handleOpenRemarkDialog({
                styleSelectionId: row.styleSelectionId as unknown as string,
              }, (total:number) => {
                row.totalRemark = total;
              })}
            >
              备注
              { row.totalRemark !== null ? `(${row.totalRemark})` : ''}
            </el-button>
          );
        }
      },
    ];
  });

  return {
    tableColumns: columns,
    switchValue,
  };
};
