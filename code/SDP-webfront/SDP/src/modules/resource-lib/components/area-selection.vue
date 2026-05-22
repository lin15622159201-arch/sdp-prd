<template>
  <el-form inline>
    <el-form-item label="所属区域：">
      <el-checkbox-group
        v-model="region"
        @change="handleCityChange"
      >
        <el-checkbox
          v-for="item in REGION_LIST"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import {
  REGION_ENUM,
  REGION_LIST,
} from '@/constant/index';
import type {
  IResourceLibOperationLogListItem,
} from '@/modules/resource-lib/api/types';

export default defineComponent({
  name: 'AreaSelection',
  props: {
    data: {
      require: true,
      type: Array as PropType<IResourceLibOperationLogListItem[]>,
    },
  },
  setup(props, { emit }) {
    const region = ref(REGION_LIST.map(item => item.value));

    const handleCityChange = () => {
      emit('cityChange');
    };

    const { visible: selfVisible } = useDialogVisible(props, emit);
    const handleClose = () => {
      selfVisible.value = false;
    };
    return {
      region,
      REGION_LIST,
      handleCityChange,
      handleClose,
      selfVisible,
      getRegionList() {
        return region.value.length ? region.value : [REGION_ENUM.GUANGZHOU, REGION_ENUM.HANGZHOU];
      },
    };
  },
});
</script>
<style scoped lang="scss">
// .cities {
//   box-sizing: border-box;
//   padding: 10px 0px;
//   height: 50px;
// }
.el-form--inline .el-form-item{
  margin-bottom: 0;
}
</style>
