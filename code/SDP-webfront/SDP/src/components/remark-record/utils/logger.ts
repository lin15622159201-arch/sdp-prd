const logPrefix = ['%c[remark-record]:', 'font-weight: bolder; color: blue'];
const isDev = process.env.NODE_ENV === 'development';

const logger = {
  log(...args: any[]) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log(...logPrefix, ...args);
    }
  },
  warn(...args: any[]) {
    if (isDev) {
      console.warn(...logPrefix, ...args);
    }
  },
  error(...args: any[]) {
    console.error(...logPrefix, ...args);
  },
};

export default logger;
