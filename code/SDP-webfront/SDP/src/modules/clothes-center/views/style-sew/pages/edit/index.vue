<template>
  <sc-app-page>
    <template #laside>
      <div class="tw-h-[100%]">
        <detail-title title="款号基本信息" />
        <sc-copy-text
          type="flex"
          justify="space-between"
          :text="currentDesignCode"
        />
        <div
          class="tw-px[8px] tw-py[8px] tw-bg-[var(--el-color-primary)] tw-text-[#fff] tw-my[10px] tw-inline-block"
        >质检-{{ detailData.versionNum || '' }}</div>
        <div class="tw-relative">
          <ImageViewer :list="designPicture_.files" class="tw-w-full">
            <template #default="{ view }">
              <el-image
                style="cursor:pointer"
                fit="cover"
                :src="$filters.ossUrl(designPicture_.files[0]?.url, 260)"
                @click="view(0)"
              />
            </template>
          </ImageViewer>
          <span class="type-tag" style="background:#67C23A">设</span>
        </div>
        <sc-responsive-row class="tw-block responsive">
          <sc-detail-item label="设计师：">{{ clothesBaseInfo?.designerName || '-' }}</sc-detail-item>
          <sc-detail-item label="纸样师：">{{ clothesBaseInfo?.patternMakerName || '-'}}</sc-detail-item>
          <sc-detail-item label="车缝师：">{{ clothesBaseInfo?.sewerName || '-'}}</sc-detail-item>
          <sc-detail-item label="质检师：">{{ clothesBaseInfo?.qualityCheckerName || '-' }}</sc-detail-item>
        </sc-responsive-row>
      </div>
    </template>
    <template #main>
      <div class="tw-h-full tw-w-full">
        <div class="tw-flex tw-justify-between tw-items-center tw-mb[10px]">
          <el-row class="tw-flex-1">
            <el-col :span="8">
              <sc-detail-item label="品类：">
                {{ clothesBaseInfo?.categoryName || '' }}
              </sc-detail-item>
            </el-col>
            <el-col :span="8">
              <sc-detail-item label="尺码标准：">
                {{ clothesBaseInfo?.sizeStandard || '' }}
              </sc-detail-item>
            </el-col>
            <el-col :span="8">
              <sc-detail-item label="样衣尺码：">
                {{ clothesBaseInfo?.sampleSize || '' }}
              </sc-detail-item>
            </el-col>
          </el-row>
          <el-button
            class="tw-mb-[18px]"
            type="primary"
            plain
            @click="exportByBlob({
              method: 'get',
              url: detailData?.patternBaseInfo?.patternUrl ?? '',
              filename: detailData?.patternBaseInfo?.patternName ?? ''
            })"
          >
            下载纸样
          </el-button>
        </div>
        <sc-table
          height="300px"
          :data="sizeInfoList"
          :columns="tableColumns"
        />
        <detail-title title="样衣图" class="tw-my-[10px]" />
        <div>
          <SampleClothesPicture
            ref="sampleClothesPictureRef"
            v-model="sampleClothesPictureList"
            :related-design-code="currentDesignCode"
            :disabled="isView"
          />
        </div>
      </div>
    </template>
    <template #ffooter>
      <div class="tw-w-full tw-flex tw-justify-end">
        <el-button @click="handleGoBack">
          返回
        </el-button>
        <template v-if="!isView">
          <el-button
            type="warning"
            @click="handleRepair"
          >
            返修
          </el-button>
          <el-button
            type="primary"
            @click="handlePass"
          >
            通过
          </el-button>
        </template>
      </div>
    </template>
    <!-- 返修 -->
    <repairDialog
      v-model:visible="repairDia.visible"
      :data="repairDia.data"
      :sample-amount="clothesBaseInfo?.sampleAmount"
      @confirm="repairConfirmHandle"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, nextTick, computed } from 'vue';
