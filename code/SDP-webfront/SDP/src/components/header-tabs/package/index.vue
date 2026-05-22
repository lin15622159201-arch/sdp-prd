<template>
  <el-tabs
    v-model="activeName"
    :tab-position="tabPosition"
    :before-leave="beforeLeave"
    class="header-tabs"
    @tab-click="handleTabsClick"
    @tab-change="handleTabsChange"
  >
    <el-tab-pane
      v-for="item of list"
      :key="item.value"
      lazy
      :label="getLabel(item)"
      :name="item[nameKey]"
    />
  </el-tabs>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { TabPaneName, TabsPaneContext } from 'element-plus';
import type { Awaitable } from 'element-plus/es/utils';

export interface ITabsItem {
  value: string | number;
  label: string;
  count?: string | number;
}

export default defineComponent({
  name: 'HeaderTabs',
  props: {
    options: {
      type: Array as PropType<ITabsItem[]>,
      default: () => ([]),
    },
    modelValue: {
      type: [Number, String],
      default: '',
    },
    tabPosition: {
      type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
      default: 'top',
    },
    /* 事件选中值 */
    nameKey: {
      type: String as PropType<keyof ITabsItem>,
      default: 'value',
    },
    // tab切换前钩子
    beforeLeave: {
      type: Function as PropType<(name?: TabPaneName, oldName?: TabPaneName) => Awaitable<boolean>>,
      default: null,
    },
  },
  emits: ['update:modelValue', 'tab-click', 'tab-change'],
  setup(props, { emit }) {
    const router = useRouter();
    // 去除 null、undefined
    const isNullish = (arg: ITabsItem['count']) => {
      return arg === null || arg === undefined;
    };
    // 组装
    const list = computed<ITabsItem[]>(() => props.options);
    // 防止组件将 '' 赋为 '0'，判断 '0' 是不是来自传入的 options
    const isOptionsValue = (val: string) => {
      return list.value.some(_item => _item.value === val);
    };
    // 处理 modelValue 为 '' 时 tab 组件转 '0' 的问题
    const activeName = computed<string | number>({
      get() {
        return props.modelValue === '' ? '0' : props.modelValue;
      },
      set(val: string | number) {
        if (val === '0' && !isOptionsValue(val)) {
          val = '';
        }
        emit('update:modelValue', val);
      },
    });

    const route = useRoute();

    /** ************************************* */
    /**
     * 2022/08/23
     * 新增tabchange事件
     * 新增beforleave属性
     * 新增handleQuery统一处理路由
     * 解决问题：存在业务需求，当切换tab附带异步操作时，若不限制tab切换可能会导致该异步操作结果不属于当前tab
     */
    /**
     * 覆盖当前路由
     * @param name 当前activeName
     * @param _type 触发的事件类型
     */
    const handleQuery = (name: TabPaneName, _type: 'CLICK' | 'CHANGE') => {
      const { query } = route;
      const item = list.value.find(_item => _item.value === name);
      const headerTabTypeName = item?.label ? encodeURIComponent(item?.label) : undefined;
      router.replace({
        query: {
          ...query,
          headerTabType: name,
          headerTabTypeName,
        },
      });
    };

    /**
     * 点击事件
     */
    const handleTabsClick = ({ props: _props }: TabsPaneContext /** TabsPaneContext */) => {
      // console.log('点击', props.beforeLeave);
      // 不传入切换钩子时直接使用click替换路由信息
      !props.beforeLeave && handleQuery(_props.name!, 'CLICK');
      emit('tab-click', _props.name);
    };

    /**
     * 切换事件
     */
    const handleTabsChange = (name: TabPaneName) => {
      // console.log('切换', props.beforeLeave);
      !!props.beforeLeave && handleQuery(name, 'CHANGE');
      emit('tab-change', name);
    };
    /** ************************************* */

    // 在切换 options 时滑块长度有变化，在此强制更新一下activeName触发滑块计算
    watch(list, async () => {
      const active = activeName.value;
      activeName.value = '';
      await nextTick();
      activeName.value = active;
    }, { deep: true });

    return {
      activeName,
      list,
      handleTabsClick,
      getLabel(_item: ITabsItem) {
        return _item.label + (isNullish(_item.count) ? '' : `（${_item.count}）`);
      },
      handleTabsChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-tabs {
  &.el-tabs {
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    // margin-bottom: 10px;
    // background-color: #f5f2f5;
    :deep(.el-tabs__nav-wrap) {
      &::after {
        background-color: transparent;
      }
    }
    :deep(.el-tabs__header) {
      margin-bottom: 10px;
      .el-tabs__item {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
