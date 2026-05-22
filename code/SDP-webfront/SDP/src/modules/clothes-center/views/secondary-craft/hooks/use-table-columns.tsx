import { useTableColumns, ITableColumnsItem } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { SAMPLE_REFER_TYPE_ENUM, SAMPLE_TYPE_LIST, REMARK_BIZ_TYPE_ENUMS } from '@/modules/clothes-center/constant';
import { YES_NO_ENUM } from '@/constant';
import { ISecondCraftListResListItem, ISecondCraftListReq } from '../api/types';
import { filters } from '@/core/plugins/filter';
import { REGION_LIST, CURRENT_NODE_LIST, CURRENT_NODE_ENUM, UNDERTAKE_WAY_LIST, CANCEL_NODE_LIST } from '../constant';
import { computed, Ref } from 'vue';
import TagTooltip from '@/modules/design-center/components/tag-tooltip/index.vue';
import { useTimerangeDistance } from '@/hooks-transfer/use-timerange-distance';
import { remarkAdd } from '@/modules/clothes-center/api';

interface IProps {
  params: Ref<ISecondCraftListReq>;
  reloadFn: () => void;
  viewProcessOrder: (row: any) => void;
  handleOperateLog: (secondCraftId: string) => void;
}

export const useListColumns = ({ params, reloadFn, viewProcessOrder, handleOperateLog }: IProps) => {
  const { handleCostTime } = useTimerangeDistance();
  const getPictureList = (row: ISecondCraftListResListItem) => {
    if (row.customerPictureList?.length) {
      return row.customerPictureList;
    }
    return row.designPictureList || [];
  };
  const stateCongig = computed(() => {
    if (!params.value.state) {
      return [{
        label: '当前环节',
        width: '120',
        prop: 'state',
        type: 'enum',
        options: CURRENT_NODE_LIST,
      }];
    }
    return [];
  });
  // 添加备注
  const handleCreateRecord = async (row: ISecondCraftListResListItem, remark: string) => {
    const remarkParams = {
      bizId: row.secondCraftId as string,
      bizType: REMARK_BIZ_TYPE_ENUMS.SECOND_CRAFT,
      remark,
    };
    await remarkAdd(remarkParams);
    await reloadFn();
  };
  const handleRegistrantNameConfig = computed(() => {
    if (params.value.state === CURRENT_NODE_ENUM.BEING_PROCESSED) {
      return [{
        label: '工艺处理人',
        minWidth: '120',
        prop: 'handleRegistrantName',
      }];
    }
    return [];
  });
  const craftsProcessNameConfig = computed(() => {
    if (params.value.state !== CURRENT_NODE_ENUM.SUPPLEMENT_CRAFT) {
      return [{
        label: '工艺环节',
        minWidth: '90',
        prop: 'craftsProcessName',
      }];
    }
    return [];
  });
  const cancelPreStateConfig = computed(() => {
    if (params.value.state === CURRENT_NODE_ENUM.BEING_CLOSED) {
      return [{
        label: '取消环节',
        minWidth: '110',
        prop: 'cancelPreState',
        type: 'enum',
        options: CANCEL_NODE_LIST,
      }];
    }
    return [];
  });
  const { columns } = useTableColumns<ISecondCraftListResListItem>(() => {
    return [
      {
        type: 'selection',
        width: 44,
        selectable: row => row.isCancel === YES_NO_ENUM.NO
      },
      {
        label: '加工单号',
        minWidth: '150',
        render: (row) => {
          return (
            <el-button type='primary' link onClick={() => viewProcessOrder(row)}>
              {row.processCode}
            </el-button>
          );
        }
      },
      {
        label: 'SKC',
        minWidth: '150',
        render: (row) => {
          return (
            <>
              <sc-copy-text text={row.designCode} />
              <div>
                {row.isUrgent === YES_NO_ENUM.YES && (
                  <el-tag
                    type='danger'
                    class='margin-right-5'
                  >
                    急
                  </el-tag>
                )}
                {row.isAbnormal === YES_NO_ENUM.YES && (
                  <el-tag type='danger'>
                    异常
                  </el-tag>
                )}
                {row.isCancel === YES_NO_ENUM.YES && (
                  <el-tag type='danger'>
                    取消
                  </el-tag>
                )}
                {row.styleReferType === SAMPLE_REFER_TYPE_ENUM.REFER && (
                  <TagTooltip tooltip-type='REFER' row={row}>
                    <el-tag>套版</el-tag>
                  </TagTooltip>
                )}
                {row.styleReferType === SAMPLE_REFER_TYPE_ENUM.DERI && (
                  <TagTooltip tooltip-type='DERI' row={row}>
                    <el-tag>衍生</el-tag>
                  </TagTooltip>
                )}
                {row.quoteDesignCode && (
                  <TagTooltip tooltip-type='modifyStyle' row={row}>
                    <el-tag>改款</el-tag>
                  </TagTooltip>
                )}
                {row.referenceDesignCode && (
                  <TagTooltip tooltip-type='referCode' row={row}>
                    <el-tag>参考</el-tag>
                  </TagTooltip>
                )}
              </div>
              <div>
                {row.regionId && (
                  <el-tag type='warning'>
                    { filters.getEnumLabel(REGION_LIST, row.regionId) }
                  </el-tag>
                )}
              </div>
            </>
          );
        },
      },
      {
        label: '样衣版本',
        width: '120',
        prop: 'versionNum',
      },
      {
        label: '图片',
        align: 'center',
        width: '200',
        render(row) {
          const spuShelvePictureList = (row.shelvePicture?.spuShelvePictureList || []);
          const skcShelvePictureList = (row.shelvePicture?.skcShelvePictureList || []);
          const images = [...skcShelvePictureList, ...spuShelvePictureList, ...getPictureList(row)];
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
      // 当前环节
      ...stateCongig.value.map<ITableColumnsItem<ISecondCraftListResListItem>>((item: any) => ({ ...item })),
      {
        label: '打版类型',
        minWidth: '110',
        prop: 'sampleType',
        type: 'enum',
        options: SAMPLE_TYPE_LIST,
      },
      // 工艺处理人
      ...handleRegistrantNameConfig.value.map<ITableColumnsItem<ISecondCraftListResListItem>>((item: any) => ({
        ...item
      })),
      {
        label: '工艺类型',
        minWidth: '90',
        render(row) {
          return (
            <>
              { row.category3 || row.category2 || row.category1 || '-' }
            </>
          );
        }
      },
      {
        label: '花型图',
        align: 'center',
        width: '200',
        render(row) {
          if (row.craftPictureList?.length) {
            return (
              <image-viewer
                list={row.craftPictureList}
                v-slots={{
                  default: ({ view }: { view: string; }) => {
                    return (
                      <el-image
                        src={resizeImgByWidth(row.craftPictureList[0], 300)}
                        class='img-thumbnail__table'
                        fit='cover'
                        onClick={view}
                      />
                    );
                  },
                }}
              />
            );
          }
          return (
            <custom-image
              src={resizeImgByWidth('', 300)}
              class='img-thumbnail__table'
              fit='cover'
              preview-src-list={[]}
              preview-teleported
            />
          );
        },
      },
      // 工艺环节
      ...craftsProcessNameConfig.value.map<ITableColumnsItem<ISecondCraftListResListItem>>((item: any) => ({
        ...item
      })),
      {
        label: '承接方式',
        minWidth: '110',
        prop: 'undertakeType',
        type: 'enum',
        options: UNDERTAKE_WAY_LIST,
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
                纸样师：
                { row.patternMakerName || '-' }
              </div>
            </>
          );
        }
      },
      {
        label: '当前耗时',
        minWidth: '110',
        prop: 'undertakeType',
        render: (row) => {
          // 需要 row 、当前时间、创建时间
          return (
            <span
              v-html={handleCostTime({
                row,
                currentTimeKey: 'currentTime',
                stepCreatedTimeKey: 'craftCreatedTime'
              })}
            />
          );
        }
      },
      // 取消环节
      ...cancelPreStateConfig.value.map<ITableColumnsItem<ISecondCraftListResListItem>>((item: any) => ({
        ...item
      })),
      {
        label: '操作记录',
        width: '120px',
        fixed: 'right',
        render(row) {
          return (
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
                    onClick={() => handleOperateLog(row.secondCraftId!)}
                  >
                    操作日志
                  </el-button>
                )
              }}
            />
          );
        }
      },
    ];
  });
  return {
    tableColumns: columns
  };
};
