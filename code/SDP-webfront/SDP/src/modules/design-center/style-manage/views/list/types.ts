import { SAMPLE_TYPE_ENUM } from '@/modules/design-center/develop-bom/constant';
import {
  IBomMaterialPictureResItem,
  IPrototypeManageClothesPriceProductRes,
  PostWebV1PrototypeManagePageApiReq,
  postWebV1PrototypeManagePageApiResListResItem
} from '../../api/types';
import { YES_NO_ENUM } from '@/constant';

type ISampleInfo = Array<{
  feSameSampleTypeCount: number;
  /**
   * 加工单编号 (如:2409250085-1)   (款式开发)
   */
  processCode: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType: SAMPLE_TYPE_ENUM;
  /**
   * 当前处理环节节点状态描述
   */
  processNodeStateDesc: string;
  /**
   * 当前处理环节节点名称
   */
  processNodeDesc: string;
  /**
   * 是否完成
   */
  isDone: YES_NO_ENUM;
  /**
   * 是否取消
   */
  isCancel: YES_NO_ENUM;
}>;
export type IListItem = postWebV1PrototypeManagePageApiResListResItem & {
  remark: string;
  sampleInfos: ISampleInfo;
} & Pick<IPrototypeManageClothesPriceProductRes[0], 'priceOrderInfo'>
& Partial<Pick<IBomMaterialPictureResItem, 'accessoriesPictureList'>>;

export type IParams = PostWebV1PrototypeManagePageApiReq & {
  colors?: string[];
  readSelf?: boolean;
};
