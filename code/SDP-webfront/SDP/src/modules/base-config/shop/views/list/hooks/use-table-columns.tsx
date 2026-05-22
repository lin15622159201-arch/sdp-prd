import { ScCopyText, useTableColumns } from '@toy/business-components';
import { formatTime } from '@toy/utils';
import { usePermissionConfig } from '../../../use-permission-config';
import { IShopPageResItem } from '../../../api/type';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { ElButton, ElTooltip } from 'element-plus';

type IColumnRender = (row: IShopPageResItem) => JSX.Element;

type IProps = {
  onEdit?: (row: IShopPageResItem) => void;
  onDetail?: (row: IShopPageResItem) => void;
};
export const useTable = ({ onEdit, onDetail }: IProps = {}) => {
  const { BJDP } = usePermissionConfig();
  const { getDictionaryLabel } = useDictionary();

  const renderInfoList = (infoList: {
    label?: string;
    prop: keyof IShopPageResItem;
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
                : info.prop === 'expired' || value || '-'}
              {
                info.prop === 'expired'
                  && (
                    row[info.prop] === YES_NO_NUMBER_ENUM.NO ? (
                      <ElTooltip
                        placement='top'
                        content={row.message || '无'}
                      >
                        <ElButton type='danger' text style={{ textDecoration: 'underline' }}>异常</ElButton>
                      </ElTooltip>
                    ) : '正常'
                  )
              }
            </p>
          );
        })}
      </div>
    );
  };

  const { columns } = useTableColumns<IShopPageResItem>(() => [
    {
      type: 'selection',
      reserveSelection: true,
    },
    {
      label: '平台',
      prop: 'platformName',
    },
    {
      label: '店铺类型',
      render: row => (row.shopType ? getDictionaryLabel(DICTIONARY_KEY.SHOP_TYPE, row.shopType) : '-'),
    },
    {
      label: '店铺名称',
      prop: 'shopName',
    },
    {
      label: '店铺ID',
      prop: 'shopId',
    },
    {
      label: '关联主体',
      prop: 'subjectName',
    },
    // {
    //   label: '授权状态',
    //   render: (row) => {
    //     if (!row.authStartTime) return '';
    //     return renderInfoList([
    //       { prop: 'authStartTime', formatter: () => '已授权' },
    //       { prop: 'authStartTime', label: '授权时间' },
    //       { prop: 'authEndTime', label: '过期时间' },
    //     ])(row);
    //   },
    // },
    {
      label: '状态',
      width: 80,
      render: row => (row.enable === YES_NO_NUMBER_ENUM.YES ? '启用' : '禁用'),
    },
    {
      label: '授权信息',
      width: 170,
      render: renderInfoList([
        { prop: 'expired', label: '授权状态' },
        { prop: 'authEndTime', formatter: formatTime, label: '授权有效期' },
      ]),
    },
    {
      label: '创建信息',
      width: 170,
      render: renderInfoList([
        { prop: 'creatorName', label: '创建人' },
        { prop: 'createdTime', formatter: formatTime },
      ]),
    },
    {
      label: '更新信息',
      width: 170,
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
          <el-button text type='primary' onClick={() => onDetail?.(row)}>
            查看
          </el-button>
          {BJDP.value && (
            <el-button text type='primary' onClick={() => onEdit?.(row)}>
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
