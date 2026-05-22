<template>
  <sc-app-page>
    <template #fheader>
      <el-radio-group
        v-model="params.personal"
        class="tw-pb-15px"
        @change="handleSearch()"
      >
        <el-radio-button
          :value="false"
        >
          全部
        </el-radio-button>
        <el-radio-button
          :value="true"
        >
          我的
        </el-radio-button>
      </el-radio-group>
      <sc-search-area
        :config="searchConfig"
        v-model="params"
        label-width='85px'
        @handleSearch="handleSearch"
        @handle-reset="handleResetAll"
      >
        <template #designerIdList>
          <DesignerSelect
            v-model="params.designerIdList"
            multiple
            :is-first-load-cache="true"
          />
        </template>
        <template #styleTypeLikeArr>
          <el-cascader
            v-model="params.styleTypeLikeArr"
            :options="categoryTreeList as any"
            collapse-tags
            show-all-levels
            :props="pimsCategoryProps"
            class="tw-w-100%"
          />
        </template>
      </sc-search-area>
    </template>
    <template #main>
      <sc-table
        :columns='columns'
        :data="tableData"
        v-loading="tableLoading"
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
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </template>
  </sc-app-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useList } from '@toy/v-use';
import { getStyleInfoPageForTuikuan } from '../../api';
import DesignerSelect from '@/components/designer-select';
import type {
  IStyleInfoPageListItemForTuikuan,
} from '../../api/types';
import { useSearch } from './hooks/use-search';
import { IParams } from './types';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useColumns } from './hooks/use-columns';
import { useDictionary } from '@/hooks/use-dictionary';
import usePageParams from '@/modules/clothes-center/hooks/use-page-params';
import { CLOTHES_CENTER_SEARCH_KEY } from '@/modules/clothes-center/constant';

const pimsCategoryProps = ref({
  label: 'label',
  value: 'value',
  checkStrictly: true
});

const { getDictionaryOptions } = useDictionary();
const categoryTreeList = computed(() => getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY));

const { columns } = useColumns();

const { searchConfig } = useSearch();

const {
  params,
  tableTotal,
  tableData,
  tableLoading,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<IParams>({
  request: {
    api: getStyleInfoPageForTuikuan,
    params: {
      personal: false,
      styleCodeLike: '', // 款色号
      bomVersionLike: '', // 版本号
      regionId: '', // 所属区域
      createStart: '', // 创建日期开始
      createEnd: '', // 创建日期结束
      styleTypeLikeArr: [], // 款式品类
      styleCategory: '',
      designCode: '',
      pageNum: 1,
      pageSize: 20,
    },
    handleParams: (curParams) => {
      const { styleTypeLikeArr = [], designerIdList, personal, ...rest } = curParams;
      // 处理设计师id
      return {
        ...rest,
        personal,
        styleTypeLike: styleTypeLikeArr.join('-')
      };
    },
    handleCustomReset: (p, defaultParams) => {
      return {
        ...defaultParams,
        personal: p.personal,
      };
    }
  },
});

usePageParams(params, CLOTHES_CENTER_SEARCH_KEY);

onMounted(() => {
  handleSearch(params.value.pageNum);
});

/**
 * 重置查询
 */
const handleResetAll = () => {
  handleReset();
};

</script>
