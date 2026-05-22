import { IGetSuggestFabricRes, IGetTaskInfoRes } from '@/modules/design-center/inspiration-demand/api/types';

export type IDetail = IGetTaskInfoRes & {};

export type IFabricItem = Omit<IGetSuggestFabricRes[0], 'materialInfo'> & {
  materialInfo: IGetSuggestFabricRes[0]['materialInfo'] & {
    materialFormat: Array<{
      name: string;
      percent: string;
    }>;
  };
};
