import { Router } from 'vue-router';
import { App } from 'vue';
import { INSTANCE_ENUM } from './constant';

const instances = {
  [INSTANCE_ENUM.VUE]: null as App | null,
  [INSTANCE_ENUM.VUE_ROUTER]: null as Router | null,
};
export const useInstances = () => {
  const getVueInstance = () => {
    return instances[INSTANCE_ENUM.VUE]!;
  };
  const setVueInstance = (el: App) => {
    instances[INSTANCE_ENUM.VUE] = el;
  };
  const getVueRouterInstance = () => {
    return instances[INSTANCE_ENUM.VUE_ROUTER]!;
  };
  const setVueRouterInstance = (el: Router) => {
    instances[INSTANCE_ENUM.VUE_ROUTER] = el;
  };
  return {
    getVueInstance,
    setVueInstance,
    getVueRouterInstance,
    setVueRouterInstance,
  };
};
