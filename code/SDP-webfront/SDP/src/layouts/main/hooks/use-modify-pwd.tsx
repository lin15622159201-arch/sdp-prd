import { isEmpty } from '@toy/utils';
import { useAccountStore } from '@/store/account';
import { ElForm, ElMessage, FormRules } from 'element-plus';
import { ref, withKeys } from 'vue';
import { useDialog } from '@toy/business-components';
import { useResetRef } from '@toy/v-use';
import { userChangePassword } from '@/api/iam/user';
import { IUserChangePasswordReq } from '@/api/iam/user/types';
import { publicKey } from '@/constant';
import { encryptedData } from '@/core/utils/encrypt';

interface IFormData extends IUserChangePasswordReq {
  confirmPassword: string;
}

export const useModifyPwd = () => {
  const accountStore = useAccountStore();
  const loading = ref(false);
  const formEl = ref<InstanceType<typeof ElForm> | null>(null);
  const setFormEl = (val: any) => {
    formEl.value = val;
  };
  const [formData, reset] = useResetRef<IFormData>({
    newPassword: '',
    oldPassword: '',
    confirmPassword: '',
    accountId: '',
  });
  const rules: FormRules = {
    oldPassword: [
      {
        required: true,
        message: '请输入旧密码',
      },
    ],

    newPassword: [
      {
        required: true,
        validator: (_rules, value, cb) => {
          if (isEmpty(value)) {
            cb('请输入新密码');
          } else if (value === formData.value.oldPassword) {
            cb('新旧密码不能一致');
          } else {
            cb();
          }
        },
      },
    ],

    confirmPassword: [
      {
        required: true,
        trigger: 'blur',
        validator: (_rules, value, cb) => {
          if (isEmpty(value)) {
            cb('请再次输入密码');
          } else if (value !== formData.value.newPassword) {
            cb('两次密码不一致');
          } else {
            cb();
          }
        },
      },
    ],
  };
  const handleConfirm = async () => {
    try {
      await formEl.value?.validate();
      await userChangePassword({
        newPassword: encryptedData(publicKey, formData.value.newPassword) as string,
        oldPassword: encryptedData(publicKey, formData.value.oldPassword) as string,
        accountId: accountStore.account?.account?.id || '',
      });
      ElMessage.success('密码修改成功，请重新登录');
      await accountStore.logout();
      closeDialog();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };
  const { closeDialog, openDialog } = useDialog(() => ({
    title: '修改密码',
    width: 364,
    confirmText: '修改密码',
    onConfirm: handleConfirm,
    onClose() {
      reset();
    },
    render() {
      return (
        <el-form
          ref={setFormEl}
          model={formData.value}
          rules={rules}
          label-width='80px'
          onKeydown={withKeys(handleConfirm, ['enter'])}
        >
          <el-form-item
            label='旧密码'
            prop='oldPassword'
          >
            <el-input
              placeholder='请输入旧密码'
              v-model={[formData.value.oldPassword, ['trim']]}
              maxLength={18}
              type='password'
            />
          </el-form-item>

          <el-form-item
            label='新密码'
            prop='newPassword'
          >
            <el-input
              placeholder='请输入新密码'
              v-model={[formData.value.newPassword, ['trim']]}
              maxLength={18}
              type='password'
            />
          </el-form-item>

          <el-form-item
            label='确认密码'
            prop='confirmPassword'
          >
            <el-input
              placeholder='请再次输入密码'
              v-model={[formData.value.confirmPassword, ['trim']]}
              ref='inputEl'
              maxLength={18}
              type='password'
            />
          </el-form-item>
        </el-form>
      );
    },
  }));
  const handleModifyPwd = async () => {
    openDialog();
    await formEl.value?.clearValidate();
  };
  return {
    handleModifyPwd
  };
};
