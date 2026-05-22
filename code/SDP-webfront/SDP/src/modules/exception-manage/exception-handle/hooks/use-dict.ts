import { computed, ref } from 'vue';
import { stepNodeStateDict } from '../api';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IStepNodeStateDictItem } from '../api/type';

const useDict = () => {
  const { getDictionaryOptions } = useDictionary();

  /** 异常类型ops */
  const PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_SAMPLE_EXCEPTION_TYPE) || [];
  });

  interface IStepNodeStateOptionitem extends IStepNodeStateDictItem {
    label: string;
    value: string;
  }

  /** 发起阶段枚举 */
  const PLM_EXCEPTION_STEP_OPTIONS = ref<IStepNodeStateOptionitem[]>([]);
  const getPlmExceptionStepOptions = async () => {
    try {
      const { data } = await stepNodeStateDict();
      PLM_EXCEPTION_STEP_OPTIONS.value = data?.map((item) => {
        return {
          ...item,
          label: `${item.stepDesc}-${item.nodeDesc}-${item.nodeStateDesc}`,
          value: `${item.stepCode}-${item.nodeCode}-${item.nodeStateCode}`,
        };
      });
    } catch (error) {
      PLM_EXCEPTION_STEP_OPTIONS.value = [];
    }
    console.log('PLM_EXCEPTION_STEP_OPTIONS=', PLM_EXCEPTION_STEP_OPTIONS.value);
  };
  getPlmExceptionStepOptions();

  return {
    PLM_SAMPLE_EXCEPTION_TYPE_OPTIONS,
    PLM_EXCEPTION_STEP_OPTIONS,
  };
};

export default useDict;
