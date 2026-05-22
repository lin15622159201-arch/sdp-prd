import { defineStore } from 'pinia';

type StorageType = 'localStorage' | 'sessionStorage';

const usePersistTempDataStore = defineStore('persistTempData', {
  state: () => ({
    storage: Object.create(null),
    storageType: 'sessionStorage' as StorageType,
    isInitialized: false
  }),
  actions: {
    init() {
      if (this.isInitialized) return;
      const storage = window[this.storageType];
      const savedDataStr = storage.getItem('__persist_temp_data__');
      if (savedDataStr) {
        try {
          const savedData = JSON.parse(savedDataStr);
          if (typeof savedData === 'object' && savedData !== null) {
            this.storage = savedData;
          }
        } catch (e) {
          console.error('解析本地存储数据失败，已清空错误数据', e);
          storage.removeItem('__persist_temp_data__');
          this.storage = Object.create(null);
        }
      }
      this.isInitialized = true;
    },

    syncToStorage() {
      const storage = window[this.storageType];
      try {
        if (typeof this.storage === 'object' && this.storage !== null) {
          storage.setItem('__persist_temp_data__', JSON.stringify(this.storage));
        }
      } catch (e) {
        console.error('数据序列化失败（可能包含不可序列化类型）', e);
      }
    },

    // 存数据
    set(key: string, data: any) {
      this.storage[key] = data;
      this.syncToStorage();
    },

    // 取数据
    get(key: string, autoClear = true) {
      if (!this.isInitialized) {
        this.init();
      }
      const data = this.storage[key];
      //   if (data) {
      //     console.log(`成功获取数据（key: ${key}）`)
      //   } else {
      //     console.log(`未找到数据（key: ${key}），可能已被清除或未存储`)
      //   }
      //   if (autoClear) {
      //     this.remove(key)
      //   }
      return data;
    },

    // 删数据（保持不变）
    remove(key: string) {
      delete this.storage[key];
      this.syncToStorage();
    },

    // 清空所有数据
    clearAll() {
      this.storage = Object.create(null);
      window[this.storageType].removeItem('__persist_temp_data__');
    },

    setStorageType(type: StorageType) {
      this.storageType = type;
      this.isInitialized = false;
      this.init();
    }
  }
});

export default usePersistTempDataStore;
