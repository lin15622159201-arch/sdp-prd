/* eslint-disable no-restricted-syntax */
/**
 * 数组去重(每项基础类型 string\number)
 * @export
 * @param {Array} arr
 *
 * @returns {Array}
 */

import { SORT_ENUM } from '@/constant/global';

export const rinseArr: (arr: Array<string | number>) => Array<string | number> = (arr) => {
  const res: Array<string | number> = [];
  if (!Array.isArray(arr)) return arr;
  arr.forEach((item: string | number) => {
    return !res.includes(item) && res.push(item);
  });
  return res;
};

type IRepeatObjArrItem = <T>(arr: T[], key: keyof T) => boolean;

/**
 * @param arr arr 如：var arr = [{name: "123", age : 123}, {name:"1234432", age : 1234324}]
 * @param key 如："name"
 * @retutns  boolean: true：存在； false：不存在重复
 */
export const isRepeatObjArr: IRepeatObjArrItem = (arr, key) => {
  const obj = {} as Record<string, any>;
  for (let i = 0, len = arr.length; i < len; i++) {
    if (obj[arr[i][key] as any]) {
      return true;
    }
    obj[arr[i][key] as any] = arr[i];
  }
  return false;
};
/**
 * @description: 数组对象根据某个字段的值进行排序，默认倒序排列
 * eg : arr = [{name: 2}, {name: 5}, {name: 1}] => objArrSortByKey(arr, 'name') => [{name: 5}, {name:2}, {name: 1}];
 * @param {*} T
 * @return {*}
 */
// 修正非数字开头的，排序因子统一变成0或99999999
const parseIntColorCode = (str: string, sort = SORT_ENUM.DESC) => {
  const sortFactor = sort === SORT_ENUM.DESC ? 0 : 99999999;
  const colorCode = /^\d/.test(str) ? parseInt(str, 10) : sortFactor;
  return colorCode;
};
export const objArrSortByKey: <T>(
  arr: T[],
  key: keyof T,
  sort?: SORT_ENUM,
  isPureNumber?: boolean
) => T[] = (arr, key, sort = SORT_ENUM.DESC, isPureNumber = false) => {
  if (sort === SORT_ENUM.ASC) {
    return arr.sort((x, y) => {
      const xKey = isPureNumber ? parseIntColorCode(x[key] as any, sort) : x[key];
      const yKey = isPureNumber ? parseIntColorCode(y[key] as any, sort) : y[key];
      return (xKey as any) - (yKey as any);
    });
  }
  return arr.sort((x, y) => {
    const xKey = isPureNumber ? parseIntColorCode(x[key] as any, sort) : x[key];
    const yKey = isPureNumber ? parseIntColorCode(y[key] as any, sort) : y[key];
    return (yKey as any) - (xKey as any);
  });
};

/**
 * 根据最后一级满足的条件往前推，获取树形数据显示层级数据
 * 注意：该方法适用于，id，或者某个字段的值在树中是唯一的情况
 * @param tree {Array} 树数据
 * @param childrenName{} 树中的子类数组名称
 * @param func {Function} 回调函数
 * @param field {String} 字段名称
 * @param path {Array} 路径数据
 * @returns {*[]|[]|*}
 */
export const treeFindPath = <T>(
  tree: T[],
  childrenName = 'children' as keyof T,
  func: (item: T) => boolean,
  field = '' as keyof T,
  path = [] as any[],
): any[] => {
  if (!tree) return [];
  for (const data of tree) {
    field === '' ? path.push(data) : path.push(data[field]);
    if (func(data)) return path;
    if (data[childrenName]) {
      const findChildren = treeFindPath(
        data[childrenName] as unknown as T[],
        childrenName,
        func,
        field,
        path,
      );
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
};

/**
 * 树形数据根据条件过滤
 * @param tree {Array} 树数据
 * @param childrenName{} 树中的子类数组名称
 * @param condition 条件值
 * @param field {String} 字段名称
 * @returns {*[]|[]|*}
 */
export const treeFilterByKey = <T extends Record<string, any>>(
  tree: T[],
  childrenName = 'children' as keyof T,
  condition: string,
  field = '' as keyof T,
) => {
  return tree.filter((item) => {
    item[childrenName] = treeFilterByKey(
      item[childrenName],
      childrenName,
      condition,
      field,
    ) as T[keyof T];
    return item[field] === condition;
  });
};

/**
 * 笛卡尔积计算
 * @param list {Array<T[]>} 商品各个属性列表
 * @return {Array<T[]>}
 */
export const cartesianProduct = <T>(list: Array<T[]>) => {
  if (list.length === 0) {
    return [[]];
  }
  const result: Array<T[]> = [];
  const currentArray = list[0];
  const restArrays = list.slice(1);
  const restCartesian = cartesianProduct(restArrays);
  for (let i = 0; i < currentArray.length; i++) {
    for (let j = 0; j < restCartesian.length; j++) {
      result.push([currentArray[i], ...restCartesian[j]]);
    }
  }
  return result;
};

/**
 * @description: 扁平数据转为树形数据结构
 * @param {IAddressItem[]} list
 * @return {IAddressItem[]}
 */
export const flatDataToTree = <T extends Record<string, any>>(
  list: T[],
  idKey = 'id' as keyof T,
  parentIdKey = 'parentId' as keyof T,
): T[] => {
  const tree: T[] = [];
  const idMapping: any = {};
  list.forEach((item) => {
    if (!idMapping[item[idKey]]) {
      idMapping[item[idKey]] = {
        ...item,
        children: [],
      };
    }
  });

  list.forEach((item) => {
    const node = idMapping[item[idKey]];
    if (!item[parentIdKey] || item[parentIdKey] === '0') {
      tree.push(node);
    } else {
      const parentNode = idMapping[item[parentIdKey]];
      if (parentNode) {
        parentNode.children.push(node);
      }
    }
  });
  return tree;
};

/**
 * 从树状结构中通过目标value找到完整路径（父级value + 自身value）
 * @param {Array} tree - 树状结构数据（顶层数组）
 * @param {string} targetValue - 要查找的目标value
 * @returns {Array} 完整路径数组（如未找到返回空数组）
 */
export const findValuePath = (tree: any, targetValue: string) => {
  const parentMap = new Map();
  function buildParentMap(node: any, parentValue: any) {
    if (!node || !node.value) return;
    parentMap.set(node.value, parentValue);
    if (Array.isArray(node.children) && node.children.length > 0) {
      node.children.forEach((child: any) => buildParentMap(child, node.value));
    }
  }
  tree.forEach((rootNode: any) => buildParentMap(rootNode, null));
  const path = [];
  let currentValue = targetValue;
  while (parentMap.has(currentValue)) {
    path.push(currentValue);
    currentValue = parentMap.get(currentValue);
  }
  return path.reverse() || [];
};
