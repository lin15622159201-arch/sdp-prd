<template>
  <sc-app-page>
    <template #main>
      <el-form
        ref="formRef"
        :model="formData"
        scroll-to-error
        :scroll-into-view-options="{ behavior: 'smooth', block: 'center' }"
      >
        <div class="section-title">
          {{ detailData.styleCode }}
          <span v-if="temuReviewDatas?.platformProductId">({{ temuReviewDatas.platformProductId }})</span>
        </div>
        <BaseInfo :detail-data="detailData" :temu-material-img-url="temuReviewDatas?.materialImgUrl" />

        <el-divider />
        <div class="section-title">产品属性</div>
        <ProductProperties
          ref="productPropertiesRef"
          :detail-data="detailData"
          :catId="catId"
          :catName="catName"
          :styleId="styleId"
        />

        <el-divider />
        <div class="section-title">产品信息</div>
        <ProductInfo :detail-data="detailData" />

        <el-divider />
        <div class="section-title">尺码</div>
        <SizeList
          ref="sizeListRef"
          :detail-data="detailData"
          @size-change="selectedSizes = $event"
        />

        <el-divider />
        <!-- <SizeForm
          class="tw-m-b-10px"
          :detail-data="detailData"
          :selected-sizes="selectedSizes"
        /> -->
        <SizeForm
          v-for="(item, index) in tableDataList"
          :key="index"
          class="tw-m-b-10px"
          ref="propertyChooseAndInputRef"
          :detail-data="detailData"
          :selected-sizes="selectedSizes"
          :sizeIndex="index"
          v-model="item.tableData"
          v-model:sizeParts="item.sizeParts"
          v-model:show="item.show"
          v-model:name="item.name"
        />
        <el-button
          v-if="!isReadonly && !goodsEditImg && !isGoodsEdit"
          class="tw-m-t-10px"
          @click="addTable"
        >添加尺码表</el-button>
        <el-divider />
        <div class="section-title">现货尺寸图</div>
        <div v-if="detailData.sizeImageList?.length">
          <el-image
            v-for="(item, index) in detailData.sizeImageList"
            :key="item"
            fit="contain"
            class="tw-w-160px tw-h-160px"
            :src="item"
            :preview-src-list="detailData.sizeImageList"
            :initial-index="index"
          />
        </div>
        <span v-else>-</span>

        <el-divider />
        <div class="section-title">运输信息</div>
        <ScResponsiveRow>
          <el-form-item
            label="承诺发货时效"
            prop="promisedDeliveryDay"
            :rules="[{
              required: !isReadonly && !isGoodsEdit && !goodsEditImg,
              message: '请选择承诺发货时效',
              trigger: 'change',
            }]"
          >
            <el-select
              :disabled="isReadonly || isGoodsEdit || goodsEditImg"
              v-model="formData.promisedDeliveryDay"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in temu_timeframeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <!-- <div v-else>{{ formData.promisedDeliveryDay || '--' }}</div> -->
          </el-form-item>
          <el-form-item label="运费模板" prop="freightTemplateId">
            <el-select
              :disabled="isReadonly || isGoodsEdit || goodsEditImg"
              v-model="formData.freightTemplateId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in temuLogisticsList"
                :key="item.freightTemplateId"
                :label="item.templateName"
                :value="item.freightTemplateId || ''"
              />
            </el-select>
            <!-- <div v-else>{{ formData.promisedDeliveryDay || '--' }}</div> -->
          </el-form-item>
        </ScResponsiveRow>
      </el-form>
    </template>

    <template #ffooter>
      <el-button
        v-if="isShow"
        type="primary"
        @click="handleTemporaryStorage"
        class="tw-m-r-100px"
      >暂存</el-button>
      <div class="tw-m-auto tw-flex tw-items-center">
        <el-checkbox v-if="isShow" v-model="isNext">继续下一条</el-checkbox>
        <el-button
          v-if="isShow"
          class="tw-ml-4"
          type="danger"
          plain
          @click="openRejectDialog"
        >审核不通过</el-button>
        <el-button
          v-if="isShow"
          type="primary"
          @click="handlePass"
        >审核通过</el-button>
        <el-button
          v-if="route.query.type === 'edit'"
          type="primary"
          @click="handlePassEdit"
        >保存</el-button>
        <el-button
          v-if="isGoodsEdit || goodsEditImg"
          type="primary"
          @click="handleSkc"
        >保存</el-button>
        <el-button @click="handleBack()">返回</el-button>
      </div>
    </template>

    <RejectDialog
      v-model:visible="rejectDialogVisible"
      :style-id="styleId"
      @success="onRejectSuccess"
    />
  </sc-app-page>
</template>

