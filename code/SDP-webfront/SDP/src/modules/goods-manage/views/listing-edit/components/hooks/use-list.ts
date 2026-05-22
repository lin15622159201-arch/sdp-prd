import { computed, ref, shallowRef } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';


export const useList = async () => {
  return new Promise(async (res) => {
    // const jsonData = await fetch('/2026-01-15T170034.200.json');
    // const jsonResult = await jsonData.json();
    res({
      listData: [] // jsonResult.data,
    });
  });
};
