import { ElMessageBox, ElMessage } from 'element-plus';
import type { IRowProps, IOptions, IPaperGroupUser } from './type';

export const selectionChange = (lists: IRowProps[]) => lists?.map((item: IRowProps) => item.id);

export const useHandleOpen = async (options: IOptions) => {
  const { selectedIds, api, callback } = options;
  if (selectedIds?.length === 0) {
    ElMessage.warning({
      message: '请选择需要启用的记录',
      type: 'warning',
    });
    return;
  }
  await ElMessageBox.confirm('是否确认启用?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await api({
    enabled: 1,
    ids: selectedIds,
  });
  ElMessage.success({
    message: '已成功启用',
    type: 'success',
  });
  callback?.();
};

export const useHandleClose = async (options: IOptions) => {
  const { selectedIds, api, callback } = options;
  if (selectedIds?.length === 0) {
    ElMessage.warning({
      message: '请选择需要停用的记录',
      type: 'warning',
    });
    return;
  }
  await ElMessageBox.confirm('是否确认停用?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await api({
    enabled: 0,
    ids: selectedIds,
  });

  ElMessage.success({
    message: '已成功停用',
    type: 'success',
  });
  callback && callback();
};

export const useHandleDelete = async (options: IOptions) => {
  const { id, api, callback } = options;
  await ElMessageBox.confirm('是否确认删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await api({
    id,
  });
  ElMessage.success({
    message: '删除成功',
    type: 'success',
  });
  callback && callback();
};

export const useHandleTransfor = async (options: IOptions) => {
  const { id, designerGroupCode, designerGroupName, api, callback } = options;
  await api({
    id,
    designerGroupCode,
    designerGroupName,
  });

  ElMessage.success({
    message: '转移成功',
    type: 'success',
  });
  callback && callback();
};

export async function useStateOpen(options: IOptions) {
  const { selectedIds, api, callback, requestParams } = options;
  if (selectedIds?.length === 0) {
    ElMessage.warning({
      message: '请选择需要启用的记录',
      type: 'warning',
    });
    return;
  }
  await ElMessageBox.confirm('是否确认启用?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await api(requestParams);
  ElMessage.success({
    message: '已成功启用',
    type: 'success',
  });
  callback && callback();
}

export const useStateClose = async (options: IOptions) => {
  const { selectedIds, api, callback, requestParams } = options;
  if (selectedIds?.length === 0) {
    ElMessage.warning({
      message: '请选择需要停用的记录',
      type: 'warning',
    });
    return;
  }
  await ElMessageBox.confirm('是否确认停用?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await api(requestParams);

  ElMessage.success({
    message: '已成功停用',
    type: 'success',
  });
  callback?.();
};

export const paperGroupUserTransfor = async (options: IPaperGroupUser) => {
  const { groupCode, groupUserId, api, callback } = options;
  await api({
    groupUserId,
    groupCode,
  });

  ElMessage.success({
    message: '转移成功',
    type: 'success',
  });
  callback?.();
};
