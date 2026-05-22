<template>
  <div class="detail-editor" v-loading="hasLoop">
    <div class="left">
      <div class="title">识别图片</div>
      <el-image
        :src="detailImageUrl"
      />
      <div
        class="tw-mt-20px tw-font-bold color-error"
        v-if="hasError"
        @click="() => { handleCreateTask(); }"
      >
        识别失败，点击重试
        <el-icon
          class="tw-vertical-top"
        ><RefreshRight /></el-icon>
      </div>
    </div>
    <div class="center">
      <div class="title">选择区域</div>
      <div id="detail-editor-workspace">
        <canvas ref="canvasEl" id="detail-editor-canvas" />
      </div>
    </div>
    <div class="right">
      <div class="title">处理方式</div>
      <div
        :class="{
          'mask-dispose': true,
          active: disposeMaskType === DISPOSE_MASK_ENUM.ADD,
        }"
        @click="() => handleDisposeMask(DISPOSE_MASK_ENUM.ADD)"
      >
        <div>
          <div class="title">添加</div>
          <div>将所选细节添加到变动区域</div>
        </div>
        <div class="icon add-icon">
          <el-icon><CirclePlusFilled /></el-icon>
        </div>
      </div>
      <div
        :class="{
          'mask-dispose': true,
          active: disposeMaskType === DISPOSE_MASK_ENUM.REMOVE,
        }"
        @click="() => handleDisposeMask(DISPOSE_MASK_ENUM.REMOVE)"
      >
        <div>
          <div class="title">移除</div>
          <div>将所选细节从变动区域移除</div>
        </div>
        <div class="icon remove-icon">
          <el-icon><RemoveFilled /></el-icon>
        </div>
      </div>
      <div class="tw-mt-50px">
        <div class="title">预览</div>
        <Preview
          :maskUrl="previewMaskUrl"
          :disposeImageData="(disposeImageData as any)"
          :disposeType="disposeMaskType"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, PropType, ref } from 'vue';
import { useBasic } from './hooks/useBasic';
import { DISPOSE_MASK_ENUM } from './types';
import { fabric } from '@/fabric';
import { createImageData, getImageSize, imageDataToUrl } from '@/core/utils/image';
import Preview from './components/preview.vue';
import { usePicwishSegmentation } from '@/hooks/use-picwish-segmentation';
import { TASK_STATE_ENUM, TASK_TYPE_ENUM } from '@/hooks/use-picwish-segmentation/constant';
import {
  RefreshRight,
  CirclePlusFilled,
  RemoveFilled,
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

/**
 * 参考图坐标（裁剪时xy坐标）在预览时使用
 */
interface ICoordinate {
  x: number;
  y: number;
}

const props = defineProps({
  // 识别图
  detailImageUrl: {
    type: String,
    required: true,
  },
  // 预览mask图
  previewMaskUrl: {
    type: String,
    required: true,
  },
  // 坐标点
  coordinate: {
    type: Object as PropType<ICoordinate>,
    required: true,
  },
});
// 处理方式
const disposeMaskType = ref<DISPOSE_MASK_ENUM>(DISPOSE_MASK_ENUM.ADD);
const handleDisposeMask = (type: DISPOSE_MASK_ENUM) => {
  disposeMaskType.value = type;
};
// 处理完成后的mask图
const disposeImageData = ref<ImageData | null>(null);
// 生成与maskImage大小一直的mask图
const generateDetailMaskImage = async (detailImageData: ImageData) => {
  // 获取mask图宽高
  const { width, height } = await getImageSize(props.previewMaskUrl);
  const { x, y } = props.coordinate;
  // 根据预览图宽高，创建mask图
  const maskImageData = createImageData(width, height);
  const maskData = maskImageData.data;
  const { width: detailWidth, height: detailHeight } = detailImageData;
  const detailData = detailImageData.data;
  // 遍历细节图 插入生成的mask图中
  for (let i = 0; i < detailWidth; i++) {
    for (let j = 0; j < detailHeight; j++) {
      const index = (i + j * detailWidth) * 4;
      const r = detailData[index];
      const g = detailData[index + 1];
      const b = detailData[index + 2];
      const a = detailData[index + 3];
      const maskIndex = ((i + x) + (j + y) * width) * 4;
      if (a !== 255) {
        maskData[maskIndex] = a;
        maskData[maskIndex + 1] = a;
        maskData[maskIndex + 2] = a;
        maskData[maskIndex + 3] = 255;
      } else {
        maskData[maskIndex] = r;
        maskData[maskIndex + 1] = g;
        maskData[maskIndex + 2] = b;
        maskData[maskIndex + 3] = 255;
      }
    }
  }

  return maskImageData;
};
const {
  init: initBasic,
  workspace,
  addMaskImages,
  maskImage,
} = useBasic({
  change: async (imageData: ImageData) => {
    disposeImageData.value = await generateDetailMaskImage(imageData);
  }
});
const maskList = ref<string[]>([]);
const { createTask, hasLoop, hasError } = usePicwishSegmentation({
  callback: async (data) => {
    if (data.taskStatus === TASK_STATE_ENUM.COMPLETED) {
      maskList.value = data.maskList;
      addMaskImages(maskList.value);
      await maskImage.addImage(props.detailImageUrl);
      maskImage.samHook.setImageData(maskList.value);
      maskImage.startSAM(workspace);
    } else {
      ElMessage.error('识别失败');
    }
  },
});

const handleCreateTask = () => {
  createTask({
    refImgUrl: props.detailImageUrl,
    taskType: TASK_TYPE_ENUM.DETAIL,
  });
};

const init = async () => {
  // 获取细节图
  handleCreateTask();
  const canvas = new fabric.Canvas('detail-editor-canvas');
  fabric.textureSize = 8192;
  const worksSpaceEl = document.getElementById('detail-editor-workspace')!;
  await initBasic(canvas, worksSpaceEl);
  const { width, height } = await getImageSize(props.detailImageUrl);
  workspace.initWorkspace(width, height);
};
onMounted(async () => {
  init();
});
// 点击提交
const getDetailInfo = async () => {
  let disposeMask = '';
  if (disposeImageData.value) {
    disposeMask = await imageDataToUrl(disposeImageData.value);
  }
  return {
    maskList: maskList.value,
    disposeMask,
    disposeType: disposeMaskType.value,
  };
};
defineExpose({
  getDetailInfo
});
</script>
<style lang="scss" scoped>
.detail-editor {
  display: flex;
  width: 100%;
  min-width: 900px;
  height: 100%;
  padding: 20px;
  gap: 40px;
  .title {
    font-weight: bold;
    padding-bottom: 10px;
  }
  .left {
    width: 200px;
    flex-shrink: 0;
  }
  .right {
    width: 300px;
    flex-shrink: 0;
    .mask-dispose {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border: 1px solid #ccc;
      cursor: pointer;
      margin-bottom: 10px;
      &.active {
        border: 1px solid var(--el-color-primary);
      }
      .icon {
        font-size: 20px
      }
      .remove-icon {
        color: rgba(255, 0, 0, 0.6);
      }
      .add-icon {
        color: rgba(0, 255, 0, 0.6);
      }
    }
  }
  .center {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    #detail-editor-workspace {
      flex: 1;
      width: 100%;
    }
  }
}
</style>
