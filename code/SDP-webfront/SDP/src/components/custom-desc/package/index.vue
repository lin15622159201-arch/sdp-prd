<template>
  <el-descriptions
    :class="[`label-width-${labelWidth}`, `column-width-${column}`]"
    :column="column"
    v-bind="$attrs"
  >
    <el-descriptions-item
      v-for="(desc, i) in descList_"
      :key="i"
      :label="`${desc?.label || ''}：`"
    >
      <template v-if="desc?.key && $slots[desc?.key]">
        <slot :name="desc?.key" :row="desc" />
      </template>
      <span v-else-if="desc?.text">{{ desc?.text }}</span>
      <span v-else>-</span>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import type { Desc, CustomObj, MapValueObj, Format } from './types';
import formas from './format';

export default defineComponent({
  name: 'CustomDesc',
  props: {
    data: { // 对象信息
      type: Object as PropType<CustomObj>,
      default: () => ({}),
    },
    keyMap: { // 需要呈现的（key : 中文）
      type: Object as PropType<CustomObj<string | MapValueObj>>,
      default: () => ({}),
    },
    labelWidth: {
      type: Number as PropType<80 | 100 | 120>,
      default: 100,
    },
    column: { // 呈现列数
      type: Number as PropType<2 | 3 | 4>,
      default: 3,
    },
  },
  setup(props) {
    const descList_ = computed(() => {
      const descList: Desc[] = [];
      Object.keys(props.keyMap).forEach((key) => {
        const mapVal = props.keyMap[key];
        const dataVal = props.data[key];
        let zhText = mapVal as string;
        let formatType = '';
        let codeKey = '';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let formatterFn = (v: any, ...arg: any[]) => v;

        if (typeof mapVal === 'object') {
          const {
            label = '',
            type = '',
            code = '',
            formatter,
          } = mapVal;
          zhText = label;
          formatType = type;
          codeKey = code;
          if (formatter) formatterFn = formatter;
        }

        if (zhText) {
          const desc: Desc = {
            label: zhText,
            key,
            text: '',
            value: {},
          };

          const innerFormat = formas[formatType as Format];
          if (innerFormat) formatterFn = innerFormat;

          const targetKey = (typeof dataVal === 'object' ? 'value' : 'text') as keyof Desc;
          desc[targetKey] = formatterFn(dataVal, props.data, codeKey, mapVal) as any;

          descList.push(desc);
        }
      });
      return descList;
    });
    return {
      descList_,
    };
  },
});
</script>
