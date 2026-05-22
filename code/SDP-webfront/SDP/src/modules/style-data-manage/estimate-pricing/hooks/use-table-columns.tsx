import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  DETAIL_AIM_ENUM,
} from '../../constant';
import { usePermissionConfig } from '../use-permission-config';
import { IEstimateCheckPricePageResListItem } from '../api/types';
import { filters } from '@/core/plugins/filter';
import { REMARK_BIZ_TYPE_ENUMS } from '@/modules/clothes-center/constant';
import { useRouter } from 'vue-router';
import { useOpenBlank } from '@/hooks-transfer/use-router-blank';
import { remarkAdd } from '@/modules/clothes-center/api';
import {
  STYLE_TYPE_LIST,
  CHECK_PRICE_STATE_LIST,
  CLOTHES_CHECK_PRICESTATE_ENUM,
  STYLE_TYPE_ENUM
} from '../constant';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';
import { usePriceFormDialog } from './use-price-form-dialog';
import { YES_NO_ENUM } from '@/constant';
import NP from 'number-precision';

interface IProps {
  reloadFn: () => void;
  handleOperateLog: (bizCode: string) => void;
}
export const useListColumns = ({ reloadFn, handleOperateLog }: IProps) => {
  const { BJ, XQ } = usePermissionConfig();
  const $router = useRouter();
  const { handleCostTime } = useTimerangeDistance();
  const { handleDialog } = usePriceFormDialog({
    reloadFn,
  });
  // 添加备注
  const handleCreateRecord = async (row: IEstimateCheckPricePageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.estimateCheckPriceId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.ESTIMATE_PEICING,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };
  const handleToEdit = (row: IEstimateCheckPricePageResListItem, isDetail: boolean = false) => {
    // 现货款--编辑弹窗维护价格
    if (row.styleType === STYLE_TYPE_ENUM.ODM) {
      handleDialog(row, isDetail);
      return;
    }
    // 设计款--编辑-新开页面
    let detailAimEnum = DETAIL_AIM_ENUM.VISIT;
    if (!isDetail) {
      // eslint-disable-next-line vue/max-len
      if (row.checkPriceState === CLOTHES_CHECK_PRICESTATE_ENUM.WAIT_CHECK_PRICE && (!row.versionNum || row.versionNum === '1')) {
        detailAimEnum = DETAIL_AIM_ENUM.INIT_CHECK;
      } else {
        detailAimEnum = DETAIL_AIM_ENUM.RE_CHECK;
      }
    }
    $router.push(
      {
        name: isDetail ? 'StyleDataManageEstimatePeicingDetail' : 'StyleDataManageEstimatePeicingEdit',
        params: {
          id: row.estimateCheckPriceId
        },
        query: {
          type: detailAimEnum,
        },
      }
    );
  };
  const { columns } = useTableColumns<IEstimateCheckPricePageResListItem>(() => {
    return [
      {
        label: 'SPU',
        minWidth: '160',
        render: (row) => {
          return (
            <>
              {/* <div class='tw-flex'>
                SKC：
                <sc-copy-text text={row.designCode} />
              </div> */}
              <div class='tw-flex'>
                <sc-copy-text text={row.styleCode} />
              </div>
              {row.isCancel === YES_NO_ENUM.YES && (
                <el-tag type='danger'>取消</el-tag>
              )}
            </>
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
          const images = [...skcShelvePictureList, ...spuShelvePictureList, ...(row.customerPictureList || [])];
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
        label: '款式类型',
        minWidth: '120',
        render(row) {
          const cur = STYLE_TYPE_LIST.find(item => item.value === row.styleType);
          return (
            <el-tag type={cur ? cur.color : 'success'}>
              {filters.getEnumLabel(STYLE_TYPE_LIST, row.styleType!)}
            </el-tag>
          );
        }
      },
      {
        label: '任务状态',
        minWidth: '120',
        render(row) {
          return (
            <>
              {XQ.value ? (
                <el-button
                  onClick={() => handleToEdit(row, true)}
                  type='primary'
                  text
                >
                  {filters.getEnumLabel(CHECK_PRICE_STATE_LIST, row.checkPriceState!)}
                  -
                  {row.versionNum}
                </el-button>
              ) : (
                <>
                  {filters.getEnumLabel(CHECK_PRICE_STATE_LIST, row.checkPriceState!)}
                  -
                  {row.versionNum}
                </>
              )}
              {row.checkPriceState === CLOTHES_CHECK_PRICESTATE_ENUM.REJECTION && (
                <el-tooltip
                  placement='top-start'
                  title='驳回原因'
                  width={200}
                  trigger='hover'
                  content={row.disapprovalReason || '-'}
                  v-slots={{
                    default: () => (
                      <div>
                        <el-tag type='danger'>驳回原因</el-tag>
                      </div>
                    ),
                  }}
                />
              )}
              <div>{ filters.formatTime(row.finishTime) }</div>
            </>
          );
        },
      },
      {
        label: '预估价格',
        minWidth: '90',
        prop: 'totalCost',
        render(row) {
          const value = row.totalCost ? NP.round(row.totalCost, 2) : 0;
          return `${value > 0 ? value : '-'}`;
        }
      },
      {
        label: '款式品类',
        minWidth: '120',
        prop: 'categoryName',
      },
      // {
      //   label: '二次工艺',
      //   minWidth: '90',
      //   render(row) {
      //     return (
      //       <div class='tw-flex tw-gap-3px tw-flex-col'>
      //         {row.craftList.map((item: any) => (
      //           <div key={item.category3}>
      //             { item.craftsProcessName || filters.getEnumLabel(QC_CRAFT_LIST, item.craftsRequire)}
      //             ：
      //             {(item.nameList || []).map((name: string) => (
      //               <span>
      //                 {name || '-'}
      //                 ;
      //               </span>
      //             ))}
      //           </div>
      //         ))}
      //         {row.cuttingMethod && (
      //           <el-tag>
      //             { row.cuttingMethod }
      //           </el-tag>
      //         )}
      //       </div>
      //     );
      //   },
      // },
      {
        label: '相关人员',
        minWidth: '120',
        render(row) {
          return (
            <>
              {row.styleType === STYLE_TYPE_ENUM.OEM && (
                <div>
                  设计师：
                  { row.designerName || '-' }
                </div>
              )}
              {row.styleType === STYLE_TYPE_ENUM.ODM && (
                <div>
                  开发人：
                  { row.developerName || '-' }
                </div>
              )}
              <div>
                核价师：
                { row.pricerName || '-' }
              </div>
            </>
          );
        }
      },
      {
        label: '供应商信息',
        minWidth: 300,
        render(row) {
          return (
            <div class='tw-flex tw-flex-col tw-flex-justify-between'>
              {row.supplierInfos?.map(((item, index) => {
                return (
                  <div
                    class='tw-flex tw-flex-justify-between'
                    style={{
                      borderBottom: index === row.supplierInfos.length - 1
                        ? 'initial' : '1px solid #ccc'
                    }}
                  >
                    <div>{ item.supplierName }</div>
                    <div class='tw-ml10px tw-min-w-80px'>
                      款号：
                      { item.supplierStyle }
                    </div>
                    <div class='tw-ml10px tw-min-w-60px'>
                      采购价：
                      { item.purchasePrice || '-' }
                    </div>
                  </div>
                );
              }))}
            </div>
          );
        }
      },
      {
        label: '任务耗时',
        minWidth: '120',
        render: (row) => {
          // 需要 row 、当前时间、创建时间
          return (
            <span
              v-html={handleCostTime({
                row,
                currentTimeKey: 'firstFinishTime',
                stepCreatedTimeKey: 'firstCreatedTime',
                hasMinus: true,
                isBeforeStageTime: true
              })}
            />
          );
        }
      },
      {
        label: '创建时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.firstCreatedTime);
        },
      },
      {
        label: '操作记录',
        width: '110',
        fixed: 'right',
        render(row) {
          return (
            <>
              <remark-record
                v-model={row.remark}
                name-key='createdName'
                time-key='createdTime'
                desc-key='remark'
                onCreate={(e: any) => handleCreateRecord(row, e)}
                v-slots={{
                  append: () => (
                    <el-button type='primary' text onClick={() => handleOperateLog(row.styleCode as string)}>
                      操作日志
                    </el-button>
                  )
                }}
              />
              <div>
                { BJ.value && (
                  <el-button
                    type='primary'
                    onClick={() => handleToEdit(row, false)}
                    disabled={row.isCancel === YES_NO_ENUM.YES}
                  >
                    编辑
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
