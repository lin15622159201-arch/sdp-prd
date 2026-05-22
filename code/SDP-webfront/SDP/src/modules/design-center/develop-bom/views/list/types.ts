import { YES_NO_ENUM } from '@/constant';
import { IBomBatchPrintRes, PostWebV1BomPageApiReq, postWebV1BomPageApiResListResItem } from '../../api/types';

export type IListItem = postWebV1BomPageApiResListResItem & {
  remark: string;
};

export type IPrintDataItem = Omit<IBomBatchPrintRes[0], 'bomOrderMaterialList'> & {
  bomOrderMaterialList: Array<
  Omit<
  IBomBatchPrintRes[0]['bomOrderMaterialList'][0],
  'material' | 'skuAttrs' | 'partUse'
  > & {
    material: {
      name: string;
      percent: string;
    }[];
    skuAttrs: {
      attrId: string;
      attrName: string;
      attrValue: string;
    }[];
    partUse: string[];
  }>;
};

export type IParams = PostWebV1BomPageApiReq & {
  /** 是否只看自己数据 */
  readSelf?: YES_NO_ENUM;
};
