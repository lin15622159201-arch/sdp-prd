import type { IdictValuesItem } from '@/api/dict/types';

export interface ISizeItemChildrenItem {
  label: string;
  value: string;
}
export interface ISizeItem extends IdictValuesItem {
  children: ISizeItemChildrenItem[];
}

export interface ISizeRange {
  rangeMap: Record<string, { start: number; end: number; }>;
  baseSizeIndex: number | null;
}
