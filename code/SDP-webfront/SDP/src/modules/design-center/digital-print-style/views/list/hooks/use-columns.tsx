import { useTableColumns } from '@toy/business-components';
import { IListItem } from '../types';
import { filters } from '@/core/plugins/filter';
import { PUSH_STATUS_LIST } from '../../../constant';
import { useSkcDetail } from './use-skc-detail';
import { usePermissionConfig } from '../../../use-permission-config';

interface IProps {
  handleOperateLog: (bizId: string) => void;
  handleCreateRecord: (row: IListItem, remark: string) => void;
}

export const useColumns = (props: IProps) => {
  const { handleSkcDetail } = useSkcDetail();
  const { handleCreateRecord, handleOperateLog } = props;
  const { CKXQ } = usePermissionConfig();
  const { columns } = useTableColumns<IListItem>(() => [
    {
      label: '款式信息',
      minWidth: 150,
      render(row) {
        return (
          <div>
            <sc-copy-text text={row.designCode}>
              {CKXQ.value ? (
                <el-button
                  type='primary'
                  text
                  onClick={() => handleSkcDetail(row.printingPrototypeId)}
                >
                  {row.designCode}
                </el-button>
              ) : row.designCode}
            </sc-copy-text>
            <div>{row.categoryName}</div>
            <sc-copy-text text={row.styleCode} />
          </div>
        );
      },
    },
    {
      label: '创建信息',
      render(row) {
        return (
          <div>
            <div>{row.chosenName}</div>
            <div>{filters.formatTime(row.chosenTime)}</div>
          </div>
        );
      },
    },
    {
      label: '同步状态',
      type: 'enum',
      prop: 'pushStatus',
      options: PUSH_STATUS_LIST,
    },
    // {
    //   label: '企划信息',
    //   render(row) {
    //     return (
    //       <div>
    //         <div>
    //           波段：
    //           {row.waveBandName}
    //         </div>
    //         <div>
    //           国家：
    //           {row.countrySiteName}
    //         </div>
    //         <div>
    //           店铺名：
    //           {row.storeName}
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      label: '价格信息',
      render(row) {
        return (
          <div>
            <div>
              本土履约：
              {row.localPrice}
              元
            </div>
            <div>
              跨境履约：
              {row.crossBorderPrice}
              元
            </div>
          </div>
        );
      },
    },
    {
      label: '操作',
      width: 120,
      fixed: 'right',
      render(row) {
        return (
          <remark-record
            v-model={row.remark}
            name-key='createdName'
            time-key='createdTime'
            desc-key='remark'
            onCreate={(e: any) => handleCreateRecord(row, e)}
            v-slots={{
              append: () => (
                <el-button
                  type='primary'
                  text
                  onClick={() => handleOperateLog(row.printingPrototypeId)}
                >
                  操作日志
                </el-button>
              )
            }}
          />
        );
      },
    },
  ]);
  return {
    columns
  };
};
