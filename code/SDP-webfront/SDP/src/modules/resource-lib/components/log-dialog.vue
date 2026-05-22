<template>
  <el-dialog
    v-model="selfVisible"
    title="操作日志"
    width="70%"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
  >
    <el-table
      :data="logLists"
      border
      style="width: 100%"
    >
      <!-- 序号-->
      <el-table-column
        type="index"
        label="序号"
        width="100"
        align="center"
      />

      <!-- 操作时间-->
      <el-table-column
        prop="operationTime"
        label="操作时间"
        width="200"
        align="center"
      >
        <template #default="{ row }">
          {{ $filters.formatTime(row.operationTime) }}
        </template>
      </el-table-column>
      <!-- 操作内容-->
      <el-table-column
        label="操作内容"
        prop="content"
        align="center"
      />
      <!-- 操作人-->
      <el-table-column
        prop="creatorName"
        label="操作人"
        width="200"
        align="center"
      />
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose()">
          关 闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import type {
  IResourceLibOperationLogListItem,
} from '@/modules/resource-lib/api/types';

export default defineComponent({
  name: 'LogDialog',
  props: {
    logLists: {
      require: true,
      type: Array as PropType<IResourceLibOperationLogListItem[]>,
    },
  },
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const handleClose = () => {
      selfVisible.value = false;
    };
    return {
      handleClose,
      selfVisible,
    };
  },
});
</script>
<style scoped lang="scss">
//
</style>
