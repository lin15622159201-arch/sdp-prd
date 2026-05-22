<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
import { useList } from '@toy/v-use';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import ImageDetail from '../../components/image-detail.vue';
import { useRoute, useRouter } from 'vue-router';
import FlowerUploadDialog from '../../components/flower-upload-dialog/index.vue';
import { usePermissionConfig } from '../../use-permission-config';
import { getFloralPrintExtractionDetail, getFloralPrintExtractionPage } from '../../api';
import { IFloralPrintExtractionPageResListItem } from '../../api/type';
import { cloneDeep } from 'lodash-es';
// import { Row, UserQuerySelect } from '@/components/user-query-select';
import { FLOWER_PATTERN_EXTRACTION_REGION_ENUM } from '../../constant';

// const CreatorQuerySelectRef = ref<InstanceType<typeof UserQuerySelect> | null>(null);
const { CJRW } = usePermissionConfig();
const { searchConfig, conditionState } = useSearch();

const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList({
  request: {
    api: getFloralPrintExtractionPage,
    params: {
      pageNum: 1,
      pageSize: 20,
      taskCode: '',
      taskStatus: undefined,
      creatorId: '',
      creatorName: '',
      companyId: '',
      createdStartTime: '',
      createdEndTime: '',
    },
    handleParams(p) {
      const _p = cloneDeep(p);
      if (_p.taskStatus === '') {
        delete _p.taskStatus;
      }
      return _p;
    },
    handleCustomReset: (_, defaultParams) => {
      // CreatorQuerySelectRef.value?.clear();
      return defaultParams;
    },
  },
});

const imageDetailRef = ref<InstanceType<typeof ImageDetail> | null>(null);
const imageDetailObj = ref({
  visible: false,
});
/**
 * 查看详情
 * @param row 当前行
 * @param url 当前生成图片
 */
const handleShowDetail = async (row: IFloralPrintExtractionPageResListItem, url: string) => {
  try {
    const { data } = await getFloralPrintExtractionDetail(row.taskCode);
    imageDetailObj.value = {
      visible: true,
    };
    imageDetailRef.value?.initDetail(data, url);
  } catch (error) {
    console.error(error);
  }
};

const flowerUploadDialogRef = ref<InstanceType<typeof FlowerUploadDialog> | null>(null);
const isShowUploader = ref(false);
const handleCreate = () => {
  flowerUploadDialogRef.value?.initData();
  isShowUploader.value = true;
  console.log(isShowUploader.value);
};

const handleEdit = (row: IFloralPrintExtractionPageResListItem) => {
  console.log('handleEdit=', row);
  flowerUploadDialogRef.value?.initData({
    url: row.originalImage,
    code: row.taskCode,
    region: row.extractRegion,
  });
  isShowUploader.value = true;
};

const { tableColumns } = useListColumns({ handleSearch, handleEdit, handleShowDetail });

const handleCreatorChange = (row: any) => {
  params.value.creatorName = row;
  // params.value.creatorId = row.id;
};

const route = useRoute();
const router = useRouter();
const init = () => {
  if (route.query.url) {
    console.log(route.query);
    isShowUploader.value = true;
    nextTick(() => {
      flowerUploadDialogRef.value?.initData({
        url: decodeURIComponent(route.query.url as string),
        code: '',
        source: 'FASHION_SMART_DEVELOP_STYLE',
        id: route.query.id as string,
        region: FLOWER_PATTERN_EXTRACTION_REGION_ENUM.UPPER_BODY,
      });
    });
  }
  if (route.query.taskCode) {
    params.value.taskCode = route.query.taskCode as string;
  }
  handleSearch();
};

onMounted(() => {
  init();
});

const successFlower = () => {
  if (route.query.url) {
    router.replace({
      name: 'InspirationCenterFlowerPatternExtractionList'
    });
  }
  handleSearch();
};

</script>

<template>
  <app-page>
    <ImageDetail
      ref="imageDetailRef"
      v-model:visible="imageDetailObj.visible"
    />
    <template #fheader>
      <search-area
        v-model="params"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        :config="searchConfig"
      >
        <template #creatorName>
          <!-- <UserQuerySelect
            ref="CreatorQuerySelectRef"
            placeholder="请输入创建人"
            :see-me="true"
            @change="handleCreatorChange"
          /> -->
          <el-input
            @change="handleCreatorChange"
            placeholder='请输入创建人'
          />
        </template>
      </search-area>
    </template>
    <template #header>
      <el-row justify="space-between" align="middle">
        <div class="tw-flex tw-justify-between tw-items-center tw-m-t-4">
          <sc-condition-select
            v-model="params.taskStatus"
            :condition-info="conditionState"
            @conditionChange="handleSearch()"
          />
        </div>
        <el-button
          v-if="CJRW"
          type="primary"
          size="default"
          @click="handleCreate"
        >
          创建任务
        </el-button>
      </el-row>
    </template>
    <template #main="{ height }">
      <sc-table
        :height="height"
        :key="height"
        :data="tableData"
        :columns="tableColumns"
        :border="false"
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
          :page-size="params.pageSize"
          :page-sizes="[20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </template>
    <FlowerUploadDialog
      ref="flowerUploadDialogRef"
      v-model:visible="isShowUploader"
      @success="successFlower"
    />
  </app-page>
</template>

<style lang="scss" scoped>
.btn-me {
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
  border: 1px solid #E1E4ED;
  border-left: none;
  white-space: nowrap;
  background-color: #F2F4FA;
  color: #606166;
  cursor: pointer;
}
</style>
