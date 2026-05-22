import { computed, Ref } from 'vue';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';
import { TABS_LIST } from '../constant';

interface IProps {
  stepNodeStateCountData: Ref<IStepNodeStateCountRes>;
}

export const useTabs = (props: IProps) => {
  const { stepNodeStateCountData } = props;
  const tabs = computed(() => {
    const arr = stepNodeStateCountData.value
      .filter(v => v!.processStepCode === PROCESS_STEP_CODE_ENUM.SEW
        && v.processNodeCode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_CUTTING_SECOND_CRAFT);
    return TABS_LIST.map((v, i) => {
      const { unFinishCount = '0', count = '0' } = arr.find(it => v.nodeStateCode === it.nodeStateCode) || {};
      return {
        ...v,
        count: i === TABS_LIST.length - 1 ? count : unFinishCount
      };
    });
  });
  return {
    tabs
  };
};
