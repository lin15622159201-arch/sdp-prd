<script lang="ts" setup>
import { defineModel, PropType } from 'vue';
import { GENERATE_MODE } from '../constant';

const emit = defineEmits<{
  (event: 'select', mode: GENERATE_MODE): void;
}>();

const props = defineProps({
  multiDisabled: {
    type: Boolean,
    default: false
  }
});

const currentMode = defineModel({
  type: Number as PropType<GENERATE_MODE>,
  default: GENERATE_MODE.MULTI_POSE
});

const generateModeList = [
  {
    label: '多姿势',
    value: GENERATE_MODE.MULTI_POSE,
    img: 'https://oss.yunbanfang.cn/tiangong_a0f357b57a2f4df38eb9a73dfd090401.jpeg'
  },
  {
    label: '单姿势',
    value: GENERATE_MODE.SINGLE_POSE,
    img: 'https://oss.yunbanfang.cn/tiangong_88bdf52bac374c46b6cf58f1ca1653c6.jpeg'
  }
];

const handleSelect = (mode: GENERATE_MODE) => {
  if (props.multiDisabled && mode === GENERATE_MODE.MULTI_POSE) {
    return;
  }
  currentMode.value = mode;
  emit('select', mode);
};

</script>

<template>
  <div class="tw-flex tw-gap-12px">
    <div
      v-for="generateMode in generateModeList"
      :key="generateMode.value"
      :class="{
        'item-wrapper': true,
        selected: currentMode === generateMode.value,
        disabled: generateMode.value === GENERATE_MODE.MULTI_POSE && props.multiDisabled
      }"
      @click="handleSelect(generateMode.value)"
    >
      <img class="image tw-object-cover" :src="generateMode.img" />
      <span class="label">{{ generateMode.label }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 2px solid transparent;
  align-items: center;
  text-align: center;
  font-size: 12px;
  background: white;
  color: #3F414D;
  line-height: 20px;
  cursor: pointer;
  .image {
    border-radius: 4px 4px 0 0;
    width: 108px;
    height: 108px;
  }
  .label {
    padding: 4px 0;
  }
  &.selected {
    border-color: #605CE5;
    color: #605CE5;
    background-color: #F3F3FF;
  }
  &.disabled {
    cursor: not-allowed;
  }
}
</style>
