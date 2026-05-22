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
import { PropType } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { IListItem } from '../../types';

const router = useRouter();

const props = defineProps({
  selectionList: {
    type: Array as PropType<IListItem[]>,
    default: () => [],
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
  const selection = props?.selectionList || [];
  if (!selection.length) {
    ElMessage.error('请最少勾选一条数据再执行此操作');
    return;
  }
  const styleCodesStr = selection.map(v => v.styleCode).join(',');
  if (type === 'TPGXRW') {
    if (selection.filter(v => !(v.materialInfo || []).length).length) {
      ElMessage.error('没有图片和视频的数据不能进行发送操作');
      return;
    }
    router.push({
      name: 'DesignCenterImageUpdateCreate',
      params: {
        styleCode: styleCodesStr,
      }
    });
  } else if (type === 'XNHY') {
    // 虚拟换衣
    if (selection.filter(v => !(v.materialInfo || []).filter(v1 => v1.materialType === 0).length).length) {
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
          byStyleCode: styleCodesStr,
          skcCode: selection.map(v => v.designCode).join(','),
        })
      }
    });
    window.open(routeData.href, '_self');
  } else if (type === 'ZSLB') {
    // 姿势裂变
    if (selection.filter(v => !(v.materialInfo || []).filter(v1 => v1.materialType === 0).length).length) {
      ElMessage.error('没有图片的数据不能进行发送操作');
      return;
    }
    router.push({
      name: 'PostureFissionAdd',
      query: {
        byStyleCode: styleCodesStr,
        skcCode: selection.map(v => v.designCode).join(','),
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
