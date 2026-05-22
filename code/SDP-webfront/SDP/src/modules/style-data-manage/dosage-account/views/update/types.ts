import { IFile } from '@/components/uploader/packages/types';
import { IGetDosageInfoRes } from '../../api/types';

export type IDetail = Omit<IGetDosageInfoRes, 'markFramePictureList' | 'bomOrderMaterialList'> & {
  markFramePictureList: IFile[];
  /** 面辅料 */
  normalMaterialList: Array<IGetDosageInfoRes['bomOrderMaterialList'][0] & {
    skuAttrsFormat: {
      attrName: string;
      attrValue: string;
      attrId: string;
    }[];
    materialFormat: Array<{
      name: string;
      percent: string;
    }>;
  }>;
  bomOrderMaterialList: Array<IGetDosageInfoRes['bomOrderMaterialList'][0] & {
    skuAttrsFormat: {
      attrName: string;
      attrValue: string;
      attrId: string;
    }[];
    materialFormat: Array<{
      name: string;
      percent: string;
    }>;
  }>;
  /** 特殊辅料 */
  specialMaterialList: Array<IGetDosageInfoRes['bomOrderMaterialList'][0] & {
    skuAttrsFormat: {
      attrName: string;
      attrValue: string;
      attrId: string;
    }[];
    spuCityName?: string;
    partUse?: Array<string>;
  }>;
};
