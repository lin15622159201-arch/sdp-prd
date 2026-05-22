<template>
  <ContentCard title="供应商信息">
    <el-form
      ref="formRef"
      v-model="formData"
      :model="formData"
      :disabled="readOnly"
    >
      <sc-table
        :columns="tableColumns"
        :data="formData.suppliers"
      >
        <template #empty>
          暂无数据
          <el-button
            v-if="!readOnly"
            :icon="Plus"
            type="primary"
            link
            @click="handleAddSupplier()"
          >添加</el-button>
        </template>
      </sc-table>
    </el-form>
  </ContentCard>
</template>

<script setup lang='tsx'>
import { computed, PropType, ref, watchEffect } from 'vue';
import { IFormData } from '../types';
import ContentCard from './content-card.vue';
import { useSupplier } from '../hooks/use-supplier';
import { ElMessageBox, FormInstance, FormValidateCallback } from 'element-plus';
import { fetchSpotStyleListSupplier } from '../../../api';
import { ISpotStyleDetailRes } from '../../../api/spot-style';
import { Plus } from '@element-plus/icons-vue';

const formData = defineModel({
  type: Object as PropType<IFormData>,
  required: true
});
const formRef = ref<FormInstance>();

const props = defineProps({
  isCreate: {
    type: Boolean,
    default: false,
  },
  detailData: {
    type: Object as PropType<ISpotStyleDetailRes>,
    default: () => ({})
  },
  readOnly: {
    type: Boolean,
    default: false
  }
});

const { columns, handleAddSupplier } = useSupplier({
  formData,
  validateField: (fields) => {
    formRef.value?.validateField(fields);
  }
});
const tableColumns = computed(() => {
  if (props.readOnly) return columns.value.slice(0, -1);
  return columns.value;
});

/** 对比供应商名称+款号是否与已存在SPU重复 */
const checkHasExistSpu = async () => {
  const list = formData.value.suppliers.filter(v => v.supplierStyleCode && v.supplierName);
  if (!list.length) return true;
  let { data } = await fetchSpotStyleListSupplier(list.map((v) => {
    return {
      supplierStyleCode: v.supplierStyleCode,
      supplierName: v.supplierName,
    };
  }));
  if (props.detailData.taskCode) {
    data = data.filter(v => v.taskCode !== props.detailData.taskCode);
  }
  if (data.length) {
    ElMessageBox.alert(
      <div class='tw-pr-10px'>
        {data.map(v => (
          <div key={v.supplierStyleCode} class='tw-leading-[22px]'>
            供应商名称:
            <span class='tw-color-primary tw-pl-4px'>{v.supplierName}</span>
            、供应商款号:
            <span class='tw-color-primary tw-pl-4px'>
              {v.supplierStyleCode}
            </span>
            ，已存在SPU
          </div>
        ))}
        <div class='tw-color-danger'>请勿重复添加</div>
      </div>,
      '提示',
      {
        type: 'warning',
        customStyle: {
          maxWidth: 'none',
          width: 'auto'
        },
      },
    );
    return false;
  }
  return true;
};

const validate = async (callback?: FormValidateCallback) => {
  await formRef.value?.validate(async (valid, ...args) => {
    if (valid) {
      const res = await checkHasExistSpu();
      callback?.(res, ...args);
      if (!res) {
        throw new Error('供应商名称+款号已存在SPU重复');
      }
    } else {
      callback?.(valid, ...args);
      throw new Error('验证失败');
    }
  });
};

watchEffect(() => {
  // 已经有供应商行了就不再自动加
  if (formData.value.suppliers.length) return;

  // 创建页：默认加一行
  if (props.isCreate) {
    handleAddSupplier();
    return;
  }

  // 编辑页：如果详情里也没有供应商，则加一行
  if (!props.detailData.suppliers?.length) {
    handleAddSupplier();
  }
});

defineExpose({
  validate,
});
</script>
