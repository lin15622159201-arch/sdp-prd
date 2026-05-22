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
    <section v-show="!preview">
      <dl>
        <dt>
          <el-tag
            v-for="(item, index) in BomRowItem_.craftDemandInfoList"
            :key="index"
            plain
            style="margin-right:10px;"
          >
            {{ item.category3 || item.category2 }}/{{ $filters.getEnumLabel(CRAFTS_REQUIRE_LIST, item.craftsRequire) }}
          </el-tag>
        </dt>
        <dd class="add-craft">
          <el-button type="primary" @click="pushSubmit()">
            添加二次工艺
          </el-button>
          <!-- <p>点击 '添加二次工艺' 可添加多个工艺， 点 '确认' 完成二次工艺维护</p> -->
        </dd>
      </dl>
      <custom-form
        :ref="(vm: any) => form.vm = vm"
        label-width="140px"
        :form="form"
        :dict-list="batchDictListMap"
        button-position="center"
      >
        <template #buttons>
          <el-button style="margin-right:20px;" @click="close()">
            取消
          </el-button>
          <el-button type="primary" @click="fillProcess()">
            确认
          </el-button>
        </template>
      </custom-form>
    </section>

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
              <li class="tw-flex tw-w-full">
                <b class="tw-w-80px">工艺厂名称</b>
                <span class="tw-flex-1">{{ row.supplierName || '-' }}</span>
              </li>
              <li class="tw-flex tw-w-full">
                <b class="tw-w-80px">地址</b>
                <span class="tw-flex-1">{{ row.supplierAddress || '-' }}</span>
              </li>
              <li class="tw-flex tw-w-full">
                <b class="tw-w-80px">手机</b>
                <span class="tw-flex-1">{{ row.supplierPhone || '-' }}</span>
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
  CreftItem,
  IBomPrintCraftDemandInfoListItem,
  ICraftMatchReqItem,
} from '../../api/types';
import {
  DESIGN_SAMPLE_TYPE_ENUM,
  DESIGN_SAMPLE_TYPE_LIST,
  CRAFTS_REQUIRE_LIST,
  SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_LIST,

} from '../../constant';
import { YES_NO_ENUM } from '@/constant';
import useProcessForm from './use-process-form';
import { useUploaderFormat } from '@/components/custom-form';
import type { KeyMap } from '@/components/custom-desc/package/types';
import { getLabelByVal } from '@/core/plugins/filter';
import type { IColumnProp } from '@/components/custom-table/types';
import { IDetail } from '../../views/edit/types';

export default defineComponent({
  name: 'ProcessDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<IDetail['bomOrderMaterialList'][0]>, // bom物料列表
      default: () => ({}),
    },
    crafts: { // 当前工艺
      type: Object as PropType<IBomPrintCraftDemandInfoListItem>,
      default: () => ({}),
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
    const BomRowItem_ = computed(() => props.data);
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
      toRef(props, 'data'),
    );

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

    const pushSubmit = async () => {
      const data = await form.submit();
      if (['PROVIDE', 'NO_PROVIDE'].includes(data.innerFactoryId)) {
        data.innerFactoryId = '';
      }
      data.relationDemandId = BomRowItem_.value.demandId || '';
      [data.category1 = '', data.category2 = '', data.category3 = ''] = data.category || [];
      if (data.category.length > 3) {
        /* 大于3级，category3 指向 最后一级 */
        data.category3 = data.category.pop() || '';
      }
      data.picture = useUploaderFormat.utils.origin('joinString', data.picture);
      console.log('data.picture', data.picture);
      delete data.address;
      delete data.category;
      console.log('data!!!!', data);
      BomRowItem_.value?.craftDemandInfoList?.push(data as CreftItem);
      formReset();
    };

    const fillProcess = async () => {
      await pushSubmit();
      const newCrafts = BomRowItem_.value?.craftDemandInfoList?.filter(item => !item.craftDemandId) || [];
      emit('save', newCrafts);
      close();
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
      positionRequirement: '位置要求',
      otherRequirement: '其他工艺要求',
      pictureList: {
        label: '图片',
        formatter(list: any) {
          if (!crafts_.value.craftDemandId) {
            if (list?.length > 0) {
              return useUploaderFormat.utils.format(list);
            }
            return useUploaderFormat.utils.format((crafts_.value as any).picture || '');
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
        minWidth: 140,
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
        minWidth: 200,
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
      pushSubmit,
      fillProcess,
      close,
      form,
      visible_,
      DESIGN_SAMPLE_TYPE_ENUM,
      DESIGN_SAMPLE_TYPE_LIST,
      CRAFTS_REQUIRE_LIST,
      useUploaderFormat,
    };
  },
  components: {
  },
});
</script>

<style scoped lang="scss">
@import "@/modules/design-center/styles/index.scss";
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
