<!-- 尺码 -->
<template>
  <el-form
    ref="formRef"
    :model="{ tableSizeData, ...formData }"
    class="size-list"
    scroll-to-error
    :scroll-into-view-options="{ behavior: 'smooth', block: 'center' }"
  >
    <el-form-item
      label="尺码组"
    >
      <el-input
        class="tw-w-200px"
        disabled
        v-model="details.sizeStandardName"
      />
      <!-- <span v-if="isReadonly">{{ detailData.sizeStandardName || '-' }}</span> -->
      <!-- <DictionarySelect
        v-else
        class="tw-w-200px!"
        v-model="formData.sizeStandardCode"
        :dictionary="DICTIONARY_KEY.PLM_STANDARY_SIZE"
        placeholder="请选择尺码组"
      /> -->
    </el-form-item>
    <el-form-item
      v-if="!isReadonly && !goodsEditImg"
      prop="sizeList"
      :rules="rules.sizeList"
    >
      <div class="size-checkboxes">
        <el-checkbox
          v-model="allSelected"
          :indeterminate="isIndeterminate"
          label="全选"
          @change="handleSelectAll"
        />
        <el-checkbox
          v-for="item in sizeList"
          v-model="item.checked"
          :disabled="item.disabled"
          :label="item.value"
          :key="item.value"
        />
      </div>
    </el-form-item>


    <el-table
      :data="tableSizeData"
      border
      class="size-table"
      :span-method="spanMethod"
    >
      <el-table-column
        prop="size"
        label="SKC"
        min-width="90"
        fixed="left"
      >
        <template #header>
          <div>SKC</div>
          <el-button
            v-if="!isReadonly && !goodsEditImg && !isGoodsEdit"
            type="primary"
            plain
            size="small"
            class="batch-fill-btn"
            @click="handleBatchFill"
          >批量填写</el-button>
        </template>
        <template #default="{ row }">
          <p>内部SKC：{{ row.skc.skcCode }}</p>
          <p>{{ row.skc.colorName }}</p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="productId"
        prop="platformSku"
        label="平台SKU"
        min-width="70"
        align="center"
      />
      <el-table-column
        v-if="productId"
        prop="internalSku"
        label="内部SKU"
        min-width="70"
        align="center"
      />
      <el-table-column
        prop="size"
        label="尺码"
        min-width="50"
        align="center"
      />
      <el-table-column min-width="80">
        <template #header>
          <div class="required-label">申报价格</div>
          <NumberBasis
            v-if="!isReadonly && !goodsEditImg && !isGoodsEdit"
            v-model="batchHeaders.suggestedPrice"
            placeholder="申报价格"
            :controls="false"
            size="small"
            class="batch-header-input"
          />
        </template>
        <template #default="{ row, $index }">
          <!-- <span v-if="isReadonly">{{ row.suggestedPrice || '-' }}</span> -->
          <el-form-item
            :prop="`tableSizeData[${$index}].suggestedPrice`"
            :rules="rules.suggestedPrice"
          >
            <NumberBasis
              :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
              v-model="row.suggestedPrice"
              :controls="false"
              size="small"
              clearable
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        min-width="130"
        v-for="(item, index) in tableWarehouseColumnList"
        :key="index"
      >
        <template #header>
          <div class="required-label">{{ item.label }}</div>
          <NumberBasis
            v-if="!isReadonly && !goodsEditImg && !isGoodsEdit"
            v-model="batchHeaders.warehouse[item.prop]"
            placeholder="库存"
            :controls="false"
            size="small"
            class="batch-header-input"
          />
        </template>
        <template #default="{ row, $index }">
          <!-- <span v-if="isReadonly">{{ row.suggestedPrice || '-' }}</span> -->
          <el-form-item
            :prop="`tableSizeData[${$index}][${item.prop}]`"
            :rules="[
              { required: true, message: '请输入库存', trigger: 'change' },
            ]"
          >
            <NumberBasis
              :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
              v-model="row[item.prop]"
              :controls="false"
              size="small"
              clearable
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column min-width="190">
        <template #header>
          <div class="required-label">包装尺寸（cm）-长*宽*高</div>
          <div v-if="!isReadonly && !goodsEditImg && !isGoodsEdit" class="batch-header-row">
            <NumberBasis
              v-model="batchHeaders.length"
              placeholder="长"
              :controls="false"
              size="small"
              class="batch-header-input-80"
            />
            <NumberBasis
              v-model="batchHeaders.width"
              placeholder="宽"
              :controls="false"
              size="small"
              class="batch-header-input-80"
            />
            <NumberBasis
              v-model="batchHeaders.height"
              placeholder="高"
              :controls="false"
              size="small"
              class="batch-header-input-80"
            />
          </div>
        </template>
        <template #default="{ row, $index }">
          <div class="tw-flex tw-gap-5px">
            <el-form-item
              :prop="`tableSizeData[${$index}].length`"
              :rules="rules.length"
              class="tw-w-80px"
            >
              <NumberBasis
                v-model="row.length"
                :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
                :controls="false"
                size="small"
                placeholder="长"
                clearable
              />
            </el-form-item>
            <el-form-item
              :prop="`tableSizeData[${$index}].width`"
              :rules="rules.width"
              class="tw-w-80px"
            >
              <NumberBasis
                :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
                v-model="row.width"
                :controls="false"
                size="small"
                placeholder="宽"
              />
            </el-form-item>
            <el-form-item
              :prop="`tableSizeData[${$index}].height`"
              :rules="rules.height"
              class="tw-w-80px"
            >
              <NumberBasis
                v-model="row.height"
                :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
                :controls="false"
                size="small"
                placeholder="高"
                clearable
              />
            </el-form-item>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="100">
        <template #header>
          <div class="required-label">重量（g）</div>
          <NumberBasis
            v-if="!isReadonly && !goodsEditImg && !isGoodsEdit"
            v-model="batchHeaders.weight"
            placeholder="重量"
            :controls="false"
            size="small"
            class="batch-header-input"
          />
        </template>
        <template #default="{ row, $index }">
          <!-- <span v-if="isReadonly">{{ row.weight || '-' }}</span> -->
          <el-form-item
            :prop="`tableSizeData[${$index}].weight`"
            :rules="rules.weight"
          >
            <NumberBasis
              v-model="row.weight"
              :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
              :controls="false"
              size="small"
              clearable
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column min-width="370">
        <template #header>
          <div class="required-label">SKU分类</div>
          <div v-if="!isReadonly && !goodsEditImg && !isGoodsEdit" class="batch-header-sku-col">
            <div class="batch-header-sku">
              <el-select
                v-model="batchHeaders.skuCategory"
                placeholder="Sku分类"
                size="small"
                class="batch-header-select"
                @change="(val: string) => {
                  if (val === '1') {
                    batchHeaders.numberOfPieces = 1;
                  }
                }"
              >
                <el-option
                  v-for="(item, index) in SKU_CLASSIFICATION"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <NumberBasis
                v-model="batchHeaders.numberOfPieces"
                :disabled="batchHeaders.skuCategory === '1'"
                placeholder="单品数量"
                :min="1"
                size="small"
                class="batch-header-number"
              />
              <div v-if="batchHeaders.skuCategory !== '1'" class="batch-header-sku">
                <el-select
                  v-model="batchHeaders.individuallyPacked"
                  placeholder="是否独立包装"
                  size="small"
                  class="batch-header-select"
                >
                  <el-option
                    v-for="(individuallyItem, individuallyPackedIndex) in individuallyPackedOption"
                    :key="individuallyPackedIndex"
                    :label="individuallyItem.label"
                    :value="individuallyItem.value"
                  />
                </el-select>
              </div>
              <div v-if="batchHeaders.skuCategory !== '3'" class="batch-header-sku">
                <NumberBasis
                  v-model="batchHeaders.numberOfPack"
                  placeholder="共计内含"
                  :min="1"
                  size="small"
                  class="batch-header-number"
                />
              </div>
            </div>
          </div>
        </template>
        <template #default="{ row, $index }">
          <el-form-item>
            <div class="tw-flex-center-y">
              <div class="tw-w-150px">
                <el-form-item
                  class="tw-m-b-0!"
                  :prop="`tableSizeData[${$index}].skuCategory`"
                  :rules="rules.skuCategory"
                >
                  <DictionarySelect
                    :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
                    class="tw-w-150px"
                    v-model="row.skuCategory"
                    :dictionary="DICTIONARY_KEY.SKU_CLASSIFICATION"
                    clearable
                    @change="(val: string) => {
                      if (val === '1') {
                        row.numberOfPieces = 1;
                        row.individuallyPacked = '';
                      }
                      nextTick(() => {
                        formRef.value?.validateField(`tableSizeData[${$index}].numberOfPieces`);
                        if (val !== '1') {
                          formRef.value?.validateField(`tableSizeData[${$index}].individuallyPacked`);
                        }
                        validatePackingListField($index);
                      });
                    }"
                  />
                </el-form-item>
              </div>
              <span
                class="text-box"
              >单品数量：</span>
              <el-form-item
                class="tw-flex tw-w-100px tw-m-b-0!"
                :prop="`tableSizeData[${$index}].numberOfPieces`"
                :rules="rules.numberOfPieces"
              >
                <NumberBasis
                  :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg || row.skuCategory === '1'"
                  v-model="row.numberOfPieces"
                  placeholder="单品数量"
                  :min="1"
                  size="small"
                  class="batch-input-field tw-w-180px tw-m-l-10px"
                  @change="validatePackingListField($index)"
                />
              </el-form-item>
              <span class="tw-m-l-4px">件</span>
            </div>
            <div class="tw-flex-center-y tw-m-t-17px">
              <!-- 单品时隐藏是否独立包装下拉框 -->
              <div v-if="row.skuCategory !== '1'" class="tw-flex tw-m-r-20px">
                <el-form-item
                  class="tw-m-b-0!"
                  :prop="`tableSizeData[${$index}].individuallyPacked`"
                  :rules="rules.individuallyPacked"
                >
                  <el-select
                    v-model="row.individuallyPacked"
                    :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
                    filterable
                    clearable
                    style="width: 150px;"
                    placeholder="是否独立包装"
                    size="small"
                  >
                    <el-option
                      v-for="(individuallyItem, individuallyPackedIndex) in individuallyPackedOption"
                      :key="individuallyPackedIndex"
                      :label="individuallyItem.label"
                      :value="individuallyItem.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <!-- 混合套装时隐藏共计内含 -->
              <span
                v-if="row.skuCategory !== '3'"
              >共计内含：</span>
              <span v-if="row.skuCategory !== '3'" class="tw-flex tw-w-115px">
                <NumberBasis
                  :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
                  v-model="row.numberOfPack"
                  placeholder="件数"
                  :min="1"
                  size="small"
                  class="batch-input-field tw-w-180px tw-m-l-10px"
                />
                <span class="tw-m-l-4px">件</span>
              </span>
            </div>
          </el-form-item>
          <!-- <span v-if="isReadonly">{{ filters.getEnumLabel(SKU_CLASSIFICATION, row.skuCategory) || '-' }}</span> -->
        </template>
      </el-table-column>
      <el-table-column min-width="300">
        <template #header>
          <div>包装清单</div>
          <div v-if="!isReadonly && !goodsEditImg && !isGoodsEdit">
            <el-popover
              placement="bottom"
              :width="400"
              :visible="visible"
            >
              <template #reference>
                <el-button
                  text
                  type="primary"
                  @click="visible = true"
                >
                  批量填写清单
                </el-button>
              </template>
              <template #default>
                <div>
                  <div
                    class="tw-flex-center-y tw-m-b-17px"
                    v-for="(itemCategory, categoryIndex) in packagingConfigList"
                    :key="categoryIndex"
                  >
                    <div class="tw-w-150px tw-flex tw-flex-center-xy">
                      <el-select
                        v-model="itemCategory.catName"
                        filterable
                        remote
                        reserve-keyword
                        :remote-method="handleAccessoriesSearch"
                        placeholder="可选择或搜索物品"
                        style="width: 150px;"
                        size="small"
                        class="batch-header-select"
                        @change="(val: string) => {
                          const selectedItem = categoryFinalStage.find?.((i: Types.TemuAccessoriesResItem) => i.value === val);
                          itemCategory.catId = selectedItem ? String(selectedItem.vid) : '';
                        }"
                      >
                        <el-option
                          v-for="(item, cateIndex) in categoryFinalStage"
                          :key="cateIndex"
                          :label="item.value"
                          :value="item.value || ''"
                          :disabled="isOptionDisabled(item.value || '', packagingConfigList, categoryIndex)"
                        />
                      </el-select>
                    </div>
                    <div class="tw-flex tw-w-180px tw-m-l-10px">
                      <NumberBasis
                        v-model="itemCategory.numberOfPieces"
                        placeholder="数量"
                        :min="1"
                        size="small"
                        class="batch-input-field"
                      />
                    </div>
                    <span class="tw-m-l-4px">件</span>
                    <el-icon
                      v-if="packagingConfigList.length > 1"
                      @click="() => {
                        delectPackingItem(packagingConfigList, categoryIndex);
                        // validatePackingListField($index);
                      }"
                      class="delIco"
                      color="red"
                    ><Delete /></el-icon>
                  </div>
                  <el-button
                    text
                    type="primary"
                    @click="() => {
                      packagingConfigList.push({
                        catId: '',
                        catName: '',
                        numberOfPieces: '',
                      });
                    }"
                  >+添加</el-button>
                </div>
                <div class="tw-flex">
                  <el-button
                    class="tw-m-l-auto"
                    plain
                    @click="visible = false"
                  >关闭</el-button>
                  <el-button type="primary" @click="batchFilling">批量填写清单</el-button>
                </div>
              </template>
            </el-popover>
          </div>  
        </template>
        <template #default="{ row, $index }">
          <el-form-item
            :prop="`tableSizeData[${$index}].packingList`"
            :rules="row.skuCategory === '1' ? [] : [{ validator: (_rule, value, cb) => validatePackingList(row, value, cb), trigger: 'change' }]"
          >
            <div>
              <div
                class="tw-flex-center-y tw-m-b-17px"
                v-for="(itemCategory, packingIndex) in row.packingList"
                :key="packingIndex"
              >
                <div class="tw-w-150px">
                  <el-form-item
                    class="tw-m-b-0!"
                    :prop="`tableSizeData[${$index}].packingList[${packingIndex}].catName`"
                    :rules="row.skuCategory === '1' ? [] : [{ required: true, message: '请选择物品', trigger: 'change' }]"
                  >
                    <el-select
                      v-model="itemCategory.catName"
                      :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
                      filterable
                      remote
                      reserve-keyword
                      :remote-method="handleAccessoriesSearch"
                      placeholder="可选择或搜索物品"
                      style="width: 150px;"
                      size="small"
                      class="batch-header-select"
                      @change="(val: string) => {
                        const selectedItem = categoryFinalStage.find?.((i: Types.TemuAccessoriesResItem) => i.value === val);
                        itemCategory.catId = selectedItem ? String(selectedItem.vid) : '';
                      }"
                    >
                      <el-option
                        v-for="(item, cateIndex) in categoryFinalStage"
                        :key="cateIndex"
                        :label="item.value"
                        :value="item.value || ''"
                        :disabled="isOptionDisabled(item.value || '', row.packingList, packingIndex)"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <el-form-item
                  class="tw-flex tw-w-100px tw-m-b-0! tw-m-l-10px"
                  :prop="`tableSizeData[${$index}].packingList[${packingIndex}].numberOfPieces`"
                  :rules="row.skuCategory === '1' ? [] : [{ required: true, message: '请输入数量', trigger: 'change' }]"
                >
                  <div class="tw-flex tw-w-180px">
                    <NumberBasis
                      :disabled="isReadonly || !!row.productSkuId || !!goodsEditImg"
                      v-model="itemCategory.numberOfPieces"
                      placeholder="数量"
                      :min="1"
                      size="small"
                      class="batch-input-field"
                      @change="validatePackingListField($index)"
                    />
                    <span class="tw-m-l-4px">件</span>
                  </div>
                </el-form-item>
                <el-icon
                  v-if="row.packingList.length > 1 && !isReadonly && !goodsEditImg && !isGoodsEdit"
                  @click="() => {
                    delectPackingItem(row.packingList, packingIndex);
                    validatePackingListField($index);
                  }"
                  class="delIco"
                  color="red"
                ><Delete /></el-icon>
              </div>
              <div v-if="!isReadonly && !goodsEditImg && !isGoodsEdit">
                <el-button
                  text
                  type="primary"
                  @click="() => {
                    row.packingList.push({
                      catId: '',
                      catName: '',
                      numberOfPieces: '',
                    });
                    nextTick(() => {
                      // 仅非单品时触发校验
                      if (row.skuCategory !== '1') {
                        const newIndex = row.packingList.length - 1;
                        formRef.value?.validateField(`tableSizeData[${$index}].packingList[${newIndex}].catId`);
                        formRef.value?.validateField(`tableSizeData[${$index}].packingList[${newIndex}].numberOfPieces`);
                        validatePackingListField($index);
                      }
                      console.log('tableSizeData', tableSizeData);
                    });
                  }"
                >+添加</el-button>
              </div>
            </div>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script setup lang='ts'>
