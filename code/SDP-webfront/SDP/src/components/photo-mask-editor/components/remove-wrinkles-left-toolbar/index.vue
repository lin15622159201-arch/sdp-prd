<template>
  <!-- 花型消除褶皱 -->
  <!-- 左侧面板 -->
  <div class="tw-bg-white tw-px-[7px] tw-mr-[1px]">
    <component
      v-for="(com, index) in toolList"
      :key="index"
      :is="com"
    />
    <el-button
      type="primary"
      class="tw-mt-20px"
      @click="handleRemoveWrinkles"
    >开始消除</el-button>
  </div>
  <div
    class="tw-w-[256px] tw-bg-white tw-p-[14px] tw-mr-[1px] tw-relative tw-flex-shrink-0"
    v-show="[FLOWER_LEFT_TOOL_ENUM.BRUSH,
             FLOWER_LEFT_TOOL_ENUM.ERASER, FLOWER_LEFT_TOOL_ENUM.RECT].includes(flowerToolbarStore.activeTool)"
  >
    <brush-config-panel v-if="flowerToolbarStore.activeTool === FLOWER_LEFT_TOOL_ENUM.BRUSH" />
    <eraser-config-panel v-if="flowerToolbarStore.activeTool === FLOWER_LEFT_TOOL_ENUM.ERASER" />
    <rect-config-panel
      v-if="flowerToolbarStore.activeTool === FLOWER_LEFT_TOOL_ENUM.RECT"
      :is-multiple="isMultipleRect"
    />
  </div>
</template>

<script setup lang="tsx">
import IconfontButton from '../iconfont-button/index.vue';
import brushConfigPanel from '../brush-config-panel/index.vue';
import eraserConfigPanel from '../eraser-config-panel/index.vue';
import rectConfigPanel from '../rect-config-panel/index.vue';
import { useFlowerRemoveWrinklesToolBarStore, FLOWER_LEFT_TOOL_ENUM } from '../../store/useRemoveWrinklesToolBarStore';
import { computed, PropType } from 'vue';
import { useEditorStore } from '../../store/useEditorStore';
import { ElMessage } from 'element-plus';

const editorStore = useEditorStore();
const { exportHook } = editorStore;
const flowerToolbarStore = useFlowerRemoveWrinklesToolBarStore();

const props = defineProps({
  leftTool: {
    type: Array as PropType<string[]>,
    default: () => [
      FLOWER_LEFT_TOOL_ENUM.SAM,
      FLOWER_LEFT_TOOL_ENUM.BRUSH, FLOWER_LEFT_TOOL_ENUM.ERASER, FLOWER_LEFT_TOOL_ENUM.RECT
    ],
  },
  /** 是否多个矩形选区 */
  isMultipleRect: {
    type: Boolean,
    default: false,
  },
  /** 选取图 */
  maskUrl: {
    type: String,
    default: ''
  }
});
const emits = defineEmits<{
  (e: 'auto'): void;
  (e: 'removeWrinkles', url: string): void;
}>();

/**
   *   获取画布上所有矩形选区
   * @returns
   */
const getAllRectangles = () => {
  const canvas = editorStore.getCanvas();
  const objects = canvas.getObjects();
  const rectangles = objects.filter((obj) => {
    return obj.type === 'rect' && obj.id?.includes('flower-rect');
  });

  // 返回矩形对象的数组
  return rectangles;
};

const handleRemoveWrinkles = async () => {
  const flowerRects = getAllRectangles();
  const historyArr = editorStore.history.history.filter((item: any) => {
    return item?.objects.some((n: any) => !n.id || n.id === 'flower-rect');
  });
  const currentHistory = editorStore.history.historyIndex;
  console.log('history==', editorStore.history);
  if (!props.maskUrl && !flowerRects.length && (currentHistory === 0 || historyArr.length <= 0)) {
    ElMessage.warning('请先自动识别褶皱或手动选取褶皱选区后，再开始消除褶皱！');
    return;
  }
  const { getMaskUrl } = exportHook;
  const maskURL = await getMaskUrl();
  emits('removeWrinkles', maskURL);
};

/**
 * 自动识别
 */
const handleAutoIdentify = () => {
  console.log(editorStore.maskImage);
  emits('auto');
};

const handleClick = (type: FLOWER_LEFT_TOOL_ENUM) => {
  flowerToolbarStore.activeTool = type;
  if (type === FLOWER_LEFT_TOOL_ENUM.SAM) {
    handleAutoIdentify();
  }
};

const renderIconFontButton = (type: FLOWER_LEFT_TOOL_ENUM) => {
  const toolMap = {
    [FLOWER_LEFT_TOOL_ENUM.SAM]: {
      icon: 'font_family icon-ksxq',
      text: '自动识别',
    },
    [FLOWER_LEFT_TOOL_ENUM.UNDO_SAM]: {
      icon: 'font_family icon-qxxq',
      text: '取消选区',
    },
    [FLOWER_LEFT_TOOL_ENUM.BRUSH]: {
      icon: 'font_family icon-tmtj',
      text: '涂抹',
    },
    [FLOWER_LEFT_TOOL_ENUM.ERASER]: {
      icon: 'font_family icon-tmxc',
      text: '橡皮擦',
    },
    [FLOWER_LEFT_TOOL_ENUM.RECT]: {
      icon: 'font_family icon-jxxq',
      text: '矩形选区',
    },
    [FLOWER_LEFT_TOOL_ENUM.DEFAULT]: null
  };

  const option = toolMap[type];
  if (!option) return null;

  return (
    <IconfontButton
      class='tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[54px] tw-ml-auto tw-mr-auto'
      iconClass={option.icon}
      text={option.text}
      active={flowerToolbarStore.activeTool === type}
      onClick={() => handleClick(type)}
    />
  );
};

const toolList = computed(() => {
  const { leftTool } = props;
  return leftTool.map(type => renderIconFontButton(type as FLOWER_LEFT_TOOL_ENUM)).filter(component => component);
});
</script>
