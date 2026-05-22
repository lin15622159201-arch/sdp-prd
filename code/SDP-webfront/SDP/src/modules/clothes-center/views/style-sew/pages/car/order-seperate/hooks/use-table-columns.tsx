import { useTableColumns, ITableColumnsItem } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  ORDER_SEPERATE_STATE_LIST, QC_CRAFT_LIST, REMARK_BIZ_TYPE_ENUMS,
  SAMPLE_TYPE_LIST, MAKE_CLOTHES_TYPE_LIST
} from '@/modules/clothes-center/constant';
import { filters } from '@/core/plugins/filter';
import { remarkAdd } from '@/modules/clothes-center/api';
import { ISewQueryByPageResListItem } from '@/modules/clothes-center/views/style-sew/api/types';
import { YES_NO_ENUM } from '@/constant/global';
import { computed, Ref } from 'vue';
import { TABS_ENUM } from '../constant';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';

interface IProps {
  reloadFn: () => void;
  viewProcessOrder: (row: ISewQueryByPageResListItem) => void;
  handleOperateLog: (clothesId: string) => void;
  activeTab: Ref;
}

export const useListColumns = ({ reloadFn, viewProcessOrder, handleOperateLog, activeTab }: IProps) => {
  const { handleCostTime } = useTimerangeDistance();

  const roomCongig = computed(() => {
    if (activeTab.value === TABS_ENUM.FINISHED) {
      return [{
        label: '分单结果',
        width: '120',
        align: 'center',
        prop: 'roomName',
      }];
    }
    return [];
  });
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
        label: '分单状态',
        width: '120',
        prop: 'processNodeState',
        type: 'enum',
        options: ORDER_SEPERATE_STATE_LIST,
      },
      ...roomCongig.value.map<ITableColumnsItem<ISewQueryByPageResListItem>>((item: any) => ({ ...item })),
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
            <>
              <p>
                设计师：
                { row.designerName || '-' }
              </p>
              <p>
                纸样师：
                { row.patternMakerName || '-' }
              </p>
              <p>
                分单员：
                { row.allocateeName || '-' }
              </p>
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
      //         {/* 待分单耗时：当前时间-数据创建时间-异常时间 */}
      //         {row.processNodeState === YES_NO_ENUM.NO && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'allocateCreatedTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 已分单耗时：首次完成分单的时间-数据创建时间-异常时间 */}
      //         {row.processNodeState === YES_NO_ENUM.YES && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: 'firstAllocateFinishTime',
      //               stepCreatedTimeKey: 'allocateCreatedTime',
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
          return filters.formatTime(row.allocateCreatedTime);
        },
      },
      {
        label: '提交时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.allocateFinishTime);
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
                    disabled={row.isCancel === YES_NO_ENUM.YES}
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
