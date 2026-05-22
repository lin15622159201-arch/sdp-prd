import type { Ref } from 'vue';
import { computed } from 'vue';
import { debounce } from 'lodash-es';
import NP from 'number-precision';
import { ISizeItem, ISizeRange } from './types';
import { IStyleInfoSubmitReqStyleDetailSizeReqListItem } from '@/modules/style-data-manage/large/api/types';

interface IFromBaseData {
  /**
   * 样衣尺寸（跳码基准）
   */
  sampleBaseYardage?: string;
}

/**
 *
 * @param list 尺码数据
 * @param formBaseData
 * @param selectSizeList 选中尺码组列表
 */
export default function useSizeHopping(
  list: Ref<IStyleInfoSubmitReqStyleDetailSizeReqListItem[]>,
  formBaseData: Ref<IFromBaseData>,
  selectSizeList: Ref<ISizeItem>
) {
  // 计算尺寸下标map
  const sizeJsonMap = computed(() => {
    const _sizeJsonMap = Object.create(null) as Record<string, number>;
    selectSizeList.value.children.forEach((item, index: number) => {
      _sizeJsonMap[item.label] = index;
    });
    return _sizeJsonMap;
  });

  const sizeRang = computed(() => {
    const baseRes: ISizeRange = {
      rangeMap: {},
      baseSizeIndex: null,
    };

    if (!list.value?.length) {
      return baseRes;
    }

    // 只需要第一条数据，因为其他都一样
    const { skipSizeQuotietyList } = list.value[0];
    const rangeMap: ISizeRange['rangeMap'] = {};

    const { sampleBaseYardage } = formBaseData.value;
    let baseSizeIndex: null | number = null;

    const baseYardageIndex = selectSizeList.value.children.findIndex(it => it.label === sampleBaseYardage);

    skipSizeQuotietyList.forEach((item) => {
      const [startSize, endSize] = item.size.split('-');
      const startIndex = sizeJsonMap.value[startSize];
      const endIndex = sizeJsonMap.value[endSize];
      rangeMap[item.size] = {
        start: startIndex,
        end: endIndex,
      };
      if (baseYardageIndex !== -1 && baseYardageIndex >= startIndex && baseYardageIndex <= endIndex) {
        baseSizeIndex = baseYardageIndex;
      }
    });
    return { baseSizeIndex, rangeMap };
  });

  /**
   * 跳码的计算
   * 说明: sizeRang的值，用 sizeRang.value.baseSizeIndex作为分割
   * 左、右列表: { rowIndex: number; index: number; }[]; rowIndex 对应跳码下标 index 大货尺码下标
   */
  const handleSizeHoppingChange = debounce((rowIndex?: number) => {
    if (sizeRang.value.baseSizeIndex === null) {
      return;
    }

    const _list = typeof rowIndex === 'number' ? [list.value[rowIndex]] : list.value;

    const getNum = (num?: string | number) => Number(num) || 0;
    const { sampleBaseYardage } = formBaseData.value;

    _list.forEach((item) => {
      // 跳码、大货尺寸、纸样尺寸（数字）
      const { skipSizeQuotietyList, sizeList, sampleSize } = item;
      // 计算前先清空
      sizeList.forEach((_item: any) => {
        _item.data = '';
      });
      // 基码数值
      const _sampleSize = getNum(sampleSize);
      if (!_sampleSize) return;
      // 基础码位置
      const baseSizeItemIndex = selectSizeList.value.children.findIndex(it => it.label === sampleBaseYardage);
      // 没找到基码(有基码不行，还要存在)
      if (baseSizeItemIndex === -1) return;
      // 到这里必定为有基码
      const _baseSizeIndex = sizeRang.value.baseSizeIndex as unknown as number;
      /**
       * 遍历跳码数据
       */
      let baseVal = _sampleSize;
      let baseIndex = _baseSizeIndex;
      skipSizeQuotietyList.forEach((quotietyItem) => {
        const [startSize, endSize] = quotietyItem.size.split('-');

        const startIndex = sizeJsonMap.value[startSize];
        const endIndex = sizeJsonMap.value[endSize];
        // 没有填放码数据，跳过，data为0也要计算
        if (quotietyItem.data === '' || quotietyItem.data === null || quotietyItem.data === undefined) return;
        for (let i = startIndex; i <= endIndex; i++) {
          const selectItem = selectSizeList.value.children[i];
          const findItem = sizeList.find(it => it.size === selectItem.label)!;
          const diffIndexData = NP.times(Number(quotietyItem.data), Math.abs(baseIndex - i));
          // 小于0，则设置为0
          const val = baseIndex >= i ? NP.minus(baseVal, diffIndexData) : NP.plus(baseVal, diffIndexData);
          findItem.data = String(Math.max(val, 0));
          if (i === endIndex) {
            baseIndex = endIndex;
            baseVal = Number(findItem.data);
          }
        }
      });
    });
  });

  return {
    handleSizeHoppingChange,
  };
}
