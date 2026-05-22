import { useTableColumns } from '@toy/business-components';
import { filters } from '@/core/plugins/filter';
import { usePermissionConfig } from '../use-permission-config';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  QC_CRAFT_LIST,
  REMARK_BIZ_TYPE_ENUMS,
  SAMPLE_TYPE_LIST,
  MAKE_CLOTHES_TYPE_LIST
} from '@/modules/clothes-center/constant';
import { YES_NO_ENUM } from '@/constant';
import { IRequirementSummaryPageResListItemNodeStatesItem, IRequirementSummaryPageResListItem } from '../api/types';
import { remarkAdd } from '@/modules/clothes-center/api';
import { ASIDE_TYPE_ENUM } from '../../paper-task/constant/menus';
import { ASIDE_TYPE_ENUM as SAMPLE_3D_TASK_MENUS_ENUM } from '../../sample-task/constant/menus';
import { STATE_ENUM, STATUS_LIST } from '../constant';
import { getMenus, IMenuItem, ASIDE_TYPE_ENUM as STYLE_SEW_MENUS_ENUM } from '../../style-sew/constant/menus';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';

interface IProps {
  handleEdit: (row: IRequirementSummaryPageResListItem) => void;
  viewProcessOrder: (row: IRequirementSummaryPageResListItem) => void;
  reloadFn: () => void;
  handleOperateLog: (clothesId: string) => void;
}

function getCurrentMenuByProcessNode(menu: IMenuItem[], processNode:string):IMenuItem | null {
  for (let i = 0, len = menu.length; i < len; i++) {
    const c = menu[i];
    if (c.processNode === processNode) {
      return c;
    }
    if (c.childList) {
      const n = getCurrentMenuByProcessNode(c.childList, processNode);
      if (n) {
        return n;
      }
    }
  }
  return null;
}

