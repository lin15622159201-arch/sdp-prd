<template>
  <el-form
    ref="itemForm"
    :key="`${attr.pid}_${attr.refPid}`"
    :model="form"
    :inline="true"
    label-width="100px"
    class="form"
    style="max-width: 100%"
  >
    <el-button
      v-if="!isDis"
      class="btn-add"
      type="primary"
      link
      plain
      @click="onIngredientsAdd"
    >
      + 添加 
    </el-button>

    <el-table
      :data="form.list"
      border
      style="width: 100%"
    >
      <el-table-column :label="attr.propertyChooseTitle">
        <template #header>
          <span v-if="attr.required" class="asterisk">*</span>
          {{ attr.propertyChooseTitle }}
        </template>
        <template #default="{ $index, row }">
          <div v-if="isShowDetail" style="width: 300px">
            {{ renderingAtt(attr, row) }}
          </div>
          <div v-else>
            <el-form-item
              label-width="0"
              :rules="[
                {
                  required: attr.required || row.numberInputValue,
                  message: '请选择',
                  trigger: ['blur', 'change'],
                },
              ]"
              :prop="`list.${$index}.vid`"
            >
              <el-select
                v-model="row.vid"
                filterable
                :disabled="isDis"
                placeholder="请选择"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="option in attr.values"
                  :key="option.vid"
                  :label="option.value"
                  :value="option.vid"
                  :disabled="form.list.map(it => it.vid).includes(option.vid)"
                />
              </el-select>
            </el-form-item>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="attr.numberInputTitle">
        <template #header>
          <span v-if="attr.required" class="asterisk">*</span>
          {{ attr.numberInputTitle }}
          <span class="text-tip">{{ $filters.getEnumLabel(VALUE_RULE_LIST, attr.valueRule) }}</span>
        </template>
        <template #default="{ $index, row }">
          <div v-if="isShowDetail" style="width: 300px">{{ row.numberInputValue }}</div>
          <div v-else>
            <el-form-item
              label-width="0"
              :rules="[
                {
                  required: attr.required || row.vid,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                },
                { validator: onValidateInput, trigger: ['blur', 'change'] },
              ]"
              :prop="`list.${$index}.numberInputValue`"
            >
              <el-input
                v-model="row.numberInputValue"
                clearable
                :disabled="isDis"
                placeholder="请输入"
                style="width: 100%"
                @keyup="onInputKeyup($index)"
              >
                <template v-if="attr.valueUnit?.length" #append>{{ attr.valueUnit[0] }}</template>
              </el-input>
            </el-form-item>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!isDis"
        prop="address"
        label="操作"
        width="80"
      >
        <template #default="{ $index }">
          <el-button
            v-if="form.list.length !== 1"
            sizi="small"
            type="danger"
            :icon="Delete"
            circle
            @click="onIngredientsDelete($index)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script lang="ts" setup>
import { defineProps, ref, PropType, watch, computed, onMounted, defineExpose } from 'vue';
import { Delete } from '@element-plus/icons-vue';
// import {
//   IAttrCatsAttrResPropertiesItem,
//   IAttrCatsAttrResValuesItem,
//   IV1SpuReqAttrsItem,
// } from '@/modules/production-manage/types';
import { VALUE_RULE_LIST, CONTROL_TYPE_ENUM, VALUE_RULE_ENUM } from '../constant';
// import { VALUE_RULE_LIST, CONTROL_TYPE_ENUM, VALUE_RULE_ENUM } from '@/modules/production-manage/views/create/constant';
import { FormInstance, ElMessage } from 'element-plus';
import { filters } from '@/core/plugins/filter';
import { useForm } from '../hooks/use-form';
import { useContext } from '../hooks/use-context';

// import { usePageStatus } from '../../hooks/use-page-status';
const { isReadonly, isGoodsEdit, goodsEditImg } = useContext();
const isDis = computed(() => {
  return isReadonly.value || isGoodsEdit.value || goodsEditImg.value;
});
const { form: formItem, temuReviewDatas, temu_defaultValue } = useForm();
const props = defineProps({
  catId: {
    type: String,
    default: '',
  },
  nameKey: {
    type: String,
    default: '',
  },
  attr: {
    type: Object as PropType<any>,
    default: () => {},
  },
  detail: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  detailCatId: {
    type: String,
    default: '',
  },
  isShowDetail: {
    type: Boolean,
    default: false,
  },
});

