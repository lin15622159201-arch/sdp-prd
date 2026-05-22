<!--开发bom-->
<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group v-model="params.readSelf" @change='handleSearch()'>
        <el-radio-button :value="YES_NO_ENUM.NO">全部</el-radio-button>
        <el-radio-button :value="YES_NO_ENUM.YES">我的</el-radio-button>
      </el-radio-group>
      <Tabs
        v-model="params.bomOrderState"
        :config="tabsList"
        :border="false"
        @change="handleTabClick"
        class="tw-px-10px tw-pt-10px tw-pb-10px"
      />
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='80px'
        @handleSearch="handleSearch()"
        @handle-reset="handleCustomReset"
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
        <template #categoryNameList>
          <el-cascader
            v-model="params.categoryNameList"
            :options="pimsCategory as any"
            collapse-tags
            show-all-levels
            :props="pimsCategoryProps"
            class="tw-w-100%"
            clearable
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="header">
        <div class="condition">
          <el-form-item label="找料中：">
            <radio-checkbox
              v-model="params.materialSearchState"
              :options="YES_NO_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="动销：">
            <radio-checkbox
              v-model="params.isOnSale"
              :options="YES_NO_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
          <el-form-item label="二次工艺：">
            <radio-checkbox
              v-model="params.isCraft"
              :options="YES_OR_NO_NUMBER_LIST"
              @change="handleSearch(1)"
            />
          </el-form-item>
        </div>
        <div class="operation">
          <el-button
            type="primary"
            v-if="DC"
            :disabled="tableTotal === 0"
            @click="handleExport"
          >
            导出
          </el-button>
          <el-button
            v-if="
              showPrintBomBtn && DYBOM
            "
            type="warning"
            :disabled="!printBomBtnUsable"
            @click="handlePrintBom"
          >
            打印BOM
          </el-button>
          <el-button
            v-if="(
              params.bomOrderState === BOM_ORDER_STATUS_ENUMS.CALCULATED
              || params.bomOrderState === BOM_ORDER_STATUS_ENUMS.SUBMITTED
            ) && XZBOM"
            type="primary"
            :disabled="!calculatedBtn"
            @click="downloadBOM"
          >
            下载BOM单
          </el-button>
        </div>
      </div>
    </template>
    <!-- 主体内容 -->
    <template #main>
      <sc-table
        v-loading="tableLoading"
        :data="tableData"
        :columns="columns"
        row-key="bomId"
        height="100%"
        :tree-props="{ children: 'childBomOrderList', hasChildren: 'hasChildren' }"
        @selection-change="handleSelectionChange"
      />
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
    <!--操作日志-->
    <el-drawer
      v-model="drawer.visible"
      title="操作日志"
      direction="rtl"
      :size="150"
      destroy-on-close
      append-to-body
      custom-class="logger-drawer"
    >
      <div v-if="drawer.data.length">
        <el-timeline class="timeline">
          <el-timeline-item
            v-for="(item, index) in drawer.data"
            :key="index"
            placement="top"
            :color="index === 0 ? '#409EFF' : ''"
            :timestamp="$filters.formatTime(item.createdTime)"
          >
            <h4 style="padding: 10px 0">
              {{ item.creatorName }}
            </h4>
            <span>{{ item.content }}</span>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div v-else>
        <el-empty description="暂无" />
      </div>
    </el-drawer>
    <!--打印bom-->
    <bom-print
      v-show="false"
      ref="printRef"
      :state="printState"
      :cutting-method-opts="(cuttingMethodOpts as any)"
    />
  </sc-app-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onActivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BomPrint from './components/bom-print/index.vue';
