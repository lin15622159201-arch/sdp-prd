import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  QC_CRAFT_LIST, REMARK_BIZ_TYPE_ENUMS,
  SAMPLE_TYPE_LIST, MAKE_CLOTHES_TYPE_LIST,
} from '@/modules/clothes-center/constant';
import { filters } from '@/core/plugins/filter';
import { remarkAdd } from '@/modules/clothes-center/api';
import { ISewQueryByPageResListItem, ISampleQcPageResListItemCraftListItem } from '../../../../api/types';
import { YES_NO_ENUM } from '@/constant/global';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';

interface IProps {
  mode?: 'cut' | 'slice';
  reloadFn: () => void;
  viewProcessOrder: (row: ISewQueryByPageResListItem) => void;
  handleOperateLog: (clothesId: string) => void;
}

export const useListColumns = ({ mode, reloadFn, viewProcessOrder, handleOperateLog }: IProps) => {
  const { handleCostTime } = useTimerangeDistance();
  // 添加备注
  const handleCreateRecord = async (row: ISewQueryByPageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.clothesId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };

  const { columns } = useTableColumns<ISewQueryByPageResListItem>(() => {
    return [
      {
        type: 'selection',
        width: 50,
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
                  <el-tag type='danger'>
                    异常
                  </el-tag>
                )}
                {row.isCancel === YES_NO_ENUM.YES && (
                  <el-tag type='danger'>
                    取消
                  </el-tag>
                )}
              </p>
            </>
          );
        }
      },
      {
        label: '设计款号',
        minWidth: '180',
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
        label: mode && ['seam'].includes(mode) ? '打版件数' : '车版件数',
        width: '120',
        prop: 'sampleAmount',
      },
      {
        label: '任务状态',
        width: '120',
        prop: 'processNodeStateDesc',
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
                纸样师：
                { row.patternMakerName || '-' }
              </div>
              <div>
                供应商：
                { row.roomName || '-' }
              </div>
              <div>
                审版工艺师：
                {row.reviewCraftsmanName || '-'}
              </div>
            </>
          );
        }
      },
      {
        label: '二次工艺&裁剪方式',
        minWidth: '150',
        render(row) {
          return (
            <>
              <div>
                {row.craftList.map((item: ISampleQcPageResListItemCraftListItem) => {
                  return (
                    <div>
                      { item.craftsProcessName || filters.getEnumLabel(QC_CRAFT_LIST, item.craftsRequire!)}
                      ：
                      {(item.nameList || []).map((name: string) => (
                        <span>
                          {name || '-'}
                          ；
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
              {row.cuttingMethod && (
                <el-tag>
                  {row.cuttingMethod}
                </el-tag>
              )}
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
      //         {/* 裁剪环节： */}
      //         {mode === 'cut' && (
      //           <>
      //             {/* 待接单、进行中耗时=当前时间-对应加工单版本任务数据最新完成车版分单的时间-异常时间 */}
      //             {(((row.processNode === PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_ACCEPT
      //             && row.processNodeState === '2'))
      //             || (row.processNode === PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_CUTTING
      //               && row.processNodeState === '1'))
      //             && (
      //               <span
      //                 v-html={handleCostTime({
      //                   row,
      //                   currentTimeKey: '',
      //                   stepCreatedTimeKey: 'cutCreatedTime',
      //                   stepTimeConsuming: 'stepExceptionTimeConsuming',
      //                   hasMinus: true,
      //                   isBeforeStageTime: true
      //                 })}
      //               />
      //             )}
      //             {/* 已完成耗时=首次提交-对应加工单版本任务数据最新完成车版分单的时间-异常时间 */}
      //             {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_CUTTING
      //             && row.processNodeState === '2' && (
      //               <span
      //                 v-html={handleCostTime({
      //                   row,
      //                   currentTimeKey: 'cutFinishTime',
      //                   stepCreatedTimeKey: 'cutCreatedTime',
      //                   stepTimeConsuming: 'stepExceptionTimeConsuming',
      //                   hasMinus: true,
      //                   isBeforeStageTime: true
      //                 })}
      //               />
      //             )}
      //           </>
      //         )}
      //         {/* 裁片二次工艺环节 */}
      //         {mode === 'slice' && (
      //           <>
      //             {/* 进行中耗时=当前时间-环节创建时间-异常时间 */}
      //             {row.processNodeState === '1' && (
      //               <span
      //                 v-html={handleCostTime({
      //                   row,
      //                   currentTimeKey: '',
      //                   stepCreatedTimeKey: 'sliceCraftCreatedTime',
      //                   stepTimeConsuming: 'stepExceptionTimeConsuming',
      //                   hasMinus: true,
      //                   isBeforeStageTime: true
      //                 })}
      //               />
      //             )}
      //             {/* 已完成=环节完成时间-环节创建时间-异常时间 */}
      //             {row.processNodeState === '2' && (
      //               <span
      //                 v-html={handleCostTime({
      //                   row,
      //                   currentTimeKey: 'sliceCraftFinishTime',
      //                   stepCreatedTimeKey: 'sliceCraftCreatedTime',
      //                   stepTimeConsuming: 'stepExceptionTimeConsuming',
      //                   hasMinus: true,
      //                   isBeforeStageTime: true
      //                 })}
      //               />
      //             )}
      //           </>
      //         )}
      //         {/* 车缝环节 */}
      //         {mode === 'seam' && (
      //           <>
      //             {/* 待进行耗时=当前时间-创建时间-异常时间 */}
      //             {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS && row.processNodeState === '0' && (
      //               <span
      //                 v-html={handleCostTime({
      //                   row,
      //                   currentTimeKey: '',
      //                   stepCreatedTimeKey: 'pendingTime',
      //                   stepTimeConsuming: 'stepExceptionTimeConsuming',
      //                   hasMinus: true,
      //                   isBeforeStageTime: true
      //                 })}
      //               />
      //             )}
      //             {/* 车缝中耗时=当前时间-环节状态创建时间-异常时间 */}
      //             {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS && row.processNodeState === '1' && (
      //               <span
      //                 v-html={handleCostTime({
      //                   row,
      //                   currentTimeKey: '',
      //                   stepCreatedTimeKey: 'sewProgressTime',
      //                   stepTimeConsuming: 'stepExceptionTimeConsuming',
      //                   hasMinus: true,
      //                   isBeforeStageTime: true
      //                 })}
      //               />
      //             )}
      //             {/* 已完成耗时=数据已完成时间-待进行创建时间-异常时间 */}
      //             {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS && row.processNodeState === '2' && (
      //               <span
      //                 v-html={handleCostTime({
      //                   row,
      //                   currentTimeKey: 'sewFinishTime',
      //                   stepCreatedTimeKey: 'pendingTime',
      //                   stepTimeConsuming: 'stepExceptionTimeConsuming',
      //                   hasMinus: true,
      //                   isBeforeStageTime: true
      //                 })}
      //               />
      //             )}
      //             {/* 半成品工艺进行中耗时=当前时间-状态环节创建时间-异常时间 */}
      //             {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_HALF_SECOND_CRAFT
      //             && row.processNodeState === '1' && (
      //               <span
      //                 v-html={handleCostTime({
      //                   row,
      //                   currentTimeKey: '',
      //                   stepCreatedTimeKey: 'semiCraftCreatedTime',
      //                   stepTimeConsuming: 'stepExceptionTimeConsuming',
      //                   hasMinus: true,
      //                   isBeforeStageTime: true
      //                 })}
      //               />
      //             )}
      //             {/* 半成品工艺已完成耗时=完成时间-状态环节创建时间-异常时间 */}
      //             {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_HALF_SECOND_CRAFT
      //             && row.processNodeState === '2' && (
      //               <span
      //                 v-html={handleCostTime({
      //                   row,
      //                   currentTimeKey: 'semiCraftFinishTime',
      //                   stepCreatedTimeKey: 'semiCraftCreatedTime',
      //                   stepTimeConsuming: 'stepExceptionTimeConsuming',
      //                   hasMinus: true,
      //                   isBeforeStageTime: true
      //                 })}
      //               />
      //             )}
      //           </>
      //         )}
      //       </>
      //     );
      //   }
      // },
      {
        label: '创建时间',
        minWidth: '120',
        render(row) {
          console.log(row.processNode, row.processNodeState);
          return (
            <>
              {mode === 'cut' && <span>{filters.formatTime(row.allocateFinishTime)}</span>}
              {mode === 'slice' && <span>{filters.formatTime(row.sliceCraftCreatedTime)}</span>}
            </>
          );
        },
      },
      {
        label: '提交时间',
        minWidth: '120',
        render(row) {
          return (
            <>
              {mode === 'cut' && <span>{filters.formatTime(row.cutFinishTime)}</span>}
              {mode === 'slice' && <span>{filters.formatTime(row.sliceCraftFinishTime)}</span>}
            </>
          );
        },
      },
      {
        label: '操作记录',
        width: '150px',
        fixed: 'right',
        render(row) {
          return (
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
                    onClick={() => handleOperateLog(row.clothesId!)}
                  >
                    操作日志
                  </el-button>
                )
              }}
            />
          );
        }
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
