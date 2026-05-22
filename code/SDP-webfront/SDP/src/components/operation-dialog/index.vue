<!--
 * @Descripttion: 操作日志-弹框
 * @Author: weitongxue
-->
<template>
  <el-dialog
    :modelValue="modelValue"
    @close="handleCancel"
    :close-on-click-modal="false"
    class="el-dialog-inner-scroll"
    width="550px"
    title="操作日志"
  >
    <div class="tw-px-[20px]">
      <el-timeline v-if="list.length">
        <el-timeline-item
          v-for="(item, index) in list"
          :key="index"
          :timestamp="String(item.time)"
          placement="top"
          :color="getColor(index)"
        >
          <div class="tw-leading-[20px]">
            {{ item.user }}
            <div
              v-if="item.content"
              style="line-height: 1.5em"
              class="tw-mt-[5px]"
            >
              {{ item.content }}
            </div>
            <div
              v-if="item.remark"
              style="line-height: 1.5em"
              class="tw-mt-[5px] tw-text-[#eee] tw-p-[10px] tw-rounded-[2px]"
            >
              {{ item.remark }}
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
      <empty v-else />
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch } from 'vue';
import { get } from 'lodash-es';
import { formatTime } from '@toy/utils';
import { filters } from '@/core/plugins/filter';
import { IRequestConfig, IListItem } from './type.d';

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
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

  setup(props, { emit }) {
    const { config } = toRefs(props);
    const list = ref<IListItem[]>([]);
    watch(
      () => props.modelValue,
      async (value: boolean) => {
        if (value) {
          const res = await props.request(props.requestParams);
          const {
            timeKey,
            userKey,
            contentKey,
            remarkKey,
            operateList = [],
          } = {
            timeKey: 'time',
            userKey: 'user',
            contentKey: 'content',
            remarkKey: 'remark',
            ...config.value,
          };

          list.value = get(res, config.value.listKey! || 'data')?.map((item: any) => {
            return {
              time: typeof item[timeKey] === 'number' ? formatTime(item[timeKey]) : item[timeKey],
              user: item[userKey],
              content: filters.getEnumLabel(operateList, item[contentKey]),
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

    const handleCancel = () => {
      emit('update:modelValue', false);
    };

    return {
      list,
      getColor,
      handleCancel,
    };
  },
});
</script>
