import { defineStore } from 'pinia';

interface PageParams {
  [pageKey: string]: Record<string, any>;
}

/**
 * @description 页面参数缓存
 * @returns 只缓存【全部/我的】、skc、spu
 */
export const usePageParamsStore = defineStore({
  id: 'pageParamsStore',
  state: () => ({
    paramsCache: {} as PageParams,
  }),
  actions: {
    // 保存参数
    saveParams(pageKey: string, params: Record<string, any>) {
      this.paramsCache[pageKey] = params;
    },
    // 获取参数
    getParams(pageKey: string): Record<string, any> | null {
      return this.paramsCache[pageKey] || null;
    },
  },
});
