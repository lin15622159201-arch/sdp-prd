import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  MATERIAL_STATE_LIST, QC_CRAFT_LIST,
  REMARK_BIZ_TYPE_ENUMS, SAMPLE_TYPE_LIST, MAKE_CLOTHES_TYPE_LIST
} from '@/modules/clothes-center/constant';
import { YES_NO_ENUM } from '@/constant';
import { filters } from '@/core/plugins/filter';
import TagTooltip from '@/modules/design-center/components/tag-tooltip/index.vue';
import { remarkAdd } from '@/modules/clothes-center/api';
import { IMaterialPageResListItem, IMaterialPageResListItemCraftListItem } from '../api/types';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';

interface IProps {
  reloadFn: () => void;
  viewProcessOrder: (row: IMaterialPageResListItem) => void;
  handleOperateLog: (clothesId: string) => void;
}

export const useListColumns = ({ reloadFn, viewProcessOrder, handleOperateLog }: IProps) => {
  const { handleCostTime } = useTimerangeDistance();

  // 添加备注
  const handleCreateRecord = async (row: IMaterialPageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.clothesId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };
  const { columns } = useTableColumns<IMaterialPageResListItem>(() => {
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
              <div>
                <el-button type='primary' link onClick={() => viewProcessOrder(row)}>
                  {row.processCode}
                </el-button>
              </div>
              {row.isAbnormal === YES_NO_ENUM.YES && (
                <el-tag type='danger' class='tw-mr-[4px]'>
                  异常
                </el-tag>
              )}
              { row.isAddMaterial === YES_NO_ENUM.YES && (
                <el-tag type='warning' class='tw-mr-[4px]'>
                  补料
                </el-tag>
              )}
              {row.isRepair === YES_NO_ENUM.YES && (
                <TagTooltip
                  tooltip-type='repair'
                  row={row}
                >
                  <el-tag type='danger'>
                    返修
                  </el-tag>
                </TagTooltip>
              )}
              {row.isCancel === YES_NO_ENUM.YES && (
                <el-tag type='danger' class='tw-mr-[4px]'>
                  取消
                </el-tag>
              )}
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
        minWidth: '90',
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
                审版工艺师：
                {row.reviewCraftsmanName || '-'}
              </div>
            </>
          );
        }
      },
      {
        label: '签收状态',
        width: '120',
        prop: 'processNodeState',
        type: 'enum',
        options: MATERIAL_STATE_LIST,
      },
      {
        label: '二次工艺&裁剪方式',
        minWidth: '150',
        render(row) {
          return (
            <>
              <div>
                {row.craftList.map((item: IMaterialPageResListItemCraftListItem) => {
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
      //         {/* 待齐套耗时：当前时间-数据创建时间-异常时间 */}
      //         {row.processNodeState === YES_NO_ENUM.NO && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'materialCreatedTime',
      //               stepTimeConsuming: 'stepExceptionTimeConsuming',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 已齐套耗时：齐套签收-数据创建-异常时间 */}
      //         {row.processNodeState === YES_NO_ENUM.YES && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: 'materialSignTime',
      //               stepCreatedTimeKey: 'materialCreatedTime',
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
          return filters.formatTime(row.materialCreatedTime);
        },
      },
      {
        label: '提交时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.materialSignTime);
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
