<template>
  <el-form
    ref="ruleForm"
    :model="form"
    :inline="true"
    label-width="auto"
    class="form"
    style="max-width: 96%"
  >
    <div class="tw-w-100%">
      <el-form-item
        label="经营站点"
        label-width="100px"
        prop="siteIds"
        :rules="[{ required: true, message: '请选择经营站点', trigger: 'change' }]"
      >
        <el-select
          class="tw-w-100%"
          v-model="form.siteIds"
          :disabled="isDis"
          placeholder="请选择经营站点"
          clearable
          filterable
          @change="getTemuWarehouse"
        >
          <el-option
            v-for="(item, index) in temuSiteList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </div>
    <div class="tw-m-10px tw-p-l-90px">
      <el-table
        :data="form.warehouseIds"
        class="tw-w-400px"
        border
      >
        <el-table-column width="300">
          <template #header>
            <span class="asterisk">*</span>
            <span style="color: #303133">卖家自发货仓</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`warehouseIds[${$index}].warehouseId`"
              :rules="[{ required: true, message: '卖家自发货仓不能为空', trigger: ['change', 'blur'] }]"
            >
              <el-select
                class="tw-w-100%"
                v-model="row.warehouseId"
                :disabled="isDis"
                placeholder="请选择"
                multiple
                clearable
                filterable
              >
                <el-option
                  v-for="v in warehouseList"
                  :key="v.warehouseId"
                  :label="v.warehouseName"
                  :value="v.warehouseId || ''"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="站点" width="100">
          <template #default>
            {{ form.siteIds ? '美国站' : '' }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tw-w-100%">
      <el-form-item
        label-width="100px"
        label="平台品类"
        prop="catId"
        :rules="[{ required: true, message: '请选择平台品类', trigger: 'change' }]"
      >
        <el-cascader
          class="tw-w-240px"
          v-model="form.catId"
          :disabled="isDis"
          :options="temuCategoryList as unknown as CascaderOption[]"
          :props="{
            label: 'categoryName',
            value: 'categoryId',
          }"
          filterable
          :show-all-levels="true"
          @change="handleCatChange"
        />
        <!-- <el-select
          class="tw-w-100%"
          v-model="form.catId"
          placeholder="请选择平台品类"
          clearable
          filterable
          @change="handleCatChange"
        >
          <el-option
            v-for="item in temuCategoryList"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item.categoryId"
          />
        </el-select> -->
      </el-form-item>
    </div>
    <span
      v-for="item in attrList"
      :key="`${item.pid}_${item.refPid}`"
    >
      <el-form-item
        label-width="100px"
        v-if="getShowField(item)"
        :prop="`${item.pid}_${item.refPid}`"
        :rules="[
          { validator: onValidate, trigger: ['blur', 'change'] }
        ]"
        :class="item.controlType === CONTROL_TYPE_ENUM.PROPERTY_CHOOSE_AND_INPUT ? 'form-block' : ''"
      >
        <template #label>
          <span v-if="item.required" class="asterisk">*</span>
          <span style="color: #303133">{{ item.name }}</span>
        </template>

        <!-- <div v-if="isShowDetail" style="width: 150px;color: #606266;">
          <div v-if="item.controlType === CONTROL_TYPE_ENUM.INPUT">
            {{ form[`${item.pid}_${item.refPid}`] }}
          </div>

          <div v-if="item.controlType === CONTROL_TYPE_ENUM.CHOOSE">
            {{ rendering(item) }}
          </div>
        </div> -->

        <div class="tw-w-100%">
          <!-- 可输入 -->
          <el-input
            v-if="item.controlType === CONTROL_TYPE_ENUM.INPUT && !isShowDetail"
            class="tw-w-100%"
            v-model="form[`${item.pid}_${item.refPid}`]"
            :disabled="isDis"
            placeholder="请输入"
            clearable
          />

          <!-- 可勾选 :multiple="Number(item.chooseMaxNum) > 1" -->
          <el-select
            v-if="item.controlType === CONTROL_TYPE_ENUM.CHOOSE && !isShowDetail"
            v-model="form[`${item.pid}_${item.refPid}`]"
            filterable
            :disabled="isDis"
            clearable
            placeholder="请选择"
            @change="(vid) => onChange(vid, item)"
          >
            <el-option
              v-for="option in item.values"
              :key="option.vid"
              :label="option.value"
              :value="option.vid"
            />
          </el-select>

          <!-- 属性勾选和数值录入 -->
          <PropertyChooseAndInput
            v-if="item.controlType === CONTROL_TYPE_ENUM.PROPERTY_CHOOSE_AND_INPUT"
            ref="propertyChooseAndInputRef"
            :key="`${item.pid}_${item.refPid}`"
            :attr="item"
            :nameKey="`${item.pid}_${item.refPid}`"
            :detail="detail"
            :cat-id="catId"
            :detail-cat-id="detailCatId"
            :is-show-detail="isShowDetail"
          />
        </div>
      </el-form-item>
    </span>
    <div class="tw-w-100%">
      <el-form-item
        class="tw-w-100%"
        label="中文标题"
        prop="productName"
        label-width="100px"
        :rules="[{ required: true, message: '请输入中文标题', trigger: 'change' }]"
      >
        <el-input
          class="tw-w-100%"
          :disabled="isDis"
          v-model="form.productName"
        />
      </el-form-item>
    </div>
    <div class="tw-w-100%">
      <el-form-item
        class="tw-w-100%"
        label="英文标题"
        label-width="100px"
        prop="productEnName"
        :rules="[{ required: true, message: '请输入英文标题', trigger: 'change' }]"
      >
        <el-input :disabled="isDis" v-model="form.productEnName" />
      </el-form-item>
    </div>
    <el-form-item
      label="素材图"
      label-width="100px"
      prop="materialImgUrl"
      :rules="[{ required: true, message: '素材图不能为空', trigger: 'change' }]"
    >
      <div class="tw-flex">
        <div class="flex-y-center">
          <el-image
            class="tw-w-100px tw-h-100px"
            :src="form.materialImgUrl"
            :preview-src-list="[form.materialImgUrl]"
            show-progress
            :initial-index="1"
            fit="cover"
          />
          <el-button
            v-if="!isDis || goodsEditImg"
            type="primary"
            text
            @click="getMaterialImgUrl"
          >
            刷新
          </el-button>
        </div>
        <div class="tw-color-#999 tw-w-180px tw-m-l-10px">
          素材图点击刷新按钮将自动获取SKC的第一张图片素材图尺寸要求比例为1：1
        </div>
      </div>
    </el-form-item>
    <el-form-item
      label="视频"
    >
      <Uploader
        :disabled="isDis && !goodsEditImg"
        class="tw-ml-[-5px]"
        v-model="form.video"
        uploader-style="button"
        :limit="1"
        :accept="'.mp4, .mov, .avi'"
        :size-limit="20"
        :tips="''"
      />
    </el-form-item>
  </el-form>
  <!-- 图片裁剪弹框 -->
  <ImageCropDialog
    v-model="showCropDialog"
    :images="cropImageList"
    type="materialImage"
    @confirm="handleCropConfirm"
  />
  <el-dialog
    v-model="showCropper"
    title="调整尺寸"
    width="980px"
  >
    <ImageCropperModal
      v-if="showCropper"
      :aspectRatio="aspectRatio"
      :allowAdjustRatio="false"
      :maxImages="20"
      :maxFileSize="10"
      :presetImages="presetImages"
      :autoLoadPresets="true"
      @on-confirm="handleConfirm"
      @on-cancel="handleCancel"
      @on-upload="handleUpload"
      @on-crop-change="handleCropChange"
    />
  </el-dialog>
