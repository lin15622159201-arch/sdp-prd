<script lang="ts" setup>
import { ref, PropType, computed, nextTick, watch } from 'vue';
import { ElForm, FormRules, ElMessage } from 'element-plus';
import { ICategoryItem, ITaskSubmitReq } from '@/modules/inspiration-center/inspiration-source/api/type';
import { RecommendPageResModelMaterialLibraryFileListItem } from '@/modules/inspiration-center/components/select-scene-and-model/api/type';
import { findTreeNodeProperty } from '@/core/utils/fun-utils';
import { GENERATE_MODE, MODEL_TYPE, SUPPLY_METHOD } from '@/modules/inspiration-center/inspiration-source/constant';
import { useEditPhotoDialog } from '@/components/use-edit-photo-dialog';
import { useDictionary } from '@/hooks/use-dictionary2';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import SelectGenerateMode from '@/modules/inspiration-center/components/select-generate-mode.vue';
import SceneModelDialog from './scene-model-dialog.vue';
import LlstOfFavoriteStyleModels from '@/components/favorite-style-models/llst-of-favorite-style-models.vue';
import { Edit, CopyDocument } from '@element-plus/icons-vue';
import { taskSubmit, reSubmitDetail, inspirationEditImageApi, pictureCaptionCreateApi, styleModelDetailApi } from '../api';
import {
  ISceneAndModel,
  IModelInfo,
} from '@/modules/inspiration-center/components/select-scene-and-model/type';
import { ITableItem } from '@/modules/inspiration-center/inspiration-source/views/list/type';
import { resizeImgByWidth } from '@/core/utils/helper';
import FgModelSelect from './model-select/index.vue';
import ReferenceWeight from './reference-weight/index.vue';
import { YES_NO_NUMBER_ENUM } from '@/constant';
import { REF_WEIGHT_READABLE } from './model-select/constant';
import { handleGetCategory } from './category-select/use-get-options';
import CategorySelect from './category-select/index.vue';
import { useGetOptions } from './model-select/use-get-options';
import { getConfig } from '../../lib/config';
import zwtp from '@/assets/zwtp.png';
import { StyleModelUserCollectPageResListItem } from '@/components/favorite-style-models/api/types';
import { useRouter } from 'vue-router';


type FromData = ITaskSubmitReq;
const dialogTableVisible = ref(false);
const props = defineProps({
  ids: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  selectItems: {
    type: Array as PropType<ITableItem[]>,
    default: () => [],
  },
  moduleValue: {
    type: Boolean,
    default: false,
  },
  // 是否批量提交
  isBatch: {
    type: Boolean,
    default: false,
  },
  // 任务数据
  taskData: {
    type: Object as PropType<ITableItem>,
    default: () => ({}),
  },
});
const isBackPosture = ref<GENERATE_MODE>(GENERATE_MODE.SINGLE_POSE);
const { fgModelVersion } = useGetOptions();
const emits = defineEmits(['update:modelValue', 'success', 'next']);
const { getEnableDictionaryOptions } = useDictionary();
const wavesOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.WAVEBATCH));
const supplyOptions = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.SUPPLY_MODE));
const SceneModelDialogRef = ref<InstanceType<typeof SceneModelDialog> | null>(null);
// 数量
const generateNumList = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.FGOUTPUTNUM));
const fgloraSizeList = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.NEST_FGLORASIZE));
// 风格参考
const enableFollowabilityList = computed(() => getEnableDictionaryOptions(DICTIONARY_KEY.FG_LORA_FOLLOW));
const treeList = ref<ICategoryItem[]>([]);
const getCategoryList = async () => {
  treeList.value = await handleGetCategory();
};

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const initFormData = (): FromData => ({
  newGenerateNum: 6,
  waveBatchCode: '',
  supplyMethod: '',
  generateMode: GENERATE_MODE.MULTI_POSE,
  generateNum: Number(generateNumList?.value?.[0]?.label),
  expectedCostPrice: 0,
  modelInfo: {
    aiModelCode: '',
    aiModelName: '',
    aiModelUrl: '',
  },
  modelMaterialInfo: {
    modelMaterialId: '',
    modelMaterialName: '',
    modelMaterialUrl: '',
  },
  sceneInfo: {
    sceneId: '',
    sceneName: '',
    pictureId: '',
    picturePath: '',
    pictureCaption: '',
  },
  modeCode: MODEL_TYPE.FG2_0,
  modeName: 'FG2.0',
  filterBack: YES_NO_NUMBER_ENUM.YES,
  faceRepair: YES_NO_NUMBER_ENUM.YES,
  enableDistill: YES_NO_NUMBER_ENUM.NO,
  promiseEnhanced: YES_NO_NUMBER_ENUM.NO,
  refWeight: null,
  categoryCode: '',
  categoryName: props.isBatch ? '' : props.taskData.category,
  syncCategory: YES_NO_NUMBER_ENUM.YES,
  styleGenCount: 3,
});

