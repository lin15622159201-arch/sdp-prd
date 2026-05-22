<template>
  <div
    class="image-viewer__wrapper"
    :class="{
      'flex-center': flexCenter
    }"
  >
    <slot v-if="$slots.default" :view="view" />
    <template v-else>
      <el-image
        v-for="(src, i) in imageList"
        :key="i"
        :src="src"
        :class="glassNames"
        :style="imageOptions.style"
        :lazy="imageOptions.lazy"
        :fit="imageOptions.fit"
        @click="view(i)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import 'viewerjs/dist/viewer.css';
import viewerInstance, { ViewerInstance } from '../lib/viewer';

import type { PropType, StyleValue } from 'vue';
import type { TList } from '../lib/viewer';

type TFitType = '' | 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

export interface ImageOptions {
  style?: StyleValue;
  fit?: TFitType;
  lazy?: boolean;
  class?: string | Record<string, string | number> | (Record<string, string | number> | string)[];
}

export const defaultImageOptions = {
  fit: 'cover' as TFitType,
  style: {},
  lazy: false,
};

export default defineComponent({
  name: 'ImageViewer',
  props: {
    list: {
      type: [Array, String] as PropType<TList>,
      default: () => [],
    },
    /**
     * flex 居中
     */
    flexCenter: Boolean,
    /**
   * 展示图片列表（非大图）的显示数量，默认1张，0为不限制
   */
    showNum: {
      type: Number,
      default: 1,
    },
    /**
   * 图片展示列表（非大图）
   */
    imageOptions: {
      type: Object as PropType<ImageOptions>,
      default: () => defaultImageOptions,
    },
  },
  setup(props) {
    const view = (index: number = 0) => {
      viewerInstance.update(props.list);
      const i = typeof index === 'number' ? index : 0;
      viewerInstance.view(i);
    };

    const glassNames = computed(() => {
      const { imageOptions: _imageOptions } = props;

      const imageOptions = {
        ...defaultImageOptions,
        ..._imageOptions,
      };
      const baseGlass = {
        'image-viewer__item': true,
      };

      if (!imageOptions.class) {
        return baseGlass;
      }

      if (Array.isArray(imageOptions.class)) {
        return imageOptions.class.concat(imageOptions.class);
      }

      return Object.assign(
        baseGlass,
        typeof imageOptions.class === 'string'
          ? {
            [imageOptions.class]: true,
          }
          : imageOptions.class,
      );
    });

    /**
     * 获取小图展示列表数据
     */
    const imageList = computed(() => {
      const _list = ViewerInstance.getList(props.list);

      if (!props.showNum) {
        return _list;
      }
      return _list.slice(0, props.showNum);
    });

    return {
      imageList,
      view,
      glassNames,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-center {
  place-content: center;
}
.image-viewer__wrapper {
  display: inline-flex;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  align-items: center;
  .image-viewer__item + .image-viewer__item {
    margin-left: 12px;
  }
}

</style>

<style lang="scss">
.viewer-custom-style {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .viewer-title {
    margin-bottom: 12px;
  }
  .viewer-toolbar {
    ul {
      height: 44px;
      padding: 0 23px;
      background-color: #606266;
      border-radius: 22px;
      opacity: .8;
      li {
        margin: 10px 8px;
        &.viewer-large {
          margin: 7px 12px;
        }
      }
    }
  }
}
</style>
