import { reactive } from 'vue';
import type { FormScope } from '@/components/custom-form/';
import Form from '@/components/custom-form/';

export const useFormItem = () => {
  const model = reactive({
    templateName: '', // 模板名称
    categoryNameList: [], // 商品三级品类
    referSizeTemplate: '', // 引用尺寸模板名称
    customerSizeList: [],
  });
  const UI: FormScope[] = [
    {
      width: '100%',
      col: { xs: 12, sm: 12, md: 8, lg: 6, xl: 6 },
      items: [
        {
          key: 'templateName',
          label: '模板名称',
          type: 'input',
          stay: true,
        },
        {
          key: 'categoryNameList',
          label: '商品三级品类',
          type: 'cascader',
          dictCode: 'pims_category',
          cascaderLayer: 3,
          props: {
            showAllLevels: false,
            props: {
              label: 'value',
              value: 'value',
            },
          },
          stay: true,
        },
        {
          key: 'referSizeTemplate',
          slot: 'referSizeTemplate',
          label: '引用尺寸模板',
          type: 'select',
          props: {
            clearable: true,
          },
          stay: true,
        },
      ],
    },
  ];
  return new Form({ model, UI });
};
