<!--
 * @Descripttion: 操作日志-抽屉
 * @Author: weitongxue
-->
<template>
  <el-drawer
    v-bind="$attrs"
    :title="title"
    :modelValue="modelValue"
    :destroy-on-close="true"
  >
    <div class="tw-px-[20px]" style="word-break: break-all;">
      <el-timeline v-if="list.length">
        <el-timeline-item
          v-for="(item, index) in list"
          :key="index"
          :timestamp="item.time ? String(item.time) : undefined"
          placement="top"
          :color="getColor(index)"
        >
          <div class="tw-leading-[20px]">
            {{ item.user }}
            <template
              v-if="$slots.content"
            >
              <slot name="content" :log="item" />
            </template>
            <div
              v-else-if="item.content"
              style="line-height: 1.5em"
              class="tw-mt-[5px]"
              v-html="item.content"
            />
            <!-- {{ item.content }} -->
            <!-- </div> -->
            <div
              v-if="item.remark"
              style="line-height: 1.5em"
              class="tw-mt-[5px] tw-rounded-[2px]"
            >
              {{ item.remark }}
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
      <empty v-else />
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch } from 'vue';
import { get } from 'lodash-es';
import { formatTime } from '@toy/utils';
import { filters } from '@/core/plugins/filter';
import { IRequestConfig, IListItem } from './type.d';

export default defineComponent({
  name: 'OperationDrawer',
  props: {
    title: {
      type: String,
      default: '操作日志',
    },

    modelValue: {
      type: Boolean,
      required: true,
    },

    request: {
      type: Function,
      default: () => {},
    },

    config: {
      type: Object as PropType<IRequestConfig>,
      default: () => ({}),
    },

    requestParams: {
      type: [Object, String],
    },

    isAscending: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { config } = toRefs(props);
    const list = ref<IListItem[]>([]);
    watch(
      () => props.modelValue,
      async (value: boolean) => {
        if (value) {
          const res = await props.request(props.requestParams);
          const { timeKey, userKey, contentKey, remarkKey, operateList, customizeFormatContent } = {
            timeKey: 'time',
            userKey: 'user',
            contentKey: 'content',
            remarkKey: 'remark',
            ...config.value,
          };

          list.value = get(res, config.value.listKey! || 'data')?.map((item: any) => {
            return {
              ...item,
              time: typeof item[timeKey] === 'number' ? formatTime(item[timeKey]) : item[timeKey],
              user: item[userKey],
              // eslint-disable-next-line no-nested-ternary
              content: customizeFormatContent
                ? customizeFormatContent(item)
                : operateList
                  ? filters.getEnumLabel(operateList, item[contentKey])
                  : item[contentKey],
              remark: item[remarkKey] ?? '',
            };
          }) || [];
        }
      },
    );

    const getColor = (idx: number) => {
      if (props.isAscending) {
        return idx === list.value.length - 1 ? '#4974F5' : '#cccccc';
      }
      return idx === 0 ? '#4974F5' : '#cccccc';
    };

    return {
      list,
      getColor,
    };
  },
});
</script>
