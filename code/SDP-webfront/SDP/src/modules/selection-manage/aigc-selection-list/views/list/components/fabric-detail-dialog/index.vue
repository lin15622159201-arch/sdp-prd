<script lang="ts" setup>
import { ref } from 'vue';

import FabricInfo from './fabric-info.vue';
import SelectColors from './select-colors.vue';
import { ElMessage } from 'element-plus';
import { IFabricFmRes, IFabricFmResSkusItem } from '@/modules/selection-manage/aigc-selection-list/api/fabric/type';
import { FABRIC_FACE_ENUM } from '@/modules/selection-manage/aigc-selection-list/constant';
import { getFabricDetail } from '@/modules/selection-manage/aigc-selection-list/api/fabric';

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'submit', val: {
    skus: IFabricFmResSkusItem[];
    fabricName: string;
    commodityCode: string;
    commodityName: string;
  }): void;
}>();

const props = withDefaults(defineProps<{
  visible: boolean;
  commodityId: string;
  defaultSelectedColorCode?: string[];
  multiple?: boolean;
  editing?: boolean;
}>(), {
  multiple: false,
  editing: true,
});

const skuColorCodes = ref<string[]>([]);

const SelectColorsRef = ref<InstanceType<typeof SelectColors>>();

const initFabricDetail = (): IFabricFmRes => ({
  commodityId: '',
  commodityCode: '',
  commodityName: '',
  commodityNumber: '',
  fabricCategory: '',
  category: '',
  image: '',
  price: '',
  skuQuantity: '',
  goodsWeight: '',
  goodsWeightGap: '',
  goodsWeightGapName: '',
  goodsWeightUnit: '',
  goodsWeightUnitName: '',
  packageWidth: '',
  packageWidthGap: '',
  packageWidthGapName: '',
  widthUnit: '',
  practicalWidth: '',
  practicalWidthGap: '',
  compositions: [],
  skus: [],
  elasticityLayeredDesc: '',
  frontTextureDesc: '',
  reverseTextureDesc: '',
  fabricFace: FABRIC_FACE_ENUM.SINGLE,
  seasonDesc: '',
});
const fabricDetail = ref<IFabricFmRes>(initFabricDetail());
const handleGetFabricDetail = async () => {
  const { data } = await getFabricDetail(props.commodityId);
  fabricDetail.value = data;
};

const handleClose = () => {
  SelectColorsRef.value?.clear();
  emit('update:visible', false);
};

const handleSubmit = () => {
  if (!SelectColorsRef.value) return;
  const skus = SelectColorsRef.value?.getSelectedSkus();
  if (!skus.length) {
    ElMessage.error('请选择sku');
    return;
  }

  emit(
    'submit',
    {
      skus,
      fabricName: fabricDetail.value.category,
      commodityCode: fabricDetail.value.commodityCode,
      commodityName: fabricDetail.value.commodityName,
    },
  );
  handleClose();
};
const handleColorCodeChange = (skus: IFabricFmResSkusItem[]) => {
  skuColorCodes.value = skus.map(sku => sku.colorCode);
};

const handleOpen = async () => {
  await handleGetFabricDetail();
  await SelectColorsRef.value?.init();
  handleColorCodeChange(SelectColorsRef.value?.getSelectedSkus() || []);
};

</script>

<template>
  <el-dialog
    title="面料详情"
    :model-value="visible"
    width="800px"
    :before-close="handleClose"
    @open="handleOpen"
    top="10vh"
    class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
  >
    <div class="tw-flex tw-flex-col">
      <FabricInfo :data="fabricDetail" />
      <SelectColors
        ref="SelectColorsRef"
        :skus="fabricDetail.skus"
        :multiple="multiple"
        :default-selected-color-code="defaultSelectedColorCode || []"
        @change="handleColorCodeChange"
        :editing="editing"
      />
    </div>
    <template #footer>
      <div class="tw-flex tw-justify-between tw-items-center">
        <span class="tw-text-wrap tw-text-left tw-color-primary">已选色号：{{ skuColorCodes.join('、') }}</span>
        <span class="tw-flex tw-flex-nowrap tw-ml-8px">
          <el-button @click="handleClose">{{ editing ? '取消' : '关闭' }}</el-button>
          <el-button
            type="primary"
            @click="handleSubmit"
            v-if="editing"
          >
            确认
          </el-button>
        </span>
      </div>
    </template>
  </el-dialog>

</template>
