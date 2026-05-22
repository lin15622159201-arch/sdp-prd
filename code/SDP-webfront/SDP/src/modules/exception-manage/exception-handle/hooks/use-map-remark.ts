import type { Ref } from 'vue';
import { watch } from 'vue';
import { postRemarkBatchApi, bigBatchListApi } from '../api';

/* 备注接口 填充 tableData */
export function useTableDataMapRemark
<T, C=any>(
  tableData: Ref<T[]>,
  code: keyof T,
  bizType: string,
  remarkKey: keyof T | keyof C,
  childrenKey?: keyof T,
  apiName: string = 'postRemarkBatchApi'
) {
  const apiMap: any = {
    postRemarkBatchApi,
    bigBatchListApi,
  };
  watch(tableData, async (newTableData) => {
    const bizIdList = newTableData?.map(item => item[code] || '').filter(Boolean) as string[] ?? [];
    if (!bizIdList.length) return;
    const apiFunction = apiMap[apiName];
    if (!apiFunction) {
      console.error(`API function ${apiName} is not defined.`);
      return;
    }
    const { data } = await apiFunction({
      bizType,
      bizIdList,
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
