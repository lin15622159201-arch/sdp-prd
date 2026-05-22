import { useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  CHECK_PRICE_STATE_LIST,
  STYLE_TYPE_LIST,
  DETAIL_AIM_ENUM,
  CLOTHES_CHECK_PRICESTATE_ENUM
} from '../../../../constant/index';
import { usePermissionConfig } from '../../../use-permission-config';
import { filters } from '@/core/plugins/filter';
import { QC_CRAFT_LIST, REMARK_BIZ_TYPE_ENUMS } from '@/modules/clothes-center/constant';
import { ICheckPricePageResListItem, ICheckPricePageResListItemCraftListItem } from '../../../api/types';
import { useRouter } from 'vue-router';
import { remarkAdd } from '@/modules/clothes-center/api';
import { YES_NO_ENUM, YES_NO_LIST } from '@/constant';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';
import NP from 'number-precision';

interface IProps {
  reloadFn: () => void;
  handleOperateLog: (bizCode: string) => void;
}

export const useListColumns = ({ reloadFn, handleOperateLog }: IProps) => {
  const { BJ, XQ } = usePermissionConfig();
  const $router = useRouter();
  const { handleCostTime } = useTimerangeDistance();

  // 添加备注
  const handleCreateRecord = async (row: ICheckPricePageResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.checkPriceId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.STYLE_PEICING,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };
  const handleToEdit = (row: ICheckPricePageResListItem, isDetail: boolean = false) => {
    let detailAimEnum = DETAIL_AIM_ENUM.VISIT;
    if (!isDetail) {
      if (
        row.checkPriceState === CLOTHES_CHECK_PRICESTATE_ENUM.WAIT_CHECK_PRICE
        && (!row.versionNum || row.versionNum === '1')) {
        detailAimEnum = DETAIL_AIM_ENUM.INIT_CHECK;
      } else {
        detailAimEnum = DETAIL_AIM_ENUM.RE_CHECK;
      }
    }
    $router.push(
      {
        name: isDetail ? 'StyleDataManageStylePeicingDetail' : 'StyleDataManageStylePeicingEdit',
        params: {
          id: row.checkPriceId
        },
        query: {
          type: detailAimEnum,
        },
      }
    );
  };
  const { columns } = useTableColumns<ICheckPricePageResListItem>(() => {
    return [
      {
        type: 'selection',
        align: 'center',
        width: 50,
      },
      {
        label: 'SKC',
        minWidth: '150',
        render: (row) => {
          return (
            <>
              <div class='tw-flex'>
                SKC：
                <sc-copy-text text={row.designCode} />
              </div>
              <div class='tw-flex'>
                SPU：
                <sc-copy-text text={row.styleCode} />
              </div>
              {row.isCancel === YES_NO_ENUM.YES && (
                <el-tag type='danger'>取消</el-tag>
              )}
            </>
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
        minWidth: '120',
        prop: 'skcType',
        type: 'enum',
        options: STYLE_TYPE_LIST,
      },
      {
        label: '任务状态',
        minWidth: '120',
        render: (row) => {
          return (
            <>
              {XQ.value ? (
                <el-button
                  onClick={() => handleToEdit(row, true)}
                  type='primary'
                  text
                >
                  {filters.getEnumLabel(CHECK_PRICE_STATE_LIST, row.checkPriceState!)}
                  {row.versionNum ? `-${row.versionNum}` : ''}
                </el-button>
              ) : (
                <>
                  {filters.getEnumLabel(CHECK_PRICE_STATE_LIST, row.checkPriceState!)}
                  {row.versionNum ? `-${row.versionNum}` : ''}
                </>
              )}
              {row.isUpdate === YES_NO_ENUM.YES && (
                <p><el-tag type='warning'>待更新</el-tag></p>
              )}
            </>
          );
        }
      },
      {
        label: '审版通过状态',
        minWidth: '120',
        prop: 'auditPass',
        type: 'enum',
        options: YES_NO_LIST,
      },
      {
        label: '款式品类',
        minWidth: '120',
        prop: 'categoryName'
      },
      {
        label: '二次工艺',
        minWidth: '90',
        render(row) {
          return (
            <div class='desc-lis'>
              {row.craftList.map((item: ICheckPricePageResListItemCraftListItem) => (
                <div class='tw-py-2px'>
                  { item.craftsProcessName || filters.getEnumLabel(QC_CRAFT_LIST, item.craftsRequire!)}
                  ：
                  {(item.nameList || []).map((name: string) => (
                    <span>
                      {name || '-'}
                      ;
                    </span>
                  ))}
                </div>
              ))}
              {row.cuttingMethod && (
                <el-tag>
                  { row.cuttingMethod }
                </el-tag>
              )}
            </div>
          );
        },
      },
      {
        label: '价格信息',
        minWidth: '120',
        render(row) {
          // 只展示大于0的价格
          const value = row.totalCost ? NP.round(row.totalCost, 2) : 0;
          const value2 = row.estimateCheckTotalCost ? NP.round(row.estimateCheckTotalCost, 2) : 0;
          return (
            <>
              <div>
                核价：
                {value > 0 ? value : '-'}
                元
              </div>
              <div>
                预估：
                {value2 > 0 ? value2 : '-'}
                元
              </div>
            </>
          );
        }
      },
      {
        label: '相关人员',
        minWidth: '90',
        render(row) {
          return (
            <>
              <div>
                设计师：
                { row.designerName || '-' }
              </div>
              <div>
                核价师：
                { row.pricerName || '-' }
              </div>
            </>
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
              {/* 待提交耗时=当前时间-创建时间 */}
              {row.checkPriceState === CLOTHES_CHECK_PRICESTATE_ENUM.WAIT_CHECK_PRICE && (
                <span
                  v-html={handleCostTime({
                    row,
                    currentTimeKey: '',
                    stepCreatedTimeKey: 'firstCreatedTime',
                    hasMinus: true,
                    isBeforeStageTime: true
                  })}
                />
              )}
              {/* 已提交耗时=首次提及-创建时间 */}
              {row.checkPriceState === CLOTHES_CHECK_PRICESTATE_ENUM.HAD_CHECK_PRICE && (
                <span
                  v-html={handleCostTime({
                    row,
                    currentTimeKey: 'firstFinishTime',
                    stepCreatedTimeKey: 'firstCreatedTime',
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
          return filters.formatTime(row.firstCreatedTime);
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
                      onClick={() => handleOperateLog(row.designCode as string)}
                    >
                      操作日志
                    </el-button>
                  )
                }}
              />
              <div>
                { BJ.value && row.isLatest === YES_NO_ENUM.YES && (
                  <el-button
                    type='primary'
                    onClick={() => handleToEdit(row, false)}
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
