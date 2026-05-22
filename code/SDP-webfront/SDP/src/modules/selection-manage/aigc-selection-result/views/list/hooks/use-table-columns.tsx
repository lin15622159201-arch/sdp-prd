import { useRouter } from 'vue-router';
import { useTableColumns } from '@toy/business-components';
import { ITableItem } from '../type';
import { resizeImgByWidth } from '@/core/utils/helper';
import {
  OPEN_STYLE_STATUS_LIST,
  OPEN_STYLE_STATUS_ENUM,
} from '@/modules/selection-manage/aigc-selection-result/constant';
import { filters } from '@/core/plugins/filter';
import { usePermissionConfig } from '../../../use-permission-config';
import { getRefImgUrl } from '@/modules/selection-manage/utils';

export const useListColumns = () => {
  const { XQ } = usePermissionConfig();
  const router = useRouter();
  const handleCheck = (id: string) => {
    const { href } = router.resolve({
      name: 'AigcSelectionManageSelectionResultDetail',
      params: {
        id,
      },
    });
    window.open(href, '_blank');
  };
  const { columns } = useTableColumns<ITableItem>(() => {
    return [
      {
        label: '编号',
        minWidth: '200',
        render(row) {
          const { inspirationCode, runCode } = row;
          return (
            <div>
              <p>
                <span>灵感图编号：</span>
                <el-text type='info'>{inspirationCode || '-'}</el-text>
              </p>
              <p>
                <span>跑图编号：</span>
                <el-text type='info'>{runCode}</el-text>
              </p>
            </div>
          );
        },
      },
      {
        label: '灵感图',
        minWidth: '120',
        render(row) {
          if (!getRefImgUrl(row)) return null;
          return (
            <div class='tw-flex tw-flex-wrap tw-gap-2px'>
              <el-image
                src={resizeImgByWidth(getRefImgUrl(row), 200)}
                class='tw-w-100px tw-h-100px tw-rounded-4px'
                fit='cover'
                preview-src-list={[getRefImgUrl(row)]}
                preview-teleported
              />
            </div>
          );
        }
      },
      {
        label: '结果图',
        minWidth: '480',
        render(row) {
          const imgs = row.resultImgs.slice(0, 4);
          return (
            <div class='tw-flex tw-flex-wrap tw-gap-2px'>
              {
                imgs.map((i, idx) => (
                  <el-image
                    src={resizeImgByWidth(i, 200)}
                    class='tw-w-100px tw-h-100px tw-rounded-4px tw-mr-12px'
                    fit='cover'
                    preview-src-list={row.resultImgs}
                    preview-teleported
                    initial-index={idx}
                  />
                ))
              }
            </div>
          );
        }
      },
      {
        label: '建议店铺',
        minWidth: '120',
        prop: 'shopName',
      },
      {
        label: '建议站点',
        minWidth: '120',
        prop: 'countryName',
      },
      {
        label: '开款信息',
        minWidth: '120',
        render(row) {
          const { paymenStatus, styleNum } = row;
          const { label, type } = OPEN_STYLE_STATUS_LIST.find(i => i.value === paymenStatus) ?? {};
          return (
            <div>
              <p>
                <span>开款状态：</span>
                {
                  row.paymenStatus === OPEN_STYLE_STATUS_ENUM.FAIL ? (
                    <el-tooltip content={row.styleEliminateReason}>
                      <el-text type={type}>{label}</el-text>
                    </el-tooltip>
                  ) : (<el-text type={type}>{label}</el-text>)
                }
              </p>
              {
                row.paymenStatus === OPEN_STYLE_STATUS_ENUM.SUCCESS ? (<p>{`款号：${styleNum}`}</p>) : null
              }
            </div>
          );
        },
      },
      {
        label: '选款信息',
        minWidth: '120',
        render(row) {
          const { selector, selectedTime } = row;
          return (
            <div>
              <p>{selector}</p>
              <p>{filters.formatTime(selectedTime)}</p>
            </div>
          );
        },
      },
      {
        label: '操作',
        width: '120',
        fixed: 'right',
        render(row) {
          return (
            <div>
              {
                XQ.value && (
                  <el-button
                    link
                    type='primary'
                    onClick={() => handleCheck(row.id)}
                  >
                    查看详情
                  </el-button>
                )
              }
            </div>
          );
        }
      },
    ];
  });

  return {
    tableColumns: columns,
  };
};
