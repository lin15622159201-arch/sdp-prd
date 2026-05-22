<template>
  <ScAppPage>
    <template #main>
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        size="default"
        class="tw-flex tw-gap-4 tw-h-full"
      >
        <div class="tw-w-560px">
          <CardContainer title="模特图">
            <div v-if="defaultImgUrlsGroups.length">
              <div
                :class="{ 'model-group': defaultImgUrlsGroups.length > 1, active: activeGroupIndex === index }"
                class="tw-flex tw-gap-2 tw-items-center"
                v-for="(group, index) in defaultImgUrlsGroups"
                :key="index"
              >
                <!-- 多组图片时才显示分组 -->
                <div v-if="defaultImgUrlsGroups.length > 1" class="group-num">{{ index + 1 }}</div>
                <!-- 通过limit来控制不显示上传按钮，通过disabled来禁止删除所有 -->
                <Uploader
                  class="tw-ml-[-4px]"
                  :model-value="group.map((url) => ({ url }))"
                  @update:model-value="onDefaultImgsChange(index, $event)"
                  size="mini"
                  :limit="group.length"
                  :disabled="isDefaultImgDisabled"
                />
                <el-icon
                  class="check-btn"
                  :class="{ checked: activeGroupIndex === index }"
                  @click="activeGroupIndex = index"
                >
                  <CircleCheckFilled />
                </el-icon>
              </div>
            </div>
            <el-form-item v-else prop="replaceColorImgUrls">
              <Uploader
                class="tw-ml-[-4px]"
                v-model="formData.replaceColorImgUrls"
                v-bind="UPLOADER_PROPS"
                size="mini"
                uploader-style="button"
                show-list-type-img
                :append-upload-validate="validateUpload"
                :tips="UPLOADER_TIPS"
              />
            </el-form-item>
          </CardContainer>

          <CardContainer
            title="颜色选择"
            class="tw-mt-4"
            :icon="IconPlatee"
          >
            <div class="tw-flex tw-items-center">
              <el-tooltip content="选择颜色">
                <div class="color-picker-overlay" :class="{ 'no-color': !color }">
                  <el-color-picker
                    size="default"
                    :show-alpha="false"
                    @change="handleColorAdd"
                  />
                  <IconPlatee class="picker-icon tw-color-gray-500" />
                </div>
              </el-tooltip>
              <el-button
                class="tw-ml-2"
                size="default"
                :icon="IconPickColor"
                @click="handlePickColorFromImage()"
              >上传图片取色</el-button>

              <ImageColorPicker
                v-model="colorPicker.visible"
                :url="colorPicker.url"
                @confirm="handleColorAdd($event)"
              />
            </div>
            <el-form-item class="color-list tw-flex tw-gap-2 tw-mt-4 tw-mb-0" prop="targetColorUrls">
              <div
                v-for="(item, index) in formData.targetColorUrls"
                :key="index"
                class="color-item"
                :class="{ active: index === activeColorIndex }"
                @click="activeColorIndex = index"
              >
                <CustomImage
                  v-if="item.startsWith('http')"
                  :src="item"
                  fit="cover"
                />
                <div
                  v-else
                  :style="{ backgroundColor: item }"
                  class="tw-w-full tw-h-full tw-rounded"
                />
                <div class="color-item-delete" @click.stop="handleColorRemove(index)">
                  <el-icon class="tw-text-white tw-text-2xl">
                    <Close />
                  </el-icon>
                </div>
              </div>
            </el-form-item>
          </CardContainer>

          <el-form-item
            label="分类:"
            class="tw-mt-4"
            prop="categoryCode"
          >
            <CategorySelect
              v-model="formData"
              :categories="categoryList"
              @change="setRegionByCategoryName()"
            />
          </el-form-item>
        </div>
        <div class="tw-flex-1 tw-min-w-440px">
          <CardContainer title="换色区域设置" class="tw-h-full">
            <div class="tw-flex tw-flex-col tw-h-full">
              <el-form-item
                label="换色区域:"
                label-width="128px"
                label-position="left"
                prop="replaceColorRegion"
              >
                <el-radio-group
                  v-model="formData.replaceColorRegion"
                  placeholder="请选择"
                  size="default"
                >
                  <el-radio-button
                    v-for="item in REPLACE_REGION_LIST"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label-width="128px"
                label-position="left"
                prop="maskImgUrl"
              >
                <template #label>
                  <div class="tw-flex tw-items-center">
                    框选换色区域:
                    <!-- <el-tooltip
                      content="【换色区域】或【框选换色区域】必须设置一个；建议优先【框选换色区域】，上身效果会好些！注意：框选换色区域不支持预览"
                    >
                      <el-icon class="tw-mx-1 tw-text-red">
                        <InfoFilled />
                      </el-icon> </el-tooltip> -->
                  </div>
                </template>
                <IconDragSelect
                  class="drag-select-icon"
                  :class="{ active: isDragSelecting }"
                  @click="isDragSelecting = !isDragSelecting"
                />
                <span class="tw-ml-4 tw-text-sm tw-color-gray-500">
                  框选暂不支持预览
                </span>
              </el-form-item>
              <div v-if="regionMaskErrorText && !urlRectMap[currentModelImgUrl]" class="tw-text-red">
                {{ regionMaskErrorText }}，可更换换色区域、框选或
                <el-button
                  type="primary"
                  text
                  @click="generateRegionMask()"
                >点击重新生成</el-button>
              </div>
              <div class="tw-flex-1 tw-min-h-0">
                <ImageRegionSelect
                  v-if="currentModelImgUrl"
                  v-loading="regionMaskLoading || isExchanging"
                  element-loading-text="正在生成预览效果..."
                  class="tw-h-full"
                  :src="currentModelImgUrl"
                  :default-rect="urlRectMap[currentModelImgUrl]"
                  :disabled="!isDragSelecting"
                  @change="onRegionRectChange"
                >
                  <template #mask>
                    <!-- 彩色蒙版层 -->
                    <div
                      class="tw-absolute tw-top-0 tw-w-block tw-w-full tw-h-full"
                      :style="maskStyle"
                    />
                  </template>
                </ImageRegionSelect>
                <!-- <MaskPreview
                  class="tw-h-full"
                  :src="currentModelImgUrl"
                  :region="formData.replaceColorRegion"
                  :color="activeColor"
                /> -->
                <!-- <el-image :src="maskUrlMap[currentModelImgUrl]" class="tw-max-h-full tw-max-w-full tw-absolute tw-top-0 tw-right-0" /> -->
                <empty v-else description="请先上传模特图" />
              </div>
            </div>
          </CardContainer>
        </div>
      </el-form>
    </template>

    <template #ffooter>
      <div class="tw-flex tw-justify-center tw-w-full">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="goBack()">取消</el-button>
      </div>
    </template>
  </ScAppPage>
