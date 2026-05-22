import { useDialog, useTableColumns } from '@toy/business-components';
import { ref, ComputedRef } from 'vue';
import { pickingStyleHistory } from '@/modules/selection-manage/aigc-selection-list/api';
import {
  IPickingStyleHistoryItem,
  IPickingStylePageResListItem,
} from '@/modules/selection-manage/aigc-selection-list/api/type';
import { PICK_STATE_ENUM } from '@/modules/selection-manage/aigc-selection-list/constant';
import { resizeImgByWidth } from '@/core/utils/helper';
import { IDictionaryItem } from '@/hooks/use-dictionary2/types';
import { filters } from '@/core/plugins/filter';

export type HandleOpenDialog = (row: IPickingStylePageResListItem) => void;

export const useRecordDialog = (config?: Record<string, ComputedRef<IDictionaryItem[]>>) => {
  const { columns } = useTableColumns<IPickingStyleHistoryItem>(() => {
    return [
      {
        label: ('选款结果'),
        minWidth: '160',
        render(row) {
          const target = row.pickingStyleResults.filter(i => i.pickingState === PICK_STATE_ENUM.YES)
            .map(i => i.serialNum).sort((a, b) => +a - +b);
          return `${('可用')}：${target.join('、')}`;
        },
      },
      {
        label: ('详情'),
        minWidth: '200',
        render: (row) => {
          const target = row.pickingStyleResults.filter(i => i.pickingState === PICK_STATE_ENUM.YES)
            .sort((a, b) => +a.serialNum - +b.serialNum)
            .map((i) => {
              const desc = [`${('款')}${i.serialNum} ${('可用')}`];
              i.suggestedPrice && desc.push(`${('建议价格')}：${i.suggestedPrice}`);
              i.suggestedStyleName && desc.push(`${('建议风格')}：${i.suggestedStyleName}`);
              i.suggestedCategoryName && desc.push(`${('建议类目')}：${i.suggestedCategoryName}`);
              i.suggestedWaveBatchName && desc.push(`${('建议波段')}：${i.suggestedWaveBatchName}`);
              i.suggestedShopName && desc.push(`${('建议店铺')}：${i.suggestedShopName}`);
              i.suggestedCountrySiteName && desc.push(`${('建议国家')}：${i.suggestedCountrySiteName}`);
              i.suggestedPrintingName && desc.push(`${('建议印花')}：${i.suggestedPrintingName}`);
              return desc;
            });
          return (
            <div>
              {
                target.map((i, idx) => (
                  <p>
                    <span>{i.join('、')}</span>
                    <span>{idx === target.length - 1 ? '。' : '；'}</span>
                  </p>
                ))
              }
            </div>
          );
        }
      },
      {
        label: ('附件'),
        minWidth: '200',
        render: (row) => {
          const target = row.pickingStyleResults.filter((i) => {
            return i.pickingState === PICK_STATE_ENUM.YES && i.attachments;
          }).map(i => i.attachments.map(j => j.fileUrl)).flat();
          return (
            <div class='tw-flex'>
              {
                target.map(i => (
                  <div class='tw-w-60px tw-mr-10px'>
                    <el-image
                      src={resizeImgByWidth(i, 300)}
                      class='tw-w-100%'
                      fit='cover'
                      preview-src-list={target}
                      preview-teleported
                    />
                  </div>
                ))
              }
            </div>
          );
        }
      },
      {
        label: `${('选款人')}/${('选款日期')}`,
        minWidth: '200',
        render: row => (
          <div>
            <p>{`${('选款人')}：${row.selectorName}`}</p>
            <p>{`${('选款日期')}：${filters.formatTime(row.selectionTime)}`}</p>
          </div>
        )
      },
    ];
  });

  const tableData = ref<IPickingStyleHistoryItem[]>([]);

  const { openDialog } = useDialog(() => ({
    title: ('选图记录'),
    render() {
      return (
        <sc-table
          maxHeight={480}
          data={tableData.value}
          columns={columns.value}
        />
      );
    },
    renderFooter: () => null,
  }));

  const handleOpenDialog: HandleOpenDialog = async (row) => {
    const { data } = await pickingStyleHistory(row.pickingId);
    tableData.value = data;
    openDialog();
  };

  return {
    handleOpenDialog
  };
};
