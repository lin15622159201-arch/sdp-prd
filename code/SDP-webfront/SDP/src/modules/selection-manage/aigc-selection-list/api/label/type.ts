import { YES_NO_ENUM } from '@/constant';
import { LABEL_CATEGORY_TYPE_ENUM } from '../../constant';

export interface IGetLabelParams {
  /**
   * 分类编码
   */
  classCode: LABEL_CATEGORY_TYPE_ENUM;
  /**
   * 分组编码
   */
  groupCode?: string;
}

export interface ILabel {
  /**
   * 分类ID
   */
  parentId: string;
  parentCode: string;
  /**
   * 分类ID
   */
  id: string;
  /**
   * 标签编码
   */
  code: string;
  /**
   * 标签值
   */
  value: string;
  /**
   * 是否启用
   */
  enable: YES_NO_ENUM;
}
// ⬇️ 标签查询列表（分页）请求体 接口：https://yapi.tiangong.site/project/447/interface/api/57130

// ⬇️ 颜色标签 - 查询请求体 接口：https://yapi.tiangong.site/project/447/interface/api/59178
/**
 * 前端实体
 */
export interface IColorLabelListReq {
  /**
   * 标签值
   */
  labels: IColorLabelListReqLabelsItem[];
}
export interface IColorLabelListReqLabelsItem {
  /**
   * 色相
   */
  hue: string;
  /**
   * 亮度
   */
  brightness: string;
  /**
   * 饱和度
   */
  chroma: string;
}
// ⬆️ 颜色标签 - 查询请求体

// ⬇️ 颜色标签 - 查询响应体 接口：https://yapi.tiangong.site/project/447/interface/api/59178
/**
 * 响应数据
 */
export type IColorLabelListRes = {
  /**
   * 色卡
   */
  colorChart: string;
  /**
   * 色号
   */
  colorCode: string;
  /**
   * L*值
   */
  valL: string;
  /**
   * a*值
   */
  valA: string;
  /**
   * b*值
   */
  valB: string;
  /**
   * 色相
   */
  hue: string;
  /**
   * 亮度
   */
  brightness: string;
  /**
   * 饱和度
   */
  chroma: string;
}[];
// ⬆️ 颜色标签 - 查询响应体
