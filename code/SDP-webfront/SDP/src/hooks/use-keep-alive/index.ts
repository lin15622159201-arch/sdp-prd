import { onDeactivated, ref } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

const cacheKeys = ref<Map<string, number>>(new Map());
export const useKeepAlive = () => {
  const needRemoveCacheKeys = ref<string[]>([]);
  const $route = useRoute();
  const removeCurRouteCache = () => {
    if ($route.meta.isKeepAlive) {
      const { name } = $route;
      needRemoveCacheKeys.value.push(name as string);
    }
  };
  const removeTargetCache = (name: string) => {
    const key = cacheKeys.value.get(name) || 0;
    cacheKeys.value.set(name, key + 1);
  };
  const getRouteKey = (route: RouteLocationNormalizedLoaded) => {
    const name = route.name as string;
    const count = cacheKeys.value.get(name) || 0;
    return `${name}-${count}`;
  };
  onDeactivated(() => {
    needRemoveCacheKeys.value.forEach((v) => {
      removeTargetCache(v);
    });
    needRemoveCacheKeys.value = [];
  });
  return {
    removeCurRouteCache,
    removeTargetCache,
    getRouteKey,
  };
};
