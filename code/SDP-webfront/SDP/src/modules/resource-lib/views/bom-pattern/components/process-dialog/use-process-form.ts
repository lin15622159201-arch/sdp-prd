import { getLabelByVal } from '@/core/plugins/filter';
import type { Ref } from 'vue';
import { reactive, ref } from 'vue';
import type { FormScope, Rule } from '@/components/custom-form/index';
import Form, { useFuzzy, useUploaderFormat } from '@/components/custom-form/index';
import {
  SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_LIST,
  SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_ENUM,
  CRAFTS_REQUIRE_LIST,
  DESIGN_MATERIAL_TYPE_LIST,
  DESIGN_MATERIAL_TYPE_ENUM,
  CRAFTS_REQUIRE_ENUM,
} from '@/modules/resource-lib/constant';
// import * as API from '@/api/supplier/index';
// import { getCustomerDetail } from '@/api/purchaser';
import { ElMessage } from 'element-plus';
import type {
  getWebV1BomDetailApiResBomOrderMaterialListResItem,
} from '@/modules/resource-lib/api/types';
import { useProductCascader } from '@/hooks-transfer/use-cascader/index';
import { scmPostSupplierPageApi, scmGetSupplierInfoDetailApi } from '@/api/scm';
import { getCustomerDetail } from '@/modules/resource-lib/api';

type BomRowItem = getWebV1BomDetailApiResBomOrderMaterialListResItem;

/* 客户详情 */
const customerDetail = async (purchaserId: string) => {
  try {
    const { data } = await getCustomerDetail(purchaserId) as any;
    const { baseInfo, contacts } = data;
    return {
      contactProvince: baseInfo.province,
      contactCity: baseInfo.city,
      contactRegion: baseInfo.area,
      contactDetailAddress: baseInfo.address,
      factoryName: baseInfo.purchaserName,
      contactName: contacts.length > 0 ? contacts[0].contactName : '',
      contactPhone: contacts.length > 0 ? contacts[0].contactMobile : '',
    };
  } catch (e) {
    console.log('客户详情 error');
    ElMessage.error('查询客户信息异常');
    return Promise.reject(e);
  }
};

// 查询工艺厂详情
const getCraftFactoryDetail = async (id: string) => {
  try {
    const { data } = await scmGetSupplierInfoDetailApi(id);
    const { supplierPersonnels, province, city, area, address, supplierName, supplierId } = data;
    const { name, mobilePhone } = supplierPersonnels[0];

    return {
      innerFactoryId: supplierId,
      contactProvince: province,
      contactCity: city,
      contactRegion: area,
      // contactDetailAddress: `${province} ${city} ${area}   ${address}`,
      contactDetailAddress: `${address}`,
      factoryName: supplierName,
      contactName: name,
      contactPhone: mobilePhone,
    };
  } catch (e) {
    console.log(e, '查询工艺厂详情接口异常！');
    ElMessage.error('查询工艺厂异常');
    return Promise.reject(e);
  }
};

