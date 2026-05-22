import { useMagicKeys } from '@vueuse/core';
import { computed, ref, shallowRef, watch } from 'vue';
import { TGetCanvas } from '../types';

export default function useHistory(getCanvas: TGetCanvas) {
  // 历史记录
  const history = shallowRef<(typeof useHistory)[]>([]);
  // 当前历史记录索引
  const historyIndex = ref(0);
  // 保留最少步数
  const keepStep = ref(1);
  // 是否可以回撤
  const canUndo = computed(() => historyIndex.value >= keepStep.value);
  // 是否可以恢复
  const canRedo = computed(() => historyIndex.value < history.value.length - 1);
  const renderCallback = ref(() => {});
  const renderCanvas = async (index: number) => {
    const canvas = getCanvas();
    await canvas.loadFromJSON(history.value[index], () => {
      renderCallback.value();
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
    renderCanvas(0);
    history.value = history.value.slice(0, keepStep.value);
    historyIndex.value = history.value.length;
  };

  const reset = () => {
    history.value = [];
    historyIndex.value = 0;
  };

  const addRecord = () => {
    history.value = history.value.slice(0, historyIndex.value + 1);
    history.value.push(getCanvas().toObject(['selectable', 'id', 'hasControls', 'hasBorders']));
    historyIndex.value = history.value.length - 1;
  };

  // 撤销快捷键 ctrl+z
  const CtrlZ = useMagicKeys()['Ctrl+z'];
  const commandZ = useMagicKeys()['Meta+z'];
  watch([CtrlZ, commandZ], (val) => {
    const [ctz, cmz] = val;
    if (ctz || cmz) {
      undo();
    }
  });

  return {
    renderCallback,
    history,
    historyIndex,
    canUndo,
    canRedo,
    clean,
    undo,
    redo,
    reset,
    addRecord,
  };
}
