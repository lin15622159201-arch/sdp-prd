<!--查看开发bom-->
<template>
  <sc-app-page :main="{ style: 'padding: 0' }">
    <template #header>
      <!--按钮区域-->
      <section class="tw-px-10px tw-pt-10px">
        <el-button size="small" @click="handleGoBackBtn">
          返回
        </el-button>
        <el-button
          v-if="CGSQ"
          size="small"
          type="primary"
          :disabled="isApplyPermission"
          @click="handlePurchaseBtn"
        >
          采购申请
        </el-button>
        <el-button
          v-if="BJ"
          size="small"
          type="primary"
          :disabled="!detail.isDisplayUpdateBomButton"
          @click="handleEdit"
        >
          编辑
        </el-button>
      </section>
    </template>
    <template #main>
      <el-scrollbar>
        <div class="tw-px-15px">
          <section class="version-group">
            <el-select
              v-model="currentSelectedBomId"
              style="width: 180px"
              @change="handleSelectedBomIdChange"
            >
              <el-option
                v-for="bomOrderHistoryVersionItem in detail?.bomOrderHistoryVersionList"
                :key="bomOrderHistoryVersionItem?.bomId"
                :label="`${bomOrderHistoryVersionItem.bomCode}-${bomOrderHistoryVersionItem.bomVersionNum}`"
                :value="bomOrderHistoryVersionItem.bomId"
              />
            </el-select>
            <div>
              <div class="tw-flex tw-flex-justify-end">
                <el-tag
                  v-if="detail.materialSearchState === YES_NO_ENUM.YES"
                  type="danger"
                  effect="plain"
                  size="large"
                  style="margin-right: 8px;"
                >
                  找料中
                </el-tag>
                <sc-status-label
                  style="margin-left: 8px"
                  :options="BOM_ORDER_STATUS_LIST"
                  :value="detail?.bomOrderState"
                  mode="tag"
                />
              </div>
              <div class="time">
                提交时间：{{
                  detail.bomSubmitTime
                    ? $filters.formatTime(detail.bomSubmitTime, "YYYY-MM-DD HH:mm:ss")
                    : "-"
                }}
              </div>
            </div>
          </section>
          <!-- 基础信息 -->
          <page-card>
            <section class="tw-flex">
              <p class="tw-flex" style="font-size: 20px; font-weight: bold">
                {{ detail?.designCode || "" }}{{ detail?.latestColor ? `-${detail?.latestColor}` : "" }}
              </p>
              <el-tag
                v-if="detail?.supplyModeName"
                style="margin-left: 8px"
                type="warning"
              >
                {{detail.supplyModeName}}
              </el-tag>
              <sc-status-label
                style="margin-left: 8px"
                :options="SKC_TYPE_LIST"
                :value="detail?.skcType"
                mode="tag"
              />
              <el-tag
                v-if="detail?.isCanceled"
                style="margin-left: 8px"
                type="danger"
                effect="plain"
              >
                取消
              </el-tag>
              <el-tag
                v-if="detail?.isOnSale"
                style="margin-left: 8px"
                type="success"
              >
                动销
              </el-tag>
            </section>
            <section class="basis-info">
              <div class="tw-flex tw-gap-20px">
                <section class="tw-flex tw-flex-col tw-flex-items-center">
                  <custom-image
                    fit="cover"
                    class='tw-w-120px tw-h-150px'
                    :src="$filters.ossUrl(detail.designPictureList?.[0], 300)"
                    :preview-src-list="detail.designPictureList"
                  />
                  <p style="margin-top: 6px">
                    设计图（{{ detail?.designPictureList?.length || 0 }}）
                  </p>
                </section>
              </div>

              <el-descriptions :column="4" class="tw-flex-1">
                <el-descriptions-item label="SPU：">
                  {{ detail?.styleCode || "-" }}
                </el-descriptions-item>
                <el-descriptions-item label="SPU创建人员：">
                  {{ detail?.spuCreatorName || "-" }}
                </el-descriptions-item>
                <el-descriptions-item label="SPU创建时间：">
                  {{ $filters.formatTime(detail?.spuCreatedTime, "YYYY-MM-DD HH:mm:ss") || "-" }}
                </el-descriptions-item>
                <el-descriptions-item label="SKC创建时间：">
                  {{ $filters.formatTime(detail?.skcCreatedTime, "YYYY-MM-DD HH:mm:ss") || "-" }}
                </el-descriptions-item>
                <el-descriptions-item label="设计师：">
                  {{ detail?.designerName || "-" }}
                </el-descriptions-item>
                <el-descriptions-item label="设计组：">
                  {{ detail?.designerGroup || "-" }}
                </el-descriptions-item>
                <el-descriptions-item label="款式品类：">
                  {{ detail?.categoryName?.replaceAll("-", "/") || "-" }}
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
              <p class="tw-flex" style="font-size: 20px; font-weight: bold">
                开发bom
              </p>
            </div>
            <div class="tw-flex tw-flex-items-center" style="padding: 10px 0">
              <span v-if="detail?.quoteDesignCode">引用bom：{{ detail?.quoteDesignCode }}</span>
            </div>
            <el-table
              ref="tableRef"
              :data="detail.bomOrderMaterialList"
              border
              style="width: 100%"
              :row-class-name="handleRowClassName"
            >
              <el-table-column
                prop="prototypeMaterialName"
                label="物料项目"
                fixed="left"
                min-width="130px"
              >
                <template #default="{ row, $index }">
                  {{ handleInsertRow($index) }}
                  <p>{{ row.prototypeMaterialName }}</p>
                  <el-tag v-if="row.purchaseApplyFollowCount" type="warning">
                    采购申请 {{ row.purchaseApplyFollowCount }} 次
                  </el-tag>
                  <div
                    v-if="row.__f_hasDemand"
                    class="insert-row-left"
                  >
                    <p>
                      <span>
                        需求编号：
                        <el-button
                          type="primary"
                          text
                          @click="handleDemandMaterialReplace(row)"
                        >
                          {{ row.__f_demandInfo?.supplyChainDemandCode || '-' }}
                        </el-button>
                      </span>
                      <span>
                        匹配数：{{ row.__f_demandInfo?.materialMatchNum || '-' }}
                      </span>
                      <span>
                        需求时间：
                        {{ row.__f_demandInfo?.demandCreatedTime
                          ? $filters.formatTime(row.__f_demandInfo?.demandCreatedTime)
                          : '-' }}
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

              <el-table-column label="物料信息" min-width="155px">
                <template #default="{ row }">
                  <section
                    v-if="row.__f_hasDemand && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES"
                  >
                    <span class="tw-text-danger">找料中</span>
                  </section>
                  <section v-else>
                    <div v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC">
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
                      <div v-if="row.commodityType === DEMAND_CATEGORY_2_ENUM.PURE">
                        <b>品名：</b>
                        {{ row.commodityName || '-' }}
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
                        {{ row.commodityCode || "-" }}
                      </div>
                      <div>
                        <b>SKU：</b>
                        {{ row.skuCode || "-" }}
                      </div>
                      <div>
                        <b>货号：</b>
                        {{ row.commodityNumber || "-" }}
                      </div>
                      <div>
                        <b>品名：</b>
                        {{ row.commodityName || "-" }}
                      </div>
                      <div v-if="row.isPlanning === YES_NO_ENUM.YES" style="color: #E99D42;">
                        企划料{{ row.bandDate ? `：${$filters.formatTime(row.bandDate, 'YYYY年MM月')}` : '' }}
                      </div>
                    </div>
                  </section>
                </template>
              </el-table-column>

              <el-table-column label="图片" width="100px">
                <template #default="{ row }">
                  <section
                    v-if="row.__f_hasDemand && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES"
                  />
                  <section v-else>
                    <custom-image
                      class="img-thumbnail__table"
                      :src="$filters.ossUrl(row.matchPictureList?.[0])"
                      :preview-src-list="row.matchPictureList"
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
                      <span>
                        <b>幅宽</b>：{{
                          row.widthConfirm ? `${row.widthConfirm}cm` : row.widthStrFormat
                        }}
                      </span>
                      <span>
                        <b>克重</b>：{{ row.weightStrFormat }}
                      </span>
                      <span>
                        <b>颜色</b>
                        ：{{ row.colorName}}{{ row.colorNumber ? `(${row.colorNumber})` : "" }}
                      </span>
                    </div>
                    <!--辅料-->
                    <div
                      v-if="
                        row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                          || row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST
                      "
                      class="tw-flex tw-flex-col"
                    >
                      <span v-for="attr in row.skuAttrs || []" :key="attr.attrId">
                        <b>{{ attr.attrName }}：</b>
                        {{ attr.attrValue }}
                      </span>
                    </div>
                  </section>
                </template>
              </el-table-column>

              <el-table-column label="成分/材质">
                <template #default="{ row }">
                  <section
                    v-if="row.__f_hasDemand && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES"
                  />
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
                    v-if="row.__f_hasDemand && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES"
                  />
                  <section v-else>
                    <div class="tw-flex tw-flex-col">
                      <template v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC">
                        <!-- <span><b>剪版销价：</b>{{ row.matchSampleGuidePrice }}元/{{ row.matchSampleUnit }}</span>
                      <span><b>大货销价：</b>{{ row.matchGuidePrice }}元/{{ row.matchCostPriceUnit }}</span> -->
                        <span>
                          <b>足米价：</b>{{ row.bulkPurchasePrice }}元/{{ row.bulkPurchasePriceUnit }}
                        </span>
                        <span>
                          <b>空差：</b>{{ row.matchPurchaseGap }}
                        </span>
                      </template>
                      <template v-if="row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST">
                        <!-- <span><b>销售价格：</b>{{ row.matchSalePrice }}元/{{ row.matchPurchaseUnitName }}</span> -->
                        <span>
                          <b>包装数量：</b>{{ row.packNumber }}{{ row.packAssistantUnitName }}/{{ row.packUnitName }}
                        </span>
                      </template>
                      <template
                        v-if="
                          row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                            || row.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST
                        "
                      >
                        <span>
                          <b>大货进价：</b>{{ row.bulkPurchasePrice }}元/{{ row.bulkPurchasePriceUnit }}
                        </span>
                      </template>
                      <span v-if="row.priceInvalidTime">
                        <!-- 增加 失效日期 -->
                        {{ $filters.formatTime(row.priceInvalidTime) }}
                      </span>
                    </div>
                  </section>
                </template>
              </el-table-column>

              <el-table-column label="使用部位">
                <template #default="{ row }">
                  <span>{{ getLabelsByCodes(row.partUse) }}</span>
                </template>
              </el-table-column>

              <el-table-column label="裁剪方法/对色" width="140px">
                <template #default="{ row }">
                  <!--裁剪方法-->
                  <div>
                    <span v-if="row.demandType !== DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST">
                      {{ cuttingMethodOpts.find((item) => item.code === row.cuttingMethod)?.desc || "" }}
                    </span>
                  </div>
                  <!--对色-->
                  <div
                    v-if="
                      row.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST
                        && row.colorMatchMaterialState
                    "
                  >
                    <span v-if="(row.colorMatchMaterialState === IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.NONE)">
                      {{ $filters.getEnumLabel(
                        IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2,
                        row.colorMatchMaterialState) }}
                    </span>
                    <span v-else>
                      {{ $filters.getEnumLabel(
                        IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2,
                        row.colorMatchMaterialState
                      ) }}
                      ：{{ row.colorMatchMaterialName || '-' }}
                    </span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="二次工艺" min-width="140px">
                <template #default="{ row }">
                  <p v-if="row.isNoCraft === YES_NO_ENUM.YES">
                    无工艺
                  </p>
                  <div
                    v-else
                    class="tw-flex tw-flex-justify-between"
                    style="min-height: 60px"
                  >
                    <div class="tw-flex tw-flex-col">
                      <el-tag
                        v-for="(item, index) in row.craftDemandInfoList"
                        :key="index"
                        plain
                        style="margin: 5px 0 0; cursor: pointer"
                        @click="previewCraft(item)"
                      >
                        {{ item.category3 || item.category2 }}/{{
                          $filters.getEnumLabel(CRAFTS_REQUIRE_LIST, item.craftsRequire)
                        }}
                      </el-tag>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="单件用量">
                <template #default="{ row }">
                  <section
                    v-if="row.__f_hasDemand && row.__f_demandInfo?.materialSearchState === YES_NO_ENUM.YES"
                  />
                  <section v-else>
                    <span>{{ row.dosageAccount }}{{ row.dosageAccountUnit }}</span>
                  </section>
                </template>
              </el-table-column>

              <el-table-column
                label="备注"
                width="220px"
                fixed="right"
              >
                <template #default="{ row }">
                  <p v-if="row.materialRemarkList?.length">
                    {{ row.materialRemarkList[0]?.remark }}
                  </p>
                  <div v-if="row.__f_hasDemand" class="insert-row-right" />
                </template>
              </el-table-column>
            </el-table>
          </section>
        </div>
      </el-scrollbar>
    </template>

    <!--二次工艺弹框-->
    <ProcessDialog
      v-model:visible="processDialog.visible"
      :preview="processDialog.preview"
      :crafts="processDialog.crafts"
      :data="processDialog.data"
      :batch-dict-list-map="batchDictListMap"
      :craft-match-list="processDialog.craftMatchList"
    />
    <!--采购申请弹窗-->
    <PurchaseApplyDialog
      v-model="purchaseDialog.visible"
      :design-code="purchaseDialog.designCode"
      @success="handlePurchaseApplySuccess"
    />
    <AddMaterialDialog
      ref="addMaterialDialogRef"
      v-model="addMaterialDialogStore.visible"
      :bom-id="currentPageBomId"
      :sub-app-options="subAppRouteOptions"
      :type="subAppRouteType"
      base-route="/design-center/develop-bom/detail"
      :threeDCollectionOptions="threeDCollectionOptions"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, nextTick, watch } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import type { ElTable } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { craftMatch, getWebV1BomDetailApi } from '../../api';