</template>

<script lang="ts" setup>
import { temuWarehouseApi } from '../api';
import type { CascaderOption } from 'element-plus';
import {
  fetchTemuCategoryList,
  temuPropertyApi,
  temuColorApi,
  temuLogisticsTemplateApi,
  temuSizeApi,
  temuPartApi,
  sizeTempPageApi,
} from '@/api/temu';
import {
  ITemuCategoryListResItem,
  TemuPartResItem,
} from '@/api/temu/type';
// import { TemuWarehouseResItem } from '../api/types';
// import { attrCatsAttr, spuGetCustomColor } from '@/modules/production-manage/api';
import { defineProps, ref, onMounted, defineEmits, PropType, watch, defineExpose, nextTick, computed } from 'vue';
import { CONTROL_TYPE_ENUM, PRIORITYAGES, PRIORITYAGES_MIN } from '../constant';
import PropertyChooseAndInput from './property-choose-and-input.vue';
// import BrandExpansion from './brand-expansion.vue';
import { FormInstance, ElMessage } from 'element-plus';
// import { useI18n } from 'vue-i18n';
// import { usePageStatus } from '../../hooks/use-page-status';
// const { t } = useI18n();
import { useDict } from '../hooks/use-dict';
import { useForm, IImageItem, IFormDataSkcItem } from '../hooks/use-form';
import { arrayToTree, getLabelPathByValue, getLabeSuiting } from '@/core/utils/tree';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import ImageCropDialog from './product-info/image-crop-dialog.vue';
import { useContext } from '../hooks/use-context';
import { onBeforeRouteLeave } from 'vue-router';
import ImageCropperModal from './imageCropperModal.vue';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

interface TEMPLATE {
  templateId: string;
  templateName: string;
  temps: any;
}
const { isReadonly, isGoodsEdit, goodsEditImg } = useContext();
const isDis = computed(() => {
  return isReadonly.value || isGoodsEdit.value || goodsEditImg.value;
});
// 图片裁剪弹框
const showCropDialog = ref(false);
const cropImageList = ref<IImageItem[]>([]);
// const { getDictionaryOptionsSync } = useDictionary();
const {
  formAttrsData,
  temuLogisticsList,
  formData,
  form,
  sizeAttr,
  colorAttr,
  sizeList,
  tableDataList,
  sizeParts,
  colorOptions,
  sizeTempList,
  temuReviewDatas,
  theFirstTime,
  formRef,
  echoList,
  temu_defaultValue,
  sizeMappingList,
  ruleForm,
  warehouseList,
  categoryFinalStage,
  suiting,
} = useForm();
const { temuSiteList, getDictionaryOptionsSync } = useDict();
const emits = defineEmits(['update:size-attr', 'update:color-attr']);

