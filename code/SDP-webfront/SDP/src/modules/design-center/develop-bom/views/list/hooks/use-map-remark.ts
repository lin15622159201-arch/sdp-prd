import type { Ref } from 'vue';
import { watch } from 'vue';
import { remarksBatchList, remarksBatchBizList, remarksBatchBizToTypeList } from '@/modules/design-center/material-analy/api';

/* 备注接口 填充 tableData */
export function useTableDataMapRemark() {
  const format = async <T>(list: T[], code: keyof T): Promise<Array<T & { remark: string; }>> => {
    const designCodes = list.map(item => item[code] || '').filter(Boolean) as string[];
    if (!designCodes.length) return [];
    let data: any = {};
    try {
      ({ data } = await remarksBatchList({
        designCodes,
      }));
    } catch (error) {
      console.log('查询备注错误', error);
    }
    /* 填充 remark */
    return list.map((item) => {
      const designCodeValue = item[code];
      const remark = data[designCodeValue];
      return {
        ...item,
        remark
      };
    });
  };
  return {
    format
  };
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


const groupByTaskId = (tasks: any) => {
  return tasks.reduce((acc: any, current: any) => {
    const { taskId } = current;
    if (acc[taskId]) {
      acc[taskId].push(current);
    } else {
      acc[taskId] = [current];
    }
    return acc;
  }, {});
};

/* 备注接口 根据业务id填充 tableData */
export function useTableDataMapBizRemarkToStyle<T, C=any>(
  tableData: Ref<T[]>,
  bizId: keyof T,
  remarkKey: keyof T | keyof C,
  childrenKey?: keyof T,
) {
  watch(tableData, async (newTableData) => {
    const bizIds: any = newTableData?.map(item => item[bizId] || '').filter(Boolean) as (number | string)[] ?? [];
    if (!bizIds.length) return;

    const { data: dataList } = await remarksBatchBizToTypeList(bizIds);
    const data = groupByTaskId(dataList);

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
