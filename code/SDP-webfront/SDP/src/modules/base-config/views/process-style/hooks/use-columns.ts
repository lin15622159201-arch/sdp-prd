import type { IColumnProp } from '@/components/custom-table/types';
import type {
  IStyleTemplateCreateReqProcessStyleSwingsItem,
  IStyleTemplateCreateReqProcessStyleAnotherProcessItem,
} from '../api/type';
// 车缝列
export const column: IColumnProp<IStyleTemplateCreateReqProcessStyleSwingsItem>[] = [
  {
    slotKey: 'operation',
    label: '操作',
    width: '120px',
  },
  {
    label: '工序部件',
    slotKey: 'componentName',
    prop: 'componentName',
    rules: [
      {
        required: true,
        message: '请输入工序部件',
        trigger: 'change',
      },
      {
        max: 50,
        message: '最多50字符',
        trigger: 'change',
      },
    ],
  },
  {
    label: '工序名称',
    slotKey: 'processName',
    prop: 'processName',
    rules: [
      {
        required: true,
        message: '请输入工序名称',
        trigger: 'change',
      },
      {
        max: 200,
        message: '最多200字符',
        trigger: 'change',
      },
    ],
  },
  {
    label: '图片',
    prop: 'picture',
    slotKey: 'picture',
  },
  {
    label: '车种',
    slotKey: 'plmSewingType',
    prop: 'plmSewingType',
    rules: {
      required: true,
      message: '请选择车种',
      trigger: 'change',
    },
  },
  {
    label: '工序描述',
    slotKey: 'processDescribe',
    prop: 'processDescribe',
    rules: [
      {
        required: true,
        message: '请输入工序描述',
        trigger: 'change',
      },
      {
        max: 300,
        message: '最多300字符',
        trigger: 'change',
      },
    ],
  },
  {
    label: '工时（分）',
    slotKey: 'estimatedTime',
    prop: 'estimatedTime',
    rules: {
      required: true,
      message: '请输入工时',
      trigger: 'change',
    },
  },
  {
    label: '分钟工资',
    slotKey: 'minutelyPay',
    prop: 'minutelyPay',
    width: '150px',
    rules: {
      required: true,
      message: '请输入分钟工资',
      trigger: 'change',
    },
  },
  {
    label: '金额',
    slotKey: 'amount',
    prop: 'amount',
    width: '150px',
    rules: {
      required: true,
      message: '请输入金额',
      trigger: 'change',
    },
  },
  {
    label: '备注',
    prop: 'remark',
    slotKey: 'remark',
    rules: {
      max: 500,
      message: '最多500字符',
      trigger: 'change',
    },
  },
];

// 其他工序列
export const anotherProcessColumn: IColumnProp<IStyleTemplateCreateReqProcessStyleAnotherProcessItem>[] = [
  {
    slotKey: 'operation',
    label: '操作',
    width: '120px',
  },
  {
    label: '工序描述',
    slotKey: 'processDescribe',
    prop: 'processDescribe',
    rules: {
      max: 300,
      message: '最多300字符',
      trigger: 'change',
    },
  },
  {
    label: '数量',
    slotKey: 'dosage',
    prop: 'dosage',
  },
  {
    label: '单位',
    slotKey: 'unit',
    prop: 'unit',
  },
  {
    label: '单价',
    slotKey: 'price',
    prop: 'price',
  },
  {
    label: '备注',
    slotKey: 'remark',
    prop: 'remark',
    rules: {
      max: 500,
      message: '最多500字符',
      trigger: 'change',
    },
  },
];
