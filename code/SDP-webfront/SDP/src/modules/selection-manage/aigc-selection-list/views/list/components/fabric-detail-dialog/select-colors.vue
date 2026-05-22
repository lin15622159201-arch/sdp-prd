<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { getLabel, getColorList } from '@/modules/selection-manage/aigc-selection-list/api/label';
import type {
  ILabel,
  IColorLabelListReqLabelsItem,
  IColorLabelListRes,
} from '@/modules/selection-manage/aigc-selection-list/api/label/type';
import { LABEL_CATEGORY_TYPE_ENUM } from '@/modules/selection-manage/aigc-selection-list/constant';
import { SKU_TYPE } from './constant';

import Correct from '@/assets/select-colors/correct.png';
import PicError from '@/assets/select-colors/pic-error.png';
import { YES_NO_ENUM } from '@/constant';
import { listToTreeById, Tree } from '@/core/utils/tree';
import { IFabricFmResSkusItem } from '@/modules/selection-manage/aigc-selection-list/api/fabric/type';

type SkuColorItem = { colorRo: string; pic: string; rgb: string; skuColorCode: string; };

const emit = defineEmits<{
  (e: 'change', values: IFabricFmResSkusItem[]): void;
}>();

const props = withDefaults(defineProps<{
  skus: IFabricFmResSkusItem[];
  defaultSelectedColorCode: string[];
  multiple: boolean;
  editing?: boolean;
}>(), {
  editing: true,
});

const ALL_LABEL = { label: '', value: '全部', code: '' };

const expand = ref(false);
const skuType = ref<SKU_TYPE>(SKU_TYPE.ALL);

const selectedColorLabelList = ref<{ label: string; value: string; }[]>([]);
const colorLabelList = ref<Tree<ILabel>[]>([]);

const handleGetColorLabel = async () => {
  const { data } = await getLabel({ classCode: LABEL_CATEGORY_TYPE_ENUM.COLOR });
  const enableData = data.filter(item => item.enable === YES_NO_ENUM.YES);
  const resList = listToTreeById(enableData, { parentIdKey: 'parentCode',
    idKey: 'code',
    handleRootTree(map) {
      const values = [...map.values()];
      console.log('color', values);
      return values.find(item => item.code === LABEL_CATEGORY_TYPE_ENUM.COLOR)?.children || [];
    },
  });
  colorLabelList.value = resList.map((item) => {
    item.children?.unshift({
      ...ALL_LABEL,
      children: [],
      code: '',
      parentId: '',
      id: '',
      enable: YES_NO_ENUM.YES,
      parentCode: '' });
    return item;
  });
  selectedColorLabelList.value = colorLabelList.value.map(item => ({ label: item.value, value: ALL_LABEL.code }));
  console.log('color label', colorLabelList.value);
  console.log('selected', selectedColorLabelList.value);
};

const getSelectedList = (list: { label: string; value: string; }[], targetList: Tree<ILabel>[], label: string) => {
  const index = list.findIndex(item => item.label === label);
  console.log('index', index);
  if (index === -1) return [];
  const item = list[index];
  const res = item.value === ALL_LABEL.code
    ? [...(targetList[index].children || []).slice(1).map(i => i.code)]
    : [item.value];

  console.log('label', res);
  return res;
};

const handleGetSelectedColorLabel = () => {
  const hueList = getSelectedList(selectedColorLabelList.value, colorLabelList.value, '色相');
  const brightnessList = getSelectedList(selectedColorLabelList.value, colorLabelList.value, '亮度');
  const chromaList = getSelectedList(selectedColorLabelList.value, colorLabelList.value, '饱和度');
  console.log('selectedColorLabelList', selectedColorLabelList.value);
  const colorParams: IColorLabelListReqLabelsItem[] = [];
  hueList.forEach((hue) => {
    brightnessList.forEach((brightness) => {
      chromaList.forEach((chroma) => {
        colorParams.push({
          hue,
          brightness,
          chroma
        });
      });
    });
  });

  return colorParams;
};

const skuColorList = ref<SkuColorItem[]>([]);
const selectedSkuCode = ref<string[]>([]);

