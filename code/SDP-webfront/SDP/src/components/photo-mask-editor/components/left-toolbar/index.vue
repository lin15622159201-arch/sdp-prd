<template>
  <!-- 左侧面板 -->
  <div class="tw-bg-white tw-px-[7px] tw-mr-[1px]">
    <component
      v-for="(com, index) in toolList"
      :key="index"
      :is="com"
    />
    <!-- <IconfontButton
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[54px]"
      iconClass="font_family icon-ksxq"
      text="快速选区"
      :active="toolbarStore.activeTool === TOOL_ENUM.SAM"
      @click="toolbarStore.activeTool = TOOL_ENUM.SAM"
    />

    <IconfontButton
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[54px]"
      iconClass="font_family icon-qxxq"
      text="取消选区"
      :active="toolbarStore.activeTool === TOOL_ENUM.UNDO_SAM"
      @click="toolbarStore.activeTool = TOOL_ENUM.UNDO_SAM"
    />
    <IconfontButton
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[54px]"
      iconClass="font_family icon-tmtj"
      text="涂抹添加"
      :active="toolbarStore.activeTool === TOOL_ENUM.BRUSH"
      @click="toolbarStore.activeTool = TOOL_ENUM.BRUSH"
    />

    <IconfontButton
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[54px]"
      iconClass="font_family icon-tmxc"
      text="涂抹消除"
      :active="toolbarStore.activeTool === TOOL_ENUM.ERASER"
      @click="toolbarStore.activeTool = TOOL_ENUM.ERASER"
    />

    <IconfontButton
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[54px]"
      iconClass="font_family icon-jxxq"
      :active="toolbarStore.activeTool === TOOL_ENUM.RECT"
      @click="toolbarStore.activeTool = TOOL_ENUM.RECT"
      text="矩形选区"
    /> -->
  </div>
  <div
    class="tw-w-[256px] tw-bg-white tw-p-[14px] tw-mr-[1px] tw-relative tw-flex-shrink-0"
    v-show="[TOOL_ENUM.BRUSH, TOOL_ENUM.ERASER, TOOL_ENUM.RECT].includes(toolbarStore.activeTool)"
  >
    <brush-config-panel v-if="toolbarStore.activeTool === TOOL_ENUM.BRUSH" />
    <eraser-config-panel v-if="toolbarStore.activeTool === TOOL_ENUM.ERASER" />
    <rect-config-panel v-if="toolbarStore.activeTool === TOOL_ENUM.RECT" />
  </div>
</template>

<script setup lang="tsx">
import IconfontButton from '../iconfont-button/index.vue';
import { useToolBarStore, TOOL_ENUM } from '../../store/useToolBarStore';
import { useEditorStore } from '../../store/useEditorStore';
import brushConfigPanel from '../brush-config-panel/index.vue';
import eraserConfigPanel from '../eraser-config-panel/index.vue';
import rectConfigPanel from '../rect-config-panel/index.vue';
import { computed, PropType } from 'vue';
import { Warning } from '@element-plus/icons-vue';
// import { ElTooltip, ElImage } from 'element-plus';
import { useDetectionDialog } from '../detection-dialog';

const toolbarStore = useToolBarStore();

const editorStore = useEditorStore();
const { handleOpenDialog } = useDetectionDialog({
  callback: (data) => {
    editorStore.originImage.samHook.pushImageData(data.maskList);
    if (data.disposeMask) {
      editorStore.originImage.dispatchUpdateMask(
        editorStore.workspace,
        data.disposeMask,
        data.disposeType,
      );
    }
  },
});

const props = defineProps({
  leftTool: {
    type: Array as PropType<string[]>,
    default: () => [
      TOOL_ENUM.SAM, TOOL_ENUM.UNDO_SAM,
      TOOL_ENUM.BRUSH, TOOL_ENUM.ERASER, TOOL_ENUM.RECT
    ],
  }
});

const handleClick = async (type: TOOL_ENUM) => {
  toolbarStore.activeTool = type;
  // 打开细节识别弹窗
  if (type === TOOL_ENUM.DETAIL_DETECTION) {
    const maskBase64 = await editorStore.exportHook.getMaskData();
    handleOpenDialog({
      maskUrl: maskBase64,
      url: editorStore.originImage.imageUrl,
    });
  }
};
setTimeout(() => {
  handleClick(TOOL_ENUM.BRUSH);
});

const renderIconFontButton = (type: TOOL_ENUM) => {
  const toolMap: any = {
    // [TOOL_ENUM.SAM]: {
    //   icon: 'font_family icon-ksxq',
    //   text: '快速选区',
    // },
    // [TOOL_ENUM.UNDO_SAM]: {
    //   icon: 'font_family icon-qxxq',
    //   text: '取消选区',
    // },
    [TOOL_ENUM.BRUSH]: {
      icon: 'font_family icon-tmtj',
      text: '涂抹添加',
    },
    [TOOL_ENUM.ERASER]: {
      icon: 'font_family icon-tmxc',
      text: '涂抹消除',
    },
    // [TOOL_ENUM.RECT]: {
    //   icon: 'font_family icon-jxxq',
    //   text: '矩形选区',
    // },
    // [TOOL_ENUM.DETAIL_DETECTION]: {
    //   icon: 'font_family icon-xjsb',
    //   text: '细节识别',
    // },
    // [TOOL_ENUM.DEFAULT]: null
  };

  const option = toolMap[type];
  if (!option) return null;

  // if (type === TOOL_ENUM.DETAIL_DETECTION) {
  //   return (
  //     <ElTooltip
  //       effect='dark'
  //       placement='right'
  //       v-slots={{
  //         content: () => {
  //           return (
  //             <div class='tw-text-[14px]'>
  //               <ElImage
  //                 fit='contain'
  //                 class='tw-w-300px tw-h-300px'
  //                 src='https://oss.yunbanfang.cn/tiangong_db6e6fb9d96042b1ad787e68ab0ac5d4.gif'
  //               />
  //             </div>
  //           );
  //         }
  //       }}
  //     >
  //       <IconfontButton
  //         class='tw-my-[16px] tw-py-[6px] tw-w-[80px] tw-h-[54px]'
  //         iconClass={option.icon || ''}
  //         text={option.text}
  //         active={toolbarStore.activeTool === type}
  //         onClick={() => handleClick(type)}
  //         v-slots={{
  //           text: () => {
  //             return (
  //               <div class='tw-text-[14px]'>
  //                 { option.text }
  //                 <el-icon class='tw-vertical-top tw-ml-2px'><Warning /></el-icon>
  //               </div>
  //             );
  //           }
  //         }}
  //       />
  //     </ElTooltip>
  //   );
  // }

  return (
    <IconfontButton
      class='tw-my-[16px] tw-py-[6px] tw-w-[80px] tw-h-[54px]'
      iconClass={option.icon || ''}
      text={option.text}
      active={toolbarStore.activeTool === type}
      onClick={() => handleClick(type)}
    />
  );
};

const toolList = computed(() => {
  const { leftTool } = props;
  return leftTool.map(type => renderIconFontButton(type as TOOL_ENUM)).filter(component => component);
});
</script>
