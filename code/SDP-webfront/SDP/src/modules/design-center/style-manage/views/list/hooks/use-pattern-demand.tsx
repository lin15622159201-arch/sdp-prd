import { useDialog } from '@toy/business-components';
import { ElForm, ElMessage, FormRules } from 'element-plus';
import { computed, ref } from 'vue';
import { IListItem } from '../types';
import { useResetRef } from '@toy/v-use';
import { IPostMakeClothesReq } from '../../../api/types';
import { MAKE_CLOTHES_TYPE_ENUM, MAKE_CLOTHES_TYPE_LIST } from '../../../constant';
import { latestBaseInfo, postMakeClothes } from '../../../api';
import { YES_NO_ENUM } from '@/constant';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { BOM_ORDER_STATUS_ENUMS } from '@/modules/design-center/develop-bom/constant';

interface IProps {
  reloadFn: () => void;
}

/** 发起打版需求 */
export const usePatternDemand = (props: IProps) => {
  const { reloadFn } = props;
  const { getDictionaryOptions } = useDictionary();
  /** 标准尺码 true，过滤出已启用的 */
  const PLM_STANDARY_SIZE = computed(() => {
    const list = getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE);
    if (!formData.value?.sizeStandardCode) return [];
    const row = list
      .find(v => v.value === formData.value?.sizeStandardCode)?.children?.[0];
    if (!row) return [];
    return row.label.split(',').map(v => ({
      label: v,
      value: v
    }));
  });
  const [formData, reset] = useResetRef<IPostMakeClothesReq & { color: string; sizeStandardCode: string; }>({
    designCode: '',
    makeClothesType: '' as unknown as MAKE_CLOTHES_TYPE_ENUM,
    sampleSize: '',
    sampleAmount: '',
    color: '',
    sizeStandardCode: '',
  });
  const formEl = ref<InstanceType<typeof ElForm>>();
  const setFormEl = (el: any) => {
    formEl.value = el;
  };
  const rules: FormRules = {
    makeClothesType: {
      required: true,
      message: '请选择打版方式',
    },
    sampleSize: {
      required: true,
      message: '请选择尺码',
    },
    sampleAmount: {
      required: true,
      message: '请选择样衣件数',
    },
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '发起打版需求',
    width: 470,
    confirmText: '提交',
    onClose() {
      reset();
    },
    async onConfirm() {
      await formEl.value?.validate();
      const { sampleAmount, ...rest } = formData.value;
      await postMakeClothes({
        ...rest,
        sampleAmount: [
          MAKE_CLOTHES_TYPE_ENUM.THREE_AND_ACTUAL,
          MAKE_CLOTHES_TYPE_ENUM.ACTUAL
        ].includes(rest.makeClothesType) ? sampleAmount : ''
      });
      ElMessage.success('提交成功');
      closeDialog();
      reloadFn();
    },
    render() {
      return (
        <el-form
          label-width='90px'
          ref={setFormEl}
          model={formData.value}
          rules={rules}
        >
          <el-form-item label='SKC：'>
            {formData.value.designCode}
          </el-form-item>
          <el-form-item label='颜色：'>
            {formData.value.color}
          </el-form-item>
          <el-form-item label='打版方式：' prop='makeClothesType'>
            <el-radio-group v-model={formData.value.makeClothesType}>
              {MAKE_CLOTHES_TYPE_LIST.map(v => (
                <el-radio
                  value={v.value}
                  label={v.label}
                  key={v.value}
                />
              ))}
            </el-radio-group>
          </el-form-item>
          <el-form-item label='尺码：' prop='sampleSize'>
            <el-select
              class='tw-w-200px'
              v-model={formData.value.sampleSize}
            >
              {PLM_STANDARY_SIZE.value.map(v => (
                <el-option
                  key={v.value}
                  value={v.value}
                  label={v.label}
                />
              ))}
            </el-select>
          </el-form-item>
          {[
            MAKE_CLOTHES_TYPE_ENUM.ACTUAL,
            MAKE_CLOTHES_TYPE_ENUM.THREE_AND_ACTUAL,
          ].includes(formData.value.makeClothesType) && (
            <el-form-item label='样衣件数：' prop='sampleAmount'>
              <el-select
                class='tw-w-200px'
                v-model={formData.value.sampleAmount}
              >
                {Array(15).fill(1).map((_v, i) => (
                  <el-option
                    value={i + 1}
                    label={i + 1}
                  />
                ))}
              </el-select>
            </el-form-item>
          )}
        </el-form>
      );
    },
  }));
  /** 点击发起打版需求 */
  const handleCreateDemand = async (row: IListItem) => {
    if (row.sampleInfos.some(v => v.isDone === YES_NO_ENUM.NO && v.isCancel === YES_NO_ENUM.NO)) {
      ElMessage.error('当前已存在进行中的打版需求，请需求结束后再发起');
      return;
    }
    const { data } = await latestBaseInfo({ designCode: row.designCode! });
    if (!data || data.bomOrderState === BOM_ORDER_STATUS_ENUMS.WAIT_SUBMIT) {
      ElMessage.error('请提交BOM单后再操作');
      return;
    }
    formData.value.designCode = row.designCode!;
    formData.value.color = row.color!;
    formData.value.sizeStandardCode = row.sizeStandardCode!;
    formData.value.sampleSize = row.sampleSize!;
    openDialog();
    formEl.value?.clearValidate();
  };
  return {
    handleCreateDemand,
  };
};
