import { onBeforeMount, onBeforeUnmount, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePageParamsStore } from '../store/page-params';
import { cloneDeep } from 'lodash-es';

/**
 * 缓存页面搜索参数
 * 只缓存【全部/我的】、skc、spu；
 * @param params 页面搜索参数
 * @param searchAreaRef 页面搜索区域组件
 * @param isDefaultOpen 页面搜索区域默认展开/收起
 * @param pageId 页面标识 (可选) 默认使用路由名称 + 路径
 * @param activeTab 页面tab标识 (可选)，有些页面有独立的tab，需要缓存tab标识
 *
 */
const usePageParams = (
  params: Ref,
  pageId?: string,
  activeTab?: Ref,
) => {
  const route = useRoute();
  const store = usePageParamsStore();

  // 生成唯一页面标识（使用路由名称 + 路径）
  const pageKey = pageId ? `${pageId}` : `${route.name?.toString() || ''}_${route.path}`;

  // 初始化逻辑
  onBeforeMount(() => {
    const cachedParams = store.getParams(pageKey);
    console.log('cachedParams=', cachedParams);
    if (cachedParams) {
      const p = cloneDeep(cachedParams);
      const { personal, designCode, styleCode, styleCodeLike } = p;
      if ('activeTab' in cachedParams && cachedParams.activeTab && activeTab) {
        activeTab.value = cachedParams.activeTab;
      }
      delete p.activeTab;
      if ('personal' in params.value) {
        params.value.personal = personal;
      }
      if ('designCode' in params.value) {
        params.value.designCode = designCode;
      }
      if ('styleCode' in params.value) {
        params.value.styleCode = styleCode;
      }
      if ('styleCodeLike' in params.value) {
        params.value.styleCodeLike = styleCode ?? styleCodeLike;
      }
      // params.value.personal = personal;
      // params.value.designCode = designCode;
      // params.value.styleCode = styleCode;
      console.log('styleCode' in params.value);
      console.log('designCode' in params.value);
    }
    console.log('params.value=', params.value);
  });

  // 页面卸载前保存参数
  onBeforeUnmount(() => {
    const cachedParams = store.getParams(pageKey);
    const styleCode = cachedParams?.styleCode || cachedParams?.styleCodeLike;
    if (!('styleCode' in params.value) && !('styleCodeLike' in params.value)) {
      store.saveParams(pageKey, { ...params.value, activeTab: activeTab?.value, styleCode });
    } else {
      store.saveParams(pageKey, { ...params.value, activeTab: activeTab?.value });
    }

    console.log('store=', store.$state.paramsCache);
  });
};

export default usePageParams;
