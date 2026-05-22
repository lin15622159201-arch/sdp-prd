import { IFile } from '@/components/uploader/packages/types';
import { getSmartDevelopStyleDetailById } from '@/components/view-picture/components/api';
import { StringMatrixHelper } from '@/core/utils/format';
import { SEND_TASK_ID_KEY_ENUM } from '@/hooks/use-send-task';
import { fetchFloralPatternApplyTaskDetail } from '@/modules/selection-manage/quick-selection-fission/api';
import { webStyleGenApi, webStyleGenApiByDerive, webVirtuaApi } from '@/modules/stylish-derivation/posture-fission/api';
import { computed, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

export const useCreateData = (formData: Ref<{ categoryName: string; categoryCode: string; }>) => {
  const route = useRoute();
  const defaultIndexGroupsWithEmpty: string[][] = []; // 默认图片索引组，可能存在空组
  const defaultImgUrlsGroups = ref<string[][]>([]);
  /**
   * 是否禁用删除默认模特图
   * 当只有一个组，且该组只有一个图片时，禁用删除
   */
  const isDefaultImgDisabled = computed(() => defaultImgUrlsGroups.value.length === 1 && defaultImgUrlsGroups.value[0]?.length === 1);
  const activeGroupIndex = ref(0);

  const defaultCreateParams = {
    taskSource: '',
    sourceBusinessCode: '',
    sourceBusinessId: ''
  };

  const onDefaultImgsChange = (groupIdx: number, value: IFile[]) => {
    if (!value?.length) {
      defaultImgUrlsGroups.value.splice(groupIdx, 1);
      if (!defaultImgUrlsGroups.value[activeGroupIndex.value]) {
        activeGroupIndex.value = 0;
      }
    } else {
      defaultImgUrlsGroups.value[groupIdx] = value.map(item => item.url);
    }
  };

  type IGetData = (sourceId: string) => Promise<void>;

  const setParams = (params: { taskCode?: string; categoryName?: string; categoryCode?: string; }) => {
    const { categoryName, categoryCode, taskCode } = params;
    categoryName && (formData.value.categoryName = categoryName);
    categoryCode && (formData.value.categoryCode = categoryCode);
    taskCode && (defaultCreateParams.sourceBusinessCode = taskCode);
  };
  /** 初始化AI设计任务数据 */
  const initAiTaskData: IGetData = async (sourceId) => {
    const { data } = await getSmartDevelopStyleDetailById(sourceId);
    setParams(data);
    defaultIndexGroupsWithEmpty.forEach((picIdxs, groupIndex) => {
      if (picIdxs.length === 0) return;
      const groupUrls: string[] = [];
      picIdxs.forEach((idx) => {
        const picIndex = Number(idx);
        const pic = data.generateImages[groupIndex]?.pictureList?.[picIndex];
        if (pic) {
          groupUrls.push(pic.repairImgUrl || pic.pictureUrl!);
        }
      });
      groupUrls.length && defaultImgUrlsGroups.value.push(groupUrls);
    });
  };
  /** 初始化风格生成任务数据 */
  const initStyleGenTaskData: IGetData = async (sourceId) => {
    const { data } = await webStyleGenApiByDerive(sourceId);
    setParams(data);
    // 风格化衍生每张图一组
    defaultIndexGroupsWithEmpty[0].forEach((imageId) => {
      const pic = data.images?.find(item => item.imageId === imageId);
      if (pic) {
        // 每张图一组，优先用脸部修复后的图
        defaultImgUrlsGroups.value.push([pic.faceRepairUrl || pic.imageUrl]);
      }
    });
  };
  /** 初始化花型上身任务数据 */
  const initPatternApplyTaskData: IGetData = async (sourceId) => {
    const { data } = await fetchFloralPatternApplyTaskDetail(sourceId);
    setParams(data);
    defaultIndexGroupsWithEmpty.forEach((picIdxs, groupIndex) => {
      if (picIdxs.length === 0) return;
      const groupUrls: string[] = [];
      picIdxs.forEach((idx) => {
        const picIndex = Number(idx);
        const picUrl = data.generatedPicUrls[groupIndex]?.picUrls?.[picIndex];
        if (picUrl) {
          groupUrls.push(picUrl);
        }
      });
      groupUrls.length && defaultImgUrlsGroups.value.push(groupUrls);
    });
  };
  /** 初始化虚拟换衣任务数据 */
  const initVirtualTryOnTaskData: IGetData = async (sourceId) => {
    const { data } = await webVirtuaApi(sourceId);
    setParams(data);
    // 虚拟换衣发送过来只有一组，由图片id组成，如：1,2,3,4
    const imageIds = defaultIndexGroupsWithEmpty[0];
    const urls: string[] = [];
    imageIds.forEach((imageId) => {
      const pic = data.images?.find(item => String(item.imageId) === imageId);
      const url = pic?.faceRepairUrl || pic?.imageUrl;
      if (url) {
        urls.push(url);
      }
    });
    defaultImgUrlsGroups.value = [urls];
  };
  /** 初始化姿势裂变任务数据 */
  const initPostureFissionTaskData: IGetData = async (sourceId) => {
    const { data } = await webStyleGenApi(sourceId);
    setParams(data);
    // 姿势裂变只有一组图
    defaultImgUrlsGroups.value[0] = [];
    defaultIndexGroupsWithEmpty[0].forEach((pictureId) => {
      const pic = data.generateImages?.find(item => String(item.pictureId) === pictureId);
      if (pic) {
        defaultImgUrlsGroups.value[0].push(pic.repairImgUrl || pic.pictureUrl!);
      }
    });
  };

  const taskInitDataMap: Partial<Record<SEND_TASK_ID_KEY_ENUM, IGetData>> = {
    [SEND_TASK_ID_KEY_ENUM.AI_DESIGN]: initAiTaskData,
    [SEND_TASK_ID_KEY_ENUM.STYLE_GEN]: initStyleGenTaskData,
    [SEND_TASK_ID_KEY_ENUM.PATTERN_APPLY]: initPatternApplyTaskData,
    [SEND_TASK_ID_KEY_ENUM.VIRTUAL_TRYON]: initVirtualTryOnTaskData,
    [SEND_TASK_ID_KEY_ENUM.POSTURE_FISSION]: initPostureFissionTaskData,
  };

  const init = async () => {
    const { imgs, taskSource } = route.query as Record<string, string>;
    if (imgs && taskSource) {
      const sourceIdKey = Object.keys(taskInitDataMap).find(idKey => route.query[idKey]);
      if (sourceIdKey) {
        const sourceId = route.query[sourceIdKey] as string;
        const taskInitFn = taskInitDataMap[sourceIdKey as SEND_TASK_ID_KEY_ENUM];
        defaultIndexGroupsWithEmpty.push(...StringMatrixHelper.fromString(imgs));
        defaultCreateParams.sourceBusinessId = sourceId;
        defaultCreateParams.taskSource = taskSource;
        await taskInitFn?.(sourceId);
      }
    }
  };

  return {
    activeGroupIndex,
    /** 默认图片组 */
    defaultImgUrlsGroups,
    defaultCreateParams,
    isDefaultImgDisabled,
    onDefaultImgsChange,
    initCreateData: init
  };
};
