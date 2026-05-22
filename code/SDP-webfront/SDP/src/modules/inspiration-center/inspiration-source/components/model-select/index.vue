<script setup lang="ts">
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { useGetOptions } from './use-get-options';
import { REF_WEIGHT_READABLE } from './constant';
import { watch, ref } from 'vue';
import { dictValues } from '../../api/index';
import { IDictResItem, IValuesResItemValuesItem } from '../../api/type';

const emit = defineEmits<{
  (e: 'weight-permission-change', permission: REF_WEIGHT_READABLE): void;
  (event: 'setModelInfo', modelData: any): void;
}>();

const modelCode = defineModel<string>('modelCode', {
  default: '',
});
const modelName = defineModel<string>('modelName', {
  default: '',
});
const modelsList = ref<IValuesResItemValuesItem[]>([]);
const { fgModelVersion } = useGetOptions();

const handleWeightPermissionChange = (model: IDictionaryItem) => {
  const { attributes = [] } = model;

  const permission = attributes.find(item => item.code === 'refWeight_readable')?.name;
  

  if (permission) {
    emit(
      'weight-permission-change',
      permission as REF_WEIGHT_READABLE,
    );
  }
};
const init = async () => {
  const res = await dictValues({
    dictCodes: ['fm_models'],
    enable: '1',
    ascending: true,
    dictType: '1000',
  });
  modelsList.value = res?.data?.[0]?.values;
};

watch(fgModelVersion, () => {
  const model = fgModelVersion.value.find((item: IValuesResItemValuesItem) => item.value === modelCode.value);
  if (model) {
    handleWeightPermissionChange(model);
  }
}, {
  immediate: true,
});

const handleChange = (value: string) => {
  const model = fgModelVersion.value.find((item: IValuesResItemValuesItem) => item.value === value);
  if (model) {
    modelName.value = model.label!;
    handleWeightPermissionChange(model);
  }

  // const { attributes = [] } = model;
  const attributes = model?.attributes ?? [];
  const selectModels = attributes.find((item: any) => item.code === 'default_race')?.name;
  if (selectModels) {
    emit(
      'setModelInfo',
      modelsList.value.filter((v: IValuesResItemValuesItem) => v.dictValue === selectModels)
    );
  }
};

watch(() => modelCode.value, async () => {
  if (!modelsList.value.length) {
    await init();
  }
  handleChange(modelCode.value);
}, {
  immediate: true,
});

</script>

<template>
  <el-form-item label="模型">
    <el-select
      v-model="modelCode"
      placeholder="请选择模型"
      @change="handleChange"
    >
      <el-option
        v-for="item in fgModelVersion"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

  </el-form-item>
</template>
