import { Ref, toRefs, computed, CSSProperties, reactive } from 'vue';

export const useDragEvent = (domRef: Ref) => {
  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  const transform = reactive({
    offsetX: 0,
    offsetY: 0,
  });

  const resetDragEvent = () => {
    isDragging = false;
    offsetX = 0;
    offsetY = 0;
    startX = 0;
    startY = 0;
    transform.offsetX = 0;
    transform.offsetY = 0;
  };

  const dragStyleObject = computed(() => {
    const style: CSSProperties = {
      transform: `translate3d(${transform.offsetX}px, ${transform.offsetY}px, 0)`,
    };
    return style;
  });

  const handleMouseDown = (e: MouseEvent) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    // 鼠标改为抓手
    domRef.value!.style.cursor = 'grabbing';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    offsetX += dx;
    offsetY += dy;

    transform.offsetX = offsetX;
    transform.offsetY = offsetY;

    startX = e.clientX;
    startY = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging = false;
    domRef.value!.style.cursor = 'auto'; // 还原鼠标样式为auto
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return {
    dragStyleObject,
    handleMouseDown,
    resetDragEvent,
    ...toRefs(transform),
  };
};
