import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { get } from 'lodash-es';
import { isMobilePhone } from '@toy/utils';

interface IUseVerifyCode<T> {
  // 获取验证码api
  api: (params: T) => void;
  // 获取验证码请求参数
  getParams: () => T;
  // 手机号码Key (用于校验 手机号码格式)
  phoneKey?: string;
}

export function useVerifyCode<T>({
  api,
  getParams,
  phoneKey = 'phone',
}: IUseVerifyCode<T>) {
  const count = ref(0);
  const codeTimer = ref();

  const clearCodeTimer = () => {
    if (codeTimer.value) {
      clearInterval(codeTimer.value);
      codeTimer.value = null;
    }
  };
  const createCodeTimer = () => {
    codeTimer.value = setInterval(() => {
      count.value -= 1;
      if (count.value === 0) {
        clearCodeTimer();
      }
    }, 1000);
  };

  return {
    // 验证码按钮
    clickVerifyCodeBtn: async () => {
      try {
        const params = getParams();
        const phoneValue = get(params, phoneKey);
        // 校验手机号码格式
        if (!isMobilePhone(phoneValue)) {
          ElMessage.error('请检查输入是否正确');
          return;
        }
        await api(params);
        count.value = 60;
        createCodeTimer();
        ElMessage.success('验证码已发送');
      } catch (e) {
        console.error(e);
      }
    },
    count,
    clearCodeTimer,
  };
}
