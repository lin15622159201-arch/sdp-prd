<template>
  <div class="panel-container">
    <div class="panel-header tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-lg tw-font-bold">生成结果</div>
      <el-button
        v-if="isBatch"
        type="primary"
        @click="handleCancelBatch"
      >取消</el-button>
      <el-button
        v-else
        type="primary"
        :disabled="!generatedPicUrls.length"
        @click="isBatch = true"
      >批量操作</el-button>
    </div>

    <div v-if="isBatch" class="tw-flex tw-justify-end tw-items-center tw-mt-4">
      <el-checkbox
        v-model="isAllSelected"
        class="tw-mr-auto!"
      >全选</el-checkbox>
      <el-dropdown :disabled="!selectedIndexes.length">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in SEND_TASK_LIST"
              :key="item.code"
              @click="onBatchSendTask(item.code)"
            >{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
        <el-button :disabled="!selectedIndexes.length">
          发送到
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </el-button>
      </el-dropdown>
      <el-button
        type="primary"
        class="tw-ml-4"
        :disabled="!selectedIndexes.length"
        @click="handleDownload"
      >
        下载
      </el-button>
      <el-button :disabled="!selectedIndexes.length" @click="handleCopyLink">复制链接</el-button>
    </div>
    <div v-if="generatedPicUrls?.length" class="tw-flex tw-items-center">
      <el-checkbox-group
        v-model="selectedIndexes"
        :disabled="!isBatch"
        class="tw-w-full"
      >
        <el-row :gutter="10">
          <el-col
            v-for="(url, index) in generatedPicUrls"
            :key="index"
            class="tw-relative"
            :span="6"
          >
            <custom-image
              :src="url"
              alt="生成图"
              fit="contain"
              class="image-container tw-w-full"
              @click="isBatch ? toggleSelect(index) : previewImg(index)"
            />
            <el-checkbox
              v-if="isBatch"
              :value="index"
              size="large"
              class="image-checkbox"
            />
          </el-col>
        </el-row>
      </el-checkbox-group>
    </div>
    <empty v-else description="暂无生成结果" />

    <ImageDetail
      v-model="imageDetailDialog.visible"
      :taData="imageDetailDialog.taData"
      :picIndex="imageDetailDialog.picIndex"
      :invisible-handlers="['download4K']"
      :type="TASK_TYPE_ENUM.REPLACE_COLOR"
    />
  </div>
</template>

<script setup lang='ts'>
import ImageDetail from '@/components/view-picture/components/image-detail';
import { batchDownloadFile } from '@/core/utils/download';
import { getImgName } from '@/core/utils/image';
import { ElMessage } from 'element-plus';
import { computed, PropType, ref } from 'vue';
import { TASK_TYPE_ENUM } from '@/constant/task';
import { useSendTask } from '@/hooks/use-send-task';
import { ArrowDown } from '@element-plus/icons-vue';
import { IReplaceColorTaskDetailRes } from '../../api/type';

const props = defineProps({
  detailData: {
    type: Object as PropType<IReplaceColorTaskDetailRes>,
    default: () => ({})
  }
});

const isBatch = ref(false);
const selectedIndexes = ref<number[]>([]);
const generatedPicUrls = computed(() => props.detailData?.replaceColorGeneratedPicUrls || []);
const imageDetailDialog = ref<{
  visible: boolean;
  taData: any;
  picIndex: number;
}>({
  visible: false,
  taData: null,
  picIndex: 0,
});

const { sendTask, SEND_TASK_LIST } = useSendTask(TASK_TYPE_ENUM.REPLACE_COLOR);

const onBatchSendTask = (type: string) => {
  sendTask({ type: type as TASK_TYPE_ENUM, taskId: props.detailData.taskId, imgs: selectedIndexes.value.join(',') });
};

const isAllSelected = computed({
  get: () => {
    return generatedPicUrls.value.length === selectedIndexes.value.length;
  },
  set: (val) => {
    selectedIndexes.value = val ? generatedPicUrls.value.map((_, idx) => idx) : [];
  }
});

/**
 * 选择单个图片
 * @param url
 * @param group
 */
const toggleSelect = (index: number) => {
  const idx = selectedIndexes.value.indexOf(index);
  if (idx > -1) {
    selectedIndexes.value.splice(idx, 1);
  } else {
    selectedIndexes.value.push(index);
  }
};

const handleCancelBatch = () => {
  isBatch.value = false;
  isAllSelected.value = false;
  selectedIndexes.value = [];
};

const handleDownload = async () => {
  await batchDownloadFile(selectedIndexes.value.map((index) => {
    const url = generatedPicUrls.value[index];
    return {
      url,
      name: getImgName(url)
    };
  }));
};

const handleCopyLink = async () => {
  const urls = selectedIndexes.value.map(index => generatedPicUrls.value[index]);
  await navigator.clipboard.writeText(urls.join('\r\n'));
  ElMessage.success('已复制图片链接');
};

const previewImg = (picIndex: number) => {
  // 结果图列表
  const images = generatedPicUrls.value.map(imageUrl => ({ imageUrl }));
  imageDetailDialog.value = {
    visible: true,
    taData: {
      ...props.detailData,
      refImgUrl: props.detailData.replaceColorImgUrls,
      images
    },
    picIndex,
  };
};
</script>

<style scoped lang='scss'>
.image-container {
  object-fit: contain;
  width: 100%;
  margin: 5px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 1;
  margin-bottom: 10px;
  cursor: pointer;
}
.image-checkbox {
  position: absolute;
  top: 0;
  right: 0;
  :deep(.el-checkbox__inner) {
    width: 20px;
    height: 20px;
    &::after {
      left: 6px;
      width: 5px;
      height: 11px;
    }
  }
}
</style>
