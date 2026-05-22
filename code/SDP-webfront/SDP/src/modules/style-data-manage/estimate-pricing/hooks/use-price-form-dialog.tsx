import { useDialog } from '@toy/business-components';
import { FormRules, FormInstance, ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useResetRef } from '@toy/v-use';
import { IEstimateCheckPricePageResListItem } from '../api/types';
import { estimateCheckPriceSaveSpotCheckPrice } from '../api';
import NP from 'number-precision';

export const usePriceFormDialog = (props: {
  reloadFn: () => void;
}) => {
  const { reloadFn } = props;

  const formElRef = ref<FormInstance>();
  const setFormElRef = (el: FormInstance) => {
    formElRef.value = el;
  };
  const [formData, reset] = useResetRef({
    totalCost: '',
    estimateCheckPriceId: '',
  });

  const rules:FormRules = {
    totalCost: {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
  };

  const isView = ref(false);

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '',
    width: 300,
    onClose() {
      isView.value = false;
      reset();
    },
    async onConfirm() {
      await formElRef.value?.validate();
      await estimateCheckPriceSaveSpotCheckPrice({ ...formData.value });
      ElMessage.success('操作成功');
      closeDialog();
      reloadFn();
    },
    render() {
      return (
        <el-form ref={setFormElRef} rules={rules} model={formData.value}>
          <el-form-item label='预估价格：' prop='totalCost'>
            <input-number
              v-model={formData.value.totalCost}
              min={0}
              precision={2}
              disabled={isView.value}
              v-slots={{
                suffix: () => '元'
              }}
            />
          </el-form-item>
        </el-form>
      );
    },
  }));

  const handleDialog = (row: IEstimateCheckPricePageResListItem, isDetail: boolean = false) => {
    formData.value.totalCost = row.totalCost ? String(NP.round(row.totalCost, 2)) : '';
    formData.value.estimateCheckPriceId = row.estimateCheckPriceId!;
    isView.value = isDetail;
    openDialog();
    formElRef.value?.clearValidate();
  };

  return {
    handleDialog,
  };
};
