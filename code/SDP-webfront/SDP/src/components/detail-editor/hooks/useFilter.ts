import { fabric } from '@/fabric';

export default function useFilter() {
  const createMaskFilter = () => {
    // @ts-ignore
    fabric.Image.filters.DetailMaskFilter = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
      type: 'DetailMaskFilter',
      /**
       * Fragment source for the redify program
       */
      fragmentSource:
        'precision highp float;\n'
        + 'uniform sampler2D uTexture;\n'
        + 'varying vec2 vTexCoord;\n'
        + 'void main() {\n'
        + '  vec4 color = texture2D(uTexture, vTexCoord);\n'
        + '  float gray = (color.r + color.g + color.b) / 3.0;\n'
        + '  if (gray == 0.0) {\n' // 将黑色透明度改成0
        + '    color.a = 0.0;\n'
        + '  } else {\n' // 将其他颜色亮度降低
        + '    color.r = color.r * 0.2;\n'
        + '    color.g = color.g * 0.2;\n'
        + '    color.b = color.b * 0.2;\n'
        + '  }\n'
        + '  gl_FragColor = color;\n'
        + '}',
    });
    // @ts-ignore
    fabric.Image.filters.MaskFilter.fromObject = fabric.Image.filters.BaseFilter.fromObject;
    // @ts-ignore
    return new fabric.Image.filters.DetailMaskFilter();
  };

  return {
    createMaskFilter,
  };
}
