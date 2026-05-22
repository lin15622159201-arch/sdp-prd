import { computed, Ref } from 'vue';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

interface IProps {
  stepNodeStateCountData: Ref<IStepNodeStateCountRes>;
  list: {
    label: string;
    value: any;
    processStepCode: PROCESS_STEP_CODE_ENUM;
    processNodeCode: PROCESS_NODE_CODE_ENUM;
    nodeStateCode: string;
    params: Record<string, any>;
  }[];
}

export const useTabs = (props: IProps) => {
  const { stepNodeStateCountData, list } = props;
  const tabs = computed(() => {
    return list.map((v, i) => {
      const { count = '0', unFinishCount = '0' } = stepNodeStateCountData.value
        .find(it => v.nodeStateCode === it.nodeStateCode
        && v.processNodeCode === it.processNodeCode
        && v.processStepCode === it.processStepCode) || {};
      return {
        ...v,
        count: i === list.length - 1 ? count : unFinishCount,
      };
    });
  });
  return {
    tabs
  };
};
