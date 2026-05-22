<!--面辅料采购跟进-->
<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group
        v-model='readSelf'
        class="tw-pb-15px"
        @change="handleSearch()"
      >
        <el-radio-button :value="false">全部</el-radio-button>
        <el-radio-button :value="true">我的</el-radio-button>
      </el-radio-group>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='105px'
        @handleSearch="handleSearch"
        @handle-reset="handleReset"
      >
        <template #designerIdList>
          <DesignerSelect
            v-model="params.designerIdList"
            multiple
            :is-first-load-cache="true"
          />
        </template>
        <template #designerGroupCodeList>
          <DesignerSelect
            v-model="params.designerGroupCodeList"
            type="designer-group"
            :prop="{
              value: 'designerGroupCode'
            }"
            multiple
            :is-first-load-cache="true"
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="header">
        <div class="condition">
          <el-form-item label="二次工艺：">
            <radio-checkbox
              v-model="params.isCraft"
              :options="YES_NO_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="状态：">
            <radio-checkbox
              v-model="params.status"
              :options="EFFECTIVE_STATUS_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
        </div>
        <div class="operation">
          <el-button
            v-if="QXWL"
            type="primary"
            :disabled="selection.length !== 1"
            @click="handleCancelMaterial"
          >
            取消物料
          </el-button>
        </div>
      </div>
    </template>
    <!-- 主体内容 -->
    <template #main>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        height="100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="SKC"
          min-width="140px"
          fixed="left"
        >
          <template #default="{ row }">
            <div class="tw-flex tw-flex-col tw-flex-justify-between">
              <div class="tw-flex tw-flex-col">
                <sc-copy-text :text="row.designCode" />
                <div class="tw-flex tw-flex-col tw-mt-15px">
                  <TagTooltip
                    v-if="row.isCanceled"
                    tooltip-type="cancel"
                    :row="row"
                  >
                    <el-tag type="danger" size="small">
                      取消
                    </el-tag>
                  </TagTooltip>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="采购需求单号"
          width="126px"
          prop="purchaseRequestCode"
        />
        <el-table-column
          label="设计师"
          show-overflow-tooltip
          min-width="120"
        >
          <template #default="{ row }">
            <div class="tw-flex tw-flex-col tw-flex-justify-between">
              <span>{{ row.designerGroup }} </span>
              <span>{{ row.designerName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="齐套单号"
          width="126px"
          prop="materialKittingCode"
        />
        <el-table-column label="物料类型" min-width="85px">
          <template #default="{ row }">
            <span>{{ row.materialCategory }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剪版单号" min-width="100px">
          <template #default="{ row }">
            <span>{{ row.cuttingCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <!--剪版单状态为取消-->
            <TagTooltip
              v-if="row?.status === EFFECTIVE_STATUS_ENUM.CANCELED"
              tooltip-type="purchaseCancel"
              :row="row"
            >
              <el-tag type="info" size="small">
                {{ $filters.getEnumLabel(EFFECTIVE_STATUS_LIST, row.status) || '' }}
              </el-tag>
            </TagTooltip>
            <el-tag
              v-else-if="row?.status === EFFECTIVE_STATUS_ENUM.EFFECTIVE"
              type="success"
              size="small"
            >
              {{ $filters.getEnumLabel(EFFECTIVE_STATUS_LIST, row.status) || '' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="物料id" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ row.materialCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物料名称" min-width="100">
          <template #default="{ row }">
            <span>{{ row.materialName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" min-width="90">
          <template #default="{ row }">
            <custom-image
              :src="$filters.ossUrl(row.matchPicture.split(',')?.[0])"
              :preview-src-list="row.matchPicture.split(',')"
              class="tw-w-60px tw-h-60px"
            />
          </template>
        </el-table-column>
        <el-table-column label="物料颜色" min-width="100">
          <template #default="{ row }">
            <p>{{ row.materialColorNo }}</p>
            <p>{{ row.materialColor }}</p>
          </template>
        </el-table-column>
        <el-table-column label="裁前二次工艺" min-width="120px">
          <template #default="{ row }">
            <div v-if="row?.cuttingProcess" class="tw-flex tw-gap-3px">
              <el-tag
                v-for="(item, index) in (row?.cuttingProcess?.split(',') || [])"
                :key="index"
                type="success"
                size="small"
              >
                {{ item }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="散剪价"
          width="126px"
        >
          <template #default="{ row }">
            <p class="tw-flex tw-items-center">
              <span>{{ row.scatterCutPrice }}</span>
              <el-tooltip
                v-if="row.scatterCutPrice"
                :content="`散剪倍率：${row.scatterCutRatio}`"
                placement="top"
              >
                <el-icon class="tw-font-size-16px tw-ml-2px tw-font-bold" color="red"><Warning /></el-icon>
              </el-tooltip>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="采购数量" min-width="100">
          <template #default="{ row }">
            <span>{{ row.purchaseQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template #default="{ row }">
            <span>{{ row.purchaseUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物料采购状态" min-width="120">
          <template #default="{ row }">
            <span>{{ row.materialPurchaseStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="采购记录"
          width="100px"
          fixed="right"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              text
              @click="handlePurchaseLog(row)"
            >
              采购记录
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #ffooter>
      <el-row
        style="width: 100%"
        type="flex"
        justify="end"
      >
        <pagination
          :total="tableTotal"
          :current-page="params.pageNum"
          :size="params.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
    <!--取消物料弹窗-->
    <cancel-material
      v-model:visible="cancelMaterialVisible"
      :selection="selection"
      @updateList="handleSearch()"
    />
    <operation-drawer
      title="采购记录"
      v-model="drawer.visible"
      :request="getPurchaseOrderLog"
      :config="{
        timeKey: 'createdTime',
        userKey: 'operator',
        contentKey: 'content',
        // 不显示remark
        remarkKey: 'string',
      }"
      :requestParams="drawer.params"
    />
  </sc-app-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useList } from '@/hooks/use-list';
import CancelMaterial from './dialog/cancelMaterial.vue';
import {
  YES_NO_LIST,
} from '@/constant';
import {
  SAMPLE_TYPE_ENUM,
} from '@/modules/design-center/develop-bom/constant';
import { postMaterialPurchasePageListApi, getPurchaseOrderLog } from '../../api';
import type {
  PostMaterialPurchasePageListApiReq,
  postMaterialPurchasePageListApiResListResItem,
} from '../../api/types';
import TagTooltip from '@/modules/design-center/components/tag-tooltip/index.vue';
import { useRoute } from 'vue-router';
import { REGION_LIST, EFFECTIVE_STATUS_LIST, EFFECTIVE_STATUS_ENUM } from '@/constant-transfer';
import DesignerSelect from '@/components/designer-select';
import { useSearch } from './hooks/use-search';
import { usePermissionConfig } from '../../use-permission-config';
import { useAccountStore } from '@/store/account';
import { Warning } from '@element-plus/icons-vue';

export default defineComponent({
  components: {
    CancelMaterial,
    TagTooltip,
    DesignerSelect,
    Warning,
  },
  setup() {
    const route = useRoute();
    const { QXWL } = usePermissionConfig();
    const { searchConfig } = useSearch();
    // 取消物料dialog
    const cancelMaterialVisible = ref(false);
    // 列表勾选项
    const selection = ref<postMaterialPurchasePageListApiResListResItem[]>([]);
    const handleSelectionChange = (checked: postMaterialPurchasePageListApiResListResItem[]) => {
      selection.value = checked || [];
    };

    // 取消物料
    const handleCancelMaterial = (): void => {
      cancelMaterialVisible.value = true;
    };
    const accountStore = useAccountStore();
    const readSelf = ref(false);
    const {
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
    } = useList<postMaterialPurchasePageListApiResListResItem, PostMaterialPurchasePageListApiReq>({
      request: {
        api: postMaterialPurchasePageListApi,
        params: {
          pageNum: 1,
          pageSize: 20,
        },
        handleParams(custom) {
          const { designerIdList = [], ...rest } = custom;
          let designerIds = designerIdList;
          if (readSelf.value) {
            designerIds = [accountStore.account?.id!];
          }
          return {
            ...rest,
            designerIdList: designerIds,
          };
        },
      },
    });
    // 采购记录
    const drawer = reactive({
      visible: false,
      params: {
        demandType: '',
        orderCode: ''
      },
    });

    // 查询并打开采购记录
    const handlePurchaseLog = async (row: postMaterialPurchasePageListApiResListResItem) => {
      const { demandType, cuttingCode } = row;
      if (!cuttingCode) {
        ElMessage.error('所选数据有误，剪版单号不存在');
        return;
      }
      drawer.params = { demandType, orderCode: cuttingCode };
      drawer.visible = true;
    };

    const init = () => {
      if (route.query.purchaseOrderNo) {
        params.value.purchaseOrderNo = route.query.purchaseOrderNo as string;
      }
      handleSearch();
    };
    init();
    return {
      readSelf,
      getPurchaseOrderLog,
      searchConfig,
      QXWL,
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
      cancelMaterialVisible,
      handleCancelMaterial,
      selection,
      handleSelectionChange,
      drawer,
      handlePurchaseLog,
      YES_NO_LIST,
      EFFECTIVE_STATUS_LIST,
      EFFECTIVE_STATUS_ENUM,
      REGION_LIST,
      SAMPLE_TYPE_ENUM,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .condition {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    padding-right: 30px;
    .el-form-item {
      margin-right: 40px;
      margin-bottom: 0;
      :deep(.el-form-item__label) {
        font-size: 14px;
        font-weight: bold;
      }
      :deep(.el-checkbox__label) {
        font-weight: 400;
        font-size: 12px;
      }
    }
  }
  .operation {
    flex-shrink: 0;
  }
}
</style>
