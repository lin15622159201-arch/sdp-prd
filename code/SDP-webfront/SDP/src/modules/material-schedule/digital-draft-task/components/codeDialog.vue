<template>
  <el-dialog
    v-model="show"
    title="编码"
    width="440px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @closed="close()"
    @open="open()"
  >
    <el-form
      ref="formRef"
      label-width="95px"
      :model="form"
      :rules="rules"
      label-position="top"
      class="app-fheader-custom-form"
    >
      <el-form-item label="花型面料的SKU" prop="fabricSku">
        <el-select
          v-model="form.fabricSku"
          filterable
          clearable
          placeholder="请输入花型面料的SKU"
        >
          <el-option
            v-for="item in fabricSkuList"
            :key="item.skuCode"
            :label="item.skuCode"
            :value="item.skuCode"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ElMessage, type ElForm } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import {
  digitalPaintingChangeFabricSku,
  digitalPaintingGetCommodityDetailByCode
} from '../api';
import {
  IDigitalPaintingGetCommodityDetailByCodeResCommoditySkuVosItem as IFabricSkuItem,
} from '../api/types';
import { YES_NO_ENUM } from '@/constant';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    require: true,
  },
  id: {
    type: String,
    default: '',
  },
  commodityCode: {
    type: String,
    default: '',
  },
});

interface IEmits {
  (e: 'update:modelValue', visible: boolean): void;
  (e: 'success'): void;
}

const emit = defineEmits<IEmits>();

interface IForm {
  fabricSku: string;
}

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const [form, reset] = useResetRef<IForm>({
  fabricSku: '',
});

const rules = {
  fabricSku: [{ required: true, message: '花型面料的SKU不能为空' }],
};

const fabricSkuList = ref<IFabricSkuItem[]>([]);

const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:modelValue', value),
});

const open = async () => {
  const { commodityCode } = props;
  if (!commodityCode) return;
  const { data } = await digitalPaintingGetCommodityDetailByCode(commodityCode);
  fabricSkuList.value = data?.commoditySkuVos?.filter(n => n.isEnable === YES_NO_ENUM.YES) || [];
};

const close = () => {
  reset();
  formRef.value?.resetFields();
  show.value = false;
};

const save = async () => {
  await formRef.value?.validate();
  await digitalPaintingChangeFabricSku({
    digitalPaintingId: props.id,
    fabricSku: form.value.fabricSku,
  });
  ElMessage.success('编码成功');
  emit('success');
  close();
};
</script>

<style scoped lang="scss">
//
</style>
