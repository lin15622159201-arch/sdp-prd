<script lang="ts" setup>
import { IFileData } from '@/components/uploader/packages/types';
import { computed, ref, shallowRef, watchEffect } from 'vue';
// import Uploader from '@/components/uploader2';
import { Close, WarnTriangleFilled, CircleCheckFilled, Loading } from '@element-plus/icons-vue';
import FlowerImgCanvas from '../flower-img-canvas/index.vue';
import { useFlowerLoopTask } from '../../views/list/hooks/use-flower-loop-task';
import {
  floralPrintExtractionCreate,
  floralPrintExtractionEdit,
  getWebFlowerPatternMark
} from '../../api';
import { IFloralPrintExtractionCreateReqBoxSelectionCoordinates, IWebFlowerPatternMarkRes } from '../../api/type';
// import { getImageSize } from '@/core/utils/image';
import { ElMessage } from 'element-plus';
import {
  FLOWER_PATTERN_EXTRACTION_REGION_ENUM,
  FLOWER_PATTERN_EXTRACTION_REGION_ENUM_LIST,
} from '../../constant';
import { InitDataParams } from './type';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
  (e: 'success'): void;
}>();

const _visible = computed<boolean>({
  get() {
    return props.visible;
  },
  set(val) {
    emit('update:visible', val);
  }
});
/**
 * 来源，AI设计任务=FASHION_SMART_DEVELOP_STYLE,花型提取默认为null
 */
const sourceType = ref<string | null>();
/** AI设计任务的任务id */
const sourceBusinessCode = ref<string | null>();
const extractRegion = ref<FLOWER_PATTERN_EXTRACTION_REGION_ENUM>(FLOWER_PATTERN_EXTRACTION_REGION_ENUM.UPPER_BODY);

const taskCode = ref<string>('');
const flowerCanvasRef = ref<InstanceType<typeof FlowerImgCanvas> | null>(null);
/** 算法接口返回的花型区域选框坐标, 默认拿第一个 */
const firstCoordinate = ref<IFloralPrintExtractionCreateReqBoxSelectionCoordinates>();
const files = ref<IFileData[]>([]);
const uploaderRef = ref<InstanceType<any> | null>(null);
const uploadLoading = ref(false);
const uploadFiles = (fileList: FileList) => {
  uploaderRef.value?.uploadFiles(fileList as unknown as FileList);
};

const handlePase = async (e: ClipboardEvent) => {
  if (!e.clipboardData || uploadLoading.value) return;
  const link = e.clipboardData.getData('text/plain');
  if (link) {
    uploadLoading.value = true;
    // fetch获取图片然后转file类型，调用upload实例的上传函数
    try {
      const blob: Blob = await fetch(link).then(res => res.blob());
      const filename = link.split('/').pop() || 'image.jpeg';
      const type = filename.split('.').pop() || 'jpeg';
      const file: File = new File([blob], filename, { type: `image/${type}` });
      await uploadFiles([file] as unknown as FileList);
    } finally {
      uploadLoading.value = false;
    }
    return;
  }

  // 复制文件
  const items = e.clipboardData?.items;
  const pasteFiles = Array.from(items || []);
  if (Array.isArray(pasteFiles)) {
    uploadLoading.value = true;
    const _list = pasteFiles.map((item) => {
      const imageFile = item.getAsFile();
      return imageFile;
    }).filter(file => file);
    try {
      await uploadFiles(_list as unknown as FileList);
    } finally {
      uploadLoading.value = false;
    }
  }
};

const handleDrop = async (e: DragEvent) => {
  e.preventDefault();
  if (!e.dataTransfer || uploadLoading.value) return;
  uploadLoading.value = true;
  const { files: fileList } = e.dataTransfer;
  try {
    await uploadFiles(fileList);
  } finally {
    uploadLoading.value = false;
  }
};

