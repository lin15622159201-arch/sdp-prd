import { useMagicKeys } from '@vueuse/core';
import { fabric } from 'fabric';
import { computed, ref, watch } from 'vue';
import { TGetCanvas } from '../types';

export default function useHistory(getCanvas: TGetCanvas) {
  // 历史记录
  const history = ref<any>([]);
  // 当前历史记录索引
  const historyIndex = ref(0);
  // 保留最少步数
  const keepStep = ref(1);
  // 是否可以回撤
  const canUndo = computed(() => historyIndex.value >= keepStep.value);
  // 是否可以恢复
  const canRedo = computed(() => historyIndex.value < history.value.length - 1);
  // 暂停记录
  const isPause = ref(false);
  // 忽略的元素
  const ignoreObjects = ref<fabric.Object[]>([]);
  // 渲染后回调
  const renderCallback = ref(() => {});

  const renderCanvas = async (index: number) => {
    const canvas = getCanvas();
    canvas.clear();
    await canvas.loadFromJSON(history.value[index], () => {
      renderCallback.value();
      canvas.renderAll();
    });
  };

  // 回撤
  const undo = async () => {
    if (!canUndo.value) return;
    historyIndex.value -= 1;
    renderCanvas(historyIndex.value);
  };

  // 恢复
  const redo = async () => {
    if (!canRedo.value) return;
    historyIndex.value += 1;
    renderCanvas(historyIndex.value);
  };
  // 清除
  const clean = () => {
    history.value = history.value.slice(0, keepStep.value);
    historyIndex.value = history.value.length - 1;
    renderCanvas(historyIndex.value);
  };

  const reset = () => {
    history.value = [];
    historyIndex.value = 0;
  };

  const startRecord = () => {
    isPause.value = false;
  };

  const stopRecord = () => {
    isPause.value = true;
  };

  const addRecord = () => {
    history.value = history.value.slice(0, historyIndex.value + 1);
    history.value.push(getCanvas().toObject(['selectable', 'id', 'hasControls', 'hasBorders']));
    historyIndex.value = history.value.length - 1;
  };

  const addIgnoreObject = (obj: fabric.Object) => {
    ignoreObjects.value.push(obj);
  };

  // 撤销快捷键 ctrl+z
  const CtrlZ = useMagicKeys()['Ctrl+z'];
  const commandZ = useMagicKeys()['Meta+z'];
  watch([CtrlZ, commandZ], (val) => {
    const [ctlZ, cmdZ] = val;
    if (ctlZ || cmdZ) {
      undo();
    }
  });

  return {
    history,
    historyIndex,
    canUndo,
    canRedo,
    clean,
    undo,
    redo,
    reset,
    startRecord,
    stopRecord,
    addRecord,
    addIgnoreObject,
    renderCallback,
  };
}

export type THistory = ReturnType<typeof useHistory>;
