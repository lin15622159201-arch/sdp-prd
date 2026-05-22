<template>
  <el-dialog
    v-model="visible_"
    width="1000px"
    :title="preview ? '二次工艺信息' : '维护二次工艺'"
    v-bind="$attrs"
    custom-class="print-dialog"
    append-to-body
    @close="close()"
  >
    <section v-show="preview">
      <page-card title="工艺需求信息">
        <custom-desc
          :data="crafts"
          :key-map="keyMap"
          :label-width="100"
          :column="2"
        >
          <template #pictureList="{ row }">
            <ImageViewer
              :list="crafts_?.pictureList?.length ? row.value : row.text"
              style="display: flex;padding-left:100px;"
            >
              <template #default="{ view }">
                <img
                  v-for="(item, i) in (crafts_?.pictureList?.length ? row.value : row.text)"
                  :key="i"
                  :src="item.url"
                  style="width:80px;height:80px;margin-right:5px;cursor: pointer;"
                  @click="view(i)"
                >
              </template>
            </ImageViewer>
          </template>
        </custom-desc>
      </page-card>
      <page-card title="工艺回复信息">
        <custom-table
          style="width: 100%"
          :column="tableColumns_"
          :data="craftMatchList_"
        >
          <template #spuCode="{ row }">
            <ul class="desc-lis">
              <li><b>SPU</b>{{ row.spuCode || '-' }}</li>
              <li><b>SKU</b>{{ row.skuCode || '-' }}</li>
              <li><b>型号</b>{{ row.specification || '-' }}</li>
            </ul>
            <el-tag
              v-if="row.isConfirm === YES_NO_ENUM.YES"
              style="position: absolute;right:10px;bottom:10px;"
              type="success"
            >
              已确认
            </el-tag>
          </template>
          <template #productStepPriceVoList="{ row }">
            <!-- scm/src/modules/demand-management/big-craft-demand/views/components/detail/detail-match-result.vue -->
            <!-- 一口价 -->
            <div v-if="row.productStepPriceVoList.length === 1" class="flex">
              <div class="flex-1 flex-align-center">
                一口价
              </div>
              <div class="flex-2">
                <div v-if="row.productStepPriceVoList[0].supplierQuotedPrice">
                  空差报价： {{ row.productStepPriceVoList[0].supplierQuotedPrice }} 元 /
                  {{ row.unit }}
                </div>
                <div v-if="row.productStepPriceVoList[0].stepPrice">
                  含税空差报价： {{ row.productStepPriceVoList[0].stepPrice }} 元 /
                  {{ row.unit }}
                </div>
              </div>
            </div>
            <div v-if="!row.productStepPriceVoList.length">
              <b>大货进价：</b>{{ row.taskCostPrice || '--' }}元/{{ row.unit }}
            </div>
            <!-- 阶梯价 -->
            <div v-if="row.productStepPriceVoList.length > 1">
              <div
                v-for="(stairItem, stairIndex) in (row.productStepPriceVoList || [])"
                :key="stairIndex"
              >
                <div class="flex" style="margin-bottom:3px">
                  <div class="flex-1 flex flex-align-center">
                    <!-- 左边数值 -->
                    <div class="flex-2 align-right">
                      <span
                        v-if="Number(stairIndex) + 1 < row.productStepPriceVoList.length"
                      >
                        {{ Number(stairItem.upperLimit) }}
                      </span>
                    </div>
                    <!-- 中间符号 -->
                    <div class="align-center" style="width: 50px;">
                      <span v-if="stairIndex === 0">&leq; N &leq;</span>
                      <span
                        v-if="
                          stairIndex > 0
                            && stairIndex < row.productStepPriceVoList.length - 1
                        "
                      >&lt; N &leq;</span>
                      <span
                        v-if="stairIndex === row.productStepPriceVoList.length - 1"
                      >N ＞</span>
                    </div>
                    <!-- 右边数值 -->
                    <div class="flex-2 align-left">
                      <span
                        v-if="Number(stairIndex) + 1 === row.productStepPriceVoList.length"
                      >{{
                        Number(row.productStepPriceVoList[stairIndex - 1].lowerLimit)
                      }}</span>
                      <span v-else>{{ Number(stairItem.lowerLimit) }}</span>
                    </div>
                  </div>
                  <div class="flex-2">
                    <div v-if="stairItem.supplierQuotedPrice">
                      空差报价： {{ stairItem.supplierQuotedPrice }} 元 / {{ row.unit }}
                    </div>
                    <div v-if="stairItem.stepPrice">
                      含税空差报价： {{ stairItem.stepPrice }} 元 / {{ row.unit }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #supplierName="{ row }">
            <ul class="desc-lis">
              <li class="flex">
                <b>工艺厂名称</b>
                <span class="flex-1">{{ row.supplierName || '-' }}</span>
              </li>
              <li class="flex">
                <b>地址</b>
                <span class="flex-1">{{ row.supplierAddress || '-' }}</span>
              </li>
              <li class="flex">
                <b>手机</b>
                <span class="flex-1">{{ row.supplierPhone || '-' }}</span>
              </li>
            </ul>
          </template>
          <template #creatorName="{ row }">
            <p>{{ row.creatorName || '-' }}</p>
            <p>{{ $filters.formatTime(row.createdTime) }}</p>
          </template>
        </custom-table>
      </page-card>
    </section>
  </el-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, toRef, computed } from 'vue';
