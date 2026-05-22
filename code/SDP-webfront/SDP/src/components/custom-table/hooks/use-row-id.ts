import { computed, ref } from 'vue';
import type { IColumnProp } from '../types';
import { watchArray } from '@vueuse/core';
import { v4 as uuid } from 'uuid';

interface IProps {
  data: any[];
  column: IColumnProp[];
  useFormValidation: boolean;
  [k: string]: any;
}

export function useRowId(props: IProps) {
  const uuidList = ref<Record<string, string>[]>([]);

  const columnPropKeys = computed(() => {
    return props.column.map(item => item.prop).filter((v): v is string => Boolean(v));
  });

  watchArray(() => props.data, (newList, oldList, added, removed) => {
    if (removed?.length && oldList?.length) {
      removed.forEach((item) => {
        const index = oldList.indexOf(item);

        if (index > -1) {
          uuidList.value.splice(index, 1);
        }
      });
    }
    if (added?.length && newList.length) {
      added.forEach((item) => {
        const index = newList.indexOf(item);
        const rowObj: Record<string, string> = {};
        columnPropKeys.value.forEach((key) => {
          rowObj[key] = `${key}__${uuid()}`;
        });
        uuidList.value.splice(index, 0, rowObj);
      });
    }
  }, {
    immediate: true,
    deep: true,
  });

  return {
    uuidList,
  };
}
