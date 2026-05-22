<template>
  <el-drawer
    v-model="showDrawerRef"
    title="操作记录"
    :destroy-on-close="true"
    append-to-body
    custom-class="logger-drawer"
  >
    <div class="padding-left-20 padding-right-20">
      <el-timeline v-if="state.logs?.length">
        <el-timeline-item
          v-for="(item, index) in state.logs"
          :key="index"
          :timestamp="$filters.formatTime(item.createdTime) "
          placement="top"
          color="#0499ff"
        >
          <div class="line-height-20">
            {{ `${item.content} ${item.creatorName}` }}
          </div>
        </el-timeline-item>
      </el-timeline>
      <span v-else>暂无操作记录</span>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  components: {

  },
  props: {
    showDrawer: {
      type: Boolean,
      default: false,
    },
    state: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const showDrawerRef = computed({
      get() {
        return props.showDrawer;
      },
      set(value) {
        emit('update:showDrawer', value);
      },
    });

    return {
      showDrawerRef,
    };
  },
});
</script>

<style lang="scss" scope>

.drawer-width{
  .el-drawer__header{
     padding: 20px;
  }
}

</style>
