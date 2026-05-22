<template>
  <BatchProcess
    :header-config="{
      state: SELECTION_STATUS_ENUM.WAIT_CONFIRM,
      btnName: '确认报价',
      selectionNumberList,
    }"
    v-model:table-data="tableData"
    v-model:tableColumns="tableColumns"
    :submit="handleSubmit"
  />
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import BatchProcess from '../../components/batch-process.vue';
import { ColumItem, IBatchConfirmRow, OptionTransformedItem } from '../../type';
import { CONFIRM_QUOTE_ENUM, CONFIRM_QUOTE_LIST, SELECTION_STATUS_ENUM } from '../../constant';
import { useDictionary } from '@/hooks/use-dictionary';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { selectionConfirm } from '../../api';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import sessionSharing from '@/core/http/session-sharing';
import { ISelectionPageResListItem } from '../../api/type';

const router = useRouter();
const route = useRoute();

const { getDictionaryOptions } = useDictionary();

const optionTransformed = (data:IDictionaryItem[]):OptionTransformedItem[] => {
  return data.map(item => ({
    value: item.label,
    label: item.label,
    children: item.children && item.children.length > 0 ? optionTransformed(item.children) : [],
  }));
};

const SHOP_LIST = computed(() => {
  return optionTransformed(getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST)) || [];
});
const CARGOTARY_LIST = computed(() => {
  return optionTransformed(getDictionaryOptions(DICTIONARY_KEY.CARGOTARY)) || [];
});
const JV_STYLE_LIST = computed(() => {
  return optionTransformed(getDictionaryOptions(DICTIONARY_KEY.JV_STYLE)) || [];
});
const JV_SCENE_LIST = computed(() => {
  return optionTransformed(getDictionaryOptions(DICTIONARY_KEY.JV_SCENE)) || [];
});
const PLM_CLOTHING_BAND_LIST = computed(() => {
  return optionTransformed(getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND)) || [];
});
const PRODUCT_TYPE_LIST = computed(() => {
  return optionTransformed(getDictionaryOptions(DICTIONARY_KEY.PRODUCT_TYPE)) || [];
});

const tableColumns = computed<ColumItem[]>(() => {
  return [
    {
      label: '供应商款号',
      prop: 'supplierStyleCode',
      minWidth: '120px',
    },
    {
      label: '图片',
      prop: 'imageUrl',
      type: 'image',
      minWidth: '120px',
    },
    {
      label: '品类',
      prop: 'categoryName',
      minWidth: '70px',
    },
    {
      label: '颜色',
      prop: 'color',
      minWidth: '70px',
    },
    {
      label: '价格',
      prop: 'price',
      minWidth: '100px',
    },
    {
      label: '采购价',
      prop: 'purchasePrice',
      minWidth: '100px',
    },
    {
      label: '期望价格',
      prop: 'expectedPrice',
      minWidth: '100px',
    },
    {
      label: '尺码',
      prop: 'size',
      minWidth: '70px',
    },
    {
      label: '确认报价',
      prop: 'currentQuoteResult',
      type: 'select',
      options: CONFIRM_QUOTE_LIST,
      width: '100px',
      fixed: 'right',
      placeholder: '请选择确认报价',
      customRule: (data:IBatchConfirmRow) => {
        if (data.currentQuoteResult === CONFIRM_QUOTE_ENUM.NO
        || data.currentQuoteResult === CONFIRM_QUOTE_ENUM.REQUOTE) {
          return [];
        }
        return [{
          required: true,
          message: '请选择确认报价',
        }];
      },
    },
    {
      label: '店铺',
      prop: 'currentStoreName',
      type: 'select',
      options: SHOP_LIST.value,
      width: '100px',
      fixed: 'right',
      placeholder: '请选择店铺',
      customRule: (data:IBatchConfirmRow) => {
        if (data.currentQuoteResult === CONFIRM_QUOTE_ENUM.NO
        || data.currentQuoteResult === CONFIRM_QUOTE_ENUM.REQUOTE) {
          return [];
        }
        return [{
          required: true,
          message: '请选择店铺',
        }];
      },
    },
    {
      label: '货盘类型',
      prop: 'currentPalletTypeName',
      type: 'select',
      options: CARGOTARY_LIST.value,
      width: '100px',
      fixed: 'right',
      placeholder: '请选择货盘类型',
      customRule: (data:IBatchConfirmRow) => {
        if (data.currentQuoteResult === CONFIRM_QUOTE_ENUM.NO
        || data.currentQuoteResult === CONFIRM_QUOTE_ENUM.REQUOTE) {
          return [];
        }
        return [{
          required: true,
          message: '请选择货盘类型',
        }];
      },
    },
    {
      label: '商品类型',
      prop: 'currentProductName',
      type: 'select',
      options: PRODUCT_TYPE_LIST.value,
      width: '100px',
      fixed: 'right',
      placeholder: '请选择商品类型',
      customRule: (data:IBatchConfirmRow) => {
        if (data.currentQuoteResult === CONFIRM_QUOTE_ENUM.NO
        || data.currentQuoteResult === CONFIRM_QUOTE_ENUM.REQUOTE) {
          return [];
        }
        return [{
          required: true,
          message: '请选择商品类型',
        }];
      },
    },
    {
      label: '场景',
      prop: 'currentSceneName',
      type: 'select',
      options: JV_SCENE_LIST.value,
      width: '100px',
      fixed: 'right',
      placeholder: '请选择场景',
    },
    {
      label: '风格',
      prop: 'currentModoName',
      type: 'cascader',
      options: JV_STYLE_LIST.value,
      width: '100px',
      fixed: 'right',
      placeholder: '请选择风格',
    },
    {
      label: '波段',
      prop: 'currentWavebandName',
      type: 'select',
      options: PLM_CLOTHING_BAND_LIST.value,
      width: '100px',
      fixed: 'right',
      placeholder: '请选择波段',
    },
    {
      label: '期望价格',
      prop: 'currentExpectedPrice',
      type: 'inputNumber',
      width: '100px',
      fixed: 'right',
      placeholder: '请输入期望价格',
      customRule: (data:IBatchConfirmRow) => {
        if (data.currentQuoteResult === CONFIRM_QUOTE_ENUM.REQUOTE) {
          return [
            {
              required: true,
              message: '请输入期望价格',
              trigger: 'blur',
            },
          ];
        }
        return [];
      },
    },
  ];
});

