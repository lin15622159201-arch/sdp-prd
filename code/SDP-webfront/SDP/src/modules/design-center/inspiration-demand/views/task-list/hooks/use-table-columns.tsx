import { useDialog, ITableColumnsItem } from '@toy/business-components';
import { computed } from 'vue';
import { DESIGN_DEMAND_STATUS_ENUM, DESIGN_DEMAND_STATUS_LIST } from '../../../constant';
import { IListItem } from '../types';
import { filters } from '@/core/plugins/filter';
import { useDetail } from './use-detail';
import { isEmpty } from '@toy/utils';
import { usePermissionConfig } from '../../../use-permission-config';

interface IProps {
  reloadFn: () => void;
  handleOperateLog: (bizId: string) => void;
  handleCreateRecord: (row: IListItem, remark: string) => void;
}
export const useTableColumns = (props: IProps) => {
  const { handleCreateRecord, handleOperateLog, reloadFn } = props;
  const { handleDetail, handleDiscarded } = useDetail({
    reloadFn
  });
  const { CKXQ, KSBJ } = usePermissionConfig();
  const tableColumns = computed<ITableColumnsItem<IListItem>[]>(() => {
    return [
      {
        type: 'selection',
        width: 50,
      },
      {
        label: '灵感选款ID',
        minWidth: 150,
        render(row) {
          return (
            <div>
              {CKXQ.value ? (
                <el-link
                  type='primary'
                  underline={false}
                  onClick={() => handleDetail(row.designDemandId, false)}
                >
                  {row.inspirationStyleId}
                </el-link>
              ) : row.inspirationStyleId}
              <div>
                <el-tag>{row.supplyModeName}</el-tag>
              </div>
            </div>
          );
        },
      },
      {
        label: '灵感信息',
        minWidth: 260,
        render(row) {
          return (
            <div class='tw-flex'>
              <custom-image
                src={filters.ossUrl(row.inspirationImageList?.[0])}
                preview-src-list={row.inspirationImageList}
                class='tw-w-80px tw-h-80px tw-flex-shrink-0'
                fit='cover'
              />
              <div class='tw-ml-6px'>
                <div>
                  建议风格：
                  {row.suggestedStyle}
                </div>
                <div>{row.categoryName}</div>
                {!isEmpty(row.productLink) && (
                  <el-link href={row.productLink} target='_blank'>
                    商品链接
                  </el-link>
                )}
              </div>
            </div>
          );
        },
      },
      {
        label: '企划信息',
        minWidth: 150,
        render(row) {
          return (
            <div>
              <div>
                国家站点：
                {row.countrySiteName}
              </div>
              <div>
                店铺名称：
                {row.storeName}
              </div>
              <div>
                期望成本：
                {row.supplyModeCode === 'imitation'
                  ? row.expectedCostPrice
                  : row.sellingPrice}
                元
              </div>
            </div>
          );
        },
      },
      {
        label: '状态',
        prop: 'designDemandStatus',
        render(row) {
          const renderErrorWrap = () => {
            const el = (
              <sc-status-label
                value={row.designDemandStatus}
                options={DESIGN_DEMAND_STATUS_LIST}
              />
            );
            if (row.designDemandStatus !== DESIGN_DEMAND_STATUS_ENUM.DISUSE) return el;
            return (
              <el-tooltip
                placement='top-start'
                title='淘汰原因'
                width={200}
                trigger='hover'
                content={row.noPassReasonName}
                v-slots={{
                  default: () => (
                    <div>
                      {el}
                    </div>
                  ),
                }}
              />
            );
          };
          return renderErrorWrap();
        },
      },
      {
        label: '波段',
        prop: 'waveBandName',
        minWidth: 120,
      },
      {
        label: '选图信息',
        minWidth: 120,
        render(row) {
          return (
            <div>
              <div>
                提交人：
                {row.submitUserName}
              </div>
              {!isEmpty(row.chosenName) && (
                <>
                  <div>
                    选款人：
                    {row.chosenName}
                  </div>
                  <div>
                    {filters.formatTime(row.chosenTime, 'YYYY-MM-DD')}
                    选中
                  </div>
                </>
              )}
            </div>
          );
        },
      },
      {
        label: '分配信息',
        minWidth: 120,
        render(row) {
          return (
            <div>
              <div>
                分配人：
                {row.allocateUserName}
              </div>
              {!isEmpty(row.designerName) && (
                <div>
                  设计师：
                  {row.designerGroup}
                  -
                  {row.designerName}
                </div>
              )}
              {row.designDemandStatus !== DESIGN_DEMAND_STATUS_ENUM.FINISH && (
                <el-link>{row.styleCode}</el-link>
              )}
            </div>
          );
        },
      },
      {
        label: '开款结果',
        minWidth: 130,
        prop: 'styleCode',
        render(row) {
          return (
            <sc-copy-text text={row.styleCode} />
          );
        }
      },
      {
        label: '操作',
        width: '120',
        fixed: 'right',
        render: row => (
          <div>
            <remark-record
              v-model={row.remark}
              name-key='createdName'
              time-key='createdTime'
              desc-key='remark'
              onCreate={(e: string) => handleCreateRecord(row, e)}
              v-slots={{
                append: () => (
                  <el-button
                    type='primary'
                    text
                    onClick={() => handleOperateLog(row.designDemandId)}
                  >
                    操作日志
                  </el-button>
                )
              }}
            />
            <div class='tw-flex tw-items-center'>
              {row.designDemandStatus === DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE
                && KSBJ.value
                && (
                  <el-button
                    type='primary'
                    onClick={() => handleDetail(row.designDemandId, true)}
                  >
                    款式标记
                  </el-button>
                )}
            </div>
          </div>
        ),
      },
    ];
  });
  return {
    tableColumns,
    handleDiscarded
  };
};
