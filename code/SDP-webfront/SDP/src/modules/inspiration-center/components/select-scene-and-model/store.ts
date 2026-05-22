import { defineStore } from 'pinia';
import { getSceneList } from './api';
import { shallowRef } from 'vue';
import { ISceneListRes } from './api/type';

export const useSceneStore = defineStore('sceneStore', () => {
  const sceneList = shallowRef<ISceneListRes>([]);
  const handleGetSceneList = async () => {
    const { data } = await getSceneList();
    sceneList.value = data;
  };

  return {
    sceneList,
    handleGetSceneList,
  };
});
