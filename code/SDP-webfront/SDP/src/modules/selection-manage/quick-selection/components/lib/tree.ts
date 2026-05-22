export type Tree<T> = T & {
  children?: Tree<T>[];
};

type NodeMap<T> = Map<T[keyof T], Tree<T>>;

export const isLeaf = <T>(node: Tree<T>) => {
  return !node.children || node.children.length === 0;
};

/**
 * 深度遍历树
 */
export const dfsTree = <T>(tree: Tree<T>[], handleNode: (node: Tree<T>, parentNodeList: Tree<T>[]) => void) => {
  const nodeList = [...tree];
  const fatherChildrenLen: number[] = [];
  const parentNodeList: Tree<T>[] = [];
  while (nodeList.length) {
    const node = nodeList.shift()!;
    handleNode(node, parentNodeList);
    if (node.children && node.children.length > 0) {
      parentNodeList.push(node);
      fatherChildrenLen.push(node.children.length);
      nodeList.unshift(...node.children);
    } else {
      let lastIndex = fatherChildrenLen.length - 1;
      fatherChildrenLen[lastIndex] -= 1;
      while (lastIndex >= 0 && fatherChildrenLen[lastIndex] === 0) {
        console.log('lastIndex', lastIndex);
        fatherChildrenLen.pop();
        parentNodeList.pop();
        lastIndex -= 1;
        fatherChildrenLen[lastIndex] -= 1;
      }
    }
  }
};

/**
 * 广度优先遍历
 */
export const bfsTree = <T>(tree: Tree<T>[], handleNode: (node: Tree<T>) => void) => {
  const nodeList = [...tree];
  let i = 0;
  while (i < nodeList.length) {
    const node = nodeList[i];
    handleNode(node);
    if (node.children) {
      nodeList.push(...node.children);
    }
    i += 1;
  }
};

const sort = <T>(a: Tree<T>, b: Tree<T>, sortKey: keyof T) => Number(a[sortKey] || '0') - Number(b[sortKey] || '0');

const treeSort = <T>(tree: Tree<T>[], sortKey: keyof T) => {
  tree.sort((a, b) => sort(a, b, sortKey));
  bfsTree(tree, (node) => {
    if (node.children) {
      node.children.sort((a, b) => sort(a, b, sortKey));
    }
  });
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
