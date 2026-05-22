import http from '@/core/http';
import * as Types from './type';

/**
 * design-花型提取-列表查询
 * @see https://yapi.tiangong.site/project/18/interface/api/503
 */
export const getFloralPrintExtractionPage = (
  params: Types.IFloralPrintExtractionPageReq
) => {
  const url = '/inspiration/frontend/web/task/floral-print-extraction/page';
  return http.post<Types.IFloralPrintExtractionPageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * design-花型提取-创建任务
 * @see https://yapi.tiangong.site/project/18/interface/api/502
 */
export const floralPrintExtractionCreate = (
  params: Types.IFloralPrintExtractionCreateReq
) => {
  const url = '/inspiration/frontend/web/task/floral-print-extraction/create';
  return http.post({
    url,
    data: params,
    loading: true,

  });
};

/**
 * design-花型提取-中止按钮
 * @see https://yapi.tiangong.site/project/18/interface/api/505
 */
export const floralPrintExtractionAbort = (taskCode: string) => {
  const url = `/inspiration/frontend/web/task/floral-print-extraction/abort/${taskCode}`;
  return http.post({
    url,
    loading: true,
  });
};

/**
 * design-花型提取-删除按钮
 * @see https://yapi.tiangong.site/project/18/interface/api/506
 */
export const floralPrintExtractionDeleted = (taskCode: string) => {
  const url = `/inspiration/frontend/web/task/floral-print-extraction/deleted/${taskCode}`;
  return http.post({
    url,
    loading: true,
  });
};

/**
 * design-花型提取-重试按钮
 * @see https://yapi.tiangong.site/project/18/interface/api/507
 */
export const floralPrintExtractionRetry = (taskCode: string) => {
  const url = `/inspiration/frontend/web/task/floral-print-extraction/retry/${taskCode}`;
  return http.post({
    url,
    loading: true,
  });
};

/**
 * design-花型提取-查询任务详情
 * @see https://yapi.tiangong.site/project/18/interface/api/508
 */
export const getFloralPrintExtractionDetail = (taskCode: string) => {
  const url = `/inspiration/frontend/web/task/floral-print-extraction/detail/${taskCode}`;
  return http.post<Types.IFloralPrintExtractionDetailRes>({
    url,
    loading: true,
  });
};

/**
 * 花型提取-创建-识别花型mask坐标
 * @see https://yapi.tiangong.site/project/20/interface/api/550
 */
export const flowerPatternMarkCreate = (
  params: Types.IFlowerPatternMarkCreateReq
) => {
  const url = '/butted/web/flower-pattern-mark/create';
  return http.post<string>({
    url,
    data: params,

    loading: true,
  });
};

/**
 * 花型提取-创建-识别花型mask坐标详情
 * @see https://yapi.tiangong.site/project/20/interface/api/551
 */
export const getWebFlowerPatternMark = (taskId: string) => {
  const url = `/butted/web/flower-pattern-mark/${taskId}`;
  return http.get<Types.IWebFlowerPatternMarkRes>({
    url,

    loading: false,
  });
};

/**
 * 花型提取-消除褶皱-自动识别-创建
 * @see https://yapi.tiangong.site/project/20/interface/api/552
 */
export const wrinkleMarkCreate = (params: Types.IWrinkleMarkCreateReq) => {
  const url = '/butted/web/wrinkle-mark/create';
  return http.post<string>({
    url,
    data: params,

  });
};

/**
 * 花型提取-消除褶皱-自动识别-详情
 * @see https://yapi.tiangong.site/project/20/interface/api/553
 */
export const getWebWrinkleMark = (taskId: string) => {
  const url = `/butted/web/wrinkle-mark/${taskId}`;
  return http.get<Types.IWebWrinkleMarkRes>({
    url,

  });
};

/**
 * 花型提取-消除褶皱-开始消除-创建
 * @see https://yapi.tiangong.site/project/20/interface/api/554
 */
export const wrinkleEliminateCreate = (params: Types.IWrinkleEliminateCreateReq) => {
  const url = '/butted/web/wrinkle-eliminate/create';
  return http.post<string>({
    url,
    data: params,

  });
};

/**
 * 花型提取-消除褶皱-开始消除-详情
 * @see https://yapi.tiangong.site/project/20/interface/api/555
 */
export const getWebWrinkleEliminate = (taskId: string) => {
  const url = `/butted/web/wrinkle-eliminate/${taskId}`;
  return http.get<Types.IWebWrinkleEliminateRes>({
    url,

  });
};

/**
 * design-花型提取-提交消除褶皱结果图片
 * @see https://yapi.tiangong.site/project/18/interface/api/565
 */
export const saveEliminateWrinklesResult = (params: Types.IEliminateWrinklesReq) => {
  const url = '/inspiration/frontend/web/task/floral-print-extraction/submit/image/eliminate/wrinkles';
  return http.post({
    url,
    data: params,
    loading: true,

  });
};

/**
 * design-花型提取-再次编辑页面提交
 * @see https://yapi.tiangong.site/project/18/interface/api/627
 */
export const floralPrintExtractionEdit = (
  params: Types.IFloralPrintExtractionEditReq
) => {
  const url = '/inspiration/frontend/web/task/floral-print-extraction/edit';
  return http.post({
    url,
    data: params,
    loading: true,

  });
};

/**
 * 发送到图案库
 * @see https://yapi.tiangong.site/project/18/interface/api/4974
 */
export const sendToPatternLibrary = (pictureId: string) => {
  const url = `/inspiration/frontend/web/task/floral-print-extraction/send-to/pattern-library/${pictureId}`;
  return http.post<boolean>({
    url,
    loading: true,
  });
};