watch(() => [props.defaultSelectedColorCode], () => {
  if (selectedSkuCode.value.length === 0) {
    selectedSkuCode.value = [...props.defaultSelectedColorCode];
  }
}, {
  immediate: true
});
const handleGetColorList = async () => {
  const labels = handleGetSelectedColorLabel();
  const { data } = await getColorList({ labels });
  skuColorList.value = [];
  const colorCodeMap = data.reduce((map, item) => {
    map[item.colorCode] = item;
    return map;
  }, {} as Record<string, IColorLabelListRes[0]>);

  props.skus.forEach((sku) => {
    const { colorRo } = sku;
    if (colorCodeMap[colorRo]) {
      const { image, rgb, colorCode: skuColorCode } = sku;
      const pic = image.split(',')[0];
      if (pic) {
        skuColorList.value.unshift({ colorRo, pic: pic || '', rgb, skuColorCode });
      } else {
        skuColorList.value.push({ colorRo, pic: pic || '', rgb, skuColorCode });
      }
    }
  });
  // data.forEach((item) => {
  //   const { colorCode } = item;
  //   if (skusMap.value[colorCode]) {
  //     const { image, rgb, colorCode: skuColorCode } = skusMap.value[colorCode];
  //     const pic = image.split(',')[0];
  //     if (pic) {
  //       skuColorList.value.unshift({ colorCode, pic: pic || '', rgb, skuColorCode });
  //     } else {
  //       skuColorList.value.push({ colorCode, pic: pic || '', rgb, skuColorCode });
  //     }
  //   }
  // });
};

const filterSkuColorList = computed(() => {
  const filterFnMap: Record<SKU_TYPE, (item: SkuColorItem) => boolean> = {
    [SKU_TYPE.ALL]: _ => true,
    [SKU_TYPE.SKU_CODE]: item => !!item.colorRo,
    [SKU_TYPE.SKU_IMAGE]: item => !!item.pic,
  };

  const filterFn = filterFnMap[skuType.value];
  return skuColorList.value.filter(filterFn);
});

const init = async () => {
  await handleGetColorLabel();
  await handleGetColorList();
};

const handleSelectColorLabel = (index: number, val: string) => {
  selectedColorLabelList.value[index].value = val;
  handleGetColorList();
};

const getSelectedSkus = () => {
  const skus = props.skus.filter(sku => selectedSkuCode.value.includes(sku.colorCode));
  return skus;
};

const handleSelectSku = (colorCode: string) => {
  if (!props.editing) return;
  if (props.multiple) {
    console.log(props.multiple, 'multiple');
    const index = selectedSkuCode.value.findIndex(code => code === colorCode);
    if (index === -1) {
      selectedSkuCode.value.push(colorCode);
    } else {
      selectedSkuCode.value.splice(index, 1);
    }
  } else {
    selectedSkuCode.value = [colorCode];
  }
  emit('change', getSelectedSkus());
};

const clear = () => {
  selectedColorLabelList.value = [];
  selectedSkuCode.value = [];
  emit('change', []);
};

const hoveredSkuColorItem = ref<SkuColorItem | null>(null);
const handleSkuColorItemMouseEnter = (e: MouseEvent, item: SkuColorItem, handleEnter: (e: MouseEvent) => void) => {
  hoveredSkuColorItem.value = item;
  handleEnter(e);
};

defineExpose({
  getSelectedSkus,
  clear,
  init,
});

</script>

