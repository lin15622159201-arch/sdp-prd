import http from '@/core/http';
import type * as Types from './types';

/**
 * 【设计款号管理】查询列表（分页）
 */
export const postWebV1PrototypeManagePageApi = (data: Types.PostWebV1PrototypeManagePageApiReq) => {
  return http.post<Types.PostWebV1PrototypeManagePageApiRes>({
    // url: '/sdp-design/web/v1/prototype-manage/page',
    url: '/sdp-curation/web/v1/prototype-manage/page',
    data,
    loading: true,
  });
};

/**
 * SKC日志查询
 *
 * @params {Types.LogListReq} data SKC日志查询参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103642
 * @return {*}
 */
export const logListApi = (data: Types.LogListReq) => {
  const url = '/sdp-curation/web/v1/design/log/list';

  return http.post<Types.LogListRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 打版_核价-批量查询
 */
export const postDesignPriceProduceInfoApi = (data: Types.IPrototypeManageClothesPriceProductReq) => {
  return http.post<Types.IPrototypeManageClothesPriceProductRes>({
    url: '/sdp-design/web/v1/prototype-manage/clothes-price',
    data,
    loading: true,
  });
};
/**
 * 发起打版 (款式开发)
 */
export const postMakeClothes = (data: Types.IPostMakeClothesReq) => {
  return http.post<Types.IPostMakeClothesRes>({
    url: '/sdp-design/web/v1/prototype-manage/make-clothes',
    data,
    loading: true,
  });
};
/**
 * 【设计款号管理】取消设计款
 */
export const postWebV1PrototypeManageCancelApi = (data: Types.PostWebV1PrototypeManageCancelApiReq) => {
  return http.post({
    url: '/sdp-curation/web/v1/prototype-manage/cancel',
    data,
    loading: true,
  });
};
/**
 * 设计师变更
 */
export const actionChangeDesigner = (data: Types.IPrototypeManageDesignerChangeReq) => {
  return http.post({
    url: '/sdp-curation/web/v1/prototype-manage/designer-change',
    data,
    loading: true,
  });
};
/**
 * 复色按钮
 */
export const actionColorsMaking = (data: Types.IPrototypeManageColorsMakingReq) => {
  return http.post({
    url: '/sdp-curation/web/v1/prototype-manage/colors-making',
    data,
    loading: true,
  });
};


/**
 * 新建备注
 *
 * @params {Types.RemarksSaveReq} data 新建参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103669
 * @return {*}
 */
export const remarksSave = (data: Types.RemarksSaveReq) => {
  const url = '/sdp-curation/web/v1/design/remarks/save';

  return http.post<Types.RemarksSaveRes>({
    url,
    data,
    loading: true,
  });
};


/**
 * 批量查询-根据设计款号批量查询
 *
 * @params {Types.BatchListReq} data 批量查询-根据设计款号批量查询参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103672
 * @return {*}
 */
export const remarksBatchList = (data: Types.BatchListReq) => {
  const url = '/sdp-curation/web/v1/design/remarks/batch/list';

  return http.post<Types.BatchListRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 批量查询设计版单打印信息
 */
export const fetchMultiplePrototypePrint = (data: Types.IPrototypePrintBatchReq) => {
  return http.post<Types.IPrototypePrintBatchRes>({
    url: '/sdp-curation/web/v1/prototype-manage/print-batch',
    data,
    loading: true,
  });
};
/**
 * 创建SPU
 */
export const createSpu = (data: Types.DesignSpuSaveReq) => {
  return http.post<Types.ICreateSpuRes>({
    url: '/sdp-curation/web/v1/design-spu/save',
    data,
    loading: true,
  });
};
/**
 * 更新SPU
 */
export const updateSpu = (data: Types.DesignSpuSaveReq) => {
  return http.put<Types.ICreateSpuRes>({
    url: '/sdp-curation/web/v1/design-spu/update',
    data,
    loading: true,
  });
};
/**
 * 查询SPU详情
 */
export const getSpuDetail = (data: Types.IGetSpuDetailReq) => {
  return http.get<Types.DesignSpuSaveReq>({
    url: `/sdp-curation/web/v1/design-spu/web-detail/${data.prototypeId}`,
    loading: true,
  });
};

/**
 * 查询SPU详情
 */
export const getCodeSpuDetail = (data: { designStyleCode: string; }) => {
  return http.get<Types.DesignSpuSaveReq>({
    url: `/sdp-curation/web/v1/design-spu/web-detail-by-code/${data.designStyleCode}`,
    loading: true,
  });
};


/**
 * 查询SKC详情
 */
export const getSkcDetail = (params: Types.IGetSkcDetailReq) => {
  return http.get<Types.IGetSkcDetailRes>({
    // url: `/sdp-design/web/v1/prototype-manage/base-info/${params.designCode}`,
    url: `/sdp-curation/web/v1/prototype-manage/base-info/${params.prototypeId}`,
    loading: true,
    params,
  });
};

/**
 * 根据当前设计款号查找可用的复色款号
 */
export const querySkcListByCode = (params: Types.IQuerySkcListByCodeReq) => {
  return http.get<Types.IQuerySkcListByCodeRes>({
    url: `/sdp-design/web/v1/prototype/make-same/query-design-codes/${params.designCode}`,
    loading: true,
  });
};
/**
 * 获取复色款号的详情
 */
export const getPrototypeMakeSameInfo = (params: Types.IGetPrototypeMakeSameInfoReq) => {
  return http.get<Types.IGetPrototypeMakeSameInfoRes>({
    url: `/sdp-design/web/v1/prototype/make-same-info/${params.designCode}`,
    loading: true,
    params,
  });
};
/**
 * 更新SKC
 */
export const updateSkcInfo = (data: Types.PrototypeManageSaveReq) => {
  return http.put<Types.PrototypeManageSaveRes>({
    url: '/sdp-curation/web/v1/prototype-manage/save',
    loading: true,
    data,
  });
};

/** 根据设计款号查询最新bom单基础信息 */
export const latestBaseInfo = (params: Types.ILatestBaseInfoReq) => {
  const url = `/sdp-design/web/v1/bom/latest/base-info/${params.designCode}`;
  return http.get<Types.ILatestBaseInfoRes>({
    url,
    loading: true,
  });
};

/**
 * 根据skc查询最新bom单物料图片信息
 * @see https://yapi.tiangong.site/project/37/interface/api/5290
 */
export const bomMaterialPicture = (params: Types.IBomMaterialPictureReq) => {
  const url = '/sdp-design/web/v1/bom/material-picture';
  return http.post<Types.IBomMaterialPictureResItem[]>({
    url,
    data: params,
  });
};

/**
 * 设计师列表查询
 *
 * @params {Types.DesignerListReq} data 设计师列表查询参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103801
 * @return {*}
 */
export const designerListApi = (data: Types.DesignerListReq) => {
  const url = '/sdp-curation/web/v1/designer/list';

  return http.post<Types.DesignerListRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 推送PLM
 *
 * @see https://yapi.textile-story.com/project/1361/interface/api/103867
 * @return {*}
 */
export const pushPlm = (data: {
  designerId?: string;
  designerName?: string;
  prototypeIds?: string[];
}) => {
  const url = '/sdp-curation/web/v1/prototype-manage/push-plm';

  return http.post({
    url,
    data,
    loading: true,
  });
};

/**
 * 上架
 */
export const updonShelves = (data: string[]) => {
  return http.put({
    url: '/sdp-curation/web/v1/prototype-manage/batch/on-shelves',
    loading: true,
    data,
  });
};
