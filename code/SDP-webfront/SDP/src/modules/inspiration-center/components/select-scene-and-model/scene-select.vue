<script lang="ts" setup>
import { defineModel, PropType, ref } from 'vue';

import Item from './item.vue';

import SceneDetailDialog from './scene-detail-dialog.vue';
import CustomUpload from './upload.vue';
import { ISceneListRes, ISmartDesignListReq } from './api/type';
import { getDesignMaterialSceneList, getSmartDesignSceneList, getStyleGenList } from './api';
import { filterEmptyFields } from '@/core/utils/format';
import SceneSelectOption from './scene-select-option/index.vue';
import { ISceneListReq, IScenePageSource, ISceneInfo } from './type';
// import { useList } from '@toy/v-use';

const props = defineProps({
  backendRandom: {
    type: Boolean,
    default: false,
  },
  pageSource: {
    type: String as PropType<IScenePageSource>,
    default: 'ai-design',
  },
  showName: {
    type: Boolean,
    default: false,
  },
});

const sceneInfo = defineModel({
  type: Object as PropType<ISceneInfo>,
  default: () => {},
});

const uploadImg = ref('');
const handleUploadSuccess = (url: string) => {
  uploadImg.value = url;
  sceneInfo.value = {
    sceneId: '',
    pictureId: '',
    sceneName: '',
    picturePath: url,
  };
};

// const {
//   params,
//   tableTotal,
//   tableData,
//   handleSearch,
//   handleReset,
//   handleSizeChange,
//   handleCurrentChange,
// } = useList({
//   request: {
//     api: getSmartDesignSceneList,
//     params: {
//       pageNum: 1,
//       pageSize: 20,
//     },
//     handleParams(p) {
//       return filterEmptyFields(p);
//     },
//   },
// });

const sceneList = ref<ISceneListRes>([]);
const params = ref<ISceneListReq>({
  sceneLabelCodeList: [],
  styleLabelCodeList: [],
});
const handleGetSceneList = async () => {
  const fn = props.pageSource === 'ai-design' ? getSmartDesignSceneList : (props.pageSource === 'ai-design-stylish-derived' ? getStyleGenList : getDesignMaterialSceneList);
  const { data } = await fn(filterEmptyFields(params.value));
  sceneList.value = data;
};

const handleReset = () => {
  params.value = {
    sceneLabelCodeList: [],
    styleLabelCodeList: [],
  };
  handleGetSceneList();
};

handleGetSceneList();

const detailDialog = ref({
  visible: false,
  defaultSelectedPictureId: '',
  sceneId: '',
  sceneName: '',
});
const handleShowDetail = (item: ISceneListRes[0]) => {
  // sceneInfo.sceneId = item.sceneId;
  detailDialog.value = {
    visible: true,
    defaultSelectedPictureId: sceneInfo.value.sceneId === item.sceneId ? sceneInfo.value.pictureId : '',
    sceneId: item.sceneId,
    sceneName: item.sceneName,
  };
};

const handleChange = (item: { sceneId: string; pictureId: string; path: string; }) => {
  sceneInfo.value.sceneId = item.sceneId;
  sceneInfo.value.pictureId = item.pictureId;
  sceneInfo.value.sceneName = detailDialog.value.sceneName;
  sceneInfo.value.picturePath = item.path;
};

</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <div class="tw-flex tw-justify-between">
      <span class="tw-text-#3F414D tw-text-16px tw-font-bold">背景</span>
    </div>
    <SceneSelectOption
      v-model="params"
      @search="handleGetSceneList"
      @reset="handleReset"
    />
    <div class="tw-flex tw-flex-wrap tw-gap-24px">
      <CustomUpload
        v-model="uploadImg"
        :is-selected="!!(sceneInfo.picturePath && sceneInfo.picturePath === uploadImg)"
        @upload-success="handleUploadSuccess"
        @click="uploadImg && handleUploadSuccess(uploadImg)"
      />
      <Item
        v-for="item in sceneList"
        :key="item.sceneId"
        :img="item.primaryPicture"
        :label="item.sceneName"
        :isSelected="sceneInfo.sceneId === item.sceneId"
        @click="handleShowDetail(item)"
      />
    </div>
    <SceneDetailDialog
      v-model:visible="detailDialog.visible"
      :title="`场景：${detailDialog.sceneName}`"
      :default-selected-picture-id="detailDialog.defaultSelectedPictureId"
      :sceneId="detailDialog.sceneId"
      :backend-random="props.backendRandom"
      :showName="showName"
      @submit="handleChange"
    />
  </div>
</template>
