import type { IdictValuesItem } from '@/api/dict/types';

type Key = keyof IdictValuesItem;
export type IdictValuesItemNode = IdictValuesItem & { children?: IdictValuesItemNode[]; };
export type NodeMap = Record<string, IdictValuesItemNode>;

/**
 * 字典 array转tree
 * @param arr treeList
 * @param idKey node id
 * @param pidKey  node parentId
 * @returns
 */

export function arrayToTree(arr: IdictValuesItem[], idKey: Key, pidKey: Key) {
  const result = []; // 存放结果集
  const nodeMap = {} as NodeMap;

  /* eslint-disable no-restricted-syntax */
  for (const node of arr) {
    const id = node[idKey] as string;
    let pid = node[pidKey] as string;
    if (pid === '') pid = 'root'; // 后端 = ''

    if (!nodeMap[id]) nodeMap[id] = node;
    const mapKeys = Object.keys(nodeMap[id]);
    if (mapKeys.includes('children') && mapKeys.length === 1) {
      nodeMap[id] = {
        ...node,
        ...nodeMap[id],
      };
    }

    if (pid === 'root') {
      result.push(nodeMap[id]);
    } else {
      if (!nodeMap[pid]) {
        nodeMap[pid] = {
          children: [] as IdictValuesItemNode[],
        } as IdictValuesItemNode;
      }
      if (!nodeMap[pid].children) nodeMap[pid].children = [];
      nodeMap[pid].children!.push(nodeMap[id]);
    }
  }
  return result;
}

/**
 *
 * @param tree 级联数据
 * @param layer 限制最大层级
 * @returns
 */
export function fixTreeLayer(tree: IdictValuesItemNode[], layer: number | undefined) {
  if (typeof layer === 'undefined') return tree;
  const currentLayer = 0;
  /* 修剪 */
  const fix = (list: IdictValuesItemNode[], current: number) => {
    current += 1;
    list.forEach((node) => {
      if (current === layer) {
        delete node.children;
      } else if (node.children) {
        fix(node.children, current);
      }
    });
  };
  fix(tree, currentLayer);
  return tree;
}
