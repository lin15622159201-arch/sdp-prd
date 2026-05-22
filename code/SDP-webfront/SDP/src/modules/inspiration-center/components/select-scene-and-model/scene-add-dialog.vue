<script lang="ts" setup>
import { PropType, ref, watch } from 'vue';
import { getSceneList, fmSceneSave, aiSceneSave } from './api';
import { ISceneListRes } from './api/type';
import { ElMessage } from 'element-plus';
import { AddSceneSource } from './type';

const emit = defineEmits({
  success: () => true,
});

enum SCENE_TYPE {
  UPDATE = 'update',
  ADD = 'add',
}
const SCENE_TYPE_LIST = [
  {
    value: SCENE_TYPE.UPDATE,
    label: '已有场景库',
  },
  {
    value: SCENE_TYPE.ADD,
    label: '新增场景库',
  },
];

const props = defineProps({
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

const visible = defineModel('visible', {
  type: Boolean,
  default: false,
});

const sceneType = ref<SCENE_TYPE>(SCENE_TYPE.UPDATE);
const formData = ref({
  sceneId: '',
  sceneName: '',
});

const handleSceneTypeChange = () => {
  formData.value.sceneId = '';
  formData.value.sceneName = '';
};

const handleClose = () => {
  visible.value = false;
  sceneType.value = SCENE_TYPE.UPDATE;
  formData.value = {
    sceneId: '',
    sceneName: '',
  };
};

const sceneList = ref<ISceneListRes>([]);
const handleGetSceneList = async () => {
  const { data } = await getSceneList();
  sceneList.value = data;
};

watch(() => visible.value, (val) => {
  if (val) {
    handleGetSceneList();
  }
});

const handleSubmit = async () => {
  const { sceneId } = formData.value;
  const { taskId } = props;
  let { sceneName } = formData.value;

  if (sceneId) {
    sceneName = sceneList.value.find(item => item.sceneId === sceneId)?.sceneName || '';
  }

  const fn = props.addSceneSource === 'ai-material' ? aiSceneSave : fmSceneSave;

  await fn({
    taskId,
    sceneId,
    sceneName,
  });

  ElMessage.success('添加成功');
  handleClose();
  emit('success');
};
</script>

<template>
  <el-dialog
    title="添加场景"
    v-model="visible"
    width="60%"
  >
    <el-form
      :model="formData"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="场景图片">
        <div
          class="tw-h-180px tw-w-180px tw-overflow-hidden
        tw-rounded-sm tw-border-1px tw-border-#ecedf1 tw-border-solid"
        >
          <el-image
            class="tw-h-full tw-w-full"
            :src="imgPath"
            fit="scale-down"
            :lazy="true"
          />
        </div>

      </el-form-item>
      <el-form-item label="所属场景库">
        <div class="tw-flex tw-flex-col tw-gap-10px">
          <el-radio-group v-model="sceneType" @change="handleSceneTypeChange">
            <el-radio
              v-for="item in SCENE_TYPE_LIST"
              :key="item.value"
              :label="item.value"
            >
              {{item.label}}
            </el-radio>
          </el-radio-group>
          <el-select
            v-model="formData.sceneId"
            placeholder="请选择场景库"
            v-if="sceneType === SCENE_TYPE.UPDATE"
          >
            <el-option
              v-for="item in sceneList"
              :key="item.sceneId"
              :label="item.sceneName"
              :value="item.sceneId"
            />
          </el-select>
          <el-input
            v-else-if="sceneType === SCENE_TYPE.ADD"
            v-model="formData.sceneName"
            placeholder="请输出场景库名称"
            maxlength="10"
          />
        </div>

      </el-form-item>
    </el-form>

    <template #footer>
      <span class="tw-flex tw-justify-end">
        <el-button @click="handleClose">取消</el-button>
        <el-button
          type="primary"
          :disabled="!(formData.sceneId || formData.sceneName)"
          @click="handleSubmit"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>
