import { useTableColumns } from '@toy/business-components';
import { IListItem } from '../types';
import { SKC_TYPE_LIST } from '@/modules/design-center/style-manage/constant';
import { filters } from '@/core/plugins/filter';
import { CRAFTS_REQUIRE_LIST } from '@/modules/style-data-manage/dosage-account/constant';
import { YES_NO_ENUM } from '@/constant';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';
import { resizeImgByWidth } from '@/core/utils/helper';

interface IProps {
  handleOperateLog: (bizId: string) => void;
  handleCreateRecord: (row: any, remark: string) => void;
}
export const useColumns = (props: IProps) => {
  const { handleCreateRecord, handleOperateLog } = props;
  const { handleCostTime } = useTimerangeDistance();

  const { columns } = useTableColumns<IListItem>(() => [
    {
      type: 'selection',
      width: 50,
      selectable(row) {
        return row.isCancel === YES_NO_ENUM.NO;
      }
    },
    {
      label: 'SKC',
      minWidth: 120,
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
      prop: 'skcType',
      options: SKC_TYPE_LIST
    },
    {
      label: '分单状态',
      render(row) {
        return row.isAllocated === YES_NO_ENUM.YES ? '已分单' : '待分单';
      },
    },
    {
      label: '分单结果',
      prop: 'roomName',
    },
    {
      label: '二次工艺',
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
      render(row) {
        return (
          <div>
            <div>
              设计师：
              {row.designerName}
            </div>
            <div>
              分单员：
              {row.allocateeName}
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
            {/* 待分单耗时：当前时间-数据创建时间 */}
            {row.isAllocated === YES_NO_ENUM.NO && (
              <span
                v-html={handleCostTime({
                  row,
                  currentTimeKey: '', // 不传即用当前时间
                  stepCreatedTimeKey: 'createdTime',
                  hasMinus: true,
                  isBeforeStageTime: true
                })}
              />
            )}
            {/* 已分单耗时：首次完成分单的时间-数据创建时间 */}
            {row.isAllocated === YES_NO_ENUM.YES && (
              <span
                v-html={handleCostTime({
                  row,
                  currentTimeKey: 'firstSeperateFinishTime',
                  stepCreatedTimeKey: 'createdTime',
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
        return filters.formatTime(row.createdTime);
      },
    },
    {
      label: '提交时间',
      minWidth: '120',
      render(row) {
        return filters.formatTime(row.seperateFinishTime);
      },
    },
    {
      label: '操作记录',
      fixed: 'right',
      width: 120,
      render(row) {
        return (
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
                    onClick={() => handleOperateLog(row.designCode!)}
                  >
                    操作日志
                  </el-button>
                )
              }}
            />
          </div>
        );
      },
    },
  ]);
  return {
    columns
  };
};
