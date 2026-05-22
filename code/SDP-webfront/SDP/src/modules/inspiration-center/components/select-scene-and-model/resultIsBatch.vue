<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { EditPen, SuccessFilled } from '@element-plus/icons-vue';
import { AddSceneSource, IModelInfo, ISceneInfo, MaterialInfo, MaterialFile } from './type';
import ModelResult from './model-result.vue';
import SceneResult from './scene-result.vue';
import SourceMaterial from './source-material.vue';


const emit = defineEmits([
  'add-scene-success',
  'add-model-success',
  'select-scene',
  'select-model',
  'select-materia',
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

const materialInfo = defineModel<MaterialInfo>('materialInfo', {
  type: Object,
  default: () => ({}),
});

const isBackPosture = defineModel<any>('isBackPosture', {
  type: [Boolean, Number],
  default: () => 0,
});

const activeName = defineModel<any>('activeName', {
  type: String,
  default: () => ('first'),
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
  styleGenCount: {
    type: Number,
    default: 0
  },
  hasAppoint: {
    type: Boolean,
    default: true,
  },
});

const handleSelect = (type: 'scene' | 'model' | 'materia') => {
  if (type === 'scene') {
    emit('select-scene');
  } else if (type === 'model') {
    emit('select-model');
  } else {
    emit('select-materia');
  }
};

// 编辑指定素材
const editSourceMaterial = () => {
  dialogTableVisible.value = true;
};

const dialogTableVisible = ref<boolean>(false);

const comMateFun = () => {
  dialogTableVisible.value = false;
  materialInfo.value.modelMaterialLibraryFileList = materialInfo.value?.modelMaterialLibraryFileList?.filter((v: MaterialFile) => !v.selected);
};
</script>

<template>
  <div style="width: 100%">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="场景设置" name="first">
        <el-card class='tab-item-box' shadow="never">
          <SceneResult
            :isBatch="true"
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
        </el-card>
        <el-card class='tab-item-box' shadow="never">
          <ModelResult
            :isBatch="true"
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
        </el-card>
      </el-tab-pane>
      <el-tab-pane
        v-if="hasAppoint"
        label="指定素材"
        name="second"
      >
        <p>根据参考图和所选模特推荐素材</p>
        <el-card class='tab-item-box' shadow="never">
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
        </el-card>
        <el-card
          v-if="modelInfo.url"
          class='tab-item-box'
          shadow="never"
        >
          <div class="card-box">
            <SourceMaterial
              v-if="isShowScene"
              :class="`item-wrapper ${isSceneSelected ? 'selected' : ''}`"
              v-model="materialInfo"
              :styleGenCount="styleGenCount"
              :task-id="taskId"
              :add-scene-source="addSceneSource"
              @add-success="() => emit('add-scene-success')"
              @click="handleSelect('materia')"
            />
            <div class="edit-m-c" @click="editSourceMaterial">
              <el-icon><EditPen /></el-icon>
            </div>
          </div>
        </el-card>
        <el-checkbox
          v-model="isBackPosture"
          :true-label="1"
          :false-label="0"
        >需要背面姿势</el-checkbox>
      </el-tab-pane>
    </el-tabs>
  </div>
  <el-dialog
    v-model="dialogTableVisible"
    :title="`已选素材(${materialInfo?.modelMaterialLibraryFileList?.filter(v => !v.selected)?.length ?? 0}/${styleGenCount})`"
    width="800"
  >
    <div class="img-item-top">
      <div
        class="img-p-a"
        v-for="(item, index) in materialInfo.modelMaterialLibraryFileList"
        :key="index"
        @click="item.selected = !item.selected"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="item.pictureUrl"
          fit="cover"
        />
        <div class="selectIco" v-if="!item.selected">
          <el-icon color="#605CE5" size="18"><SuccessFilled /></el-icon>
        </div>
      </div>
    </div>
    <div class="footer-bth">
      <el-button @click="dialogTableVisible = false">取消</el-button>
      <el-button type="primary" @click="comMateFun">确定</el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.item-wrapper {
  border: 2px solid transparent;
  cursor: pointer;
  &.selected {
    border-color: #605CE5;
  }
}
.tab-item-box {
  display: flex;
  width: 100%;
  margin: 5px 0;
  :deep(.item-wrapper) {
    display: flex;
    flex-direction: row;
    align-items: self-start;
  }
}
.card-box {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.tab-item-box :deep(.el-card__body) {
  width: 100%;
}
.edit-m-c {
  margin: 5px;
  cursor: pointer;
}
.footer-bth {
  display: flex;
  justify-content: right;
  gap: 10px;
}
.img-item-top {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.img-p-a {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.selectIco {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  cursor: pointer;
}
</style>
