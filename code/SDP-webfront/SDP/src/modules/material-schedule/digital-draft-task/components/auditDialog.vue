<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="70%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="my-dialog el-dialog-inner-scroll"
    append-to-body
    @closed="close()"
    @open="open()"
    style="min-width: 900px;"
  >
    <el-form
      ref="formRef"
      label-width="90px"
      :model="formData"
      :rules="rules"
      :label-suffix="'：'"
      class="app-fheader-custom-form"
    >
      <content-card title="描稿需求">
        <template #content>
          <ScResponsiveRow :col="{ xl: 8 }">
            <el-form-item label="SKC">
              <span>{{ formData.designCode }}</span>
            </el-form-item>
            <el-form-item label="描稿类型">
              <span>{{ formData.paintingTypeName }}</span>
            </el-form-item>
            <el-form-item label="紧急程度">
              <span>{{ $filters.getEnumLabel(DIGITAL_DRAFT_TASK_URGENCY_LIST, formData.urgentType) }}</span>
            </el-form-item>
          </scresponsiverow>
          <ScResponsiveRow :col="{ xl: 8 }">
            <el-form-item
              label="描稿版次"
            >
              <el-tag
                v-if="formData.editionType"
                :type="formData.editionType === EDITION_TYPE_ENUM.HEAD
                  ? 'danger' : 'success'"
              >
                {{$filters.getEnumLabel(EDITION_TYPE_LIST, formData.editionType!)}}
              </el-tag>
            </el-form-item>
            <el-form-item
              label="打版方式"
            >
              <span>{{ $filters.getEnumLabel(MAKE_TYPE_LIST, formData.makeType) }}</span>
            </el-form-item>
            <el-form-item
              label="花型编号"
            >
              <span>{{ formData.flowerCode }}</span>
            </el-form-item>
          </ScResponsiveRow>
          <ScResponsiveRow :col="{ sm: 24, xl: 8 }">
            <el-form-item
              :col="{ md: 16, lg: 16, xl: 16 }"
              label="花型图"
              prop="flowerPictureList"
            >
              <div
                v-for="(item, index) in formData.flowerPictureList"
                :key="item"
              >
                <el-image
                  :src="resizeImgByWidth(item, 200)"
                  class='tw-w-80px tw-h-80px tw-mr-10px'
                  fit='cover'
                  :preview-src-list="formData.flowerPictureList"
                  preview-teleported
                  :initial-index="index"
                  lazy
                />
              </div>
            </el-form-item>
            <el-form-item
              label="花型描述"
            >
              <span>{{ formData.flowerDesc }}</span>
            </el-form-item>
          </ScResponsiveRow>
          <el-form-item
            label="底布信息"
          >
            <sc-table
              key="table"
              :data="tableData"
              :columns="columns"
            />
          </el-form-item>
        </template>
      </content-card>

      <content-card title="描稿结果">
        <template #content>
          <ScResponsiveRow :col="{ xl: 8 }">
            <el-form-item label="供应商" prop="supplierId">
              <span>{{ formData.roomName }}</span>
            </el-form-item>
            <el-form-item
              label="描稿效果图"
              prop="paintingPictureList"
              :col="{ xl: 16, md: 16, lg: 16 }"
            >
              <div v-for="(item, index) in formData.paintingPictureList" :key="index">
                <el-image
                  :src="resizeImgByWidth(item, 200)"
                  class='tw-w-80px tw-h-80px tw-mr-10px'
                  fit='cover'
                  :preview-src-list="formData.paintingPictureList"
                  preview-teleported
                  :initial-index="index"
                  lazy
                />
              </div>
            </el-form-item>
          </ScResponsiveRow>
          <ScResponsiveRow :col="{ xl: 8 }">
            <el-form-item label="备注" prop="remark">
              <span>{{ formData.remark }}</span>
            </el-form-item>
            <el-form-item
              label="备注图片"
              :col="{ xl: 16, md: 16, lg: 16 }"
            >
              <div v-for="(item, index) in formData.remarkPictureList" :key="index">
                <el-image
                  :src="resizeImgByWidth(item, 200)"
                  class='tw-w-80px tw-h-80px tw-mr-10px'
                  fit='cover'
                  :preview-src-list="formData.remarkPictureList"
                  preview-teleported
                  :initial-index="index"
                  lazy
                />
              </div>
            </el-form-item>
          </ScResponsiveRow>
          <template v-if="operationType === DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.AUDIT">
            <el-form-item label="审核状态" prop="auditStatus">
              <el-radio-group v-model="formData.auditStatus" @change="changeAuditStaus">
                <el-radio :label="AUDIT_STATUS_ENUM.PASS">
                  审核通过
                </el-radio>
                <el-radio :label="AUDIT_STATUS_ENUM.REJECTED">
                  审核驳回
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <Uploader
              v-model="formData.auditPictures"
              :limit="4"
              listPosition="prepend"
              :size-limit="15"
              size="mini"
              accept=".png,.jpg,.jpeg"
              tips=""
              :paste="false"
              :useWrapper="false"
              class="tw-ml-90px"
            >
              <template #list />
              <el-icon
                class="upload-icon"
                color="#707AF2"
                size="18"
              ><PictureFilled /></el-icon>
            </Uploader>
            <el-form-item
              label="审批意见"
              prop="rejectReason"
              :rules="{ required: true, message: '请输入驳回意见' }"
            >
              <el-input
                v-model="formData.rejectReason"
                clearable
                :autosize="{ minRows: 3, maxRows: 5 }"
                maxlength="100"
                show-word-limit
                resize="none"
                type="textarea"
              />
            </el-form-item>
            <el-form-item
              label=""
              v-if="formData.auditPictures?.length"
            >
              <div
                class="tw-position-relative"
                v-for="(item, index) in formData.auditPictures"
                :key="index"
              >
                <el-image
                  :src="resizeImgByWidth(item.url, 200)"
                  class='tw-w-80px tw-h-80px tw-mr-15px'
                  fit='cover'
                  :preview-src-list="formData.auditPictures.map(n => n.url)"
                  preview-teleported
                  :initial-index="index"
                  lazy
                />
                <el-icon
                  class="del-img-btn"
                  color="red"
                  size="18"
                  @click.capture="handleDelAudiPictures(index)"
                ><CircleClose /></el-icon>
              </div>
            </el-form-item>
          </template>
        </template>
      </content-card>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button
          v-if="operationType === DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.AUDIT"
          type="primary"
          @click="save()"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, PropType } from 'vue';
