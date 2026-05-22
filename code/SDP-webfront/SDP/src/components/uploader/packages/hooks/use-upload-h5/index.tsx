import Socket from '@/core/utils/socket';
import { useDialog } from '@toy/business-components';
import { onUnmounted, ref } from 'vue';
import { ISocketReq, ISocketRes } from './types';
import { useTimeoutWorker } from '@/hooks/use-timeout-worker';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useAppStore } from '@/store/app';
import { H5_UPLOAD_PUBLIC_KEY, SOCKET_TYPE_ENUM } from './constant';
import { v4 as uuid } from 'uuid';
import styles from './index.module.scss';
import { IFileData } from '../../types';
import { useRouter } from 'vue-router';
import QRCode from 'qrcode';
import { encryptedData } from '@/core/utils/encrypt';

export const useUploadH5 = (props: any, emit: any) => {
  const id = ref();
  const codeUrl = ref(''); // 二维码 URL
  const $router = useRouter();
  const files = ref<IFileData[]>([]);
  const uploadFiles = ref<IFileData[]>([]);
  const selectedIds = ref<string[]>([]);
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
          closeDialog();
        });
      }, 2000);
    }, 5000);
  };
  // 创建连接
  const createSocket = () => {
    cleanSocket();
    const { systemDomain } = useAppStore();
    const socketDomain = systemDomain?.FashionDesignApi?.replace('https', 'wss');
    wsEl.value = new Socket(
      `${socketDomain}/fashion-demand/websocket/file/direct-upload/${id.value}`,
      {
        onReconnect() {
          console.log('正在重连');
        },
        async onMaximum() {
          console.log('超过最大重连次数');
          cleanSocket();
          ElMessageBox.alert('服务异常', '提示', {
            type: 'error',
            confirmButtonText: '关闭',
            showCancelButton: false,
          }).finally(() => {
            closeDialog();
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
              case SOCKET_TYPE_ENUM.BUSINESS: {
                const [url] = data.data.fileUrlList;
                const uid = uuid();
                uploadFiles.value.push({
                  url,
                  id: uid
                });
                if (files.value.length < props.limit) {
                  files.value.push({
                    url,
                    id: uid
                  });
                  selectedIds.value.push(uid);
                }
                break;
              }
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
  const handleChangeSelectedIds = (ids: string[]) => {
    const deleteIds: string[] = [];
    const addIds: string[] = [];
    selectedIds.value.forEach((v) => {
      if (!ids.includes(v)) {
        deleteIds.push(v);
      }
    });
    ids.forEach((v) => {
      if (!selectedIds.value.includes(v)) {
        addIds.push(v);
      }
    });
    if (files.value.length - deleteIds.length + addIds.length > props.limit) {
      ElMessage.error(`最多只能选择${props.limit}张图片`);
      return;
    }
    const list: IFileData[] = [];
    files.value.forEach((v) => {
      if (v.id && deleteIds.includes(v.id as string)) return;
      list.push(v);
    });
    addIds.forEach((v) => {
      const row = uploadFiles.value.find(item => item.id === v);
      if (row) {
        list.push({ ...row });
      }
    });
    selectedIds.value = ids;
    files.value = list;
  };
  const handleDeleteFile = (row: IFileData) => {
    if (row.id) {
      const index = selectedIds.value.findIndex(v => v === row.id);
      if (index === -1) return;
      selectedIds.value.splice(index, 1);
    }
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '手机直传',
    width: 900,
    onClose() {
      files.value = [];
      uploadFiles.value = [];
      cleanSocket();
    },
    onConfirm() {
      if (props.limit < files.value.length) {
        ElMessage.error(`最多上传${props.limit}张图片`);
        return;
      }
      const list = [...files.value];
      emit('change', list);
      emit('update:modelValue', list);
      closeDialog();
    },
    height: '80vh',
    render() {
      return (
        <div class={styles.container}>
          <div class={styles.container_left}>
            <img
              class={styles.qrcode}
              src={codeUrl.value}
              alt=''
            />
            <div class={styles.tip}>手机扫码快速传输</div>
          </div>
          <div class={styles.container_right}>
            <el-scrollbar class='tw-h-420px'>
              <div class={styles.title}>上传图片</div>
              <div class={styles.selected_list}>
                {files.value.length === 0 && (
                  <custom-image
                    class='tw-w95px tw-h95px tw-mt5px tw-rounded-4px'
                    src=''
                  />
                )}
                <uploader
                  {...props}
                  uploadH5={false}
                  v-model={files.value}
                  onDelete={handleDeleteFile}
                />
              </div>
              <el-checkbox-group
                model-value={selectedIds.value}
                onChange={handleChangeSelectedIds}
              >
                <div class={styles.list}>
                  {uploadFiles.value.map(v => (
                    <div
                      class={styles.li}
                      key={v.id}
                    >
                      <custom-image
                        class={styles.cover}
                        fit='cover'
                        src={v.url}
                      />
                      <el-checkbox class={styles.checkbox} label={v.id} />
                    </div>
                  ))}
                  {uploadFiles.value.length === 0 && (
                    <div class='tw-flex-center-x tw-w-100%'>
                      <empty description='暂无图片' />
                    </div>
                  )}
                </div>
              </el-checkbox-group>
            </el-scrollbar>
          </div>
        </div>
      );
    },
  }));
  const handleOpenUploadH5 = async () => {
    id.value = uuid();
    files.value = [...props.modelValue];
    const url = $router.resolve({
      name: 'UploadImageH5',
      params: {
        id: encryptedData(H5_UPLOAD_PUBLIC_KEY, id.value) as string
      },
    });
    console.log(`${window.location.origin}/${url.href}`);

    codeUrl.value = await QRCode.toDataURL(`${window.location.origin}/${url.href}`, {
      width: 200,
      margin: 0,
    });
    openDialog();
    createSocket();
  };
  onUnmounted(() => {
    cleanSocket();
  });
  return {
    handleOpenUploadH5
  };
};
