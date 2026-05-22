<template>
  <div class="tw-flex">
    <styleList
      :selecteds="selecteds"
      :sign="sign"
      :is-batch="isBatch"
      :data="renderList"
      :scrollEl="scrollEl"
      @on-sign="toSign"
      @on-batch-sign="selectPlan"
      @on-select="handleSelectChange"
    />
    <!-- 占位 表单的宽度 -->
    <div v-if="sign" class="tw-w-350px tw-shrink-0" />
    <el-scrollbar
      v-if="sign"
      always
      class="tw-w-340px tw-h-100% tw-p-16px tw-position-absolute tw-top-0 tw-right-10px tw-bg-#efefef tw-z-99"
    >
      <div>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >{{('全选')}}</el-checkbox>
      </div>
      <div v-if="selectedPicsTab.length" class="tw-mb-6px">
        <el-radio-group v-model="activeName">
          <el-radio-button
            v-for="item in selectedPicsTab"
            :key="item.id"
            :label="item.id"
            :value="item.id"
          >{{ item.name }}</el-radio-button>
        </el-radio-group>
      </div>
      <el-form
        label-suffix="："
        :model="formData"
        :rules="rules"
        ref="formRef"
        label-width="auto"
      >
        <!-- { required: true, message: ('请选择选图结果'), trigger: 'change' } -->
        <el-form-item
          :label="('选择结果')"
          prop="pickingState"
          :rules="[]"
        >
          <el-radio-group v-model="formData.pickingState">
            <el-radio
              :label="PICK_STATE_ENUM.YES"
              :value="PICK_STATE_ENUM.YES"
            >{{('可用')}}</el-radio>
            <el-radio
              :label="PICK_STATE_ENUM.NO"
              :value="PICK_STATE_ENUM.NO"
            >{{('不可用')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="formData.pickingState === PICK_STATE_ENUM.YES">
          <el-form-item :label="('建议价格')" prop="suggestedPrice">
            <el-input-number
              v-model="formData.suggestedPrice"
              :controls="false"
              :min="0.01"
              :precision="2"
            />
          </el-form-item>
          <el-form-item :label="('建议风格')" prop="styles">
            <el-cascader
              ref="styleCascader"
              v-model="formData.styles"
              :options="styleOptions"
              filterable
              clearable
              @change="() => handleStyleChange()"
            />
          </el-form-item>
          <el-form-item :label="('建议类目')" prop="category">
            <el-cascader
              ref="categoryCascader"
              v-model="formData.category"
              :options="categoryOptions"
              filterable
              clearable
              popper-class="planning-categoryCascader"
              @change="() => handleCategoryChange()"
            />
            <p>
              <el-text type="primary">计划落坑：{{ implementInfo.plan }} 已落坑：{{ implementInfo.has }}</el-text>
            </p>
          </el-form-item>
          <el-form-item :label="('场景')" prop="sceneCode">
            <el-select
              v-model="formData.sceneCode"
              clearable
              style="width: 100%;"
              @change="handleSceneChange"
            >
              <el-option
                v-for="item in sceneList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="('建议波段')" prop="wave">
            <el-cascader
              v-model="formData.wave"
              :options="bandOptions"
              :props="{
                value: 'label',
              }"
              filterable
              clearable
            />
          </el-form-item>
          <el-form-item :label="('建议店铺')" prop="suggestedShopId">
            <el-select
              v-model="formData.suggestedShopId"
              clearable
              style="width: 100%;"
              @change="handleShopChange"
            >
              <el-option
                v-for="item in shopList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="('建议国家')" prop="suggestedCountrySiteCode">
            <el-select
              v-model="formData.suggestedCountrySiteCode"
              clearable
            >
              <el-option
                v-for="item in countryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="('建议印花')" prop="suggestedPrintingCode">
            <el-select
              v-model="formData.suggestedPrintingCode"
              clearable
            >
              <el-option
                v-for="item in printingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="货盘类型" prop="cargoTrayCode">
            <el-select
              v-model="formData.cargoTrayCode"
              clearable
            >
              <el-option
                v-for="item in cargoTrayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品主题" prop="productTheme">
            <el-select
              v-model="formData.productTheme"
              clearable
            >
              <el-option
                v-for="item in productThemeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
          <div class="tw-mb-12px">
            <p><el-text type="warning">请选择要修图的图片，以方便定位问题</el-text></p>
            <p><el-text type="danger">已选{{ fixImageCount }}张</el-text></p>
          </div>
          <el-form-item :label="('备注')" prop="remark">
            <el-input
              type="textarea"
              v-model="formData.remark"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item :label="('上传图片')" prop="fileList">
            <uploader
              v-model="formData.fileList"
              :size-limit="10"
              :limit="3"
              accept=".jpg,.png,.jpeg"
              multiple
              :tips="`${('数量限制')} 3，${('格式限制')} png、jpg、jpeg`"
              structure="vertical"
              checkAccept
              listType="text"
              size="mini"
            />
          </el-form-item>
        </template>
        <template v-if="formData.pickingState === PICK_STATE_ENUM.NO">
          <el-form-item label="跑图问题反馈" prop="problemCodes">
            <el-cascader
              ref="problemCascader"
              v-model="formData.problemCodes"
              :options="runningDiagramOptions"
              filterable
              clearable
              :show-all-levels="false"
              :props="{ multiple: true }"
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="3"
              @change="() => handleProblemChange()"
            />
          </el-form-item>
        </template>
      </el-form>
      <div class="tw-flex">
        <el-button @click="handleCancle">{{('取消')}}</el-button>
        <el-button type="primary" @click="() => handleSure()">{{('确认标记')}}</el-button>
        <el-button
          v-if="!isBatch"
          type="primary"
          @click="handleSubmitNext"
        >
          提交并查看下一个
        </el-button>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType, ref, defineEmits, watchEffect, defineExpose, computed, watch } from 'vue';
