<template>
  <sc-app-page :main="{ style: 'padding:0px' }">
    <template #header>
      <HeaderArea class="tw-px-20px tw-pt-20px">
        <template #button>
          <el-button
            type="primary"
            v-if="XZZY"
            @click="handleDownload"
          >
            下载纸样
          </el-button>
        </template>
      </HeaderArea>
    </template>
    <template #main>
      <div class='tw-h-full'>
        <div class="container">
          <skc-info
            v-if="formData.skcInfoVo"
            :skc-info="formData.skcInfoVo"
          />
          <div class="detail_layout">
            <div class="panel">
              <template v-if="readOnly">
                <div class='tw-flex tw-flex-items-start tw-gap-10px' v-if="versions.length">
                  <el-form-item label='核价版本：'>
                    <el-select
                      class="tw-w-150px"
                      :model-value="formData.checkPriceId"
                      @change="handleChangeCurrentVersion"
                    >
                      <el-option
                        v-for="(item) in versions"
                        :key="item.checkPriceId"
                        :value="item.checkPriceId!"
                        :label="`版本${item.versionNum}`"
                      />
                    </el-select>
                  </el-form-item>
                  <el-radio-group
                    :model-value="showType"
                    @change="(val: any) => handleChangeShowType(val)"
                  >
                    <el-radio-button
                      v-for="item in SHOW_TYPE_LIST"
                      :value="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="tw-pb-10px tw-text-16px tw-font-bold">
                  {{$filters.formatTime(formData.finishTime)}}
                  {{formData.pricerName}}
                </div>
              </template>
              <pricing-form
                ref="pricingFormRef"
                :readOnly="readOnly"
                :data="formData"
                v-model:modifyFlag="modifyFlag"
                v-model:editProcessOtherFlag="editProcessOtherFlag"
                :showType="showType"
              />
            </div>
            <div class="panel" v-if="showType === SHOW_TYPE_ENUM.COMPARE">
              <div class='tw-flex tw-flex-items-start tw-gap-10px'>
                <el-form-item label='核价版本：'>
                  <el-select
                    class="tw-w-150px"
                    :model-value="compareDetail.checkPriceId"
                    @change="handleChangeCompareVersion"
                  >
                    <el-option
                      v-for="(item) in versions"
                      :key="item.checkPriceId"
                      :value="item.checkPriceId!"
                      :label="`版本${item.versionNum}`"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="tw-pb-10px tw-text-16px tw-font-bold">
                {{$filters.formatTime(compareDetail.finishTime)}}
                {{compareDetail.pricerName}}
              </div>
              <pricing-form
                :readOnly="readOnly"
                :data="compareDetail"
                v-model:modifyFlag="modifyFlag"
                v-model:editProcessOtherFlag="editProcessOtherFlag"
                :showType="showType"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #ffooter>
      <div class="tw-w-full tw-flex tw-justify-end">
        <el-button
          type="success"
          :disabled="
            !selectedMaterialCostList.length && !selectedAccessoriesCostList.length && !selectedProcessFeesList.length
          "
          @click="handleInquiry"
          v-if="!readOnly"
        >
          询价
        </el-button>
        <el-button @click="handleGoBack">
          返回
        </el-button>
        <el-button
          type="primary"
          @click="handleSubmitForm"
          v-if="!readOnly"
        >
          提交
        </el-button>
      </div>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import {
  ICheckPriceSaveReqMaterialCostInfoListItem,
  ICheckPriceSaveReqCraftDemandCostInfoListItem,
  ICheckPriceGetVersionsRes
} from '@/modules/style-data-manage/style-pricing/api/types';
import { useDetail } from './hooks/use-detail';
import {
  checkPriceInquiryPrice,
  checkPriceSave,
  checkPricePatternDownload,
  checkPriceGetVersions
} from '@/modules/style-data-manage/style-pricing/api';
import NP from 'number-precision';
import { usePermissionConfig } from '../../use-permission-config';
import pricingForm from './components/form-data.vue';
import SkcInfo from '@/modules/style-data-manage/components/skc-info/index.vue';
import { DETAIL_AIM_ENUM } from '@/modules/style-data-manage/constant';
import { SHOW_TYPE_LIST, SHOW_TYPE_ENUM } from '@/modules/style-data-manage/style-pricing/constant';
import { handleDownLoadFile } from '@/core/utils/download';

