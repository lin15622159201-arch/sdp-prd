/**
 * 内部处理-裁剪完成(关联裁剪师)
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2462
 */
export interface ISewAssignCutterReq {
  /**
   * 车版列表id
   */
  sewId: string[];
  /**
   * 人员id
   */
  userId: string;
  /**
   * 人员名称
   */
  userName: string;
}