const props = defineProps({
  styleId: {
    type: String,
    default: '',
  },
  catId: {
    type: String,
    default: '',
  },
  catName: {
    type: String,
    default: '',
  },
  detail: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  detailData: {
    type: Object,
    default: () => {},
  },
  isShowDetail: {
    type: Boolean,
    default: false,
  },
  detailCatId: {
    type: String,
    default: '',
  },
  manageType: {
    type: String,
    default: '',
  },
  brandShopName: {
    type: String,
    default: '',
  },
});

const showCropper = ref(false);
// 图片裁剪相关参数
const aspectRatio = ref({ width: 1000, height: 1000 });
// 预设图片示例（可选）
const presetImages = ref<string[]>([]);
const handleConfirm = (images: any) => {
  form.value.materialImgUrl = images?.[0]?.croppedUrl ?? '';
  showCropper.value = false;
};

const handleCancel = () => {
  showCropper.value = false;
};

const handleUpload = () => {
  // console.log('上传图片:', images.length, '张')
};
const handleCropChange = () => {
  // console.log('裁剪区域变化:', currentImage)
};
// 页面状态
// const { isCreate } = usePageStatus();

// 回显数据
const initForm = async () => {
  await nextTick();
  if (!temuReviewDatas.value?.attrs?.length) {
    return;
  }
  form.value.catName = temuReviewDatas.value?.catName;
  form.value.catId = temuReviewDatas.value?.catId?.toString();
  getCatsAttr(true);
  // const res = {} as IForm;
  // temuReviewDatas.value.attrs.forEach((item: any) => {
  //   if (item.pid && item.refPid) {
  //     const key = `${item.pid}_${item.refPid}`;
  //     if (item.controlType === CONTROL_TYPE_ENUM.INPUT) {
  //       res[key] = item.propValue;
  //     } else if (item.controlType === CONTROL_TYPE_ENUM.CHOOSE) {
  //       const values = attrList.value.find((it: { pid: string; refPid: string; }) => `${it.pid}_${it.refPid}` === key)?.values;
  //       res[key] = item.vid;
  //       selectedValue.value[key] = values?.find((it: { vid: string; }) => it.vid === item.vid) || ({} as any);
  //     }
  //   }
  // });
  // form.value = res;
};

type IForm = Record<string, string>;
const onValidate = (rule: any, value: any, callback: any) => {
  const target = attrList.value.find(item => `${item.pid}_${item.refPid}` === rule.field);
  if (!target) callback();
  // 不能为空
  if (target?.required && !value) {
    if (target?.controlType === CONTROL_TYPE_ENUM.PROPERTY_CHOOSE_AND_INPUT) {
      // callback();
    } else {
      callback(new Error(`${target.name}不能为空`));
    }
  }
  if (target?.controlType === CONTROL_TYPE_ENUM.INPUT) {
    if (target.minValue && target.maxValue) {
      if (Number(value) < Number(target.minValue) || Number(value) > Number(target.maxValue)) {
        callback(
          new Error(
            `最小值：${target.minValue} 最大值：${target.maxValue}`,
          ),
        );
      }
    }
    if (Number(target.inputMaxNum)) {
      if (value.length > Number(target.inputMaxNum)) {
        callback(new Error(`内容长度不能超过${target.inputMaxNum}`));
      }
    }
  }
  callback();
};