</template>

<script setup lang="ts">
import ImageColorPicker from '../components/image-color-picker.vue';
import CategorySelect from '@/components/category-select/index.vue';
import { computed, ref, watch } from 'vue';
import IconPickColor from '@/assets/pick-color.svg';
import IconPlatee from '@/assets/platte.svg';
import IconDragSelect from '@/assets/drag-select.svg';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { validImageSize } from '@/core/utils/validator';
import { IFile } from '@/components/uploader/packages/types';
import CardContainer from '../components/card-container.vue';
import { CircleCheckFilled, Close } from '@element-plus/icons-vue';
import { REPLACE_REGION_ENUM, REPLACE_REGION_LIST } from '../constant';
import ImageRegionSelect from '../components/image-region-select.vue';
import { useCreateData } from './hooks/use-create-data';
import { hideFullScreenLoading, showFullScreenLoading } from '@/core/http/helper';
import { fetchReplaceColorTaskDetail, fetchReplaceColorTaskSaveBatch } from '../api';
import { IReplaceColorTaskSaveReq } from '../api/type';
import { useColor } from './hooks/use-color';
import { useRoute, useRouter } from 'vue-router';
import { useRectMask } from './hooks/use-rect-mask';
import { useRegionMask } from './hooks/use-region-mask';
import { useCategory } from './hooks/use-category';

