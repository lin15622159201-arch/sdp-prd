import { RouteLocationNormalized, useRouter, useRoute } from 'vue-router';

export const getRouteUrl = (route: RouteLocationNormalized) => {
  const { path, params } = route;
  let url = path;
  Object.keys(params).forEach((key) => {
    const val = params[key] as string;
    url = url.replace(new RegExp(val), key);
  });
  return url;
};

export function updateRouteUrl(query: { [key: string]: any; }) {
  const router = useRouter();
  const route = useRoute();
  query = Object.assign({}, query);
  // 调用 this.$router.replace 路由重复时，报 Navigation Duplicated
  query.t = +new Date();
  // 编码中文
  Object.keys(query).forEach((key) => {
    const value = query[key];
    if (typeof value === 'object') {
      query[key] = encodeURIComponent(JSON.stringify(value));
    } else {
      query[key] = value ? encodeURIComponent(value) : '';
    }
  });
  router.replace({
    name: router.currentRoute.value.name!,
    params: route.params,
    query,
  });
}
