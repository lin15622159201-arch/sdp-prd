<template>
  <div :class="item.props?.filterable && item.props?.props?.multiple ? 'noPlaceholder' : ''">
    <el-cascader
      v-model="model[item.key]"
      v-bind="item.props"
      :options="tree"
      :props="item.props?.props || {
        label: 'value',
        value: 'value'
      }"
      :placeholder="item.props?.placeholder ?? `请筛选 ${item.label}`"
      :style="item.props?.style || ''"
      @change="(val: any) => handleChange(val)"
      @expand-change="(val: any) => handleExpandChange(val)"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject, computed, toRaw, toRef } from 'vue';
import type { FormContext, FormItem } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../extends';
import type { IdictValuesItemNode } from '@/components/custom-form/hooks/use-dict/utils';
import { arrayToTree, fixTreeLayer } from '@/components/custom-form/hooks/use-dict/utils';
import * as _ from 'lodash-es';
import { DICTIONARY_KEY } from '@/constant/dictionary';

export default defineComponent({
  name: 'CuCategory',
  components: {
  },
  extends: { ...linkKeyValue },
  props: {
    item: { // formItem 对象
      required: true,
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
  },
  setup(props) {
    const _item = toRef(props, 'item');
    /* form 组件环境 */
    const {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
    } = inject<FormContext>('form-context', formContextDefault);

    type MapRender = Record<string, () => IdictValuesItemNode[]>;
    /* ops 字典级联 */
    const cascaderFormat = _item.value?.customParams?.cascaderFormat || (v => v);
    const outputTree = (dict: string) => {
      return () => {
        const node = arrayToTree(
          _.cloneDeep(dictList.value[dict] || []),
          'valueCode',
          'valueParentCode',
        );
        return fixTreeLayer(node, _item.value.cascaderLayer);
      };
    };
    const treeMapRender: MapRender = {
      /* 款式品类 */
      pims_category: outputTree(DICTIONARY_KEY.PIMS_CATEGORY),
      /* 需求类型 */
      plm_demand_type: outputTree(DICTIONARY_KEY.PLM_DEMAND_TYPE),
      /* 尺码标准 + 尺码 */
      plm_standard_size: () => {
        const node = arrayToTree(
          _.cloneDeep(dictList.value[DICTIONARY_KEY.PLM_STANDARY_SIZE] || []),
          'valueCode',
          'valueParentCode',
        );
        node.forEach((sizeStandard) => {
          const sizes = (sizeStandard?.children?.[0]?.value?.split(',') || []).filter(Boolean);
          toRaw(sizeStandard).children = sizes.map((size: string) => {
            return { value: size, valueCode: size } as IdictValuesItemNode;
          });
        });
        return fixTreeLayer(node, _item.value.cascaderLayer);
      },
      plm_clothing_style: outputTree(DICTIONARY_KEY.PLM_CLOTHING_STYLE),
      plm_clothing_band: outputTree(DICTIONARY_KEY.PLM_CLOTHING_BAND),
    };

    const tree = computed(() => {
      const dictCode = props.item.dictCode || '';
      const isRender = dictList.value[dictCode] && treeMapRender[dictCode];
      const renderNodes = isRender ? isRender() : [];
      // const renderNodes = toRaw(treeData.value) || [];
      // console.log(renderNodes, 'renderNodes');

      return cascaderFormat(props.item?.tree || renderNodes);
    });

    /* 事件 */
    const handleChange = (val: string[]) => props.item?.change?.(val, form);
    const handleExpandChange = (val: string[]) => props.item?.expandChange?.(val, form);

    return {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
      tree,
      handleChange,
      handleExpandChange,
    };
  },
});
</script>

<style scoped lang="scss">
// 屏蔽以解决当前组件版本 placeholder 显示bug
.noPlaceholder {
  :deep(.el-cascader) {
    &:focus-within {
      .el-input__inner {
        &::placeholder {
          color: rgba(255, 255, 255, 0);
        }
      }
    }
  }
}
</style>
