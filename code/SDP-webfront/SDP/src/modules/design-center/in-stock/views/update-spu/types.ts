import { ISpotStyleCreateReq, ISpotStyleCreateSkc } from '../../api/spot-style';


export type IFormData = Omit<ISpotStyleCreateReq, 'skcs'> & {
  skcs: (ISpotStyleCreateSkc & { sizeStandardCodes?: string[]; })[];
};