import type {
  getWebV1BomDetailApiResBomOrderMaterialListResItem,
  CreftItem,
  AddCaftsItem,
  ICraftMatchReqItem,
  // ICraftMatchResProductStepPriceVoListItem,
} from '@/modules/resource-lib/api/types';
import {
  DESIGN_ORDER_TYPE_LIST,
  DESIGN_SAMPLE_TYPE_ENUM,
  DESIGN_SAMPLE_TYPE_LIST,
  CRAFTS_REQUIRE_LIST,
  DESIGN_CUTTING_METHOD_LIST,
  SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_LIST,

} from '@/modules/resource-lib/constant';
import { YES_NO_ENUM } from '@/constant/global';
import useProcessForm from './use-process-form';
import { useUploaderFormat } from '@/components/custom-form';
import type { KeyMap } from '@/components/custom-desc/package/types';
import { getLabelByVal } from '@/core/plugins/filter';
import type { IColumnProp } from '@/components/custom-table/types';

type BomRowItem = getWebV1BomDetailApiResBomOrderMaterialListResItem;

export default defineComponent({
  name: 'ProcessDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<BomRowItem>, // bom物料列表
      default: () => ({}),
    },
    crafts: { // 当前工艺
      type: Object as PropType<AddCaftsItem>,
      default: () => ({}),
    },
    purchaserId: { // 客户ID
      type: String,
      default: '',
    },
    batchDictListMap: {
      type: Object,
      default: () => ({}),
    },
    preview: {
      type: Boolean,
      default: false,
    },
    craftMatchList: { // 工艺需求匹配信息
      type: Array as PropType<ICraftMatchReqItem[]>,
      default: () => ([]),
    },
  },
  emits: ['update:visible', 'save'],
  setup(props, { emit }) {
    const BomRowItem_ = toRef(props, 'data');
    const craftMatchList_ = toRef(props, 'craftMatchList');
    const visible_ = computed({
      get() {
        return props.visible;
      },
      set(value) {
        emit('update:visible', value);
      },
    });

    const crafts_ = toRef(props, 'crafts');

    const form = useProcessForm(
      toRef(props, 'purchaserId'),
      toRef(props, 'data'),
    );

    console.log('form==', form);
    console.log('props==', props);

    const formReset = () => {
      form.reset();
      form.model.address = ['', '', ''];
      form.model.contactProvince = '';
      form.model.contactCity = '';
      form.model.contactRegion = '';
      form.getItem('craftsRequire').then((item) => { item.props!.disabled = false; });
    };

    const close = () => {
      visible_.value = false;
      formReset();
    };

    const keyMap: KeyMap = {
      thirdPartyCraftDemandCode: '工艺需求号',
      category1: {
        label: '二次工艺',
        formatter() {
          const { category1, category2, category3 } = props.crafts || {};
          return `${category1} ${category2} ${category3}`;
        },
      },
      craftsRequire: {
        label: '工艺要求',
        formatter(value) {
          return getLabelByVal(CRAFTS_REQUIRE_LIST, value);
        },
      },
      undertakeType: {
        label: '承接方式',
        formatter(value) {
          return getLabelByVal(SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_LIST, value);
        },
      },
      factoryName: '需求工艺厂',
      contactName: '联系人',
      contactPhone: '手机号码',
      contactCity: {
        label: '联系地址',
        formatter() {
          const { contactProvince = '', contactCity = '', contactRegion = '' } = props.crafts || {};
          return `${contactProvince} ${contactCity} ${contactRegion}`;
        },
      },
      contactDetailAddress: '详细地址',
      positionRequirement: '位置要求',
      sizeRequirement: '尺寸要求',
      colorRequirement: '颜色要求',
      weightRequirement: '克重要求',
      otherRequirement: '其他工艺要求',
      pictureList: {
        label: '图片',
        formatter(list: any) {
          if (!crafts_.value.craftDemandId) {
            if (list?.length > 0) {
              return useUploaderFormat.utils.format(list);
            }
            return useUploaderFormat.utils.format(crafts_.value.picture || '');
          }
          return useUploaderFormat.utils.format(list);

          // const isEdit = !crafts_.value.craftDemandId;
          // return useUploaderFormat.utils.format(isEdit ? crafts_.value.picture : list);
        },
      },
    };

    const tableColumns_: IColumnProp[] = [
      {
        prop: 'spuCode',
        slotKey: 'spuCode',
        label: '商品规格信息',
        minWidth: 150,
      },
      {
        prop: 'productStepPriceVoList',
        slotKey: 'productStepPriceVoList',
        label: '商品价格信息',
        minWidth: 200,
      },
      {
        prop: 'supplierName',
        slotKey: 'supplierName',
        label: '供应商信息',
        minWidth: 150,
      },
      {
        prop: 'creatorName',
        slotKey: 'creatorName',
        label: '相关人员',
        minWidth: 100,
      },
    ];

    return {
      YES_NO_ENUM,
      tableColumns_,
      craftMatchList_,
      crafts_,
      keyMap,
      BomRowItem_,
      close,
      form,
      visible_,
      DESIGN_ORDER_TYPE_LIST,
      DESIGN_SAMPLE_TYPE_ENUM,
      DESIGN_SAMPLE_TYPE_LIST,
      CRAFTS_REQUIRE_LIST,
      DESIGN_CUTTING_METHOD_LIST,
      useUploaderFormat,
    };
  },
  components: {
  },
});
</script>

<style scoped lang="scss">
dl {
  padding-bottom: 20px;
  min-height: 52px;
  display: flex;
  padding-right: 120px;
  position: relative;
  dd {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.add-craft{
  p{
    font-size:12px;
    color:#E6A23C;
    padding-top:5px;
  }

}
</style>
