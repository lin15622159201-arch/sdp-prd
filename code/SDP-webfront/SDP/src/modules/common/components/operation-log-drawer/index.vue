<template>
  <!--操作日志-->
  <el-drawer
    v-model="visible_"
    title="操作日志"
    direction="rtl"
    :size="150"
    destroy-on-close
    append-to-body
    custom-class="logger-drawer"
  >
    <div v-if="data.length">
      <el-timeline class="timeline">
        <el-timeline-item
          v-for="(item, index) in data"
          :key="index"
          placement="top"
          :color="index === 0 ? '#409EFF' : ''"
          :timestamp="$filters.formatTime(item.createdTime)"
        >
          <h4 style="padding: 10px 0">
            {{ item.creatorName }}
          </h4>
          <span>{{ item.content }}</span>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div v-else>
      <el-empty description="暂无" />
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ILogListRes } from '@/modules/exception-manage/exception-handle/api/type';
import { computed, PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array as PropType<ILogListRes>,
    default: () => [],
  },
});

const emits = defineEmits(['update:modelValue']);

const visible_ = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  }
});

</script>

<style scoped lang="scss">
.el-timeline {
  padding-left: 0;
}
.el-drawer {
  background-color: #fff !important;
}
</style>
