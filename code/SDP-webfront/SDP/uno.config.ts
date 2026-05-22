import { defineConfig, presetUno, transformerDirectives } from 'unocss';

export default defineConfig({
  presets: [
    presetUno({
      prefix: 'tw-',
      content: [
        './index.html',
        './src/**/*.{jsx,tsx,vue,ts}',
      ],
    }),
  ],
  theme: {
    colors: {
      primary: 'var(--el-color-primary)',
      success: 'var(--el-color-success)',
      danger: 'var(--el-color-danger)',
      warning: 'var(--el-color-warning)',
      info: 'var(--el-color-info)',
      title: 'var(--custom-color-title)',
      sub: 'var(--custom-color-sub)',
    },
  },
  shortcuts: {
    /** flex 水平居中 */
    'tw-flex-center-x': 'tw-flex tw-justify-center',
    /** flex 垂直居中 */
    'tw-flex-center-y': 'tw-flex tw-items-center',
    /** flex 水平垂直居中 */
    'tw-flex-center-xy': 'tw-flex tw-justify-center tw-items-center',
    /** absolute 水平居中 */
    'tw-absolute-center-x': 'tw-absolute tw-left-[50%] tw-translate-x-[-50%]',
    /** absolute 水平垂直 */
    'tw-absolute-center-y': 'tw-absolute tw-top-[50%] tw-translate-y-[-50%]',
    /** absolute 水平垂直居中 */
    'tw-absolute-center-xy': 'tw-absolute tw-top-[50%] tw-left-[50%] tw-translate-[-50%]',
  },
  transformers: [
    transformerDirectives()
  ],
});
