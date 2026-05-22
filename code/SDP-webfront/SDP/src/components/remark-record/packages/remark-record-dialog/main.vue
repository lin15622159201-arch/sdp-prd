<script lang="ts" setup>
import { pick, isFunction } from 'lodash-es';
import { ElDialog, ElInput, ElButton } from 'element-plus';
import propsData from '../../utils/props-data';
import optsKeys from '../../utils/opts-keys';
import logger from '../../utils/logger';
import type { RemarkRecordDialogOpenCbMethods } from '../../types';
import { ref, watch } from 'vue';

const props = defineProps({
  ...pick(propsData, optsKeys),
});

let methods: RemarkRecordDialogOpenCbMethods = {};
const visible = ref(false);
const editRemark = ref('');

const save = async () => {
  if (isFunction(props.handleCreate)) {
    const res = await props.handleCreate(editRemark.value);

    if (!(res === false)) {
      visible.value = false;
    }
    return;
  }

  if (
    props.row
      && isFunction(props.createApi)
      && isFunction(props.handleParams)
  ) {
    const params = props.handleParams(props.row, editRemark.value);

    if (editRemark.value.trim() === '') {
      editRemark.value = '';
      return;
    }
    const res = await props.createApi(params);
    // emit('success', res);
    if (methods?.success) {
      await methods.success(res);
    }
  }

  if (methods?.create) {
    logger.warn('请勿使用 [create] 作为自定创建函数，该设计有毛病，可使用 [handleCreate] 作为代替');
    await methods.create(editRemark.value);
  }
  visible.value = false;
};

watch(visible, () => {
  if (!visible.value) {
    editRemark.value = '';
  }
});

const open = (_methods?: RemarkRecordDialogOpenCbMethods) => {
  methods = _methods || {};
  visible.value = true;
};
const close = () => {
  visible.value = false;
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <el-dialog
    v-model="visible"
    title="备注"
    width="440px"
    append-to-body
    :close-on-click-modal="false"
    center
  >
    <el-input
      v-model="editRemark"
      type="textarea"
      resize="vertical"
      :placeholder="inputDisabled ? '' : '请输入备注内容'"
      :maxlength="maxlength"
      :disabled="inputDisabled"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
