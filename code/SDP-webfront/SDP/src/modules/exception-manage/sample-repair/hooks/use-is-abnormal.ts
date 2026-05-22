import { YES_NO_ENUM } from '@/constant';
import { ElMessage } from 'element-plus';

const useIsAbnormal = () => {
  /**
   * 选中的数据是否有异常
   * @param rows 当前选择的行数据
   * @returns boolean true:有异常数据，false:无异常数据
   */
  const isAbnormalRows = (rows: Record<string, any> & { isAbnormal: string; }[]) => {
    const r = rows.some(item => item.isAbnormal === YES_NO_ENUM.YES);
    if (r) {
      ElMessage.error('选中的数据中存在异常，请先处理异常数据！');
    }
    return r;
  };
  return {
    isAbnormalRows,
  };
};

export default useIsAbnormal;
