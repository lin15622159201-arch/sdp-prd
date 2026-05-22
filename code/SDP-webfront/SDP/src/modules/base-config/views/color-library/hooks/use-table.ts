import { ENABLE_DISABLE_NUMBER_LIST } from '@/constant';
import { ISysAdminWebDictPageResListItem } from '../api/types';
import { defineColumns } from '@/components/custom-table';

export interface IColorPageItem extends ISysAdminWebDictPageResListItem {
  /** 示意图 */
  imgUrl: string;
  /** 色号 */
  colorNumber: string;
  /** 英文翻译 */
  englishName: string;
  /** 英文缩写 */
  englishAbbreviation: string;
  /** PLM映射色号 */
  mapColorCode: string;
}

export const useTable = () => {
  const columns = defineColumns<IColorPageItem>([
    {
      label: '颜色',
      minWidth: 150,
      prop: 'dictName',
    },
    {
      label: '色号',
      minWidth: 150,
      prop: 'colorNumber',
    },
    {
      label: '示意图',
      prop: 'imgUrl',
      minWidth: 150,
      imageConfig: true,
    },
    {
      label: '英文翻译',
      minWidth: 150,
      prop: 'englishName',
    },
    {
      label: '英文缩写',
      minWidth: 150,
      prop: 'englishAbbreviation',
    },
    {
      label: 'PLM映射色号',
      minWidth: 150,
      prop: 'mapColorCode',
    },
    {
      label: '状态',
      prop: 'state',
      minWidth: 150,
      enum: ENABLE_DISABLE_NUMBER_LIST,
    },
    {
      label: '更新人',
      minWidth: 150,
      prop: 'reviserName',
    },
    {
      label: '更新时间',
      prop: 'revisedTime',
      minWidth: 150,
      isTime: true,
    },
    {
      label: '操作',
      slotKey: 'operation',
      fixed: 'right',
      width: 120,
    },
  ]);

  return {
    columns,
  };
};
