<script lang="ts" setup>
import { PropType } from 'vue';
import { IModelInfo, IModelPageSource } from '../type';
import { useDict } from '../use-dict';
import ModelRaceSelect from './model-race-select.vue';
import ModelMaterialSelect from './model-material-select.vue';

const modelInfo = defineModel({
  type: Object as PropType<IModelInfo>,
  default: () => {},
});

defineProps({
  isShowRaceModel: {
    type: Boolean,
    default: true,
  },

  isShowMaterialSelect: {
    type: Boolean,
    default: true,
  },

  pageSource: {
    type: String as PropType<IModelPageSource>,
    default: 'ai-design',
  },
});

const { modelGallery } = useDict();

</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <ModelRaceSelect
      v-if="isShowRaceModel"
      v-model="modelInfo"
      :list="modelGallery"
    />
    <ModelMaterialSelect
      v-if="isShowMaterialSelect"
      v-model="modelInfo"
      :page-source="pageSource"
    />
  </div>
</template>
