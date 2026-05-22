import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { STATUS_LIST, STATUS_LIST_ENUM } from '../constant';
import { filters } from '@/core/plugins/filter';
import {
  QC_CRAFT_LIST, REMARK_BIZ_TYPE_ENUMS, SAMPLE_TYPE_LIST, MAKE_CLOTHES_TYPE_LIST
} from '@/modules/clothes-center/constant';
import { YES_NO_ENUM } from '@/constant';
import { remarkAdd } from '@/modules/clothes-center/api';
import { ITakeOverPageResListItem } from '@/modules/clothes-center/views/prototype-handover/api/types';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';

interface IProps {
  reloadFn: () => void;
  viewProcessOrder: (row: ITakeOverPageResListItem) => void;
  handleOperateLog: (clothesId: string) => void;
}

export const useListColumns = ({ reloadFn, viewProcessOrder, handleOperateLog }: IProps) => {
  const { handleCostTime } = useTimerangeDistance();

  // 添加备注
  const handleCreateRecord = async (row: ITakeOverPageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.clothesId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };
  const { columns } = useTableColumns<ITakeOverPageResListItem>(() => {
    return [
      {
        type: 'selection',
        width: 50,
        selectable: row => row.isCancel === YES_NO_ENUM.NO
      },
      {
        label: '加工单号',
        minWidth: '120',
        render: (row) => {
          return (
            <div class='tw-text-left'>
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
            </div>
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
        prop: 'sampleAmount',
      },
      {
        label: '交接状态',
        minWidth: '120',
        prop: 'processNodeState',
        type: 'enum',
        options: STATUS_LIST,
      },
      {
        label: '二次工艺',
        minWidth: '90',
        render(row) {
          return (
            <div class='desc-lis'>
              {row.craftList.map(item => (
                <div class='tw-pd-5px'>
                  { item.craftsProcessName || filters.getEnumLabel(QC_CRAFT_LIST, item.craftsRequire || '')}
                  ：
                  {(item.nameList || []).join(';')}
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
        minWidth: '150',
        render(row) {
          return (
            <>
              <div>
                设计师：
                { row.designerName || '-' }
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
      //         {/* 已提交耗时=首次提及-创建时间-异常时间 */}
      //         {row.processNodeState === STATUS_LIST_ENUM.COMPLETED && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: 'firstTakeOverTime',
      //               stepCreatedTimeKey: 'takeOverStartTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 待提交耗时=当前时间-创建时间-异常时间 */}
      //         {row.processNodeState === STATUS_LIST_ENUM.WAIT && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'takeOverStartTime',
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
          return filters.formatTime(row.takeOverStartTime);
        },
      },
      {
        label: '提交时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.takeOverTime);
        },
      },
      {
        label: '操作记录',
        width: '150',
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
                    onClick={() => handleOperateLog(row.clothesId as string)}
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
