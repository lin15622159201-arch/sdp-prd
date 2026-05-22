import { ref } from 'vue';
import { PostureFissionTaskCreateReq } from '../../api/types';

export const useCreateByInspiration = () => {
  const getDataList = ref([]);

  const getInspirationCreateParams = (baseParams: PostureFissionTaskCreateReq) => {
    return getDataList.value.reduce((list: any, item: any) => {
      list.push({
        ...item,
        ...baseParams,
        inspirationId: item.inspirationId,
        inspirationCode: item.inspirationCode || '',
        sourceBusinessId: item.inspirationId,
        sourceBusinessCode: item.inspirationCode,
        pictureUrls: item.pictureUrls,
        taskSource: '',
        fromInspiration: true,
      });
      return list;
    }, [] as PostureFissionTaskCreateReq[]);
  };
  const getData = (data: any, params: any) => {
    getDataList.value = data.reduce((list: any, item: any) => {
      list.push({
        ...params,
        inspirationId: item.inspirationId,
        inspirationCode: item.inspirationCode || '',
        sourceBusinessId: item.inspirationId,
        sourceBusinessCode: item.inspirationCode,
        taskSource: 'upload',
        pictureUrls: [item.inspirationImage],
        fromInspiration: true,
      });
      return list;
    }, [] as PostureFissionTaskCreateReq[]);
  };
  return {
    /** 获取来源于灵感源的创建任务参数 */
    getInspirationCreateParams,
    getData,
  };
};
