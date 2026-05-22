<script setup lang="ts">
import { ref } from 'vue';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { useGetOptions, handleGetCategory } from './use-get-options';
import categoryDialog from '@/components/categoryDialog';

const categoryCode = defineModel<string>('categoryCode', {
  default: '',
});
const categoryName = defineModel<string>('categoryName', {
  default: '',
});

const isSync = defineModel<YES_NO_NUMBER_ENUM>('syncCategory', {
  default: YES_NO_NUMBER_ENUM.NO,
});

defineProps({
  formItemProp: {
    type: String,
    default: '',
  },
});

const { categoryList } = useGetOptions();

const treeList = ref<any>([]);
const getCategoryList = async () => {
  treeList.value = await handleGetCategory();
};
getCategoryList();

const handleChange = (code: string) => {
  const category = categoryList.value.find(item => item.code === code);
  if (category) {
    categoryCode.value = category.code;
    categoryName.value = category.value;
  }
};

const categoryDialogFun = () => {
  categoryDialog(treeList.value, categoryCode.value, categoryName.value).then((res: any) => {
    categoryCode.value = res.code;
    categoryName.value = res.value;
  });
};
</script>

<template>
  <div @click="categoryDialogFun" style="cursor: pointer">
    <div style="pointer-events: none">
      <el-form-item
        class="tw-w-full"
        label="品类"
        :prop="formItemProp"
      >
        <div class="tw-flex tw-flex-col tw-w-full">
          <!-- @change="handleChange" -->

          <el-select
            readonly
            class="tw-w-full"
            v-model="categoryName"
            placeholder="请选择品类"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            />
          </el-select>

          <!-- <el-checkbox
            v-model="isSync"
            class="tw-mt-2"
            :true-value="YES_NO_NUMBER_ENUM.YES"
            :false-value="YES_NO_NUMBER_ENUM.NO"
          >
            同步修改灵感源识别品类
          </el-checkbox> -->
        </div>
      </el-form-item>
    </div>
  </div>
  <div class="lable-box-h">
    <el-form-item label=".">
      <el-checkbox
        style="margin-top: -10px;"
        v-model="isSync"
        class="tw-mt-2"
        :true-value="YES_NO_NUMBER_ENUM.YES"
        :false-value="YES_NO_NUMBER_ENUM.NO"
      >
        同步修改灵感源识别品类
      </el-checkbox>
    </el-form-item>
  </div>

</template>
<style scoped>
.lable-box-h :deep(.el-form-item__label) {
  opacity: 0
}
</style>
