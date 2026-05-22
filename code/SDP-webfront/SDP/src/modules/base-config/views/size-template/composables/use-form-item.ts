import { reactive } from 'vue';
import type { FormScope } from '@/components/custom-form/';
import Form from '@/components/custom-form/';
import { STATUS_LIST } from '@/modules/base-config/constant';

export const useFormItem = () => {
  const model = reactive({
    templateName: '', // 模板名称
    status: '', // 状态
    categoryNameList: [], // 商品三级品类
    createdTime: [], // 创建时间
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
          key: 'status',
          label: '状态',
          type: 'select',
          stay: true,
          option: STATUS_LIST,
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
          key: 'createdTime',
          label: '创建时间',
          type: 'daterange',
          props: {
            format: 'YYYY-MM-DD',
          },
        },
      ],
    },
  ];
  return new Form({ model, UI });
};
