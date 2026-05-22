import { useTableColumns, ITableColumnsItem } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { IStyleInfoPageResListItem, IStyleInfoPageReq } from '../../../../api/types';
import { orderInfoRemarkAdd } from '@/modules/style-data-manage/large/api';
import {
  REMARK_BIZ_TYPE_ENUMS, STYLE_INFO_IS_ALLOCATED_LIST,
  STYLE_INFO_IS_ALLOCATED_ENUM
} from '@/modules/style-data-manage/large/constant';
import { computed, Ref } from 'vue';
import { YES_NO_ENUM } from '@/constant';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';
import { filters } from '@/core/plugins/filter';

interface IParams {
  params: Ref<IStyleInfoPageReq>;
  reloadFn: () => void;
  handleOperateLog: (bizCode: string) => void;
}

export const useListColumns = ({ reloadFn, handleOperateLog, params }: IParams) => {
  const { handleCostTime } = useTimerangeDistance();

  const roomCongig = computed(() => {
    if (params.value.isAllocated === STYLE_INFO_IS_ALLOCATED_ENUM.YES) {
      return [{
        label: '分单结果',
        width: '120',
      }];
    }
    return [];
  });
  // 添加备注
  const handleCreateRecord = async (row: IStyleInfoPageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.styleInfoId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.PRO,
      remark,
    };
    await orderInfoRemarkAdd(remarkParams);
    await reloadFn();
  };
  const { columns } = useTableColumns<IStyleInfoPageResListItem>(() => {
    return [
      {
        width: '60',
        align: 'center',
        type: 'selection',
        selectable: row => row.isCancel === YES_NO_ENUM.NO
      },
      {
        label: 'SPU',
        minWidth: '150',
        render(row) {
          return (
            <div>
              <sc-copy-text text={row.styleCode} />
              {row.isCancel === YES_NO_ENUM.YES && (
                <el-tag type='danger'>取消</el-tag>
              )}
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
          const pictureList = (row.customerPicture || '').split(',').filter(Boolean);
          const images = [...skcShelvePictureList, ...spuShelvePictureList, ...pictureList];
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
        label: '分单状态',
        minWidth: '120',
        prop: 'isAllocated',
        type: 'enum',
        options: STYLE_INFO_IS_ALLOCATED_LIST,
      },
      ...roomCongig.value.map<ITableColumnsItem<IStyleInfoPageResListItem>>((item: any) => ({
        ...item,
        render(row) {
          return (
            row.roomId === '1' ? '内部' : row.roomName
          );
        },
      })),
      {
        label: '款式品类',
        minWidth: '90',
        prop: 'styleTypeName',
      },
      {
        label: '相关人员',
        minWidth: '90',
        render(row) {
          return (
            <div>
              分单员：
              { row.allocateeName || '-' }
            </div>
          );
        }
      },
      {
        label: '耗时',
        minWidth: '120',
        render: (row) => {
          // 需要 row 、当前时间、创建时间
          return (
            <>
              {/* 待分单耗时：当前时间-数据创建时间 */}
              {row.isAllocated === STYLE_INFO_IS_ALLOCATED_ENUM.NO && (
                <span
                  v-html={handleCostTime({
                    row,
                    currentTimeKey: '',
                    stepCreatedTimeKey: 'firstCreatedTime',
                    hasMinus: true,
                    isBeforeStageTime: true
                  })}
                />
              )}
              {/* 已分单耗时：首次完成分单的时间-数据创建时间 */}
              {row.isAllocated === STYLE_INFO_IS_ALLOCATED_ENUM.YES && (
                <span
                  v-html={handleCostTime({
                    row,
                    currentTimeKey: 'firstSeperateFinishTime',
                    stepCreatedTimeKey: 'firstCreatedTime',
                    hasMinus: true,
                    isBeforeStageTime: true
                  })}
                />
              )}
            </>
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
                    onClick={() => handleOperateLog(row.styleCode!)}
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
