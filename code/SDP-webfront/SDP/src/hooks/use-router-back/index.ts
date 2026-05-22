import { ref } from 'vue';
import { useRouter } from 'vue-router';

const lastRouterName = ref('');
export const useRouterBack = () => {
  const router = useRouter();
  router.afterEach((to, from) => {
    lastRouterName.value = from.name as string;
  });
  const handleBack = (routeName: string) => {
    if (lastRouterName.value === routeName) {
      router.back();
    } else {
      router.push({ name: routeName });
    }
  };
  return {
    handleBack
  };
};
