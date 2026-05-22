/* eslint-disable no-param-reassign */
import { fabric } from 'fabric';
import { clamp, eventNames as events, getScaleBasis, updateMaskInnerClipPath } from './flower-canvas-utils';

const CORNER_TYPE_TOP_LEFT = 'tl';
const CORNER_TYPE_TOP_RIGHT = 'tr';
const CORNER_TYPE_MIDDLE_TOP = 'mt';
const CORNER_TYPE_MIDDLE_LEFT = 'ml';
const CORNER_TYPE_MIDDLE_RIGHT = 'mr';
const CORNER_TYPE_MIDDLE_BOTTOM = 'mb';
const CORNER_TYPE_BOTTOM_LEFT = 'bl';
const CORNER_TYPE_BOTTOM_RIGHT = 'br';
const CORNER_TYPE_LIST = [
  CORNER_TYPE_TOP_LEFT,
  CORNER_TYPE_TOP_RIGHT,
  CORNER_TYPE_MIDDLE_TOP,
  CORNER_TYPE_MIDDLE_LEFT,
  CORNER_TYPE_MIDDLE_RIGHT,
  CORNER_TYPE_MIDDLE_BOTTOM,
  CORNER_TYPE_BOTTOM_LEFT,
  CORNER_TYPE_BOTTOM_RIGHT,
];
const NOOP_FUNCTION = () => {};

/**
 * Align with cropzone ratio
 * @param {string} selectedCorner - selected corner type
 * @returns {{width: number, height: number}}
 * @private
 */
function cornerTypeValid(selectedCorner: any) {
  return CORNER_TYPE_LIST.indexOf(selectedCorner) >= 0;
}

/**
 * 裁剪框定义
 */
