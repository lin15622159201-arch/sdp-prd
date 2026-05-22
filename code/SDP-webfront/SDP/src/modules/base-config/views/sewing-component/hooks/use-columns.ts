import { defineColumns } from '@/components/custom-table';
import type {
  ISewingComponentTemplateCreateReqSewingProcessListItem,
} from '../api/type';
// 列
export const column = defineColumns<ISewingComponentTemplateCreateReqSewingProcessListItem>([
  {
    slotKey: 'operation',
    label: '操作',
    width: '150px',
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
    width: '150px',
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
]);
