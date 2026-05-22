<template>
  <div>
    <div class="photo-editor tw-bg-[#F2F4FA]">
      <div class="tw-h-[80px] tw-bg-white tw-flex tw-items-center tw-justify-between tw-px-5 tw-mb-[1px]">
        <span class="tw-text-20px tw-font-bold">图片编辑器</span>
        <basic-tool-bar
          :return-type="returnType!"
          @cancel="handleCancel"
          @save="handleSave"
          :confirm-button-text="confirmButtonText"
        />
      </div>
      <div class="tw-flex" style="height: calc(100vh - 80px)">
        <!-- 左侧工具栏 -->
        <advanced-tool-bar />
        <!-- 画板区域 -->
        <div id="workspace">
          <canvas id="canvas" />
          <!-- 底部便捷工具 -->
          <bottom-tool-bar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from './store/useEditorStore';
import bottomToolBar from './components/bottom-tool-bar/index.vue';
import advancedToolBar from './components/advanced-tool-bar/index.vue';
import basicToolBar from './components/basic-tool-bar/index.vue';
import { getImageSize, urlToBase64, getStringMd5 } from './utils';
import { watch, onMounted, ref } from 'vue';
import { fabric } from '@/fabric';
import { RETURN_TYPE } from './types';
import { useToolBarStore, TOOL_ENUM } from './store/useToolBarStore';
import { createSplitTaskApi } from './api';

// 配置图片处理大小（blur）
fabric.textureSize = 9600;
interface IProps {
  useBlur?: boolean;
  url: string;
  returnType?: RETURN_TYPE;
  confirmButtonText?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  returnType: RETURN_TYPE.URL,
  useBlur: false,
  url: 'https://oss.yunbanfang.cn/tiangong_b0cc0c237b0544948bd209759362eada.jpg',
  confirmButtonText: '完成',
});

// onSave和onCancel事件通知父组件
const emits = defineEmits<{
  (e: 'save', data: string): void;
  (e: 'cancel'): void;
}>();

const editorStore = useEditorStore();
const toolbarStore = useToolBarStore();

// 原图，用于虚化
const blurUrl = ref('');
// 切割图，只有人没有背景
const splitUrl = ref('');

const initWorkspace = async () => {
  const { url } = props;
  const { width, height } = await getImageSize(url);
  editorStore.workspace.initWorkspace(width, height);
  if (blurUrl.value) {
    await editorStore.blurImage.addImage(blurUrl.value, false);
  }
  await editorStore.originImage.addImage(splitUrl.value || url, false);
  editorStore.history.addRecord();
};

const initCanvas = async () => {
  const canvas = new fabric.Canvas('canvas');
  const worksSpaceEl = document.getElementById('workspace');
  worksSpaceEl && await editorStore.init(canvas, worksSpaceEl);
};

const getBlurImage = async () => {
  const imgDataURL = await urlToBase64(props.url);
  const md5Code = await getStringMd5(imgDataURL);
  const params = {
    splitBasePicture: props.url,
    md5Code,
    taskType: '1100',
  };
  const { data } = await createSplitTaskApi(params);
  splitUrl.value = data?.splitPicture;
  blurUrl.value = props.url;
};

const init = async () => {
  blurUrl.value = '';
  splitUrl.value = '';
  if (props.useBlur) {
    await getBlurImage();
  }
  editorStore.$reset();
  toolbarStore.$reset();
  await initCanvas();
  await initWorkspace();
  toolbarStore.activeTool = TOOL_ENUM.croping;
};

const handleCancel = () => {
  emits('cancel');
};

const handleSave = (url: string) => {
  emits('save', url);
};

// 监听props变更，重新初始化
watch(props, async () => {
  init();
});

onMounted(async () => {
  init();
});
</script>

<style lang="scss" scoped>
#workspace {
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
}
</style>
