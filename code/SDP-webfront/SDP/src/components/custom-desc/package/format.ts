// import { showLabelByEnum } from '@/core/plugins/filter/index';
import { getLabelByVal } from '@/core/plugins/filter';
import type { MapValueObj } from './types';
import { formatTime, phoneFormat } from '@toy/utils';

export default {
  'name-code': (
    name: string,
    data: Record<string, any>,
    codeKey: string,
  ) => {
    return `${name || '-'} (${data[codeKey] || '-'})`;
  },
  'name-mobile': (
    name: string,
    data: Record<string, any>,
    codeKey: string,
  ) => {
    return `${name || '-'} (${phoneFormat(data[codeKey]) || '-'})`;
  },
  time: (time: string | number) => formatTime(time),
  date: (time: string | number) => formatTime(time, 'YYYY-MM-DD'),
  enum: (
    val: string,
    data: Record<string, any>,
    codeKey: string,
    mapVal: MapValueObj,
  ) => getLabelByVal(mapVal.enum!, val),
};
