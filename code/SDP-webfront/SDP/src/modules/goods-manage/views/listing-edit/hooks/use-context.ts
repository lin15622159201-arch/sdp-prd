import { computed } from 'vue';
import { useRoute } from 'vue-router';

/**
 * 一些需要共享的上下文
 */
export const useContext = () => {
  const route = useRoute();
  const isReadonly = computed(() => route.params.mode === 'readonly');
  const isGoodsEdit = computed(() => route.params.mode === 'goodsEdit');
  const goodsEditImg = computed(() => route.params.mode === 'goodsEditImg');
  return {
    isReadonly,
    isGoodsEdit,
    goodsEditImg,
  };
};
