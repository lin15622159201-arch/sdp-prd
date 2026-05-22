<template>
  <sc-app-page :main="{ style: { padding: 0 } }">
    <template #fheader>
      <el-steps
        class='tw-w-100%'
        :active="curTab"
        align-center
        finish-status="success"
        process-status="finish"
      >
        <el-step
          :title="readOnly ? 'SPU信息' : `${isCreate ? '新建' : '编辑'}SPU信息`"
          :value="0"
        />
        <el-step
          :title="readOnly ? 'SKC信息' : `${isCreate ? '新建' : '编辑'}SKC信息`"
          :value="1"
        />
      </el-steps>
    </template>

    <template #main>
      <el-scrollbar>
        <div class='container tw-relative'>
          <el-form
            label-width="100px"
            ref="formEl"
            :disabled="readOnly"
            :model="formData"
            scroll-to-error
          >
            <template v-if="curTab === 0">
              <div v-if="isCreate" class="tw-flex tw-items-center tw-justify-end tw-mt-3 tw-mr-4 tw-absolute tw-top-0 tw-right-0">
                <el-input
                  v-model="historySpuCode"
                  class="tw-w-200px"
                  placeholder='输入精准SPU号'
                  clearable
                  @keydown.enter.prevent="getDataFromHistory()"
                />
                <el-button
                  type="primary"
                  class="tw-ml-2"
                  text
                  @click="getDataFromHistory()"
                >
                  从历史款式引用
                </el-button>
              </div>
              <SpuBaseInfo
                v-model="formData"
                :is-create="isCreate"
                :detailData="detailData"
              />
              <SpuSaleInfo
                ref="spuSaleInfoRef"
                v-model="formData"
                :validate-field="formEl?.validateField"
              />
              <SpuSizeImages v-model="formData" />
              <SpuProductImages v-model="formData" />
              <SpuSupplier
                ref="spuSupplierRef"
                v-model="formData"
                :read-only="readOnly"
                :is-create="isCreate"
                :detail-data="detailData"
              />
            </template>

            <template v-else>
              <SkcInfo
                ref="skcInfoRef"
                v-model="formData"
                :is-create="isCreate"
              />
            </template>
          </el-form>
        </div>
      </el-scrollbar>
    </template>

    <template #ffooter>
      <el-row class='tw-w-100%' justify="end">
        <el-button
          @click="handleCancel"
          size="default"
        >
          取消
        </el-button>
        <el-button
          @click="handlePrev"
          type="primary"
          size="default"
          plain
          v-if="curTab === 1"
        >
          上一步
        </el-button>
        <el-button
          @click="handleNext"
          type="primary"
          size="default"
          v-if="curTab === 0"
        >
          下一步
        </el-button>
        <el-button
          type="primary"
          size="default"
          v-if="curTab === 1 && !readOnly"
          @click="handleConfirm"
        >
          提交
        </el-button>
      </el-row>

    </template>
  </sc-app-page>
</template>
<script lang="tsx" setup>
import { computed, nextTick, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElForm, ElMessage } from 'element-plus';
import { IFormData } from './types';
import { DEFAULT_SIZE_STANDARD_CODE } from '../../constant';
import { fetchSpotStyleBatchCreate, fetchSpotStyleDetailByTaskCode, fetchSpotStyleDetailByTaskId, fetchSpotStyleEdit } from '../../api';
import { cloneDeep } from 'lodash-es';
import { useDict } from './hooks/use-dict';
import { useRouterBack } from '@/hooks/use-router-back';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import SpuBaseInfo from './components/spu-base-info.vue';
import SpuSaleInfo from './components/spu-sale-info.vue';
import SpuProductImages from './components/spu-product-images.vue';
import SpuSizeImages from './components/spu-size-images.vue';
import SpuSupplier from './components/spu-supplier.vue';
import SkcInfo from './components/skc-info.vue';
import { ISpotStyleCreateReq, ISpotStyleDetailRes, ISpotStyleSkcProductImage } from '../../api/spot-style';

