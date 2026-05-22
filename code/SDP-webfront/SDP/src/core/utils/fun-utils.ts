/**
 * 在嵌套树结构中查找特定值的节点并返回其属性
 * @param {T[]} treeData - 嵌套树结构数据
 * @param {V} searchValue - 要查找的节点值
 * @param {K} targetKey - 找到节点后要返回的属性名
 * @param {string} childrenKey - 子节点数组的键名，默认为'children'
 * @returns {T[K] | null} 找到节点的目标属性值，未找到则返回null
 */
export function findTreeNodeProperty<T extends Record<string, any>, K extends keyof T, V = T['value']>(
  treeData: T[],
  searchValue: V,
  targetKey: K,
  childrenKey: string = 'children'
): T[K] | null {
  if (!Array.isArray(treeData) || treeData.length === 0) return null;

  const stack = [...treeData];

  while (stack.length > 0) {
    const currentNode = stack.pop()!;

    if (currentNode.value === searchValue) {
      return currentNode[targetKey] ?? null;
    }

    if (Array.isArray(currentNode[childrenKey])) {
      stack.push(...(currentNode[childrenKey] as T[]).reverse());
    }
  }

  return null;
}
