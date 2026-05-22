<template>
  <ContentCard title="销售属性" responsive-row>
    <el-form-item
      label="风格"
      prop="clothingStyleCode"
      :rules="rules.clothingStyleCode"
    >
      <DictionarySelect v-model="formData.clothingStyleCode" :dictionary="DICTIONARY_KEY.PRODUCT_STYLE" />
    </el-form-item>
    <el-form-item
      label="印花类型"
      prop="printingCode"
      :rules="rules.printingCode"
    >
      <DictionarySelect v-model="formData.printingCode" :dictionary="DICTIONARY_KEY.FD_PRINTING" />
    </el-form-item>
    <el-form-item
      label="版型"
      prop="patternCode"
      :rules="rules.patternCode"
    >
      <DictionarySelect v-model="formData.patternCode" :dictionary="DICTIONARY_KEY.FIT" />
    </el-form-item>
    <el-form-item
      label="弹性"
      prop="elasticCode"
      :rules="rules.elasticCode"
    >
      <DictionarySelect v-model="formData.elasticCode" :dictionary="DICTIONARY_KEY.PLM_ELASTIC_REQUIREMENT" />
    </el-form-item>
    <el-form-item
      label="季节"
      prop="seasonCode"
      :rules="rules.seasonCode"
    >
      <DictionarySelect v-model="formData.seasonCode" :dictionary="DICTIONARY_KEY.PLM_REFERENCE_SEASON" />
    </el-form-item>
    <el-form-item
      label="节日"
      prop="galaCode"
      :rules="rules.galaCode"
    >
      <DictionarySelect v-model="formData.galaCode" :dictionary="DICTIONARY_KEY.FESTIVAL" />
    </el-form-item>
    <!-- <el-form-item label="场景" prop="sceneCode">
      <DictionarySelect v-model="formData.sceneCode" :dictionary="DICTIONARY_KEY.SCENE" />
    </el-form-item> -->
    <el-form-item
      label="视觉形式"
      prop="visualFormCode"
      :rules="rules.visualFormCode"
    >
      <DictionarySelect v-model="formData.visualFormCode" :dictionary="DICTIONARY_KEY.VISUAL_STYLE" />
    </el-form-item>
    <el-form-item
      label="SKU分类"
      prop="skuClassCode"
    >
      <DictionarySelect
        v-model="formData.skuClassCode"
        :dictionary="DICTIONARY_KEY.SKU_CLASSIFICATION"
        @change="(formData.suitPiece = null as any)"
      />
    </el-form-item>
    <el-form-item
      v-if="suitPieceLabel"
      :label="suitPieceLabel"
      prop="suitPiece"
      :rules="rules.suitPiece"
    >
      <input-number
        v-model="formData.suitPiece"
        :min="1"
        :max="99999"
        :precision="0"
        clearable
        placeholder="请输入数字"
      />
    </el-form-item>
    <el-form-item
      label="成衣毛重"
      prop="clothGrossWeight"
    >
      <input-number
        v-model="formData.clothGrossWeight"
        :min="0.01"
        :max="99999.99"
        :precision="2"
        clearable
        placeholder="请输入数字"
      >
        <template #append>g</template>
      </input-number>
    </el-form-item>
    <el-row
      v-for="(item, index) in formData.ingredients"
      :key="index"
      class="tw-flex"
      :col="{
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
      }"
    >
      <el-col v-bind="DEFAULT_COLS">
        <el-form-item
          label="成分"
          :prop="`ingredients[${index}].ingredientCode`"
          :rules="rules.ingredientCode"
        >
          <DictionarySelect v-model="item.ingredientCode" :dictionary="DICTIONARY_KEY.PLM_ELEMENT" />
        </el-form-item>
      </el-col>
      <el-col v-bind="DEFAULT_COLS">
        <el-form-item
          label="成分比例"
          :prop="`ingredients[${index}].ingredientRatio`"
          :rules="rules.ingredientRatio"
        >
          <div class="tw-flex tw-items-center tw-w-full">
            <input-number
              v-model="item.ingredientRatio"
              clearable
              placeholder="请输入数字"
              :max="100"
              :min="1"
            >
              <template #append>%</template>
            </input-number>
            <el-tooltip
              v-if="index === formData.ingredients.length - 1"
              content="没有更多成分可增加"
              :disabled="!isAllIngredientsAdded"
              placement="top"
            >
              <el-button
                class="tw-ml-2"
                type="primary"
                link
                :disabled="isAllIngredientsAdded"
                @click="handleAddElement"
              >增加</el-button>
            </el-tooltip>
            <el-button
              v-if="formData.ingredients.length > 1"
              class="tw-ml-2"
              type="danger"
              link
              @click="handleDeleteElement(index)"
            >删除</el-button>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
  </ContentCard>
