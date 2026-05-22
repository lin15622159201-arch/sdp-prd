import { TASK_SOURCE_ENUM } from '@/constant/task';
import { IMAGE_UPDATE_AUDIT_RESULT_ENUM, IMAGE_UPDATE_STATE_ENUM, IMAGE_UPDATE_TASK_TYPE_ENUM } from '../constant';
import { YES_NO_STRING_ENUM } from '@/constant';

export type IImageUpdatePageReq = {
  pageNum?: number;
  pageSize?: number;
  /** 任务编号(多个,分割) */
  taskCode?: string;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人id */
  creatorId?: string;
  /** 创建人姓名 */
  creatorName?: string;
  /** 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消 */
  taskStatus?: IMAGE_UPDATE_STATE_ENUM;
  /** 波段编码 */
  wavebandCodes?: string[];
  /** 店铺id */
  storeIds?: number[];
  /** 设计师id */
  designerIds?: string[];
  /** 设计组 */
  designerGroupCodes?: string[];
  /** 任务类型,1-图片，2-视频 */
  taskType?: IMAGE_UPDATE_TASK_TYPE_ENUM;
  /** 款号(多个,分割) */
  spuCode?: string;
};

export type IImageUpdatePageRes = {
  pageNum: number;
  total: number;
  list: IImageUpdatePageItem[];
};

export type IImageUpdatePageItem = {
  /** 任务id */
  taskId: string;
  /** 任务编号 */
  taskCode: string;
  /** 创建人ID */
  creatorId: string;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 修改人ID */
  reviserId: number;
  /** 修改人名称 */
  reviserName: string;
  /** 更新时间 */
  revisedTime: string;
  /** 波段编码 */
  wavebandCode: string;
  /** 波段名称 */
  wavebandName: string;
  /** 店铺ID */
  storeId: number;
  /** 店铺名称 */
  storeName: string;
  /** 设计组ID */
  designerGroupId: number;
  /** 设计组名称 */
  designerGroupName: string;
  /** 设计师ID */
  designerId: number;
  /** 设计师名称 */
  designerName: string;
  /** 任务类型,1-图片，2-视频 */
  taskType: IMAGE_UPDATE_TASK_TYPE_ENUM;
  /** spu编码 */
  spuCode: string;
  /** 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消 */
  taskStatus: IMAGE_UPDATE_STATE_ENUM;
  /** 返修-原因 */
  reason: string;
  /** 返修-原因图片 */
  notPassDescribePicture: string;
  /** 修图备注-总说明 */
  repairDescribe: string;
  /** 修图备注-总说明 */
  repairAttachment: string;
  skcList: {
    skcId: string;
    /** 待修图 */
    pictures: IImageUpdatePicture[];
    /** 结果图 */
    resultPictures: string[];
  }[];
};

export type IImageUpdatePicture = {
  /** 创建人id */
  creatorId: string;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 图片ID */
  pictureId: string;
  /** 图片修复任务ID */
  taskId: string;
  spuId: string;
  skcId: string;
  /** 图片URL */
  pictureUrl: string;
  /** 序号 */
  serialNum: number;
  /** 修图需求说明 */
  pictureDescribe: string;
  attachment?: string;
};

export type IImageUpdateDetailRes = {
  /** 任务id */
  taskId: string;
  /** 任务编号 */
  taskCode: string;
  /** 创建人ID */
  creatorId: string;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 修改人ID */
  reviserId: string;
  /** 修改人名称 */
  reviserName: string;
  /** 更新时间 */
  revisedTime: string;
  /** 波段编码 */
  wavebandCode: string;
  /** 波段名称 */
  wavebandName: string;
  /** 店铺ID */
  storeId: number;
  /** 店铺名称 */
  storeName: string;
  /** 设计组ID */
  designerGroupId: number;
  /** 设计组名称 */
  designerGroupName: string;
  /** 设计师ID */
  designerId: number;
  /** 设计师名称 */
  designerName: string;
  /** 任务类型,1-图片，2-视频 */
  taskType: IMAGE_UPDATE_TASK_TYPE_ENUM;
  /** spu编码 */
  spuCode: string;
  /** 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消 */
  taskStatus: IMAGE_UPDATE_STATE_ENUM;
  /** 返修-原因 */
  reason: string;
  /** 返修-附件 */
  notPassDescribePicture: string;
  /** 修图备注-总说明 */
  repairDescribe: string;
  /** 修图备注-总说明附件 */
  repairAttachment: string;
  skcList: {
    skcId: string;
    skcCode: string;
    /** 图片相关信息 */
    pictures: IImageUpdateSkcPictureItem[];
    /** 当前图片 */
    currentPictures: IImageUpdatePicture[];
    /** 更新内容 */
    updatePictures: IImageUpdateDetailPicture[];
  }[];
};

export type IImageUpdateDetailPicture = {
  /** 创建人id */
  creatorId: string;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 审核结果ID */
  resultId: number;
  /** 图片修复任务ID */
  taskId: string;
  /** 图片URL */
  pictureUrl: string;
};

