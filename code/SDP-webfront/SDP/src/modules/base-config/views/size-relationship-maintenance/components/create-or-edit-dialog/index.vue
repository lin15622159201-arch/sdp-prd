<script lang="ts" setup>
import { ref, defineProps, defineEmits, PropType, computed, shallowRef, watch } from 'vue';
import type { IFormData } from './type';
import { ISizeCategorySaveReqCategoryAddInfoListItem, ISizeConfigListRes } from '../../api/type';
import { sizeCategoryDetailList, sizeCategorySave, sizeCategoryUpdate, sizeCategoryList } from '../../api';
import { IdictValuesItem } from '@/api/dict/types';
import { ElMessage, ElTree } from 'element-plus';

/**
 * 导出数据类型
 */
interface IDictionaryData {
  /** 对应 valueCode */
  value: string;
  /** 对应 value */
  label: string;
  /** 对应 isEnable */
  disabled: boolean;
  /** 对应数据的原始数据 */
  valueCode: string;
  isEnable: string;
  valueParentCode?: string;
  /**
     * 通过 {@link ICreateDictionaryConfig.convertValueField} 产生
     */
  originalValue?: string;
  [k: string]: unknown;
  children?: IDictionaryData[];
}

const emit = defineEmits(['update:visible', 'close', 'success']);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  ids: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  categoryTreeList: {
    type: Array as PropType<IDictionaryData[]>,
    default: () => [],
  },
  sizeConfig: {
    type: Object as PropType<ISizeConfigListRes>,
    default: () => {},
  },
  plmSpecificationList: {
    type: Array as PropType<IdictValuesItem[]>,
    default: () => [],
  },
});

const isEdit = computed(() => props.ids.length);

const categoryCodeMap = shallowRef<Record<string, Record<'codes' | 'labels', string[]>>>({});

const isClose = ref(false);
const categoryCount = ref(0);

const treeRef = shallowRef<InstanceType<typeof ElTree>>();
const treeProps = {
  children: 'children',
  label: 'label',
};

const formData = ref<IFormData>({
  configRevisedTime: '',
  categoryInfoList: [],
  sizeNumInfoList: [],
});

const defaultCheckedKeys = ref<string[]>([]);

const handleGetSizeCategoryDetailList = async () => {
  const { data } = await sizeCategoryDetailList({ ids: props.ids });
  formData.value.categoryInfoList = data;
  categoryCount.value = data.length;
  defaultCheckedKeys.value.push(...formData.value.categoryInfoList.map((categoryInfo) => {
    const codes = categoryInfo.categoryCode.split('-');
    const leafCode = codes[codes.length - 1];
    return leafCode;
  }));
};

// const defaultDisabledKeys = ref<string[]>([]);
const handleGetSizeCategoryList = async () => {
  const { data } = await sizeCategoryList({ categoryCodeList: [] });
  defaultCheckedKeys.value.push(...data.map((categoryInfo) => {
    const codes = categoryInfo.categoryCode.split('-');
    const leafCode = codes[codes.length - 1];
    return leafCode;
  }));
};

watch(
  () => [props.visible, isEdit, props.sizeConfig],
  () => {
    if (props.visible) {
      const sizeConfigList = props.sizeConfig.sizeConfigList || [];
      formData.value.sizeNumInfoList = sizeConfigList.map((sizeConfig) => {
        return {
          sizeStandard: sizeConfig.sizeStandard,
          sizeStandardCode: sizeConfig.sizeStandardCode,
          sampleSize: sizeConfig.sampleSize,
          sizeTypeCode: '',
          sizeTypeName: '',
        };
      });
      defaultCheckedKeys.value = [];
      // defaultDisabledKeys.value = [];
      if (isEdit.value) {
        handleGetSizeCategoryDetailList();
      } else {
        handleGetSizeCategoryList();
      }
    } else {
      categoryCount.value = 0;
      isClose.value = false;
      formData.value = {
        configRevisedTime: '',
        categoryInfoList: [],
        sizeNumInfoList: [],
      };
    }
  },
);

// 显示的品类
const showCategoryTreeList = computed(() => {
  const checkedList = [...defaultCheckedKeys.value];
  console.log('categoryTreeList==', props.categoryTreeList);
  const list = JSON.parse(JSON.stringify(props.categoryTreeList)) as typeof props.categoryTreeList;

  const setIsDisabled = (dataList: typeof props.categoryTreeList, pCode?: string[], pLabel?: string[]) => {
    dataList.forEach((item) => {
      const { label, value } = item;
      if (isEdit.value) {
        item.disabled = true;
      } else {
        const index = checkedList.indexOf(value);
        const disabled = index !== -1;

        if (disabled) {
          checkedList.splice(index, 1);
        }
        item.disabled = disabled;
      }

      if (item.children?.length) {
        setIsDisabled(item.children, [...(pCode || []), value], [...(pLabel || []), label]);
      } else if (!item.children?.length) {
        Reflect.set(categoryCodeMap.value, value, {
          codes: [...(pCode || []), value]!,
          labels: [...(pLabel || []), label]!,
        });
        Reflect.deleteProperty(item, 'children');
      }
    });
  };

  setIsDisabled(list);
  console.log('tree==', list);
  return list;
});

