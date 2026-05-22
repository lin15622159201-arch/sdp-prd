import { fabric } from 'fabric';

export const clamp = (value: number, minValue: number, maxValue: number) => {
  if (minValue > maxValue) {
    // eslint-disable-next-line no-param-reassign
    [minValue, maxValue] = [maxValue, minValue];
  }

  return Math.max(minValue, Math.min(value, maxValue));
};

export const getScaleBasis = (diffX: number, diffY: number) => {
  return diffX > diffY ? 'width' : 'height';
};

export const eventNames = {
  OBJECT_ACTIVATED: 'objectActivated',
  OBJECT_MOVED: 'objectMoved',
  OBJECT_SCALED: 'objectScaled',
  OBJECT_CREATED: 'objectCreated',
  TEXT_EDITING: 'textEditing',
  TEXT_CHANGED: 'textChanged',
  ICON_CREATE_RESIZE: 'iconCreateResize',
  ICON_CREATE_END: 'iconCreateEnd',
  ADD_TEXT: 'addText',
  ADD_OBJECT: 'addObject',
  ADD_OBJECT_AFTER: 'addObjectAfter',
  MOUSE_DOWN: 'mousedown',
  MOUSE_UP: 'mouseup',
  MOUSE_MOVE: 'mousemove',
  // UNDO/REDO Events
  REDO_STACK_CHANGED: 'redoStackChanged',
  UNDO_STACK_CHANGED: 'undoStackChanged',
  SELECTION_CLEARED: 'selectionCleared',
  SELECTION_CREATED: 'selectionCreated',
};

// 改变控制窗口样式
export const changeControlStyle = (element: fabric.Rect) => {
  const drawLine = (ctx: CanvasRenderingContext2D, callback: (length: number) => void) => {
    const length = 20;
    ctx.save();
    ctx.strokeStyle = 'blue';
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

export const updateMaskInnerClipPath = (innerObject: fabric.Rect, mask: fabric.Rect) => {
  const clipPath = new fabric.Rect({
    width: innerObject.getScaledWidth(),
    height: innerObject.getScaledHeight(),
    left: innerObject.left,
    top: innerObject.top,
    inverted: true,
    absolutePositioned: true, // 注意使用绝对定位，否则会因为外层mask影响导致定位偏移
  });
  mask.set('clipPath', clipPath);
};
