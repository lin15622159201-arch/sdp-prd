import type {
  GetWebV1BomDetailApiRes,
  getWebV1BomDetailApiResBomOrderMaterialListResItem as _IBomOrderMaterialItem,
  CreftItem,
  IBomWebDetailResMaterialDemandListItem as _IBomOrderDemandItem,
} from '../../api/types';
import type {
  ISubmitV3Req,
  ISubmitV3ReqUpdateBomMaterialsItem,
  ISubmitV3ReqAddBomMaterialsItem,
  ISubmitV3ReqAddBomMaterialDemandListItem,
  ISubmitV3ReqUpdateBomMaterialDemandListItem,
  ISubmitV3ReqMaterialUpdateReqListItem,
  ISubmitV3ReqMaterialAddReqListItem,
} from '../../api/bom-submit/types';

export type IDetail = Omit<GetWebV1BomDetailApiRes, 'bomOrderMaterialList' | 'materialDemandList'> & {
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
    __f_demandInfo?: IBomOrderDemandItem;
    __f_isNoProcess?: boolean; // 是否无工艺
    delCraftDemandIdList?: string[];
    __f_hasDemand?: boolean; // 用来判断是否有需求顶栏
    __f_bomMaterialIdChange?: string;
    remark?: string;
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

interface CreftItemExtend extends CreftItem {
  picture?: string;
}
export interface IBomOrderDemandItem extends _IBomOrderDemandItem {

}
export type IBomOrderMaterialItem = IDetail['bomOrderMaterialList'][0] & {
  craftDemandInfoList: CreftItemExtend[];
};

export type IBomSubmitReq = ISubmitV3Req;
export type IBomSubmitReqUpdateListItem = ISubmitV3ReqUpdateBomMaterialsItem;
export type IBomSubmitReqAddListItem = ISubmitV3ReqAddBomMaterialsItem;
export type IBomSubmitReqUpdateDemandListItem = ISubmitV3ReqUpdateBomMaterialDemandListItem;
export type IBomSubmitReqUpdateDemandListUpdateMaterialItem = ISubmitV3ReqMaterialUpdateReqListItem;
export type IBomSubmitReqUpdateDemandListAddMaterialItem = ISubmitV3ReqMaterialAddReqListItem;
export type IBomSubmitReqAddDemandListItem = ISubmitV3ReqAddBomMaterialDemandListItem;