const tableData = ref<IBatchConfirmRow[]>([]);

const selectionNumberList = computed(() => {
  return [
    {
      label: '总款数',
      value: tableData.value.length,
    },
    {
      label: '待确认',
      value: tableData.value.filter(item => !item.currentQuoteResult).length,
    },
    {
      label: '已确认',
      value: tableData.value.filter(item => item.currentQuoteResult === CONFIRM_QUOTE_ENUM.YES).length,
    },
    {
      label: '重新报价',
      value: tableData.value.filter(item => item.currentQuoteResult === CONFIRM_QUOTE_ENUM.REQUOTE).length,
    },
    {
      label: '已淘汰',
      value: tableData.value.filter(item => item.currentQuoteResult === CONFIRM_QUOTE_ENUM.NO).length,
    }
  ];
});

const handleSubmit = async () => {
  await selectionConfirm(tableData.value.map(item => ({
    styleSelectionId: item.styleSelectionId,
    quoteResult: item.currentQuoteResult as number,
    storeName: item.currentStoreName as string,
    palletTypeName: item.currentPalletTypeName as string,
    sceneName: item.currentSceneName as string,
    modoName: item.currentModoName as string,
    wavebandName: item.currentWavebandName as string,
    commodityTypeName: item.currentProductName
    && item.currentProductName.length > 0 ? item.currentProductName : null,
    expectedPrice: item.currentExpectedPrice && item.currentExpectedPrice > 0
      ? Number(item.currentExpectedPrice) as number : null,
    selectionResult: item.selectionResult as unknown as number,
  })));
  ElMessage.success('确认报价提交成功');
  router.replace({
    name: 'AigcSelectionManageInStockSelection',
  });
};

const storageKey = route.query.storageKey as string;

const loadData = async () => {
  return sessionSharing<ISelectionPageResListItem[]>(storageKey, () => []);
};

onMounted(async () => {
  const data = await loadData();
  tableData.value = data.map((item):IBatchConfirmRow => ({
    ...(item as any),
    currentQuoteResult: null,
    currentStoreName: null,
    currentPalletTypeName: null,
    currentSceneName: null,
    currentModoName: null,
    currentWavebandName: null,
    currentExpectedPrice: null,
    currentProductName: null,
  }));
});

onBeforeUnmount(() => {
  if (storageKey) {
    sessionStorage.removeItem(storageKey);
  }
});

</script>