// 页面状态
// const { isCreate } = usePageStatus();
// 回显数据
const initForm = () => {
  if (!temuReviewDatas.value?.attrs?.length) return;
  form.value.list = [];
  const list = [] as IList[];
  (temuReviewDatas.value?.attrs ?? []).forEach((item: any) => {
    // 处理拉取temu商品数据不回显的问题
    if (!item.controlType && item.numberInputValue) {
      item.controlType = 16;
    }
    if (item.controlType === CONTROL_TYPE_ENUM.PROPERTY_CHOOSE_AND_INPUT && (`${item.pid}_${item.refPid}` === props.nameKey)) {
      list.push({
        numberInputValue: item.numberInputValue || '',
        vid: item?.vid?.toString() || '',
      });
    }
  });
  form.value.list = list.length ? list : [{ vid: '', numberInputValue: '' }];
};
watch(() => temuReviewDatas.value?.attrs, () => {
  initForm();
});
interface IList {
  vid: string;
  numberInputValue: string;
}
interface IForm {
  list: IList[];
}
// 成分
// console.log('temu_defaultValue.value', temu_defaultValue.value);
const vidName = temu_defaultValue.value.find((v: { label: string; }) => v.label === '材质')?.attributes?.find((v1: { code: string; }) => v1.code === 'defaultValue')?.name;
const form = ref({
  list: [
    {
      // 下拉框选择的值
      vid: (props.attr.values || []).find((v: { value: string; }) => v.value === vidName)?.vid,
      // 输入框输入的值
      numberInputValue: temu_defaultValue.value.find((v: { label: string; }) => v.label === '成分比例')?.attributes?.find(v1 => v1.code === 'defaultValue')?.name,
    },
  ],
} as IForm);

// 当商品品类变化时，重置表单
watch(
  () => formItem.value.catId,
  () => {
    onResetForm();
    initForm();
  },
);

// 重置表单
const onResetForm = () => {
  form.value = {
    list: [
      {
        // 下拉框选择的值
        vid: (props.attr.values || []).find((v: { value: string; }) => v.value === vidName)?.vid,
        // 输入框输入的值
        numberInputValue: temu_defaultValue.value.find((v: { label: string; }) => v.label === '成分比例')?.attributes?.find(v1 => v1.code === 'defaultValue')?.name,
      },
    ],
  } as IForm;
};

// 删除成分
const onIngredientsDelete = (index: number) => {
  form.value.list?.splice(index, 1);
};

// 添加成分
const onIngredientsAdd = () => {
  if (form.value.list.length > 9) {
    ElMessage.error('最多添加10个');
    return;
  }
  if (form.value.list.filter(v => !v.vid || !v.numberInputValue).length) {
    ElMessage.error('请先完善当前表格信息再添加');
    return;
  }
  form.value.list?.push({
    vid: '',
    numberInputValue: '',
  });
};

const onInputKeyup = ($index: number) => {
  let value = form.value.list[$index].numberInputValue;
  if (props.attr.minValue && props.attr.maxValue) {
    if (props.attr.valuePrecision === '0') {
      value = value?.replace(/^(0+)|[^\d]+/g, '');
    } else if (props.attr.valuePrecision === '2') {
      value = value?.replace(/[^\d\.]/g, ''); // eslint-disable-line no-useless-escape
      const reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g; // eslint-disable-line no-useless-escape
      if (reg.test(value)) {
        value = value?.replace(reg, '$2$3$4');
      }
    }
    form.value.list[$index].numberInputValue = value;
  }
};

