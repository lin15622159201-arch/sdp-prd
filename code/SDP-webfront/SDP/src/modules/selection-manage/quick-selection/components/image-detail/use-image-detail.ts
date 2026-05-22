import { shallowRef, computed } from 'vue';
import { ISmartDevelopStyleDetailRes } from '../api/type';
import { GENERATE_MODE } from '@/modules/inspiration-center/constant';
import { RECOMMEND_FABRIC_TASK_STATUS, TASK_STATE } from '../constant/index';
import { smartDevelopStyleDetail } from '../api';
import { getImgWithWatermark } from '../utils/image';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { GenerateFlatList, ImageList } from './type';

const GROUP_COLORS = [
  '#409EFF',
  '#67C23A',
  '#E6A23C',
  '#F56C6C',
];

export const useImageDetail = () => {
  const detail = shallowRef<ISmartDevelopStyleDetailRes>({
    taskCode: '',
    categoryCode: '',
    categoryName: '',
    topicLabels: [],
    labels: [],
    flowerPatternLabels: [],
    styleLabels: [],
    recommendFabricList: [],
    generateMode: GENERATE_MODE.SINGLE_POSE, // 假设 GENERATE_MODE 有 SINGLE 和 MULTI
    aiModelCode: '',
    creatorName: '',
    createdTime: '',
    taskStatus: TASK_STATE.COMPLETED, // 假设 TASK_STATE 有 PENDING 状态
    prompts: '',
    referencePicture: '',
    generateImages: [],
    taskId: '',
    aigcTaskId: '',
    styleType: 0,
    creatorId: '',
    bgEnhanced: YES_NO_NUMBER_ENUM.NO,
    faceFix: YES_NO_NUMBER_ENUM.YES,
    aiModelUrl: '',
    aiModelName: '',
    fabricRecommendTask: {
      taskId: '',
      taskStatus: RECOMMEND_FABRIC_TASK_STATUS.QUEUING,
      taskProgress: '',
      rankPosition: '',
      message: '',
      createdTime: ''
    },
    promiseEnhanced: YES_NO_NUMBER_ENUM.YES,
    modelMaterialId: '',
    modelMaterialName: '',
    modelMaterialUrl: '',
    modeName: '',
    modeCode: '',
    refWeight: 0
  });

  const handleGetDetailByCode = async (taskCode: string) => {
    const { data } = await smartDevelopStyleDetail(taskCode);
    detail.value = data;
  };

  const generateImages = computed(
    () => {
      const list: GenerateFlatList = [];
      detail.value.generateImages.forEach((item) => {
        const { groupNum, pictureList } = item;
        pictureList.forEach((picture) => {
          list.push({ groupNum, ...picture });
        });
      });
      return list;
    }
  );

  const generateWaterImages = computed(
    () => {
      const list: ImageList = [];
      detail.value.generateImages.forEach((item, index) => {
        const { groupNum, pictureList } = item;
        pictureList.forEach((picture) => {
          list.push({ ...item, groupNum, imgUrl: getImgWithWatermark(picture.pictureUrl), color: GROUP_COLORS[index] });
        });
      });
      return list;
    }
  );

  const faceGenerateWaterImages = computed(
    () => {
      const list: ImageList = [];
      detail.value.generateImages.forEach((item, index) => {
        const { groupNum, pictureList } = item;
        pictureList.forEach((picture) => {
          list.push({ groupNum, imgUrl: getImgWithWatermark(picture.repairImgUrl), color: GROUP_COLORS[index] });
        });
      });
      return list;
    }
  );

  return {
    detail,
    handleGetDetailByCode,
    generateImages,
    generateWaterImages,
    faceGenerateWaterImages,
  };
};
