import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type {
  ITemplateDetailedInfoSizeInfoJsonsItem,
} from '../api/type';

import useBaseData from './use-base-data';

interface PartsMeasurementVOListItem {
  clothesPartsMeasurementId: string;
  measuringMethod: string;
  partsSizeCode: string;
}

// 分隔符
const SEPARATOR = '___';

export default function useComposeHandle(dataList: Ref<ITemplateDetailedInfoSizeInfoJsonsItem[]>) {
  const { positionList: basePositionList } = useBaseData();
  const filterQuery = ref('');
  const positionList = computed(() => {
    if (!filterQuery.value) return basePositionList.value;

    return basePositionList.value.filter((item) => {
      return item.clothesPartsName.includes(filterQuery.value);
    });
  });

  const partsMeasurementVOListMap = computed(() => {
    const data = Object.create(null) as Record<string, PartsMeasurementVOListItem[]>;

    basePositionList.value.forEach((item) => {
      const { partsMeasurementVOList, clothesPartsName } = item as any;

      data[clothesPartsName] = partsMeasurementVOList?.map((item2: PartsMeasurementVOListItem) => {
        return {
          ...item2,
          value: item2.measuringMethod,
        };
      }) || [];
    });

    return data;
  });
  /**
   * 切换部位，带出 尺寸维度、允差范围
   */
  const handlePositionChange = (name: string, i: number) => {
    const row = basePositionList.value.find(item => item.clothesPartsName === name);

    if (row) {
      const item = dataList.value[i];
      item.dimension = row.sizeDimensions;
      item.errorRange = row.errorRange;
      item.positionCode = row.partsSizeCode;

      const partsMeasurementVOList = partsMeasurementVOListMap.value[name];

      if (partsMeasurementVOList.length === 1) {
        // 只有一条，默认选择第一条
        item.measureMethod = partsMeasurementVOList[0]?.measuringMethod;
      } else {
        // 清空量法
        item.measureMethod = '';
      }
    }
    filterQuery.value = '';
  };
  /**
   * 筛选过滤
   */
  const filterMethod = (query: string) => {
    filterQuery.value = query.trim();
  };

  /**
 * 部位 + 量法组合
 */
  const composeList = computed(() => {
    return dataList.value.map((item, index) => {
      if (item.position && item.measureMethod) {
        return {
          value: `${item.position}${SEPARATOR}${item.measureMethod}`,
          index,
        };
      }
      return null;
    })
      .filter(Boolean) as { value: string; index: number; }[];
  });

  /**
   * 判断组合中是否有相同的
   */
  const getSame = (_i: number) => {
    const row = dataList.value[_i];

    if (!row) return false;

    const val = `${row.position}${SEPARATOR}${row.measureMethod}`;

    for (let i = 0; i < composeList.value.length; i++) {
      const { value, index } = composeList.value[i];

      if (index !== _i && value === val) {
        return true;
      }
    }
    return false;
  };

  /**
   * 量法检测
   */
  const handleCheck = (i: number) => {
    const flag = getSame(i);

    if (flag) {
      ElMessage.warning('已经存在相同的部位+量法组合');
      dataList.value[i].measureMethod = '';
    }
  };

  /**
 * el-option disabled
 */
  const getDisabled = (i: number, label: string) => {
    const row = dataList.value[i];
    // 只判断有量法
    if (row?.measureMethod) {
      for (let index = 0; index < composeList.value.length; index++) {
        const { value } = composeList.value[index];
        const [position, measureWay] = value.split(SEPARATOR);

        if (measureWay === row.measureMethod && label === position) {
          return true;
        }
      }
    }

    return false;
  };

  return {
    composeList,
    getSame,
    handleCheck,
    getDisabled,

    positionList,
    handlePositionChange,
    filterMethod,

    partsMeasurementVOListMap,
  };
}
