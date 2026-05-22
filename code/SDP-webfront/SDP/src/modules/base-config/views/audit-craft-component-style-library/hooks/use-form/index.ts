import { useResetRef } from '@toy/v-use';
import { IFormData, IListItem, ITreeNode, SpanMethodProps } from './type';
import { v4 as uuid } from 'uuid';

const useForm = () => {
  const [formData, resetForm] = useResetRef<IFormData>({
    templateId: '',
    templateName: '',
    categoryCodes: [],
    referenceTemplateId: '',
    list: [],
    roomCategorys: [],
  });

  const rules = {
    templateName: [{ required: true, message: '请输入模板名称' }],
    categoryCodes: [{ required: true, message: '请选择板房品类' }],
  };

  /**
 * @description 添加工序部件
 */
  const handleAddComponent = () => {
    const id = uuid();
    formData.value.list?.push({
      id,
      componentName: '',
      parentId: `${id},${uuid()}`,
      structuralDes: '',
      sewingRequires: '',
      selectedComponentId: '',
      selectedStructuralId: '',
      componentId: ''
    });
  };

  /**
 * @description 删除工序部件/结构分解
 * @param index 当前下标
 * @param row 当前行
 */
  const handleDelComponentOrStruct = (index: number, row: IListItem) => {
    console.log(row);
    formData.value.list = formData.value.list.filter(item => !item.parentId.includes(row.parentId));
  };

  /**
 * @description 添加版型结构分解
 * @param index 当前下标
 * @param row 当前行
 */
  const handleAddStructural = (row: IListItem) => {
    const id = String(Date.now());
    const [firstId, secondId] = row.parentId.split(',');
    const index = formData.value.list.findLastIndex(item => item.parentId.includes(secondId));
    formData.value.list?.splice(index + 1, 0, {
      id,
      parentId: `${firstId},${id}`,
      structuralDes: '',
      sewingRequires: '',
      componentName: row.componentName,
      selectedComponentId: row.selectedComponentId,
      selectedStructuralId: '',
      componentId: row.componentId,
    });
  };

  /**
 * @description 添加工序要求
 * @param index 当前下标
 * @param row 当前行
 */
  const handleAddProcessRequireDes = (index: number, row: IListItem) => {
    const id = String(Date.now());
    const [firstId, secondId] = row.parentId.split(',');
    formData.value.list?.splice(index + 1, 0, {
      id,
      parentId: `${firstId},${secondId},${id}`,
      structuralDes: row.structuralDes,
      sewingRequires: '',
      componentName: row.componentName,
      selectedComponentId: row.selectedComponentId,
      selectedStructuralId: row.selectedStructuralId,
      componentId: row.componentId,
    });
    console.log('list=', formData.value.list);
  };
  /**
 * @description 删除工序要求
 * @param index 当前下标
 *  */
  const handleDelProcessRequireDes = (index: number) => {
    formData.value.list?.splice(index, 1);
  };

  /**
 * @description 展示结构分解的删除按钮
 * @returns 只有一个时候不展示删除按钮
 */
  const isShowDelStruct = (row: IListItem) => {
    const firstId = row.parentId.split(',')[0];
    const secondIdArr = formData.value?.list.filter((n) => {
      return n.parentId.includes(firstId);
    }).map(n => n.parentId.split(',')[1]);
    const secondSet = Array.from(new Set(secondIdArr));
    return secondSet.length > 1;
  };

  const isShowDelProcessRequireDes = (row: IListItem) => {
    const secondId = row.parentId.split(',')[1];
    const arr = formData.value?.list.filter((n) => {
      return n.parentId.includes(secondId);
    });
    return arr.length > 1;
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
          structuralDes: item.structuralDes,
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

  /**
   * @description 表格合并行处理
   * @param { row, column, rowIndex, columnIndex }
   * @returns { rowspan: number; colspan: number; }
   */
  const spanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
    const { list } = formData.value;
    const firstCol: Record<string, { rowspan: number; colspan: number; }> = {};
    const secondCol: Record<string, { rowspan: number; colspan: number; }> = {};
    list.forEach((item) => {
      const [firstId, secondId] = item.parentId.split(',');
      if (!firstCol[firstId]) {
        firstCol[firstId] = {
          rowspan: 1,
          colspan: 1,
        };
      } else {
        firstCol[firstId].rowspan += 1;
      }
      if (!secondCol[secondId]) {
        secondCol[secondId] = {
          rowspan: 1,
          colspan: 1,
        };
      } else {
        secondCol[secondId].rowspan += 1;
      }
    });
    const [firstId, secondId] = formData.value.list[rowIndex].parentId.split(',');
    if (columnIndex === 0) {
      // 如果不是第一个出现的 `id`，返回 [0, 0]，表示合并到上一行
      if (rowIndex > 0 && formData.value.list[rowIndex - 1].parentId.includes(firstId)) {
        return [0, 0];
      }
      return firstCol[firstId]; // 返回合并的行数和列数
    }
    if (columnIndex === 1) {
      // 如果不是第一个出现的 `id`，返回 [0, 0]，表示合并到上一行
      if (rowIndex > 0 && formData.value.list[rowIndex - 1].parentId.includes(secondId)) {
        return [0, 0];
      }
      return secondCol[secondId]; // 返回合并的行数和列数
    }
    return [1, 1];
  };
  return {
    rules,
    formData,
    isShowDelStruct,
    isShowDelProcessRequireDes,
    resetForm,
    spanMethod,
    convertToTree,
    handleAddComponent,
    handleDelComponentOrStruct,
    handleAddStructural,
    handleAddProcessRequireDes,
    handleDelProcessRequireDes,

  };
};

export default useForm;
