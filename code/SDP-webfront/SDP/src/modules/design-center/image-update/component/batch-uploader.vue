<template>
  <div class="tw-flex tw-gap-4 tw-w-full tw-min-h-0 tw-h-full tw-mb-[-10px]">
    <div class="left-side tw-w-240px">
      <el-scrollbar>
        <StyleList
          v-model:index="activeIndex"
          :style-list="innerStyleList"
          :is-editable="isUploadable"
          @remove="onStyleRemove"
        >
          <template #info="{ data, index }">
            <el-icon v-if="isUploadable && hasStyleFiles((data as IImageUpdatePageItem).taskId)" class="tw-color-success"><SuccessFilled /> </el-icon>
            <slot
              name="style-item-info"
              :data="data"
              :index="index"
            />
          </template>
        </StyleList>
      </el-scrollbar>
    </div>
    <div v-if="activeStyle" class="body tw-flex-1 tw-min-w-0">
      <el-scrollbar class="tw-p-2 tw-h-full">
        <!-- 款式级修图说明 -->
        <div class="style-desc-bar tw-mb-3">
          <span class="tw-font-bold tw-mr-2">修图需求说明：</span>
          <span v-if="!activeStyle.repairDescribe && !activeStyle.repairAttachment">-</span>
          <span v-if="activeStyle.repairDescribe" class="tw-text-gray-700">{{ activeStyle.repairDescribe }}</span>
          <CustomImage
            v-if="activeStyle.repairAttachment"
            :src="activeStyle.repairAttachment"
            class="tw-w-40px tw-h-40px tw-ml-2 tw-align-middle"
            :preview-src-list="[activeStyle.repairAttachment]"
          />
        </div>
        <!-- SKC 卡片列表 -->
        <div
          v-for="(skc, skcIndex) in activeStyle.skcList"
          :key="skc.skcId"
          class="skc-card"
          :class="{ 'tw-mt-3': skcIndex > 0 }"
        >
          <!-- 卡片头部 -->
          <div class="skc-card__header">
            <span>SKC{{ skcIndex + 1 }}</span>
          </div>
          <!-- 卡片正文：左右两栏 -->
          <div class="skc-card__body">
            <!-- 左栏：当前图片 -->
            <div class="skc-col">
              <div class="skc-col__title tw-mb-10px">当前图片</div>
              <div v-if="skc.pictures?.length">
                <div
                  v-for="(item, index) in skc.pictures"
                  :key="item.pictureId"
                  class="pic-row"
                  :class="{ 'tw-border-t tw-border-t-gray-200 tw-border-t-solid tw-pt-2': index > 0 }"
                >
                  <!-- 缩略图 -->
                  <div class="tw-relative tw-flex-shrink-0 image-wrapper">
                    <video
                      v-if="activeStyle.taskType === IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO"
                      class="pic-thumb"
                      :src="item.pictureUrl"
                      controls
                    />
                    <CustomImage
                      v-else
                      :src="item.pictureUrl"
                      :preview-src-list="skc.pictures.map((pic: IImageUpdatePicture) => pic.pictureUrl)"
                      :initial-index="index"
                      class="pic-thumb"
                      fit="contain"
                    />
                    <div class="image-order">{{ index + 1 }}</div>
                  </div>
                  <!-- 修图说明 + 保留按钮 -->
                  <div class="tw-flex-1 tw-min-w-0 tw-ml-2">
                    <p class="tw-text-12px tw-text-gray-500 tw-mb-1">修图需求说明</p>
                    <p class="tw-text-12px tw-text-gray-700 tw-break-all tw-leading-normal">{{ item.pictureDescribe || '-' }}</p>
                    <CustomImage
                      v-if="item.attachment"
                      :src="item.attachment"
                      class="tw-w-40px tw-h-40px tw-mt-1"
                      :preview-src-list="[item.attachment]"
                    />
                    <el-button
                      type="primary"
                      link
                      :class="['tw-mt-1 tw-p-0', { 'tw-text-danger!': hasKeeped(skc.skcId, item) }]"
                      size="small"
                      @click="handleKeep(skc.skcId, item)"
                    >{{ hasKeeped(skc.skcId, item) ? '取消保留' : '保留' }}</el-button>
                  </div>
                </div>
              </div>
              <empty v-else description="暂无图片" />
            </div>
            <!-- 分隔线 -->
            <div class="skc-divider" />
            <!-- 右栏：更新内容 -->
            <div class="skc-col">
              <div class="required-col-label tw-flex tw-items-center tw-mb-10px">
                <div class="skc-col__title">更新内容</div>
                <span class="tw-ml-2 tw-text-gray-500 tw-text-sm">提交更新后将覆盖当前图片，请选择需要保留的当前图片</span>
                <el-button
                  v-if="skc.pictures?.every((p: IImageUpdatePicture) => hasKeeped(skc.skcId, p))"
                  type="primary"
                  link
                  size="small"
                  @click="handleSkcKeepAll(skc.skcId, skc.pictures, false)"
                >全部不保留</el-button>
                <el-button
                  v-else
                  type="primary"
                  link
                  size="small"
                  @click="handleSkcKeepAll(skc.skcId, skc.pictures, true)"
                >全部保留</el-button>
              </div>
              <Uploader
                v-if="isUploadable"
                :model-value="getSkcFiles(activeStyle.taskId, skc.skcId)"
                @update:model-value="(val) => setSkcFiles(activeStyle.taskId, skc.skcId, val)"
                uploader-style="button"
                :limit="config.limit"
                :accept="config.accept"
                :size-limit="config.sizeLimit"
                :tips="config.tips"
              />
              <template v-else>
                <div v-if="getSkcFiles(activeStyle.taskId, skc.skcId).length" class="tw-flex tw-flex-wrap tw-gap-2">
                  <div
                    v-for="(file, index) in getSkcFiles(activeStyle.taskId, skc.skcId)"
                    :key="file.url"
                    class="tw-relative tw-flex-shrink-0 image-wrapper"
                  >
                    <video
                      v-if="activeStyle.taskType === IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO"
                      class="tw-w-148px tw-h-148px tw-block"
                      :src="file.url"
                      controls
                    />
                    <CustomImage
                      v-else
                      :src="file.url"
                      :preview-src-list="getSkcFiles(activeStyle.taskId, skc.skcId).map(f => f.url)"
                      :initial-index="index"
                      class="tw-w-148px tw-h-148px tw-block"
                      fit="contain"
                    />
                  </div>
                </div>
                <empty v-else description="请选择保留图片" />
              </template>
            </div>
          </div>
        </div>
        <empty v-if="!activeStyle.skcList?.length" description="暂无SKC" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType, watch } from 'vue';
