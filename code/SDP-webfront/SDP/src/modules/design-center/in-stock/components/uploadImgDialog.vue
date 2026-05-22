<template>
  <el-dialog
    v-model="show"
    title="上传图片"
    width="800px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @closed="close()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-suffix="："
      :rules="rules"
    >
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="图片类型" prop="pictureType">
            <el-radio-group
              v-model="formData.pictureType"
              clearable
              placeholder="请选择上传的图片类型"
            >
              <el-radio
                v-for="item in PICTURE_TYPE_LIST"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="匹配方式" prop="matchingType">
            <el-radio-group
              v-model="formData.matchingType"
              clearable
              placeholder="请选择匹配方式"
            >
              <el-radio
                v-for="item in MATCH_TYPE_LIST"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div
        @dragover.prevent="onDragover"
        @drop.prevent="onDrop"
        class="tw-relative tw-w-full tw-h-360px upload-drag_area"
        :class="dragClass"
      >
        <uploader
          v-show="isDrag && !loading"
          @dragleave="onDragleave"
          class="uploader"
          @update:modelValue="onUpdate"
          :beforeDirDropUpload="onBeforeDirDropUpload"
          :onError="onError"
          size="medium"
          :disabled="false"
          :paste="false"
          :useWrapper="false"
          isDirectory
          accept=".jpg,.jpeg,.png,.webp"
          :appendUploadValidate="uploadValidate"
        >
          <template #list />
          <div />
        </uploader>
        <p class="tw-font-size-20px tw-color-red">请将文件夹拖动到此区域，文件夹请按SPU编号命名</p>
      </div>
    </el-form>
    <template #footer>
      <!--  -->
    </template>
    <!-- 弹窗：上传结果，有一个上传失败，才展示 -->
    <uploadImgResultDialog v-model="imgUploadResultObj.show" :tableData="imgUploadResultObj.tableData" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick, onMounted, onBeforeUnmount, reactive } from 'vue';
import type { ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useResetRef } from '@toy/v-use';
import { PICTURE_TYPE_LIST, MATCH_TYPE_LIST, MATCH_TYPE_ENUM, PICTURE_TYPE_ENUM } from '../constant';
import { IFileData } from '@/components/uploader/packages/types';
import { isSupportDragUploadDir } from '@/components/uploader/packages/hooks/drog-uplod-dir';
import { fetchSpotStyleBatchEditImage } from '../api';
import uploadImgResultDialog from './uploadImgResultDialog.vue';
import { ISpotStyleBatchEditImageReq, ISpotStyleBatchEditImageRes } from '../api/spot-style';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

interface IEmit {
  (e: 'update:modelValue', val: boolean): void;
  (e: 'success'): void;
}
const loading = ref(false);
const isDrag = ref(false);
const emits = defineEmits<IEmit>();
const formRef = ref<InstanceType<typeof ElForm> | null>(null);

const imgUploadResultObj = reactive({
  show: false,
  tableData: [] as ISpotStyleBatchEditImageRes,
});

const [formData, resetFormData] = useResetRef({
  imageInfoList: [],
  pictureType: PICTURE_TYPE_ENUM.PRODUCT,
  matchingType: MATCH_TYPE_ENUM.SPU_CODE,
});

const rules = {
  pictureType: [{ required: true, message: '不能为空' }],
  matchingType: [{ required: true, message: '不能为空' }],
};

const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:modelValue', value),
});

const close = () => {
  resetFormData();
  show.value = false;
  nextTick(() => {
    formRef.value?.resetFields();
  });
};

/**
 * @param dirNameList 文件夹名称列表
 * @returns true 继续上传，false 停止上传
 */
const onBeforeDirDropUpload = async () => {
  await formRef.value?.validate();
  if (!loading.value) loading.value = true;
  return true;
};

const onError = () => {
  loading.value = false;
  console.log('上传失败==', loading.value);
};

// 用于控制只报错一次
const hasOverLimitDirs = new Set<string>();
// 上传前先校验文件夹是否超过20张
const uploadValidate = (file: File, fileDirMap?: Map<File, string>) => {
  if (fileDirMap) {
    const overLimitDirNames = new Set<string>();
    const dirFileCountMap = new Map<string, number>();
    [...fileDirMap.values()].forEach((name) => {
      if (!dirFileCountMap.has(name)) {
        dirFileCountMap.set(name, 0);
      }
      const count = dirFileCountMap.get(name)!;
      if (count >= 20) {
        overLimitDirNames.add(name);
      }
      dirFileCountMap.set(name, count + 1);
    });

    if (overLimitDirNames.size > 0) {
      const dir = fileDirMap.get(file);
      // 当前文件存在于超出限制的文件夹中，并且没有报错过
      if (dir && overLimitDirNames.has(dir) && !hasOverLimitDirs.has(dir)) {
        overLimitDirNames.forEach((_dir) => {
          hasOverLimitDirs.add(_dir);
        });
        ElMessage.error(`${[...overLimitDirNames].join('、')}图片不能超过20张`);
        loading.value = false;
      }
      setTimeout(() => {
        hasOverLimitDirs.clear();
      }, 500);
      return false;
    }
  }
  return true;
};

const onUpdate = async (files: IFileData[]) => {
  const map = new Map<string, string[]>();
  console.log('files==', files);

  files.forEach((file) => {
    if (!map.has(file.dir!)) {
      map.set(file.dir!, []);
    }
    map.get(file.dir!)!.push(file.url);
  });
  const spuList: ISpotStyleBatchEditImageReq = Array.from(map.entries()).map(([key, value]) => {
    return {
      taskCode: key,
      productImages: value,
    };
  });

  try {
    const { data } = await fetchSpotStyleBatchEditImage(spuList);
    if (Array.isArray(data) && data.length > 0) {
      imgUploadResultObj.tableData = data || [];
      imgUploadResultObj.show = true;
    } else {
      ElMessage.success('上传成功');
      close();
    }
    emits('success');
  } finally {
    isDrag.value = false;
    loading.value = false;
  }
};

const onDragover = () => {
  isDrag.value = true;
};

const onDrop = (e: DragEvent) => {
  e.preventDefault();
  isDrag.value = false;
};

const onDragleave = (e: DragEvent) => {
  e.preventDefault();
  isDrag.value = false;
};

const dragClass = computed(() => {
  return {
    'upload-drag_area--active': isDrag.value,
  };
});

onMounted(() => {
  if (!isSupportDragUploadDir()) {
    ElMessage.warning('您的浏览器不支持文件夹上传，请使用谷歌浏览器或其他浏览器！');
  }
  // 阻止整个文档的默认拖放行为
  document.addEventListener('dragover', (e: Event) => {
    e.preventDefault();
  });

  document.addEventListener('drop', (e: Event) => {
    e.preventDefault();
  });
});

onBeforeUnmount(() => {
  // 阻止整个文档的默认拖放行为
  document.removeEventListener('dragover', (e: Event) => {
    e.preventDefault();
  });
  document.removeEventListener('drop', (e: Event) => {
    e.preventDefault();
  });
});
</script>

<style lang="scss" scoped>
.uploader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  :deep {
    .wrapper,
    .auto-wrapper {
      height: 100%;
    }
  }
}
.upload-drag_area {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 2px dashed #d9d9d9;
}
.upload-drag_area--active {
  border-color: var(--el-color-primary);
}
</style>
