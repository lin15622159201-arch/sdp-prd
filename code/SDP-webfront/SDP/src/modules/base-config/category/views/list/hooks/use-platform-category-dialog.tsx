import { ref, computed } from 'vue';
import { FormRules, ElForm, ElMessage } from 'element-plus';
import { useDialog } from '@toy/business-components';
import { fetchCategoryMappingBatchCreate } from '@/modules/base-config/category/api';
import type { ICategoryMappingCreateReq } from '@/modules/base-config/category/api/type';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY, CUSTOM_DICTIONARY_KEY } from '@/constant/dictionary';

export interface IConfig {
  handleSuccess?: () => void;
}

export const usePlatformCategoryDialog = ({ handleSuccess }: IConfig) => {
  const formEl = ref<InstanceType<typeof ElForm>>();
  const setRef = (el: InstanceType<typeof ElForm>) => {
    formEl.value = el;
  };
  const rules = computed<FormRules>(() => {
    return {
      platformCode: [
        {
          required: true,
          message: '平台不能为空',
          trigger: 'change',
        },
      ],
      platformCategoryCodes: [
        {
          required: true,
          message: '品类不能为空',
          trigger: 'change',
        },
      ]
    };
  });
  const formData = ref<ICategoryMappingCreateReq & { platformCategoryCodes: string[]; }>({
    platformCode: '',
    platformName: '',
    platformCategoryCode: '',
    platformCategoryName: '',
    categoryCode: '',
    platformCategoryCodes: [],
    categoryName: '',
    message: '',
  });

  const { getDictionaryOptions, getDictionaryOptionsSync } = useDictionary();
  const platformOptions = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLATFORM));
  const categoryOptions = computed(() => getDictionaryOptions(CUSTOM_DICTIONARY_KEY.TEMU_CATEGORY));

  /** 将列表转换为树形结构 */
  const buildTree = (list: any[], parentId: string | null = '0'): any[] => {
    return list
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        children: buildTree(list, item.value)
      }))
      .map(item => (item.children.length > 0 ? item : { ...item, children: undefined }));
  };

  const categoryTree = computed(() => {
    const tree = buildTree(categoryOptions.value);
    // 从第三级开始展示
    return tree[0]?.children?.[0]?.children || [];
  });

  const handlePlatFormChange = async () => {
    formData.value.platformCategoryCodes = [];
  };

  const { openDialog, closeDialog } = useDialog(() => ({
    title: '新增关联平台品类',
    width: 600,
    class: 'clear-dialog-body-padding',
    cancelText: '取消',
    confirmText: '确定',
    onClose() {
      formEl.value?.resetFields();
    },
    async onConfirm() {
      await formEl.value?.validate();
      const { platformCategoryCodes, ...params } = formData.value;
      const platformCategoryCode = platformCategoryCodes[platformCategoryCodes.length - 1];
      await fetchCategoryMappingBatchCreate([{
        ...params,
        platformCategoryCode,
        platformCategoryName: categoryOptions.value.find(i => i.value === platformCategoryCode)?.label || '',
        platformName: platformOptions.value.find(i => i.value === params.platformCode)?.label || '',
      }]);
      ElMessage.success('提交成功');
      handleSuccess && handleSuccess();
      closeDialog();
    },
    render() {
      return (
        <el-form rules={rules.value} model={formData.value} ref={setRef} label-width='auto' class='tw-m-20px'>
          <el-form-item label='平台' prop='platformCode'>
            <el-select
              v-model={formData.value.platformCode}
              placeholder='请选择'
              onChange={() => handlePlatFormChange()}
            >
              {
                platformOptions.value.map(i => (
                  <el-option
                    key={i.value}
                    label={i.label}
                    value={i.value}
                  />
                ))
              }
            </el-select>
          </el-form-item>
          <el-form-item label='品类' prop='platformCategoryCodes'>
            <el-cascader
              class='tw-w-full'
              v-model={formData.value.platformCategoryCodes}
              placeholder='请选择'
              separator='>'
              filterable
              clearable
              options={categoryTree.value}
              props={{ value: 'value', label: 'label', children: 'children' }}
            />
          </el-form-item>
          <el-form-item label='备注' prop='message'>
            <el-input
              type='textarea'
              v-model={formData.value.message}
              maxlength='100'
            />
          </el-form-item>
        </el-form>
      );
    },
  }));

  const handleOpenDialog = async (category: { code: string; name: string; }) => {
    formData.value.categoryCode = category.code;
    formData.value.categoryName = category.name;
    await getDictionaryOptionsSync(DICTIONARY_KEY.PLATFORM);
    if (platformOptions.value.length) {
      formData.value.platformCode = platformOptions.value[0].value;
    }
    openDialog();
  };
  return {
    handleOpenDialog,
  };
};
