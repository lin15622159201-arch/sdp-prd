import { imageDataUrlToOssUrl } from '@/core/utils/image';
import { reactive, Ref, ref } from 'vue';

export const useColor = (formData: Ref<Record<string, any>>, onColorChange: () => void) => {
  const color = ref<string>('');
  const activeColorIndex = ref<number>(0);
  const colorPicker = reactive({
    visible: false,
    url: '',
  });

  /**
 * 纯色图案选择颜色
 */
  async function handleColorAdd(_color: string | null) {
    if (!_color) return;
    formData.value.targetColorUrls.push(_color);
    activeColorIndex.value = formData.value.targetColorUrls.length - 1;
    onColorChange();
  }

  const handleColorRemove = async (index: number) => {
    formData.value.targetColorUrls.splice(index, 1);
    if (activeColorIndex.value > index || (activeColorIndex.value === index && activeColorIndex.value > 0)) {
      activeColorIndex.value -= 1;
    }
    onColorChange();
  };

  /**
   * 生成纯色图案dataUrl
   * @param _color
   */
  async function generateColorDataUrl(_color: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = _color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  }

  /**
   * 颜色转换成oss地址
   */
  const exchangeColorToUrl = async (_color: string) => {
    if (_color?.startsWith('http')) return _color;
    const url = await generateColorDataUrl(_color);
    return imageDataUrlToOssUrl(url);
  };

  /**
   * 点击从图片中选取颜色
   */
  const handlePickColorFromImage = (url?: string) => {
    colorPicker.url = url || '';
    colorPicker.visible = true;
  };

  return {
    color,
    colorPicker,
    activeColorIndex,
    handleColorAdd,
    handleColorRemove,
    exchangeColorToUrl,
    handlePickColorFromImage
  };
};
