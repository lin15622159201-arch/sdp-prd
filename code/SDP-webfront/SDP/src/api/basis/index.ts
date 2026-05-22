import http from '@/core/http';
import type {
  IDesignerGroupDataListReq, IDesignerGroupDataListRes,
  IDeliveryListReq, IDeliveryListRes,
  ISizeHoppingRulesListReq, ISizeHoppingRulesListRes,
  IClothesPartsSizeListReq, IClothesPartsSizeListRes, IDesignerListRes, IDesignerListReq,
  IClothingModelListReq, IClothingModelListRes,
  IListNameReq, IListNameRes,
  ITechniqueGroupPageReq, ITechniqueGroupPageRes,
  IClothingMaterialClothingTagReq, IClothingMaterialClothingTagRes,
  IReworkResponsibilityPageReq,
  IReworkResponsibilityPageRes,
  IRemarksSaveReq,
  IRemarksSaveRes,
  DevelopStyleRemarkReq,
  DevelopStyleRemarkRes
} from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

/* 【设计组别】查询列表（非分页接口） */
export const desigGroupDataList = (data: IDesignerGroupDataListReq) => {
  return http.post<IDesignerGroupDataListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/clothes/designer-group/data-list',
    data,
  });
};

/* 【设计师】查询列表（非分页接口） */
export const designerUserList = (data: IDesignerListReq) => {
  return http.post<IDesignerListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/clothes/designer/list',
    data,
  });
};
// /* 【人员】查询列表 */
// export const getAllUserList = (keyword: string) => {
//   const url = `/authManage/user/search/${keyword}`;
//   return http.get<{ users: UserItem[]; }>({
//     url,
//     server: DOMAIN_SYSTEM_ENUM.baibu,
//   });
// };

/* 【交期类型表】查询列表（不分页） */
export const deliveryList = (data: IDeliveryListReq) => {
  return http.post<IDeliveryListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/delivery/list',
    data,
  });
};

/* 【尺码跳码规则】查询列表(不分页) */
export const sizeRulesList = (data: ISizeHoppingRulesListReq) => {
  return http.post<ISizeHoppingRulesListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/size-hopping-rules/list',
    data,
  });
};

/* 【尺寸部位】查询列表（不分页） */
export const clothesPartsSize = (data: IClothesPartsSizeListReq, loading: boolean = false) => {
  return http.post<IClothesPartsSizeListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/clothes-parts-size/list',
    data,
    loading,
  });
};

/* 版型列表 */
export const clothingModelList = (data: IClothingModelListReq) => {
  return http.post<IClothingModelListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/clothing-model/list',
    data,
  });
};

/* 版房管理 api */

/* 根据名称模糊查询版房列表 */
export const clothingRoomList = (data: IListNameReq) => {
  return http.post<IListNameRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-customer/web/clothing-room/list/name',
    data,
  });
};

/* 根据名称模糊查询技术组别 */
export const techniqueGroupList = (params: ITechniqueGroupPageReq) => {
  return http.get<ITechniqueGroupPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/technique-group/page',
    params,
  });
};

/* 全量标签列表 */
export const getClothingTag = (params: IClothingMaterialClothingTagReq) => {
  return http.get<IClothingMaterialClothingTagRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/clothing-tag',
    params,
    loading: true,
  });
};

/* 返修责任方-查询列表 */
export const reworkResponsibilityList = (data: IReworkResponsibilityPageReq) => {
  // return Promise.resolve(Mock.r1 as any);
  return http.post<IReworkResponsibilityPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/reworkResponsibility/page',
    data,
    // loading: true,
  });
};

/* 备注信息 */

/* 【设计打版备注信息】新建 */
export const remarksSave = (data: IRemarksSaveReq) => {
  return http.post<IRemarksSaveRes>({
    url: '/sdp-design/web/v1/design/remarks/save',
    data,
    loading: true,
  });
};

/* 【开款备注信息】新建 */
export const remarksSaveToType = (data: DevelopStyleRemarkReq) => {
  return http.post<DevelopStyleRemarkRes>({
    url: '/sdp-curation/web/v1/develop-style/remark',
    data,
    loading: true,
  });
};
