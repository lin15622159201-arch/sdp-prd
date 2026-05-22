import { IMaterialSignMaterialListItem } from '../../api/types';

export type IListItem = Omit<IMaterialSignMaterialListItem, 'craftDemandInfo'> & {
  craftDemandInfo: {
    category3: string;
    category2: string;
  }[];
};