const { formData, modifyFlag, editProcessOtherFlag, getDetail, compareDetail } = useDetail();
const { XZZY } = usePermissionConfig();

const router = useRouter();
const route = useRoute();
const readOnly = computed(() => route.query.type === DETAIL_AIM_ENUM.VISIT);

const pricingFormRef = ref();
const versions = ref<ICheckPriceGetVersionsRes>([]);
const showType = ref(SHOW_TYPE_ENUM.DETAIL);

// 对比版本获取内容
const handleChangeCompareVersion = async (checkCountId: string) => {
  compareDetail.value = await getDetail(checkCountId);
};

// 切换详情/对比
const handleChangeShowType = async (val: SHOW_TYPE_ENUM) => {
  if (val === SHOW_TYPE_ENUM.COMPARE) {
    const id = versions.value.find(v => v.checkPriceId !== formData.value.checkPriceId)?.checkPriceId!;
    await handleChangeCompareVersion(id!);
  }
  showType.value = val;
};
// 选择版本查看
const handleChangeCurrentVersion = async (checkPriceId: string) => {
  formData.value = await getDetail(checkPriceId);
};

// 下载纸样
const handleDownload = async () => {
  const { data } = await checkPricePatternDownload({
    styleCode: formData.value.styleCode!,
    designCode: formData.value.designCode!,
  });
  if (data.length) {
    data.forEach((item) => {
      handleDownLoadFile(item.patternUrl!, item.patternName!);
    });
  }
};

// [辅料费用]
const selectedAccessoriesCostList = computed(() => {
  if (pricingFormRef.value) {
    const { selectedAccessoriesCost } = pricingFormRef.value.getSelectedTable();
    return selectedAccessoriesCost.value;
  }
  return [];
});

// [面料费用]
const selectedMaterialCostList = computed(() => {
  if (pricingFormRef.value) {
    const { selectedMaterialCost } = pricingFormRef.value.getSelectedTable();
    return selectedMaterialCost.value;
  }
  return [];
});

// [工艺费用]
const selectedProcessFeesList = computed(() => {
  if (pricingFormRef.value) {
    const { selectedProcessFees } = pricingFormRef.value.getSelectedTable();
    return selectedProcessFees.value;
  }
  return [];
});
// 发起询价
const handleInquiry = async () => {
  const bomMaterialList = [
    ...selectedAccessoriesCostList.value,
    ...selectedMaterialCostList.value,
  ];
  const craftDemandList = selectedProcessFeesList.value;
  // 过期并且不在询价中的面辅料
  await checkPriceInquiryPrice({
    checkPriceId: formData.value.checkPriceId!,
    bomId: formData.value.bomId!,
    bomMaterialIdList: bomMaterialList.map(item => item.bomMaterialId),
    craftDemandIdList: craftDemandList.map((item: any) => item.craftDemandId),
    checkType: '1',
  });
  // 发起后，更新询价状态
  bomMaterialList.forEach((item) => {
    item.inquiryState = '1';
  });
  craftDemandList.forEach((item: any) => {
    item.inquiryState = '1';
  });
  ElMessage.success('询价发起成功');
  pricingFormRef.value.initSelectedTable();
};

// 返回
const handleGoBack = () => {
  router.push({
    name: 'StyleDataManageStylePeicingList'
  });
};

