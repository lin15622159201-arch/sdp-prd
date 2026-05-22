<!--确认收货-->
<template>
  <el-dialog
    v-model="show"
    title="确认收货"
    width="440px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @closed="close()"
  >
    <el-form
      ref="formRef"
      label-width="95px"
      :model="form"
      :rules="rules"
      class="app-fheader-custom-form"
    >
      <el-form-item
        label="收货件数："
        prop="receivedNum"
      >
        <!-- <el-select
          v-model="form.receivedNum"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in REPAIR_RECEIPT_NUM_LIST"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select> -->
        <el-input
          v-model="form.receivedNum"
          clearable
          placeholder="请输入 收货件数"
        />
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

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref, nextTick } from 'vue';
import type { ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { PATTERN_SEW_COMBINE_ENUM } from '@/modules/exception-manage/exception-handle/constant';
import { REPAIR_RECEIPT_NUM_LIST } from '../../constant';
// import number from '@/components/custom-form/package/form-item/template/basis/number.vue';

export default defineComponent({
  name: 'RepairReceipt',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: true,
    },
    repairNum: {
      type: String as PropType<string>,
      default: '',
    },
    repairType: {
      type: String,
      default: '',
    },
  },
  emits: ['update:visible', 'submit'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const form = ref({ receivedNum: '' });
    // const rules = {
    //   receivedNum: [{ required: true, message: '此项必填' }],
    // };
    const rules = {
      receivedNum: [
        { required: true, message: '请输入 收货件数', trigger: 'blur' },
        { validator(_: any, value: any, callback: any) {
          const r = /^\+?(0|[1-9][0-9]*)$/;
          if (!r.test(value)) {
            callback(new Error('请输入正整数'));
          } else if (props.repairType === PATTERN_SEW_COMBINE_ENUM.SEW && value === '0') {
            callback(new Error('当前返修类型为车版，收货件数不能为0'));
          } else {
            callback();
          }
        },
        trigger: 'blur' },
      ],
    };

    // 弹框状态
    const show = computed({
      get: () => props.visible,
      set: (value: boolean) => emit('update:visible', value),
    });
    const close = () => {
      show.value = false;
      nextTick(() => {
        formRef.value?.resetFields();
      });
    };

    // 提交
    const save = async () => {
      await formRef.value?.validate();
      const repairNum = props.repairNum || '0';
      if (repairNum && (window.parseInt(form.value.receivedNum, 10) > window.parseInt(repairNum, 10))) {
        ElMessage.warning('收货件数不能大于返修件数！');
        return;
      }
      emit('submit', form.value.receivedNum);
      close();
    };

    // watchEffect(() => {
    //   if (props.visible) {
    //     form.value.receivedNum = props.repairNum || '';
    //   }
    // });

    return {
      formRef,
      rules,
      close,
      form,
      show,
      save,
      REPAIR_RECEIPT_NUM_LIST,
    };
  },
});
</script>

<style scoped lang="scss">
//
</style>