// 获取自定义颜色
// const customColorList = ref<ISpuGetCustomColorResValuesItem[]>([]);
const getCustomColor = async () => {
  // 1-获取启用状态的颜色 0-获取所有的颜色
  // const { data } = await spuGetCustomColor('1');
  // customColorList.value = data?.values;
};
const attrList = ref<any[]>([]);
const initSizeList = async (sizeItems: any, isUpdata?: boolean) => {
  if (temuReviewDatas.value?.styleId === '0' || props.detailData?.styleId === '0') {
    sizeList.value = [];
    temuReviewDatas.value?.skcs?.[0].skus.forEach((v: any) => {
      const s = v.skuSpecs.find?.((v1: { parentSpecName: string; }) => v1.parentSpecName === '尺码')?.specName;
      sizeList.value.push({
        label: s,
        value: s,
        checked: true,
      });
    });
  }
  if (props.detailData?.styleId === '0') return;
  const sizes = await getDictionaryOptionsSync(DICTIONARY_KEY.PLM_STANDARY_SIZE);
  if (!Array.isArray(sizes)) return;
  const sizeGroup = sizes.find(item => item.value === props.detailData.sizeStandardCode);
  const listStr = sizeGroup?.children?.[0]?.label;
  sizeMappingList.value = [];
  sizeGroup?.children?.[0]?.attributes?.forEach((m) => {
    sizeMappingList.value.push({
      internalSize: m.code,
      temuSize: m.name,
    });
  });
  if (temuReviewDatas.value?.styleId !== '0') {
    sizeList.value = [];
  }
  listStr?.split(',').forEach((size: string) => {
    // sizeMappingList内部尺码映射temu尺码
    size = sizeMappingList.value.find(v => v.internalSize === size)?.temuSize ?? size;
    // sizeItems根据品类查temu的尺码
    const sizePt: any = sizeItems.find((v: { name: string; }) => size === v.name);
    // sizeAttr 模板的尺码
    const sizesTandard: any = (Array.isArray(sizeAttr.value) ? sizeAttr.value : []).find((v: { value: string; }) => size === v.value);
    if (sizePt && sizesTandard && sizePt.available === 0) {
      const default_onSale = sizes.find((itemS: any) => itemS.dictCode === props.detailData.sizeStandardCode)?.attributes?.find(sItem1 => sItem1.code === 'default_onSale')?.name;
      const default_onSaleList = default_onSale?.split(',') ?? [];
      sizeList.value.push({
        label: size,
        value: size,
        checked: isUpdata ? temuReviewDatas.value?.sizes?.includes(size) : default_onSaleList.includes(size),
        // disabled: temuReviewDatas.value?.sizes?.includes(size) && isUpdata,
        ...sizePt,
        ...sizesTandard,
        templatePid: '1144074',
        pid: '14',
        refPid: '65',
        propName: '尺码',
        propValue: '',
        parentSpecId: '3001',
        parentSpecName: '尺码',
        valueGroupId: sizesTandard?.group?.id,
        valueGroupName: sizesTandard?.group?.name,
        numberInputValue: '',
        valueUnit: '',
        valueExtendInfo: sizesTandard?.extendInfo,
      });
    }
  });
};
// const warehouseList = ref<TemuWarehouseResItem[]>([]);
const getTemuWarehouse = async (siteId?: string) => {
  if (!siteId || (!props.detailData?.storeId && !temuReviewDatas.value?.storeId)) return;
  const shopId: string = props.detailData?.storeId || temuReviewDatas.value?.storeId;
  const { data } = await temuWarehouseApi({
    shopId,
    siteId,
  });
  if (data && data?.length) {
    warehouseList.value = data;
  } else {
    return;
  }
  // form.value.warehouseIds = [{
  //   warehouseId: temuReviewDatas.value?.warehouseIds ?? [],
  // }];
  const warehouseNames = temuSiteList.value.find(v => v.value === siteId)?.attributes?.find(v => v.code === 'defaultWH')?.name;
  if ((!form.value.warehouseIds[0].warehouseId || !form.value.warehouseIds[0].warehouseId.length) && warehouseNames) {
    form.value.warehouseIds = form.value.warehouseIds.map((v: { warehouseId: string[]; }) => {
      return {
        ...v,
        warehouseId: warehouseList.value.filter(v1 => warehouseNames?.split(',')?.includes(v1.warehouseName || '')).map(v2 => v2.warehouseId),
      };
    });
  }
  const { data: temuLogistics } = await temuLogisticsTemplateApi({
    shopId,
    siteId,
  });
  temuLogisticsList.value = temuLogistics;
  formData.value.freightTemplateId = formData.value.freightTemplateId || temuLogistics?.[0]?.freightTemplateId;
};
watch(() => warehouseList.value, () => {
  if (!warehouseList.value.length && !temuReviewDatas.value?.siteIds?.[0]) {
    getTemuWarehouse(form.value.siteIds);
  }
}, {
  immediate: true,
});
const setParts = async (name: string, sizeIndex: number) => {
  const parts = sizeTempList.value.find(v => v.templateName === name)?.parts;
  const catId = sizeTempList.value.find(v => v.templateName === name)?.catId;
  // 部位
  const parItems = temuReviewDatas.value?.sizeReqs?.[sizeIndex]?.elementList;
  const { data: part } = await temuPartApi(catId || '');
  tableDataList.value[sizeIndex].sizeParts = (part || []).map((v: TemuPartResItem) => {
    return {
      label: v.name,
      field: v.id,
      checked: parItems?.some((p1: any) => p1.id === v.id), // (parts || []).includes(v.id || ''),
      required: v.required
    };
  });
};
const getCatsAttr = async (isUpdata = false) => {
  theFirstTime.value = isUpdata;
  if (!form.value.catId) return;
  // useList().then(async (data: any) => {
  // 定义大类排序规则
  const priorityAges = [PRIORITYAGES.FORM_KEY_2089, PRIORITYAGES.FORM_KEY_2054, PRIORITYAGES.FORM_KEY_2050, PRIORITYAGES.FORM_KEY_2052, PRIORITYAGES.FORM_KEY_2];
  // 定义小类排序规则
  const priorityAges_min = (Object.keys(PRIORITYAGES_MIN) as Array<keyof typeof PRIORITYAGES_MIN>).map((key) => {
    return PRIORITYAGES_MIN[key];
  });
  const { data } = await temuPropertyApi(form.value.catId);
  attrList.value = data?.filter(it => !it.isSale)?.map((it: any) => {
    if (it.pid === '1425') {
      it.values = it.values.filter((val: { vid: string; }) => val.vid === '36627');
    }
    return it;
  }).sort((a, b) => {
    const indexA = priorityAges.indexOf(a.pid);
    const indexB = priorityAges.indexOf(b.pid);
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.pid - b.pid;
  }).sort((a, b) => {
    const indexA = priorityAges_min.indexOf(a.name);
    const indexB = priorityAges_min.indexOf(b.name);
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.name - b.name;
  });
  //
  // .sort((a, b) => Number(b.required) - Number(a.required));

  // 获取尺码
  const sizeLists: any = data?.find(it => it.name === '尺码' && it.isSale) || [];
  sizeAttr.value = sizeLists.values;
  // emits('update:size-attr', sizeAttr);
  // 获取颜色
  const colorList = data?.find(it => it.name === '颜色' && it.isSale) || ({} as any);
  colorAttr.value = colorList.values;
  if (!form.value.catId) return;
  const { data: sizeDatas } = await temuSizeApi(form.value.catId);
  // 部位
  const { data: part } = await temuPartApi(form.value.catId);
  const { data: colorsList } = await temuColorApi(form.value.catId);
  const colors: any = [];
  colorsList.forEach((v: any) => {
    const colorTandard: any = (colorAttr.value || []).find((v1: { value: string; }) => v.name === v1.value);
    const vItme = {
      ...colorTandard,
      ...v,
      templatePid: '1144073',
      pid: '13',
      refPid: '63',
      propName: '颜色',
      propValue: '',
      parentSpecId: '1001',
      parentSpecName: '颜色',
      valueGroupId: colorTandard.group.id,
      valueGroupName: colorTandard.group.name,
      numberInputValue: '',
      valueUnit: '',
      valueExtendInfo: colorTandard.extendInfo,
    };
    if (colors.filter((v1: { groupId: string; }) => v1.groupId === v.groupId).length) {
      colors.find((v1: { groupId: string; }) => v1.groupId === v.groupId).children.push({
        ...vItme,
      });
    } else {
      colors.push({
        name: v.groupName,
        specId: v.groupId,
        groupId: v.groupId,
        children: [
          {
            ...vItme,
          }
        ],
      });
    }
  });
  colorOptions.value = colors;
  // 引用模板
  const sizeTempDatas = await sizeTempPageApi({
    pageNum: 1,
    pageSize: 600,
    // catId: form.value.catId,
  });
  sizeTempList.value = sizeTempDatas.data.list as any;
  if (isUpdata) {
    // 兼容xproj 冗余调一次getTemuWarehouse
    temuReviewDatas.value?.siteIds?.[0] && await getTemuWarehouse(temuReviewDatas.value?.siteIds?.[0] ?? '');
    (temuReviewDatas.value?.attrs || []).forEach((item: any) => {
      if (!item.controlType) {
        item.controlType = attrList.value?.find?.(t => Number(t.pid) === item.pid && Number(t.refPid) === item.refPid)?.controlType;
      }
      if (item.pid && item.refPid) {
        const key = `${item.pid}_${item.refPid}`;
        // console.log('item.propValue', item.propValue);
        // form.value[key] = item.propValue;
        if (item.controlType === CONTROL_TYPE_ENUM.INPUT) {
          form.value[key] = item.propValue;
        } else if (item.controlType === CONTROL_TYPE_ENUM.CHOOSE) {
          const values = attrList.value.find((it: { pid: string; refPid: string; }) => `${it.pid}_${it.refPid}` === key)?.values;
          //   res[key] = item.vid;
          form.value[key] = item?.vid?.toString();
          selectedValue.value[key] = values?.find((it: { vid: string; }) => it.vid === item.vid?.toString()) || ({} as any);
        }
      }
    });
    sizeParts.value = (part || []).map((v: TemuPartResItem) => {
      return {
        label: v.name,
        field: v.id,
        checked: !!v.required,
        required: v.required
      };
    });
    tableDataList.value = [];
    temuReviewDatas.value?.sizeReqs?.forEach((v: any) => {
      tableDataList.value.push({
        tableData: [],
        sizeParts: JSON.parse(JSON.stringify(sizeParts.value.map((v1: any) => {
          return {
            ...v1,
            checked: v?.elementList?.some((e1: { id: string; }) => e1.id === v1.field) // !!(v.sizeReqs?.[0].values || [])?.filter((v3: { part: string; }) => v3.part?.toString() === v1.field)?.length
          };
        }))),
        show: v.show,
        name: v.name,
      });
    });
    tableDataList.value.forEach((v, index: number) => {
      if (v.name) {
        setParts(v.name, index);
      }
    });
    form.value.siteIds = temuReviewDatas.value?.siteIds?.[0] ?? '';
    form.value.warehouseIds = [{
      warehouseId: temuReviewDatas.value?.warehouseIds ?? [],
    }];
    form.value.materialImgUrl = temuReviewDatas.value?.materialImgUrl ?? '';
    if (temuReviewDatas.value?.video?.videoUrl) {
      form.value.video = [{
        url: temuReviewDatas.value?.video?.videoUrl ?? '',
      }];
    } else {
      form.value.video = [];
    }
    form.value.productName = temuReviewDatas.value?.productName ?? '';
    form.value.productEnName = temuReviewDatas.value?.productEnName ?? '';
    formData.value.promisedDeliveryDay = temuReviewDatas.value?.promisedDeliveryDay?.toString() ?? '';
    formData.value.freightTemplateId = temuReviewDatas.value?.freightTemplateId ?? '';
    initSizeList(sizeDatas, isUpdata);

    formData.value.skcList?.forEach((skc: any) => {
      const item: any = (temuReviewDatas.value?.skcReqs ?? []).find(v => v.skcCode === skc.skcCode);
      if (item) {
        skc.platformColor = item?.platformColor ?? '';
        skc.selectedPictures = (item?.images ?? [])?.filter((u: string) => !(u || '').includes('mp4'))?.map((url: string) => {
          return {
            url,
          };
        });
        skc.productSkcId = item.productSkcId;
        skc.platformSkc = item.platformSkcId;
        skc.skcState = item.skcState;
        skc.skuList = skc.skuList.map((cItemSizes: any) => {
          return {
            ...cItemSizes,
            sizeName: sizeMappingList.value.find(v => v.internalSize === cItemSizes.sizeName)?.temuSize ?? cItemSizes.sizeName,
          };
        });
      }
    });
    setTimeout(() => {
      formRef.value?.clearValidate();
    });
  } else {
    sizeParts.value = (part || []).map((v: TemuPartResItem) => {
      return {
        label: v.name,
        field: v.id,
        checked: !!v.required,
        required: v.required
      };
    });
    tableDataList.value = [{
      tableData: [],
      sizeParts: JSON.parse(JSON.stringify(sizeParts.value)),
      show: 'YES',
    }];
    initSizeList(sizeDatas);
    Object.keys(form.value).forEach((key) => {
      if (key.includes('_')) {
        form.value[key] = undefined;
      }
    });
    setFormDefault();
    form.value.productName = props.detailData.chineseTitle;
    form.value.productEnName = props.detailData.englishTitle;
    formData.value.skcList = formData.value.skcList?.map((c: IFormDataSkcItem) => {
      const colorItemName = c?.color?.split(',')?.[0] ?? '';
      const colorValue = colorsList?.find(c1 => c1.name === colorItemName)?.name ?? '';
      return {
        ...c,
        skuList: c.skuList.map((cItemSizes: { sizeName: string; }) => {
          return {
            ...cItemSizes,
            sizeName: sizeMappingList.value.find(v => v.internalSize === cItemSizes.sizeName)?.temuSize ?? cItemSizes.sizeName,
          };
        }),
        platformColor: colorValue,
      };
    });
  }
  // form.value.warehouseIds = [{
  //   warehouseId: '',
  // }];
  form.value.catName = form.value.catName || props.catName;
  form.value.catId = form.value.catId || props.catId;
};
watch([() => props.catId], async () => {
  await getDictionaryOptionsSync('');
  if (!form.value.siteIds && !temuReviewDatas.value?.siteIds?.[0]) {
    form.value.siteIds = temuSiteList.value?.find(v => v.attributes?.some(v1 => v1.code === 'isDefault' && v1.name === '1'))?.value;
  }
  getTemuWarehouse(form.value.siteIds); 
});
const setFormDefault = () => {
  attrList.value.forEach((v) => {
    const dictTemuItem = temu_defaultValue.value.find((v4: IDictionaryItem) => v4.dictName === v.name) ?? { attributes: [] };
    const dictValueName = (dictTemuItem?.attributes ?? []).find(v5 => v5.code === 'defaultValue')?.name ?? '';
    const { key, name } = echoList.value.find(v1 => v1.name === v.name) ?? {};
    if (v.name === name) {
      const { vid: newVid } = v.values.find((v3: { value: string; }) => props.detailData[key || ''] === v3.value) ?? {};
      const { vid } = v.values.find((v3: { value: string; }) => (props.detailData[key || ''] || '').includes(v3.value)) ?? {};
      const { vid: vIdMin } = v.values.find((v3: { value: string; }) => (v3.value || '').includes(props.detailData[key || ''] || '')) ?? {};
      if ((newVid || vid || vIdMin) && !!props.detailData[key || '']) {
        form.value[`${v.pid}_${v.refPid}`] = form.value[`${v.pid}_${v.refPid}`] || (newVid || vid || vIdMin) || undefined;
        selectedValue.value[`${v.pid}_${v.refPid}`] = v.values.find((it: { vid: string; }) => it.vid === (form.value[`${v.pid}_${v.refPid}`] || newVid || vid || vIdMin)) || ({});
      } else if (!props.detailData[key || ''] && dictValueName) {
        if (v.values && v.values.length) {
          const { vid: newVid1 } = v.values.find((v3: { value: string; }) => dictValueName === v3.value) ?? {};
          const { vid: vid1 } = v.values.find((v3: { value: string; }) => dictValueName.includes(v3.value)) ?? {};
          const { vid: vIdMin1 } = v.values.find((v3: { value: string; }) => (v3.value || '').includes(dictValueName || '')) ?? {};
          form.value[`${v.pid}_${v.refPid}`] = form.value[`${v.pid}_${v.refPid}`] || newVid1 || vid1 || vIdMin1 || undefined;
          selectedValue.value[`${v.pid}_${v.refPid}`] = v.values.find((it: { vid: string; }) => it.vid === (form.value[`${v.pid}_${v.refPid}`] || newVid1 || vid1 || vIdMin1)) || ({});
        } else {
          form.value[`${v.pid}_${v.refPid}`] = form.value[`${v.pid}_${v.refPid}`] || dictValueName || undefined;
        }
      }
    } else if (dictValueName) {
      if (v.values && v.values.length) {
        const { vid: newVid } = v.values.find((v3: { value: string; }) => dictValueName === v3.value) ?? {};
        const { vid } = v.values.find((v3: { value: string; }) => dictValueName.includes(v3.value)) ?? {};
        const { vid: vIdMin } = v.values.find((v3: { value: string; }) => (v3.value || '').includes(dictValueName || '')) ?? {};
        form.value[`${v.pid}_${v.refPid}`] = form.value[`${v.pid}_${v.refPid}`] || newVid || vid || vIdMin || undefined;
        selectedValue.value[`${v.pid}_${v.refPid}`] = v.values.find((it: { vid: string; }) => it.vid === (form.value[`${v.pid}_${v.refPid}`] || newVid || vid || vIdMin)) || ({});
      } else {
        form.value[`${v.pid}_${v.refPid}`] = form.value[`${v.pid}_${v.refPid}`] || dictValueName || undefined;
      }
    }
  });
};
// 下拉框选择的值
type SelectedValue = Record<string, { vid: string; group?: { id: string; name: string; }; extendInfo?: string; value?: string; } | Record<string, never>>;
const selectedValue = ref<SelectedValue>({});
const onChange = (vid: string, item: { pid: string; refPid: string; values: { vid: string; }[]; }) => {
  selectedValue.value[`${item.pid}_${item.refPid}`] = item.values.find((it: { vid: string; }) => it.vid === vid) || ({});
  vid && setFormDefault();
};

