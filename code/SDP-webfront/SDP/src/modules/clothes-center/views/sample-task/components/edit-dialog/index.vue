<template>
  <el-dialog
    :modelValue="props.visible"
    title="3D打版任务"
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
    @open="handleOpen"
  >
    <el-form
      ref="formElRef"
      :model="formData"
      scroll-to-error
      label-position="right"
      label-width="80px"
      :disabled="props.isView"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="3D文件："
            prop="files"
          >
            <div class="tw-flex tw-w-full">
              <Uploader
                v-model="formData.files"
                :limit="1"
                accept=".project"
                :size-limit="500"
                size="mini"
                listType="text"
                :paste="false"
                :use-wrapper="false"
                :multiple="false"
                :download="true"
                tips="支持.project格式文件，大小必须小于500m"
              >
                <template #default>
                  <div style="word-break: break-all; line-height: 1.2;">
                    <el-button size="small">
                      点击上传
                    </el-button>
                  </div>
                </template>
              </Uploader>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="3D图片："
            prop="images"
          >
            <span>正面、背面、侧面、细节图最多各上传5张，支持png、jpg、jpeg格式，单个文件不能超过30MB</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="正面图："
            prop="frontPicture"
            :rules="[{ required: true, message: '请上传正面图' }]"
          >
            <uploader
              v-model="formData.frontPicture"
              :limit="5"
              :sizeLimit="30"
              :paste="false"
              accept=".png,.jpg,.jpeg"
              size="mini"
              class="!tw-w-[auto]"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="背面图："
            prop="backPicture"
            :rules="[{ required: true, message: '请上传背面图' }]"
          >
            <uploader
              v-model="formData.backPicture"
              :limit="5"
              :sizeLimit="30"
              :paste="false"
              accept=".png,.jpg,.jpeg"
              size="mini"
              class="!tw-w-[auto]"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="侧面图："
            prop="sidePicture"
            :rules="[{ required: true, message: '请上传侧面图' }]"
          >
            <uploader
              v-model="formData.sidePicture"
              :limit="5"
              :sizeLimit="30"
              :paste="false"
              accept=".png,.jpg,.jpeg"
              size="mini"
              class="!tw-w-[auto]"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="细节图："
            prop="detailPictures"
          >
            <uploader
              v-model="formData.detailPictures"
              :limit="5"
              :sizeLimit="30"
              :paste="false"
              accept=".png,.jpg,.jpeg"
              size="mini"
              class="!tw-w-[auto]"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">
        取 消
      </el-button>
      <el-button
        type="primary"
        @click="handleConfirm"
        v-if="!props.isView"
      >
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { ElForm } from 'element-plus';
import { dimensionEdit, dimensionDetail } from '../../api';
import { IFile } from '@/components/upload/package/type';
import { PICTURE_ORIENTATION_ENUM } from '../../constant';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  rowData: {
    type: Object,
  },
  isView: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:visible', 'success']);
const formElRef = ref<InstanceType<typeof ElForm> | null>(null);
const defaultFormData = {
  files: [] as IFile[],
  frontPicture: [] as IFile[],
  backPicture: [] as IFile[],
  sidePicture: [] as IFile[],
  detailPictures: [] as IFile[],
};
const formData = ref({ ...defaultFormData });

const getDetail = async () => {
  try {
    const { data } = await dimensionDetail({ dimensionId: props.rowData?.dimensionId });
    formData.value.frontPicture = (data?.dimensionPicture?.frontPicture?.urls || []).map(it => ({ url: it.url }));
    formData.value.backPicture = (data?.dimensionPicture?.backPicture?.urls || []).map(it => ({ url: it.url }));
    formData.value.sidePicture = (data?.dimensionPicture?.sidePicture?.urls || []).map(it => ({ url: it.url }));
    formData.value.detailPictures = (data?.dimensionPicture?.detailPictures?.urls || []).map(it => ({ url: it.url }));
    formData.value.files = data?.dimensionUrl ? [{ url: data?.dimensionUrl, name: data?.dimensionName }] : [];
  } catch (error) {
    formData.value = { ...defaultFormData };
  }
};

const handleOpen = () => {
  getDetail();
};

const handleClose = () => {
  formElRef.value?.resetFields();
  emits('update:visible', false);
};

// 提交确认
const handleConfirm = async () => {
  await formElRef.value?.validate();
  const {
    dimensionId = '', clothesId = ''
  } = props.rowData || {};
  await dimensionEdit({
    dimensionId,
    clothesId,
    dimensionUrl: formData.value.files[0]?.url,
    dimensionName: formData.value.files[0]?.name || '',
    dimensionPicture: {
      backPicture: {
        pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.BACK,
        urls: formData.value.backPicture.map((item: IFile) => ({ url: item.url }))
      },
      frontPicture: {
        pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.FRONT,
        urls: formData.value.frontPicture.map((item: IFile) => ({ url: item.url }))
      },
      sidePicture: {
        pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.SIDE,
        urls: formData.value.sidePicture.map((item: IFile) => ({ url: item.url }))
      },
      detailPictures: {
        pictureOrientationEnum: PICTURE_ORIENTATION_ENUM.DETAIL,
        urls: formData.value.detailPictures.map((item: IFile) => ({ url: item.url }))
      }
    },
  });
  emits('success');
  handleClose();
};

</script>
