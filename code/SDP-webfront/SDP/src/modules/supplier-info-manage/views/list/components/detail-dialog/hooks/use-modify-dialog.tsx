import { useDialog } from '@toy/business-components';
import { FormRules, FormInstance } from 'element-plus';
import { ref, Ref, computed } from 'vue';
import { useResetRef } from '@toy/v-use';
import { isMobilePhone } from '@toy/utils';

export const useModifyFormDialog = (props: {
  tableData: Ref<any>;
  currentIndex: Ref<number>;
  reloadFn: () => void;
}) => {
  const { reloadFn, tableData, currentIndex } = props;

  const isModify = ref(false); // 是否编辑
  const currentRow = ref<any>(); // 当前行数据
  const formElRef = ref<FormInstance>();
  const setFormElRef = (el: FormInstance) => {
    formElRef.value = el;
  };
  const [formData, reset] = useResetRef({
    userName: '',
    phone: '',
  });

  // 队员电话列表，用于校验是否存在相同的号码
  const phoneList = computed(() => {
    return (tableData.value as any[]).map((item, index) => {
      if (isModify.value && currentIndex.value === index) {
        return null;
      }
      return item.phone;
    });
  });

  const rules:FormRules = {
    userName: {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
    phone: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
      {
        required: true,
        validator: (_, value, cb) => {
          // 校验手机号码格式
          if (!isMobilePhone(value)) {
            cb('请输入合法的手机号');
            return;
          }
          // 号码重复校验
          if (phoneList.value.includes(value)) {
            cb('手机号重复');
            return;
          }
          cb();
        },
        trigger: ['blur', 'change']
      },
    ]
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: isModify.value ? '编辑成员' : '新增成员',
    width: 400,
    onClose() {
      reset();
    },
    async onConfirm() {
      await formElRef.value?.validate();
      closeDialog();
      reloadFn();
    },
    render() {
      return (
        <el-form ref={setFormElRef} rules={rules} model={formData.value} label-width='80px'>
          <el-form-item label='姓名' prop='userName'>
            <el-input v-model={formData.value.userName} placeholder='请输入姓名' />
          </el-form-item>
          <el-form-item label='手机号' prop='phone'>
            <el-input
              v-model={formData.value.phone}
              disabled={isModify.value}
              maxlength={11}
              placeholder='请输入手机号'
            />
          </el-form-item>
        </el-form>
      );
    },
  }));

  const handleDialog = (isModifyFlag: boolean = false, row: any = {}) => {
    isModify.value = isModifyFlag;
    formData.value.userName = row.name || '';
    formData.value.phone = row.phone || '';
    currentRow.value = { ...row };
    openDialog();
    formElRef.value?.clearValidate();
  };

  return {
    handleDialog,
  };
};
