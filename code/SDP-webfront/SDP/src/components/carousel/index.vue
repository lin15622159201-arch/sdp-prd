<template>
  <div
    class='left'
    :style="{
      width: `${mainImageSize}px`,
    }"
  >
    <image-viewer :list="urls">
      <template #default="{ view }">
        <custom-image
          class='cover'
          :style="{
            width: `${mainImageSize}px`,
            height: `${mainImageSize}px`,
          }"
          fit="contain"
          :src="resizeImgByWidth(curUrl, mainImageSize * 2)"
          @click="() => view(curIndex)"
        />
      </template>
    </image-viewer>
    <div
      class='thumbs'
      :style="{
        height: `${carouselImageSize}px`,
      }"
    >
      <div class='offset_box'>
        <div
          class='ul'
          :style="{
            transform: `translate3d(-${offsetLeft}px, 0, 0)`
          }"
        >
          <div
            v-for="(item, index) in urls"
            :key="index"
            :class='{
              li: true,
              active: curIndex === index
            }'
            :style="{
              width: `${carouselImageSize}px`,
              height: `${carouselImageSize}px`,
            }"
            @click="handleImage(index)"
          >
            <img :src="resizeImgByWidth(item, carouselImageSize * 2)" class="tw-object-cover" />
          </div>
        </div>
      </div>
      <div
        :class='{
          arrow: true,
          left: true,
          disabled: curIndex === 0,
        }'
        @click="handleChangeOffset('left')"
      >
        <el-icon>
          <ArrowLeftBold />
        </el-icon>
      </div>
      <div
        :class='{
          arrow: true,
          right: true,
          disabled: curIndex === urls.length - 1 || urls.length === 0,
        }'
        @click="handleChangeOffset('right')"
      >
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { resizeImgByWidth } from '@/core/utils/helper';
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import { throttle } from 'lodash-es';
import { PropType, computed, ref, watch } from 'vue';
import ImageViewer from '@/components/image-viewer';

const props = defineProps({
  urls: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
  mainImageSize: {
    type: Number,
    default: 349,
  },
  carouselImageSize: {
    type: Number,
    default: 81,
  }
});
const curIndex = ref(0);
const curUrl = computed(() => props.urls[curIndex.value]);
const offsetLeft = computed(() => {
  const itemMarginRight = 8;
  // eslint-disable-next-line vue/max-len
  const maxViewLength = Math.floor((props.mainImageSize + itemMarginRight) / (props.carouselImageSize + itemMarginRight));
  return Math.max((curIndex.value - maxViewLength + 1) * (props.carouselImageSize + itemMarginRight), 0);
});
const handleChangeOffset = throttle((type: 'left' | 'right') => {
  if (props.urls.length === 0) return;
  if (type === 'left') {
    if (curIndex.value === 0) return;
    curIndex.value -= 1;
  } else {
    if (curIndex.value === props.urls.length - 1) return;
    curIndex.value += 1;
  }
}, 100);
const handleImage = (index: number) => {
  if (index === curIndex.value) return;
  curIndex.value = index;
};
watch(() => props.urls, () => {
  curIndex.value = 0;
});
</script>
<style lang="scss" scoped>
.left {
  user-select: none;
  .cover {
    background-color: var(--el-bg-color);
    border-radius: 8px;
    object-fit: contain;
  }
  .thumbs {
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 8px;
    .arrow {
      display:flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0,0,0, .5);
      width: 16px;
      height: 16px;
      border-radius: 50%;
      color: #fff;
      font-size: 8px;
      cursor: pointer;
      &.left {
        position: absolute;
        left: 3px;
        top: 50%;
        transform: translateY(-50%);
      }
      &.right {
        position: absolute;
        top: 50%;
        right: 3px;
        transform: translateY(-50%);
      }
      &.disabled {
        cursor: no-drop;
      }
    }
    .offset_box {
      flex: 1;
      position: relative;
      overflow: hidden;
      .ul {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        transition: all 0.3s;
        .li {
          position: relative;
          background-color: var(--el-bg-color);
          margin-right: 8px;
          flex-shrink: 0;
          cursor: pointer;
          &:last-of-type {
            margin-right: 0;
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            object-fit: cover;
          }
          &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: 2px solid transparent;
            transition: border-color 0.3s;
            border-radius: 4px;
          }
          &.active::after {
            border-color: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>
