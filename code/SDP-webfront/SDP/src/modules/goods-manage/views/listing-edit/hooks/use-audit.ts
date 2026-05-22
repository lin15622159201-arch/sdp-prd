import { ref, type Ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useHandleBack } from '@/hooks/use-handle-back';
import { fetchStyleOnShelvesPage } from '@/modules/goods-manage/api/listing';
import { productCreateApi, productSkcUpsertApi, productFileEditApi } from '../api/index';
import { REVIEW_STATUS_ENUM } from '@/modules/goods-manage/constant';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from './use-form';
import {
  ProductCreateReqSkcReqsItem,
  ProductCreateReqSizeReqsItem2,
  ProductCreateReqSpecAttrsItem,
  ProductCreateReq,
  ProductFileEditReqSkcsItem,
} from '../api/types';
import { useContext } from './use-context';
import { isArray } from 'xe-utils';

type UseAuditOptions = {
  isNext: Ref<boolean>;
  styleId: Ref<string>;
  beforeSubmit?: (isValida?: Boolean) => Promise<boolean | undefined>;
};

export const useAudit = ({ isNext, beforeSubmit }: UseAuditOptions) => {
  const router = useRouter();
  const route = useRoute();
  const { handleBack } = useHandleBack('GoodsManagePendingListing');
  const rejectDialogVisible = ref(false);
  const { isGoodsEdit, goodsEditImg } = useContext();
  const openRejectDialog = () => {
    rejectDialogVisible.value = true;
  };
  // 尺码去重函数
  const deduplicateSizeSpecs = (arr: any) => {
    const sizeNameSet = new Set();
    return arr.filter((item: any) => {
      if (item.parentSpecName === '尺码') {
        const normalizedName = item.name.toUpperCase();
        if (!sizeNameSet.has(normalizedName)) {
          sizeNameSet.add(normalizedName);
          return true;
        }
        return false;
      }
      return true;
    });
  };
  const {
    formRef,
    formData,
    tableSizeData,
    formAttrsData,
    sizeList,
    tableDataList,
    form,
    detailData,
    colorOptions,
    temuReviewDatas,
    productId,
    refreshMaterialImgUrl,
    videoUrl,
    skcList,
    sizeParts,
    ruleForm,
    warehouseList,
    suiting,
  } = useForm();
  // 审核下一个待审核的款式
  const goNext = async () => {
    // 查询待审核款式列表，取第一个
    const { data } = await fetchStyleOnShelvesPage({
      pageNum: 1,
      pageSize: 1,
      reviewStatus: REVIEW_STATUS_ENUM.PENDING,
      styleCode: route.query.spuCodes as string
    });
    const nextStyleId = data.list?.[0]?.styleId;
    if (!nextStyleId) {
      ElMessage.info('没有更多待审核的款式了');
      handleBack();
      return;
    }
    formData.value = {} as any;
    formRef.value = null;
    tableSizeData.value = [];
    temuReviewDatas.value = {};
    detailData.value = {} as any;
    sizeList.value = [];
    form.value = {
      warehouseIds: [{
        warehouseId: [],
      }],
    } as any;
    sizeParts.value = [];
    warehouseList.value = [];
    tableDataList.value = [
      {
        tableData: [],
        sizeParts: JSON.parse(JSON.stringify(sizeParts.value)),
        show: 'YES',
        name: '',
      }
    ];
    router.replace({
      name: 'GoodsManageApproveListing',
      params: {
        styleId: data.list[0].styleId,
      },
      query: route.query
    });
  };

  // 驳回成功后的操作
  const onRejectSuccess = async () => {
    if (isNext.value) {
      goNext();
    } else {
      handleBack();
    }
  };

  const processData = (isEith = false) => {
    const sizeReqs: ProductCreateReqSizeReqsItem2[] = [];
    const specAttrs: ProductCreateReqSpecAttrsItem[] = [];
    tableDataList.value.forEach((size: any) => {
      const sizeReqsItem: any = [];
      size.tableData.forEach((s: any, i: number) => {
        if (s.size !== '档差') {
          sizeReqsItem.push({
            size: s.size,
            platformSize: s.size,
            values: (size.sizeParts || []).filter((v1: { checked: boolean; }) => v1.checked).map((v2: { field: string; label: string; }) => {
              return {
                part: v2.field,
                partName: v2.label,
                value: s[v2.field],
                diff: size.tableData[i - 1] ? size.tableData[i - 1][v2.field] : '',
              };
            }),
            elementList: (size.sizeParts || []).filter((v1: { checked: boolean; }) => v1.checked).map((v2: { field: string; label: string; }) => {
              return {
                id: v2.field,
                name: v2.label,
              };
            }),
          });
        }
      });
      sizeReqs.push({
        name: size.name,
        show: size.show,
        sizeReqs: sizeReqsItem,
        elementList: (size.sizeParts || []).filter((v1: { checked: boolean; }) => v1.checked).map((v2: { field: string; label: string; }) => {
          return {
            id: v2.field,
            name: v2.label,
          };
        }),
      });
    });
    const skcReqs: ProductCreateReqSkcReqsItem[] = [];
    formData.value.skcList.forEach((v: any) => {
      let coloItem: ProductCreateReqSpecAttrsItem = {};
      colorOptions.value.forEach((co: any) => {
        if (co.children.find((c1: { name: string; }) => c1.name === v.platformColor)) {
          coloItem = co.children.find((c1: { name: string; }) => c1.name === v.platformColor);
          specAttrs.push(coloItem);
        }
      });
      const { skcId, skcCode } = v;
      const temuItemDatas: any = temuReviewDatas.value?.skcReqs?.find(rItem => rItem.skcCode === v.skcCode) ?? {};
      skcReqs.push({
        ...temuItemDatas,
        // skcState: temuItemDatas?.skcState === 0 ? 0 : undefined,
        // skcState: isEith ? undefined : 0,
        skcState: undefined,
        skcId,
        skcCode,
        color: v.color,
        platformColor: v.platformColor,
        // mainSpecReqs: temuItemDatas?.skcState === 0 ? [
        //   {
        //     parentSpecId: '1001',
        //     parentSpecName: '颜色',
        //     specId: coloItem?.specId,
        //     specName: coloItem?.name,
        //   }
        // ] : null,
        mainSpecReqs: [
          {
            parentSpecId: '1001',
            parentSpecName: '颜色',
            specId: coloItem?.specId,
            specName: coloItem?.name,
          }
        ],
        mainSpecs: undefined,
        skuReqs: sizeList.value.filter((v2: { checked: boolean; }) => v2.checked).map((v1: ProductCreateReqSpecAttrsItem, i1: number) => {
          specAttrs.push(v1);
          const sizeSata: any = tableSizeData.value.find(codes => (codes.skc.skcCode === v.skcCode) && codes.size === v1.name);
          const spuItems = temuItemDatas.skuReqs?.find((temuItem: any) => temuItem.productSkuId === sizeSata.productSkuId);
          const warehouseIdArr = form.value?.warehouseIds?.[0]?.warehouseId ?? [];
          return {
            ...spuItems,
            skuState: undefined,
            // skuState: isEith ? undefined : (!sizeSata.platformSku ? 0 : null),
            skuId: v?.skuList?.find((v5: { sizeName: string; }) => v5.sizeName === v1.name)?.skuId,
            skuCode: v?.skuList?.find((v5: { sizeName: string; }) => v5.sizeName === v1.name)?.skuCode,
            supplierPrice: sizeSata.suggestedPrice,
            skuWeightValue: sizeSata.weight,
            // eslint-disable-next-line @typescript-eslint/dot-notation
            len: sizeSata['length'],
            width: sizeSata.width,
            height: sizeSata.height,
            numberOfPieces: sizeSata.numberOfPieces,
            packingList: sizeSata.packingList.filter((pl: any) => pl.catId || pl.catName || pl.numberOfPieces)?.length ? sizeSata.packingList.filter((pl: any) => pl.catId || pl.catName || pl.numberOfPieces) : null,
            numberOfPack: sizeSata.numberOfPack,
            individuallyPacked: sizeSata.individuallyPacked,
            skuClassification: sizeSata.skuCategory,
            warehouseStockQuantityReqs: (warehouseIdArr || []).map((wId: string) => {
              return {
                targetStockAvailable: sizeSata[wId],
                warehouseId: wId,
              };
            }),
            skuSpecReqs: [
              {
                specId: v1.specId, // temu返回尺寸的specId
                specName: v1.name,
                parentSpecId: '3001',
                parentSpecName: '尺码',
              },
              {
                parentSpecId: '1001',
                parentSpecName: '颜色',
                specId: coloItem?.specId,
                specName: coloItem?.name,
              }
            ],
          };
        }),
        images: v.selectedPictures.map((v4: { url: string; }) => {
          return v4.url;
        }),
      });
    });
    return {
      skcReqs,
      sizeReqs,
      specAttrs,
    };
  };
  const areStringArraysEqual = (arr1: string[], arr2: string[]) => arr1.length === arr2.length && arr1.every((item, idx) => item === arr2[idx]);
  // 编辑
  const isPass = ref<any>(true);
  const handlePassEdit = () => {
    isNext.value = false;
    handlePass('', true);
  };
  // 暂存
  const handleTemporaryStorage = () => {
    handlePass('', false, false);
  };
  // 审核通过
  const handlePass = async (e: any, isEith = true, isTemporaryStorage = true) => {
    // 提交前的校验钩子
    const canSubmit = isTemporaryStorage ? (beforeSubmit ? await beforeSubmit() : true) : true;
    // 兼容暂存  需求清空
    if (!isTemporaryStorage) {
      beforeSubmit && await beforeSubmit(false);
      ruleForm.value?.clearValidate();
    }
    if (!canSubmit && isTemporaryStorage) return;
    if (!tableDataList.value.some(s => s.show === 'YES') && isTemporaryStorage) {
      ElMessage.error('至少勾选一个重要部位');
      return;
    }
    if (tableDataList.value.filter(s => s.show === 'YES').length > 5 && isTemporaryStorage) {
      ElMessage.error('最多勾选5个重要部位');
      return;
    }

    if (suiting.value === 1 && tableDataList.value?.some(s => !s.name)) {
      ElMessage.error('套装品类必须使用模板');
      return;
    }
    
    
    const { specAttrs, skcReqs, sizeReqs } = processData(isEith);
    if (sizeReqs.some(v => !v.elementList.length)) {
      ElMessage.error('请完善尺码表信息');
      return;
    }
    await productCreateApi({
      skcReqs,
      sizeReqs,
      specAttrs: deduplicateSizeSpecs(specAttrs.map((sep) => {
        return {
          ...sep,
          propValue: sep.name,
          specName: sep.name,
        };
      })), // 销售属性
      attrs: formAttrsData.value,
      siteIds: [form.value?.siteIds],
      warehouseIds: form.value?.warehouseIds?.[0]?.warehouseId ?? [],
      sizes: sizeList.value.filter((v2: { checked: boolean; }) => v2.checked).map((v3: { value: string; }) => v3.value),
      video: {
        videoUrl: form.value?.video?.[0]?.url ?? '',
      },
      sizeImages: detailData.value?.sizeImageList ?? [],
      freightTemplateId: formData.value.freightTemplateId,
      promisedDeliveryDay: formData.value.promisedDeliveryDay,
      materialImgUrl: form.value.materialImgUrl,
      productEnName: form.value.productEnName,
      productName: form.value.productName,
      catName: form.value.catName,
      catId: form.value.catId,
      styleId: detailData.value?.styleId ?? '',
      styleCode: detailData.value?.styleCode ?? '',
      storeId: detailData.value?.storeId ?? '',
      reviewFailReason: '',
      pass: isTemporaryStorage ? true : undefined,
      styleImgUrl: detailData.value?.skcList[0]?.pictures?.find(r => r.materialType === 0)?.pictureUrl
    });
    ElMessage.success(`${isTemporaryStorage ? '操作' : '暂存'}成功`);
    if (!isTemporaryStorage) return;
    isPass.value = true;
    if (isNext.value) {
      goNext();
    } else {
      handleBack();
    }
  };
  // 保存skc/图片
  const handleSkc = async () => {
    if (isGoodsEdit.value) {
      // 提交前的校验钩子
      const canSubmit = beforeSubmit ? await beforeSubmit() : true;
      if (!canSubmit) return;
      const data = processData(false);
      if (!tableDataList.value.some(s => s.show === 'YES')) {
        ElMessage.error('至少勾选一个重要部位');
        return;
      }
      let { specAttrs, skcReqs } = data;
      const { sizeReqs } = data;
      specAttrs = specAttrs.map((size1) => {
        const sItem = temuReviewDatas.value?.specAttrs?.find(s1 => s1.propValue === size1.name) ?? {};
        return {
          ...sItem,
          ...size1,
          propValue: size1.name,
          specName: size1.name,
        };
      });
      skcReqs = skcReqs.map((s1) => {
        const sItem = temuReviewDatas.value?.skcReqs?.find(s2 => s2.skcCode === s1.skcCode) ?? {};
        return {
          ...sItem,
          ...s1,
        } as any;
      });
      const datas = {
        ...temuReviewDatas.value,
        sizes: sizeList.value.filter((v2: { checked: boolean; }) => v2.checked).map((v3: { value: string; }) => v3.value),
        video: {
          videoUrl: temuReviewDatas.value?.videoUrl ?? ''
        },
        specAttrs: deduplicateSizeSpecs(specAttrs),
        skcReqs,
        sizeReqs,
        skcs: undefined,
      } as ProductCreateReq;
      await productSkcUpsertApi(datas);
    } else if (goodsEditImg.value) {
      // areStringArraysEqual();
      // await formRef.value?.validate();
      const skcs: ProductFileEditReqSkcsItem[] = [];
      (formData.value.skcList || []).forEach((v: any, index: number) => {
        if (!areStringArraysEqual((v?.selectedPictures ?? []).map((v1: { url: string; }) => v1.url), skcList.value?.[index]?.images ?? [])) {
          skcs.push({
            productSkcId: v?.productSkcId,
            images: (v?.selectedPictures ?? []).map((v1: { url: string; }) => v1.url),
          });
        }
      });
      await productFileEditApi({
        productId: productId.value,
        materialImgUrl: refreshMaterialImgUrl.value === form.value.materialImgUrl ? null : form.value.materialImgUrl,
        videoUrl: videoUrl.value === form.value?.video?.[0]?.url ? null : form.value?.video?.[0]?.url ?? '',
        skcs: skcs.length ? skcs : undefined,
      });
    }
    ElMessage.success('操作成功');
    router.back();
  };
  return {
    rejectDialogVisible,
    openRejectDialog,
    onRejectSuccess,
    handlePass,
    handleSkc,
    handlePassEdit,
    handleTemporaryStorage,
  };
};
