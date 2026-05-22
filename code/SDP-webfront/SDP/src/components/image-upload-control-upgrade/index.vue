<template>
  <div class="tw-flex tw-gap-10px tw-flex-wrap">
    <UploadImage
      :style="`${layout === 'horizontal' ? 'width: 160px;height: 160px;' : ''} pointer-events: ${disabled ? 'none' : ''}`"
      @upload-success="handleUploadSuccessPositioning"
      :limit="limit"
      :fileSize="fileSize"
      :allowedExtensions="allowedExtensions"
      v-if="(imgs?.length ?? 0) < limit"
    >
      <template #content="{ triggerFileInput }">
        <div
          class="tw-absolute tw-w-full tw-h-full tw-left-0px tw-top-0px
          tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-10px"
        >
          <span :class="`tw-text-#3F414D ${layout === 'horizontal' ? 'tw-w-70%' : ''}`">{{ title }}</span>
          <el-button
            type="primary"
            @click="triggerFileInput"
            :disabled="disabled"
          >
            点击上传
          </el-button>
        </div>
      </template>
    </UploadImage>
    <p v-if="layout !== 'horizontal'" class="font-text-color">{{ tips }}</p>
    <div
      class="tw-w-160px tw-relative hover"
      v-for="(item, index) in (layout === 'horizontal' && !isVideo) ? imgs : []"
      :key="index"
    >
      <el-image
        :class="`tw-w-160px tw-h-160px`"
        :src="item.url"
        :initial-index="index"
        :preview-src-list="previewSrcList"
        fit="contain"
      />
      <div
        v-if="!disabled"
        class="dele-ico-h-auth" 
        @click.stop="closeImgFun(index)"
      >
        <el-icon color="#fff"><Delete /></el-icon>
      </div>
      <div class="mainImageType-style" v-if="isMainImageType">
        <el-button
          class="setMainImageType"
          @click="mainImageTypeFun(item)"
          v-if="item.mainImageType !== 1"
        >
          设为主图
        </el-button>
        <el-button
          v-if="item.mainImageType === 1"
          type="primary"
        >
          主图
        </el-button>
      </div>
    </div>
  </div>
  <div class="img-flex tw-m-t-10px" v-if="layout !== 'horizontal' && !isVideo">
    <div
      class="tw-w-160px tw-relative hover"
      v-for="(item, index) in imgs"
      :key="index"
    >
      <el-image
        :class="`tw-w-160px tw-h-160px`"
        :src="item.url"
        :initial-index="index"
        :preview-src-list="previewSrcList"
        fit="contain"
      />
      <div
        v-if="!disabled"
        class="dele-ico-h-auth" 
        @click.stop="closeImgFun(index)"
      >
        <el-icon color="#fff"><Delete /></el-icon>
      </div>
    </div>
  </div>
  <div v-if="isVideo">
    <div
      class="tw-w-200px tw-relative hover"
      v-for="(item, index) in imgs"
      :key="index"
    >
      <video
        class="tw-w-200px"
        :src="item.url"
        controls
      />
      <div
        class="dele-ico-h-auth" 
        v-if="!disabled"
        @click.stop="closeImgFun(index)"
      >
        <el-icon color="#fff"><Delete /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType, defineModel, computed } from 'vue';
import UploadImage from '@/components/image-upload-control-multiple/upload-image.vue';
import { ElMessage } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';

const imgs = defineModel({
  type: Array as PropType<any>,
  default: () => {
    return [];
  },
});
const props = defineProps({
  // Images: {
  //   type: Array as PropType<GenerateFlatList>,
  //   default: () => [],
  // },
  limit: {
    type: Number,
    default: 20,
  },
  fileSize: {
    type: Number,
    default: 20,
  },
  tips: {
    type: String,
    default: '',
  },
  layout: {
    type: String,
    default: '',
  },
  isMainImageType: {
    type: Boolean,
    default: false,
  },
  allowedExtensions: {
    type: Array as PropType<string[]>,
    default: () => ['jpg', 'jpeg', 'png'],
  },
  isVideo: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '粘贴、拖放图片进行上传，或'
  },
  disabled: {
    type: Boolean,
    default: false
  },
});
const handleUploadSuccessPositioning = (picUrl: string[]) => {
  if ((imgs?.value?.length ?? 0) + picUrl.length > props.limit) {
    ElMessage.error(`最大上传${props.limit}张图`);
    return;
  }
  imgs.value = [...imgs.value, ...picUrl.map((url) => {
    return {
      url
    };
  })];
  if (props.isMainImageType) {
    setTimeout(() => {
      if (!imgs.value.filter((v: { mainImageType: number; }) => v.mainImageType === 1).length) {
        imgs.value[0].mainImageType = 1;
      }
    });
  }
};

const closeImgFun = (index: number) => {
  imgs.value.splice(index, 1);
};

const mainImageTypeFun = (item: { mainImageType: number; }) => {
  imgs.value.forEach((v: { mainImageType: number | undefined; }) => {
    v.mainImageType = undefined;
  });
  item.mainImageType = 1;
};
const previewSrcList = computed(() => {
  return imgs.value.map((v: { url: string; }) => v.url);
});
</script>



<style scoped lang="scss">
.img-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.dele-ico-h-auth {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 2px;
  background-color: rgba(0, 0, 0, .6);
  cursor: pointer;
}
.hover:hover .dele-ico-h-auth {
  display: flex;
}
.font-text-color {
  font-size: 12px;
  color: gray;
}
.mainImageType-style {
  position: absolute;
  left: 0;
  top: 0;
}
.setMainImageType {
  display: none;
}
.hover:hover .setMainImageType {
  display: block;
}
</style>
