import { GetWebV1BomDetailApiRes } from '../../api/types';

export type IDetail = Omit<GetWebV1BomDetailApiRes, 'bomOrderMaterialList'> & {
  bomOrderMaterialList: Array<
  Omit<
  GetWebV1BomDetailApiRes['bomOrderMaterialList'][0],
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
    __f_hasDemand?: boolean;
    __f_demandInfo?: any;
  }>;
  materialDemandList: Array<
  Omit<
  GetWebV1BomDetailApiRes['materialDemandList'][0],
  'bomOrderMaterial'
  > & {
    bomOrderMaterial?: Omit<
    GetWebV1BomDetailApiRes['materialDemandList'][0]['bomOrderMaterial'],
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
    };
  }>;
};
