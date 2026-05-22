import { IFileData } from '@/components/uploader/packages/types';
import { ISpotSkcUpdateReq } from '@/modules/design-center/in-stock/api/types';

export type IFormData = Omit<ISpotSkcUpdateReq, 'productPictureList' | 'sampleSize'> & {
  styleCode: string;
  colors: string[];
  sampleSize: string[];
  productPictureList: IFileData[];
  sizeStandardCode: string;
};

export interface IProps {
  reloadFn: () => void;
}
