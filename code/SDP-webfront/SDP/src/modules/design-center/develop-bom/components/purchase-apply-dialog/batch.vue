<script lang="ts" setup>
import useDialogVisible from '@/hooks-transfer/use-dialog-visible';
import { ElMessage, FormInstance } from 'element-plus';
import {
  fetchMatchMaterialDetailLatest,
  actionPurchaseApplyBatch
} from '@/modules/design-center/api/purchase-apply/index';
import {
  IDetail,
  IBomOrderMaterialListItem,
  IBatchSubmitRequestParam,
  IBomOrderMaterialListItemAvatar,
} from './types';
import {
  DESIGN_MATERIAL_TYPE_ENUM,
  CRAFT_DEMAND_STATE_ENUM,
  CRAFTS_REQUIRE_LIST,
  ORDER_CUTTING_WAY_ENUM,
  CRAFTS_REQUIRE_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2,
} from '@/modules/design-center/develop-bom/constant/index';
import { YES_NO_ENUM } from '@/constant';
import { cloneDeep } from 'lodash-es';
import { opsDict } from '@/hooks-transfer/dictionary';
import { computed, reactive, toRaw, ref } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { getLabelByVal } from '@/core/plugins/filter';

type IElFormValidateCallback = (error?: string | Error | undefined) => void;

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  designCode: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'success']);

const { visible: selfVisible } = useDialogVisible(props, emit);
const {
  getDictionaryOptions,
} = useDictionary();
const purchaseRequestReasonOptions = computed(() => {
  return getDictionaryOptions(DICTIONARY_KEY.PURCHASE_REQUEST_REASON) || [];
});
const formRef = ref<FormInstance>();
/**
 * form
 */
const formModel = reactive<{
  tableList: IBomOrderMaterialListItem[];
  purchaseApplyCause: string;
}>({
  tableList: [],
  purchaseApplyCause: '',
});
const detail = ref<IDetail>();
// 获取裁剪方法下拉
const cuttingMethodOpts = computed(() => {
  return getDictionaryOptions(DICTIONARY_KEY.BOM_CUTTING_METHOD).map((item) => {
    return {
      code: item.value,
      desc: item.label,
    };
  }) || [];
});
// const tableList = ref<IBomOrderMaterialListItem[]>();
const tableSelection = ref<IBomOrderMaterialListItem[]>([]);
const handleTableSelectionChange = (selection: IBomOrderMaterialListItem[]) => {
  tableSelection.value = selection;
};
/**
 * 色卡图字段处理
 */
const handleColorCardPictureValidate = (
  value: string,
  callback: IElFormValidateCallback,
  row: IBomOrderMaterialListItem
) => {
  const isError = tableSelection.value.includes(row) && value?.length === 0;
  callback(isError ? new Error('请上传至少1张色卡图') : undefined);
};
/**
 * 采购数量字段处理
 */
const handleApplyCountValidate = (value: string, callback: IElFormValidateCallback, row: IBomOrderMaterialListItem) => {
  if (tableSelection.value.includes(row) && !value) {
    callback(new Error('必填'));
  }
  callback();
};

const handleIsRemainMaterialValidate = (
  value: string,
  callback: IElFormValidateCallback,
  row: IBomOrderMaterialListItem
) => {
  if (tableSelection.value.includes(row) && !value) {
    callback(new Error('必填'));
  }
  callback();
};
/** 采购数量字段处理 */
const unitFilter = (row: IBomOrderMaterialListItem) => {
  return row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
    ? ('米') // 面料
    : (row.minPriceUnit || row.matchPurchaseUnitName || ''); // 辅料
};

