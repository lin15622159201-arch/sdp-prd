/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
interface IDevice {
  isAndroid: boolean;
  isIOS: boolean;
}

function getDevice() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  return {
    isAndroid,
    isIOS,
  };
}

// 触发 register 方法参数
export interface IRegisterParams {
  // 提供 app 调用 receiveMessage 方法的 callbackKey
  callbackKey: string;
  // 回调方法
  callback: (...args: any[]) => any;
}

// 触发 invoke 方法参数
export interface IInvokeParams {
  // 提供 app 调用 receiveMessage 方法的 callbackKey
  bridgeName: string;
  // 传递给app 的参数
  data?: { [key: string]: any; };
  // 回调方法
  callback?: (params?: any) => void;
  // ios 原生支持直接使用对象传参 flutter 不支持使用对象传参数
  iosIsJson?: boolean;
}

// 触发 receiveMessage 方法参数
export interface IReceiveMessageParams {
  // 调用回调的 key
  callbackKey: string;
  // app 传递回来的参数
  data?: { [key: string]: any; };
}

export interface JSBridgeConstructor {
  device: IDevice | null;
  register(data: IRegisterParams): void;
  invoke(data: IInvokeParams): void;
  remove(callbackKey: string): void;
  receiveMessage(data: IReceiveMessageParams): void;
}

export class JSBridge implements JSBridgeConstructor {
  // 自增id 防止重名
  private id = 0;

  // 主动触发 APP方法的回调集合
  private callbacks = {} as Record<string, (...args: any[]) => void>;

  // 主动注册 提供APP调用方法回调集合
  private registerCallbacks = {} as Record<string, (...args: any[]) => void>;

  // 主动触发 APP方法的回调集合
  device: IDevice | null = getDevice();

  /**
   * 主动注册回调函数 提供 APP 直接调用
   */
  register = ({ callbackKey, callback }: IRegisterParams) => {
    if (!callbackKey || !callback) {
      console.warn('window.JSBridge.register() was miss bridgeName or callback!');
      return;
    }
    this.registerCallbacks[callbackKey] = callback;
  };

  /**
   * 注册回调函数 & 调用 Native 的方法
   *
   * @param {*} { bridgeName, data = {}, callback }
   */
  invoke = ({ bridgeName, data = {}, callback, iosIsJson = false }: IInvokeParams) => {
    if (!bridgeName) {
      console.warn('window.JSBridge.invoke() was miss bridgeName!');
      return;
    }

    // 存储 callback
    this.id += 1;
    const cbKey = `${bridgeName}-${this.id}`;

    if (callback) {
      this.callbacks[cbKey] = callback;
    }

    const params = {
      bridgeName,
      callbackKey: cbKey,
      data,
    };

    console.log('invoke params =>>', params);

    try {
      // 判断环境，获取不同的 nativeBridge
      if (this.device?.isAndroid) {
        // Android 只能接收字符串
        window?.h5_Android[bridgeName](JSON.stringify(params));
      } else if (this.device?.isIOS) {
        window?.webkit?.messageHandlers[bridgeName].postMessage(iosIsJson ? JSON.stringify(params) : params);
      } else {
        console.warn(`Not support native's ${bridgeName} func!`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 移除 已注册的回调函数
   *
   * @param {*} callbackKey
   */
  remove = (callbackKey: string) => {
    console.log('callbackKey =>>', callbackKey);
    delete this.callbacks[callbackKey];
  };

  /**
   * 接收 Native 的回调 & 处理实际要回调的函数
   *
   * @param {*} { callbackKey, data = {} }
   */
  receiveMessage = ({ callbackKey, data }: IReceiveMessageParams) => {
    console.log(`callbackKey =>> ${callbackKey}, `);

    if (!callbackKey) return;

    // 调用方法回调
    if (this.callbacks[callbackKey]) {
      this.callbacks[callbackKey](data);
      this.remove(callbackKey);
      return;
    }

    // 注册方法回调
    if (this.registerCallbacks[callbackKey]) {
      this.registerCallbacks[callbackKey](data);
      return;
    }

    console.warn(`Not fund callbackKey[${callbackKey}]`);
  };

  /**
   * 获取 当前暂存的回调函数
   */
  _getCallbacks = () => {
    return this.callbacks;
  };
}

// 注册 JSBridge
export const JSBridgeInstance = new JSBridge();
window.JSBridge = JSBridgeInstance;
