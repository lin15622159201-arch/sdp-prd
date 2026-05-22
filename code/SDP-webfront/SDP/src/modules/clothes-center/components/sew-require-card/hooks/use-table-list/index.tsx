import { v4 as uuid } from 'uuid';
import { IListItem, ICraftSewRequireItem, ITreeNode } from './type';

const useSewTableList = () => {
  /**
   * 根据树形结构数据扁平化数组，并增加关联关系
   * @param data
   * @returns
   */
  const convertToArray = (data: ICraftSewRequireItem[], structuralsProp: string = 'structurals') => {
    const list: IListItem[] = [];
    (data || []).forEach((item: any) => {
      const { componentId, componentName } = item;
      const firstId = uuid();
      item[structuralsProp].forEach((structuralItem: any) => {
        const secondId = uuid();
        const { sewingRequires = [] } = structuralItem;
        const structuralDesc = structuralItem.structural || structuralItem.desc || '';
        sewingRequires?.forEach((sewingRequireItem: any) => {
          list.push({
            tableId: uuid(),
            parentId: `${firstId},${secondId}`,
            // 兼容审版工艺单和大货资料字段不一样
            structuralDesc,
            sewingRequires: sewingRequireItem.desc,
            componentName,
            selectedComponentId: componentId,
            selectedStructuralId: structuralDesc,
            componentId,
          });
        });
      });
    });
    return list;
  };
  /**
   * 将扁平列表转换为树形结构
   * @param list 原始列表数据
   * @returns 树形结构数据
   */
  const convertToTree = (list: IListItem[]): ITreeNode[] => {
    // 用于存储所有组件节点
    const componentMap = new Map<string, ITreeNode>();
    list.forEach((item) => {
      const [firstId, secondId] = item.parentId.split(',');
      // 处理组件节点
      if (!componentMap.has(firstId)) {
        componentMap.set(firstId, {
          id: firstId,
          componentName: item.componentName,
          selectedComponentId: item.selectedComponentId,
          componentId: item.componentId,
          children: [],
        });
      }

      const componentNode = componentMap.get(firstId)!;

      // 处理结构节点
      let structuralNode = componentNode.children.find(
        child => child.id === secondId
      );

      if (!structuralNode) {
        structuralNode = {
          id: secondId,
          structuralDesc: item.structuralDesc,
          selectedStructuralId: item.selectedStructuralId,
          children: [],
        };
        componentNode.children.push(structuralNode);
      }
      // 处理工艺节点
      structuralNode.children.push({
        sewingRequires: item.sewingRequires,
      });
    });
    return Array.from(componentMap.values());
  };

  // 部位车缝要求
  const defaultSewingItem: IListItem = {
    tableId: '', // 表id
    componentId: '', // 部件id
    componentName: '', // 部件名称
    selectedComponentId: '', // 部件名称缓存
    parentId: '', // 部件id
    structuralDesc: '', // 版型结构分解
    selectedStructuralId: '', // 版型结构分解
    sewingRequires: '', // 车缝要求
  };
  // 设置默认数据一条
  const setDefaultSewingList = (id: string | number) => {
    return [{
      ...defaultSewingItem,
      tableId: id,
      parentId: `${id},${uuid()}`,
    }];
  };
  return {
    convertToArray,
    convertToTree,
    setDefaultSewingList,
    defaultSewingItem
  };
};

export default useSewTableList;