// 提交
const handleSubmitForm = async () => {
  try {
    await pricingFormRef.value?.validateForm();
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
      smallOrderTaxAmount,
      materiaSmallOrderRate,
      accessoriesSmallOrderRate
    } = pricingFormRef.value.getFormData();
    await checkPriceSave({
      processCostInfoList: formData.value.processCostInfoList.map(v => ({
        ...v,
        // 后端说默认传1
        perPieceAmount: '1',
        orderSendingRate: formData.value.orderSendingRate, // 发单倍率
        smallOrderRate: formData.value.smallOrderRate, // 【加工费用】小单倍率
      })),
      materialCostInfoList: ([
        ...formData.value.materialList,
        ...formData.value.accessoriesList
      ]).map(item => ({
        ...item,
        // eslint-disable-next-line vue/max-len
        smallOrderRate: item.bomMaterialType === '1' ? materiaSmallOrderRate.value : accessoriesSmallOrderRate.value, // 大标题上的小单倍率直接传
        smallOrderWaste: String(NP.divide(item.smallOrderWaste!, 100)), // 小单损耗
        waste: String(NP.divide(item.waste!, 100)), // 损耗
      })) as ICheckPriceSaveReqMaterialCostInfoListItem[],
      craftDemandCostInfoList: formData.value.craftDemandCostInfoList.map(item => ({
        ...item,
        waste: String(NP.divide(item.waste!, 100)), // 损耗
      })) as ICheckPriceSaveReqCraftDemandCostInfoListItem[],
      otherCostInfoList: formData.value.otherCostInfoList,
      bomId: formData.value.bomId!,
      designCode: formData.value.designCode,
      checkPriceId: formData.value.checkPriceId!,
      styleCode: formData.value.styleCode,
      taxationRatio: `${NP.divide(formData.value.taxationRatio!, 100)}`, // 加成点
      /**
     * 其他费用（元）
     */
      otherCost: `${otherCostTotalAmount.value}`,
      /**
     * 物料总价（元）
     */
      materialCost: `${NP.plus(materialWasteTotalAmount.value, accessoriesWasteTotalAmount.value)}`,
      /**
     * 加工总价（元）
     */
      processCost: `${processTotalAmount.value}`,
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
     * 小单总成本
     */
      smallOrderPureTotalCost: `${smallOrderCostAmount.value}`,
      /**
     * 小单总价不加成
     */
      smallOrderTotalCost: `${smallOrderNoTaxAmount.value}`,
      /**
     * 小单总价加成
     */
      smallOrderTotalCostExt: `${smallOrderTaxAmount.value}`,
      /**
     * 发单倍率
     */
      orderSendingRate: formData.value.orderSendingRate,
      /**
     * 小单物料总价
     */
      smallOrderMaterialCost: `${NP.plus(materialSmallWasteTotalAmount.value, accessoriesSmallWasteTotalAmount.value)}`,
      /**
     * 小单工艺总价
     */
      craftSamllOrderCost: `${craftWasteTotalAmount.value}`,
      /**
     * 小单工序总价
     */
      smallOrderProcessCost: `${processSmallTotalAmount.value}`,
      /**
     * 小单其他费用
     */
      smallOrderOtherCost: `${smallOrderOtherCost.value}`,
      smallOrderCraftDemandCost: `${smallOrderCraftDemandCost.value || '0'}`, // 小单二次工艺成本价(元)
      smallOrderFabricsCost: `${materialSmallWasteTotalAmount.value}`, // 小单面料费用
      smallOrderAccessoriesCost: `${accessoriesSmallWasteTotalAmount.value}`, // 小单辅料费用
      fabricsCost: `${materialWasteTotalAmount.value}`, // 面料费用汇总
      accessoriesCost: `${accessoriesWasteTotalAmount.value}`, // 辅料费用汇总
      cuttingCost: `${processStepTotalAmountList.value.find((v: any) => v.stepCode === '01')?.amount || '0'}`, // 裁剪费用
      sewingCost: `${processStepTotalAmountList.value.find((v: any) => v.stepCode === '02')?.amount || '0'}`, // 车缝费用
      // eslint-disable-next-line vue/max-len
      specialCost: `${processStepTotalAmountList.value.find((v: any) => v.stepCode === '03')?.amount || '0'}`, // 专机/手工费用‌
      // eslint-disable-next-line vue/max-len
      postProcessingCost: `${processStepTotalAmountList.value.find((v: any) => v.stepCode === '04')?.amount || '0'}`, // 后道费用
      editProcessOther: editProcessOtherFlag.value, // 是否点过编辑工艺费用按钮
    });
    ElMessage.success('保存成功');
    setTimeout(() => {
      handleGoBack();
    }, 1000);
  } catch (error) {
    ElMessage.error('请检查填写后提交');
  }
};

// 获取数据
const getDetailInfo = async () => {
  const id = route.params.id as string;
  formData.value = await getDetail(id);
};

const init = async () => {
  await getDetailInfo();
  if (readOnly.value) {
    const { data: versionData } = await checkPriceGetVersions({
      designCode: formData.value.designCode!
    });
    versions.value = versionData;
  }
};

init();
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  box-sizing:  border-box;
  .detail_layout {
    display: flex;
    gap: 0 15px;
    min-height: 0;
    margin-top: 30px;
    .panel {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }
  }
}
</style>