const $route = useRoute();
const $router = useRouter();
const { getDictionaryLabel } = useDictionary();
const curTab = ref(0);
const formEl = ref<InstanceType<typeof ElForm>>();
const spuSupplierRef = ref<InstanceType<typeof SpuSupplier>>();
const spuSaleInfoRef = ref<InstanceType<typeof SpuSaleInfo>>();
const skcInfoRef = ref<InstanceType<typeof SkcInfo>>();
const taskId = computed(() => $route.params.taskId as string);
const detailData = ref<ISpotStyleDetailRes>();
const isCreate = computed(() => $route.name === 'DesignCenterInStockCreateSpu');
const readOnly = computed(() => $route.name === 'DesignCenterInStockSpuDetail');
const { handleBack } = useRouterBack();

const defaultFormData: Partial<IFormData> = {
  weaveModeCode: '01',
  sizeStandardCode: DEFAULT_SIZE_STANDARD_CODE,
  qualityLevelCode: 'plm_quality_level_zex',
  clothGrossWeight: 1,
  ingredients: [],
  suppliers: [],
  skcs: [],
  productImages: [],
  sizeImages: []
};
/** 备份的数据 用于对比数据有没有变更 */
const baseFormData = ref(cloneDeep(defaultFormData));
const formData = ref<IFormData>(cloneDeep(defaultFormData as IFormData));
const {
  getCategoryTree,
  getClothingTree,
  getColors,
  getDictionaryOptionsSync
} = useDict({
  formData
});

// 将商品图进行排序，主图在前，其他图在后
const sortImageUrls = (images?: ISpotStyleSkcProductImage[]) => {
  if (!images) return [];
  const main: string[] = [];
  const others: string[] = [];
  images.forEach((item) => {
    if (item.pictureType === 'MAIN_IMAGE') {
      main.push(item.imageUrl);
    } else {
      others.push(item.imageUrl);
    }
  });
  return main.concat(others);
};

const setFormData = (data: ISpotStyleDetailRes) => {
  formData.value = {
    ...data,
    productImages: sortImageUrls(data.productImages),
    skcs: data.skcs?.map(item => ({
      ...item,
      productImages: sortImageUrls(item.productImages),
    })) || [],
    sizeImages: data.sizeImages?.map(item => item.imageUrl) || [],
  };
  baseFormData.value = cloneDeep(formData.value);
};

const getInfo = async () => {
  if (!taskId.value) return;
  const { data } = await fetchSpotStyleDetailByTaskId(taskId.value);
  detailData.value = data;
  setFormData(data);
};

const historySpuCode = ref('');
const getDataFromHistory = async () => {
  if (!historySpuCode.value) {
    ElMessage.warning('请输入SPU号');
    return;
  }
  const { data } = await fetchSpotStyleDetailByTaskCode(historySpuCode.value);
  if (!data) {
    ElMessage.warning('SPU号不存在');
    return;
  }
  setFormData(data);
  if (!formData.value.ingredients?.length) {
    await nextTick();
    spuSaleInfoRef.value?.handleAddElement();
  }
};

/**
 * 获取字典现货的默认值
 */
const getDictDefaultValue = async (key: DICTIONARY_KEY) => {
  const options = await getDictionaryOptionsSync(key) || [];
  return options.find(item => item.attributes?.some(attr => attr.code === 'spot_default'))?.value || '';
};

const init = async () => {
  const promises = [getCategoryTree(), getClothingTree(), getColors()];
  if (!isCreate.value) {
    promises.push(getInfo());
  } else {
    // 创建时，设置默认值
    const dictPromise = [
      getDictDefaultValue(DICTIONARY_KEY.PRODUCT_TAG),
      getDictDefaultValue(DICTIONARY_KEY.PLM_QUALITY_LEVEL),
      getDictDefaultValue(DICTIONARY_KEY.PRODUCT_LEVEL),
    ];
    const [styleLabelCode, qualityLevelCode, styleLevelCode] = await Promise.all(dictPromise);
    formData.value.styleLabelCode = styleLabelCode || '';
    formData.value.qualityLevelCode = qualityLevelCode || '';
    formData.value.styleLevelCode = styleLevelCode || '';
  }
  await Promise.all(promises);
  setTimeout(() => {
    if (!formData.value.ingredients?.length) {
      spuSaleInfoRef.value?.handleAddElement();
    }
    formEl.value?.clearValidate();
  });
};
init();

