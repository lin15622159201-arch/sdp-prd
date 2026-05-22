<template>
  <div>
    <div class="box-flex">
      <el-checkbox @change="selectAllFun" v-model="selectAll">全选</el-checkbox>
      <div style="margin-left: 10px;">已选中 {{ props.urls.filter(v => v.select).length }} 张</div>
      <!-- <el-button
        class="bth"
        type="primary"
      >姿势裂变</el-button> -->
      <el-button
        class="bth"
        @click="handleDownload"
        type="primary"
      >下载图片</el-button>
      <el-button
        @click="handleCopyLink"
      >复制链接</el-button>
      <el-button
        @click="cancelFun"
      >取消</el-button>
    </div>
    <div class="dialog-img-item-box">
      <div
        class="dialog-img-box"
        v-for="(item) in urls"
        :key="item.pictureId"
      >
        <el-checkbox class="sele-p-a" v-model="item.select" />
        <img
          class="dialog-img"
          :src="item.pictureUrl"
          alt=""
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { batchDownloadFile } from '@/core/utils/download';
// import { imageDownloadLog } from '../api/index';
// import { IImageDownloadLogReq } from '../api/types';
import { ElMessage } from 'element-plus';


const props = defineProps({
  urls: {
    type: Array as PropType<any[]>,
    default: () => {
      return [];
    }
  },
  taskId: {
    type: String,
    default: '',
  },
  taskCode: {
    type: String,
    default: '',
  },
});

const selectAll = ref<boolean>(false);

watch(
  () => props.urls,
  () => {
    if (props.urls.filter(v => !v.select).length) {
      selectAll.value = false;
    } else {
      selectAll.value = true;
    }
  },
  {
    deep: true,
  }
);
const emit = defineEmits<{
  (event: 'selectFun', fal: boolean): void;
  (event: 'cancel'): void;
}>();

const selectAllFun = (v: any) => {
  if (v) {
    emit('selectFun', true);
  } else {
    emit('selectFun', false);
  }
};

const getImgName = (v: string) => {
  if (v) {
    const arr = v.split('/');
    const names = arr[arr.length - 1].split('.');
    return `${names[0]}`;
  }
  return '';
};

const handleDownload = async () => {
  const pre: any = [];
  props.urls.forEach((v: any, index: number) => {
    if (v.select) {
      pre.push({
        index,
        url: v.pictureUrl,
        name: getImgName(v.pictureUrl),
        id: v.imageId,
      });
    }
  });
  const result = (await batchDownloadFile(pre));
  const imageList: { imageId: string; imageUrl: string; imageName: string; }[] = [];
  result.forEach((item, index) => {
    const { url, name, id } = pre[index];
    if (item.isSuccess) {
      imageList.push({
        imageId: id,
        imageUrl: url,
        imageName: name,
      });
    }
  });

  if (imageList.length > 0) {
    // handleDownloadLog({
    //   taskId: props.taskId,
    //   taskCode: props.taskCode,
    //   imageList,
    // });
  }
};

// type LogReq = Omit<IImageDownloadLogReq, 'downloadAction' | 'downloadType'>;
// const handleDownloadLog = async (req: LogReq) => {
//   // await imageDownloadLog({
//   //   ...req,
//   //   downloadType: 'DESIGN_MATERIAL',
//   //   downloadAction: 1,
//   // });
// };

const handleCopyLink = async () => {
  const urls: string[] = [];
  props.urls.forEach((v: any, index: number) => {
    if (v.select) {
      urls.push(v.pictureUrl);
    }
  });
  await navigator.clipboard.writeText(urls.join('\r\n'));
  ElMessage.success('已复制图片链接');
};

const cancelFun = () => {
  emit('cancel');
};

</script>
<style scoped>
.dialog-img-item-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 210px;
  max-height: 430px;
  overflow: hidden auto;
}
.dialog-img-box {
  position: relative;
  width: 200px;
  height: 200px;
  cursor: pointer;
}
.dialog-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.box-flex {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.bth {
  margin-left: auto;
}
.sele-p-a {
  position: absolute;
  top: 2px;
  right: 10px;
}
</style>
