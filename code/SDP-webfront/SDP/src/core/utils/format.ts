import { TIME_CONSUMING_TYPE_ENUM } from '@/constant';

/**
 * 清除所有空格
 */
export const removeAllSpace = (str: string) => {
  return str.replace(/\s/g, '');
};

// 过滤掉空字符串字段的函数
export function filterEmptyFields<T extends Object>(obj: T) {
  const isHasEmptyArray = (value: any) => Array.isArray(value) && value.length === 0;

  const isEmptyString = (value: any) => typeof value === 'string' && value === '';

  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => !(isEmptyString(value) || isHasEmptyArray(value)))
  ) as T;
}
/**
 * 输入框内容提取
 */
export const handleBatchSearchParam = (val: string) => {
  const reg = /[，。.；;、 \r\n]/g;
  const str = val?.trim() || '';
  const value = str.replace(reg, ',');
  const values = value.split(',').filter(i => !!i);
  return {
    values,
    value: values.join(','),
  };
};

/**
 * 处理耗时查询参数
 * @param timeConsumingType
 * @param timeConsumingStart
 * @param timeConsumingEnd
 * @returns
 */
export const handleTimeConsuming = (
  timeConsumingType: TIME_CONSUMING_TYPE_ENUM,
  timeConsumingStart?: number | string,
  timeConsumingEnd?: number | string
) => {
  const timeConsumingData: any = {
    timeConsumingStartDay: null,
    timeConsumingEndDay: null,
    timeConsumingStartHour: null,
    timeConsumingEndHour: null,
    timeConsumingStartMinute: null,
    timeConsumingEndMinute: null
  };

  switch (timeConsumingType) {
    case TIME_CONSUMING_TYPE_ENUM.DAY: // 按天
      timeConsumingData.timeConsumingStartDay = timeConsumingStart;
      timeConsumingData.timeConsumingEndDay = timeConsumingEnd;
      break;
    case TIME_CONSUMING_TYPE_ENUM.HOUR: // 按小时
      timeConsumingData.timeConsumingStartHour = timeConsumingStart;
      timeConsumingData.timeConsumingEndHour = timeConsumingEnd;
      break;
    case TIME_CONSUMING_TYPE_ENUM.MIN: // 按分钟
      timeConsumingData.timeConsumingStartMinute = timeConsumingStart;
      timeConsumingData.timeConsumingEndMinute = timeConsumingEnd;
      break;
    default:
      console.error('Invalid timeConsumingType');
  }

  return timeConsumingData;
};

/**
 * 二维字符串数组 与 字符串 互相转换
 * 约定：
 *   行内用 "," 分隔
 *   行与行之间用 ";" 分隔
 * [[a,b],[c,d]] <=> "a,b;c,d"
 */
export const StringMatrixHelper = {
  /**
   * [[a,b], [], [c,d]] => "a,b;;c,d"
   */
  toString(matrix: string[][]): string {
    if (!matrix?.length) return '';

    return matrix
      .map(row => row.join(',')) // 空行 => ''
      .join(';'); // 空行保持为两个 ; 之间的空字符串
  },

  /**
   * "a,b;;c,d" => [["a","b"], [], ["c","d"]]
   */
  fromString(str: string): string[][] {
    if (!str) return [];

    return str.split(';').map((rowStr) => {
      // 空行："" => []
      if (rowStr === '') return [];

      // rowStr 是 "a,b" 或 "a,,b"
      return rowStr.split(',');
    });
  },
};
