import { shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { PostureFissionTaskCreateReq } from '../../api/types';
import { fetchImageUpdateListBySpu } from '@/modules/design-center/image-update/api';
import { IImageUpdateListBySpuRes } from '@/modules/design-center/image-update/api/type';
import { IMAGE_UPDATE_TASK_TYPE_ENUM } from '@/modules/design-center/image-update/constant';

export const STYLE_QUERY_KEY = 'byStyleCode';
export const useCreateByStyle = () => {
  const route = useRoute();
  const isFromStyle = route.query[STYLE_QUERY_KEY] !== undefined;
  const styleList = shallowRef<IImageUpdateListBySpuRes>([]);

  const initStyleList = async (styleCodeStr: string) => {
    const spuCodes = styleCodeStr.split(',');
    const { data } = await fetchImageUpdateListBySpu({ spuCodes, taskType: IMAGE_UPDATE_TASK_TYPE_ENUM.IMAGE });
    const uniqueStyleCodes = new Set<string>();
    styleList.value = data?.filter((item) => {
      // 过滤掉重复的款式
      if (!item.spuCode || uniqueStyleCodes.has(item.spuCode)) return false;
      uniqueStyleCodes.add(item.spuCode);
      return true;
    }) || [];
  };

  const getStylePicUrls = () => {
    const skcCodesStr = route.query.skcCode as string || '';
    const skcCodes = skcCodesStr.split(',').map(code => code.trim());
    const urls: string[] = [];
    styleList.value.forEach((item) => {
      item.skcList.forEach((skc) => {
        if (skcCodesStr && !skcCodes.includes(skc.skcCode)) return;
        if (Array.isArray(skc.pictures) && skc.pictures[0]?.pictureUrl) {
          urls.push(skc.pictures[0].pictureUrl);
        }
      });
    });
    return urls;
  };

  const getStyleTaskCreateParams = (baseParams: PostureFissionTaskCreateReq) => {
    const skcCodesStr = route.query.skcCode as string || '';
    const skcCodes = skcCodesStr.split(',').map(code => code.trim());
    return styleList.value.reduce((list, item) => {
      item.skcList?.forEach((skc) => {
        if (skcCodesStr && !skcCodes.includes(skc.skcCode)) return;
        if (Array.isArray(skc.pictures) && skc.pictures.length) {
          const taskSource = route.query.taskType as string || item.spuSourceType;
          list.push({
            ...baseParams,
            pictureUrls: [skc.pictures[0].pictureUrl],
            taskSource,
            skcId: skc.skcId,
            skcCode: skc.skcCode,
            sourceBusinessId: item.spuId!,
            sourceBusinessCode: item.spuCode!,
            developStyleTaskId: item.developStyleTaskId
          });
        }
      });
      return list;
    }, [] as PostureFissionTaskCreateReq[]);
  };

  return {
    /** 任务是否来源于款式管理 */
    isFromStyle,
    /** 初始化来源款式数据 */
    initStyleList,
    /** 获取所有款式中需要裂变的图片 */
    getStylePicUrls,
    /** 获取来源于款式管理的创建任务参数 */
    getStyleTaskCreateParams
  };
};
