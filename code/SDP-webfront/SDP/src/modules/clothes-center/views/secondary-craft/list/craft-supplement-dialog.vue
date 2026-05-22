<template>
  <el-dialog
    :modelValue="visible"
    title="工艺补充"
    center
    custom-class="el-dialog-inner-scroll"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
    @open="handleOpen"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="110px"
    >
      <el-form-item
        label="工艺环节"
        prop="craftsProcessCode"
        :rules="{ required: true, message: '请选择工艺环节', trigger: 'change' }"
      >
        <el-select
          v-model="formData.craftsProcessCode"
          placeholder="请选择工艺环节"
          style="width: 100%;"
        >
          <el-option
            v-for="item of craftsRequireList"
            :key="item.valueCode"
            :label="item.value"
            :value="item.valueCode"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">
        取 消
      </el-button>
      <el-button type="primary" @click="handleConfirm">
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, toRefs } from 'vue';
import type { PropType } from 'vue';
import { CRAFTS_REQUIRE_ENUM } from '../constant';
import { ElMessage } from 'element-plus';
import { secondCraftSupplement } from '../api';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  craftsRequire: {
    type: String as PropType<string>,
    default: '',
  },
  dictList: {
    // type: Array as PropType<IdictValueListItem[]>,
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const emits = defineEmits(['update:visible', 'confirm']);

const formData = reactive({
  secondCraftId: '',
  craftsProcessCode: '',
  craftsProcessName: '',
});

const formRef = ref();
const handleOpen = () => {
  formData.secondCraftId = props.id;
};

const handleClose = () => {
  emits('update:visible', false);
  formRef.value.resetFields();
};

const handleConfirm = async () => {
  await formRef.value.validate();
  formData.craftsProcessName = props.dictList?.find((item) => {
    return item.valueCode === formData.craftsProcessCode;
  })?.value ?? '';
  await secondCraftSupplement(formData);
  ElMessage.success('操作成功');
  emits('confirm', true);
  handleClose();
};

// 字典 此处字典 与 后端返回工艺有差别，只能根据中文区分
const craftsRequireList = computed(() => {
  // const craftRequireMap = {
  //   100: '裁前',
  //   110: '裁后', // 包含裁片、半成品、成品
  // };
  if (props.craftsRequire === CRAFTS_REQUIRE_ENUM.BEFORE) {
    return props.dictList.filter(it => it.value === '裁前');
  }
  return props.dictList.filter(it => it.value !== '裁前');
});

toRefs({ formData });
</script>
