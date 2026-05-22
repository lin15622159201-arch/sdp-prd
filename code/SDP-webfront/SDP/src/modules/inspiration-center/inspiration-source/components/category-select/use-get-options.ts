import { shallowRef } from 'vue';
import { getCategoryList, getCategory } from '../../api';

export type CategoryItem = {
  code: string;
  value: string;
};

export const useGetOptions = () => {
  const categoryList = shallowRef<CategoryItem[]>([]);
  const handleGetThirdCategoryList = async () => {
    const { data } = await getCategoryList();
    categoryList.value = data.map(item => ({ code: item.code, value: item.value }));
  };

  handleGetThirdCategoryList();

  return { categoryList };
};

const createEmptyNode = () => {
  return {
    children: [],
  };
};

const sort = (a: any, b: any, sortKey: any) => Number(a[sortKey] || '0') - Number(b[sortKey] || '0');
const treeSort = (tree: any, sortKey: any) => {
  const nodeList = [...tree].sort((a, b) => sort(a, b, sortKey));
  let i = 0;
  while (i < nodeList.length) {
    const node = nodeList[i];
    if (node.children) {
      node.children.sort((a: any, b: any) => sort(a, b, sortKey));
      nodeList.push(...node.children);
    }
    i += 1;
  }
};
const getNode = (map: any, id: any) => {
  let node = map.get(id);
  const isExist = !!node;
  if (!node) {
    node = createEmptyNode();
  }
  return [node, isExist];
};
const listToTreeById = <T>(
  arr: T[],
  options: {
    parentIdKey: keyof T;
    idKey: keyof T;
    handleRootTree?: (map: any) => any[];
    rootId?: string | null;
    sortKey?: keyof T;
  }
) => {
  const { parentIdKey, idKey, rootId = '', sortKey, handleRootTree } = options;
  const map: any = new Map();
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

  let tree: any = [];
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

export const handleGetCategory = async () => {
  const { data } = await getCategory({ classCode: 'FM240402539' });
  const list = arrayToTree(data);
  list.forEach((item: any) => {
    if (item.value === '其他') {
      item.children[0].children = JSON.parse(JSON.stringify([item.children[0]]));
    }
  });
  return list;
};

const arrayToTree = (arr: any) => {
  const map: any = {};
  arr.forEach((item: any) => {
    map[item.id] = { ...item, children: [] };
  });
  const tree: any = [];
  arr.forEach((item: any) => {
    const node = map[item.id];
    if (item.parentId === '0') {
      tree.push(node);
    } else {
      const parent = map[item.parentId];
      if (parent) {
        parent.children.push(node);
      }
    }
  });
  return tree;
};
