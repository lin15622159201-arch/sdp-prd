// 绘制水印
const drawMask = (context, canvas, maskContent) => {
  const { width, height } = canvas;
  context.save();
  context.translate(width - 30, height);
  context.rotate((Math.PI / 180) * 25);
  context.textAlign = 'right';
  context.strokeStyle = '#999';
  context.font = '24px serif';
  context.globalAlpha = 0.1;
  context.strokeText(maskContent, 0, 0);
  context.restore();
};
onmessage = async (e) => {
  const {
    file,
    needMask,
    maskContent,
    compress: { compressWidth = 1000, isCompress = false },
  } = e.data;
  try {
    const image = await createImageBitmap(file);
    const w = image.width;
    const h = image.height;
    let targetWidth = w;
    let targetHeight = h;
    // 需要压缩则处理分辨率
    if (isCompress) {
      targetWidth = compressWidth > w ? w : compressWidth;
      targetHeight = (targetWidth * h) / w;
    }
    const canvas = new OffscreenCanvas(targetWidth, targetHeight);
    const quality = 0.92; // 默认图片质量为0.92
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0, targetWidth, targetHeight);
    // 是否添加水印
    if (needMask) {
      drawMask(ctx, canvas, maskContent);
    }
    const blob = await canvas.convertToBlob({ type: file.type, quality });
    postMessage({ files: blob, type: 'success' });
  } catch (error) {
    postMessage({ type: 'error' });
  }
};