import type { ICraftMatchReqItem, IBomPrintCraftDemandInfoListItem } from '../../api/types';
import ProcessDialog from '../../components/process-dialog/index.vue';
import { YES_NO_ENUM } from '@/constant';
import {
  CRAFTS_REQUIRE_LIST,
  BOM_ORDER_STATUS_ENUMS,
  DESIGN_MATERIAL_TYPE_ENUM,
  BOM_ORDER_STATUS_LIST,
  DEMAND_CATEGORY_2_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM,
  IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2,
  DEMAND_STATE_ENUM,
} from '@/modules/design-center/develop-bom/constant';

import { useDictionary } from '@/hooks-transfer/use-dict';
import PurchaseApplyDialog from '../../components/purchase-apply-dialog/batch.vue';
import { useMaterialDemandCombine } from './hooks/use-material-demand-combine';
import AddMaterialDialog from '../components/add-material-dialog/index.vue';
import { OPERATION_TYPE } from '../components/add-material-dialog/constant';
import { camelCase } from 'lodash-es';
import { SKC_TYPE_LIST } from '../../../style-manage/constant';
import { useTransBomDetail } from '../list/hooks/use-trans-bom-detail';
import { IDetail } from './types';
import { IBomOrderMaterialItem } from '../edit/types';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { usePermissionConfig } from '../../use-permission-config';
import { IThreeDCollectParams } from '@/core/plugins/micro-app/hooks/use-event-config/types';

