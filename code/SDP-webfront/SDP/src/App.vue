<template>
  <el-config-provider :value-on-clear="() => ''">
    <sc-provider>
      <router-view />
    </sc-provider>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouterBack } from './hooks/use-router-back';

export default defineComponent({
  setup() {
    useRouterBack();
    return {
    };
  },
});
</script>
<style lang="scss">
#app {
  height: 100%;
}
</style>
