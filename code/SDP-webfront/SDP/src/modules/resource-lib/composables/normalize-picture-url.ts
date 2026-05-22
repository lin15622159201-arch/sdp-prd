import type {
  IResourceLibPictureUrlListItem,
  IProdDesignFilePageDesignFilePictureListItem,
} from '@/modules/resource-lib/api/types';
import { PICTURE_TYPE } from '@/modules/resource-lib/constant';
import { filters } from '@/core/plugins/filter';

export const useNormalizePictureUrl = (
  list: IResourceLibPictureUrlListItem[],
  pictureType: keyof typeof PICTURE_TYPE = PICTURE_TYPE.CUSTOMER
) => {
  return list.filter(item => item.samplePictureType === pictureType).map(item => item.pictureUrl);
};

export const useNormalizeDesignFilePictureUrl = (list: IProdDesignFilePageDesignFilePictureListItem[]) => {
  return list.map(item => item.designFileUrl);
};

export const getResizePicture = (
  list: IResourceLibPictureUrlListItem[],
  pictureType: keyof typeof PICTURE_TYPE = PICTURE_TYPE.CUSTOMER
) => {
  const pictures = list.filter(item => item.samplePictureType === pictureType).map(item => item.pictureUrl);
  const first = pictures?.[0];
  return filters.ossUrl(first);
};
