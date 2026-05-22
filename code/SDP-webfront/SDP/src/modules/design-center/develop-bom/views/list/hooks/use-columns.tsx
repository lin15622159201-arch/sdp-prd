import { useTableColumns } from '@toy/business-components';
import { useRouter } from 'vue-router';
import { filters } from '@/core/plugins/filter';
import { REMARK_BIZ_TYPE_ENUM, YES_NO_ENUM } from '@/constant';
import { BOM_ORDER_STATUS_LIST, CRAFTS_REQUIRE_ENUM } from '../../../constant';
import { IListItem } from '../types';
import { remarksSave } from '@/api/basis';
import { isEmpty } from '@toy/utils';
import { usePermissionConfig } from '../../../use-permission-config';

interface IProps {
  reloadFn: () => void;
  handleOperateLog: (designCode: string) => void;
}
export const useColumns = (props: IProps) => {
  const { reloadFn, handleOperateLog } = props;
  const { BJ, CKXQ } = usePermissionConfig();
  const $router = useRouter();
  const handleBomDetail = (row: IListItem) => {
    $router.push(
      {
        name: 'DesignCenterDevelopBomDetail',
        params: { bomId: row.bomId }
      }
    );
  };
  // 添加备注记录
  const handleCreateRecord = async (row: IListItem, remark: string) => {
    const { bomId } = row;
    const remarkParams = {
      bizId: bomId!,
      bizType: REMARK_BIZ_TYPE_ENUM.BOM_ORDER,
      remark,
    };
    await remarksSave(remarkParams);
    reloadFn();
  };
  // 修改bom单
  const handleBomEdit = (row: IListItem) => {
    $router.push({ name: 'DesignCenterDevelopBomEdit', params: { bomId: row.bomId || '' } });
  };
  const { columns } = useTableColumns<IListItem>(() => [
    {
      type: 'selection',
      width: 44,
      selectable: row => row.isDisplayUpdateBomButton
    },
    {
      label: 'bom单号',
      width: 150,
      render(row) {
        return (
          <>
            {CKXQ.value ? (
              <el-button
                type='primary'
                text
                onClick={() => handleBomDetail(row)}
              >
                { row.bomCode }
                -
                { row.bomVersionNum }
              </el-button>
            ) : (
              <span>
                { row.bomCode }
                -
                { row.bomVersionNum }
              </span>
            )}
          </>
        );
      }
    },
    {
      label: '款式信息',
      minWidth: 240,
      render(row) {
        return (
          <div class='tw-flex'>
            <custom-image
              class='tw-w-80px tw-h-80px tw-flex-shrink-0'
              fit='cover'
              src={filters.ossUrl(row?.designPictureList[0])}
              preview-src-list={row?.designPictureList}
            />
            <div
              class='tw-flex tw-flex-col tw-flex-justify-center'
              style='padding-left: 6px;'
            >
              <sc-copy-text text={row.styleCode} />
              <sc-copy-text text={row.designCode} />
              <div class='tw-flex tw-flex-items-center tw-gap-5px'>
                {row.latestColor && (
                  <span class='tw-font-bold'>{ row.latestColor }</span>
                )}
                {row.isOnSale && (
                  <el-tag type='success'>动销</el-tag>
                )}
                <el-tag
                  type='warning'
                  class='tw-flex-shrink-0'
                >
                  {row.supplyModeName}
                </el-tag>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      label: 'bom状态',
      minWidth: 100,
      render(row) {
        return (
          <>
            <div>
              { filters.getEnumLabel(BOM_ORDER_STATUS_LIST, row.bomOrderState!) || '未到该流程' }
            </div>
            {row.materialSearchState === YES_NO_ENUM.YES && (
              <div>
                <el-tag
                  type='danger'
                  size='small'
                >
                  找料中
                </el-tag>
              </div>
            )}
          </>
        );
      }
    },
    {
      label: '二次工艺',
      minWidth: '150',
      render({ categoryMap }) {
        return (
          <div class='desc-lis'>
            {categoryMap?.[CRAFTS_REQUIRE_ENUM.BEFORE]?.map((invalidItem, invalidIndex) => (
              <p
                key={invalidIndex}
              >
                <b>裁前：</b>
                { invalidItem }
              </p>
            ))}
            {categoryMap?.[CRAFTS_REQUIRE_ENUM.AFTER]?.map((normalItem, normalIndex) => (
              <p
                key={normalIndex}
              >
                <b>裁后：</b>
                { normalItem }
              </p>
            ))}
          </div>
        );
      },
    },
    {
      label: '最新提交时间',
      minWidth: 110,
      render(row) {
        if (isEmpty(row.bomSubmitTime)) return '-';
        return filters.formatTime(row.bomSubmitTime);
      },
    },
    {
      label: '设计师',
      minWidth: 120,
      render(row) {
        return (
          <div>
            { row.designerGroup }
            -
            { row.designerName }
          </div>
        );
      },
    },
    {
      label: '款式品类',
      prop: 'categoryName',
      minWidth: 150,
    },
    {
      label: '操作',
      fixed: 'right',
      width: 150,
      render(row) {
        return (
          <>
            <remark-record
              v-model={row.remark}
              name-key='createdName'
              time-key='createdTime'
              desc-key='remark'
              onCreate={(remark: string) => handleCreateRecord(row, remark)}
              v-slots={{
                append: () => (
                  <el-button
                    text
                    type='primary'
                    onClick={() => handleOperateLog(row.designCode)}
                  >
                    操作日志
                  </el-button>
                )
              }}
            />
            <div class='flex'>
              {BJ.value
                && row.isDisplayUpdateBomButton
                && !row.isCanceled && (
                <el-button
                  type='primary'
                  onClick={() => handleBomEdit(row)}
                >
                  编辑
                </el-button>
              )}
            </div>
          </>
        );
      },
    },
  ]);
  return {
    columns
  };
};
