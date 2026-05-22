import { fabric } from '@/fabric';
import { TGetCanvas } from '../types';
import { shallowRef } from 'vue';

export default function useCropMask(getCanvas: TGetCanvas) {
  const cropMask = shallowRef<fabric.Group>();
  // 是否被调整，包括位移和缩放
  const isModified = shallowRef(false);
  // 改变控制窗口样式
  const changeControlStyle = (element: fabric.Group) => {
    const drawLine = (ctx: CanvasRenderingContext2D, callback: (length: number) => void) => {
      const length = 20;
      ctx.save();
      ctx.strokeStyle = '#18181A';
      ctx.lineWidth = 2;
      ctx.beginPath();
      callback(length);
      ctx.stroke();
      ctx.restore();
    };
    element.set({
      borderColor: 'rgba(255,255,255,0.5)',
      borderOpacityWhenMoving: 1,
    });
    element.controls.mt = new fabric.Control({
      ...element.controls.mt,
      render: (ctx, left, top) => {
        drawLine(ctx, (length: number) => {
          ctx.moveTo(left - length, top);
          ctx.lineTo(left + length, top);
        });
      },
      cursorStyleHandler: () => 'ns-resize',
    });
    element.controls.mb = new fabric.Control({
      ...element.controls.mb,
      render: (ctx, left, top) => {
        drawLine(ctx, (length: number) => {
          ctx.moveTo(left - length, top);
          ctx.lineTo(left + length, top);
        });
      },
      cursorStyleHandler: () => 'ns-resize',
    });
    element.controls.ml = new fabric.Control({
      ...element.controls.ml,
      render: (ctx, left, top) => {
        drawLine(ctx, (length: number) => {
          ctx.moveTo(left, top - length);
          ctx.lineTo(left, top + length);
        });
      },
      cursorStyleHandler: () => 'ew-resize',
    });
    element.controls.mr = new fabric.Control({
      ...element.controls.mr,
      render: (ctx, left, top) => {
        drawLine(ctx, (length: number) => {
          ctx.moveTo(left, top - length);
          ctx.lineTo(left, top + length);
        });
      },
      cursorStyleHandler: () => 'ew-resize',
    });
    // 左上角
    element.controls.tl = new fabric.Control({
      ...element.controls.tl,
      render: (ctx, left, top) => {
        drawLine(ctx, (length: number) => {
          ctx.moveTo(left, top - 1);
          ctx.lineTo(left, top + length);
          ctx.moveTo(left, top);
          ctx.lineTo(left + length, top);
        });
      },
      cursorStyleHandler: () => 'nwse-resize',
    });
    // 右上角
    element.controls.tr = new fabric.Control({
      ...element.controls.tr,
      render: (ctx, left, top) => {
        drawLine(ctx, (length: number) => {
          ctx.moveTo(left, top);
          ctx.lineTo(left - length, top);
          ctx.moveTo(left, top - 1);
          ctx.lineTo(left, top + length);
        });
      },
      cursorStyleHandler: () => 'nesw-resize',
    });
    // 左下角
    element.controls.bl = new fabric.Control({
      ...element.controls.bl,
      render: (ctx, left, top) => {
        drawLine(ctx, (length: number) => {
          ctx.moveTo(left, top);
          ctx.lineTo(left, top - length);
          ctx.moveTo(left - 1, top);
          ctx.lineTo(left + length, top);
        });
      },
      cursorStyleHandler: () => 'nesw-resize',
    });
    // 右下角
    element.controls.br = new fabric.Control({
      ...element.controls.br,
      render: (ctx, left, top) => {
        drawLine(ctx, (length: number) => {
          ctx.moveTo(left + 1, top);
          ctx.lineTo(left - length, top);
          ctx.moveTo(left, top);
          ctx.lineTo(left, top - length);
        });
      },
      cursorStyleHandler: () => 'nwse-resize',
    });
  };

  // 限制最小缩放值
  // const setMinScale = (obj: fabric.Object, minWidth: number, minHeight: number) => {
  //   if (obj.width === undefined || obj.height === undefined) return;
  //   const minScaleX = minWidth / obj.width;
  //   const minScaleY = minHeight / obj.height;
  //   // 取最小缩放比例
  //   const minScale = Math.max(minScaleX, minScaleY);
  //   obj.minScaleLimit = minScale;
  // };

  // 绘制裁剪框
  // 每次从画布中移除再绘制是因为调整宽高，内部线条没法自动适配
  const draw = async (width: number, height: number, left: number, top: number) => {
    isModified.value = false;
    const canvas = getCanvas();
    remove();
    // 画布旋转角度
    const maskRect = new fabric.Rect({
      fill: 'transparent',
      selectable: false, // 避免裁剪框被选中
      stroke: 'black', // 边框颜色
      strokeWidth: 0, // 边框宽度
      inverted: true,
    });
    // 计算线条的数量和间距
    const numLines = 3;
    // 计算线条的间距
    const lineSpacingX = width / numLines;
    const lineSpacingY = height / numLines;

    // 创建一个数组来保存线条对象
    const lines: fabric.Line[] = [];

    // 创建水平和垂直线条并添加到数组
    for (let i = 1; i < numLines; i++) {
      // 创建水平线条
      const horizontalLine = new fabric.Line(
        [maskRect.left!, maskRect.top! + i * lineSpacingY, maskRect.left! + width, maskRect.top! + i * lineSpacingY],
        {
          stroke: 'rgba(255,255,255,0.5)',
          shadow: new fabric.Shadow({
            color: 'rgba(0,0,0,0.4)',
            blur: 1,
            offsetX: 0,
            offsetY: 1,
          }),
        },
      );
      lines.push(horizontalLine);

      // 创建垂直线条
      const verticalLine = new fabric.Line(
        [maskRect.left! + i * lineSpacingX, maskRect.top!, maskRect.left! + i * lineSpacingX, maskRect.top! + height],
        {
          stroke: 'rgba(255,255,255,0.5)',
          shadow: new fabric.Shadow({
            color: 'rgba(0,0,0,0.4)',
            blur: 1,
            offsetX: 1,
            offsetY: 0,
          }),
        },
      );
      lines.push(verticalLine);
    }

    // 将方形对象和线条数组成为一个组
    const group = new fabric.Group([maskRect, ...lines], {
      originX: 'center',
      originY: 'center',
      width,
      height,
      top,
      left,
    });
    // @ts-ignore
    group.set('id', 'cropMask');
    group.setControlVisible('mtr', false); // 隐藏旋转控制点
    changeControlStyle(group);
    // setMinScale(group, 512, 512);
    canvas.add(group);
    canvas.setActiveObject(group);
    group.on('scaling', () => {
      isModified.value = true;
    });
    group.on('moving', () => {
      isModified.value = true;
    });
    cropMask.value = group;

    return group;
  };

  const remove = () => {
    cropMask.value && getCanvas().remove(cropMask.value);
  };

  const getSize = () => {
    if (cropMask.value) {
      const width = Math.ceil(cropMask.value.getScaledWidth());
      const height = Math.ceil(cropMask.value.getScaledHeight());
      const { left, top } = cropMask.value;
      return { width, height, left, top };
    }
    return { width: 0, height: 0, left: 0, top: 0 };
  };

  return {
    cropMask,
    isModified,
    draw,
    remove,
    getSize,
  };
}
