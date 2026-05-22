import { useTableColumns } from '@toy/business-components';
import {
  ICheckPriceDetailResProcessCostInfoListItem
} from '@/modules/style-data-manage/style-pricing/api/types';
import {
  getProcessAmount,
  getProcessAmountItem,
} from '@/modules/style-data-manage/style-pricing/views/edit/hooks/calc-amount';
import { computed, Ref } from 'vue';
import { Plus, Minus, QuestionFilled } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash-es';
import { IFormData } from './use-detail';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDefaultItem } from './use-default-item';
import NP from 'number-precision';

export const useProcessTableColumns = (formData: Ref<IFormData>, modifyFlag: Ref<boolean>) => {
  const { getDictionaryOptions } = useDictionary();
  const { processCostInfoItem } = useDefaultItem();
  const processStepList = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_PROCESS_STEP));
  const sewingTypeList = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_SEWING_TYPE));
  const isReadonly = computed(() => !modifyFlag.value);

  // [加工费用]添加一行
  const handleAddProcessingFees = (index: number) => {
    const item = cloneDeep(processCostInfoItem);
    const spliceIndex = formData.value.processCostInfoList.length === 0 ? 0 : index + 1;
    formData.value.processCostInfoList?.splice(spliceIndex, 0, {
      ...item,
    });
  };
  // [加工费用]删除一行
  const handleRemoveProcessingFees = (index: number) => {
    formData.value.processCostInfoList.splice(index, 1);
  };
  // [加工费用]切换工序类型
  const handleChangeProcess = (row: ICheckPriceDetailResProcessCostInfoListItem) => {
    const item = processStepList.value?.find(it => it.value === row.processStepCode);
    row.processStepName = item?.label ?? '';
    // 修改车缝时
    if (row.processStepCode === '02') {
      // 分钟工资赋默认值
      row.minutelyPay = row.minutelyPay || '0.35';
      // 工时赋默认值
      row.workingHour = row.workingHour || '';
    }
  };
  // [加工费用]切换车缝类型
  const handleChangeSewingType = (row: ICheckPriceDetailResProcessCostInfoListItem) => {
    const item = sewingTypeList.value?.find(it => it.value === row.sewingType);
    row.sewingTypeDesc = item?.value ?? '';
  };

  const updateValue = (value: string, row: any, prop: string) => {
    if (prop !== 'amount') {
      const amount = getProcessAmount(row);
      row.amount = `${amount !== '' ? NP.round(amount, 2) : ''}`;
    }
    if (prop === 'amount') {
      // 修改金额时，动态修改工时或分钟工资
      const { value: val, prop: propValue } = getProcessAmountItem(row);
      row[propValue] = `${val !== '' ? NP.round(val, 2) : ''}`;
    }
  };

  const { columns } = useTableColumns<ICheckPriceDetailResProcessCostInfoListItem>(() => {
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
                onClick={() => handleAddProcessingFees($index)}
                disabled={isReadonly.value}
              >
                <el-icon><Plus /></el-icon>
              </el-button>
              <el-button
                text
                type='danger'
                disabled={formData.value.processCostInfoList.length === 1 && isReadonly.value}
                onClick={() => handleRemoveProcessingFees($index)}
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
          <div class='required'>工序环节</div>
        ),
        render(row, ctx, $index) {
          return (
            <el-form-item
              label-width='0'
              prop={`processCostInfoList[${$index}].processStepCode`}
              rules={[{ required: true, message: '请选择', trigger: 'change' }]}
            >
              <el-select
                v-model={row.processStepCode}
                clearable
                placeholder='请选择'
                onChange={() => handleChangeProcess(row)}
                disabled={isReadonly.value}
              >
                {
                  processStepList.value?.map(item => (
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
        label: '车种',
        minWidth: '120',
        align: 'center',
        render(row, ctx, $index) {
          return (
            row.processStepCode === '02' && (
              <el-form-item
                label-width='0'
                prop={`processCostInfoList[${$index}].sewingType`}
              >
                <el-select
                  v-model={row.sewingType}
                  clearable
                  placeholder='请选择'
                  onChange={() => handleChangeSewingType(row)}
                  disabled={isReadonly.value}
                >
                  {
                    sewingTypeList.value?.map(item => (
                      <el-option
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))
                  }
                </el-select>
              </el-form-item>
            )
          );
        },
      },
      {
        label: '工序描述',
        minWidth: '120',
        align: 'center',
        render(row, ctx, $index) {
          return (
            <el-form-item
              label-width='0'
              prop={`processCostInfoList[${$index}].processName`}
            >
              <el-input
                v-model={row.processName}
                type='textarea'
                autosize={{ minRows: 2, maxRows: 4 }}
                maxlength={500}
                clearable
                resize='none'
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
          <div class='required'>工时(分)</div>
        ),
        render(row, ctx, $index) {
          return (
            row.processStepCode === '02' && (
              <el-form-item
                label-width='0'
                prop={`processCostInfoList[${$index}].workingHour`}
                rules={{ required: true, message: '请输入', trigger: ['blur', 'change'] }}
              >
                <input-number
                  v-model={row.workingHour}
                  placeholder='请输入'
                  precision={2}
                  min={0.01}
                  max={999.99}
                  onChange={(value: string) => {
                    updateValue(value, row, 'workingHour');
                  }}
                  disabled={isReadonly.value}
                />
              </el-form-item>
            )
          );
        },
      },
      {
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <div class='required'>分钟工资</div>
        ),
        render(row, ctx, $index) {
          return (
            row.processStepCode === '02' && (
              <el-form-item
                label-width='0'
                prop={`processCostInfoList[${$index}].minutelyPay`}
                rules={{ required: true, message: '请输入', trigger: ['blur', 'change'] }}
              >
                <input-number
                  v-model={row.minutelyPay}
                  placeholder='请输入'
                  precision={2}
                  min={0.01}
                  max={999.99}
                  onChange={(value: string) => {
                    updateValue(value, row, 'minutelyPay');
                  }}
                  disabled={isReadonly.value}
                />
              </el-form-item>
            )
          );
        },
      },
      {
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <div class='required'>单价</div>
        ),
        render(row, ctx, $index) {
          return (
            row.processStepCode !== '02' && (
              <el-form-item
                label-width='0'
                prop={`processCostInfoList[${$index}].price`}
                rules={{ required: true, message: '请输入', trigger: ['blur'] }}
              >
                <input-number
                  v-model={row.price}
                  precision={2}
                  min={0}
                  onChange={(value: string) => {
                    updateValue(value, row, 'price');
                  }}
                  disabled={isReadonly.value}
                />
              </el-form-item>
            )
          );
        },
      },
      {
        minWidth: '120',
        align: 'center',
        renderHeader: () => (
          <>
            金额 (元)
            <el-tooltip
              effect='dark'
              placement='top'
              content='含损用量=单件用量*（1+损耗率）'
              v-slots={{
                content: () => {
                  return (
                    <div>
                      <p>1.（车缝）金额 = 工时（分）*分钟工资</p>
                      <p>2.（裁剪、后道、专机/手工）金额 = 单价</p>
                    </div>
                  );
                },
                default: () => (
                  <el-icon><QuestionFilled /></el-icon>
                )
              }}
            />
          </>
        ),
        render(row, ctx, $index) {
          if (row.processStepCode === '02') {
            return (
              <el-form-item
                label-width='0'
                prop={`processCostInfoList[${$index}].amount`}
                rules={{ required: true, message: '请输入', trigger: ['blur'] }}
              >
                <input-number
                  v-model={row.amount}
                  precision={2}
                  min={0}
                  onChange={(value: string) => {
                    updateValue(value, row, 'amount');
                  }}
                  v-slots={{
                    suffix: () => '元'
                  }}
                  disabled={isReadonly.value}
                />
              </el-form-item>
            );
          }
          return `${row.amount ?? ''}元`;
        },
      },
    ];
  });
  return {
    tableColumns: columns,
    handleAddProcessingFees
  };
};