const errMsg = shallowRef<string>('');
/** 是否成功调用算法接口获取到矩形选区坐标 */
const isGetCoordinates = shallowRef(false);
const { clearLoop, handleStartLoopTask, isLooping } = useFlowerLoopTask<IWebFlowerPatternMarkRes>({
  apiFu: getWebFlowerPatternMark,
  handleSuccess(data: IWebFlowerPatternMarkRes) {
    console.log('sucess==', data);
    if (data.coordsList && data.coordsList.length) {
      isGetCoordinates.value = true;
      const [first] = data.coordsList;
      firstCoordinate.value = first;
      console.log('firstCoordinate=', firstCoordinate.value);
      setTimeout(() => {
        flowerCanvasRef.value?.initCoordinates(firstCoordinate.value!);
      });
    } else {
      isGetCoordinates.value = false;
      errMsg.value = '失败';
    }
  },
  handleFail<IWebFlowerPatternMarkRes>(data: IWebFlowerPatternMarkRes) {
    errMsg.value = '失败';
    console.error('fail==', data);
    isGetCoordinates.value = false;
  },
});

const handleDeletePic = () => {
  files.value = [];
  errMsg.value = '';
  isGetCoordinates.value = false;
  clearLoop();
};

/** 取消 */
const handleCancelDialog = () => {
  _visible.value = false;
  taskCode.value = '';
  extractRegion.value = FLOWER_PATTERN_EXTRACTION_REGION_ENUM.UPPER_BODY;
  handleDeletePic();
};

const headerTips = computed(() => {
  if (files.value.length) {
    return '选择花型区域，框选区域不小于160*160，不出现花型外的其他元素';
  }
  return '上传花型服装，提取花型图案，大小不超过20M,支持JPG/PNG等常见图片格式';
});

const isShowFlowerCanvas = shallowRef(false);

watchEffect(async () => {
  // clearLoop();
  if (files.value.length) {
    isShowFlowerCanvas.value = true;
    // try {
    //   const { width, height } = await getImageSize(files.value[0].url);
    //   const { data } = await flowerPatternMarkCreate({
    //     refImgUrl: files.value[0].url,
    //     refImgHeight: height,
    //     refImgWidth: width,
    //   });
    //   handleStartLoopTask(data);
    // } catch (error) {
    //   errMsg.value = '识别失败！';
    // }
  } else {
    isShowFlowerCanvas.value = false;
  }
});

const save = async () => {
  console.log('save');
  // console.log(flowerCanvasRef.value?.saveCropInfo());
  try {
    // const coordinates = flowerCanvasRef.value?.saveCropInfo();
    if (taskCode.value) {
      await floralPrintExtractionEdit({
        originalImage: files.value[0].url,
        // boxSelectionCoordinates: [coordinates as IFloralPrintExtractionCreateReqBoxSelectionCoordinates],
        taskCode: taskCode.value,
        extractRegion: extractRegion.value,
      });
    } else {
      await floralPrintExtractionCreate({
        originalImage: files.value[0].url,
        // boxSelectionCoordinates: [coordinates as IFloralPrintExtractionCreateReqBoxSelectionCoordinates],
        extractRegion: extractRegion.value,
        sourceType: sourceType.value,
        sourceBusinessCode: sourceBusinessCode.value,
      });
    }

    ElMessage.success('操作成功！');
    emit('success');
  } catch (error) {
    console.error(error);
  } finally {
    handleCancelDialog();
  }
};

/**
 * 初始化数据
 * @param url 图片url
 * @param code 任务code
 * @param source 来源，AI设计任务=FASHION_SMART_DEVELOP_STYLE,花型提取默认为null
 * @param id AI设计的任务id，花型提取为null
  */
const initData = ({
  url = '',
  code = '',
  source = null,
  id = null,
  region = FLOWER_PATTERN_EXTRACTION_REGION_ENUM.UPPER_BODY,
}: InitDataParams = {}) => {
  handleDeletePic();
  taskCode.value = code;
  sourceType.value = source;
  sourceBusinessCode.value = id;
  extractRegion.value = region;
  if (url) {
    files.value = [{
      url,
    }];
  } else {
    files.value = [];
  }
};

