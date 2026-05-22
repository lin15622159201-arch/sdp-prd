import { ScCopyText, useTableColumns } from '@toy/business-components';
import { resizeImgByWidth } from '@/core/utils/helper';
import { ElButton, ElLink, ElTooltip } from 'element-plus';
import { formatTime } from '@toy/utils';
import { usePermissionConfig } from '@/modules/goods-manage/use-permission-config';
import type { IStyleOnShelvesPageItem as IPageItem } from '@/modules/goods-manage/api/listing/type';
import { useRouter } from 'vue-router';
import {
  RELEASE_STATUS_ENUM,
  RELEASE_STATUS_LIST,
  REVIEW_STATUS_ENUM,
  REVIEW_STATUS_LIST,
  SHOP_REVIEW_STATUS_ENUM,
} from '@/modules/goods-manage/constant';
import { filters } from '@/core/plugins/filter';
import { YES_NO_NUMBER_ENUM } from '@/constant';

type IColumnRender = (row: IPageItem) => JSX.Element;
export const useTable = () => {
  const { SH, BJ, CK } = usePermissionConfig();
  const router = useRouter();

  const handleDetail = (row: IPageItem) => {
    router.push({
      name: 'GoodsManageApproveDetailIng',
      params: {
        styleId: row.styleId,
        mode: 'readonly',
      },
    });
  };

  const handleApprove = (row: IPageItem) => {
    router.push({
      name: 'GoodsManageApproveListing',
      params: {
        styleId: row.styleId,
      },
    });
  };

  const handleEdit = (row: IPageItem) => {
    router.push({
      name: 'GoodsManageApproveEdit',
      params: {
        styleId: row.styleId,
      },
      query: {
        type: 'edit',
      },
    });
  };
  // 渲染款式信息
  const renderStyleInfo: IColumnRender = (row) => {
    // 优先用 skc 的主图
    let mainUrl = row.skcList?.[0].mainImgUrl;
    if (!mainUrl) {
      // 如果 skc 主图不存在，则用skc的第一张图片
      const pic = row.skcList?.[0].pictures?.find(img => String(img.materialType) === '0');
      if (pic) {
        mainUrl = pic.cropImgUrl || pic.pictureUrl;
      }
    }
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
            {row.categoryName}
          </p>
          {(row.styleLabelName || row.projectTypeName) && (
            <p>
              { row.styleLabelName }
              { row.projectTypeName }
            </p>
          )}
          {row.waveBandName && <p>{row.waveBandName}</p>}
        </div>
      </div>
    );
  };

  // 审核状态
  const renderAuditState: IColumnRender = (row) => {
    return (
      <div>
        {filters.getEnumLabel(REVIEW_STATUS_LIST, row.reviewStatus)}
        {row.reviewStatus === REVIEW_STATUS_ENUM.REJECTED && (
          <ElTooltip content={row.reviewFailReason} placement='top'>
            <ElLink type='primary' class='tw-ml-1'>
              原因
            </ElLink>
          </ElTooltip>
        )}
        {row.shopReviewStatus === SHOP_REVIEW_STATUS_ENUM.REJECTED && (
          <ElTooltip
            placement='top'
            v-slots={{
              content: () => (
                <span>
                  驳回原因：
                  {row.shopReviewFailReason || '无'}
                  <br />
                  审核人：
                  {row.shopReviewUserName || '无'}
                  <br />
                  审核时间：
                  {row.shopReviewTime ? formatTime(row.shopReviewTime) : '无'}
                </span>
              ),
            }}
          >
            <ElButton type='danger' text style={{ textDecoration: 'underline' }}>
              店主已驳回
            </ElButton>
          </ElTooltip>
        )}
        {row.shopReviewStatus === SHOP_REVIEW_STATUS_ENUM.PASS && (
          <ElTooltip
            placement='top'
            v-slots={{
              content: () => (
                <span>
                  审核人：
                  {row.shopReviewUserName || '无'}
                  <br />
                  审核时间：
                  {row.shopReviewTime ? formatTime(row.shopReviewTime) : '无'}
                </span>
              ),
            }}
          >
            <ElButton type='primary' text style={{ textDecoration: 'underline' }}>
              店主已审核
            </ElButton>
          </ElTooltip>
        )}
      </div>
    );
  };

  // 上架状态
  const renderShelfState: IColumnRender = (row) => {
    return (
      <div>
        {filters.getEnumLabel(RELEASE_STATUS_LIST, row.releaseStatus)}
        {row.releaseStatus === RELEASE_STATUS_ENUM.RELEASE_FAILED && (
          <ElTooltip content={row.releaseFailReason} placement='top'>
            <ElLink type='primary' class='tw-ml-1'>
              原因
            </ElLink>
          </ElTooltip>
        )}
      </div>
    );
  };

  const renderInfoList = (
    infoList: {
      label?: string;
      prop: keyof IPageItem;
      type?: 'copy';
      formatter?: (value: any) => string;
    }[],
  ): IColumnRender => {
    return row => (
      <div>
        {infoList.map((info) => {
          const value = info.formatter ? info.formatter(row[info.prop]) : (row[info.prop] as string);
          return (
            <p>
              {info.label ? `${info.label}：` : ''}
              {value && info.type === 'copy' ? <ScCopyText class='tw-inline-block' text={value || ''} /> : value || '-'}
            </p>
          );
        })}
      </div>
    );
  };

  const { columns } = useTableColumns<IPageItem>(() => [
    {
      type: 'selection',
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
        { label: '平台', prop: 'productPlatformName' },
        { label: '店铺', prop: 'storeName' },
        { label: '运营人员', prop: 'operationUserName' },
      ]),
    },
    {
      label: '审核状态',
      width: 100,
      render: renderAuditState,
    },
    {
      label: 'SKC',
      minWidth: 240,
      render: row => (
        <div>
          {row.skcList?.map(skc => (
            <p key={skc.skcCode} class='tw-mb-1'>
              {`${skc.skcCode} / ${skc.color}${skc.preDisassemblyState === YES_NO_NUMBER_ENUM.YES ? '（前置拆版）' : ''}`}
            </p>
          ))}
        </div>
      ),
    },
    {
      label: '发布状态',
      width: 80,
      render: renderShelfState,
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
      label: '审核信息',
      width: 170,
      render: renderInfoList([
        { prop: 'reviewTime', formatter: formatTime },
        { prop: 'reviewUserName', label: '审核人' },
      ]),
    },
    {
      label: '操作',
      width: '100',
      fixed: 'right',
      render: row => (
        <div class='tw-flex tw-items-center tw-flex-wrap'>
          {CK.value && (
            <el-button text type='primary' onClick={() => handleDetail(row)}>
              查看
            </el-button>
          )}
          {SH.value && row.reviewStatus === REVIEW_STATUS_ENUM.PENDING && (
            <el-button text type='primary' onClick={() => handleApprove(row)}>
              审核
            </el-button>
          )}
          {BJ.value
            && row.reviewStatus === REVIEW_STATUS_ENUM.APPROVED
            && [RELEASE_STATUS_ENUM.RELEASE_FAILED, RELEASE_STATUS_ENUM.PENDING].includes(row.releaseStatus) && (
            <el-button text type='primary' onClick={() => handleEdit(row)}>
              编辑
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