import { IFile, IFileData } from '@/components/uploader/packages/types';
import { IImageUpdateBatchCheckReq, IImageUpdateBatchUploadReq, IImageUpdatePageItem, IImageUpdatePicture } from '../api/type';
import StyleList from './style-list.vue';
import { IMAGE_UPDATE_TASK_TYPE_ENUM } from '../constant';
import { ElMessage } from 'element-plus';
import { fetchImageUpdateBatchUpload } from '../api';
import { SuccessFilled } from '@element-plus/icons-vue';

const props = defineProps({
  styleList: {
    type: Array as PropType<Array<IImageUpdatePageItem>>,
    default: () => []
  },
  /** 是否可以上传 */
  isUploadable: {
    type: Boolean,
    default: false
  },
});

// { taskId: { skcId: files[] } }
const skcFileListMap = ref({} as { [taskId: string]: { [skcId: string]: Array<IFileData | IFile>; }; });

const innerStyleList = ref<Array<IImageUpdatePageItem>>([]);
const activeIndex = ref<number>(0);
const activeStyle = computed(() => innerStyleList.value[activeIndex.value]);

const getSkcFiles = (taskId: string, skcId: string): Array<IFileData | IFile> => {
  if (!skcFileListMap.value[taskId]) skcFileListMap.value[taskId] = {};
  if (!skcFileListMap.value[taskId][skcId]) skcFileListMap.value[taskId][skcId] = [];
  return skcFileListMap.value[taskId][skcId];
};

