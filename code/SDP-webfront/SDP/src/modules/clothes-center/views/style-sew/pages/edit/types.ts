import { MAKE_CLOTHES_TYPE_ENUM } from '@/modules/clothes-center/constant';
import { ISampleQcRepairReq } from '../../api/types';

export type IRepairData = ISampleQcRepairReq & {
  makeClothesType: MAKE_CLOTHES_TYPE_ENUM;
};
