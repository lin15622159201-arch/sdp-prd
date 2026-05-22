import {
  IMPORT_TYPE_ENUM,
  SUBMIT_STATUS_ENUM,
  IDENTIFY_STATUS_ENUM,
} from '@/modules/inspiration-center/inspiration-source/constant';
import type { IFile } from '@/components/uploader/packages/types';

export interface ITableItem {
  identifiedCategoryCode?: string;
  id: string;
  isSelect: boolean;
  /** 企划来源 */
  planSource: string;
  /** 波次 */
  waves: string;
  wavesCode: string;
  /** 灵感图 */
  inspirationImg: string;
  /** 外部品类 */
  outCategory: string;
  /** 灵感图来源 */
  inspirationImageSource: string;
  /** 来源国家站点 */
  country: string;
  /** 竞品划线价 */
  uPrice: string;
  /** 竞品售价 */
  price: string;
  /** 建议供给方式 */
  supplyName: string;
  supplyMode: string;
  /** 灵感创建时间 */
  createdTime: string;
  /** 数据来源 */
  dataSource: string;
  /** 识别品类 */
  category: string;
  /** 识别结果 */
  result: IDENTIFY_STATUS_ENUM;
  /** 款式类型 */
  styleType: string;
  /** 识别标签 */
  tags: string[];
  /** 灵感提交次数 */
  submitNum: string;
  /** 状态 */
  status: SUBMIT_STATUS_ENUM;
  /** 灵感编号 */
  inspirationCode: string;
  /** 创建人名称 */
  creatorName: string;
  /** 创建人ID */
  creatorId: string;
  inspirationBrand: string;
}

export interface IImportDataForm {
  fileName: string;
  file: File | null;
  fileType: IMPORT_TYPE_ENUM;
  supplyMode: string;
  waves: string;
  plan: string;
  country: string;
  imgFile: IFile[];
  inspirationImageSourceCode: string;
  inspirationBrandCode: string;
  styleCode?: string;
  ageCode?: string;
  popularCode?: string;
  styleSourceCode?: string;
  styleSourceName?: string;
}
export interface IImportSupplyOptions {
  value?: string;
  code?: string;
}
