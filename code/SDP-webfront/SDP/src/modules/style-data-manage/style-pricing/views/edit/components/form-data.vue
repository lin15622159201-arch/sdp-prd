<template>
  <el-scrollbar class="scroller">
    <div class="scroller_layout">
      <el-form
        label-suffix="："
        label-width="130px"
        :model="formData"
        ref="formElRef"
        :disabled="readOnly"
      >
        <sc-detail-card
          title="面料费用"
          class="
            tw-border-1px tw-border-[var(--el-border-color)] tw-border-solid tw-rounded-4px
            tw-mb[20px] tw-p-10px!
          "
        >
          <div class="tw-flex tw-flex-justify-between">
            <div class="required">
              小单倍率：{{ materiaSmallOrderRate }}
            </div>
            <div class="tw-font-bold tw-text-right">
              <div class="tw-text-16px">
                面料费用汇总：
                {{ materialWasteTotalAmount }}
                元
                <span>{{ estimateMaterialCost('1') }}</span>
              </div>
              <div class="tw-text-12px tw-my-10px">
                小单面料费用汇总：
                {{ materialSmallWasteTotalAmount }}
                元
              </div>
            </div>
          </div>
          <sc-table
            height="100%"
            ref="materialTableElRef"
            :data="formData.materialList"
            :columns="materialCostTableColumns"
            @selection-change="handleChangeMaterialCost"
          />
        </sc-detail-card>
        <sc-detail-card
          title="辅料费用"
          class="
            tw-border-1px tw-border-[var(--el-border-color)] tw-border-solid tw-rounded-4px
            tw-mb[20px] tw-p-10px!
          "
        >
          <div class="tw-flex tw-flex-justify-between">
            <div class="required">
              小单倍率：{{ accessoriesSmallOrderRate }}
            </div>
            <div class="tw-font-bold tw-text-right">
              <div class="tw-text-16px">
                辅料费用汇总：
                {{ accessoriesWasteTotalAmount }}
                元
                <span>{{ estimateMaterialCost('2') }}</span>
              </div>
              <div class="tw-text-12px tw-my-10px">
                小单辅料费用汇总：
                {{ accessoriesSmallWasteTotalAmount }}
                元
              </div>
            </div>
          </div>
          <sc-table
            height="100%"
            ref="accessoriesTableElRef"
            :data="formData.accessoriesList"
            :columns="accessoriesCostTableColumns"
            @selection-change="handleChangeAccessoriesCost"
          />
        </sc-detail-card>
        <sc-detail-card
          title="工艺费用"
          class="
            tw-border-1px tw-border-[var(--el-border-color)] tw-border-solid tw-rounded-4px
            tw-mb[20px] tw-p-10px!
          "
        >
          <div class="tw-flex tw-flex-justify-end">
            <div class="tw-font-bold tw-text-right">
              <div class="tw-text-16px">
                工艺费用汇总：
                {{ craftWasteTotalAmount }}
                元
                <span>{{ getEstimateCheckPrice('craftDemandCost') }}</span>
              </div>
              <div class="tw-text-12px tw-my-10px">
                小单工艺费用汇总：
                {{ smallOrderCraftDemandCost }}
                元
              </div>
            </div>
          </div>
          <sc-table
            height="100%"
            ref="processTableElRef"
            :data="formData.craftDemandCostInfoList"
            :columns="tableColumns"
            @selection-change="handleChangeProcessFees"
          />
        </sc-detail-card>
        <div
          class="
          tw-border-1px tw-border-[var(--el-border-color)] tw-border-solid tw-rounded-4px
          tw-mb[20px] tw-p-10px!
        "
        >
          <div class="tw-flex tw-w-full tw-ml[10px] tw-justify-end tw-pr-10px">
            <el-button
              type="primary"
              @click="handleProcessModify"
              v-if="!btnModify"
            >编辑</el-button>
            <el-button
              v-if="btnModify"
              type="primary"
              @click="handleSave"
              :loading="saveLoading"
            >暂存</el-button>
          </div>

          <sc-detail-card title="加工费用" class="tw-mb[20px] tw-px-0! tw-py-0!">
            <el-row>
              <el-col :span="colSpan">
                <div class="tw-flex-1 tw-flex tw-items-center tw-mr[10px] tw-mb-[10px]">
                  <div class="tw-w-[auto]">款式工序模板引用</div>
                  <query-select
                    class="!tw-w[200px] tw-mx-10px"
                    v-model="processTemplateId"
                    placeholder='请输入'
                    :method="styleTemplatePage"
                    :needInitSearch="true"
                    clearable
                    :config="{
                      labelKey: 'styleName',
                      valueKey: 'processStyleTemplateId',
                      keywordQueryKey: 'styleName',
                      valueQueryKey: 'processStyleTemplateId',
                      dataKey: 'data.list',
                    }"
                    :queryParams="{ state: YES_NO_ENUM.YES }"
                    :disabled="!btnModify"
                  />
                  <el-button
                    type="primary"
                    @click="handleReferenceStyle"
                    :disabled="!btnModify"
                  >引用</el-button>
                </div>
              </el-col>
              <el-col :span="colSpan">
                <div class="tw-flex-1 tw-flex tw-items-center tw-mr[10px] tw-mb-[10px]">
                  <div class="tw-w-[auto]">款式部件库引用</div>
                  <query-select
                    class="!tw-w[200px] tw-mx-10px"
                    v-model="referComponentTemplateCode"
                    placeholder='请输入'
                    :method="sewingComponentTemplatePage"
                    clearable
                    :needInitSearch="true"
                    :config="{
                      labelKey: 'componentName',
                      valueKey: 'sewingComponentTemplateId',
                      keywordQueryKey: 'componentName',
                      valueQueryKey: 'sewingComponentTemplateId',
                      dataKey: 'data.list',
                    }"
                    :queryParams="{ state: YES_NO_ENUM.YES }"
                    :disabled="!btnModify"
                  />
                  <el-button
                    type="primary"
                    @click="handleReferenceParts"
                    :disabled="!btnModify"
                  >引用</el-button>
                </div>
              </el-col>
              <el-col :span="colSpan">
                <div class="tw-flex-1 tw-flex tw-items-center tw-mr[10px] tw-mb-[10px]">
                  <div class="tw-w-[auto]">SKC引用</div>
                  <el-input
                    class="!tw-w[200px] tw-mx-10px"
                    v-model="skcTemplateId"
                    placeholder='请输入'
                    clearable
                    :disabled="!btnModify"
                  />
                  <el-button
                    type="primary"
                    @click="handleReferenceSkc"
                    :disabled="!btnModify"
                  >引用</el-button>
                </div>
              </el-col>
            </el-row>
            <div class="tw-flex tw-flex-justify-between">
              <div class="tw-flex tw-w-500px">
                <el-form-item
                  label-width="100px"
                  class="tw-flex-3 tw-h-24px"
                  label="发单倍率"
                  prop="orderSendingRate"
                  :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
                >
                  <input-number
                    class="tw-w-20 tw-mx[5px]"
                    v-model="formData.orderSendingRate"
                    placeholder="请输入"
                    :precision="1"
                    :min="1.8"
                    :max="3"
                    :disabled="!btnModify"
                  />
                  <span class="tw-text-danger">倍率范围1.8-3</span>
                </el-form-item>
                <el-form-item
                  label-width="100px"
                  class="tw-flex-1 tw-h-24px"
                  label="小单倍率"
                  prop="smallOrderRate"
                  :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
                >
                  <input-number
                    class="tw-w-20 tw-mx[5px]"
                    v-model="formData.smallOrderRate"
                    placeholder="请输入"
                    :precision="1"
                    :min="1"
                    :max="100"
                    :disabled="!btnModify"
                  />
                </el-form-item>
              </div>
              <div class="tw-font-bold tw-text-right">
                <div class="tw-text-16px">
                  加工费用汇总：
                  {{ processTotalAmount }}
                  元
                  <span>{{ getEstimateCheckPrice('processCost') }}</span>
                </div>
                <div class="tw-text-12px tw-my-10px">
                  <!-- 小单加工费用汇总=车缝费用*小单倍率-->
                  小单加工费用汇总 ：
                  {{ processSmallTotalAmount }}
                  元
                </div>
                <div class="tw-flex-1 tw-mb-10px tw-text-12px">
                  <span
                    class="tw-ml[6px]"
                    :key="item.stepCode"
                    v-for="item in processStepTotalAmountList"
                  >
                    {{ item.title }}：{{ item.amount }}元
                  </span>
                </div>
              </div>
            </div>
            <el-row justify="start" class='tw-pb10px'>
              <el-button
                type="primary"
                @click="handleAddProcessingFees(formData.processCostInfoList.length)"
                :disabled="!btnModify"
              >新增</el-button>
            </el-row>
            <sc-table
              :data="formData.processCostInfoList"
              class='reset-form-item-top'
              border
              :columns="processTableColumns"
            />
          </sc-detail-card>
          <sc-detail-card title="其他费用" class="tw-mb[20px] tw-px-0! tw-py-0!">
            <div class="tw-font-bold tw-text-right">
              <div class="tw-text-16px tw-my-10px">
                <!-- 小单加工费用汇总=车缝费用*小单倍率-->
                其他费用汇总 ：
                {{ otherCostTotalAmount }}
                元
                <span>{{ getEstimateCheckPrice('otherCost') }}</span>
              </div>
              <div class="tw-text-12px">
                小单其他费用汇总：
                {{ smallOrderOtherCost }}
                元
              </div>
            </div>
            <el-row justify="start" class='tw-pb10px'>
              <el-button
                type="primary"
                @click="handleAddOtherCost(formData.otherCostInfoList.length)"
                :disabled="!btnModify"
              >新增</el-button>
            </el-row>
            <sc-table
              :data="formData.otherCostInfoList"
              class='reset-form-item-top'
              border
              :columns="otherTableColumns"
            />
          </sc-detail-card>
        </div>
        <sc-detail-card class="tw-mb[20px] tw-px-0! tw-py-0!">
          <template #extra>
            <div
              class="tw-font-size-[var(--el-font-size-medium)] tw-font-700"
            >总价计算</div>
          </template>
          <el-row>
            <el-col :span="colSpan">
              <el-form-item
                label-width="80px"
                label="毛利率"
                prop="profit"
                :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
              >
                <input-number
                  v-model="formData.profit"
                  :precision="2"
                  :min="0"
                  :max="100"
                >
                  <template #suffix>%</template>
                </input-number>
              </el-form-item>
              <el-form-item
                label-width="80px"
                label="税点"
                prop="taxationRatio"
                :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
              >
                <input-number
                  v-model="formData.taxationRatio"
                  :precision="2"
                  :min="0"
                  :max="100"
                >
                  <template #suffix>%</template>
                </input-number>
              </el-form-item>
            </el-col>
            <el-col :span="colSpan">
              <el-form-item label="利润" prop="totalPrice">
                <template #label>
                  <span>
                    利润
                    <el-tooltip
                      effect='dark'
                      placement='top'
                    >
                      <template #content>
                        <div>
                          利润：【面料费用汇总+辅料费用汇总+加工费用汇总】*毛利率
                          <!-- 利润：【面料费用汇总+辅料费用汇总】*毛利率 -->
                        </div>
                      </template>
                      <el-icon class='tw-color-warning'>
                        <QuestionFilled />
                      </el-icon>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <span>{{ profitAmount }} 元</span>
                <span>{{ getEstimateCheckPrice('profitCost') }}</span>
              </el-form-item>
              <el-form-item label="税费" prop="totalPrice">
                <template #label>
                  <span>
                    税费
                    <el-tooltip
                      effect='dark'
                      placement='top'
                    >
                      <template #content>
                        <div>
                          税费：【【面料费用汇总+辅料费用汇总+加工费用汇总】*【1+毛利率】+工艺费用汇总+其他费用汇总】*税点
                          <!-- 税费：【【面料费用汇总+辅料费用汇总】*【1+毛利率】+工艺费用汇总+加工费用汇总+其他费用汇总】*税点 -->
                        </div>
                      </template>
                      <el-icon class='tw-color-warning'>
                        <QuestionFilled />
                      </el-icon>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <span>{{ bonusAmount }} 元</span>
                <span>{{ getEstimateCheckPrice('taxationCost') }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="colSpan">
              <el-form-item label="总成本" prop="factoryCostAmount">
                <template #label>
                  <span>
                    总成本
                    <el-tooltip
                      effect='dark'
                      placement='top'
                    >
                      <template #content>
                        <div>
                          总成本：【面料费用汇总+辅料费用汇总+工艺费用汇总+加工费用汇总+其他费用汇总】
                        </div>
                      </template>
                      <el-icon class='tw-color-warning'>
                        <QuestionFilled />
                      </el-icon>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <span>{{ factoryCostAmount }} 元</span>
                <span>{{ getEstimateCheckPrice('pureTotalCost') }}</span>
              </el-form-item>
              <el-form-item label="对厂不含税价" prop="factoryNoTaxAmount">
                <template #label>
                  <span>
                    对厂不含税价
                    <el-tooltip
                      effect='dark'
                      placement='top'
                    >
                      <template #content>
                        <div>
                          对厂不含税价：【面料费用汇总+辅料费用汇总+加工费用汇总】*【1+毛利率】+工艺费用汇总+其他费用汇总
                          <!-- 对厂不含税价：【面料费用汇总+辅料费用汇总】*【1+毛利率】+工艺费用汇总+加工费用汇总+其他费用汇总 -->
                        </div>
                      </template>
                      <el-icon class='tw-color-warning'>
                        <QuestionFilled />
                      </el-icon>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <span>{{ factoryNoTaxAmount }} 元</span>
                <span>{{ getEstimateCheckPrice('totalCost') }}</span>
              </el-form-item>
              <el-form-item label="对厂含税价" prop="factoryTaxAmount">
                <template #label>
                  <span>
                    对厂含税价
                    <el-tooltip
                      effect='dark'
                      placement='top'
                    >
                      <template #content>
                        <div>
                          对厂含税价：【【面料费用汇总+辅料费用汇总+加工费用汇总】*【1+毛利率】+工艺费用汇总+其他费用汇总】*【1+税点】
                          <!-- 对厂含税价：【【面料费用汇总+辅料费用汇总】*【1+毛利率】+工艺费用汇总+加工费用汇总+其他费用汇总】*【1+税点】 -->
                        </div>
                      </template>
                      <el-icon class='tw-color-warning'>
                        <QuestionFilled />
                      </el-icon>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <span>{{ factoryTaxAmount }} 元</span>
                <span>{{ getEstimateCheckPrice('totalCostExt') }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="colSpan">
              <el-form-item label="小单总成本" prop="smallOrderCostAmount">
                <template #label>
                  <span>
                    小单总成本
                    <el-tooltip
                      effect='dark'
                      placement='top'
                    >
                      <template #content>
                        <div>
                          小单总成本：【小单面料费用汇总+小单辅料费用汇总+小单工艺费用汇总+小单加工费用汇总+小单其他费用汇总】
                        </div>
                      </template>
                      <el-icon class='tw-color-warning'>
                        <QuestionFilled />
                      </el-icon>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <span>{{ smallOrderCostAmount }} 元</span>
              </el-form-item>
              <el-form-item label="小单不含税价" prop="smallOrderNoTaxAmount">
                <template #label>
                  <span>
                    小单不含税价
                    <el-tooltip
                      effect='dark'
                      placement='top'
                    >
                      <template #content>
                        <div>
                          小单不含税价：【小单面料费用汇总+小单辅料费用汇总】*【1+毛利率】+小单工艺费用汇总+小单加工费用汇总+小单其他费用汇总
                        </div>
                      </template>
                      <el-icon class='tw-color-warning'>
                        <QuestionFilled />
                      </el-icon>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <span>{{ smallOrderNoTaxAmount }} 元</span>
              </el-form-item>
              <el-form-item label="小单含税价" prop="smallOrderTaxAmount">
                <template #label>
                  <span>
                    小单含税价
                    <el-tooltip
                      effect='dark'
                      placement='top'
                    >
                      <template #content>
                        <div>
                          小单含税价：【【小单面料费用汇总+小单辅料费用汇总】*【1+毛利率】+小单工艺费用汇总+小单加工费用汇总+小单其他费用汇总】*【1+税点】
                        </div>
                      </template>
                      <el-icon class='tw-color-warning'>
                        <QuestionFilled />
                      </el-icon>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <span>{{ smallOrderTaxAmount }} 元</span>
              </el-form-item>
            </el-col>
          </el-row>
        </sc-detail-card>
      </el-form>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue';
import { ElForm, ElMessage, ElTable } from 'element-plus';
import NP from 'number-precision';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { YES_NO_ENUM } from '@/constant';
import { useMaterialCostTableColumns } from '../hooks/use-material-cost-table-columns';
import { useCalc } from '../hooks/calc';
import { IFormData } from '../hooks/use-detail';
import { useCaraftTableColumns } from '../hooks/use-caraft-table-columns';
import { useProcessTableColumns } from '../hooks/use-process-table-columns';
import { useDefaultItem } from '../hooks/use-default-item';
import {
  getProcessAmount,
} from '@/modules/style-data-manage/style-pricing/views/edit/hooks/calc-amount';
import {
  useOtherTableColumns,
} from '@/modules/style-data-manage/style-pricing/views/edit/hooks/use-other-table-columns';
import {
  checkPriceSaveTemporarily,
} from '@/modules/style-data-manage/style-pricing/api';
import {
  ICheckPriceDetailResCraftDemandCostInfoListItem,
  ICheckPriceDetailResMaterialCostInfoListItem,
  ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItem,
} from '@/modules/style-data-manage/style-pricing/api/types';
import {
  styleTemplatePage, styleTemplateDetail,
  sewingComponentTemplatePage,
  checkPriceGetProcessOtherBySkc,
  sewingComponentTemplateDetail
} from '@/modules/clothes-center/components/sew-require-card/api';
import {
  IStyleTemplateDetailResProcessStyleSewingsItem,
  ICheckPriceGetProcessOtherBySkcResProcessCostInfoListItem,
  ISewingComponentTemplateDetailResSewingProcessListItem,
  IStyleTemplateDetailResProcessStyleAnotherProcessItem
} from '@/modules/clothes-center/components/sew-require-card/api/types';
import { SHOW_TYPE_ENUM } from '@/modules/style-data-manage/style-pricing/constant';
import {
  getAccessoriesList, getMaterialList,
  getMaterialWasteTotalAmount,
} from '@/modules/style-data-manage/estimate-pricing/views/edit/hooks/calc-amount';
import { isEmpty } from '@toy/utils';

const props = defineProps({
  // 是否只读
  readOnly: {
    type: Boolean,
    required: false,
  },
  // 表单数据
  data: {
    type: Object,
    required: true,
  },
  // [加工费用]编辑状态
  modifyFlag: {
    type: Boolean,
    required: true,
  },
  // 是否编辑工艺费用, 默认true
  editProcessOtherFlag: {
    type: Boolean,
    required: true,
  },
  showType: {
    type: String,
    default: SHOW_TYPE_ENUM.DETAIL
  }
});

const emits = defineEmits(['update:data', 'update:editProcessOtherFlag', 'update:modifyFlag']);
const { readOnly } = toRefs(props);

const formData = computed({
  get(): IFormData {
    return props.data as IFormData;
  },
  set(val: IFormData) {
    emits('update:data', val);
  }
});

const btnModify = computed({
  get(): boolean {
    return props.modifyFlag as boolean;
  },
  set(val: boolean) {
    emits('update:modifyFlag', val);
  }
});

const { getDictionaryOptions } = useDictionary();
const processStepList = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_PROCESS_STEP));
const { processCostInfoItem } = useDefaultItem();