import { ref, reactive, watch, nextTick, computed, onMounted } from 'vue';
import { IStyleOnShelevesDetailSkcItem, IStyleOnShelvesDetailRes } from '@/modules/goods-manage/api/listing/type';
import { CheckboxValueType, FormInstance, FormRules } from 'element-plus';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { useForm } from '../hooks/use-form';
import NumberBasis from '@/components/number-basis/package/number-basis.vue';
import { useContext } from '../hooks/use-context';
import { filters } from '@/core/plugins/filter';
import { ProductCreateReqSkuReqsItem } from '../api/types';
// import DictionarySelect from '@/components/dictionary-select';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { Delete } from '@element-plus/icons-vue';
import * as Types from '../api/types';
import { temuAccessoriesApi } from '../api'; 

const props = defineProps<{
  /** 详情数据 */
  detailData: IStyleOnShelvesDetailRes;
}>();
const details = computed(() => {
  return props.detailData;
});
const emit = defineEmits<{
  'size-change': [sizes: string[]];
}>();

interface SizeRow {
  size?: string | undefined;
  suggestedPrice?: number | undefined;
  length: number | undefined;
  width: number | undefined;
  height: number | undefined;
  weight: number | undefined;
  skuCategory: string;
  skc: IStyleOnShelevesDetailSkcItem;
  numberOfPieces?: number;
  packingList?: { catName: string; catId: string; numberOfPieces: string; }[];
}

