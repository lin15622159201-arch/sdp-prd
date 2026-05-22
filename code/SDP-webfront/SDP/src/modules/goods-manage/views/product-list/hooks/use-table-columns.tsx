import { ScCopyText, useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { ElButton, ElTag, ElTooltip } from 'element-plus';
import { formatTime } from '@toy/utils';
import { usePermissionConfig } from '@/modules/goods-manage/use-permission-config';
import { useRouter } from 'vue-router';
import { filters } from '@/core/plugins/filter';
import type { IProductPageResItem, IProductPageResItemSkc } from '@/modules/goods-manage/api/product/type';
import { PRODUCT_STATUS_ENUM, PRODUCT_TAG_ENUM, SKC_STATUS_OPTIONS } from '../constant';
import { YES_NO_NUMBER_ENUM } from '@/constant';

type IColumnRender = (row: IRowData) => JSX.Element;
type IRowData = IProductPageResItem & IProductPageResItemSkc;
export const useTable = () => {
  const { BJSPSKC, BJSPIMG, BJSPCKXQ } = usePermissionConfig();
  const router = useRouter();

  const handleDetail = (row: IRowData) => {
    router.push({
      name: 'GoodsManageProductImgDetail',
      params: {
        styleId: row.styleId,
        mode: 'readonly',
      },
      query: {
        productId: row.productId,
      }
    });
  };

  const handleEdit = (row: IRowData) => {
    router.push({
      name: 'GoodsManageProductSkcEdit',
      params: {
        styleId: row.styleId,
        mode: 'goodsEdit',
      },
      query: {
        productId: row.productId,
      }
    });
  };

  const handleEditImg = (row: IRowData) => {
    router.push({
      name: 'GoodsManageProductImgEdit',
      params: {
        styleId: row.styleId,
        mode: 'goodsEditImg',
      },
      query: {
        productId: row.productId,
      }
    });
  };

  // 渲染款式信息
  const renderStyleInfo: IColumnRender = (row) => {
    const mainUrl = row.materialImgUrl;
    return (
      <div class='tw-flex tw-gap-2'>
        {mainUrl && (
          <el-image
            src={resizeImgByWidth(mainUrl, 200)}
            class='tw-w-88px tw-h-88px tw-rounded-4px'
            fit='contain'
            preview-src-list={[mainUrl]}
            preview-teleported
          />
        )}
        <div>
          <p>
            SPU：
            {row.styleCode && <ScCopyText class='tw-inline-block' text={row.styleCode || ''} />}
          </p>
          <p>
            品类：
            { row.categoryName }
          </p>
          {row.styleLabelName && (
            <p>
              { row.styleLabelName }
              { row.projectTypeName }
            </p>
          )}
          <p>
            平台SPU：
            { row.platformProductId }
          </p>
        </div>
      </div>
    );
  };

  // 商品标签
  const renderLabels: IColumnRender = (row) => {
    return (
      <div class='tw-flex tw-flex-wrap tw-gap-1'>
        {row.labels?.length ? row.labels.map((label) => {
          const type = label === PRODUCT_TAG_ENUM.TO_BE_UPDATED ? 'danger' : 'primary';
          return (
            <ElTag key={label} type={type}>
              {label}
            </ElTag>
          );
        }) : '-'}
      </div>
    );
  };

  // SKU
  const renderSKU: IColumnRender = (row) => {
    return (
      <div>{row.skus.length}</div>
    );
  };

  const renderInfoList = (infoList: {
    label?: string;
    prop: keyof IRowData;
    type?: 'copy';
    formatter?: (value: any) => string;
  }[]): IColumnRender => {
    return row => (
      <div>
        {infoList.map((info) => {
          const value = info.formatter ? info.formatter(row[info.prop]) : row[info.prop] as string;
          return (
            <p>
              {info.label ? `${info.label}：` : ''}
              {value && info.type === 'copy'
                ? <ScCopyText class='tw-inline-block' text={value || ''} />
                : value || '-'}
            </p>
          );
        })}
      </div>
    );
  };

  const { columns } = useTableColumns<IRowData>(() => [
    {
      type: 'selection',
      reserveSelection: true,
    },
    {
      label: '款式信息',
      width: 288,
      render: renderStyleInfo,
    },
    {
      label: '运营信息',
      width: 140,
      render: renderInfoList([
        { label: '店铺', prop: 'storeName' },
        { label: '运营人员', prop: 'businessOperatorName' },
      ]),
    },
    {
      label: '商品标签',
      width: 80,
      render: renderLabels,
    },
    {
      label: 'SKC',
      minWidth: 220,
      render: row => (
        <div>
          <p class='tw-mb-1'>
            {row.skcCode}
            {row.preDisassemblyState === YES_NO_NUMBER_ENUM.YES ? '（前置拆版）' : ''}
          </p>
          <p class='tw-mb-1'>{row.color}</p>
          <p>
            平台SKC：
            {row.platformSkcId}
          </p>
        </div>
      ),
    },
    {
      label: 'SKU',
      width: 80,
      render: renderSKU,
    },
    {
      label: '商品状态',
      width: 90,
      render: (row) => {
        return (
          <>
            <div>{filters.getEnumLabel(SKC_STATUS_OPTIONS, row.skcStatus) || '-'}</div>
            {
              row.productStatus === PRODUCT_STATUS_ENUM.EDIT_FAILED && (
                <ElTooltip
                  placement='top'
                  content={row.failMessage || '无'}
                >
                  <ElButton type='danger' text style={{ textDecoration: 'underline' }}>更新失败</ElButton>
                </ElTooltip>
              )
            }
          </>
        );
      },
    },
    {
      label: '设计师',
      width: 170,
      render: renderInfoList([
        { prop: 'designerGroupName' },
        { prop: 'designerName' },
      ]),
    },
    {
      label: '上架人员',
      width: 170,
      render: renderInfoList([
        { prop: 'onShelvesTime', formatter: formatTime },
        { prop: 'onShelvesName', label: '上架人' },
      ]),
    },
    {
      label: '创建信息',
      width: 170,
      render: renderInfoList([
        { prop: 'createdTime', formatter: formatTime },
        { prop: 'creatorName', label: '创建人' },
      ]),
    },
    {
      label: '操作',
      width: '100',
      fixed: 'right',
      render: row => (
        <div class='tw-flex tw-items-center tw-flex-wrap'>
          {BJSPCKXQ.value && (
            <el-button text type='primary' onClick={() => handleDetail(row)}>
              查看
            </el-button>
          )}
          {BJSPSKC.value && (
            <el-button text type='primary' onClick={() => handleEdit(row)}>
              编辑SKC
            </el-button>
          )}
          {BJSPIMG.value && (
            <el-button text type='primary' onClick={() => handleEditImg(row)}>
              编辑图片
            </el-button>
          )}
        </div>
      ),
    },
  ]);

  return {
    tableColumns: columns,
  };
};