import { PICK_STATE_ENUM, TASK_TYPE } from '@/modules/selection-manage/aigc-selection-list/constant';
import { resizeImgByWidth } from '@/core/utils/helper';
import { ElMessage, ElForm, FormRules, CheckboxValueType, CascaderOption, ElCascader } from 'element-plus';
import {
  pickingStyleConfirm,
  pickingStyleConfirmBatch,
  batchConfirm,
} from '@/modules/selection-manage/aigc-selection-list/api';
import {
  IPickingStylePageResListItem,
  IPickingStyleConfirmReqResultDetail,
  IPickingStyleConfirmReqResultItem,
} from '@/modules/selection-manage/aigc-selection-list/api/type';
// import { getShopList as getShopOptions } from '@/api/query-options';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import type { IFile } from '@/components/uploader/packages/types';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { cloneDeep } from 'lodash-es';
import { IOption } from '@/types';
import styleList from './style-list.vue';
import { useRouter } from 'vue-router';
import {
  IPicList,
  IDataItem,
  ISelectIdList,
  IFormData,
  ISelectedPicsTab,
} from '../type';
import { useGetScene } from '../hooks/use-get-scene';

// 获取路由实例
const router = useRouter();
const emits = defineEmits(['update:sign', 'success', 'next']);
const props = defineProps({
  data: {
    type: Array as PropType<IPickingStylePageResListItem[]>,
    default: () => [],
  },
  sign: {
    type: Boolean,
    default: false,
  },
  scrollEl: {
    type: Object as PropType<HTMLElement>,
  },
});

const { getEnableDictionaryOptions } = useDictionary();
const bandOptions = computed(() => {
  return getEnableDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) as unknown as CascaderOption[];
});
const categoryOptions = computed(() => {
  return getEnableDictionaryOptions(DICTIONARY_KEY.CATEGORY) as unknown as CascaderOption[];
});
const styleOptions = computed(() => {
  return getEnableDictionaryOptions(DICTIONARY_KEY.JV_STYLE) as unknown as CascaderOption[];
});
const runningDiagramOptions = computed(() => {
  return getEnableDictionaryOptions(DICTIONARY_KEY.RUNNING_DIAGRAM) as unknown as CascaderOption[];
});
const printingOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.FD_PRINTING));
const countryOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.LAZADA_NATIONAL));
const cargoTrayOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.CARGOTARY));
const productThemeOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.PRODUCT_THEME).map(
  item => ({ ...item, value: `${item.value}>${item.label}` })
));

const { sceneList } = useGetScene();

