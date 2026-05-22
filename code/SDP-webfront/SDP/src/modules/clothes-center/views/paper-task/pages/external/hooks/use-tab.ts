import { computed, ref } from 'vue';
import { TABS_LIST } from '../constant';
import { PAGE_TYPE_STATUS_ENUM } from '../../../constant';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';
import { getStepNodeStateCount } from '@/modules/clothes-center/api';
import { IStepNodeStateCountRes } from '@/modules/clothes-center/api/types';
import { IPatternClothesQueryByPageReq } from '../../../api/types';

export const useTabs = () => {
  const stateInfo = ref<IStepNodeStateCountRes>([]);
  const getStateStatByNode = async (p: IPatternClothesQueryByPageReq) => {
    const { data } = await getStepNodeStateCount({
      ...p,
      clothesStep: PROCESS_STEP_CODE_ENUM.PATTERN!,
    });
    stateInfo.value = data;
  };

  const tabs = computed(() => {
    return TABS_LIST.map((v) => {
      let count = '0';
      switch (v.value) {
        case PAGE_TYPE_STATUS_ENUM.WAIT_DISPATCH: {
          const row = stateInfo.value
            .find(it => it.processNodeCode === PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_ACCEPT
                      && it.nodeStateCode === '2');
          if (row) {
            count = row.unFinishCount || '0';
          }
          break;
        }
        case PAGE_TYPE_STATUS_ENUM.WAIT: {
          const row = stateInfo.value
            .find(it => it.processNodeCode === PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_PROCESS
                      && it.nodeStateCode === '4');
          if (row) {
            count = row.unFinishCount || '0';
          }
          break;
        }
        case PAGE_TYPE_STATUS_ENUM.SUBMIT: {
          const row = stateInfo.value
            .find(it => it.processNodeCode === PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_PROCESS
                      && it.nodeStateCode === '5');
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
