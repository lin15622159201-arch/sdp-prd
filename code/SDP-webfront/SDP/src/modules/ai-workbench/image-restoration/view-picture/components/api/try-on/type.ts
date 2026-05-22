import { YES_NO_NUMBER_ENUM } from '@/constant';
import { CLOTHING_TYPE_ENUM, TRY_ON_TASK_STATE_ENUM } from '../constant';

// ⬇️ TryOn任务详情响应体 接口：https://yapi.textile-story.com/project/699/interface/api/80076
export interface IWebTryOnTaskRes {
  /**
   * 主任务ID
   */
  taskId: string;
  /**
     * 子任务ID
     */
  subtaskId: string;
  /**
     * 子任务编码
     */
  subtaskCode: string;
  /**
     * 任务状态：10-生成中；20-已中止；30-已完成；40-失败；50-排队中。
     */
  state: TRY_ON_TASK_STATE_ENUM;
  /**
     * 服装图
     */
  clothingImg: string;
  /**
     * 服装图类型：1-3D图；2-平铺|挂拍；3-真人模特
     */
  clothingType: CLOTHING_TYPE_ENUM | '';
  /**
     * 算法识别品类code
     */
  categoryIdentifyCode: string;
  /**
     * 算法识别品类名称
     */
  categoryIdentifyName: string;
  /**
     * 算法识别标签
     */
  predLabelList: IWebClipLabelResPredLabelListItem[];

  /**
   * 生成结果列表
   */
  generatedList: IWebTryOnTaskResGeneratedListItem[];
  /**
   * clip任务ID
   */
  clipTaskId: string;
}

export interface IWebClipLabelResPredLabelListItem {
  cn: IWebClipLabelResCn;
  en: IWebClipLabelResEn;
  /**
   * coloro的编码，非颜色标签不存在此字段；多个颜色用逗号分隔
   */
  coloroCodes: string;
}
/**
 * 中文标签
 */
export interface IWebClipLabelResCn {
  /**
   * 标签名
   */
  name: string;
  /**
   * 标签编号
   */
  code: string;
  /**
   * 标签值列表
   */
  values: IWebClipLabelResCn[];
}
/**
 * 英文标签
 */
export interface IWebClipLabelResEn {
  /**
   * 标签名
   */
  name: string;
  /**
   * 标签编号
   */
  code: string;
  /**
   * 标签值列表
   */
  values: IWebClipLabelResEn[];
}
// ⬆️ 详情响应体

export interface IWebTryOnTaskResGeneratedListItem {
  /**
   * 子任务ID
   */
  subtaskId: string;
  /**
   * 子任务编码
   */
  subtaskCode: string;
  /**
   * 任务状态：10-生成中；20-已中止；30-已完成；40-失败；50-排队中。
   */
  state: TRY_ON_TASK_STATE_ENUM;
  /**
   * 算法识别品类code
   */
  categoryIdentifyCode: string;
  /**
   * 算法识别品类名称
   */
  categoryIdentifyName: string;
  /**
   * 选中品类名称
   */
  categoryName: string;
  categoryCode: string;
  /**
   * 模特图
   */
  modelImg: string;
  /**
   * 模特图id
   */
  modelId: string;
  /**
   * 标注区模特图
   */
  markModelImg: string;
  /**
   * 生成结果图列表
   */
  generatedImgList: { imgId: string; resImg: string; }[];
  /**
   * 创建人ID
   */
  creatorId: string;
  /**
   * 创建人姓名
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 生成数量
   */
  generateCount: number;
  /**
     * 模特换脸(1是,0否)
     */
  modelFaceReplace: YES_NO_NUMBER_ENUM;
  /**
       * 模特换脸-图片url
       */
  modelFaceReplaceImageUrl: string;
  /**
     * 模特换脸id
     */
  modelFaceReplaceId: string;
  modelFaceReplaceName: string;
  /**
       * 背景重绘(1是,0否)
       */
  bgRedrawing?: YES_NO_NUMBER_ENUM;

}
// ⬆️ TryOn任务详情响应体
