<template>
  <sc-app-page :main="{ style: 'padding: 0' }">
    <template #header>
      <HeaderArea class="tw-px-20px tw-pt-20px">
        <div class="tw-text-18px tw-font-bold">用量核算</div>
        <template #button>
          <el-button
            type="primary"
            v-if="XZZY"
            @click="downloadPattern"
          >
            下载纸样
          </el-button>
        </template>
      </HeaderArea>
    </template>
    <template #main>
      <el-form
        ref="formEl"
        class='tw-h-full'
        :model="detail"
        scroll-to-error
      >
        <div class="container">
          <skc-info :skc-info="detail.skcInfoVo" />
          <div class="detail_layout">
            <div class="panel">
              <template v-if="readOnly && versions.length !== 0">
                <div class='tw-flex tw-flex-items-start tw-gap-10px'>
                  <el-form-item label='用量版本：'>
                    <el-select
                      class="tw-w-150px"
                      :model-value="detail.checkCountId"
                      @change="handleChangeCurrentVersion"
                    >
                      <el-option
                        v-for="item in versions"
                        :key="item.checkCountId"
                        :value="item.checkCountId"
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
                  {{$filters.formatTime(detail.finishTime)}}
                  {{detail.checkerName}}
                </div>
              </template>
              <content
                :detail="detail"
                :read-only="readOnly"
                :PLM_SPECIAL_ACCESSORIES_NUMBER="PLM_SPECIAL_ACCESSORIES_NUMBER"
              />
            </div>
            <div class="panel" v-if="showType === SHOW_TYPE_ENUM.COMPARE">
              <div class='tw-flex tw-flex-items-start tw-gap-10px'>
                <el-form-item label='用量版本：'>
                  <el-select
                    class="tw-w-150px"
                    :model-value="compareDetail.checkCountId"
                    @change="handleChangeCompareVersion"
                  >
                    <el-option
                      v-for="item in versions"
                      :key="item.checkCountId"
                      :value="item.checkCountId"
                      :label="`版本${item.versionNum}`"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="tw-pb-10px tw-text-16px tw-font-bold">
                {{$filters.formatTime(compareDetail.finishTime)}}
                {{compareDetail.checkerName}}
              </div>
              <content
                :detail="compareDetail"
                :read-only="readOnly"
                :PLM_SPECIAL_ACCESSORIES_NUMBER="PLM_SPECIAL_ACCESSORIES_NUMBER"
              />
            </div>
          </div>
        </div>
      </el-form>
    </template>
    <template #ffooter>
      <div class="tw-flex tw-flex-justify-center tw-w-100%">
        <el-button
          size="default"
          @click="handleCancel"
        >返回</el-button>
        <el-button
          type="primary"
          size="default"
          @click="handleSubmit"
          v-if="!readOnly"
        >提交</el-button>
      </div>
    </template>
  </sc-app-page>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { IDetail } from './types';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import {
  checkCountGetVersions,
  getDosageInfo,
  getDosageLatestInfo,
  patternClothesDownload,
  updateDosageInfo
} from '../../api';
import { CRAFTS_REQUIRE_ENUM, MATERIAL_DEMAND_TYPE_ENUM } from '../../constant';
import { ICheckCountGetVersionsRes, IUpdateDosageInfoReq } from '../../api/types';
import { useRoute, useRouter } from 'vue-router';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { divide, times } from 'number-precision';
import { isEmpty } from '@/modules/distribute-room-manage/utils';
import { ASIDE_TYPE_ENUM } from '../list/constant';
import { handleDownLoadFile } from '@/core/utils/download';
import { usePermissionConfig } from '../../use-permission-config';
import SkcInfo from '@/modules/style-data-manage/components/skc-info/index.vue';
import Content from './components/content/index.vue';

enum SHOW_TYPE_ENUM {
  /** 详情 */
  DETAIL = '1',
  /** 对比 */
  COMPARE = '2'
}
const SHOW_TYPE_LIST = [
  {
    label: '详情',
    value: SHOW_TYPE_ENUM.DETAIL
  },
  {
    label: '对比',
    value: SHOW_TYPE_ENUM.COMPARE
  }
];

