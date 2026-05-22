<!-- eslint-disable no-undef -->
<script lang="tsx" setup>
import { defineProps, PropType, ref } from 'vue';
import ModelSvg from '@/assets/inspiration-center/mot.svg';

import { Delete } from '@element-plus/icons-vue';
import { IModelInfo } from './type';

const emit = defineEmits(['add-success']);

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
  }
});

const modelInfo = defineModel({
  type: Object as PropType<IModelInfo>,
  default: () => {},
});

const handleDelete = () => {
  modelInfo.value = {
    url: '',
    aiModelCode: '',
    name: '',
    modelMaterialId: '',
  };
};

const showAddModelDialog = ref(false);

const handleShowAddModelDialog = () => {
  showAddModelDialog.value = true;
};

</script>

<template>
  <div>
    <div
      :class="{
        'item-wrapper': true,
      }"
    >
      <div class="image">
        <img
          v-if="modelInfo.url"
          class="tw-h-full tw-w-full tw-object-cover"
          :src="modelInfo.url"
        />
        <el-icon v-else class='tw-absolute tw-left-50% tw-top-50% -tw-translate-50% tw-text-34px'>
          <ModelSvg />
        </el-icon>
        <div
          v-if="modelInfo.url && isCanDelete"
          class="tw-w-24px tw-h-24px tw-absolute
        tw-right-0 tw-top-0 tw-bg-[rgba(63,65,77,0.7)] tw-text-white
        tw-cursor-pointer tw-flex tw-justify-center tw-items-center"
          @click.stop="handleDelete()"
        >
          <el-icon><Delete /></el-icon>
        </div>
      </div>
      <el-button
        v-if="!modelInfo.modelMaterialId && !modelInfo.aiModelCode && isCanAdd"
        type='primary'
        link
        @click.stop="handleShowAddModelDialog"
      >
        添加模特
      </el-button>
      <span v-else class="label">
        <span v-if="!isBatch">
          {{ modelInfo.url ? (modelInfo.name || '') : '模特未选择' }}
        </span>
        <span v-else>
          {{ modelInfo.url ? '已选择' : '未选择' }}
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
