import type { IFileData } from '@/components/uploader/packages/types';

export enum PURPOSE_TYPE_ENUM {
  ADD = 'ADD',
  EDIT = 'EDIT',
}
export interface IFormModel {
  // __f_selectedPrototypeMaterialNameRelatedBomMaterialId: string; // 物料项目
  __f_selectedPrototypeMaterialNameRelatedprototypeMaterialName: string;
  __f_demandCount: string; // 需求数量
  __f_demandCountUnit: string; // 需求数量单位
  __f_isMatchColorOrPackMaterial: string; // 是否对色/包扣
  __f_matchColorOrPackMaterialTargetRelatedBomMaterialId: string; // 对色/包扣对应的物料
  __f_matchColorOrPackMaterialTargetRelatedprototypeMaterialName: string;
  __f_pictureList: IFileData[]; // 图片
  __f_demandRemark?: string; // 需求备注
}

export interface IEditStore {
  __f_sourceBomMaterialId: string;
  initFormModel: IFormModel;
}

export interface IEmitConfirmedData {
  __f_sourceBomMaterialId?: string;
  demandData: IFormModel;
}
