import { FLOWER_PATTERN_EXTRACTION_REGION_ENUM } from '../../constant';

export interface InitDataParams {
  url?: string;
  code?: string;
  source?: string | null;
  id?: string | null;
  region?: FLOWER_PATTERN_EXTRACTION_REGION_ENUM;
}
