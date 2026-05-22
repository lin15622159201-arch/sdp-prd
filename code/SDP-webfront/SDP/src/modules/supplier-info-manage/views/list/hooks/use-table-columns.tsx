import { useTableColumns } from '@toy/business-components';
import { IClothingRoomListListItem } from '@/modules/distribute-room-manage/api/types';
import { filters } from '@/core/plugins/filter';
import { usePermissionConfig } from '../../use-permission-config';
import { OPERATION_TYPE_LIST, ROOM_ENABLE_LIST } from '@/modules/distribute-room-manage/constant';

interface IParams {
  handleToDetail: (row: IClothingRoomListListItem) => void;
}

export const useListColumns = ({ handleToDetail }: IParams) => {
  const { XQ } = usePermissionConfig();
  const { columns } = useTableColumns<IClothingRoomListListItem>(() => {
    return [
      {
        label: '供应商编号',
        minWidth: '120',
        prop: 'roomCode',
      },
      {
        label: '供应商名称',
        minWidth: '120',
        prop: 'roomName',
      },
      {
        label: '经营类型',
        minWidth: '120',
        prop: 'operationType',
        type: 'enum',
        options: OPERATION_TYPE_LIST,
      },
      {
        label: '供应商地址',
        minWidth: '120',
        prop: 'styleCode',
        render(row) {
          // eslint-disable-next-line vue/max-len
          return `${row.roomAddressProvince || ''}${row.roomAddressCity || ''}${row.roomAddressArea || ''}${row.roomDetailAddress || ''}`;
        }
      },
      {
        label: '负责人信息',
        minWidth: '140',
        prop: 'styleCode',
        render(row) {
          return (
            <>
              <p>
                负责人：
                {row.roomContactName || '-'}
              </p>
              <p>
                联系电话：
                {row.roomContactPhone || '-'}
              </p>
            </>
          );
        }
      },
      {
        label: '启用状态',
        minWidth: '120',
        prop: 'enable',
        type: 'enum',
        options: ROOM_ENABLE_LIST,
      },
      {
        label: '时间',
        minWidth: '150',
        render(row) {
          return (
            <>
              <p>
                创建时间：
                {filters.formatTime(row.createdTime)}
              </p>
              <p>
                更新时间：
                {filters.formatTime(row.revisedTime)}
              </p>
            </>
          );
        }
      },
      {
        label: '操作',
        width: '100',
        fixed: 'right',
        render(row) {
          return (
            <div>
              {XQ.value && (
                <el-button
                  type='primary'
                  onClick={() => handleToDetail(row)}
                >
                  查看
                </el-button>
              )}
            </div>
          );
        }
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
