<template>
  <el-dialog
    v-model="visible"
    width="800px"
    title="选择图片"
    @open="handleOpen"
  >
    <el-checkbox
      v-model="allSelected"
      :indeterminate="isIndeterminate"
      label="全选"
      @change="handleSelectAll"
    />
    <div class="tw-flex tw-gap-2 tw-flex-wrap tw-mt-2">
      <div
        v-for="(item, index) in imageList"
        :key="item.pictureId"
        class="tw-relative"
      >
        <el-checkbox
          v-model="selectedMap[item.pictureId]"
          class="tw-m-2 tw-absolute tw-top-0 tw-left-0 tw-z-10"
        />
        <el-image
          v-if="item.pictureUrl"
          :src="$filters.ossUrl(item.pictureUrl, 100)"
          class="tw-w-100px tw-h-100px"
          fit="cover"
          :preview-src-list="previewImageUrls"
          :initial-index="index"
        />
      </div>
    </div>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { CheckboxValueType } from 'element-plus';
import { computed, ref, watch } from 'vue';
import { IPicturItem } from '@/modules/goods-manage/api/listing/type';

const props = defineProps<{
  imageList: IPicturItem[];
  defaultSelectedIds: (string | number)[];
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'confirm', pictureIds: string[]): void;
}>();

const visible = computed({
  get: () => props.visible,
  set: (val) => {
    emit('update:visible', val);
  },
});

const previewImageUrls = computed(() => props.imageList.map(item => item.pictureUrl));

const allSelected = ref(false);
const isIndeterminate = ref(false);

const selectedMap = ref<Record<string, boolean>>({}); // 用于记录当前选择状态
const originSelectedMap = ref<Record<string, boolean>>({}); // 用于记录初始选择状态

const handleSelectAll = (val: CheckboxValueType) => {
  if (val) {
    props.imageList.forEach((item) => {
      selectedMap.value[item.pictureId] = true;
    });
    isIndeterminate.value = false;
  } else {
    selectedMap.value = {};
    isIndeterminate.value = false;
  }
};

const handleOpen = () => {
  // 初始化选择状态
  const defaultSelected: typeof selectedMap.value = {};
  // 回显已经选中的图片
  props.defaultSelectedIds.forEach((id) => {
    if (id && props.imageList.find(img => img.pictureId === id)) {
      defaultSelected[id] = true;
    }
  });
  selectedMap.value = defaultSelected;
  // 保存初始选择状态
  originSelectedMap.value = { ...defaultSelected };
};

// 监听单个选项变化，更新全选状态
watch(
  selectedMap,
  (newVal) => {
    const selectedMapCount = Object.values(newVal).filter(Boolean).length;
    const totalCount = props.imageList.length;

    allSelected.value = selectedMapCount === totalCount;
    isIndeterminate.value = selectedMapCount > 0 && selectedMapCount < totalCount;
  },
  { deep: true }
);

const handleConfirm = () => {
  emit('confirm', Object.keys(selectedMap.value).filter(key => selectedMap.value[key]));
  visible.value = false;
};
</script>
