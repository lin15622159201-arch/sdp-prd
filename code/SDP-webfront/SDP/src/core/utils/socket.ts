const noop = () => {};

interface IOptions {
  /** 重连间隔时间 */
  timeout?: number;
  /** 重连最大次数 */
  maxAttempts?: number;
  /** 下行消息 */
  onMessage: WebSocket['onmessage'];
  /** 连接断开 */
  onClose?: WebSocket['onclose'];
  /** 连接出错 */
  onError?: WebSocket['onerror'];
  /** 连接打开 */
  onOpen?: WebSocket['onopen'];
  /** 重连 */
  onReconnect?: (e: any) => void;
  /** 已达到最大次数 */
  onMaximum?: (e: any) => void;
}

export default class Socket {
  ws: InstanceType<typeof WebSocket> | null = null;

  num: number = 0;

  url: string = '';

  maxAttempts: number;

  opts: any;

  timeout: number;

  constructor(url: string, opts: IOptions) {
    this.url = url;
    this.opts = opts;
    this.timeout = opts.timeout || 1000;
    this.maxAttempts = opts.maxAttempts || 3;
  }

  async open() {
    this.ws = new window.WebSocket(this.url);
    this.ws.onmessage = (data: MessageEvent) => {
      (this.opts.onMessage || noop)(data);
    };
    this.ws.onclose = (e: any) => {
      console.log('----onclose---', e.code);
      // @ts-ignore
      if (e.code !== 1e3 && e.code !== 1005) {
        this.reconnect(e);
      }
      (this.opts.onClose || noop)(e);
    };
    this.ws.onerror = (e: any) => {
      console.log('----onerror---', e.code);
      e && e.code === 'ECONNREFUSED'
        ? this.reconnect(e)
        : (this.opts.onError || noop)(e);
    };
    this.ws.onopen = (e: any) => {
      // this.num = 0;
      (this.opts.onOpen || noop)(e);
    };
  }

  reconnect(e: any) {
    // eslint-disable-next-line no-plusplus
    this.num++ < this.maxAttempts
      ? setTimeout(() => {
        (this.opts.onReconnect || noop)(e);
        this.open();
      }, this.timeout)
      : (this.opts.onMaximum || noop)(e);
  }

  send(data: any) {
    this.ws?.send(JSON.stringify(data));
  }

  close(a?: any, b?: any) {
    this.ws?.close(a, b);
  }
}
