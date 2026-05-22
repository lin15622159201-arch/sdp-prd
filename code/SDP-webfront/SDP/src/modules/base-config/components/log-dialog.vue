<template>
  <el-dialog
    v-model="selfVisible"
    title="操作日志"
    :close-on-click-modal="false"
    append-to-body
    @opened="getLogLists()"
    @close="handleClose()"
  >
    <el-table
      :data="logData"
      border
      style="width: 100%"
    >
      <!-- 操作人-->
      <el-table-column
        prop="creatorName"
        label="操作人"
        align="center"
        width="150"
      />

      <!-- 操作时间-->
      <el-table-column
        prop="createdTime"
        label="操作时间"
        width="180"
      >
        <template #default="{ row }">
          {{ $filters.formatTime(row.createdTime) }}
        </template>
      </el-table-column>
      <!-- 操作内容-->
      <el-table-column
        label="操作动作"
        prop="content"
      />
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { defineComponent, ref } from 'vue';
import { getOperationLog } from '../api';

export default defineComponent({
  name: 'LogDialog',
  props: {
    visible: {
      require: true,
      type: Boolean,
    },
    id: {
      require: true,
      type: String,
    },
    buzType: {
      require: true,
      type: String,
    },
  },
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const logData = ref([]);
    const handleClose = () => {
      selfVisible.value = false;
      logData.value = [];
    };

    const getLogLists = async () => {
      const res = await getOperationLog({
        buzId: props.id,
        buzType: props.buzType,
      });
      logData.value = res.data;
    };
    return {
      selfVisible,
      logData,
      handleClose,
      getLogLists,
    };
  },

});
</script>
<style scoped lang="scss">
  .log-table{
    border: 1px solid #eee;
    margin-top: 10px;
    th,td{
      text-align: center !important;
    }
    th{
      width: 140px;
    }
  }
</style>
