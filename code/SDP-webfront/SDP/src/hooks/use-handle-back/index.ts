import { useRouter } from 'vue-router';

export const useHandleBack = (defaultRouteName?: string) => {
  const router = useRouter();

  const handleBack = (routeName?: string) => {
    // 直接用 router 历史判断
    router.back();
    // if (window.history.length > 1) {
    //   router.back();
    // } else {
    //   router.push({ name: routeName || defaultRouteName });
    // }
  };

  return { handleBack };
};
