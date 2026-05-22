import { TASK_STATUS_ENUM } from '@/constant/task';
import { useAccountStore } from '@/store/account';
import { usePermissionConfig } from '../../use-permission-config';
import { IReplaceColorTaskPageItem } from '../../api/type';

/**
 * 检查权限
 */
export const usePermissionCheck = () => {
  const { account } = useAccountStore();
  const { ZZ, SC, CS, FZ } = usePermissionConfig();

  const isMe = (userId: string) => userId === account?.id;

  const canTaskRemove = ((row: IReplaceColorTaskPageItem) => SC.value && isMe(row.creatorId) && [TASK_STATUS_ENUM.FAILED, TASK_STATUS_ENUM.TIMEOUT, TASK_STATUS_ENUM.ABORTED].includes(row.taskStatus));
  const canTaskStop = (row: IReplaceColorTaskPageItem) => ZZ.value && isMe(row.creatorId) && [TASK_STATUS_ENUM.QUEUEING, TASK_STATUS_ENUM.GENERATING].includes(row.taskStatus);
  const canTaskRetry = (row: IReplaceColorTaskPageItem) => CS.value && isMe(row.creatorId) && [TASK_STATUS_ENUM.FAILED, TASK_STATUS_ENUM.TIMEOUT, TASK_STATUS_ENUM.ABORTED].includes(row.taskStatus);
  const canTaskCopy = () => FZ.value;

  return {
    canTaskRemove,
    canTaskStop,
    canTaskRetry,
    canTaskCopy,
    isMe
  };
};