/**
 * 3D任务采集的参数
 */
const threeDCollectionOptions = ref<IThreeDCollectParams>();
const { BJ, CGSQ } = usePermissionConfig();
const { handleBomJson, getLabelsByCodes } = useTransBomDetail();

const {
  params: { bomId },
} = useRoute();
const router = useRouter();
const route = useRoute();
const currentPageBomId = computed(() => {
  return route.params?.bomId as string || '';
});
const { batchDictListMap } = useDictionary([
  DICTIONARY_KEY.PLM_PURCHASE_YLBW,
  DICTIONARY_KEY.BOM_CUTTING_METHOD,
]);
// 获取裁剪方法下拉
const cuttingMethodOpts = computed(() => {
  return (
    batchDictListMap.value?.[DICTIONARY_KEY.BOM_CUTTING_METHOD]?.map((item) => {
      return {
        code: item.valueCode,
        desc: item.value,
      };
    }) || []
  );
});

// 获取页面数据
const currentSelectedBomId = ref('');

const detail = ref({} as unknown as IDetail);
const getDetails = async (options?: { bomId: string; }) => {
  const reqBomId = options?.bomId || bomId;
  const { data } = await getWebV1BomDetailApi({ bomId: reqBomId as string, detailType: '0' });
  // data.bomOrderMaterialList = handleBomJson(
  //   data?.bomOrderMaterialList || [],
  // );
  // data?.materialDemandList?.forEach((materialDemand) => {
  //   if (materialDemand.bomOrderMaterial) {
  //     materialDemand.bomOrderMaterial = handleBomJson<IBomOrderMaterialItem>([materialDemand.bomOrderMaterial])?.[0];
  //   }
  // });
  const materialDemandList = data.materialDemandList.map(v => ({
    ...v,
    bomOrderMaterial: handleBomJson([v.bomOrderMaterial!])[0]
  }));
  detail.value = {
    ...data,
    bomOrderMaterialList: useMaterialDemandCombine(
      handleBomJson(data.bomOrderMaterialList),
      materialDemandList
    ),
    materialDemandList
  };
  currentSelectedBomId.value = reqBomId as string;
  threeDCollectionOptions.value = {
    skcCode: data.designCode ?? '',
    designerId: data.designerId ?? '',
    designerName: data.designerName ?? '',
    platform: data.platformName ?? '',
    dataSource: 'JV新系统-款式开发平台',
  };
};
const handleSelectedBomIdChange = async (newValue: string) => {
  await getDetails({ bomId: newValue });
};

