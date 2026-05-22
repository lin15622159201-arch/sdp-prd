import { IFile } from '@/components/uploader/packages/types';
import { IPatternClothesDetailRes } from '../../api/types';

export type IDetail = Omit<IPatternClothesDetailRes, 'shelvePictureList' | 'designPictureList'> & {
  designPictureList: IFile[];
  shelvePictureList: IFile[];
};
