import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { usePermissionConfig } from '../../../use-permission-config';
import { remarkAdd } from '@/modules/clothes-center/api';
import { REMARK_BIZ_TYPE_ENUMS, MAKE_CLOTHES_TYPE_LIST } from '@/modules/clothes-center/constant';
import { STATUS_LIST, STATUS_LIST_ENUM } from '../constant';
import { IAuditCraftOrderPageResListItem } from '../../../api/types';
import { useRouter } from 'vue-router';
import { useOpenBlank } from '@/hooks-transfer/use-router-blank';
import { filters } from '@/core/plugins/filter';
import { YES_NO_ENUM } from '@/constant';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';

interface IProps {
  reloadFn: () => void;
  handleOperateLog: (id: string) => void;
  isHaveAuditCraftUser: (row: IAuditCraftOrderPageResListItem) => boolean;
}

export const useListColumns = ({ reloadFn, handleOperateLog, isHaveAuditCraftUser }: IProps) => {
  const { BJ, XQ } = usePermissionConfig();
  const $router = useRouter();
  const { handleCostTime } = useTimerangeDistance();
  // 添加备注
  const handleCreateRecord = async (row: IAuditCraftOrderPageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.auditCraftOrderId,
      bizType: REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };
  const handleToEdit = (row: IAuditCraftOrderPageResListItem, behavior: string) => {
    if (!isHaveAuditCraftUser(row)) {
      return;
    }
    $router.push(
      {
        name: behavior === 'view' ? 'ClothesCenterAuditCraftTaskDetail' : 'ClothesCenterAuditCraftTaskEdit',
        params: {
          id: row.auditCraftOrderId,
          behavior
        }
      }
    );
  };
  const { columns } = useTableColumns<IAuditCraftOrderPageResListItem>(() => {
    return [
      {
        type: 'selection',
        width: '50',
        fixed: 'left',
      },
      {
        label: 'SPU',
        minWidth: '120',
        prop: 'styleCode',
        render(row) {
          return (
            <div>
              <sc-copy-text text={row.styleCode} />
              {row.isCancel === YES_NO_ENUM.YES && (
                <el-tag type='danger'>取消</el-tag>
              )}
            </div>
          );
        },
      },
      {
        label: '图片',
        align: 'center',
        minWidth: '120',
        render(row) {
          const spuShelvePictureList = (row.shelvePicture?.spuShelvePictureList || []);
          const skcShelvePictureList = (row.shelvePicture?.skcShelvePictureList || []);
          const images = [...skcShelvePictureList, ...spuShelvePictureList, ...(row.designPictureList || [])];
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
              {
                XQ.value ? (
                  <el-button
                    onClick={() => handleToEdit(row, 'view')}
                    type='primary'
                    text
                  >
                    {filters.getEnumLabel(STATUS_LIST, row.state!)}
                    {row.versionNum ? `-${row.versionNum}` : ''}
                  </el-button>
                ) : (
                  <>
                    {filters.getEnumLabel(STATUS_LIST, row.state!)}
                    {row.versionNum ? `-${row.versionNum}` : ''}
                  </>
                )
              }
            </>

          );
        }
      },
      {
        label: '打版方式',
        minWidth: '120',
        render: (row) => {
          return (
            <p>{filters.getEnumLabel(MAKE_CLOTHES_TYPE_LIST, row.makeClothesType!)}</p>
          );
        }
      },
      {
        label: '款式品类',
        minWidth: '120',
        render(row) {
          return row.categoryName || '-';
        }
      },
      {
        label: '相关人员',
        minWidth: '90',
        render(row) {
          return (
            <div>
              审版工艺师：
              { row.reviewCraftsmanName || '-' }
            </div>
          );
        }
      },
      // {
      //   label: '耗时',
      //   minWidth: '120',
      //   render: (row) => {
      //     // 需要 row 、当前时间、创建时间
      //     return (
      //       <>
      //         {/* 待提交耗时=当前时间-创建时间 */}
      //         {(row.state === STATUS_LIST_ENUM.CALL || row.state === STATUS_LIST_ENUM.WAIT) && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: '',
      //               stepCreatedTimeKey: 'createdTime',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //         {/* 已提交耗时=首次提及-创建时间 */}
      //         {row.state === STATUS_LIST_ENUM.COMPLETED && (
      //           <span
      //             v-html={handleCostTime({
      //               row,
      //               currentTimeKey: 'firstSubmitTime',
      //               stepCreatedTimeKey: 'createdTime',
      //               hasMinus: true,
      //               isBeforeStageTime: true
      //             })}
      //           />
      //         )}
      //       </>
      //     );
      //   }
      // },
      {
        label: '创建时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.createdTime);
        },
      },
      {
        label: '提交时间',
        minWidth: '120',
        render(row) {
          return filters.formatTime(row.latestSubmitTime);
        },
      },
      {
        label: '操作记录',
        width: '180',
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
                      onClick={() => handleOperateLog(row.auditCraftOrderId)}
                    >
                      操作日志
                    </el-button>
                  )
                }}
              />
              <div>
                { BJ.value && (
                  <el-button
                    type='primary'
                    onClick={() => handleToEdit(row, 'modify')}
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
