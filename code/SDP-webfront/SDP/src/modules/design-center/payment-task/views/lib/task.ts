// import { handleDownLoadFile } from '@/core/utils/download';
// import { getImgName } from './image';
import {
  developStyleBatchDeletedApi,
  developStyleBatchbatchIdentifyApi,
} from '../../api';
import {
  DevelopStylePageResListItem,
} from '../../api/types';
import { ElMessage, ElMessageBox } from 'element-plus';
import { DESIGN_DEMAND_STATUS_TYPE, IDENTIFY_STATUS } from '../../constant/index';
import { useAccountStore } from '@/store/account';

const accountStore = useAccountStore();
export const handleBatchDelete = async (dataList: any, cb?: Function) => {
  let mag = '';
  if (dataList.filter((v: DevelopStylePageResListItem) => v.taskStatus !== DESIGN_DEMAND_STATUS_TYPE.WAIT_DISPATCH).length) {
    mag = '请勾选待审核的数据进行删除操作';
  }
  if (dataList.filter((v: DevelopStylePageResListItem) => v.creatorId !== accountStore.account?.id).length) {
    mag = '请勾选当前登录人创建的数据进行删除操作';
  }
  if (mag) {
    ElMessage.error(mag);
    return;
  }
  await ElMessageBox.confirm('确定要删除吗?', '提示', {
    type: 'warning'
  });
  const taskIds: string[] = dataList.filter((v: DevelopStylePageResListItem) => v.taskStatus === DESIGN_DEMAND_STATUS_TYPE.WAIT_DISPATCH && v.creatorId === accountStore.account?.id).map((v1: DevelopStylePageResListItem) => v1.taskId);
  await developStyleBatchDeletedApi(taskIds);
  ElMessage.success('删除成功');
  cb && cb();
};

// 批量识别
export const handleRecognize = async (dataList: DevelopStylePageResListItem[], cb?: Function) => {
  let mag = '';
  if (dataList.filter((v: DevelopStylePageResListItem) => ![DESIGN_DEMAND_STATUS_TYPE.WAIT_HANDLE, DESIGN_DEMAND_STATUS_TYPE.WAIT_DISPATCH].includes(v.taskStatus || 0)).length) {
    mag = '请勾选【待开款】【待审核】的数据进行识别操作';
  }
  if (dataList.filter((v: DevelopStylePageResListItem) => ![IDENTIFY_STATUS.FAILED].includes(v.identifyStatus || -1)).length) {
    mag = '请勾选AI识别状态为【失败】进行识别操作';
  }
  if (mag) {
    ElMessage.error(mag);
    return;
  }
  await ElMessageBox.confirm('确定要识别标签吗?', '提示', {
    type: 'warning'
  });
  const taskIds: string[] = dataList.map((v1: DevelopStylePageResListItem) => v1.taskId || '');
  await developStyleBatchbatchIdentifyApi(taskIds);
  ElMessage.success('操作成功');
  cb && cb();
};
