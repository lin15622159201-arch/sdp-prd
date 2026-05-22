import { useTableColumns } from '@toy/business-components';
import { IStyleInfoPageListItemForTuikuan } from '../../../api/types';
import { filters } from '@/core/plugins/filter';
import { useRouter } from 'vue-router';
import { usePermissionConfig } from '../../../use-permission-config';

export const useColumns = () => {
  const $router = useRouter();
  const { CKXQ } = usePermissionConfig();
  const { columns } = useTableColumns<IStyleInfoPageListItemForTuikuan>(() => [
    {
      label: 'bom版本号',
      prop: 'bomVersion',
      minWidth: 120,
    },
    {
      label: '款式信息',
      minWidth: 120,
      render(row) {
        const { href } = $router.resolve({
          name: 'StyleDataManageLargeBomDetail',
          params: {
            id: row.prodBomInfoId,
          },
        });
        return (
          <div class='tw-flex tw-flex-col tw-flex-justify-between'>
            <div>
              <sc-copy-text text={row.designCode}>
                {CKXQ.value ? (
                  <el-link
                    type='primary'
                    underline={false}
                    href={href}
                  >
                    { row.designCode }
                  </el-link>
                ) : (
                  <span>{ row.designCode }</span>
                )}
              </sc-copy-text>
              <sc-copy-text text={row.styleCode} />
            </div>
          </div>
        );
      },
    },
    {
      label: '款式图片',
      minWidth: 100,
      render(row) {
        return (
          <custom-image
            src={filters.ossUrl(row.customerPicture?.split(',')?.[0], 80)}
            preview-src-list={row.customerPicture?.split(',') || []}
            class='tw-w-80px tw-h-80px'
            fit='cover'
          />
        );
      },
    },
    {
      label: '款式品类',
      prop: 'styleTypeName',
      minWidth: 120,
    },
    {
      label: '设计师',
      prop: 'designerName',
      minWidth: 100,
    },
    {
      label: '创建时间',
      prop: 'createdTime',
      minWidth: 100,
      type: 'date',
      format: 'YYYY-MM-DD HH:mm:ss'
    },
  ]);
  return {
    columns
  };
};
