<template>
  <sc-app-page :main="{ style: 'padding: 0' }">
    <template #main>
      <el-scrollbar class="tw-h-100%">
        <div class="tw-h-full tw-p-20px">
          <spu-info
            v-if="formData.skcInfoVo"
            :spu-info="formData.skcInfoVo"
            class="tw-mb-20px tw-border-1px tw-border-[var(--el-border-color)] tw-border-solid tw-rounded-4px tw-p-10px"
          />
          <el-form
            label-suffix="："
            label-width="130px"
            :model="formData"
            ref="formElRef"
          >
            <sc-detail-card
              title="面料费用"
              class="
                tw-border-1px tw-border-[var(--el-border-color)] tw-border-solid tw-rounded-4px
                tw-mb[20px] tw-p-10px!
              "
            >
              <template #button>
                <div class="tw-font-bold tw-text-16px">面料费用汇总：{{ materialWasteTotalAmount }} 元</div>
              </template>
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
              <template #button>
                <div class="tw-font-bold tw-text-16px">辅料费用汇总：{{accessoriesWasteTotalAmount}} 元</div>
              </template>
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
              <template #button>
                <div class="tw-font-bold tw-text-16px">工艺费用汇总：{{ craftWasteTotalAmount }} 元</div>
              </template>
              <sc-table
                height="100%"
                ref="processTableElRef"
                :data="formData.craftDemandCostInfoList"
                :columns="tableColumns"
                @selection-change="handleChangeProcessFees"
              />
            </sc-detail-card>
            <sc-detail-card
              title="加工费用"
              class="
                tw-border-1px tw-border-[var(--el-border-color)] tw-border-solid tw-rounded-4px
                tw-mb[20px] tw-p-10px!
              "
            >
              <template #button>
                <div class="tw-font-bold tw-text-16px">加工费用汇总：{{ processTotalAmount }} 元</div>
              </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="预估加工费用"
                    prop="processCost"
                    :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
                  >
                    <div class="tw-flex tw-w-full">
                      <input-number
                        v-model="formData.processCost"
                        :disabled="readOnly"
                        :precision="2"
                        :min="0"
                        :max="9999.99"
                      />
                      <span class="tw-ml[4px]">元</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </sc-detail-card>
            <sc-detail-card
              title="其他费用"
              class="
                tw-border-1px tw-border-[var(--el-border-color)] tw-border-solid tw-rounded-4px
                tw-mb[20px] tw-p-10px!
              "
            >
              <template #button>
                <div class="tw-font-bold tw-text-16px">其他费用汇总：{{ otherCostTotalAmount }} 元</div>
              </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="预估其他费用"
                    prop="otherCost"
                    :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
                  >
                    <div class="tw-flex tw-w-full">
                      <input-number
                        v-model="formData.otherCost"
                        :precision="2"
                        :disabled="readOnly"
                        :min="0"
                        :max="9999.99"
                      />
                      <span class="tw-ml[4px]">元</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </sc-detail-card>
            <sc-detail-card class="tw-mb[20px] tw-px-0! tw-py-0!">
              <template #extra>
                <div
                  class="tw-font-size-[var(--el-font-size-medium)] tw-font-700"
                >总价计算</div>
              </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="毛利率"
                    prop="profit"
                    :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
                  >
                    <input-number
                      v-model="formData.profit"
                      :disabled="readOnly"
                      :precision="2"
                      :min="0"
                      :max="100"
                    >
                      <template #suffix>%</template>
                    </input-number>
                  </el-form-item>
                  <el-form-item
                    label="税点"
                    prop="taxationRatio"
                    :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
                  >
                    <input-number
                      v-model="formData.taxationRatio"
                      :disabled="readOnly"
                      :precision="2"
                      :min="0"
                      :max="100"
                    >
                      <template #suffix>%</template>
                    </input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="利润" prop="profitAmount">
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
                  </el-form-item>
                  <el-form-item label="税费" prop="bonusAmount">
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
                  </el-form-item>
                </el-col>
                <el-col :span="8">
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
                  </el-form-item>
                </el-col>
              </el-row>
            </sc-detail-card>
          </el-form>
        </div>
      </el-scrollbar>
    </template>
    <template #ffooter>
      <div class="tw-w-full tw-flex tw-justify-end">
        <el-button
          type="success"
          v-if="!readOnly"
          :disabled="!selectedMaterialCost.length && !selectedAccessoriesCost.length && !selectedProcessFees.length"
          @click="handleInquiry"
        >
          询价
        </el-button>
        <el-button @click="handleGoBack">
          返回
        </el-button>
        <el-button
          type="primary"
          v-if="!readOnly"
          @click="handleSubmitForm"
        >
          提交
        </el-button>
      </div>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ElForm, ElTable } from 'element-plus';
