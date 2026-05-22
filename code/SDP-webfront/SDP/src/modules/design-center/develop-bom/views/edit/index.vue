<!--修改开发bom-->
<template>
  <sc-app-page :main="{ style: 'padding: 0;' }">
    <template #main>
      <el-scrollbar class="tw-h-100%">
        <div class="tw-px-15px tw-pt-20px">
          <!-- 基础信息 -->
          <page-card>
            <section class="tw-flex">
              <p class="tw-flex" style="font-size: 20px; font-weight: bold;">
                {{ detail?.designCode || '' }}{{ detail?.latestColor ? `-${detail?.latestColor}` : '' }}
              </p>
              <div class="tw-flex tw-flex-items-center tw-gap-8px tw-pl-8px">
                <el-tag
                  v-if="detail?.supplyModeName"
                  type="warning"
                >
                  {{detail.supplyModeName}}
                </el-tag>
                <sc-status-label
                  :options="SKC_TYPE_LIST"
                  :value="detail?.skcType"
                  mode="tag"
                />
                <el-tag
                  v-if="detail?.isCanceled"
                  type="danger"
                  effect="plain"
                >
                  取消
                </el-tag>
                <el-tag
                  v-if="detail?.isOnSale"
                  type="success"
                >
                  动销
                </el-tag>
              </div>
            </section>
            <section class="basis-info">
              <div class="tw-flex tw-gap-15px">
                <section class="tw-flex tw-flex-col tw-flex-items-center">
                  <custom-image
                    class="tw-w-120px tw-h-150px"
                    :src="$filters.ossUrl(detail.designPictureList?.[0], 300)"
                    :preview-src-list="detail?.designPictureList"
                    fit="cover"
                  />
                  <p style="margin-top: 6px;">
                    设计图（{{ detail?.designPictureList?.length || 0 }}）
                  </p>
                </section>
              </div>

              <el-descriptions :column="4" class="tw-flex-1">
                <el-descriptions-item
                  label="SPU："
                >
                  {{ detail?.styleCode || '-' }}
                </el-descriptions-item>
                <el-descriptions-item
                  label="SPU创建人员："
                >
                  {{ detail?.spuCreatorName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item
                  label="SPU创建时间："
                >
                  {{ $filters.formatTime(detail?.spuCreatedTime, 'YYYY-MM-DD HH:mm:ss') || '-' }}
                </el-descriptions-item>
                <el-descriptions-item
                  label="SKC创建时间："
                >
                  {{ $filters.formatTime(detail?.skcCreatedTime, 'YYYY-MM-DD HH:mm:ss') || '-' }}
                </el-descriptions-item>
                <el-descriptions-item
                  label="设计师："
                >
                  {{ detail?.designerName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item
                  label="设计组："
                >
                  {{ detail?.designerGroup || '-' }}
                </el-descriptions-item>
                <el-descriptions-item
                  label="款式品类："
                >
                  {{ detail?.categoryName?.replaceAll('-', '/') || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="波段：">
                  {{ detail?.waveBandName || "-" }}
                </el-descriptions-item>
              </el-descriptions>
            </section>
          </page-card>
          <!-- 物料匹配信息 -->
          <section class="back material-list">
            <div class="tw-flex tw-flex-justify-between tw-flex-items-center">
              <p class="tw-flex" style="font-size: 20px; font-weight: bold;">
                开发bom
              </p>
              <div>
                <el-button
                  type="primary"
                  @click="handleAssistDevelopBtn"
                >
                  辅料开发
                </el-button>
                <el-button
                  type="danger"
                  @click="handleDeleteMaterialBtn"
                >
                  删除物料/需求
                </el-button>
                <el-button
                  type="primary"
                  @click="handleAddMaterialBtn"
                >
                  添加物料
                </el-button>
              </div>
            </div>
            <div class="tw-flex tw-flex-items-center" style="padding: 8px 0;">
              <span>引用bom：</span>
              <el-input
                v-model="quoteDesignCodeAvatar"
                placeholder="请输入"
                style="width: 200px;"
              />
              <el-button @click="handleQuoteAction" class='tw-ml-10px'>
                引用
              </el-button>
            </div>
            <div>
              <div class="tw-flex tw-flex-justify-between tw-flex-items-center">
                <h3 style="font-size: 17px; font-weight: bold; margin-top: 8px; margin-bottom: 4px;">
                  面料
                  （{{ eachTypeMaterialCountCalculator(
                    DESIGN_MATERIAL_TYPE_ENUM.FABRIC,
                    materialEditStore.bomOrderMaterialList || []) || '0'
                  }}）
                </h3>
                <span style="font-size: 13px; color: #f00;">
                  面料若无二次工艺，请点击【无工艺】
                </span>
              </div>
              <MaterialEditTable
                ref="fabricTableRef"
                :bom-order-material-list="materialEditStore.bomOrderMaterialList"
                :material-type="DESIGN_MATERIAL_TYPE_ENUM.FABRIC"
                @selection-change="handleFabricTableSelectionChange"
                @specification-change="handleSpecificationChange"
                @delete-material="handleRowDeleteMaterial"
              />
            </div>

            <div>
              <h3 style="font-size: 17px; font-weight: bold; margin-top: 15px; margin-bottom: 4px;">
                辅料
                （{{
                  eachTypeMaterialCountCalculator(
                    DESIGN_MATERIAL_TYPE_ENUM.ASSIST,
                    materialEditStore.bomOrderMaterialList || []
                  ) || '0'
                }}）
              </h3>
              <MaterialEditTable
                ref="assistTableRef"
                :bom-order-material-list="materialEditStore.bomOrderMaterialList"
                :material-type="DESIGN_MATERIAL_TYPE_ENUM.ASSIST"
                @selection-change="handleAssistTableSelectionChange"
                @specification-change="handleSpecificationChange"
                @delete-material="handleRowDeleteMaterial"
                @delete-demand="handleRowDeleteMaterial"
                @demand-modify="handleDemandModify"
                @demand-material-replace="handleDemandMaterialReplace"
              />
            </div>

            <div>
              <h3 style="font-size: 17px; font-weight: bold; margin-top: 15px; margin-bottom: 4px;">
                特殊辅料
                （{{
                  eachTypeMaterialCountCalculator(
                    DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST,
                    materialEditStore.bomOrderMaterialList || []) || '0'
                }}）
              </h3>
              <MaterialEditTable
                ref="specialAssistTableRef"
                :bom-order-material-list="materialEditStore.bomOrderMaterialList"
                :material-type="DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST"
                @selection-change="handleSpecialAssistTableSelectionChange"
                @specification-change="handleSpecificationChange"
              />
            </div>
          </section>
          <!-- 页面按钮区 -->
        </div>
      </el-scrollbar>
    </template>
    <template #ffooter>
      <el-row justify="end" class='tw-w-100%'>
        <el-button @click="handleCancelBtn">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleSubmitBtn"
        >
          提交
        </el-button>
      </el-row>
    </template>

    <AddMaterialDialog
      ref="addMaterialDialogRef"
      v-model="addMaterialDialogStore.visible"
      :bom-id="currentPageBomId"
      :sub-app-options="subAppRouteOptions"
      :type="subAppRouteType"
      @close="handleAddMaterialDialogClose"
      :threeDCollectionOptions="threeDCollectionOptions"
    />
    <AssistDevelopDialog
      v-model="assistDevelopDialogStore.visible"
      :purpose="assistDevelopDialogStore.purpose"
      :material-list="assistDevelopDialogStore.materialList"
      :edit-store="assistDevelopDialogStore.editStore"
      :assist-alphabet-options="assistAlphabetOptions"
      @confirmed="handleAssistDevelopDialogConfrimed"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { camelCase, cloneDeep, sortBy } from 'lodash-es';
import { reactive, ref, nextTick, computed, toRaw, watch } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import {
  useSyncColorMatchMaterialId,
} from '../hooks/index';
import { useRoute, useRouter } from 'vue-router';
import type { ElForm } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { YES_NO_ENUM } from '@/constant';
import {
  DESIGN_MATERIAL_TYPE_ENUM,
  DEMAND_CATEGORY_2_ENUM,
  DEMAND_STATE_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM,
} from '@/modules/design-center/develop-bom/constant';
import {
  getWebV1BomDetailApi,
} from '@/modules/design-center/develop-bom/api';
import MaterialEditTable from '../components/material-edit-table/index.vue';
import AddMaterialDialog from '../components/add-material-dialog/index.vue';
import { OPERATION_TYPE } from '../components/add-material-dialog/constant';
import {
  actionBomSubmit,
  fetchUsableQuoteDesignCode,
  fetchQuoteDesignCodeMaterialList,
} from '@/modules/design-center/develop-bom/api/bom-submit';
import {
  IBomOrderMaterialItem,
  IBomSubmitReq,
  IBomSubmitReqUpdateListItem,
  IBomSubmitReqAddListItem,
  IBomSubmitReqAddDemandListItem,
  IBomSubmitReqUpdateDemandListItem,
  IBomSubmitReqUpdateDemandListUpdateMaterialItem,
  IBomSubmitReqUpdateDemandListAddMaterialItem,
  IDetail
} from './types';
import useHouliuBom from '@/hooks-transfer/use-houliu-bom';
import {
  IBomGoodMaterialFabricMaterialListItem as IFabricListItem,
  IBomGoodMaterialAccessoriesMaterialListItem as IAccessoryListItem,
} from '@/api/product/types';
import {
  useGenerateLocalBomMaterialId,
  prefix,
  useGenerateLocalBomMaterialDemandId,
  PREFIX_DEMAND,
} from '../hooks/use-generate-local-id';
import mitt, { EVENT_BUS_ENUM } from '@/core/event';
import type {
  ICloseDemandSuccessRes,
  IThreeDCollectParams,
} from '@/core/plugins/micro-app/hooks/use-event-config';
import { xssFilter } from '@/core/utils/xss-util';
import { useDictionary } from '@/hooks-transfer/use-dict';
import AssistDevelopDialog from '../components/assist-develop-dialog/index.vue';
import type {
  IEditStore,
  IEmitConfirmedData
} from '../components/assist-develop-dialog/types';
import { PURPOSE_TYPE_ENUM } from '../components/assist-develop-dialog/types';
import { useTransBomDetail } from '../list/hooks/use-trans-bom-detail';
import { useMaterialDemandCombine } from '../detail/hooks/use-material-demand-combine';
import { SKC_TYPE_LIST } from '@/modules/design-center/style-manage/constant';
import {
  IQuoteSkcDetailLatestBomOrderMaterialListItem
} from '../../api/bom-submit/quote-design-code-material-list-types';
import { COMMODITY_TYPE } from '@/core/plugins/micro-app';
import { DICTIONARY_KEY } from '@/constant/dictionary';

/**
 * 3D任务采集的参数
 */
const threeDCollectionOptions = ref<IThreeDCollectParams>();
const { handleBomJson } = useTransBomDetail();

const tableRef = ref<InstanceType<typeof ElForm> | null>(null);

const route = useRoute();
const router = useRouter();
const currentPageBomId = computed(() => {
  return route.params?.bomId as string || '';
});
const {
  batchDictListMap,
} = useDictionary([
  DICTIONARY_KEY.PIMS_ACCESSORY_SERIAL_NUMBER,
  DICTIONARY_KEY.UNIT,
]);
const assistAlphabetOptions = computed(() => {
  const opsOptions = batchDictListMap.value?.[DICTIONARY_KEY.PIMS_ACCESSORY_SERIAL_NUMBER];
  // 字母排序
  return sortBy(opsOptions || [], (e) => {
    return e.value;
  });
});
const unitComputed = computed(() => {
  return batchDictListMap.value?.[DICTIONARY_KEY.UNIT];
});
/**
 * 获取页面初始化数据
 */
const isLackSomeField = ref(false);
const quoteMaterialListFilter = (item: any) => {
  // 判断供应链物料是否存在，如果不存在则过滤并提示。
  if (item?.supplyExistState === YES_NO_ENUM.NO) {
    isLackSomeField.value = true;
    return false;
  }
  if (item?.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC) {
    const shouldKeep = (
      item?.onShelfState === YES_NO_ENUM.YES
          && item?.enableState === YES_NO_ENUM.YES
          && item?.meterPrice
          && item?.meterPriceUnit
    );
    if (!shouldKeep) {
      isLackSomeField.value = true;
    }
    return shouldKeep;
  }
  if (item?.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST) {
    const shouldKeep = (
      item?.onShelfState === YES_NO_ENUM.YES
          && item?.enableState === YES_NO_ENUM.YES
          && item?.minPrice
          && item?.minPriceUnit
    );
    if (!shouldKeep) {
      isLackSomeField.value = true;
    }
    return shouldKeep;
  }
  if (item?.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST) {
    const shouldKeep = (
      item?.minPrice
          && item?.minPriceUnit
    );
    if (!shouldKeep) {
      isLackSomeField.value = true;
    }
    return shouldKeep;
  }
  return false;
};
const detail = ref({} as IDetail);
const materialEditStore = reactive<
{
  // __f_materialList?: IBomOrderMaterialItem[];
  // __f_demandList?: IBomOrderDemandItem[];
  bomOrderMaterialList?: IDetail['bomOrderMaterialList'];
}
>({
  bomOrderMaterialList: [],
});
const quoteDesignCodeAvatar = ref('');
const quoteDesignCode = ref('');
const handleQuoteAction = async () => {
  if (!quoteDesignCodeAvatar.value) return;
  const { data } = await fetchQuoteDesignCodeMaterialList({ quoteDesignCode: quoteDesignCodeAvatar.value });
  if (data && data.bomOrderMaterialList && data.bomOrderMaterialList.length > 0) {
    data.bomOrderMaterialList = data.bomOrderMaterialList.filter((item) => {
      return quoteMaterialListFilter(item);
    });
    // 由于引用进来的物料相当于新添加物料，所以要把bomMaterialId设置为本地id，同时还要处理对色/包扣目标物料项的id
    data.bomOrderMaterialList.map((item) => {
      item.bomMaterialId = useGenerateLocalBomMaterialId();
      return item;
    }).forEach((item) => {
      if (item.colorMatchMaterialName) {
        const targetItem = data.bomOrderMaterialList
          ?.find(v => v.prototypeMaterialName === item.colorMatchMaterialName);
        if (targetItem) {
          item.colorMatchMaterialId = targetItem.bomMaterialId;
        } else {
          item.colorMatchMaterialId = '';
        }
      }
    });
    materialEditStore.bomOrderMaterialList = cloneDeep(toRaw(
      handleBomJson(data.bomOrderMaterialList || [])
    ));
    quoteDesignCode.value = quoteDesignCodeAvatar.value;
    ElMessage.success('引用成功');
    if (isLackSomeField.value) {
      ElMessage.warning('引用BOM时，由于存在部分物料失效未能加入，请注意检查bom内容准确性');
      isLackSomeField.value = false;
    }
  } else {
    ElMessage.warning('该SKC无结果');
  }
};
const setListDefaultValue = (list: IBomOrderMaterialItem[]) => {
  list.forEach((v) => {
    // 初始化对色状态，如果对色状态字段为空时默认赋值为'0'，代表无需对色/包扣
    if (v.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST && !v.colorMatchMaterialState) {
      v.colorMatchMaterialState = IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.NONE;
      v.colorMatchMaterialId = '';
      v.colorMatchMaterialName = '';
      if (v.__f_demandInfo && !v.__f_demandInfo?.colorMatchMaterialState) {
        v.__f_demandInfo.colorMatchMaterialState = IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.NONE;
        v.__f_demandInfo.colorMatchMaterialId = '';
        v.__f_demandInfo.colorMatchMaterialName = '';
      }
    }
  });
};
const getDetails = async (quoteMaterialList?: IQuoteSkcDetailLatestBomOrderMaterialListItem[]) => {
  try {
    const { data: detailData } = await getWebV1BomDetailApi({
      bomId: currentPageBomId.value as string,
      detailType: '1'
    });
    detail.value = {
      ...detailData,
      bomOrderMaterialList: handleBomJson(detailData.bomOrderMaterialList || []),
      materialDemandList: detailData.materialDemandList.map(v => ({
        ...v,
        bomOrderMaterial: v.bomOrderMaterial ? handleBomJson([v.bomOrderMaterial])[0] : undefined
      }))
    };
    threeDCollectionOptions.value = {
      skcCode: detailData.designCode ?? '',
      designerId: detailData.designerId ?? '',
      designerName: detailData.designerName ?? '',
      platform: detailData.platformName ?? '',
      dataSource: 'JV新系统-款式开发平台',
    };
    if (quoteMaterialList) {
      quoteMaterialList = quoteMaterialList.filter((item) => {
        return quoteMaterialListFilter(item);
      });
      // 由于引用进来的物料相当于新添加物料，所以要把bomMaterialId设置为本地id，同时还要处理对色/包扣目标物料项的id
      quoteMaterialList.map((item) => {
        item.bomMaterialId = useGenerateLocalBomMaterialId();
        return item;
      }).forEach((item) => {
        if (item.colorMatchMaterialName) {
          const targetItem = quoteMaterialList?.find(v => v.prototypeMaterialName === item.colorMatchMaterialName);
          if (targetItem) {
            item.colorMatchMaterialId = targetItem.bomMaterialId;
          } else {
            item.colorMatchMaterialId = '';
          }
        }
      });
      materialEditStore.bomOrderMaterialList = cloneDeep(toRaw(
        handleBomJson(quoteMaterialList || [])
      ));
      setListDefaultValue(materialEditStore.bomOrderMaterialList!);
      if (isLackSomeField.value) {
        ElMessage.warning('引用BOM时，由于存在部分物料失效未能加入，请注意检查bom内容准确性');
        isLackSomeField.value = false;
      }
    } else {
      materialEditStore.bomOrderMaterialList = useMaterialDemandCombine(
        detail.value?.bomOrderMaterialList || [],
        detail.value?.materialDemandList || [],
      );
      setListDefaultValue(materialEditStore.bomOrderMaterialList);
    }
    if (detailData.fabricSpuSkuList?.length) {
      await listenBomEvent({
        scene: '' as any,
        commodityType: COMMODITY_TYPE.FABRIC,
        skuIds: detailData.fabricSpuSkuList.map(v => v.skuId),
        spuSkuList: detailData.fabricSpuSkuList.map(v => ({
          skuId: v.skuId!,
          spuId: v.spuId!
        }))
      });
    }
    await nextTick();
    await nextTick();
    tableRef.value?.clearValidate();
  } catch (e) {
    console.error('getDetails error', e);
  }
};

enum BOM_QUOTE_TYPE_ENUM {
  COVER = '1', // 套版款
  EXTEND = '2', // 衍生款
  MULTICOLOR = '3', // 复色款
  CRM_CHANGE = '4', // CRM改款
  DESIGN_CHANGE = '5', // 设计改款

}
const init = async () => {
  let quoteMaterialList: IQuoteSkcDetailLatestBomOrderMaterialListItem[] | null = null;
  const { data } = await fetchUsableQuoteDesignCode(currentPageBomId.value);
  if (data && data.quoteDesignCode) {
    if (data.transientState !== YES_NO_ENUM.YES) {
      if ([
        BOM_QUOTE_TYPE_ENUM.COVER,
        BOM_QUOTE_TYPE_ENUM.EXTEND,
        BOM_QUOTE_TYPE_ENUM.MULTICOLOR,
      ].includes(data.bomQuoteType as BOM_QUOTE_TYPE_ENUM)) {
        try {
          await ElMessageBox.confirm(
            `当前设计款已引用${data.quoteDesignCode}信息，是否需要同步引用开发bom内容？`,
            '引用开发BOM',
            {
              confirmButtonText: '是',
              cancelButtonText: '否',
              // type: 'warning',
            },
          );
          const { data: quoteDesignCodeData } = await fetchQuoteDesignCodeMaterialList(
            {
              quoteDesignCode: data.quoteDesignCode,
              bomQuoteType: data.bomQuoteType
            }
          );
          if (!quoteDesignCodeData || !quoteDesignCodeData?.bomOrderMaterialList?.length) {
            ElMessage.warning('引用的SKC尚未提交bom');
          } else {
            quoteMaterialList = quoteDesignCodeData.bomOrderMaterialList || [];
            quoteDesignCode.value = data.quoteDesignCode;
            quoteDesignCodeAvatar.value = data.quoteDesignCode;
          }
        } catch (e) {
          console.log('e', e);
        }
      } else if ([
        BOM_QUOTE_TYPE_ENUM.CRM_CHANGE,
        BOM_QUOTE_TYPE_ENUM.DESIGN_CHANGE,
      ].includes(data.bomQuoteType as BOM_QUOTE_TYPE_ENUM)) {
        const { data: quoteDesignCodeData } = await fetchQuoteDesignCodeMaterialList({
          quoteDesignCode: data.quoteDesignCode,
          bomQuoteType: data.bomQuoteType
        });
        if (!quoteDesignCodeData || !quoteDesignCodeData?.bomOrderMaterialList?.length) {
          ElMessage.warning('引用的SKC尚未提交bom');
        } else {
          quoteMaterialList = quoteDesignCodeData.bomOrderMaterialList || [];
          quoteDesignCode.value = data.quoteDesignCode;
          quoteDesignCodeAvatar.value = data.quoteDesignCode;
        }
      }
    } else {
      quoteDesignCode.value = data.quoteDesignCode;
      quoteDesignCodeAvatar.value = data.quoteDesignCode;
    }
  }
  if (!quoteMaterialList) {
    await getDetails();
  } else {
    await getDetails(quoteMaterialList);
  }
};
init();

const eachTypeMaterialCountCalculator = computed(() => {
  return (materialType: string, bomOrderMaterialList: IDetail['bomOrderMaterialList']) => {
    return (bomOrderMaterialList?.filter((item) => {
      return item.demandType === materialType;
    }) || []).length;
  };
});
/**
 * 辅料开发按钮
 */
const assistDevelopDialogStore = reactive<{
  visible: boolean;
  materialList: IBomOrderMaterialItem[];
  editStore?: IEditStore;
  purpose: PURPOSE_TYPE_ENUM;
}>({
  visible: false,
  materialList: [],
  editStore: undefined,
  purpose: PURPOSE_TYPE_ENUM.ADD,
});
/**
 * 辅料开发按钮（需求添加）
 */
const handleAssistDevelopBtn = () => {
  assistDevelopDialogStore.purpose = PURPOSE_TYPE_ENUM.ADD;
  assistDevelopDialogStore.materialList = cloneDeep(toRaw(materialEditStore.bomOrderMaterialList)) || [];
  assistDevelopDialogStore.editStore = undefined;
  assistDevelopDialogStore.visible = true;
};
/**
 * 需求修改按钮（需求修改）
 */
const handleDemandModify = (row: IBomOrderMaterialItem) => {
  assistDevelopDialogStore.purpose = PURPOSE_TYPE_ENUM.EDIT;
  assistDevelopDialogStore.materialList = cloneDeep(toRaw(materialEditStore.bomOrderMaterialList)) || [];
  assistDevelopDialogStore.editStore = {
    __f_sourceBomMaterialId: row.bomMaterialId,
    initFormModel: {
      // __f_selectedPrototypeMaterialNameRelatedBomMaterialId: row.__f_demandInfo?.latestBomMaterialId || '',
      __f_selectedPrototypeMaterialNameRelatedprototypeMaterialName: row.prototypeMaterialName || '',
      __f_demandCount: row.__f_demandInfo?.demandNum || '',
      __f_demandCountUnit: row.__f_demandInfo?.demandNumUnit || '',
      __f_isMatchColorOrPackMaterial: row.colorMatchMaterialState || '',
      __f_matchColorOrPackMaterialTargetRelatedBomMaterialId: row.colorMatchMaterialId,
      __f_matchColorOrPackMaterialTargetRelatedprototypeMaterialName: row.colorMatchMaterialName || '',
      __f_pictureList: row.__f_demandInfo?.demandPictureList?.map((v) => { return { url: v }; }) || [],
      __f_demandRemark: row.__f_demandInfo?.demandRemark || '',
    },
  };
  assistDevelopDialogStore.visible = true;
};
/**
 * 需求添加或编辑处理函数
 * @param confirmedData
 * @param isEdit
 */
const handleAssistDevelopDialogConfrimed = (confirmedData: IEmitConfirmedData, isEdit: boolean) => {
  const {
    // eslint-disable-next-line camelcase
    __f_sourceBomMaterialId,
    demandData: data,
  } = confirmedData;
  if (isEdit) {
    console.warn('辅料开发弹窗confirmed(编辑)', confirmedData);
    const shouldModifyItem = materialEditStore.bomOrderMaterialList
      // eslint-disable-next-line camelcase
      ?.find(v => v.bomMaterialId === __f_sourceBomMaterialId);
    if (!shouldModifyItem) return;
    shouldModifyItem.prototypeMaterialName = data.__f_selectedPrototypeMaterialNameRelatedprototypeMaterialName;
    shouldModifyItem.colorMatchMaterialState = data.__f_isMatchColorOrPackMaterial;
    shouldModifyItem.colorMatchMaterialId = data.__f_matchColorOrPackMaterialTargetRelatedBomMaterialId;
    shouldModifyItem.colorMatchMaterialName = data.__f_matchColorOrPackMaterialTargetRelatedprototypeMaterialName;
    // eslint-disable-next-line vue/max-len
    shouldModifyItem.__f_demandInfo!.prototypeMaterialName = data.__f_selectedPrototypeMaterialNameRelatedprototypeMaterialName;
    shouldModifyItem.__f_demandInfo!.demandNum = data.__f_demandCount;
    shouldModifyItem.__f_demandInfo!.demandNumUnit = data.__f_demandCountUnit;
    shouldModifyItem.__f_demandInfo!.demandPictureList = data.__f_pictureList.map(v => v.url) || [];
    shouldModifyItem.__f_demandInfo!.colorMatchMaterialState = data.__f_isMatchColorOrPackMaterial;
    shouldModifyItem.__f_demandInfo!.colorMatchMaterialId = data.__f_matchColorOrPackMaterialTargetRelatedBomMaterialId;
    // eslint-disable-next-line vue/max-len
    shouldModifyItem.__f_demandInfo!.colorMatchMaterialName = data.__f_matchColorOrPackMaterialTargetRelatedprototypeMaterialName;
    shouldModifyItem.__f_demandInfo!.demandRemark = data.__f_demandRemark || '';
  } else {
    console.warn('辅料开发弹窗confirmed(添加)', confirmedData);
    const newMaterialAssist = {
      bomMaterialId: useGenerateLocalBomMaterialId(),
      demandType: DESIGN_MATERIAL_TYPE_ENUM.ASSIST,
      prototypeMaterialName: data.__f_selectedPrototypeMaterialNameRelatedprototypeMaterialName,
      // 本地新增字段，用于form表单填写
      partUse: [],
      cuttingMethod: '',
      craftDemandInfoList: [],
      remark: '',
      /**
     * 对色/包扣状态: 0-无; 1-对色; 2-包扣; (默认0)
     */
      colorMatchMaterialState: data.__f_isMatchColorOrPackMaterial,
      /**
       * 对色/包扣对应物料id
       */
      colorMatchMaterialId: data.__f_matchColorOrPackMaterialTargetRelatedBomMaterialId,
      /**
       * 对色/包扣对应物料名
       */
      colorMatchMaterialName: data.__f_matchColorOrPackMaterialTargetRelatedprototypeMaterialName,
      __f_hasDemand: true,
      __f_demandInfo: {
        /**
         * bom物料需求id-主键
         */
        bomMaterialDemandId: useGenerateLocalBomMaterialDemandId(),
        /**
         * bomId
         */
        bomId: '',
        /**
         * 物料项目名
         */
        prototypeMaterialName: data.__f_selectedPrototypeMaterialNameRelatedprototypeMaterialName,
        /**
         * 需求数量
         */
        demandNum: data.__f_demandCount,
        /**
         * 需求数量单位
         */
        demandNumUnit: data.__f_demandCountUnit,
        /**
         * 物料类型: 1:面料  2:辅料; (默认2)
         */
        materialDemandType: '2',
        /**
         * 需求图片{多张以英文逗号分隔}
         */
        demandPictureList: data.__f_pictureList.map(v => v.url) || [],
        /**
         * 对色/包扣状态: 0-无; 1-对色; 2-包扣; (默认0)
         */
        colorMatchMaterialState: data.__f_isMatchColorOrPackMaterial,
        /**
         * 对色/包扣对应物料id
         */
        colorMatchMaterialId: data.__f_matchColorOrPackMaterialTargetRelatedBomMaterialId,
        /**
         * 对色/包扣对应物料名
         */
        colorMatchMaterialName: data.__f_matchColorOrPackMaterialTargetRelatedprototypeMaterialName,
        /**
         * 需求备注
         */
        demandRemark: data.__f_demandRemark,
        /**
         * 履约需求id
         */
        supplyChainDemandId: '',
        /**
         * 履约需求编号
         */
        supplyChainDemandCode: '',
        /**
         * 履约需求创建时间(暂存时为空, 提交成功后才有)
         */
        demandCreatedTime: '',
        /**
         * 需求处理人名称(提交到履约, 并分配后才有值) 调履约接口查
         */
        demandHandlerName: '',
        /**
         * 需求状态 0:初始化; 100:已提交; 120:履约关闭;190:删除
         */
        demandState: '0',
        /**
         * 找料状态: 0,否; 1,是(找料中)
         */
        materialSearchState: '1',
        /**
         * 匹配数量
         */
        materialMatchNum: '',
        /**
         * 最新bom物料id
         */
        // latestBomMaterialId: data.__f_selectedPrototypeMaterialNameRelatedBomMaterialId,
        latestBomMaterialId: '',
        bomOrderMaterial: {},
      },
    };
    materialEditStore.bomOrderMaterialList?.push(newMaterialAssist as unknown as IBomOrderMaterialItem);
  }
};
/**
 * 删除物料按钮
 */
const fabricTableSelection = ref<IBomOrderMaterialItem[]>([]);
const assistTableSelection = ref<IBomOrderMaterialItem[]>([]);
const specialAssistTableSelection = ref<IBomOrderMaterialItem[]>([]);
const handleFabricTableSelectionChange = (selection: IBomOrderMaterialItem[]) => {
  fabricTableSelection.value = selection || [];
};
const handleAssistTableSelectionChange = (selection: IBomOrderMaterialItem[]) => {
  assistTableSelection.value = selection || [];
};
const handleSpecialAssistTableSelectionChange = (selection: IBomOrderMaterialItem[]) => {
  specialAssistTableSelection.value = selection || [];
};
const materialTableSelection = computed(() => {
  return [...fabricTableSelection.value, ...assistTableSelection.value, ...specialAssistTableSelection.value];
});
const clearMatchColorRelated = (shouldDeleteIndex: number) => {
  materialEditStore.bomOrderMaterialList?.forEach((item) => {
    if (item.colorMatchMaterialId === materialEditStore.bomOrderMaterialList?.[shouldDeleteIndex]?.bomMaterialId) {
      item.colorMatchMaterialId = '';
      item.colorMatchMaterialName = '';
    }
  });
};
const handleDeleteMaterialBtn = () => {
  // console.log('🍓', materialEditStore.bomOrderMaterialList);
  if (!materialTableSelection.value?.length) {
    ElMessage.warning('请至少勾选一条需要删除的物料/需求');
    return;
  }
  materialTableSelection.value?.forEach((selectionItem) => {
    const shouldDeleteIndex = materialEditStore.bomOrderMaterialList
      ?.findIndex(item => item.bomMaterialId === selectionItem.bomMaterialId);
    if (shouldDeleteIndex !== undefined && shouldDeleteIndex >= 0) {
      clearMatchColorRelated(shouldDeleteIndex);
      materialEditStore.bomOrderMaterialList?.splice(shouldDeleteIndex, 1);
    }
  });
};
/**
 * 单行删除物料、单行删除需求
 */
const handleRowDeleteMaterial = (row: IBomOrderMaterialItem) => {
  const shouldDeleteIndex = materialEditStore.bomOrderMaterialList
    ?.findIndex(item => item.bomMaterialId === row.bomMaterialId);
  if (shouldDeleteIndex !== undefined && shouldDeleteIndex >= 0) {
    clearMatchColorRelated(shouldDeleteIndex);
    materialEditStore.bomOrderMaterialList?.splice(shouldDeleteIndex, 1);
  }
};
/**
 * 需求更换物料按钮
 */
const handleDemandMaterialReplace = (row: IBomOrderMaterialItem) => {
  subAppRouteOptions.value = {
    name: 'MaterialDetails',
    query: {
      routerName: 'MaterialDetails',
      demandId: row.__f_demandInfo?.supplyChainDemandId,
    },
  };
  subAppRouteType.value = OPERATION_TYPE.EDIT_DEMAND;
  currentOperatingSpecificationBomMaterialId.value = row.bomMaterialId || '';
  addMaterialDialogStore.visible = true;
};
/**
 * 子应用处理
 */
const addMaterialDialogRef = ref(null);
const addMaterialDialogStore = reactive({
  visible: false,
});
const currentOperatingSpecificationBomMaterialId = ref('');

const subAppRouteOptions = ref<RouteLocationNamedRaw>({});
const subAppRouteType = ref('' as OPERATION_TYPE);
watch(() => [route.query.routerName, route.params.page], () => {
  if (route.query.routerName) {
    subAppRouteOptions.value = {
      name: route.query.routerName as string,
    };
  } else if (route.params.page?.length) {
    let page = camelCase(route.params.page[0]);
    page = page[0].toUpperCase() + page.substr(1);

    subAppRouteOptions.value = {
      name: page,
    };
  }
});

const {
  assistList,
  fabricList,
  listenBomEvent,
} = useHouliuBom({
  onEmit(event) {
    if (event && event?.type === EVENT_BUS_ENUM.HOULIU_BOM_APP.CLOSE_DEMAND_SUCCESS && event?.data) {
      const { demandId: shouldCloseDemandId } = event.data as ICloseDemandSuccessRes;
      const targetItem = materialEditStore.bomOrderMaterialList
        ?.find(v => v.__f_demandInfo?.supplyChainDemandId === shouldCloseDemandId);
      if (targetItem && targetItem.__f_demandInfo) {
        targetItem.__f_demandInfo.demandState = DEMAND_STATE_ENUM.CLOSED;
      }
    }
    addMaterialDialogStore.visible = false;
    router.replace({
      path: `/design-center/develop-bom/edit/${currentPageBomId.value}`,
    });
  },
});
const notAvaliableListHintHandler = (demandType: string, list: any[]) => {
  if (!list.length) return '';
  return list.map((item, index) => {
    if (demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC) {
      let name = '';
      // const commodityType = fabricCommodityTypeFilter(item.categoryNo1);
      const { commodityType } = item;
      if (commodityType === DEMAND_CATEGORY_2_ENUM.PURE) {
        name = item.commodityName;
      } else if (commodityType === DEMAND_CATEGORY_2_ENUM.FLOWER) {
        name = item.flowerCategory;
      }
      return `${index + 1}、${item.commodityCode}-${name}`;
    }
    if (demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST) {
      return `${index + 1}、${item.commodityCode}-${item.commodityName}`;
    }
    return '';
  }).join('<br />');
};
const failAddMaterialHintHandler = (options: {
  demandType: string;
  notAvailableListReasonExist: IFabricListItem[] | IAccessoryListItem[];
  notAvailableListReasonNoStock: IFabricListItem[] | IAccessoryListItem[];
  notAvailableListReasonLackInfo: IFabricListItem[] | IAccessoryListItem[];
}) => {
  const {
    demandType,
    notAvailableListReasonExist,
    notAvailableListReasonNoStock,
    notAvailableListReasonLackInfo,
  } = options;

  const notAvailableListReasonExistHint = notAvailableListReasonExist.length
    ? `当前bom中已存在：<br />${notAvaliableListHintHandler(demandType, notAvailableListReasonExist)}<br /><br />` : '';
  const notAvailableListReasonNoStockHint = notAvailableListReasonNoStock.length
    ? `物料已下架：<br />${notAvaliableListHintHandler(demandType, notAvailableListReasonNoStock)}<br /><br />` : '';
  const notAvailableListReasonLackInfoHint = notAvailableListReasonLackInfo.length
    ? `物料缺少价格信息：<br />${notAvaliableListHintHandler(demandType, notAvailableListReasonLackInfo)}<br /><br />` : '';
  const content = `
    以下物料未能成功添加至bom中，具体原因如下，请选择其他物料再次尝试添加。<br /><br />
    ${notAvailableListReasonExistHint}${notAvailableListReasonNoStockHint}${notAvailableListReasonLackInfoHint}
  `;
  ElMessageBox.alert(xssFilter.process(content), '提示', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true,
  });
};
// 好料网新增过来的物料处理
watch(() => fabricList.value, (newValueList) => {
  // console.log('新添加的物料（面料）：', newValueList);
  // 物料已存在在编辑页
  const notAvailableListReasonExist: IFabricListItem[] = [];
  // 下架的
  const notAvailableListReasonNoStock: IFabricListItem[] = [];
  // 信息不完整的
  const notAvailableListReasonLackInfo: IFabricListItem[] = [];
  const newValueListUsable = newValueList?.filter((ele) => {
    // 物料已存在在编辑页
    // if (materialEditStore?.bomOrderMaterialList?.some(it => it.skuId === ele.skuId)) {
    //   notAvailableListReasonExist.push(ele);
    //   return false;
    // }
    // 未启用的
    if (ele.enableState !== YES_NO_ENUM.YES) {
      notAvailableListReasonNoStock.push(ele);
      return false;
    }
    // 下架的
    if (ele.onShelfState !== YES_NO_ENUM.YES) {
      notAvailableListReasonNoStock.push(ele);
      return false;
    }
    /**
     * 缺乏一些价格信息的
     * 1.没有足米价meterPrice
     * 2.没有（大货）销售单位unit-----优化后去除,不判断
     * 3.没有足米价单位meterPriceUnit
     */
    // if (!fabricSkuPriceVosFilter(ele.skuPriceVos)?.meterPrice) {
    if (!ele.meterPrice) {
      console.warn(`skuId:${ele.skuId}，没有足米价`);
      // ElMessage.warning(`skuId:${ele.skuId}缺少价格信息，请联系物料管理员完善后再添加`);
      notAvailableListReasonLackInfo.push(ele);
      return false;
    }
    // if (!ele.unit) {
    if (!ele.meterPriceUnit) {
      // console.warn(`skuId:${ele.skuId}，没有（大货）销售单位`);
      console.warn(`skuId:${ele.skuId}，没有足米价单位`);
      // ElMessage.warning(`skuId:${ele.skuId}缺少价格信息，请联系物料管理员完善后再添加`);
      notAvailableListReasonLackInfo.push(ele);
      return false;
    }

    return true;
  }) || [];
  if (
    notAvailableListReasonExist.length
    || notAvailableListReasonNoStock.length
    || notAvailableListReasonLackInfo.length
  ) {
    failAddMaterialHintHandler({
      demandType: DESIGN_MATERIAL_TYPE_ENUM.FABRIC,
      notAvailableListReasonExist,
      notAvailableListReasonNoStock,
      notAvailableListReasonLackInfo,
    });
  }
  const bomOrderMaterialList = newValueListUsable?.map((item) => {
    return {
      ...item,
      bomMaterialId: useGenerateLocalBomMaterialId(),
      // 成分
      material: JSON.parse(item.material || '[]'),
      partUse: [],
      cuttingMethod: '',
      craftDemandInfoList: [],
      remark: '',
    } as unknown as IBomOrderMaterialItem;
  }) || [];
  if (currentOperatingSpecificationBomMaterialId.value) {
    // 更换规格
    const index = materialEditStore.bomOrderMaterialList
      ?.findIndex(it => it.bomMaterialId === currentOperatingSpecificationBomMaterialId.value);
    if (index !== undefined && index >= 0 && bomOrderMaterialList.length) {
      const originItem = cloneDeep(materialEditStore.bomOrderMaterialList?.[index]);
      bomOrderMaterialList[0].prototypeMaterialName = originItem?.prototypeMaterialName || '';
      bomOrderMaterialList[0].partUse = originItem?.partUse || [];
      bomOrderMaterialList[0].cuttingMethod = originItem?.cuttingMethod || '';
      // bomOrderMaterialList[0].samplePurchasingCycle = '';
      // bomOrderMaterialList[0].samplePurchasingCycleUnit = '';
      // bomOrderMaterialList[0].bulkPurchasingCycle = '';
      // bomOrderMaterialList[0].bulkPurchasingCycleUnit = '';
      bomOrderMaterialList[0].craftDemandInfoList = originItem?.craftDemandInfoList || [];
      bomOrderMaterialList[0].craftDemandInfoList?.forEach((v) => {
        v.craftDemandId = '';
        v.thirdPartyCraftDemandCode = '';
        v.sampleCraftCycle = '';
        v.sampleCraftCycleUnit = '';
        v.bulkCraftCycle = '';
        v.bulkCraftCycleUnit = '';
      });
      bomOrderMaterialList[0].__f_isNoProcess = originItem?.__f_isNoProcess;
      bomOrderMaterialList[0].remark = originItem?.remark;
      bomOrderMaterialList[0].__f_bomMaterialIdChange = originItem?.bomMaterialId
        ?.includes(prefix) ? originItem.__f_bomMaterialIdChange : originItem?.bomMaterialId;
      materialEditStore.bomOrderMaterialList?.splice(index, 1, ...bomOrderMaterialList);
      useSyncColorMatchMaterialId(
        originItem?.bomMaterialId || '',
        bomOrderMaterialList[0]?.bomMaterialId || '',
        materialEditStore.bomOrderMaterialList || [],
      );
    }
    currentOperatingSpecificationBomMaterialId.value = '';
  } else {
    materialEditStore.bomOrderMaterialList = materialEditStore.bomOrderMaterialList?.concat(bomOrderMaterialList);
  }
});
// 好料网新增过来的辅料处理
watch(() => assistList.value, (newValueList) => {
  // console.log('新添加的物料（辅料）：', newValueList);
  // 物料已存在在编辑页
  const notAvailableListReasonExist: IAccessoryListItem[] = [];
  // 下架的
  const notAvailableListReasonNoStock: IAccessoryListItem[] = [];
  // 信息不完整的
  const notAvailableListReasonLackInfo: IAccessoryListItem[] = [];
  const newValueListUsable = newValueList?.filter((ele) => {
    // 物料已存在在编辑页
    // if (materialEditStore?.bomOrderMaterialList?.some(it => it.skuId === ele.skuId)) {
    //   notAvailableListReasonExist.push(ele);
    //   return false;
    // }
    // 未启用的
    if (ele.enableState !== YES_NO_ENUM.YES) {
      notAvailableListReasonNoStock.push(ele);
      return false;
    }
    // 下架的
    if (ele.onShelfState !== YES_NO_ENUM.YES) {
      notAvailableListReasonNoStock.push(ele);
      return false;
    }
    /**
     * 缺乏一些价格信息的
     * 1.没有最小价格minPrice
     * 2.没有最小单位minPriceUnit
     */
    // if (!ele.__f_matchSkuItem?.minPrice) {
    if (!ele.minPrice) {
      console.warn(`skuId:${ele.skuId}，没有最小价格`);
      notAvailableListReasonLackInfo.push(ele);
      // ElMessage.warning(`skuId:${ele.skuId}缺少价格信息，请联系物料管理员完善后再添加`);
      return false;
    }
    // if (!ele.__f_matchSkuItem?.minUnit) {
    if (!ele.minPriceUnit) {
      console.warn(`skuId:${ele.skuId}，没有最小单位`);
      notAvailableListReasonLackInfo.push(ele);
      // ElMessage.warning(`skuId:${ele.skuId}缺少价格信息，请联系物料管理员完善后再添加`);
      return false;
    }

    return true;
  }) || [];
  if (
    notAvailableListReasonExist.length
    || notAvailableListReasonNoStock.length
    || notAvailableListReasonLackInfo.length
  ) {
    failAddMaterialHintHandler({
      demandType: DESIGN_MATERIAL_TYPE_ENUM.ASSIST,
      notAvailableListReasonExist,
      notAvailableListReasonNoStock,
      notAvailableListReasonLackInfo,
    });
  }
  const bomOrderMaterialList = newValueListUsable?.map((item) => {
    return {
      ...item,
      bomMaterialId: useGenerateLocalBomMaterialId(),
      material: JSON.parse(item.material || '[]'),
      skuAttrs: JSON.parse(item.skuAttrs || '[]'),
      partUse: [],
      cuttingMethod: '',
      craftDemandInfoList: [],
      // colorMatch: '', // 暂时屏蔽，自选物料v0.1先不做
      remark: '',

    } as unknown as IBomOrderMaterialItem;
  }) || [];
  if (currentOperatingSpecificationBomMaterialId.value) {
    // 更换规格
    const index = materialEditStore.bomOrderMaterialList
      ?.findIndex(it => it.bomMaterialId === currentOperatingSpecificationBomMaterialId.value);
    if (index !== undefined && index >= 0 && bomOrderMaterialList.length) {
      const originItem = cloneDeep(materialEditStore.bomOrderMaterialList?.[index]);
      if (originItem?.__f_hasDemand) {
        // originItem?.craftDemandInfoList?.forEach(v => v.craftDemandId = '');
        materialEditStore.bomOrderMaterialList![index] = {
          ...originItem,
          ...bomOrderMaterialList[0],
          bomMaterialId: useGenerateLocalBomMaterialId(),
          prototypeMaterialName: originItem?.prototypeMaterialName || '',
          partUse: originItem?.partUse || '',
          cuttingMethod: originItem?.cuttingMethod || '',
          craftDemandInfoList: originItem?.craftDemandInfoList || [],
          __f_isNoProcess: originItem?.__f_isNoProcess,
          remark: originItem?.remark,
          colorMatchMaterialState: originItem?.colorMatchMaterialState || '',
          colorMatchMaterialId: originItem?.colorMatchMaterialId || '',
          colorMatchMaterialName: originItem?.colorMatchMaterialName || '',
        };
        useSyncColorMatchMaterialId(
          originItem?.bomMaterialId || '',
          materialEditStore.bomOrderMaterialList![index].bomMaterialId || '',
          materialEditStore.bomOrderMaterialList || [],
        );
      } else {
        bomOrderMaterialList[0].prototypeMaterialName = originItem?.prototypeMaterialName || '';
        bomOrderMaterialList[0].partUse = originItem?.partUse || [];
        bomOrderMaterialList[0].cuttingMethod = originItem?.cuttingMethod || '';
        // bomOrderMaterialList[0].samplePurchasingCycle = '';
        // bomOrderMaterialList[0].samplePurchasingCycleUnit = '';
        // bomOrderMaterialList[0].bulkPurchasingCycle = '';
        // bomOrderMaterialList[0].bulkPurchasingCycleUnit = '';
        bomOrderMaterialList[0].craftDemandInfoList = originItem?.craftDemandInfoList || [];
        bomOrderMaterialList[0].craftDemandInfoList?.forEach((v) => {
          v.craftDemandId = '';
          v.thirdPartyCraftDemandCode = '';
          v.sampleCraftCycle = '';
          v.sampleCraftCycleUnit = '';
          v.bulkCraftCycle = '';
          v.bulkCraftCycleUnit = '';
        });
        bomOrderMaterialList[0].__f_isNoProcess = originItem?.__f_isNoProcess;
        bomOrderMaterialList[0].remark = originItem?.remark;
        bomOrderMaterialList[0].__f_bomMaterialIdChange = originItem?.bomMaterialId
          ?.includes(prefix) ? originItem.__f_bomMaterialIdChange : originItem?.bomMaterialId;
        bomOrderMaterialList[0].colorMatchMaterialState = originItem?.colorMatchMaterialState || '';
        bomOrderMaterialList[0].colorMatchMaterialId = originItem?.colorMatchMaterialId || '';
        bomOrderMaterialList[0].colorMatchMaterialName = originItem?.colorMatchMaterialName || '';
        materialEditStore.bomOrderMaterialList?.splice(index, 1, ...bomOrderMaterialList);
        useSyncColorMatchMaterialId(
          originItem?.bomMaterialId || '',
          bomOrderMaterialList[0]?.bomMaterialId || '',
          materialEditStore.bomOrderMaterialList || [],
        );
      }
    }
    currentOperatingSpecificationBomMaterialId.value = '';
  } else {
    /**
     * 给新增加的辅料自动匹配物料项目
     */
    materialEditStore.bomOrderMaterialList = materialEditStore.bomOrderMaterialList?.concat(bomOrderMaterialList);
    const assistAlphabetOptionsAvatar = cloneDeep(toRaw(assistAlphabetOptions.value)) || [];
    materialEditStore.bomOrderMaterialList?.filter((v) => {
      if (v.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST) {
        if (!v.prototypeMaterialName) {
          return true;
        }
        assistAlphabetOptionsAvatar
          .splice(assistAlphabetOptionsAvatar.findIndex(e => e.value === v.prototypeMaterialName), 1);
        return false;
      }
      return false;
    }).forEach((item) => {
      const firstOneOption = assistAlphabetOptionsAvatar.shift();
      item.prototypeMaterialName = firstOneOption?.value || '';
    });
  }
  setListDefaultValue(materialEditStore.bomOrderMaterialList || []);
});
const handleAddMaterialDialogClose = () => {
  currentOperatingSpecificationBomMaterialId.value = '';
};
const handleAddMaterialBtn = async () => {
  subAppRouteOptions.value = {
    name: 'FabricList',
  };
  subAppRouteType.value = OPERATION_TYPE.ADD;

  addMaterialDialogStore.visible = true;
};
/**
 *
 * 更换规格按钮
 */
const handleSpecificationChange = async (row: IBomOrderMaterialItem) => {
  let type = '';
  if (row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC) {
    type = 'FABRIC';
  } else if (row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST) {
    type = 'ACCESSORY';
  }

  subAppRouteOptions.value = {
    name: 'ProductDetails',
    params: {
      id: row.commodityId,
    },
    query: {
      routerName: 'ProductDetails',
      type,
      commodityId: row.commodityId,
    },
  };
  subAppRouteType.value = OPERATION_TYPE.EDIT;
  currentOperatingSpecificationBomMaterialId.value = row.bomMaterialId || '';
  addMaterialDialogStore.visible = true;
};
/**
 * 取消按钮
 */
const handleCancelBtn = () => {
  ElMessageBox.confirm(
    '本次编辑且未提交的内容将不被保存，是否仍要离开？',
    '注意',
    {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning',
    },
  )
    .then(() => {
      router.replace({ name: 'DesignCenterDevelopBomDetail', params: { bomId: currentPageBomId.value } });
    })
    .catch(() => {});
};

const materialAddUpdateDeleteParamHandler = () => {
  const bomOrderMaterialListEditable = cloneDeep(toRaw(materialEditStore.bomOrderMaterialList));
  const bomOrderMaterialListOriginal = cloneDeep(toRaw(detail.value.bomOrderMaterialList));

  /**
   * 处理新增的物料
   */
  const addBomMaterials: IBomSubmitReqAddListItem[] = [];
  bomOrderMaterialListEditable?.filter(v => !v.__f_hasDemand)?.forEach((item) => {
    if (!item.bomMaterialId.includes(prefix)) return;
    addBomMaterials.push({
      bomMaterialIdCopy: item.bomMaterialIdCopy || '',
      prototypeMaterialName: item.prototypeMaterialName,
      demandType: item.demandType,
      commodityId: item.commodityId || '',
      commodityCode: item.commodityCode || '',
      skuId: item.skuId,
      skuCode: item.skuCode || '',
      partUse: (Array.isArray(item.partUse) ? item.partUse?.join(',') : item.partUse) || '',
      cuttingMethod: item.cuttingMethod || '',
      // colorMatch: item.colorMatch, // 暂时屏蔽，自选物料v0.1先不做
      addCraftDemandList: (item?.craftDemandInfoList || []).map((craftItem) => {
        let { picture } = (craftItem as any);
        if (!(craftItem as any).picture) {
          picture = craftItem.pictureList?.join(',') || '';
        }
        return {
          ...craftItem,
          picture
        };
      }),
      remark: item.remark || '',
      isNoCraft: item.__f_isNoProcess ? YES_NO_ENUM.YES : YES_NO_ENUM.NO,
      colorMatchMaterialState: item.colorMatchMaterialState,
      colorMatchMaterialId: item.colorMatchMaterialId?.includes(prefix) ? '' : item.colorMatchMaterialId,
      colorMatchMaterialName: bomOrderMaterialListEditable
        ?.find(v => v.bomMaterialId === item.colorMatchMaterialId)?.prototypeMaterialName || '',
      bomMaterialIdChange: item.__f_bomMaterialIdChange || '',
      identifyMaterialId: item.identifyMaterialId || '',
    });
  });

  /**
   * 处理需要更新的物料
   */
  const updateBomMaterials: IBomSubmitReqUpdateListItem[] = [];
  bomOrderMaterialListEditable?.filter(v => !v.__f_hasDemand)?.forEach((editableMaterialItem) => {
    if (editableMaterialItem.bomMaterialId.includes(prefix)) return;
    const matchingOriginalItem = bomOrderMaterialListOriginal?.find((originalMaterialItem) => {
      return originalMaterialItem.bomMaterialId === editableMaterialItem.bomMaterialId;
    });
    // 修改后的二次工艺数组与原数据数组进行比对，如果修改后的二次工艺数组中没有，但原数组中有该二次工艺，则说明被用户操作删除了
    const delCraftDemandIds = matchingOriginalItem?.craftDemandInfoList.filter((originalCraftDemandItem) => {
      const findIndexResult = editableMaterialItem.craftDemandInfoList?.findIndex((editableCraftDemandItem) => {
        return originalCraftDemandItem.craftDemandId === editableCraftDemandItem.craftDemandId;
      });
      return findIndexResult === undefined || findIndexResult < 0;
    }).map(needDeleteItem => needDeleteItem.craftDemandId.toString()) || [];

    // 前端本地添加的二次工艺没有craftDemandId，所以判断一下没有craftDemandId的话就是用户操作需要添加的
    const addCraftDemandList = editableMaterialItem?.craftDemandInfoList
      .filter(editableCraftDemandItem => !editableCraftDemandItem.craftDemandId) || [];

    updateBomMaterials.push({
      bomMaterialId: editableMaterialItem.bomMaterialId,
      prototypeMaterialName: editableMaterialItem.prototypeMaterialName || '',
      demandType: editableMaterialItem.demandType,
      commodityId: editableMaterialItem.commodityId || '',
      commodityCode: editableMaterialItem.commodityCode || '',
      skuId: editableMaterialItem.skuId,
      skuCode: editableMaterialItem.skuCode || '',
      partUse: (Array.isArray(editableMaterialItem.partUse)
        ? editableMaterialItem.partUse?.join(',') : editableMaterialItem.partUse) || '',
      cuttingMethod: editableMaterialItem.cuttingMethod || '',
      // colorMatch: editableMaterialItem.colorMatch, // 暂时屏蔽，自选物料v0.1先不做
      addCraftDemandList,
      delCraftDemandIds,
      remark: editableMaterialItem.remark || '',
      isNoCraft: editableMaterialItem.__f_isNoProcess ? YES_NO_ENUM.YES : YES_NO_ENUM.NO,
      colorMatchMaterialState: editableMaterialItem.colorMatchMaterialState,
      colorMatchMaterialId: editableMaterialItem.colorMatchMaterialId?.includes(prefix)
        ? '' : editableMaterialItem.colorMatchMaterialId,
      colorMatchMaterialName: bomOrderMaterialListEditable
        ?.find(v => v.bomMaterialId === editableMaterialItem.colorMatchMaterialId)?.prototypeMaterialName || '',
      identifyMaterialId: editableMaterialItem.identifyMaterialId || '',
    });
  });

  /**
   * 处理需要删除的物料
   */
  // 修改后的物料数组与原数据数组进行比对，如果修改后的物料数组中没有，但原数组中有该物料，则说明被用户操作删除了
  const delBomMaterialIds = bomOrderMaterialListOriginal?.filter((originalItem) => {
    const findIndexResult = bomOrderMaterialListEditable?.findIndex((editableItem) => {
      return originalItem.bomMaterialId === editableItem.bomMaterialId;
    });
    if (findIndexResult && findIndexResult >= 0 && bomOrderMaterialListEditable?.[findIndexResult]?.__f_hasDemand) {
      return false;
    }
    return findIndexResult === undefined || findIndexResult < 0;
  }).map(item => item.bomMaterialId);

  return {
    addBomMaterials,
    updateBomMaterials,
    delBomMaterialIds,
  };
};

const demandAddUpdateDeleteParamHandler = () => {
  const bomOrderMaterialListEditable = cloneDeep(toRaw(materialEditStore.bomOrderMaterialList));
  const bomOrderMaterialListOriginal = cloneDeep(toRaw(detail.value.bomOrderMaterialList));
  const bomOrderMaterialDemandListOriginal = cloneDeep(toRaw(detail.value.materialDemandList));

  /**
   * 处理新增的需求
   */
  const addBomMaterialDemandList: IBomSubmitReqAddDemandListItem[] = [];
  bomOrderMaterialListEditable?.filter(v => v.__f_hasDemand)?.forEach((item) => {
    if (!item.__f_demandInfo?.bomMaterialDemandId?.includes(PREFIX_DEMAND)) return;
    addBomMaterialDemandList.push({
      prototypeMaterialName: item.prototypeMaterialName,
      demandNum: item.__f_demandInfo?.demandNum,
      demandNumUnit: item.__f_demandInfo?.demandNumUnit,
      demandNumUnitName: unitComputed.value?.find(v => v.valueCode === item.__f_demandInfo?.demandNumUnit)?.value || '',
      materialDemandType: item.__f_demandInfo?.materialDemandType,
      demandPictureList: item.__f_demandInfo?.demandPictureList,
      colorMatchMaterialState: item.colorMatchMaterialState,
      colorMatchMaterialId: item.colorMatchMaterialId?.includes(prefix) ? '' : item.colorMatchMaterialId,
      colorMatchMaterialName: bomOrderMaterialListEditable
        ?.find(v => v.bomMaterialId === item.colorMatchMaterialId)?.prototypeMaterialName || '',
      demandRemark: item.__f_demandInfo?.demandRemark,
      materialAddReq: {
        /**
          * 被替换的物料id(更换物料时)
          */
        bomMaterialIdChange: '',
        /**
          * 物料项目名
          */
        prototypeMaterialName: item.prototypeMaterialName,
        /**
         * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料
         */
        demandType: item.demandType,
        /**
         * 商品id  (更换物料时必填)
         */
        commodityId: item.commodityId,
        /**
         * 商品编码  (更换物料时必填)
         */
        commodityCode: item.commodityCode,
        /**
         * skuId  (更换物料时必填)
         */
        skuId: item.skuId,
        /**
         * sku编号  (更换物料时必填)
         */
        skuCode: item.skuCode,
        /**
          * 使用部位,字典code
          */
        partUse: (Array.isArray(item.partUse) ? item.partUse?.join(',') : item.partUse) || '',
        /**
          * 裁剪方式,字典code
          */
        cuttingMethod: item.cuttingMethod,
        /**
          * 对色/包扣状态: 0-无; 1-对色; 2-包扣;
          */
        colorMatchMaterialState: item.colorMatchMaterialState,
        /**
          * 对色/包扣对应物料名
          */
        colorMatchMaterialName: bomOrderMaterialListEditable
          ?.find(v => v.bomMaterialId === item.colorMatchMaterialId)?.prototypeMaterialName || '',
        /**
          * 对色/包扣对应物料id --v3.11
          */
        colorMatchMaterialId: item.colorMatchMaterialId?.includes(prefix) ? '' : item.colorMatchMaterialId,
        /**
          * 新增二次工艺信息列表
          */
        addCraftDemandList: (item?.craftDemandInfoList || []).map((craftItem) => {
          let { picture } = (craftItem as any);
          if (!(craftItem as any).picture) {
            picture = craftItem.pictureList?.join(',') || '';
          }
          return {
            ...craftItem,
            picture
          };
        }),
        /**
          * 物料备注
          */
        remark: item.remark,
      },
    });
  });

  /**
   * 处理需要更新的需求
   */
  const updateBomMaterialDemandList: IBomSubmitReqUpdateDemandListItem[] = [];
  bomOrderMaterialListEditable?.filter(v => v.__f_hasDemand)?.forEach((editableMaterialItem) => {
    if (editableMaterialItem.__f_demandInfo?.bomMaterialDemandId.includes(PREFIX_DEMAND)) return;
    const matchingOriginalDemandItem = bomOrderMaterialDemandListOriginal?.find((originalMaterialItem) => {
      return originalMaterialItem.bomMaterialDemandId === editableMaterialItem.__f_demandInfo?.bomMaterialDemandId;
    });
      // 修改后的二次工艺数组与原数据数组进行比对，如果修改后的二次工艺数组中没有，但原数组中有该二次工艺，则说明被用户操作删除了
    const delCraftDemandIds = matchingOriginalDemandItem?.bomOrderMaterial?.craftDemandInfoList
      .filter((originalCraftDemandItem) => {
        const findIndexResult = editableMaterialItem.craftDemandInfoList?.findIndex((editableCraftDemandItem) => {
          return originalCraftDemandItem.craftDemandId === editableCraftDemandItem.craftDemandId;
        });
        return findIndexResult === undefined || findIndexResult < 0;
      }).map(needDeleteItem => needDeleteItem.craftDemandId.toString()) || [];

    // 前端本地添加的二次工艺没有craftDemandId，所以判断一下没有craftDemandId的话就是用户操作需要添加的
    const addCraftDemandList = editableMaterialItem?.craftDemandInfoList
      .filter(editableCraftDemandItem => !editableCraftDemandItem.craftDemandId) || [];
    const updateItem: IBomSubmitReqUpdateDemandListItem = {
      /**
    * bom物料需求id
    */
      bomMaterialDemandId: editableMaterialItem.__f_demandInfo?.bomMaterialDemandId?.includes(PREFIX_DEMAND)
        ? '' : editableMaterialItem.__f_demandInfo?.bomMaterialDemandId || '',
      /**
    * 物料项目名
    */
      prototypeMaterialName: editableMaterialItem.prototypeMaterialName,
      /**
    * 需求数量
    */
      demandNum: editableMaterialItem.__f_demandInfo?.demandNum,
      /**
    * 需求数量单位
    */
      demandNumUnit: editableMaterialItem.__f_demandInfo?.demandNumUnit,
      demandNumUnitName: unitComputed.value
        ?.find(v => v.valueCode === editableMaterialItem.__f_demandInfo?.demandNumUnit)?.value || '',
      /**
    * /**
    * 需求图片集合
    */
      demandPictureList: editableMaterialItem.__f_demandInfo?.demandPictureList,
      /**
    * 对色/包扣状态: 0-无; 1-对色; 2-包扣; (默认0)
    */
      colorMatchMaterialState: editableMaterialItem.colorMatchMaterialState,
      /**
    * 对色/包扣对应物料名
    */
      colorMatchMaterialName: bomOrderMaterialListEditable
        ?.find(v => v.bomMaterialId === editableMaterialItem.colorMatchMaterialId)?.prototypeMaterialName || '',
      colorMatchMaterialId: editableMaterialItem.colorMatchMaterialId?.includes(prefix)
        ? '' : editableMaterialItem.colorMatchMaterialId,
      /**
    * 需求备注
    */
      demandRemark: editableMaterialItem.__f_demandInfo?.demandRemark,
      /**
       * 匹配数量
       */
      materialMatchNum: editableMaterialItem.__f_demandInfo?.materialMatchNum,
      /**
    * 更新物料集合
    */
      materialUpdateReqList: [],
      /**
    * 添加物料集合 --更换物料时, 先删除,再提交
    */
      materialAddReqList: [],
      /**
    * 删除物料id-集合 --更换物料时, 先删除,再提交
    */
      delDemandMaterialIdList: [],
    };

    const materialUpdateReqItem: IBomSubmitReqUpdateDemandListUpdateMaterialItem = {
      /**
    * bom物料ID
    */
      bomMaterialId: editableMaterialItem.bomMaterialId?.includes(prefix) ? '' : editableMaterialItem.bomMaterialId,
      /**
    * 物料项目 面料A、辅料A ...
    *  @NotBlank(message = "物料项目不能为空")
    */
      prototypeMaterialName: editableMaterialItem.prototypeMaterialName,
      /**
    * 商品id
    *  @NotNull(message = "商品Id不能为空")
    */
      commodityId: editableMaterialItem.commodityId,
      /**
    * 商品编码
    *  @NotBlank(message = "商品编号不能为空")
    */
      commodityCode: editableMaterialItem.commodityCode,
      /**
    * skuId
    *  @NotNull(message = "skuId不能为空")
    */
      skuId: editableMaterialItem.skuId,
      /**
    * sku编号
    *  @NotBlank(message = "sku编号不能为空")
    */
      skuCode: editableMaterialItem.skuCode,
      /**
    * 使用部位,字典code
    */
      partUse: (Array.isArray(editableMaterialItem.partUse)
        ? editableMaterialItem.partUse?.join(',') : editableMaterialItem.partUse) || '',
      /**
    * 裁剪方式,字典code
    */
      cuttingMethod: editableMaterialItem.cuttingMethod,
      /**
    * 对色/包扣状态: 0-无, 1-对色, 2-包扣,
    */
      colorMatchMaterialState: editableMaterialItem.colorMatchMaterialState,
      /**
    * 对色/包扣对应物料名
    */
      colorMatchMaterialName: bomOrderMaterialListEditable
        ?.find(v => v.bomMaterialId === editableMaterialItem.colorMatchMaterialId)?.prototypeMaterialName || '',
      /**
    * 对色/包扣对应物料id --v3.11
    */
      colorMatchMaterialId: editableMaterialItem.colorMatchMaterialId
        ?.includes(prefix) ? '' : editableMaterialItem.colorMatchMaterialId,
      /**
    * 新增二次工艺信息列表
    */
      addCraftDemandList,
      /**
    * 删除二次工艺ID列表
    */
      delCraftDemandIds,
      /**
    * 物料备注
    */
      remark: editableMaterialItem.remark,
    };
    if (editableMaterialItem.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES) {
      updateItem?.materialUpdateReqList?.push(materialUpdateReqItem);
    } else if (editableMaterialItem.__f_demandInfo?.materialSearchState === YES_NO_ENUM.NO) {
      if (matchingOriginalDemandItem?.bomOrderMaterial?.bomMaterialId !== editableMaterialItem.bomMaterialId) {
        // 如果此时可编辑数据的bomMaterialId与原始数据的bomMaterialdId对不上，证明更换过物料
        const materialAddReqItem: IBomSubmitReqUpdateDemandListAddMaterialItem = {
          /**
    * 被替换的物料id(更换物料时)
    */
          bomMaterialIdChange: matchingOriginalDemandItem?.bomOrderMaterial?.bomMaterialId,
          /**
    * 物料项目名
    */
          prototypeMaterialName: editableMaterialItem.prototypeMaterialName,
          /**
   * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料
   */
          demandType: editableMaterialItem.demandType,
          /**
   * 商品id  (更换物料时必填)
   */
          commodityId: editableMaterialItem.commodityId,
          /**
   * 商品编码  (更换物料时必填)
   */
          commodityCode: editableMaterialItem.commodityCode,
          /**
   * skuId  (更换物料时必填)
   */
          skuId: editableMaterialItem.skuId,
          /**
   * sku编号  (更换物料时必填)
   */
          skuCode: editableMaterialItem.skuCode,
          /**
    * 使用部位,字典code
    */
          partUse: (Array.isArray(editableMaterialItem.partUse)
            ? editableMaterialItem.partUse?.join(',') : editableMaterialItem.partUse) || '',
          /**
    * 裁剪方式,字典code
    */
          cuttingMethod: editableMaterialItem.cuttingMethod,
          /**
    * 对色/包扣状态: 0-无, 1-对色, 2-包扣,
    */
          colorMatchMaterialState: editableMaterialItem.colorMatchMaterialState,
          /**
    * 对色/包扣对应物料名
    */
          colorMatchMaterialName: bomOrderMaterialListEditable
            ?.find(v => v.bomMaterialId === editableMaterialItem.colorMatchMaterialId)?.prototypeMaterialName || '',
          /**
    * 对色/包扣对应物料id --v3.11
    */
          colorMatchMaterialId: editableMaterialItem.colorMatchMaterialId?.includes(prefix)
            ? '' : editableMaterialItem.colorMatchMaterialId,
          /**
    * 新增二次工艺信息列表
    */
          addCraftDemandList,
          /**
    * 删除二次工艺ID列表
    */
          delCraftDemandIds,
          /**
    * 物料备注
    */
          remark: editableMaterialItem.remark,
        };
        updateItem?.materialAddReqList?.push(materialAddReqItem);
        updateItem?.delDemandMaterialIdList?.push(matchingOriginalDemandItem?.bomOrderMaterial?.bomMaterialId || '');
      } else {
        updateItem?.materialUpdateReqList?.push(materialUpdateReqItem);
      }
    }
    updateBomMaterialDemandList.push(updateItem);
  });

  /**
   * 处理需要删除的需求
   */
  // 修改后的物料数组与原数据数组进行比对，如果修改后的物料数组中没有，但原数组中有该物料，则说明被用户操作删除了
  const delBomMaterialDemandIds = bomOrderMaterialDemandListOriginal?.filter((originalItem) => {
    const findIndexResult = bomOrderMaterialListEditable?.findIndex((editableItem) => {
      return originalItem.bomMaterialDemandId === editableItem.__f_demandInfo?.bomMaterialDemandId;
    });
    if (findIndexResult && findIndexResult >= 0 && bomOrderMaterialListEditable?.[findIndexResult]?.__f_hasDemand) {
      return false;
    }
    return findIndexResult === undefined || findIndexResult < 0;
  }).map(item => item.bomMaterialDemandId);

  return {
    addBomMaterialDemandList,
    updateBomMaterialDemandList,
    delBomMaterialDemandIds,
  };
};
/**
 * 提交按钮
 */
const fabricTableRef = ref();
const assistTableRef = ref();
const specialAssistTableRef = ref();
const handleSubmitBtn = async () => {
  const isFabricTableValidatePass = await fabricTableRef.value?.validateForm?.();
  const isAssistTableValidatePass = await assistTableRef.value?.validateForm?.();
  const isSpecialAssistTableValidatePass = await specialAssistTableRef.value?.validateForm?.();
  if (!isFabricTableValidatePass || !isAssistTableValidatePass || !isSpecialAssistTableValidatePass) {
    return;
  }
  // console.log('原始🍐', detail.value.bomOrderMaterialList);
  // console.log('备份🍓', materialEditStore.bomOrderMaterialList);
  const {
    addBomMaterials,
    updateBomMaterials,
    delBomMaterialIds,
  } = materialAddUpdateDeleteParamHandler();

  const {
    addBomMaterialDemandList,
    updateBomMaterialDemandList,
    delBomMaterialDemandIds,
  } = demandAddUpdateDeleteParamHandler();

  const requestParams: IBomSubmitReq = {
    bomId: currentPageBomId.value,
    bomVersionNum: detail.value.bomVersionNum,
    transientCount: detail.value.transientCount,
    materialSearchState: detail.value.materialSearchState,
    bomOrderState: detail.value.bomOrderState,
    quoteDesignCode: quoteDesignCode.value || '',
    latestPrototypeId: detail.value.latestPrototypeId,
    revisedTime: detail.value.revisedTime,
    addBomMaterials,
    updateBomMaterials,
    delBomMaterialIds,
    addBomMaterialDemandList,
    updateBomMaterialDemandList,
    delBomMaterialDemandIds,
  };
  const isGotFabricOrAssistAtLeast = updateBomMaterials.filter((item) => {
    return item.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC || item.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST;
  }).length || addBomMaterials.filter((item) => {
    return item.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC || item.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST;
  }).length;

  const isGotDemandAtLeast = updateBomMaterialDemandList.length || addBomMaterialDemandList.length;
  if (!(isGotFabricOrAssistAtLeast || isGotDemandAtLeast)) {
    ElMessage.warning('至少有一个面料或辅料或需求才能提交');
    return;
  }
  const { data } = await actionBomSubmit(requestParams);
  ElMessage.success('提交成功');
  router.replace({ name: 'DesignCenterDevelopBomDetail', params: { bomId: data.bomId } });
};

</script>
<script lang="ts">
export default {
  name: 'DesignDevelopBomEdit',
  inheritAttrs: false,
  customOptions: {},
};
</script>
<style scoped lang="scss">
$gap: 15px;
@import "@/modules/design-center/styles/index.scss";
figure {
  .el-image, .el-image-placeholder {
    width: 120px;
    height: 150px;
    margin-right: 20px;
  }
}
.tag {
  height: 20px;
  padding: 0 15px;
  line-height: 20px;
  text-align: center;
  border-radius: 10px;
}
.basis-info {
  display: flex;
  margin-top: 20px;
  flex: 1;
}
:deep(.el-descriptions__cell) {
  width: 25%;
  vertical-align: baseline;
  .el-descriptions__label{
    float: left;
    width: 100px;
    text-align: right;
  }
  .el-descriptions__content{
    display: flex;
  }
}
</style>
