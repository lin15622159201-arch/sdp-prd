import { computed, Ref } from 'vue';
import { TABS_LIST } from '../constant';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

interface IProps {
  stepNodeStateCountData: Ref<IStepNodeStateCountRes>;
}

export const useTabs = (props: IProps) => {
  const { stepNodeStateCountData } = props;
  const tabs = computed(() => {
    const arr = stepNodeStateCountData.value
      .filter(v => v!.processStepCode === PROCESS_STEP_CODE_ENUM.DIMENSION
        && v.processNodeCode === PROCESS_NODE_CODE_ENUM.DIMENSION_ALLOCATE);
    return TABS_LIST.map((v) => {
      const { unFinishCount = '0', count = '0' } = arr.find(it => v.nodeStateCode === it.nodeStateCode)! || {};
      return {
        ...v,
        count: v.label === '已分单' ? count : unFinishCount
      };
    });
  });
  return {
    tabs
  };
};