const route = useRoute();
const router = useRouter();
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  router.push({ name: 'InspirationCenterClothColorReplacerList' });
};

const formRef = ref<FormInstance>();
type IFormData = {
  replaceColorImgUrls: IFile[];
  targetColorUrls: string[];
  replaceColorRegion?: REPLACE_REGION_ENUM;
  maskImgUrl: string;
  categoryCode: string;
  categoryName: string;
};
const formData = ref<IFormData>({
  replaceColorImgUrls: [],
  targetColorUrls: [],
  maskImgUrl: '',
  categoryCode: '',
  categoryName: '',
  // replaceColorRegion: REPLACE_REGION_ENUM.TOP // 暂不支持，但必传，暂时设默认值
});

const { defaultImgUrlsGroups, defaultCreateParams, activeGroupIndex, isDefaultImgDisabled, initCreateData, onDefaultImgsChange } = useCreateData(formData);
// 需要框选的模特图
const firstModelImgUrls = computed(() => {
  if (!defaultImgUrlsGroups.value.length) {
    const firstUrl = formData.value.replaceColorImgUrls[0]?.url;
    return firstUrl ? [firstUrl] : [];
  }
  return defaultImgUrlsGroups.value.map(item => item[0]);
});
// 当前框选的模特图
const currentModelImgUrl = computed(() => {
  if (!defaultImgUrlsGroups.value.length) return formData.value.replaceColorImgUrls[0]?.url;
  return firstModelImgUrls.value[activeGroupIndex.value];
});

const UPLOADER_PROPS = {
  accept: '.jpg,.png,.jpeg,.webp',
  limit: 4,
  sizeLimit: 10,
  multiple: true,
};
const UPLOADER_TIPS = `支持格式：${UPLOADER_PROPS.accept.split(',').join('、')}图片格式，限${
  UPLOADER_PROPS.limit
}张，单个文件不能超过${UPLOADER_PROPS.sizeLimit}MB`;

const isDragSelecting = ref(false);

// 颜色
const {
  color,
  colorPicker,
  activeColorIndex,
  handleColorAdd,
  handleColorRemove,
  handlePickColorFromImage,
  exchangeColorToUrl,
} = useColor(formData, () => {
  formRef.value?.validateField('targetColorUrls');
});
const activeColor = computed(() => formData.value.targetColorUrls[activeColorIndex.value]);

// 框选区域
const { urlRectMap, exchangeMaskRectToUrl, exchangeMaskUrlToRect, isExchanging } = useRectMask();
// 换色区域预览蒙层mask
const {
  regionMaskUrl,
  regionMaskLoading,
  regionMaskErrorText,
  generateRegionMask
} = useRegionMask({
  src: currentModelImgUrl,
  replaceRegion: computed(() => formData.value.replaceColorRegion),
  disabled: computed(() => !activeColor.value || !!urlRectMap.value[currentModelImgUrl.value]),
});

const { categoryList, getCategoryList, findSecondLevelCategoryName } = useCategory();

const maskStyle = computed(() => {
  const style: Record<string, string> = {
    maskImage: `url(${regionMaskUrl.value})`,
    maskMode: 'luminance',
    maskSize: '100% auto',
    maskRepeat: 'no-repeat',
  };
  if (!activeColor.value) return style;
  if (activeColor.value.startsWith('http')) {
    style.backgroundImage = `url(${activeColor.value})`;
  } else {
    style.backgroundColor = activeColor.value;
  }
  return style;
});

// 模特图是否已框选
const hasMask = computed(() => {
  return firstModelImgUrls.value.some(item => !!urlRectMap.value[item]);
});

