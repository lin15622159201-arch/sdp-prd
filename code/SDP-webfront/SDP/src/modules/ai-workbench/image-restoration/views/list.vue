<template>
  <sc-app-page>
    <template #fheader>
      <sc-search-area
        v-model="params"
        @handleReset="handleReset"
        :config="searchConfig"
        @handleSearch="handleBtnSearch"
      >
        <template #creator>
          <!-- <user-query-select
            ref="userQuerySelect"
            v-model="params.creatorName"
            @handleSearch="handleSearch"
          /> -->
          <div class="tw-flex tw-w-full">
            <el-input
              v-model="params.creatorName"
              placeholder="请输入"
              clearable
            >
              <template #append>
                <el-button class="btn-me" @click="handleSeeMe">只看我的</el-button>
              </template>
            </el-input>
          </div>
        </template>
      </sc-search-area>
    </template>
    <template #header>
      <div class="tw-flex tw-flex-justify-between">
        <sc-condition-select
          v-model="params.taskStatus"
          :incompat="''"
          :condition-info="conditionInfo"
          @conditionChange="handleBtnSearch"
        />
        <div class="tw-flex-center-y">
          <el-button
            @click="operationFun"
          >
            {{ operationText }}
          </el-button>
          <el-button
            type="primary"
            v-if="XZRW"
            @click="add"
          >
            新增任务
          </el-button>
        </div>
      </div>
      <div class="operationBth" v-show="operationText === '取消批量操作'">
        <div>已选中{{ selectionList.length }}条任务</div>
        <el-button
          class="bth-discontinue"
          type="danger"
          plain
          :disabled="!selectionList.length"
          @click="batchAbort"
          v-if="ZZ"
        >
          中止任务
        </el-button>
        <el-button
          type="danger"
          :disabled="!selectionList.length"
          @click="batchDelete"
          v-if="SC"
        >
          删除任务
        </el-button>
        <el-button
          type="primary"
          @click="batchRetry"
          :disabled="!selectionList.length"
          plain
          v-if="CS"
        >
          重试任务
        </el-button>
      </div>
    </template>
    <template #main>
      <sc-table
        ref="TableRef"
        height="100%"
        :data="tableData"
        :columns="tableColumns"
        :border="true"
        row-key="taskId"
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
          :page-size="params.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
      <ImageDetail
        v-model="imageDetailDialog.visible"
        :taData="imageDetailDialog.taData"
        :picIndex="imageDetailDialog.picIndex"
      />
    </template>
    <el-image-viewer
      v-if="showPreview"
      :url-list="[imgUrl]"
      show-progress
      :initial-index="0"
      @close="showPreview = false"
    />
  </sc-app-page>
</template>
<script lang='ts' setup>
import { computed, onActivated, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSearch } from './hooks/use-search';
import { useListColumns } from './hooks/use-table-columns';
import { postureFissionTaskPageApi } from '../api/index';
import { ImageRepairPageResListItem, ImageRepairPageReq } from '../api/types';
import { useList } from '@/hooks/use-list';
import { IListItem, IParams } from './types';
import DesignerSelect from '@/components/designer-select';
import {
  DESIGN_DEMAND_STATUS_LIST,
} from '../constant';
import { postDesignLogBizListApi } from '@/modules/design-center/api/operate-log';
import { remarksSave } from '@/api/basis';
import { REMARK_BIZ_TYPE_ENUM } from '@/constant';
import { usePermissionConfig } from '../use-permission-config';
import UserQuerySelect from '@/components/user-query-select/index.vue';
import ImageDetail from '../view-picture/components/image-detail/image-detail.vue';
import { handleBatchAbort, handleBatchDelete, handleBatchRetry } from '../lib/task';
import { useAccountStore } from '@/store/account';
import { ScTable } from '@toy/business-components';

const TableRef = ref<InstanceType<typeof ScTable> | null>(null);
const { ZZ, SC, CS, XZRW } = usePermissionConfig();
const router = useRouter();
const showPreview = ref(false);
const imgUrl = ref<string>('');
const imageDetailDialog = ref<any>({
  visible: false,
});
const conditionInfo = {
  title: '状态：',
  conditionList: [
    {
      value: '',
      label: '全部',
    },
    ...DESIGN_DEMAND_STATUS_LIST,
  ],
};

