<template>
  <div class="photo-mask-editor tw-bg-[#F2F4FA]" v-loading="looping">
    <div class="tw-h-[80px] tw-bg-white tw-flex tw-items-center tw-justify-between tw-px-5 tw-mb-[1px]">
      <span class="tw-text-20px tw-font-bold tw-flex-shrink-0">{{title}}</span>
      <el-popover
        v-if="modifyTips"
        placement="top-start"
        :width="250"
        trigger="click"
      >
        <template #reference>
          <el-icon
            ref="tipsIconRef"
            class="tw-font-size-24px tw-ml-20px tw-text-warning"
          >
            <InfoFilled />
          </el-icon>
        </template>
        <Tips :modifyTips="modifyTips" />
      </el-popover>
      <!-- 头部工具栏 -->
      <top-toolbar
        @cancel="handleCancel"
        @save="handleSave"
        v-if="!customLeftToolId"
      />
      <!-- 头部工具栏 花型提取-消除褶皱-->
      <remove-wrinkles-top-toolbar
        @cancel="handleCancel"
        @save="handleSave"
        v-else-if="customLeftToolId === FLOWER_PATTERN_EXTRACTION_CUSTOM_LEFT_TOOL_KEY"
      />
    </div>
    <div class="editor-body">
      <!-- 左侧工具栏 -->
      <left-toolbar :left-tool="leftTool" v-if="!customLeftToolId" />
      <!-- 左侧工具栏-花型提取-消除褶皱 -->
      <RemoveWrinklesLeftToolbar
        v-else-if="customLeftToolId === FLOWER_PATTERN_EXTRACTION_CUSTOM_LEFT_TOOL_KEY"
        :left-tool="leftTool"
        :maskUrl="maskUrl"
        is-multiple-rect
        @remove-wrinkles="handleRemoveWrinkles"
        @auto="handleAuto"
      />
      <!-- 画板区域 -->
      <div id="mask-workspace">
        <canvas id="mask-canvas" />
        <!-- 底部便捷工具 -->
        <bottom-toolbar />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, watch, onMounted, onUnmounted, ref, PropType } from 'vue';
import { ElMessage } from 'element-plus';
import TopToolbar from './components/top-toolbar/index.vue';
import LeftToolbar from './components/left-toolbar/index.vue';
import BottomToolbar from './components/bottom-toolbar/index.vue';
import RemoveWrinklesLeftToolbar from './components/remove-wrinkles-left-toolbar/index.vue';
import RemoveWrinklesTopToolbar from './components/remove-wrinkles-top-toolbar/index.vue';
import Tips from './components/tips/index.vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { useEditorStore } from './store/useEditorStore';
import { TOOL_ENUM, useToolBarStore } from './store/useToolBarStore';
import { fabric } from '@/fabric';
import { getImageSize } from '@/core/utils/image';
import { splitCreate, webSplit } from '@/components/photo-mask-editor/api';
import md5 from 'md5';
import { TASK_STATUS_ENUM } from './constant';
import { useFlowerRemoveWrinklesToolBarStore } from './store/useRemoveWrinklesToolBarStore';
import {
  FLOWER_PATTERN_EXTRACTION_CUSTOM_LEFT_TOOL_KEY
} from '@/modules/inspiration-center/flower-pattern-extraction/constant';
import { IModifyTips } from './types';

const props = defineProps({
  title: {
    type: String,
    default: '选区编辑器'
  },
  // 选取图
  maskUrl: {
    type: String,
    required: true,
  },
  maskUrlList: {
    type: Array<string>,
    required: false,
  },
  // 原图
  url: {
    type: String,
    required: true,
  },
  useSplit: {
    type: Boolean,
    default: true,
  },
  leftTool: {
    type: Array as PropType<string[]>,
    default: () => [
      TOOL_ENUM.SAM, TOOL_ENUM.UNDO_SAM,
      TOOL_ENUM.BRUSH, TOOL_ENUM.ERASER, TOOL_ENUM.RECT,
      TOOL_ENUM.DETAIL_DETECTION,
    ],
  },
  /** 自定义的左侧操作栏id，一般默认为空，需要新的左侧操作栏时候有值，==removeFlowerWrinkles：花型提取-消除褶皱 */
  customLeftToolId: {
    type: String,
    default: '',
  },
  /** 改款提示 */
  modifyTips: {
    type: Object as PropType<IModifyTips>,
    default: null,
  },
});