const rules: FormRules<typeof formData> = {
  categoryCode: [{ required: true, message: '请选择分类', trigger: 'change' }],
  replaceColorImgUrls: [
    {
      required: true,
      validator: (rule, value, cb) => {
        if (!value.length) {
          cb(new Error('请上传模特图'));
        } else {
          cb();
        }
      },
      trigger: 'change',
    },
  ],
  targetColorUrls: [
    {
      required: true,
      validator: (rule, value, cb) => {
        if (!value.length) {
          cb(new Error('请选择颜色'));
        } else {
          cb();
        }
      },
      trigger: 'change',
    },
  ],
  replaceColorRegion: [
    { required: true, message: '请选择换色区域', trigger: 'change' }
    // {
    //   validator: (rule, value, cb) => {
    //     // 没有选换色区域，也没有框选
    //     if (!formData.value.replaceColorRegion && firstModelImgUrls.value.every(item => !urlRectMap.value[item])) {
    //       cb(new Error('"换色区域"和"框选换色区域"必设置一项'));
    //     } else {
    //       cb();
    //     }
    //   },
    //   trigger: 'change',
    // },
  ],
  // maskImgUrl: [
  //   {
  //     validator: (rule, value, cb) => {
  //       // 没有选换色区域，也没有框选
  //       const emptyIndex = firstModelImgUrls.value.findIndex(item => !urlRectMap.value[item]);
  //       if (emptyIndex > -1) {
  //         const hasMultiGroup = defaultImgUrlsGroups.value.length > 1;
  //         cb(new Error(hasMultiGroup ? `第${emptyIndex + 1}组模特图未框选换色区域` : '未框选换色区域'));
  //       } else {
  //         cb();
  //       }
  //     },
  //     trigger: 'change',
  //   },
  // ]
};

const validateUpload = async (file: File) => {
  try {
    await validImageSize(file, { mbSize: 10 });
    return true;
  } catch (error) {
    const msg = (error as Error).message || error as string;
    ElMessage.error(msg);
    return false;
  }
};

const handleSubmit = async () => {
  try {
    await formRef.value?.validate();
    if (!formData.value.replaceColorRegion && firstModelImgUrls.value.some(item => !urlRectMap.value[item])) {
      ElMessage.error('存在未框选换色区域的模特图');
      return;
    }
    showFullScreenLoading();
    const { targetColorUrls, ...commonParams } = formData.value;
    // 将颜色转换为ossUrl
    const colorUrls = await Promise.all(targetColorUrls.map(item => exchangeColorToUrl(item)));
    const paramsList: IReplaceColorTaskSaveReq[] = [];
    const modelImgGroups = defaultImgUrlsGroups.value.length
      ? defaultImgUrlsGroups.value
      : [formData.value.replaceColorImgUrls.map(item => item.url)];
    const promises: Promise<void>[] = [];
    colorUrls.forEach((colorUrl) => {
      const _promises = modelImgGroups.map(async (modelImgGroup) => {
        const firstModelImgUrl = modelImgGroup[0];
        // 框选区域转mask图
        const maskImgUrl = await exchangeMaskRectToUrl(firstModelImgUrl);
        paramsList.push({
          ...commonParams,
          ...defaultCreateParams,
          targetColorUrl: colorUrl,
          replaceColorImgUrls: modelImgGroup,
          maskImgUrl,
        });
      });
      promises.push(..._promises);
    });
    await Promise.all(promises);
    await fetchReplaceColorTaskSaveBatch({ replaceColorTaskSaveReqList: paramsList });
    ElMessage.success('提交成功');
    goBack();
  } catch (error) {
    console.log('出错了', typeof error);
  } finally {
    hideFullScreenLoading();
  }
};

// watch(
//   () => [formData.value.replaceColorRegion, hasMask.value],
//   () => {
//     // 换色区域和框选区域不能同时为空，否则提示
//     formRef.value?.validateField('replaceColorRegion');
//     // formRef.value?.validateField('maskImgUrl');
//   }
// );