import { useListColumns } from './hooks/use-edit-table-columns';
import { useRouter, useRoute } from 'vue-router';
import {
  ISampleQcBaseInfoRes as DetailRes,
  ISampleQcRepairReq,
  ISampleQcRepairReqRepairInfo
} from '@/modules/clothes-center/views/style-sew/api/types';
import { sampleQcBaseInfo, sampleQcPass, sampleQcRepair } from '@/modules/clothes-center/views/style-sew/api';
import { ElMessage } from 'element-plus';
import repairDialog from './repair-dialog/index.vue';
import { exportByBlob } from '@/core/utils/file-download';
import SampleClothesPicture from '@/modules/clothes-center/components/sample-clothes-picture/index.vue';
import { IFileExt } from '@/modules/clothes-center/constant/types';
import { IFile } from '@/components/upload/package/type';
import { PICTURE_ORIENTATION_ENUM } from '@/modules/clothes-center/constant';
import { YES_NO_ENUM } from '@/constant';
import { useUploaderFormat } from '@/components/custom-form';
import {
  transformToFileExtList
} from '@/modules/clothes-center/components/sample-clothes-picture/hooks/use-picture-transform';
import { IRepairData } from './types';
import { ASIDE_TYPE_ENUM } from '../../constant/menus';

const router = useRouter();
const $route = useRoute();
const sampleQcId = $route.params.id as string;
const isView = computed(() => $route.params?.behavior === 'view');
// 审版单数据
const detailData = ref({} as DetailRes);
const clothesBaseInfo = ref<DetailRes['clothesBaseInfo']>({});
const patternBaseInfo = ref<DetailRes['patternBaseInfo']>({});
const sizeInfoList = ref<DetailRes['sizeInfoList']>([]);
// const customerPicture_ = useUploaderFormat(clothesBaseInfo, 'customerPicture');
const designPicture_ = useUploaderFormat(clothesBaseInfo, 'designPicture');

const sampleClothesPictureRef = ref();
// 样衣图
const sampleClothesPictureList = ref<IFileExt[]>([]);
const currentDesignCode = ref('');

const { tableColumns } = useListColumns({ detailData, sizeInfoList, isView });

/* 校验-样衣实测填写 */
const checkClothesSize = (sizeInfoList_: DetailRes['sizeInfoList']) => {
  return sizeInfoList_.every((row: DetailRes['sizeInfoList'][0]) => {
    return row?.clothesTrimSizeList?.every((size) => {
      const isHas = size.value?.trim() || false;
      if (!isHas) size.error = true;
      return isHas;
    });
  });
};

const clearError = (sizeInfoList_: DetailRes['sizeInfoList']) => {
  sizeInfoList_?.forEach((row: DetailRes['sizeInfoList'][0]) => {
    row?.clothesTrimSizeList?.forEach((size) => {
      delete size.error;
    });
  });
};

const settleSampleClothesParams = (isEnforcePassPicture?: string) => {
  const params = {
    samplePicture: {} as DetailRes['samplePicture'],
    sampleClothPictureList: sampleClothesPictureList.value.map(item => item.url)
  };
  params.samplePicture = {
    frontPicture: {
      urls: sampleClothesPictureList.value.filter(item => item.angle === PICTURE_ORIENTATION_ENUM.FRONT).map((item) => {
        return {
          url: item.url,
          checkPass: YES_NO_ENUM.YES,
          msg: item.failMsg,
        };
      }),
      pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.FRONT,
    },
    sidePicture: {
      urls: sampleClothesPictureList.value.filter(item => item.angle === PICTURE_ORIENTATION_ENUM.SIDE).map((item) => {
        return {
          url: item.url,
          checkPass: YES_NO_ENUM.YES,
          msg: item.failMsg,
        };
      }),
      pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.SIDE,
    },
    backPicture: {
      urls: sampleClothesPictureList.value.filter(item => item.angle === PICTURE_ORIENTATION_ENUM.BACK).map((item) => {
        return {
          url: item.url,
          checkPass: YES_NO_ENUM.YES,
          msg: item.failMsg,
        };
      }),
      pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.BACK,
    },
    otherPictures: {
      urls: sampleClothesPictureList.value.filter(item => item.angle === PICTURE_ORIENTATION_ENUM.OTHER).map((item) => {
        return {
          url: item.url,
          checkPass: YES_NO_ENUM.YES,
          msg: item.failMsg,
        };
      }),
      pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.OTHER,
    },
  };
  // params.enforcePassPicture = isEnforcePassPicture || '';
  return params;
};

