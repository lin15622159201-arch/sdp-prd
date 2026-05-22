<!-- eslint-disable no-undef -->
<script lang="tsx" setup>
import { defineProps, PropType, ref } from 'vue';
import SceneSvg from '@/assets/inspiration-center/changjing.svg';

import { Delete } from '@element-plus/icons-vue';
import SceneAddDialog from './scene-add-dialog.vue';
import { AddSceneSource, ISceneInfo } from './type';

const emit = defineEmits<{
  (event: 'add-success'): void;
}>();

defineProps({
  isBatch: {
    type: Boolean,
    default: true,
  },
  isCanDelete: {
    type: Boolean,
    default: true,
  },
  isCanAdd: {
    type: Boolean,
    default: false,
  },
  taskId: {
    type: String,
    default: '',
  },
  imgPath: {
    type: String,
    default: '',
  },
  addSceneSource: {
    type: String as PropType<AddSceneSource>,
    default: 'ai-design',
  },
});

const sceneInfo = defineModel({
  type: Object as PropType<ISceneInfo>,
  default: () => {},
});

const showSceneDialog = ref(false);
const handleShowAddSceneDialog = () => {
  showSceneDialog.value = true;
};

const handleDelete = () => {
  sceneInfo.value = {
    sceneId: '',
    pictureId: '',
    sceneName: '',
    picturePath: '',
  };
};

</script>

<template>
  <div>
    <SceneAddDialog
      v-model:visible="showSceneDialog"
      :task-id="taskId"
      :img-path="imgPath"
      :add-scene-source="addSceneSource"
      @success="() => emit('add-success')"
    />
    <div
      :class="{
        'item-wrapper': true,
      }"
    >
      <div class="image">
        <img
          v-if="sceneInfo.picturePath"
          class="tw-h-full tw-w-full tw-object-cover"
          :src="sceneInfo.picturePath"
        />
        <el-icon v-else class='tw-absolute tw-left-50% tw-top-50% -tw-translate-50% tw-text-32px'>
          <SceneSvg />
        </el-icon>
        <div
          v-if="sceneInfo.picturePath && isCanDelete"
          class="tw-w-24px tw-h-24px tw-absolute
      tw-right-0 tw-top-0 tw-bg-[rgba(63,65,77,0.7)] tw-text-white
      tw-cursor-pointer tw-flex tw-justify-center tw-items-center"
          @click.stop="handleDelete()"
        >
          <el-icon><Delete /></el-icon>
        </div>
      </div>
      <el-button
        v-if="!sceneInfo.sceneId && isCanAdd"
        type='primary'
        link
        @click.stop="handleShowAddSceneDialog"
      >
        添加场景
      </el-button>
      <span v-else class="label">
        <span v-if="!isBatch">
          {{ sceneInfo.picturePath ? (sceneInfo.sceneName || '') : '背景未选择' }}
        </span>
        <span v-else>
          {{ sceneInfo.picturePath ? '已选择' : '未选择' }}
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
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
    position: relative;
    border-radius: 4px 4px 0 0;
    width: 108px;
    height: 108px;
    background: linear-gradient( 180deg, #D8F1FF 0%, #DDDCFF 100%);
  }
  .label {
    padding: 4px 0;
    margin-left: 10px;
  }
}
</style>
