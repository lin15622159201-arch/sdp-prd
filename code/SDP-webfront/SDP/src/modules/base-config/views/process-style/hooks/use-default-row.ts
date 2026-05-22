import { filters } from '@/core/plugins/filter';
import { DEFAULT_MINUTE_WAGE, PROCESS_ENUM, PROCESS_LIST } from '@/modules/base-config/constant';

/**
 * 获取默认行数据
 * @returns 返回默认值
 */
export function useDefaultRow() {
  // 其他默认行数据
  const getAnotherDefaultRow = (val: PROCESS_ENUM) => {
    return {
      processStepCode: val,
      processStepName: filters.getEnumLabel(PROCESS_LIST, val),
      dosage: '1',
      position: '',
      price: '',
      remark: '',
      unit: '2',
    };
  };

  // 车缝默认行数据
  const sewingDefaultRow = {
    processStepCode: PROCESS_ENUM.CAR,
    processStepName: filters.getEnumLabel(PROCESS_LIST, PROCESS_ENUM.CAR),
    componentName: '',
    estimatedTime: '',
    minuteWage: DEFAULT_MINUTE_WAGE,
    amount: '',
    picture: [] as unknown as string,
    plmSewingName: '',
    plmSewingType: '',
    processDescribe: '',
    processName: '',
    remark: '',
  };

  // 裁剪 默认行数据
  const cropDefaultRow = getAnotherDefaultRow(PROCESS_ENUM.CROP);
  // 专机/手工 默认行数据
  const manualDefaultRow = getAnotherDefaultRow(PROCESS_ENUM.MANUAL);
  // 后道 默认行数据
  const afterDefaultRow = getAnotherDefaultRow(PROCESS_ENUM.AFTER);

  return {
    sewingDefaultRow,
    cropDefaultRow,
    manualDefaultRow,
    afterDefaultRow,
  };
}
