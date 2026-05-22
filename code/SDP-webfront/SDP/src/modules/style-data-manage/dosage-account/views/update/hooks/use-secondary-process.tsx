import { useTableColumns } from '@toy/business-components';
import { useDictionary } from '@/hooks/use-dictionary';
import { computed, Ref } from 'vue';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IDetail } from '../types';
import { CRAFTS_REQUIRE_ENUM } from '../../../constant';
import { FormItemRule, FormRules } from 'element-plus';
import { isEmpty } from '@toy/utils';

interface IProps {
  readOnly: Ref<boolean>;
}

/** 二次工艺表格 */
export const useSecondaryProcess = (props: IProps) => {
  const { readOnly } = props;
  const { getDictionaryOptions } = useDictionary();
  const PLM_PROCESS_SEQUENCE = computed(() => {
    const list = getDictionaryOptions(DICTIONARY_KEY.PLM_PROCESS_SEQUENCE);
    return list.filter(v => v.label !== '裁前');
  });
  const CRAFT_UNIT = computed(() => getDictionaryOptions(DICTIONARY_KEY.CRAFT_UNIT));
  const { columns: secondaryProcessColumns } = useTableColumns<IDetail['materialCraftList'][0]>(() => [
    {
      label: '工艺名称',
      render(row) {
        return row.category3 || row.category2;
      },
    },
    {
      label: '关联物料',
      prop: 'prototypeMaterialName'
    },
    {
      label: '位置要求',
      prop: 'positionRequirement'
    },
    {
      renderHeader() {
        return (
          <div class='required'>工艺次序</div>
        );
      },
      render(row, _, index) {
        return (
          <el-form-item
            prop={`materialCraftList[${index}].craftsProcessCode`}
            rules={{
              required: true,
              message: ''
            }}
          >
            {row.craftsProcessName || (
              <el-select
                v-model={row.craftsProcessCode}
                disabled={readOnly.value || row.craftsRequire === CRAFTS_REQUIRE_ENUM.BEFORE}
              >
                {PLM_PROCESS_SEQUENCE.value.map(v => (
                  <el-option
                    key={v.value}
                    value={v.value}
                    label={v.label}
                  />
                ))}
              </el-select>
            )}
          </el-form-item>
        );
      },
    },
    {
      renderHeader() {
        return (
          <div class='required'>核算用量</div>
        );
      },
      render(row, _, index) {
        return (
          <div class='tw-flex tw-gap-5px'>
            <el-form-item
              prop={`materialCraftList[${index}].craftDosageAccount`}
              rules={{
                required: true,
                message: ''
              }}
            >
              <input-number
                disabled={readOnly.value}
                v-model={row.craftDosageAccount}
                min={0}
                precision={2}
              />
            </el-form-item>
            <el-form-item
              prop={`materialCraftList[${index}].bulkUnit`}
              rules={{
                required: true,
                message: ''
              }}
            >
              <el-select
                disabled={readOnly.value}
                v-model={row.bulkUnit}
                placeholder='单位'
                class='tw-w-65px'
              >
                {CRAFT_UNIT.value.map(v => (
                  <el-option
                    key={v.label}
                    label={v.label}
                    value={v.label}
                  />
                ))}
              </el-select>
            </el-form-item>
          </div>
        );
      },
    },
    {
      renderHeader() {
        return (
          <div class='required'>损耗</div>
        );
      },
      render(row, _, index) {
        return (
          <el-form-item
            prop={`materialCraftList[${index}].craftWaste`}
            rules={{
              required: true,
              message: ''
            }}
          >
            <input-number
              disabled={readOnly.value}
              v-model={row.craftWaste}
              min={0}
              max={100}
              precision={2}
              v-slots={{
                suffix: () => '%'
              }}
            />
          </el-form-item>
        );
      },
    },
  ]);
  return {
    secondaryProcessColumns
  };
};
