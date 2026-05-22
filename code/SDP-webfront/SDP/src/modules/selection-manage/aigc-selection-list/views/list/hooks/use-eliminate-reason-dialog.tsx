import { ref, computed } from 'vue';
import { FormRules, ElForm, ElCascader } from 'element-plus';
import { cloneDeep } from 'lodash-es';
import { useDialog } from '@toy/business-components';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IPicList } from '../type';

export type HandleOpenDialog = (params: IPicList) => void;

interface IConfig {
  handleSuccess?: (data: IPicList, res: IEliminateReasonFormData) => void;
}

export interface IEliminateReasonFormData {
  problemCodes: string[][];
  problemCode: string[];
  problemName: string[];
}

export const useEliminateReason = ({ handleSuccess }: IConfig = {}) => {
  let temp = {} as IPicList;
  const baseFormData: IEliminateReasonFormData = {
    problemCodes: [],
    problemName: [],
    problemCode: [],
  };
  const { getEnableDictionaryOptions } = useDictionary();
  const runningDiagramOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.RUNNING_DIAGRAM));
  const cascaderEl = ref<InstanceType<typeof ElCascader>>();
  const setCascaderRef = (el: InstanceType<typeof ElCascader>) => {
    cascaderEl.value = el;
  };
  const formEl = ref<InstanceType<typeof ElForm>>();
  const setRef = (el: InstanceType<typeof ElForm>) => {
    formEl.value = el;
  };
  const rules = computed<FormRules>(() => {
    return {};
  });
  const formData = ref(cloneDeep(baseFormData));

  const getCategoryLabels = (el?: InstanceType<typeof ElCascader>) => {
    const nodes = el?.getCheckedNodes(true) ?? [];
    const labels = nodes.map(i => i.label);
    return labels;
  };

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '淘汰原因',
    width: 600,
    class: 'clear-dialog-body-padding',
    onClose() {
      formEl.value?.resetFields();
    },
    async onConfirm() {
      await formEl.value?.validate();
      const { problemCodes } = formData.value;
      formData.value.problemCode = cloneDeep(problemCodes).map(i => i.join('>'));
      formData.value.problemName = getCategoryLabels(cascaderEl.value);
      handleSuccess && handleSuccess(temp, formData.value);
      closeDialog();
    },
    render() {
      return (
        <el-form rules={rules.value} model={formData.value} ref={setRef} label-width='100px' class='tw-m-20px'>
          <el-form-item label='跑图问题反馈' prop='problemCodes'>
            <el-cascader
              ref={setCascaderRef}
              v-model={formData.value.problemCodes}
              options={runningDiagramOptions.value}
              clearable
              show-all-levels={false}
              props={{ multiple: true }}
              collapse-tags
              collapse-tags-tooltip
              max-collapse-tags={3}
              style={{ width: '100%' }}
            />
          </el-form-item>
        </el-form>
      );
    },
  }));
  const handleOpenDialog: HandleOpenDialog = (data) => {
    temp = data;
    openDialog();
  };
  return {
    handleOpenDialog,
  };
};