const formRef = ref<any>();
const categoryFinalStage = ref<Types.TemuAccessoriesRes>([]);

// 获取货品包装清单类型列表
const fetchAccessoriesList = async (fuzzyValue?: string) => {
  try {
    const res = await temuAccessoriesApi({
      shopId: details.value.storeId,
      pageNum: 1,
      pageSize: 100,
      fuzzyValue,
    });
    categoryFinalStage.value = res?.data?.filter(v => v.unitCode === 1) ?? [];
  } catch (error) {
    console.error('获取货品包装清单类型失败:', error);
  }
};

// 远程搜索方法
const handleAccessoriesSearch = (query: string) => {
  query && fetchAccessoriesList(query);
};
watch(() => details.value.storeId, (storeId: string) => {
  if (storeId) {
    fetchAccessoriesList();
  }
}, {
  immediate: true
});
const { formData, tableSizeData, sizeList, temuReviewDatas, theFirstTime, productId, sizeMappingList, temu_defaultValue, form, warehouseList } = useForm();
const { isReadonly, goodsEditImg, isGoodsEdit } = useContext();
// const sizeList = ref<{ label: string; value: string; checked: boolean; }[]>([]);
// 表格仓库column集合
const tableWarehouseColumnList = computed(() => {
  return (form.value?.warehouseIds?.[0]?.warehouseId || []).map((v: string) => {
    return {
      label: `${warehouseList.value?.find(v1 => v1.warehouseId === v)?.warehouseName} 库存`,
      prop: v,
    };
  }) ?? [];
});
const { getDictionaryOptionsSync, getDictionaryOptions } = useDictionary();
const SKU_CLASSIFICATION = computed(() => getDictionaryOptions(DICTIONARY_KEY.SKU_CLASSIFICATION));