/**
 * 根据属性条件判断是否显示
 * 如果子属性的控件类型是下拉框，则使用 templatePropertyValueParentList。如果子属性的控件类型是非可勾选，则用 showCondition
 */
const getShowField = (item: any): boolean => {
  let result = false;

  // 不显示品牌下拉，我们自行扩展该属性
  if (item.name === '品牌' || item.name === '品牌名') {
    return false;
  }

  if (
    item.controlType === CONTROL_TYPE_ENUM.CHOOSE
    || item.controlType === CONTROL_TYPE_ENUM.PROPERTY_CHOOSE_AND_INPUT
  ) {
    // 下拉框判断 form 是否包含前置值
    let preconditionValues = [] as string[];
    const list = item.templatePropertyValueParentList;
    if (!list?.length) {
      result = true;
      return result;
    }
    list.forEach((temp: { parentVidList: string[]; }) => {
      preconditionValues = preconditionValues.concat(temp.parentVidList);
    });
    // 找出 templatePid 对应的属性
    const templatePidItem = attrList.value.find(v => v.templatePid === item.parentTemplatePid);
    if (!templatePidItem) return result;

    const val = form.value[`${templatePidItem.pid}_${templatePidItem.refPid}`];

    // 判断前置属性是否包含前置值
    if (preconditionValues.includes(val)) {
      result = true;
    }
  } else if (item.controlType === CONTROL_TYPE_ENUM.INPUT) {
    // 输入框需要找到前置属性，判断是否选中前置值
    const list = item.showCondition;
    if (!list?.length) {
      result = true;
      return result;
    }

    list.forEach((it: { parentRefPid: string; parentVids: string; }) => {
      // 找到 parentRefPid 对应的属性
      const parentItem = attrList.value.find(a => a.refPid === it.parentRefPid);
      const parentValue = form.value[`${parentItem?.pid}_${parentItem?.refPid}`];
      if (it.parentVids.includes(parentValue)) {
        result = true;
      }
    });
  } else {
    result = true;
    return result;
  }

  if (!result) {
    form.value[`${item.pid}_${item.refPid}`] = '';
  }
  return result;
};

