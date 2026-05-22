import { useList } from '@/hooks/use-list';
import { useDialog, useTableColumns } from '@toy/business-components';
import { getSpecialAccessories } from '@/modules/style-data-manage/dosage-account/api';
import {
  IGetSpecialAccessoriesReq,
} from '@/modules/style-data-manage/dosage-account/api/types';
import { IListItem } from './types';
import { ElMessage } from 'element-plus';
import { filters } from '@/core/plugins/filter';

interface IProps {
  onAdd: (row: IListItem) => void;
}
/** 新增特殊辅料弹窗 */
export const useAdd = (props: IProps) => {
  const { onAdd } = props;
  const handleAdd = (row: IListItem) => {
    onAdd(row);
    ElMessage.success('新增成功');
    closeDialog();
  };
  const {
    params,
    tableTotal,
    tableData,
    handleSearch,
    handleSizeChange,
    handleCurrentChange,
  } = useList<IListItem, IGetSpecialAccessoriesReq>({
    request: {
      api: getSpecialAccessories,
      params: {
        productName: '',
        pageNum: 1,
        pageSize: 10,
      },
    },
    response: {
      handleResponseData(list) {
        return list.map((v) => {
          let skuAttrsFormat: IListItem['skuAttrsFormat'] = [];
          try {
            skuAttrsFormat = JSON.parse(v.skuAttrs);
          } catch (error) {
            console.log(error);
          }
          return {
            ...v,
            skuAttrsFormat
          };
        });
      },
    },
  });

  const { columns } = useTableColumns<IListItem>(() => [
    {
      label: '物料信息',
      render(row) {
        return (
          <div>
            <div>
              SPU：
              {row.spuCode}
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
              {row.spuName}
            </div>
          </div>
        );
      },
    },
    {
      label: '图片',
      type: 'image',
      render(row) {
        return (
          <custom-image
            src={filters.ossUrl(row.pictureList?.[0])}
            preview-src-list={row.pictureList}
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
      label: '操作',
      width: 70,
      render(row) {
        return (
          <div>
            <el-button
              type='primary'
              text
              onClick={() => handleAdd(row)}
            >
              添加
            </el-button>
          </div>
        );
      },
    },
  ]);
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '添加特殊辅料',
    renderFooter: () => null,
    render() {
      return (
        <div>
          <el-form
            onSubmit={(e: Event) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <el-form-item label=''>
              <el-input
                class='tw-w-200px'
                placeholder='请搜索商品'
                v-model={params.value.productName}
              />
              <el-button
                type='primary'
                class='tw-ml-10px'
                onClick={() => handleSearch()}
              >
                搜索
              </el-button>
            </el-form-item>
          </el-form>
          <sc-table
            columns={columns.value}
            data={tableData.value}
            height='300'
          />
          <div class='tw-flex tw-flex-justify-end tw-pt-20px'>
            <pagination
              total={tableTotal.value}
              current-page={params.value.pageNum}
              size={params.value.pageSize}
              onCurrentChange={handleCurrentChange}
              onSizeChange={handleSizeChange}
            />
          </div>
        </div>
      );
    },
  }));
  /** 打开新增特殊辅料弹窗 */
  const openAddSpecialAccessoryDialog = () => {
    openDialog();
    handleSearch();
  };
  return {
    openAddSpecialAccessoryDialog
  };
};
