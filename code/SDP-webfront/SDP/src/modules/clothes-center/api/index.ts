import http from '@/core/http';
import * as Types from './types';

/**
 * 部位模版引用列表查询
 * @see yapi地址：https://yapi.tiangong.site/project/420/interface/api/51442
 */
export const positionTemplateListWithEntry = (data: Types.IPositionTemplateListWithEntryReq) => {
  const url = '/customer/managed/web/position-template/list-with-entry';
  return http.post<Types.IPositionTemplateListWithEntryRes>({
    url,
    data,
    loading: false,
  });
};

/**
 * 查询列表（分页）返修/复版责任方
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2967
 */
export const reworkResponsibilityPage = (params: Types.IReworkResponsibilityPageReq) => {
  const url = '/sdp-clothing-material/web/v1/reworkResponsibility/page';
  return http.post<Types.IReworkResponsibilityPageRes>({
    url,
    data: params,
    loading: false
  });
};

/**
 * 处理环节节点状态统计
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2830
 */
export const getStepNodeStateCount = (params: Types.IStepNodeStateCountReqs) => {
  const url = '/sdp-sample-clothes/web/v1/sample-clothes/step-node-state/count';
  return http.post<Types.IStepNodeStateCountRes>({
    url,
    data: params,
    noCancelDuplicate: true
  });
};

/**
 * 处理环节统计
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2829
 */
export const getStepNodeCount = (params: Types.IStepNodeCountReq) => {
  const url = '/sdp-sample-clothes/web/v1/sample-clothes/step-node/count';
  return http.post<Types.IStepNodeCountRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 节点处理环节统计
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2317
 */
export const stepNodeCount = (params: Types.IProcessStepNodeCountReq) => {
  const url = '/sdp-sample-clothes/web/v1/step-node/count';
  return http.post<Types.IProcessStepNodeCountRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 添加备注
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2598
 */
export const remarkAdd = (params: Types.IRemarkAddReq) => {
  const url = '/sdp-sample-clothes/web/v1/remark/add';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 【尺寸模版库】查询列表（非分页）
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2624
 */
export const sizeTemplateList = (params: Types.ITemplateListReq) => {
  const url = '/sdp-clothing-material/web/v1/size/template/list';
  return http.post<Types.ITemplateListRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 部件模板的分页查询（根据名称查明细）
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2618
 */
export const sewingComponentTemplatePageByName = (params: Types.ISewingComponentTemplatePageByNameReq) => {
  const url = '/sdp-clothing-material/web/v1/sewingProcess/sewingComponentTemplate/page';
  return http.post<Types.ISewingComponentTemplatePageByNameRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 工序部件模版查询列表（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2610
 */
export const sewingComponentTemplatePage = (params: Types.ISewingComponentTemplatePageReq) => {
  const url = '/sdp-clothing-material/web/v1/sewingComponentTemplate/page';
  return http.post<Types.ISewingComponentTemplatePageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 加工单详情
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2453
 */
export const sampleClothesInfoDetail = (params: Types.ISampleClothesInfoDetailReq) => {
  const url = `/sdp-sample-clothes/web/v1/sample-clothes/info-detail/${params.clothesId}`;
  return http.get<Types.ISampleClothesInfoDetailRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 获取bom详情信息
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2637
 */
export const designCommonBom = (params: Types.IDesignCommonBomReq) => {
  const url = `/sdp-sample-clothes/web/v1/design-common/bom/${params.designCode}`;
  return http.get<Types.IDesignCommonBomRes>({
    url,
    loading: true
  });
};

/**
 * 查询纸样师或版房订单数量（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2832
 */
export const patternClothesMakerRoom = (params: Types.IPatternClothesMakerRoomReq) => {
  const url = '/sdp-sample-clothes/web/v1/pattern-clothes/maker-room';
  return http.post<Types.IPatternClothesMakerRoomRes>({
    url,
    data: params,
  });
};

/**
 * 通过尺寸模板code获取详细信息
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2625
 */
export const templateDetailedInfo = (params: Types.ITemplateDetailedInfoReq) => {
  const url = `/sdp-clothing-material/web/v1/size/template/detailedInfo/${params.templateCode}`;
  return http.get<Types.ITemplateDetailedInfoRes>({
    url,
    loading: false
  });
};

/**
 * 【尺寸】查询列表（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2623
 */
export const templatePage = (params: Types.ITemplatePageReq) => {
  const url = '/sdp-clothing-material/web/v1/size/template/page';
  return http.post<Types.ITemplatePageRes>({
    url,
    data: params,
    loading: false
  });
};

/**
 * 通过BOMID获取bom详情信息
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/3245
 */
export const designCommonGetBomById = (params: Types.IDesignCommonGetBomByIdReq) => {
  const url = `/sdp-sample-clothes/web/v1/design-common/get-bom-by-id/${params.bomId}`;
  return http.get<Types.IDesignCommonGetBomByIdRes>({
    url,
    loading: true
  });
};
