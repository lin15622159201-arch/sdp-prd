<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="55%"
    min-width="800px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @closed="close()"
    @open="open()"
  >
    <el-form
      ref="formRef"
      label-width="120px"
      :model="formData"
      :rules="rules"
      :label-suffix="'：'"
      class="app-fheader-custom-form"
    >
      <ScResponsiveRow :col="{ xl: 8 }">
        <el-form-item label="SKC" prop="designCode">
          <el-input
            v-if="isShowEditSkcCode"
            v-model.trim="formData.designCode"
            clearable
          />
          <span v-else>{{ formData.designCode }}</span>
        </el-form-item>
        <el-form-item label="打版方式" prop="makeType">
          <el-select
            v-model="formData.makeType"
            clearable
            @change="changeMakeType"
          >
            <el-option
              v-for="item in MAKE_TYPE_LIST"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描稿版次" prop="editionType">
          <el-tag
            v-if="formData.editionType"
            :type="formData.editionType === EDITION_TYPE_ENUM.HEAD
              ? 'danger' : 'success'"
          >
            {{$filters.getEnumLabel(EDITION_TYPE_LIST, formData.editionType!)}}
          </el-tag>
        </el-form-item>
      </scresponsiverow>
      <!-- 当前SKC的描稿版次=复色，且存在2个及以上的头版花型时，显示 -->
      <!-- 只有一个时候，直接赋值上去 -->
      <ScResponsiveRow
        v-if="formData.editionType === EDITION_TYPE_ENUM.REPEAT
          && refFlowerCodeOptions.length
          && refFlowerCodeOptions.length >= 2"
        :col="{ md: 12, lg: 12, xl: 12 }"
      >
        <el-form-item
          label="引用的花型编号"
          prop="refFlowerCode"
          :col="{ md: 16, lg: 16, xl: 16 }"
        >
          <div class="tw-w-full">
            <el-select
              v-model="formData.refFlowerCode"
              clearable
              @change="changeRefFlowerCode"
              placeholder="请选择引用的花型编号"
            >
              <el-option
                v-for="item in refFlowerCodeOptions"
                :key="item.flowerCode"
                :label="item.flowerCode"
                :value="item.flowerCode"
              />
            </el-select>
            <p class="text-color-grey tw-text-12px">该款的头版描稿任务中，存在多个花型，请选择引用其中一个花型 </p>
          </div>
        </el-form-item>
        <el-form-item
          label="花型参考图"
          prop="referencePatternImgs"
          :col="{ md: 8, lg: 8, xl: 8 }"
        >
          <el-image
            v-if="formData.referencePatternImgs?.length"
            :src="resizeImgByWidth(formData.referencePatternImgs[0], 200)"
            class='tw-w-100px tw-h-100px tw-mr-10px'
            fit='cover'
            :preview-src-list="formData.referencePatternImgs"
            preview-teleported
            lazy
          />
        </el-form-item>
      </ScResponsiveRow>
      <el-form-item label="花型图" prop="flowerPictureList">
        <Uploader
          v-model="formData.flowerPictureList"
          :limit="4"
          listPosition="prepend"
          :size-limit="15"
          size="mini"
          accept=".png,.jpg,.jpeg"
          tips="最多可以上传 4 张图片, 支持png、jpg、jpeg图片格式，单个文件不能超过15MB"
        />
      </el-form-item>
      <ScResponsiveRow :col="{ md: 12, lg: 12, xl: 12 }">
        <el-form-item label="描稿类型" prop="paintingType">
          <el-select
            v-model="formData.paintingType"
            clearable
            @change="changePaintingType"
          >
            <el-option
              v-for="item in paintingTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="紧急程度" prop="urgentType">
          <el-select
            v-model="formData.urgentType"
            clearable
          >
            <el-option
              v-for="item in DIGITAL_DRAFT_TASK_URGENCY_LIST"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </ScResponsiveRow>
      <ScResponsiveRow :col="{ md: 12, lg: 12, xl: 12 }">
        <el-form-item label="底布" prop="commodityCode">
          <el-input
            v-model="formData.commodityCode"
            clearable
            placeholder="请输入底布PID"
            @change="changeMakeType"
          />
        </el-form-item>
        <!-- 当打版方式=动销后打版时，面料SKU必填；打版方式=常规打版时，面料SKU不显示； -->
        <el-form-item
          label="面料SKU"
          prop="fabricSku"
          v-if="formData.makeType === MAKE_TYPE_ENUM.AFTER_MOVING"
        >
          <el-select
            v-model.trim="formData.fabricSku"
            clearable
            filterable
            placeholder="请输入面料SKU"
          >
            <el-option
              v-for="item in fabricSkuList"
              :key="item.skuCode"
              :label="item.skuCode"
              :value="item.skuCode"
            />
          </el-select>
        </el-form-item>
      </ScResponsiveRow>
      <sc-table
        key="table"
        :data="tableData"
        :columns="columns"
        class="tw-mb-20px"
      />
      <ScResponsiveRow :col="{ md: 12, lg: 12, xl: 12 }">
        <el-form-item label="供应商" prop="roomId">
          <el-select
            v-model="formData.roomId"
            clearable
            filterable
            remote
            :remote-method="getRoomList"
            placeholder="请选择供应商"
            @change="changeRoomId"
          >
            <el-option
              v-for="item in roomList"
              :key="item.roomId"
              :label="item.roomName"
              :value="item.roomId!"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描稿费用" prop="paintingFee">
          <span>{{ formData.paintingFee }}</span>
        </el-form-item>
      </ScResponsiveRow>
      <ScResponsiveRow :col="{ md: 12, lg: 12, xl: 12 }">
        <el-form-item label="花型描述" prop="flowerDesc">
          <el-input
            v-model="formData.flowerDesc"
            clearable
            :autosize="{ minRows: 3, maxRows: 6 }"
            maxlength="200"
            placeholder="请输入花型描述"
            show-word-limit
            resize="none"
            type="textarea"
          />
        </el-form-item>
      </ScResponsiveRow>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, PropType, nextTick, watch } from 'vue';