const checkChange = (data: any) => {
  if (!treeRef.value) return;
  const currentChecked = treeRef.value.getCheckedKeys();
  console.log('currentChecked=', currentChecked);
  console.log('categoryCodeMap', categoryCodeMap);
  if (isEdit.value) {
    categoryCount.value = currentChecked.length;
  } else {
    categoryCount.value = currentChecked.filter(key => !defaultCheckedKeys.value.includes(key as string)).length;
  }
};

const handleClose = () => {
  emit('update:visible', false);
  emit('close');
};

const handleAdd = async (sizeNumInfoList: IFormData['sizeNumInfoList']) => {
  const categoryInfoList: ISizeCategorySaveReqCategoryAddInfoListItem[] = [];
  if (!treeRef.value) return false;
  const currentChecked = treeRef.value.getCheckedKeys();
  console.log('currentChecked=', currentChecked);

  currentChecked.forEach((code) => {
    if (!categoryCodeMap.value[code] || defaultCheckedKeys.value.includes(code as string)) return;
    const { codes, labels } = categoryCodeMap.value[code];
    categoryInfoList.push({
      sizeCategoryId: '',
      revisedTime: '',
      categoryCode: codes.join('-'),
      categoryName: labels.join('-'),
    });
  });
  if (categoryInfoList.length === 0) {
    ElMessage.error('请选择品类');
    return false;
  }

  await sizeCategorySave({
    configRevisedTime: props.sizeConfig.revisedTime,
    categoryAddInfoList: categoryInfoList,
    sizeNumAddInfoList: sizeNumInfoList,
  });
  return true;
};

const handleEdit = async (sizeNumInfoList: IFormData['sizeNumInfoList']) => {
  try {
    await sizeCategoryUpdate({
      configRevisedTime: props.sizeConfig.revisedTime,
      categoryUpdateInfoList: formData.value.categoryInfoList,
      sizeNumUpdateInfoList: sizeNumInfoList,
    });
    return true;
  } catch {
    return false;
  }
};

const handleSave = async () => {
  const sizeNumInfoList = formData.value.sizeNumInfoList.filter(sizeNumInfo => sizeNumInfo.sizeTypeCode);
  if (sizeNumInfoList.length === 0) {
    ElMessage.error('请选择号型');
    return;
  }
  sizeNumInfoList.forEach((sizeNumInfo) => {
    const sizeType = props.plmSpecificationList.find(item => item.valueCode === sizeNumInfo.sizeTypeCode);
    sizeNumInfo.sizeTypeName = sizeType ? sizeType.value : '';
  });
  let message = '';
  let res = false;
  if (isEdit.value) {
    message = '修改成功';
    res = await handleEdit(sizeNumInfoList);
  } else {
    message = '新增成功';
    res = await handleAdd(sizeNumInfoList);
  }

  if (!res) return;
  ElMessage.success(message);
  emit('success');
  handleClose();
};

</script>

<template>
  <el-dialog
    :model-value="visible"
    :title="isEdit ? '修改记录' : '新增记录'"
    width="80%"
    append-to-body
    :close-on-click-modal="false"
    custom-class="dialog-width-medium ce-dialog--wrapper"
    @close="handleClose"
  >
    <div class="flex flex-dir-column">
      <div class="flex flex-align-center flex-justify-between margin-bottom-10">
        <div>
          <span>选择品类</span>
          <span class="margin-left-10 count">已选{{ categoryCount }}个品类</span>
        </div>
        <el-button type="text" @click="isClose = !isClose">
          {{ isClose ? '展开' : '收起' }}
        </el-button>
      </div>
      <el-scrollbar class="category-wrapper" :max-height=" isClose ? '0vh' : '30vh'">
        <el-tree
          :key="defaultCheckedKeys.join('-')"
          ref="treeRef"
          :data="showCategoryTreeList"
          :props="treeProps"
          :default-checked-keys="defaultCheckedKeys"
          node-key="value"
          show-checkbox
          default-expand-all
          @check-change="checkChange"
        />
      </el-scrollbar>
      <span class="margin-top-10 margin-bottom-10 padding-top-5 padding-bottom-5">维护型号</span>
      <el-table
        :data="formData.sizeNumInfoList"
        border
        stripe
        max-height="30vh"
      >
        <el-table-column
          prop="sizeStandard"
          label="尺码组"
        />
        <el-table-column
          prop="sampleSize"
          label="尺码"
        />
        <el-table-column
          prop="sizeStandard"
          label="号型"
        >
          <template #default="{ row }: { row: IFormData['sizeNumInfoList'][0] }">
            <el-select v-model="row.sizeTypeCode" clearable>
              <el-option
                v-for="item in plmSpecificationList"
                :key="item.valueCode"
                :label="item.value"
                :value="item.valueCode"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <el-button @click="handleClose">
        取 消
      </el-button>
      <el-button
        type="primary"
        @click="handleSave"
      >
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.category-wrapper {
  border: 1px solid #ecedf1;
  border-radius: 8px;
}
.count {
  color: #909399;
}
</style>
<style lang="scss">
.ce-dialog--wrapper {
  margin-top: 5vh;
  .el-dialog__body {
    padding-top: 0 !important;
  }
}
</style>
