<template>
  <sc-app-page>
    <template #laside>
      <div>
        <div class="tw-font-bold tw-font-size-18px">商品品类</div>
        <div
          v-loading="categoryLoading"
          element-loading-text="加载中..."
          class="tw-mt-12px"
        >
          <el-tree
            ref="treeRef"
            :data="categoryList"
            :highlight-current="true"
            :expand-on-click-node="false"
            :default-expand-all="true"
            node-key="value"
            @current-change="handleCategoryCurrentChange"
          />
        </div>
      </div>
    </template>
    <template #header>
      <div>
        <p class="tw-font-bold tw-font-size-16px tw-mb-6px">品类信息</p>
        <div class="tw-flex tw-justify-between tw-items-center">
          <p class="tw-color-[#606266]">
            <span class="tw-mr-64px">品类名称：{{ currentCategory.name }}</span>
            <span class="tw-mr-64px">品类级别：{{ currentCategory.levelDesc }}</span>
            <span>上级品类：{{ currentCategory.parentName }}</span>
          </p>
        </div>
      </div>
    </template>
    <template #main>
      <div class="tw-flex tw-flex-col tw-h-full">
        <el-tabs v-model="activeTab">
          <el-tab-pane
            v-for="item in CATEGORY_TAB_LIST"
            :key="item.value"
            :label="item.label"
            :name="item.value"
          />
        </el-tabs>
        <sc-table
          class="tw-flex-1"
          :data="tableData"
          :columns="tableColumns"
        />
        <div class="tw-mt-16px" v-if="GLPTPL && activeTab === CATEGORY_TAB_ENUM.GLPT">
          <el-button
            type="primary"
            @click="() => handleOpenPlatformCategoryDialog(currentCategory)"
            :disabled="!currentCategory.code || !isLeafCategory"
          >
            关联平台品类
          </el-button>
          <el-text
            v-if="currentCategory.code && !isLeafCategory"
            type="info"
            size="small"
            class="tw-ml-8px"
          >
            只有最后一级品类才可以关联平台品类
          </el-text>
        </div>
      </div>
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
          :page-size="params.pageSize"
          :page-sizes="[20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import { useList } from '@toy/v-use';
import { usePlatformCategoryDialog } from './hooks/use-platform-category-dialog';
import { useListColumns } from './hooks/use-table-columns';
import { CATEGORY_TAB_LIST, CATEGORY_TAB_ENUM } from '../../constant';
import { fetchCategoryMappingPage } from '../../api';
import { usePermissionConfig } from '../../use-permission-config';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { ElTree } from 'element-plus';

type ICurrentCategory = {
  code: string;
  name: string;
  parentName: string;
  parentCode: string;
  levelDesc: string;
};

const { GLPTPL } = usePermissionConfig();
const { getDictionaryOptions, getDictionaryOptionsSync } = useDictionary();

const treeRef = ref<InstanceType<typeof ElTree> | null>(null);
const currentCategory = ref<ICurrentCategory>({ code: '', name: '', parentName: '', parentCode: '', levelDesc: '' });
const categoryList = computed(() => getDictionaryOptions(DICTIONARY_KEY.CATEGORY));

const { params, tableTotal, tableData, handleSearch, handleSizeChange, handleCurrentChange } = useList({
  request: {
    api: fetchCategoryMappingPage,
    params: {
      categoryCode: '',
      pageNum: 1,
      pageSize: 20,
    },
  },
});

const activeTab = ref(CATEGORY_TAB_LIST[0].value);

/** 构建品类父级映射表 */
const buildCategoryParentMap = (list: IDictionaryItem[], parents: IDictionaryItem[] = [], map: Map<string, IDictionaryItem[]> = new Map()): Map<string, IDictionaryItem[]> => {
  list.forEach((item) => {
    if (item.value) {
      map.set(item.value, parents);
    }
    if (item.children && item.children.length > 0) {
      buildCategoryParentMap(item.children, [...parents, item], map);
    }
  });
  return map;
};

/** 品类父级映射缓存 */
const categoryParentMap = computed(() => buildCategoryParentMap(categoryList.value));

/** 判断当前品类是否为叶子节点(最后一级) */
const isLeafCategory = computed(() => {
  if (!currentCategory.value.code) return false;

  // 在树中查找当前节点
  const findNode = (list: IDictionaryItem[], targetValue: string): IDictionaryItem | null => {
    return list.reduce<IDictionaryItem | null>((result, item) => {
      if (result) return result;
      if (item.value === targetValue) return item;
      if (item.children && item.children.length > 0) {
        return findNode(item.children, targetValue);
      }
      return null;
    }, null);
  };

  const node = findNode(categoryList.value, currentCategory.value.code);
  return node ? !node.children || node.children.length === 0 : false;
});

/** 切换品类 */
const handleCategoryCurrentChange = (data: IDictionaryItem) => {
  const { label, value = '', level } = data;
  const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

  // 从缓存映射中获取所有父级品类
  const allParents = categoryParentMap.value.get(value) || [];
  const directParent = allParents[allParents.length - 1]; // 直接父级

  currentCategory.value = {
    code: value,
    name: label,
    parentName: allParents.map(p => p.label).join(' / ') || '',
    parentCode: directParent?.value || '',
    levelDesc: `${chineseNumbers[Number(level) - 1]}级品类`,
  };
  params.value.categoryCode = data.value;

  // 只有最后一级品类才查询关联的平台品类
  const isLeaf = !data.children || data.children.length === 0;
  if (isLeaf) {
    handleSearch();
  } else {
    // 非叶子节点清空表格数据
    tableData.value = [];
  }
};

const { handleOpenDialog: handleOpenPlatformCategoryDialog } = usePlatformCategoryDialog({
  handleSuccess: handleSearch,
});

const { tableColumns } = useListColumns({
  refresh: handleSearch,
});

const categoryLoading = ref(false);
const init = async () => {
  categoryLoading.value = true;
  try {
    await getDictionaryOptionsSync(DICTIONARY_KEY.CATEGORY);
    // 初始化时选中第一个品类
    const firstCategory = categoryList.value[0];
    if (firstCategory) {
      handleCategoryCurrentChange(firstCategory);
      await nextTick();
      treeRef.value?.setCurrentKey(firstCategory.value);
    }
  } catch (error) {
    console.error('加载品类失败', error);
  }
  categoryLoading.value = false;
};
init();
</script>
