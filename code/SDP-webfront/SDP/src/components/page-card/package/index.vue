<template>
  <section :class="['back', light ? 'light' : 'default', border && 'border']">
    <div v-if="title || $slots['header-left'] || $slots['header-right']" class="section-title">
      <div class="header-left">
        <p
          :class="{
            title: true,
            'title-require': required,
          }"
        >
          {{ title }}
        </p>
        <div class="tw-ml-15px">
          <slot name="header-left" />
        </div>
        <div v-if="showByExpend">
          <ToggleOpen :default-open="defaultOpen" @handle-toggle="handleToggle" />
        </div>
      </div>
      <dd class="header-right">
        <slot name="header-right" />
      </dd>
    </div>
    <slot v-if="!showByExpend || isShow" name="default" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ToggleOpen from '@/components/toggle-open';

export default defineComponent({
  name: 'PageCard',
  components: {
    ToggleOpen,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    showByExpend: {
      type: Boolean,
      default: false,
    },
    defaultOpen: {
      type: Boolean,
      default: true,
    },
    light: Boolean,
    required: Boolean,
    border: Boolean,
  },
  setup(props) {
    const isShow = ref(false);
    const handleToggle = (isOpened: any) => {
      isShow.value = isOpened.value;
    };
    watch(
      () => props.defaultOpen,
      (val) => {
        isShow.value = val;
      },
      {
        immediate: true,
      },
    );
    return {
      handleToggle,
      isShow,
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
.title-require {
  &::before {
    content: "*";
    color: var(--el-color-danger);
    margin-right: 4px;
  }
}
</style>