import { useMaterialCostTableColumns } from './hooks/use-material-cost-table-columns';
import { useDetail } from './hooks/use-detail';
import { useCalc } from './hooks/calc';
import { useCaraftTableColumns } from './hooks/use-caraft-table-columns';
import { estimateCheckPriceSave } from '@/modules/style-data-manage/estimate-pricing/api';
import {
  IEstimateCheckPriceSaveReqCraftDemandCostInfoListItem,
  IEstimateCheckPriceSaveReqMaterialCostInfoListItem
} from '@/modules/style-data-manage/estimate-pricing/api/types';
import NP from 'number-precision';
import { QuestionFilled } from '@element-plus/icons-vue';
import { DETAIL_AIM_ENUM } from '@/modules/style-data-manage/constant';
import { ElMessage } from 'element-plus';
import { checkPriceInquiryPrice } from '@/modules/style-data-manage/style-pricing/api';
import SpuInfo from '@/modules/style-data-manage/components/spu-info/index.vue';

const router = useRouter();
const route = useRoute();

const formElRef = ref<InstanceType<typeof ElForm> | null>(null);
const { formData } = useDetail();
const readOnly = computed(() => route.query.type === DETAIL_AIM_ENUM.VISIT);
const {
  materialWasteTotalAmount,
  accessoriesWasteTotalAmount,
  craftWasteTotalAmount,
  processTotalAmount,
  otherCostTotalAmount,
  factoryCostAmount,
  factoryNoTaxAmount,
  factoryTaxAmount,
  profitAmount,
  bonusAmount,
} = useCalc(formData, readOnly);

// [面料费用]表格
const materialTableElRef = ref<InstanceType<typeof ElTable> | null>(null);
// [面料费用]列表勾选数据
const selectedMaterialCost = ref<any[]>([]);
// [面料费用]列表配置
const { tableColumns: accessoriesCostTableColumns } = useMaterialCostTableColumns({
  type: 'accessories',
  readOnly
});
// [面料费用]列表勾选
const handleChangeMaterialCost = (rows: any[]) => {
  selectedMaterialCost.value = rows;
};

// [辅料费用]表格
const accessoriesTableElRef = ref<InstanceType<typeof ElTable> | null>(null);
// [辅料费用]列表勾选数据
const selectedAccessoriesCost = ref<any[]>([]);
// [辅料费用]列表配置
const { tableColumns: materialCostTableColumns } = useMaterialCostTableColumns({
  type: 'material',
  readOnly
});
// [辅料费用]列表勾选
const handleChangeAccessoriesCost = (rows: any[]) => {
  selectedAccessoriesCost.value = rows;
};

// [工艺费用]表格
const processTableElRef = ref<InstanceType<typeof ElTable> | null>(null);
// [工艺费用]列表勾选数据
const selectedProcessFees = ref<any[]>([]);
// [工艺费用]列表配置
const { tableColumns } = useCaraftTableColumns({
  readOnly,
  formData
});
// [工艺费用]列表勾选
const handleChangeProcessFees = (rows: any[]) => {
  selectedProcessFees.value = rows;
};

