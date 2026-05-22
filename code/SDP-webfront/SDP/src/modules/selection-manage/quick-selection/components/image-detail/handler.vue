<script lang="ts" setup>
import { PropType, inject, onUnmounted, computed, defineEmits } from 'vue';
// import { usePermissionConfig } from '../../use-permission-config';
import { GENERATE_MODE, HD_TASK_MODE, PLAN_ENUM } from '../constant';
// import { HandleOpenDialog } from '../hooks/use-style-derivation-dialog';
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

type HandleOpenDialog = (copyTarget?: {
  weight?: number;
  picList: string[];
  copyCode: string;
  copyType: PLAN_ENUM;
  generateNum: number;
  picIndex: number;
  category: {
    name: string;
    code: string;
  };
  categoryIdentify?: boolean;
}) => void;
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
  categoryCode: {
    type: String,
    default: '',
  },
  categoryName: {
    type: String,
    default: '',
  },
  generateMode: {
    type: Number as PropType<GENERATE_MODE>,
    default: GENERATE_MODE.SINGLE_POSE,
  },
  aigcTaskId: {
    type: String,
    default: '',
  },
  hasPatternExtraction: {
    type: Boolean,
    default: false,
  },
  isCanShowFaceImageUrl: {
    type: Boolean,
    default: false,
  },
  generateItem: {
    type: Object,
    default: () => {
      return {};
    },
  },
  generateWaterImages: {
    type: Object,
    default: () => {
      return {};
    },
  }
});

const isShowFaceImgUrl = defineModel('isShowFaceImgUrl', {
  type: Boolean,
  default: true,
});

// const { FZLJ, KSYS, HXGZT } = usePermissionConfig();

const currentImage = computed(() => props.generateImages[props.curPicIndex]);

const handleCopyLink = async () => {
  const url = isShowFaceImgUrl.value ? currentImage.value.repairImgUrl : currentImage.value.pictureUrl;
  await navigator.clipboard.writeText(url);
  ElMessage.success('已复制图片链接');
  handleCopyLog(props.curPicIndex, url, props.taskCode, props.taskId, props.taskId);
};

const getCurrentImageUrl = () => {
  return isShowFaceImgUrl.value
    ? (currentImage.value.repairImgUrl || currentImage.value.pictureUrl)
    : currentImage.value.pictureUrl;
};

const handleOpenStyleDerivationDialog = inject<HandleOpenDialog>('handleOpenStyleDerivationDialog');


const handleDownload = async () => {
  const { taskCode, taskId, aigcTaskId } = props;
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

const $router = useRouter();


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
        type="primary"
        class="tw-ml-0!"
        @click="handleDownload4K"
      >
        下载4K图片
      </el-button>

    </div>
    <div class="titlt-left">
      <img
        @click="evaluate"
        class="ico-sty"
        :src="pj"
        alt=""
      >
    </div>
    <div />
  </div>
</template>

<style scoped>
.ico-sty {
  width: 25px;
  height: 25px;
  margin-right: 20px;
  cursor: pointer;
}
.titlt-left {
  display: flex;
}
</style>
