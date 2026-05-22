<script lang="ts" setup>
/**
 * 自选物料表格
 */
import { PropType, toRef, defineExpose, nextTick, computed, reactive, ref } from 'vue';
import { sortBy } from 'lodash-es';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus';
import { YES_NO_ENUM } from '@/constant';
import {
  CRAFTS_REQUIRE_LIST,
  DESIGN_MATERIAL_TYPE_ENUM,
  DEMAND_CATEGORY_2_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2,
  DEMAND_STATE_ENUM,
} from '../../../constant';
import type {
  ICraftMatchReqItem,
  // getWebV1BomDetailApiResBomOrderMaterialListResItem as IBomOrderMaterialItem,
  IBomPrintCraftDemandInfoListItem,
} from '../../../api/types';
import { useDictionary } from '@/hooks-transfer/use-dict';

import {
  craftMatch,
} from '../../../api';
import ProcessDialog from '@/modules/design-center/develop-bom/components/process-dialog/index.vue';
import { Plus } from '@element-plus/icons-vue';
import type { IdictValuesItem } from '@/api/dict/types';
import { usePrototypeNameSort } from '../../hooks/use-prototype-name-sort';
import PurchasingCycleContent from '../../../components/develop-bom/purchasing-cycle-content.vue';
import { IDetail } from '../../edit/types';
import { useTransBomDetail } from '../../list/hooks/use-trans-bom-detail';
import { DICTIONARY_KEY } from '@/constant/dictionary';

type IDataListItem = IDetail['bomOrderMaterialList'][0];

type IMaterialType = DESIGN_MATERIAL_TYPE_ENUM.FABRIC
| DESIGN_MATERIAL_TYPE_ENUM.ASSIST | DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST;

const { getLabelsByCodes } = useTransBomDetail();

