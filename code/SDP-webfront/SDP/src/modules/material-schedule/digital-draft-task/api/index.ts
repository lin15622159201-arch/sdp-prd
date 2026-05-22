import http from '@/core/http';
import type * as Types from './types';

/**
 * 根据物料确认结果ID 获取采购记录信息 -面料/辅料
 * 待删除
 */
export const getPurchaseOrderLog = (params: any) => {
  return http.get<any>({
    url: `/sdp-design/web/v1/purchase/apply/purchase-order/log/${params.demandType}/${params.orderCode}`,
    loading: true,
  });
};

/**
 * 统计数码描稿任务数量
 * @see https://yapi.tiangong.site/project/38/interface/api/3618
 */
export const digitalPaintingCountByState = () => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/count-by-state';
  return http.post<Types.IDigitalPaintingCountByStateItem[]>({
    url,
  });
};

/**
 * 查询数码描稿任务列表
 * @see https://yapi.tiangong.site/project/38/interface/api/3619
 */
export const digitalPaintingQueryByPage = (
  params: Types.IDigitalPaintingQueryByPageReq
) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/query-by-page';
  return http.post<Types.IDigitalPaintingQueryByPageRes>({
    url,
    data: params,
  });
};

/**
 * 保存数码描稿任务
 * @see https://yapi.tiangong.site/project/38/interface/api/3621
 */
export const digitalPaintingSave = (params: Types.IDigitalPaintingSaveReq) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/save';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 获取skc信息
 * @see https://yapi.tiangong.site/project/38/interface/api/3617
 */
export const designCommonSkc = (designCode: string) => {
  const url = `/sdp-sample-clothes/web/v1/design-common/skc/${designCode}`;
  return http.get<Types.IDesignCommonSkcRes>({
    url,
    loading: true,
    noCancelDuplicate: true,
  });
};

/**
 * 根据spu和skc获取描稿版次及参考描稿信息
 * @see https://yapi.tiangong.site/project/38/interface/api/3645
 */
export const digitalPaintingGetEditionTypeAndRefPainting = (
  params: Types.IDigitalPaintingGetEditionTypeAndRefPaintingReq
) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/get-edition-type-and-ref-painting';
  return http.get<Types.IDigitalPaintingGetEditionTypeAndRefPaintingRes>({
    url,
    params,
    loading: true,
    noCancelDuplicate: true,
  });
};

/**
 * 查询数码描稿任务详情信息
 * @see https://yapi.tiangong.site/project/38/interface/api/3620
 */
export const digitalPaintingGetById = (digitalPaintingId: string) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/get-by-id';
  return http.get<Types.IDigitalPaintingGetByIdRes>({
    url,
    params: {
      digitalPaintingId,
    },
    loading: true,
  });
};

/**
 * 撤回任务
 * @see https://yapi.tiangong.site/project/38/interface/api/3626
 */
export const digitalPaintingWithdraw = (
  params: Types.IDigitalPaintingWithdrawReq
) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/withdraw';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 取消任务
 * @see https://yapi.tiangong.site/project/38/interface/api/3627
 */
export const digitalPaintingCancel = (params: Types.IDigitalPaintingCancelReq) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/cancel';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 审核
 * @see https://yapi.tiangong.site/project/38/interface/api/3628
 */
export const digitalPaintingAudit = (params: Types.IDigitalPaintingAuditReq) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/audit';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 指定花型面料的SKU
 * @see https://yapi.tiangong.site/project/38/interface/api/3629
 */
export const digitalPaintingChangeFabricSku = (
  params: Types.IDigitalPaintingChangeFabricSkuReq
) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/change-fabric-sku';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 复制重做描稿任务
 * @see https://yapi.tiangong.site/project/38/interface/api/3625
 */
export const digitalPaintingCopyRedo = (
  params: Types.IDigitalPaintingCopyRedoReq
) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/copy-redo';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 根据名称模糊查询板房列表
 * @see https://yapi.tiangong.site/project/40/interface/api/2260
 */
export const getSupplierList = (params: Types.IListNameReq) => {
  const url = '/sdp-customer/web/clothing-room/list/name';
  return http.post<Types.IListNameItem[]>({
    url,
    data: params,
  });
};

/**
 * 通过PID(商品编码)查询在好料网已上架商品详情
 * @see https://yapi.tiangong.site/project/38/interface/api/3662
 */
export const digitalPaintingGetCommodityDetailByCode = (commodityCode: string) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/get-commodity-detail-by-code';
  return http.get<Types.IDigitalPaintingGetCommodityDetailByCodeRes>({
    url,
    params: {
      commodityCode,
    },
    noCancelDuplicate: true,
  });
};

/**
 * 查询供应商的描稿费用
 * @see https://yapi.tiangong.site/project/38/interface/api/3750
 */
export const digitalPaintingGetDigitalPaintingFee = (
  params: Types.IDigitalPaintingGetDigitalPaintingFeeReq
) => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/get-digital-painting-fee';
  return http.post<string>({
    url,
    data: params,
    loading: true,
    noCancelDuplicate: true,
  });
};

/**
 * 列表出描稿类型
 * @see https://yapi.tiangong.site/project/38/interface/api/3970
 */
export const digitalPaintingListPaintingType = () => {
  const url = '/sdp-sample-clothes/web/v1/digital-painting/list-painting-type';
  return http.get<Types.IDigitalPaintingListPaintingTypeItem[]>({
    url,
  });
};
