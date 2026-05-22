import { useTableColumns } from '@toy/business-components';
import {
  ISizeCategoryFindSizeCategoryReq,
  ISizeCategoryFindSizeCategoryResSizeStandardInfoListItem,
} from '../../../api/types';
import { getSizeCategoryFindSizeCategory } from '../../../api';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';

export const useSizeTypeTable = () => {
  const sizeTypeList = ref<ISizeCategoryFindSizeCategoryResSizeStandardInfoListItem[]>([]);

  const getLargeSizeType = async (params: ISizeCategoryFindSizeCategoryReq) => {
    const { data } = await getSizeCategoryFindSizeCategory(params);
    sizeTypeList.value = data?.sizeStandardInfoList || [];
    if (sizeTypeList.value.length === 0) {
      ElMessage.warning(`尺码标准：${params.sizeStandardCodes} 的号型为空`);
    }
  };

  const tableHeaders = computed(() => {
    return sizeTypeList.value.length ? sizeTypeList.value?.[0].sizeNumInfoList : [];
  });

  const { columns } = useTableColumns<ISizeCategoryFindSizeCategoryResSizeStandardInfoListItem>(() => {
    return [
      ...tableHeaders.value.map((item, i) => ({
        renderHeader: () => {
          return (
            <p>{item.sampleSize}</p>
          );
        },
        minWidth: '100',
        // 使用下标作为key
        prop: `${i}`,
        render: (row:ISizeCategoryFindSizeCategoryResSizeStandardInfoListItem) => {
          const r = row.sizeNumInfoList.find(n => n.sampleSize === item.sampleSize);
          return (r ? <span>{r.sizeTypeName}</span> : null);
        }
      })),
    ];
  });
  return {
    columns,
    sizeTypeList,
    getLargeSizeType,
  };
};