import { ElMessage, type ElForm, type FormRules } from 'element-plus';
import {
  DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM,
  MAKE_TYPE_LIST,
  EDITION_TYPE_LIST,
  EDITION_TYPE_ENUM,
  DIGITAL_DRAFT_TASK_URGENCY_LIST,
  AUDIT_STATUS_ENUM,
} from '../constant';
import { useResetRef } from '@toy/v-use';
import { useListTableColumns } from './digitalDraftDialog/hooks/use-table-columns';
import { resizeImgByWidth } from '@/core/plugins/helper';
import { IDigitalPaintingSaveReq, IDigitalPaintingSaveReqBaseCloth } from '../api/types';
import { digitalPaintingAudit, digitalPaintingGetById } from '../api';
import { PictureFilled, CircleClose } from '@element-plus/icons-vue';
import { IFileData } from '@/components/uploader/packages/types';

const props = defineProps({
  title: {
    type: String,
    default: '审核',
  },
  visible: {
    type: Boolean,
    default: false,
    require: true,
  },
  id: {
    type: String,
    default: '',
  },
  /**
   * 操作类型
   * AUDIT: 审核
   * AUDIT_VIEW： 审核-查看详情
   */
  operationType: {
    type: String as PropType<DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM>,
    default: DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.AUDIT,
  },
});

interface IEmits {
  (e: 'update:modelValue', visible: boolean): void;
  (e: 'success'): void;
}

const emits = defineEmits<IEmits>();

