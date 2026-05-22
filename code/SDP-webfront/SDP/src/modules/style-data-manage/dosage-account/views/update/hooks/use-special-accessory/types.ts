import { IGetSpecialAccessoriesRes } from '@/modules/style-data-manage/dosage-account/api/types';

export type IListItem = IGetSpecialAccessoriesRes['list'][0] & {
  skuAttrsFormat: {
    attrName: string;
    attrValue: string;
    attrId: string;
  }[];
};
