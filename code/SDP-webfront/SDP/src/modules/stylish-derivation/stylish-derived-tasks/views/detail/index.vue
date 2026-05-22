<template>
  <sc-app-page class="custom-app-page bg-gray">
    <template #fheader>
      <div class="fheader-box">
        <el-icon style="cursor: pointer;" @click="goToBack"><ArrowLeftBold /></el-icon>
        <div class="title-font">任务编码 <span style="margin-left: 10px;">{{ chooseProductList.taskCode }}</span></div>
        <div>创建人：{{ chooseProductList.creatorName }}</div>
        <div class="m-l-10">生成时间：{{ filters.formatTime(chooseProductList.generateTime) }}</div>
        <el-button
          v-if="SC"
          @click="handleDelete"
          class="fheader-left"
        >删除</el-button>
        <el-button
          v-if="FZ && chooseProductList.taskStatus === 30"
          @click="taskCopy"
          :loading="loading"
          type="primary"
        >复制任务</el-button>
      </div>
    </template>
    <template #main>
      <div class="tw-h-100% main-box">

        <div class="main-left">
          <div v-if="chooseProductList.refImgUrl" class="title">参考图</div>
          <div v-if="chooseProductList.refImgUrl" class="img-box">
            <el-image
              class="hostGraph"
              :src="chooseProductList.refImgUrl"
              :preview-src-list="[chooseProductList.refImgUrl]"
              show-progress
              :initial-index="0"
              fit="cover"
            />
          </div>
          <div class="text-left">
            <div class="title" style="margin-top: 40px;">任务详情</div>
            <div class="m-5">
              风格模型：{{ chooseProductList.styleModelName || '-' }}
            </div>
            <div class="m-5" style="word-break: break-all;">
              提示词：{{ chooseProductList.prompt || '-' }}
            </div>
          </div>
          <div class="bg-img-box">
            <div class="t-f" style="color: gray;">设置：</div>
            <div class="bg-img-item">
              <el-image
                v-if="chooseProductList.bgImgUrl"
                style="width: 70px; height: 80px"
                :src="chooseProductList?.bgImgUrl"
                :preview-src-list="[chooseProductList?.bgImgUrl ?? '']"
                show-progress
                :initial-index="0"
                fit="cover"
              />
              <el-image
                v-if="chooseProductList.modelImgUrl"
                style="width: 70px; height: 80px"
                :src="chooseProductList?.modelImgUrl"
                :preview-src-list="[chooseProductList?.modelImgUrl ?? '']"
                show-progress
                :initial-index="0"
                fit="cover"
              />
            </div>
          </div>
          <div class="m-5">
            分辨率：{{ chooseProductList.imgSize || '-' }}
          </div>
          <div class="m-5">
            是否加速：{{ chooseProductList.enableDistill === 1 ? '是' : (chooseProductList.enableDistill === 0 ? '否' : '-') }}
          </div>
          <div class="m-5">
            风格参考：{{ enableFollowabilityList?.find(v => v.value === chooseProductList.enableFollowability?.toString())?.label ?? '-' }}
          </div>
          <div class="title" style="margin-top: 40px;">下游关联任务</div>
          <div
            class="tb-box"
            v-for="(item, index) in fissionList"
            :key="index"
          >
            <div>
              <span>姿势裂变</span>
              <el-tag
                class="taskType"
                :type="DESIGN_DEMAND_STATUS_LIST.find(v => v.value === item.taskStatus)?.color ?? 'primary'"
              >{{ DESIGN_DEMAND_STATUS_LIST.find(v => v.value === item.taskStatus)?.label }}</el-tag>
            </div>
            <div class="code-font" @click="handleToDetail(item.taskId)">
              {{ item.taskCode }}
            </div>
          </div>
        </div>
        <div class="main-right">
          <div class="titlt-left" v-if="!dialogImgVisible">
            <span class="title-t">生成结果</span>
            <!-- <img
              class="ico-sty"
              :src="pj"
              @click="evaluate"
              alt=""
            >
            <img
              @click="() => {
                groupFun(1)
              }"
              class="ico-sty"
              :src="dataGroup.good === 1 ? dz2 : dz"
              alt=""
            >
            <img
              @click="() => {
                groupFun(0)
              }"
              class="ico-sty"
              :src="dataGroup.good === 0 ? nodz2 : nodz"
              alt=""
            > -->
            <div
              v-if="chooseProductList.images && chooseProductList.images.length"
              @click="dialogImgVisible = true"
              class="batchOperation"
            >批量操作</div>
          </div>
          <div class="titlt-left" v-if="dialogImgVisible">
            <div class="title-t" style="font-weight: 100;">
              <el-checkbox @change="selectAllFun" v-model="selectAll">全选</el-checkbox>
              <div style="margin-left: 10px;">已选中 {{ (chooseProductList.images || []).filter(v => v.select).length }} 张</div>
            </div>
            <div
              class="batchOperation tw-flex-center-y"
            >
              <!-- <el-button
                class="bth"
                type="primary"
                @click="fissionFun"
                :disabled="!(chooseProductList.images || []).filter(v => v.select).length"
              >姿势裂变</el-button> -->
              <TaskCollection
                :type="TASK_TYPE_ENUM.STYLE_GEN"
                :taskId="chooseProductList.taskId || ''"
                :imgs="(chooseProductList.images || []).filter(v => v.select).map(v => v.imageId).join(',')"
              />
              <el-button
                @click="handleDownload"
                type="primary"
                :disabled="!(chooseProductList.images || []).filter(v => v.select).length"
              >下载图片</el-button>
              <el-button
                @click="handleCopyLink"
                :disabled="!(chooseProductList.images || []).filter(v => v.select).length"
              >复制链接</el-button>
              <el-button
                @click="dialogImgVisible = false"
              >取消</el-button>
            </div>
          </div>
          <div
            class="img-items"
          >
            <div class="hostGraph-img-box">
              <div
                class="hostGraph-item-box"
                v-for="(item, index) in chooseProductList.images || []"
                :key="index"
              >
                <img
                  @click="handleOperateLog(index, item)"
                  :src="item.faceRepairUrl || item.imageUrl"
                  alt=""
                  class="hostGraph-item"
                >
                <el-checkbox
                  v-if="dialogImgVisible"
                  class="sele-p-a"
                  v-model="item.select"
                />
              </div>
            </div>
          </div>
          <el-empty v-if="!chooseProductList.images || !chooseProductList.images.length" description="暂无数据" />
        </div>
      </div>

      <!-- <el-dialog
        v-model="dialogImgVisible"
        title=""
        width="80%"
      >
        <BatchOperation
          @selectFun="selectFun"
          :urls="chooseProductList.images"
          :taskId="chooseProductList.taskId || ''"
          :taskCode="chooseProductList.taskCode"
          @cancel="dialogImgVisible = false"
        />
      </el-dialog> -->
      <ImageDetail
        v-model="imageDetailDialog.visible"
        :taData="imageDetailDialog.taData"
        :picIndex="imageDetailDialog.picIndex"
        type="style_gen"
      />
    </template>
  </sc-app-page>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { webStyleGenApi, userEvaluateImageGroupGetByBusIdApi, userEvaluateImageGroupSaveOrUpdateApi, postureFissionTaskPageApi, imageDownloadLog } from '../../api/index';
