import xss, { FilterXSS, getDefaultWhiteList, getDefaultCSSWhiteList } from 'xss';

const xssFilter = new FilterXSS({
  whiteList: {
    ...getDefaultWhiteList(),
    span: ['class'],
  },
});

const xssRich = (html: string) => xss(html, {
  whiteList: {
    ...getDefaultWhiteList(),
    p: ['style'],
    span: ['style', 'class'],
    font: ['style', 'color'],
    xmp: [],
  },
  css: {
    whiteList: {
      ...getDefaultCSSWhiteList(),
      'line-height': true,
    },
  },
});

export {
  xssFilter,
  xssRich,
};
