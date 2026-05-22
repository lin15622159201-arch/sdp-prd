// import { handleDownLoadFile } from '@/core/utils/download';
// import { getImgName } from './image';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useAccountStore } from '@/store/account';
import { pushBuyer } from '../api/index';
import { ISpotStylePageItem } from '../api/spot-style';
import { YES_NO_STRING_ENUM } from '@/constant';
import { PRODUCT_IMG_STATUS_LIST, RESOURCE_STATUS_LIST } from '../constant';

const accountStore = useAccountStore();
export const handleBatchDelete = async (dataList: any, cb?: Function) => {
  let mag = '';
  const list: ISpotStylePageItem[] = dataList.filter((v: ISpotStylePageItem) => !!v.taskCode);
  list.forEach((v1: ISpotStylePageItem) => {
    v1?.skcs?.forEach((v2: any) => {
      if (v2.dataCompleted === YES_NO_STRING_ENUM.NO) {
        mag = '请勾选款式资料为已完善的数据';
      }
    });
    if ((v1?.skcs.filter((v3: any) => v3.pushedBuyer === YES_NO_STRING_ENUM.NO).length === 0) && (v1?.skcs.filter((v3: any) => v3.pushFailed === YES_NO_STRING_ENUM.YES).length === 0)) {
      mag = '请勾选推送买手状态为待推送或推送失败';
    }
  });
  if (!list.length) {
    mag = '请勾选SPU的数据进行此操作';
  }
  if (mag) {
    ElMessage.error(mag);
    return;
  }
  await ElMessageBox.confirm('确定要推送吗?', '提示', {
    type: 'warning'
  });
  const taskIds: string[] = (list || []).map((v1: ISpotStylePageItem) => v1.taskId);
  await pushBuyer(taskIds);
  ElMessage.success('推送成功');
  cb && cb();
};
