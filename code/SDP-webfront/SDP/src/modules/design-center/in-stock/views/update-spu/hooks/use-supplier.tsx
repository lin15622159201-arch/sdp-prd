import { useTableColumns } from '@toy/business-components';
import { fetchApsSupplierQuery } from '../../../api';
import { Ref, ref, watch } from 'vue';
import { IFormData } from '../types';
import { isEmpty } from '@toy/utils';
import { FormItemRule } from 'element-plus';
import { IApsSupplierQueryRes } from '../../../api/spot-style';

interface IProps {
  formData: Ref<IFormData>;
  validateField?: (props: string[]) => void;
}

/** 供应商信息管理 */
export const useSupplier = ({ formData, validateField }: IProps) => {
  /** 供应商列表 */
  const supplierList = ref<IApsSupplierQueryRes>([]);
  const fetchSupplierList = async () => {
    const { data } = await fetchApsSupplierQuery();
    supplierList.value = data;
  };
  const init = () => {
    // fetchSupplierList();
  };
  init();
  const defaultSupplierInfo: Partial<IFormData['suppliers'][0]> = {
    // null避免input-number显示0
    purchasePrice: null as unknown as undefined
  };
  /** 点击新增 */
  const handleAdd = (index: number = 0) => {
    formData.value.suppliers.splice(index + 1, 0, { ...defaultSupplierInfo as IFormData['suppliers'][0] });
  };
  /** 点击删除 */
  const handleDelete = (index: number) => {
    formData.value.suppliers.splice(index, 1);
  };

  let repeatSupplierIndexes: number[] = [];
  const getRepeatSupplierIndexes = () => {
    const list = formData.value.suppliers.map(
      (item) => {
        const { supplierName, payeeName, supplierStyleCode } = item;
        if (!supplierName || !payeeName || !supplierStyleCode) return '';
        return supplierName + payeeName + supplierStyleCode;
      }
    );

    const seen = new Map<string, number[]>(); // key → 所有下标
    list.forEach((key, index) => {
      if (!key) return;
      if (!seen.has(key)) seen.set(key, []);
      seen.get(key)!.push(index);
    });

    // 只收集那些出现次数 > 1 的 key 的下标
    const duplicates = [...seen.values()].filter(arr => arr.length > 1);
    repeatSupplierIndexes = duplicates.flat(); // 一维数组返回所有重复下标
  };

  const validateRepeatField = () => {
    const fields: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    formData.value.suppliers.forEach((col, i) => {
      fields.push(
        `suppliers.[${i}].supplierName`,
        `suppliers.[${i}].payeeCode`,
        `suppliers.[${i}].supplierStyle`
      );
    });
    validateField?.(fields);
  };

  watch(() => formData.value.suppliers, (val) => {
    if (!val || val.length < 2) return;
    getRepeatSupplierIndexes();
    validateRepeatField();
  }, { deep: true });

  const getRepeatSupplierRule = (index: number): FormItemRule => {
    return {
      validator(rule, value, cb) {
        if (repeatSupplierIndexes.includes(index)) {
          cb('供应商信息重复');
          return;
        }
        cb();
      },
      trigger: 'blur'
    };
  };

  const { columns } = useTableColumns<IFormData['suppliers'][0]>(() => [
    {
      label: '供应商名称',
      render(row, _, index) {
        return (
          <el-form-item prop={`suppliers.[${index}].supplierName`} rules={getRepeatSupplierRule(index)}>
            <el-input
              placeholder='请输入供应商名称'
              v-model={[row.supplierName, ['trim']]}
              clearable
            />
          </el-form-item>
        );
      },
    },
    {
      label: '收款人',
      render(row, _, index) {
        return (
          <el-form-item prop={`suppliers.[${index}].payeeName`} rules={getRepeatSupplierRule(index)}>
            <el-input
              placeholder='收款人'
              v-model={[row.payeeName, ['trim']]}
              clearable
            />
            {/* <el-select
              filterable
              v-model={row.payeeCode}
            >
              {supplierList.value.map(v => (
                <el-option key={v.supplierCode} label={v.supplierName} value={v.supplierCode} />
              ))}
            </el-select> */}
          </el-form-item>
        );
      },
    },
    {
      label: '供应商款号',
      render(row, _, index) {
        return (
          <el-form-item prop={`suppliers.[${index}].supplierStyle`} rules={getRepeatSupplierRule(index)}>
            <el-input
              placeholder='请输入供应商款号'
              v-model={[row.supplierStyleCode, ['trim']]}
              clearable
            />
          </el-form-item>
        );
      },
    },
    {
      renderHeader() {
        return <span class='required'>采购价</span>;
      },
      render(row, _, index) {
        return (
          <el-form-item
            prop={`suppliers.[${index}].purchasePrice`}
            rules={{
              required: true,
              message: '采购价不能为空',
              trigger: 'blur'
            }}
          >
            <input-number
              v-model={[row.purchasePrice, ['trim']]}
              placeholder='请输入采购价'
              precision={2}
              min={0}
              max={9999.99}
            />
          </el-form-item>
        );
      },
    },
    {
      label: '操作',
      width: 100,
      render(row, _, index) {
        return (
          <el-form-item>
            <el-button type='primary' text onClick={() => handleAdd(index)}>
              新增
            </el-button>
            <el-button
              type='danger'
              text
              disabled={formData.value.suppliers.length <= 1}
              onClick={() => handleDelete(index)}
            >
              删除
            </el-button>
          </el-form-item>
        );
      },
    },
  ]);
  return {
    columns,
    handleAddSupplier: handleAdd,
    supplierList,
  };
};