const shopList = ref<IOption[]>([]);
const categoryCascader = ref<InstanceType<typeof ElCascader>>();
const styleCascader = ref<InstanceType<typeof ElCascader>>();
const problemCascader = ref<InstanceType<typeof ElCascader>>();

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const initFormData = (): IFormData => {
  return {
    pickingState: null as unknown as PICK_STATE_ENUM,
    suggestedPrice: null as unknown as number,
    styles: null as unknown as string[],
    styleName: '',
    category: null as unknown as string[],
    categoryName: '',
    wave: null as unknown as string[],
    problemCodes: null as unknown as string[][],
    suggestedShopName: '',
    suggestedShopId: '',
    suggestedCountrySiteCode: '',
    suggestedPrintingCode: '',
    cargoTrayCode: '',
    remark: '',
    fileList: [] as IFile[],
    sceneCode: '',
    sceneName: '',
    productTheme: '',
  };
};
const formData = ref(initFormData());
const rules = computed<FormRules<IFormData>>(() => {
  return {
    // suggestedPrice: [{ required: true, message: `${('请输入')} ${('建议价格')}`, trigger: 'blur' }],
    // styles: [{ required: true, message: `${('请选择')} ${('建议风格')}`, trigger: 'change' }],
    // category: [{ required: true, message: `${('请选择')} ${('建议类目')}`, trigger: 'change' }],
    // sceneCode: [{ required: true, message: `${('请选择')} ${('场景')}`, trigger: 'change' }],
    // suggestedShopId: [{ required: true, message: `${('请选择')} ${('建议店铺')}`, trigger: 'change' }],
    // productTheme: [{ required: true, message: `${('请选择')} ${('商品主题')}`, trigger: 'change' }],
  };
});

// 被选中的任务
const selecteds = ref<string[]>([]);
// 选中状态
const checkAll = ref(false);
const isIndeterminate = ref(false);
// 是否批量标记
const isBatch = ref(false);

// 备份源数据
const originDataMap = new Map<string, IDataItem>();
// 计划落坑数
const implementInfo = ref({
  plan: 0,
  has: 0,
});

// 渲染数据
const renderList = ref<IDataItem[]>([]);
watchEffect(() => {
  renderList.value = props.data?.map((item) => {
    const { pickingStyleDetails } = item;
    const target = pickingStyleDetails.map((i) => {
      const pickingStyleImages = i.pickingStyleImages.map(j => ({
        ...j,
        pictureUrl: resizeImgByWidth(j.pictureUrl, 300),
        idx: +j.serialNum,
      }));
      return {
        ...i,
        pickingStyleImages,
        previewSrcs: i.pickingStyleImages.map(j => j.pictureUrl),
        select: false,
        idx: +i.sortOrder,
      };
    });
    return {
      ...item,
      pickingStyleDetails: target,
      select: false,
    };
  }) ?? [];
});

// 当前选中款式图片
const activeName = ref('');
const selectedPicsTab = ref<ISelectedPicsTab[]>([]);

watch(() => activeName.value, (val, oldValue) => {
  // 根据所选图片储存并回显表单数据
  if (val && oldValue) {
    const previous = selectedPicsTab.value.find(i => i.id === oldValue);
    previous && (previous.data = cloneDeep(formData.value));
    const current = selectedPicsTab.value.find(i => i.id === val);
    current && (formData.value = cloneDeep(current.data));
  }
});

/** 已选修图张数 */
const fixImageCount = computed(() => {
  let total = 0;
  renderList.value.filter(i => selecteds.value.includes(i.pickingId)).forEach((item) => {
    item.pickingStyleDetails.forEach((style) => {
      if (style.pickingStyleId === activeName.value) {
        total = style.pickingStyleImages.filter(i => i.fixImageType === YES_NO_NUMBER_ENUM.YES).length;
      }
    });
  });
  return total;
});

/**
 * 重置选择项
 * @param isCancle 是否取消标记
 */
const resetData = (isCancle = false) => {
  // formRef.value?.resetFields();
  selecteds.value = [];
  if (isCancle) {
    const ids = [...originDataMap.keys()];
    ids.forEach((id) => {
      const idx = renderList.value.findIndex(i => id === i.pickingId);
      const data = originDataMap.get(id)!;
      renderList.value[idx] = data;
    });
  } else {
    renderList.value.forEach((item) => {
      item.select = false;
      const { pickingStyleDetails } = item;
      pickingStyleDetails.forEach((i) => {
        i.select = false;
      });
    });
  }
  originDataMap.clear();
  checkAll.value = false;
  isIndeterminate.value = false;
  isBatch.value = false;
  activeName.value = '';
  formData.value = initFormData();
  selectedPicsTab.value = [];
};

