import { computed } from 'vue';
import { has } from '@/core/plugins/filter';

/**
 * 把权限code转换成 computed 结果
 */
export default function usePermission<T extends Record<string, string>, K extends keyof T>(
  permissionConf: T,
) {
  const permissionRef = computed(() => {
    const _permission = Object.create(null) as Record<K, boolean>;

    const getPermission = (key: string) => {
      const res = has(key);
      // 方便开发调试
      if (process.env.NODE_ENV === 'development') {
        if (!res) {
          console.warn(`未查询到权限code -- ${key}`);
        }
        return true;
      }
      return res;
    };

    Object.keys(permissionConf).forEach((key) => {
      _permission[key as unknown as K] = getPermission(permissionConf[key]);
    });

    return _permission;
  });

  return {
    permissionRef,
  };
}
