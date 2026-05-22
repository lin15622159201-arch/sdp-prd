<template>
  <el-dialog
    v-model="selfVisible"
    title="档差规则详情"
    width="80%"
    :show-close="true"
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    top="10vh"
  >
    <div v-if="data" class="detail-form">
      <el-descriptions
        :column="1"
        border
        label-width="100px"
      >
        <el-descriptions-item label="尺码">
          {{ data.sizeName }}
        </el-descriptions-item>
        <el-descriptions-item label="选中尺码">
          <el-tag
            v-for="size in sizeList"
            :key="size"
            class="tw-mr-8px tw-mb-4px"
            type="info"
          >
            {{ size }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="尺码参数">
          <el-tag
            v-for="part in partList"
            :key="part.partId"
            class="tw-mr-8px tw-mb-4px"
          >
            {{ part.partName }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建信息">
          {{ data.creatorName }} {{ $filters.formatTime(data.createdTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="更新信息">
          {{ data.reviserName }} {{ $filters.formatTime(data.revisedTime) }}
        </el-descriptions-item>
      </el-descriptions>

      <div class="tw-mt-4 tw-mb-2">档差：</div>
      <div v-if="data.diffs?.length" class="tw-mb-3">
        <el-table
          :data="data.diffs"
          stripe
          border
        >
          <el-table-column
            prop="size"
            label="尺码"
            width="100"
            align="center"
          />
          <el-table-column
            v-for="part in partList"
            :key="part.partId"
            :label="part.partName"
            align="center"
          >
            <template #default="{ row }: { row: ISizeDiffEditDiffItem }">
              {{ row.parts.find((p) => p.partId === part.partId)?.diff ?? '-' }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ISizeDiffEditDiffItem, ISizeDiffPageResItem } from '../../../api/types';

interface Props {
  modelValue: boolean;
  data?: ISizeDiffPageResItem;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selfVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
});

const sizeList = computed(() => props.data?.diffs.map(d => d.size).filter(Boolean) ?? []);

const partList = computed(() => {
  const firstDiff = props.data?.diffs[0];
  if (!firstDiff) return [];
  return firstDiff.parts.map(p => ({ partId: String(p.partId), partName: p.partName }));
});
</script>