import { useList } from '@/hooks/use-list';
import { YES_NO_LIST, YES_NO_ENUM, YES_OR_NO_NUMBER_LIST } from '@/constant';
import {
  BOM_ORDER_STATUS_ENUMS,
  BOM_ORDER_TAB_STATUS_LIST,
} from '../../constant';
import {
  postWebV1BomPageApi,
  getWebV1BomStateStatisticsApi,
  getWebV1BatchBomPrintApi,
  postDesignLogListApi,
} from '../../api';
import type {
  ILogListRes,
  GetWebV1BomStateStatisticsApiResItem,
} from '../../api/types';
import { usePrintOrder } from './hooks/use-print-order';
import { exportByBlob } from '@/core/utils/file-download';
import { ElMessage } from 'element-plus';
import DesignerSelect from '@/components/designer-select';
import { useSearch } from './hooks/use-search';
import { deliveryList } from '@/api/basis';
import { useTableDataMapRemark } from './hooks/use-map-remark';
import { IListItem, IParams } from './types';
import { useColumns } from './hooks/use-columns';
import { plus } from 'number-precision';
import { useTransBomDetail } from './hooks/use-trans-bom-detail';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useAccountStore } from '@/store/account';
import { usePermissionConfig } from '../../use-permission-config';
import { handleBatchSearchParam } from '@/core/utils/format';

