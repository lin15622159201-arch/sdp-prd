<template>
  <sc-app-page>
    <template #main>
      <div class="tw-text-lg">修图备注</div>
      <div class="tw-flex tw-gap-8">
        <div class="left-side tw-w-240px tw-flex-shrink-0">
          <StyleList
            v-model:index="activeIndex"
            :style-list="styleList"
            is-editable
            @remove="onStyleRemove"
          >
            <template #info="{ data }">
              <div v-if="!isEdit && (data as IImageUpdateListItem).processing === YES_NO_STRING_ENUM.YES" class="tw-color-red tw-flex tw-items-center tw-gap-1">
                <el-icon><Warning /></el-icon>
                已有进行中的任务
              </div>
              <el-icon v-else-if="isStyleHasDesc(data as IImageUpdateListItem)" class="tw-color-success"><SuccessFilled /> </el-icon>
            </template>
          </StyleList>
          <empty v-show="!styleList.length" description="暂无款式" />
        </div>
        <div class="body tw-flex-1 tw-mt-[-8px]">
          <template v-if="activeStyle && taskType !== undefined">
            <el-checkbox
              :checked="isAllSelected"
              v-model="isAllSelected"
              size="default"
            >全选</el-checkbox>
            <template v-for="(skc, index) in activeSkcList" :key="skc.skcId">
              <div class="tw-mb-2">SKC{{ index + 1 }}</div>
              <el-checkbox-group v-model="skc.indexes">
                <el-row :gutter="16">
                  <el-col
                    v-for="(item, index) in skc.pictures"
                    :key="index"
                    :span="12"
                    class="tw-relative tw-mb-4"
                  >
                    <video
                      v-if="taskType === IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO"
                      class="image-wrapper"
                      :src="item.pictureUrl"
                      controls
                    />
                    <CustomImage
                      v-else
                      class="image-wrapper"
                      :src="item.pictureUrl"
                      fit="contain"
                      :preview-src-list="[item.pictureUrl]"
                    />
                    <el-checkbox
                      type="primary"
                      link
                      size="large"
                      :value="index"
                      class="image-checkbox tw-absolute tw-left-5 tw-top-0"
                    />
                    <div class="image-order">{{ index + 1 }}</div>
                  </el-col>
                </el-row>
              </el-checkbox-group>
            </template>
            <empty v-show="!pictures.length" :description="`该款式暂无${taskType === IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO ? '视频' : '图片'}`" />
          </template>
          <empty v-else :description="activeStyle ? '请先选择任务类型' : '请先选择款式'" />
        </div>

        <div class="right-side tw-w-300px tw-flex-shrink-0">
          <DescItem
            v-if="activeStyle"
            v-model="selectedStyleData[activeStyle.spuCode]"
            class="tw-mb-4"
          />
          <div
            v-for="(skc, skcIndex) in activeSkcList"
            :key="skc.skcId"
            class="tw-mb-4"
          >
            <template v-for="index in skc.indexes" :key="index">
              <DescItem
                v-model="skc.pictures[index]"
                :index="index"
                :label="`SKC${skcIndex + 1}`"
              />
            </template>
          </div>
          <empty
            v-if="!hasStyleSelectedPics"
            description="请先选中图片/视频"
            class="tw-mt-8"
          />
        </div>
      </div>
    </template>
    <template #ffooter>
      <div class="tw-flex tw-justify-center tw-w-full">
        <el-button
          type="primary"
          @click="handleSubmit"
        >{{isEdit ? '确认修改' : '创建'}}</el-button>
        <el-button @click="goBack">取消</el-button>
      </div>
    </template>
  </sc-app-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IImageUpdateDetailRes, IImageUpdateListBySpuRes, IImageUpdateListItem, IImageUpdateSkcPictureItem } from '../../api/type';
import StyleList from '../../component/style-list.vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { IMAGE_UPDATE_TASK_TYPE_ENUM } from '../../constant';
import { useBeforeCreateDialog } from './hooks/use-before-create-dialog';
import { fetchImageUpdateBatchCreate, fetchImageUpdateDetail, fetchImageUpdateEdit, fetchImageUpdateListBySpu } from '../../api';
import DescItem from './components/desc-item.vue';
import { YES_NO_STRING_ENUM } from '@/constant';
import { TASK_SOURCE_ENUM } from '@/constant/task';
import { SuccessFilled, Warning } from '@element-plus/icons-vue';
import { useRouterBack } from '@/hooks/use-router-back';

const router = useRouter();
const route = useRoute();

