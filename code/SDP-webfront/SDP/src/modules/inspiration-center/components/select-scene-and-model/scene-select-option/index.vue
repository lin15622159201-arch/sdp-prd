<script lang="ts" setup>
import { ISceneListReq } from '../type';

import { useDict } from './hooks/use-dict';

const emit = defineEmits<{
  (event: 'search', value: ISceneListReq): void;
  (event: 'reset'): void;
}>();

const params = defineModel<ISceneListReq>({
  required: true,
});

const {
  JV_SCENE,
  JV_STYLE,
} = useDict();

const handleSearch = () => {
  emit('search', params.value);
};

const handleReset = () => {
  emit('reset');
};

</script>

<template>
  <div class="tw-flex tw-items-center tw-justify-between">
    <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-8px tw-flex-1">
      <div class="tw-flex tw-items-center">
        <span class="tw-text-nowrap">场景：</span>
        <el-select
          class="tw-w-200px"
          v-model="params.sceneLabelCodeList"
          placeholder="请选择场景"
          multiple
          clearable
        >
          <el-option
            v-for="item in JV_SCENE"
            :key="item.value"
            :label="item.label"
            :value="item.value!"
          />
        </el-select>
      </div>
      <div class="tw-flex tw-items-center">
        <span class="tw-text-nowrap">风格：</span>
        <el-cascader
          class="tw-w-200px"
          v-model="params.styleLabelCodeList"
          placeholder="请选择风格"
          clearable
          collapse-tags
          collapse-tags-tooltip
          :options="JV_STYLE"
          :props="{
            multiple: true,
            checkStrictly: true,
            emitPath: false
          }"
        />
      </div>
    </div>
    <div class="tw-flex tw-items-center tw-flex-nowrap">
      <el-button type="primary" @click="handleSearch">
        搜索
      </el-button>
      <el-button @click="handleReset">
        重置
      </el-button>
    </div>
  </div>
</template>
