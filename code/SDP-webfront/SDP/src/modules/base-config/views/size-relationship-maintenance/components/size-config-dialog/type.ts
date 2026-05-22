import { ISizeConfigSubmitReqConfigInfoListItem } from '../../api/type';
import { SAMPLE_SIZE_STATE_ENUM } from '../../constant';

export interface ISizeItem {
  name: string;
  valueCode: string;
  isCheck: boolean;
  isIndeterminate: boolean;
  children: (ISizeConfigSubmitReqConfigInfoListItem
  & { oldSampleSizeState: SAMPLE_SIZE_STATE_ENUM; disabled: boolean; })[];
}
