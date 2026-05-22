import { ISmartDevelopStyleDetailResPictureListItem } from '../api/type';

export type ImageItem = { groupNum: string; imgUrl: string; color: string; groupId?: string; imgUrlName?: string; };

export type ImageList = ImageItem[];

export type GenerateFlatList = (ISmartDevelopStyleDetailResPictureListItem & {
  groupNum: string;
})[];
