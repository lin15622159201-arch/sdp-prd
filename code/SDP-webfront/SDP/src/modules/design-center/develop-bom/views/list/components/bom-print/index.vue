<template>
  <!-- <teleport to="body"> -->
  <div id="bom-order-print" class="design-order-print">
    <section
      v-for="(bomOrderItem, index) in bomOrderList"
      :key="index"
      style="page-break-after: always"
    >
      <header>
        <time>{{ dateTime }}</time>
        <div class="title-wrapper">
          <div class="splicing-tag">
            <span v-if="bomOrderItem?.isSplicing">拼接款</span>
          </div>
          <div class="title">
            依布云bom单
          </div>
          <div class="submit-time">
            bom提交时间：{{
              bomOrderItem?.bomOrderSubmitTime
                ? $filters.formatTime(bomOrderItem?.bomOrderSubmitTime, "YYYY-MM-DD HH:mm:ss")
                : "-"
            }}
          </div>
        </div>
      </header>
      <dl>
        <dt>
          <custom-desc
            :data="bomOrderItem"
            :key-map="bomOrderItem?.description"
            :label-width="100"
            :column="2"
            class="tw-mt-20px tw-mb-20px"
          />
        </dt>
        <dd class="tw-flex">
          <img src="" class="bom-print-img">
          <div class="tw-ml-5px tw-flex tw-flex-col">
            <img :src="bomOrderItem?.codeUrl" class="bom-print-img">
            <b class="tw-text-center">{{ bomOrderItem?.storageLocation }}</b>
          </div>
        </dd>
      </dl>
      <div>
        <table class="bom-table">
          <thead>
            <tr>
              <th width="5%">
                物料类型
              </th>
              <th width="8%">
                物料信息
              </th>
              <th width="11%">
                物料属性
              </th>
              <th width="8%">
                图片
              </th>
              <th width="8%">
                成分
              </th>
              <th width="12%">
                价格信息
              </th>
              <th width="8%">
                使用部位
              </th>
              <th width="8%">
                核算单件用量
              </th>
              <!-- <th>单位</th> -->
              <th width="8%">
                二次工艺/环节
              </th>
              <th>
                预估周期
              </th>
              <th>裁剪方法/对色</th>
              <th>备注/小样</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in bomOrderItem?.bomOrderMaterialList" :key="row.bomId">
              <td>
                <p>{{ row.prototypeMaterialName }}</p>
              </td>
              <td v-if="row.materialState === '200'" colspan="7">
                物料开发中
              </td>
              <template v-else>
                <td>
                  <div>
                    <div>
                      <b>SKU:</b>
                      {{ row.skuCode }}
                    </div>
                    <div>
                      <b>SPU:</b>
                      {{ row.commodityCode }}
                    </div>
                    <div>
                      <b>名称:</b>
                      {{ row.commodityName }}
                    </div>
                    <div>
                      <b>色号:</b>
                      {{ row.colorNumber }}
                    </div>
                    <div v-if="row.isPlanning === YES_NO_ENUM.YES" style="color: #E99D42;">
                      <b>企划料{{ row.bandDate ? ':' : '' }}</b>
                      {{ row.bandDate ? `${$filters.formatTime(row.bandDate, 'YYYY年MM月')}` : '' }}
                    </div>
                  </div>
                </td>
                <td>
                  <!--面料-->
                  <div v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC">
                    <div>
                      <b>颜色:</b>
                      {{ row.colorName }}({{ row.colorNumber }})
                    </div>
                    <div>
                      <b>幅宽:</b>
                      {{
                        row.widthConfirm ? `${row.widthConfirm}cm` : row.widthStrFormat
                      }}
                    </div>
                    <!-- <div>
                    <b>单位:</b>
                    {{ row.saleUnit }}
                  </div> -->
                    <div>
                      <b>克重:</b>
                      {{ row.weightStrFormat }}
                    </div>
                  </div>
                  <!--辅料-->
                  <div
                    v-if="
                      row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                        || row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST
                    "
                  >
                    <div v-for="attr in row.skuAttrs || []" :key="attr.attrId">
                      <b>{{ attr.attrName }}:</b>
                      {{ attr.attrValue }}
                    </div>
                  </div>
                </td>
                <td>
                  <img
                    v-if="row.matchPictureList[0]"
                    :src="row.matchPictureList[0]"
                    class="bom-print-img-small"
                  >
                </td>
                <td>
                  <div>
                    <div v-for="(item, materialIndex) in row.material" :key="materialIndex">
                      {{ item.name }}{{ item.percent }}%;
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div v-if="row.bulkPurchasePrice">
                      <b>大货进价:</b>{{ row.bulkPurchasePrice }}元/{{ row.bulkPurchasePriceUnit }}
                    </div>
                    <div v-if="row.matchPurchaseGap">
                      <b>空差:</b>{{ row.matchPurchaseGap }}
                    </div>
                    <div>
                      {{ $filters.formatTime(row.priceInvalidTime) }}
                    </div>
                  </div>
                </td>
                <td>
                  <p>{{ getLabelsByCodes(row.partUse) }}</p>
                </td>
                <td>
                  <p>{{ row.dosageAccount ? `${row.dosageAccount}${row.dosageAccountUnit}` : "" }}</p>
                </td>
              </template>
              <td>
                <div>
                  <div
                    v-for="(item, craftDemandInfoIndex) in row.craftDemandInfoList"
                    :key="craftDemandInfoIndex"
                  >
                    {{ item.category3 || item.category2 }}/{{
                      $filters.getEnumLabel(CRAFTS_REQUIRE_LIST, item.craftsRequire!)
                    }}
                  </div>
                </div>
              </td>
              <td>
                <PurchasingCycleContent :row="row" />
              </td>
              <td>
                <p>
                  {{
                    cuttingMethodOpts.find((item) => item.value === row.cuttingMethod)?.label || ""
                  }}
                </p>
                <p
                  v-if="
                    row.colorMatchMaterialState === IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.MATCH_COLOR
                      || row.colorMatchMaterialState === IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.PACK_MATERIAL"
                >
                  {{ $filters.getEnumLabel(IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2, row.colorMatchMaterialState) }}
                  ：{{ row.colorMatchMaterialName || '-' }}
                </p>
              </td>
              <td>
                <p
                  v-for="(item, materialRemarkIndex) in row.materialRemarkList"
                  :key="materialRemarkIndex"
                >
                  {{ item.remark }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
  <!-- </teleport> -->
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, toRefs, type PropType, type Ref } from 'vue';
import QRCode from 'qrcode';
import {
  CRAFTS_REQUIRE_LIST,
  DESIGN_MATERIAL_TYPE_ENUM,
  DESIGN_SAMPLE_TYPE_LIST,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2,
} from '../../../../constant';
import type { PrintState } from '../../hooks/use-print-order';
import { useDictionary } from '@/hooks-transfer/use-dict';
import { filters } from '@/core/plugins/filter';
import { YES_NO_ENUM } from '@/constant';
import { formatTime, printHtml } from '@toy/utils';
import { useTransBomDetail } from '../../hooks/use-trans-bom-detail';
import { IListItem } from './types';
// eslint-disable-next-line vue/max-len
import PurchasingCycleContent from '@/modules/design-center/develop-bom/components/develop-bom/purchasing-cycle-content.vue';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

