<script lang="ts" setup>
import { ref, defineProps, defineEmits, PropType, watch } from 'vue';
import { ISizeConfigListRes, ISizeConfigListResSizeConfigListItem, ISizeConfigSubmitReq } from '../../api/type';
import { IdictValuesItem } from '@/api/dict/types';
import { ISizeItem } from './type';
import { SAMPLE_SIZE_STATE_ENUM } from '../../constant';
import { sizeConfigSubmit } from '../../api';
import { ElMessage } from 'element-plus';

const emit = defineEmits(['update:visible', 'success']);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  sizeConfigLoading: {
    type: Boolean,
    default: false,
  },
  sizeConfig: {
    type: Object as PropType<ISizeConfigListRes>,
    default: () => {},
  },
  plmStandardSizeList: {
    type: Array as PropType<IdictValuesItem[]>,
    default: () => [],
  },
});

const sizeList = ref<ISizeItem[]>([]);

const handleSizeConfigMap = (list: ISizeConfigListResSizeConfigListItem[]) => {
  const sizeConfigMap: Map<string, ISizeConfigListResSizeConfigListItem> = new Map();
  list.forEach((sizeConfig) => {
    const { sizeStandardCode, sampleSize } = sizeConfig;
    sizeConfigMap.set(`${sizeStandardCode}-${sampleSize}`, sizeConfig);
  });
  return sizeConfigMap;
};

const handleFormatSizeList = () => {
  sizeList.value = [];
  const sizeConfigList = props.sizeConfig.sizeConfigList || [];
  const sizeConfigMap = handleSizeConfigMap(sizeConfigList);

  const rootMap: Record<string, ISizeItem> = {};
  const childList = props.plmStandardSizeList.filter((plmStandardSize) => {
    const { valueParentCode, valueCode, value } = plmStandardSize;
    if (!valueParentCode) {
      rootMap[valueCode] = {
        name: value,
        valueCode,
        isCheck: false,
        isIndeterminate: false,
        children: [],
      };
    }
    return valueParentCode;
  });
  childList.forEach((plmStandardSize) => {
    const { valueParentCode, value } = plmStandardSize;
    if (valueParentCode) {
      const s = value.split(',');
      const root = rootMap[valueParentCode];
      if (root) {
        root.children.push(...s.map((sizeName) => {
          const key = `${valueParentCode}-${sizeName}`;
          const isCheck = !!sizeConfigMap.has(key);
          const item: ISizeConfigListResSizeConfigListItem = sizeConfigMap.get(key) || {
            sizeConfigId: '',
            sizeStandard: root.name,
            sizeStandardCode: valueParentCode,
            sampleSize: sizeName,
            relateSizeCount: '',
            creatorName: '',
            reviserName: '',
            remark: '',
            revisedTime: '',
            createdTime: '',
          };
          sizeConfigMap.delete(key);
          const sampleSizeState = isCheck ? SAMPLE_SIZE_STATE_ENUM.CHECKED : SAMPLE_SIZE_STATE_ENUM.UNCHECKED;
          return {
            ...item,
            disabled: Number(item.relateSizeCount || '0') > 0,
            sampleSizeState,
            oldSampleSizeState: sampleSizeState,
          };
        }));
      }
    }
  });

  // ops 没有的情况
  [...sizeConfigMap.values()].forEach((sizeConfig) => {
    const { sizeStandardCode, sizeStandard, relateSizeCount } = sizeConfig;
    if (Number(relateSizeCount || '0') === 0) return;
    const root = rootMap[sizeStandardCode];
    if (root) {
      root.children.push({
        ...sizeConfig,
        disabled: true,
        sampleSizeState: SAMPLE_SIZE_STATE_ENUM.CHECKED,
        oldSampleSizeState: SAMPLE_SIZE_STATE_ENUM.CHECKED,
      });
    } else {
      rootMap[sizeStandardCode] = {
        name: sizeStandard,
        valueCode: sizeStandardCode,
        isCheck: false,
        isIndeterminate: false,
        children: [{
          ...sizeConfig,
          disabled: true,
          sampleSizeState: SAMPLE_SIZE_STATE_ENUM.CHECKED,
          oldSampleSizeState: SAMPLE_SIZE_STATE_ENUM.CHECKED,
        }],
      };
    }
  });
  sizeList.value = Object.values(rootMap).filter(root => root.children.length).map((root) => {
    root.isCheck = root.children.every(child => child.sampleSizeState === SAMPLE_SIZE_STATE_ENUM.CHECKED);
    root.isIndeterminate = !root.isCheck
    && root.children.some(child => child.sampleSizeState === SAMPLE_SIZE_STATE_ENUM.CHECKED);
    return {
      ...root,
    };
  });
};

