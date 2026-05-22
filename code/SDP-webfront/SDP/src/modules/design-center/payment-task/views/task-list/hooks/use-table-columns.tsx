import { useDialog, ITableColumnsItem } from '@toy/business-components';
import { computed } from 'vue';
import { IListItem } from '../types';
import { filters } from '@/core/plugins/filter';
import { useDetail } from './use-detail';
import { isEmpty } from '@toy/utils';
import { usePermissionConfig } from '../../../use-permission-config';
import { resizeImgByWidth } from '@/core/utils/helper';
import { ASSOCIATED_TYPE_LIST, TYPE_OF_OPENING_LIST, DESIGN_DEMAND_STATUS_TYPE_LIST, IDENTIFY_STATUS_LIST, TASK_SOUCE_LIST } from '../../../constant/index';

interface IProps {
  reloadFn: () => void;
  handleOperateLog: (bizId: string) => void;
  handleCreateRecord: (row: IListItem, remark: string) => void;
  lookImg: (url: IListItem) => void;
}
export const useTableColumns = (props: IProps) => {
  const { handleCreateRecord, handleOperateLog, reloadFn } = props;
  const { handleDetail, handleDiscarded } = useDetail({
    reloadFn
  });
  const { CJRW } = usePermissionConfig();
  const tableColumns = computed<ITableColumnsItem<IListItem>[]>(() => {
    return [
      {
        type: 'selection',
        width: 50,
      },
      {
        label: '编号',
        minWidth: 150,
        render(row) {
          return (
            <div>
              { row.taskCode }
              {/* <div>
                { TYPE_OF_OPENING_LIST.find(v => v.value === row.styleType)?.label ?? '-' }
              </div> */}
              <div>
                来源：
                { TASK_SOUCE_LIST.find(v => v.value === row.taskSource)?.label ?? '-' }
              </div>
              {
                row.styleLabelName && (
                  <el-tag type='primary'>{row.styleLabelName}</el-tag>
                )
              }
            </div>
          );
        },
      },
      {
        label: '款式图',
        minWidth: '120',
        render(row) {
          return (
            <div>
              {
                row.mainImgUrl && (
                  <el-image
                    style='width: 100px; height: 100px'
                    src={resizeImgByWidth(row.mainImgUrl, 200)}
                    onClick={() => {
                      row.mainImgUrl && props.lookImg(row);
                    }}
                    fit='cover'
                  />
                )
              }
            </div>
          );
        }
      },
      {
        label: '开款信息',
        minWidth: 260,
        render(row) {
          return (
            <div class='tw-flex'>
              <div class='tw-ml-6px'>
                <div>
                  品类：
                  {row.categoryName}
                </div>
                <div>
                  波段：
                  {row.wavebandName}
                </div>
                <div>
                  店铺：
                  {row.storeName}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        label: '状态',
        prop: 'taskStatus',
        render(row) {
          return <div>{ DESIGN_DEMAND_STATUS_TYPE_LIST.find(v => v.value === row.taskStatus)?.label ?? '-' }</div>;
        },
      },
      {
        label: 'AI识别状态',
        render(row) {
          return <div>{ IDENTIFY_STATUS_LIST.find(v => v.value === row.identifyStatus)?.label ?? '-' }</div>;
        },
      },
      {
        label: '款式信息',
        minWidth: 120,
        render(row) {
          return (
            <div>
              <div>
                款号：
                { row.spuCode || '-' }
              </div>
              <div>
                平台：
                { row.platformName || '-' }
              </div>
              <div>
                价格：
                { row.price || '-' }
              </div>
            </div>
          );
        },
      },
      {
        label: '选款信息',
        minWidth: 120,
        render(row) {
          return (
            <div>
              <div>
                设计师：
                {row.creatorName}
              </div>
              <div>
                创建时间：
                {filters.formatTime(row.createdTime)}
              </div>
            </div>
          );
        },
      },
      {
        label: '关联任务',
        minWidth: 130,
        prop: 'styleCode',
        render(row) {
          return (
            <div>
              <div>
                任务编号:
                <span>{ row.relaCode }</span>
              </div>
              <div>
                任务类型:
                { ASSOCIATED_TYPE_LIST.find(v => v.value === row.relaType)?.label ?? '-' }
              </div>
            </div>
          );
        }
      },
      {
        label: '审款时间',
        minWidth: 130,
        render(row) {
          return (
            <div>
              <div>
                审款人：
                { row.styleCheckerName || '-' }
              </div>
              <div>
                审款时间：
                {filters.formatTime(row.checkTime)}
              </div>
            </div>
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
              name-key='creatorName'
              time-key='createdTime'
              desc-key='remark'
              onCreate={(e: string) => handleCreateRecord(row, e)}
              v-slots={{
                append: () => (
                  <el-button
                    type='primary'
                    text
                    onClick={() => handleOperateLog(row.taskId || '')}
                  >
                    操作日志
                  </el-button>
                )
              }}
            />
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
