<template>
  <page-card title="服务信息">
    <responsive-row
      :col="{
        props: {
          xs: 24, sm: 24, md: 24, lg: 24, xl: 24
        }
      }"
    >
      <el-form-item
        label="服务类型"
        prop="serviceType"
      >
        <el-checkbox-group v-model="cooperationFormRef.serviceType">
          <el-checkbox
            v-for="(item, key) in SERVICETYPEMAP"
            :key="key"
            :label="item"
          >
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </responsive-row>
    <responsive-row
      :col="{
        props: {
          xs: 24, sm: 24, md: 24, lg: 24, xl: 24
        }
      }"
    >
      <el-form-item
        label="擅长品类"
        prop="goodCategorys"
        class="good-category"
      >
        <el-cascader
          v-model="cooperationFormRef.goodCategorys"
          :options="(clotheCategory as any)"
          :props="{
            multiple: true,
            label: 'label',
            value: 'label',
          }"
          clearable
        />
      </el-form-item>
    </responsive-row>
    <responsive-row
      :col="{
        props: {
          xs: 24, sm: 24, md: 24, lg: 24, xl: 24
        }
      }"
    >
      <el-form-item
        label="历史客户"
        prop="historicalCustomers"
      >
        <el-input
          v-model.trim="cooperationFormRef.historicalCustomers"
          placeholder="服务的代表客户名称列举，便于了解服务能力和偏向"
          type="textarea"
          :rows="3"
          show-word-limit
          maxlength="600"
        />
      </el-form-item>
    </responsive-row>
  </page-card>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {
  USER_MANAGEMENT_ROOM_ROLE_LIST,
  USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST,
  USER_MANAGEMENT_ROOM_REGION_LIST,
  USER_MANAGEMENT_ROOM_TYPE_ENUM,
  SERVICETYPEMAP,
} from '../../../constant';

export default defineComponent({
  components: {
  },
  props: {
    cooperationForm: {
      type: Object,
      default: () => {},
    },
    clotheCategory: {
      type: Array,
      default: () => [],
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
      SERVICETYPEMAP,

    };
  },

});
</script>

<style lang="scss" scoped>
.cooperation-opera {
  .form-item-inner {
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
  }
  .good-category {
    .el-cascader {
      width: 100%;
    }
  }
}
</style>