const handleEdit = () => {
  // const { isPass, blockMsg } = useNewOrShelfOperabilityVerify(
  //   detail.value?.onShelfStatus,
  //   detail.value?.putOnShelfStatus,
  //   detail.value?.designerName,
  //   detail.value?.putOnShelfPerson,
  // );
  // if (!isPass) {
  //   ElMessage.warning(blockMsg);
  //   return;
  // }
  router.push({
    name: 'DesignCenterDevelopBomEdit',
    params: { bomId: currentSelectedBomId.value as string },
  });
};

// 采购申请权限
const isApplyPermission = computed(() => {
  return (
    detail.value.bomOrderState === BOM_ORDER_STATUS_ENUMS.WAIT_SUBMIT
    || detail.value.bomOrderState === BOM_ORDER_STATUS_ENUMS.CLOSED
    || detail.value.isCanceled
  );
});

// 二次工艺弹窗
const processDialog = reactive({
  visible: false,
  preview: false,
  crafts: {} as IBomPrintCraftDemandInfoListItem,
  data: {} as IBomOrderMaterialItem,
  craftMatchList: [] as ICraftMatchReqItem[],
});

const getCraftMatch = async (craftDemandId: string = '') => {
  const { data = [] } = await craftMatch({
    craftDemandId,
  });
  processDialog.craftMatchList = data || [];
};
const previewCraft = async (crafts: IBomPrintCraftDemandInfoListItem) => {
  processDialog.preview = true;
  processDialog.crafts = crafts;
  if (processDialog.preview) {
    await getCraftMatch(crafts.craftDemandId);
  }
  processDialog.visible = true;
};
const init = async () => {
  await getDetails();
};
init();

