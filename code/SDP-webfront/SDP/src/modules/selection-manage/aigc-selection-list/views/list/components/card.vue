<template>
  <div
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @click="(e) => e.stopPropagation()"
    class="tw-w-200px tw-h-200px tw-mr-10px tw-mb-10px tw-position-relative tw-flex-shrink-0"
    :class="{
      'tw-cursor-move': isSign,
    }"
  >
    <el-image
      ref="ElImageRef"
      :src="$filters.ossUrl(pictureUrl, 300)"
      fit='contain'
      class="tw-w-100% tw-h-100% tw-rd-6px"
      :preview-src-list='previewSrcs'
      :initial-index="imageIndex"
      preview-teleported
      lazy
      :scroll-container="scrollEl"
    />
    <div class="tw-position-absolute tw-right-0 tw-top-0">
      <el-tag
        v-if="isEliminate"
        type="danger"
        class="tw-mr-6px"
        effect="dark"
        round
        size="small"
      >
        淘汰
      </el-tag>

      <el-tag
        v-if="isMain"
        type="primary"
        effect="dark"
        round
        size="small"
      >
        主图
      </el-tag>
    </div>
    <div class="tw-position-absolute tw-left-8px tw-top-0 tw-z-10">
      <el-checkbox
        v-if="isSign"
        class="tw-w-32px"
        @change="handleSelectChange"
      />
    </div>
    <div
      v-show="isShow"
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3
        tw-bg-[rgba(0,0,0,0.1)] tw-position-absolute tw-left-0 tw-top-0 tw-w-100% tw-h-100%"
    >
      <el-button
        type="danger"
        size="small"
        @click="eliminate"
      >
        淘汰
      </el-button>
      <el-button
        size="small"
        @click="handlePreview"
      >
        查看大图
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="setMain"
      >
        设为主图
      </el-button>
    </div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { CheckboxValueType, ElImage } from 'element-plus';

const props = defineProps<{
  isSign: boolean;
  pictureUrl: string;
  previewSrcs: string[];
  imageIndex: number;
  isMain: boolean;
  isEliminate: boolean;
  scrollEl?: HTMLElement;
}>();

const emits = defineEmits(['eliminate', 'setMain', 'select', 'preview']);

const isFocus = ref(false);
const isShow = computed(() => props.isSign && isFocus.value);

const handlePreview = () => {
  emits('preview');
};

const eliminate = () => {
  emits('eliminate');
};

const setMain = () => {
  emits('setMain');
};

const handleSelectChange = (val: CheckboxValueType) => {
  emits('select', val as boolean);
};

const onMouseenter = () => {
  console.log('scrollEl', props.scrollEl);

  isFocus.value = true;
};
const onMouseleave = () => {
  isFocus.value = false;
};

</script>