</template>

<script setup lang="ts">
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { computed, PropType, watch } from 'vue';
import { IFormData } from '../types';
import ContentCard from './content-card.vue';
import { DEFAULT_COLS } from '../constant';
import { FormRules } from 'element-plus';
import { ISptoStyleCreateReqIngredient } from '../../../api/spot-style';
import { useDictionary } from '@/hooks/use-dictionary';
import { SKU_CATEGORY_ENUM } from '../../../constant';

const { getDictionaryOptions } = useDictionary();

const formData = defineModel({
  type: Object as PropType<Omit<IFormData, 'ingredients'> & { ingredients: Partial<ISptoStyleCreateReqIngredient>[]; }>,
  required: true,
});
const suitPieceLabel = computed(() => {
  if (formData.value.skuClassCode === SKU_CATEGORY_ENUM.MIXED) {
    return '套装件数';
  }
  if (formData.value.skuClassCode === SKU_CATEGORY_ENUM.MUTIPLE) {
    return '单品数量';
  }
  return '';
});

const dictIngredients = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_ELEMENT));

const props = defineProps({
  validateField: {
    type: Function as PropType<(field: string[]) => void>,
    required: false,
  },
});

const ingredientTotalRatio = computed(() => {
  return formData.value.ingredients.reduce((prev, curr) => prev + (curr.ingredientRatio || 0), 0);
});

const isAllIngredientsAdded = computed(() => {
  return formData.value.ingredients.length >= dictIngredients.value.length;
});

const rules: FormRules = {
  clothingStyleCode: { required: true, message: '请选择风格', trigger: 'change' },
  printingCode: { required: true, message: '请选择印花类型', trigger: 'change' },
  patternCode: { required: true, message: '请选择版型', trigger: 'change' },
  elasticCode: { required: true, message: '请选择弹性', trigger: 'change' },
  seasonCode: { required: true, message: '请选择季节', trigger: 'change' },
  visualFormCode: { required: true, message: '请选择视觉形式', trigger: 'change' },
  suitPiece: { required: true, message: '请输入数量', trigger: 'change' },
  ingredientCode: [
    { required: true, message: '请选择成分', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (formData.value.ingredients.filter(item => item.ingredientCode === value).length > 1) {
          callback(new Error('成分不能重复'));
          return;
        }
        callback();
      },
      trigger: 'change',
    },
  ],
  ingredientRatio: [
    { required: true, message: '请输入成分比例', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === 0) {
          callback(new Error('成分比例不能为0'));
          return;
        }
        if (ingredientTotalRatio.value !== 100) {
          callback(new Error(`成分比例之和必须为100%，现在为${ingredientTotalRatio.value}%`));
          return;
        }
        callback();
      },
      trigger: 'blur',
    },
  ],
};

watch(ingredientTotalRatio, (val) => {
  if (val === 100) {
    const fields = formData.value.ingredients.map((item, index) => `ingredients[${index}].ingredientRatio`);
    props.validateField?.(fields);
  }
});

const handleAddElement = () => {
  formData.value.ingredients.push({
    ingredientCode: '',
    ingredientRatio: 0,
  });
};

const handleDeleteElement = (index: number) => {
  formData.value.ingredients.splice(index, 1);
};

defineExpose({
  handleAddElement
});
</script>
