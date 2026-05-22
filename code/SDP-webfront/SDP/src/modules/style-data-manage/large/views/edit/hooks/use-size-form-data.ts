import { ref, computed, shallowRef, watch, nextTick, readonly } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { DATA_TUIKUAN_INPUT_STATUS_ENUM } from '../../../constant/index';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { ISizeItem, ISizeItemChildrenItem } from './types';

interface IQuery {
  styleCode: string;
  styleTypeName: string;
  styleType: string;
  // 尺码类型。如chinese_size_code
  clothingSizeType: string;
  // 尺码类型名称。如中国码
  clothingSizeTypeName: string;
  state: DATA_TUIKUAN_INPUT_STATUS_ENUM;
}

const baseData = {
  // 款式id
  styleInfoId: '',
  // 款式号
  styleCode: '',
  // 商品末级品类（名称）
  productCategory3Name: '',
  // 尺码标准（value）
  sizeStandard: '',
  // 尺码标准 valueCode
  sizeStandardCode: '',
  // 样衣尺寸
  sampleBaseYardage: '',
  // 纸样尺寸
  designBaseYardage: '',
};

const sizeFormData = ref({
  ...baseData,
});

export const useSizeFormData = () => {
  const route = useRoute();
  const { batchDictListMap } = useDictionary([
    DICTIONARY_KEY.PLM_STANDARY_SIZE,
  ]);

  const queryRef = computed(() => {
    return route.query as unknown as IQuery;
  });
  const paramsRef = computed(() => {
    return route.params as unknown as { id: string; };
  });

  const plmStandardSizeList = computed(() => {
    const firstArr: ISizeItem[] = [];
    const childObj = Object.create(null) as Record<string, ISizeItemChildrenItem[]>;
    (batchDictListMap.value[DICTIONARY_KEY.PLM_STANDARY_SIZE] || []).forEach((item) => {
      // 次级分类
      if (item.children && item.children.length) {
        const [child] = item.children;
        childObj[item.valueCode] = child.value.split(',').map((label: string) => {
          return {
            label,
            value: label,
          };
        });
      }
      // 一级分类
      firstArr.push({
        ...item,
        children: childObj[item.valueCode],
      });
    });
    return firstArr;
  });

  const sizeListItem = computed(() => {
    const baseDataObj = {
      valueCode: '',
      children: [],
    } as unknown as ISizeItem;
    if (!sizeFormData.value.sizeStandardCode) return baseDataObj;
    const find = plmStandardSizeList.value.find(item => item.valueCode === sizeFormData.value.sizeStandardCode);
    return (find || baseDataObj) as ISizeItem;
  });

  const handleSetQuery = () => {
    const {
      styleCode = '',
      styleTypeName = '',
      clothingSizeType = '',
      clothingSizeTypeName = '',
    } = queryRef.value;
    /**
     * 款式id
     */
    sizeFormData.value.styleInfoId = paramsRef.value.id;
    sizeFormData.value.styleCode = styleCode;

    sizeFormData.value.productCategory3Name = (() => {
      if (!styleTypeName) return '';

      const styleTypeNameList = styleTypeName.split('-');
      return styleTypeNameList[styleTypeNameList.length - 1];
    })();

    if (queryRef.value.state !== DATA_TUIKUAN_INPUT_STATUS_ENUM.WAITING) {
      sizeFormData.value.sizeStandardCode = clothingSizeType;
      sizeFormData.value.sizeStandard = clothingSizeTypeName;
    }
  };

  const sizeStandard = ref('');
  // 切换 尺码标准 删除 样衣尺寸、纸样尺寸
  const handleSizeStandardChange = async (cb?: () => any) => {
    try {
      await ElMessageBox.confirm('该操作将清空 样衣尺寸、纸样尺寸、跳码等数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true,
      });
    } catch (e) {
      sizeStandard.value = sizeFormData.value.sizeStandardCode;
      return;
    }

    sizeFormData.value.sizeStandardCode = sizeStandard.value;
    sizeFormData.value.sizeStandard = sizeListItem.value.value;

    // 样衣尺寸
    sizeFormData.value.sampleBaseYardage = '';
    // 纸样尺寸
    sizeFormData.value.designBaseYardage = '';
    await nextTick();
    cb?.();
  };

  const readonlyFormData = computed(() => {
    return readonly(sizeFormData.value);
  });

  // 同步 sizeStandard 的变化
  watch(() => sizeFormData.value.sizeStandardCode, () => {
    sizeStandard.value = sizeFormData.value.sizeStandardCode;
  }, { immediate: true });

  onBeforeRouteLeave(() => {
    nextTick(() => {
      Object.keys(baseData).forEach((key) => {
        Reflect.set(sizeFormData.value, key, baseData[key as keyof typeof baseData]);
      });
    });
  });

  return {
    queryRef,
    paramsRef,
    readonlyFormData,
    sizeFormData,
    sizeStandard,
    plmStandardSizeList,
    sizeListItem,
    handleSetQuery,
    handleSizeStandardChange,
  };
};