// 格式化提交form并校验
interface IPropertyChooseAndInputData {
  isValid: boolean;
  data: any[];
}

const propertyChooseAndInputRef = ref<typeof PropertyChooseAndInput>();
// const BrandExpansionRef = ref<typeof BrandExpansion>();
const onSubmit = async (isValida = true) => {
  const propertyChooseAndInputData = [] as IPropertyChooseAndInputData[];
  propertyChooseAndInputRef.value?.forEach(async (v: any, i: number) => {
    propertyChooseAndInputData[i] = await v.onSubmit(isValida);
  });
  // const brandExpansionData = await BrandExpansionRef.value?.onSubmit();

  let isValid = false;
  await ruleForm.value?.validate((valid: boolean) => {
    if (valid) {
      isValid = true;
    }
  });
  let postData = [] as any[];
  // 判断是否有填品牌
  // if (!brandExpansionData?.isValid) {
  //   return { isValid: false, data: postData };
  // }
  
  let propertyChooseAndInputIndex = 0;

  await Promise.all(
    attrList.value?.map(async (item: any) => {
      const key = `${item.pid}_${item.refPid}`;
      // 编辑时且商品属性没变更的前提下，将 attrId 塞回去
      let attrId = '';
      if (props.detailCatId === props.catId) {
        attrId = props.detail.find(it => `${it.pid}_${it.refPid}` === key)?.attrId || '';
      }
      // 公共参数
      const commonParams = {
        attrId,
        templatePid: item.templatePid,
        pid: item.pid,
        refPid: item.refPid,
        propName: item.name,
        valueUnit: item.valueUnit?.[0] || '',
        controlType: item.controlType,
        saled: item.isSale ? '1' : '0',
        parentSpecName: item.name,
      };
      if (item.controlType === CONTROL_TYPE_ENUM.INPUT) {
        if (form.value[key]) {
          postData.push({
            ...commonParams,
            propValue: form.value[key],
            vid: '0',
          });
        }
      } else if (item.controlType === CONTROL_TYPE_ENUM.CHOOSE) {
        if (form.value[key] && selectedValue.value?.[key]) {
          const { value, extendInfo, group, vid } = selectedValue.value?.[key] ?? {};
          postData.push({
            ...commonParams,
            vid,
            propValue: value,
            valueExtendInfo: extendInfo,
            valueGroupId: group?.id,
            valueGroupName: group?.name,
          });
        }
      } else if (item.controlType === CONTROL_TYPE_ENUM.PROPERTY_CHOOSE_AND_INPUT && getShowField(item)) {
        if (!propertyChooseAndInputData[propertyChooseAndInputIndex]?.isValid) {
          isValid = false;
          return Promise.reject();
        }
        postData = postData.concat(propertyChooseAndInputData[propertyChooseAndInputIndex].data);
        propertyChooseAndInputIndex += 1;
      }
      
      return Promise.resolve();
    }),
  );
  // 商品店铺需要放主属性上提交，这里跟skc属性分开传到最外层
  formAttrsData.value = postData;
  
  if (!isValid) return { isValid, data: postData } as any;
  return {
    isValid,
    data: {
      attrs: postData,
      // brandShopName: brandExpansionData.data.brandShopName,
    },
  } as any;
};

