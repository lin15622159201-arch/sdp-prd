import { IGetDosageListReq, IGetDosageListRes } from '@/modules/style-data-manage/dosage-account/api/types';

export type IParams = IGetDosageListReq & {
  personal?: boolean;
  designerGroupCodeList?: string[];
  roomId?: string;
};

export type IListItem = IGetDosageListRes['list'][0] & {
  remark: string;
};
