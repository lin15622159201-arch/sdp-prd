<template>
  <sc-app-page class="custom-app-page">
    <template #main>
      <div class="tw-h-100%">
        <el-scrollbar
          class="tw-position-relative"
          height="100%"
          always
        >
          <div class="tw-bg-[#fff] tw-mb-20px tw-p-12px">
            <div class="tw-flex">
              <div class="tw-flex tw-gap-2px tw-mr-20px">
                <el-image
                  v-if="detailData.inspirationImage"
                  :src="resizeImgByWidth(detailData.inspirationImage, 200)"
                  class="tw-w-200px tw-h-200px tw-rounded-4px"
                  fit="cover"
                  :preview-src-list="[detailData.inspirationImage]"
                  preview-teleported
                />
              </div>
              <div class="tw-w-100%">
                <div class="tw-flex tw-flex-wrap desc">
                  <p class="item">
                    <span class="label">波次：</span>
                    <span class="val">{{ detailData.waveBatchCode }}</span>
                  </p>
                  <p class="item">
                    <span class="label">外部品类：</span>
                    <span class="val">{{ detailData.externalCategory }}</span>
                  </p>
                  <p class="item">
                    <span class="label">算法品类：</span>
                    <span class="val">{{ detailData.identifiedCategory }}</span>
                  </p>
                  <p class="item">
                    <span class="label">灵感来源：</span>
                    <span class="val">{{ detailData.inspirationImageSource }}</span>
                  </p>
                  <p class="item">
                    <span class="label">创建时间：</span>
                    <span class="val">{{ $filters.formatTime(detailData.createdTime) }}</span>
                  </p>
                  <p class="item">
                    <span class="label">创建人：</span>
                    <span class="val">{{ detailData.creatorName }}</span>
                  </p>
                  <div class="item">
                    <span class="label">商品url：</span>
                    <span class="val link" @click="() => toCheck(detailData.productLinkUrl)">
                      {{ detailData.productLinkUrl }}
                    </span>
                  </div>
                  <p class="item">
                    <span class="label">划线价(US)：</span>
                    <span class="val">{{ detailData.retailPrice }}</span>
                  </p>
                  <p class="item">
                    <span class="label">售价(US)：</span>
                    <span class="val">{{ detailData.salePrice }}</span>
                  </p>
                  <p class="item">
                    <span class="label">款式来源：</span>
                    <span class="val">{{ detailData.styleSourceName }}</span>
                  </p>
                  <p class="item">
                    <span class="label">企划来源：</span>
                    <span class="val">{{ planningSourceCodeName }}</span>
                  </p>
                  <!-- <p class="item">
                    <span class="label">灵感图品牌：</span>
                    <span class="val">{{ detailData.inspirationBrand }}</span>
                  </p> -->

                </div>
                <el-tag class="tw-mb-12px" :type="statusData.type">{{ statusData.label }}</el-tag>
              </div>
            </div>
          </div>
          <div class="tw-bg-[#fff] tw-mb-20px tw-p-12px">
            <sc-table
              key="aigc-detail"
              :data="tableData"
              :columns="tableColumns"
            />
          </div>
        </el-scrollbar>
      </div>
    </template>
    <template #ffooter>
      <el-row
        style="width: 100%"
        type="flex"
        justify="center"
      >
        <el-button @click="() => handleBack()">返回</el-button>
      </el-row>
    </template>
    <task-config-dialog
      ref="taskConfigDialogRef"
      v-model="isShowSubmitDialog"
      :ids="selectIds"
      :is-batch="true"
      @success="() => getDetail()"
    />
  </sc-app-page>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { resizeImgByWidth } from '@/core/utils/helper';
import { useListColumns } from './hooks/use-table-columns';
import { inspirationDetail } from '@/modules/inspiration-center/inspiration-source/api';
import { IInspirationDetailRes } from '@/modules/inspiration-center/inspiration-source/api/type';
import { SUBMIT_STATUS_LIST } from '@/modules/inspiration-center/inspiration-source/constant';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import TaskConfigDialog from '@/modules/inspiration-center/inspiration-source/components/task-config-dialog.vue';
import { ITableItem } from './type';

const { dictionary, dictionaryNextTick, getDictionaryOptions } = useDictionary([
  DICTIONARY_KEY.PLANNINGSOURCE,
  DICTIONARY_KEY.SUPPLY_MODE,
], { apiLoading: true });
const supplyOptionsNew = computed(() => getDictionaryOptions(DICTIONARY_KEY.SUPPLY_MODE));
const router = useRouter();
const route = useRoute();
const detailData = ref({} as IInspirationDetailRes);
const taskConfigDialogRef = ref<InstanceType<typeof TaskConfigDialog>>();
const isShowSubmitDialog = ref(false);
const selectIds = ref<string[]>([]);

const statusData = computed(() => {
  const { submitStatus } = detailData.value;
  const { label, type } = SUBMIT_STATUS_LIST.find(i => i.value === submitStatus) ?? {};
  return {
    label,
    type: type as 'primary',
  };
});

const planningSourceCodeName = computed(() => {
  const data = dictionary.value[DICTIONARY_KEY.PLANNINGSOURCE];
  const { label = '' } = data.find(i => i.value === detailData.value.planningSourceCode) ?? {};
  return label;
});

const tableData = computed<ITableItem[]>(() => {
  return detailData.value.taskInfo?.map((i) => {
    const { businessId, generationType, aiTaskCode, submitterName, submitTime,
      taskStatus, waveBatchName, downstreamTaskId } = i;
    const supplyOptions = dictionary.value[DICTIONARY_KEY.SUPPLY_MODE];
    const { label: supplyName = '' } = supplyOptionsNew.value.find(j => j.value === generationType) ?? {};
    return {
      id: businessId,
      supplyName,
      taskCode: aiTaskCode,
      submitor: submitterName,
      submitedTime: submitTime,
      status: taskStatus,
      waveBatchName,
      downstreamTaskId,
      generationType
    };
  }) ?? [];
});

/** 打开提交任务弹窗 */
const handleSubmit = (id: string) => {
  selectIds.value = [detailData.value.inspirationId];
  taskConfigDialogRef.value?.handleShowGenerate(id);
};

const getDetail = async () => {
  const { id } = route.params;
  await dictionaryNextTick();
  const { data } = await inspirationDetail(id as string);
  detailData.value = data;
};

const { tableColumns } = useListColumns({ handleSuccess: getDetail, handleSubmit });

const toCheck = (url: string) => {
  window.open(url, '_blank');
};

const handleBack = () => {
  router.replace({
    name: 'InspirationCenterInspirationSourceList',
  });
};

const init = () => {
  getDetail();
};

init();

</script>
<style lang="scss" scoped>
.desc {
  .item {
    min-width: 200px;
    margin-bottom: 20px;
    margin-right: 20px;
    flex: 0 0 calc(20% - 20px);
    .val {
      color: #606266;
      word-wrap: break-word;
      &.link {
        color: #409EFF;
        cursor: pointer;
      }
    }
  }
}
.custom-app-page {
  :deep(.sc-app-page-layout-center-main) {
    background-color: rgba(255, 255, 255, 0);
    padding: 0 24px 16px 0;
  }
}
</style>
