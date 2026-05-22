<template>
  <sc-app-page>
    <template #laside>
      <div class="tw-h-[100%]">
        <detail-title title="款号基本信息" />
        <sc-copy-text
          type="flex"
          justify="space-between"
          :text="detailData.designCode!"
        />
        <div
          class="tw-px[8px] tw-py[8px] tw-bg-[var(--el-color-primary)] tw-text-[#fff] tw-my[10px] tw-inline-block"
        >审版-{{ detailData.versionNum || '' }}</div>
        <div class="tw-relative">
          <ImageViewer :list="designPicture_.files" class="tw-w-full">
            <template #default="{ view }">
              <el-image
                style="cursor:pointer"
                class="header-img"
                fit="cover"
                :src="$filters.ossUrl(designPicture_.files[0]?.url, 260)"
                @click="view(0)"
              />
            </template>
          </ImageViewer>
          <span class="type-tag" style="background:#67C23A">设</span>
        </div>
        <sc-responsive-row class="tw-block responsive tw-mt-[10px]">
          <sc-detail-item label="设计师：">{{ clothesBaseInfo?.designerName || '-' }}</sc-detail-item>
          <sc-detail-item label="纸样师：">{{ clothesBaseInfo?.patternMakerName || '-' }}</sc-detail-item>
          <sc-detail-item label="车缝师：">{{ clothesBaseInfo?.sewerName || '-' }}</sc-detail-item>
          <sc-detail-item label="质检师：">{{ clothesBaseInfo?.qualityCheckerName || '-' }}</sc-detail-item>
        </sc-responsive-row>
      </div>
    </template>
    <template #main>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="审版单"
          name="sampleAudit"
        >
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
            <!-- MAKE_CLOTHES_TYPE_ENUM，打版方式 = 3D/3D+实物，则展示，其他不展示 -->
            <detail-title
              title="3D图"
              class="tw-my-[10px]"
              v-if="isShowSample3dImg"
            />
            <div v-if="isShowSample3dImg">
              <SampleClothesPicture
                ref="sample3dPictureRef"
                v-model="sample3dPictureList"
                :related-design-code="currentDesignCode"
                :disabled="isView"
                other-prop="detail"
              />
              <div
                v-if="!sample3dPictureList.length && isView"
                class="tw-w-60"
              >
                <custom-image
                  class="tw-w-150px tw-h-150px tw-mt-10px"
                  :src="resizeImgByWidth('', 200)"
                  fit="contain"
                  lazy
                />
              </div>
            </div>
            <!-- MAKE_CLOTHES_TYPE_ENUM，打版方式 = 实物/3D+实物，则展示，其他不展示 -->
            <detail-title
              title="样衣图"
              class="tw-my-[10px]"
              v-if="isShowSampleClothesImg"
            />
            <div v-if="isShowSampleClothesImg">
              <SampleClothesPicture
                ref="sampleClothesPictureRef"
                v-model="sampleClothesPictureList"
                :related-design-code="currentDesignCode"
                :disabled="isView"
              />
              <div
                v-if="!sampleClothesPictureList.length && isView"
                class="tw-w-60"
              >
                <custom-image
                  class="tw-w-150px tw-h-150px tw-mt-10px"
                  :src="resizeImgByWidth('', 200)"
                  fit="contain"
                  lazy
                />
              </div>
            </div>
            <el-form
              label-suffix="："
              label-width="100px"
              :model="formData"
              ref="formElRef"
              class="tw-mt-[20px]"
              :disabled="isView"
            >
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="纸样文件"
                    prop="patternList"
                    :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
                  >
                    <div class="tw-flex tw-w-[50%]">
                      <Uploader
                        v-model="formData.patternList"
                        :limit="1"
                        accept=".prj,.dxf"
                        :size-limit="100"
                        size="mini"
                        listType="text"
                        :paste="false"
                        :use-wrapper="false"
                        :multiple="false"
                        :download="true"
                        tips="文件不超过100MB，格式为.dxf/.prj"
                        :before-upload="handleBeforeUpload"
                        @change="handleUploadChange"
                      >
                        <template #default>
                          <div style="word-break: break-all; line-height: 1.2;">
                            <el-button size="small" :disabled="isView">
                              点击上传
                            </el-button>
                          </div>
                        </template>
                      </Uploader>
                    </div>
                  </el-form-item>
                  <el-form-item
                    label="唛架内容"
                    prop="markFramePictureList"
                  >
                    <div class="tw-flex tw-w-[50%]" v-if="formData.markFramePictureList.length">
                      <Uploader
                        v-model="formData.markFramePictureList"
                        size="mini"
                        :use-wrapper="false"
                        :check-accept="true"
                        :download="true"
                        list-position="prepend"
                        list-type="text"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>-</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="开发bom"
          name="bom"
        >
          <div class="tw-h-full tw-w-full">
            <sc-table
              height="100%"
              :data="bomList"
              :columns="bomTableColumns"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="审版工艺单"
          name="craft"
        >
          <auditCraftDetail :detail-obj="auditCraftDetailObj" />
        </el-tab-pane>
      </el-tabs>
    </template>
    <template #ffooter>
      <div class="tw-w-full tw-flex tw-justify-end">
        <el-button @click="handleGoBack">
          返回
        </el-button>
        <template v-if="!isView">
          <el-button
            type="danger"
            @click="handleRepet"
            :disabled="detailData.auditStatus === YES_NO_ENUM.YES"
          >
            复版
          </el-button>
          <el-button
            type="warning"
            @click="handleRepair"
            :disabled="detailData.auditStatus === YES_NO_ENUM.YES"
          >
            返修
          </el-button>
          <el-button
            type="primary"
            @click="handlePass"
            :disabled="detailData.auditStatus === YES_NO_ENUM.YES"
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
    <!-- 复版 -->
    <repetDialog v-model:visible="repetDia.visible" @confirm="handleNoPass" />
    <!--二次工艺弹框-->
    <SecondCraftDialog
      v-model:visible="processDialog.visible"
      :preview="processDialog.preview"
      :crafts="processDialog.crafts"
      :data="processDialog.data"
      :batch-dict-list-map="batchDictListMap"
      :craft-match-list="processDialog.craftMatchList"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, nextTick, computed, onBeforeMount } from 'vue';