const styleList = ref<IImageUpdateListBySpuRes>([]);
const activeIndex = ref(0);
const activeStyle = computed(() => styleList.value[activeIndex.value]);
const detailData = ref<IImageUpdateDetailRes>();
const taskType = computed(() => detailData.value?.taskType ?? (route.params.taskType ? Number(route.params.taskType) as IMAGE_UPDATE_TASK_TYPE_ENUM : undefined));
const pictures = computed(() => activeStyle.value?.skcList || []);
// 是否编辑
const isEdit = computed(() => !!route.params.taskId);

const { openDialog } = useBeforeCreateDialog((data) => {
  if (data.taskType !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    initCreateData(data.taskType);
    router.replace({ params: { ...route.params, taskType: data.taskType }, query: route.query });
  }
});

const selectedMap = ref<{ [spuCode: string]: ISelectedStyleData[]; }>({});
const selectedStyleData = ref<{ [spuCode: string]: { pictureDescribe: string; attachment: string; }; }>({});
const activeSkcList = computed(() => {
  const spuCode = activeStyle.value?.spuCode;
  if (!spuCode) return [];
  return selectedMap.value[spuCode] || [];
});

type ISelectedStyleData = {
  skcId: string;
  skcCode: string;
  indexes: number[];
  pictures: IImageUpdateSkcPictureItem[];
};
const isAllSelected = computed({
  get: () => activeSkcList.value.length > 0 && activeSkcList.value.every(skc => skc.indexes.length === skc.pictures?.length),
  set: (val) => {
    activeSkcList.value.forEach((skc) => {
      skc.indexes = val ? skc.pictures.map((_, index) => index) : [];
    });
  } });

const onStyleRemove = (index: number) => {
  styleList.value.splice(index, 1);
};

// 款式是否有选中图片/视频且有修图说明
const isStyleHasDesc = (data: IImageUpdateListItem) => {
  const skcData = selectedMap.value[data.spuCode];
  const styleData = selectedStyleData.value[data.spuCode];
  const hasSelected = skcData?.some(item => item?.indexes.length);
  return hasSelected && (styleData.pictureDescribe || skcData.some(item => item.pictures?.some(pic => pic.pictureDescribe)));
};

// 当前款式是否有选中图片/视频
const hasStyleSelectedPics = computed(() => {
  return activeSkcList.value.some(skc => skc.indexes.length > 0);
});

const { handleBack } = useRouterBack();
const goBack = () => {
  handleBack('DesignCenterImageUpdateList');
};

