import { PICTURE_ORIENTATION_ENUM } from '@/modules/clothes-center/api/types';

/**
 * 内部处理-车缝-车缝完成
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2468
 */
export interface ISewFinishReq {
  /**
   * 车版id
   */
  sewId: string;
  /**
   * 车缝量尺json
   */
  sewSizeInfoList: ISewFinishReqSewSizeInfoListItem[];
  /**
   * 样衣图图片
   */
  sewPicture: string[];
  /**
   * 样衣图片（用于AI识别）
   */
  samplePicture: ISewFinishReqSamplePicture;
  /**
   * 是否强制通过图片校验（1-是，0-不是）
   */
  enforcePassPicture: string;
}

export interface ISewFinishReqSamplePicture {
  /**
   * 正面图
   */
  frontPicture: ISewFinishReqSamplePictureFrontPicture;
  /**
   * 侧面图
   */
  sidePicture: ISewFinishReqSamplePictureSidePicture;
  /**
   * 背面图
   */
  backPicture: ISewFinishReqSamplePictureBackPicture;
  /**
   * 其他图片
   */
  otherPictures?: ISewFinishReqSamplePictureOtherPictures;
}

export interface ISewFinishReqSamplePictureOtherPictures {
  /**
   * 图片地址
   */
  urls: ISewFinishReqSamplePictureOtherPicturesUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   */
  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}

export interface ISewFinishReqSamplePictureOtherPicturesUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  /**
   * 校验不通过原因
   */
  msg?: string;
}

export interface ISewFinishReqSamplePictureBackPicture {
  /**
   * 图片地址
   */
  urls: ISewFinishReqSamplePictureBackPictureUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   */
  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}

export interface ISewFinishReqSamplePictureBackPictureUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  /**
   * 校验不通过原因
   */
  msg?: string;
}

export interface ISewFinishReqSamplePictureSidePicture {
  /**
   * 图片地址
   */
  urls: ISewFinishReqSamplePictureSidePictureUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   */
  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}

export interface ISewFinishReqSamplePictureSidePictureUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  /**
   * 校验不通过原因
   */
  msg?: string;
}

export interface ISewFinishReqSamplePictureFrontPicture {
  /**
   * 图片地址
   */
  urls: ISewFinishReqSamplePictureFrontPictureUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   */
  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}

export interface ISewFinishReqSamplePictureFrontPictureUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  /**
   * 校验不通过原因
   */
  msg?: string;
}

export interface ISewFinishReqSewSizeInfoListItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
   */
  clothesTrimSizeList: ISewFinishReqSewSizeInfoListItemClothesTrimSizeListItem[];
}

export interface ISewFinishReqSewSizeInfoListItemClothesTrimSizeListItem {
  /**
   * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
   */
  clothesName?: string;
  value?: string;
}

/**
 * 内部处理-车缝-开始车缝(关联车缝师)
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2465
 */
export interface ISewAssignSewerReq {
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

/**
 * 内部处理-车缝-排单变更
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2466
 */
export interface ISewChgSewerReq {
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

/**
 * 内部处理-车缝详情
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2467
 */
export interface IV1SewReq {
  sewId: string;
}

export interface IV1SewRes {
  /**
   * 车版id
   */
  sewId?: string;
  /**
   * 样衣尺寸(如：XXXS)
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸(如：XXXS)
   */
  patternSize?: string;
  /**
   * 车缝量尺
   */
  sewSizeInfoList: IV1SewResSewSizeInfoListItem[];
  /**
   * 样衣图图片
   */
  sewPictureList: string[];
  /**
   * 样衣图片（用于AI识别）
   */
  samplePicture?: IV1SewResSamplePicture;
  /**
   * 是否强制通过图片校验（1-是，0-不是）
   */
  enforcePassPicture?: string;
}

export interface IV1SewResSamplePicture {
  /**
   * 正面图
   */
  frontPicture: IV1SewResSamplePictureFrontPicture;
  /**
   * 侧面图
   */
  sidePicture: IV1SewResSamplePictureSidePicture;
  /**
   * 背面图
   */
  backPicture: IV1SewResSamplePictureBackPicture;
  /**
   * 其他图片
   */
  otherPictures?: IV1SewResSamplePictureOtherPictures;
}

export interface IV1SewResSamplePictureOtherPictures {
  /**
   * 图片地址
   */
  urls: IV1SewResSamplePictureOtherPicturesUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   */
  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}

export interface IV1SewResSamplePictureOtherPicturesUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  /**
   * 校验不通过原因
   */
  msg?: string;
}

export interface IV1SewResSamplePictureBackPicture {
  /**
   * 图片地址
   */
  urls: IV1SewResSamplePictureBackPictureUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   */
  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}

export interface IV1SewResSamplePictureBackPictureUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  /**
   * 校验不通过原因
   */
  msg?: string;
}

export interface IV1SewResSamplePictureSidePicture {
  /**
   * 图片地址
   */
  urls: IV1SewResSamplePictureSidePictureUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   */
  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}

export interface IV1SewResSamplePictureSidePictureUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  /**
   * 校验不通过原因
   */
  msg?: string;
}

export interface IV1SewResSamplePictureFrontPicture {
  /**
   * 图片地址
   */
  urls: IV1SewResSamplePictureFrontPictureUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   */
  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}

export interface IV1SewResSamplePictureFrontPictureUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  /**
   * 校验不通过原因
   */
  msg?: string;
}

export interface IV1SewResSewSizeInfoListItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
   */
  clothesTrimSizeList: IV1SewResSewSizeInfoListItemClothesTrimSizeListItem[];
}

export interface IV1SewResSewSizeInfoListItemClothesTrimSizeListItem {
  /**
   * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
   */
  clothesName?: string;
  value?: string;
  error?: boolean;
}
