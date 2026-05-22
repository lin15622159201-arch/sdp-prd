<template>
  <BatchProcess
    :header-config="{
      state: SELECTION_STATUS_ENUM.WAIT_QUOTE,
      btnName: '提交报价',
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
import { ColumItem, IBatchQuoteRow, OptionTransformedItem } from '../../type';
import { SELECTION_RESULT, SELECTION_RESULT_ENUM, SELECTION_STATUS_ENUM } from '../../constant';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { selectionQuote } from '../../api';
import sessionSharing from '@/core/http/session-sharing';
import { ISelectionPageResListItem } from '../../api/type';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

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

const CLOTHING_COLOR_LIST = computed(() => {
  return optionTransformed(getDictionaryOptions(DICTIONARY_KEY.CLOTHING_COLOR) || []) || [];
});

const tableColumns = computed<ColumItem[]>(() => [
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
    label: '颜色',
    prop: 'currentColor',
    type: 'cascader',
    width: '100px',
    fixed: 'right',
    options: CLOTHING_COLOR_LIST.value,
    customRule: (data:IBatchQuoteRow) => {
      if (data.currentQuoteResult === SELECTION_RESULT_ENUM.NO) {
        return [];
      }
      return [{
        required: true,
        message: '请选择颜色',
      }];
    },
    placeholder: '请选择颜色',
  },
  {
    label: '报价结果',
    prop: 'currentQuoteResult',
    type: 'select',
    options: SELECTION_RESULT,
    width: '100px',
    fixed: 'right',
    rule: [
      {
        required: true,
        message: '请选择报价结果',
      },
    ],
    placeholder: '请选择报价结果',
  },
  {
    label: '采购价',
    prop: 'currentpurchasePrice',
    type: 'inputNumber',
    width: '100px',
    fixed: 'right',
    placeholder: '请输入采购价',
    customRule: (data:IBatchQuoteRow) => {
      if (data.currentQuoteResult === SELECTION_RESULT_ENUM.NO) {
        return [];
      }
      return [{
        required: true,
        message: '请输入采购价',
        trigger: 'blur',
      }];
    },
  }
]);

const tableData = ref<IBatchQuoteRow[]>([{
}]);

const selectionNumberList = computed(() => {
  return [
    {
      label: '总款数',
      value: tableData.value.length,
    },
    {
      label: '待报价',
      value: tableData.value.filter(item => !item.currentQuoteResult).length,
    },
    {
      label: '已报价',
      value: tableData.value.filter(item => item.currentQuoteResult === SELECTION_RESULT_ENUM.YES).length,
    },
    {
      label: '已淘汰',
      value: tableData.value.filter(item => item.currentQuoteResult === SELECTION_RESULT_ENUM.NO).length,
    }
  ];
});

const handleSubmit = async () => {
  await selectionQuote(tableData.value.map(item => ({
    styleSelectionId: item.styleSelectionId as unknown as string,
    purchasePrice: Number(item.currentpurchasePrice) as number,
    quoteResult: item.currentQuoteResult as unknown as SELECTION_RESULT_ENUM,
    color: item.currentColor,
  })));
  ElMessage.success('提交报价成功');
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
  tableData.value = data.map((item):IBatchQuoteRow => ({
    ...item,
    currentpurchasePrice: null,
    currentQuoteResult: undefined,
    currentColor: item.color,
  }));
});

onBeforeUnmount(() => {
  if (storageKey) {
    sessionStorage.removeItem(storageKey);
  }
});

</script>
