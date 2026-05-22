import { computed } from 'vue';

export interface DialogProps {
  visible?: boolean;
  [key: string]: any;
}

export const checkVisible = (val?: any) => {
  if (typeof val === 'boolean') {
    return val;
  }
  return false;
};

export default function dialogVisible<
  T extends DialogProps,
>(
  props: T,
  emit: (event: any, ...args: any[]) => void,
  event = 'update:modelValue',
) {
  const visible = computed({
    get: () => {
      return checkVisible(props.modelValue);
    },
    set: (newVal: boolean) => {
      emit(event, newVal);
    },
  });
  return {
    visible,
  };
}
