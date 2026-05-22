<template>
  <div class="tw-m-r-10px no-visible">
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
            v-for="item in TASK_TYPE_LIST"
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
import { ref, computed, defineProps, defineEmits, PropType } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const emit = defineEmits<{
  (event: 'handlePatternTryOn'): void;
}>();
const props = defineProps({
  selectionList: {
    type: Array as PropType<any>,
    default: () => [],
  },
  codeName: {
    type: String,
    default: 'spuCode'
  },
  status: {
    type: String,
    default: ''
  },
  statusCode: {
    type: Number,
    default: null
  },
  imgListName: {
    type: String,
    default: ''
  },
});

const TASK_TYPE_LIST = [
  {
    code: 'XNHY',
    name: '虚拟换衣'
  },
  {
    code: 'ZSLB',
    name: '姿势裂变'
  },
  {
    code: 'TPGXRW',
    name: '图片更新任务'
  },
];
const quickTag = (type: string) => {
  if (!props?.selectionList.length) {
    ElMessage.error('请最少勾选一条数据再执行此操作');
    return;
  }
  if (!!props.status && props?.selectionList.filter((v: any) => v[props.status] !== props.statusCode).length) {
    ElMessage.error('仅支持处理开款任务状态为已开款的数据');
    return;
  }
  if (type === 'TPGXRW') {
    if (props.imgListName && props?.selectionList.filter((v: any) => !(v[props?.imgListName] || []).length).length) {
      ElMessage.error('没有图片和视频的数据不能进行发送操作');
      return;
    }
    router.push({
      name: 'DesignCenterImageUpdateCreate',
      params: {
        styleCode: props?.selectionList.map((v: any) => v[props.codeName]).join(','),
      }
    });
  } else if (type === 'XNHY') {
    // 虚拟换衣
    if (props.imgListName && props?.selectionList.filter((v: any) => !(v[props?.imgListName] || []).filter((v1: { materialType: number; }) => v1.materialType === 0).length).length) {
      ElMessage.error('没有图片的数据不能进行发送操作');
      return;
    }
    const routeData = router.resolve({
      name: 'Webview',
      query: {
        domain: 'fashion-design',
        path: '/#/inspiration-center/virtual-change/create',
        activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list',
        query: JSON.stringify({
          byStyleCode: props?.selectionList.map((v: any) => v[props.codeName]).join(','),
        })
      }
    });
    window.open(routeData.href, '_self');
  } else if (type === 'ZSLB') {
    // 姿势裂变
    if (props.imgListName && props?.selectionList.filter((v: any) => !(v[props?.imgListName] || []).filter((v1: { materialType: number; }) => v1.materialType === 0).length).length) {
      ElMessage.error('没有图片的数据不能进行发送操作');
      return;
    }
    router.push({
      name: 'PostureFissionAdd',
      query: {
        byStyleCode: props?.selectionList.map((v: any) => v[props.codeName]).join(','),
      }
    });
  }
};
</script>
<style>
  .no-visible .el-button:focus-visible {
    outline: none;
  }
</style>
