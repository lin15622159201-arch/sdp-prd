import { IFile } from '@/components/uploader/packages/types';
import { IGetSkcDetailRes } from '../../api/types';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

export type IDetail = IGetSkcDetailRes;

export type IColorItem = Omit<IDictionaryItem, 'children'> & {
  /** 父子编码用-拼接 */
  pathCode: string;
  /** 颜色英文缩写 */
  colorAbbrCode: string;
  /** 色号 */
  colorNumber: string;
  /** 颜色英文名 */
  colorEnglishName: string;
  children: IColorItem[];
};
