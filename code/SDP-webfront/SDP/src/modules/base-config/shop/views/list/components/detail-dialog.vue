<template>
  <el-dialog
    v-model="selfVisible"
    title="店铺详情"
    width="600px"
    center
    :show-close="true"
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
  >
    <el-descriptions :column="2" border>
      <el-descriptions-item label="平台">
        {{ data?.platformName || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="店铺类型">
        {{ getShopTypeLabel(data?.shopType) }}
      </el-descriptions-item>
      <el-descriptions-item label="关联主体" :span="2">
        {{ data?.subjectName || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="店铺名称" :span="2">
        {{ data?.shopName || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="运营人员" :span="2">
        {{ data?.businessOperatorName || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="标签" :span="2">
        {{ formatLabels(data?.label) }}
      </el-descriptions-item>
      <el-descriptions-item label="商品token" :span="2">
        <sc-copy-text
          v-if="data?.productToken"
          :text="data.productToken || ''"
          class="token-text"
        />
      </el-descriptions-item>
      <el-descriptions-item label="订单token" :span="2">
        <sc-copy-text
          v-if="data?.orderToken"
          :text="data.orderToken || ''"
          class="token-text"
        />
      </el-descriptions-item>
      <el-descriptions-item label="是否启用" :span="2">
        <el-tag :type="data?.enable === 1 ? 'success' : 'danger'">
          {{ data?.enable === 1 ? '启用' : '停用' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="创建人">
        {{ data?.creatorName || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ $filters.formatTime(data?.createdTime) || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="修改人">
        {{ data?.reviserName || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="修改时间">
        {{ $filters.formatTime(data?.revisedTime) || '-' }}
      </el-descriptions-item>
    </el-descriptions>

    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import type { IShopPageResItem } from '../../../api/type';
import { useDictionary } from '@/hooks/use-dictionary';
import { ScCopyText } from '@toy/business-components';

interface Props {
  modelValue: boolean;
  data?: IShopPageResItem;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { getDictionaryLabel } = useDictionary();

const selfVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
});

const getShopTypeLabel = (code?: string) => {
  if (!code) return '-';
  return getDictionaryLabel(DICTIONARY_KEY.SHOP_TYPE, code) || code;
};

const formatLabels = (labels?: string) => {
  if (!labels) return '-';
  const labelArray = labels.split(',').filter(Boolean);
  if (labelArray.length === 0) return '-';
  return labelArray.map(code => getDictionaryLabel(DICTIONARY_KEY.SHOP_LABEL, code) || code).join('、');
};

const handleClose = () => {
  selfVisible.value = false;
};
</script>

<style scoped lang="scss">
.token-text {
  word-break: break-all;
  white-space: pre-wrap;
  max-height: 100px;
  overflow-y: auto;
}
:deep(.el-descriptions__label) {
  white-space: nowrap;
}
</style>
