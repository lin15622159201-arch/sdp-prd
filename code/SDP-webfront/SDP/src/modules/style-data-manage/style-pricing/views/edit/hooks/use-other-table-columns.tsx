import { useTableColumns } from '@toy/business-components';
import {
  ICheckPriceDetailResOtherCostInfoListItem,
} from '@/modules/style-data-manage/style-pricing/api/types';
import {
  getOtherCostAmount,
} from '@/modules/style-data-manage/style-pricing/views/edit/hooks/calc-amount';
import { computed, Ref } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash-es';
import { IFormData } from './use-detail';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDefaultItem } from './use-default-item';
import NP from 'number-precision';

export const useOtherTableColumns = (formData: Ref<IFormData>, modifyFlag: Ref<boolean>) => {
  const { getDictionaryOptions } = useDictionary();
  const { otherCostInfoItem } = useDefaultItem();
  const requirementUnitList = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_UMBER_REQUIREMENT_UNIT));
  const isReadonly = computed(() => !modifyFlag.value);

  // [物流其他费用]添加一行
  const handleAddOtherCost = (index: number) => {
    const item = cloneDeep(otherCostInfoItem);
    const spliceIndex = formData.value.otherCostInfoList.length === 0 ? 0 : index + 1;
    formData.value.otherCostInfoList.splice(spliceIndex, 0, {
      ...item,
    });
  };

  // [物流其他费用]删除一行
  const handleRemoveOtherCost = (index: number) => {
    formData.value.otherCostInfoList?.splice(index, 1);
  };

  const { columns } = useTableColumns<ICheckPriceDetailResOtherCostInfoListItem>(() => {
    return [
      {
        label: '操作',
        width: 80,
        align: 'center',
        render(row, ctx, $index) {
          return (
            <>
              <el-button
                text
                type='primary'
                onClick={() => handleAddOtherCost($index)}
                disabled={isReadonly.value}
              >
                <el-icon><Plus /></el-icon>
              </el-button>
              <el-button
                text
                type='danger'
                disabled={formData.value.otherCostInfoList.length === 1 && isReadonly.value}
                onClick={() => handleRemoveOtherCost($index)}
              >
                <el-icon><Minus /></el-icon>
              </el-button>
            </>
          );
        },
      },
      {
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <div class='required'>费用名称</div>
        ),
        render(row, ctx, $index) {
          return (
            <el-form-item
              label-width='0'
              prop={`otherCostInfoList[${$index}].costName`}
              rules={[{ required: true, message: '请选择', trigger: 'change' }]}
            >
              <el-input
                v-model={row.costName}
                placeholder='请输入'
                maxlength={50}
                disabled={isReadonly.value}
              />
            </el-form-item>
          );
        },
      },
      {
        label: '描述',
        minWidth: '120',
        align: 'center',
        render(row, ctx, $index) {
          return (
            <el-form-item
              label-width='0'
              prop={`otherCostInfoList[${$index}].otherCostDescribe`}
            >
              <el-input v-model={row.otherCostDescribe} placeholder='请输入' maxlength={300} disabled={isReadonly.value} />
            </el-form-item>
          );
        },
      },
      {
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <div class='required'>单件净用量</div>
        ),
        render(row, ctx, $index) {
          return (
            <el-form-item
              label-width='0'
              prop={`otherCostInfoList[${$index}].num`}
              rules={[{ required: true, message: '请选择', trigger: ['change', 'blur'] }]}
            >
              <input-number
                v-model={row.num}
                precision={2}
                min={0}
                disabled={isReadonly.value}
              />
            </el-form-item>
          );
        },
      },
      {
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <div class='required'>单位</div>
        ),
        render(row, ctx, $index) {
          return (
            <el-form-item
              label-width='0'
              prop={`otherCostInfoList[${$index}].unit`}
              rules={[{ required: true, message: '请选择', trigger: 'change' }]}
            >
              <el-select
                v-model={row.unit}
                clearable
                placeholder='请选择'
                disabled={isReadonly.value}
              >
                {
                  requirementUnitList.value?.map(item => (
                    <el-option
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  ))
                }
              </el-select>
            </el-form-item>
          );
        },
      },
      {
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <div class='required'>净单价</div>
        ),
        render(row, ctx, $index) {
          return (
            <el-form-item
              label-width='0'
              prop={`otherCostInfoList[${$index}].price`}
              rules={{ required: true, message: '请输入', trigger: ['blur', 'change'] }}
            >
              <input-number
                v-model={row.price}
                precision={2}
                min={0}
                disabled={isReadonly.value}
              />
            </el-form-item>
          );
        },
      },
      {
        label: '金额 (元)',
        minWidth: '120',
        align: 'center',
        render(row) {
          const amount = getOtherCostAmount(row);
          return `${NP.round(amount, 2)}元`;
        },
      },
    ];
  });
  return {
    tableColumns: columns,
    handleAddOtherCost
  };
};
