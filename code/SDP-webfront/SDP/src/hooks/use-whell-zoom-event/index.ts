import { ref, computed, CSSProperties } from 'vue';

export const useWheelZoomEvent = () => {
  const scale = ref(1);

  const resetWheelEvent = () => {
    scale.value = 1;
  };

  const zoomStyleObject = computed(() => {
    const style: CSSProperties = {
      transform: `scale(${scale.value})`,
    };
    return style;
  });
  const handleWheelEvent = (e: WheelEvent) => {
    e.preventDefault();
    const delta = window.navigator.userAgent.indexOf('Mac') > 0 ? e.deltaY : -e.deltaY;
    // 滚轮向上滚动时放大
    if (delta > 0) {
      scale.value += 0.05;
    } else if (delta < 0) {
      // 滚轮向下滚动时缩小
      scale.value -= 0.05;
    }
    // 限制缩放范围
    scale.value = Math.max(1, Math.min(3, scale.value));
  };
  return {
    handleWheelEvent,
    zoomStyleObject,
    resetWheelEvent,
    scale,
  };
};
