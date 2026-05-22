<template>
  <div
    :class="[
      'tw-flex',
      'tw-items-center',
      'tw-relative',
      'tw-h-28px',
      'tw-pr-50px',
      'tw-pl-5px',
      'tw-rounded-4px',
      'tw-color-[#666]',
      'tw-transition-all',
      'tw-duration-300',
      'hover:tw-bg-[#f6f6f6]'
    ]"
  >
    <el-icon class="tw-text-12px tw-cursor-pointer">
      <document />
    </el-icon>
    <div
      :class="[
        'tw-truncate',
        'tw-color-primary',
        'tw-pl-8px',
        'tw-leading-18px',
        'tw-cursor-pointer',
        'tw-text-14px'
      ]"
    >{{ name || url }}</div>
    <div
      :class="[
        'tw-flex',
        'tw-absolute',
        'tw-top-50%',
        'tw-right-5px',
        'tw-items-center',
        'tw-translate-y-[-50%]',
        'tw-cursor-pointer'
      ]"
    >
      <el-icon
        class="tw-text-16px tw-ml-4px hover:tw-color-primary"
        v-if="canDownload"
        @click.stop="handleDownload"
      >
        <download />
      </el-icon>
      <el-icon
        v-if="!disabled"
        class="tw-text-16px tw-ml-4px hover:tw-color-primary"
        @click.stop="handleDelete"
      >
        <close />
      </el-icon>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Document, Close, Download } from '@element-plus/icons-vue';

export default defineComponent({
  components: {
    Document,
    Close,
    Download,
  },

  props: {
    name: {
      type: String,
    },

    url: {
      type: String,
    },

    disabled: {
      type: Boolean,
    },

    canDownload: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['delete'],

  setup(props, { emit }) {
    const handleDownload = () => {
      const { url, name } = props;
      if (url) {
        const req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.responseType = 'blob';
        req.onload = () => {
          const href = window.URL.createObjectURL(req.response);
          const a = document.createElement('a');
          a.href = href;
          a.download = name || url;
          a.click();
        };
        req.send();
      }
    };
    const handleDelete = () => {
      emit('delete');
    };
    return {
      handleDownload,
      handleDelete,
    };
  },
});
</script>