import { useListColumns } from '../hooks/use-edit-table-columns';
import { useRouter, useRoute } from 'vue-router';
import {
  ISampleAuditBaseInfoRes as DetailRes,
  ISampleAuditNoPassReq,
  ISampleAuditRepairReqRepairInfo,
  IPatternSizeRes
} from '../api/types';
import {
  sampleAuditBaseInfo,
  sampleAuditPass,
  sampleAuditNoPass,
  sampleAuditRepair,
  patternSize
} from '../api';
import { ElMessage, ElForm } from 'element-plus';
import repairDialog from './repair-dialog/index.vue';
import { exportByBlob } from '@/core/utils/file-download';
import SampleClothesPicture from '@/modules/clothes-center/components/sample-clothes-picture/index.vue';
import repetDialog from './repet-dialog/index.vue';
import { IFileExt } from '@/modules/clothes-center/constant/types';
import { PICTURE_ORIENTATION_ENUM, MAKE_CLOTHES_TYPE_ENUM } from '@/modules/clothes-center/constant';
import { YES_NO_ENUM } from '@/constant';
import { useUploaderFormat } from '@/components/custom-form';
import {
  transformToFileExtList
} from '@/modules/clothes-center/components/sample-clothes-picture/hooks/use-picture-transform';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  useListColumns as useBomTableColumns
} from '@/modules/clothes-center/components/process-dialog/hooks/use-table-columns';
import { designCommonGetBomById, sampleClothesInfoDetail } from '@/modules/clothes-center/api';
import { ISampleClothesInfoDetailRes } from '@/modules/clothes-center/api/types';
import auditCraftDetail from '../components/audit-craft-detail.vue';
import { IRepairData } from './types';
import { IBomPrintCraftDemandInfoListItem, ICraftMatchReqItem } from '@/modules/design-center/develop-bom/api/types';
import { IBomOrderMaterialItem } from '@/modules/design-center/develop-bom/views/edit/types';
import { craftMatch } from '@/modules/design-center/develop-bom/api';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import SecondCraftDialog from '@/modules/design-center/develop-bom/components/process-dialog/index.vue';
import { IFileData } from '@/components/uploader/packages/types';

const router = useRouter();
const $route = useRoute();
const sampleAuditId = $route.params.id as string;
const isView = computed(() => $route.name === 'ClothesCenterStyleAuditDetail');

// 审版单数据
const detailData = ref({} as DetailRes);
const clothesBaseInfo = ref<DetailRes['clothesBaseInfo']>({});
const patternBaseInfo = ref<DetailRes['patternBaseInfo']>({});
// const customerPicture_ = useUploaderFormat(clothesBaseInfo, 'customerPicture');
const designPicture_ = useUploaderFormat(clothesBaseInfo, 'designPicture');
const sizePatternSize = ref<IPatternSizeRes>({});
const sizeInfoList = ref<DetailRes['sizeTable']>([]);

