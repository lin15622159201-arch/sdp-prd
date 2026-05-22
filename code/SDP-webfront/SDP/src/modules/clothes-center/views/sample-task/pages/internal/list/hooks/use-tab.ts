import { computed, Ref, ref } from 'vue';
import { TABS_LIST } from '../constant';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';
import { getStepNodeStateCount } from '@/modules/clothes-center/api';

interface IProps {
  stepNodeStateCountData: Ref<IStepNodeStateCountRes>;
}

export const useTabs = (props: IProps) => {
  const { stepNodeStateCountData } = props;
  const stateInfo = ref<IStepNodeStateCountRes>([]);
  const getStateStatByNode = async (params: any) => {
    const { data } = await getStepNodeStateCount({
      ...params,
      clothesStep: PROCESS_STEP_CODE_ENUM.DIMENSION!,
    });
    stateInfo.value = data;
  };
  const tabs = computed(() => {
    const arr = stepNodeStateCountData.value
      .filter(v => v!.processStepCode === PROCESS_STEP_CODE_ENUM.DIMENSION
        && v.processNodeCode === PROCESS_NODE_CODE_ENUM.DIMENSION_INNER_PROCESS);
    return TABS_LIST.map((v) => {
      const { unFinishCount = '0', count = '0' } = arr.find(it => v.nodeStateCode === it.nodeStateCode)! || {};
      return {
        ...v,
        count: v.label === '已提交' ? count : unFinishCount
      };
    });
  });
  return {
    tabs,
    getStateStatByNode
  };
};