export default function useProcessForm(
  purchaserId: Ref<string>,
  data: Ref<BomRowItem>,
) {
  /* 工艺厂 默认选项 */
  const noProvideDisable = ref(false);
  const defalutCraftFactory = [
    { value: 'PROVIDE', label: '其他工艺厂' },
    { value: 'NO_PROVIDE', label: '客户不提供工艺厂', disable: noProvideDisable },
  ];

  /* 工艺厂查询 */
  const fuzzyParams = {
    supplierName: '',
    supplierCategory: 'TECHNOLOGY_SUPPLIER',
    pageNum: 1,
    pageSize: 100,
  };

  const craftFuzzy = useFuzzy({
    params: fuzzyParams,
    keywordKey: 'supplierName',
    API: scmPostSupplierPageApi,
    beforeResponse(res) {
      const list = (res.data?.list || []).map((item: { supplierName: string; supplierId: string; }) => {
        const { supplierName: label, supplierId: value } = item;
        return { label, value };
      });
      return defalutCraftFactory.concat(list);
    },
  });

  const Model = reactive({
    category: [],
    address: [],
    customerSupplyFactory: '', // 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
    relationDemandId: '', // 工艺关联面料,辅料需求ID(第三方)
    /**
     *主键id
     */
    // craftDemandId:number|string;
    /**
     * 工艺承接者-所在城市
     */
    contactCity: '',
    /**
     * 创建人id
     */
    // creatorId: '',
    /**
     * 创建人名称
     */
    // creatorName: '',
    /**
     * bom详情ID
     */
    // bomDetailId: '',
    /**
     * 内部工艺厂ID
     */
    innerFactoryId: '',
    /**
     * 位置要求
     */
    positionRequirement: '',
    /**
     * 工艺承接者-详细地址
     */
    contactDetailAddress: '',
    /**
     * 创建时间
     */
    // createdTime: '',
    /**
     * 主键id
     */
    // id: '',
    /**
     * 工艺图片，最多9张
     */
    picture: [],
    /**
     * 材料类型 二级分类
     */
    category2: '',
    /**
     * 尺寸要求
     */
    sizeRequirement: '',
    /**
     * 材料类型 三级分类
     */
    category3: '',
    /**
     * bomID
     */
    // bomId: '',
    /**
     * 克重要求
     */
    weightRequirement: '',
    /**
     * 工艺承接者-联系人
     */
    contactName: '',
    /**
     * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
     */
    category1: '',
    /**
     * 工艺厂名,外部独有
     */
    factoryName: '',
    /**
     * 承接方式,
     * {
     * CRAFT_GROUP:工艺组,CUSTOMER:客户
     * }
     */
    undertakeType: '',
    /**
     * 工艺承接者-所在省份
     */
    contactProvince: '',
    /**
     * 工艺要求:  100:裁版前工艺 110:裁版后工艺
     */
    craftsRequire: '',
    /**
     * 工艺承接者-所在区/县
     */
    contactRegion: '',
    /**
     * 其他工艺要求
     */
    otherRequirement: '',
    /**
     * 颜色要求
     */
    colorRequirement: '',
    /**
     * 工艺承接者-工厂联系电话
     */
    contactPhone: '',
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
          key: 'undertakeType',
          label: '承接方式',
          rules: { required: true, message: '请填写 承接方式' },
          type: 'select',
          option: SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_LIST,
          customParams: {
            paper: '工艺承接方式说明',
            tooltip: `【工艺承接方式说明】\n
            （1）工艺组承接：由工艺组负责工艺需求的处理及对接。\n
            （2）客户承接：由客户自主完成工艺需求的处理。`,
          },
          async change(value, form) {
            const { model } = form;
            Object.assign(model, {
              innerFactoryId: '',
              contactProvince: '',
              contactCity: '',
              contactRegion: '',
              contactDetailAddress: '',
              factoryName: '',
              contactName: '',
              contactPhone: '',
            });
            const item = await form.getItem('innerFactoryId');
            const namesScope = await form.getScope('NamesScope');
            const contactScope = await form.getScope('contactScope');
            const addressScope = await form.getScope('addressScope');

            /* 禁用 【客户不提供工艺厂】 */
            noProvideDisable.value = value === SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_ENUM.CRAFT_GROUP;

            /* 工艺厂必填 */
            (item.rules as Rule).required = !noProvideDisable.value;

            namesScope.show = false;
            contactScope.show = false;
            addressScope.show = false;
          },
        },
        {
          key: 'innerFactoryId',
          label: '工艺厂',
          rules: { required: true, message: '请选择 工艺厂' },
          type: 'select',
          fuzzy: craftFuzzy,
          props: {
            clearable: true,
          },
          async change(value, form) {
            // console.log(value, form, craftFuzzy);
            const { model } = form;
            Object.assign(model, {
              contactProvince: '',
              contactCity: '',
              contactRegion: '',
              contactDetailAddress: '',
              factoryName: '',
              contactName: '',
              contactPhone: '',
            });
            const namesScope = await form.getScope('NamesScope');
            const craftName = await form.getItemById('craftName');
            const customerName = await form.getItemById('customerName');
            const contactScope = await form.getScope('contactScope');
            const addressScope = await form.getScope('addressScope');
            const other = value === 'PROVIDE';
            const noProvide = value === 'NO_PROVIDE';

            craftName.show = other;
            customerName.show = noProvide;

            const isEmty = value === '';
            contactScope.show = !isEmty;
            addressScope.show = !isEmty;

            /* 其他工艺厂 */
            if (other) {
              namesScope.show = true;
              model.customerSupplyFactory = value;
              return other;
            }

            /* 客户不提供工艺厂 */
            if (noProvide) {
              namesScope.show = true;
              model.customerSupplyFactory = value;
              const customrInfo = await customerDetail(purchaserId.value);
              const { contactProvince = '', contactCity = '', contactRegion = '' } = customrInfo;
              return Object.assign(model, customrInfo, { address: [contactProvince, contactCity, contactRegion] });
            }

            /* 选中某个工艺厂 */
            if (!['PROVIDE', 'NO_PROVIDE', ''].includes(value)) {
              model.customerSupplyFactory = 'PROVIDE';
              const craftInfo = await getCraftFactoryDetail(value);
              const { contactProvince = '', contactCity = '', contactRegion = '' } = craftInfo;
              return Object.assign(model, craftInfo, { address: [contactProvince, contactCity, contactRegion] });
            }

            return value;
          },
          customParams: {
            paper: '选择工艺厂提示',
            tooltip: '如已确定工艺厂，请先选择。如工艺厂未在系统维护，请选择其他工艺厂，手动填写工艺厂信息，以便工艺员后续联系。',
          },
        },
        {
          key: 'craftsRequire',
          label: '工艺要求',
          rules: { required: true, message: '请选择 工艺要求' },
          type: 'select',
          props: {
            disabled: false,
          },
          option: CRAFTS_REQUIRE_LIST,
        },

      ],
    },
    {
      key: 'NamesScope',
      col: { md: 12, lg: 12, xl: 12 },
      items: [
        {
          show: false,
          key: 'factoryName',
          id: 'craftName',
          label: '工艺厂名称',
          rules: { required: true, message: '请填写 工艺厂名称' },
          type: 'input',
          props: {
            placeholder: '请输入 工艺厂名称',
            maxlength: 50,
          },
        },
        {
          show: false,
          key: 'factoryName',
          id: 'customerName',
          label: '客户公司名称',
          rules: { required: true, message: '请填写 客户公司名称' },
          type: 'input',
          props: {
            placeholder: '请输入 客户公司名称',
          },
        },
      ],
    },
    {
      key: 'contactScope',
      show: false,
      col: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
      items: [
        {
          key: 'contactName',
          label: '联系人',
          rules: { required: true, message: '请选择 联系人' },
          type: 'input',
          props: {
            maxlength: 50,
          },
        },
        {
          key: 'contactPhone',
          label: '手机号码',
          type: 'input',
          props: {
            placeholder: '请输入 联系人手机号码',
          },
        },
      ],
    },
    {
      key: 'addressScope',
      show: false,
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      items: [
        {
          type: 'address',
          label: '联系地址',
          rules: {
            required: true,
            message: '请完整选择 联系地址',
            validator(rule, value, callback) {
              const { contactProvince, contactCity, contactRegion } = Model;
              const has = contactProvince && contactCity && contactRegion;
              has ? callback() : callback(new Error(rule.message));
            },
          },
          key: 'address',
          customParams: {
            province: 'contactProvince',
            city: 'contactCity',
            area: 'contactRegion',
          },
        },
        {
          type: 'textarea',
          label: '详情地址',
          key: 'contactDetailAddress',
          props: {
            maxlength: 100,
          },
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
        {
          key: 'sizeRequirement',
          label: '尺寸要求',
          type: 'input',
          props: {
            maxlength: 50,
          },
        },
        {
          key: 'colorRequirement',
          label: '颜色要求',
          type: 'input',
          props: {
            maxlength: 50,
          },
        },
        {
          key: 'weightRequirement',
          label: '克重要求',
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
            limit: 2,
            accept: 'image/png, image/jpg, image/jpeg',
            checkAccept: true,
            listPosition: 'prepend',
          },
          upload: uploadRes,
          customParams: {
            warning: '最多上传 2张 花型图',
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
