import { TGetCanvas } from '../types';
import { TWorkspace } from './useWorkspace';

export default function useRotate(workspace: TWorkspace, getCanvas: TGetCanvas) {
  // 旋转
  const rotate = (value = 90) => {
    const canvas = getCanvas();
    canvas.getObjects().forEach((item) => {
      // 画布旋转时，通过宽高互换模拟
      if (item === workspace.spaceRect.value) {
        const { width = -1, height = -1 } = workspace.spaceRect.value;
        workspace.setSize(height, width);
      } else {
        const angel = (item.angle || 0) + value;
        item.rotate(angel);
      }
      canvas.renderAll();
    });
  };

  // 水平翻转
  const flipX = () => {
    const canvas = getCanvas();
    canvas.getObjects().forEach((item) => {
      item.flipX = !item.flipX;
    });
    canvas.renderAll();
  };

  // 垂直翻转
  const flipY = () => {
    const canvas = getCanvas();
    canvas.getObjects().forEach((item) => {
      item.flipY = !item.flipY;
    });
    canvas.renderAll();
  };

  return {
    rotate,
    flipX,
    flipY,
  };
}
