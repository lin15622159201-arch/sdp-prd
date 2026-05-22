import routerAsyncMap from './router-async';
import routerConstantMap from './router-constant';
import { createRouter, createWebHistory } from 'vue-router';
import { IRouteConfig } from './types';
import { useInstances } from '@/hooks/use-instances';

const routes: Readonly<Array<IRouteConfig>> = [...routerConstantMap, ...routerAsyncMap];

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});

const { setVueRouterInstance } = useInstances();
setVueRouterInstance(router);

export default router;