const onRegionRectChange = (rect?: typeof urlRectMap.value[keyof typeof urlRectMap.value]) => {
  urlRectMap.value[currentModelImgUrl.value] = rect || null;
};

/** 根据品类设置默认换转区域 */
const setRegionByCategoryName = async () => {
  const categoryName = findSecondLevelCategoryName(formData.value.categoryName);

  if (!categoryName) return;

  if (categoryName.includes('上装')) {
    formData.value.replaceColorRegion = REPLACE_REGION_ENUM.TOP;
    return;
  }
  if (categoryName.includes('下装')) {
    formData.value.replaceColorRegion = REPLACE_REGION_ENUM.BOTTOM;
    return;
  }
  if (['套装', '连身'].some(item => categoryName.includes(item))) {
    formData.value.replaceColorRegion = REPLACE_REGION_ENUM.ONE_PIECE;
  }
};

const init = async () => {
  const categoryPromise = getCategoryList();
  if (route.params.copyId) {
    const { data } = await fetchReplaceColorTaskDetail(route.params.copyId as string);
    const { replaceColorImgUrls, targetColorUrl, replaceColorRegion, maskImgUrl, categoryCode, categoryName, taskSource, sourceBusinessCode, sourceBusinessId } = data;
    formData.value = {
      replaceColorImgUrls: replaceColorImgUrls?.map(url => ({ url })) || [],
      targetColorUrls: targetColorUrl ? [targetColorUrl] : [],
      replaceColorRegion,
      maskImgUrl,
      categoryCode,
      categoryName,
    };
    defaultCreateParams.taskSource = taskSource;
    defaultCreateParams.sourceBusinessCode = sourceBusinessCode;
    defaultCreateParams.sourceBusinessId = String(sourceBusinessId);
    if (maskImgUrl) {
    // TODO: 待优化，先同步添加初始数据，避免异步数据未返回时，useRegionMask识别没有mask，导致生成预览效果
      urlRectMap.value[formData.value.replaceColorImgUrls[0].url] = { x: 0, y: 0, width: 0, height: 0 };
      urlRectMap.value[formData.value.replaceColorImgUrls[0].url] = await exchangeMaskUrlToRect(maskImgUrl);
    }
  }
  await initCreateData();
  await categoryPromise;
  if (formData.value.categoryName && !formData.value.replaceColorRegion) {
    setRegionByCategoryName();
  }
};
init();
</script>
<style scoped lang="scss">
.color-picker-overlay {
  display: inline-block;
  position: relative;
  .picker-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 10;
  }
  :deep(.el-color-picker__color) {
    border: none;
  }
  :deep(.el-color-picker__color-inner .el-icon) {
    display: none;
  }
}
.color-item {
  position: relative;
  overflow: hidden;
  width: 80px;
  height: 80px;
  padding: 2px;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  &.active {
    border-color: var(--el-color-primary);
  }
  .color-item-delete {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-radius: 0 0 0 4px;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
  &:hover {
    border-color: var(--el-color-primary);
    .color-item-delete {
      display: block;
    }
  }
}
.drag-select-icon {
  width: 28px;
  height: 28px;
  padding: 2px;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    color: var(--el-color-primary);
    font-weight: bold;
  }
  &.active {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }
}
.model-group {
  position: relative;
  padding: 16px 16px 12px;
  border: var(--el-border);
  border-radius: 4px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  &.active {
    border-color: var(--el-color-primary);
  }
}
.group-num {
  border-radius: 0 0 8px;
  background-color: var(--el-color-primary);
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  text-align: center;
  color: #fff;
}
.check-btn {
  margin-left: auto;
  font-size: 24px;
  cursor: pointer;
  color: #c0c4cc;
  &:hover {
    color: var(--el-color-primary);
  }
  &.checked {
    color: var(--el-color-primary);
  }
}
</style>