// 预估核价详情
const estimateCheckPriceDetailVo: any = computed(() => {
  return formData.value.estimateCheckPriceDetailVo || {};
});

// 获取对应字段的预估价格
const getEstimateCheckPrice = (prop: string) => {
  if (estimateCheckPriceDetailVo.value[prop] !== undefined) {
    return `（预估：${NP.round(estimateCheckPriceDetailVo.value[prop], 2)}元）`;
  }
  return '';
};

// 处理预估面料、辅料总价
const estimateMaterialCost = (type: string) => {
  const { materialCostInfoList = [] } = estimateCheckPriceDetailVo.value;
  // eslint-disable-next-line vue/max-len
  (materialCostInfoList).forEach((item: ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItem) => {
    item.price = item.bulkPrice || '';
    item.unit = item.bomMaterialType === '1' ? (item.saleUnit || '') : (item.minPriceUnit || '');
  });
  let total: number | string = '';
  if (materialCostInfoList?.length) {
    if (type === '1') {
      const materialList = getMaterialList(materialCostInfoList);
      // 面料总价
      total = NP.round((materialList || []).reduce((prev, cur) => {
        const totalAmount = getMaterialWasteTotalAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    } else {
      const accessoriesList = getAccessoriesList(materialCostInfoList);
      // // 辅料总价
      total = NP.round((accessoriesList || []).reduce((prev, cur) => {
        const totalAmount = getMaterialWasteTotalAmount(cur);
        return NP.plus(prev, !isEmpty(totalAmount) ? totalAmount : 0);
      }, 0), 2);
    }
  }

  return typeof total === 'number' ? `（预估：${total}元）` : '';
};

const colSpan = computed(() => {
  if (props.showType === SHOW_TYPE_ENUM.COMPARE) {
    return 24;
  }
  return 6;
});
// [面料费用]表格
const materialTableElRef = ref<InstanceType<typeof ElTable> | null>(null);
// [面料费用]列表勾选数据
const selectedMaterialCost = ref<ICheckPriceDetailResMaterialCostInfoListItem[]>([]);
// [面料费用]列表配置
const {
  tableColumns: materialCostTableColumns, materiaSmallOrderRate
} = useMaterialCostTableColumns('material', formData);
// [面料费用]列表勾选
const handleChangeMaterialCost = (rows: ICheckPriceDetailResMaterialCostInfoListItem[]) => {
  selectedMaterialCost.value = rows;
};

// [辅料费用] 表格
const accessoriesTableElRef = ref<InstanceType<typeof ElTable> | null>(null);
// [辅料费用]列表勾选数据
const selectedAccessoriesCost = ref<ICheckPriceDetailResMaterialCostInfoListItem[]>([]);
// [辅料费用]列表配置
const {
  tableColumns: accessoriesCostTableColumns, accessoriesSmallOrderRate
} = useMaterialCostTableColumns('accessories', formData);
// [辅料费用]列表勾选
const handleChangeAccessoriesCost = (rows: ICheckPriceDetailResMaterialCostInfoListItem[]) => {
  selectedAccessoriesCost.value = rows;
};

const {
  materialWasteTotalAmount,
  materialSmallWasteTotalAmount,
  accessoriesWasteTotalAmount,
  accessoriesSmallWasteTotalAmount,
  craftWasteTotalAmount,
  smallOrderCraftDemandCost,
  processTotalAmount,
  processSmallTotalAmount,
  processStepTotalAmountList,
  otherCostTotalAmount,
  smallOrderOtherCost,
  factoryCostAmount,
  factoryNoTaxAmount,
  factoryTaxAmount,
  profitAmount,
  bonusAmount,
  smallOrderCostAmount,
  smallOrderNoTaxAmount,
  smallOrderTaxAmount
} = useCalc(formData, materiaSmallOrderRate, accessoriesSmallOrderRate, readOnly, processStepList);

const formElRef = ref<InstanceType<typeof ElForm> | null>(null);
// 加工费用模版引用相关
const processTemplateId = ref(''); // 款式工序模板
const referComponentTemplateCode = ref(''); // 款式部件库
const skcTemplateId = ref(''); // 款式SKC
// [工艺费用] 表格
const processTableElRef = ref<InstanceType<typeof ElTable> | null>(null);
// [工艺费用]列表勾选数据
const selectedProcessFees = ref<ICheckPriceDetailResCraftDemandCostInfoListItem[]>([]);
// [工艺费用]列表配置
const { tableColumns } = useCaraftTableColumns({
  formData
});
// [工艺费用]列表勾选
const handleChangeProcessFees = (rows: ICheckPriceDetailResCraftDemandCostInfoListItem[]) => {
  selectedProcessFees.value = rows;
};

// [工艺费用] 编辑
const handleProcessModify = () => {
  btnModify.value = true;
  emits('update:editProcessOtherFlag', true);
};

const saveLoading = ref(false);

// [工艺费用] 暂存
const handleSave = async () => {
  try {
    saveLoading.value = true;
    await checkPriceSaveTemporarily({
      styleCode: formData.value.styleCode!,
      state: '100', // 状态 100暂存 110提交
      processCost: `${processTotalAmount.value}`,
      smallOrderProcessCost: `${processSmallTotalAmount.value}`,
      otherCost: `${otherCostTotalAmount.value}`,
      smallOrderOtherCost: `${otherCostTotalAmount.value}`,
      sewingCost: `${processStepTotalAmountList.value.find(v => v.stepCode === '02')?.amount || '0'}`, // 车缝费用
      cuttingCost: `${processStepTotalAmountList.value.find(v => v.stepCode === '01')?.amount || '0'}`, // 裁剪费用
      postProcessingCost: `${processStepTotalAmountList.value.find(v => v.stepCode === '04')?.amount || '0'}`, // 后道费用
      specialCost: `${processStepTotalAmountList.value.find(v => v.stepCode === '03')?.amount || '0'}`, // 专机/手工费用‌
      processCostInfoList: formData.value.processCostInfoList.map(v => ({
        ...v,
        // 后端说默认传1
        perPieceAmount: '1',
        orderSendingRate: formData.value.orderSendingRate, // 发单倍率
        smallOrderRate: formData.value.smallOrderRate, // 【加工费用】小单倍率
      })),
      otherCostInfoList: formData.value.otherCostInfoList,
    });
    btnModify.value = false;
    saveLoading.value = false;
    // 暂存成功后将该字段设为true，表示编辑过
    emits('update:editProcessOtherFlag', true);
  } catch (error) {
    saveLoading.value = false;
  }
};

// [工艺费用] 表格配置
const {
  tableColumns: processTableColumns,
  handleAddProcessingFees
} = useProcessTableColumns(formData, btnModify);

// [工艺费用] 款式工序模板引用
const handleReferenceStyle = async () => {
  if (!processTemplateId.value) {
    ElMessage.warning('请先选择款式工序模版');
    return;
  }
  const { data } = await styleTemplateDetail({
    id: processTemplateId.value,
  });
  const processStyleSewings = data?.processStyleSewings || [];
  const processStyleAnotherProcess = data?.processStyleAnotherProcess || [];
  if (!formData.value.processCostInfoList?.length) {
    formData.value.processCostInfoList = [];
  }
  // 添加其他类型内容
  processStyleAnotherProcess.forEach((item: IStyleTemplateDetailResProcessStyleAnotherProcessItem) => {
    const amount = item.price ? String(NP.round(item.price, 2)) : '';
    formData.value.processCostInfoList.push({
      ...processCostInfoItem,
      ...item,
      processName: item.processDescribe || '',
      price: amount,
      amount,
    });
  });
  // 款式添加为车缝内容
  processStyleSewings.forEach((item: IStyleTemplateDetailResProcessStyleSewingsItem) => {
    item.workingHour = item.estimatedTime || '';
    item.minutelyPay = item.minutelyPay || '0.35';
    item.processStepCode = '02';
    item.processStepName = '车缝';
    item.sewingType = item.plmSewingType || '';
    item.sewingTypeDesc = item.plmSewingName || '';
    item.processName = item.processDescribe || '';
    const amount = item.amount ? item.amount : getProcessAmount((item as any)) ?? '';
    item.amount = amount ? NP.round(amount, 2) : '';
    formData.value.processCostInfoList.push({
      ...processCostInfoItem,
      ...item,
    });
  });
};

// [工艺费用] 款式部件库引用
const handleReferenceParts = async () => {
  if (!referComponentTemplateCode.value) {
    ElMessage.warning('请先选择款式部件库');
    return;
  }
  // 追加内容
  const { data } = await sewingComponentTemplateDetail({
    sewingComponentTemplateId: referComponentTemplateCode.value,
  });
  const list: ISewingComponentTemplateDetailResSewingProcessListItem[] = data?.sewingProcessList || [];
  if (!formData.value.processCostInfoList?.length) {
    formData.value.processCostInfoList = [];
  }
  // 将对应部件内维护的车缝信息追加到加工费用
  list.forEach((item) => {
    item.processStepCode = '02';
    item.processStepName = '车缝';
    item.minutelyPay = item.minutelyPay || '0.35';
    item.sewingType = item.plmSewingType || '';
    item.sewingTypeDesc = item.plmSewingName || '';
    item.workingHour = item.estimatedTime || '';
    item.processName = item.processDescribe || '';
    const amount = item.amount ? item.amount : getProcessAmount((item as any)) ?? '';
    item.amount = amount ? NP.round(amount, 2) : '';
    formData.value.processCostInfoList.push({
      ...processCostInfoItem,
      ...item,
    });
  });
};

// [工艺费用] SKC引用
const handleReferenceSkc = async () => {
  if (!skcTemplateId.value) {
    ElMessage.warning('请先输入');
    return;
  }
  // 替换内容
  const { data } = await checkPriceGetProcessOtherBySkc({
    designCode: skcTemplateId.value,
  });
  const list: ICheckPriceGetProcessOtherBySkcResProcessCostInfoListItem[] = data?.processCostInfoList || [];
  if (!formData.value.processCostInfoList?.length) {
    formData.value.processCostInfoList = [];
  }
  formData.value.processCostInfoList = list.map((item) => {
    item.minutelyPay = item.processStepCode === '02' ? (item.minutelyPay || '0.35') : (item.minutelyPay || '');
    const amount = item.amount ? item.amount : getProcessAmount((item as any)) ?? '';
    item.amount = amount ? NP.round(amount, 2) : '';
    return {
      ...processCostInfoItem,
      ...item,
    };
  });
};

// [其他费用]
const {
  tableColumns: otherTableColumns,
  handleAddOtherCost
} = useOtherTableColumns(formData, btnModify);

// 获取表单的数据
const getFormData = () => {
  return {
    materialWasteTotalAmount,
    materialSmallWasteTotalAmount,
    accessoriesWasteTotalAmount,
    accessoriesSmallWasteTotalAmount,
    craftWasteTotalAmount,
    smallOrderCraftDemandCost,
    processTotalAmount,
    processSmallTotalAmount,
    processStepTotalAmountList,
    otherCostTotalAmount,
    smallOrderOtherCost,
    factoryCostAmount,
    factoryNoTaxAmount,
    factoryTaxAmount,
    profitAmount,
    bonusAmount,
    smallOrderCostAmount,
    smallOrderNoTaxAmount,
    smallOrderTaxAmount,
    materiaSmallOrderRate,
    accessoriesSmallOrderRate
  };
};

// 获取勾选的表格数据
const getSelectedTable = () => {
  return {
    selectedAccessoriesCost,
    selectedMaterialCost,
    selectedProcessFees
  };
};

// 重置否选项内容
const initSelectedTable = () => {
  // 重置勾选项
  selectedMaterialCost.value = [];
  selectedAccessoriesCost.value = [];
  selectedProcessFees.value = [];
  materialTableElRef.value?.clearSelection();
  accessoriesTableElRef.value?.clearSelection();
  processTableElRef.value?.clearSelection();
};

// 表单校验
const validateForm = () => {
  return new Promise((resolve, reject) => {
    formElRef.value?.validate((valid: any) => {
      if (valid) {
        resolve(true);
      } else {
        reject(new Error('表单验证失败!'));
      }
    });
  });
};

defineExpose({
  getFormData,
  getSelectedTable,
  initSelectedTable,
  validateForm,
});
</script>

<style lang="scss" scoped>
.reset-form-item-bottom {
  :deep(.el-form-item) {
    margin-bottom: 0;
    margin-right: 0;
  }
}
.reset-form-item-top {
  :deep(.el-form-item) {
    margin-top: 18px;
  }
  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }
}
.scroller {
  display: flex;
  flex-direction: column;
  flex: 1;
  .scroller_layout {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>
