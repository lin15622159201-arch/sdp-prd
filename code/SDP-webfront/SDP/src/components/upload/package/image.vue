<template>
  <div
    :class="[
      'group',
      'tw-relative',
      'tw-w-100px',
      'tw-h-100px',
      'tw-rounded-4px',
      'tw-overflow-hidden',
      'tw-mr-5px',
      'tw-mb-5px'
    ]"
  >
    <el-image
      class="tw-w-100% tw-h-100%"
      fit="cover"
      :ref="handleSetImageRef"
      :src="src"
      :initial-index="initialIndex"
      :preview-src-list="previewSrcList"
      preview-teleported
    />
    <div
      :class="[
        'mask',
        'tw-flex',
        'tw-justify-center',
        'tw-items-center',
        'tw-absolute',
        'tw-left-0',
        'tw-top-0',
        'tw-w-100%',
        'tw-h-100%',
        'tw-bg-[rgba(0,0,0,0.6)]',
        'tw-text-white',
        'tw-text-16px',
        'tw-transition-all',
        'tw-duration-300',
        'tw-opacity-0',
        'group-hover:tw-opacity-100'
      ]"
    >
      <el-icon
        class="tw-cursor-pointer tw-mr-10px"
        @click.stop="handlePreview"
      >
        <zoom-in />
      </el-icon>
      <el-icon
        class="tw-cursor-pointer"
        v-if="!disabled"
        @click.stop="handleDelete"
      >
        <delete />
      </el-icon>
    </div>
    <div
      :class="[
        'progress',
        'tw-flex',
        'tw-justify-center',
        'tw-items-center',
        'tw-position-absolute',
        'tw-left-0',
        'tw-top-0',
        'tw-w-100%',
        'tw-h-100%',
        'tw-bg-[rgba(255,255,255,0.6)]',
        'tw-text-white',
      ]"
      v-if="!isEmpty(progress)"
    >
      <el-progress
        type="circle"
        :percentage="progress"
        :width="70"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { imageProps } from 'element-plus';

import { isEmpty } from '@toy/utils';
import { Delete, ZoomIn } from '@element-plus/icons-vue';

export default defineComponent({
  components: {
    Delete,
    ZoomIn,
  },

  props: {
    ...imageProps,
    progress: {
      type: Number,
    },

    disabled: {
      type: Boolean,
    },
  },

  emits: ['setImageRef', 'preview', 'delete'],

  setup(props, { emit }) {
    const handleSetImageRef = (el: unknown) => {
      emit('setImageRef', el);
    };
    const handlePreview = () => {
      emit('preview');
    };
    const handleDelete = () => {
      emit('delete');
    };
    return {
      handlePreview,
      isEmpty,
      handleSetImageRef,
      handleDelete,
    };
  },
});
</script>
