<template>
  <el-button
    type="primary"
    text
    @click="toggleChange"
  >
    <el-icon :size="12">
      <ArrowUp v-if="isOpened" />
      <ArrowDown v-else />
    </el-icon>
    <span>{{ isOpened ? '收起' : '展开' }}</span>
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue';
import useToggleOpen from '../hooks/use-toggle-open';

export default defineComponent({
  components: {
    ArrowUp,
    ArrowDown,
  },
  props: {
    defaultOpen: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['handleToggle'],
  setup(props, { emit }) {
    const { isOpened, handleToggle } = useToggleOpen({
      defaultOpen: props.defaultOpen,
    });

    const toggleChange = () => {
      handleToggle();
      emit('handleToggle', isOpened);
    };
    return {
      isOpened, toggleChange,
    };
  },
});
</script>