const formData = ref<any>(initFormData());
// 模型默认选中第0个
const setMode = (list:any) => {
  formData.value.modeCode = list[0].value;
  formData.value.modeName = list[0].label;
  refWeightPermission.value = list[0].attributes[0].name;
  if (refWeightPermission.value === REF_WEIGHT_READABLE.DIS) {
    formData.value.refWeight = null;
  }
};
watch(props, (newBatch:any) => {
  isBackPosture.value = GENERATE_MODE.SINGLE_POSE;
  if (newBatch.isBatch) {
    formData.value.categoryName = '';
    formData.value.fastForward = 0;
    formData.value.promiseEnhanced = 0;
    setMode(fgModelVersion.value);
    formData.value.supplyMethod = supplyOptions?.value?.[0]?.value;
    formData.value.generateNum = Number(generateNumList?.value?.[0]?.label);
  } else {
    formData.value.categoryName = props.taskData.category;
  }
}, {
  deep: true
});

watch(() => enableFollowabilityList.value, (newList) => {
  if (newList.length && !formData.value.enableFollowability) {
    newList.forEach((v: any) => {
      if (v.attributes.filter((v1: { code: string; name: string; }) => v1.code === 'isDefault' && v1.name === '1').length) {
        formData.value.enableFollowability = Number(v.value);
      }
    });
  }
});

const rules = computed<FormRules>(() => ({
  waveBatchCode: [
    // { required: true, message: '请选择波次', trigger: 'change' },
  ],
  supplyMethod: [
    // { required: true, message: '请选择供给方式', trigger: 'change' },
  ],
  generateMode: [
    // { required: true, message: '生成模式是必填项', trigger: 'change' },
    // { type: 'enum', enum: Object.values(GENERATE_MODE), message: '生成模式不合法', trigger: 'change' }
  ],
  generateNum: [
    // { required: true, message: '生成数量是必填项', trigger: 'blur' },
  ],
  expectedCostPrice: [
    // { required: true, message: '期望成本价是必填项', trigger: 'blur' },
  ],
  refWeight: [
    { required: refWeightPermission.value === REF_WEIGHT_READABLE.REQ,
      message: '参考权重是必填项',
      trigger: 'blur',
      // validator: (rule, value, callback) => {
      //   if (refWeightPermission.value === REF_WEIGHT_READABLE.REQ && value === 0) {
      //     callback(new Error('参考权重是必填项'));
      //   } else {
      //     callback();
      //   }
      // }
    },
  ],
  categoryCode: [
    { required: !!props.selectItems.filter(v => v.result === 2).length,
      message: '请选择品类',
      trigger: 'change' },
  ],

}));
const refWeightPermission = ref(REF_WEIGHT_READABLE.REQ);
// 是否查看下一款
const isNext = ref(false);
const again = ref(false);
/**
 * 打开弹窗
 * @param businessId 任务id
 */