const props = defineProps({
  materialType: {
    type: String as PropType<IMaterialType>,
    default: '',
    required: true,
  },
  bomOrderMaterialList: {
    type: Array as PropType<IDataListItem[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'selection-change',
  'specification-change',
  'delete-demand',
  'delete-material',
  'demand-modify',
  'demand-material-replace',
]);

const bomOrderMaterialList = toRef(props, 'bomOrderMaterialList');
const currentTypeMaterialList = computed(() => {
  return bomOrderMaterialList.value.filter((item, index) => {
    item.materialImg = item.materialImg?.split(',').filter(Boolean)[0] || '';
    if (item.demandType === props.materialType) {
      // item.colorMatch = ''; // 暂时屏蔽，自选物料v0.1先不做
      item.remark = item.remark || (item.materialRemarkList?.length ? item.materialRemarkList[0]?.remark : '');
      item.__f_isNoProcess = item.craftDemandInfoList?.length
        ? false : (item.__f_isNoProcess || item.isNoCraft === YES_NO_ENUM.YES);
      return true;
    }
    return false;
  });
});

/**
 * 本组件用到的ops字典
 */
const {
  batchDictListMap,
} = useDictionary([
  DICTIONARY_KEY.PLM_PURCHASE_YLBW,
  DICTIONARY_KEY.PLM_DEMAND_TYPE,
  DICTIONARY_KEY.BOM_CUTTING_METHOD,
  DICTIONARY_KEY.PIMS_FABRIC_SERIAL_NUMBER,
  DICTIONARY_KEY.PIMS_INSIDE_FABRIC_SERIAL_NUMBER,
  DICTIONARY_KEY.PIMS_ACCESSORY_SERIAL_NUMBER,
  DICTIONARY_KEY.PLM_SPECIAL_ACCESSORIES_NUMBER,
]);
const usePartOptions = computed(() => {
  return batchDictListMap.value?.[DICTIONARY_KEY.PLM_PURCHASE_YLBW] || [];
});
const cuttingMethodOpts = computed(() => {
  return batchDictListMap.value?.[DICTIONARY_KEY.BOM_CUTTING_METHOD]?.map((item) => {
    return {
      code: item.valueCode,
      desc: item.value,
    };
  }) || [];
});

/**
 * 物料项目
 *  */
const alphabetOptions = computed(() => {
  let opsOptions: IdictValuesItem[] = [];
  if (props.materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC) {
    return [
      ...sortBy((batchDictListMap.value?.[DICTIONARY_KEY.PIMS_FABRIC_SERIAL_NUMBER] || []) || [], (e) => {
        return e.value;
      }).slice(0, currentTypeMaterialList.value.length),
      ...sortBy((batchDictListMap.value?.[DICTIONARY_KEY.PIMS_INSIDE_FABRIC_SERIAL_NUMBER] || []) || [], (e) => {
        return e.value;
      }).slice(0, currentTypeMaterialList.value.length),
    ];
  }
  if (props.materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST) {
    opsOptions = batchDictListMap.value?.[DICTIONARY_KEY.PIMS_ACCESSORY_SERIAL_NUMBER];
  }
  if (props.materialType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST) {
    opsOptions = batchDictListMap.value?.[DICTIONARY_KEY.PLM_SPECIAL_ACCESSORIES_NUMBER];
  }
  // 先根据字母顺序排序，再根据物料个数来截取相应数量字母
  return sortBy(opsOptions || [], (e) => {
    return e.value;
  }).slice(0, currentTypeMaterialList.value.length);
});
const materialLetterChange = (newValue: string, row: IDataListItem) => {
  // 遍历所有物料（除了当前操作的物料），如果其他项的物料项目与当前项选中的物料项目一样，则要被置空
  const needResetColorMatchTargetList: string[] = [];
  currentTypeMaterialList.value.forEach((item) => {
    if (item.bomMaterialId === row.bomMaterialId) {
      return;
    }
    if (item.prototypeMaterialName === newValue) {
      item.prototypeMaterialName = '';
      needResetColorMatchTargetList.push(item.bomMaterialId);
    }
  });
  currentTypeMaterialList.value.forEach((item) => {
    if (needResetColorMatchTargetList.includes(item.colorMatchMaterialId)) {
      item.colorMatchMaterialId = '';
      item.colorMatchMaterialName = '';
    }
  });
};

/**
 * form相关
 */
const formRef = ref<FormInstance>();

const tableSelection = ref<IDataListItem[]>([]);
const handleTableSelectionChange = (selection: IDataListItem[]) => {
  tableSelection.value = selection;
  emit('selection-change', tableSelection.value);
};
/**
 * 对色
 */
const matchColorOrPackMaterialTargetOptions = computed(() => {
  return (row: IDataListItem) => {
    return usePrototypeNameSort(bomOrderMaterialList.value?.filter((v) => {
      return (v.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST || v.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC)
      && v.prototypeMaterialName
      && v.bomMaterialId !== row.bomMaterialId;
    }) || []);
  };
});
/**
 * 二次工艺弹窗
 */
const processDialog = reactive({
  visible: false,
  preview: false,
  crafts: {} as IBomPrintCraftDemandInfoListItem,
  data: {} as IDataListItem,
  craftMatchList: [] as ICraftMatchReqItem[],
});
const handlePlusProcessBtn = (row: IDataListItem) => {
  processDialog.preview = false;
  processDialog.visible = true;
  processDialog.data = row;
};
const handleDelCraft = (row: IDataListItem, index: number) => {
  if (!row.delCraftDemandIdList) {
    row.delCraftDemandIdList = [];
  }
  const { craftDemandId } = row.craftDemandInfoList[index];
  craftDemandId && row.delCraftDemandIdList.push(craftDemandId);
  row.craftDemandInfoList.splice(index, 1);
};
const handleNewCrafts = (newCrafts: IBomPrintCraftDemandInfoListItem[]) => {
  if (newCrafts.length) {
    processDialog.data.__f_isNoProcess = false;
    ElMessage.success('二次工艺添加完成，提交后生效');
    console.log('curr', currentTypeMaterialList.value);
  }
};
const getCraftMatch = async (craftDemandId: string = '') => {
  const { data = [] } = await craftMatch({
    craftDemandId,
  });
  processDialog.craftMatchList = data || [];
};
const previewCraft = async (crafts: IBomPrintCraftDemandInfoListItem) => {
  // console.log(crafts);
  processDialog.preview = true;
  processDialog.crafts = crafts;
  if (processDialog.preview) {
    await getCraftMatch(crafts.craftDemandId);
  }
  processDialog.visible = true;
};
const handleNoProcessBtn = (row: IDataListItem) => {
  if (row.craftDemandInfoList && row.craftDemandInfoList.length) {
    ElMessageBox.confirm(
      '物料存在二次工艺，点击无工艺后将删除所有二次工艺，继续？',
      '注意',
      {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
      },
    )
      .then(() => {
        row.craftDemandInfoList = [];
        row.__f_isNoProcess = true;
      })
      .catch(() => {});
  } else {
    row.craftDemandInfoList = [];
    row.__f_isNoProcess = true;
  }
};

const handleSpecificationChangeBtn = (row: IDataListItem) => {
  emit('specification-change', row);
};
// const resetVar = () => {
//   formRef.value?.resetFields();
//   formRef.value?.clearValidate();
// };
const validateForm = async () => {
  const formValidateResult = await formRef.value?.validate();
  if (props.materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC) {
    const isNoProcessPass = currentTypeMaterialList.value?.every((item) => {
      return item.__f_isNoProcess || (item.craftDemandInfoList.length);
    });
    if (!isNoProcessPass) {
      ElMessage.warning('面料二次工艺必填，如无二次工艺需点击【无工艺】按钮');
    }
    return formValidateResult && isNoProcessPass;
  }
  return formValidateResult;
};

defineExpose({
  validateForm,
});
// const handleRowClassName = ({ row }) => {
//   if (row.enableState !== '1') {
//     return 'cover';
//   }
// };
/**
 * 处理需求顶部栏
 */
const handleRowClassName = ({ row }: { row: IDataListItem; }) => {
  if (row.__f_hasDemand) {
    return 'hat';
  }
  return '';
};
const tableRef = ref();
const handleInsertRow = (index: number) => {
  if (currentTypeMaterialList.value.length - 1 === index) {
    nextTick(() => {
      const doms = document.querySelectorAll('.insert-row-left');
      doms.forEach(dom => dom?.setAttribute('style', `width: ${tableRef.value?.bodyWidth}`));
    });
  }
};
const handleDeleteDemand = (row: IDataListItem) => {
  emit('delete-demand', row);
};
const handleDeleteMaterial = (row: IDataListItem) => {
  emit('delete-material', row);
};
/**
 * 需求修改按钮
 */
const handleDemandModify = (row: IDataListItem) => {
  emit('demand-modify', row);
};
/**
 * 需求更换物料按钮
 */
const handleDemandMaterialReplace = (row: IDataListItem) => {
  emit('demand-material-replace', row);
};

const isShowEncryptedInfo = ref(false);
const handleShowEncryptedInfo = () => {
  isShowEncryptedInfo.value = !isShowEncryptedInfo.value;
};
</script>
<template>
  <div>
    <el-form
      ref="formRef"
      :model="{ currentTypeMaterialList }"
      scroll-to-error
      :disabled="disabled"
    >
      <el-table
        ref="tableRef"
        :data="currentTypeMaterialList"
        border
        style="width: 100%"
        :row-class-name="handleRowClassName"
        @selection-change="handleTableSelectionChange"
      >
        <el-table-column
          v-if="
            materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
              || materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
          "
          type="selection"
          width="40"
        />

        <el-table-column
          prop="prototypeMaterialName"
          label="物料项目"
          fixed="left"
          :width="materialType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST ? '170px' : '130px'"
        >
          <template #default="{ row, $index }">
            {{ handleInsertRow($index) }}
            <el-form-item
              v-if="
                materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
                  || materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
              "
              :prop="`currentTypeMaterialList.${$index}.prototypeMaterialName`"
              :rules="{ required: true, message: '必填', trigger: ['blur', 'change'] }"
            >
              <el-select
                v-model="row.prototypeMaterialName"
                :style="row.purchaseApplyFollowCount ? 'margin-top: 36px' : 'margin-top: 18px'"
                @change="(newValue: string) => { materialLetterChange(newValue, row) }"
              >
                <el-option
                  v-for="letter in alphabetOptions"
                  :key="letter.value"
                  :label="letter.value"
                  :value="letter.value"
                />
              </el-select>
            </el-form-item>

            <p
              v-if="
                materialType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST
              "
            >
              {{ row.prototypeMaterialName }}
            </p>
            <el-tag
              v-if="row.purchaseApplyFollowCount"
              type="warning"
              style="position: relative; top: -10px;"
            >
              采购申请 {{ row.purchaseApplyFollowCount }} 次
            </el-tag>
            <div
              v-if="row.__f_hasDemand"
              class="insert-row-left"
              :class="{
                'left-1': row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST
              }"
            >
              <p>
                <span style="font-size: 15px; font-weight: bold; margin-left: 42px;">需求信息</span>
                <span>
                  需求编号：
                  <el-button
                    v-if="row.__f_demandInfo?.supplyChainDemandCode"
                    type="primary"
                    text
                    @click="handleDemandMaterialReplace(row)"
                  >
                    {{ row.__f_demandInfo?.supplyChainDemandCode || '-' }}
                  </el-button>
                  <span v-else>-</span>
                </span>
                <span>
                  匹配数：{{ row.__f_demandInfo?.materialMatchNum || '-' }}
                </span>
                <span>
                  需求时间：{{ row.__f_demandInfo?.demandCreatedTime
                    ? $filters.formatTime(row.__f_demandInfo?.demandCreatedTime) : '-' }}
                </span>
                <span>
                  处理人：{{ row.__f_demandInfo?.demandHandlerName || '-' }}
                </span>
                <span v-if="row.__f_demandInfo?.demandState === DEMAND_STATE_ENUM.CLOSED" class="close-tag">
                  已关闭
                </span>
              </p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="物料信息" min-width="185px">
          <template #header>
            <div class="material_info_header">
              <span class="title">物料信息</span>
            </div>
          </template>
          <template #default="{ row }">
            <section v-if="row.__f_hasDemand && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES">
              <span v-if="row.__f_demandInfo?.supplyChainDemandCode" style="color: #f00">找料中</span>
              <span v-else style="color: #E99D42">提交bom后生效</span>
            </section>
            <section v-else>
              <div v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC">
                <div>
                  <b>SPU：</b>
                  {{ (isShowEncryptedInfo && row.identifySelection)
                    ? row.encryptionCommodityCode : row.commodityCode || '-' }}
                </div>
                <div>
                  <b>SKU：</b>
                  {{ (isShowEncryptedInfo && row.identifySelection) ? row.encryptionSkuCode : row.skuCode || '-' }}
                </div>
                <div>
                  <b>货号：</b>
                  {{ row.commodityNumber || '-' }}
                </div>
                <div v-if="row.commodityType === DEMAND_CATEGORY_2_ENUM.PURE">
                  <b>品名：</b>
                  {{ (isShowEncryptedInfo && row.identifySelection)
                    ? row.encryptionCommodityName : row.commodityName || '-' }}
                </div>
                <div v-else-if="row.commodityType === DEMAND_CATEGORY_2_ENUM.FLOWER">
                  <b>品类：</b>
                  {{ row.flowerCategory || '-' }}
                </div>
                <div v-if="row.isPlanning === YES_NO_ENUM.YES" style="color: #E99D42;">
                  企划料{{ row.bandDate ? `：${$filters.formatTime(row.bandDate, 'YYYY年MM月')}` : '' }}
                </div>
                <div v-if="row.identifySelection" class="status">
                  <el-tag>
                    识别选中
                  </el-tag>
                </div>
              </div>
              <div
                v-if="
                  row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                    || row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST
                "
              >
                <div>
                  <b>SPU：</b>
                  {{ row.commodityCode || '-' }}
                </div>
                <div>
                  <b>SKU：</b>
                  {{ row.skuCode || '-' }}
                </div>
                <div>
                  <b>货号：</b>
                  {{ row.commodityNumber || '-' }}
                </div>
                <div>
                  <b>品名：</b>
                  {{ row.commodityName || '-' }}
                </div>
              </div>
            </section>
          </template>
        </el-table-column>

        <el-table-column label="图片" width="100px">
          <template #default="{ row }">
            <section v-if="isShowEncryptedInfo && row.identifySelection">
              <custom-image
                class="img-thumbnail__table"
                :src="$filters.ossUrl(row.materialImg)"
              />
            </section>
            <section
              v-else-if="row.__f_hasDemand && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES"
            />
            <section v-else>
              <custom-image
                class="img-thumbnail__table"
                :src="$filters.ossUrl(row.matchPictureList?.[0])"
                :preview-src-list="row?.matchPictureList"
              />
            </section>
          </template>
        </el-table-column>

        <el-table-column label="物料属性" min-width="120px">
          <template #default="{ row }">
            <section v-if="row.__f_hasDemand && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES" />
            <section v-else>
              <!--面料-->
              <div
                v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC"
                class="tw-flex tw-flex-col"
              >
                <span><b>颜色</b> ：{{ row.colorName }}{{ row.colorNumber ? `(${row.colorNumber})` : '' }}</span>
                <span><b>幅宽</b>：{{ row.widthConfirm ? `${row.widthConfirm}cm` : row.widthStrFormat }}</span>
                <span><b>克重</b>：{{ row.weightStrFormat }}</span>
              </div>
              <!--辅料-->
              <div
                v-if="
                  row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                    || row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST
                "
                class="tw-flex tw-flex-col"
              >
                <span v-for="attr in (row.skuAttrs || [])" :key="attr.attrId">
                  <b>{{ attr.attrName }}：</b>
                  {{ attr.attrValue }}
                </span>
              </div>
            </section>
          </template>
        </el-table-column>

        <el-table-column label="成分/材质" min-width='100'>
          <template #default="{ row }">
            <section v-if="row.__f_hasDemand && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES" />
            <section v-else>
              <div class="tw-flex tw-flex-col">
                <span v-for="(item, index) in row.material" :key="index">
                  {{ item.name }}{{ item.percent }}%;
                </span>
              </div>
            </section>
          </template>
        </el-table-column>

        <el-table-column
          label="价格信息"
          min-width="155px"
        >
          <template #default="{ row }">
            <section
              v-if="row.__f_hasDemand
                && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES"
            />
            <section v-else>
              <div class="tw-flex tw-flex-col">
                <template v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC">
                  <span><b>空差：</b>{{ row.matchPurchaseGap }}</span>
                  <span><b>足米价：</b>{{ row.bulkPurchasePrice }}元/{{ row.bulkPurchasePriceUnit }}</span>
                </template>
                <template v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST">
                  <!-- <span><b>销售价格：</b>{{ row.matchSalePrice }}元/{{ row.matchPurchaseUnitName }}</span> -->
                  <span><b>包装数量：</b>{{ row.packNumber }}{{ row.packAssistantUnitName }}/{{ row.packUnitName }}</span>
                </template>
                <template
                  v-if="
                    row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                      || row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST"
                >
                  <span><b>大货进价：</b>{{ row.bulkPurchasePrice }}元/{{ row.bulkPurchasePriceUnit }}</span>
                </template>
                <span>
                  <!-- 增加 失效日期 -->
                  {{ $filters.formatTime(row.priceInvalidTime) }}
                </span>
              </div>
            </section>
          </template>
        </el-table-column>

        <el-table-column label="使用部位" width="140px">
          <template
            v-if="
              materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
                || materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
            "
            #header
          >
            <span style="color: #f00;">*</span>
            <span>使用部位</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              v-if="
                materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
                  || materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
              "
              :prop="`currentTypeMaterialList.${$index}.partUse`"
              :rules="{ required: true, message: '必填', trigger: ['blur', 'change'] }"
            >
              <el-select
                v-model="row.partUse"
                clearable
                multiple
                filterable
                placeholder="请选择"
                :multiple-limit="5"
                style="width: 100px; margin-top: 18px;"
              >
                <el-option
                  v-for="item in usePartOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.valueCode"
                />
              </el-select>
            </el-form-item>

            <span
              v-if="
                materialType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST
              "
            >{{ getLabelsByCodes(row.partUse) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="裁剪方法/对色" min-width="223px">
          <template
            v-if="
              materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
            "
            #header
          >
            <span style="color: #f00;">*</span>
            <span>裁剪方法/对色</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              v-if="
                materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
              "
              :prop="`currentTypeMaterialList.${$index}.cuttingMethod`"
            >
              <el-select
                v-model="row.cuttingMethod"
                clearable
                filterable
                placeholder="请选择"
                style="margin-top: 18px;"
              >
                <el-option
                  v-for="item in cuttingMethodOpts"
                  :key="item.code"
                  :label="item.desc"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
            <el-row
              v-else-if="
                materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
              "
            >
              <el-col :span="15">
                <el-form-item
                  :prop="`currentTypeMaterialList.${$index}.colorMatchMaterialState`"
                  :rules="{ required: true, message: '必填', trigger: ['blur', 'change'] }"
                >
                  <el-select
                    v-model="row.colorMatchMaterialState"
                    clearable
                    placeholder="请选择"
                    style="margin-top: 18px;"
                  >
                    <el-option
                      v-for="option in IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2"
                      :key="option.label"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                v-if="[
                  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.MATCH_COLOR,
                  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.PACK_MATERIAL
                ].includes(row.colorMatchMaterialState)"
                :span="9"
              >
                <el-form-item
                  :prop="`currentTypeMaterialList.${$index}.colorMatchMaterialId`"
                  :rules="{ required: true, message: '必填', trigger: ['blur', 'change'] }"
                >
                  <el-select
                    v-model="row.colorMatchMaterialId"
                    clearable
                    placeholder="请选择"
                    style="margin-top: 18px;"
                  >
                    <el-option
                      v-for="option in matchColorOrPackMaterialTargetOptions(row)"
                      :key="option.bomMaterialId"
                      :label="option.prototypeMaterialName"
                      :value="option.bomMaterialId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <!-- <el-table-column label="二次工艺/对色" min-width="140px"> -->
        <el-table-column label="二次工艺" min-width="140px">
          <template
            v-if="
              materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
            "
            #header
          >
            <span style="color: #f00;">*</span>
            <!-- <span>二次工艺/对色</span> -->
            <span>二次工艺</span>
          </template>
          <template #default="{ row }">
            <!-- <div class="flex flex-dir-column"> -->
            <div
              v-if="
                materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
                  || materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
              "
              class="tw-flex tw-flex-justify-between"
              style="min-height: 80px"
            >
              <div
                class="tw-flex tw-flex-col tw-flex-justify-between"
                :class="{
                  'tw-flex-1': materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC && row.__f_isNoProcess
                }"
              >
                <div
                  v-if="
                    materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
                      && row.__f_isNoProcess
                  "
                  style="min-height: 80px; text-align: center; line-height: 80px;"
                >
                  <span style="padding-left: 20px;">
                    无工艺
                  </span>
                </div>
                <div v-else class="tw-flex tw-flex-col">
                  <el-tag
                    v-for="(item, index) in row.craftDemandInfoList"
                    :key="index"
                    plain
                    closable
                    style="margin-top: 5px; cursor: pointer;"
                    @close="handleDelCraft(row, index)"
                    @click="previewCraft(item)"
                  >
                    {{ item.category3 || item.category2 }}/
                    {{ $filters.getEnumLabel(CRAFTS_REQUIRE_LIST, item.craftsRequire) }}
                  </el-tag>
                </div>
                <div
                  v-if="
                    materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
                      && !row.__f_isNoProcess
                  "
                >
                  <el-button
                    style="
                      font-size: 14px;
                      color: #409EFF;
                      cursor: pointer;
                      margin-left: -7px;
                      margin-bottom: -2px;
                      font-weight: normal;
                    "
                    type="primary"
                    text
                    @click="handleNoProcessBtn(row)"
                  >
                    【无工艺】
                  </el-button>
                </div>
              </div>

              <div class="tw-flex tw-flex-col-reverse">
                <el-icon
                  :size="20"
                  class="tw-color-primary tw-cursor-pointer"
                  style="color: #409EFF; font-weight: bold; margin-bottom: 3px;"
                >
                  <Plus @click="handlePlusProcessBtn(row)" />
                </el-icon>
              </div>
            </div>
            <!-- <div
              v-if="
                materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
              "
            >
              <el-form-item>
                <div class="flex flex-align-center">
                  <p>
                    对色：
                  </p>
                  <div class="flex-1">
                    <el-select
                      v-model="row.colorMatch"
                    >
                      <el-option
                        v-for="mateColor in mateColorOptions"
                        :key="mateColor.label"
                        :label="mateColor.label"
                        :value="mateColor.value"
                      />
                    </el-select>
                  </div>
                </div>
              </el-form-item>
            </div> -->
            <!-- </div> -->
          </template>
        </el-table-column>

        <el-table-column label="预估周期" min-width="115px">
          <template #default="{ row }">
            <PurchasingCycleContent :row="row" />
          </template>
        </el-table-column>

        <el-table-column label="单件用量" min-width="100">
          <template #default="{ row }">
            <section
              v-if="row.__f_hasDemand
                && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES"
            />
            <section v-else>
              <span v-if="row.dosageAccount">{{ row.dosageAccount }}{{ row.dosageAccountUnit }}</span>
            </section>
          </template>
        </el-table-column>

        <el-table-column
          label="备注"
          width="190px"
        >
          <template #default="{ row }">
            <el-input
              v-model="row.remark"
              type="textarea"
              row="3"
              placeholder="请输入备注信息"
              maxlength="50"
            />
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="80px"
          fixed="right"
        >
          <template
            v-if="materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
              || materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST"
            #default="{ row }"
          >
            <div class="tw-flex tw-flex-col tw-flex-justify-center">
              <template v-if="row.__f_hasDemand">
                <el-button
                  type="primary"
                  text
                  @click="handleDeleteDemand(row)"
                >
                  <span style="color: var(--el-color-danger)">删除需求</span>
                </el-button>
              </template>
              <template v-else>
                <el-button
                  v-if="
                    materialType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC
                      || materialType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                  "
                  type="primary"
                  text
                  @click="handleSpecificationChangeBtn(row)"
                >
                  更改规格
                </el-button>
                <el-button
                  style="margin-left: 0"
                  type="primary"
                  text
                  @click="handleDeleteMaterial(row)"
                >
                  <span style="color: var(--el-color-danger)">删除</span>
                </el-button>
              </template>
            </div>
            <div v-if="row.__f_hasDemand" class="insert-row-right">
              <div>
                <el-button
                  v-if="row.__f_demandInfo?.supplyChainDemandCode"
                  type="primary"
                  text
                  @click="handleDemandMaterialReplace(row)"
                >
                  更换物料
                </el-button>
                <el-button
                  v-else
                  type="primary"
                  text
                  @click="handleDemandModify(row)"
                >
                  修改
                </el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <ProcessDialog
      v-model:visible="processDialog.visible"
      :preview="processDialog.preview"
      :crafts="processDialog.crafts"
      v-model:data="processDialog.data"
      :batch-dict-list-map="batchDictListMap"
      :craft-match-list="processDialog.craftMatchList"
      @save="(newCrafts: any) => handleNewCrafts(newCrafts)"
    />
  </div>
</template>
<style lang="scss" scoped>
.label {
  font-weight: bold;
}
.margin-left-30 {
  margin-left: 30px;
}
.margin-bottom-8 {
  margin-bottom: 8px;
}
:deep(.el-form-item__label) {
  font-weight: bold;
}
:deep(.el-table__row.cover::after) {
  content: '该物料已下架，请删除后重新添加';
  display: flex;
  position: absolute;
  left: 40px;
  top: 0;
  right: 80px;
  /* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
  bottom: 0;
  color: #D4011C;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.4);
  z-index: 100;
}
:deep(.el-table__row.hat) {
  overflow-x: hidden;
  position: relative;
  .el-table__cell{
    padding-top: 44px;
  }
}
:deep(.el-table__row.hat.hover-row) {
  .insert-row-left,.insert-row-right{
    background-color: var(--el-table-row-hover-bg-color);
  }
}
// :deep(.el-table__row.hat:after) {
//   content: '';
//   position: absolute;
//   top: 0;
//   right: 1px;
//   bottom: 0;
//   left: 1px;
//   height: 40px;
//   background-color: #ffffff;
//   border: 1px solid var(--el-table-border-color);
//   border-left: none;
//   border-top: none;
//   border-right: none;
//   box-sizing: border-box;
//   z-index: 100;
// }
.insert-row-left {
  // $insert-row-width: 0px;
  position: absolute;
  left: -41px;
  top: 0;
  bottom: 0;
  height: 40px;
  // width: var($insert-row-width);
  min-width: 1400px;
  background-color: #fff;
  border: 1px solid var(--el-table-border-color);
  border-left: none;
  border-top: none;
  border-right: none;
  box-sizing: border-box;
  z-index: 100;
  overflow: hidden;
  &.left-1{
    left: -1px;
  }
  p{
    display: flex;
    height: 40px;
    align-items: center;
    padding: 10px;
    span{
      margin-right: 50px;
      &.close-tag{
        font-weight: bold;
        font-size: 1.1em;
        color: #f00;
      }
    }
  }
}
.insert-row-right {
  display: flex;
  position: absolute;
  left: -20px;
  top: 0;
  right: 0;
  /* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
  bottom: 0;
  height: 40px;
  background-color: #fff;
  border: 1px solid var(--el-table-border-color);
  border-left: none;
  border-top: none;
  border-right: none;
  box-sizing: border-box;
  z-index: 101;
  overflow: hidden;
  justify-content: end;
  div{
    display: flex;
    width: 80px;
    height: 40px;
    align-items: center;
    justify-content: center;
  }
}
.material_info_header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  .title {
    // align-self: center;
  }
  .check {
    // align-self: flex-end;
  }
}

</style>