defineExpose({ onSubmit });
const TemuCategory = ref();
const temuCategoryList = ref<ITemuCategoryListResItem[]>([]);

/**
 * 获取树型结构的所有最末级（叶子节点）数据
 * 使用迭代方式，避免大数据量导致的栈溢出
 * @param tree 树型结构数组
 * @returns 最末级节点组成的一维数组
 */
const getLeafNodes = (tree: ITemuCategoryListResItem[]): ITemuCategoryListResItem[] => {
  if (!Array.isArray(tree)) return [];
  const leafNodes: ITemuCategoryListResItem[] = [];
  // 使用 Set 记录已访问的节点，防止循环引用导致死循环
  const visited = new Set<ITemuCategoryListResItem>();
  // 使用栈实现迭代遍历，避免递归深度过大
  const stack: ITemuCategoryListResItem[] = [...tree];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node && !visited.has(node)) {
      visited.add(node);
      // 如果没有子节点或 children 为空数组，则为最末级
      if (!node.children || node.children.length === 0) {
        leafNodes.push(node);
      } else {
        // 将子节点压入栈
        stack.push(...(node.children as ITemuCategoryListResItem[]));
      }
    }
  }
  
  return leafNodes;
};

const init = async () => {
  const { data } = await fetchTemuCategoryList();
  console.log('sag21asgdsa', arrayToTree(data));
  temuCategoryList.value = arrayToTree(data)?.[0]?.children?.[0]?.children;
  console.log('asg12asgda121', temuCategoryList.value);
  // 获取所有最末级品类数据
  // categoryFinalStage.value = getLeafNodes(temuCategoryList.value);
  // console.log('asg21asgdasd', categoryFinalStage.value);
};
onMounted(async () => {
  init();
});
watch([() => props.catId, () => props.styleId], () => {
  if (temuReviewDatas.value?.attrs?.length) {
    initForm();
  } else if (props.catId) {
    form.value.catId = props.catId;
    getCatsAttr();
  }
}, {
  immediate: true,
});