export default defineComponent({
  name: 'BomPrint',
  components: { PurchasingCycleContent },
  props: {
    state: {
      type: Object as PropType<Omit<PrintState, 'type' | 'customer' | 'design'>>,
      default: () => ({}),
    },
    cuttingMethodOpts: {
      type: Array as PropType<IDictionaryItem[]>,
      default: () => [],
      require: true,
    },
  },
  setup(props) {
    const bomOrderList: Ref<IListItem[]> = ref([]);
    const { state } = toRefs(props);
    const { getLabelsByCodes } = useTransBomDetail();
    const { batchDictListMap } = useDictionary([
      DICTIONARY_KEY.PLM_PURCHASE_YLBW,
    ]);
    const dateTime = ref(formatTime(new Date(), 'YYYY/MM/DD HH:mm:ss'));
    /**
     * 打印目标dom
     * @param id
     * @returns
     */
    const startPrint = async () => {
      bomOrderList.value = [];
      dateTime.value = formatTime(new Date(), 'YYYY/MM/DD HH:mm:ss');
      const urlsMap = new Map();
      const reqArr: Array<Promise<any>> = [];
      state.value.data.forEach((v) => {
        const getCodeUrl = (designCode: string) => {
          return new Promise(async (rs) => {
            const url = await QRCode.toDataURL(
              designCode,
            );
            urlsMap.set(designCode, url);
            rs(true);
          });
        };
        reqArr.push(
          getCodeUrl(v.designCode!)
        );
      });
      await Promise.all(reqArr);
      bomOrderList.value = state.value.data.map((item) => {
        const [,,categoryThree = '-', categoryFour = '-'] = item.categoryName?.split('-') || [];
        return {
          ...item,
          categoryThree,
          categoryFour,
          codeUrl: urlsMap.get(item.designCode!) || '',
          description: {
            designCode: 'SKC',
            designerName: '设计师',
            categoryThree: '商品末级分类',
            categoryFour: '款式名称',
            sampleType: {
              label: '打版类型',
              formatter: (value: string) => filters.getEnumLabel(DESIGN_SAMPLE_TYPE_LIST, value),
            },

            demandType: {
              label: '需求类型',
              formatter: (value: string) => `${value}款`,
            },
          }
        };
      });
      await nextTick();
      const html = document.getElementById('bom-order-print')!.innerHTML;
      html && printHtml(html);
      bomOrderList.value = [];
    };

    return {
      getLabelsByCodes,
      // data_,
      dateTime,
      startPrint,
      batchDictListMap,
      // codeUrl,
      // description,
      bomOrderList,
      CRAFTS_REQUIRE_LIST,
      DESIGN_MATERIAL_TYPE_ENUM,
      IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM,
      IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2,
      YES_NO_ENUM,
    };
  },
});
</script>

