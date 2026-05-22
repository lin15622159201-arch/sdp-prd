export type ICategoryMappingPageReq = {
  pageNum?: number;
  pageSize?: number;
  /** 平台编码 */
  platformCode?: string;
  /** 品类编码 */
  categoryCode?: string;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人 id */
  creatorId?: number;
  /** 创建人姓名 */
  creatorName?: string;
};

export type ICategoryMappingPageResItem = {
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
  /** 映射 ID */
  mappingId: string;
  /** 平台编码 */
  platformCode: string;
  /** 平台名称 */
  platformName: string;
  /** 品类编码 */
  categoryCode: string;
  /** 品类名 */
  categoryName: string;
  /** 关联平台品类 ID */
  platformCategoryCode: string;
  /** 关联平台品类名称 */
  platformCategoryName: string;
  /** 信息备注 */
  message: string;
};

export type ICategoryMappingPageRes = {
  pageNum: number;
  total: number;
  list: ICategoryMappingPageResItem[];
};

export type ICategoryMappingCreateReq = {
  /** 平台编码 */
  platformCode: string;
  /** 平台名称 */
  platformName: string;
  /** 品类编码 */
  categoryCode: string;
  /** 品类名 */
  categoryName: string;
  /** 关联平台品类编码 */
  platformCategoryCode: string;
  /** 关联平台品类名称 */
  platformCategoryName: string;
  /** 备注 */
  message?: string;
};