// 发起询价
const handleInquiry = async () => {
  const bomMaterialList = [
    ...selectedAccessoriesCost.value,
    ...selectedMaterialCost.value,
  ];
  const craftDemandList = selectedProcessFees.value;
  // 过期并且不在询价中的面辅料
  await checkPriceInquiryPrice({
    checkPriceId: formData.value.estimateCheckPriceId!,
    bomId: formData.value.bomId!,
    bomMaterialIdList: bomMaterialList.map(item => item.bomMaterialId),
    craftDemandIdList: craftDemandList.map(item => item.craftDemandId),
    checkType: '0'
  });
  // 发起后，更新询价状态
  bomMaterialList.forEach((item) => {
    item.inquiryState = '1';
  });
  craftDemandList.forEach((item) => {
    item.inquiryState = '1';
  });
  ElMessage.success('询价发起成功');
  // 重置勾选项
  selectedMaterialCost.value = [];
  selectedAccessoriesCost.value = [];
  selectedProcessFees.value = [];
  materialTableElRef.value?.clearSelection();
  accessoriesTableElRef.value?.clearSelection();
  processTableElRef.value?.clearSelection();
};

// 返回
const handleGoBack = () => {
  router.push({
    name: 'StyleDataManageEstimatePricingList'
  });
};

// 提交
const handleSubmitForm = async () => {
  await formElRef.value?.validate();
  await estimateCheckPriceSave({
    estimateCheckPriceId: formData.value.estimateCheckPriceId!,
    bomId: formData.value.bomId!,
    materialCostInfoList: ([
      ...formData.value.materialList.map(v => ({
        ...v,
        waste: `${NP.divide(v.waste!, 100)}`,
      })),
      ...formData.value.accessoriesList.map(v => ({
        ...v,
        waste: `${NP.divide(v.waste!, 100)}`,
      })),
    ]).map(item => ({
      ...item,
      attritionRate: String(NP.divide(item.attritionRate!, 100)),
    })) as IEstimateCheckPriceSaveReqMaterialCostInfoListItem[],
    craftDemandCostInfoList: formData.value.craftDemandCostInfoList.map(item => ({
      ...item,
      waste: String(NP.divide(item.waste!, 100)),
    })) as IEstimateCheckPriceSaveReqCraftDemandCostInfoListItem[],
    otherCost: formData.value.otherCost,
    processCost: formData.value.processCost,
    /**
     * 二次工艺总价（元）
     */
    craftDemandCost: `${craftWasteTotalAmount.value}`,
    /**
     * 总价不加成（元）-- 对厂不含税价
     */
    totalCost: `${factoryNoTaxAmount.value}`,
    /**
     * 利润点（%）（小数点两位） 毛利率
     */
    profit: String(NP.divide(formData.value.profit!, 100)),
    /**
      * 加成点（%）（小数点两位） 利润率
      */
    taxationRatio: String(NP.divide(formData.value.taxationRatio!, 100)),
    /**
     * 总加加成 -- 对厂含税价
     */
    totalCostExt: `${factoryTaxAmount.value}`,
    /**
     * 总成本（不算损耗）【面料费用汇总+辅料费用汇总+工艺费用汇总+加工费用汇总+其他费用汇总】
     */
    pureTotalCost: `${factoryCostAmount.value}`,
    /**
     * 利润(成本)
     */
    profitCost: `${profitAmount.value}`,
    /**
     * 加成费用
     */
    taxationCost: `${bonusAmount.value}`,
    /**
     * 物料总价（元）
     */
    materialCost: `${NP.plus(materialWasteTotalAmount.value, accessoriesWasteTotalAmount.value)}`,
  });
  setTimeout(() => {
    handleGoBack();
  }, 1000);
};

</script>