// const initSizeList = async () => {
// const sizes = await getDictionaryOptionsSync(DICTIONARY_KEY.PLM_STANDARY_SIZE);
//   if (!Array.isArray(sizes)) return;
//   const sizeGroup = sizes.find(item => item.value === props.detailData.sizeStandardCode);
//   const listStr = sizeGroup?.children?.[0]?.label;
//   sizeList.value = listStr?.split(',').map(size => ({
//     label: size,
//     value: size,
//     checked: true,
//   })) ?? [];
// };

// 全选状态
const allSelected = ref(true);
const isIndeterminate = ref(false);
const individuallyPackedOption = ref<{ label: string; value: number; }[]>([
  {
    label: '是独立包装',
    value: 1
  },
  {
    label: '不是独立包装',
    value: 0
  },
]);
const rules: FormRules = {
  sizeList: [{
    validator: (_rule, _value, cb) => {
      if (!sizeList.value?.some((item: { checked: boolean; }) => item.checked)) {
        cb('请选择尺码');
        return;
      }
      cb();
    }
  }],
  suggestedPrice: [
    {
      required: true,
      message: '输入申报价格',
      trigger: 'blur',
    },
  ],
  length: [
    {
      required: true,
      message: '输入长度',
      trigger: 'blur',
    },
  ],
  width: [
    {
      required: true,
      message: '输入宽度',
      trigger: 'blur',
    },
  ],
  height: [
    {
      required: true,
      message: '输入高度',
      trigger: 'blur',
    },
  ],
  weight: [
    {
      required: true,
      message: '输入重量',
      trigger: 'blur',
    },
  ],
  skuCategory: [
    {
      required: true,
      message: '请选择SKU分类',
      trigger: 'blur',
    },
  ],
  numberOfPieces: [
    {
      required: true,
      message: '请输入单品数量',
      trigger: ['blur', 'change'],
    },
  ],
  individuallyPacked: [
    {
      required: true,
      message: '请选择是否独立包装',
      trigger: ['blur', 'change'],
    },
  ],
};