import { WebStyleGenRes, UserEvaluateImageGroupSaveOrUpdateReq, WebStyleGenResImagesItem, UserEvaluateImageGroupGetByBusIdRes, IImageDownloadLogReq } from '../../api/types';
import {
  IPickingStylePageRes,
  IPickingStylePageResListItem,
  IPickingStylePageResPickingStyleImagesItem,
  IPickingStylePageResPickingStyleDetailsItem,
  PickingStyleBatchConfirmReqResultItem,
  PickingStyleBatchConfirmReq,
  SmartDevelopStyleDetailRes,
  SmartDevelopStyleDetailResGenerateImagesItem,
} from '@/modules/selection-manage/aigc-selection-list/api/type';
import { ArrowLeftBold, Filter, AlarmClock, ArrowUp, ArrowDown, CircleCheckFilled, CircleCloseFilled, ChatLineSquare, Search } from '@element-plus/icons-vue';
import { useAccountStore } from '@/store/account';
import { IConfigItem } from '@toy/business-components';
import ImageDetail from '@/components/view-picture/components/image-detail/image-detail.vue';
import { ElMessage } from 'element-plus';
import type { DatePickerProps } from 'element-plus';
import UserQuerySelect from '@/components/user-query-select/index.vue';
import { useFetchUsers } from '@/components/user-query-select/hooks/use-fetch-users';
import { formatTime } from '@toy/utils';
import EvaluateDialog from '@/components/evaluateDialog';
import { useRouter, useRoute } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import {
  PICK_STATE_ENUM,
} from '@/modules/selection-manage/aigc-selection-list/constant';
import BatchOperation from '../../components/batchOperation.vue';
import { batchDownloadFile } from '@/core/utils/download';
import { usePermissionConfig } from '../../use-permission-config';
import { handleBatchDelete } from '../../lib/task';
import { filters } from '@/core/plugins/filter';
import ycl from '@/assets/ycl.png';
import dz from '@/assets/dz3.png';
import dz2 from '@/assets/dz2.png';
import nodz from '@/assets/noDz2.png';
import nodz2 from '@/assets/noDz1.png';
import pj from '@/assets/pj.png';
import TaskCollection from '../../components/taskCollection/index.vue';
import { TASK_TYPE_ENUM } from '@/constant/task';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
// import wcl from '@/assets/wcl.png';

