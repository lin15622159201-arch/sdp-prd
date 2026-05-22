import { ref } from 'vue';
import { getStepNodeStateCount } from '../api';
import { cloneDeep } from 'lodash-es';
import { IStepNodeStateCountRes } from '../api/types';

const useGetCount = () => {
  const stepNodeStateCountData = ref<IStepNodeStateCountRes>([]);
  // 打版统计列表(车版、纸样使用)
  const getStepNodeStateCountList = async (params = {}) => {
    const { data } = await getStepNodeStateCount({
      clothesStep: '',
      clothesNode: '',
      clothesStepNodeState: '',
      ...params,
    });
    stepNodeStateCountData.value = cloneDeep(data);
  };

  return {
    stepNodeStateCountData,
    getStepNodeStateCountList,
  };
};

export default useGetCount;
