import { PICTURE_ANGLE, VALIDATE_STATUS } from '../types';
import {
  IV1SewResSamplePicture,
  IV1SewResFrontPicture,
  IV1SewResSidePicture,
  IV1SewResBackPicture,
  IV1SewResOtherPictures,
  IV1SewResDetailPictures
} from '@/modules/clothes-center/api/types';

// eslint-disable-next-line vue/max-len
type IPictureGroup = IV1SewResFrontPicture | IV1SewResSidePicture | IV1SewResBackPicture | IV1SewResOtherPictures | IV1SewResDetailPictures;
const transformer = (pictureGroup: IPictureGroup, angleInsurance?: string) => {
  return pictureGroup?.urls?.map((item) => {
    return {
      url: item.url,
      // eslint-disable-next-line vue/max-len
      angle: pictureGroup?.pictureOrientationEnum ? pictureGroup?.pictureOrientationEnum?.toLowerCase() : angleInsurance?.toLowerCase(),
      validateStatus: (() => {
        // if (item.checkPass === YES_OR_NO_NUMBER_ENUM.YES) {
        //   return VALIDATE_STATUS.SUCCESS;
        // }
        // if (item.checkPass === YES_OR_NO_NUMBER_ENUM.NO) {
        //   return VALIDATE_STATUS.FAIL;
        // }
        return VALIDATE_STATUS.SILENCE;
      })(),
    };
  }) || [];
};
export const transformToFileExtList = (samplePicture: IV1SewResSamplePicture) => {
  return [
    ...transformer(samplePicture?.frontPicture || {}, PICTURE_ANGLE.FRONT),
    ...transformer(samplePicture?.sidePicture || {}, PICTURE_ANGLE.SIDE),
    ...transformer(samplePicture?.backPicture || {}, PICTURE_ANGLE.BACK),
    ...transformer(samplePicture?.otherPictures || {}, PICTURE_ANGLE.OTHER),
    ...transformer(samplePicture?.detailPictures || {}, PICTURE_ANGLE.DETAIL),
  ];
};