<script setup lang='ts'>
import ProductProperties from './components/product-properties.vue';
import BaseInfo from './components/base-info.vue';
import ProductInfo from './components/product-info/index.vue';
import SizeList from './components/size-list.vue';
import SizeForm from './components/size-form.vue';
import { computed, ref, watch } from 'vue';
import { useForm } from './hooks/use-form';
import RejectDialog from './components/reject-dialog.vue';
import { useAudit } from './hooks/use-audit';
import { useRoute } from 'vue-router';
import { fetchStyleOnShelvesDetail, fetchStyleOnShelvesDetailAll } from '../../api/listing';
import { useContext } from './hooks/use-context';
import { useHandleBack } from '@/hooks/use-handle-back';
import { categoryMappingPageApi } from './api';
import { useDict } from './hooks/use-dict';
import { productReviewApi, productDetailApi } from '@/api/temu';
import { ProductReviewRes } from '@/api/temu/type';
import { IStyleOnShelvesDetailRes, IStyleOnShelevesDetailSkcItem } from '@/modules/goods-manage/api/listing/type';

const { temu_timeframeList } = useDict();
const route = useRoute();
const { handleBack } = useHandleBack('GoodsManageListingPending');
const isNext = ref(true);
const {
  formRef,
  formData,
  formRules,
  sizeParts,
  tableDataList,
  temuLogisticsList,
  detailData,
  temuReviewDatas,
  productId: asyncPproductId,
  refreshMaterialImgUrl,
  videoUrl,
  skcList,
  form,
  sizeList,
  sizeMappingList,
} = useForm();
const sizeListRef = ref<InstanceType<typeof SizeList>>();
const productPropertiesRef = ref<any>();

// const styleId = computed(() => route.params.styleId as string);
const styleId = ref<string>('');
watch(() => route.params.styleId, () => {
  styleId.value = route.params?.styleId as string;
}, {
  immediate: true,
});
const productId = computed(() => route.query.productId as string);
const { isReadonly, isGoodsEdit, goodsEditImg } = useContext();
const isShow = computed(() => {
  return !isReadonly.value && !isGoodsEdit.value && !goodsEditImg.value && route.query.type !== 'edit';
});
// 管理选中的尺码
const selectedSizes = ref<string[]>([]);

const addTable = () => {
  const len = tableDataList.value.length;
  tableDataList.value.push({
    tableData: [],
    sizeParts: JSON.parse(JSON.stringify(sizeParts.value)),
    show: len < 3 ? 'YES' : 'NO',
    name: '',
  });
};

