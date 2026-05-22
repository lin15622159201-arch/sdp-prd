<template>
  <ContentCard title="基础信息" responsive-row>
    <el-form-item
      label='品类'
      prop='categoryCode'
      :rules="rules.categoryCode"
    >
      <el-cascader
        v-model="categoryCodes"
        :options="CATEGORY_TREE"
        class='tw-w-100%'
        filterable
        show-all-levels
        clearable
        @change="handleCategoryChange"
      />
    </el-form-item>
    <el-form-item
      label='款式标签'
      prop='styleLabelCode'
      :rules="rules.styleLabelCode"
    >
      <DictionarySelect
        v-model="formData.styleLabelCode"
        :dictionary="DICTIONARY_KEY.PRODUCT_TAG"
      />
    </el-form-item>
    <el-form-item
      label='店铺'
      prop='storeId'
      :rules="rules.storeId"
    >
      <DictionarySelect
        v-model="formData.storeId"
        :dictionary="CUSTOM_DICTIONARY_KEY.SHOP_LIST"
      />
    </el-form-item>
    <el-form-item
      label='尺码组'
      prop='sizeStandardCode'
      :rules="rules.sizeStandardCode"
    >
      <DictionarySelect
        v-model="formData.sizeStandardCode"
        :disabled="isSizeStandardDisabled"
        :dictionary="DICTIONARY_KEY.PLM_STANDARY_SIZE"
      />
    </el-form-item>
    <el-form-item
      label='波段'
      prop='waveBandCode'
      :rules="rules.waveBandCode"
    >
      <DictionarySelect
        v-model="formData.waveBandCode"
        :dictionary="DICTIONARY_KEY.PLM_CLOTHING_BAND"
      />
    </el-form-item>
    <el-form-item
      label='款式等级'
      prop='styleLevelCode'
      :rules="rules.styleLevelCode"
    >
      <DictionarySelect
        v-model="formData.styleLevelCode"
        :dictionary="DICTIONARY_KEY.PRODUCT_LEVEL"
      />
    </el-form-item>
    <el-form-item
      label='品质等级'
      prop='qualityLevelCode'
      :rules="rules.qualityLevelCode"
    >
      <DictionarySelect
        v-model="formData.qualityLevelCode"
        :dictionary="DICTIONARY_KEY.PLM_QUALITY_LEVEL"
      />
    </el-form-item>
    <el-form-item
      label='织造方式'
      prop='weaveModeCode'
      :rules="rules.weaveModeCode"
    >
      <DictionarySelect
        v-model="formData.weaveModeCode"
        :dictionary="DICTIONARY_KEY.APS_CATEGORY_TYPE"
      />
    </el-form-item>
    <el-form-item
      label='平台'
      prop='platformCode'
      :rules="rules.platformCode"
    >
      <DictionarySelect
        v-model="formData.platformCode"
        :dictionary="DICTIONARY_KEY.STOCKGOODS_TYPE"
      />
    </el-form-item>
    <el-form-item
      label='商品链接'
      prop="commodityLink"
      :col="{
        xs: 24,
        sm: 24,
        md: 16,
        xl: 16,
        lg: 18,
      }"
    >
      <el-input
        v-model="formData.commodityLink"
        :maxlength="500"
      />
    </el-form-item>
  </ContentCard>
</template>

<script setup lang='ts'>
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { computed, PropType, watch } from 'vue';
import { IFormData } from '../types';
import ContentCard from './content-card.vue';
import { CascaderOption } from 'element-plus';
import { ISpotStyleDetailRes } from '../../../api/spot-style';

const formData = defineModel({
  type: Object as PropType<IFormData>,
  required: true
});

const props = defineProps<{
  isCreate: boolean;
  detailData?: ISpotStyleDetailRes;
}>();

const rules = {
  categoryCode: { required: true, message: '请选择品类', trigger: 'change' },
  styleLabelCode: { required: true, message: '请选择标签', trigger: 'change' },
  storeId: { required: true, message: '请选择店铺', trigger: 'change' },
  sizeStandardCode: { required: true, message: '请选择尺码组', trigger: 'change' },
  waveBandCode: { required: true, message: '请选择波段', trigger: 'change' },
  styleLevelCode: { required: true, message: '请选择款式等级', trigger: 'change' },
  qualityLevelCode: { required: true, message: '请选择品质等级', trigger: 'change' },
  weaveModeCode: { required: true, message: '请选择织造方式', trigger: 'change' },
  platformCode: { required: true, message: '请选择平台', trigger: 'change' },
};

const { getDictionaryOptions } = useDictionary();

const CATEGORY_TREE = computed(() => getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY) as CascaderOption[]);

// 计算尺码组是否应该禁用
const isSizeStandardDisabled = computed(() => {
  // 创建模式不禁用
  if (props.isCreate || !props.detailData) {
    return false;
  }
  
  const { skcs } = props.detailData;
  // 如果没有SKC数据，默认禁用
  if (!skcs || skcs.length === 0) {
    return true;
  }
  
  // 检查所有SKC是否都满足可编辑条件
  // 上架状态为待推送(upcoming="NO")或发布失败(onShelvesFail="YES")
  // 且推送买手状态为待推送(pushedBuyer="NO")或推送失败(pushFailed="YES")
  const allMeetCondition = skcs.every((skc: any) => {
    const upcomingCondition = (skc.upcoming === 'NO' && skc.onShelvesFail !== 'YES' && skc.onShelves !== 'NO' && skc.onShelves !== 'YES') || skc.onShelvesFail === 'YES';
    const pushedBuyerCondition = (skc.pushedBuyer === 'NO' && skc.buyerCancelled !== 'YES') || skc.pushFailed === 'YES';
    const sold = skc.sold === 'NO';
    return upcomingCondition && pushedBuyerCondition && sold;
  });
  return !allMeetCondition;
});

// 品类切换时自动设置尺码组
const handleCategoryChange = (value: any) => {
  if (!value || value.length === 0) return;
  
  // 如果尺码组被禁用，不执行自动设置逻辑
  if (isSizeStandardDisabled.value) {
    return;
  }
  
  // 获取第一级品类编码
  const firstLevelCode = value[0];
  
  // 在品类树中查找第一级品类
  const firstLevelCategory = CATEGORY_TREE.value?.find(item => item.value === firstLevelCode);
  if (firstLevelCategory && firstLevelCategory.attributes && Array.isArray(firstLevelCategory.attributes)) {
    const defaultSizeAttr = firstLevelCategory.attributes?.find((attr: any) => attr.code === 'default_size');
    if (defaultSizeAttr && defaultSizeAttr.name) {
      formData.value.sizeStandardCode = defaultSizeAttr.name;
      if ('sizeStandardName' in formData.value) {
        (formData.value as any).sizeStandardName = defaultSizeAttr.name;
      }
    }
  }
};

const categoryCodes = computed({
  get() {
    return formData.value.categoryCode?.split('-');
  },
  set(value) {
    formData.value.categoryCode = value?.join('-');
  }
});
</script>