const { SC, FZ } = usePermissionConfig();
interface UserQuerySelectComponent {
  defaultSeeMe: () => void;
  // 可以添加其他方法或属性
}
enum DESIGN_DEMAND_STATUS_ENUM {
  /** 排队中 */
  WAIT_DISPATCH = 'QUEUEING',
  /** 生成中 */
  WAIT_HANDLE = 'GENERATING',
  /** 已生成 */
  DISUSE = 'COMPLETED',
  /** 已中止 */
  FINISH = 'ABORTED',
  /** 生成失败 */
  GF = 'FAILED',
}
type TagType = 'primary' | 'warning' | 'success' | 'danger' | 'info';
interface DesignDemandStatus {
  value: string;
  label: string;
  color: TagType; // 明确指定color为TagType类型
}

const DESIGN_DEMAND_STATUS_LIST: DesignDemandStatus[] = [
  { label: '排队中', value: DESIGN_DEMAND_STATUS_ENUM.WAIT_DISPATCH, color: 'primary' },
  { label: '生成中', value: DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE, color: 'warning' },
  { label: '已生成', value: DESIGN_DEMAND_STATUS_ENUM.DISUSE, color: 'success' },
  { label: '已中止', value: DESIGN_DEMAND_STATUS_ENUM.FINISH, color: 'danger' },
  { label: '生成失败', value: DESIGN_DEMAND_STATUS_ENUM.GF, color: 'danger' },
];

const loading = ref(false);
const router = useRouter();
const route: RouteLocationNormalized = useRoute();
// const newTaskCode = ref<string>(route.query.taskCode?.toString() ?? '');
const details = ref({});
const generateImages = ref<SmartDevelopStyleDetailResGenerateImagesItem[]>([]);
const isImgDialog = ref(false);
const isShow = ref(false);
const userQuerySelect = ref<UserQuerySelectComponent | null>(null);
const dialogFormVisible = ref(false);
const accountStore = useAccountStore();
const { account } = accountStore;
// const { id } = account;
const creatorIds = account?.id ?? '';
const dialogImgVisible = ref(false);
const params = ref({
  pickingTime: [],
  creatorIds: [creatorIds || ''],
});
const indexChooseProduct = ref<number>(0);
const chooseProductList = ref<WebStyleGenRes>({});
const dataGroup = ref<any>({});
const fissionList = ref<any>([]);
const init = async () => {
  const res = await webStyleGenApi(route.query.taskId as string);
  // const { data } = await userEvaluateImageGroupGetByBusIdApi({
  //   pictureGroupId: (route.query.taskId as string) || '',
  //   origin: 'style_redesign',
  // });
  // dataGroup.value = data?.[0] ?? {};
  chooseProductList.value = res.data;
  const { data } = await postureFissionTaskPageApi({
    pageNum: 1,
    pageSize: 100,
    sourceBusinessCode: res.data.taskCode,
  });
  fissionList.value = data.list;
};



