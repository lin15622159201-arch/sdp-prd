import { watchDebounced } from '@vueuse/core';
import { nextTick, shallowRef, reactive } from 'vue';
import type { WatchStopHandle } from 'vue';

export interface Options {
  /**
   * 有效时间（毫秒）
   */
  expireTime?: number;
  /**
   * 是否监听变化 同步到 `sessionStorage` 中
   */
  watch?: boolean;
}

interface ResTimeData {
  __expireTime__: number;
  __startTime__: number;
}

/**
 * 用于全局监听 window storage事件
 */
const handleSessionEvent = (resolve: (value: unknown) => void) => (event: StorageEvent) => {
  if (event.key === 'getSessionStorage') {
    // 已存在的标签页会收到这个事件
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    localStorage.removeItem('sessionStorage');
    resolve(null);
  } else if (event.key === 'sessionStorage' && !sessionStorage.length) {
    // 新开启的标签页会收到这个事件
    const data = JSON.parse(event.newValue!);

    Object.entries(data).forEach(([key, val]) => {
      sessionStorage.setItem(key, <string>val);
    });

    resolve(null);
  }
};

// 上一次使用的，只是用于储存window storage事件方法，单例
let lastFunc = null as null | ((event: StorageEvent) => void);

async function handleSession<T>(
  key: string,
  handleGet: () => T | Promise<T>,
  opts?: Options,
): Promise<T> {
  let { expireTime } = opts || {};
  expireTime = typeof expireTime === 'number' ? expireTime : 0;

  // 从 sessionStorage 中读取数据
  const dataStr = sessionStorage.getItem(key);
  // 对应的 sessionStorage 的过期时间 数据key
  const timeDataKey = `${key}__${expireTime}`;
  const timeData = (() => {
    const timeDataStr = sessionStorage.getItem(timeDataKey);
    if (!timeDataStr) return null;
    try {
      return JSON.parse(timeDataStr) as ResTimeData;
    } catch (e) {
      return null;
    }
  })();
  const stopHandler = shallowRef<WatchStopHandle>();

  const resData = opts?.watch
    ? reactive({
      data: null as any,
    })
    : {
      data: null as any,
    };
  const handleWatch = () => {
    if (!opts?.watch) {
      return;
    }
    stopHandler.value = watchDebounced(() => resData.data, () => {
      nextTick(() => {
        if (timeData) {
          const { __expireTime__, __startTime__ } = timeData;
          const now = Date.now();
          // 计算是否过期
          if ((now - __startTime__) >= __expireTime__) {
            // 过期不再监听
            stopHandler.value!();
          }
        }
      });
      sessionStorage.setItem(key, JSON.stringify(resData.data));
    }, {
      deep: true,
      flush: 'post',
    });
  };

  if (dataStr) {
    resData.data = JSON.parse(dataStr);
    /**
     * 判断是否过期
     *
     * 没有设置过期时间 和 没过期都是false
     *
     * 过期 - true
     */
    const isExpired = (() => {
      if (!expireTime) {
        return false;
      }
      if (timeData) {
        const { __expireTime__, __startTime__ } = timeData;
        const now = Date.now();
        // 计算是否过期
        if ((now - __startTime__) < __expireTime__) {
          return false;
        }
      }
      return true;
    })();
    // 没有过期时间直接返回数据
    if (!isExpired) {
      handleWatch();
      return resData.data;
    }
  }

  const res = await handleGet();
  resData.data = res;
  handleWatch();

  sessionStorage.setItem(key, JSON.stringify(resData.data));

  if (expireTime) {
    sessionStorage.setItem(timeDataKey, JSON.stringify({
      __expireTime__: expireTime,
      __startTime__: Date.now(),
    }));
  }

  return resData.data as T;
}

/**
 * sessionStorage存储、通讯（浏览器之间页签）
 */
export default function sessionSharing<T>(
  key: string,
  handleGet: () => T | Promise<T>,
  opts?: Options,
) {
  return new Promise((resolve) => {
    if (!('sessionStorage' in window)) {
      resolve(null);
      return;
    }

    if (!sessionStorage.length) {
      localStorage.setItem('getSessionStorage', `${Date.now()}`);
      // 防止Promise没有被释放
      setTimeout(() => resolve(null), 200);
    } else {
      resolve(null);
    }

    if (lastFunc) {
      window.removeEventListener('storage', lastFunc);
    }
    lastFunc = handleSessionEvent(resolve);
    window.addEventListener('storage', lastFunc);
  })
    .then(() => handleSession(key, handleGet, opts));
}