const resetVar = () => {
  detail.value = undefined;
  formModel.tableList = [];
  formModel.purchaseApplyCause = '';
  formRef.value?.clearValidate();
};
const handleOpen = async () => {
  resetVar();
  const { data } = await fetchMatchMaterialDetailLatest({ designCode: props.designCode });
  detail.value = data || {};
  const tableListAvatar: IBomOrderMaterialListItem[] = cloneDeep(toRaw(
    detail.value?.bomOrderMaterialList
      .filter(item => item.demandType !== DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST) || []
  ));
  tableListAvatar.forEach((item: IBomOrderMaterialListItem) => {
    item.__f_isRemainMaterial = YES_NO_ENUM.NO;
    item.__f_colorCardPictureList = item?.purchaseColorCardPictureList?.map((it) => { return { url: it }; });
    item.__f_remark = item.materialRemarkList?.[0]?.remark || '';
  });
  formModel.tableList = tableListAvatar;
};
const handleClose = () => {
  resetVar();
};
const handleConfirm = async () => {
  if (!tableSelection.value.length) {
    ElMessage.warning('请选择至少一个物料');
    return;
  }
  const isPass = await formRef.value?.validate();
  if (!isPass) return;
  // const tableListAvatar = _.cloneDeep(toRaw(formModel.tableList));
  const tableListAvatar = cloneDeep(toRaw(tableSelection.value));
  // 处理颜色字段
  const materialColorHandler = (item: IBomOrderMaterialListItemAvatar) => {
    if (item.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC) {
      return item.colorName;
    }
    if (item.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST) {
      try {
        const skuAttrsList = JSON.parse(item.skuAttrs || '[]');
        if (skuAttrsList?.length) {
          const attrItem = skuAttrsList.find((ele: any) => ele?.attrName === '颜色');
          return attrItem?.attrValue || '';
        }
        return '';
      } catch (_) {
        console.error(_);
        return '';
      }
    } else {
      return '';
    }
  };
  const purchaseApplyListAvatar = (tableListAvatar as IBomOrderMaterialListItemAvatar[]).map((item) => {
    // 自有余料
    if (item.__f_isRemainMaterial === YES_NO_ENUM.YES) {
      item.cutMethod = `${ORDER_CUTTING_WAY_ENUM.REMAINING}`;
    } else {
      item.cutMethod = '';
    }
    item.partUseName = opsDict.mapLabels({
      codes: item.partUse,
      dictCode: DICTIONARY_KEY.PLM_PURCHASE_YLBW,
      cutting: ',',
    }) || '';
    console.log('cuttingMethodOpts.value.', cuttingMethodOpts.value, item.cuttingMethod);
    item.cuttingMethodName = cuttingMethodOpts.value.find(v => v.code === item.cuttingMethod)?.desc || '';
    // 备注
    item.remark = item.__f_remark || '';
    // 单位
    item.purchaseUnit = unitFilter(item) || '';
    // 物料项目
    item.materialCategory = item.prototypeMaterialName;
    // 商品名称
    item.materialName = item.commodityName;
    // 色卡图
    item.colorCardPictureUrl = item.__f_colorCardPictureList?.map(it => it.url)?.join(',') || '';
    item.matchPicture = item.matchPictureList?.join(',') || '';
    item.materialColorNo = item.colorNumber || '';
    item.materialColor = materialColorHandler(item);
    item.materialCode = item.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC ? item.commodityCode : item.skuCode;
    item.cuttingProcess = item.craftDemandInfoList.reduce((pre: string[], cur) => {
      if (cur.craftsRequire === CRAFTS_REQUIRE_ENUM.BEFORE) {
        if (cur.category3 || cur.category2) {
          pre.push(cur.category3 || cur.category2);
        }
      }
      return pre;
    }, []).join(',');
    delete item.__f_isRemainMaterial;
    delete item.__f_remark;
    return item;
  });

  const requestParams: IBatchSubmitRequestParam = {
    prototypeId: detail.value?.prototypeId || '',
    styleCode: detail.value?.styleCode || '',
    designCode: detail.value?.designCode || '',
    purchaseApplyCause: formModel.purchaseApplyCause || '',
    purchaseApplyList: purchaseApplyListAvatar,
  };
  await actionPurchaseApplyBatch(requestParams);
  ElMessage.success('操作成功');
  emit('success');
};