// 处理全选
const handleSelectAll = (val: CheckboxValueType) => {
  const boolVal = Boolean(val);
  sizeList.value.forEach((item: { checked: boolean; disabled: boolean; }) => {
    if (!item.disabled) {
      item.checked = boolVal;
    }
  });
  isIndeterminate.value = false;
};

// 表头批量输入的数据
const batchHeaders = reactive<{
  suggestedPrice: number | undefined;
  length: number | undefined;
  width: number | undefined;
  height: number | undefined;
  weight: number | undefined;
  skuCategory: string;
  numberOfPieces: number | string | undefined;
  individuallyPacked: string | number;
  numberOfPack: number | string | undefined;
  warehouse: Record<string, number | undefined>;
}>({
  suggestedPrice: undefined,
  length: undefined,
  width: undefined,
  height: undefined,
  weight: undefined,
  skuCategory: '',
  numberOfPieces: undefined,
  individuallyPacked: '',
  numberOfPack: undefined,
  warehouse: {},
});

// 批量填充所有列
const handleBatchFill = () => {
  const needValidateNumberOfPieces = batchHeaders.skuCategory || batchHeaders.numberOfPieces !== undefined;
  tableSizeData.value.forEach((row: any) => {
    // 申报价格
    if (batchHeaders.suggestedPrice) {
      row.suggestedPrice = batchHeaders.suggestedPrice;
    }
    // 包装尺寸
    if (batchHeaders.length) {
      row.length = batchHeaders.length;
    }
    if (batchHeaders.width) {
      row.width = batchHeaders.width;
    }
    if (batchHeaders.height) {
      row.height = batchHeaders.height;
    }
    // 重量
    if (batchHeaders.weight) {
      row.weight = batchHeaders.weight;
    }
    // SKU分类
    if (batchHeaders.skuCategory) {
      row.skuCategory = batchHeaders.skuCategory;
    }
    // 单品强制数量为1，并清空独立包装
    if (row.skuCategory === '1') {
      row.numberOfPieces = 1;
      row.individuallyPacked = '';
    } else if (batchHeaders.numberOfPieces !== undefined && batchHeaders.numberOfPieces !== null && batchHeaders.numberOfPieces !== '') {
      row.numberOfPieces = batchHeaders.numberOfPieces;
    }
    // 是否独立包装（仅非单品显示）
    if (row.skuCategory !== '1' && (batchHeaders.individuallyPacked || batchHeaders.individuallyPacked === 0)) {
      row.individuallyPacked = batchHeaders.individuallyPacked;
    }
    // 共计内含（仅非混合套装显示）
    if (row.skuCategory !== '3' && batchHeaders.numberOfPack !== undefined && batchHeaders.numberOfPack !== null && batchHeaders.numberOfPack !== '') {
      row.numberOfPack = batchHeaders.numberOfPack;
    }
    // 仓库库存
    Object.keys(batchHeaders.warehouse).forEach((key) => {
      const value = batchHeaders.warehouse[key];
      if (value) {
        (row as any)[key] = value;
      }
    });
  });
  nextTick(() => {
    tableSizeData.value.forEach((row, index) => {
      if (needValidateNumberOfPieces) {
        formRef.value?.validateField(`tableSizeData[${index}].numberOfPieces`);
      }
      if (row.skuCategory !== '1' && batchHeaders.individuallyPacked) {
        formRef.value?.validateField(`tableSizeData[${index}].individuallyPacked`);
      }
      // 仅非单品时触发包装清单校验
      if (row.skuCategory !== '1') {
        formRef.value?.validateField(`tableSizeData[${index}].packingList`);
      }
    });
  });
};

