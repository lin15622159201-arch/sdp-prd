import { TableColumnCtx } from 'element-plus';

export interface IComponentListItem {
  value: string;
  label: string;
}

export interface IListItem {
  /** 必须唯一，仅用于row-key */
  tableId: string;
  selectedComponentId: string;
  componentId: string;
  /** 部件名称 */
  componentName: string;
  /** 父级Id,格式：一级id+'-'+二级id+'-'+三级id */
  parentId: string;
  /** 版型结构分解 */
  structuralDesc: string;
  selectedStructuralId: string;
  /** 车缝要求 */
  sewingRequires: string;
}

export interface ITreeNode {
  id: string;
  componentName: string;
  selectedComponentId: string;
  componentId: string;
  children: {
    id: string;
    structuralDesc: string;
    selectedStructuralId: string;
    children: {
      sewingRequires: string;
    }[];
  }[];
}

export interface SpanMethodProps {
  row: IListItem;
  column: TableColumnCtx<IListItem>;
  rowIndex: number;
  columnIndex: number;
}

export interface ICraftSewRequireItem {
  /**
   * 审版工艺部件ID
   */
  componentId: string;
  /**
    * 工序部件名称
    */
  componentName: string;
  /**
   * 版型结构分解
   */
  structurals: ICraftSewRequireItemStructuralsItem[];
}

export interface ICraftSewRequireItemStructuralsItem {
  /**
   * 版型结构分解描述
   */
  desc: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires: ICraftSewRequireItemSewingRequiresItem[];
}
export interface ICraftSewRequireItemSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}