export const useListColumns = ({ handleEdit, reloadFn, viewProcessOrder, handleOperateLog }: IProps) => {
  const { BJ } = usePermissionConfig();
  const { handleCostTime } = useTimerangeDistance();
  // 添加备注
  const handleCreateRecord = async (row: IRequirementSummaryPageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.clothesId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };

  const { columns } = useTableColumns<IRequirementSummaryPageResListItem>(() => {
    return [
      {
        type: 'selection',
        width: 50,
        selectable(row) {
          return [STATE_ENUM.DOING, STATE_ENUM.WAITING].includes(row.state!)
            && row.isCancel === YES_NO_ENUM.NO;
        },
      },
      {
        label: '加工单号',
        minWidth: '150',
        render: (row) => {
          return (
            <>
              <el-button type='primary' link onClick={() => viewProcessOrder(row)}>
                {row.processCode}
              </el-button>
              <div>
                {row.isAbnormal === YES_NO_ENUM.YES && (
                  <el-tag type='danger'>
                    异常
                  </el-tag>
                )}
                {row.isCancel === YES_NO_ENUM.YES && (
                  <el-tag type='danger'>
                    取消
                  </el-tag>
                )}
              </div>
            </>
          );
        }
      },
      {
        label: 'SPU/SKC',
        minWidth: '170',
        render: (row) => {
          return (
            <div class='tw-text-left'>
              <div class='tw-flex'>
                SKC：
                <sc-copy-text text={row.designCode} />
              </div>
              <div class='tw-flex'>
                SPU：
                <sc-copy-text text={row.styleCode} />
              </div>
            </div>
          );
        }
      },
      {
        label: '图片',
        align: 'center',
        minWidth: 120,
        render(row) {
          const spuShelvePictureList = (row.shelvePicture?.spuShelvePictureList || []);
          const skcShelvePictureList = (row.shelvePicture?.skcShelvePictureList || []);
          const images = [...skcShelvePictureList, ...spuShelvePictureList, ...(row.designPictureList || [])];
          return (
            <custom-image
              src={resizeImgByWidth(images?.[0] || '', 192)}
              class='img-thumbnail__table'
              fit='cover'
              preview-src-list={images}
              preview-teleported
            />
          );
        },
      },
      {
        label: '打版信息',
        width: '120',
        render: (row) => {
          return (
            <>
              <p>{filters.getEnumLabel(SAMPLE_TYPE_LIST, row.sampleType!)}</p>
              <p>{filters.getEnumLabel(MAKE_CLOTHES_TYPE_LIST, row.makeClothesType!)}</p>
            </>
          );
        }
      },
      {
        label: '车版件数',
        minWidth: '110',
        render: (row) => {
          return (
            <>{row.sampleAmount ?? '-'}</>
          );
        }
      },
      {
        label: '需求状态/环节',
        minWidth: '140',
        render: (row) => {
          /**
           * 根据 流程节点 获取路由名称
           * @param item 流程节点
           * @returns  服装工程中心下的相关路由和相关参数
           */
          const setToRouter = (item:IRequirementSummaryPageResListItemNodeStatesItem) => {
            let name = 'ClothesCenterPrototypeHandoverList';
            const query: Record<string, any> = {
              processNode: item.processNode,
              processNodeState: item.processNodeState,
              processStep: item.processStep,
              skc: row.designCode,
              componentName: ASIDE_TYPE_ENUM.PAPER_TASK_ORDER,
            };
            if (item.processNodeDesc?.includes('版单交接')) {
              name = 'ClothesCenterPrototypeHandoverList';
            }
            if (item.processNodeDesc?.includes('审版')) {
              name = 'ClothesCenterStyleAuditList';
            }
            if (item.processNodeDesc?.includes('审版工艺单')) {
              name = 'ClothesCenterAuditCraftTaskList';
            }
            if (item.processNodeDesc?.includes('纸样')) {
              name = 'ClothesCenterPatternTask';
              // 301 = 纸样订单 302 = 内部纸样 303 = 外部纸样
              query.componentName = ASIDE_TYPE_ENUM.PAPER_TASK_ORDER;
              if (item.processNode === '302') {
                query.componentName = ASIDE_TYPE_ENUM.PAPER_TASK_INSIDE;
              } else if (item.processNode === '303' || item.processNode === '304') {
                query.componentName = ASIDE_TYPE_ENUM.PAPER_TASK_OUTSIDE;
              }
            }
            // 车版/质检
            if (item.processStep === '400' || item.processStep === '600') {
              name = 'ClothesCenterStyleSewList';
              const menus = getMenus();
              const c = getCurrentMenuByProcessNode(menus, item.processNode ?? '');
              if (c) {
                query.componentName = c.componentName;
              }
              // 车缝-内部-半成品工艺中
              if (item.processNode === '406') {
                query.componentName = STYLE_SEW_MENUS_ENUM.CAR_INSIDE_SEAM;
              }
              // 车缝-外部-半成品工艺中
              if (item.processNode === '411') {
                query.componentName = STYLE_SEW_MENUS_ENUM.CAR_OUTSIDE_SEAM;
              }
              // 车缝-外部接单-待接单（跳转到裁剪TAB）
              if (item.processNode === '407') {
                query.componentName = STYLE_SEW_MENUS_ENUM.CAR_OUTSIDE_CUT;
              }
            }
            if (item.processNodeDesc?.includes('3D打版')) {
              name = 'ClothesCenterSampleTaskList';
              // 501 = 3D分单 502 = 内部处理 504 = 外部处理-待提交（0），已提交（1）， 503 = 外部处理-待分单（1）；
              query.componentName = SAMPLE_3D_TASK_MENUS_ENUM.SAMPLE_TASK_ORDER;
              if (item.processNode === '502') {
                query.componentName = SAMPLE_3D_TASK_MENUS_ENUM.SAMPLE_TASK_INSIDE;
              } else if (item.processNode === '504' || item.processNode === '503') {
                query.componentName = SAMPLE_3D_TASK_MENUS_ENUM.SAMPLE_TASK_OUTSIDE;
              }
            }

            return {
              name,
              query,
            };
          };
          return (
            <p>
              {row.state === STATE_ENUM.DOING
              && (row.nodeStates || []).map((item: IRequirementSummaryPageResListItemNodeStatesItem) => (
                <p>
                  <router-link to={setToRouter(item)}>
                    {item.processNodeDesc}
                    -
                    {item.processNodeStateDesc}
                  </router-link>
                </p>
              ))}
              {[STATE_ENUM.WAITING, STATE_ENUM.COMPLETED, STATE_ENUM.CANCELED].includes(row.state as STATE_ENUM) && (
                <span>
                  {filters.getEnumLabel(STATUS_LIST, row.state as STATE_ENUM)}
                </span>
              )}
            </p>
          );
        }
      },
      {
        label: '二次工艺',
        minWidth: '150',
        render(row) {
          return (
            <div class='desc-lis'>
              {row.craftList.map((item: any) => (
                <div key={item.category3} class='tw-pd-5px'>
                  { item.craftsProcessName || filters.getEnumLabel(QC_CRAFT_LIST, item.craftsRequire)}
                  ：
                  {(item.nameList || []).map((name: string) => (
                    <span>
                      {name || '-'}
                      ;
                    </span>
                  ))}
                </div>
              ))}
              {row.cuttingMethod && (
                <el-tag>
                  { row.cuttingMethod }
                </el-tag>
              )}
            </div>
          );
        },
      },
      {
        label: '相关人员',
        minWidth: '90',
        render(row) {
          return (
            <div>
              设计师：
              { row.designerName || '-' }
            </div>
          );
        }
      },
      // {
      //   label: '耗时',
      //   minWidth: '120',
      //   render: (row) => {
      //     // 需要 row 、当前时间、创建时间
      //     return (
      //       <>
      //         {/* 待开始、进行中耗时=当前时间-加工单1创建时间-异常时间 */}
      //         {(row.state === STATE_ENUM.DOING || row.state === STATE_ENUM.WAITING) && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'firstSampleCreatedTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 已完成、已取消耗时=完成/取消时间-加工单1创建时间-异常时间 */}
      //         {(row.state === STATE_ENUM.COMPLETED || row.state === STATE_ENUM.CANCELED) && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: 'auditPassTime',
      //               stepCreatedTimeKey: 'firstSampleCreatedTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //       </>
      //     );
      //   }
      // },
      {
        label: '创建时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.firstSampleCreatedTime);
        },
      },
      {
        label: '完成时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.auditPassTime);
        },
      },
      {
        label: '操作记录',
        width: '180',
        fixed: 'right',
        render(row) {
          return (
            <>
              <remark-record
                v-model={row.remark}
                name-key='createdName'
                time-key='createdTime'
                desc-key='remark'
                onCreate={(remark: string) => handleCreateRecord(row, remark)}
                v-slots={{
                  append: () => (
                    <el-button
                      type='primary'
                      text
                      onClick={() => handleOperateLog(row.clothesId as string)}
                    >
                      操作日志
                    </el-button>
                  )
                }}
              />
              <div>
                {BJ.value && (
                  <el-button
                    type='primary'
                    onClick={() => handleEdit(row)}
                    disabled={row.isCancel === YES_NO_ENUM.YES}
                  >
                    需求编辑
                  </el-button>
                )}
              </div>
            </>
          );
        }
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