/** 处理单次任务标记时的表单回显 */
const getSelectedPicsTabData = () => {
  if (!isBatch.value) {
    const target = renderList.value.find(i => selecteds.value.includes(i.pickingId));
    const res = target?.pickingStyleDetails?.filter(i => i.select).map((i) => {
      // 优先保留已填过的数据
      const { data: hasData } = selectedPicsTab.value.find(j => j.id === i.pickingStyleId) ?? {};
      let initData = initFormData();
      // 其次使用上一次提交(接口返回)的数据
      const { resultDetail } = i;
      if (resultDetail) {
        const { attachments, suggestedWaveBatchCode, suggestedPrice, suggestedCategoryName,
          suggestedStyleName, suggestedStyleCode, suggestedCategoryCode,
          runningDiagramProblemCodes, sceneCode, sceneName, productThemeCode, productThemeName,
          ...other } = resultDetail;
        const fileList = attachments.map(k => ({
          url: k.fileUrl,
          name: k.fileName,
          type: k.fileType,
        }));
        initData = {
          productTheme: productThemeCode ? `${productThemeCode}>${productThemeName}` : '',
          ...other,
          pickingState: null as unknown as PICK_STATE_ENUM,
          fileList,
          suggestedPrice: suggestedPrice ? +suggestedPrice : null as unknown as number,
          wave: suggestedWaveBatchCode ? suggestedWaveBatchCode.split('>') : [],
          styles: suggestedStyleCode ? suggestedStyleCode.split('>') : [],
          styleName: suggestedStyleName,
          category: suggestedCategoryCode ? suggestedCategoryCode.split('>') : [],
          categoryName: suggestedCategoryName,
          problemCodes: runningDiagramProblemCodes?.length ? runningDiagramProblemCodes.map(j => j.split('>')) : [],
          sceneCode,
          sceneName,
        };
      }
      if (i.pickingState !== PICK_STATE_ENUM.WAIT) {
        initData.pickingState = i.pickingState;
      }
      return {
        id: i.pickingStyleId,
        name: `${('款式')}${i.idx}`,
        data: hasData || initData,
      };
    }) ?? [];
    selectedPicsTab.value = res;

    // 校准当前选中图片
    if (res.length === 0) {
      activeName.value = '';
      formData.value = initFormData();
    } else if (!res.some(i => i.id === activeName.value)) {
      const { id, data } = res[0];
      activeName.value = id;
      data && (formData.value = cloneDeep(data));
    }
  }
};

/** 标记时全选款式 */
const handleCheckAllChange = (val: CheckboxValueType) => {
  renderList.value.forEach((item) => {
    if (selecteds.value.includes(item.pickingId)) {
      item.pickingStyleDetails.forEach((i) => {
        if (i.pickingState === PICK_STATE_ENUM.YES) return;
        i.select = val as boolean;
      });
    }
  });
  isIndeterminate.value = false;

  getSelectedPicsTabData();
};

/** 单个款式选择 */
const handleSelectChange = () => {
  const selectCount = renderList.value.filter(item => selecteds.value.includes(item.pickingId))
    .reduce((pre, cur) => {
      const { selected, all } = pre;
      return {
        selected: selected + cur.pickingStyleDetails.filter(i => i.select).length,
        all: all + cur.pickingStyleDetails.length
      };
    }, { selected: 0, all: 0 });
  checkAll.value = selectCount.selected === selectCount.all;
  isIndeterminate.value = selectCount.selected > 0 && selectCount.selected < selectCount.all;

  getSelectedPicsTabData();
};

/** 多选任务项标记 */
const selectPlan = (id: string, val: CheckboxValueType) => {
  renderList.value.find(i => i.pickingId === id)?.pickingStyleDetails.forEach((i) => {
    i.select = !!val;
  });
  handleSelectChange();
};

/** 单选任务项标记 */
const toSign = (item: any) => {
  if (item.origin === TASK_TYPE.AIDesign) {
    router.push({
      path: '/selection-manage/quick-selection',
      query: {
        taskCode: item.taskCode
      }
    });
    return;
  }
  router.push({
    path: `/selection-manage/quick-selection-fission/${item.origin}`,
    query: {
      taskCode: item.taskCode
    },
  });

  // isBatch.value = false;
  // selectedPicsTab.value = [];
  // const data = renderList.value.find(i => i.pickingId === id)!;
  // originDataMap.set(id, cloneDeep(data));
  // selecteds.value = [id];
  // emits('update:sign', true);
};

