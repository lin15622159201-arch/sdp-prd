import { ref } from 'vue';

export interface OpenProps {
  defaultOpen: boolean;
}

export default function useToggleOpen<T extends OpenProps>(props: T) {
  const isOpened = ref(props.defaultOpen);
  const handleToggle = () => {
    isOpened.value = !isOpened.value;
  };
  return {
    isOpened,
    handleToggle,
  };
}