const getPostData = (data: DetailRes) => {
  const data_: any = {
    sampleQcId: '',
    sizeInfoList: [],
    sampleClothPictureList: [],
    problemPictureList: [],
    samplePicture: {} as DetailRes['samplePicture'],
  };
  (Object.keys(data_) as (keyof DetailRes)[]).forEach((k) => {
    data_[k] = data[k];
  });
  data_.sampleQcId = detailData.value.sampleQcId!; // 提交传递最新的id
  return data_;
};

const handleGoBack = () => {
  router.push({
    name: 'ClothesCenterStyleSewList',
    query: {
      componentName: ASIDE_TYPE_ENUM.CAR_QC_LIST,
    }
  });
};

/* 通过 */
const handlePass = async () => {
  if (!checkClothesSize(sizeInfoList.value)) {
    ElMessage.error('请完整填写样衣实测尺寸信息');
    return;
  }
  clearError(sizeInfoList.value);
  if (sampleClothesPictureList.value.length === 0) {
    ElMessage.warning('至少上传一张样衣图');
    return;
  }
  const { isPass, isEnforcePassPicture } = await sampleClothesPictureRef.value.submitValidate();
  if (!isPass) {
    return;
  }
  const clothesData: any = settleSampleClothesParams(isEnforcePassPicture);
  await sampleQcPass({
    sampleQcId: sampleQcId!,
    sizeInfoList: sizeInfoList.value,
    samplePicture: clothesData.samplePicture,
    sampleClothPictureList: clothesData.sampleClothPictureList,
  });
  ElMessage.success('已通过');
  handleGoBack();
};

/* 返修 */
const repairDia = reactive({
  visible: false,
  data: {} as IRepairData,
});

const handleRepair = async () => {
  try {
    if (!checkClothesSize(sizeInfoList.value)) {
      ElMessage.error('请完整填写样衣实测尺寸信息');
      return;
    }
    clearError(sizeInfoList.value);
    if (sampleClothesPictureList.value.length === 0) {
      ElMessage.warning('至少上传一张样衣图');
      return;
    }
    const { isPass } = await sampleClothesPictureRef.value.submitValidate(false);
    if (!isPass) {
      return;
    }
    const clothesData = settleSampleClothesParams();
    const params = getPostData({ ...clothesData, ...detailData.value, sizeInfoList: sizeInfoList.value });
    repairDia.data = {
      ...params,
      makeClothesType: detailData.value.clothesBaseInfo?.makeClothesType
    } as IRepairData;
    repairDia.visible = true;
  } catch {
    ElMessage.error('请检查填写后返修');
  }
};

const repairConfirmHandle = async (repairData: ISampleQcRepairReqRepairInfo) => {
  repairDia.data.repairInfo = repairData;
  await sampleQcRepair(repairDia.data);
  ElMessage.success('返修成功');
  repairDia.visible = false;
  await nextTick();
  await new Promise((resolve) => { setTimeout(resolve, 1000); });
  handleGoBack();
};

// 审版单详情
const _sampleQcBaseInfo = async () => {
  const { data } = await sampleQcBaseInfo({ sampleQcId });
  detailData.value = data ?? {};
  clothesBaseInfo.value = data.clothesBaseInfo ?? {};
  patternBaseInfo.value = data.patternBaseInfo ?? {};
  sizeInfoList.value = data.sizeInfoList ?? [];
  // 设计审版字段 页面绑定
  currentDesignCode.value = clothesBaseInfo.value?.designCode || '';
  // 初始化样衣图
  sampleClothesPictureList.value = transformToFileExtList(data.samplePicture) as unknown as IFileExt[];
};

const init = async () => {
  await _sampleQcBaseInfo();
};

init();

toRefs({ repairDia });

</script>

<style lang="scss" scoped>
.responsive {
  :deep(.el-col) {
    width: 100%;
    max-width: 100%;
  }
}
</style>

<style scoped lang="scss">
:deep(.el-image) {
  width: 100%;
  height: 200px;
}
.type-tag {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  z-index: 99;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
  text-align: center;
}
</style>