// 预计算合并信息
const spanMap = ref<Map<number, { rowspan: number; colspan: number; }>>(new Map());
// 计算合并行与数量
const computeSpanMap = () => {
  const map = new Map<number, { rowspan: number; colspan: number; }>();
  const skcCountMap = new Map<string, number>();
  const skcFirstIndexMap = new Map<string, number>();

  // 统计每个SKC的数量和首次出现位置
  tableSizeData.value.forEach((row, index) => {
    const skcCode = row.skc?.skcCode;
    if (!skcCode) return;

    if (!skcFirstIndexMap.has(skcCode)) {
      skcFirstIndexMap.set(skcCode, index);
      skcCountMap.set(skcCode, 1);
    } else {
      skcCountMap.set(skcCode, (skcCountMap.get(skcCode) || 0) + 1);
    }
  });

  // 设置每行的合并信息
  tableSizeData.value.forEach((row, index) => {
    const skcCode = row.skc?.skcCode;
    if (!skcCode) {
      map.set(index, { rowspan: 1, colspan: 1 });
      return;
    }

    const firstIndex = skcFirstIndexMap.get(skcCode);
    if (firstIndex === index) {
      // 第一次出现，设置合并行数
      map.set(index, { rowspan: skcCountMap.get(skcCode) || 1, colspan: 1 });
    } else {
      // 非首次出现，隐藏
      map.set(index, { rowspan: 0, colspan: 0 });
    }
  });

  spanMap.value = map;
};