defineExpose({
  initData,
});

</script>

<template>
  <el-dialog
    v-model="_visible"
    width="600"
    class="clear-dialog-body-padding"
    @close="handleCancelDialog"
  >
    <template #header>
      <p class="el-dialog__title">花型提取</p>
      <p class="tw-text-#9296AD tw-text-12px tw-mt-4px">{{ headerTips }}</p>
    </template>
    <div class="tw-flex tw-flex-col tw-px-24px tw-py-10px">
      <div
        v-if="files.length === 0"
        class='tw-flex tw-flex-col'
        @paste="handlePase"
        @drop="handleDrop"
        @dragover="e => e.preventDefault()"
        @dragenter="e => e.preventDefault()"
        @dragend="e => e.preventDefault()"
      >
        <div
          class="tw-flex tw-items-center tw-justify-center
          tw-w-full tw-h-260px tw-border-dashed tw-border-1px tw-border-#C5C9DB"
        >
          <!-- <div v-show="!files.length" class='tw-flex tw-flex-col tw-items-center'>
            <div class='tw-flex tw-text-#3F414D tw-font-bold tw-flex-nowrap'>
              <span class='tw-text-nowrap tw-m-r-6px'>复制粘贴拖放图片进行上传或</span>
              <Uploader
                ref="uploaderRef"
                v-model="files"
                :size-limit="20"
                :limit="1"
                size='mini'
                accept='.jpg,.png,.jpeg'
                paste
                structure='vertical'
                listPosition='after'
                checkAccept
                :useWrapper="false"
              >
                <template #default>
                  <span class='tw-color-primary'> 点击选择</span>
                </template>
                <template #list>
                  <div />
                </template>
              </Uploader>

            </div>
            <span class='tw-text-#9296AD tw-text-12px tw-mt-12px'>请勿上传裸露、暴力、血腥或其他包含非法信息图片</span>
          </div> -->
        </div>
      </div>
      <div
        v-if="isShowFlowerCanvas"
        class='tw-w-full tw-flex tw-relative tw-h-full tw-items-center
        tw-justify-center tw-h-500px tw-bg-#EFF0F5'
      >
        <flower-img-canvas
          ref="flowerCanvasRef"
          is-edit
          :origin-img-url="files[0].url"
          :canvas-width="500"
          :canvas-height="500"
        />
        <el-icon
          class='tw-absolute tw-top-4px tw-right-4px tw-cursor-pointer'
          @click="handleDeletePic"
        >
          <Close />
        </el-icon>
      </div>
      <div class='tw-flex tw-items-center tw-gap-10px tw-px-10px tw-py-4px'>
        <!-- 识别中 -->
        <template v-if="isLooping">
          <el-icon class='tw-h-5 tw-w-5' color="#605CE5"><Loading /></el-icon>
          <span class="tw-color-primary">
            AI识别图片中
          </span>
        </template>
        <!-- 识别不到 -->
        <template v-if="errMsg && !isLooping">
          <el-icon class='tw-h-5 tw-w-5' color="red"><WarnTriangleFilled /></el-icon>
          <span class="tw-text-red">
            未检测到花型区域，请重新上传
          </span>
        </template>
        <!-- 识别成功 -->
        <template v-if="!isLooping && isGetCoordinates">
          <el-icon class='tw-h-5 tw-w-5' color="#605CE5"><CircleCheckFilled /></el-icon>
          <span class="tw-color-primary">
            模型解析完成
          </span>
        </template>
      </div>

      <div class="tw-flex tw-gap-10px tw-items-center">
        <span class="required">
          提取区域：
        </span>
        <el-radio-group v-model="extractRegion">
          <el-radio
            v-for="item in FLOWER_PATTERN_EXTRACTION_REGION_ENUM_LIST"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>

      </div>

    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancelDialog">取 消</el-button>
        <el-button
          type="primary"
          :disabled="files.length === 0"
          @click="save"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
//
</style>
