<template>
  <el-scrollbar class="scroller">
    <div class="scroller_layout">
      <div>
        <detail-title title="面辅料:" />
        <sc-table
          class="table-form"
          :columns="fabricAccessoryColumns"
          :data="detail?.normalMaterialList"
        />
      </div>
      <div>
        <detail-title title="特殊辅料:">
          <el-button
            v-if="!readOnly"
            type="primary"
            @click="openAddSpecialAccessoryDialog"
          >
            新增
          </el-button>
        </detail-title>
        <sc-table
          class="table-form"
          :columns="specialAccessoryColumns"
          :data="detail?.specialMaterialList"
        />
      </div>
      <div>
        <detail-title title="二次工艺:" />
        <sc-table
          class="table-form"
          :columns="secondaryProcessColumns"
          :data="detail?.materialCraftList"
        />
      </div>
      <div>
        <detail-title title="唛架内容:" class="required tw-mb-0" />
        <el-form-item
          class="tw-max-w-700px"
          prop="markFramePictureList"
          :rules="{
            required: true,
            message: '唛架内容不能为空',
          }"
        >
          <Uploader
            v-model="detail!.markFramePictureList"
            :limit="9"
            accept=".rar,.zip,.prj,.png,.jpg,.jpeg,.lay"
            :size-limit="20"
            size="mini"
            download
            :disabled="readOnly"
            listType="text"
            tips="支持格式：.rar, .zip, .prj, .png, .jpg, .jpeg, .lay，最多9个唛架内容，单个文件不能超过20MB"
          />
        </el-form-item>
      </div>
    </div>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue';
import { useFabricAccessory } from './hooks/use-fabric-accessory';
import { useSecondaryProcess } from './hooks/use-secondary-process';
import { useSpecialAccessory } from './hooks/use-special-accessory';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { IDetail } from '../../types';

const props = defineProps({
  detail: {
    type: Object as PropType<IDetail>,
    required: true,
  },
  readOnly: {
    type: Boolean,
    required: true,
  },
  PLM_SPECIAL_ACCESSORIES_NUMBER: {
    type: Array as PropType<IDictionaryItem[]>,
    required: true,
  },
});
const detail = computed(() => props.detail);
const readOnly = computed(() => props.readOnly);
const { fabricAccessoryColumns } = useFabricAccessory({
  readOnly,
});
const {
  specialAccessoryColumns,
  openAddSpecialAccessoryDialog
} = useSpecialAccessory({
  readOnly,
  handleAddSpecialAccessory(row) {
    const item = props.PLM_SPECIAL_ACCESSORIES_NUMBER
      .find(it => !detail.value?.specialMaterialList
        .some(v => v.prototypeMaterialName === it.label));
    detail.value?.specialMaterialList.push({
      bomMaterialId: '',
      bomId: '',
      // 递增物料项目
      prototypeMaterialName: item?.label!,
      commodityId: row.spuId,
      commodityCode: row.spuCode,
      skuId: row.skuId,
      skuCode: row.skuCode,
      supplierId: row.supplierId,
      supplierCode: row.supplierCode,
      supplierName: row.supplierName,
      invoiceState: row.invoiceState,
      packNumber: row.packNumber,
      packUnitName: row.packUnitName,
      packAssistantUnitName: row.packAssistantUnitName,
      minPrice: row.minPrice,
      minPriceUnit: row.minPriceUnit,
      commodityNumber: row.commodityNumber,
      commodityName: row.spuName,
      spuCityName: row.spuCityName,
      skuAttrs: row.skuAttrs,
      skuAttrsFormat: row.skuAttrsFormat,
      saleUnit: row.saleUnit,
      matchPictureList: row.pictureList,
      purchasePrice: row.purchasePrice,
      skuPrice: row.skuPrice,
      priceReplyTime: row.priceReplyTime,
      priceInvalidTime: row.priceInvalidTime,
      samplePurchasingCycle: row.samplePurchasingCycle,
      bulkPurchasingCycle: row.bulkPurchasingCycle,
      cuttingMethod: '',
      partUse: [],
      partUseName: '',
      dosageAccount: '',
      dosageAccountUnit: row.saleUnit,
      attritionRate: '5',
    });
  },
  handleDeleteSpecialAccessory(index) {
    detail.value?.specialMaterialList.splice(index, 1);
  },
});
const { secondaryProcessColumns } = useSecondaryProcess({
  readOnly,
});
</script>
<style lang="scss" scoped>
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
