import http from '@/core/http';
import type * as Types from './types';
import {
  IApsSupplierQueryReq,
  IApsSupplierQueryRes,
  ISpotStyleBatchCancelReq,
  ISpotStyleBatchCancelSkcReq,
  ISpotStyleBatchCancelSkcRes,
  ISpotStyleBatchCreateReq,
  ISpotStyleBatchCreateRes,
  ISpotStyleBatchEditImageReq,
  ISpotStyleBatchEditImageRes,
  ISpotStyleBatchReColorReq,
  ISpotStyleBatchReColorRes,
  ISpotStyleDetailRes,
  ISpotStyleEditReq,
  ISpotStyleEditSkcReq,
  ISpotStyleEditSkcRes,
  ISpotStyleListOptRes,
  ISpotStyleListSupplierReq,
  ISpotStyleListSupplierRes,
  ISpotStylePageReq,
  ISpotStylePageRes
} from './spot-style';

/* 数码印花款列表 */
// export const getDigitalPrintStyleList = (data: Types.IGetDigitalPrintStyleListReq) => {
//   return http.post<Types.IGetDigitalPrintStyleListRes>({
//     url: '/sdp-design/web/v1/digital-printing/page',
//     loading: true,
//     data
//   });
// };

/**
 * 列表
 * @see https://yapi.tiangong.site/project/37/interface/api/4346
 */
export const spotSpuPage = (data: Types.ISpotSpuPageReq) => {
  const url = '/sdp-design/web/v1/spot-spu/page';
  return http.post<Types.ISpotSpuPageRes>({
    url,
    data,
  });
};

/**
 * 供应商列表
 * @see yapi地址：https://yapi.tiangong.site/project/34/interface/api/1452falsetrue
 */
export const getSupplierList = () => {
  const url = '/sdp-design/web/v1/aps/supplier/query';
  return http.post<Types.ISupplierListRes>({
    url,
    loading: true,
  });
};

/*
 * 核价_tryOn信息查询
 * @see https://yapi.tiangong.site/project/37/interface/api/4350
 */
export const spotSpuPriceTryOn = (params: Types.ISpotSpuPriceTryOnReq) => {
  const url = '/sdp-design/web/v1/spot-spu/price-try-on';
  return http.post<Types.ISpotSpuPriceTryOnResItem[]>({
    url,
    data: params,
  });
};

/**
 * 新建款号
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/4358truetrue
 */
