import { computed, ref } from 'vue';
import { TAB_LIST, TABS_ENUM } from '../constant';
import { getStepNodeStateCount } from '@/modules/clothes-center/api';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { plus } from 'number-precision';

export const useTabs = () => {
  const activeTab = ref(TABS_ENUM.WAIT);
  const stateInfo = ref<IStepNodeStateCountRes>([]);
  const getStateStatByNode = async (params: any) => {
    const { data } = await getStepNodeStateCount({
      ...params,
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW!,
    });
    stateInfo.value = data;
  };
  const tabs = computed(() => {
    return TAB_LIST.map((v) => {
      let count = '0';
      switch (v.value) {
        case TABS_ENUM.WAIT: {
          const row = stateInfo.value
            .find(it => it.processNodeCode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS
              && it.nodeStateCode === '0');
          if (row) {
            count = row.unFinishCount || '0';
          }
          break;
        }
        case TABS_ENUM.DOING: {
          const row = stateInfo.value
            .find(it => it.processNodeCode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS
              && it.nodeStateCode === '1');
          if (row) {
            count = row.unFinishCount || '0';
          }
          break;
        }
        case TABS_ENUM.FINISHED: {
          const row = stateInfo.value
            .find(it => it.processNodeCode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS
              && it.nodeStateCode === '2');
          if (row) {
            count = row.count || '0';
          }
          break;
        }
        case TABS_ENUM.SEMI: {
          const arr = stateInfo.value
            .filter(it => it.processNodeCode === PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_HALF_SECOND_CRAFT
              && ['1', '2'].includes(it.nodeStateCode!));
          if (arr.length) {
            count = String(plus(
              ...arr.map((it) => {
                if (it.nodeStateCode === '2') {
                  return it.count || '0';
                }
                return it.unFinishCount || '0';
              })
            ));
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
    activeTab,
    getStateStatByNode
  };
};