const propertyChooseAndInputRef = ref<any>();
const { rejectDialogVisible, openRejectDialog, onRejectSuccess, handlePass, handlePassEdit, handleSkc, handleTemporaryStorage } = useAudit({
  isNext,
  styleId,
  beforeSubmit: async (isValida = true) => {
    // 提交前校验表单
    const isValid = isValida && await sizeListRef.value?.validate();
    // const { data } = await productPropertiesRef.value?.onSubmit();
    let data;
    if (productPropertiesRef.value) {
      const result = await productPropertiesRef.value.onSubmit(isValida);
      data = result?.data;
    }
    if (!isValida) {
      return true;
    }
    if (!isValid || !data?.attrs?.length) {
      return false;
    }
    const propertyChooseAndInputData = [] as any[];
    await new Promise((res) => {
      propertyChooseAndInputRef.value?.forEach(async (v: any, i: number) => {
        propertyChooseAndInputData.push(await v.onSubmit());
        if (i === propertyChooseAndInputRef.value.length - 1) {
          res(propertyChooseAndInputData);
        }
      });
    });
    if (propertyChooseAndInputData.some(v => !v)) {
      return false;
    }
    return formRef.value?.validate();
  }
});
const setSizeReqs = (parts: any, sizes: string[], elementList: any) => {
  return sizes.map((v) => {
    // sizes.forEach(v2 => {
    //   const sizeItem = parts.filter(v1 => v1.size === v2);
    // })
    const sizeItemList = parts?.filter((v1: { size: string; }) => v1.size === v) ?? [];
    return {
      ...sizeItemList?.[0] ?? {},
      platformSize: v,
      size: v,
      elementList,
      productId: productId.value,
      values: sizeItemList.map((v3: any) => {
        return {
          ...v3,
          part: v3?.partId?.toString(),
        };
      }),
    };
  });
};
// 初始化数据
const catId = ref<string>('');
const catName = ref<string>('');
watch(() => temu_timeframeList.value, () => {
  if (!formData.value.promisedDeliveryDay) {
    formData.value.promisedDeliveryDay = temu_timeframeList.value?.find(v => v.attributes?.some(v1 => v1.code === 'isDefault' && v1.name === '1'))?.value ?? '';
  }
});
const initData = async () => {
  let data = {} as IStyleOnShelvesDetailRes;
  try {
    if (styleId.value !== '0') {
      const { data: datas } = await (productId.value ? fetchStyleOnShelvesDetailAll : fetchStyleOnShelvesDetail)(styleId.value);
      data = datas || {};
      // if (!datas?.styleId) return;
      detailData.value = data;
      formData.value.sizeStandardCode = data.sizeStandardCode;
      formData.value.skcList = data.skcList.map(item => ({
        ...item,
        color: (item.color || '').split('、').join(','),
        selectedPictures: (item.pictures || []).filter(i1 => i1.materialType === 0).map?.((i: { cropImgUrl: string; pictureUrl: string; }) => {
          return {
            url: i.cropImgUrl || i.pictureUrl,
          };
        }),
      }));
      // formData.value = {
      //   sizeStandardCode: data.sizeStandardCode,
      //   skcList: ,
      //   promisedDeliveryDay: '',
      // };
      if ((data.skcList || [])?.[0]?.pictures?.find(u => u.materialType === 1)?.pictureUrl) {
        form.value.video = [{
          url: (data.skcList || [])?.[0]?.pictures?.find(u => u.materialType === 1)?.pictureUrl ?? '',
        }];
      }
    }
  } catch {
    console.error('接口请求异常');
  }
  const { data: temuCategory } = await categoryMappingPageApi({
    platformCode: 'TEMU',
    pageSize: 1000,
    // categoryCode: data.categoryCode
  });
  const { platformCategoryCode, platformCategoryName } = (temuCategory.list || []).find(v => v.categoryCode === (data.categoryCode || '')?.split('-')?.at(-1)) ?? {};
  if (productId.value) {
    asyncPproductId.value = productId.value;
    const { data: temuProductData } = await productDetailApi(productId.value);
    refreshMaterialImgUrl.value = temuProductData.materialImgUrl || '';
    videoUrl.value = temuProductData.videoUrl || '';
    const str = {
      ...temuProductData,
      video: {
        videoUrl: temuProductData.videoUrl,
      },
      skcReqs: temuProductData.skcs?.map((v) => {
        return {
          ...v,
          mainSpecReqs: v?.mainSpecs ?? {},
          skuReqs: v?.skus?.map((v1) => {
            return {
              ...v1,
              warehouseStockQuantityReqs: v1.warehouseStockQuantities,
              skuSpecReqs: v1.skuSpecs,
            };
          }),
        };
      }),
      sizeReqs: temuProductData.sizeTemplates?.map((v3) => {
        return {
          ...v3,
          sizeReqs: setSizeReqs(v3.parts, temuProductData?.sizes ?? [], v3.elementList),
        };
      }),
    } as ProductReviewRes;
    skcList.value = JSON.parse(JSON.stringify(str.skcReqs));
    temuReviewDatas.value = str;
    catId.value = temuProductData.catId || '';
    catName.value = temuProductData.catName || '';
  } else if (styleId.value) {
    const { data: temuReviewData } = await productReviewApi(styleId.value);
    temuReviewDatas.value = temuReviewData;
    catId.value = temuReviewData?.catId || platformCategoryCode || '';
    catName.value = temuReviewData?.catName || platformCategoryName || '';
  }
  if (styleId.value === '0' || !detailData.value?.styleId) {
    styleId.value = '0';
    detailData.value.styleId = '0';
    formData.value.skcList = temuReviewDatas.value?.skcs?.map((v: any) => {
      return {
        ...v,
        skuList: [],
        selectedPictures: v.images?.map((v1: string) => {
          return {
            url: v1
          };
        })
      };
    });
    // detailData.value.skcList = temuReviewDatas.value?.skcs;
    detailData.value.skcList = temuReviewDatas.value?.skcs?.map((v: any) => {
      return {
        // sizeName: v.
        skcCode: v.skcCode,
        skuList: v.skus.map((v1: any) => {
          const temuSize = v1?.skuSpecs?.find((v2: { parentSpecName: string; }) => v2.parentSpecName === '尺码')?.specName;
          const size = sizeMappingList.value?.find(s => s.temuSize === temuSize)?.internalSize ?? temuSize;
          return {
            sizeName: size,
            skuCode: v1.skuCode,
          };
        })
      };
    });
    // detailData.value.sizeStandardCode = 'tiangong_code_standard';
  }
};

watch(
  () => route.params.styleId,
  (val) => {
    val && initData();
    if (!formData.value.promisedDeliveryDay) {
      formData.value.promisedDeliveryDay = temu_timeframeList.value?.find(v => v.attributes?.some(v1 => v1.code === 'isDefault' && v1.name === '1'))?.value ?? '';
    }
  },
  { immediate: true }
);
</script>

<style scoped lang='scss'>
.section-title {
  margin-bottom: 16px;
}
:deep(.section-title) {
  font-size: 16px;
  font-weight: 600;
}
:deep(.el-form-item__label) {
  &::after {
    content: ':';
  }
}
</style>
