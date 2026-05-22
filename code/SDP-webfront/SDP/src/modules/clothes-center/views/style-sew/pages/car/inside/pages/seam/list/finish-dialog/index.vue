<template>
  <el-dialog
    :modelValue="show"
    :title="title"
    width="60%"
    :close-on-click-modal="false"
    append-to-body
    @close="close()"
    @open="handleOpen"
  >
    <sc-table
      height="300px"
      :data="sizeInfoList"
      :columns="tableColumns"
    />
    <el-row>
      <el-col :span="24" class="tw-my-[15px]">
        <detail-title title="样衣图：" />
        <span>正面、背面、侧面必填一张，细节图最多5张，单张图片最大50m，支持jpg、png、jpeg</span>
      </el-col>
      <SampleClothesPicture
        ref="sampleClothesPictureRef"
        v-model="sampleClothesPictureList"
        :related-design-code="props.sewId"
      />
    </el-row>
    <template #footer>
      <el-button @click="close">
        取消
      </el-button>
      <el-button type="primary" @click="confirm">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { v1Sew, sewFinish } from '../../api';
import { IFileExt } from '@/modules/clothes-center/constant/types';
import SampleClothesPicture from '@/modules/clothes-center/components/sample-clothes-picture/index.vue';
import {
  transformToFileExtList
} from '@/modules/clothes-center/components/sample-clothes-picture/hooks/use-picture-transform';
import { useListColumns } from './use-table-columns';
import {
  IV1SewRes,
} from '../../api/types';
import { PICTURE_ORIENTATION_ENUM } from '@/modules/clothes-center/constant';
import { YES_NO_ENUM } from '@/constant';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '车缝量尺',
  },
  sewId: {
    type: String,
    default: '',
  }
});
const emits = defineEmits(['update:visible', 'confirm']);
const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:visible', value),
});
// 样衣图
const sampleClothesPictureList = ref<IFileExt[]>([]);
const detailData = ref();
const sizeInfoList = ref();
const { tableColumns } = useListColumns({ detailData, sizeInfoList });

const close = () => {
  show.value = false;
};

const sampleClothesPictureRef = ref();
/* 校验-样衣实测填写 */
const checkClothesSize = (sizeInfoList_: IV1SewRes['sewSizeInfoList']) => {
  return sizeInfoList_.every((row: IV1SewRes['sewSizeInfoList'][0]) => {
    return row?.clothesTrimSizeList?.every((size) => {
      const isHas = String(size.value)?.trim() || false;
      if (!isHas) size.error = true;
      return isHas;
    });
  });
};

const clearError = (sizeInfoList_: IV1SewRes['sewSizeInfoList']) => {
  sizeInfoList_?.forEach((row: IV1SewRes['sewSizeInfoList'][0]) => {
    row?.clothesTrimSizeList?.forEach((size) => {
      delete size.error;
    });
  });
};

const settleSampleClothesParams = (isEnforcePassPicture?: string) => {
  const params = {
    samplePicture: {} as IV1SewRes['samplePicture'],
    sewPicture: sampleClothesPictureList.value.map(item => item.url),
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
  params.enforcePassPicture = isEnforcePassPicture || '';
  return params;
};

const confirm = async () => {
  if (!checkClothesSize(sizeInfoList.value)) {
    ElMessage.error('请完整填写样衣实测尺寸信息');
    return;
  }
  clearError(sizeInfoList.value);
  const { isPass, isEnforcePassPicture } = await sampleClothesPictureRef.value.submitValidate();
  if (!isPass) {
    return;
  }
  const clothesData = settleSampleClothesParams(isEnforcePassPicture);
  const params: any = {
    sewId: props.sewId,
    sewSizeInfoList: sizeInfoList.value,
    ...clothesData,
  };
  await sewFinish(params);
  emits('confirm');
  close();
};

const handleOpen = async () => {
  const { data } = await v1Sew({ sewId: props.sewId });
  detailData.value = data;
  sizeInfoList.value = data.sewSizeInfoList;
  // 初始化样衣图
  sampleClothesPictureList.value = transformToFileExtList(data.samplePicture!) as unknown as IFileExt[];
};

</script>

<style lang="scss" scoped>
.reset-form-item-top {
  :deep(.el-form-item) {
    margin-top: 18px;
  }
  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }
}
</style>
