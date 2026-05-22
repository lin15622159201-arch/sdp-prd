<script lang="ts" setup>
import { PropType, onUnmounted, computed } from 'vue';
import { HD_TASK_MODE } from '../constant';
import { ElMessage } from 'element-plus';
import EvaluateDialog from '@/components/evaluateDialog';
import { handleCopyLog, handleDownloadImg } from './hooks/lib/task';
import { useRouter } from 'vue-router';
import { useLoopGetHDImage } from '../hooks/use-get-hd-image';
import { debounce } from 'lodash-es';
import { GenerateFlatList } from './type';
import { userEvaluateImageGroupSaveOrUpdateApi } from '../api/index';
import { UserEvaluateImageGroupSaveOrUpdateReq } from '../api/type';
import pj from '@/assets/pj1.png';
import dz from '@/assets/dz1.png';
import dz2 from '@/assets/dz2.png';
import nodz from '@/assets/noDz.png';
import nodz2 from '@/assets/noDz1.png';
import { TASK_TYPE_ENUM } from '@/constant/task';
import { useSendTask } from '@/hooks/use-send-task';

const props = defineProps({
  generateImages: {
    type: Array as PropType<GenerateFlatList>,
    default: () => [],
  },
  curPicIndex: {
    type: Number,
    default: 0,
  },
  pickingId: {
    type: String,
    default: '',
  },
  taskCode: {
    type: String,
    default: '',
  },
  taskId: {
    type: String,
    default: '',
  },
  isCanShowFaceImageUrl: {
    type: Boolean,
    default: false,
  },
  generateWaterImages: {
    type: Object,
    default: () => {
      return {};
    },
  },
  isFission: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: '',
  },
  /** 不显示的按钮列表 */
  invisibleHandlers: {
    type: Array as PropType<Array<'download4K' | 'sendTask'>>,
    default: () => [],
  },
});

const isShowFaceImgUrl = defineModel('isShowFaceImgUrl', {
  type: Boolean,
  default: true,
});

const currentImage = computed(() => props.generateImages[props.curPicIndex]);

const handleCopyLink = async () => {
  const url = isShowFaceImgUrl.value ? currentImage.value.repairImgUrl : currentImage.value.pictureUrl;
  await navigator.clipboard.writeText(url);
  ElMessage.success('已复制图片链接');
  // handleCopyLog(props.curPicIndex, url, props.taskCode, props.taskId, props.taskId);
};

const getCurrentImageUrl = () => {
  return isShowFaceImgUrl.value
    ? (currentImage.value.repairImgUrl || currentImage.value.pictureUrl)
    : currentImage.value.pictureUrl;
};

const handleDownload = async () => {
  const { taskCode, taskId } = props;
  const url = getCurrentImageUrl();
  handleDownloadImg(url, props.curPicIndex, taskCode, taskId, taskId);
};

const { startLoop, stopLoop } = useLoopGetHDImage({});

const handleDownload4K = debounce(() => {
  const url = getCurrentImageUrl();
  const { pictureId } = currentImage.value;
  startLoop({
    originTaskId: props.taskId,
    pictureId,
    pictureUrl: url,
    taskMode: HD_TASK_MODE.SMART_DESIGN,
    picIndex: props.curPicIndex,
  });
});

const router = useRouter();


onUnmounted(() => {
  stopLoop();
});

