<template>
  <ScAppPage>
    <template #fheader>
      <ScSearchArea
        v-model="params"
        :config="searchConfig"
        @handle-search="handleSearch"
        @handle-reset="handleReset"
      >
        <template #creatorId>
          <UserSelect v-model="params.creatorId" />
        </template>
      </ScSearchArea>
    </template>

    <template #header>
      <div class="tw-flex tw-justify-between">
        <ScConditionSelect
          v-model="params.taskStatus"
          :condition-info="conditionInfo"
          @change="handleSearch()"
        />
        <!-- 批量操作按钮 -->
        <div>
          <span v-show="selectedList.length" class="tw-mr-2">已选 {{ selectedList.length }} 条</span>
          <template
            v-for="({
              label, onClick, disabledTooltip, isShow, ...item
            }, index) in batchButtonList"
            :key="index"
          >
            <el-tooltip
              v-if="isShow"
              :disabled="!item.disabled"
              :content="disabledTooltip"
              placement="top"
            >
              <el-button
                v-bind="item"
                class="tw-mb-2"
                @click="onClick"
              >{{ label }}</el-button>
            </el-tooltip>
          </template>
          <el-button
            v-if="XZ"
            class="tw-mb-2"
            type="primary"
            :icon="Plus"
            @click="handleCreate"
          >新增任务</el-button>
        </div>
      </div>
    </template>

    <template #main>
      <ScTable
        ref="tableRef"
        :columns="columns"
        :data="tableData"
        row-key="taskId"
        height="100%"
        @selection-change="handleSelectionChange"
      />
    </template>

    <template #ffooter>
      <div class="tw-w-full tw-flex tw-justify-end">
        <pagination
          :total="tableTotal"
          :current-page="params.pageNum"
          :page-size="params.pageSize"
          :page-sizes="[20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>

    <ImageDetail
      v-model="imageDetailDialog.visible"
      :taData="imageDetailDialog.taData"
      :picIndex="imageDetailDialog.picIndex"
      :invisible-handlers="['download4K']"
      :type="TASK_TYPE_ENUM.REPLACE_COLOR"
      :on-send-task="onSendTask"
    />
  </ScAppPage>
</template>

<script lang="ts" setup>
import UserSelect from '@/components/user-query-select/index.vue';
import { useSearch } from './hooks/use-search';
import { useTable } from './hooks/use-table';
import ImageDetail from '@/components/view-picture/components/image-detail/image-detail.vue';
import { ref } from 'vue';
import type { IReplaceColorTaskPageItem } from '../api/type';
import { TASK_TYPE_ENUM } from '@/constant/task';
import { useBatchHandler } from './hooks/use-batch-handler';
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue';
import { useSendTask } from '@/hooks/use-send-task';
import { usePermissionConfig } from '../use-permission-config';

const router = useRouter();
const { XZ } = usePermissionConfig();

const imageDetailDialog = ref({
  visible: false,
  taData: {} as any,
  picIndex: 0,
});

// 图片对比预览
const handleComparePreview = (data: IReplaceColorTaskPageItem, picIndex: number) => {
  imageDetailDialog.value = {
    visible: true,
    taData: {
      ...data,
      refImgUrl: data.replaceColorImgUrls,
      images: (data.replaceColorGeneratedPicUrls || []).map((v) => {
        return {
          imageUrl: v,
        };
      }),
    },
    picIndex,
  };
};
const {
  params,
  searchConfig,
  conditionInfo,
  tableData,
  tableTotal,
  handleReset,
  handleSearch,
  handleCurrentChange,
  handleSizeChange,
} = useSearch(() => {
  clearSelection();
});

const { tableRef, columns, clearSelection } = useTable({
  handleComparePreview,
  handleSearch
});

const { selectedList, batchButtonList, handleSelectionChange } = useBatchHandler({ handleSearch });

const { sendTask } = useSendTask(TASK_TYPE_ENUM.REPLACE_COLOR);
const onSendTask = (type: TASK_TYPE_ENUM) => {
  const { taData, picIndex } = imageDetailDialog.value;
  sendTask({ type, taskId: taData.taskId, imgs: String(picIndex) });
};

const handleCreate = () => {
  router.push({
    name: 'InspirationCenterClothColorReplacerCreate',
  });
};
</script>
