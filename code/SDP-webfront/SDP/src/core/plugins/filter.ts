import { App } from 'vue';
import { useMenuStore } from '@/store/menu';
import { formatTime, isEmpty, toThousands } from '@toy/utils';
import { resizeImgByWidth } from './helper';

export interface LabelListItem<T extends unknown = string | number | boolean> {
  value: T;
  label: string;
}

export function getLabelByVal(arr: LabelListItem[], val: string | number | boolean) {
  const item = (arr.find(it => String(it.value) === String(val)) as LabelListItem) || {};
  return item.label || '';
}
export function showLabelByEnum<T extends Object>(_enum: T, key?: string) {
  if (key && key in _enum) {
    return _enum[key as keyof typeof _enum];
  }
  return '';
}
function getLabelByValList(arr: LabelListItem[], val: string[]) {
  const list: string[] = [];
  if (val && val.length) {
    val.forEach((item) => {
      arr.forEach((it) => {
        if (String(it.value) === String(item)) {
          list.push(it.label);
        }
      });
    });
  }
  return list.join('，') || '';
}
export const filters = {
  // 获取枚举标签
  getEnumLabel(list: LabelListItem[], val: string | number): string {
    return getLabelByVal(list, val);
  },
  showLabelByEnum,
  // 获取枚举标签(多个)
  getEnumLabels(list: LabelListItem[], val: string[]): string {
    return getLabelByValList(list, val);
  },
  // 时间格式化
  formatTime(date: string | number | Date | undefined, fmt = 'YYYY-MM-DD HH:mm:ss'): string {
    if (isEmpty(date)) return '';
    return formatTime(date, fmt, '');
  },
  // 金额格式化
  toThousands(num: number | string, defaultValue = '-'): string {
    return toThousands(num, defaultValue);
  },
  ossUrl: resizeImgByWidth
};

export const has = (code: string): boolean => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  const { authButtonList } = useMenuStore();
  return authButtonList.includes(code);
};
export type IFilters = typeof filters;
export type IHas = typeof has;
export default {
  install(app: App) {
    const { globalProperties } = app.config;
    globalProperties.$has = has;
    globalProperties.$filters = filters;
  },
};