export const spotSpuSelfCreate = (data: Types.ISpotSpuSelfCreateReq) => {
  const url = '/sdp-design/web/v1/spot-spu/self-create';
  return http.post<Types.ISpotSpuSelfCreateRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 详情
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/4398truetrue
 */
export const spotSpuWebDetail = (params: Types.ISpotSpuWebDetailReq) => {
  const url = `/sdp-design/web/v1/spot-spu/web-detail/${params.styleCode}`;
  return http.get<Types.ISpotSpuWebDetailRes>({
    url,
    loading: true,
  });
};

/**
 * 编辑SPU
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/4402truefalse
 */
export const spotSpuUpdateSpuSkc = (data: Types.ISpotSpuUpdateSpuSkcReq) => {
  const url = '/sdp-design/web/v1/spot-spu/update-spu-skc';
  return http.post({
    url,
    data,
    loading: true,
  });
};

/*
 * try on任务分配
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/4206
 */
export const tryOnConfigSave = (params: Types.ITryOnConfigSaveReq) => {
  const url = '/sdp-design/web/v1/try-on-config/save';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 上传图片确认
 * @see https://yapi.tiangong.site/project/37/interface/api/4410
 */
export const pictureCommit = (params: Types.IPictureCommitReq) => {
  const url = '/sdp-design/web/v1/spot-spu/upload/picture/commit';
  return http.post<Types.IPictureCommitResItem[]>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 编辑SKC
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/4458truetrue
 */
export const spotSkcUpdate = (data: Types.ISpotSkcUpdateReq) => {
  const url = '/sdp-design/web/v1/spot-skc/update';
  return http.post<Types.ISpotSkcUpdateRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 复色
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/4454truetrue
 */
export const spotSpuColorMaking = (data: Types.ISpotSpuColorMakingReq) => {
  const url = '/sdp-design/web/v1/spot-spu/color-making';
  return http.post<Types.ISpotSpuColorMakingRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 上传图片供应商列表查询
 * @see https://yapi.tiangong.site/project/37/interface/api/4426
 */
export const getAllSupplierList = (params: Types.IAllListReq) => {
  const url = '/sdp-design/web/v1/spot-spu-supplier/all/list';
  return http.post<Types.IAllListResItem[]>({
    url,
    data: params,
  });
};

/**
 * 批量取消SKC
 * @see https://yapi.tiangong.site/project/37/interface/api/4466
 */
export const spotSkcBatchCancel = (params: Types.ISpotSkcBatchCancelReq) => {
  const url = '/sdp-design/web/v1/spot-skc/batch-cancel';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 获取复核预估核价信息
 * @see https://yapi.tiangong.site/project/37/interface/api/4670
 */
export const spotSpuGetReEstimateCheckPrice = (styleCode: string) => {
  const url = '/sdp-design/web/v1/spot-spu/get-re-estimate-check-price';
  return http.get<Types.ISpotSpuGetReEstimateCheckPriceRes>({
    url,
    loading: true,
    params: {
      styleCode,
    },
  });
};

/**
 * 核价复核 现货款
 * @see https://yapi.tiangong.site/project/38/interface/api/4430
 */
export const estimateCheckPriceReviewPriceCheck = (
  params: Types.IEstimateCheckPriceReviewPriceCheckReq
) => {
  const url = '/sdp-sample-clothes/web/v1/estimate-check-price/review-price-check';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 日志查询
 * @see https://yapi.tiangong.site/project/37/interface/api/1931
 */
export const bizList = (params: Types.IBizListReq) => {
  const url = '/sdp-design/web/v1/design/log/biz/list';
  return http.post<Types.IBizListRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * SPU供应商查询
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/4738truetrue
 */
export const spotSpuListSupplier = (data: Types.ISpotSpuListSupplierReq) => {
  const url = '/sdp-design/web/v1/spot-spu/list-supplier';
  return http.post<Types.ISpotSpuListSupplierRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 现货管理-查询任务列表
 * @see https://yapi.textile-story.com/project/1361/interface/api/103483
 */
export const fetchSpotStylePage = (params: ISpotStylePageReq) => {
  return http.post<ISpotStylePageRes>({
    url: '/sdp-curation/web/v1/spot-style/page',
    data: params,
    loading: true,
  });
};

/**
 * 现货管理-创建任务
 * @see https://yapi.textile-story.com/project/1361/interface/api/103489
 */
export const fetchSpotStyleBatchCreate = (data: ISpotStyleBatchCreateReq) => {
  return http.post<ISpotStyleBatchCreateRes>({
    url: '/sdp-curation/web/v1/spot-style/batch-create',
    data,
    loading: true,
  });
};
/**
 * 现货管理-根据编码查看详情
 * @param taskCode 任务编码
 * @see https://yapi.textile-story.com/project/1361/interface/api/103507
 */
export const fetchSpotStyleDetailByTaskCode = (taskCode: string | number) => {
  return http.get<ISpotStyleDetailRes>({
    url: `/sdp-curation/web/v1/spot-style/detail-code/${taskCode}`,
    loading: true,
  });
};
/**
 * 编辑
 * @see https://yapi.textile-story.com/project/1361/interface/api/103495
 */
export const fetchSpotStyleEdit = (params: ISpotStyleEditReq) => {
  return http.put<boolean>({
    url: '/sdp-curation/web/v1/spot-style/edit',
    data: params,
    loading: true,
  });
};

/**
 * 根据ID查看详情
 * @param taskId 任务ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/103513
 */
export const fetchSpotStyleDetailByTaskId = (taskId: string | number) => {
  return http.get<ISpotStyleDetailRes>({
    url: `/sdp-curation/web/v1/spot-style/detail/${taskId}`,
    loading: true,
  });
};

/**
 * 编辑SKC
 * @see https://yapi.textile-story.com/project/1361/interface/api/103498
 */
export const fetchSpotStyleEditSkc = (
  params: ISpotStyleEditSkcReq,
) => {
  return http.put<ISpotStyleEditSkcRes>({
    url: '/sdp-curation/web/v1/spot-style/edit-sck',
    data: params,
    loading: true,
  });
};

/**
 * 复色
 * @see https://yapi.textile-story.com/project/1361/interface/api/103501
 */
export const fetchSpotStyleBatchReColor = (data: ISpotStyleBatchReColorReq) => {
  return http.post<ISpotStyleBatchReColorRes>({
    url: '/sdp-curation/web/v1/spot-style/batch/re-color',
    data,
    loading: true,
  });
};

/**
 * 批量上架
 * @see https://yapi.textile-story.com/project/1361/interface/api/103525
 */
export const fetchSpotStyleBatchOnShelves = (taskIds: string[]) => {
  return http.put<boolean>({
    url: '/sdp-curation/web/v1/spot-style/batch/on-shelves',
    data: taskIds,
    loading: true,
  });
};

/**
 * 批量取消
 * @see https://yapi.textile-story.com/project/1361/interface/api/103531
 */
export const fetchSpotStyleBatchCancel = (data: ISpotStyleBatchCancelReq) => {
  return http.put<boolean>({
    url: '/sdp-curation/web/v1/spot-style/batch-cancel',
    data,
    loading: true,
  });
};

/**
 * 批量取消 - SKC
 * @see https://yapi.textile-story.com/project/1361/interface/api/103657
 */
export const fetchSpotStyleBatchCancelSkc = (data: ISpotStyleBatchCancelSkcReq) => {
  return http.put<ISpotStyleBatchCancelSkcRes>({
    url: '/sdp-curation/web/v1/spot-style/batch-cancel/skc',
    loading: true,
    data
  });
};

/**
 * 编辑商品图
 * @see https://yapi.tiangong.site/project/37/interface/api/4410
 */
export const fetchSpotStyleBatchEditImage = (params: ISpotStyleBatchEditImageReq) => {
  const url = '/sdp-curation/web/v1/spot-style/batch/edit-image';
  return http.post<ISpotStyleBatchEditImageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 查询操作列表
 * @see https://yapi.textile-story.com/project/1361/interface/api/103519
 */
export const fetchSpotStyleListOpt = (taskIds: string[]) => {
  return http.post<ISpotStyleListOptRes>({
    url: '/sdp-curation/web/v1/spot-style/list-opt',
    loading: true,
    data: taskIds
  });
};

/**
 * 供应商查询
 * @see https://yapi.textile-story.com/project/1361/interface/api/103660
 */
export const fetchApsSupplierQuery = (
  data: IApsSupplierQueryReq = {},
) => {
  return http.post<IApsSupplierQueryRes>({
    url: '/sdp-curation/web/v1/aps/supplier/query',
    data,
    loading: true,
  });
};

/**
 * 查询供应商列表
 * @see https://yapi.textile-story.com/project/1361/interface/api/103663
 */
export const fetchSpotStyleListSupplier = (data: ISpotStyleListSupplierReq) => {
  return http.post<ISpotStyleListSupplierRes>({
    url: '/sdp-curation/web/v1/spot-style/list-supplier',
    loading: true,
    data
  });
};

/**
 * 推送PLM买手
 * @see https://yapi.textile-story.com/project/1361/interface/api/104143
 */
export const pushBuyer = (data: string[]) => {
  return http.put({
    url: '/sdp-curation/web/v1/spot-style/push-buyer',
    data,
    loading: true,
  });
};

/**
 * 设计师变更
 *
 * @params {Types.SpotStyleDesignerChangeReq} data 设计师变更参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/114202
 * @return {*}
 */
export const spotStyleDesignerChangeApi = (data: Types.SpotStyleDesignerChangeReq) => {
  const url = '/sdp-curation/web/v1/spot-style/designer-change';

  return http.post<Types.SpotStyleDesignerChangeRes>({
    url,
    data,
    loading: true,
  });
};
