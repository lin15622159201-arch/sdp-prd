<!-- 尺码表 -->
<template>
  <div class="size-form">
    <div class="size-form-header">
      <div class="section-title">尺码表{{ Number(sizeIndex) + 1 }}</div>
      <el-select
        class="tw-w-150px tw-m-l-10px"
        v-model="name"
        :disabled="isReadonly || goodsEditImg"
        placeholder="引用模板"
        clearable
        filterable
        @change="sizeTempChange"
      >
        <el-option
          v-for="item in sizeTempList"
          :key="item.templateId"
          :label="item.templateName"
          :value="item.templateName"
        />
      </el-select>
      <el-checkbox
        class="tw-m-l-10px"
        :disabled="isReadonly || goodsEditImg || (tableDataList.filter(v => v.show === 'YES').length >= 3 && tableDataList[sizeIndex || 0].show !== 'YES')"
        v-model="show"
        label="重点部位"
        true-value="YES"
        false-value="NO"
      />
      <!-- <el-button
        v-if="!isReadonly"
        class="tw-ml-4"
        type="primary"
        text
        @click="handleClear"
      >清空</el-button> -->
      <div class="tw-m-l-a" v-if="!isReadonly && !goodsEditImg">
        <el-button
          v-if="tableDataList.length > 1"
          class="tw-ml-4"
          type="danger"
          text
          @click="handledel"
        >删除</el-button>
        <el-button
          class="tw-ml-4"
          type="primary"
          text
          @click="addSizeTemp"
        >存为模板</el-button>
      </div>
    </div>
    <div class="titErr" v-if="suiting === 1 && !name">套装品类必须使用模板</div>
    <div class="tw-flex-center-y tw-m-b-10px" v-if="!isReadonly && !goodsEditImg">
      <div>尺码参数：</div>
      <el-checkbox
        v-for="city in sizeParts"
        v-model="city.checked"
        :key="city.field"
        :label="city.label"
        :disabled="city.required === 1"
      />
    </div>
    <el-form
      ref="ruleForm"
      :model="tableData"
      label-width="auto"
      class="form"
    >
      <el-table
        :data="tableData"
        stripe
        border
        class="size-form-table"
      >
        <el-table-column
          prop="size"
          label="尺码"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <span>{{ row.size }}</span>
          </template>
        </el-table-column>

        <el-table-column
          v-for="item in sizeParts.filter(v => v.checked)"
          :key="item.field"
          :label="item.label"
          width="120"
          align="center"
        >
          <template #header>
            <span v-if="item.required === 1" class="asterisk">*</span>
            {{ item.label }}
          </template>
          <template #default="{ row, $index }">
            <!-- <span v-if="isReadonly">{{ row[item.field] }}</span> -->
            <el-form-item
              :prop="`${$index}.${item.field}`"
              :rules="[{ required: row.size !== '档差', message: `${item.label}不能为空`, trigger: 'change' }]"
            >
              <number-basis
                v-model="row[item?.field!]"
                :disabled="isReadonly || !!row.productId"
                class="tw-w-full"
                size="small"
                clearable
                :precision="1"
                :min="0"
                :max="99999"
              />
              <!-- <el-input-number
                v-model="row[item?.field]"
                controls-position="right"
                :precision="1"
                clearable
              /> -->
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!isReadonly && !goodsEditImg && !isGoodsEdit"
          label="操作"
          width="120"
          fixed="right"
        >
          <template #default="{ $index }">
            <el-button
              v-if="$index < 2"
              type="primary"
              text
              size="small"
              :controls="false"
              @click="handleClearRow($index)"
            >
              清空
            </el-button>
            <el-button
              v-if="$index === 0"
              type="primary"
              text
              size="small"
              :controls="false"
              @click="handleCalculateDown()"
            >
              向下计算
            </el-button>
            <el-button
              v-if="$index === 1"
              type="primary"
              text
              size="small"
              :controls="false"
              @click="handleDiffDown()"
            >
              向下复制
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import { ref, PropType, watch } from 'vue';
import { IStyleOnShelvesDetailRes } from '@/modules/goods-manage/api/listing/type';
import { useContext } from '../hooks/use-context';
import { useForm } from '../hooks/use-form';
import { ElMessage, FormInstance } from 'element-plus';
import { useTempDialog } from './hooks/use-dialog';
import {
  sizeTempPageApi,
  temuPartApi,
} from '@/api/temu';
import {
  TemuPartResItem,
} from '@/api/temu/type';
import { fetchSizeDiffPage } from '@/modules/base-config/size-diff/api';
import { ISizeDiffEditDiffItem } from '@/modules/base-config/size-diff/api/types';

const ruleForm = ref<FormInstance>();
const props = defineProps<{
  /** 详情数据 */
  detailData: IStyleOnShelvesDetailRes;
  /** 选中的尺码列表 */
  selectedSizes?: string[];
  sizeIndex?: number;
}>();

