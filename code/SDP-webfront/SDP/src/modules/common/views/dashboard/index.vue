<template>
  <sc-app-page :fheader="{ showCollapse: true }">
    <template #main>
      <div class="page-welcome">
        <h2>Welcome !</h2>
        <p>欢迎使用 ~</p>
      </div>
    </template>
  </sc-app-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},

  setup() {},
});
</script>

<style lang="scss" scoped>
.page-welcome {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    font-size: 24px;
  }
  p {
    opacity: 0.6;
    font-size: 16px;
    line-height: 1.5;
  }
}
</style>