/**
 * 采购申请
 */
const purchaseDialog = reactive({
  visible: false,
  designCode: '',
});
const handlePurchaseBtn = () => {
  purchaseDialog.designCode = detail.value?.designCode || '';
  purchaseDialog.visible = true;
};
const handlePurchaseApplySuccess = () => {
  purchaseDialog.visible = false;
  init();
};

const handleGoBackBtn = async () => {
  await router.replace({
    name: 'DesignCenterDevelopBomList',
  });
};
/**
 * 处理需求顶部栏
 */
const handleRowClassName = ({ row }: { row: IBomOrderMaterialItem; }) => {
  if (row.__f_hasDemand) {
    return 'hat';
  }
  return undefined;
};
const tableRef = ref<InstanceType<typeof ElTable>>();
const handleInsertRow = (index: number) => {
  if (detail.value.bomOrderMaterialList.length - 1 === index) {
    nextTick(() => {
      const doms = document.querySelectorAll('.insert-row-left');
      doms.forEach(dom => dom?.setAttribute('style', `width: ${tableRef.value?.bodyWidth}`));
    });
  }
};

/**
 * 子应用处理
 */
const addMaterialDialogRef = ref(null);
const addMaterialDialogStore = reactive({
  visible: false,
});

const handleDemandMaterialReplace = (row: IBomOrderMaterialItem) => {
  subAppRouteOptions.value = {
    name: 'MaterialDetails',
    query: {
      routerName: 'MaterialDetails',
      demandId: row.__f_demandInfo?.supplyChainDemandId,
    },
  };
  subAppRouteType.value = OPERATION_TYPE.CHECK_DEMAND;
  addMaterialDialogStore.visible = true;
};
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
</script>

<style scoped lang="scss">
$gap: 15px;
@import "@/modules/design-center/styles/index.scss";
figure {
  .el-image,
  .el-image-placeholder {
    width: 120px;
    height: 150px;
    margin-right: 20px;
  }
}
.basis-info {
  display: flex;
  margin-top: 20px;
  flex: 1;
}
.version-group {
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .time {
    margin-top: 6px;
    font-size: 12px;
  }
}
:deep(.el-descriptions__cell) {
  width: 25%;
  vertical-align: baseline;
  .el-descriptions__label {
    float: left;
    width: 100px;
    text-align: right;
  }
  .el-descriptions__content {
    display: flex;
  }
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
  left: -1px;
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
  overflow: visible;
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
  position: absolute;
  inset: 0;
  height: 40px;
  background-color: #fff;
  border: 1px solid var(--el-table-border-color);
  border-left: none;
  border-top: none;
  border-right: none;
  box-sizing: border-box;
  z-index: 101;
  overflow: visible;
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
