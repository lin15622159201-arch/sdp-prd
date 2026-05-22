import { getLabelByVal } from '@/core/plugins/filter';
import type { Ref } from 'vue';
import { reactive } from 'vue';
import type { FormScope } from '@/components/custom-form/index';
import Form, { useUploaderFormat } from '@/components/custom-form/index';
import {
  CRAFTS_REQUIRE_LIST,
  DESIGN_MATERIAL_TYPE_LIST,
  DESIGN_MATERIAL_TYPE_ENUM,
  CRAFTS_REQUIRE_ENUM,
} from '@/modules/design-center/develop-bom/constant';
import { useProductCascader } from '@/hooks-transfer/use-cascader/index';
import { IDetail } from '../../views/edit/types';

type BomRowItem = IDetail['bomOrderMaterialList'][0];

export default function useProcessForm(
  data: Ref<BomRowItem>,
) {
  const Model = reactive({
    category: [],
    relationDemandId: '', // 工艺关联面料,辅料需求ID(第三方)
    /**
     * 位置要求
     */
    positionRequirement: '',
    /**
     * 工艺图片，最多9张
     */
    picture: [],
    /**
     * 材料类型 二级分类
     */
    category2: '',
    /**
     * 材料类型 三级分类
     */
    category3: '',
    /**
     * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
     */
    category1: '',
    /**
     * 工艺次序:  100:裁版前工艺 110:裁版后工艺
     */
    craftsRequire: '',
    /**
     * 其他工艺要求
     */
    otherRequirement: '',
  });

  /* 花型图 */
  const uploadRes = useUploaderFormat(Model, 'picture');

  const UI: FormScope[] = [
    {
      col: { md: 12, lg: 12, xl: 12 },
      items: [
        {
          key: 'category',
          label: '二次工艺',
          rules: { required: true, message: '请填写 二次工艺' },
          type: 'cascader',
          tree: useProductCascader('20'),
          customParams: {
            cascaderFormat(tree) {
              const materialName = getLabelByVal(DESIGN_MATERIAL_TYPE_LIST, data.value.demandType);
              const root = tree.find(node => node.value === materialName);
              /* 根据bom物料项目，过滤对应工艺选项 */
              if (materialName && root) return [root];
              return tree;
            },
          },
          async change(val, form) {
            const { model } = form;
            const item = await form.getItem('craftsRequire');
            /* 辅料 工艺要求 默认 裁前 */
            const isAssist = data.value.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST;
            model.craftsRequire = isAssist ? CRAFTS_REQUIRE_ENUM.BEFORE : '';
            item.props!.disabled = isAssist;
          },
        },
        {
          key: 'craftsRequire',
          label: '工艺环节',
          rules: { required: true, message: '请选择 工艺环节' },
          type: 'select',
          props: {
            disabled: false,
          },
          option: CRAFTS_REQUIRE_LIST,
        },

      ],
    },
    {
      col: { md: 12, lg: 12, xl: 12 },
      items: [
        {
          key: 'positionRequirement',
          label: '位置要求',
          rules: { required: true, message: '请选择 位置要求' },
          type: 'input',
          props: {
            maxlength: 50,
          },
        },
      ],
    },
    {
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      items: [
        {
          key: 'otherRequirement',
          type: 'textarea',
          label: '其他要求',
          rules: {
            // required: true,
            // message: '请填写 其他要求'
          },
          props: {
            maxlength: 100,
          },
        },
      ],
    },
    {
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      items: [
        {
          key: 'picture',
          type: 'uploader',
          label: '花型图',
          props: {
            size: 'mini',
            limit: 6,
            accept: 'image/png, image/jpg, image/jpeg',
            checkAccept: true,
            listPosition: 'prepend',
          },
          upload: uploadRes,
          customParams: {
            warning: '最多上传 6张 花型图',
          },
          rules: {
            required: true,
            trigger: 'blur',
            message: '请上传至少 1张 花型图',
            validator(rule, value, callback) {
              const isCan = uploadRes.files.length >= 1;
              isCan ? callback() : callback(new Error(rule.message));
            },
          },
        },
      ],
    },
  ];

  return new Form({ model: Model, UI });
}
