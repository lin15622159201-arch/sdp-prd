import {
  ISizeCategorySaveReqCategoryAddInfoListItem, ISizeCategorySaveReqSizeNumAddInfoListItem
} from '../../api/type';

export interface IFormData {
  /**
   * 配置的更新时间
   */
  configRevisedTime: string;
  /**
    * 更新的品类信息集合
    */
  categoryInfoList: ISizeCategorySaveReqCategoryAddInfoListItem[];
  /**
    * 尺码-号型信息集合 (只传有值的)
    */
  sizeNumInfoList: ISizeCategorySaveReqSizeNumAddInfoListItem[];
}
