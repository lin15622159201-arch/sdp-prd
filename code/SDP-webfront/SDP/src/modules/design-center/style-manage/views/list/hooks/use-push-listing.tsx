import {
  updonShelves,
} from '@/modules/design-center/style-manage/api/index';
import { ElMessage, ElMessageBox } from 'element-plus';

export const handleBatchAbort = async (designCodes: string[], cb?: Function) => {
  await ElMessageBox.confirm('确定要上架吗?', '提示', {
    type: 'warning'
  });
  updonShelves(designCodes).then(() => {
    ElMessage.success('上架成功');
    cb && cb();
  }).catch(() => {
    cb && cb();
  });
};
