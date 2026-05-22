<template>
  <el-drawer
    v-model="visible"
    :title="logTitle"
    direction="rtl"
    :size="150"
    destroy-on-close
    custom-class="logger-drawer"
    append-to-body
    @open="handleOpen"
  >
    <div v-if="list.length">
      <el-timeline class="timeline">
        <el-timeline-item
          v-for="(item, index) in list"
          :key="index"
          placement="top"
          :color="index === 0 ? '#409EFF' : ''"
          :timestamp="$filters.formatTime(item[timeKey as keyof typeof item] as string)"
        >
          <h4 style="padding:10px 0;">
            {{ item[nameKey as keyof typeof item] }}
          </h4>
          <p>{{ item[buzNoKey as keyof typeof item] }}</p>
          <p class="break-word">
            {{ item[contentKey as keyof typeof item] }}
          </p>
          <p class="break-word">
            {{ item[remarkKey as keyof typeof item] }}
          </p>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div v-else>
      <el-empty description="暂无数据" />
    </div>
  </el-drawer>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import { getOperationLog } from '@/modules/base-config/api/index';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { getBuzLog, getDemandTaskLogs, getStyleLogs, getStyleLogsForTuikuan, getTagLogs } from './api';
import {
  IBillGetPaymentLogItem,
  IDemandEventLogListItem,
  IStyleInfoLogsForTuikuanItem,
  IStyleInfoLogsItem,
  LOG_REMARK_BIZTYPE_ENUM,
  REMARK_TYPE_ENUM
} from './api/type';

type TKey = keyof IDemandEventLogListItem
| keyof IStyleInfoLogsItem
| keyof IBillGetPaymentLogItem
| keyof IStyleInfoLogsForTuikuanItem;

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    // demandDetailId | styleId
    id: {
      type: String,
      default: '',
    },
    logTitle: {
      type: String,
      default: '操作日志',
    },
    // REMARK_TYPE_ENUM
    type: {
      type: Number as PropType<REMARK_TYPE_ENUM>,
      default: 1,
    },

    buzType: {
      type: String,
      default: '',
    },
    // 日志类型，可能是: 需求类型 | 合同、核价、生产资料 | 基础资料、外发版房价格库 | 资源库 | 版型库 | 结算日志 | 推款系列
    logType: {
      type: String as PropType<'DEMAND' | 'STYLE' | 'BASEINFO' | 'RESOURCELIB' | 'PATTERN' | 'SETTLE' | 'TUIKUAN'>,
      default: 'STYLE',
    },
    timeKey: {
      type: String as PropType<TKey>,
      default: 'createdTime',
    },
    nameKey: {
      type: String as PropType<TKey>,
      default: 'creatorName',
    },
    buzNoKey: {
      type: String as PropType<TKey>,
      default: 'settleCode',
    },
    contentKey: {
      type: String as PropType<TKey>,
      default: 'logContent',
    },
    remarkKey: {
      type: String as PropType<TKey>,
      default: 'remark',
    },
    dataList: {
      type: Array as PropType<any>,
      default: [] as any[],
    },
    api: {
      type: Function,
    },
    // 推款业务查询类型
    bizType: {
      type: Number as PropType<LOG_REMARK_BIZTYPE_ENUM>,
      default: 2,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { visible } = useDialogVisible(props, emit);
    const list = ref<(
    IDemandEventLogListItem | IStyleInfoLogsItem | IBillGetPaymentLogItem | IStyleInfoLogsForTuikuanItem)[]>([]
      );

    const handleOpen = async () => {
      if (typeof props.api === 'function') {
        const { data } = await props.api(props.id);
        list.value = data;
        return;
      }
      if (props.logType === 'SETTLE') {
        const { data } = await getBuzLog(props.id);
        list.value = data;
        return;
      }
      if (props.logType === 'RESOURCELIB') {
        list.value = props.dataList;
        return;
      }
      if (props.logType === 'PATTERN') {
        const { data } = await getTagLogs({ buzId: props.id, buzType: props.buzType });
        list.value = data;
        return;
      }
      if (props.logType === 'BASEINFO') {
        const { data } = await getOperationLog({ buzId: props.id, buzType: props.buzType });
        list.value = data;
        return;
      }
      if (props.logType === 'TUIKUAN') {
        // TODO 推款业务都用这个查日志，有空把这个api抽到公共api，推款的几个备注api也是
        // 其实个人觉得这个组件可以精简props，不同业务堆得太重复
        const { data } = await getStyleLogsForTuikuan({ bizId: props.id, bizType: props.bizType });
        list.value = data;
        return;
      }
      if (props.logType === 'DEMAND') {
        const { data } = await getDemandTaskLogs({ busId: props.id, busType: props.type });
        list.value = data;
      } else {
        const { data } = await getStyleLogs({ styleId: props.id });
        list.value = data;
      }
    };

    return {
      visible,
      list,
      handleOpen,
    };
  },
});
</script>