const $route = useRoute();
const $router = useRouter();
const { XZZY } = usePermissionConfig();
const readOnly = computed(() => $route.name === 'StyleDataManageDosageAccountDetail');
const showType = ref(SHOW_TYPE_ENUM.DETAIL);
const type = computed(() => $route.query.type as ASIDE_TYPE_ENUM);
const { getDictionaryOptions, getDictionaryOptionsSync } = useDictionary();
const PLM_PROCESS_SEQUENCE = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_PROCESS_SEQUENCE));
const PLM_SPECIAL_ACCESSORIES_NUMBER = ref<IDictionaryItem[]>([]);
const getAccessoriesNumber = async () => {
  PLM_SPECIAL_ACCESSORIES_NUMBER.value = await getDictionaryOptionsSync(
    DICTIONARY_KEY.PLM_SPECIAL_ACCESSORIES_NUMBER
  );
};
const formEl = ref<InstanceType<typeof ElForm>>();
const versions = ref<ICheckCountGetVersionsRes>([]);
const detail = ref<IDetail>({
  craftList: [],
  normalMaterialList: [],
  specialMaterialList: [],
  customerPictureList: [],
  markFramePictureList: [],
  materialCraftList: [],
  bomOrderMaterialList: []
});
const compareDetail = ref<IDetail>({
  craftList: [],
  normalMaterialList: [],
  specialMaterialList: [],
  customerPictureList: [],
  markFramePictureList: [],
  materialCraftList: [],
  bomOrderMaterialList: []
});
const handleChangeShowType = async (val: SHOW_TYPE_ENUM) => {
  if (val === SHOW_TYPE_ENUM.COMPARE) {
    let id = versions.value.find(v => v.checkCountId !== detail.value.checkCountId)?.checkCountId!;
    if (isEmpty(id)) {
      id = detail.value.checkCountId!;
    }
    await handleChangeCompareVersion(id);
  }
  showType.value = val;
};
const handleChangeCurrentVersion = async (checkCountId: string) => {
  detail.value = await getInfoData(checkCountId);
};
const handleChangeCompareVersion = async (checkCountId: string) => {
  compareDetail.value = await getInfoData(checkCountId);
};
const handleCancel = () => {
  $router.push({
    name: 'StyleDataManageDosageAccountList',
    query: {
      type: type.value
    },
  });
};
const handleSubmit = async () => {
  await formEl.value?.validate();
  // 删除特辅ID集合
  const deleteIdList: string[] = [];
  // 新增特辅信息
  const saveList: IUpdateDosageInfoReq['saveList'] = [];
  // 更新的物料信息 包括特辅
  const updateList: IUpdateDosageInfoReq['updateList'] = [];
  /** 判断数据与原始数据是否有差异 */
  const hasDiff = (
    oldData: IDetail['specialMaterialList'][0],
    newData: IDetail['specialMaterialList'][0]
  ) => {
    return JSON.stringify(oldData) !== JSON.stringify(newData);
  };
  detail.value?.bomOrderMaterialList.forEach((v) => {
    if (v.demandType === MATERIAL_DEMAND_TYPE_ENUM.SPECIAL_ACCESSORY) {
      const row = detail.value?.specialMaterialList
        .find(it => it.bomMaterialId === v.bomMaterialId);
      if (row) {
        updateList.push({
          bomMaterialId: row.bomMaterialId!,
          widthConfirm: row.widthConfirm!,
          dosageAccount: row.dosageAccount!,
          dosageAccountUnit: row.dosageAccountUnit!,
          attritionRate: `${divide(row.attritionRate!, 100)}`
        });
        // if (hasDiff(row, v)) {
        // }
      } else {
        deleteIdList.push(v.bomMaterialId!);
      }
    } else {
      const row = detail.value?.normalMaterialList
        .find(it => it.bomMaterialId === v.bomMaterialId);
      if (row) {
        updateList.push({
          bomMaterialId: row.bomMaterialId!,
          widthConfirm: row.widthConfirm!,
          dosageAccount: row.demandType === MATERIAL_DEMAND_TYPE_ENUM.FABRIC
            ? `${divide(row.dosageAccount!, 100)}` : row.dosageAccount!,
          dosageAccountUnit: row.demandType === MATERIAL_DEMAND_TYPE_ENUM.FABRIC
            ? '米' : row.dosageAccountUnit!,
          attritionRate: `${divide(row.attritionRate!, 100)}`
        });
        // if (hasDiff(row, v)) {
        // }
      }
    }
  });
  detail.value?.specialMaterialList.forEach((v) => {
    if (!detail.value?.bomOrderMaterialList.some(it => it.bomMaterialId === v.bomMaterialId)) {
      const nameCode = PLM_SPECIAL_ACCESSORIES_NUMBER.value.find(it => it.label === v.prototypeMaterialName)?.value!;
      saveList.push({
        checkCountUnitId: '',
        name: v.prototypeMaterialName!,
        nameCode,
        spuId: v.commodityId!,
        spuCode: v.commodityCode!,
        spuName: v.commodityName!,
        skuId: v.skuId!,
        skuCode: v.skuCode!,
        supplierId: v.supplierId!,
        supplierName: v.supplierName!,
        supplierCode: v.supplierCode!,
        invoiceState: v.invoiceState!,
        packNumber: v.packNumber!,
        packUnitName: v.packUnitName!,
        packAssistantUnitName: v.packAssistantUnitName!,
        minPrice: v.minPrice!,
        minPriceUnit: v.minPriceUnit!,
        commodityNumber: v.commodityNumber!,
        spuCityName: v.spuCityName!,
        skuAttrs: v.skuAttrs!,
        saleUnit: v.saleUnit!,
        pictureList: v.matchPictureList!,
        purchasePrice: v.purchasePrice!,
        skuPrice: v.skuPrice!,
        priceReplyTime: v.priceReplyTime!,
        priceInvalidTime: v.priceInvalidTime!,
        samplePurchasingCycle: v.samplePurchasingCycle!,
        bulkPurchasingCycle: v.bulkPurchasingCycle!,
        cuttingMethod: v.cuttingMethod!,
        partUse: v.partUse?.length ? v.partUse.join() : '',
        dosageAccount: v.dosageAccount!,
        dosageAccountUnit: v.dosageAccountUnit!,
        attritionRate: `${divide(v.attritionRate!, 100)}`
      });
    }
  });
  await updateDosageInfo({
    designCode: detail.value!.designCode!,
    bomId: detail.value!.bomId!,
    updateList,
    saveList,
    deleteIdList,
    checkCountId: detail.value!.checkCountId!,
    craftDosageAccountList: detail.value!.materialCraftList.map(v => ({
      thirdPartyCraftDemandId: v.thirdPartyCraftDemandId!,
      craftDemandId: v.craftDemandId!,
      bomMaterialId: v.bomMaterialId!,
      craftDosageAccount: v.craftDosageAccount!,
      unit: v.bulkUnit!,
      craftWaste: `${divide(v.craftWaste!, 100)}`,
      craftsProcessCode: v.craftsProcessCode!,
      craftsProcessName: PLM_PROCESS_SEQUENCE.value.find(it => it.value === v.craftsProcessCode)!.label!,
    })),
    markFramePictureList: detail.value!.markFramePictureList!.map(v => v.url)!,
  });
  ElMessage.success('提交成功');
  $router.push({
    name: 'StyleDataManageDosageAccountList',
    query: {
      type: type.value
    },
  });
};
const downloadPattern = async () => {
  const { data } = await patternClothesDownload({
    styleCode: detail.value!.styleCode!,
    designCode: detail.value.designCode!
  });
  handleDownLoadFile(data.patternUrl!, data.patternName!);
};
const getInfoData = async (checkCountId: string) => {
  const api = readOnly.value ? getDosageInfo : getDosageLatestInfo;
  const { data } = await api({
    checkCountId,
  });
  const materialCraftList = data.materialCraftList.map(v => ({
    ...v,
    // 裁前默认是1
    craftsProcessCode: v.craftsRequire === CRAFTS_REQUIRE_ENUM.BEFORE ? '1' : (v.craftsProcessCode || ''),
    craftsProcessName: v.craftsRequire === CRAFTS_REQUIRE_ENUM.BEFORE ? '裁前' : (v.craftsProcessName || ''),
    craftWaste: isEmpty(v.craftWaste) ? '0' : `${times(v.craftWaste!, 100)}`,
    craftDosageAccount: isEmpty(v.craftDosageAccount) ? '1' : v.craftDosageAccount
  }));
  return {
    ...data,
    materialCraftList,
    markFramePictureList: data.markFramePictureList!.map(url => ({
      url
    })),
    bomOrderMaterialList: data.bomOrderMaterialList
      .map((v) => {
        let skuAttrsFormat = [];
        let materialFormat = [];
        try {
          skuAttrsFormat = JSON.parse(v.skuAttrs!);
        } catch (error) {
          console.log('error');
        }
        try {
          materialFormat = JSON.parse(v.material!);
        } catch (error) {
          console.log('error');
        }
        let { dosageAccount } = v;
        /** 面料回显需要乘以100 */
        if (!isEmpty(dosageAccount) && v.demandType === MATERIAL_DEMAND_TYPE_ENUM.FABRIC) {
          dosageAccount = `${times(v.dosageAccount!, 100)}`;
        }
        return {
          ...v,
          dosageAccount,
          dosageAccountUnit: v.saleUnit,
          skuAttrsFormat,
          materialFormat,
        };
      }),
    specialMaterialList: data.bomOrderMaterialList
      .filter(v => v.demandType === MATERIAL_DEMAND_TYPE_ENUM.SPECIAL_ACCESSORY)
      .map((v) => {
        let skuAttrsFormat = [];
        try {
          skuAttrsFormat = JSON.parse(v.skuAttrs!);
        } catch (error) {
          console.log('error');
        }
        let { attritionRate } = v;
        if (isEmpty(attritionRate) && !readOnly.value) {
          attritionRate = '5';
        } else {
          attritionRate = `${times(v.attritionRate!, 100)}`;
        }
        return {
          ...v,
          spuId: '',
          attritionRate,
          dosageAccountUnit: v.saleUnit,
          skuAttrsFormat,
          partUse: v.partUse && typeof v.partUse === 'string' ? v.partUse?.split(',') : [],
        };
      }),
    normalMaterialList: data.bomOrderMaterialList
      .filter(v => v.demandType !== MATERIAL_DEMAND_TYPE_ENUM.SPECIAL_ACCESSORY)
      .map((v) => {
        let skuAttrsFormat = [];
        let materialFormat = [];
        let { attritionRate = '' } = v;
        if (isEmpty(v.attritionRate)) {
          if (!readOnly.value) {
            if (v.demandType === MATERIAL_DEMAND_TYPE_ENUM.FABRIC) {
              const [,, category2] = v.categoryName?.split('[-]') || [];
              if (category2 === '针织') {
                attritionRate = '10';
              } else if (category2 === '梭织') {
                attritionRate = '8';
              }
            } else {
              attritionRate = '5';
            }
          }
        } else {
          attritionRate = `${times(v.attritionRate!, 100)}`;
        }
        try {
          skuAttrsFormat = JSON.parse(v.skuAttrs!);
        } catch (error) {
          console.log('error');
        }
        try {
          materialFormat = JSON.parse(v.material!);
        } catch (error) {
          console.log('error');
        }
        let { dosageAccount } = v;
        /** 面料回显需要除以100 */
        if (!isEmpty(dosageAccount) && v.demandType === MATERIAL_DEMAND_TYPE_ENUM.FABRIC) {
          dosageAccount = `${times(v.dosageAccount!, 100)}`;
        }
        return {
          ...v,
          attritionRate,
          dosageAccount,
          dosageAccountUnit: v.saleUnit,
          skuAttrsFormat,
          materialFormat
        };
      }),
  };
};
const getInfo = async () => {
  const checkCountId = $route.params.id as string;
  detail.value = await getInfoData(checkCountId);
};
const init = async () => {
  getAccessoriesNumber();
  await getInfo();
  if (readOnly.value) {
    const { data: versionData = [] } = await checkCountGetVersions({
      designCode: detail.value.designCode!
    });
    versions.value = versionData.reverse();
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
