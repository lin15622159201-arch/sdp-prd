<!--采购齐套管理-->
<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='105px'
        @handleSearch="handleSearch"
        @handle-reset="handleReset"
      >
        <template #categoryNameList>
          <el-cascader
            v-model="params.categoryNameList"
            :options="pimsCategory as any"
            collapse-tags
            show-all-levels
            :props="pimsCategoryProps"
            class='tw-w-100%'
            clearable
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="header">
        <div class="condition">
          <el-form-item label="同步状态：">
            <radio-checkbox
              v-model="params.pushStatus"
              :options="PUSH_STATUS_LIST"
              @change="handleSearch()"
            />
          </el-form-item>
        </div>
        <div class="operation">
          <el-button
            v-if="SBKCT"
            type="primary"
            @click="handleRetry"
          >
            失败款重推
          </el-button>
        </div>
      </div>
    </template>
    <!-- 主体内容 -->
    <template #main>
      <sc-table
        :columns="columns"
        :data="tableData"
        height="100%"
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
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { REMARK_BIZ_TYPE_ENUM, YES_NO_LIST } from '@/constant';
import { REGION_LIST } from '@/constant-transfer';
import { postDesignLogBizListApi } from '@/modules/design-center/api/operate-log';
import { useTableDataMapBizRemark } from '@/modules/design-center/develop-bom/hooks/use-map-remark';
import { useSearch } from './hooks/use-search';
import { useColumns } from './hooks/use-columns';
import { ElMessage } from 'element-plus';
import { digitalPrintStyleRePush, getDigitalPrintStyleList } from '../../api';
import { useList } from '@toy/v-use';
import { IListItem } from './types';
import { PUSH_STATUS_LIST } from '../../constant';
import { remarksSave } from '@/api/basis';
import { usePermissionConfig } from '../../use-permission-config';

export default defineComponent({
  setup() {
    const { SBKCT } = usePermissionConfig();
    const pimsCategoryProps = {
      label: 'label',
      value: 'label',
      multiple: true,
    };
    const { searchConfig, pimsCategory } = useSearch();
    const { columns } = useColumns({
      async handleCreateRecord(
        row,
        remark,
      ) {
        const { printingPrototypeId } = row;
        await remarksSave({
          bizId: printingPrototypeId,
          bizType: REMARK_BIZ_TYPE_ENUM.DIGITAL_PRINTING,
          remark,
        });
        await handleSearch();
      },
      handleOperateLog(bizId) {
        drawer.params.bizId = bizId;
        drawer.visible = true;
      },
    });
    // 操作日志抽屉面板
    const drawerVisible = ref(false);
    const {
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
    } = useList({
      request: {
        api: getDigitalPrintStyleList,
        params: {
          pageNum: 1,
          pageSize: 20,
          categoryNameList: [],
          categoryList: [],
          countrySiteCodeList: [],
          storeIdList: [],
          waveBandCodeList: [],
          pushStatus: '',
        },
        handleParams(custom) {
          const { categoryNameList, ...rest } = custom;
          return {
            ...rest,
            categoryNameList: categoryNameList.map((item: string[]) => item.join('-')),
          };
        },
      },
    });
    // 同步 remark
    useTableDataMapBizRemark<IListItem>(
      tableData,
      'printingPrototypeId',
      'remark' as keyof IListItem,
    );
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
    const handleRetry = async () => {
      await digitalPrintStyleRePush();
      ElMessage.success('操作成功');
      handleSearch();
    };
    return {
      handleRetry,
      REGION_LIST,
      columns,
      postDesignLogBizListApi,
      searchConfig,
      pimsCategoryProps,
      pimsCategory,
      SBKCT,
      params,
      tableTotal,
      tableData,
      tableLoading,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
      drawerVisible,
      drawer,
      YES_NO_LIST,
      PUSH_STATUS_LIST
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/modules/design-center/styles/index.scss";
.tag-item:not(:first-of-type) {
  margin-left: 3px;
}
.el-tag {
  margin: 5px;
}
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
