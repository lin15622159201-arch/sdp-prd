<template>
  <page-card title="业务归属">
    <div class="margin-top-10 margin-bottom-20">
      <el-form-item
        label=""
        label-width="0"
        prop="regionId"
      >
        <el-radio-group v-model="cooperationFormRef.regionId">
          <el-radio
            v-for="item of USER_MANAGEMENT_ROOM_REGION_LIST"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
  </page-card>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {
  USER_MANAGEMENT_ROOM_ROLE_LIST,
  USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
  USER_MANAGEMENT_ROOM_REGION_LIST,
  USER_MANAGEMENT_ROOM_TYPE_ENUM,
} from '../../../constant';

export default defineComponent({

  props: {
    cooperationForm: {
      type: Object,
      default: () => {},
    },

  },
  setup(props, { emit }) {
    const cooperationFormRef = computed({
      get() {
        return props.cooperationForm;
      },
      set(value) {
        emit('update:cooperationForm', value);
      },
    });

    return {
      USER_MANAGEMENT_ROOM_ROLE_LIST,
      USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
      USER_MANAGEMENT_ROOM_REGION_LIST,
      USER_MANAGEMENT_ROOM_TYPE_ENUM,
      cooperationFormRef,
    };
  },
});
</script>

<style lang="scss" scoped>
//
</style>