const handleShowGenerate = async (businessId = '', row: any = {}) => {
  again.value = false;
  if (businessId) {
    const { data } = await reSubmitDetail(businessId);
    const { waveBatchCode, supplyMethodCode, generateMode, generateNum,
      sceneInfo, modelInfo, modelMaterialInfo, modeCode, modeName } = data;
    formData.value = {
      waveBatchCode,
      supplyMethod: supplyMethodCode,
      generateMode: activeName.value === 'second' ? isBackPosture.value : (generateMode || GENERATE_MODE.MULTI_POSE),
      generateNum: generateNum || Number(generateNumList?.value?.[0]?.label),
      modelInfo: modelInfo || {},
      modelMaterialInfo,
      sceneInfo: sceneInfo || {},
      modeCode: modeCode || MODEL_TYPE.FG2_0,
      modeName: modeName || 'FG2.0',
      prompt: data.prompt || undefined,
      refWeight: null,
      newGenerateNum: generateNum, // 再次提交的数量
      imgSize: data.imgSize || undefined,
      enableFollowability: data.enableFollowability || '',
      styleModelId: data.styleModelId || undefined,
    };
    
    if (supplyMethodCode === 'supplyMethodCode') {
      inspirationImg.value = data.refImgUrl || '';
      again.value = true;
      oldPrompt.value = data.prompt || '';
      formData.value.sceneInfo.pictureCaption = data?.bgImgDesc;
      formData.value.modelInfo.modelImgDesc = data?.modelImgDesc;
      formData.value.sceneInfo.picturePath = data?.bgImgUrl;
      formData.value.modelInfo.aiModelUrl = data?.modelImgUrl;
      formData.value.modelInfo.url = data?.modelImgUrl;
      const r = await styleModelDetailApi(data.styleModelId || '');
      collectData.value = r.data;
      await nextTick();
      setTimeout(() => {
        SceneModelDialogRef.value?.initData({
          sceneInfo: formData.value.sceneInfo,
          modelInfo: formData.value.modelInfo,
        });
      }, 30);
      emits('update:modelValue', true);
      return;
    } else {
      again.value = false;
    }
    // v-if="formData.prompt || oldPrompt"
    
    await nextTick();

    // 是否指定模特
    setTimeout(() => {
      SceneModelDialogRef.value?.initData({
        sceneInfo: sceneInfo || {},
        modelInfo: {
          aiModelCode: modelInfo?.aiModelCode,
          name: modelInfo?.aiModelCode ? modelInfo?.aiModelName : modelMaterialInfo?.modelMaterialName,
          url: modelInfo?.aiModelCode ? modelInfo?.aiModelUrl : modelMaterialInfo?.modelMaterialUrl,
          modelMaterialId: modelMaterialInfo?.modelMaterialId,
        },
      });
    }, 30);
  } else {
    await nextTick();
    formData.value = {
      ...initFormData(),
      waveBatchCode: props.taskData.wavesCode,
      supplyMethod: row.supplyMode ? row.supplyMode : (oldSupplyMethod.value ? oldSupplyMethod.value : supplyOptions?.value?.[0]?.value) // props.taskData.supplyMode,
    };
    oldSupplyMethod.value = '';
    oldPrompt.value = '';
    setMode(fgModelVersion.value);
    await nextTick();
    SceneModelDialogRef.value?.handleClear();
  }
  if (enableFollowabilityList.value.length && !formData.value.enableFollowability) {
    enableFollowabilityList.value.forEach((v: any) => {
      if (v.attributes.filter((v1: { code: string; name: string; }) => v1.code === 'isDefault' && v1.name === '1').length) {
        formData.value.enableFollowability = Number(v.value);
      }
    });
  }
  emits('update:modelValue', true);
};
watch(() => fgModelVersion.value, (newDate:any) => {
  if (newDate?.length) {
    setMode(newDate);
  }
}, {
  immediate: true,
});
watch(() => isBackPosture.value, (newDate: GENERATE_MODE) => {
  formData.value.styleGenCount = (newDate === GENERATE_MODE.MULTI_POSE) ? 4 : 3;
  // SceneModelDialogRef.value?.delSpecifyMaterials();
}, {
  immediate: true,
});


const handleUpdateSceneAndModel = (item: ISceneAndModel) => {
  const { aiModelCode, url, name, modelMaterialId } = item.modelInfo;
  if (aiModelCode) {
    formData.value.modelInfo = {
      aiModelCode,
      aiModelName: name,
      aiModelUrl: url,
    };
    formData.value.modelMaterialInfo = initFormData().modelMaterialInfo;
  } else {
    formData.value.modelMaterialInfo = {
      modelMaterialId,
      modelMaterialName: name,
      modelMaterialUrl: url,
    };
    if (url) {
      // formData.value.modelInfo = initFormData().modelInfo;
      formData.value.modelInfo.aiModelUrl = url;
    }
  }
  const { sceneId, sceneName, pictureId, picturePath } = item.sceneInfo;
  if (picturePath) {
    formData.value.sceneInfo = {
      sceneId,
      sceneName,
      pictureId,
      picturePath,
    };
  }
};
const router = useRouter();
const oldSupplyMethod = ref<string>('');
/**
 * 提交并查看下一款
 * @param next 是否查看下一款
 */
