import { useTableColumns } from '@toy/business-components';
import {
  changeUserEnableState,
  updateRoomUser
} from '@/modules/distribute-room-manage/api';
import type {
  IClothingRoomRoomTeamItem,
} from '@/modules/distribute-room-manage/api/types';
import { ElMessageBox, ElMessage } from 'element-plus';
import { usePermissionConfig } from '../../../../use-permission-config';
import { ComputedRef } from 'vue';

interface IParams {
  roomId: ComputedRef<string>;
  reloadFn: () => void;
  getPlaylist: () => void;
}

export const useListColumns = ({ roomId, getPlaylist }: IParams) => {
  const { BJ, TYQY } = usePermissionConfig();
  const handleEditMember = (row: IClothingRoomRoomTeamItem) => {
    row.isModify = !row.isModify;
  };
  const handleChangeUserState = async (row: IClothingRoomRoomTeamItem) => {
    const openTxt = row.isEnabled === '1' ? '停用' : '启用';
    await ElMessageBox.confirm(`确定${openTxt}该成员？`, openTxt, { type: 'warning' });
    await changeUserEnableState(row.userId);
    getPlaylist();
  };

  const handleSaveMember = async (row: IClothingRoomRoomTeamItem) => {
    try {
      if (!row.userName) {
        ElMessage.error('请输入姓名');
        return;
      }
      await updateRoomUser({
        userId: row.userId,
        userName: row.userName,
        roomId: roomId.value,
        userRoles: row.userRoles,
        serviceType: row.serviceType,
        goodAtCategory: row.goodAtCategory,
      });
      row.isModify = !row.isModify;
      getPlaylist();
    } catch (error) {
      console.log(error);
    }
  };

  const { columns } = useTableColumns<IClothingRoomRoomTeamItem>(() => {
    return [
      {
        label: '序号',
        type: 'index',
        minWidth: '100',
      },
      {
        label: '姓名',
        minWidth: '120',
        render(row) {
          return (
            <span>
              {row.isModify ? (<el-input v-model={row.userName} placeholder='请输入姓名' />) : (<span>{row.userName}</span>)}
            </span>
          );
        }
      },
      {
        label: '手机号',
        minWidth: '120',
        prop: 'phone',
      },
      {
        label: '角色',
        minWidth: '120',
        render(row) {
          return (
            <>
              {row.userRoles && row.userRoles.map((item, index) => {
                return (
                  <>
                    {index !== 0 && <span>，</span>}
                    <span>
                      { item.roleName }
                    </span>
                  </>
                );
              })}
            </>
          );
        }
      },
      {
        label: '操作',
        width: '180',
        fixed: 'right',
        render(row) {
          return (
            <div>
              {!row.isModify && (
                <>
                  {BJ.value && row.isEnabled === '1' && (
                    <el-button
                      type='primary'
                      text
                      onClick={() => handleEditMember(row)}
                    >
                      编辑
                    </el-button>
                  )}
                  {TYQY.value && (
                    <el-button
                      type='primary'
                      text
                      onClick={() => handleChangeUserState(row)}
                    >
                      { row.isEnabled === '1' ? '停用' : '启用' }
                    </el-button>
                  )}
                </>
              )}
              {BJ.value && row.isModify && (
                <el-button
                  type='primary'
                  text
                  onClick={() => handleSaveMember(row)}
                >
                  保存
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
