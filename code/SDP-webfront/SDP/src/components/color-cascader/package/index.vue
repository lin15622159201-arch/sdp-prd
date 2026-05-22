<template>
  <el-cascader
    v-bind="$attrs"
    v-model="colors"
    clearable
    :options="(CLOTHING_COLOR as any)"
    :props="colorProps"
  >
    <template #default="{ node, data }">
      <p class="tw-w-full tw-flex tw-align-item-center">
        <span v-if="node.isLeaf" class="tw-w-30px tw-h-30px tw-mr-5px">
          <el-tooltip
            effect="light"
            placement="top"
            v-if="data.coverUrl"
          >
            <template #content>
              <el-image
                :src="resizeImgByWidth(data.coverUrl, 200)"
                fit="cover"
                class="tw-w-200px tw-h-200px"
                preview-teleported
              />
            </template>
            <el-image
              :src="resizeImgByWidth(data.coverUrl, 30)"
              fit="cover"
              class="tw-w-30px tw-h-30px tw-rounded-4px cover"
              preview-teleported
            />
          </el-tooltip>
        </span>
        <span class="tw-flex-1">{{ data.label }}</span>
      </p>
    </template>
  </el-cascader>
</template>

<script lang="ts">
import { resizeImgByWidth } from '@/core/plugins/helper';
import { CascaderProps } from 'element-plus';
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { useColorOptions } from './use-color-options';

export default defineComponent({
  name: 'ColorCascader',
  components: {
    //
  },
  props: {
    modelValue: {
      type: [Array, String] as PropType<string | string[]>,
      default: () => [],
    },
    /**
     * 是否全部都可以选择，true=列表搜索的时候全部可选择，false=编辑时候跟回disabled
     * @default false
     */
    isCanSelectedAll: {
      type: Boolean,
      default: false,
    },
    colorProps: {
      type: Object as PropType<CascaderProps>,
      default: () => ({
        label: 'label',
        value: 'value',
      }),
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const colors = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit('update:modelValue', value);
      },
    });
    const { isCanSelectedAll } = toRefs(props);
    const { CLOTHING_COLOR } = useColorOptions({
      isCanSelectedAll
    });
    return {
      colors,
      CLOTHING_COLOR,
      resizeImgByWidth,
    };
  },
});
</script>

<style scoped lang="scss">
$gap: 15px;
$width: 100px;
$radius: 3px;
/* 背景 */
.back {
  padding: $gap;
  margin-bottom: $gap;
  border-radius: $radius;
  padding-top:20px;
}
.default {
  background: #f2f7fb;
}
.light {
  background: #fff;
}
.border {
  border: 1px solid #e1e2e4;
}
/* 标题 */
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .header-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title{
      font-size: 18px;
      font-weight: bold;
    }
  }
}
.cover {
  border: 1px solid var(--el-border-color);
}
.title-require {
  &::before {
    content: "*";
    color: var(--el-color-danger);
    margin-right: 4px;
  }
}
</style>
