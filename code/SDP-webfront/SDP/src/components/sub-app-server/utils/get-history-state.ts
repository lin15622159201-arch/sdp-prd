export default function getHistoryState() {
  const bindHistoryEvent = function (type: keyof History) {
    const historyEvent = window.history[type];
    return function (this: Window, ...args: unknown[]) {
      // 执行history函数
      const newEvent = historyEvent.apply(this, args);
      // 声明自定义事件
      const e = new Event(type);
      // eslint-disable-next-line prefer-rest-params
      (e as any).arguments = arguments;
      window.dispatchEvent(e);
      // 返回方法，用于重写history的方法
      return newEvent;
    };
  };

  window.history.pushState = bindHistoryEvent('pushState');
  window.history.replaceState = bindHistoryEvent('replaceState');
}
