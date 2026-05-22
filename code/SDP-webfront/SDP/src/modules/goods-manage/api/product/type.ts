import { YES_NO_NUMBER_ENUM } from '@/constant';
import { PRODUCT_STATUS_ENUM, SKC_STATUS_ENUM } from '../../views/product-list/constant';

export type IProductPageReq = {
  pageNum?: number;
  pageSize?: number;
  /** 平台商品 ID */
  platformProductId?: number;
  /** 款号 */
  styleCode?: string;
  /** 平台SKC ID */
  platformSkcId?: number;
  /** SKC 编码 */
  skcCode?: string;
  /** 平台SKC ID */
  platformSkuId?: number;
  /** SKU 编码 */
  skuCode?: string;
  /** 运营人员 ID */
  businessOperatorId?: number;
  /** 店铺 ID */
  shopId?: number;
  /** 设计师 id */
  designerId?: number;
  /** 上架人 id */
  onShelvesId?: number;
  /** 波段编码 */
  waveBandCode?: string;
  /** 款式标签编码 */
  styleLabelCode?: string;
  /** SKC 状态 */
  skcStatus?: number;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人 id */
  creatorId?: number;
  /** 创建人姓名 */
  creatorName?: string;
  /** 前置拆版状态 */
  preDisassemblyState?: YES_NO_NUMBER_ENUM;
  /** 商品标签 */
  labels?: string[];
};

export type IProductPageResItemSku = {
  /** 创建人 ID */
  creatorId: number;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 修改人 ID */
  reviserId: number;
  /** 修改人名称 */
  reviserName: string;
  /** 更新时间 */
  revisedTime: string;
  /** 主键 ID */
  skuId: number;
  /** 平台SKU ID */
  platformSkuId: number;
  /** SKU 编码 */
  skuCode: string;
  /** 平台颜色 */
  platformColor: string;
  /** 平台颜色 */
  color: string;
  /** 平台尺码 */
  platformSize: string;
  /** 尺码 */
  size: string;
};

export type IProductPageResItemSkc = {
  /** 创建人 ID */
  creatorId: number;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 修改人 ID */
  reviserId: number;
  /** 修改人名称 */
  reviserName: string;
  /** 更新时间 */
  revisedTime: string;
  /** 主键 ID */
  skcId: number;
  /** 平台SKC ID */
  platformSkcId: number;
  /** 平台颜色 */
  platformColor: string;
  /** 平台颜色 */
  color: string;
  /** SKC 编码 */
  skcCode: string;
  /** SKC 状态 */
  skcStatus: number;
  /** SKU 列表 */
  skus: IProductPageResItemSku[];
};

export type IProductPageResItem = {
  /** 创建人 ID */
  creatorId: number;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 修改人 ID */
  reviserId: number;
  /** 修改人名称 */
  reviserName: string;
  /** 更新时间 */
  revisedTime: string;
  /** 主键 ID */
  productId: string;
  /** 平台商品 ID */
  platformProductId: number;
  /** 款ID */
  styleId: number;
  /** 款号 */
  styleCode: string;
  /** 商品名称 */
  productName: string;
  /** 款式品类编码 */
  categoryCode: string;
  /** 款式品类名 */
  categoryName: string;
  /** 开款类型 */
  styleType: string;
  /** 店铺 ID */
  storeId: number;
  /** 店铺名称 */
  storeName: string;
  /** 运营人员 ID */
  businessOperatorId: number;
  /** 运营人员名称 */
  businessOperatorName: string;
  /** 波段名称 */
  waveBandName: string;
  /** 款式标签名称 */
  styleLabelName: string;
  /** 项目类型 */
  projectTypeName?: string;
  /** 设计师 id */
  designerId: number;
  /** 设计师名称 */
  designerName: string;
  /** 设计师组别名称 */
  designerGroupName: string;
  /** 上架人 id */
  onShelvesId: number;
  /** 上架人名称 */
  onShelvesName: string;
  /** 上架时间 */
  onShelvesTime: string;
  /** 商品标签 */
  labels: string[];
  /** SKC 列表 */
  skcs: IProductPageResItemSkc[];
  /** 素材图 */
  materialImgUrl: string;
  /** 前置拆版状态 */
  preDisassemblyState: YES_NO_NUMBER_ENUM;
  /** 商品状态 */
  productStatus: PRODUCT_STATUS_ENUM;
  /** 更新失败原因 */
  failMessage?: string;
};

export type IProductPageRes = {
  pageNum: number;
  total: number;
  list: IProductPageResItem[];
};


export type IProductStateTotalReq = {
  pageNum?: number;
  pageSize?: number;
  /** 平台商品 ID */
  platformProductId?: number;
  /** 款号 */
  styleCode?: string;
  /** 平台SKC ID */
  platformSkcId?: number;
  /** SKC 编码 */
  skcCode?: string;
  /** 平台SKC ID */
  platformSkuId?: number;
  /** SKU 编码 */
  skuCode?: string;
  /** 运营人员 ID */
  businessOperatorId?: number;
  /** 店铺 ID */
  shopId?: number;
  /** 设计师 id */
  designerId?: number;
  /** 上架人 id */
  onShelvesId?: number;
  /** 波段编码 */
  waveBandCode?: string;
  /** 款式标签编码 */
  styleLabelCode?: string;
  /** SKC 状态 */
  skcStatus?: number;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人 id */
  creatorId?: number;
  /** 创建人姓名 */
  creatorName?: string;
  /** 商品标签 */
  labels?: string[];
};

export type IProductStateTotalRes = {
  /** 状态 */
  taskStatus: SKC_STATUS_ENUM;
  /** 总数 */
  total: number;
}[];

export type IProductTestPriceReq = {
  /** 商品ID */
  productId: string;
  /** 是否通过 */
  pass: YES_NO_NUMBER_ENUM;
};
