import type { Ref } from 'vue';
import { watch } from 'vue';
import { remarksBatchList, remarksBatchBizList } from '@/modules/design-center/material-analy/api';

/* 备注接口 填充 tableData */
export function useTableDataMapRemark<T, C=any>(
  tableData: Ref<T[]>,
  code: keyof T,
  remarkKey: keyof T | keyof C,
  childrenKey?: keyof T
) {
  watch(tableData, async (newTableData) => {
    const designCodes = newTableData.map(item => item[code] || '').filter(Boolean) as string[];
    if (!designCodes.length) return;
    const { data } = await remarksBatchList({
      designCodes,
    });
      /* 填充 remark */
    newTableData.forEach((item: T) => {
      const designCodeValue = item[code];
      const remark = data[designCodeValue];
      if (childrenKey && item[childrenKey] instanceof Array) {
        (item[childrenKey] as any).forEach((childItem: C) => {
          childItem[remarkKey as keyof C] = remark;
        });
      }
      item[remarkKey as keyof T] = remark || [];
    });
  });
}

/* 备注接口 根据业务id填充 tableData */
export function useTableDataMapBizRemark<T, C=any>(
  tableData: Ref<T[]>,
  bizId: keyof T,
  remarkKey: keyof T | keyof C,
  childrenKey?: keyof T,
) {
  watch(tableData, async (newTableData) => {
    const bizIds = newTableData?.map(item => item[bizId] || '').filter(Boolean) as (number | string)[] ?? [];
    if (!bizIds.length) return;

    const { data } = await remarksBatchBizList({
      bizIds,
    });
      /* 填充 remark */
    newTableData.forEach((item: T) => {
      const bizValue = item[bizId];
      const remark = data[bizValue];
      if (childrenKey && item[childrenKey] instanceof Array) {
        (item[childrenKey] as any).forEach((childItem: C) => {
          childItem[remarkKey as keyof C] = remark;
        });
      }
      item[remarkKey as keyof T] = remark || [];
    });
  });
}
