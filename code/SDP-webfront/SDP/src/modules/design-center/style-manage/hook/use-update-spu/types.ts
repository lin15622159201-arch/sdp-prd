import { ICreateSpuReq, IGetSpuDetailRes } from '../../api/types';

export type IFormData = Omit<IGetSpuDetailRes, 'category' | 'clothingStyleCode'> & {
  category?: string[];
  styleSeason?: string[];
  clothingStyleCode?: string[];
  skuClassCode?: string;
};
