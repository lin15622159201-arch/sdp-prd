<script lang="ts" setup>
import { ref, shallowRef, watch } from 'vue';
import { getScenePicList } from './api';
import { IPicListRes } from './api/type';
import { ElMessage } from 'element-plus';

import Item from './item.vue';

const emit = defineEmits({
  submit: (item: { sceneId: string; pictureId: string; path: string; }) => true,
});

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  defaultSelectedPictureId: {
    type: String,
    default: '',
  },
  sceneId: {
    type: String,
    default: '',
  },
  backendRandom: {
    type: Boolean,
    default: false,
  },
  showName: {
    type: Boolean,
    default: false,
  },
});

const selectedPictureId = ref('');

watch(() => props.defaultSelectedPictureId, (val) => {
  selectedPictureId.value = val;
});

const visible = defineModel('visible', {
  type: Boolean,
  default: false,
});

const picList = shallowRef<IPicListRes>([]);

const handleGetPicList = async () => {
  const { data } = await getScenePicList(props.sceneId);
  picList.value = data;
};

watch(() => props.sceneId, (val) => {
  if (val) {
    handleGetPicList();
  }
});

const handleSelect = (pictureId: string) => {
  if (selectedPictureId.value === pictureId) {
    selectedPictureId.value = '';
    return;
  }
  selectedPictureId.value = pictureId;
};

const handleClose = () => {
  selectedPictureId.value = '';
  visible.value = false;
};

const handleSubmit = () => {
  if (!selectedPictureId.value) {
    ElMessage.error('请选择图片');
    return;
  }

  if (selectedPictureId.value === 'RANDOM' && props.backendRandom) {
    emit('submit', {
      sceneId: props.sceneId,
      pictureId: '',
      path: '',
    });
    handleClose();
    return;
  }

  if (selectedPictureId.value === 'RANDOM') {
    const randomIndex = Math.floor(Math.random() * picList.value.length);
    const picItem = picList.value[randomIndex];
    emit('submit', {
      sceneId: props.sceneId,
      pictureId: picItem.pictureId,
      path: picItem.path,
    });
    handleClose();
    return;
  }

  const picItem = picList.value.find(item => item.pictureId === selectedPictureId.value);
  emit('submit', {
    sceneId: props.sceneId,
    pictureId: picItem?.pictureId || '',
    path: picItem?.path || '',
  });
  handleClose();
};

</script>

<template>
  <el-dialog
    :title="title"
    v-model="visible"
    width="60%"
  >
    <div class="tw-flex tw-flex-wrap tw-gap-24px tw-p-6">
      <Item
        :isSelected="selectedPictureId === 'RANDOM'"
        @click="handleSelect('RANDOM')"
        class=" tw-h-108px"
      >
        <template #default>
          <span class="tw-absolute tw-left-50% tw-top-50% -tw-translate-50%">随机</span>
        </template>
      </Item>
      <Item
        v-for="item in picList"
        :key="item.pictureId"
        :img="item.path"
        :name="item.pictureName"
        :showName="showName"
        :isSelected="selectedPictureId === item.pictureId"
        @click="handleSelect(item.pictureId)"
      />
    </div>
    <template #footer>
      <span class="tw-flex tw-justify-end">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>
