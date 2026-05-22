import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  QC_CRAFT_LIST, REMARK_BIZ_TYPE_ENUMS, SAMPLE_TYPE_LIST, MAKE_CLOTHES_TYPE_LIST
} from '@/modules/clothes-center/constant';
import { filters } from '@/core/plugins/filter';
import { remarkAdd } from '@/modules/clothes-center/api';
import {
  IPatternClothesQueryByPageResListItem
} from '../../../api/types';
import { YES_NO_ENUM } from '@/constant/global';
import { usePermissionConfig } from '../../../use-permission-config';
import { TABS_LIST } from '../constant';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';
import { PAGE_TYPE_STATUS_ENUM } from '../../../constant';

interface IParams {
  handleEdit: (row: IPatternClothesQueryByPageResListItem, behavior: string) => void;
  viewProcessOrder: (row: IPatternClothesQueryByPageResListItem) => void;
  reloadFn: () => void;
  handleOperateLog: (clothesId: string) => void;
}

export const useListColumns = ({ handleEdit, viewProcessOrder, reloadFn, handleOperateLog }: IParams) => {
  const { NBXQ, NBBJ } = usePermissionConfig();
  const { handleCostTime } = useTimerangeDistance();

  // 添加备注
  const handleCreateRecord = async (row: IPatternClothesQueryByPageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.clothesId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };
  const { columns } = useTableColumns<IPatternClothesQueryByPageResListItem>(() => {
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
            <div class='tw-text-left'>
              <p>{filters.getEnumLabel(SAMPLE_TYPE_LIST, row.sampleType!)}</p>
              <p>{filters.getEnumLabel(MAKE_CLOTHES_TYPE_LIST, row.makeClothesType!)}</p>
            </div>
          );
        }
      },
      {
        label: '任务状态',
        width: '120',
        render: (row) => {
          return (
            <>
              {NBXQ.value ? (
                <el-button
                  onClick={() => handleEdit(row, 'view')}
                  type='primary'
                  text
                >
                  {filters.getEnumLabel(TABS_LIST, row.processNodeState!)}
                  {row.patternVersionNum ? `-${row.patternVersionNum}` : ''}
                </el-button>
              ) : (
                <>
                  {filters.getEnumLabel(TABS_LIST, row.processNodeState!)}
                  {row.patternVersionNum ? `-${row.patternVersionNum}` : ''}
                </>
              )}
            </>

          );
        }
      },
      {
        label: '二次工艺&裁剪方法',
        minWidth: '150',
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
        minWidth: '120',
        render(row) {
          return (
            <div class='tw-text-left'>
              <div>
                设计师：
                { row.designerName || '-' }
              </div>
              <div>
                纸样师：
                {row.patternMakerName || '-'}
              </div>
              <div>
                审版工艺师：
                { row.reviewCraftsmanName || '-' }
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
      //         {/* 待接单、待提交耗时=当前时间-对应加工单版本任务数据最新完成纸样/3D分单的时间-异常时间 */}
      //         {row.processNodeState === PAGE_TYPE_STATUS_ENUM.WAIT && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'seperateFinishTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 已提交耗时=首次提交-对应加工单版本任务数据最新完成纸样/3D分单的时间-异常时间 */}
      //         {row.processNodeState === PAGE_TYPE_STATUS_ENUM.SUBMIT && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: 'firstFinishTime',
      //               stepCreatedTimeKey: 'seperateFinishTime',
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
          return filters.formatTime(row.seperateFinishTime);
        },
      },
      {
        label: '提交时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.patternFinishTime);
        },
      },
      {
        label: '操作记录',
        width: '150',
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
                {(NBBJ.value && row.isLatest === YES_NO_ENUM.YES) && (
                  <el-button
                    type='primary'
                    onClick={() => handleEdit(row, 'modify')}
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
