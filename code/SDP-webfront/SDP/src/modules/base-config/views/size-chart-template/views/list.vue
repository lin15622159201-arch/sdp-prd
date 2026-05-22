<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      >
        <template #innerCategoryCodes>
          <el-cascader
            v-model="params.innerCategoryCodes"
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
        新增
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
    <size-chart-dialog
      v-model:visible="dialogObj.visible"
      :size-template-image-id="dialogObj.row?.sizeTemplateImageId"
      @success="handleSearch"
    />
  </sc-app-page>
</template>

<script lang="ts" setup>
import { useList } from '@toy/v-use';
import useSearchConfig from '../hooks/use-search-config';
import { delSizeTemplate, getSizeTemplatePage } from '../api';
import { useListColumns } from '../hooks/use-table-columns';
import usePermissionConfig from '../use-permission-config';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { useDict } from '@/modules/base-config/views/ai-category-mapping/hooks/use-dict';
import sizeChartDialog from '../components/size-chart-dialog.vue';
import { ISizeTemplatePageReq, ISizeTemplatePageResListItem } from '../api/type';
import { cloneDeep } from 'lodash-es';
import { treeFindPath } from '@/core/utils/array';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

const { categoryTreeList } = useDict(true);
const { XZ } = usePermissionConfig();
const { searchConfig } = useSearchConfig();

interface IParamsItem extends ISizeTemplatePageReq {
  innerCategoryCodes?: string[];
}
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
} = useList<IParamsItem>({
  request: {
    // 调用获取取消原因的接口
    api: getSizeTemplatePage,
    // 数据参数
    params: {
      pageNum: 1,
      pageSize: 20,
      innerCategoryCodes: [],
      categoryCode: '',
      categoryName: '',
    },
    handleParams: (p: IParamsItem) => {
      const p_ = cloneDeep(p);
      if (p_.innerCategoryCodes?.length) {
        const lastNodeId = p_.innerCategoryCodes[p_.innerCategoryCodes.length - 1];
        p_.categoryName = treeFindPath<IDictionaryItem>(
          categoryTreeList.value,
          'children',
          data => data.value === lastNodeId,
        ).map(item => item.label).join('-');
        p_.categoryCode = p_.innerCategoryCodes.join('-');
      } else {
        p_.categoryCode = '';
        p_.categoryName = '';
      }
      delete p_.innerCategoryCodes;
      return p_;
    },
  },
});
handleSearch();

const dialogObj = ref({
  visible: false,
  row: {} as ISizeTemplatePageResListItem | undefined,
});

const handleAdd = () => {
  dialogObj.value.row = undefined;
  dialogObj.value.visible = true;
};

/**
 * @description 列表编辑
 * @param row 当前行数据
 */
const handleEdit = (row: ISizeTemplatePageResListItem) => {
  dialogObj.value.row = row;
  dialogObj.value.visible = true;
  console.log(row);
};

/**
 * @description 列表删除
 * @param row 当前行数据
 */
const handleDel = async (row: ISizeTemplatePageResListItem) => {
  console.log(row);
  await ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await delSizeTemplate([row.sizeTemplateImageId]);
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