const setSkcFiles = (taskId: string, skcId: string, val: Array<IFileData | IFile>) => {
  if (!skcFileListMap.value[taskId]) skcFileListMap.value[taskId] = {};
  skcFileListMap.value[taskId][skcId] = val;
};

const hasStyleFiles = (taskId: string): boolean => {
  const skcMap = skcFileListMap.value[taskId];
  return !!skcMap && Object.values(skcMap).some(files => files.length > 0);
};

// 所有 SKC 文件的平铺列表，供外部使用
const fileList = computed(() => {
  if (!activeStyle.value) return [];
  const skcMap = skcFileListMap.value[activeStyle.value.taskId] || {};
  return Object.values(skcMap).flat();
});

// 当前激活风格的 SKC 上传图片列表（结构化），供外部审核接口使用
const activeSkcList = computed<IImageUpdateBatchCheckReq[number]['skcList']>(() => {
  if (!activeStyle.value) return [];
  const skcMap = skcFileListMap.value[activeStyle.value.taskId] || {};
  return (activeStyle.value.skcList || []).map(skc => ({
    skcId: skc.skcId,
    currentPictures: skc.pictures?.map(p => p.pictureUrl) || [],
    pictures: (skcMap[skc.skcId] || []).map((f: IFileData | IFile) => f.url),
  }));
});

const config = computed(() => {
  if (activeStyle.value?.taskType === IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO) {
    return {
      limit: 1,
      accept: '.mp4, .mov, .avi',
      sizeLimit: 50,
      tips: '仅上传 1 个视频，支持 mp4、mov、avi 格式，最大 50M'
    };
  } else {
    return {
      limit: 10,
      accept: '.png, .jpg, .jpeg',
      sizeLimit: 20,
      tips: '最多上传 10 张图片，支持 png、jpg、jpeg 格式'
    };
  }
});

const onStyleRemove = (index: number) => {
  const item = innerStyleList.value[index];
  if (item) {
    delete skcFileListMap.value[item.taskId];
    innerStyleList.value.splice(index, 1);
  }
};

const checkOverLimit = (skcId: string) => {
  if (!activeStyle.value) return false;
  const files = getSkcFiles(activeStyle.value.taskId, skcId);
  if (files.length >= config.value.limit) {
    const fileTypeName = activeStyle.value.taskType === IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO ? '个视频' : '张图片';
    ElMessage.warning(`最多更新 ${config.value.limit} ${fileTypeName}`);
    return true;
  }
  return false;
};

const hasKeeped = (skcId: string, item: IImageUpdatePicture) => {
  if (!activeStyle.value) return false;
  return getSkcFiles(activeStyle.value.taskId, skcId).some(file => file.url === item.pictureUrl);
};

const handleKeep = (skcId: string, item: IImageUpdatePicture) => {
  if (!activeStyle.value) return;
  const { taskId } = activeStyle.value;
  if (hasKeeped(skcId, item)) {
    setSkcFiles(taskId, skcId, getSkcFiles(taskId, skcId).filter(file => file.url !== item.pictureUrl));
    return;
  }
  if (checkOverLimit(skcId)) return;
  getSkcFiles(taskId, skcId).push({ url: item.pictureUrl });
};

