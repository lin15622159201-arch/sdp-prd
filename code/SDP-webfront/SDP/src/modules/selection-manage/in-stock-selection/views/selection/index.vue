<template>
  <BatchProcess
    :header-config="{
      state: SELECTION_STATUS_ENUM.SELECTING,
      btnName: '提交选款结果',
      selectionNumberList,
    }"
    v-model:table-data="tableData"
    :tableColumns="tableColumns"
    :delete="handleDelete"
    :submit="handleSubmit"
    delete-name="取消选款"
  />
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import BatchProcess from '../../components/batch-process.vue';
import { ColumItem, IBatchSelectionRow } from '../../type';
import { SELECTION_RESULT, SELECTION_RESULT_ENUM, SELECTION_STATUS_ENUM } from '../../constant';
import { ISelectionPageResListItem } from '../../api/type';
import { selectionCancel, selectionSelect } from '../../api';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import sessionSharing from '@/core/http/session-sharing';

const router = useRouter();
const route = useRoute();

const tableColumns: ColumItem[] = [
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
    minWidth: '100px',
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
    label: '尺码',
    prop: 'size',
    minWidth: '70px',
  },
  {
    label: '选款结果',
    prop: 'currentSelectionResult',
    type: 'select',
    options: SELECTION_RESULT,
    width: '100px',
    fixed: 'right',
    placeholder: '请选择选款结果',
    rule: [
      {
        required: true,
        message: '请选择选款结果',
      }
    ]
  }
];

const tableData = ref<IBatchSelectionRow[]>([{
}]);

const data = sessionStorage.getItem('select-list');
if (data) {
  tableData.value = JSON.parse(data);
}

const selectionNumberList = computed(() => {
  return [
    {
      label: '总款数',
      value: tableData.value.length,
    },
    {
      label: '待选款',
      value: tableData.value.filter(item => !item.currentSelectionResult).length,
    },
    {
      label: '已选款',
      value: tableData.value.filter(item => item.currentSelectionResult === SELECTION_RESULT_ENUM.YES).length,
    },
    {
      label: '已淘汰',
      value: tableData.value.filter(item => item.currentSelectionResult === SELECTION_RESULT_ENUM.NO).length,
    }
  ];
});

const handleDelete = async (id:string) => {
  await selectionCancel({
    ids: [id],
  });
};

const handleSubmit = async () => {
  await selectionSelect(tableData.value.map(item => ({
    styleSelectionId: item.styleSelectionId as unknown as string,
    selectionResult: item.currentSelectionResult as SELECTION_RESULT_ENUM,
  })));
  ElMessage.success('选款结果提交成功');
  router.replace({
    name: 'AigcSelectionManageInStockSelection',
  });
};

const storageKey = route.query.storageKey as string;

const loadData = async () => {
  return sessionSharing<ISelectionPageResListItem[]>(storageKey, () => []);
};

onMounted(async () => {
  const tableList = await loadData();
  tableData.value = tableList.map((item):IBatchSelectionRow => ({
    ...item,
    currentSelectionResult: undefined,
  }));
});

onBeforeUnmount(() => {
  if (storageKey) {
    sessionStorage.removeItem(storageKey);
  }
});
</script>