const emits = defineEmits<{
  (e: 'confirm', data: string): void;
  (e: 'cancel'): void;
  (e: 'auto'): void;
  (e: 'removeWrinkles', maskUrl: string): void;
}>();

const editorStore = useEditorStore();
const { history } = editorStore;
const toolbarStore = useToolBarStore();
const flowerToolBarStore = useFlowerRemoveWrinklesToolBarStore();

let canvas: fabric.Canvas;

const initWorkspace = async (imageUrl: string, maskUrl?: string) => {
  const { width, height } = await getImageSize(imageUrl);
  editorStore.workspace.initWorkspace(width, height);
  await editorStore.originImage.addImage(imageUrl);
  maskUrl && (await editorStore.maskImage.addImage(maskUrl));
  // 初始化历史记录
  history.addRecord();
};

const initCanvas = () => {
  canvas = new fabric.Canvas('mask-canvas');
  fabric.textureSize = 8192;
  const worksSpaceEl = document.getElementById('mask-workspace');
  worksSpaceEl && editorStore.init(canvas, worksSpaceEl);
};

const init = async (imageUrl: string, maskUrl?: string) => {
  await editorStore.$reset();
  toolbarStore.$reset();
  flowerToolBarStore.$reset();
  initCanvas();
  await initWorkspace(imageUrl, maskUrl);
};

const handleSave = (url: string) => {
  emits('confirm', url);
};

const handleCancel = () => {
  emits('cancel');
};

let timer: any = null;
const looping = ref(false);
const getSamData = async (id: string) => {
  const { data } = await webSplit({
    id,
  });
  if (data.taskStatus === TASK_STATUS_ENUM.COMPLETED && data.samMasks) {
    editorStore.originImage.samHook.setSamData((JSON.parse(data.samMasks || '') || {}).data);
    looping.value = false;
  } else if ([TASK_STATUS_ENUM.GENERATING, TASK_STATUS_ENUM.QUEUEING].includes(data.taskStatus)) {
    loop(id);
  } else {
    ElMessage.error('获取分割信息错误！');
    looping.value = false;
  }
};
const loop = (id: string) => {
  timer = setTimeout(async () => {
    getSamData(id);
  }, 1000);
};
const getSplit = async (url: string) => {
  looping.value = true;
  const { data } = await splitCreate({
    splitBasePicture: url,
    taskType: '1200',
    md5Code: md5(url),
  });
  getSamData(data);
};

// 初始化组件
const initComp = () => {
  if (props.maskUrlList && props.maskUrlList.length) {
    editorStore.originImage.samHook.setImageData(props.maskUrlList);
  } else if (!props.customLeftToolId) {
    props.useSplit && getSplit(props.url);
  }
  init(props.url, props.maskUrl);
};

// 原图变化，重新初始化
watch(
  () => [props.url, props.useSplit, props.maskUrl, props.maskUrlList],
  async () => {
    initComp();
  },
);

// 提示框
const tipsIconRef = ref();
const handleShowTipsPopover = () => {
  tipsIconRef.value?.$el.click();
};

onMounted(async () => {
  initComp();
  handleShowTipsPopover();
});
onUnmounted(() => {
  clearInterval(timer);
  timer = null;
  looping.value = false;
});
/**
 * 花型- 自动识别褶皱
  */
const handleAuto = () => {
  emits('auto');
};

/**
 * 花型- 开始消除褶皱
  */
const handleRemoveWrinkles = (maskUrl: string) => {
  emits('removeWrinkles', maskUrl);
};

</script>

<style lang="scss" scoped>
.photo-mask-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  .editor-body {
    display: flex;
    flex: 1;
  }
  #mask-workspace {
    width: 100%;
    flex: 1;
  }
}
</style>
