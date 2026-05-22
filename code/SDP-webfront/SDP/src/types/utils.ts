import type { App } from 'vue';

export type SFCWithInstall<T> = T & {
  install(app: App): void;
};

export interface ILabelListItem<T> {
  value: T;
  label: string;
}

/**
 * 让T中的属性部分变为可选
 */
export type PartiallyNullable<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null;
};
