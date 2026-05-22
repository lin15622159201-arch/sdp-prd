<script setup lang="ts">
import { useGetOptions } from './use-get-options';

const weightCode = defineModel<number>('weightCode', {
  default: 0,
});
const weightName = defineModel<string>('weightName', {
  default: '',
});

defineProps({
  formItemProp: {
    type: String,
    default: '',
  },
});

const { fgRefWeight } = useGetOptions();

const handleChange = (value: string | number | boolean | undefined) => {
  const weight = fgRefWeight.value.find(item => item.value === value);
  if (weight) {
    weightCode.value = weight.value!;
    weightName.value = weight.label!;
  }
};

</script>

<template>
  <el-form-item label="参考权重" :prop="formItemProp">
    <el-radio-group v-model="weightCode" @change="handleChange">
      <el-radio-button
        v-for="item in fgRefWeight"
        :key="item.value"
        :value="item.value!"
        :label="item.label!"
      >
        {{ item.label }}
      </el-radio-button>
    </el-radio-group>

  </el-form-item>
</template>