import { ElMessage, type ElForm, type FormRules } from 'element-plus';
import {
  DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM,
  MAKE_TYPE_ENUM,
  MAKE_TYPE_LIST,
  DIGITAL_DRAFT_TASK_URGENCY_LIST,
  EDITION_TYPE_ENUM,
  EDITION_TYPE_LIST,
  EXTERNAL_ROOM_TYPE_ENUM,
} from '../../constant';
import { useResetRef } from '@toy/v-use';
import { useListTableColumns } from './hooks/use-table-columns';
import { resizeImgByWidth } from '@/core/plugins/helper';
import {
  IDigitalPaintingGetEditionTypeAndRefPaintingResRefDigitalPaintingInfoItem as referFlowerCodeItem,
  IDigitalPaintingSaveReq, IDigitalPaintingSaveReqBaseCloth,
  IDigitalPaintingGetCommodityDetailByCodeResCommoditySkuVosItem as IFabricSkuItem,
  IListNameItem,
} from '../../api/types';
import { cloneDeep } from 'lodash-es';
import {
  designCommonSkc,
  digitalPaintingCopyRedo,
  digitalPaintingGetById,
  digitalPaintingGetCommodityDetailByCode,
  digitalPaintingGetDigitalPaintingFee,
  digitalPaintingGetEditionTypeAndRefPainting,
  digitalPaintingSave,
  getSupplierList,
} from '../../api';
import { YES_NO_ENUM, YES_NO_STRING_ENUM } from '@/constant';
import { IFileData } from '@/components/uploader/packages/types';
import usePaintingTypeList from '../../views/list/hooks/use-painting-type-list';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    require: true,
  },
  title: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  /**
   * skc编码
   */
  designCode: {
    type: String,
    default: '',
  },
  /**
   * 操作类型
   * new：新建
   * edit：编辑
   * redraft：重新描稿
   */
  operationType: {
    type: String as PropType<DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM>,
    default: DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.NEW,
  },
  /**
   * 是否能编辑SKC编码，默认为false=不能编辑
   * 仅数码描稿任务列表-新建时可编辑
   */
  isShowEditSkcCode: {
    type: Boolean,
    default: false,
  }
});

interface IEmits {
  (e: 'update:modelValue', visible: boolean): void;
  (e: 'success'): void;
}

const emits = defineEmits<IEmits>();

interface IFormData extends IDigitalPaintingSaveReq {
  /** 重新描稿- 源版数码描稿任务ID */
  parentDigitalPaintingId: string;
  /** 描稿版次 */
  editionType?: EDITION_TYPE_ENUM;
  /** 花型图片，数组仅前端使用 */
  flowerPictureList?: IFileData[];
  /** 花型参考图，仅前端使用 */
  referencePatternImgs?: string[];
}

const { paintingTypeOptions } = usePaintingTypeList();

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const [formData, reset] = useResetRef<IFormData>({
  parentDigitalPaintingId: '',
  digitalPaintingId: '',
  designCode: '',
  styleCode: '',
  refFlowerCode: '',
  flowerPicture: '',
  flowerPictureList: [],
  referencePatternImgs: [],
  paintingType: '',
  paintingTypeName: '',
  urgentType: '',
  makeType: '',
  commodityCode: '',
  baseCloth: undefined,
  fabricSku: '',
  roomId: '',
  roomName: '',
  paintingFee: '',
  flowerDesc: '',
});