<style scoped lang="scss">
$border: #dcdfe6;
@import "@/modules/design-center/styles/index.scss";
.design-order-print {
  width: 100vw;
  margin-left: 100px;
}
// header {
//   height: 80px;
// }
.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 20px;
  margin-bottom: 10px;
  .splicing-tag {
    flex: 1;
    span {
      display: inline-block;
      width: 86px;
      height: 26px;
      border: 2px solid red;
      line-height: 22px;
      border-radius: 13px;
      color: red;
      text-align: center;
      font-weight: bold;
      letter-spacing: 2px;
    }
  }
  .title {
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    flex: 1;
  }
  .submit-time {
    flex: 1;
    text-align: right;
    font-size: 12px;
    font-weight: bold;
  }
}
h3 {
  font-weight: bold;
  text-align: center;
  background-color: #f4f5f8;
  font-size: 24px;
  line-height: 78px;
  //border-bottom: 1px solid $border;
}
dl {
  display: flex;
  border-bottom: 1px solid $border;
  border-top: 1px solid $border;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  dt {
    flex: 1;
  }
  dd {
    padding: 0 5px;
    img {
      width: 120px;
    }
  }
}
.tags {
  position: absolute;
  top: 5px;
  right: 10px;
  li {
    padding: 0 10px;
    border: 1px solid #409eff;
    background: #fff;
    border-radius: 3px;
    text-align: center;
    line-height: 32px;
    margin-bottom: 5px;
    color: #409eff;
  }
}
.bom-table {
  width: 100%;
  margin-top: 12px;
  tr,
  th,
  td {
    border: 1px solid $border;
    border-collapse: collapse;
  }
  // tr {
  //   height: 36px;
  //   line-height: 36px;
  // }
  th,
  td {
    text-align: start;
    vertical-align: middle;
    padding: 8px 10px;
    color: #606266;
    font-size: 14px;
    line-height: 1.5;
  }
  .bom-print-img {
    width: 120px;
    height: 140px;
    &-small {
      width: 70px;
      height: 85px;
    }
  }
}
/* stylelint-disable-next-line order/order */
@media print {
  img,
  tr,
  td {
    page-break-inside: avoid;
  }
  .exact {
    -webkit-print-color-adjust: exact;
  }
}
@page {
  // size: A4 landscape;
  size: auto;
  margin: 0.5cm;
}
time {
  padding: 10px;
  font-size: 12px;
}
</style>
