<script setup lang="ts">
import { PropType, watch } from 'vue';
import { AddSceneSource, IModelInfo, ISceneInfo } from './type';
import ModelResult from './model-result.vue';
import SceneResult from './scene-result.vue';

const emit = defineEmits([
  'add-scene-success',
  'add-model-success',
  'select-scene',
  'select-model',
  'delete',
]);

const modelInfo = defineModel<IModelInfo>('modelInfo', {
  type: Object as PropType<IModelInfo>,
  default: () => ({}),
});

const sceneInfo = defineModel<ISceneInfo>('sceneInfo', {
  type: Object as PropType<ISceneInfo>,
  default: () => ({}),
});

watch(() => modelInfo.value, () => {
  if (!modelInfo.value.url) {
    emit('delete');
  }
});

defineProps({
  isShowScene: {
    type: Boolean,
    default: true,
  },
  isCanAddScene: {
    type: Boolean,
    default: false,
  },

  isCanDelete: {
    type: Boolean,
    default: true,
  },
  isShowModel: {
    type: Boolean,
    default: true,
  },
  isCanAddModel: {
    type: Boolean,
    default: false,
  },
  taskId: {
    type: String,
    default: '',
  },
  sceneImgPath: {
    type: String,
    default: '',
  },
  modelImgPath: {
    type: String,
    default: '',
  },
  isSceneSelected: {
    type: Boolean,
    default: false,
  },
  isModelSelected: {
    type: Boolean,
    default: false,
  },
  addSceneSource: {
    type: String as PropType<AddSceneSource>,
    default: 'ai-design',
  },
});

const handleSelect = (type: 'scene' | 'model') => {
  if (type === 'scene') {
    emit('select-scene');
  } else {
    emit('select-model');
  }
};

</script>

<template>
  <div class="tw-flex tw-gap-8px tw-justify-around">
    <SceneResult
      v-if="isShowScene"
      :class="`item-wrapper ${isSceneSelected ? 'selected' : ''}`"
      v-model="sceneInfo"
      :is-can-add="isCanAddScene"
      :is-can-delete="isCanDelete"
      :task-id="taskId"
      :img-path="sceneImgPath"
      :add-scene-source="addSceneSource"
      @add-success="() => emit('add-scene-success')"
      @click="handleSelect('scene')"
    />
    <ModelResult
      v-if="isShowModel"
      :class="`item-wrapper ${isModelSelected ? 'selected' : ''}`"
      v-model="modelInfo"
      :is-can-add="isCanAddModel"
      :is-can-delete="isCanDelete"
      :task-id="taskId"
      :img-path="modelImgPath"
      @add-success="() => emit('add-model-success')"
      @click="handleSelect('model')"
    />
  </div>
</template>

<style scoped lang="scss">
.item-wrapper {
  border: 2px solid transparent;
  cursor: pointer;
  &.selected {
    border-color: #605CE5;
  }
}
</style>