const tableData = ref<IDigitalPaintingSaveReqBaseCloth[]>([]);
const fabricSkuList = ref<IFabricSkuItem[]>([]);
const { columns } = useListTableColumns();

/** */
const refFlowerCodeOptions = ref<referFlowerCodeItem[]>([]);

const checkDesignCode = (rule: any, value: string, callback: any) => {
  if (value) {
    designCommonSkc(value).then((skcData) => {
      const styleCode = skcData.data?.styleCode ?? '';
      formData.value.styleCode = styleCode;
      if (!styleCode) {
        callback(new Error('SKC不存在，请输入正确的SKC编号'));
        return;
      }
      digitalPaintingGetEditionTypeAndRefPainting({
        styleCode,
        designCode: value,
      }).then((data) => {
        const d = data.data;
        refFlowerCodeOptions.value = d.refDigitalPaintingInfo || [];
        if (refFlowerCodeOptions.value.length === 1) {
          formData.value.refFlowerCode = d.refDigitalPaintingInfo[0].flowerCode;
        }
        if (!d.editionType) {
          callback(new Error('SKC不存在，请输入正确的SKC编号'));
        } else {
          formData.value.editionType = d.editionType;
          callback();
        }
      }).catch((e) => {
        callback(new Error('后台错误，请联系管理员'));
      });
    }).catch((e) => {
      callback(new Error('后台错误，请联系管理员'));
    });
  } else {
    callback(new Error('SKC编码不能为空'));
  }
};

const checkFabricSku = (rule: any, value: string, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error('不能为空'));
  }
};

const checkCommodityCode = (rule: any, value: string, callback: any) => {
  if (value) {
    digitalPaintingGetCommodityDetailByCode(value).then((data) => {
      const d = data.data;
      if (d && d.commodityInfoVo) {
        const { commodityInfoVo: info } = d;
        tableData.value = [
          {
            commodityId: info.commodityId,
            commodityCode: info.commodityCode,
            commodityName: info.commodityName,
            commodityNumber: info.commodityNumber,
            weightStrFormat: info.weightStrFormat,
            material: info.materials || [],
          }
        ];
      } else {
        callback(new Error('底布不存在，请输入正确的底布PID'));
      }
      fabricSkuList.value = d.commoditySkuVos?.filter(n => n.isEnable === YES_NO_ENUM.YES) || [];
      const item = fabricSkuList.value.find(i => i.skuCode === formData.value.fabricSku);
      if (!item) {
        formData.value.fabricSku = '';
      }
      callback();
    }).catch((e) => {
      console.error(e);
      callback(new Error('后台错误，请联系管理员'));
    });
  } else {
    callback(new Error('底布PID不能为空'));
  }
};

const rules:FormRules = {
  designCode: [{ required: true, trigger: 'change', validator: checkDesignCode }],
  makeType: [{ required: true, message: '不能为空' }],
  refFlowerCode: [{ required: true, message: '不能为空' }],
  flowerPictureList: [{ required: true, message: '不能为空' }],
  paintingType: [{ required: true, message: '不能为空' }],
  urgentType: [{ required: true, message: '不能为空' }],
  commodityCode: [{ required: true, validator: checkCommodityCode }],
  // fabricSku: [{ required: true, validator: checkFabricSku }],
  roomId: [{ required: true, message: '不能为空' }],
};
const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:modelValue', value),
});

const roomList = ref<Partial<IListNameItem>[]>([]);
const getRoomList = async (val: string) => {
  const { data } = await getSupplierList({
    name: val,
    enable: YES_NO_STRING_ENUM.YES,
    externalRoomList: [EXTERNAL_ROOM_TYPE_ENUM.SUPPLIER_ROOM],
    digitalDraftAble: YES_NO_ENUM.YES,
  });
  roomList.value = data || [];
};