const designTaskData = ref<WebStyleGenRes>({});



if (route.query.taskId) {
  init();
}



// 定位
const dialogImgFun = (index: number) => {
  indexChooseProduct.value = index;
  dialogImgVisible.value = false;
};


// 评价
const evaluate = () => {
  EvaluateDialog({
    group: {
      groupNum: 1,
    },
    taskId: route.query.taskId,
    origin: 'style_redesign',
  });
};


// 返回上一页
const goToBack = () => {
  router.back();
};

// 复制任务
const taskCopy = async () => {
  router.push({
    name: 'StylishDerivedTasksCreate',
    query: {
      taskId: route.query.taskId,
    }
  });
};

// 删除
const handleDelete = async () => {
  await handleBatchDelete([route.query.taskId as string], goToBack);
};

// 点赞
const groupFun = (type: number) => {
  const good = dataGroup.value?.good ?? null;
  const baseParams = {
    evaluateImageId: dataGroup.value.evaluateImageId,
    pictureGroupId: (dataGroup.value.pictureGroupId as string) || (route.query.taskId as string),
  };
  // const targetGood: number | null = type === 1
  //   ? (good !== 1 ? 1 : null)
  //   : (good !== 0 ? 0 : null);
  let targetGood: number | null;
  if (type === 1) {
    targetGood = good !== 1 ? 1 : null;
  } else {
    targetGood = good !== 0 ? 0 : null;
  }
  const newparams: UserEvaluateImageGroupSaveOrUpdateReq = { ...baseParams, good: targetGood, origin: 'style_redesign' };
  const pictureGroupId: string = (route.query.taskId as string) || '';
  userEvaluateImageGroupSaveOrUpdateApi(newparams).then(async () => {
    ElMessage.success('成功');
    const { data } = await userEvaluateImageGroupGetByBusIdApi({
      pictureGroupId,
      origin: 'style_redesign',
    });
    dataGroup.value = data?.[0] ?? {};
  });
};

const selectFun = (fal: boolean) => {
  (chooseProductList.value?.images ?? []).forEach((v: any) => {
    v.select = fal;
  });
};
const imageDetailDialog = ref<any>({
  visible: false,
});
const handleOperateLog = (index: number, item: { select?: boolean; }) => {
  if (dialogImgVisible.value) {
    item.select = !item.select;
    return;
  }
  imageDetailDialog.value = {
    visible: true,
    taData: chooseProductList.value,
    picIndex: index,
  };
};

const handleToDetail = (taskId: string) => {
  const url = router.resolve({
    name: 'PostureFissionDetail',
    query: {
      taskId,
    }
  }).href;
  window.open(url, '_blank');
};

