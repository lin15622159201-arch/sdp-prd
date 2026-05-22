import { YES_NO_NUMBER_ENUM } from '@/constant';
import { PICK_STATE_ENUM } from '@/modules/selection-manage/aigc-selection-list/constant';
import type { IFile } from '@/components/uploader/packages/types';
import {
  IPickingStylePageResListItem,
  IPickingStylePageResPickingStyleDetailsItem,
  IPickingStylePageResPickingStyleImagesItem,
} from '@/modules/selection-manage/aigc-selection-list/api/type';

export interface IPicList extends IPickingStylePageResPickingStyleImagesItem {
  /** 排序 */
  idx: number;
}

export interface IStyleList extends Omit<IPickingStylePageResPickingStyleDetailsItem, 'pickingStyleImages'> {
  select: boolean;
  idx: number;
  previewSrcs: string[];
  pickingStyleImages: IPicList[];
}

export interface IDataItem extends Omit<IPickingStylePageResListItem, 'pickingStyleDetails'> {
  pickingStyleDetails: IStyleList[];
  select: boolean;
}

export interface ISelectIdList {
  check: string[];
  uncheck: string[];
  status: YES_NO_NUMBER_ENUM;
}

export interface IFormData {
  pickingState: PICK_STATE_ENUM;
  suggestedPrice: number;
  /** 风格 */
  styles: string[];
  styleName: string;
  /** 品类 */
  category: string[];
  categoryName: string;
  /** 波次 */
  wave: string[];
  /** 问题反馈 */
  problemCodes: string[][];
  suggestedShopName: string;
  suggestedShopId: string;
  suggestedCountrySiteCode: string;
  suggestedPrintingCode: string;
  cargoTrayCode: string;
  remark: string;
  fileList: IFile[];
  /** 场景 */
  sceneCode: string;
  sceneName: string;
  /** 商品主题 */
  productTheme: string;
}

export interface ISelectedPicsTab {
  data: IFormData;
  id: string;
  name: string;
}