const validateParams = (): boolean => {
  if (!isEdit.value) {
    // 创建时，校验是否存在进行中的任务
    const hasProcessing = styleList.value.some(item => item.processing === YES_NO_STRING_ENUM.YES);
    if (hasProcessing) {
      ElMessage.error('存在已有进行中任务的款式，无法创建任务');
      return false;
    }
  }

  // 填写内容为空的款式序号
  const emptyDescStyleOrders: number[] = [];
  // 没有选中图片/视频的款式序号
  const emptySelectedStyleOrders: number[] = [];
  styleList.value.forEach((spu, index) => {
    const skcData = selectedMap.value[spu.spuCode];
    const styleData = selectedStyleData.value[spu.spuCode];
    // skc是否有修图说明
    const hasSkcDesc = skcData?.some(item => item.indexes.length && item.indexes.some(i => item.pictures[i]?.pictureDescribe));
    const hasSelected = skcData?.some(item => item.indexes.length);
    if (!hasSelected) {
      // 如果没有选中图片/视频，则提示该款式序号
      emptySelectedStyleOrders.push(index + 1);
    }
    if (!styleData.pictureDescribe && !hasSkcDesc) {
      // 如果款式没有修图说明，且skc也没有修图说明，则提示该款式序号
      emptyDescStyleOrders.push(index + 1);
    }
  });
  if (emptySelectedStyleOrders.length) {
    ElMessage.error(`第${emptySelectedStyleOrders.join('、')}个款式未选中图片/视频`);
    return false;
  }
  if (emptyDescStyleOrders.length) {
    ElMessage.error(`第${emptyDescStyleOrders.join('、')}个款式缺少修图说明`);
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (styleList.value.length === 0) {
    ElMessage.error('款式列表不能为空');
    return;
  }
  const res = validateParams();
  if (!res) return;
  if (isEdit.value) {
    // 编辑
    const { pictureDescribe, attachment } = selectedStyleData.value[activeStyle.value.spuCode];
    await fetchImageUpdateEdit([{
      taskId: route.params.taskId as string,
      repairAttachment: attachment,
      repairDescribe: pictureDescribe,
      skc: activeSkcList.value.map(skc => ({
        skcId: skc.skcId,
        pictures: skc.indexes.map(i => skc.pictures[i])
      }))
    }]);
    ElMessage.success('编辑成功');
  } else {
    // 新增
    await fetchImageUpdateBatchCreate(styleList.value.map((spu) => {
      const skcData = selectedMap.value[spu.spuCode];
      const styleData = selectedStyleData.value[spu.spuCode];
      const { pictureDescribe: repairDescribe, attachment: repairAttachment } = styleData || {};
      const skc = skcData?.map(item => ({
        skcId: item.skcId,
        skcCode: item.skcCode,
        pictures: item.indexes.map(i => item.pictures[i])
      })) || [];
      const { spuCode, spuId, spuSourceType, designerGroupCode, designerGroupName, wavebandCode, wavebandName, storeId, storeName, designerId, designerName } = spu || {};
      return {
        repairAttachment,
        repairDescribe,
        skc,
        taskType: taskType.value!,
        spuCode: spuCode || '',
        spuId,
        spuSource: spuSourceType,
        designerGroupCode,
        designerGroupName,
        wavebandCode,
        wavebandName,
        storeId,
        storeName,
        designerId,
        designerName,
        taskSource: route.query.taskSource as TASK_SOURCE_ENUM || spuSourceType,
        developStyleTaskId: spu.developStyleTaskId
      };
    }));
    ElMessage.success('创建成功');
  }
  goBack();
};

const initCreateData = async (_taskType: IMAGE_UPDATE_TASK_TYPE_ENUM = taskType.value!) => {
  const { styleCode: spuCode } = route.params as Record<string, string>;
  if (spuCode) {
    const spuCodes = (spuCode as string).split(',');
    const { data } = await fetchImageUpdateListBySpu({
      spuCodes,
      taskType: _taskType
    });
    styleList.value = data;

    styleList.value.forEach((item) => {
      if (item.spuCode) {
        selectedMap.value[item.spuCode] = item.skcList.map(skc => ({
          skcId: skc.skcId,
          skcCode: skc.skcCode,
          indexes: [],
          pictures: skc.pictures
        }));
        selectedStyleData.value[item.spuCode] = { pictureDescribe: '', attachment: '' };
      }
    });
  }
};

const init = async () => {
  if (isEdit.value) {
    // 编辑
    const { data } = await fetchImageUpdateDetail(route.params.taskId as string);
    detailData.value = data;
    styleList.value = [{
      spuCode: data.spuCode,
      designerGroupName: data.designerGroupName,
      designerName: data.designerName,
      skcList: data.skcList.map(skc => ({
        skcId: skc.skcId,
        pictures: skc.pictures.map((pic) => {
          const selectedPic = skc.currentPictures?.find(p => p.pictureUrl === pic.pictureUrl);
          return {
            ...pic,
            pictureDescribe: selectedPic?.pictureDescribe || '',
            attachment: selectedPic?.attachment || ''
          };
        })
      }))
    } as IImageUpdateListItem];

    selectedStyleData.value[data.spuCode] = {
      pictureDescribe: data.repairDescribe,
      attachment: data.repairAttachment
    };
    selectedMap.value[data.spuCode] = data.skcList.map((skc) => {
      const pics: IImageUpdateSkcPictureItem[] = skc.pictures;
      const indexes: number[] = [];
      skc.currentPictures?.forEach((pic) => {
        const picIndex = skc.pictures.findIndex(item => item.pictureUrl === pic.pictureUrl);
        if (picIndex > -1) {
          indexes.push(picIndex);
          pics[picIndex] = {
            ...pics[picIndex],
            pictureDescribe: pic.pictureDescribe,
            attachment: pic.attachment
          };
        }
      });
      return { skcId: skc.skcId, skcCode: skc.skcCode, indexes, pictures: pics };
    });
    return;
  }
  // 创建
  if (taskType.value === undefined || ![IMAGE_UPDATE_TASK_TYPE_ENUM.IMAGE, IMAGE_UPDATE_TASK_TYPE_ENUM.VIDEO].includes(taskType.value)) {
    // 创建时如果没有任务类型，或者任务类型不合法，则弹出选择任务类型的对话框
    openDialog();
    return;
  }
  await initCreateData();
};
init();
</script>
<style lang="scss" scoped>
.image-checkbox {
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
.image-order {
  display: flex;
  position: absolute;
  top: 8px;
  right: 16px;
  width: 24px;
  height: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #fff;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.45);
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
}
.image-wrapper {
  width: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  aspect-ratio: 1 / 1;
  background-color: #000;
}
</style>