const handleSkcKeepAll = (skcId: string, pictures: IImageUpdatePicture[], isAll: boolean) => {
  if (!activeStyle.value) return;
  if (isAll) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of pictures) {
      if (checkOverLimit(skcId)) break;
      // eslint-disable-next-line no-continue
      if (hasKeeped(skcId, item)) continue;
      handleKeep(skcId, item);
    }
  } else {
    const { taskId } = activeStyle.value;
    setSkcFiles(taskId, skcId, getSkcFiles(taskId, skcId).filter(
      file => !pictures.some(p => p.pictureUrl === file.url),
    ));
  }
};

const submit = async (): Promise<boolean> => {
  // 如果没有款式，则提示款式不能为空
  if (!innerStyleList.value?.length) {
    ElMessage.warning('款式列表不能为空');
    return false;
  }
  const emptyStyleIndexes: number[] = [];
  innerStyleList.value.forEach((item, index) => {
    if (!hasStyleFiles(item.taskId)) emptyStyleIndexes.push(index);
  });
  if (emptyStyleIndexes.length) {
    ElMessage.warning(`第 ${emptyStyleIndexes.map(i => i + 1).join('、')} 款式更新内容不能为空`);
    return false;
  }
  const uploadData: IImageUpdateBatchUploadReq = innerStyleList.value.map((item) => {
    return {
      taskId: item.taskId,
      skc: item.skcList.map(skcItem => ({
        skcId: skcItem.skcId,
        pictures: getSkcFiles(item.taskId, skcItem.skcId).map(f => f.url),
      })),
    };
  });
  await fetchImageUpdateBatchUpload(uploadData);
  ElMessage.success('批量更新成功');
  return true;
};

const initSkcFileListMap = (list: IImageUpdatePageItem[]) => {
  const map: Record<string, Record<string, Array<IFileData | IFile>>> = {};
  list.forEach((item) => {
    map[item.taskId] = {};
    item.skcList?.forEach((skcItem) => {
      if (skcItem.resultPictures?.length) {
        map[item.taskId][skcItem.skcId] = skcItem.resultPictures.map(url => ({ url }));
      } else {
        map[item.taskId][skcItem.skcId] = [];
      }
    });
  });
  return map;
};

const reset = () => {
  innerStyleList.value = [...props.styleList];
  skcFileListMap.value = initSkcFileListMap(props.styleList);
  activeIndex.value = 0;
};

const next = () => {
  if (activeIndex.value < innerStyleList.value.length - 1) {
    activeIndex.value += 1;
  }
};

watch(() => props.styleList, (val) => {
  innerStyleList.value = [...val];
  skcFileListMap.value = initSkcFileListMap(val);
}, { immediate: true });

defineExpose({
  submit,
  reset,
  next,
  fileList,
  activeSkcList,
  activeStyle
});
</script>

<style lang="scss" scoped>
.style-desc-bar {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: var(--el-color-primary-light-9);
  border-radius: 4px;
  font-size: 13px;
}
.skc-card {
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  overflow: hidden;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    font-weight: 600;
    font-size: 13px;
    background: var(--el-fill-color-light);
    border-bottom: 1px solid var(--el-border-color);
    color: var(--el-text-color-primary);
  }
  &__body {
    display: flex;
  }
}
.skc-col {
  flex: 1;
  min-width: 0;
  padding: 12px;
  &:first-child {
    flex: 0 0 200px;
    width: 200px;
  }
  &__title {
    font-size: 13px;
    font-weight: 600;
    color: var(--el-text-color-regular);
  }
}
.skc-divider {
  width: 1px;
  background: var(--el-border-color);
  flex-shrink: 0;
}
.required-col-label {
  &::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
    font-weight: bold;
  }
}
.pic-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
}
.image-wrapper {
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid var(--el-border-color);
  background-color: #000;
}
.pic-thumb {
  display: block;
  width: 80px;
  height: 80px;
}
.image-order {
  display: flex;
  position: absolute;
  left: 4px;
  top: 4px;
  width: 18px;
  height: 18px;
  color: #fff;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.45);
  justify-content: center;
  align-items: center;
  font-size: 11px;
}
</style>
