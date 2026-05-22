import { useTableColumns } from '@toy/business-components';
import { filters } from '@/core/plugins/filter';
import { usePermissionConfig } from '../../../use-permission-config';
import { IListItem } from '../types';
import { YES_NO_STRING_ENUM } from '@/constant';
import { useUpdateSkc } from './use-update-skc';
import { useRouter } from 'vue-router';
import { TASK_SOURCE_LIST } from '@/constant/task';
import { IMAGE_UPDATE_STATE_LIST } from '@/modules/design-center/image-update/constant';
import { InfoFilled } from '@element-plus/icons-vue';

interface IProps {
  reloadFn: () => void;
  /** 查看日志 */
  handleOperateLog: (styleCode: string) => void;
}

export const useColumns = (props: IProps) => {
  const router = useRouter();
  const { reloadFn, handleOperateLog } = props;
  const { handleUpdateSKC } = useUpdateSkc({
    reloadFn,
  });
  const handleEditSpu = (taskId: string) => {
    router.push({
      name: 'DesignCenterInStockUpdateSpu',
      params: {
        taskId
      },
    });
  };
  const { BJSPU, BJSKC, SPUXQ, FS, CZRZ } = usePermissionConfig();

  /**
   * spu详情
   */
  const toSpuDetail = (item: IListItem) => {
    return {
      name: 'DesignCenterInStockSpuDetail',
      params: {
        taskId: item.taskId,
      },
    };
  };
  const handleImageUpdateDetail = ({ imageUpdateId }: IListItem) => {
    router.push({ name: 'DesignCenterImageUpdateDetail', params: { taskId: imageUpdateId } });
  };

  const { columns } = useTableColumns<IListItem>(() => [
    {
      type: 'selection',
      width: '30',
      selectable(row: IListItem) {
        // skc编码或spu编码为空时禁用
        if (row.isChild) {
          return !!row.skcCode;
        }
        return !!(row.skcs?.some(skc => skc.skcCode) && row.taskCode);
      }
    },
    {
      label: '',
      width: '30',
    },
    {
      label: 'SPU',
      minWidth: 240,
      render(row) {
        const url = row.mainImgUrl || row.skcs?.[0].mainImgUrl;
        return (
          <div class='tw-flex tw-flex-center-y'>
            {!row.isChild ? (
              <>
                <custom-image
                  class='tw-w-80px tw-h-80px tw-mr-5px tw-flex-shrink-0'
                  fit='cover'
                  src={filters.ossUrl(url)}
                  preview-src-list={[url]}
                />
                <div>
                  <p class='tw-flex tw-mb-10px'>
                    <span>SPU：</span>
                    <sc-copy-text text={row.taskCode}>
                      {SPUXQ.value ? (
                        <router-link to={toSpuDetail(row)}>
                          { row.taskCode }
                        </router-link>
                      ) : <span>{ row.taskCode }</span>}
                    </sc-copy-text>
                  </p>
                  <p>
                    {row.styleType && (
                      <el-tag type='warning' class='tw-mr-5px'>{TASK_SOURCE_LIST.find(item => item.value === (row.styleType)?.toLowerCase())?.label}</el-tag>
                    )}
                    {
                      row.cancelled === YES_NO_STRING_ENUM.YES && (
                        <el-tooltip content={row.message} placement='top' disabled={!row.message}>
                          <el-tag type='danger'>取消</el-tag>
                        </el-tooltip>
                      )
                    }
                  </p>
                </div>
              </>
            )
              : (
                <>
                  <custom-image
                    class='tw-w-60px tw-h-60px tw-mr-5px tw-ml-36px'
                    fit='cover'
                    src={filters.ossUrl(row?.mainImgUrl)}
                    preview-src-list={[row?.mainImgUrl]}
                  />
                  <div>
                    <p>
                      <span>SKC：</span>
                      <sc-copy-text text={row.skcCode} />
                    </p>
                    <p>
                      {
                        row.cancelled === YES_NO_STRING_ENUM.YES && (
                          <el-tooltip content={row.message} placement='top' disabled={!row.message}>
                            <el-tag type='danger'>取消</el-tag>
                          </el-tooltip>
                        )
                      }
                    </p>
                  </div>
                </>
              )}
          </div>
        );
      },
    },
    {
      label: '款式信息',
      minWidth: 180,
      render(row) {
        return (
          <div>
            {!row.isChild ? (
              <>
                <p>
                  品类：
                  {row.categoryName}
                </p>
                <p>
                  店铺：
                  {row.storeName}
                </p>
              </>
            ) : (
              <>
                <p>
                  颜色中文：
                  {row.color}
                </p>
                <p>
                  颜色英文：
                  {row.colorEnName}
                </p>
              </>
            )}
          </div>
        );
      },
    },
    {
      label: '供应商信息',
      minWidth: 180,
      render(row) {
        const firstSupplierItem = row.suppliers?.[0];
        return (
          <>
            {!row.isChild ? (
              <>
                <p>
                  供应商名称：
                  {firstSupplierItem?.supplierName}
                </p>
                <p>
                  供应商款号：
                  {firstSupplierItem?.supplierStyleCode}
                </p>
                <p>
                  采购价：
                  {firstSupplierItem?.purchasePrice}
                </p>
                { row.suppliers?.length > 1 && <el-tag type='primary'>一款多商</el-tag>}
              </>
            ) : (
              <p>
                尺码：
                {row?.sizeStandardName?.split('-').join('、')}
              </p>
            )}
          </>
        );
      },
    },
    {
      label: '商品图',
      minWidth: 100,
      render(row) {
        let className = '';
        let label = '';
        switch (row.hasMainImg) {
          case 'NO':
            className = 'text-color-orange';
            label = '待补充';
            break;
          case 'YES':
            className = 'text-color-primary';
            label = '已齐全';
            break;
          default:
            className = '';
            label = '未知';
            break;
        }
        return (
          <p>
            <span class={className}>{ label }</span>
          </p>
        );
      },
    },
    {
      label: '资料状态',
      minWidth: 100,
      render(row) {
        let className = '';
        let label = '';
        switch (row.dataCompleted) {
          case 'NO':
            className = 'text-color-orange';
            label = '未完善';
            break;
          case 'YES':
            className = 'text-color-primary';
            label = '已完善';
            break;
          default:
            className = '';
            label = '未知';
            break;
        }
        return (
          <p>
            <span class={className}>{ label }</span>
          </p>
        );
      },
    },
    {
      label: '设计师',
      prop: 'designerName',
      minWidth: 100,
    },
    {
      label: '修图状态',
      prop: 'imageUpdateStatus',
      minWidth: 120,
      render(row) {
        return (
          <div>
            <p>{ filters.getEnumLabel(IMAGE_UPDATE_STATE_LIST, row.imageUpdateStatus!) }</p>
            {row.imageUpdateCode && (
              <el-link
                onClick={() => {
                  handleImageUpdateDetail(row);
                }}
              >
                { row.imageUpdateCode }
              </el-link>
            )}
          </div>
        );
      },
    },
    {
      label: '上架状态',
      width: 90,
      prop: 'onShelves',
      render(row) {
        if (!row.isChild) {
          return '-';
        }
        if (row.onShelvesFail === 'YES') {
          return (
            <div class='tw-flex tw-items-center'>
              <span>发布失败</span>
              <el-tooltip
                content={row.onShelvesFailReason || '--'}
                placement='top'
              >
                <el-icon class='tw-color-red tw-ml-1'><InfoFilled /></el-icon>
              </el-tooltip>
            </div>
          );
        }
        if (row.onShelves) {
          return row.onShelves === 'YES' ? '已发布' : '下架';
        }
        return row.upcoming === 'YES' ? '待发布' : '待推送';
      }
    },
    {
      label: '推送买手状态',
      width: 100,
      render(row) {
        if (row.buyerCancelled && row.buyerCancelled === 'YES') {
          return '已取消';
        }
        if (row.pushFailed) {
          if (row.pushFailed === 'YES') {
            return (
              <div>
                推送失败
                <div>
                  <el-popover
                    content={row.failMessage}
                    placement='top'
                  >
                    {{
                      reference: () => <el-icon class='tw-color-red'><InfoFilled /></el-icon>
                    }}
                  </el-popover>
                </div>
              </div>
            );
          }
          if (row.pushedBuyer === 'NO') return '待推送';
          if (row.pushedBuyer === 'YES') return '已推送';
          return '';
        }
        if (row.pushedBuyer) {
          return row.pushedBuyer === 'YES' ? '已推送' : '待推送';
        }
        return '';
      }
    },
    {
      label: '时间',
      minWidth: 210,
      render(row) {
        return (
          <>
            <p>
              创建时间：
              {filters.formatTime(row.createdTime)}
            </p>
            <p>
              更新时间：
              {filters.formatTime(row.revisedTime)}
            </p>
            <p>
              动销时间：
              {filters.formatTime(row.saleTime)}
            </p>
          </>
        );
      },
    },
    {
      label: '操作',
      prop: 'operation',
      slotKey: 'operation',
      minWidth: 150,
      fixed: 'right',
      render(row) {
        return (
          <>
            {
              !row.isChild ? (
                <>
                  {BJSPU.value && (
                    <el-button
                      type='primary'
                      text
                      onClick={() => handleEditSpu(row.taskId)}
                      disabled={row.cancelled === YES_NO_STRING_ENUM.YES}
                    >
                      编辑
                    </el-button>
                  )}
                  {FS.value && (
                    <el-button
                      type='primary'
                      text
                      onclick={() => handleUpdateSKC(row)}
                      disabled={row.cancelled === YES_NO_STRING_ENUM.YES}
                    >
                      复色
                    </el-button>
                  )}
                  {CZRZ.value && (
                    <el-button
                      type='primary'
                      text
                      onClick={() => handleOperateLog(row.taskId ?? '')}
                    >
                      操作日志
                    </el-button>
                  )}
                </>
              ) : (
                BJSKC.value && (
                  <el-button
                    type='primary'
                    text
                    disabled={row.cancelled === YES_NO_STRING_ENUM.YES}
                    onClick={() => handleUpdateSKC(row)}
                  >
                    编辑
                  </el-button>
                )
              )
            }

          </>
        );
      },
    },
  ]);
  return {
    columns
  };
};
