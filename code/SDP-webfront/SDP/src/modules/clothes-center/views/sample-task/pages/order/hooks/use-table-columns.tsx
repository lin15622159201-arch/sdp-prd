import { useTableColumns, ITableColumnsItem } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  QC_CRAFT_LIST, REMARK_BIZ_TYPE_ENUMS, SAMPLE_TYPE_LIST, MAKE_CLOTHES_TYPE_LIST
} from '@/modules/clothes-center/constant';
import { IDimensionPageResListItem } from '../../../api/types';
import { filters } from '@/core/plugins/filter';
import { remarkAdd } from '@/modules/clothes-center/api';
import { YES_NO_ENUM } from '@/constant/global';
import { Ref, computed } from 'vue';
import { TABS_ENUM } from '../list/constant';
import { STATUS_LIST, STATUS_LIST_ENUM } from '../../../constant';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';

interface IParams {
  viewProcessOrder: (row: IDimensionPageResListItem) => void;
  reloadFn: () => void;
  handleOperateLog: (clothesId: string) => void;
  activeTab: Ref<TABS_ENUM>;
}

export const useListColumns = ({ viewProcessOrder, reloadFn, handleOperateLog, activeTab }: IParams) => {
  const { handleCostTime } = useTimerangeDistance();

  const roomCongig = computed(() => {
    if (activeTab.value === TABS_ENUM.DISPATCH) {
      return [{
        label: '分单结果',
        width: '120',
        prop: 'roomName',
      }];
    }
    return [];
  });
  // 添加备注
  const handleCreateRecord = async (row: IDimensionPageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.clothesId,
      bizType: REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };
  const { columns } = useTableColumns<IDimensionPageResListItem>(() => {
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
        label: 'SKC',
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
        prop: 'prototype',
        render: (row) => {
          return (
            <div class='tw-text-left'>
              <p>{filters.getEnumLabel(SAMPLE_TYPE_LIST, row.sampleType!)}</p>
              <p>{filters.getEnumLabel(MAKE_CLOTHES_TYPE_LIST, row.makeClothesType!)}</p>
            </div>
          );
        }
      },
      {
        label: '分单状态',
        width: '120',
        prop: 'isAllocated',
        type: 'enum',
        options: STATUS_LIST,
      },
      ...roomCongig.value.map<ITableColumnsItem<IDimensionPageResListItem>>((item: any) => ({ ...item })),
      {
        label: '二次工艺',
        minWidth: '150',
        render(row) {
          return (
            <div class='desc-lis tw-text-left'>
              {row.craftList.map(item => (
                <div class='tw-py-5px'>
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
            <div class='tw-text-left'>
              <div>
                设计师：
                { row.designerName || '-' }
              </div>
              <div>
                分单员：
                {row.allocateeName || '-' }
              </div>
              <div>
                纸样师：
                {row.patternMakerName || '-' }
              </div>
              <div>
                审版工艺师：
                {row.reviewCraftsmanName || '-'}
              </div>
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
      //         {/* 待分单耗时：当前时间-数据创建时间-异常时间 */}
      //         {row.isAllocated === STATUS_LIST_ENUM.WAIT && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'seperateStartTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 已分单耗时：首次完成分单的时间-数据创建时间-异常时间 */}
      //         {row.isAllocated === STATUS_LIST_ENUM.COMPLETED && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: 'firstSeperateFinishTime',
      //               stepCreatedTimeKey: 'seperateStartTime',
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
          return filters.formatTime(row.seperateStartTime);
        },
      },
      {
        label: '提交时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.seperateFinishTime);
        },
      },
      {
        label: '操作记录',
        width: '110',
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
                    onClick={() => handleOperateLog(row.clothesId)}
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
