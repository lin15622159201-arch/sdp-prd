/* eslint-disable no-restricted-syntax */
import { cloneDeep } from 'lodash-es';

export const arrayToTree = <T extends { [key: string]: any; children?: T[]; }>(
  arr: T[],
  idKey: string,
  pidKey: string,
  pids: string[],
  formatItem?: (item: T) => T,
) => {
  const _arr = cloneDeep(arr);
  const result: T[] = [];
  const itemMap: Record<string, T> = {};
  for (const item of _arr) {
    const id = item[idKey];
    const pid = item[pidKey];
    itemMap[id] = {
      ...item,
      children: itemMap[id] ? itemMap[id].children || [] : [],
    };
    const treeItem = formatItem ? formatItem(itemMap[id]) : itemMap[id];
    if (pids.includes(pid)) {
      result.push(treeItem);
    } else if (itemMap[pid]) {
      const children = itemMap[pid].children || [];
      children.push(treeItem);
      itemMap[pid].children = children;
    }
  }

  return result;
};