interface IFormData extends IDigitalPaintingSaveReq {
  /**
   * 描稿效果图
   */
  paintingPictureList: string[];
  /** 描稿版次 */
  editionType?: EDITION_TYPE_ENUM;
  /** 花型图片，数组仅前端使用 */
  flowerPictureList?: string[];
  /** 花型参考图，仅前端使用 */
  referencePatternImgs?: string[];
  flowerCode: string;
  /** 审核状态 */
  auditStatus: string;
  /** 驳回原因 */
  rejectReason: string;
  remark?: string;
  /** 审核图片，最多4张 */
  auditPictures?: IFileData[];
}

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const [formData, reset] = useResetRef<IFormData>({
  digitalPaintingId: '',
  designCode: '',
  styleCode: '',
  refFlowerCode: '',
  flowerCode: '',
  flowerPicture: '',
  flowerPictureList: [],
  paintingPictureList: [],
  referencePatternImgs: [],
  paintingType: '',
  urgentType: '',
  makeType: '',
  commodityCode: '',
  baseCloth: undefined,
  fabricSku: '',
  roomId: '',
  roomName: '',
  paintingFee: '',
  flowerDesc: '',
  auditStatus: '',
  rejectReason: '',
  remark: '',
  paintingTypeName: '',
  auditPictures: [],
  remarkPictureList: [],
});

const rules:FormRules = {
  auditStatus: [{ required: true, message: '不能为空' }],
};
const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:modelValue', value),
});

const tableData = ref<IDigitalPaintingSaveReqBaseCloth[]>([]);
const { columns } = useListTableColumns();

const open = async () => {
  const { id } = props;
  if (!id) return;
  const { data } = await digitalPaintingGetById(id);
  formData.value.digitalPaintingId = data.digitalPaintingId;
  formData.value.editionType = data.editionType;
  formData.value.designCode = data.designCode;
  formData.value.makeType = data.makeType;
  formData.value.paintingType = data.paintingType;
  formData.value.paintingTypeName = data.paintingTypeName;
  formData.value.urgentType = data.urgentType;
  formData.value.styleCode = data.styleCode;
  formData.value.refFlowerCode = data.refFlowerCode;
  formData.value.flowerPictureList = data.flowerPictureList;
  formData.value.commodityCode = data.commodityCode;
  formData.value.fabricSku = data.fabricSku;
  formData.value.roomId = data.roomId;
  formData.value.roomName = data.roomName;
  formData.value.paintingFee = data.paintingFee;
  formData.value.flowerDesc = data.flowerDesc;
  formData.value.paintingPictureList = data.paintingPictureList;
  formData.value.flowerCode = data.flowerCode;
  formData.value.remark = data.remark;
  formData.value.remarkPictureList = data.remarkPictureList;
  if (data.baseCloth) {
    tableData.value = [data.baseCloth];
  }
};

const changeAuditStaus = () => {
  formRef.value?.clearValidate();
};

const handleDelAudiPictures = (index: number) => {
  formData.value.auditPictures?.splice(index, 1);
};

const close = () => {
  reset();
  formRef.value?.resetFields();
  show.value = false;
};
const save = async () => {
  await formRef.value?.validate();
  const { auditStatus, rejectReason, auditPictures } = formData.value;
  await digitalPaintingAudit({
    digitalPaintingId: props.id,
    auditState: auditStatus,
    auditRemark: rejectReason,
    auditPicture: auditPictures?.length ? auditPictures.map(n => n.url).join(',') : '',
  });
  ElMessage.success('审核成功');
  emits('success');
  close();
};
</script>

<style scoped lang="scss">
.my-dialog{
  :deep(.el-dialog__body) {
    padding: 0;
  }
  .del-img-btn {
    position: absolute;
    top: -8px;
    right: 0;
    cursor: pointer;
  }
}
.app-fheader-custom-form {
  :deep(.header-title-wrap){
    border-bottom: 0;
    padding: 0;
  }
  :deep(.conetent-wrap) {
    padding: 0;
  }
}
</style>