// 合并SKC列相同的行
const spanMethod = ({ rowIndex, columnIndex }: any) => {
  // 只处理第一列（SKC列）
  if (columnIndex === 0) {
    return spanMap.value.get(rowIndex) || { rowspan: 1, colspan: 1 };
  }
  return { rowspan: 1, colspan: 1 };
};

/**
 * 获取默认值
 * @param keyName 默认值名称
 */
const getDefaultValue = (keyName: string) => {
  return temu_defaultValue.value.find((v4: IDictionaryItem) => v4.dictName === keyName)?.attributes?.find(v5 => v5.code === 'defaultValue')?.name ?? '';
};
const updateTableData = (selectedSizes: string[]) => {
  const newTableData: any = [];
  props.detailData.skcList?.forEach((skc) => {
    // 更新表格数据
    newTableData.push(
      ...selectedSizes.map((size) => {
        const existingRow = tableSizeData.value.find(row => row.size === size && row.skc.skcCode === skc.skcCode);
        
        // if (existingRow && !theFirstTime.value) return existingRow;
        const sizes: ProductCreateReqSkuReqsItem = temuReviewDatas.value?.skcReqs?.find(v => v.skcCode === skc.skcCode)?.skuReqs?.find(v1 => v1?.skuSpecReqs?.[0]?.specName === size) as ProductCreateReqSkuReqsItem;
        const sItem = (temuReviewDatas.value?.skcs ?? []).find((s1: { skcCode: string; }) => s1.skcCode === skc.skcCode)?.skus;
        console.log('sItem123124', sizes);
        const temuSize = sizeMappingList.value.find(v => v.temuSize === size)?.internalSize ?? size;
        const str = {} as any;
        sizes?.warehouseStockQuantityReqs?.forEach((wqr) => {
          str[wqr?.warehouseId || ''] = Number(wqr.targetStockAvailable || 0) || undefined;
        });
        return {
          skc,
          size,
          suggestedPrice: existingRow?.suggestedPrice || sizes?.supplierPrice || getDefaultValue('申报价格'),
          length: existingRow?.length || sizes?.len || getDefaultValue('长'),
          width: existingRow?.width || sizes?.width || getDefaultValue('宽'),
          height: existingRow?.height || sizes?.height || getDefaultValue('高'),
          weight: existingRow?.weight || sizes?.skuWeightValue || undefined,
          skuCategory: existingRow?.skuCategory || sizes?.skuClassification?.toString() || props.detailData?.skuClassCode || undefined,
          numberOfPieces: existingRow?.numberOfPieces || sizes?.numberOfPieces?.toString() || props.detailData?.suitPiece || (props.detailData?.skuClassCode?.toString() === '1' ? 1 : undefined),
          productSkuId: sizes?.productSkuId ?? '',
          platformSku: (sItem || []).find((s1: { skuSpecs: { specName: string; }[]; }) => s1?.skuSpecs?.some((s2: { specName: string; }) => s2.specName === size))?.platformSkuId,
          internalSku: (skc.skuList || []).find((v: { sizeName: string; }) => v.sizeName === temuSize)?.skuCode,
          packingList: (sizes?.packingList && sizes?.packingList.length) ? sizes?.packingList.map((pl: any) => {
            return {
              ...pl,
              catId: (pl.catId || '').toString(),
            };
          }) : [
            {
              catId: '',
              catName: '',
              numberOfPieces: '',
            }
          ],
          individuallyPacked: sizes?.individuallyPacked,
          numberOfPack: sizes?.numberOfPack || '',
          ...str,
        };
      })
    );
  });
  tableSizeData.value = newTableData;
};

// 更新全选状态
const updateSelectedAllState = () => {
  const checkedValues = sizeList.value.map((item: { checked: boolean; }) => item.checked);
  const allSame = new Set(checkedValues).size === 1;
  // 如果全部相同，则不是部分选中
  isIndeterminate.value = !allSame;
};