</script>
<template>
  <el-dialog
    v-model="selfVisible"
    width="1400px"
    title="采购申请"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @open="handleOpen"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formModel"
    >
      <el-table
        :data="formModel.tableList"
        border
        center
        @selection-change="handleTableSelectionChange"
      >
        <el-table-column
          type="selection"
          width="40"
        />
        <el-table-column
          prop="prototypeMaterialName"
          label="物料项目"
          fixed="left"
          width="115px"
        >
          <template #default="{ row }">
            <p>{{ row.prototypeMaterialName }}</p>
            <p v-if="row.purchaseApplyFollowCount">
              <el-tag type="warning">
                采购申请 {{ row.purchaseApplyFollowCount }} 次
              </el-tag>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="物料信息"
          min-width="160px"
        >
          <template #default="{ row }">
            <p><b>SPU</b>：{{ row.commodityCode || '' }}</p>
            <p><b>SKU</b>：{{ row.skuCode || '' }}</p>
            <p><b>货号</b>：{{ row.commodityNumber || '' }}</p>
            <p><b>品名</b>：{{ row.commodityName || '' }}</p>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="100px">
          <template #default="{ row }">
            <custom-image
              :src="$filters.ossUrl(row?.matchPictureList?.[0])"
              :preview-src-list="row.matchPictureList"
              class="img-thumbnail__table"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="物料属性"
          min-width="155px"
        >
          <template #default="{ row }">
            <!--面料-->
            <div
              v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC"
              class="tw-flex tw-flex-col"
            >
              <span><b>颜色</b> ：{{ row.colorName }}{{ row.colorNumber ? `(${row.colorNumber})` : '' }}</span>
              <span>
                <b>幅宽</b>：{{
                  row.widthConfirm ? `${row.widthConfirm}cm` : row.widthStrFormat
                }}
              </span>
              <span>
                <b>克重</b>：{{ row.weightStrFormat }}
              </span>
            </div>
            <!--辅料-->
            <div
              v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                || row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST"
              class="tw-flex tw-flex-col"
            >
              <span v-for="attr in (JSON.parse(row.skuAttrs || []))" :key="attr.attrId">
                <b>{{ attr.attrName }}：</b>
                {{ attr.attrValue }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="使用部位"
          min-width="80px"
        >
          <template #default="{ row }">
            {{ opsDict.mapLabels({
              codes: row.partUse,
              dictCode: DICTIONARY_KEY.PLM_PURCHASE_YLBW,
              cutting: ',',
            }) }}
          </template>
        </el-table-column>
        <el-table-column label="裁剪方法/对色" min-width="115px">
          <template #default="{ row }">
            <span v-if="row.demandType !== DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST">
              {{ (cuttingMethodOpts.find(item => item.code === row.cuttingMethod)?.desc) || '' }}
            </span>
            <!--对色-->
            <div
              v-if="
                row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                  && row.colorMatchMaterialState
              "
            >
              <span v-if="(row.colorMatchMaterialState === IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.NONE)">
                {{ $filters.getEnumLabel(IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2, row.colorMatchMaterialState) }}
              </span>
              <span v-else>
                {{ $filters.getEnumLabel(IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2, row.colorMatchMaterialState) }}
                ：{{ row.colorMatchMaterialName || '-' }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="二次工艺" min-width="115px">
          <template #default="{ row }">
            <p v-if="row.isNoCraft === YES_NO_ENUM.YES">
              无工艺
            </p>
            <div class='tw-flex tw-flex-wrap tw-gap-5px' v-else>
              <template
                v-for="(item, index) in row.craftDemandInfoList"
                :key="index"
              >
                <el-tag
                  v-if="item.state !== CRAFT_DEMAND_STATE_ENUM.CLOSED"
                  plain
                >
                  {{ item.category3 || item.category2 }}
                  /{{ $filters.getEnumLabel(CRAFTS_REQUIRE_LIST, item.craftsRequire) }}
                </el-tag>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="色卡图" min-width="160">
          <template #header>
            <span class="require-star">*</span>
            <span>色卡图</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              v-if="row.demandType !== DESIGN_MATERIAL_TYPE_ENUM.ASSIST"
              class="tw-mt-18px"
              style="width:100%;"
              :prop="`tableList[${$index}].__f_colorCardPictureList`"
              :rules="{
                validator: (_, value, callback) => handleColorCardPictureValidate(value, callback, row),
                required: true,
                trigger: ['change', 'blur']
              }"
            >
              <Uploader
                v-model="row.__f_colorCardPictureList"
                style="width:100%"
                size="tiny"
                class="tw-text-12px tw-leading-18px"
                :move="false"
                :limit="2"
                :size-limit="15"
                accept=".jpg,.jpeg,.png"
                :check-accept="true"
                :tips="[{
                  message: '请上传至少1张色卡图',
                  type: 'warning'
                }]"
              />
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column min-width="90px">
          <template #header>
            <span class="require-star">*</span>
            <span>采购数量</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="tw-mt-18px"
              :prop="`tableList[${$index}].purchaseQuantity`"
              :rules="{
                validator: (_, value, callback) => handleApplyCountValidate(value, callback, row),
                required: true,
                trigger: ['change', 'blur']
              }"
            >
              <div class="tw-flex tw-flex-items-center">
                <div class="tw-flex-1">
                  <number-basis
                    v-model="row.purchaseQuantity"
                    :max="9999.99"
                    :min="0.01"
                    :precision="2"
                  />
                </div>
                <div style="margin-left: 4px;">
                  {{ unitFilter(row) }}
                </div>
              </div>
            </el-form-item>
          </template>
        </el-table-column>

        <!-- <el-table-column width="100px">
          <template #header>
            <span class="require-star">*</span>
            <span>自有余料</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="tw-mt-18px"
              :prop="`tableList[${$index}].__f_isRemainMaterial`"
              :rules="{
                validator: (_, value, callback) => handleIsRemainMaterialValidate(value, callback, row),
                required: true,
                trigger: ['change', 'blur']
              }"
            >
              <el-select v-model="row.__f_isRemainMaterial">
                <el-option
                  v-for="item in YES_NO_LIST"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column> -->
        <el-table-column
          label="备注"
          width="150px"
        >
          <template #default="{ row }">
            <el-input
              v-model="row.__f_remark"
              type="textarea"
              row="3"
              placeholder="请输入备注信息"
              maxlength="50"
            />
          </template>
        </el-table-column>
      </el-table>
      <section style="margin-top: 12px;">
        <el-form-item
          label="采购申请原因："
          prop="purchaseApplyCause"
          :rules="{
            required: true,
            message: '必填',
            trigger: ['change', 'blur']
          }"
        >
          <el-select
            v-model="formModel.purchaseApplyCause"
            clearable
            filterable
            placeholder="请选择"
            style="width: 220px;"
          >
            <el-option
              v-for="item in purchaseRequestReasonOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
      </section>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="selfVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
@import "@/modules/design-center/styles/index.scss";
:deep(.el-table__row) {
  position: relative;
}
:deep(.el-table__row.cover::after) {
  content: '该物料已失效，请在BOM中重新添加后再采购';
  display: flex;
  position: absolute;
  inset: 0;
  color: #D4011C;
  font-size: 18px;
  font-weight: bold;
  text-shadow: -1px 0 rgba(255,255,255,1), 0 1px rgba(255,255,255,1), 1px 0 rgba(255,255,255,1), 0 -1px rgba(255,255,255,1);
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.4);
  z-index: 100;
}

</style>