const Cropzone = fabric.util.createClass(
  fabric.Rect,
  /** @lends Cropzone.prototype */ {
    /**
     * Constructor
     * @param {Object} canvas canvas
     * @param {Object} options Options object
     * @param {Object} extendsOptions object for extends "options"
     * @override
     */
    initialize(canvas: any, mask: fabric.Rect, img: fabric.Image, options: any, extendsOptions: any) {
      options = { ...options, ...extendsOptions };
      options.type = 'cropzone';

      this.callSuper('initialize', options);
      this._addEventHandler();
      console.log('this=', this);
      this.canvas = canvas;
      this.mask = mask;
      this.img = img;
      this.options = options;
      updateMaskInnerClipPath(this, this.mask);
    },
    canvasEventDelegation(eventName: string) {
      let delegationState = 'unregistered';
      console.log('canvasEventDelegation==', eventName);
      const isRegistered = this.canvasEventTrigger[eventName] !== NOOP_FUNCTION;
      if (isRegistered) {
        delegationState = 'registered';
      } else if (
        [events.OBJECT_MOVED, events.OBJECT_SCALED].indexOf(eventName) < 0
      ) {
        delegationState = 'none';
      }

      return delegationState;
    },
    canvasEventRegister(eventName: string, eventTrigger: any) {
      this.canvasEventTrigger[eventName] = eventTrigger;
    },
    _addEventHandler() {
      this.canvasEventTrigger = {
        [events.OBJECT_MOVED]: NOOP_FUNCTION,
        [events.OBJECT_SCALED]: NOOP_FUNCTION,
      };
      this.on({
        moving: this._onMoving.bind(this),
        scaling: this._onScaling.bind(this),
      });
    },
    _renderCropzone(ctx: any) {
      // Render outer rect
      // this._fillOuterRect(ctx, 'rgba(10, 200, 200, 0.5)');

      // this._fillInnerRect(ctx);
      this._strokeBorder(ctx, 'rgb(255,255,255)', {
        lineWidth: 1,
        lineDashWidth: 7,
        lineDashOffset: 5,
      });
    },

    /**
     * Render Crop-zone
     * @private
     * @override
     */
    _render(ctx: any) {
      // this.callSuper('_render', ctx);

      this._renderCropzone(ctx);
    },

    /**
     * Cropzone-coordinates with outer rectangle
     *
     *     x0     x1         x2      x3
     *  y0 +--------------------------+
     *     |///////|//////////|///////|    // <--- "Outer-rectangle"
     *     |///////|//////////|///////|
     *  y1 +-------+----------+-------+
     *     |///////| Cropzone |///////|    Cropzone is the "Inner-rectangle"
     *     |///////|  (0, 0)  |///////|    Center point (0, 0)
     *  y2 +-------+----------+-------+
     *     |///////|//////////|///////|
     *     |///////|//////////|///////|
     *  y3 +--------------------------+
     *
     * @typedef {{x: Array<number>, y: Array<number>}} cropzoneCoordinates
     * @ignore
     */

    /**
     * Fill outer rectangle
     * @param {CanvasRenderingContext2D} ctx - Context
     * @param {string|CanvasGradient|CanvasPattern} fillStyle - Fill-style
     * @private
     */
    _fillOuterRect(ctx: any, fillStyle: any) {
      const { x, y } = this._getCoordinates();

      console.log('_fillOuterRect', x, y);

      ctx.save();
      ctx.fillStyle = fillStyle;
      ctx.beginPath();

      // Outer rectangle
      // Numbers are +/-1 so that overlay edges don't get blurry.
      // ctx.moveTo(x[0] - 1, y[0] - 1);
      // ctx.lineTo(x[3] + 1, y[0] - 1);
      // ctx.lineTo(x[3] + 1, y[3] + 1);
      // ctx.lineTo(x[0] - 1, y[3] + 1);
      // ctx.lineTo(x[0] - 1, y[0] - 1);
      // ctx.closePath();

      // Inner rectangle
      ctx.moveTo(x[1], y[1]);
      ctx.lineTo(x[1], y[2]);
      ctx.lineTo(x[2], y[2]);
      ctx.lineTo(x[2], y[1]);
      ctx.lineTo(x[1], y[1]);
      ctx.closePath();

      ctx.fill();
      ctx.restore();
    },

    /**
     * Draw Inner grid line
     * @param {CanvasRenderingContext2D} ctx - Context
     * @private
     */
    _fillInnerRect(ctx: any) {
      const { x: outerX, y: outerY } = this._getCoordinates();
      console.log('outerX=', outerX, 'outerY=', outerY);
      const x = this._caculateInnerPosition(
        outerX,
        (outerX[2] - outerX[1]) / 3,
      );
      const y = this._caculateInnerPosition(
        outerY,
        (outerY[2] - outerY[1]) / 3,
      );
      console.log('ii=', x, y);

      ctx.save();
      ctx.strokeStyle = 'rgba(100, 255, 255, 1)';
      ctx.lineWidth = this.options.lineWidth;
      ctx.beginPath();

      ctx.moveTo(x[0], y[1]);
      ctx.lineTo(x[3], y[1]);

      ctx.moveTo(x[0], y[2]);
      ctx.lineTo(x[3], y[2]);

      ctx.moveTo(x[1], y[0]);
      ctx.lineTo(x[1], y[3]);

      ctx.moveTo(x[2], y[0]);
      ctx.lineTo(x[2], y[3]);
      ctx.stroke();
      ctx.closePath();

      ctx.restore();
    },

    /**
     * Calculate Inner Position
     * @param {Array} outer - outer position
     * @param {number} size - interval for calculate
     * @returns {Array} - inner position
     * @private
     */
    _caculateInnerPosition(outer: any, size: number) {
      const position: number[] = [];
      // eslint-disable-next-line prefer-destructuring
      position[0] = outer[1];
      position[1] = outer[1] + size;
      position[2] = outer[1] + size * 2;
      // eslint-disable-next-line prefer-destructuring
      position[3] = outer[2];

      return position;
    },

    /**
     * Get coordinates
     * @returns {cropzoneCoordinates} - {@link cropzoneCoordinates}
     * @private
     */
    _getCoordinates() {
      const { canvas, width, height, left, top } = this;
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const canvasHeight = canvas.getHeight(); // fabric object
      const canvasWidth = canvas.getWidth(); // fabric object
      return {
        x: [
          -(halfWidth + left), // x0
          -halfWidth, // x1
          halfWidth, // x2
          halfWidth + (canvasWidth - left - width), // x3
        ].map(Math.ceil),
        y: [
          -(halfHeight + top), // y0
          -halfHeight, // y1
          halfHeight, // y2
          halfHeight + (canvasHeight - top - height), // y3
        ].map(Math.ceil),
      };
    },

    /**
     * Stroke border
     * @param {CanvasRenderingContext2D} ctx - Context
     * @param {string|CanvasGradient|CanvasPattern} strokeStyle - Stroke-style
     * @param {number} lineDashWidth - Dash width
     * @param {number} [lineDashOffset] - Dash offset
     * @param {number} [lineWidth] - line width
     * @private
     */
    _strokeBorder(
      ctx: CanvasRenderingContext2D,
      strokeStyle: any,
      { lineDashWidth, lineDashOffset, lineWidth }: any,
    ) {
      const halfWidth = this.width / 2;
      const halfHeight = this.height / 2;

      ctx.save();
      ctx.strokeStyle = strokeStyle;

      if (ctx.setLineDash) {
        ctx.setLineDash([lineDashWidth, lineDashWidth]);
      }
      if (lineDashOffset) {
        ctx.lineDashOffset = lineDashOffset;
      }
      if (lineWidth) {
        ctx.lineWidth = lineWidth;
      }
      ctx.beginPath();
      ctx.moveTo(-halfWidth, -halfHeight);
      ctx.lineTo(halfWidth, -halfHeight);
      ctx.lineTo(halfWidth, halfHeight);
      ctx.lineTo(-halfWidth, halfHeight);
      ctx.lineTo(-halfWidth, -halfHeight);
      ctx.stroke();
      ctx.restore();
    },

    /**
     * onMoving event listener
     * @private
     */
    _onMoving() {
      const { height, width, left, top } = this;
      const { left: imgL, top: imgT, width: imgW, height: imgH } = this.img.getBoundingRect(false, true);
      const maxLeft = imgW + imgL - width;
      const maxTop = imgH + imgT - height;
      this.left = clamp(left, imgL, maxLeft);
      this.top = clamp(top, imgT, maxTop);
      this.canvasEventTrigger[events.OBJECT_MOVED](this);
      updateMaskInnerClipPath(this, this.mask);
    },

    /**
     * onScaling event listener
     * @param {{e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onScaling(fEvent: any) {
      const selectedCorner = fEvent.transform.corner;
      const pointer = this.canvas.getPointer(fEvent.e);
      const settings = this._calcScalingSizeFromPointer(
        pointer,
        selectedCorner,
      );
      // On scaling cropzone,
      // change real width and height and fix scaleFactor to 1
      this.scale(1).set(settings);
      this.canvasEventTrigger[events.OBJECT_SCALED](this);
      updateMaskInnerClipPath(this, this.mask);
    },

    /**
     * Calc scaled size from mouse pointer with selected corner
     * @param {{x: number, y: number}} pointer - Mouse position
     * @param {string} selectedCorner - selected corner type
     * @returns {Object} Having left or(and) top or(and) width or(and) height.
     * @private
     */
    _calcScalingSizeFromPointer(pointer: any, selectedCorner: any) {
      const isCornerTypeValid = cornerTypeValid(selectedCorner);
      return isCornerTypeValid && this._resizeCropZone(pointer, selectedCorner);
    },

    /**
     * Align with cropzone ratio
     * @param {number} width - cropzone width
     * @param {number} height - cropzone height
     * @param {number} maxWidth - limit max width
     * @param {number} maxHeight - limit max height
     * @param {number} scaleTo - cropzone ratio
     * @returns {{width: number, height: number}}
     * @private
     */
    adjustRatioCropzoneSize({
      width,
      height,
      leftMaker,
      topMaker,
      maxWidth,
      maxHeight,
    }: any) {
      width = clamp(width, this.minWidth, maxWidth);
      height = clamp(height, this.minHeight, maxHeight);
      return {
        width,
        height,
        left: leftMaker(width),
        top: topMaker(height),
      };
    },

    /**
     * Get dimension last state cropzone
     * @returns {{rectTop: number, rectLeft: number, rectWidth: number, rectHeight: number}}
     * @private
     */
    _getCropzoneRectInfo() {
      const { width: canvasWidth, height: canvasHeight } = this.canvas;
      const {
        top: rectTop,
        left: rectLeft,
        width: rectWidth,
        height: rectHeight,
      } = this.getBoundingRect(false, true);
      return {
        rectTop,
        rectLeft,
        rectWidth,
        rectHeight,
        rectRight: rectLeft + rectWidth,
        rectBottom: rectTop + rectHeight,
        canvasWidth,
        canvasHeight,
      };
    },

    /**
     * Calc scaling dimension
     * @param {Object} position - Mouse position
     * @param {string} corner - corner type
     * @returns {{left: number, top: number, width: number, height: number}}
     * @private
     */
    _resizeCropZone({ x, y }: any, corner: any) {
      const {
        rectWidth,
        rectHeight,
        rectTop,
        rectLeft,
        rectBottom,
        rectRight,
      } = this._getCropzoneRectInfo();
      const { left: imgL, top: imgT, width: imgWidth, height: imgHeight } = this.img.getBoundingRect(false, true);
      const imgMaxX = imgL + imgWidth;
      const imgMaxY = imgT + imgHeight;
      // eslint-disable-next-line no-nested-ternary
      const realX = x < imgL ? imgL : (x > imgMaxX ? imgMaxX : x);
      // eslint-disable-next-line no-nested-ternary
      const realY = y < imgT ? imgT : (y > imgMaxY ? imgMaxY : y);
      const resizeInfoMap: any = {
        tl: {
          width: rectRight - realX,
          height: rectBottom - realY,
          leftMaker: (newWidth: number) => rectRight - newWidth,
          topMaker: (newHeight: number) => rectBottom - newHeight,
          maxWidth: imgWidth,
          maxHeight: imgHeight,
          scaleTo: getScaleBasis(rectLeft - realX, rectTop - realY),
        },
        tr: {
          width: realX - rectLeft,
          height: rectBottom - realY,
          leftMaker: () => rectLeft,
          topMaker: (newHeight: number) => rectBottom - newHeight,
          maxWidth: imgWidth,
          maxHeight: imgHeight,
          scaleTo: getScaleBasis(realX - rectRight, rectTop - realY),
        },
        mt: {
          width: rectWidth,
          height: rectBottom - realY,
          leftMaker: () => rectLeft,
          topMaker: (newHeight: number) => rectBottom - newHeight,
          maxWidth: imgWidth,
          maxHeight: imgHeight,
          scaleTo: 'height',
        },
        ml: {
          width: rectRight - realX,
          height: rectHeight,
          leftMaker: (newWidth: number) => rectRight - newWidth,
          topMaker: () => rectTop,
          maxWidth: imgWidth,
          maxHeight: imgHeight,
          scaleTo: 'width',
        },
        mr: {
          width: realX - rectLeft,
          height: rectHeight,
          leftMaker: () => rectLeft,
          topMaker: () => rectTop,
          maxWidth: imgWidth,
          maxHeight: imgHeight,
          scaleTo: 'width',
        },
        mb: {
          width: rectWidth,
          height: realY - rectTop,
          leftMaker: () => rectLeft,
          topMaker: () => rectTop,
          maxWidth: imgWidth,
          maxHeight: imgHeight,
          scaleTo: 'height',
        },
        bl: {
          width: rectRight - realX,
          height: realY - rectTop,
          leftMaker: (newWidth: number) => rectRight - newWidth,
          topMaker: () => rectTop,
          maxWidth: imgWidth,
          maxHeight: imgHeight,
          scaleTo: getScaleBasis(rectLeft - realX, realY - rectBottom),
        },
        br: {
          width: x - rectLeft,
          height: y - rectTop,
          leftMaker: () => rectLeft,
          topMaker: () => rectTop,
          maxWidth: imgWidth,
          maxHeight: imgHeight,
          scaleTo: getScaleBasis(realX - rectRight, realY - rectBottom),
        },
      };
      return this.adjustRatioCropzoneSize(resizeInfoMap[corner]);
    },

    /**
     * Return the whether this cropzone is valid
     * @returns {boolean}
     */
    isValid() {
      return (
        this.left >= 0 && this.top >= 0 && this.width > 0 && this.height > 0
      );
    },
  },
);

export default Cropzone;
