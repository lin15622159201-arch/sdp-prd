<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      >
        <template #aiCategoryTree>
          <el-cascader
            v-model="params.aiCategoryTree"
            clearable
            class="tw-w-full"
            :options="(aiCategoryList as any)"
            :props="{
              label: 'value',
              value: 'code',
              children: 'children',
            }"
          />
        </template>
        <template #innerCategoryTree>
          <el-cascader
            v-model="params.innerCategoryTree"
            clearable
            class="tw-w-full"
            :options="(categoryTreeList as any)"
            :props="{
              label: 'label',
              value: 'value',
            }"
          />
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <el-button
        v-if="XZ"
        type="primary"
        @click="handleAdd"
      >
        新增品类映射
      </el-button>
    </template>
    <template #main>
      <sc-table
        class="tw-h-full"
        key="table"
        :data="tableData"
        :columns="tableColumns"
        v-loading="tableLoading"
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
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </template>
    <ai-category-dialog
      v-model:visible="dialogObj.visible"
      :ai-category-mapping-id="dialogObj.row?.aiCategoryMappingId"
      @success="handleSearch"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { useList } from '@toy/v-use';
import useSearchConfig from '../hooks/use-search-config';
import { delAiCategoryMapping, getAiCategoryMappingPage } from '../api';
import { useListColumns } from '../hooks/use-table-columns';
import usePermissionConfig from '../use-permission-config';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import aiCategoryDialog from '../components/ai-category-dialog.vue';
import { useDict } from '../hooks/use-dict';
import {
  IAiCategoryMappingPageReq,
  IAiCategoryMappingPageResListItem,
} from '../api/type';
import { cloneDeep } from 'lodash-es';
import { treeFindPath } from '@/core/utils/array';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

interface IPageReqParams extends IAiCategoryMappingPageReq {
  /**
   * ai品类
   */
  aiCategoryTree?: string[];
  /**
   * 内部品类
   */
  innerCategoryTree?: string[];
}
const { categoryTreeList, aiCategoryList } = useDict(true);
const { XZ } = usePermissionConfig();
const { searchConfig } = useSearchConfig();
// 获取列表数据以及相关方法
const {
  params,
  tableData,
  tableTotal,
  tableLoading,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<IPageReqParams>({
  request: {
    // 调用获取取消原因的接口
    api: getAiCategoryMappingPage,
    // 数据参数
    params: {
      pageNum: 1,
      pageSize: 20,
    },
    handleParams: (req: IPageReqParams) => {
      const p = cloneDeep(req);
      if (p.aiCategoryTree?.length) {
        p.aiCategoryCode = p.aiCategoryTree[p.aiCategoryTree.length - 1];
      }
      if (p.innerCategoryTree?.length) {
        const lastNodeId = p.innerCategoryTree[p.innerCategoryTree.length - 1];
        p.categoryName = treeFindPath<IDictionaryItem>(
          categoryTreeList.value,
          'children',
          data => data.value === lastNodeId,
        ).map(item => item.label).join('-');
        p.categoryCode = p.innerCategoryTree.join('-');
      }
      console.log('p==', p);
      delete p.aiCategoryTree;
      delete p.innerCategoryTree;
      return p;
    }
  },
});
handleSearch();

const dialogObj = ref({
  visible: false,
  row: {} as IAiCategoryMappingPageResListItem | undefined,
});

const handleAdd = () => {
  dialogObj.value.row = undefined;
  dialogObj.value.visible = true;
};

/**
 * @description 新增/编辑
 * @param row 当前行数据
 */
const handleEdit = (row: IAiCategoryMappingPageResListItem) => {
  dialogObj.value.row = row;
  dialogObj.value.visible = true;
  console.log(row);
};

/**
 * @description 删除
 * @param row 当前行数据
 */
const handleDel = async (row: IAiCategoryMappingPageResListItem) => {
  console.log(row);
  await ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await delAiCategoryMapping([row.aiCategoryMappingId]);
  ElMessage.success('删除成功!');
  handleSearch();
};

const { tableColumns } = useListColumns({
  handleEdit,
  handleDel,
});

</script>

<style lang="scss" scoped>
//
</style>
