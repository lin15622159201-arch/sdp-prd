import { ScCopyText, useTableColumns } from '@toy/business-components';
import { formatTime } from '@toy/utils';
import { usePermissionConfig } from '../../../use-permission-config';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { ISizeTempPageResItem } from '../../../api/types';

type IColumnRender = (row: ISizeTempPageResItem) => JSX.Element;

type EventType = (row: ISizeTempPageResItem) => void;
export const useTable = ({ onEdit, onCopy }: { onEdit: EventType; onCopy: EventType; }) => {
  const { BJMB } = usePermissionConfig();

  const renderInfoList = (infoList: {
    label?: string;
    prop: keyof ISizeTempPageResItem;
    type?: 'copy';
    formatter?: (value: any) => string;
  }[]): IColumnRender => {
    return row => (
      <div>
        {infoList.map((info) => {
          const value = info.formatter ? info.formatter(row[info.prop]) : row[info.prop] as string;
          return (
            <p>
              {info.label ? `${info.label}：` : ''}
              {value && info.type === 'copy'
                ? <ScCopyText class='tw-inline-block' text={value || ''} />
                : value || '-'}
            </p>
          );
        })}
      </div>
    );
  };

  const { columns } = useTableColumns<ISizeTempPageResItem>(() => [
    {
      type: 'selection',
      reserveSelection: true,
    },
    {
      label: '模板名称',
      prop: 'templateName',
    },
    {
      label: '平台品类',
      prop: 'catName',
    },
    {
      label: '状态',
      width: 80,
      render: row => (row.enable === YES_NO_NUMBER_ENUM.YES ? '启用' : '禁用'),
    },
    {
      label: '创建信息',
      width: 170,
      render: renderInfoList([
        { prop: 'createdTime', formatter: formatTime },
        { prop: 'creatorName', label: '创建人' },
      ]),
    },
    {
      label: '更新信息',
      width: 170,
      render: renderInfoList([
        { prop: 'revisedTime', formatter: formatTime },
        { prop: 'reviserName', label: '更新人' },
      ]),
    },
    {
      label: '操作',
      width: '100',
      fixed: 'right',
      render: row => (
        <div class='tw-flex tw-items-center tw-flex-wrap'>
          <el-button text type='primary' onClick={() => onCopy(row)}>
            复制
          </el-button>
          {BJMB.value && (
            <el-button text type='primary' onClick={() => onEdit(row)}>
              编辑
            </el-button>
          )}
        </div>
      ),
    },
  ]);

  return {
    tableColumns: columns,
  };
};
