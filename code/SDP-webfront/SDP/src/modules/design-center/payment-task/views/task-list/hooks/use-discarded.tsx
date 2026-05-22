import { YES_NO_NUMBER_ENUM } from '@/constant';
import { useDialog } from '@toy/business-components';
import { useResetRef } from '@toy/v-use';
import { ElForm, ElMessage, ElMessageBox, FormRules } from 'element-plus';
import { computed, ref } from 'vue';
import { IPassInspirationReq } from '../../../api/types';
import { passInspiration } from '../../../api';
import { throttle } from 'lodash-es';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

interface IProps {
  reloadFn: () => void;
}

export const useDiscarded = (props: IProps) => {
  const { reloadFn } = props;
  const { getDictionaryOptions } = useDictionary();
  const INSPIRATION_CANCEL_REASON = computed(() => getDictionaryOptions(DICTIONARY_KEY.INSPIRATION_CANCEL_REASON));
  const [formData, reset] = useResetRef<IPassInspirationReq>({
    designDemandIdList: [],
    noPassReasonName: '',
    noPassReasonCode: ''
  });
  const rules: FormRules = {
    noPassReasonCode: {
      required: true,
      message: '请选择淘汰原因'
    },
  };
  const formEl = ref<InstanceType<typeof ElForm>>();
  const setFormEl = (el: any) => {
    formEl.value = el;
  };
  const handleChange = (val: string) => {
    const name = INSPIRATION_CANCEL_REASON.value.find(v => v.value === val)?.label ?? '';
    formData.value.noPassReasonName = name;
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '灵感淘汰',
    width: 400,
    onClose() {
      reset();
    },
    async onConfirm() {
      await formEl.value?.validate();
      await passInspiration({
        ...formData.value
      });
      ElMessage.success('操作成功');
      closeDialog();
      reloadFn();
    },
    render() {
      return (
        <el-form
          ref={setFormEl}
          rules={rules}
          model={formData.value}
        >
          <div class='tw-pb-15px tw-text-15px tw-font-bold'>淘汰灵感后将不可恢复，请确认是否淘汰</div>
          <el-form-item label='淘汰原因:' prop='noPassReasonCode'>
            <el-select
              v-model={formData.value.noPassReasonCode}
              placeholder='请选择'
              class='tw-w-200px'
              onChange={handleChange}
            >
              {INSPIRATION_CANCEL_REASON.value.map(v => (
                <el-option
                  value={v.value}
                  key={v.value}
                  label={v.label}
                />
              ))}
            </el-select>
          </el-form-item>
        </el-form>
      );
    },
  }));
  const handleDiscarded = throttle((ids: string[]) => {
    openDialog();
    formEl.value?.clearValidate();
    formData.value.designDemandIdList = ids;
  });
  return {
    handleDiscarded
  };
};