watch(
  () => [props.plmStandardSizeList, props.sizeConfig],
  () => {
    if (props.plmStandardSizeList.length > 0 && props.sizeConfig) {
      handleFormatSizeList();
    }
  },
  {
    immediate: true,
  },
);

const handleClose = () => {
  emit('update:visible', false);
};

const handleCheckAllChange = (index: number) => {
  sizeList.value[index].isIndeterminate = false;
  const sampleSizeState = sizeList.value[index].isCheck
    ? SAMPLE_SIZE_STATE_ENUM.CHECKED : SAMPLE_SIZE_STATE_ENUM.UNCHECKED;
  sizeList.value[index].children.forEach((child) => {
    if (!child.disabled) {
      child.sampleSizeState = sampleSizeState;
    }
  });
};

const handleChildChange = (parentIndex: number) => {
  const parent = sizeList.value[parentIndex];
  const checkCount = sizeList.value[parentIndex].children
    .filter(child => child.sampleSizeState === SAMPLE_SIZE_STATE_ENUM.CHECKED).length;

  parent.isCheck = checkCount === parent.children.length;
  parent.isIndeterminate = checkCount > 0 && checkCount < parent.children.length;
};

const handleSave = async () => {
  const t = new Date().getTime();
  const req: ISizeConfigSubmitReq = {
    revisedTime: props.sizeConfig.revisedTime || t.toString(),
    configInfoList: [],
  };
  sizeList.value.forEach((size) => {
    const { children } = size;
    children.forEach((child) => {
      if (!child.disabled && child.oldSampleSizeState !== child.sampleSizeState) {
        req.configInfoList.push({
          sizeConfigId: child.sizeConfigId,
          sizeStandard: child.sizeStandard,
          sizeStandardCode: child.sizeStandardCode,
          sampleSize: child.sampleSize,
          sampleSizeState: child.sampleSizeState,
          revisedTime: child.revisedTime || t.toString(),
        });
      }
    });
  });
  if (req.configInfoList.length > 0) {
    await sizeConfigSubmit(req);
    ElMessage.success('配置成功');
  }
  handleClose();
  emit('success');
};
</script>

<template>
  <el-dialog
    :model-value="visible"
    title="尺码组配置"
    width="80%"
    append-to-body
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-scrollbar v-loading="sizeConfigLoading" max-height="300">
      <div class="flex flex-dir-column">
        <div
          v-for="(size, index) in sizeList"
          :key="index"
          class="flex flex-dir-column"
        >
          <el-checkbox
            v-model="size.isCheck"
            :indeterminate="size.isIndeterminate"
            @change="handleCheckAllChange(index)"
          >
            {{ size.name }}
          </el-checkbox>
          <div class="flex flex-wrap child-wrapper">
            <el-checkbox
              v-for="(child, childIndex) in size.children"
              :key="childIndex"
              v-model="child.sampleSizeState"
              :true-label="SAMPLE_SIZE_STATE_ENUM.CHECKED"
              :false-label="SAMPLE_SIZE_STATE_ENUM.UNCHECKED"
              :disabled="child.disabled"
              @change="handleChildChange(index)"
            >
              {{ child.sampleSize }}
            </el-checkbox>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <template #footer>
      <el-button @click="handleClose">
        取 消
      </el-button>
      <el-button
        :disabled="sizeConfigLoading"
        type="primary"
        @click="handleSave"
      >
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.child-wrapper {
  padding: 0 20px;
}
</style>
