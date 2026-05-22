<template>
  <div class="tw-m-r-10px tw-m-l-10px">
    <el-dropdown
      @command="quickTag"
    >
      <el-button class="tw-ml-4">
        发送到
        <el-icon class="el-icon--right">
          <ArrowDown />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in SEND_TASK_LIST"
            :key="item.code"
            :command="item.code"
            divided
          >
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useSendTask } from '@/hooks/use-send-task';
import { TASK_TYPE_ENUM } from '@/constant/task';

const router = useRouter();
const emit = defineEmits<{
  (event: 'handlePatternTryOn'): void;
}>();
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  taskId: {
    type: String,
    default: '',
  },
  imgs: {
    type: String,
    default: '',
  },
});

const { sendTask, SEND_TASK_LIST } = useSendTask(TASK_TYPE_ENUM.POSE_FISSION);
const quickTag = (type: TASK_TYPE_ENUM) => {
  if (!props?.imgs.split(',').filter(v => !!v).length) {
    ElMessage.error('请最少勾选一张图片再执行此操作');
    return;
  }
  if (type === 'image_repair') {
    // 图案修复
    router.push({
      name: 'ImageRestorationAdd',
      query: {
        byPostureFissionId: props.taskId,
        selectId: props.imgs,
        taskSource: 'posture_fission',
      }
    });
  } else {
    sendTask({
      type,
      taskId: props.taskId,
      imgs: props.imgs
    });
  }
};
</script>
