import { useDialog, useTableColumns } from '@toy/business-components';
import { computed, ref } from 'vue';
import styles from './index.module.scss';
import { useDiscarded } from '../use-discarded';
import { createSpu, getSuggestFabric, getTaskInfo } from '@/modules/design-center/inspiration-demand/api';
import { isEmpty } from '@toy/utils';
import { filters } from '@/core/plugins/filter';
import { ElMessage } from 'element-plus';
import { COMMODITY_TYPE_ENUM } from '@/modules/design-center/inspiration-demand/constant';
import { IDetail, IFabricItem } from './types';
import { resizeImgByWidth } from '@/core/plugins/helper';

interface IProps {
  reloadFn: () => void;
}

export const useDetail = (props: IProps) => {
  const { reloadFn } = props;
  const { handleDiscarded } = useDiscarded({
    reloadFn() {
      closeDialog();
      reloadFn();
    },
  });
  const isEdit = ref(false);
  const detail = ref<IDetail>();
  const selectedFabricId = ref('');
  const fabricList = ref<IFabricItem[]>([]);
  const handleSelectFabric = (id: string) => {
    if (id === selectedFabricId.value) {
      selectedFabricId.value = '';
    } else {
      selectedFabricId.value = id;
    }
  };
  const { columns } = useTableColumns<IFabricItem>(() => [
    {
      width: 50,
      render(row) {
        return (
          <el-checkbox
            model-value={selectedFabricId.value === row.suggestedMaterialId}
            onChange={() => handleSelectFabric(row.suggestedMaterialId!)}
            disabled={!isEdit.value}
          />
        );
      },
    },
    {
      label: '物料信息',
      render(row) {
        return (
          <div>
            <div>
              SPU：
              {row.materialInfo.commodityCode}
            </div>
            <div>
              SKU：
              {row.materialInfo.skuCode}
            </div>
            <div>
              货号：
              {row.materialInfo.commodityNumber}
            </div>
            {[
              COMMODITY_TYPE_ENUM.PURE,
              COMMODITY_TYPE_ENUM.SPECIAL_ACCESSORIES
            ].includes(row.materialInfo.commodityType!) && (
              <div>
                品名：
                {row.materialInfo.commodityName}
              </div>
            )}
            {row.materialInfo.commodityType === COMMODITY_TYPE_ENUM.FLOWER && (
              <div>
                品类：
                {row.materialInfo.flowerCategory}
              </div>
            )}
          </div>
        );
      },
    },
    {
      label: '图片',
      render(row) {
        return (
          <custom-image
            src={row.materialInfo.matchPictureList?.[0]}
            preview-src-list={row.materialInfo.matchPictureList}
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
            <div>
              幅宽：
              {row.materialInfo.widthStrFormat}
            </div>
            <div>
              克重：
              {row.materialInfo.weightStrFormat}
            </div>
            <div>
              颜色：
              {row.materialInfo.colorName}
              {row.materialInfo.colorNumber}
            </div>
          </div>
        );
      },
    },
    {
      label: '成分/材质',
      render(row) {
        return (
          <div>
            {row.materialInfo.materialFormat.map(v => (
              <div>
                {v.name}
                ：
                {v.percent}
                %
              </div>
            ))}
          </div>
        );
      },
    },

    {
      label: '价格信息',
      render(row) {
        return (
          <div>
            <div>
              足米价：
              {row.materialInfo.meterPrice}
              /
              {row.materialInfo.meterPriceUnit}
            </div>
            <div>
              空差：
              {row.materialInfo.matchPurchaseGap}
            </div>
          </div>
        );
      },
    },
  ]);
  const formatLink = computed(() => {
    if (!detail.value?.productLink) return '';
    if (detail.value?.productLink?.length > 50) {
      return `${detail.value?.productLink?.substring(0, 50)}...`;
    }
    return detail.value?.productLink;
  });
  const handleConfirm = async () => {
    let suggestedMaterialId = '';
    let skuCode = '';
    let spuCode = '';
    if (selectedFabricId.value) {
      const row = fabricList.value.find(v => v.suggestedMaterialId === selectedFabricId.value);
      if (row) {
        suggestedMaterialId = selectedFabricId.value;
        spuCode = row.materialInfo?.commodityCode!;
        skuCode = row.materialInfo?.skuCode!;
      }
    }
    await createSpu({
      designDemandId: detail.value?.designDemandId!,
      suggestedMaterialId,
      skuCode,
      spuCode,
    });
    ElMessage.success('开款成功');
    closeDialog();
    reloadFn();
  };
  const { openDialog, closeDialog } = useDialog(() => ({
    title: '灵感详情',
    width: 1000,
    onClose() {
      fabricList.value = [];
      selectedFabricId.value = '';
    },
    renderFooter: () => {
      return (
        isEdit.value && (
          <div class='tw-flex tw-flex-justify-end'>
            <el-button
              type='danger'
              onClick={() => handleDiscarded([detail.value?.designDemandId!])}
            >
              淘汰
            </el-button>
            <el-button
              type='primary'
              onClick={handleConfirm}
            >
              开款
            </el-button>
          </div>
        )
      );
    },
    render() {
      return (
        <div class={styles.container}>
          <div class={styles.container_info}>
            <div class={styles.container_info_header}>
              <div class={styles.left}>
                <div class={styles.id}>{detail.value?.inspirationStyleId}</div>
                <el-tag class={styles.tag}>{detail.value?.supplyModeName}</el-tag>
                {!isEmpty(detail.value?.styleCode) && (
                  <div class={styles.status}>
                    已开款：
                    {detail.value?.styleCode}
                  </div>
                )}
              </div>
              {!isEmpty(detail.value?.chosenId) && (
                <div class={styles.right}>
                  {detail.value?.chosenName}
                  <span class='tw-px-5px'>
                    {filters.formatTime(detail.value?.chosenTime, 'YYYY-MM-DD')}
                  </span>
                  选中
                </div>
              )}
            </div>
            <div class={styles.container_info_main}>
              <div class='tw-flex'>
                <div class='tw-flex'>
                  <div class='tw-w-70px tw-text-right tw-pr-10px'>灵感图</div>
                  <custom-image
                    src={resizeImgByWidth(detail.value?.demandDetailInfo?.originalImage, 300)}
                    preview-src-list={[detail.value?.demandDetailInfo?.originalImage]}
                    class='tw-w-120px tw-h-120px'
                    fit='cover'
                  />
                </div>
                <div
                  class='tw-flex tw-flex-wrap tw-gap-x-10px tw-gap-y-20px tw-pl-40px tw-flex-content-start tw-flex-1'
                >
                  <div class='tw-w-32%'>
                    波段：
                    {detail.value?.waveBandName}
                  </div>
                  <div class='tw-w-32%'>
                    国家：
                    {detail.value?.countrySiteName}
                  </div>
                  <div class='tw-w-32%'>
                    店铺：
                    {detail.value?.storeName}
                  </div>
                  <div class='tw-w-32%'>
                    风格：
                    {detail.value?.suggestedStyle}
                  </div>
                  <div class='tw-w-32%'>
                    场景：
                    {detail.value?.sceneName}
                  </div>
                  <div class='tw-w-32%'>
                    货盘类型：
                    {detail.value?.palletTypeName}
                  </div>
                  <div class='tw-w-32%'>
                    品类：
                    {detail.value?.categoryName}
                  </div>
                  <div class='tw-w-32%'>
                    期望成本：
                    {detail.value?.supplyModeCode === 'imitation'
                      ? detail.value?.expectedCostPrice
                      : detail.value?.sellingPrice}
                    元
                  </div>
                  <div class='tw-w-32%'>
                    企划来源：
                    {detail.value?.planningSourceName}
                  </div>
                  <div class='tw-w-32%'>
                    灵感图来源：
                    {detail.value?.inspirationImageSource}
                  </div>
                  <div class='tw-w-32%'>
                    灵感源品牌：
                    {detail.value?.inspirationBrand}
                  </div>
                  <div class='tw-w-100% tw-flex-center-y'>
                    源链接：
                    <el-link
                      href={detail.value?.productLink}
                      underline={false}
                      type='primary'
                    >
                      {formatLink.value}
                    </el-link>
                  </div>
                  <div class='tw-w-100% tw-flex-center-y'>
                    备注：
                    {detail.value?.aigcRemark}
                  </div>
                </div>
              </div>
              <div class='tw-flex tw-pt-20px'>
                <div class='tw-w-70px tw-text-right tw-pr-10px'>商品图</div>
                <div class='tw-flex tw-gap-10px tw-flex-wrap'>
                  {detail.value?.demandDetailInfo?.inspirationImageList.map((v, i) => (
                    <custom-image
                      src={resizeImgByWidth(v, 300)}
                      key={v}
                      preview-src-list={detail.value?.demandDetailInfo?.inspirationImageList}
                      class='tw-w-120px tw-h-120px'
                      fit='cover'
                      initial-index={i}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div class={styles.container_fabric}>
            <div class={styles.container_fabric_header}>
              <div class={styles.title}>
                推荐面料
              </div>
              {isEdit.value && (
                <div class={styles.sub}>可选择一个面料，提交后将同步至BOM中</div>
              )}
            </div>
            <sc-table
              columns={columns.value}
              data={fabricList.value}
            />
          </div>

        </div>
      );
    },
  }));
  const handleDetail = async (designDemandId: string, edit: boolean) => {
    const { data } = await getTaskInfo({
      designDemandId
    });
    const { data: fabricData = [] } = await getSuggestFabric({
      designDemandId
    });
    isEdit.value = edit;
    fabricList.value = fabricData.map((v) => {
      let materialFormat = [];
      try {
        materialFormat = JSON.parse(v.materialInfo.material!);
      } catch (error) {
        console.log('error');
      }
      return {
        ...v,
        materialInfo: {
          ...v.materialInfo,
          materialFormat,
        }
      };
    });
    detail.value = data;
    openDialog();
  };
  return {
    handleDetail,
    handleDiscarded
  };
};
