import { useTableColumns, ITableColumnsItem } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  QC_CRAFT_LIST, REMARK_BIZ_TYPE_ENUMS,
  SAMPLE_TYPE_LIST, MAKE_CLOTHES_TYPE_LIST,
  PROCESS_NODE_CODE_ENUM
} from '@/modules/clothes-center/constant';
import { filters } from '@/core/plugins/filter';
import { remarkAdd } from '@/modules/clothes-center/api';
import {
  ISewQueryByPageResListItem, ISampleQcPageResListItemCraftListItem
} from '@/modules/clothes-center/views/style-sew/api/types';
import { YES_NO_ENUM } from '@/constant/global';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';
import { Ref, computed } from 'vue';
import { TABS_ENUM } from '../constant';

interface IProps {
  activeTab: Ref;
  reloadFn: () => void;
  viewProcessOrder: (row: ISewQueryByPageResListItem) => void;
  handleOperateLog: (clothesId: string) => void;
}

export const useListColumns = ({ reloadFn, viewProcessOrder, handleOperateLog, activeTab }: IProps) => {
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

  const clos = computed(() => {
    if (activeTab.value !== TABS_ENUM.SEMI) {
      return [{
        label: '创建时间',
        minWidth: '120',
        render(row: ISewQueryByPageResListItem) {
          return (
            <>
              {/* 半成品 */}
              {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_HALF_SECOND_CRAFT
              && <span>{filters.formatTime(row.semiCraftCreatedTime)}</span>}
              {/* 待进行、已完成 */}
              {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS
              && ['0', '2'].includes(row.processNodeState!)
              && <span>{filters.formatTime(row.pendingTime)}</span>}
              {/* 车缝中 */}
              {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS
              && ['1'].includes(row.processNodeState!)
              && <span>{filters.formatTime(row.sewProgressTime)}</span>}
            </>
          );
        },
      },
      {
        label: '提交时间',
        minWidth: '120',
        render(row: ISewQueryByPageResListItem) {
          return (
            <>
              {/* 半成品 */}
              {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_HALF_SECOND_CRAFT
              && <span>{filters.formatTime(row.semiCraftFinishTime)}</span>}
              {/* 待进行 */}
              {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS && row.processNodeState === '0'
              && <span>{filters.formatTime(row.sewProgressTime)}</span>}
              {/* 车缝中、已完成 */}
              {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS
              && ['1', '2'].includes(row.processNodeState!)
              && <span>{filters.formatTime(row.sewFinishTime)}</span>}
            </>
          );
        },
      }];
    }
    return [];
  });
  const { columns } = useTableColumns<ISewQueryByPageResListItem>(() => {
    return [
      {
        type: 'selection',
        width: 50,
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
        prop: 'designCode',
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
        label: '车版件数',
        width: '120',
        prop: 'sampleAmount',
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
                裁剪师：
                { row.cutterName || '-' }
              </div>
              <div>
                车缝师：
                { row.sewerName || '-' }
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
        label: '任务状态',
        width: '120',
        prop: 'processNodeStateDesc',
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
      //         {/* 待进行耗时=当前时间-创建时间-异常时间 */}
      //         {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS && row.processNodeState === '0' && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'pendingTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 车缝中耗时=当前时间-环节状态创建时间-异常时间 */}
      //         {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS && row.processNodeState === '1' && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'sewProgressTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 已完成耗时=数据已完成时间-待进行创建时间-异常时间 */}
      //         {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS && row.processNodeState === '2' && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: 'sewFinishTime',
      //               stepCreatedTimeKey: 'pendingTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 半成品工艺进行中耗时=当前时间-状态环节创建时间-异常时间 */}
      //         {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_HALF_SECOND_CRAFT
      //         && row.processNodeState === '1' && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'semiCraftCreatedTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 半成品工艺已完成耗时=完成时间-状态环节创建时间-异常时间 */}
      //         {row.processNode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_HALF_SECOND_CRAFT
      //         && row.processNodeState === '2' && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: 'semiCraftFinishTime',
      //               stepCreatedTimeKey: 'semiCraftCreatedTime',
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
      ...clos.value.map<ITableColumnsItem<ISewQueryByPageResListItem>>((item: any) => item),
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
