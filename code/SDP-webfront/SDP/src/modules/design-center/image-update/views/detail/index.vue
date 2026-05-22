<template>
  <sc-app-page>
    <template #fheader>
      <div class="tw-flex tw-items-center tw-gap-4 tw-mb-4">
        <span>
          任务编号：{{ detailData?.taskCode }}
          <el-tag type="primary" class="tw-text-12px">{{ IMAGE_UPDATE_TASK_TYPE_LIST.find((item) => item.value === detailData?.taskType)?.label || '未知类型'}}</el-tag>
        </span>
        <span>创建人：{{ detailData?.creatorName }}</span>
        <span>创建时间：{{ $filters.formatTime(detailData?.createdTime) }}</span>
        <el-tag :type="taskStatus?.type || 'info'" class="tw-text-12px">{{ taskStatus?.label || '未知状态'}}</el-tag>
      </div>
    </template>

    <template #main>
      <div v-if="detailData">
        <div class="info-bar tw-mb-4">
          <div class="info-bar__row">
            <span class="info-item"><span class="info-label">SPU编号</span>{{ detailData.spuCode }}</span>
            <span class="info-item"><span class="info-label">设计师</span>{{ [detailData.designerGroupName, detailData.designerName].filter(Boolean).join('-') || '--' }}</span>
          </div>
          <div v-if="detailData.reason || detailData.notPassDescribePicture" class="info-bar__row tw-mt-2 tw-gap-0!">
            <span class="info-label">返修说明</span>
            <span class="tw-text-gray-700">{{ detailData.reason }}</span>
            <CustomImage
              v-if="detailData.notPassDescribePicture"
              :src="detailData.notPassDescribePicture"
              class="tw-w-40px tw-h-40px tw-ml-2 tw-align-middle tw-inline-block"
              :preview-src-list="[detailData.notPassDescribePicture]"
            />
          </div>
          <div v-if="detailData.repairDescribe || detailData.repairAttachment" class="info-bar__row tw-mt-2 tw-gap-0!">
            <span class="info-label">修图需求说明</span>
            <span class="tw-text-gray-700">{{ detailData.repairDescribe }}</span>
            <CustomImage
              v-if="detailData.repairAttachment"
              :src="detailData.repairAttachment"
              class="tw-w-40px tw-h-40px tw-ml-2 tw-align-middle tw-inline-block"
              :preview-src-list="[detailData.repairAttachment]"
            />
          </div>
        </div>
        <div
          v-for="(skc, skcIndex) in detailData.skcList"
          :key="skc.skcId"
          class="skc-card"
          :class="{ 'tw-mt-3': skcIndex > 0 }"
        >
          <!-- 卡片头部 -->
          <div class="skc-card__header">SKC{{ skcIndex + 1 }}</div>
          <!-- 卡片正文：左右两栏 -->
          <div class="skc-card__body">
            <!-- 左栏：当前图片 + 更新内容 -->
            <div class="skc-main">
              <!-- 当前图片 -->
              <div class="skc-section">
                <div class="section-title">当前图片</div>
                <el-row :gutter="16">
                  <el-col
                    v-for="(item, index) in skc.currentPictures"
                    :key="item.pictureId"
                    :xl="4"
                    :lg="6"
                    :md="8"
                    :sm="8"
                    :xs="12"
                    class="tw-relative tw-mb-2"
                  >
                    <video
                      v-if="detailData.taskType === IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO"
                      class="image-wrapper"
                      :src="item.pictureUrl"
                      controls
                    />
                    <CustomImage
                      v-else
                      :src="item.pictureUrl"
                      :preview-src-list="skc.currentPictures.map((p) => p.pictureUrl)"
                      fit="contain"
                      class="image-wrapper"
                    />
                    <div class="image-order">{{ index + 1 }}</div>
                  </el-col>
                </el-row>
              </div>
              <!-- 分隔线 -->
              <div class="skc-section-divider" />
              <!-- 更新内容 -->
              <div class="skc-section">
                <div class="section-title">更新内容</div>
                <el-row v-if="skc.updatePictures?.length" :gutter="16">
                  <el-col
                    v-for="item in skc.updatePictures"
                    :key="item.resultId"
                    :xl="4"
                    :lg="6"
                    :md="8"
                    :sm="8"
                    :xs="12"
                    class="tw-mb-2"
                  >
                    <video
                      v-if="detailData.taskType === IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO"
                      class="image-wrapper"
                      :src="item.pictureUrl"
                      controls
                    />
                    <CustomImage
                      v-else
                      :src="item.pictureUrl"
                      :preview-src-list="skc.updatePictures.map((p) => p.pictureUrl)"
                      fit="contain"
                      class="image-wrapper"
                    />
                  </el-col>
                </el-row>
                <empty v-else />
              </div>
            </div>
            <!-- 竖分隔线 -->
            <div class="skc-col-divider" />
            <!-- 右栏：修图说明 -->
            <div class="skc-aside">
              <ImageUpdateDescList
                :image-list="skc.currentPictures"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #ffooter>
      <el-row
        style="width: 100%"
        type="flex"
        justify="center"
      >
        <el-button size="default" @click="() => $router.back()">返回</el-button>
      </el-row>
    </template>
  </sc-app-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IImageUpdateDetailRes } from '../../api/type';
import { IMAGE_UPDATE_STATE_LIST, IMAGE_UPDATE_TASK_TYPE_ENUM, IMAGE_UPDATE_TASK_TYPE_LIST } from '../../constant';
import { useRoute } from 'vue-router';
import ImageUpdateDescList from '../../component/desc-list.vue';
import { fetchImageUpdateDetail } from '../../api';

const route = useRoute();

const detailData = ref<IImageUpdateDetailRes>();
const taskStatus = computed(() => IMAGE_UPDATE_STATE_LIST.find(item => item.value === detailData.value?.taskStatus));

const getDetailData = async () => {
  const { data } = await fetchImageUpdateDetail(route.params.taskId as string);
  detailData.value = data;
};
getDetailData();
</script>

<style scoped lang="scss">
.info-bar {
  padding: 10px 14px;
  border: 1px solid var(--el-border-color);
  background: var(--el-fill-color-light);
  border-radius: 6px;
  font-size: 13px;
  &__row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
}
.info-label {
  font-weight: 600;
  color: var(--el-text-color-regular);
  margin-right: 4px;
  &::after {
    content: '：';
  }
}
.info-item {
  display: flex;
  align-items: center;
  color: var(--el-text-color-primary);
}
.skc-card {
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  overflow: hidden;
  &__header {
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
.skc-main {
  flex: 1;
  min-width: 0;
}
.skc-section {
  padding: 12px;
}
.skc-section-divider {
  height: 1px;
  background: var(--el-border-color);
}
.skc-col-divider {
  width: 1px;
  flex-shrink: 0;
  background: var(--el-border-color);
}
.skc-aside {
  flex: 0 0 220px;
  width: 220px;
  padding: 12px;
  overflow-y: auto;
}
.section-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-regular);
  margin-bottom: 8px;
}
.image-order {
  display: flex;
  position: absolute;
  top: 6px;
  right: 16px;
  width: 24px;
  height: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #fff;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.45);
  font-weight: bold;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.image-wrapper {
  width: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  aspect-ratio: 1 / 1;
  background-color: #000;
}
</style>