<template>
  <div class="tw-flex tw-flex-col tw-mt-32px tw-gap-24px">
    <div class="tw-flex tw-justify-between tw-items-center">
      <span class="tw-font-bold">{{ editing ? '请选择' : '' }}色号：共 {{ skus.length }} SKU</span>
      <el-button
        type="info"
        link
        @click="expand = !expand"
      >
        {{ expand ? '隐藏筛选' : '展开筛选' }}
      </el-button>
    </div>
    <div v-show="expand" class="tw-flex tw-flex-col">
      <span class="tw-text-[#18181A] tw-font-bold tw-mb-16px tw-text-16px">颜色</span>
      <div
        v-for="(colorLabel, index) in colorLabelList"
        :key="index"
        class="tw-flex tw-mb-16px"
      >
        <span class="tw-min-w-56px tw-text-end tw-pt-6px tw-text-nowrap">{{ colorLabel.value }}：</span>
        <div class="tw-flex tw-flex-wrap tw-m-l-2px">
          <span
            :class="`
              item tw-cursor-pointer
              ${selectedColorLabelList[index]?.value === color.code ? 'selected' : ''}
            `"
            v-for="(color, colorIndex) in colorLabel.children"
            :key="colorIndex"
            @click="handleSelectColorLabel(index, color.code)"
          >
            {{ color.value }}
          </span>
        </div>
      </div>
    </div>
    <div class="sku-color tw-flex tw-flex-wrap tw-gap-24px">
      <div
        v-for="(data, index) in filterSkuColorList"
        class="tw-flex tw-flex-col tw-items-center"
        :key="index"
        @click="handleSelectSku(data.skuColorCode)"
      >
        <el-popover
          placement="top"
          effect="light"
          width="auto"
          popper-style="min-width:0px"
          :disabled="!data.pic"
          :hide-after="0"
        >
          <template #default>
            <div class="tw-flex">
              <div
                class="tw-flex tw-flex-col tw-items-center tw-shrink-0 first:tw-mr-16px last:tw-mr-0!"
                v-if="data.pic"
              >
                <span class="tw-pb-8px">纹理色块图</span>
                <el-image
                  :src="data?.pic"
                  class="tw-w-118px tw-h-118px"
                  :preview-src-list="[data?.pic || '']"
                  :preview-teleported="true"
                >
                  <template #error>
                    <div class="tw-w-118px tw-h-118px tw-flex tw-items-center tw-justify-center tw-bg-[#F7F9FC]">
                      <img
                        class="tw-w-24px tw-h-24px"
                        :src="PicError"
                        alt=""
                      >
                    </div>
                  </template>
                </el-image>
              </div>
              <!-- <div
                class="tw-flex tw-flex-col tw-items-center first:tw-mr-16px last:tw-mr-0!"
                v-if="data.rgb"
              >
                <span class="tw-pb-8px">色块图</span>
                <div class="tw-w-118px tw-h-118px" :style="`background-color: ${data?.rgb}`" />
              </div> -->
            </div>
          </template>
          <template #reference>
            <div
              class="
                tw-relative tw-rounded-full color-item tw-cursor-pointer
              "
            >
              <el-image
                v-if="data.pic"
                :src="data.pic"
                class="tw-w-full tw-h-full hover:tw-shadow-[0px_1px_8px_2px_rgba(0,0,0,0.3)]"
              >
                <template #error>
                  <div class="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-[#F7F9FC]">
                    <img
                      class="tw-w-24px tw-h-24px"
                      :src="PicError"
                      alt=""
                    >
                  </div>
                </template>
              </el-image>
              <div
                v-else
                :class="`tw-w-full tw-h-full hover:tw-shadow-[0px_1px_8px_2px_rgba(0,0,0,0.3)]`"
                :style="`background-color: ${data.rgb}`"
              />
              <div
                v-if="selectedSkuCode.includes(data.skuColorCode)"
                class="
                  tw-absolute tw-w-full tw-h-full tw-bg-#000000/[0.6]
                  tw-left-0 tw-top-0 tw-flex tw-items-center tw-justify-center
                "
              >
                <img class="tw-h-24px tw-w-24px" :src="Correct">
              </div>
            </div>
          </template>
        </el-popover>
        <span class="tw-text-#909299 tw-mt-8px tw-w-80px tw-text-center tw-line-clamp-1">{{ data.skuColorCode }}</span>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.item {
  padding: 6px 16px;
  border-radius: 2px;
  color: #787A80;
  &.selected {
    background: #F2F4FA;
    color: #18181A;
  }
}
.color-item {
  width: 54px;
  height: 54px;
  border: 1px solid #C0C3CC;
  overflow: hidden;
}
.type-item {
  padding: 4px 16px;
  background: #F2F4FA;
  border-radius: 4px;
  font-size: 12px;
  color: #3F414D;
  line-height: 20px;
  &.selected {
    background: #F0F2FF;
    color: #605CE5;
  }
}
.sku-color {
  border-top: 1px solid #E7E9F3;
  padding-top: 16px;
}
</style>
