import type { Ref } from 'vue';
import { computed } from 'vue';
import { cloneDeep } from 'lodash-es';
import {
  IStyleInfoSubmitReqStyleDetailSizeReqListItemSkipSizeQuotietyListItem as ISize,
  IStyleInfoSubmitReqStyleDetailSizeReqListItem,
} from '../../../api/types';

/**
 * 处理跳码规则
 */
interface IProps {
  sizeList: Ref<IStyleInfoSubmitReqStyleDetailSizeReqListItem[]>;
  sampleBaseYardage: Ref<string>;
}
export default function useSizeSkip(props: IProps) {
  /**
   * 有提交的跳码规则
   */
  const baseSkipSizeQuotiety = computed(() => {
    return props.sizeList.value?.[0]?.skipSizeQuotietyList?.map(item => item.size) as string[] || [];
  });

  const handleSetSkipSize = (data: ISize[]) => {
    const dataStr = data.map(item => item.size).join(',');
    const baseSkipSizeQuotietyStr = baseSkipSizeQuotiety.value.join(',');

    if (dataStr === baseSkipSizeQuotietyStr) return;

    props.sizeList.value.forEach((item) => {
      item.skipSizeQuotietyList = cloneDeep(data);

      item.sizeList.forEach((item2) => {
        if (item2.size !== props.sampleBaseYardage.value) {
          item2.data = '';
        } else {
          item2.data = item.sampleSize || '';
        }
      });
    });
  };

  return {
    baseSkipSizeQuotiety,
    handleSetSkipSize,
  };
}
