import { useTableColumns } from '@toy/business-components';
import { useRouter } from 'vue-router';
import { IListItem } from '../types';
import { SKC_TYPE_LIST } from '@/modules/design-center/style-manage/constant';
import { filters } from '@/core/plugins/filter';
import {
  CHECK_COUNT_STATE_LIST, CRAFTS_REQUIRE_LIST,
  CHECK_COUNT_STATE_ENUM
} from '@/modules/style-data-manage/dosage-account/constant';
import { ASIDE_TYPE_ENUM } from '../../../constant';
import { getDosageLatestInfo } from '@/modules/style-data-manage/dosage-account/api';
import { usePermissionConfig } from '@/modules/style-data-manage/dosage-account/use-permission-config';
import { YES_NO_ENUM } from '@/constant';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';
import styles from '../../../style.module.scss';
import { resizeImgByWidth } from '@/core/utils/helper';

interface IProps {
  handleOperateLog: (bizId: string) => void;
  handleCreateRecord: (row: any, remark: string) => void;
}
export const useColumns = (props: IProps) => {
  const { handleCreateRecord, handleOperateLog } = props;
  const { BJ, CKXQ } = usePermissionConfig();
  const $router = useRouter();
  const { handleCostTime } = useTimerangeDistance();
  const handleEditItem = async (row: IListItem) => {
    // 校验对应SKC最新版本的bom是否为找料中
    await getDosageLatestInfo({
      checkCountId: row.checkCountId
    });
    $router.push({
      name: 'StyleDataManageDosageAccountUpdate',
      params: {
        id: row.checkCountId
      },
      query: {
        type: ASIDE_TYPE_ENUM.INNER_HANDLE
      },
    });
  };
  const { columns } = useTableColumns<IListItem>(() => [
    // TODO:这个版本暂时不做
    // {
    //   type: 'expand',
    //   render(row) {
    //     const { href } = $router.resolve({
    //       name: 'StyleDataManageDosageAccountDetail',
    //       params: {
    //         id: row.checkCountId,
    //       },
    //       query: {
    //         type: ASIDE_TYPE_ENUM.INNER_HANDLE
    //       },
    //     });
    //     return (
    //       <div class={styles.child_table}>
    //         <div class={styles.tr}>
    //           <div class={styles.td}>
    //             {CKXQ.value ? (
    //               <el-link href={href}>
    //                 {filters.getEnumLabel(CHECK_COUNT_STATE_LIST, row.checkCountState!)}
    //                 -
    //                 {row.versionNum}
    //               </el-link>
    //             ) : (
    //               <div>
    //                 {filters.getEnumLabel(CHECK_COUNT_STATE_LIST, row.checkCountState!)}
    //                 -
    //                 {row.versionNum}
    //               </div>
    //             )}
    //           </div>
    //           <div class={styles.td}>
    //             <div>设计师：张三</div>
    //             <div>核价师：张三</div>
    //           </div>
    //           <div class={styles.td}>提交时间：2020-12-12 14:14:14</div>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      label: 'SKC',
      minWidth: '120',
      render(row) {
        return (
          <div>
            <sc-copy-text text={row.designCode} />
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
      minWidth: 120,
      align: 'center',
      render(row) {
        const spuShelvePictureList = (row.shelvePicture?.spuShelvePictureList || []);
        const skcShelvePictureList = (row.shelvePicture?.skcShelvePictureList || []);
        const images = [...skcShelvePictureList, ...spuShelvePictureList, ...(row.customerPictureList || [])];
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
      label: '款式类型',
      type: 'enum',
      minWidth: '120',
      prop: 'skcType',
      options: SKC_TYPE_LIST
    },
    {
      label: '任务状态',
      type: 'enum',
      minWidth: '120',
      render(row) {
        const { href } = $router.resolve({
          name: 'StyleDataManageDosageAccountDetail',
          params: {
            id: row.checkCountId,
          },
          query: {
            type: ASIDE_TYPE_ENUM.INNER_HANDLE
          },
        });
        return (
          <>
            <div>
              {CKXQ.value ? (
                <el-link href={href}>
                  {filters.getEnumLabel(CHECK_COUNT_STATE_LIST, row.checkCountState!)}
                  -
                  {row.versionNum}
                </el-link>
              ) : (
                <div>
                  {filters.getEnumLabel(CHECK_COUNT_STATE_LIST, row.checkCountState!)}
                  -
                  {row.versionNum}
                </div>
              )}
            </div>
            {row.isUpdate === YES_NO_ENUM.YES && (
              <el-tag type='warning'>待更新</el-tag>
            )}
          </>
        );
      },
    },
    {
      label: '二次工艺',
      minWidth: '120',
      render(row) {
        return (
          <div>
            {row.craftList.map(v => (
              <div>
                {v.craftsProcessName || filters.getEnumLabel(CRAFTS_REQUIRE_LIST, v.craftsRequire)}
                ：
                {v.nameList.join(';')}
              </div>
            ))}
            {row.cuttingMethod && (
              <el-tag type='primary'>{row.cuttingMethod}</el-tag>
            )}
          </div>
        );
      },
    },
    {
      label: '相关人员',
      minWidth: '120',
      render(row) {
        return (
          <div>
            <div>
              设计师：
              {row.designerName}
            </div>
            <div>
              用量师：
              {row.checkerName}
            </div>
          </div>
        );
      },
    },
    {
      label: '耗时',
      minWidth: '120',
      render: (row) => {
        // 需要 row 、当前时间、创建时间
        return (
          <>
            {/* 待接单、待提交耗时=当前时间-任务数据最新完成分单的时间 */}
            {row.checkCountState === CHECK_COUNT_STATE_ENUM.WAIT_CALCULATE && (
              <span
                v-html={handleCostTime({
                  row,
                  currentTimeKey: '', // 不传即用当前时间
                  stepCreatedTimeKey: 'seperateFinishTime',
                  hasMinus: true,
                  isBeforeStageTime: true
                })}
              />
            )}
            {/* 已提交耗时=首次提交-数据最新完成用量分单的时间 */}
            {row.checkCountState === CHECK_COUNT_STATE_ENUM.CALCULATED && (
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
        return filters.formatTime(row.finishTime);
      },
    },
    {
      label: '操作记录',
      fixed: 'right',
      minWidth: '120',
      render(row) {
        return (
          <div>
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
                    onClick={() => handleOperateLog(row.designCode!)}
                  >
                    操作日志
                  </el-button>
                )
              }}
            />
            <div class='tw-flex'>
              {BJ.value && row.isLatest === YES_NO_ENUM.YES && (
                <el-button
                  type='primary'
                  disabled={row.isCancel === YES_NO_ENUM.YES}
                  onClick={() => handleEditItem(row)}
                >
                  编辑
                </el-button>
              )}
            </div>
          </div>
        );
      },
    },
  ]);
  return {
    columns
  };
};