/** 点击提交 */
const handleConfirm = async () => {
  await formEl.value?.validate();
  const {
    clothingStyleCode,
    categoryCode,
    ...data
  } = formData.value;
  const skcs = skcInfoRef.value?.getSkcs() || [];
  const ingredients = data.ingredients?.map(item => ({
    ...item,
    ingredientName: getDictionaryLabel(DICTIONARY_KEY.PLM_ELEMENT, item.ingredientCode)
  }));
  const categoryName = categoryCode?.split('-').map(item => getDictionaryLabel(DICTIONARY_KEY.CATEGORY, item)).join('-');
  const params: ISpotStyleCreateReq = {
    ...data,
    mainImgUrl: data.productImages?.[0],
    storeName: getDictionaryLabel(CUSTOM_DICTIONARY_KEY.SHOP_LIST, data.storeId),
    sceneName: data.sceneCode && getDictionaryLabel(DICTIONARY_KEY.SCENE, data.sceneCode),
    qualityLevelName: getDictionaryLabel(DICTIONARY_KEY.PLM_QUALITY_LEVEL, data.qualityLevelCode),
    styleLevelName: getDictionaryLabel(DICTIONARY_KEY.PRODUCT_LEVEL, data.styleLevelCode),
    weaveModeName: getDictionaryLabel(DICTIONARY_KEY.APS_CATEGORY_TYPE, data.weaveModeCode),
    waveBandName: getDictionaryLabel(DICTIONARY_KEY.PLM_CLOTHING_BAND, data.waveBandCode),
    categoryCode,
    categoryName,
    sizeStandardName: getDictionaryLabel(DICTIONARY_KEY.PLM_STANDARY_SIZE, data.sizeStandardCode),
    clothingStyleCode,
    clothingStyleName: getDictionaryLabel(DICTIONARY_KEY.PRODUCT_STYLE, clothingStyleCode),
    platformName: getDictionaryLabel(DICTIONARY_KEY.STOCKGOODS_TYPE, data.platformCode),
    printingName: getDictionaryLabel(DICTIONARY_KEY.FD_PRINTING, data.printingCode),
    patternName: getDictionaryLabel(DICTIONARY_KEY.FIT, data.patternCode),
    elasticName: getDictionaryLabel(DICTIONARY_KEY.PLM_ELASTIC_REQUIREMENT, data.elasticCode),
    seasonName: getDictionaryLabel(DICTIONARY_KEY.PLM_REFERENCE_SEASON, data.seasonCode),
    galaName: getDictionaryLabel(DICTIONARY_KEY.FESTIVAL, data.galaCode),
    visualFormName: getDictionaryLabel(DICTIONARY_KEY.VISUAL_STYLE, data.visualFormCode),
    skuClassName: data.skuClassCode && getDictionaryLabel(DICTIONARY_KEY.SKU_CLASSIFICATION, data.skuClassCode),
    styleLabelName: getDictionaryLabel(DICTIONARY_KEY.PRODUCT_TAG, data.styleLabelCode),
    skcs,
    ingredients,
    // 以下字段已废弃，写死
    supplyModeCode: '无',
    supplyModeName: '无',
    spotStyleTypeCode: 'SPOT_STYLE',
    spotStyleTypeName: '现货管理',
    palletTypeCode: '无',
    palletTypeName: '无',
  };
  if (isCreate.value) {
    await fetchSpotStyleBatchCreate([params]);
  } else {
    await fetchSpotStyleEdit({ taskId: taskId.value, ...params });
  }
  ElMessage.success('保存成功');
  $router.push({
    name: 'DesignCenterInStockList'
  });
};
/** 点击取消 */
const handleCancel = () => {
  handleBack('DesignCenterInStockList');
};
/** 点击下一步 */
const handleNext = async () => {
  if (!readOnly.value) {
    await formEl.value?.validate();
    await spuSupplierRef.value?.validate();
  }
  curTab.value = 1;
};
/** 点击上一步 */
const handlePrev = async () => {
  curTab.value = 0;
};

</script>
<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
