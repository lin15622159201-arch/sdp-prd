import { isNumber } from 'lodash-es';
import {
  // opsDict,
  scmDict,
  FilterOpts,
} from '@/hooks-transfer/dictionary';
import type { ICategoryListReq } from '@/api/scm/types';
import type { IdictValuesItem } from '@/api/dict/types';
import { computed } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

export type IdictValuesItemNode = IdictValuesItem & { children?: IdictValuesItemNode[]; };
export type NodeMap = Record<string, IdictValuesItemNode>;

interface IOptions extends FilterOpts {
  maxLayer?: number;
}
/**
 * 获取 dictCode 扁平数组 => treeList
 * @param batchDictListMap use-dict 返回的字典集合
 * @param categoryCode dictCode
 * @returns
 */

/*
OPS 级联数据
* @param code 字典code
* @param opts 过滤选项
* @param isAllSelected 是否显示全部, 默认 false，即disabled选项展示为disabled不可选，true 则展示全部,disabled重置为false
* */
export const useOpsCascader = <T extends string>(
  code: T,
  opts?: number | IOptions,
  isAllSelected: boolean = false
) => {
  const maxLayer = isNumber(opts)
    ? opts
    : opts?.maxLayer;
  // const isEnable = !isNumber(opts) ? opts?.isEnable : undefined;
  const { getDictionaryOptions } = useDictionary();

  const cascaderData = computed(() => {
    return getDictionaryOptions(code, maxLayer, undefined, isAllSelected) || [];
  });
  console.log(cascaderData.value);
  return cascaderData;

  // 👇🏻原来的代码
  // const maxLayer = isNumber(opts)
  //   ? opts
  //   : opts?.maxLayer;
  // const isEnable = !isNumber(opts) ? opts?.isEnable : undefined;

  // return opsDict.getCascader({
  //   code,
  //   maxLayer,
  // }, {
  //   isEnable,
  // });
};

/* 尺码标准 + 尺码 */
export const useClothesSize = (maxLayer?: number) => {
  const { getDictionaryOptions } = useDictionary();
  const plmStandardSizeRef = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE, maxLayer) || [];
  });
  return plmStandardSizeRef;
};

/**
 * 获取 商品库 辅料 、工艺 级联选项
 * @param type
 * @returns
 */
export const useProductCascader = (type: ICategoryListReq) => {
  return scmDict.getCascader({
    code: type,
  });
};
