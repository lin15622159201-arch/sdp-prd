import { useDialog } from '@toy/business-components';
import { cloneDeep } from 'lodash-es';
import { computed, ref } from 'vue';
import { ElForm } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import { IPatternClothesCraftRes } from '../../../api/types';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { isEmpty } from '@toy/utils';
import { YES_NO_ENUM } from '@/constant';

interface IProps {
  onSubmit: (data: IPatternClothesCraftRes['secondCraftList']) => Promise<void>;
}
export const useCutting = ({ onSubmit }: IProps) => {
  const formEl = ref<InstanceType<typeof ElForm>>();
  const setFormEl = (el: any) => {
    formEl.value = el;
  };

  const { getDictionaryOptions } = useDictionary();
  const PLM_PROCESS_SEQUENCE = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_PROCESS_SEQUENCE));
  const [formData, reset] = useResetRef({
    tableData: [] as IPatternClothesCraftRes['secondCraftList'],
  });

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '裁后工艺次序',
    onClose() {
      reset();
    },
    onConfirm: async () => {
      await formEl.value?.validate();
      onSubmit(formData.value.tableData);
    },
    render() {
      return (
        <el-form
          scroll-to-error
          class='tw-mt-10px'
          model={formData.value}
          ref={setFormEl}
          label-width='0'
        >
          <el-table
            data={formData.value.tableData}
            border
          >
            <el-table-column
              label='工艺'
              minWidth='120px'
              align='center'
              v-slots={{
                default: ({ row }: { row: IPatternClothesCraftRes['secondCraftList'][0]; }) => {
                  return (
                    <>{ row.category3 || row.category2 || '-' }</>
                  );
                }
              }}
            />
            <el-table-column
              label='次序'
              minWidth='120px'
              align='center'
              v-slots={{
                default: ({ row }: { row: IPatternClothesCraftRes['secondCraftList'][0]; }) => {
                  return (
                    <el-select
                      filterable
                      v-model={row.craftsProcessCode}
                      onChange={(val: string) => {
                        if (isEmpty(val)) {
                          row.craftsProcessName = '';
                        } else {
                          const data = PLM_PROCESS_SEQUENCE.value.find(item => item.value === val);
                          if (data) {
                            row.craftsProcessName = data.label;
                          }
                        }
                      }}
                    >
                      {PLM_PROCESS_SEQUENCE.value.map(item => (
                        <el-option
                          key={item.value}
                          label={item.label}
                          value={item.value}
                          // 禁止选用裁前选项，字典配置的是1而非100
                          disabled={item.value === YES_NO_ENUM.YES}
                        />
                      ))}
                    </el-select>
                  );
                }
              }}
            />
          </el-table>
        </el-form>
      );
    },
  }));
  const handleOpenDialog = (list: IPatternClothesCraftRes['secondCraftList']) => {
    formData.value.tableData = cloneDeep(list);
    openDialog();
  };
  return {
    handleOpenDialog,
  };
};