interface SizeFormRow {
  size: string;
  clothingLength?: string;
  sleeveLength?: string;
  pantsLength?: string;
  pantsLength2?: string;
  inseam?: string;
  bust?: string;
  hip?: string;
  shoulder?: string;
}
const { tableDataList, sizeTempList, form, temuReviewDatas, sizeParts: oldSizeParts, suiting } = useForm();
const { isReadonly, goodsEditImg, isGoodsEdit } = useContext();

const DIFF_ROW_NAME = '档差';

// 创建空数据模板
const createEmptyRow = (size: string): SizeFormRow => ({
  size
});
// 清空表格行数据
const clearRowData = (row: any) => {
  Object.keys(row).forEach((v: string) => {
    row[v] = v !== 'size' ? undefined : row[v];
  });
  // row.clothingLength = undefined;
  // row.sleeveLength = undefined;
  // row.pantsLength = undefined;
  // row.pantsLength2 = undefined;
  // row.inseam = undefined;
  // row.bust = undefined;
  // row.hip = undefined;
  // row.shoulder = undefined;
};
const name = defineModel('name', {
  type: String,
  default: '',
});
const show = defineModel('show', {
  type: String,
  default: 'NO',
});
const sizeParts = defineModel('sizeParts', {
  type: Array as PropType<{ checked?: boolean; field?: string; required?: number; label?: string; }[]>,
  default: () => {
    return [];
  },
});
// 根据选中的尺码动态生成表格数据
const tableData = defineModel({
  type: Array as PropType<any>,
  default: () => {
    return [];
  },
});
const diffDataList = ref<ISizeDiffEditDiffItem[]>([]);
const setSizeDatas = async (newSizes: string[], isCler = false) => {
  try {
    const dataDiff = await fetchSizeDiffPage({
      sizeCode: props.detailData?.sizeStandardCode,
    });
    diffDataList.value = dataDiff?.data?.list?.[0]?.diffs;
  } catch {
    console.error('接口请求失败');
  }
  const sizes = newSizes || [];
  const rows: SizeFormRow[] = [];
  sizes.forEach((size: string, index: number) => {
    // 默认档差
    const defaultDiff = diffDataList.value?.find(di => di.size === size)?.parts?.reduce((d1: any, d2: any) => {
      d1[d2.partId] = d2.diff;
      return d1;
    }, {});
    const sizeItem = temuReviewDatas.value?.sizeReqs?.[Number(props?.sizeIndex ?? 0)]?.sizeReqs?.find(v => v.size === size);
    const str: any = {};
    sizeItem?.values?.forEach((v1: any) => {
      str[v1.part] = isCler ? '' : v1.value;
    });
    if (tableData.value.length > 0 || isCler) {
      const existingRow = tableData.value.find((row: {
        /** 尺码 */
        size: string;
      }) => row.size === size);
      if (existingRow) {
        rows.push({ ...(isCler ? { size: existingRow.size } : existingRow), ...str, productId: sizeItem?.productId ?? '' });
      } else {
        rows.push({ ...createEmptyRow(size), ...str, productId: sizeItem?.productId ?? '' });
      }
    } else {
      rows.push({ ...createEmptyRow(size), ...str, productId: sizeItem?.productId ?? '' });
    }
    let diffItem: any = {};
    if (temuReviewDatas.value?.sizeReqs) {
      diffItem = temuReviewDatas.value?.sizeReqs?.[Number(props?.sizeIndex)]?.sizeReqs?.[index + 1] ?? {};
    }
    const strDiff: any = {};
    if (diffItem && !isCler) {
      (diffItem.values || [])?.forEach((v1: any) => {
        if (v1.diff) {
          strDiff[v1.part] = v1.diff;
        }
      });
    }
    if (((temuReviewDatas.value?.sizeReqs?.[Number(props?.sizeIndex)]?.sizeReqs?.length ?? 0) - 1) === index && index < sizes.length - 1) {
      rows.push({ ...createEmptyRow(DIFF_ROW_NAME), ...defaultDiff, ...strDiff });
    } else if (index < sizes.length - 1) {
      rows.push({ ...createEmptyRow(DIFF_ROW_NAME), ...defaultDiff, ...strDiff, productId: sizeItem?.productId ?? '' });
    }
  });
  if (!isEqual(rows, tableData.value)) {
    tableData.value = rows;
  }
};
watch(
  () => props.selectedSizes,
  (newSizes?: string[]) => {
    setSizeDatas(newSizes || []);
  },
  {
    immediate: true,
    deep: true,
  }
);

function isEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => JSON.stringify(item) === JSON.stringify(arr2[index]));
}


