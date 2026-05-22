import { TableColumnCtx } from 'element-plus';
import { IAuditCraftTemplateSaveTemplateReq } from '../../api/type';

export interface IComponentListItem {
  value: string;
  label: string;
}

export interface IListItem {
  /** 必须唯一，仅用于row-key */
  id: string;
  selectedComponentId: string;
  componentId: string;
  /** 部件名称 */
  componentName: string;
  /** 父级Id,格式：一级id+','+二级id+','+三级id */
  parentId: string;
  structuralDes: string;
  selectedStructuralId: string;
  sewingRequires: string;
}

export interface IFormData extends IAuditCraftTemplateSaveTemplateReq {
  templateName: string;
  categoryCodes: string[];
  /** 引用模板的Id */
  referenceTemplateId: string;
  list: IListItem[];
}

export interface ITreeNode {
  id: string;
  componentName: string;
  selectedComponentId: string;
  componentId: string;
  children: {
    id: string;
    structuralDes: string;
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