const { searchConfig } = useSearch();
const selectionList = ref<ImageRepairPageResListItem[]>([]);
const handleSelectionChange = (selection: ImageRepairPageResListItem[]) => {
  selectionList.value = selection;
};

const {
  params,
  tableTotal,
  tableData,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useList<IListItem, ImageRepairPageReq>({
  request: {
    api: postureFissionTaskPageApi,
    params: {
      pageNum: 1,
      pageSize: 10,
      taskStatus: '',
    },
    handleParams(data: any) {
      const processedTaskCode = typeof data.taskCode === 'string' ? data.taskCode.replace(/[ ,，]/g, '&').split('&').filter((v: string) => !!v) : [];

      return {
        ...data,
        source: data.source || undefined,
        // related: data.related === -1 ? undefined : data.related,
        taskCodeList: processedTaskCode,
        taskSource: data.taskSource === '-1' ? '' : data.taskSource,
        fixType: data.fixType === '-1' ? '' : data.fixType,
      };
    },
  },
  response: {
    async handleResponseData(list) {
      const data = list;
      data.forEach((v: any) => {
        v.generateImages = [];
        v.resultImg = [];
        (v.materials || []).forEach((item: { refImgUrl: string; materialId: string; }, index: number) => {
          v.generateImages.push({
            ...(v.images || []).find((v1: { groupId: string; }) => v1.groupId === item.materialId),
            refImgUrl: item.refImgUrl,
          });
        });
        v.generateImages.forEach((imgData:any, index: number) => {
          imgData.urlTypeName = imgData.bodyRepairUrl ? 'bodyRepairUrl' : (imgData.faceRepairUrl ? 'faceRepairUrl' : 'imageSuperResolutionRepairUrl');
          if (imgData.bodyRepairUrl) {
            v.resultImg.push({
              ...imgData,
              urlTypeName: 'bodyRepairUrl',
              url: imgData.bodyRepairUrl,
              urlIndex: index,
            });
          }
          if (imgData.faceRepairUrl) {
            v.resultImg.push({
              ...imgData,
              urlTypeName: 'faceRepairUrl',
              url: imgData.faceRepairUrl,
              urlIndex: index,
            });
          }
          if (imgData.imageSuperResolutionRepairUrl) {
            v.resultImg.push({
              ...imgData,
              urlTypeName: 'imageSuperResolutionRepairUrl',
              url: imgData.imageSuperResolutionRepairUrl,
              urlIndex: index,
            });
          }
        });
      });
      return data;
    },
  }
});
const { 
  tableColumns, 
  operationText,
  operationFun,
} = useListColumns({
  reloadFn() {
    TableRef.value?.clearSelection();
    handleSearch();
  },
  handleOperateLog(index: number, item: any, imgUrlName: string) {
    imageDetailDialog.value = {
      visible: true,
      taData: {
        ...item,
        refImgUrl: item.generateImages[index].refImgUrl,
        images: (item.generateImages || []).map((v: any) => {
          return {
            ...v,
            imgUrlName,
            imageUrl: v.refImgUrl,
          };
        })
      },
      picIndex: index,
    };
  },
  lookImg(url: string) {
    imgUrl.value = url;
    showPreview.value = true;
  },
});
const handleFail = () => {
  
};
const init = () => {
  handleSearch(params.value.pageNum || 1);
};
init();

const handleBtnSearch = () => {
  TableRef.value?.clearSelection();
  handleSearch(1);
};

// 新增任务
const add = () => {
  router.push({
    name: 'ImageRestorationAdd',
  });
};

// 中止任务
const batchAbort = () => {
  handleBatchAbort((selectionList.value || []).map((v: ImageRepairPageResListItem) => (v.taskId || '')), handleBtnSearch);
};

// 删除任务
const batchDelete = () => {
  handleBatchDelete((selectionList.value || []).map((v: ImageRepairPageResListItem) => (v.taskId || '')), handleBtnSearch);
};

// 重试任务
const batchRetry = () => {
  handleBatchRetry((selectionList.value || []).map((v: ImageRepairPageResListItem) => (v.taskId || '')), handleBtnSearch);
};


const accountStore = useAccountStore();
const handleSeeMe = () => {
  const label = accountStore.account?.account?.name ?? '';
  params.value.creatorName = label;
};
</script>
<style scoped>
.operationBth {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.bth-discontinue {
  margin-left: auto;
}
</style>
