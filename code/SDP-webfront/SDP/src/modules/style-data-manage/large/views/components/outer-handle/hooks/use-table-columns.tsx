import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { getLabelByVal, filters } from '@/core/plugins/filter';
import { orderInfoRemarkAdd } from '@/modules/style-data-manage/large/api';
import { IStyleInfoPageResListItem } from '@/modules/style-data-manage/large/api/types';
import {
  REMARK_BIZ_TYPE_ENUMS, STYLE_INFO_STATE_LIST, STYLE_INFO_RECEIVING_ENUM,
  STYLE_INFO_STATE_ENUM
} from '@/modules/style-data-manage/large/constant';
import { usePermissionConfig } from '@/modules/style-data-manage/large/use-permission-config';
import { useRouter, useRoute } from 'vue-router';
import { Ref } from 'vue';
import { YES_NO_ENUM } from '@/constant';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';

interface IParams {
  activeName: Ref<string>;
  reloadFn: () => void;
  handleOperateLog: (bizCode: string) => void;
}

export const useListColumns = ({ reloadFn, handleOperateLog, activeName }: IParams) => {
  const $router = useRouter();
  const $route = useRoute();
  const { WBXQ, WBBJ } = usePermissionConfig();
  const { handleCostTime } = useTimerangeDistance();

  // 添加备注
  const handleCreateRecord = async (row: IStyleInfoPageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.styleInfoId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.PRO,
      remark,
    };
    await orderInfoRemarkAdd(remarkParams);
    await reloadFn();
  };
  const handleEdit = (row: IStyleInfoPageResListItem, behavior: string) => {
    $router.push({
      name: behavior === 'view' ? 'StyleDataManageLargeDetail' : 'StyleDataManageLargeEdit',
      params: {
        id: row.styleInfoId,
      },
      query: {
        componentName: $route.query.componentName,
        state: activeName.value
      }
    });
  };
  const { columns } = useTableColumns<IStyleInfoPageResListItem>(() => {
    return [
      {
        label: 'SPU',
        minWidth: '150',
        render(row) {
          return (
            <div>
              <div><sc-copy-text text={row.styleCode} /></div>
              {row.isCancel === YES_NO_ENUM.YES && (
                <el-tag type='danger'>取消</el-tag>
              )}
            </div>
          );
        }
      },
      {
        label: '图片',
        align: 'center',
        minWidth: 120,
        render(row) {
          const spuShelvePictureList = (row.shelvePicture?.spuShelvePictureList || []);
          const skcShelvePictureList = (row.shelvePicture?.skcShelvePictureList || []);
          const pictureList = (row.customerPicture || '').split(',').filter(Boolean);
          const images = [...skcShelvePictureList, ...spuShelvePictureList, ...pictureList];
          return (
            <custom-image
              src={resizeImgByWidth(images?.[0] || '', 192)}
              class='img-thumbnail__table'
              fit='cover'
              preview-src-list={images}
              preview-teleported
            />
          );
        },
      },
      {
        label: '任务状态',
        minWidth: '120',
        render: (row) => {
          return (
            <>
              {WBXQ.value ? (
                <el-button
                  onClick={() => handleEdit(row, 'view')}
                  type='primary'
                  text
                >
                  {row.styleInfoReceiving === STYLE_INFO_RECEIVING_ENUM.NO ? (
                    '待接单'
                  ) : (
                    getLabelByVal(STYLE_INFO_STATE_LIST, row.state!)
                  )}
                  {row.styleInfoVersion ? `-${row.styleInfoVersion}` : ''}
                </el-button>
              ) : (
                <>
                  {row.styleInfoReceiving === STYLE_INFO_RECEIVING_ENUM.NO ? (
                    '待接单'
                  ) : (
                    getLabelByVal(STYLE_INFO_STATE_LIST, row.state!)
                  )}
                  {row.styleInfoVersion ? `-${row.styleInfoVersion}` : ''}
                </>
              )}
            </>
          );
        },
      },
      {
        label: '款式品类',
        minWidth: '90',
        prop: 'styleTypeName',
      },
      {
        label: '提交记录',
        minWidth: '90',
        render(row) {
          return (
            <div>
              供应商：
              { row.roomName || '-' }
            </div>
          );
        }
      },
      {
        label: '耗时',
        minWidth: '120',
        render: (row) => {
          // 需要 row 、当前时间、创建时间
          return (
            <>
              {/* 待接单、待提交耗时=当前时间-任务数据最新完成分单的时间 */}
              {(row.styleInfoReceiving === STYLE_INFO_RECEIVING_ENUM.NO
              || row.state === STYLE_INFO_STATE_ENUM.WAITING) && (
                <span
                  v-html={handleCostTime({
                    row,
                    currentTimeKey: '',
                    stepCreatedTimeKey: 'seperateFinishTime',
                    hasMinus: true,
                    isBeforeStageTime: true
                  })}
                />
              )}
              {/* 已提交耗时=首次提交-数据最新完成纸样/3D分单的时间 */}
              {row.state === STYLE_INFO_STATE_ENUM.SUBMITED && (
                <span
                  v-html={handleCostTime({
                    row,
                    currentTimeKey: 'firstFinishTime',
                    stepCreatedTimeKey: 'seperateFinishTime',
                    hasMinus: true,
                    isBeforeStageTime: true
                  })}
                />
              )}
            </>
          );
        }
      },
      {
        label: '创建时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.seperateFinishTime);
        },
      },
      {
        label: '提交时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.submitTime);
        },
      },
      {
        label: '操作记录',
        width: '110',
        fixed: 'right',
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
                      type='primary'
                      text
                      onClick={() => handleOperateLog(row.styleCode!)}
                    >
                      操作日志
                    </el-button>
                  )
                }}
              />
              <div>
                {WBBJ.value && activeName.value === 'submited' && (
                  <el-button
                    type='primary'
                    onClick={() => handleEdit(row, 'modify')}
                    disabled={row.isCancel === YES_NO_ENUM.YES}
                  >
                    编辑
                  </el-button>
                )}
              </div>
            </>
          );
        }
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
