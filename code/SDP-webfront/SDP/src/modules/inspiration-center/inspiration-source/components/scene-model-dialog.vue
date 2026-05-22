<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Result } from '../../components/select-scene-and-model';
import { GENERATE_MODE } from '@/modules/inspiration-center/inspiration-source/constant';
import ResultIsBatch from '../../components/select-scene-and-model/resultIsBatch.vue';
import ModelSelect from '@/modules/inspiration-center/components/select-scene-and-model/model-select/index.vue';
import SceneSelect from '@/modules/inspiration-center/components/select-scene-and-model/scene-select.vue';
import MateriaSelect from '@/modules/inspiration-center/components/select-scene-and-model/materia-select.vue';
import {
  ISceneInfo,
  IModelInfo,
  ISceneAndModel,
} from '@/modules/inspiration-center/components/select-scene-and-model/type';

interface MateriaRefType {
  setMateriaInfo: () => void;
  // 可以添加其他可能存在的属性或方法
}
const emit = defineEmits<{
  (event: 'submit', item: ISceneAndModel): void;
}>();

const props = defineProps({
  identifiedCategoryCode: {
    type: String,
    default: '',
  },
  isDefaultModel: {
    type: Boolean,
    default: true,
  },
  isBatch: {
    type: Boolean,
    default: false,
  },
  styleGenCount: {
    type: Number,
    default: 0
  },
  formDataObj: {
    type: Object,
    default: () => {
      return {};
    }
  },
  taskData: {
    type: Object,
    default: () => {
      return {};
    }
  },
  hasAppoint: {
    type: Boolean,
    default: true,
  },
  appointModelInfos: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const materiaInfo = ref<any>({});
const premateriaInfo = ref<ISceneInfo>({
  sceneId: '',
  sceneName: '',
  pictureId: '',
  picturePath: ''
});

const sceneInfo = ref<ISceneInfo>({
  sceneId: '',
  sceneName: '',
  pictureId: '',
  picturePath: ''
});
const preSceneInfo = ref<ISceneInfo>({
  sceneId: '',
  sceneName: '',
  pictureId: '',
  picturePath: ''
});

const modelInfo = ref<IModelInfo>({
  url: '',
  aiModelCode: '',
  name: '',
  modelMaterialId: ''
});

const newModelInfo = ref({});

watch(() => props.appointModelInfos, (data: Object) => {
  modelInfo.value = JSON.parse(JSON.stringify(data));
});

const preModelInfo = ref<IModelInfo>({
  url: '',
  aiModelCode: '',
  name: '',
  modelMaterialId: ''
});

// 是否需要背面姿势
const isBackPosture = defineModel<any>('isBackPosture', {
  type: [String], // 根据GENERATE_MODE实际类型选择对应的构造函数
  default: () => GENERATE_MODE.MULTI_POSE,
});

const activeName = defineModel<String>('activeName', {
  type: String,
  default: () => ('first'),
});
const dialogActiveName = defineModel<String>('dialogActiveName', {
  type: String,
  default: () => ('first'),
});


const isShowDialog = ref(false);
const dialogType = ref<'scene' | 'model' | 'materia'>('scene');
const handleShowDialog = (type: 'scene' | 'model' | 'materia') => {
  dialogType.value = type;
  // sceneInfo.value = preSceneInfo.value;
  // modelInfo.value = preModelInfo.value;
  // materiaInfo.value = premateriaInfo.value;
  isShowDialog.value = true;
};

/**
 * 取消时还原
 */
const handleCancel = () => {
  sceneInfo.value = preSceneInfo.value;
  modelInfo.value = preModelInfo.value;
  isShowDialog.value = false;
};

const materiaRefName = ref<MateriaRefType | null>(null);

const handleSubmit = () => {
  preSceneInfo.value = sceneInfo.value;
  preModelInfo.value = modelInfo.value;
  emit('submit', {
    sceneInfo: sceneInfo.value,
    modelInfo: modelInfo.value,
  });
  isShowDialog.value = false;
  if (dialogType.value === 'model') {
    materiaInfo.value = {};
  }
  if (dialogType.value === 'materia' && materiaRefName.value) {
    materiaRefName.value.setMateriaInfo();
  }
};

/**
 * 删除时更新一下提交数据
 */
const handleDelete = () => {
  handleSubmit();
};

/** 设置初始值 */
const initData = (params: ISceneAndModel) => {
  sceneInfo.value = params.sceneInfo;
  preSceneInfo.value = params.sceneInfo;
  modelInfo.value = params.modelInfo;
  preModelInfo.value = params.modelInfo;
  // premateriaInfo.value = params.materiaInfo
};

const handleClearModel = () => {
  modelInfo.value = {
    url: '',
    aiModelCode: '',
    name: '',
    modelMaterialId: ''
  };
};

const handleClear = () => {
  sceneInfo.value = {
    sceneId: '',
    sceneName: '',
    pictureId: '',
    picturePath: ''
  };
  handleClearModel();
};
// 清空指定素材
const delSpecifyMaterials = () => {
  materiaInfo.value = {};
};
// 获取指定素材
const getSpecifyMaterials = () => {
  return materiaInfo.value;
};
// 获取模特info
const getModelInfoFun = () => {
  return modelInfo.value;
};
defineExpose({
  handleClear,
  handleClearModel,
  initData,
  delSpecifyMaterials,
  getSpecifyMaterials,
  getModelInfoFun
});

</script>

<template>
  <Result
    v-if="isBatch || formDataObj.supplyMethod === 'supplyMethodCode'"
    v-model:scene-info="sceneInfo"
    v-model:model-info="modelInfo"
    @delete="handleDelete"
    @select-scene="handleShowDialog('scene')"
    @select-model="handleShowDialog('model')"
  />

  <ResultIsBatch
    v-else
    v-model:scene-info="sceneInfo"
    v-model:model-info="modelInfo"
    v-model:material-info="materiaInfo"
    v-model:isBackPosture="isBackPosture"
    v-model:activeName="activeName"
    :hasAppoint="hasAppoint"
    :styleGenCount="styleGenCount"
    @delete="handleDelete"
    @select-scene="handleShowDialog('scene')"
    @select-model="handleShowDialog('model')"
    @select-materia="handleShowDialog('materia')"
  />
  <el-dialog
    class="clear-dialog-body-padding"
    :title="dialogType === 'scene' ? '选择背景' : (dialogType === 'materia' ? '选择素材' : '选择模特')"
    v-model="isShowDialog"
    width="80%"
    @close="handleCancel"
  >
    <el-scrollbar
      class="tw-p-6"
      max-height="500"
      always
    >
      <ModelSelect
        v-if="dialogType === 'model'"
        v-model="modelInfo"
        :is-show-race-model="isDefaultModel"
        page-source="ai-design"
      />
      <SceneSelect
        v-if="dialogType === 'scene'"
        v-model="sceneInfo"
        :showName="formDataObj.supplyMethod === 'supplyMethodCode'"
      />
      <MateriaSelect
        ref="materiaRefName"
        v-if="dialogType === 'materia' && isShowDialog"
        v-model="materiaInfo"
        v-model:activeName="dialogActiveName"
        :formDataObj="formDataObj"
        :modelInfo="modelInfo"
        :identifiedCategoryCode="identifiedCategoryCode"
        :taskData="taskData"
        :newModelInfo="newModelInfo"
      />
    </el-scrollbar>
    <span class="tw-flex tw-justify-end tw-p-24px">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>