const handleSubmitAndNext = async (next = false) => {
  oldSupplyMethod.value = formData.value.supplyMethod;
  if (formData.value.supplyMethod === SUPPLY_METHOD.FASHION_VIRTUAL_TRY_ON) {
    // 虚拟换衣
    const routeData: any = router.resolve({
      name: 'Webview',
      query: {
        domain: 'fashion-design',
        path: '/#/inspiration-center/virtual-change/create',
        activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list',
        query: JSON.stringify({
          byInspirationId: props.ids.join(','),
          // activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/virtual-change/list'
        })
      }
    });
    window.open(routeData.href, '_self');
    return;
  } else if (formData.value.supplyMethod === SUPPLY_METHOD.POSTURE_FISSION) {
    // 姿势裂变
    router.push({
      name: 'PostureFissionAdd',
      query: {
        byInspirationId: props.ids.join(','),
      }
    });
    return;
  }
  await formRef.value?.validate();
  if (refWeightPermission.value === REF_WEIGHT_READABLE.REQ && formData.value.supplyMethod !== 'supplyMethodCode') {
    if (!formData.value.refWeight) {
      ElMessage.warning('请选择参考权重');
      return;
    }
  }

  // 指定素材
  const oldMaterials = SceneModelDialogRef.value?.getSpecifyMaterials();
  if (activeName.value === 'second' && formData.value.supplyMethod !== 'supplyMethodCode') {
    if (oldMaterials?.modelMaterialLibraryFileList?.filter((v: RecommendPageResModelMaterialLibraryFileListItem) => !v.selected).length !== formData.value.styleGenCount) {
      ElMessage.warning(`请选择${formData.value.styleGenCount}张指定素材`);
      return;
    }
  }
  
  if (!formData.value.categoryCode && formData.value.supplyMethod !== 'supplyMethodCode') {
    if (!treeList.value.length) {
      await getCategoryList();
    }
    formData.value.categoryCode = findTreeNodeProperty<any, 'code'>(
      treeList.value as any[],
      props.taskData.category,
      'code'
    );
  }
  let materials = [];

  if (activeName.value === 'second' && formData.value.supplyMethod !== 'supplyMethodCode') {
    materials = oldMaterials.modelMaterialLibraryFileList?.filter((v: RecommendPageResModelMaterialLibraryFileListItem) => !v.selected).map((item: RecommendPageResModelMaterialLibraryFileListItem) => {
      return {
        materialLibraryId: item.modelMaterialLibraryId || item.materialId,
        materialType: dialogActiveName.value === 'first' ? 1 : 2,
        pictureUrl: item.pictureUrl,
        maskPictureUrl: item.maskPictureUrl,
      };
    });
  }
  
  const modelInfos:IModelInfo | undefined = SceneModelDialogRef.value?.getModelInfoFun();
  await taskSubmit({
    ...formData.value,
    inspirationIds: props.ids,
    generateMode: activeName.value === 'second' ? isBackPosture.value : (formData.value.generateMode),
    materials,
    modelEthnicity: formData.value?.modelInfo?.aiModelName || modelInfos?.racialName,
    refImgUrl: !props.isBatch ? inspirationImg.value : undefined,
    modeCode: formData.value.supplyMethod === 'supplyMethodCode' ? undefined : formData.value.modeCode,
    modeName: formData.value.supplyMethod === 'supplyMethodCode' ? undefined : formData.value.modeName,
    generateNum: formData.value.supplyMethod === 'supplyMethodCode' ? formData.value.newGenerateNum : formData.value.generateNum,
    faceRepair: isCanFaceFix.value ? formData.value.faceRepair : YES_NO_NUMBER_ENUM.NO,
  });
  ElMessage.success('任务生成成功');
  formData.value = initFormData();
  isNext.value = next;
  if (next) {
    emits('next', props.ids[0]);
    isBackPosture.value = GENERATE_MODE.SINGLE_POSE;
  } else {
    emits('update:modelValue', false);
    emits('success');
  }
};

/**
 * 关闭弹窗
 */
const handleClose = () => {
  formRef.value?.resetFields();
  oldPrompt.value = '';
  formData.value.prompt = '';
  emits('update:modelValue', false);
  if (isNext.value) {
    // 当前处于查看下一款时，关闭弹窗刷新信息
    emits('success');
  }
  isNext.value = false;
};

const isDefaultModel = computed(() => (formData.value.modeCode === MODEL_TYPE.FG2_0 && formData.value.supplyMethod !== 'supplyMethodCode'));
watch(isDefaultModel, () => {
  if (!isDefaultModel.value && formData.value.modelInfo?.aiModelCode) {
    SceneModelDialogRef.value?.handleClearModel();
  }
}, {
  immediate: true,
});

defineExpose({
  handleShowGenerate,
});

const isCanFaceFix = ref(false);
watch(() => [formData.value.modelInfo, formData.value.modelMaterialInfo], () => {
  const { modelInfo, modelMaterialInfo } = formData.value;
  if (modelInfo || modelMaterialInfo) {
    const { aiModelCode } = modelInfo || {};
    const { modelMaterialId, modelMaterialUrl } = modelMaterialInfo || {};
    const isCustomUpload = !aiModelCode && modelMaterialUrl !== '';
    if (modelMaterialId || isCustomUpload) {
      // formData.value.faceRepair = YES_NO_NUMBER_ENUM.NO;
      isCanFaceFix.value = false;
    } else {
      isCanFaceFix.value = true;
    }
  }
}, {
  immediate: true,
});
const handleWeightPermissionChange = (permission: REF_WEIGHT_READABLE) => {
  console.log('permission', permission);
  refWeightPermission.value = permission;
  if (permission === REF_WEIGHT_READABLE.DIS) {
    formData.value.refWeight = null;
  }
};

