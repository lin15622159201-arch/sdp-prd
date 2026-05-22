import usePersistTempDataStore from '../../../stores/persistTempDataStore';

export default function usePersistTempData() {
  const store = usePersistTempDataStore();
  
  if (!store.isInitialized) {
    store.init();
  }

  return {
    set: (key: string, data: any) => store.set(key, data),
    get: (key: string, autoClear = true) => store.get(key, autoClear),
    remove: (key: string) => store.remove(key),
    clearAll: () => store.clearAll(),
    setStorageType: (type: any) => store.setStorageType(type)
  };
}
