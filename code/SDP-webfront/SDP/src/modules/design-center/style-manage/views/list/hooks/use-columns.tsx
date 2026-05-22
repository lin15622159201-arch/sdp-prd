import { REMARK_BIZ_TYPE_ENUM } from '@/constant';
import { useTableColumns } from '@toy/business-components';
import { filters } from '@/core/plugins/filter';
import { useRouter } from 'vue-router';
import { IListItem } from '../types';
import { DESIGN_ORDER_INFO_ENUM, ORDER_INFO_STATE_LIST, SKC_TYPE_LIST, IMAGE_UPDATE_STATUS_LIST, LISTING_STATUS_LIST, PLM_STATUS_LIST, PLM_STATUS, LISTING_STATUS } from '../../../constant';
import { remarksSave } from '../../../api/index';
import { usePermissionConfig } from '../../../use-permission-config';
import { isEmpty } from '@toy/utils';
import { TYPE_OF_OPENING_LIST } from '@/modules/design-center/payment-task/constant/index';
import { InfoFilled } from '@element-plus/icons-vue';

interface IProps {
  handleOperateLog: (designCode: string) => void;
  reloadFn: () => void;
  hanldeCreateDraft: (row: IListItem) => void;
}

export const useColumns = (props: IProps) => {
  const { handleOperateLog, reloadFn } = props;
  const { BJSKC, CKXQ } = usePermissionConfig();
  const router = useRouter();
  // 因需求改动这里designCode指的是prototypeId
  const handleDesignCodeClick = (designCode: string) => {
    if (isEmpty(designCode)) return;
    router.push({ name: 'DesignCenterStyleManageSkcDetail', params: { designCode } });
  };
  /**
   * 编辑按钮
   */
  const handleEditBtn = (row: IListItem) => {
    if (isEmpty(row?.prototypeId)) return;
    router.push({
      name: 'DesignCenterStyleManageUpdateSkc',
      params: { designCode: row?.prototypeId },
      query: { listingStatus: row.listingStatus, pushPlmStatus: row.pushPlmStatus, isOnSale: (row.isOnSale ? '1' : '-1') },
    });
  };
  const handleDetail = ({ imageUpdateTaskId }: IListItem) => {
    router.push({ name: 'DesignCenterImageUpdateDetail', params: { taskId: imageUpdateTaskId } });
  };
  // 添加备注
  const handleCreateRecord = async (row: IListItem, remark: string) => {
    const {
      prototypeId,
    } = row;
    const remarkParams = {
      bizId: prototypeId as string,
      bizType: REMARK_BIZ_TYPE_ENUM.DESIGN_PROTOTYPE,
      remark,
    };
    await remarksSave(remarkParams);
    await reloadFn();
  };
  const { columns } = useTableColumns<IListItem>(() => [
    {
      type: 'selection',
      minWidth: '44',
      selectable(row) {
        return !!row.designCode;
      },
    },
    {
      label: 'SPU信息',
      minWidth: 150,
      render(row) {
        return (
          <div class='tw-flex tw-flex-col tw-justify-center'>
            <span>
              <sc-copy-text text={row.styleCode}>
                { row.styleCode }
              </sc-copy-text>
            </span>
            <span>
              { row.categoryName }
            </span>
            <span>{ filters.formatTime(row.spuCreatedTime!) }</span>
          </div>
        );
      },
    },
    {
      label: 'SKC信息',
      prop: 'designCode',
      slotKey: 'designCode',
      minWidth: 230,
      render(row) {
        const urlList = row?.designPicture?.split(',').filter(v => !!v).length ? row?.designPicture?.split(',') : [row?.materialInfo?.filter(v => v.materialType === 0)?.[0]?.materialUrl];
        return (
          <div class='tw-flex tw-flex-center-y'>
            <custom-image
              class='tw-w-80px tw-h-80px tw-mr-5px tw-flex-shrink-0'
              fit='cover'
              src={filters.ossUrl(row?.designPicture?.split(',')?.[0] || row?.materialInfo?.filter(v => v.materialType === 0)?.[0]?.materialUrl)}
              preview-src-list={urlList}
            />
            <div class='tw-flex tw-flex-col tw-ml-5px'>
              <sc-copy-text text={row.designCode}>
                {CKXQ.value ? (
                  <el-button
                    type='primary'
                    text
                    onClick={() => handleDesignCodeClick(row.prototypeId!)}
                  >
                    { row.designCode }
                  </el-button>
                ) : (
                  <span>
                    { row.designCode }
                  </span>
                )}
              </sc-copy-text>
              <p>
                { row.designerGroup }
                { row.designerGroup && row.designerName && '-' }
                { row.designerName }
              </p>
              <div>{row.color}</div>
              {/* <div class='tw-m-b-5px'>
                { TYPE_OF_OPENING_LIST.filter(v => v.value === row.styleType).map(v => <span style={`background-color: ${v.color};`} class='tw-color-#fff tw-p-5px tw-font-size-12px'>{v.label}</span>) }
              </div> */}
              <div class='tw-flex tw-flex-items-center tw-gap-6px'>
                {row.isCanceled && (
                  <el-tag
                    type='danger'
                    size='small'
                  >
                    取消
                  </el-tag>
                )}
                {row.isOnSale && (
                  <el-tag
                    type='success'
                    size='small'
                  >
                    动销
                  </el-tag>
                )}
                {row?.supplyModeName && (
                  <el-tag type='warning'>
                    {row.supplyModeName}
                  </el-tag>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      label: '企划信息',
      minWidth: 140,
      render(row) {
        return (
          <div>
            <div>
              波段：
              {row?.waveBandName}
            </div>
            <div>
              店铺名：
              {row?.storeName}
            </div>
            <div>
              平台：
              {row?.platformName}
            </div>
          </div>
        );
      },
    },
    {
      label: '款式类型',
      prop: 'skcType',
      minWidth: 90,
      type: 'enum',
      options: SKC_TYPE_LIST
    },
    {
      label: '款式标签',
      prop: 'styleLabelName',
      minWidth: 90
    },
    {
      label: '款式资料',
      minWidth: 110,
      render(row) {
        return (
          <p>
            <span>{ filters.getEnumLabel(ORDER_INFO_STATE_LIST, row.prototypeStatus!) }</span>
            {row.prototypeStatus === DESIGN_ORDER_INFO_ENUM.ALREADY && (
              <span>
                -
                { row.versionNum }
              </span>
            )}
          </p>
        );
      },
    },
    {
      label: '修图任务',
      minWidth: 110,
      render(row) {
        return (
          <div>
            <p><span>{ filters.getEnumLabel(IMAGE_UPDATE_STATUS_LIST, row.imageUpdateStatus!) || '未创建' }</span></p>
            <p
              class='tw-color-#605CE5 tw-cursor-pointer'
              onClick={() => {
                handleDetail(row);
              }}
            >
              { row.imageUpdateTaskCode }
            </p>
          </div>
        );
      },
    },
    {
      label: '上架状态',
      minWidth: 110,
      render(row) {
        return (
          <div>
            <p><span>{ filters.getEnumLabel(LISTING_STATUS_LIST, row.listingStatus!) }</span></p>
            {
              row.listingStatus === LISTING_STATUS.NOLISTED ? (
                <div>
                  <el-tooltip
                    content={row.listingFailReason}
                    placement='top'
                  >
                    <el-icon class='tw-color-red'><InfoFilled /></el-icon>
                  </el-tooltip>
                </div>
              ) : ''
            }
          </div>
        );
      },
    },
    {
      label: '前置拆版',
      minWidth: 80,
      render(row) {
        return (
          <div>
            { row.preDisassemblyState === 0 ? '否' : (row.preDisassemblyState === 1 ? '是' : '') }
          </div>
        );
      },
    },
    {
      label: '推送PLM状态',
      minWidth: 110,
      render(row) {
        return (
          <div>
            <p><span>{ filters.getEnumLabel(PLM_STATUS_LIST, row.pushPlmStatus!) || '-' }</span></p>
            {
              row.pushPlmStatus === PLM_STATUS.PUSHFAILED ? (
                <div>
                  <el-tooltip
                    content={row.pushPlmResultMessage}
                    placement='top'
                  >
                    <el-icon class='tw-color-red'><InfoFilled /></el-icon>
                  </el-tooltip>
                </div>
              ) : ''
            }
          </div>
        );
      },
    },
    {
      label: '开发bom',
      minWidth: 100,
      render() {
        return (
          <div class='tw-flex tw-flex-justify-between'>
            <div class='tw-flex tw-flex-col'>
              -
            </div>
          </div>
        );
      },
    },
    {
      label: '打版进度',
      minWidth: 180,
      render(row) {
        return (
          <div>
            <div>
              前置拆版：
              { row.preDisassemblyState === 1 ? '是' : (row.preDisassemblyState === 0 ? '否' : '') }
            </div>
            <div>
              { row.disassemblyFinished === 1 ? '已拆版' : (row.preDisassemblyState === 0 ? '未拆版' : '') }
            </div>
            <div>
              完成时间：
              { filters.formatTime(row.disassemblyFinishedTime) }
            </div>
          </div>
        );
      },
    },
    {
      label: '核价',
      minWidth: 180,
      render(row) {
        const { priceOrderInfo, pricePassedState } = row;
        return (
          <div>
            <div>
              大货成本：
              { priceOrderInfo?.bulkCost ? `¥${priceOrderInfo.bulkCost}` : '-' }
            </div>
            <div>
              核价时间：
              { priceOrderInfo?.checkPriceTime ? filters.formatTime(priceOrderInfo.checkPriceTime) : '-' }
            </div>
            <div>
              测价通过：
              { pricePassedState === 1 ? '是' : (pricePassedState === 0 ? '否' : '-') }
            </div>
          </div>
        );
      },
    },
    {
      label: '操作',
      prop: 'remark',
      slotKey: 'remark',
      width: 150,
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
                    onClick={() => handleOperateLog(row.prototypeId!)}
                  >
                    操作日志
                  </el-button>
                )
              }}
            />
            <div class='tw-flex tw-py-10px'>
              {BJSKC.value && !row.isCanceled && (
                <el-button
                  type='primary'
                  onClick={() => handleEditBtn(row)}
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
