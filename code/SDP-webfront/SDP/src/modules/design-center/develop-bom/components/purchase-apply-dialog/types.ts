import {
  IDetailLatestRes,
  IDetailLatestBomOrderMaterialListItem,
  IApplyMaterialPurchaseBatchReq,
  IApplyMaterialPurchaseBatchPurchaseApplyListItem,
} from '@/modules/design-center/api/purchase-apply/types';
import { YES_NO_ENUM } from '@/constant';

/**
 * el-form校验callback的类型
 */
// interface ValidateError {
//   message: string;
//   field: string;
// }

// type FieldErrorList = Record<string, ValidateError[]>;

export type IElFormValidateCallback = (error?: string | Error | undefined) => void;

export type IDetail = IDetailLatestRes;
export interface IBomOrderMaterialListItem extends IDetailLatestBomOrderMaterialListItem {
  /**
   * 色卡图
   */
  __f_colorCardPictureList?: { url: string; }[];
  /**
   * 是否自有余料，如果是，则固定传值"6"给cutMethod字段，如果否，则cutMethod设置为空
   */
  __f_isRemainMaterial?: YES_NO_ENUM;
  /**
   * 备注
   */
  __f_remark?: string;

}
export interface IBomOrderMaterialListItemAvatar extends IBomOrderMaterialListItem {
  cutMethod: string;
  remark: string;
  purchaseQuantity: string;
  purchaseUnit: string;
  materialCategory: string;
  materialName: string;
  colorCardPictureUrl: string;
  matchPicture: string;
  materialColorNo: string;
  materialColor: string;
  materialCode: string;
  cuttingProcess: string;
}

export type IBatchSubmitRequestParam = IApplyMaterialPurchaseBatchReq;
export type IPurchaseApplyListItem = IApplyMaterialPurchaseBatchPurchaseApplyListItem & IBomOrderMaterialListItemAvatar;

export enum VALID_STATE_ENUM {
  YES = '1',
  NO = '0',
}

export enum MATCH_COLOR_SKU_ATTR_ENUM {
  NORMAL = '2',
  ERROR = '1',
}
