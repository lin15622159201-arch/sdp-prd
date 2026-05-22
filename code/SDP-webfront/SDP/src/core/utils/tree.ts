export type Tree<T> = T & {
  children?: Tree<T>[];
};

type NodeMap<T> = Map<T[keyof T], Tree<T>>;

const sort = <T>(a: Tree<T>, b: Tree<T>, sortKey: keyof T) => Number(a[sortKey] || '0') - Number(b[sortKey] || '0');

const treeSort = <T>(tree: Tree<T>[], sortKey: keyof T) => {
  const nodeList = [...tree].sort((a, b) => sort(a, b, sortKey));
  let i = 0;
  while (i < nodeList.length) {
    const node = nodeList[i];
    if (node.children) {
      node.children.sort((a, b) => sort(a, b, sortKey));
      nodeList.push(...node.children);
    }
    i += 1;
  }
};

const createEmptyNode = <T>() => {
  return {
    children: [],
  } as Tree<T>;
};

const getNode = <T>(map: NodeMap<T>, id: T[keyof T]): [Tree<T>, boolean] => {
  let node = map.get(id);
  const isExist = !!node;
  if (!node) {
    node = createEmptyNode<T>();
  }
  return [node, isExist];
};

export const listToTreeById = <T>(
  arr: T[],
  options: {
    parentIdKey: keyof T;
    idKey: keyof T;
    handleRootTree?: (map: NodeMap<T>) => Tree<T>[];
    rootId?: string;
    sortKey?: keyof T;
  }
) => {
  const { parentIdKey, idKey, rootId = '', sortKey, handleRootTree } = options;
  const map: NodeMap<T> = new Map();
  console.time('tree');
  arr.forEach((item) => {
    const parentId = item[parentIdKey];
    const id = item[idKey];

    const [child, isChildExist] = getNode(map, id);
    Object.assign(child, item);
    if (!isChildExist) map.set(id, child);

    const [parent, isParentExist] = getNode(map, parentId);
    parent.children?.push(child);
    if (!isParentExist) map.set(parentId, parent);
  });

  console.timeEnd('tree');

  let tree: Tree<T>[] = [];
  if (Object.hasOwn(options, 'rootId')) {
    tree = map.get(rootId as any)?.children || [];
  } else if (handleRootTree) {
    tree = handleRootTree(map);
  }
  if (sortKey) {
    treeSort(tree, sortKey);
  }

  return tree || [];
};

/**
 * 一维数据组装树型结构
 * @param arr 一维数据
 * @param prop 子级id和父级id
 */
export const arrayToTree = (arr: any, prop = {
  idKey: 'categoryId',
  parentIdKey: 'parentId'
}) => {
  const map: any = {};
  arr.forEach((item: any) => {
    map[item[prop.idKey]] = { ...item, children: [] };
  });
  const tree: any = [];
  arr.forEach((item: any) => {
    const node = map[item[prop.idKey]];
    if (item[prop.parentIdKey] === '0') {
      tree.push(node);
    } else {
      const parent = map[item[prop.parentIdKey]];
      if (parent) {
        parent.children.push(node);
      }
    }
  });
  return tree;
};

/**
 * 递归查找最末级value对应的完整中文标签路径
 * @param {Array} options 级联选项数组
 * @param {string/number} targetValue 目标最末级value
 * @param {Array} labelPath 临时存储标签的数组（递归用）
 * @returns {string} 拼接后的中文路径，未找到则返回空
 */
export const getLabelPathByValue = (options: any, targetValue: string, labelPath: any = []): any => {
  // eslint-disable-next-line
  for (const option of options) {
    const newLabelPath = [...labelPath, option.categoryName];
    if (option.categoryId === targetValue) {
      return newLabelPath.at(-1);
    }
    if (option.children && option.children.length) {
      const result = getLabelPathByValue(option.children, targetValue, newLabelPath);
      if (result) return result;
    }
  }
  return '';
};

/**
 * 递归查找最末级value对应的完整中文标签路径
 * @param {Array} options 级联选项数组
 * @param {string/number} targetValue 目标最末级value
 * @param {Array} labelPath 临时存储标签的数组（递归用）
 * @returns {string} 拼接后的中文路径，未找到则返回空
 */
export const getLabeSuiting = (options: any, targetValue: string, labelPath: any = []): any => {
  // eslint-disable-next-line
  for (const option of options) {
    const newLabelPath = [...labelPath, option.categoryName];
    if (option.categoryId === targetValue) {
      return option.suiting;
    }
    if (option.children && option.children.length) {
      const result = getLabeSuiting(option.children, targetValue, newLabelPath);
      if (result) return result;
    }
  }
  return '';
};
