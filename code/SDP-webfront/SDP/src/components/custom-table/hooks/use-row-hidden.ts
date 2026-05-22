import { isString, isBoolean, isArray } from 'lodash-es';
import type { Ref } from 'vue';
import { ref, computed, isRef } from 'vue';
import type { IColumnProp } from '../types';

type IHiddenObj = Record<string, boolean>;

type IKeyMap = Record<string, number>;

export default function useRowHidden(columns: Ref<IColumnProp[]>) {
  const hiddenObj = ref<IHiddenObj>({});

  const keyMap = computed(() => {
    const _keyMap: IKeyMap = Object.create(null);

    columns.value.forEach((item, i) => {
      if (item.prop) {
        _keyMap[item.prop! as string] = i;
      }
    });

    return _keyMap;
  });

  const getHiddenStatus = (prop: string, hidden?: boolean) => {
    if (isBoolean(hidden)) {
      return hidden;
    }
    const _hiddenStatus = hiddenObj.value[prop];

    if (isBoolean(_hiddenStatus)) {
      return !_hiddenStatus;
    }
    return false;
  };

  const setStatus = (prop: string, hidden: boolean) => {
    const i = keyMap.value[prop];
    if (!columns.value[i]) return;
    columns.value[i].hidden = hidden;
    hiddenObj.value[prop] = hidden;
  };

  /**
   * 触发显隐
   * @param propKeys prop值 (若是 boolean 则设置所有)
   * @param hidden 是否隐藏
   */
  const toggleRowHidden = (propKeys: string | string[] | boolean, hidden?: boolean) => {
    let _keys: string[] = [];
    let isAllKeys = false;

    if (isString(propKeys)) {
      _keys = [propKeys];
    } else if (isArray(propKeys)) {
      _keys = propKeys;
    } else if (isBoolean(propKeys)) {
      isAllKeys = true;
      _keys = columns.value.map(item => item.prop || '') as string[];
    }

    const _status = isAllKeys ? (propKeys as boolean) : hidden;

    _keys.forEach((prop) => {
      if (prop) {
        const hiddenStatus = getHiddenStatus(prop, _status);
        setStatus(prop, hiddenStatus);
      }
    });
  };

  const getStatus = (prop: string, hidden?: boolean) => {
    if (prop) {
      const getHidden = (_hidden?: boolean | Ref<boolean>) => {
        return isRef(_hidden) ? _hidden.value : _hidden;
      };

      const _hidden = getHidden(hidden);
      const hiddenStatus = isBoolean(_hidden)
        ? _hidden as boolean
        : hiddenObj.value[prop] || false;

      setStatus(prop, hiddenStatus);
      return hiddenStatus;
    }
    return false;
  };

  return {
    toggleRowHidden,
    getStatus,
  };
}