// watch(() => formData.value.sizeStandardCode, () => {
//   initSizeList();
// }, { immediate: true });

// 监听尺码选项变化，更新表格数据并通知父组件
watch(
  sizeList,
  (newVal) => {
    updateSelectedAllState();
    const selectedSizes = newVal.filter((item: { checked: boolean; }) => item.checked).map((item: { value: string; }) => item.value);
    updateTableData(selectedSizes);
    nextTick(() => {
      formRef.value?.validateField('sizeList');
    });
    // 重新计算合并行及数量
    computeSpanMap();
    // 通知父组件尺码选择变化
    emit('size-change', selectedSizes);
  },
  { deep: true }
);

/**
 * 判断选项是否应被禁用
 * @param categoryLabel 当前选项的 label（categoryName）
 * @param packingList 当前行的包装清单数组
 * @param currentIndex 当前下拉框在 packingList 中的索引
 * @returns 是否禁用该选项
 */
const isOptionDisabled = (
  categoryLabel: string,
  packingList: { catId: string; catName: string; numberOfPieces: string; }[],
  currentIndex: number
): boolean => {
  // 检查是否有其他项（非当前项）已经选中了该 categoryLabel
  return packingList.some((item, index) => {
    return index !== currentIndex && item.catName && item.catName === categoryLabel;
  });
};

/**
 * 删除包装清单项
 * @param packingList 当前行的包装清单数组
 * @param index 要删除的项索引
 */
const delectPackingItem = (
  packingList: { catId: string; catName: string; numberOfPieces: string; }[],
  index: number
) => {
  if (packingList.length > 1) {
    packingList.splice(index, 1);
  }
};

// 包装清单数量校验：所有数量之和必须等于单品数量（单品时不校验）
const validatePackingList = (row: any, _value: any, callback: any) => {
  // 单品时不校验包装清单
  if (row.skuCategory === '1') {
    callback();
    return;
  }
  
  const total = (row.packingList || []).reduce((sum: number, item: any) => sum + (Number(item.numberOfPieces) || 0), 0);
  const target = row.numberOfPieces === '' || row.numberOfPieces === undefined || row.numberOfPieces === null
    ? undefined
    : Number(row.numberOfPieces);
  
  if (target === undefined) {
    callback(new Error('请先填写单品数量'));
    return;
  }
  
  if (total !== target) {
    callback(new Error('包装清单数量之和必须等于单品数量'));
  } else {
    callback();
  }
};

// 触发指定行包装清单的校验（单品时不校验）
const validatePackingListField = (index: number) => {
  nextTick(() => {
    const row = tableSizeData.value[index];
    if (row?.skuCategory !== '1') {
      formRef.value?.validateField(`tableSizeData[${index}].packingList`);
    }
  });
};

const validate = async () => {
  return formRef.value?.validate();
};
// 批量填写包装清单相关
const packagingConfigList = ref<{ catName: string; catId: string; numberOfPieces: string; }[]>([
  {
    catId: '',
    catName: '',
    numberOfPieces: '',
  }
]);
const visible = ref<boolean>(false);
const batchFilling = () => {
  if (packagingConfigList.value.length === 1 && !packagingConfigList.value[0].numberOfPieces && !packagingConfigList.value[0].catName) {
    visible.value = false;
    return;
  }
  tableSizeData.value.forEach((v: SizeRow) => {
    v.packingList = JSON.parse(JSON.stringify(packagingConfigList.value));
  });
  visible.value = false;
};

defineExpose({
  validate,
});
</script>

<style scoped lang="scss">
.size-list {
  .batch-input {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    align-items: center;
    .batch-input-field {
      width: 120px;
    }
  }
}
.required-label::before {
  content: "*";
  color: red;
  margin-right: 2px;
}
.text-box {
  white-space: nowrap;
  margin-left: 20px;
}
.batch-fill-btn {
  margin-top: 4px;
}
.batch-header-input {
  width: 100%;
  margin-top: 4px;
}
.batch-header-input-80 {
  width: 80px;
}
.batch-header-row {
  display: flex;
  gap: 5px;
  margin-top: 4px;
}
.batch-header-sku {
  display: flex;
  gap: 8px;
  margin-top: 4px;
  align-items: center;
}
.batch-header-sku-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
  .batch-header-sku {
    margin-top: 0;
  }
}
.batch-header-select {
  width: 100px;
}
.batch-header-number {
  width: 80px;
}
.delIco {
  margin-left: 10px;
  cursor: pointer;
}
</style>
