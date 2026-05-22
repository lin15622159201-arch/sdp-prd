import { cloneDeep } from 'lodash-es';

interface CostTimeOptions<T=any> {
  row: T;
  deliveryTimeKey?: string;
  currentTimeKey?: string;
  isReturnDesc?: boolean;
}

interface AgingTimeOptions<T=any> {
  row: T;
  currentTimeKey?: string;
  stepCreatedTimeKey?: string;
  isReturnDesc?: boolean;
  hasMinus?: boolean;
  stepTimeConsuming?: string;
  isBeforeStageTime?: boolean;
}

/**
 * 提供时间戳间隔转换
 */
function useTimerangeDistance() {
  const handleTimerangeDistance = (distance: number, isReturnDesc: boolean = true, hasMinus: boolean = false) => {
    if (!distance && distance !== 0) {
      return '-';
    }
    let runTime = distance / 1000;
    const isNegative = runTime <= 0;
    runTime = isNegative ? Math.abs(runTime) : runTime;

    const day = Math.floor(runTime / 86400);
    runTime %= 86400;

    let hour: string | number = (runTime / 3600).toFixed(2);
    let minute: string | number = '';

    // 是否精确到分钟展示
    if (hasMinus) {
      hour = Math.floor(runTime / 3600);
      runTime %= 3600;

      minute = Math.floor(runTime / 60);
    }
    const desc = isNegative ? '剩' : '超';
    const color = isNegative ? '#409EFF' : '#F56C6C';
    // eslint-disable-next-line vue/max-len
    return `<span style="color:${color}">${isReturnDesc ? `${desc}&nbsp;` : ''}</span><span>${day}d&nbsp;${hour}h${hasMinus ? `&nbsp;${minute}m` : ''}</span>`;
  };

  // 时效
  const handleAgingTime = (options: CostTimeOptions) => {
    const {
      row,
      deliveryTimeKey = 'deliveryTime',
      currentTimeKey = 'currentTime',
      isReturnDesc = true,
    } = options;
    // currentTimeKey--当前时间   deliveryTimeKey--开发交期
    return handleTimerangeDistance(
      !row?.[currentTimeKey] && !row?.[deliveryTimeKey] ? 0
        : (row?.[currentTimeKey] || new Date().getTime()) - (row?.[deliveryTimeKey] || ''),
      isReturnDesc
    );
  };

  // 当前耗时
  const handleCostTime = (options: AgingTimeOptions) => {
    const {
      row,
      currentTimeKey = 'currentTime',
      stepCreatedTimeKey = 'processingStepCreatedTime',
      stepTimeConsuming = '', // 额外的时间差,单位分钟
      isReturnDesc = false,
      hasMinus = false,
      isBeforeStageTime = false, // 判断当前时间是否小于某个“环节生成时间”
    } = options;
    // currentTimeKey--当前时间   stepCreatedTimeKey--环节生成时间
    const currentTime = row?.[currentTimeKey] ?? new Date().getTime();
    const stepCreatedTime = row?.[stepCreatedTimeKey] ?? 0;
    let timeConsumed = (row?.[stepTimeConsuming] ?? 0) * 60 * 1000; // 换算毫秒
    let timeDifference = currentTime - stepCreatedTime;
    // 判断当前时间是否小于环节生成时间,即差值为负值，则置为0
    if (timeDifference < 0 && isBeforeStageTime) {
      timeDifference = 0;
      timeConsumed = 0;
    }
    const adjustedTime = !row?.[currentTimeKey] && !row?.[stepCreatedTimeKey] ? 0 : timeDifference;
    return handleTimerangeDistance(adjustedTime - timeConsumed, isReturnDesc, hasMinus);
  };

  function handleTimeRangeSplit<T extends object, K extends keyof T>(obj: T, keys: K[]) {
    const trans: any = cloneDeep(obj);
    keys.forEach((key) => {
      [trans[`${key as string}Start`] = '', trans[`${key as string}End`] = ''] = trans[key] || [];
      delete trans[key];
    });
    return trans;
  }
  return {
    // handleTimerangeDistance,
    handleAgingTime,
    handleCostTime,
    handleTimeRangeSplit,
  };
}

export { useTimerangeDistance };
