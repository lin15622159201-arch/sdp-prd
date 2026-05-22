<!-- 产品属性 -->
<template>
  <div class="tw-w-100%">
    <el-autocomplete
      class="tw-w-100%"
      v-model="modelValue"
      :fetch-suggestions="querySearch"
      placeholder="请输入"
      @select="handleSelect"
      @input="handleInput"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang='ts'>
import { ref, PropType } from 'vue';

const modelValue = defineModel({
  type: String,
  default: '',
});
const selectNumList = defineModel('selectNumList', {
  type: Array as PropType<any>,
  default: () => [],
});

const querySearch = (queryString: any, cb: any) => {
  const results = queryString ? selectNumList.value.filter((v: any) => {
    return v.value?.toString().includes(queryString);
  }) : selectNumList.value;
  // 调用 callback 返回建议列表的数据
  cb(results);
};
const handleSelect = (item:any) => {
  modelValue.value = item.value;
};
// defineExpose({
//   formRef,
// });
/**
 * 实时输入过滤：只保留数字字符，过滤所有非数字内容
*/
const handleInput = (val: string) => {
  // 正则匹配所有数字，过滤非数字字符
  const numVal = (val.toString()).replace(/\D/g, '');
  // 更新绑定值
  modelValue.value = numVal;
};

/**
 * 失去焦点校验：确保最终值是正整数
*/
const handleBlur = () => {
  const val = modelValue.value;
  if (!val) {
    modelValue.value = '';
    return;
  }
  const num = Number(val);
  // 确保是正整数，若为0则置空
  modelValue.value = num > 0 ? num.toString() : '';
};
</script>
<style scoped>
  .form-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px
  }
</style>