const onValidateInput = (rule: any, value: string, callback: any) => {
  const { minValue, maxValue, inputMaxNum, valueRule, required } = props.attr;
  if (minValue && maxValue) {
    if (Number(value) < Number(minValue) || Number(value) > Number(maxValue)) {
      callback(new Error(`请输入${minValue}到${maxValue}之间的数值`));
    }
  }
  if (Number(inputMaxNum)) {
    if (value.length > Number(inputMaxNum)) {
      callback(new Error(`长度不得大于${inputMaxNum}`));
    }
  }

  if (valueRule === VALUE_RULE_ENUM.SUM_OF_VALUES_IS_100) {
    const existValue = form.value.list?.some(it => it.numberInputValue);
    if (required || existValue) {
      const sum = form.value.list?.reduce((pre, cur) => {
        return pre + Number(cur.numberInputValue);
      }, 0);
      if (sum !== 100) {
        callback(new Error(filters.getEnumLabel(VALUE_RULE_LIST, valueRule)));
      }
    }
  }

  callback();
};

// 下拉框选择的值
type ISelectedValue = Record<string, any>;
const selectedValue = computed(() => {
  const res = {} as ISelectedValue;
  form.value.list?.forEach((item: { vid: string; }) => {
    res[item.vid] = props.attr.values?.find((it: any) => it.vid === item.vid) || ({} as any);
  });
  return res;
});

// 格式化提交form并校验
const itemForm = ref<FormInstance>();
const onSubmit = async (isValida = true) => {
  let isValid = false;
  await itemForm.value?.validate((valid: boolean) => {
    if (valid || !isValida) {
      isValid = true;
    }
  });

  const postData = [] as any[];
  if (!isValid && isValida) return { isValid, data: [] };
  const { attr } = props;
  let num = 0;
  let fal = false;
  form.value.list.forEach((item: any, index: number) => {
    if (index !== 0 && (!item.vid || !item.numberInputValue)) {
      fal = true;
    }
    if (item.vid || item.numberInputValue) {
      num += Number(item.numberInputValue);
      const { value, extendInfo, group } = selectedValue.value[item.vid];
      // 编辑时且商品属性没变更的前提下，将 attrId 塞回去
      const attrId = '';
      // if (!props.detail?.length && props.detailCatId === props.catId) {
      //   const key = `${attr.pid}_${attr.refPid}`;
      //   attrId = props.detail.find(it => `${it.pid}_${it.refPid}` === key && it.vid === item.vid)?.attrId || '';
      // }

      postData.push({
        attrId,
        templatePid: attr.templatePid,
        pid: attr.pid,
        refPid: attr.refPid,
        propName: attr.name,
        vid: item.vid,
        propValue: value,
        valueUnit: attr.valueUnit?.[0] || '',
        numberInputValue: item.numberInputValue || '',
        valueExtendInfo: extendInfo,
        valueGroupId: group?.id,
        valueGroupName: group?.name,
        controlType: attr.controlType,
        saled: attr.isSale ? '1' : '0',
      });
    }
  });
  if (num !== 100 && attr.required && isValida) {
    isValid = false;
    ElMessage.error(`${attr.name}所有比例之和需等于100%`);
    num = 0;
    return { isValid, data: [] };
  }
  if (!attr.required && (num !== 0 && num !== 100) && isValida) {
    isValid = false;
    ElMessage.error(`${attr.name}所有比例之和需等于100%`);
    num = 0;
    return { isValid, data: [] };
  }
  if (fal && isValida) {
    isValid = false;
    ElMessage.error(`${attr.name}信息不完善`);
    return { isValid, data: [] };
  }
  if (!isValida) {
    setTimeout(() => {
      itemForm.value?.clearValidate();
    });
  }
  return { isValid, data: postData };
};

defineExpose({ onSubmit });

onMounted(() => {
  initForm();
});

const renderingAtt = (attr: any, row: { vid: string; }) => {
  return attr?.values?.find((it: { vid: string; }) => it.vid === row.vid)?.value;
};
</script>

<style lang="scss" scoped>
.btn-add {
  float: right;
  margin-bottom: 10px;
}
.el-button.is-circle {
  width: 24px;
  height: 24px;
  line-height: 24px;
}
.text-tip {
  color: var(--el-color-primary);
  font-weight: normal;
  line-height: 18px;
}
.el-form-item .el-form-item {
  margin-bottom: 13px;
}
.asterisk {
  color: #f56c6c;
  margin-right: 2px;
}
</style>
