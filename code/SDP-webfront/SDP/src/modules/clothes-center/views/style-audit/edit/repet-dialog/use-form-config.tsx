import { computed, ref, Ref } from 'vue';
import { ScFormConfigItem } from '@toy/business-components';
import querySelect from '@/components/query-select';
import { reworkResponsibilityPage } from '@/modules/clothes-center/api';
import { IReworkResponsibilityPageResListItem } from '@/modules/clothes-center/api/types';
import { useDictionary } from '@/hooks/use-dictionary';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { DICTIONARY_KEY } from '@/constant/dictionary';

interface IFormData {
  redoReasonCode: string;
  redoReason: string;
  responsibleParty: string;
  responsiblePartyName: string; // 返修责任方
}

export const useFormConfig = (
  formData: Ref<IFormData>,
) => {
  const selectEl = ref<InstanceType<typeof querySelect>>();
  const setSelectEl = (el: InstanceType<typeof querySelect>) => {
    selectEl.value = el;
  };
  const { getDictionaryOptions } = useDictionary();
  const redoReasonNameList = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_SAMPLE_REDO_REASON) || []);
  const handleRedoReasonChange = (value: string) => {
    const item = redoReasonNameList.value?.find(dict => dict.value === value);
    formData.value.redoReason = item?.label || '';
  };
  const handleResponsiblePartyChange = (_val: string, opt: IReworkResponsibilityPageResListItem) => {
    formData.value.responsiblePartyName = opt?.reworkingDuty || '';
  };

  // 表单配置
  const formConfig = computed<ScFormConfigItem<IFormData>[]>(() => ([
    {
      prop: 'redoReason',
      label: '复版原因',
      required: true,
      rules: [
        {
          required: true,
          message: '请选择 复版原因',
          trigger: 'change',
        }
      ],
      render: () => (
        <el-select
          class='select-full'
          v-model={formData.value.redoReasonCode}
          onChange={handleRedoReasonChange}
        >
          {redoReasonNameList.value.map(v => (
            <el-option
              key={v.value}
              value={v.value}
              label={v.label}
            />
          ))}
        </el-select>
      )
    },
    {
      prop: 'responsibleParty',
      label: '复版责任方',
      required: true,
      rules: [
        {
          required: true,
          message: '请选择 复版责任方',
          trigger: 'change',
        }
      ],
      render: () => (
        <query-select
          v-model={formData.value.responsibleParty}
          placeholder='请选择复版责任方'
          method={reworkResponsibilityPage}
          needInitSearch
          config={{
            labelKey: 'reworkingDuty',
            valueKey: 'code',
            keywordQueryKey: 'reworkingDuty',
            valueQueryKey: 'reworkingDuty',
            dataKey: 'data.list',
            showCode: false,
          }}
          queryParams={{ state: YES_NO_NUMBER_ENUM.YES, pageNum: 1, pageSize: 1000 }}
          ref={setSelectEl}
          onChange={handleResponsiblePartyChange}
        />
      ),
    },
  ]));
  return {
    formData,
    formConfig,
  };
};