export default defineComponent({
  name: 'DesignCenterDevelopBomList',
  components: {
    BomPrint,
    DesignerSelect,
  },
  setup() {
    const pimsCategoryProps = {
      label: 'label',
      value: 'label',
      multiple: true,
    };
    const { searchConfig, pimsCategory } = useSearch();
    const { DYBOM, XZBOM, DC } = usePermissionConfig();
    const route = useRoute();
    const router = useRouter();
    const { handleBomJson } = useTransBomDetail();

    // table勾选项
    const selection = ref<IListItem[]>([]);
    const handleSelectionChange = (checked: IListItem[]) => {
      selection.value = checked || [];
    };
    const showPrintBomBtn = computed(() => {
      return [
        '',
        BOM_ORDER_STATUS_ENUMS.SUBMITTED,
        BOM_ORDER_STATUS_ENUMS.CALCULATED,
        BOM_ORDER_STATUS_ENUMS.IS_TRANSIENT,
      ].includes(params.value.bomOrderState);
    });

    const printBomBtnUsable = computed(() => {
      const allowState = selection.value.every((selectionItem) => {
        return [
          BOM_ORDER_STATUS_ENUMS.SUBMITTED,
          BOM_ORDER_STATUS_ENUMS.CALCULATED,
        ].includes(selectionItem.bomOrderState)
        // 找料中
        || selectionItem.materialSearchState === YES_NO_ENUM.YES;
      });

      return selection.value.length > 0
        && showPrintBomBtn.value
        && allowState;
    });

    // 按钮是否可点击 判定：1必选 2环节状态=已核算
    const calculatedBtn = computed(() => {
      // 单选逻辑
      return (
        selection.value.length === 1
        && (
          [
            BOM_ORDER_STATUS_ENUMS.CALCULATED,
            BOM_ORDER_STATUS_ENUMS.SUBMITTED
          ].includes(selection.value[0].bomOrderState)
        )
      );
    });

    // 打印bom单
    const { printState } = usePrintOrder();
    const printRef = ref<InstanceType<typeof BomPrint>>();

    const handlePrintBom = async () => {
      const { data } = await getWebV1BatchBomPrintApi({
        bomIds: selection.value.map(item => item.bomId),
      });
      printState.data = data.map((item) => {
        return {
          ...item,
          bomOrderMaterialList: handleBomJson(item.bomOrderMaterialList)
        };
      });
      printState.visible = true;
      printRef.value!.startPrint();
    };
    const accountStore = useAccountStore();
    // 同步 remark
    const { format } = useTableDataMapRemark();
    const account = useAccountStore();

    const handleParams = (paramsObj: IParams) => {
      const { categoryNameList, readSelf, designerIdList = [], styleCode, designCode, ...rest } = paramsObj;
      let ids = [...designerIdList];
      if (readSelf === YES_NO_ENUM.YES) {
        ids = [accountStore.account?.id!];
      }
      selection.value = [];
      getCounts();
      if (styleCode) {
        const { value, values } = handleBatchSearchParam(styleCode);
        rest.styleCodeList = values;
        params.value.styleCode = value;
      }
      if (designCode) {
        const { value, values } = handleBatchSearchParam(designCode);
        rest.designCodeList = values;
        params.value.designCode = value;
      }
      return {
        ...rest,
        designerIdList: ids,
        categoryNameList: categoryNameList?.map((v: any) => {
          return v.join('-');
        }),
      };
    };

    const {
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
    } = useList<IListItem, IParams>({
      request: {
        api: postWebV1BomPageApi,
        params: {
          pageNum: 1,
          pageSize: 20,
          readSelf: YES_NO_ENUM.YES,
          bomOrderState: '',
        },
        handleParams,
        handleCustomReset(p, defaultParams) {
          return {
            ...defaultParams,
            readSelf: p.readSelf,
            bomOrderState: p.bomOrderState,
          };
        },
      },
      response: {
        async handleResponseData(list) {
          const data = await format(list, 'designCode');
          return data;
        },
      },
    });

    // 操作日志
    const drawer = reactive<{ visible: boolean; data: ILogListRes; }>({
      visible: false,
      data: [] as ILogListRes,
    });
    const { columns } = useColumns({
      reloadFn() {
        handleSearch();
      },
      handleOperateLog: async (designCode: string) => {
        const { data = [] } = await postDesignLogListApi({ designCode });
        drawer.data = data || [];
        drawer.visible = true;
      }
    });
    // 更新tab上count数
    const countResData = ref<GetWebV1BomStateStatisticsApiResItem[]>([]);
    const getCounts = async () => {
      const { data } = await getWebV1BomStateStatisticsApi({
        designerId: params.value.readSelf === YES_NO_ENUM.YES ? account.account?.id : '',
      });
      countResData.value = data;
    };
    const tabsList = computed(() => {
      const tabCountObj = {} as { [key in BOM_ORDER_STATUS_ENUMS]: string | number };
      let total = 0;
      countResData.value.forEach((countItem) => {
        tabCountObj[countItem.bomOrderState] = countItem.quantity;
        if (countItem.bomOrderState !== BOM_ORDER_STATUS_ENUMS.IS_TRANSIENT) {
          total = plus(total, countItem.quantity);
        }
      });
      return BOM_ORDER_TAB_STATUS_LIST.map((item) => {
        if (item.value === '') {
          return {
            ...item,
            label: `${item.label}（${total || '0'}）`
          };
        }
        return {
          ...item,
          label: `${item.label}（${tabCountObj[item.value] || '0'}）`
        };
      });
    });
    const { getDictionaryOptions } = useDictionary();
    /** 裁剪方法 */
    const cuttingMethodOpts = computed(() => getDictionaryOptions(DICTIONARY_KEY.BOM_CUTTING_METHOD));
    const handleCustomReset = () => {
      handleReset();
    };
    const handleTabClick = () => {
      handleSearch();
    };

    const downloadBOM = () => {
      const row = selection.value[0];
      if (row) {
        const { bomId = '', bomCode = '', bomVersionNum = '' } = row;
        exportByBlob({
          method: 'get',
          filename: `${bomCode}-${bomVersionNum}`,
          url: '/sdp-design/web/v1/bom/export/excel',
          params: {
            bomId,
          },
        });
      } else {
        ElMessage.warning('请勾选一个工单');
      }
    };

    const handleExport = async () => {
      const exportBomIdList = selection.value.map(v => v.bomId);
      await exportByBlob({
        url: '/sdp-design/web/v1/bom/export/material-excel',
        method: 'post',
        loading: true,
        data: {
          ...handleParams(params.value),
          exportBomIdList,
        }
      });
    };

    const init = async () => {
      handleSearch(params.value.pageNum);
    };

    onActivated(async () => {
      init();
    });

    return {
      handleSearch,
      deliveryList,
      pimsCategory,
      pimsCategoryProps,
      handleCustomReset,
      searchConfig,
      calculatedBtn,
      downloadBOM,
      DYBOM,
      XZBOM,
      printRef,
      cuttingMethodOpts,
      tabsList,
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSizeChange,
      handleCurrentChange,
      showPrintBomBtn,
      printBomBtnUsable,
      printState,
      handlePrintBom,
      selection,
      handleSelectionChange,
      BOM_ORDER_STATUS_ENUMS,
      YES_NO_ENUM,
      YES_NO_LIST,
      columns,
      drawer,
      handleTabClick,
      YES_OR_NO_NUMBER_LIST,
      DC,
      handleExport,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/modules/design-center/styles/index.scss";
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
      }
      :deep(.el-checkbox__label) {
        font-weight: 400;
        font-size: 13px;
      }
    }
  }
  .operation {
    flex-shrink: 0;
  }
}
// .el-tag {
//   margin: 5px;
// }
</style>
