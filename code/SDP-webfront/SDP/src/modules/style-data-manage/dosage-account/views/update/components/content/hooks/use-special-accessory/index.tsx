import { useTableColumns } from '@toy/business-components';
import { useAdd } from './use-add';
import { IDetail } from '../../../../types';
import { useDictionary } from '@/hooks/use-dictionary';
import { computed, Ref } from 'vue';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IListItem } from './types';
import { isEmpty } from '@toy/utils';
import { filters } from '@/core/plugins/filter';

interface IProps {
  /** 新增特殊辅料 */
  handleAddSpecialAccessory: (row: IListItem) => void;
  handleDeleteSpecialAccessory: (index: number) => void;
  readOnly: Ref<boolean>;
}

/** 特殊辅料 */
export const useSpecialAccessory = (props: IProps) => {
  const { handleAddSpecialAccessory, handleDeleteSpecialAccessory, readOnly } = props;
  const { getDictionaryOptions } = useDictionary();
  const PLM_PURCHASE_YLBW = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_PURCHASE_YLBW));
  const { openAddSpecialAccessoryDialog } = useAdd({
    onAdd: handleAddSpecialAccessory,
  });
  const { columns: specialAccessoryColumns } = useTableColumns<IDetail['specialMaterialList'][0]>(() => [
    {
      label: '物料项目',
      prop: 'prototypeMaterialName'
    },
    {
      label: '物料信息',
      render(row) {
        return (
          <div>
            <div>
              SPU：
              {row.commodityCode}
            </div>
            <div>
              SKU：
              {row.skuCode}
            </div>
            <div>
              货号：
              {row.commodityNumber}
            </div>
            <div>
              品名：
              {row.commodityName}
            </div>
          </div>
        );
      },
    },
    {
      label: '图片',
      render(row) {
        return (
          <custom-image
            src={filters.ossUrl(row.matchPictureList?.[0])}
            preview-src-list={row.matchPictureList}
            class='tw-w-80px tw-h-80px'
          />
        );
      },
    },
    {
      label: '物料属性',
      render(row) {
        return (
          <div>
            {row.skuAttrsFormat.map(v => (
              <div key={v.attrId}>
                {v.attrName}
                ：
                {v.attrValue}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      renderHeader() {
        return (
          <div class='required'>使用部位</div>
        );
      },
      render(row, _, index) {
        return (
          <el-form-item
            prop={`specialMaterialList[${index}].partUse`}
            rules={{
              required: true,
              message: '',
            }}
          >
            <el-select
              v-model={row.partUse}
              disabled={readOnly.value || !isEmpty(row.partUseName)}
              multiple
            >
              {PLM_PURCHASE_YLBW.value.map(v => (
                <el-option
                  key={v.value}
                  value={v.value}
                  label={v.label}
                />
              ))}
            </el-select>
          </el-form-item>
        );
      },
    },
    {
      renderHeader() {
        return (
          <div class='required'>核算用量</div>
        );
      },
      render(row, _, index) {
        return (
          <el-form-item
            prop={`specialMaterialList[${index}].dosageAccount`}
            rules={{
              required: true,
              message: '',
            }}
          >
            <input-number
              v-model={row.dosageAccount}
              disabled={readOnly.value}
              min={0.01}
              max={999.99}
              precision={2}
              v-slots={{
                suffix: () => row.dosageAccountUnit
              }}
            />
          </el-form-item>
        );
      },
    },
    {
      label: '单件用量',
      render(row) {
        return `${row.dosageAccount}${row.dosageAccountUnit}`;
      },
    },
    {
      renderHeader() {
        return (
          <div class='required'>损耗</div>
        );
      },
      render(row, _, index) {
        return (
          <el-form-item
            prop={`specialMaterialList[${index}].attritionRate`}
            rules={{
              required: true,
              message: '',
            }}
          >
            <input-number
              v-model={row.attritionRate}
              disabled={readOnly.value}
              min={0}
              max={100}
              precision={2}
              v-slots={{
                suffix: () => '%'
              }}
            />
          </el-form-item>
        );
      },
    },
    {
      label: '操作',
      width: 50,
      render(_row, _columns, index) {
        return (
          <div>
            <el-button
              type='danger'
              text
              disabled={readOnly.value}
              onClick={() => handleDeleteSpecialAccessory(index)}
            >
              删除
            </el-button>
          </div>
        );
      },
    },
  ]);
  return {
    specialAccessoryColumns,
    openAddSpecialAccessoryDialog
  };
};
