import { computed, ref } from 'vue';
import { TABS_LIST, TABS_ENUM } from '../constant';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';
import { getStepNodeStateCount } from '@/modules/clothes-center/api';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';

export const useTabs = () => {
  const stateInfo = ref<IStepNodeStateCountRes>([]);
  const getStateStatByNode = async (params: any) => {
    const { data } = await getStepNodeStateCount({
      ...params,
      clothesStep: PROCESS_STEP_CODE_ENUM.DIMENSION!,
    });
    stateInfo.value = data;
  };

  const tabs = computed(() => {
    return TABS_LIST.map((v) => {
      let count = '0';
      switch (v.value) {
        case TABS_ENUM.WAIT_TAKE: {
          const row = stateInfo.value
            .find(it => it.processNodeCode === PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_ACCEPT
              && it.nodeStateCode === '1');
          if (row) {
            count = row.unFinishCount || '0';
          }
          break;
        }
        case TABS_ENUM.WAIT_SUBMIT: {
          const row = stateInfo.value
            .find(it => it.processNodeCode === PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_PROCESS
              && it.nodeStateCode === '0');
          if (row) {
            count = row.unFinishCount || '0';
          }
          break;
        }
        case TABS_ENUM.SUBMIT: {
          const row = stateInfo.value
            .find(it => it.processNodeCode === PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_PROCESS
              && it.nodeStateCode === '1');
          if (row) {
            count = row.count || '0';
          }
          break;
        }
        default:
          break;
      }
      return {
        ...v,
        label: `${v.label}(${count})`,
      };
    });
  });
  return {
    tabs,
    getStateStatByNode
  };
};
