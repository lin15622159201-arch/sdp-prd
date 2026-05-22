import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  QC_CRAFT_LIST,
  REMARK_BIZ_TYPE_ENUMS,
  SAMPLE_TYPE_LIST,
  MAKE_CLOTHES_TYPE_LIST
} from '@/modules/clothes-center/constant';
import { YES_NO_ENUM } from '@/constant';
import { filters } from '@/core/plugins/filter';
import { remarkAdd } from '@/modules/clothes-center/api';
import { ISampleAuditPageResListItem } from '../api/types';
import { STATUS_LIST, RESULT_LIST, STATUS_LIST_ENUM } from '../constant';
import { usePermissionConfig } from '@/modules/clothes-center/views/style-audit/use-permission-config';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';

interface IParams {
  handleAudit: (row: ISampleAuditPageResListItem, behavior: string) => void;
  reloadFn: () => void;
  viewProcessOrder: (row: ISampleAuditPageResListItem) => void;
  handleOperateLog: (clothesId: string) => void;
}
const { SB, XQ } = usePermissionConfig();

export const useListColumns = ({ handleAudit, reloadFn, viewProcessOrder, handleOperateLog }: IParams) => {
  const { handleCostTime } = useTimerangeDistance();
  // 添加备注
  const handleCreateRecord = async (row: ISampleAuditPageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.clothesId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };
  const { columns } = useTableColumns<ISampleAuditPageResListItem>(() => {
    return [
      {
        type: 'selection',
        width: 50,
        align: 'center',
        selectable: row => row.isCancel === YES_NO_ENUM.NO
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
              <p>
                {row.isAbnormal === YES_NO_ENUM.YES && (
                  <el-tag type='danger' class='tw-mr[4px]'>
                    异常
                  </el-tag>
                )}
                {row.isCancel === YES_NO_ENUM.YES && (
                  <el-tag type='danger' class='tw-mr[4px]'>
                    取消
                  </el-tag>
                )}
                {row.isRepair === YES_NO_ENUM.YES && (<el-tag type='danger'>返修</el-tag>)}
              </p>
            </>
          );
        }
      },
      {
        label: 'SKC',
        minWidth: '180',
        render: (row) => {
          return (
            <>
              <div class='tw-flex'>
                SKC：
                <sc-copy-text text={row.designCode} />
              </div>
              <div class='tw-flex'>
                SPU：
                <sc-copy-text text={row.styleCode} />
              </div>
            </>
          );
        }
      },
      {
        label: '图片',
        align: 'center',
        minWidth: '120',
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
        width: '120',
        prop: 'sampleAmount',
      },
      {
        label: '任务状态',
        width: '120',
        render: (row) => {
          return (
            <>
              {XQ.value ? (
                <el-button type='primary' text onClick={() => handleAudit(row, 'view')}>
                  {filters.getEnumLabel(STATUS_LIST, row.auditStatus!)}
                  {row.auditVersionNum ? `-${row.auditVersionNum}` : ''}
                </el-button>
              ) : (
                <>
                  {filters.getEnumLabel(STATUS_LIST, row.auditStatus!)}
                  {row.auditVersionNum ? `-${row.auditVersionNum}` : ''}
                </>
              )}
            </>
          );
        }
      },
      {
        label: '审版结果',
        width: '150',
        prop: 'auditResult',
        render: (row) => {
          return (
            row.auditResult ? (
              <div>
                <p>{filters.getEnumLabel(RESULT_LIST, row.auditResult!)}</p>
              </div>
            ) : null
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
        minWidth: '140',
        render(row) {
          return (
            <>
              <div>
                设计师：
                { row.designerName || '-' }
              </div>
              <div>
                车缝师：
                { row.sewerName || '-' }
              </div>
              <div>
                纸样师：
                { row.patternMakerName || '-' }
              </div>
              <div>
                审版师：
                { row.editionReviewerName || '-' }
              </div>
              <div>
                审版工艺师：
                {row.reviewCraftsmanName || '-'}
              </div>
            </>
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
      //         {/* 待审版耗时=当前时间-版本创建时间-异常时间 */}
      //         {row.auditStatus === STATUS_LIST_ENUM.WAIT && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'auditCreatedTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 已提交耗时=版本提交时间-版本创建时间-异常时间 */}
      //         {row.auditStatus === STATUS_LIST_ENUM.COMPLETED && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: 'auditTime',
      //               stepCreatedTimeKey: 'auditCreatedTime',
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
          return filters.formatTime(row.auditCreatedTime);
        },
      },
      {
        label: '提交时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.auditTime);
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
                {SB.value && row.auditStatus === YES_NO_ENUM.NO ? (
                  <el-button
                    type='primary'
                    onClick={() => handleAudit(row, 'modify')}
                    disabled={row.isCancel === YES_NO_ENUM.YES}
                  >
                    审版
                  </el-button>
                ) : null}
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
