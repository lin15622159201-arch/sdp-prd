import { BRUSH_COLOR, GRAY_BOUNDARY } from '../config';
import { fabric } from '@/fabric';

export default function useFilter() {
  const createMaskFilter = () => {
    // @ts-ignore
    fabric.Image.filters.MaskFilter = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
      type: 'MaskFilter',
      /**
       * Fragment source for the redify program
       */
      fragmentSource:
        'precision highp float;\n'
        + 'uniform sampler2D uTexture;\n'
        + 'varying vec2 vTexCoord;\n'
        + 'void main() {\n'
        + '  vec4 color = texture2D(uTexture, vTexCoord);\n'
        + '  float gray = (color.r + color.g + color.b) / 3.0;\n' // 计算灰度 0 ~ 1 的数值
        + `  color.r = ${BRUSH_COLOR.r}.0/255.0;\n`
        + `  color.g = ${BRUSH_COLOR.g}.0/255.0;\n`
        + `  color.b = ${BRUSH_COLOR.b}.0/255.0;\n`
        + `  if (gray >= ${GRAY_BOUNDARY.PERCENT}.0) {\n` // 纯色部分不透明度为 BRUSH_COLOR.a
        + `    color.a = ${BRUSH_COLOR.a}.0/255.0;\n`
        + '  } else {\n'
        + `    color.a = (${BRUSH_COLOR.a}.0/255.0) * gray;\n` // 基于灰度值设置 alpha 透明度
        + '  }\n'
        + '  gl_FragColor = color;\n'
        + '}',
    });
    // @ts-ignore
    fabric.Image.filters.MaskFilter.fromObject = fabric.Image.filters.BaseFilter.fromObject;
    // @ts-ignore
    return new fabric.Image.filters.MaskFilter();
  };

  return {
    createMaskFilter,
  };
}
