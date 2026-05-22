import { FormItemRule, FormRules } from 'element-plus';
import { ISelectionConfirmItem, ISelectionImportRes, ISelectionPageResListItem } from './api/type';
import { CONFIRM_QUOTE_ENUM, IMPORT_TYPE_ENUM, SELECTION_RESULT_ENUM } from './constant';

export interface ITableItem extends ISelectionPageResListItem {
}

export interface ISelectionTableItem {

}

export interface OptionTransformedItem {
  value: string;
  label: string;
  children: OptionTransformedItem[];
}

export interface Option {
  value: number;
  label: string;
}

export interface ColumItem {
  prop:string;
  label:string;
  type?:'input' | 'select' | 'image' | 'inputNumber' | 'cascader';
  rules?:FormRules;
  width?:string;
  minWidth?:string;
  options?:any[];
  fixed?:'left' | 'right';
  formitemWdith?:string;
  rule?:FormItemRule[];
  customRule?:(data:any) => FormItemRule[];
  placeholder?:string;
}

/**
 * 结果弹窗配置
 */
export interface ResultDialogConfig {
  title: string;
  width: number;
  class: string;
}

/**
 * 批量选款表格行
 */
export interface IBatchSelectionRow extends ISelectionPageResListItem {
  /**
   * 选款结果
   */
  currentSelectionResult?:SELECTION_RESULT_ENUM;
}

/**
 * 批量报价表格行
 */
export interface IBatchQuoteRow extends ISelectionPageResListItem {
  /**
   * 当前采购价
   */
  currentpurchasePrice?: number | null;
  /**
   * 报价结果
   */
  currentQuoteResult?: SELECTION_RESULT_ENUM | null;
  /**
   * 颜色
   */
  currentColor?: string;
}

/**
 * 批量确认表格行
 */
export interface IBatchConfirmRow extends ISelectionConfirmItem {
  currentQuoteResult?: CONFIRM_QUOTE_ENUM;
  currentStoreName?: string;
  currentPalletTypeName?: string;
  currentSceneName?: string;
  currentModoName?: string;
  currentWavebandName?: string;
  currentExpectedPrice?: number;
  currentProductName?: string;
}

/**
 * 现货选款-导入结果弹窗参数
 */
export interface ISelectionImportResultDialogParams extends ISelectionImportRes {
  importType: IMPORT_TYPE_ENUM;
}
