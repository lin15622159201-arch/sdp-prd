<template>
  <div>
    <div
      class="tw-text-[16px] tw-color-[#18181A] tw-font-bold tw-mb-[11px]"
    >
      清除水印
    </div>
    <div class="tw-flex tw-flex-col tw-mt-16px tw-gap-8px">
      <div
        :class="`
        tw-w-full tw-cursor-pointer tw-font-bold
        ${tool.value === currentTool.value ? 'tw-text-primary' : ''}`
        "
        v-for="(tool, index) in TOOL_LIST"
        :key="index"
        @click="handleSelectTool(tool)"
      >
        <span>{{ tool.label }}</span>
      </div>
      <div class="tw-flex">
        <el-button
          v-if="currentTool.value === ToolType.rect"
          type="danger"
          class="tw-flex-1"
          @click="rect.deleteRect"
        >
          删除
        </el-button>
        <el-button
          type="primary"
          class="tw-flex-1"
          @click="handleClear"
        >
          开始消除
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, shallowRef } from 'vue';
import { useEditorStore } from '../../store/useEditorStore';
import { ElMessage } from 'element-plus';

enum ToolType {
  rect = 'rect',
  noose = 'noose',
  brush = 'brush',
  eraser = 'eraser',
}

const {
  rect, clearWater, exportHook, brush, eraser, draging, noose,
  handleSetToolRenderCallback, handleClearToolRenderCallback, getCanvas
} = useEditorStore();

const TOOL_LIST: {
  label: string;
  value: ToolType;
  activeFn: () => void;
  endFn: () => void;
}[] = [
  { label: '矩形选区',
    value: ToolType.rect,
    activeFn: () => {
      rect.startRect();
    },
    endFn: () => {
      rect.endRect();
    },
  },
  { label: '索套',
    value: ToolType.noose,
    activeFn: () => {
      noose.startDrawing();
    },
    endFn: () => {
      noose.endDrawing();
    },
  },
  { label: '笔刷',
    value: ToolType.brush,
    activeFn: () => {
      draging.dragMode = false;
      brush.startDrawing();
    },
    endFn: () => {
      brush.endDrawing();
    },
  },
  { label: '橡皮擦',
    value: ToolType.eraser,
    activeFn: () => {
      draging.dragMode = false;
      eraser.startErasing();
    },
    endFn: () => {
      eraser.endErasing();
    },
  },
];

const currentTool = shallowRef<typeof TOOL_LIST[0]>(TOOL_LIST[0]);

const hasObject = () => {
  const canvas = getCanvas();
  return canvas.getObjects().some(obj => ((obj as any).id !== 'workspace' && (obj as any).id !== 'originImg'));
};

const handleClear = async () => {
  if (!hasObject()) {
    ElMessage.error('请先选择需要消除的区域');
    return;
  }
  const url = await exportHook.getOriginUrl();
  const maskUrl = await exportHook.getMaskUrl();

  clearWater.startLoop({
    refImgUrl: url,
    maskUrl,
  });
};

const handleSelectTool = (tool: typeof TOOL_LIST[0]) => {
  currentTool.value.endFn();
  currentTool.value = tool;
  tool.activeFn();
};

const setCurrentTool = () => {
  handleSelectTool(currentTool.value);
};

onMounted(() => {
  handleSelectTool(TOOL_LIST[0]);
  handleSetToolRenderCallback(setCurrentTool);
});

onUnmounted(() => {
  currentTool.value.endFn();
  handleClearToolRenderCallback(setCurrentTool);
});
</script>
