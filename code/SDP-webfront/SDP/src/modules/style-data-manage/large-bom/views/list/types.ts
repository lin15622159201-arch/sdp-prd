import { IStyleInfoPageForTuikuanReq } from '../../api/types';

export type IParams = IStyleInfoPageForTuikuanReq & {
  styleTypeLikeArr?: string[];
  /** 只看自己 */
  personal: boolean;
};