/** 取消标记 */
const handleCancle = () => {
  emits('update:sign', false);
  resetData(true);
};

/** 批量标记全选 */
const selectAll = () => {
  isBatch.value = true;
  renderList.value.forEach((item) => {
    originDataMap.set(item.pickingId, cloneDeep(item));
  });
  selecteds.value = renderList.value.map(i => i.pickingId);
};

/** 获取级联label */
const getCascaderLabels = (el?: InstanceType<typeof ElCascader>) => {
  const [node] = el?.getCheckedNodes(false) ?? [];
  const { pathLabels = [] } = node ?? {};
  return pathLabels;
};

const handleCategoryChange = () => {
  formData.value.categoryName = getCascaderLabels(categoryCascader.value).join('>');
  getImplement();
};

const handleStyleChange = () => {
  formData.value.styleName = getCascaderLabels(styleCascader.value).join('>');
};

const handleProblemChange = () => {
  // formData.value.problemNames = getCascaderLabels(problemCascader.value).join('>');
};

/**
 * 提交
 * @param isNext 是否继续下一个任务
 */
const handleSure = async (isNext = false) => {
  const selectIdList = new Map<string, ISelectIdList>([]);
  const picMap = new Map<string, IPicList[]>();
  renderList.value.filter(i => selecteds.value.includes(i.pickingId)).forEach((item) => {
    const check: string[] = [];
    const uncheck: string[] = [];
    item.pickingStyleDetails.forEach((i) => {
      if (i.select) {
        check.push(i.pickingStyleId);
      } else {
        uncheck.push(i.pickingStyleId);
      }
      picMap.set(i.pickingStyleId, i.pickingStyleImages);
    });
    if (check.length) {
      selectIdList.set(item.pickingId, { check, uncheck, status: item.state });
    }
  });
  if (selectIdList.size === 0) {
    ElMessage.error(('请选择要标记的款式'));
    return Promise.reject('fail');
  }
  await formRef.value?.validate();
  // 组装选款图片信息
  const getImageInfos = (id: string) => {
    const pickingStyleImages = picMap.get(id) ?? [];
    const imageInfos = pickingStyleImages.map((j) => {
      const { pickingPictureId, serialNum, mainImageType, fixImageType,
        eliminateType, eliminateReasonCodes } = j;
      return {
        pickingPictureId,
        serialNum,
        mainImageType,
        fixImageType,
        eliminateType,
        eliminateReasonCodes,
      };
    });
    return imageInfos;
  };
  if (!isBatch.value) {
    console.log('>>>>>', selectIdList, selectedPicsTab.value);
    const pickingId = selecteds.value[0];
    // 补完当前选图数据
    const current = selectedPicsTab.value.find(i => i.id === activeName.value);
    current && (current.data = cloneDeep(formData.value));
    //
    const { check = [], uncheck = [], status } = selectIdList.get(pickingId) ?? {};
    const result: IPickingStyleConfirmReqResultItem[] = check.map((i) => {
      const { data } = selectedPicsTab.value.find(j => j.id === i) ?? {};
      const imageInfos = getImageInfos(i);
      const {
        pickingState = '' as unknown as PICK_STATE_ENUM,
        styleName, categoryName, problemCodes = [],
        fileList = [], wave = [], styles = [], category = [], ...residue } = data ?? {};
      const [productThemeCode, productThemeName] = data?.productTheme?.split('>') || [];
      const resultDetail: IPickingStyleConfirmReqResultDetail = pickingState === PICK_STATE_ENUM.YES ? {
        ...residue,
        attachments: fileList.map(k => ({
          fileUrl: k.url,
          fileName: k.name,
          fileType: k.type,
        })),
        suggestedWaveBatchCode: wave?.join('>'),
        suggestedStyleCode: styles?.join('>'),
        suggestedStyleName: styleName,
        suggestedCategoryCode: category?.join('>'),
        suggestedCategoryName: categoryName,
        productThemeCode,
        productThemeName,
      } : {
        runningDiagramProblemCodes: problemCodes?.map(k => k.join('>')),
      };
      return {
        pickingStyleId: i,
        pickingState,
        imageInfos,
        resultDetail,
      };
    });
    const isIncomplete = result.some((i) => {
      const { pickingState, resultDetail: { suggestedPrice, suggestedStyleCode, suggestedCategoryCode } = {} } = i;
      return !pickingState || (pickingState === PICK_STATE_ENUM.YES
        && (!suggestedPrice || !suggestedStyleCode || !suggestedCategoryCode));
    });
    // if (isIncomplete) {
    //   ElMessage.error(('请填写完整要标记的图片信息'));
    //   return Promise.reject('fail');
    // }
    // 当前任务待选择时，未被标记的数据默认赋值
    if (status === YES_NO_NUMBER_ENUM.NO) {
      const unResult = uncheck.map((i) => {
        const imageInfos = getImageInfos(i);
        return {
          pickingStyleId: i,
          pickingState: PICK_STATE_ENUM.NO,
          imageInfos,
        };
      });
      result.push(...unResult);
    }
    await pickingStyleConfirm({ pickingId, result });
  } else {
    // 废弃，批量标记功能取消，无此接口
    const { pickingState, fileList, wave, styles, category, ...residue } = formData.value;
    const attachments = fileList.map(i => ({ fileUrl: i.url, fileName: i.name, fileType: i.type }));
    const availableDetail = {
      ...residue,
      suggestedWaveBatchCode: wave?.join('>'),
      suggestedStyleCode: styles?.join('>'),
      suggestedStyleName: '',
      suggestedCategoryCode: category?.join('>'),
      suggestedCategoryName: '',
      attachments,
    };
    const confirmDetailIds = Array.from(selectIdList).map((i) => {
      const [pickingId, { check, uncheck, status }] = i;
      let other: string[] = [];
      // 当前任务待选择时，未被标记的数据默认赋值
      if (status === YES_NO_NUMBER_ENUM.NO) {
        if (pickingState === PICK_STATE_ENUM.YES) {
          other = uncheck;
        }
        if (pickingState === PICK_STATE_ENUM.NO) {
          check.push(...uncheck);
        }
      }
      const availablePickingStyleDetailIds = pickingState === PICK_STATE_ENUM.YES ? check : other;
      const unAvailablePickingStyleDetailIds = pickingState === PICK_STATE_ENUM.NO ? check : other;
      return {
        pickingId,
        availablePickingStyleDetailIds,
        unAvailablePickingStyleDetailIds,
      };
    });
    await pickingStyleConfirmBatch({ availableDetail, confirmDetailIds });
  }
  ElMessage.success(('标记成功'));
  resetData();
  if (isNext) return Promise.resolve('success');
  emits('update:sign', false);
  emits('success');
  return Promise.resolve('success');
};