const open = async () => {
  const { id, designCode } = props;
  if (designCode) {
    formData.value.designCode = designCode;
    nextTick(() => {
      formRef.value?.validateField('designCode');
    });
  }
  if (!id) return;
  const { data } = await digitalPaintingGetById(id);
  formData.value.digitalPaintingId = data.digitalPaintingId;
  formData.value.editionType = data.editionType;
  formData.value.designCode = data.designCode;
  formData.value.makeType = data.makeType;
  formData.value.paintingType = data.paintingType;
  const item = paintingTypeOptions.value.find(i => i.id === data.paintingType);
  if (item) {
    formData.value.paintingTypeName = item.name;
  } else {
    formData.value.paintingTypeName = '';
  }
  formData.value.urgentType = data.urgentType;
  formData.value.styleCode = data.styleCode;
  formData.value.refFlowerCode = data.refFlowerCode;
  formData.value.flowerPictureList = data.flowerPictureList?.map(i => ({ url: i })) || [];
  formData.value.commodityCode = data.commodityCode;
  formData.value.fabricSku = data.fabricSku;
  formData.value.roomId = data.roomId;
  formData.value.roomName = data.roomName;
  formData.value.paintingFee = data.paintingFee;
  formData.value.flowerDesc = data.flowerDesc;
  if (data.baseCloth) {
    tableData.value = [{ ...data.baseCloth }];
  }
  console.log(tableData.value);
  nextTick(async () => {
    formRef.value?.validate();
    if (data.roomName) {
      await getRoomList(data.roomName);
    }
    if (!roomList.value.length) {
      roomList.value = [
        {
          roomId: data.roomId,
          roomName: data.roomName,
          supplierId: data.supplierId,
        }
      ];
    }
  });
};

const changeRoomId = async (val: string) => {
  console.log('roomid=', val, formData.value.paintingType);
  if (!val || !formData.value.paintingType) return;
  const roomItem = roomList.value.find(i => i.roomId === val);
  if (roomItem) {
    formData.value.roomName = roomItem.roomName;
    try {
      const { data } = await digitalPaintingGetDigitalPaintingFee({
        supplierId: roomItem?.supplierId || '',
        editionType: formData.value.editionType!,
        paintingType: formData.value.paintingType,
        paintingTypeName: formData.value.paintingTypeName,
      });
      formData.value.paintingFee = data || '';
    } catch (error) {
      console.error(error);
      formData.value.paintingFee = '';
    }
  }
};

const changePaintingType = (val: string) => {
  const item = paintingTypeOptions.value.find(i => i.id === val);
  if (item) {
    formData.value.paintingTypeName = item.name;
    changeRoomId(formData.value.roomId);
  } else {
    formData.value.paintingTypeName = '';
  }
};

const changeRefFlowerCode = async (val: string) => {
  console.log(val);
  const item = refFlowerCodeOptions.value.find(i => i.flowerCode === val);
  if (item) {
    formData.value.referencePatternImgs = item.flowerPictureList;
    formData.value.paintingType = item.paintingType;
    formData.value.urgentType = item.urgentType;
    formData.value.commodityCode = item.commodityCode;
    formData.value.fabricSku = item.fabricSku;
    formData.value.roomId = item.roomId;
    formData.value.roomName = item.roomName;
    formData.value.paintingFee = '';
    if (item.roomName) {
      await getRoomList(item.roomName);
      if (!roomList.value.length) {
        roomList.value = [
          {
            roomId: item.roomId,
            roomName: item.roomName,
            supplierId: item.supplierId,
          }
        ];
      }
    }
    // 重新计算一下描稿费用
    changePaintingType(item.paintingType);
  }
};

watch(
  () => [refFlowerCodeOptions.value, formData.value.refFlowerCode],
  () => {
    if (formData.value.refFlowerCode && refFlowerCodeOptions.value.length) {
      const item = refFlowerCodeOptions.value.find(i => i.flowerCode === formData.value.refFlowerCode);
      if (item) {
        formData.value.referencePatternImgs = item.flowerPictureList;
      }
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const changeMakeType = (val: string) => {
  formData.value.fabricSku = '';
};

const close = () => {
  reset();
  tableData.value = [];
  formRef.value?.resetFields();
  show.value = false;
};
const save = async () => {
  console.log('save==', formData.value);
  await formRef.value?.validate();
  const { operationType } = props;
  const d = cloneDeep(formData.value);
  if (d.makeType !== MAKE_TYPE_ENUM.AFTER_MOVING) {
    d.fabricSku = '';
  }
  const item = paintingTypeOptions.value.find(i => i.id === d.paintingType);
  if (item) {
    d.paintingTypeName = item.name;
  } else {
    d.paintingTypeName = '';
  }
  d.flowerPicture = d.flowerPictureList?.map(n => n.url).join(',') ?? '';
  if (tableData.value.length) {
    [d.baseCloth] = tableData.value;
  }
  delete d.editionType;
  delete d.flowerPictureList;
  delete d.referencePatternImgs;

  let msg = '新增成功';
  if (operationType === DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.REDRAFT) {
    d.parentDigitalPaintingId = props.id;
    d.digitalPaintingId = '';
    await digitalPaintingCopyRedo(d);
    msg = '重新描稿成功';
  } else {
    await digitalPaintingSave(d);
    if (operationType === DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM.EDIT) {
      msg = '编辑成功';
    }
  }

  ElMessage.success(msg);
  emits('success');
  close();
};
</script>

<style scoped lang="scss">
//
</style>
