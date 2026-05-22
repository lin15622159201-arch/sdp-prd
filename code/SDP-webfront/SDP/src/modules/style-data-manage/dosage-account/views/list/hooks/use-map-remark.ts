import { REMARK_BIZ_TYPE_ENUMS } from '@/modules/clothes-center/constant';
import { postRemarkBatchApi } from '@/modules/exception-manage/exception-handle/api';
import type { Ref } from 'vue';
import { watch } from 'vue';

/* 备注接口 根据业务id填充 tableData */
export function useTableDataMapBizRemark<T, C=any>(
  tableData: Ref<T[]>,
  bizId: keyof T,
  bizType: REMARK_BIZ_TYPE_ENUMS,
  remarkKey: keyof T | keyof C,
  childrenKey?: keyof T,
) {
  watch(tableData, async (newTableData) => {
    const bizIds = newTableData?.map(item => item[bizId] || '').filter(Boolean) as (number | string)[] ?? [];
    if (!bizIds.length) return;

    const { data } = await postRemarkBatchApi({
      bizType,
      bizIdList: bizIds as any
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
