<!--采购齐套管理-->
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
        <template #categoryNameList>
          <el-cascader
            v-model="params.categoryNameList"
            :options="pimsCategory as any"
            collapse-tags
            show-all-levels
            :props="pimsCategoryProps"
            class='tw-w-100%'
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex tw-flex-justify-end">
        <div class="tw-flex tw-flex-items-center">
          <el-button
            v-if="QS"
            type="primary"
            @click="handleOrderSign"
          >
            签收
          </el-button>
        </div>
      </div>
    </template>
    <!-- 主体内容 -->
    <template #main>
      <sc-table
        :columns="columns"
        v-loading="tableLoading"
        :data="tableData"
        height="100%"
        border
        style="width: 100%"
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
    <operation-drawer
      v-model="drawer.visible"
      :request="postDesignLogBizListApi"
      :config="{
        timeKey: 'createdTime',
        userKey: 'creatorName',
        contentKey: 'content',
        // 不显示remark
        remarkKey: 'string',
      }"
      :requestParams="drawer.params"
    />
  </sc-app-page>
</template>

<script lang="ts">
// 方法工具类
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useList } from '@/hooks/use-list';
// 枚举
import { REMARK_BIZ_TYPE_ENUM, YES_NO_LIST } from '@/constant';
import { REGION_LIST } from '@/constant-transfer';
import {
  DESIGN_SAMPLE_TYPE_LIST,
  SAMPLE_TYPE_ENUM,
} from '@/modules/design-center/develop-bom/constant';
import { postDesignLogBizListApi } from '@/modules/design-center/api/operate-log';
import { useTableDataMapBizRemark } from '@/modules/design-center/develop-bom/hooks/use-map-remark';
import DesignerSelect from '@/components/designer-select';
import { useSearch } from './hooks/use-search';
import { useColumns } from './hooks/use-columns';
import { IListItem } from './types';
import { postMaterialOrderListApi } from '../../api';
import { IMaterialPageReq } from '../../api/types';
import { remarksSave } from '@/api/basis';
import { usePermissionConfig } from '../../use-permission-config';
import { useAccountStore } from '@/store/account';

export default defineComponent({
  components: {
    DesignerSelect,
  },
  setup() {
    const { QS } = usePermissionConfig();
    const pimsCategoryProps = {
      label: 'label',
      value: 'label',
      multiple: true,
    };
    const { searchConfig, pimsCategory } = useSearch();
    const router = useRouter();
    // 操作日志抽屉面板
    const drawerVisible = ref(false);
    const selection = ref<IListItem[]>([]);
    const handleSelectionChange = (checked: IListItem[]) => {
      selection.value = checked || [];
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
    } = useList<IListItem, IMaterialPageReq>({
      request: {
        api: postMaterialOrderListApi,
        params: {
          pageNum: 1,
          pageSize: 20,
        },
        handleParams: (paramsObj) => {
          const { categoryNameList = [], designerIdList = [], ...rest } = paramsObj;
          let designerIds = designerIdList;
          if (readSelf.value) {
            designerIds = [accountStore.account?.id!];
          }
          return {
            ...rest,
            designerIdList: designerIds,
            categoryNameList: (categoryNameList as unknown as Array<string[]>).map(v => v.join('-'))
          };
        },
      },
    });
    const { columns } = useColumns({
      async handleCreateRecord(row, remark) {
        const { orderMaterialFollowId } = row;
        const remarkParams = {
          bizId: orderMaterialFollowId!,
          bizType: REMARK_BIZ_TYPE_ENUM.ORDER_MATERIAL_FOLLOW,
          remark,
        };
        await remarksSave(remarkParams);
        await handleSearch();
      },
      handleOperateLog(bizId) {
        drawer.params.bizId = bizId;
        drawer.visible = true;
      },
    });
    // 同步 remark
    useTableDataMapBizRemark<IListItem>(
      tableData,
      'orderMaterialFollowId',
      'remark' as keyof IListItem,
    );
    const cuttingProcessFilter = (row: IListItem) => {
      return row?.cuttingProcess
        ?.split(',')
        .filter(process => !!process) || [];
    };
    // 签收
    const handleOrderSign = () => {
      router.push({
        name: 'MaterialSchedulePurchaseKittingSign',
      });
    };

    // 操作日志
    const drawer = reactive({
      visible: false,
      params: {
        bizId: ''
      },
    });
    const init = () => {
      handleSearch();
    };
    init();

    return {
      readSelf,
      columns,
      postDesignLogBizListApi,
      searchConfig,
      pimsCategoryProps,
      pimsCategory,
      QS,
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
      handleOrderSign,
      cuttingProcessFilter,
      selection,
      handleSelectionChange,
      drawerVisible,
      drawer,
      YES_NO_LIST,
      DESIGN_SAMPLE_TYPE_LIST,
      REGION_LIST,
      SAMPLE_TYPE_ENUM,
    };
  },
});
</script>
