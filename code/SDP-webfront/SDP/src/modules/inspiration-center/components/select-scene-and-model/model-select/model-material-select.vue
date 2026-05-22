<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { IModelInfo, IModelPageSource } from '../type';
import CustomUpload from '../upload.vue';
import Item from '../item.vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { useList } from '@toy/v-use';
import { designMaterialPage, modelMaterialPage, modelstyleGenPage } from '../api';
import { IModelMaterialPageResListItem } from '../api/type';
import { useDict } from './use-dict';
import ModelLabelSelect from './model-label-select/index.vue';

const modelInfo = defineModel({
  type: Object as PropType<IModelInfo>,
  default: () => {},
});

const props = defineProps({
  pageSource: {
    type: String as PropType<IModelPageSource>,
    default: 'ai-design',
  },
});

const uploadImg = ref('');
const handleUploadSuccess = (url: string) => {
  uploadImg.value = url;
  modelInfo.value = {
    modelMaterialId: '',
    url,
    aiModelCode: '',
    name: '',
  };
};

const { fmModelLabel } = useDict();
const selectedLabels = ref<string[][]>([]);

// 过滤掉空字符串字段的函数
function filterEmptyFields(obj: any) {
  const isHasEmptyArray = (value: any) => Array.isArray(value) && value.length === 0;

  const isEmptyString = (value: any) => typeof value === 'string' && value === '';

  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => !(isEmptyString(value) || isHasEmptyArray(value)))
  );
}

const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList({
  request: {
    api: props.pageSource === 'ai-design' ? modelMaterialPage : (props.pageSource === 'ai-design-stylish-derived' ? modelstyleGenPage : designMaterialPage),
    params: {
      pageNum: 1,
      pageSize: 20,
    },
    handleParams(p) {
      p.labelValueCodeList = selectedLabels.value.map(item => item[item.length - 1]);
      return filterEmptyFields(p) as any;
    },
    handleCustomReset(_, defaultParams) {
      selectedLabels.value = [];
      return defaultParams;
    },
  },
});

const handleSelectModel = (item: IModelMaterialPageResListItem) => {
  modelInfo.value = {
    ...item,
    modelMaterialId: item.modelId,
    url: item.modelUrl,
    aiModelCode: '',
    name: item.modelName,
  };
};

const init = () => {
  handleSearch();
};

init();
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-flex tw-items-center">
        <span class="tw-text-#3F414D tw-text-16px tw-font-bold">指定模特</span>
        <el-tooltip
          content="指定生成所选模特脸部"
          placement="right"
          effect="dark"
        >
          <el-icon class="tw-text-primary tw-ml-4px"><InfoFilled /></el-icon>
        </el-tooltip>
      </div>
      <pagination
        :total="tableTotal"
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        :page-sizes="[20, 50, 100]"
        :layout="'prev, next'"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-flex tw-items-center">
        <span class="tw-text-nowrap">标签：</span>
        <ModelLabelSelect
          ref="ModelLabelSelectRef"
          v-model="selectedLabels"
          :fm-model-label="fmModelLabel"
        />
      </div>
      <div class="tw-flex tw-items-center">
        <el-button type="primary" @click="handleSearch(1)">搜索</el-button>
        <el-button @click="handleReset()">重置</el-button>
      </div>
    </div>
    <div class="tw-flex tw-flex-wrap tw-gap-24px">
      <CustomUpload
        v-model="uploadImg"
        :is-selected="!!(modelInfo.url && modelInfo.url === uploadImg)"
        @upload-success="handleUploadSuccess"
        @click="uploadImg && handleUploadSuccess(uploadImg)"
      />
      <Item
        v-for="item in tableData"
        :key="item.modelId"
        :img="item.modelUrl"
        :label="item.modelName"
        :isSelected="modelInfo.modelMaterialId === item.modelId"
        @click="handleSelectModel(item)"
      />
    </div>
  </div>
</template>
