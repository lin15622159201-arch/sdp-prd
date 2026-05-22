import { useTableColumns } from '@toy/business-components';
import { IListItem } from '../types';
import { filters } from '@/core/plugins/filter';
import { MATERIAL_KITTING_STATE_LIST } from '../../../constant';

interface IProps {
  handleCreateRecord: (row: IListItem, remark: string,) => void;
  handleOperateLog: (bizId: string) => void;
}

export const useColumns = (props: IProps) => {
  const { handleCreateRecord, handleOperateLog } = props;
  const cuttingProcessFilter = (row: IListItem) => {
    return row?.cuttingProcess
      ?.split(',')
      .filter(process => !!process) || [];
  };
  const { columns } = useTableColumns<IListItem>(() => [
    // {
    //   type: 'selection',
    //   width: 55,
    // },
    {
      label: 'SKC',
      width: 150,
      render(row) {
        return (
          <div class='tw-flex tw-flex-col tw-flex-justify-between'>
            <div class='tw-flex tw-flex-col'>
              <sc-copy-text
                text={row.designCode}
                type='primary'
                class='tw-color-primary'
              />
            </div>
          </div>
        );
      },
    },
    {
      label: '图片',
      width: 105,
      render(row) {
        return (
          <custom-image
            class='tw-w-80px tw-h-80px tw-rounded-4px'
            fit='cover'
            src={filters.ossUrl(row.designPicture?.split(',')?.[0])}
            preview-src-list={row.designPicture?.split(',')}
          />
        );
      },
    },
    {
      label: '设计师',
      minWidth: 120,
      render(row) {
        return (
          <div class='tw-flex tw-flex-col tw-flex-justify-between'>
            <span>{row.designerGroup}</span>
            <span>{row.designerName}</span>
          </div>
        );
      },
    },
    {
      label: '商品末级分类',
      minWidth: 115,
      render(row) {
        return (
          <span>{ row.categoryName ? row.categoryName.split('-')?.[2] : '-' }</span>
        );
      },
    },
    {
      label: '齐套单号',
      width: 136,
      prop: 'materialCode',
    },
    {
      label: '齐套状态',
      minWidth: 90,
      type: 'enum',
      options: MATERIAL_KITTING_STATE_LIST,
      prop: 'materialState',
    },
    {
      label: '创建时间',
      width: 95,
      render(row) {
        return (
          <div class='tw-flex tw-flex-col'>
            <span>{filters.formatTime(row.createdTime, 'YYYY-MM-DD')}</span>
            <span>{filters.formatTime(row.createdTime, 'HH:mm:ss')}</span>
          </div>
        );
      },
    },
    {
      label: '裁前二次工艺',
      width: 120,
      render(row) {
        return (
          <>
            {row?.cuttingProcess && (
              <div class='tw-flex tw-flex-wrap tw-gap-5px'>
                {cuttingProcessFilter(row).map((item, index) => (
                  <el-tag
                    key={index}
                    type='success'
                  >
                    { item }
                  </el-tag>
                ))}
              </div>
            )}
          </>
        );
      },
    },
    {
      label: '齐套签收',
      width: 105,
      render(row) {
        return (
          <div class='tw-flex tw-flex-col'>
            <span>{ row.signer }</span>
            <span>{ filters.formatTime(row.signingTime) }</span>
          </div>
        );
      },
    },
    {
      label: '操作记录',
      fixed: 'right',
      width: 120,
      render(row) {
        return (
          <remark-record
            v-model={row.remark}
            name-key='createdName'
            time-key='createdTime'
            desc-key='remark'
            onCreate={($event: string) => handleCreateRecord(row, $event)}
            v-slots={{
              append: () => (
                <el-button
                  type='primary'
                  text
                  onClick={() => handleOperateLog(row.orderMaterialFollowId!)}
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
