import { MAKE_CLOTHES_TYPE_ENUM } from '@/modules/clothes-center/constant';
import { ISampleAuditRepairReq } from '../api/types';

export type IRepairData = ISampleAuditRepairReq & {
  makeClothesType: MAKE_CLOTHES_TYPE_ENUM;
};
