<script lang="ts" setup>
import SceneSelect from './scene-select.vue';
import ModelSelect from './model-select/index.vue';
import { IGalleryListItem, IModelInfo, ISceneInfo } from './type';
import { PropType } from 'vue';

const emit = defineEmits<{
  (event: 'model-change', model: IGalleryListItem): void;
}>();

defineProps({
  isShowScene: {
    type: Boolean,
    default: true,
  },
  isShowModel: {
    type: Boolean,
    default: true,
  },
  backendRandom: {
    type: Boolean,
    default: false,
  },
  isDefaultModel: {
    type: Boolean,
    default: true,
  },
});

const sceneInfo = defineModel('sceneInfo', {
  type: Object as PropType<ISceneInfo>,
  default: () => {},
});

const modelInfo = defineModel('modelInfo', {
  type: Object as PropType<IModelInfo>,
  default: () => {},
});

</script>

<template>
  <div class="tw-flex tw-flex-col tw-px-24px tw-py-16px tw-bg-white tw-gap-24px">
    <SceneSelect
      v-if="isShowScene"
      v-model="sceneInfo"
      :backendRandom="backendRandom"
    />
    <ModelSelect
      v-model="modelInfo"
      :is-show-race-model="isDefaultModel"
      page-source="ai-design"
    />
  </div>
</template>
