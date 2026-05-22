import { useTableColumns } from '@toy/business-components';
import { formatTime } from '@toy/utils';
import { ISizeDiffPageResItem } from '../../../api/types';

type IColumnRender = (row: ISizeDiffPageResItem) => JSX.Element;

type EventType = (row: ISizeDiffPageResItem) => void;

export const useTable = ({ onEdit, onDetail }: { onEdit: EventType; onDetail: EventType; }) => {
  const renderInfoList = (infoList: {
    label?: string;
    prop: keyof ISizeDiffPageResItem;
    formatter?: (value: any) => string;
  }[]): IColumnRender => {
    return row => (
      <div>
        {infoList.map((info) => {
          const value = info.formatter ? info.formatter(row[info.prop]) : row[info.prop] as string;
          return (
            <p>
              {info.label ? `${info.label}：` : ''}
              {value || '-'}
            </p>
          );
        })}
      </div>
    );
  };

  const { columns } = useTableColumns<ISizeDiffPageResItem>(() => [
    {
      label: '尺码组',
      prop: 'sizeName',
    },
    {
      label: '创建信息',
      render: renderInfoList([
        { prop: 'creatorName', label: '创建人' },
        { prop: 'createdTime', formatter: formatTime },
      ]),
    },
    {
      label: '更新信息',
      render: renderInfoList([
        { prop: 'reviserName', label: '更新人' },
        { prop: 'revisedTime', formatter: formatTime },
      ]),
    },
    {
      label: '操作',
      width: '100',
      fixed: 'right',
      render: row => (
        <div class='tw-flex tw-items-center tw-flex-wrap'>
          <el-button text type='primary' onClick={() => onDetail(row)}>
            查看
          </el-button>
          <el-button text type='primary' onClick={() => onEdit(row)}>
            编辑
          </el-button>
        </div>
      ),
    },
  ]);

  return {
    tableColumns: columns,
  };
};