const sampleClothesPictureRef = ref();
const sample3dPictureRef = ref();
// 样衣图
const sampleClothesPictureList = ref<IFileExt[]>([]);
// 3D图
const sample3dPictureList = ref<IFileExt[]>([]);
const currentDesignCode = ref('');

/**
 * 是否展示样衣图
 * 打版方式 = 实物/3D+实物，则展示，其他不展示
 */
const isShowSampleClothesImg = computed(() => {
  return [
    MAKE_CLOTHES_TYPE_ENUM.ACTUAL,
    MAKE_CLOTHES_TYPE_ENUM.THREE_AND_ACTUAL
  ].includes(clothesBaseInfo.value?.makeClothesType as MAKE_CLOTHES_TYPE_ENUM);
});
/**
 * 是否展示3D图
 * 打版方式 = 3D/3D+实物，则展示，其他不展示
 */
const isShowSample3dImg = computed(() => {
  return [
    MAKE_CLOTHES_TYPE_ENUM.THREE,
    MAKE_CLOTHES_TYPE_ENUM.THREE_AND_ACTUAL
  ].includes(clothesBaseInfo.value?.makeClothesType as MAKE_CLOTHES_TYPE_ENUM);
});

const { tableColumns } = useListColumns({
  detailData,
  sizeInfoList,
  sizePatternSize,
  isView,
  clothesBaseInfo
});

const formData = ref({
  patternList: [] as IFileExt[],
  markFramePictureList: [] as IFileExt[],
  doUpdatePatternFile: '0', // 是否有操作过上传纸样文件 1是0否
});
const formElRef = ref<InstanceType<typeof ElForm> | null>(null);

const handleBeforeUpload = (file: IFileData) => {
  const formatReg = /^(prj|dxf)$/i;
  const name = file.name || '';
  const [fileName = '', fileType = ''] = name?.split('.') || [];
  const skcReg = new RegExp(clothesBaseInfo.value?.designCode || '', 'i');
  const valid = skcReg.test(fileName) && formatReg.test(fileType);
  if (!valid) {
    ElMessage({
      type: 'error',
      message: '上传的纸样文件名称必须包含所勾选数据的SKC，且为 prj 或 dxf 格式',
      duration: 3000,
    });
    return Promise.reject(false);
  }
  return file;
};

/* 校验-样衣实测填写 */
const checkClothesSize = (sizeInfoList_: DetailRes['sizeTable']) => {
  return sizeInfoList_.every((row: DetailRes['sizeTable'][0]) => {
    return row?.clothesTrimSizeList?.every((size) => {
      const isHas = size.value?.trim() || false;
      if (!isHas) size.error = true;
      return isHas;
    });
  });
};

const clearError = (sizeInfoList_: DetailRes['sizeTable']) => {
  sizeInfoList_?.forEach((row: DetailRes['sizeTable'][0]) => {
    row?.clothesTrimSizeList?.forEach((size) => {
      delete size.error;
    });
  });
};