const hasAppoint = ref(true);
const extendLabel = ref<string[]>([]);
const timeOut = ref<any>(null);
watch(() => formData.value.categoryCode, async (categoryCode:any) => {
  if (categoryCode || props.selectItems?.[0]?.identifiedCategoryCode) {
    if (timeOut.value) {
      clearTimeout(timeOut.value);
    }
    timeOut.value = setTimeout(async () => {
      extendLabel.value = await getConfig(categoryCode || props.selectItems?.[0]?.identifiedCategoryCode);
      if (extendLabel.value.includes('10')) {
        hasAppoint.value = true;
      } else {
        hasAppoint.value = false;
        activeName.value = 'first';
      }
    }, 500);
  }
}, {
  deep: true,
  immediate: true,
});
const inspirationImg = ref<string>('');
watch(() => props.taskData.inspirationImg, (imgUrl: string) => {
  inspirationImg.value = imgUrl;
}, {
  immediate: true,
});
// 需要背面姿势


const activeName = ref<string>('first');
const dialogActiveName = ref<string>('first');
const { handleOpenDialog: handleOpenEditPhotoDialog } = useEditPhotoDialog({
  handleSuccess(url: string) {
    inspirationEditImageApi({
      url,
      inspirationId: props.taskData.id
    }).then(() => {
      ElMessage.success('编辑成功');
      // props.taskData.inspirationImg = url;
      inspirationImg.value = url;
    });
  }
});

const appointModelInfos = ref({
  id: '',
  url: '',
  aiModelCode: '',
  name: '',
  modelMaterialId: ''
});
const setModelInfo = (modelData: any) => {
  if (modelData.length) {
    appointModelInfos.value = {
      id: modelData[0].valueCode,
      name: modelData[0].dictValue,
      url: modelData[0].extValue2,
      aiModelCode: modelData[0].valueCode,
      modelMaterialId: '',
    };
  }
};

// 获取选中的收藏数据
const collectData = ref<StyleModelUserCollectPageResListItem>({});
const handleCollect = (data: StyleModelUserCollectPageResListItem) => {
  collectData.value = data;
  formData.value.styleModelId = data.styleModelId;
  formData.value.imgSize = fgloraSizeList.value[0]?.label;
  fgloraSizeList.value.forEach((v: { label: string; }) => {
    if (v.label.split('x')[0] === data.sizeWidth && v.label.split('x')[1] === data.sizeHeight) {
      formData.value.imgSize = v.label;
    }
  });
};
const oldPrompt = ref<string>('');
// 生成款式描述
const setPrompt = async () => {
  if (!inspirationImg.value) {
    ElMessage.warning('暂无灵感图');
    return;
  }
  const { data } = await pictureCaptionCreateApi({
    source: 'STYLE_GEN',
    inputImg: inspirationImg.value,
  });
  const dataStr = data as unknown as string;
  if (!dataStr) {
    ElMessage.error('生成失败');
    return;
  }

  dataStr.split('\n\n').forEach((v: string) => {
    if (v.includes('Background')) {
      formData.value.sceneInfo.pictureCaption = v.split(':')?.[1] ?? '';
    }
    if (v.includes('Fashion Model Appearance')) {
      formData.value.modelInfo.modelImgDesc = v.split(':')?.[1] ?? '';
    }
  });
  // const chinesePattern = /(?=[\u4e00-\u9fa5])[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef,.;:!?]+/g;
  const chinesePattern = /(?:[\u4e00-\u9fa5]|[\u3000-\u303f\uff00-\uffef]|[A-Z](?=[\u4e00-\u9fa5]))+/g;
  const match: string[] = dataStr.match(chinesePattern) || [];
  const chineseText = match?.join('');
  if (chineseText) {
    formData.value.prompt = chineseText.replaceAll('：', '');
    oldPrompt.value = chineseText.replaceAll('：', '');
  }
};

</script>

