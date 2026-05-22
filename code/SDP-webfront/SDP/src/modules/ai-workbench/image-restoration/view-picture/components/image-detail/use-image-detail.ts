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
  const detail = shallowRef<any>({
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

  const handleGetDetailByCode = async (data: any) => {
    if (!data) return;
    // const { data } = await smartDevelopStyleDetail(taskCode);
    detail.value = {
      ...data,
      referencePicture: data.refImgUrl,
      generateImages: [{
        pictureId: data.taskId,
        groupNum: 1,
        pictureList: (data.images || []).map((v: any) => {
          return {
            ...v,
            repairImgUrl: v.faceRepairUrl,
            serialNum: v.serialNum,
            pictureId: v.imageId,
            pictureUrl: v.imageUrl,
            pictureName: null
          };
        })
      }]
    };
  };

  const generateImages = computed(
    () => {
      const list: GenerateFlatList = [];
      detail.value.generateImages.forEach((item: any) => {
        const { groupNum, pictureList } = item;
        pictureList.forEach((picture: any) => {
          list.push({ groupNum, ...picture });
        });
      });
      return list;
    }
  );

  const generateWaterImages = computed(
    () => {
      const list: ImageList = [];
      detail.value.generateImages.forEach((item: any, index: number) => {
        const { groupNum, pictureList } = item;
        pictureList.forEach((picture: any) => {
          list.push({ ...picture, ...item, groupNum, imgUrl: getImgWithWatermark(picture.pictureUrl), color: GROUP_COLORS[index] });
        });
      });
      return list;
    }
  );

  const faceGenerateWaterImages = computed(
    () => {
      const list: ImageList = [];
      detail.value.generateImages.forEach((item: any, index: number) => {
        const { groupNum, pictureList } = item;
        pictureList.forEach((picture: any) => {
          list.push({ ...picture, groupNum, imgUrl: getImgWithWatermark(picture.repairImgUrl), color: GROUP_COLORS[index] });
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
