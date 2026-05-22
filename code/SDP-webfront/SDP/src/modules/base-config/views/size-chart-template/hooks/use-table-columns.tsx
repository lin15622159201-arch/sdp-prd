import { useTableColumns } from '@toy/business-components';
import usePermissionConfig from '../use-permission-config';
import { ISizeTemplatePageResListItem } from '../api/type';
import { resizeImgByWidth } from '@/core/utils/helper';
import { filters } from '@/core/plugins/filter';

type Props = {
  handleEdit: (row: ISizeTemplatePageResListItem) => void;
  handleDel: (row: ISizeTemplatePageResListItem) => void;
};

export const useListColumns = (props: Props) => {
  const { BJ, SC } = usePermissionConfig();

  const { columns: tableColumns } = useTableColumns<ISizeTemplatePageResListItem>(() => {
    return [
      {
        label: '品类',
        minWidth: '150',
        align: 'center',
        render(row) {
          return (
            <span>{ row.categoryName }</span>
          );
        }
      },
      {
        label: '尺寸表图',
        minWidth: '150',
        align: 'center',
        render(row) {
          return (
            row.sizeTemplateImageUrls?.length ? (
              <el-image
                src={resizeImgByWidth(row.sizeTemplateImageUrls[0], 200)}
                class='tw-w-100px tw-h-100px'
                fit='cover'
                preview-src-list={[row.sizeTemplateImageUrls[0]]}
                preview-teleported
                lazy
              />
            ) : null
          );
        }
      },
      {
        label: '量法图',
        minWidth: '150',
        align: 'center',
        render(row) {
          return (
            row.quantityMethodImageUrls?.length ? (
              <el-image
                src={resizeImgByWidth(row.quantityMethodImageUrls[0], 200)}
                class='tw-w-100px tw-h-100px'
                fit='cover'
                preview-src-list={[row.quantityMethodImageUrls[0]]}
                preview-teleported
                lazy
              />
            ) : null
          );
        }
      },
      {
        label: '更新时间',
        minWidth: '150',
        align: 'center',
        render(row) {
          return (
            <div>
              <p>{ row.reviserName }</p>
              <p>{ filters.formatTime(row.revisedTime) }</p>
            </div>
          );
        }
      },
      {
        label: '操作',
        width: '100',
        fixed: 'right',
        render: row => (
          <div class='tw-flex tw-items-center'>
            {BJ.value ? (
              <el-button
                type='primary'
                link
                onClick={() => props.handleEdit(row)}
              >
                编辑
              </el-button>
            ) : null}
            {SC.value ? (
              <el-button
                type='danger'
                link
                onClick={() => props.handleDel(row)}
              >
                删除
              </el-button>
            ) : null}
          </div>
        ),
      },
    ];
  });
  return {
    tableColumns,
  };
};