<template>
  <el-dialog
    title="提交任务"
    :model-value="props.moduleValue"
    :destroy-on-close="true"
    @close="() => handleClose()"
  >
    <el-scrollbar>
      <div class="tw-flex">
        <div v-if="!isBatch" class="tw-color-[#606266] tw-mr-12px tw-flex-1">
          <div class="img-sty-w200">
            <el-image
              :src="resizeImgByWidth(inspirationImg, 200)"
              class="tw-w-200px tw-h-200px tw-rounded-4px tw-mb-12px"
              fit="cover"
              :preview-src-list="[inspirationImg]"
              preview-teleported
            />
            <el-button
              v-if="inspirationImg"
              @Click="() => {
                handleOpenEditPhotoDialog({ url: inspirationImg });
              }"
              class="primary-contrll"
              type="primary"
            >编辑图片</el-button>
          </div>
          
          <p class="tw-mb-12px">外部品类：{{ taskData.outCategory }}</p>
          <p class="tw-mb-12px">算法品类：{{ taskData.category }}</p>
          <p class="tw-mb-12px">灵感来源：{{ taskData.inspirationImageSource }}</p>
          <p class="tw-mb-12px">来源站点：{{ taskData.country }}</p>
          <p class="tw-mb-12px">售价：{{ taskData.price }}</p>
          <p class="tw-mb-12px">划线价：{{ taskData.uPrice }}</p>
          <p class="tw-mb-12px">灵感提交次数：{{ taskData.submitNum }}</p>
        </div>
        <el-form
          :model="formData"
          ref="formRef"
          :rules="rules"
          label-width="100px"
          :inline="isBatch"
          :validate-on-rule-change="false"
          class="tw-flex-1"
        >
          <div class="tw-flex tw-flex-col">
            <el-form-item
              :class="'tw-w-full'"
              label="波次"
              prop="waveBatchCode"
            >
              <el-select

                v-model="formData.waveBatchCode"
                filterable
              >
                <el-option
                  v-for="item in wavesOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :class="'tw-w-full'"
              label="供给方式"
              prop="supplyMethod"
            >
              <el-select v-model="formData.supplyMethod">
                <el-option
                  v-for="item in supplyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              v-if="formData.supplyMethod === 'supplyMethodCode'"
              prop="styleModelId"
              label="风格模型"
              :rules="[{
                required: true,
                message: '请选择风格模型',
                trigger: ['change', 'blur'],
              }]"
            >
              <div
                class="square"
                v-if="!formData.styleModelId"
                @click="dialogTableVisible = true"
              >
                <div class="square-box">
                  <el-icon size="30" color="#605CE5"><CopyDocument /></el-icon>
                </div>
                <div style="margin-top: 5px">风格模型</div>
              </div>
              <div class="style-model" v-else>
                <el-image
                  v-if="collectData.sampleImage"
                  class="square-img"
                  :src="collectData.sampleImage || ''"
                  :preview-src-list="[collectData.sampleImage || '']"
                  show-progress
                  :initial-index="0"
                  fit="contain"
                />
                <el-image
                  v-if="!collectData.sampleImage"
                  class="square-img"
                  style="transform: scale(.7);"
                  :src="zwtp"
                  fit="contain"
                />
                <!-- <img class="square-img" src="https://oss.yunbanfang.cn/tiangong_2662ebb687c549efbb23f234d39dda03.png" alt=""> -->
                <div class="style-model-m">
                  <strong>{{ collectData.styleModelName }}</strong>
                  <div>{{ collectData.loraName }}</div>
                  <div>服装类型：{{ collectData.clothTypeName }}</div>
                </div>
                <el-icon
                  @click="dialogTableVisible = true"
                  class="style-model-r"
                  size="18"
                ><Edit /></el-icon>
              </div>
            </el-form-item>
            <el-form-item
              v-if="(formData.supplyMethod === 'supplyMethodCode')"
              label=""
              prop="prompt"
            >
              <div
                @click="setPrompt"
                v-if="!formData.prompt && !oldPrompt"
                class="m-b-10 color-b"
              >生成款式描述</div>
              <div class="m-b-10" v-if="formData.prompt || oldPrompt">
                <div>款式描述</div>
                <div
                  @click="formData.prompt = oldPrompt"
                  class="color-b"
                  style="margin-left: auto;"
                >重置</div>
                <div
                  @click="setPrompt"
                  class="color-b"
                  style="margin-left: 10px"
                >再次生成</div>
              </div>
              <el-input
                v-if="formData.prompt || oldPrompt"
                :rows="6"
                v-model="formData.prompt"
                maxlength="400"
                placeholder="请输入"
                show-word-limit
                type="textarea"
              />
              <div v-if="formData.prompt || oldPrompt" class="tit">手动输入款式描述时，以描述内容为准</div>
            </el-form-item>
            <el-form-item
              v-if="formData.supplyMethod === 'supplyMethodCode'"
              :label-width="isBatch ? '100px' : '100px'"
              label="设置"
            >
              <SceneModelDialog
                :is-default-model="isDefaultModel"
                :isBatch="isBatch"
                :formDataObj="formData"
                :taskData="taskData"
                :styleGenCount="formData.styleGenCount"
                :hasAppoint="hasAppoint"
                :appointModelInfos="appointModelInfos"
                :identifiedCategoryCode="selectItems?.[0]?.identifiedCategoryCode ?? ''"
                v-model:isBackPosture="isBackPosture" 
                v-model:activeName="activeName"
                v-model:dialogActiveName="dialogActiveName"
                ref="SceneModelDialogRef"
                @submit="handleUpdateSceneAndModel"
              />
            </el-form-item>
            <el-form-item v-if="isCanFaceFix && formData.supplyMethod === 'supplyMethodCode'" label="脸部修复">
              <div class="tw-flex tw-items-center tw-gap-12px">
                <el-switch
                  v-model="formData.faceRepair"
                  :active-value="YES_NO_NUMBER_ENUM.YES"
                  :inactive-value="YES_NO_NUMBER_ENUM.NO"
                />
                <!-- <span class="tw-text-info">优化脸部细节</span> -->
              </div>
            </el-form-item>
            <el-form-item
              v-if="formData.supplyMethod === 'supplyMethodCode'"
              prop="enableDistill"
              label="是否加速"
            >
              <el-switch
                v-model="formData.enableDistill"
                :active-value="YES_NO_NUMBER_ENUM.YES"
                :inactive-value="YES_NO_NUMBER_ENUM.NO"
              />
            </el-form-item>
            <el-form-item
              v-if="formData.supplyMethod === 'supplyMethodCode'"
              label="生成数量"
              prop="newGenerateNum"
              :rules="[{
                required: true,
                message: '请选择生成数量',
                trigger: ['change', 'blur'],
              }]"
            >
              <el-input-number
                v-model="formData.newGenerateNum"
                controls-position="right"
                :min="1"
                :max="12"
                :precision="0"
              />
            </el-form-item>
            <el-form-item
              v-if="formData.supplyMethod === SUPPLY_METHOD.SUPPLYMETHODCODE"
              prop="imgSize"
              label="分辨率"
              :rules="[{
                required: true,
                message: '请选择分辨率',
                trigger: ['change', 'blur'],
              }]"
            >
              <el-select
                v-model="formData.imgSize"
                filterable
              >
                <el-option
                  v-for="item in fgloraSizeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="formData.supplyMethod === SUPPLY_METHOD.SUPPLYMETHODCODE"
              prop="enableFollowability"
              label="风格参考"
              :rules="[{
                required: true,
                message: '请选择风格参考',
                trigger: ['change', 'blur'],
              }]"
            >
              <el-select
                v-model="formData.enableFollowability"
                filterable
              >
                <el-option
                  v-for="item in enableFollowabilityList"
                  :key="item.value"
                  :label="item.label"
                  :value="Number(item.value)"
                />
              </el-select>
            </el-form-item>
            
            <template v-if="formData.supplyMethod === 'Artificial'">
              <FgModelSelect
                :class="'tw-w-full'"
                v-model:model-code="formData.modeCode"
                v-model:model-name="formData.modeName"
                @weight-permission-change="handleWeightPermissionChange"
                @setModelInfo="setModelInfo"
              />
              <!-- v-if="ids.length === 1" -->
              <CategorySelect
                v-model:category-code="formData.categoryCode"
                v-model:category-name="formData.categoryName"
                v-model:sync-category="formData.syncCategory"
                form-item-prop="categoryCode"
              />
              <ReferenceWeight
                v-if="refWeightPermission !== REF_WEIGHT_READABLE.DIS"
                v-model:weight-code="formData.refWeight!"
                form-item-prop="refWeight"
              />
              <el-form-item
                label="默认生成模式"
                prop="generateMode"
                v-if="activeName === 'first'"
              >
                <SelectGenerateMode v-model="formData.generateMode" />
              </el-form-item>
              <el-form-item :label-width="isBatch ? '100px' : '0'" :label="isBatch ? '高级设置' : ''">
                <SceneModelDialog
                  :is-default-model="isDefaultModel"
                  :isBatch="isBatch"
                  :formDataObj="formData"
                  :taskData="taskData"
                  :styleGenCount="formData.styleGenCount"
                  :hasAppoint="hasAppoint"
                  :appointModelInfos="appointModelInfos"
                  :identifiedCategoryCode="selectItems?.[0]?.identifiedCategoryCode ?? ''"
                  v-model:isBackPosture="isBackPosture" 
                  v-model:activeName="activeName"
                  v-model:dialogActiveName="dialogActiveName"
                  ref="SceneModelDialogRef"
                  @submit="handleUpdateSceneAndModel"
                />
              </el-form-item>
              <el-form-item v-if="(activeName === 'first' && formData.generateMode === GENERATE_MODE.MULTI_POSE) || (activeName === 'second' && isBackPosture === GENERATE_MODE.MULTI_POSE)" label="背面增强">
                <div
                  class="tw-flex tw-items-center tw-gap-12px"
                >
                  <el-switch
                    v-model="formData.filterBack"
                    :active-value="YES_NO_NUMBER_ENUM.YES"
                    :inactive-value="YES_NO_NUMBER_ENUM.NO"
                  />
                  <span class="tw-text-info">增加背面出图的几率</span>
                </div>
              </el-form-item>
              <el-form-item v-if="isCanFaceFix" label="脸部修复">
                <div class="tw-flex tw-items-center tw-gap-12px">
                  <el-switch
                    v-model="formData.faceRepair"
                    :active-value="YES_NO_NUMBER_ENUM.YES"
                    :inactive-value="YES_NO_NUMBER_ENUM.NO"
                  />
                  <span class="tw-text-info">优化脸部细节</span>
                </div>
              </el-form-item>
              <el-form-item label="履约增强" v-if="activeName === 'first'">
                <div class="tw-flex tw-items-center tw-gap-12px">
                  <el-switch
                    v-model="formData.promiseEnhanced"
                    :active-value="YES_NO_NUMBER_ENUM.YES"
                    :inactive-value="YES_NO_NUMBER_ENUM.NO"
                  />
                  <span class="tw-text-info">增加面料履约的匹配</span>
                </div>
              </el-form-item>
              <el-form-item label="模型加速">
                <div class="tw-flex tw-items-center tw-gap-12px">
                  <el-switch
                    v-model="formData.fastForward"
                    :active-value="1"
                    :inactive-value="0"
                  />
                  <!-- <span class="tw-text-info">模型加速</span> -->
                </div>
              </el-form-item>
              <el-form-item label="生成数量" prop="generateNum">
                <!-- <el-input-number
                  class="tw-w-full"
                  v-model="formData.generateNum"
                  :min="1"
                  :max="24"
                  :step="1"
                  :precision="0"
                  :controls="true"
                /> -->
                <el-select
                  v-model="formData.generateNum"
                  filterable
                >
                  <el-option
                    v-for="item in generateNumList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="activeName !== 'first' && !isBatch"
                label="每款生图数量"
                prop="styleGenCount"
              >
                <el-select
                  v-model="formData.styleGenCount"
                  filterable
                >
                  <el-option
                    v-for="item in !isBackPosture ? [3, 6, 9] : [4, 6, 8]"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </template>
            <template v-else-if="formData.supplyMethod === 'imitation'">
              <el-form-item label="期望成本价" prop="expectedCostPrice">
                <el-input-number
                  class="tw-w-full"
                  v-model="formData.expectedCostPrice"
                  :min="0"
                  :max="9999.99"
                  :precision="2"
                  :controls="false"
                />
              </el-form-item>
            </template>
          </div>
        </el-form>
      </div>
    </el-scrollbar>
    <template #footer>
      <span>
        <el-button @click="() => emits('update:modelValue', false)">取消</el-button>
        <el-button type="primary" @click="() => handleSubmitAndNext()">提交跑图任务</el-button>
        <el-button
          v-if="!isBatch && ![SUPPLY_METHOD.FASHION_VIRTUAL_TRY_ON, SUPPLY_METHOD.POSTURE_FISSION].includes(formData.supplyMethod)"
          type="primary"
          @click="() => handleSubmitAndNext(true)"
        >
          提交并查看下一款
        </el-button>
      </span>
    </template>
    <LlstOfFavoriteStyleModels
      v-if="dialogTableVisible"
      v-model="dialogTableVisible"
      @submit="handleCollect"
    />
  </el-dialog>
</template>
<style scoped>
.img-sty-w200 {
  position: relative;
  width: 200px;
}
.primary-contrll {
  position: absolute;
  z-index: 99;
  right: 0;
  bottom: 12px;
}
.style-model {
  display: flex;
  width: 280px;
  padding: 10px;
  border: 1px solid #e4e7ed;
  cursor: pointer;
}
.style-model-m {
  margin-left: 10px;
}
.style-model-r {
  margin-left: auto;
}
.square-img {
  width: 96px;
  height: 96px;
  flex: 0 0 96px;
}
.color-b {
  color: #8080FF;
  cursor: pointer;
}
.m-b-10 {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}
.square {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.square-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 108px;
  height: 108px;
  background: linear-gradient(180deg, #D8F1FF 0%, #DDDCFF 100%);
  border-radius: 4px;
}
.tit {
  color: gray;
  font-size: 14px;
}
</style>