export type IImageUpdateStateTotalReq = {
  pageNum?: number;
  pageSize?: number;
  /** 任务编号(多个,分割) */
  taskCode?: string;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人id */
  creatorId?: string;
  /** 创建人姓名 */
  creatorName?: string;
  /** 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消 */
  taskStatus?: number;
  /** 波段编码 */
  wavebandCodes?: string[];
  /** 店铺id */
  storeIds?: number[];
  /** 设计师id */
  designerIds?: string[];
  /** 设计组id */
  designerGroupIds?: number[];
  /** 任务类型,1-图片，2-视频 */
  taskType?: number;
  /** 款号(多个,分割) */
  spuCode?: string;
};

export type IImageUpdateStateTotalRes = {
  /** 状态 */
  taskStatus: number;
  /** 总数 */
  total: number;
}[];

export type IImageUpdateBatchCreateReq = IImageUpdateCreateReq[];
export type IImageUpdateCreateReq = {
  /** 波段编码 */
  wavebandCode?: string;
  /** 波段名称 */
  wavebandName?: string;
  /** 店铺ID */
  storeId?: number;
  /** 店铺名称 */
  storeName?: string;
  /** 设计组ID */
  designerGroupId?: number;
  /** 设计组名称 */
  designerGroupName?: string;
  /** 设计师ID */
  designerId?: number;
  /** 设计师名称 */
  designerName?: string;
  /** 任务类型,1-图片，2-视频 */
  taskType: IMAGE_UPDATE_TASK_TYPE_ENUM;
  /** spu编码 */
  spuCode: string;
  /** 任务来源 */
  taskSource?: TASK_SOURCE_ENUM;
  /** 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消 */
  taskStatus?: IMAGE_UPDATE_STATE_ENUM;
  /** 修图备注-总说明 */
  repairDescribe?: string;
  /** 修图备注-总说明附件 */
  repairAttachment?: string;
  skc: {
    skcId: string;
    /** 待修图 */
    pictures?: IImageUpdateCreatePicture[];
  }[];
  /** 开款任务ID */
  developStyleTaskId: number;
};

export type IImageUpdateCreatePicture = {
  /** 图片URL */
  pictureUrl?: string;
  /** 序号 */
  serialNum?: number;
  /** 修图需求说明 */
  pictureDescribe?: string;
  /** 说明里面添加图片说明信息 */
  attachment?: string;
};

export type IImageUpdateEditReq = Pick<IImageUpdateCreateReq, 'repairDescribe' | 'repairAttachment' | 'skc'> & { taskId: string; };

export type IImageUpdateBatchUploadReq = {
  /** 任务id */
  taskId: string;
  skc: {
    skcId: string;
    /** 图片 */
    pictures: string[];
  }[];
}[];

export type IImageUpdateBatchCheckReq = {
  /** 任务id */
  taskId: string;
  /** 审核结果,审核结果：0-审核不通过，1-审核通过 */
  result: IMAGE_UPDATE_AUDIT_RESULT_ENUM;
  /** 审核备注 */
  reason?: string;
  /** 审核不通过图片说明 */
  notPassDescribePicture?: string;
  skcList?: {
    skcId: string;
    /** 当前图片 */
    currentPictures: string[];
    /** 更新图片 */
    pictures: string[];
  }[];
}[];

export type IImageUpdateListBySpuReq = {
  /** SPU编码 */
  spuCodes: string[];
  /** 任务类型,1-图片，2-视频 */
  taskType?: number;
};

export type IImageUpdateListBySpuRes = IImageUpdateListItem[];

export type IImageUpdateSkcPictureItem = {
  skcId: string;
  spuId: string;
  /** 图片URL */
  pictureUrl: string;
  /** 序号 */
  serialNum: number;
  /** 修图需求说明 */
  pictureDescribe: string;
  /** 说明里面添加图片说明信息 */
  attachment?: string;
};

export type IImageUpdateListItem = {
  /** spu任务来源 款式管理：prototype_manage，现货管理：spot_style */
  spuSourceType: string;
  /** 开款任务ID */
  developStyleTaskId: number;
  /** spu的ID */
  spuId: number;
  /** spu编码 */
  spuCode: string;
  /** 波段编码 */
  wavebandCode: string;
  /** 波段名称 */
  wavebandName: string;
  /** 店铺ID */
  storeId: number;
  /** 店铺名称 */
  storeName: string;
  /** 设计师id【设计师】 */
  designerId: number;
  /** 设计师编号【设计师】 */
  designerCode: string;
  /** 设计师名称【设计师】 */
  designerName: string;
  /** 设计组code */
  designerGroupCode: string;
  /** 设计组 */
  designerGroupName: string;
  skcList: {
    skcId: string;
    skcCode: string;
    /** 图片相关信息 */
    pictures: IImageUpdateSkcPictureItem[];
  }[];
  /** 任务是否进行中 */
  processing: YES_NO_STRING_ENUM;
};
