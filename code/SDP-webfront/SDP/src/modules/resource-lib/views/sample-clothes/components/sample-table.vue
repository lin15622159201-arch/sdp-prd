<template>
  <el-dialog
    v-model="selfVisible"
    title="样衣用量核算"
    width="80%"
    :close-on-click-modal="false"
    center
    append-to-body
    @close="close()"
    @open="open()"
  >
    <el-form
      :model="requestParams"
    >
      <custom-table :data="detailData.bomOrderMaterialList || []" :column="columns">
        <!--使用部位-->
        <template #partUse="{ row }">
          <span>{{ batchDictListMap.plm_purchase_ylbw.find(
            (item: any) => item.valueCode === row.partUse)?.value }}</span>
        </template>
        <!--物料id和名称-->
        <template #materialIdAndName="{ row }">
          <div class="flex flex-dir-column">
            <!--面料-->
            <span v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC">
              {{ row.commodityCode }}
            </span>
            <!--辅料-->
            <span v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST">
              {{ row.skuCode }}
            </span>
            <span>{{ row.commodityName }}</span>
          </div>
        </template>
        <!--物料属性-->
        <template #materialProp="{ row }">
          <!--面料-->
          <div
            v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC"
            class="flex flex-dir-column"
          >
            <p><b>颜色</b>：{{ row.colorName }}{{ row.colorNumber ? `(${row.colorNumber})` : '' }}</p>
            <p v-if="row.widthConfirm"><b>门幅</b>：{{ row.widthConfirm }}{{ row.widthUnit }}</p>
            <p v-else><b>门幅</b>：{{ row.widthLow }}-{{ row.widthHigh }}{{ row.widthUnit }}</p>
            <p><b>单位</b>：{{ row.saleUnit }}</p>
            <p><b>克重</b>：{{ row.weightLow }}-{{ row.weightHigh }}{{ row.weightUnit }}</p>
          </div>
          <!--辅料-->
          <div
            v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST"
            class="flex flex-dir-column"
          >
            <span v-for="attr in JSON.parse(row.skuAttrs || '[]')" :key="attr.attrId">
              <b>{{ attr.attrName }}</b>：{{ attr.attrValue }}
            </span>
          </div>
        </template>
        <!--成分-->
        <template #composition="{ row }">
          <div class="tw-flex flex-dir-column">
            <span
              v-for="(item, index) in JSON.parse(row.material || '[]')"
              :key="index"
              class="tw-mr-5px tw-mb-5px"
            >
              {{ item.name }}{{ item.percent }}%;
            </span>
          </div>
        </template>
        <!--供应商物料编号和色号-->
        <template #supplierAndColor="{ row }">
          <div class="flex flex-dir-column">
            <!--面料-->
            <span v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC">
              {{ row.commodityCode }}
            </span>
            <!--辅料-->
            <span v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST">
              {{ row.skuCode }}
            </span>
            <div>
              {{ row.colorName }}{{ row.colorNumber ? `(${row.colorNumber})` : '' }}
            </div>
          </div>
        </template>
        <!--二次工艺-->
        <template #secondProcessAndStep="{ row }">
          <div class="flex row-flex-space-between" style="min-height: 60px">
            <div class="tw-flex flex-dir-column ">
              <p
                v-for="(item, index) in row.craftDemandInfoList"
                :key="index"
                class="tw-mr-5px tw-mb-5px"
              >
                {{ item.category3 || item.category2 }}/{{
                  $filters.getEnumLabel(CRAFTS_REQUIRE_LIST, item.craftsRequire) }}
              </p>
            </div>
          </div>
        </template>
        <template #dosageCheck="{ row }">
          <p>{{ row.dosageAccount }}</p>
        </template>
        <!--备注-->
        <template #remark="{ row }">
          <div v-show="row.materialRemarkList?.length">
            {{ row.materialRemarkList[0]?.remark }}
          </div>
        </template>
      </custom-table>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, reactive, ref } from 'vue';
import type { IColumnProp } from '@/components/custom-table/types';
// import Form, { FormScope, useUploaderFormat } from '@/components/custom-form/';
import { DESIGN_MATERIAL_TYPE_ENUM, CRAFTS_REQUIRE_LIST } from '@/modules/resource-lib/constant';
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { useDictionary } from '@/hooks-transfer/use-dict';
import type {
  ISampleMaterialPlanPageBomOrderMaterialListItem, IResourceLibPictureUrlListItem,
  ICheckCountSaveReq
} from '@/modules/resource-lib/api/types';

export default defineComponent({
  name: 'SampleTable',
  props: {
    pictureUrlList: {
      require: true,
      type: Array as PropType<IResourceLibPictureUrlListItem[]>,
      default: () => [],
    },
    bomOrderMaterialList: {
      require: true,
      type: Array as PropType<ISampleMaterialPlanPageBomOrderMaterialListItem[]>,
    },
  },
  setup(props, { emit }) {
    const { visible: selfVisible } = useDialogVisible(props, emit);
    const detailData = ref<{
      bomOrderMaterialList?: any;
      [key: string]: any;
    }>({});
    const {
      batchDictListMap,
    } = useDictionary([
      'plm_purchase_ylbw',
    ]);
    const requestParams = reactive<ICheckCountSaveReq>({
      checkCountId: '',
      bomId: '',
      clothesId: '',
      dosageAccountList: [],
    });
    const columns: IColumnProp[] = [
      {
        label: '序号',
        type: 'index',
        width: 80,
      },
      {
        prop: 'prototypeMaterialName',
        label: '物料项目',
        width: 120,
      },
      {
        slotKey: 'partUse',
        label: '使用部位',
        width: 120,
      },
      {
        slotKey: 'materialIdAndName',
        label: '物料id & 名称',
        width: 150,
      },
      {
        prop: 'matchPictureList',
        label: '图片',
        width: 100,
        imageConfig: true,
      },
      {
        slotKey: 'materialProp',
        label: '物料属性',
        width: 155,
      },
      {
        slotKey: 'composition',
        label: '成分',
      },
      {
        slotKey: 'supplierAndColor',
        label: '供应商物料编号 & 色号',
        width: 180,
      },
      {
        slotKey: 'secondProcessAndStep',
        label: '二次工艺 / 环节',
        width: 150,
      },
      {
        slotKey: 'dosageCheck',
        label: '核算用量',
        width: 100,
      },
      {
        slotKey: 'remark',
        label: '备注',
      },
    ];

    const fetchDetailData = async () => {
      try {
        detailData.value = {
          bomOrderMaterialList: props.bomOrderMaterialList,
        };
      } catch (err) { console.error(err); }
    };

    const open = async () => {
      fetchDetailData();
    };

    const resetData = async () => {
      detailData.value = {};
      requestParams.checkCountId = '';
      requestParams.bomId = '';
      requestParams.clothesId = '';
      requestParams.dosageAccountList = [];
    };
    const close = async () => {
      await resetData();
    };

    return {
      selfVisible,
      open,
      close,
      detailData,
      columns,

      DESIGN_MATERIAL_TYPE_ENUM,
      batchDictListMap,
      CRAFTS_REQUIRE_LIST,
      requestParams,
    };
  },
});
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
  min-height: 500px;
  max-height: 600px;
  overflow-y: auto;
}
.picture-section {
  margin-top: 50px;
}
</style>
