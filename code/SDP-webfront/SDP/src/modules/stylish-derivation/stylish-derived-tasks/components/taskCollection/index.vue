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
import { defineProps, defineEmits, PropType } from 'vue';
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
    type: String as PropType<TASK_TYPE_ENUM>,
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

const { SEND_TASK_LIST, sendTask } = useSendTask(props.type);
const quickTag = (type: TASK_TYPE_ENUM) => {
  if (!props?.imgs.split(',').filter(v => !!v).length) {
    ElMessage.error('请最少勾选一张图片再执行此操作');
    return;
  }
  if (type === 'floral_pattern_apply') {
    // 花型上身
    // emit('handlePatternTryOn');
    // router.push({
    //   name: 'Webview',
    //   query: {
    //     domain: 'fashion-design',
    //     // activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/ai-design-task/list',
    //     path: '/#/digital-print/pattern-try-on/create',
    //     query: JSON.stringify({
    //       byStylishDerivationId: props.taskId,
    //       selectId: props.imgs,
    //       taskSource: 'style_gen',
    //       activeMenu: 'Webview?domain=fashion-design&path=/#/digital-print/pattern-try-on/list'
    //     })
    //   }
    // });
    const routeData: any = router.resolve({
      name: 'Webview',
      query: {
        domain: 'fashion-design',
        path: '/#/digital-print/pattern-try-on/create',
        activeMenu: 'Webview?domain=fashion-design&path=/#/digital-print/pattern-try-on/list',
        query: JSON.stringify({
          byStylishDerivationId: props.taskId,
          selectId: props.imgs,
          taskSource: 'style_gen',
        })
      }
    });
    window.open(routeData.href, '_self');
  } else if (type === 'fashion_virtual_try_on') {
    // 虚拟换衣
    // router.push({
    //   name: 'Webview',
    //   query: {
    //     domain: 'fashion-design',
    //     // activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/ai-design-task/list',
    //     path: '/#/inspiration-center/virtual-change/create',
    //     query: JSON.stringify({
    //       byStylishDerivationId: props.taskId,
    //       selectId: props.imgs,
    //       taskSource: 'style_gen',
    //       activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list'
    //     })
    //   }
    // });
    const routeData: any = router.resolve({
      name: 'Webview',
      query: {
        domain: 'fashion-design',
        path: '/#/inspiration-center/virtual-change/create',
        activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list',
        query: JSON.stringify({
          byStylishDerivationId: props.taskId,
          selectId: props.imgs,
          taskSource: 'style_gen',
          // activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list'
        })
      }
    });
    window.open(routeData.href, '_self');
  } else if (type.toLowerCase() === TASK_TYPE_ENUM.POSE_FISSION) {
    // 姿势裂变
    router.push({
      name: 'PostureFissionAdd',
      query: {
        byStylishDerivationId: props.taskId,
        selectId: props.imgs,
        taskSource: 'style_gen',
      }
    });
  } else if (type === 'image_repair') {
    // 图案修复
    router.push({
      name: 'ImageRestorationAdd',
      query: {
        byStylishDerivationId: props.taskId,
        selectId: props.imgs,
        taskSource: 'style_gen',
      }
    });
  } else {
    sendTask({ type, taskId: props.taskId, imgs: props.imgs });
  }
};
</script>
