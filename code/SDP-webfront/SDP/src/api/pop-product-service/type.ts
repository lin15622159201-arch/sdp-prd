// ⬇️ 发布平台列表请求体 接口：https://yapi.tiangong.site/project/31/interface/api/1322
/**
 * 入参
 */
export interface IPublishPlatformListReq {
  /**
   * 关联渠道ID
   */
  channelId: string;
}
// ⬆️ 发布平台列表请求体

// ⬇️ 发布平台列表响应体 接口：https://yapi.tiangong.site/project/31/interface/api/1322
export type IPublishPlatformListRes = {
  /**
   * 平台ID
   */
  platformId: string;
  /**
   * 关联渠道ID
   */
  channelId: string;
  channelName: string;
  /**
   * 平台名称
   */
  platformName: string;
}[];
// ⬆️ 发布平台列表响应体
