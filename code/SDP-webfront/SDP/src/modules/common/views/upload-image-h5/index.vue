<template>
  <div class="container">
    <el-scrollbar class="scrollbar">
      <div class="ul" v-if="files.length !== 0">
        <custom-image
          v-for="item in files"
          :key="item.id"
          :src="item.url"
          class="li"
          fit="cover"
          :preview-src-list="[item.url]"
        />
      </div>
      <empty
        v-else
        class="tw-pt-100px"
        description="请选择内容直传至网页"
      />
    </el-scrollbar>
    <div class="footer">
      <div class="btn">
        选择图片
      </div>
      <input
        type="file"
        @change="onChange"
        class="input"
        :accept="accept"
        multiple
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { IFileData } from '@/components/uploader/packages/types';
import Socket from '@/core/utils/socket';
import { ISocketReq, ISocketRes } from './types';
import { SOCKET_TYPE_ENUM } from './constant';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useAppStore } from '@/store/app';
import { useTimeoutWorker } from '@/hooks/use-timeout-worker';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeUnmount, ref } from 'vue';
import { decryptedData } from '@/core/utils/encrypt';
import { H5_UPLOAD_PUBLIC_KEY } from '@/components/uploader/packages/hooks/use-upload-h5/constant';
import { uploadFile } from '@/api/open';
import { hideFullScreenLoading, showFullScreenLoading } from '@/core/http/helper';

const files = ref<IFileData[]>([]);
const html = document.querySelector('html')!;
const $route = useRoute();
const $router = useRouter();
html.className = 'clear_width';
const socketId = ref('');
const { setWorkerTimeout, clearWorkerTimeout } = useTimeoutWorker();
let heartBeatTimer: any;
let heartBeatBackTimer: any;
const wsEl = ref<InstanceType<typeof Socket>>();
// 组装socket默认数据
const sendMessage = (data: ISocketReq) => {
  wsEl.value?.send({
    ...data,
  });
};
// 清除心跳
const cleanHeartBeat = () => {
  if (heartBeatTimer) {
    clearWorkerTimeout(heartBeatTimer);
    heartBeatTimer = null;
  }
  if (heartBeatBackTimer) {
    clearWorkerTimeout(heartBeatBackTimer);
    heartBeatBackTimer = null;
  }
};
// 清除socket相关实例
const cleanSocket = () => {
  if (wsEl.value) {
    wsEl.value?.close();
    wsEl.value = undefined;
  }
};
// 创建心跳
const createHeartBeat = async () => {
  cleanHeartBeat();
  heartBeatTimer = await setWorkerTimeout(async () => {
    // 发送心跳
    sendMessage({ msgType: SOCKET_TYPE_ENUM.HEART_BEAT });
    heartBeatTimer = null;
    // 创建心跳异常处理 超过两秒钟没有回复则认为异常
    heartBeatBackTimer = await setWorkerTimeout(async () => {
      // 心跳断开 自动断开连接
      cleanSocket();
      ElMessageBox.alert('服务异常', '提示', {
        type: 'error',
        confirmButtonText: '关闭',
        showCancelButton: false,
      }).finally(() => {
        window.location.reload();
      });
    }, 2000);
  }, 5000);
};
const appStore = useAppStore();
// 创建连接
const createSocket = () => {
  cleanSocket();
  const socketDomain = appStore.systemDomain?.FashionDesignApi?.replace('https', 'wss') || '';
  wsEl.value = new Socket(
    `${socketDomain}/fashion-demand/websocket/file/direct-upload/${socketId.value}`,
    {
      onReconnect() {
        console.log('正在重连');
      },
      async onMaximum() {
        console.log('超过最大重连次数');
        cleanSocket();
        ElMessageBox.alert('服务异常', '提示', {
          type: 'error',
          confirmButtonText: '刷新',
          showCancelButton: false,
        }).finally(() => {
          window.location.reload();
        });
      },
      async onError() {
        console.log('连接错误');
        cleanHeartBeat();
        wsEl.value?.close();
      },
      onClose() {
        console.log('连接关闭');
        cleanHeartBeat();
      },
      onOpen() {
        console.log('打开连接');
        createHeartBeat();
      },
      async onMessage(event) {
        if (event.data) {
          const data: ISocketRes = JSON.parse(event.data);
          switch (data.msgType) {
            case SOCKET_TYPE_ENUM.HEART_BEAT:
              console.log('接收心跳');
              clearWorkerTimeout(heartBeatBackTimer);
              createHeartBeat();
              break;
            case SOCKET_TYPE_ENUM.ERROR:
              ElMessage.error(data.error || '服务异常，请刷新页面重试');
              break;
            default:
              break;
          }
        }
      },
    }
  );
  wsEl.value.open();
};

const sizeLimit = 30;
const accept = '.png,.jpg,.jpeg';
const limit = 30;
const beforeUpload = (fileList: File[]) => {
  if (files.value.length + fileList.length > limit) {
    ElMessage.warning(`最多上传${limit}张图片`);
    throw new Error(`最多上传${limit}张图片`);
  }
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    if (file.size / 1024 / 1024 > sizeLimit) {
      ElMessage.warning(`上传文件大小不能超过 ${parseFloat(`${sizeLimit}`)}MB!`);
      throw new Error(`上传文件大小不能超过 ${parseFloat(`${sizeLimit}`)}MB!`);
    }
    const types = accept.split(',').map(v => v.trim());
    if (
      types.includes('*') === false
      && types.includes(file.type) === false
      && types.some(v => file.name.indexOf(v) !== -1) === false
    ) {
      ElMessage.warning('请上传指定格式的文件');
      throw new Error('请上传指定格式的文件');
    }
  }
};
const upload = async (file: File) => {
  const formData = new FormData();
  formData.append('files', file, file.name);
  const { data } = await uploadFile(formData);
  return data[0].url;
};
const onChange = async (e: Event) => {
  const fileList = [...(e.target as any)!.files as File[]];
  (e.target as any)!.value = '';
  try {
    beforeUpload(fileList);
    showFullScreenLoading();
    const reqArr: any[] = [];
    const fn = async (file: File) => {
      const fileUrl = await upload(file);
      files.value.push({
        url: fileUrl,
      });
      sendMessage({
        msgType: SOCKET_TYPE_ENUM.BUSINESS,
        data: {
          fileUrlList: [fileUrl]
        }
      });
    };
    fileList.forEach(async (file) => {
      reqArr.push(fn(file));
    });
    await Promise.all(reqArr);
  } catch (error) {
    console.log('error', error);
  } finally {
    hideFullScreenLoading();
  }
};
const init = () => {
  const id = $route.params.id as string;
  const data = decryptedData(H5_UPLOAD_PUBLIC_KEY, id);
  if (data === false) {
    $router.replace({
      name: 'NotFound'
    });
    return;
  }
  socketId.value = decryptedData(H5_UPLOAD_PUBLIC_KEY, id) as string;
  createSocket();
};
onBeforeUnmount(() => {
  cleanSocket();
});
init();
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .scrollbar {
    flex: 1;
    min-height: 0;
    .ul {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      .li {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        background-color: #f0f0f0;
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }
  }
  .footer {
    position: relative;
    flex-shrink: 0;
    .btn {
      display: block;
      width: 100vw;
      line-height: 48px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      background-color: var(--el-color-primary);
    }
    .input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}
</style>
<style lang="scss">
.clear_width {
  body {
    min-width: unset;
    overflow: hidden;
  }
}
</style>