watch([() => form.value.catId, () => temuCategoryList.value], () => {
  if (form.value.catId && temuCategoryList.value.length) {
    suiting.value = getLabeSuiting(temuCategoryList.value, form.value.catId);
  }
}, {
  immediate: true,
});
// 品类切换
const handleCatChange = (cat: any) => {
  if (cat.length) {
    form.value.catName = getLabelPathByValue(temuCategoryList.value, cat?.at(-1));
    form.value.catId = cat.at(-1);
    getCatsAttr();
  }
};

// 获取素材图
const getMaterialImgUrl = () => {
  if (!formData.value.skcList?.[0]?.selectedPictures.length) {
    ElMessage.error('SKC的第一张图片素材图不能为空');
    return;
  }
  // cropImageList.value = [formData.value.skcList?.[0]?.selectedPictures[0]] as IImageItem[];
  presetImages.value = [formData.value.skcList?.[0]?.selectedPictures?.[0]?.url];
  showCropper.value = true;
  // showCropDialog.value = true;
  // form.value.materialImgUrl = formData.value.skcList?.[0]?.selectedPictures[0].url;
};
const rendering = (item: any) => {
  return item.values?.find((it: { vid: string; }) => it.vid === form.value[`${item.pid}_${item.refPid}`])?.value || '-';
};
const handleCropConfirm = (data: { url: string; originUrl?: string; }[]) => {
  form.value.materialImgUrl = data[0].url;
};
</script>

<style lang="scss" scoped>
.asterisk {
  color: #f56c6c;
  margin-right: 2px;
}
:deep .el-input-group__prepend,
:deep .el-input-group__append {
  padding: 0 10px !important;
}
:deep .el-input--small .el-input__wrapper {
  width: 170px;
}
.form-block {
  width: 100%;
}
.flex-y-center {
  display: flex;
  flex-direction: column;
  place-content: center;
  // justify-content: center;
  // align-content: center;
}
</style>
