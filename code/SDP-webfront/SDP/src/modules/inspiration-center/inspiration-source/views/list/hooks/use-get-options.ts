
import { getCategory } from '../../../api/index';


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