// 清空单行
const handleClearRow = (index: number) => {
  if (index === 0) {
    tableData.value.forEach((item: {
      /** 尺码 */
      size: string;
    }) => {
      if (item.size !== DIFF_ROW_NAME) {
        clearRowData(item);
      }
    });
  } else if (index === 1) {
    tableData.value.forEach((item: { size: string; }) => {
      if (item.size === DIFF_ROW_NAME) {
        clearRowData(item);
      }
    });
  }
};
// 向下复制
const handleDiffDown = () => {
  tableData.value = tableData.value.map((row: any, index: number) => {
    if (row.size !== DIFF_ROW_NAME) {
      return row;
    }
    return {
      ...tableData.value[1],
      productId: row.productId
    };
  });
};
// 向下计算
const handleCalculateDown = () => {
  tableData.value.forEach((row: any, index: number) => {
    if (row.size === DIFF_ROW_NAME) return;
    (Object.keys(row) as (keyof SizeFormRow)[]).forEach((key) => {
      if (key === 'size') return;
      const nextDiffRow = tableData.value[index + 1];
      const nextRow = tableData.value[index + 2];
      if (nextDiffRow && nextDiffRow[key]) {
        nextRow[key] = String(Number(row[key]) + Number(nextDiffRow[key]));
      }
    });
  });
};

const handledel = () => {
  tableDataList.value.splice(props.sizeIndex as number, 1);
};

const sizeTempChange = async (sizeItem: string) => {
  if (sizeItem) {
    const temps = sizeTempList.value.find(v => v.templateName === sizeItem)?.temps;
    const parts = sizeTempList.value.find(v => v.templateName === sizeItem)?.parts;
    const catId = sizeTempList.value.find(v => v.templateName === sizeItem)?.catId;

    // 部位
    const { data: part } = await temuPartApi(catId || '');
    tableDataList.value[props.sizeIndex || 0].sizeParts = (part || []).map((v: TemuPartResItem) => {
      return {
        label: v.name,
        field: v.id,
        checked: (parts || []).includes(v.id || ''),
        required: v.required
      };
    });
    let sizeDeff: string = '';
    tableDataList.value[props.sizeIndex || 0].tableData = tableDataList.value[props.sizeIndex || 0].tableData.map((v: any, index: number) => {
      if (v.size === '档差') {
        sizeDeff = tableDataList.value[props.sizeIndex || 0].tableData[index - 1].size;
      }
      if (temps.find((v1: { size: string; }) => v1.size === v.size)) {
        const str: any = {};
        temps.find((v1: { size: string; }) => v1.size === v.size).values.forEach((v2: { part: string; value: string; }) => {
          str[v2.part] = v2.value;
        });

        return {
          ...v,
          ...str,
        };
      } else {
        const strDiff: any = {};
        if (v.size === '档差') {
          temps.find((v1: { size: string; }) => v1.size === sizeDeff)?.values?.forEach((v2: { part: string; diff: number; }) => {
            strDiff[v2.part] = v2.diff === 0 ? undefined : v2.diff;
          });
        }
        return {
          size: v.size,
          ...strDiff,
        };
      }
    });
  } else {
    tableDataList.value[props.sizeIndex || 0].tableData = [];
    tableDataList.value[props.sizeIndex || 0].sizeParts = JSON.parse(JSON.stringify(oldSizeParts.value));
    setSizeDatas(props.selectedSizes || [], true);
  }
  setTimeout(() => {
    ruleForm.value?.clearValidate();
  });
};
const addSizeTemp = async () => {
  await ruleForm.value?.validate();
  useTempDialog(tableDataList.value?.[props.sizeIndex || 0], props.detailData, form.value).then(async () => {
    ElMessage.success('操作成功');
    // 引用模板
    const sizeTempDatas = await sizeTempPageApi({
      pageNum: 1,
      pageSize: 200,
      catId: form.value.catId,
    });
    sizeTempList.value = sizeTempDatas.data.list as any;
  });
};
const onSubmit = async () => {
  let isValid = false;
  await ruleForm.value?.validate((valid: boolean) => {
    if (valid) {
      isValid = true;
    }
  });
  return isValid;
};
defineExpose({ onSubmit });
</script>

<style scoped lang='scss'>
.size-form {
  .asterisk {
    color: #f56c6c;
    margin-right: 2px;
  }
  .size-form-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .title {
      font-weight: 500;
      font-size: 14px;
    }
  }
  .size-form-table {
    margin-bottom: 0;
  }
  .grade-diff-row {
    display: flex;
    align-items: center;
    padding: 8px;
    border: 1px solid #ebeef5;
    border-top: none;
    background-color: #fafafa;
    .label {
      width: 100px;
      text-align: center;
      font-weight: 500;
      padding-right: 8px;
    }
    .inputs {
      flex: 1;
      display: flex;
      gap: 8px;
      .diff-input {
        width: 120px;
      }
    }
  }
}
.titErr {
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>
