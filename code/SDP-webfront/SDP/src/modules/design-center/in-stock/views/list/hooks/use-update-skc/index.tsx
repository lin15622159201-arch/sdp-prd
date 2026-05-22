import { useDialog } from '@toy/business-components';
import { ElForm, ElMessage, FormRules } from 'element-plus';
import { computed, ref, shallowRef } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { isEmpty } from '@toy/utils';
import { IProps } from './types';
import { fetchSpotStyleBatchReColor, fetchSpotStyleEditSkc } from '@/modules/design-center/in-stock/api';
import { useColorOptions } from '@/components/color-cascader/package/use-color-options';
import { ISpotStyleReColorReq } from '@/modules/design-center/in-stock/api/spot-style';
import { IListItem } from '../../types';
import { IFile } from '@/components/uploader/packages/types';

export const useUpdateSkc = ({ reloadFn }: IProps) => {
  const formEl = ref<InstanceType<typeof ElForm>>();
  const setFormEl = (el: any) => {
    formEl.value = el;
  };
  const rules: FormRules = {
    productImages: {
      required: true,
      message: '商品图不能为空',
      trigger: 'change'
    },
    color: {
      required: true,
      message: '颜色不能为空',
      trigger: 'change'
    },
    sizeStandardCode: {
      required: true,
      message: '尺码不能为空'
    },
  };
  const { CLOTHING_COLOR_MAP, CLOTHING_COLOR_LABEL_MAP, getColors } = useColorOptions({});
  const rowData = shallowRef<IListItem>();
  const formData = ref<ISpotStyleReColorReq & { taskCode?: string; skcCode?: string; }>({
    taskId: '',
    mainImgUrl: '',
    color: '',
    colorEnName: '',
    sizeStandardCode: '',
    sizeStandardName: '',
    productImages: [],
  });

  const isEdit = computed(() => !isEmpty(rowData.value?.skcId));

  const colorProps = {
    label: 'label',
    value: 'value',
    emitPath: false
  };
  const { getDictionaryOptions } = useDictionary();
  /** 标准尺码 true，过滤出已启用的 */
  const PLM_STANDARD_SIZE = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE));
  const PLM_STANDARY_SIZE_OPTIONS = computed(() => {
    const { sizeStandardCode } = rowData.value || {};
    if (!sizeStandardCode) return [];
    const row = PLM_STANDARD_SIZE.value
      .find(v => v.value === sizeStandardCode)?.children?.[0];
    if (!row) return [];
    return row.label.split(',').map(v => ({
      label: v,
      value: v
    }));
  });

  const onConfirm = async () => {
    await formEl.value?.validate();
    const colorData = CLOTHING_COLOR_MAP.value.get(formData.value.color);
    const params: ISpotStyleReColorReq = {
      ...formData.value,
      color: colorData?.label || '',
      colorEnName: colorData?.colorEnglishName || '',
      sizeStandardName: formData.value.sizeStandardCode,
      mainImgUrl: formData.value.productImages[0],
    };
    if (isEdit.value) {
      const { skcId } = rowData.value!;
      await fetchSpotStyleEditSkc({
        ...params,
        skcId,
      });
    } else {
      await fetchSpotStyleBatchReColor([params]);
    }
    ElMessage.success('操作成功');
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    closeDialog();
    reloadFn();
  };

  const productImages = computed<IFile[]>({
    get() {
      return formData.value.productImages.map(url => ({ url }));
    },
    set(val) {
      formData.value.productImages = val.map(v => v.url);
    }
  });
  const skcSizeStandardCode = computed<string[]>({
    get() {
      return formData.value.sizeStandardCode?.split('-') || [];
    },
    set(val) {
      formData.value.sizeStandardCode = val.filter(Boolean).join('-');
    }
  });

  const { openDialog, closeDialog } = useDialog(() => ({
    title: !isEdit.value ? '复色' : '编辑SKC',
    onClose() {
      formEl.value?.resetFields();
    },
    onConfirm,
    render() {
      return (
        <el-form
          ref={setFormEl}
          label-width={60}
          label-suffix=':'
          model={formData.value}
          rules={rules}
        >
          {isEdit.value ? (
            <el-form-item label='SKC'>
              {formData.value.skcCode}
            </el-form-item>
          ) : (
            <el-form-item label='SPU'>
              {formData.value.taskCode}
            </el-form-item>
          )}
          <el-form-item label='颜色' prop='color'>
            <color-cascader
              class='tw-w-150px'
              filterable
              show-all-levels
              props={colorProps}
              v-model={formData.value.color}
            />
          </el-form-item>
          <el-form-item label='尺码' prop='sizeStandardCode'>
            <el-checkbox-group
              v-model={skcSizeStandardCode.value}
            >
              {PLM_STANDARY_SIZE_OPTIONS.value.map(item => (
                <el-checkbox
                  key={item.value}
                  value={item.value}
                  label={item.label}
                />
              ))}
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label='商品图' prop='productImages'>
            <uploader
              v-model={productImages.value}
              accept='.jpg,.jpeg,.png,.webp'
              multiple
              limit={20}
              size-limit={15}
              size='mini'
              tips='支持上传.jpg .png .webp格式的图片，最大图片数量20张。'
            />
          </el-form-item>
        </el-form>
      );
    },
  }));

  /**
   * 点击编辑SKC或者复色
   * designCode 为空时为复色
   *  */
  const handleUpdateSKC = async (row: IListItem) => {
    rowData.value = row;
    await getColors();
    const colorData = CLOTHING_COLOR_LABEL_MAP.value.get(row.color);
    formData.value = {
      ...formData.value,
      taskId: row.taskId,
      taskCode: row.taskCode,
      color: colorData?.value || '',
    };
    if (row.isChild) {
      formData.value.skcCode = row.skcCode;
      formData.value.sizeStandardCode = row.skcSizeStandardCode || '';
      formData.value.productImages = row.productImages?.map(item => item.imageUrl) || [];
    } else {
      formData.value.parentId = row.taskId;
    }
    openDialog();

    setTimeout(() => {
      formEl.value?.clearValidate();
    });
  };
  return {
    handleUpdateSKC
  };
};