const settleSampleClothesParams = (isEnforcePassPicture?: string) => {
  const params = {
    samplePicture: {} as DetailRes['samplePicture'],
    dimensionPicture: {} as DetailRes['dimensionPicture'],
    enforcePassPicture: '',
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
  params.dimensionPicture = {
    frontPicture: {
      urls: sample3dPictureList.value.filter(item => item.angle === PICTURE_ORIENTATION_ENUM.FRONT).map((item) => {
        return {
          url: item.url,
          checkPass: YES_NO_ENUM.YES,
          msg: item.failMsg,
        };
      }),
      pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.FRONT,
    },
    sidePicture: {
      urls: sample3dPictureList.value.filter(item => item.angle === PICTURE_ORIENTATION_ENUM.SIDE).map((item) => {
        return {
          url: item.url,
          checkPass: YES_NO_ENUM.YES,
          msg: item.failMsg,
        };
      }),
      pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.SIDE,
    },
    backPicture: {
      urls: sample3dPictureList.value.filter(item => item.angle === PICTURE_ORIENTATION_ENUM.BACK).map((item) => {
        return {
          url: item.url,
          checkPass: YES_NO_ENUM.YES,
          msg: item.failMsg,
        };
      }),
      pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.BACK,
    },
    detailPictures: {
      urls: sample3dPictureList.value.filter(item => item.angle === PICTURE_ORIENTATION_ENUM.DETAIL).map((item) => {
        return {
          url: item.url,
          checkPass: YES_NO_ENUM.YES,
          msg: item.failMsg,
        };
      }),
      pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.DETAIL,
    },
  };
  params.enforcePassPicture = isEnforcePassPicture || '';
  return params;
};

const getPostData = (data: DetailRes) => {
  const data_: any = {
    sampleAuditId: '',
    checkCountId: '',
    sizeTable: [],
    samplePicture: {} as DetailRes['samplePicture'],
    dimensionPicture: {} as DetailRes['dimensionPicture'],
  };
  (Object.keys(data_) as (keyof DetailRes)[]).forEach((k) => {
    data_[k] = data[k];
  });
  data_.sampleQcId = detailData.value.sampleQcId!; // 提交传递最新的id
  data_.sampleAuditId = sampleAuditId!;
  return data_;
};

const checkFunction = () => {
  let flag = true;
  if (!checkClothesSize(sizeInfoList.value)) {
    ElMessage.error('请完整填写样衣实测尺寸信息');
    flag = false;
  }
  clearError(sizeInfoList.value);
  if (isShowSampleClothesImg.value && sampleClothesPictureList.value.length === 0) {
    ElMessage.warning('至少上传一张样衣图');
    flag = false;
  }
  if (formData.value.patternList.length === 0) {
    ElMessage.warning('请上传纸样文件');
    flag = false;
  }
  // formElRef.value?.validate();

  // const { isPass: dimensionPass } = await sample3dPictureRef.value.submitValidate();
  // if (!dimensionPass) {
  //   return;
  // }
  // const { isPass, isEnforcePassPicture } = await sampleClothesPictureRef.value.submitValidate();
  // if (!isPass) {
  //   return;
  // }
  return flag;
};

const handleGoBack = () => {
  router.replace({
    name: 'ClothesCenterStyleAuditList'
  });
};

/* 通过 */
const handlePass = async () => {
  const check = checkFunction();
  if (check) {
    const clothesData = settleSampleClothesParams();
    await sampleAuditPass({
      sampleAuditId: sampleAuditId!,
      checkCountId: detailData.value.checkCountId!,
      sizeTable: sizeInfoList.value!,
      samplePicture: clothesData?.samplePicture,
      dimensionPicture: clothesData.dimensionPicture,
      patternFileUrl: formData.value.patternList[0].url!,
      patternFileName: formData.value.patternList[0]?.name || '',
      doUpdatePatternFile: formData.value.doUpdatePatternFile,
      patternId: detailData.value?.patternId,
      markFramePicture: detailData.value.markFramePictures?.join(','),
    });
    ElMessage.success('已通过');
    handleGoBack();
  }
};

/* 返修 */
const repairDia = reactive({
  visible: false,
  data: {} as IRepairData,
});

const handleRepair = async () => {
  try {
    const check = checkFunction();
    if (check) {
      const clothesData = settleSampleClothesParams();
      const params = getPostData({
        ...detailData.value,
        ...clothesData,
        sizeTable: sizeInfoList.value,
      });
      repairDia.data = {
        ...params,
        makeClothesType: detailData.value.clothesBaseInfo?.makeClothesType,
        patternFileUrl: formData.value.patternList[0].url!,
        patternFileName: formData.value.patternList[0]?.name || '',
        doUpdatePatternFile: formData.value.doUpdatePatternFile,
        patternId: detailData.value?.patternId,
        markFramePicture: detailData.value.markFramePictures?.join(','),
      } as IRepairData;
      repairDia.visible = true;
    }
  } catch {
    ElMessage.error('请检查填写后返修');
  }
};

const repairConfirmHandle = async (repairData: ISampleAuditRepairReqRepairInfo) => {
  repairDia.data.repairInfo = repairData;
  await sampleAuditRepair(repairDia.data);
  ElMessage.success('返修成功');
  repairDia.visible = false;
  await nextTick();
  await new Promise((resolve) => { setTimeout(resolve, 1000); });
  handleGoBack();
};

/* 复版原因 */
const repetDia = reactive({
  visible: false,
  data: {},
});

const handleRepet = async () => {
  try {
    const check = checkFunction();
    if (check) {
      if (isShowSample3dImg.value) {
        const { isPass: dimensionPass } = await sample3dPictureRef.value.submitValidate();
        if (!dimensionPass) {
          return;
        }
      }
      if (isShowSampleClothesImg.value) {
        const { isPass } = await sampleClothesPictureRef.value.submitValidate();
        if (!isPass) {
          return;
        }
      }

      const clothesData = settleSampleClothesParams();
      const params = getPostData({
        ...detailData.value,
        ...clothesData,
        sizeTable: sizeInfoList.value
      });
      repetDia.data = {
        ...params,
        patternFileUrl: formData.value.patternList[0].url!,
        patternFileName: formData.value.patternList[0]?.name || '',
        doUpdatePatternFile: formData.value.doUpdatePatternFile,
        patternId: detailData.value?.patternId,
        markFramePicture: detailData.value.markFramePictures?.join(','),
      };
      repetDia.visible = true;
    }
  } catch {
    ElMessage.error('请检查填写后复版');
  }
};

/* 不通过 */
const handleNoPass = async (data: ISampleAuditNoPassReq) => {
  await sampleAuditNoPass({
    ...data,
    ...repetDia.data,
  });
  ElMessage.success('操作成功');
  repetDia.visible = false;
  handleGoBack();
};

// 审版单详情
const getAuditData = async () => {
  const { data } = await sampleAuditBaseInfo({ sampleAuditId });
  detailData.value = data ?? {};
  clothesBaseInfo.value = data.clothesBaseInfo ?? {};
  patternBaseInfo.value = data.patternBaseInfo ?? {};
  currentDesignCode.value = clothesBaseInfo.value?.designCode || '';
  // 初始化样衣图
  sampleClothesPictureList.value = transformToFileExtList(data.samplePicture) as unknown as IFileExt[];
  // 初始化3D图
  sample3dPictureList.value = transformToFileExtList(data.dimensionPicture) as unknown as IFileExt[];
  // 取详情的table数据
  sizeInfoList.value = data.sizeTable ?? [];
  // 初始化纸样文件
  formData.value.patternList = data.patternBaseInfo ? [{
    url: data.patternBaseInfo.patternUrl!,
    name: data.patternBaseInfo?.patternName || '',
  }] as IFileExt[] : [];
  // 唛架内容
  formData.value.markFramePictureList = (data.markFramePictures || []).map(url => ({
    url
  })) as IFileExt[];
  // 默认未操作过上传纸样文件
  formData.value.doUpdatePatternFile = '0';
};

const handleUploadChange = () => {
  console.log('handleUploadChange');
  // 操作过上传纸样文件
  formData.value.doUpdatePatternFile = '1';
};

const getpatternSize = async () => {
  if (!detailData.value.clothesId) return;
  const { data } = await patternSize({
    clothesId: detailData.value?.clothesId!,
  });
  sizePatternSize.value = data || {};
};

// 二次工艺弹窗
const processDialog = reactive({
  visible: false,
  preview: false,
  crafts: {} as IBomPrintCraftDemandInfoListItem,
  data: {} as IBomOrderMaterialItem,
  craftMatchList: [] as ICraftMatchReqItem[],
});
const getCraftMatch = async (craftDemandId: string = '') => {
  const { data = [] } = await craftMatch({
    craftDemandId,
  });
  processDialog.craftMatchList = data || [];
};

const { batchDictListMap } = useDictionary([
  DICTIONARY_KEY.PLM_PURCHASE_YLBW,
  DICTIONARY_KEY.BOM_CUTTING_METHOD,
]);

const bomList = ref();
const auditCraftDetailObj = ref<ISampleClothesInfoDetailRes>();
const activeName = ref('sampleAudit');
const { tableColumns: bomTableColumns } = useBomTableColumns({
  async previewCraft(row) {
    processDialog.preview = true;
    processDialog.crafts = row as unknown as IBomPrintCraftDemandInfoListItem;
    if (processDialog.preview) {
      await getCraftMatch(row.craftDemandId);
    }
    processDialog.visible = true;
  }
});

const init = async () => {
  formElRef.value?.resetFields();
  await getAuditData();
  getpatternSize();
  const { clothesId = '' } = detailData.value;
  const { data: sampleClothesDetail } = await sampleClothesInfoDetail({ clothesId });
  const { data: bomDetail } = await designCommonGetBomById({ bomId: sampleClothesDetail.clothes?.bomId! });
  auditCraftDetailObj.value = sampleClothesDetail || {};
  bomList.value = bomDetail || [];
};

onBeforeMount(() => {
  init();
});

toRefs({ repairDia, repetDia });

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
.header-img {
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
