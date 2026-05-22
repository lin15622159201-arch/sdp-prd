import { jsPDF as JsPDF } from 'jspdf';
import html2canvas, { Options } from 'html2canvas';

/**
 * DOM 转 PDF 文件下载
 *
 * @param {HTMLElement} html html 节点
 * @param {string} fileName 下载文件名
 * @param {boolean} [isOne=false] 是否单页
 */
export const exportPdf = async (html: any, fileName: string, isOne: boolean = false) => {
  let contentWidth = html.clientWidth * 2; // 获得该容器的宽
  let contentHeight = html.clientHeight * 2; // 获得该容器的高
  const canvas = document.createElement('canvas');
  canvas.width = contentWidth * 2;
  canvas.height = contentHeight * 2;
  canvas.getContext('2d');

  const canvasOptions: Partial<Options> = {
    canvas,
    width: contentWidth,
    height: contentHeight,
    useCORS: true,
    /** 部分设备系统设置的放大倍数不一致 会导致导出的内容不完整 */
    scale: 4,
  };

  const _canvas = await html2canvas(html, canvasOptions);
  const pageData = _canvas.toDataURL('image/jpeg', 1.0); // 清晰度 0 - 1
  let pdf;

  if (isOne) {
    // jspdf.js 插件对单页面的最大宽高限制 为 14400
    const limit = 14400;

    if (contentHeight > limit) {
      const contentScale = limit / contentHeight;
      contentHeight = limit;
      contentWidth *= contentScale;
    }

    let orientation = 'p';
    // 在 jspdf 源码里，如果是 orientation = 'p' 且 width > height 时， 会把 width 和 height 值交换，
    // 类似于 把 orientation 的值修改为 'l' , 反之亦同。
    if (contentWidth > contentHeight) {
      orientation = 'l';
    }

    // orientation Possible values are "portrait" or "landscape" (or shortcuts "p" or "l")
    pdf = new JsPDF(orientation as any, 'pt', [contentWidth * 2, contentHeight * 2]); // 下载尺寸 a4 纸 比例

    // pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
    pdf.addImage(pageData, 'JPEG', 0, 0, contentWidth, contentHeight);
  } else {
    // 一页 pdf 显示 html 页面生成的 canvas高度
    const pageHeight = (contentWidth / 552.28) * 841.89;
    // 未生成 pdf 的 html页面高度
    let leftHeight = contentHeight;
    // 页面偏移
    let position = 0;
    // a4纸的尺寸[595.28,841.89]，html 页面生成的 canvas 在pdf中图片的宽高
    const imgWidth = 555.28;
    const imgHeight = (imgWidth / contentWidth) * contentHeight;

    pdf = new JsPDF('' as any, 'pt', 'a4'); // 下载尺寸 a4 纸 比例
    // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    // 当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        // 避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }
  }

  pdf.save(fileName);
};