/** 提交并查看下一款 */
const handleSubmitNext = async () => {
  const preId = selecteds.value[0];
  const preIndex = renderList.value.findIndex(i => i.pickingId === preId);
  let nextIndex = preIndex + 1;
  if (nextIndex === renderList.value.length) nextIndex = 0;
  await handleSure(true);
  if (nextIndex !== 0) {
    const nextId = renderList.value[nextIndex].pickingId;
    toSign(nextId);
  }
  emits('next', nextIndex);
};

/** 获取店铺 */
// const getShopList = async () => {
//   const { data } = await getShopOptions({});
//   shopList.value = data.map(i => ({
//     value: i.shopId!,
//     label: i.shopName!,
//   }));
// };
// getShopList();
const handleShopChange = (val: string) => {
  const target = shopList.value.find(i => i.value === val);
  formData.value.suggestedShopName = target?.label ?? '';
  getImplement();
};

/** 获取落坑数 */
const getImplement = async () => {
  const { category, suggestedShopId } = formData.value;
  if (!category?.length || !suggestedShopId) {
    implementInfo.value = {
      plan: 0,
      has: 0,
    };
    return;
  }
  const params = {
    categoryCode: [...category].pop()!,
    shopId: suggestedShopId,
    supplyModeCode: 'Artificial',
  };
  const { data } = await batchConfirm(params);
  implementInfo.value = {
    plan: +data.planningTotalQuantity,
    has: +data.finishTotalQuantity,
  };
};

const handleSceneChange = (val: string) => {
  formData.value.sceneName = sceneList.value.find(i => i.value === val)?.label ?? '';
};

defineExpose(({
  selectAll,
  resetData,
  toSign,
  handleCancle,
}));

</script>
<style lang="scss">
.planning-categoryCascader {
  .el-cascader__suggestion-panel {
    .el-cascader__suggestion-list {
      .el-cascader__suggestion-item {
        height: auto;
        // min-height: 34px;
        padding-top: 7px;
        padding-bottom: 7px;
      }
    }
  }
}
</style>
