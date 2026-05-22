<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { sizeCategoryDelete, sizeCategoryPage, getSizeConfigList } from './api';
import {
  ISizeCategoryPageReq,
  ISizeCategoryPageResListItem,
  ISizeConfigListRes,
  ISizeCategoryPageResSizeNumInfoListItem
} from './api/type';
import { useList } from '@/hooks/use-list';
import { useDict } from './hooks/use-dict';
import usePermission from '@/hooks-transfer/use-permission';
import usePermissionConfig from './hooks/use-permission-config';
import { ISizeConfig } from './type';
import { arrayToTree } from './utils/tree';
import SizeColumn from './components/size-column.vue';
import SizeConfigDialog from './components/size-config-dialog/index.vue';
import CreateOrEditDialog from './components/create-or-edit-dialog/index.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import useSearchConfig from './hooks/use-search-config';

interface IParamsReq extends ISizeCategoryPageReq {
  selectedCategoryTree?: string[][];
}
const { categoryTreeList, plmSpecificationList, plmStandardSizeList } = useDict();
const { permissionRef } = usePermission(usePermissionConfig());
const {
  params,
  tableData,
  tableTotal,
  tableLoading,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<ISizeCategoryPageResListItem, IParamsReq>({
  request: {
    api: sizeCategoryPage,
    params: {
      selectedCategoryTree: [],
      categoryCodeList: [],
      pageNum: 1,
      pageSize: 20,
    },
    handleParams(data) {
      if (data.selectedCategoryTree?.length) {
        data.categoryCodeList = data.selectedCategoryTree.map(selectedCategory => selectedCategory.join('-'));
      }
      delete data.selectedCategoryTree;
      return data;
    },
  },
});

const sizeNumInfoMap = computed(() => {
  const result: Record<string, ISizeCategoryPageResSizeNumInfoListItem> = {};
  tableData.value.forEach((item) => {
    const { sizeStandardInfoList } = item;
    sizeStandardInfoList.forEach((sizeStandardInfo) => {
      const { sizeNumInfoList, sizeCategoryId } = sizeStandardInfo;
      sizeNumInfoList.forEach((sizeNumInfo) => {
        const { sampleSize, sizeStandardCode } = sizeNumInfo;
        result[`${sizeCategoryId}-${sizeStandardCode}-${sampleSize}`] = sizeNumInfo;
      });
    });
  });
  return result;
});

const handleGetStyleTypeName = (id: string) => {
  const sizeNumInfo = sizeNumInfoMap.value[id];
  if (!sizeNumInfo) {
    return '';
  }
  const { sizeTypeName } = sizeNumInfo;
  return sizeTypeName;
};

const selectList = ref<ISizeCategoryPageResListItem[]>([]);
const handleSelectionChange = (list: ISizeCategoryPageResListItem[]) => {
  selectList.value = list || [];
};

const sizeConfigLoading = ref(false);
const sizeConfig = ref<ISizeConfigListRes>({
  sizeConfigList: [],
  revisedTime: '',
  reviserName: '',
});
const handleGetSizeConfigList = async () => {
  try {
    sizeConfigLoading.value = true;
    const { data } = await getSizeConfigList({ sizeStandardCodeList: [] });
    sizeConfig.value = data;
  } finally {
    sizeConfigLoading.value = false;
  }
};

const isShowSizeConfigDialog = ref(false);
const handleShowSizeConfig = async () => {
  handleGetSizeConfigList();
  isShowSizeConfigDialog.value = true;
};

const sizeConfigList = computed(() => {
  const { sizeConfigList: _sizeConfigList } = sizeConfig.value;
  const opsChildMap: Record<string, boolean> = {};
  plmStandardSizeList.value.forEach((plmStandardSize) => {
    const { valueParentCode, value } = plmStandardSize;
    if (valueParentCode) {
      value.split(',').forEach((size) => {
        opsChildMap[`${valueParentCode}-${size}`] = true;
      });
    }
  });
  return _sizeConfigList
    .filter(
      n => (
        opsChildMap[`${n.sizeStandardCode}-${n.sampleSize}`]
      ) || Number(n.relateSizeCount || '0') > 0,
    );
});

const sizeColumns = computed(() => {
  const parentsMap: Record<string, ISizeConfig> = {};
  const _sizeConfigList = sizeConfigList.value
    .map((n) => {
      const { sizeStandardCode, sizeStandard } = n;
      if (!parentsMap[sizeStandardCode]) {
        parentsMap[sizeStandardCode] = {
          sizeConfigId: sizeStandardCode,
          sizeStandard: '',
          sizeStandardCode: '',
          sampleSize: sizeStandardCode,
          relateSizeCount: '',
          creatorName: '',
          reviserName: '',
          remark: '',
          revisedTime: '',
          createdTime: '',
          children: [],
          name: sizeStandard,
        };
      }
      return {
        ...n,
        name: n.sampleSize,
      };
    });
  const res = arrayToTree<ISizeConfig>([...Object.values(parentsMap),
    ..._sizeConfigList], 'sizeConfigId', 'sizeStandardCode', ['']);
  return res;
});

const init = () => {
  handleSearch();
  handleGetSizeConfigList();
};

const handleDel = async () => {
  await ElMessageBox.confirm('是否确认删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  const ids = selectList.value.map(item => item.sizeCategoryId);
  await sizeCategoryDelete({ ids });
  ElMessage.success('删除成功');
  if (
    tableData.value.length === ids.length
    && params.value.pageNum !== 1
    && Math.floor(tableTotal.value / params.value.pageSize) === params.value.pageNum
  ) {
    params.value.pageNum -= 1;
  }
  init();
};

const isShowCreateOrEditDialog = ref(false);
const dialogType = ref<'edit' | 'add'>('edit');
const handleAdd = () => {
  handleGetSizeConfigList();
  dialogType.value = 'add';
  isShowCreateOrEditDialog.value = true;
};

const handleEdit = () => {
  handleGetSizeConfigList();
  dialogType.value = 'edit';
  isShowCreateOrEditDialog.value = true;
};

const handleEditOrCreateSuccess = () => {
  selectList.value = [];
  init();
};

onMounted(() => {
  init();
});

const { searchConfig } = useSearchConfig();

</script>

<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='120px'
        @handleSearch="handleSearch"
        @handle-reset="handleReset"
      >
        <template #selectedCategoryTree>
          <el-cascader
            v-model="params.selectedCategoryTree"
            clearable
            class="tw-w-full"
            :options="(categoryTreeList as any)"
            :props="{
              label: 'label',
              value: 'value',
              multiple: true,
            }"
            collapse-tags
          />
        </template>
      </sc-search-area>
    </template>

    <template #header>
      <Operation>
        <div class="tw-flex tw-justify-between">
          <div>
            <el-button
              v-if="permissionRef.XZ"
              type="primary"
              :disabled="!sizeConfigList.length"
              @click="handleAdd"
            >
              新建
            </el-button>
            <el-button
              v-if="permissionRef.BJ"
              type="warning"
              :disabled="!selectList.length || !sizeConfigList.length"
              @click="handleEdit"
            >
              编辑
            </el-button>
            <el-button
              v-if="permissionRef.SC"
              type="danger"
              :disabled="!selectList.length || !sizeConfigList.length"
              @click="handleDel"
            >
              删除
            </el-button>
          </div>
          <el-button v-if="permissionRef.PZ" @click="handleShowSizeConfig()">
            配置
          </el-button>
        </div>
      </Operation>
    </template>

    <template #main>
      <el-table
        v-loading="tableLoading"
        class="tw-h-full"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          prop="categoryName"
          label="品类"
          align="center"
          min-width="150"
        />
        <size-column
          v-for="(column, index) in sizeColumns"
          :key="index"
          :column="column"
        >
          <template #default="{ row, pid }">
            {{ handleGetStyleTypeName(`${row.sizeCategoryId}-${pid}`) }}
          </template>
        </size-column>
        <el-table-column
          prop="reviserName"
          label="更新人"
          align="center"
          min-width="150"
        />
        <el-table-column
          prop="revisedTime"
          label="更新时间"
          align="center"
          min-width="150"
        >
          <template #default="{ row }">
            {{ $filters.formatTime(row.revisedTime) }}
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
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </template>
    <size-config-dialog
      v-model:visible="isShowSizeConfigDialog"
      :size-config-loading="sizeConfigLoading"
      :size-config="sizeConfig"
      :plm-standard-size-list="plmStandardSizeList"
      @success="handleGetSizeConfigList"
    />
    <create-or-edit-dialog
      v-model:visible="isShowCreateOrEditDialog"
      :category-tree-list="(categoryTreeList as any)"
      :size-config="{ ...sizeConfig, sizeConfigList }"
      :plm-specification-list="plmSpecificationList"
      :ids="dialogType === 'edit' ? selectList.map(item => item.sizeCategoryId) : []"
      @success="handleEditOrCreateSuccess"
    />
  </sc-app-page>
</template>

<style scoped lang="scss">
//
</style>