const selectAll = ref<boolean>(false);
const fissionFun = async () => {
  const ids = (chooseProductList.value.images || []).filter(v => v.select).map(v => v.imageId);
  if (!ids.length) {
    ElMessage.error('请最少勾选一张图片');
    return;
  }
  router.push({
    name: 'PostureFissionAdd',
    query: {
      byDeriveId: route.query.taskId as string,
      selectId: ids.join(',')
    }
  });
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
  (chooseProductList.value.images || []).forEach((v: any, index: number) => {
    if (v.select) {
      pre.push({
        index,
        url: v.faceRepairUrl || v.imageUrl,
        name: getImgName(v.faceRepairUrl || v.imageUrl),
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
    handleDownloadLog({
      taskId: route.query.taskId as string,
      taskCode: chooseProductList.value.taskCode,
      imageList,
    });
  }
};

type LogReq = Omit<IImageDownloadLogReq, 'downloadAction' | 'downloadType'>;
const handleDownloadLog = async (req: LogReq) => {
  await imageDownloadLog({
    ...req,
    downloadType: 'DESIGN_MATERIAL',
    downloadAction: 1,
  });
};

const handleCopyLink = async () => {
  const urls: string[] = [];
  (chooseProductList.value.images || []).forEach((v: any, index: number) => {
    if (v.select) {
      urls.push(v.faceRepairUrl || v.imageUrl);
    }
  });
  await navigator.clipboard.writeText(urls.join('\r\n'));
  ElMessage.success('已复制图片链接');
};
const selectAllFun = (v: any) => {
  (chooseProductList.value?.images ?? []).forEach((item: any) => {
    item.select = v;
  });
};
watch(
  () => chooseProductList.value.images,
  () => {
    if ((chooseProductList.value.images || []).filter(v => !v.select).length) {
      selectAll.value = false;
    } else {
      selectAll.value = true;
    }
  },
  {
    deep: true,
  }
);

// 风格参考
const { getEnableDictionaryOptions } = useDictionary();
const enableFollowabilityList = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.FG_LORA_FOLLOW));
</script>
<style scoped  lang="scss">
.fheader-box {
  display: flex;
  align-items: center;
  padding: 10px 0 20px;
}
.title-font {
  font-weight: 600;
  margin: 0 20px;
  font-size: 16px;
}
.fheader-left {
  margin-left: auto;
  margin-right: 20px;
}
.main-box {
  display: flex;
  min-width: 1114px;
  overflow: hidden;
}
.main-left {
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 240px;
  margin-right: 20px;
  /* overflow-x: hidden;
  overflow-y: auto; */
  overflow: hidden auto;
  height: 100%;
  background-color: #fff;
  padding: 10px 20px;
}
.main-right {
  flex: 1;
  /* overflow-x: hidden;
  overflow-y: scroll; */
  overflow: hidden auto;
  background-color: #fff;
  padding: 10px 20px;
}
.hostGraph {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.img-box {
  position: relative;
  width: 220px;
  height: 220px;
}
.img-footer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, .7);
  padding: 7px 0;
}
.img-footer-l {
  color: #fff;
  cursor: pointer;
}
.img-footer-m {
  width: 2px;
  height: 10px;
  background-color: #fff;
}
.tag-box {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.m-5 {
  margin: 10px 0;
  color: gray;
}
.bg-img-box {
  display: flex;
  width: 100%;
  margin-top: 10px;
}
.bg-img-item {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.t-f {
  white-space: nowrap;
}
.num-box {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 40px;
  align-items: center;
}
.num-center {
  display: flex;
  align-items: center;
}
.main-right-operate {
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-right: 10px;
}
.img-items {
  display: flex;
  padding-right: 10px;
  box-sizing: border-box;
}
.hostGraph-item {
  width: 260px;
  height: 260px;
  object-fit: contain;
}
.hostGraph-item-box {
  position: relative;
  width: 260px;
  height: 260px;
  cursor: pointer;
}
.bth-mainPicture {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  padding: 5px;
}
.hover-show {
  display: none;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
}
.hostGraph-item-box:hover .hover-show {
  display: flex;
  padding: 5px;
}
.hostGraph-img-box {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.search-show {
  opacity: 0;
}
.hostGraph-item-box:hover .search-show {
  opacity: 1;
}
.sc-search-area-box :deep(.btns) {
  display: none;
}
.dialog-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.dialog-img-box {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.p-a-5 {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
}
.dialog-img-item-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 120px;
  max-height: 400px;
  overflow: hidden auto;
}
.text-left {
  display: flex;
  flex-direction: column;
  width: 200px;
}
.title {
  font-weight: 600;
  text-align: left;
  width: 100%;
  margin: 5px 0 8px;
}
.title-t {
  display: flex;
  align-items: center;
  font-weight: 600;
  text-align: left;
  margin: 5px 0 8px;
}
.tb-box {
  width: 200px;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid rgba(215, 215, 215, 1);
  border-radius: 5px;
  font-size: 12px;
}
.code-font {
  color: #8080FF;
  cursor: pointer;
  margin-top: 10px;
}
.taskType {
  margin-left: 20px;
}
.m-l-10 {
  margin-left: 15px;
}
.titlt-left {
  display: flex;
  align-items: center;
  width: 100%;
}
.ico-sty {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 10px;
}
.batchOperation {
  margin-left: auto;
  color: #8080FF;
  cursor: pointer;
}
.bg-gray {
  :deep(.el-main) {
    padding: 0;
    background: transparent;
  }
}
.sele-p-a {
  position: absolute;
  top: 2px;
  right: 10px;
}
</style>