// 评价
const evaluate = () => {
  EvaluateDialog({
    group: {
      groupNum: props.generateWaterImages.groupNum,
    },
    taskId: props.pickingId
  });
};
const emit = defineEmits<{
  (event: 'reload'): void;
}>();
// 点赞
const groupFun = (type: number, goods: number) => {
  const good = props?.generateWaterImages?.good ?? null;
  const baseParams = {
    evaluateImageId: props.generateWaterImages.evaluateImageId,
    pictureGroupId: props.generateWaterImages.pictureId,
  };
  // const targetGood = type === 1
  //   ? (good !== 1 ? 1 : null)
  //   : (good !== 0 ? 0 : null);
  //   let targetGood;
  let targetGood = null;
  if (type === 1) {
    targetGood = good !== 1 ? 1 : null;
  } else {
    targetGood = good !== 0 ? 0 : null;
  }
  const params: UserEvaluateImageGroupSaveOrUpdateReq = { ...baseParams, good: targetGood };
  userEvaluateImageGroupSaveOrUpdateApi(params).then(() => {
    ElMessage.success('成功');
    emit('reload');
  });
};
// const fissionFun = () => {
//   $router.push({
//     name: 'PostureFissionAdd',
//     query: {
//       byDeriveId: props.taskId,
//       selectId: props.generateWaterImages.pictureList[props.curPicIndex].pictureId,
//       taskSource: 'style_gen',
//     }
//   });
// };
const { SEND_TASK_LIST, sendTask } = useSendTask(props.type as TASK_TYPE_ENUM);
const quickTag = (type: string) => {
  const taskSource = props.type;
  if (taskSource === TASK_TYPE_ENUM.REPLACE_COLOR) {
    sendTask({ type: type as TASK_TYPE_ENUM, taskId: props.taskId, imgs: String(props.curPicIndex) });
    return;
  }
  const selectId = props.generateImages[props.curPicIndex].pictureId;
  // 兼容旧版,新版本建议统一用 sendTask()
  if (type === 'floral_pattern_apply') {
    const routeData: any = router.resolve({
      name: 'Webview',
      query: {
        domain: 'fashion-design',
        path: '/#/digital-print/pattern-try-on/create',
        activeMenu: 'Webview?domain=fashion-design&path=/#/digital-print/pattern-try-on/list',
        query: JSON.stringify({
          byStylishDerivationId: props.taskId,
          selectId,
          taskSource,
        })
      }
    });
    window.open(routeData.href, '_self');
  } else if (type === 'fashion_virtual_try_on') {
    // 虚拟换衣
    const routeData: any = router.resolve({
      name: 'Webview',
      query: {
        domain: 'fashion-design',
        path: '/#/inspiration-center/virtual-change/create',
        activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list',
        query: JSON.stringify({
          byStylishDerivationId: props.taskId,
          selectId,
          taskSource,
          // activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list'
        })
      }
    });
    window.open(routeData.href, '_self');
    // toLowerCase是为了兼容字典旧值，以防字典没有改（改了之后可删）
  } else if (type.toLowerCase() === TASK_TYPE_ENUM.POSE_FISSION) {
    // 姿势裂变
    router.push({
      name: 'PostureFissionAdd',
      query: {
        byStylishDerivationId: props.taskId,
        selectId,
        taskSource,
      }
    });
  } else if (type === 'image_repair') {
    // 图案修复
    router.push({
      name: 'ImageRestorationAdd',
      query: {
        byStylishDerivationId: !props.isFission ? props.taskId : undefined,
        byPostureFissionId: props.isFission ? props.taskId : undefined,
        selectId,
        taskSource,
      }
    });
  } else if (type === TASK_TYPE_ENUM.REPLACE_COLOR) {
    sendTask({ type, taskId: props.taskId, imgs: selectId });
  }
};
</script>

<template>
  <div class="tw-flex tw-flex-col tw-justify-between tw-h-100%">
    <div class="tw-flex tw-flex-col tw-gap-8px">
      <div
        v-if="isCanShowFaceImageUrl"
        class="tw-flex tw-px-8px tw-bg-white tw-rounded tw-items-center tw-gap-2px"
      >
        <span class="tw-text-nowrap tw-text-#3F414D">脸部修复</span>
        <el-switch
          v-model="isShowFaceImgUrl"
          inline-prompt
          :active-value="true"
          :inactive-value="false"
        />
      </div>
      <el-button
        type="primary"

        @click="handleDownload"
      >
        下载
      </el-button>
      <el-button
        type="primary"
        class="tw-ml-0!"
        @click="handleCopyLink"
      >
        复制链接
      </el-button>
      <el-button
        v-if="!invisibleHandlers.includes('download4K')"
        type="primary"
        class="tw-ml-0!"
        @click="handleDownload4K"
      >
        下载4K图片
      </el-button>

    </div>
    <div class="titlt-left">
      <!-- <img
        @click="evaluate"
        class="ico-sty"
        :src="pj"
        alt=""
      >
      <img
        @click="() => {
          groupFun(1, generateWaterImages.good)
        }"
        class="ico-sty"
        style="margin: 10px 0;"
        :src="generateWaterImages.good === 1 ? dz2 : dz"
        alt=""
      >
      <img
        @click="() => {
          groupFun(0, generateWaterImages.good)
        }"
        class="ico-sty"
        :src="generateWaterImages.good === 0 ? nodz2 : nodz"
        alt=""
      > -->
    </div>
    <div
      class="tw-flex tw-flex-col tw-gap-8px"
      v-if="!invisibleHandlers.includes('sendTask')"
    >
      <div v-if="SEND_TASK_LIST?.length" class="tw-text-white tw-pb-5px tw-font-bold">发送到:</div>
      <el-button
        v-for="item in SEND_TASK_LIST"
        :key="item.code"
        @click="quickTag(item.code)"
        type="primary"
        class="tw-ml-0!"
      >
        {{ item.name }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.titlt-left {
  display: flex;
  flex-direction: column;
}
.ico-sty {
  width: 25px;
  height: 25px;
  margin-right: 20px;
  cursor: pointer;
}
</style>
