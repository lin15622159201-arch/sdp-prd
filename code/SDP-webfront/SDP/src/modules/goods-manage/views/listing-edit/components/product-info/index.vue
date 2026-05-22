<!-- 产品属性 -->
<template>
  <el-table border :data="formData.skcList">
    <el-table-column label="SKC" width="160">
      <template #default="{ row }">
        <div>{{ row.skcCode }}</div>
        <p>{{ row.color }}</p>
        <p v-if="row.platformSkc">({{ row.platformSkc }})</p>
      </template>
    </el-table-column>
    <el-table-column width="160">
      <template #header>
        <div class="required-label">色值</div>
      </template>
      <template #default="{ row, $index }">
        <!-- <span v-if="isReadonly">{{ row.color || '-' }}</span> -->
        <el-form-item
          :prop="`skcList[${$index}].platformColor`"
          :rules="rules.platformColor"
        >
          <inputSelect
            :disabled="(isReadonly || row.skcState === 1) || !!goodsEditImg"
            v-model="row.platformColor"
            v-model:select-list="selectList"
          />
          <!-- <el-cascader
            v-model="row.platformColor"
            :options="colorOptions"
            :disabled="isReadonly || row.productSkcId"
            :props="{
              label: 'name',
              value: 'name',
            }"
            :show-all-levels="false"
            @change="() => {
              row.platformColor = row.platformColor.at(-1);
              console.log('asgd12asgdsas', row)
            }"
          /> -->
          <!-- <el-select
            v-model.trim="row.platformColor"
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="输入或选择色值"
            style="width: 240px"
          >
            <el-option
              v-for="item in colorOptions"
              :key="item.specId"
              :label="item.name"
              :value="item.specId"
            />
          </el-select> -->
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column>
      <template #header>
        <div class="required-label">
          上架轮播图
          <span class="tw-color-gray-600 tw-ml-2">每个SKC 3-10张</span>
        </div>
      </template>
      <template #default="{ row, $index }">
        <el-form-item :prop="`skcList[${$index}].selectedPictures`" :rules="rules.selectedPictures">
          <div class="tw-w-full tw-flex tw-justify-between">
            <Uploader
              v-model="row.selectedPictures"
              size="mini"
              :limit="10"
              accept=".jpg,.png,.jpeg"
              multiple
              uploader-style="button"
              :disabled="(isReadonly || row.skcState === 1) && !goodsEditImg"
              @preview="(e) => {
                console.log('sadg12sagda', e);
              }"
            >
              <!-- @success="() => {
                handleBeforeUpload(row)
              }" -->
              <template #list-item="{ data }">
                <!-- 显示图片尺寸 -->
                <div
                  v-if="imageSizeMap[data.url]"
                  class="size-text"
                >
                  {{ `${imageSizeMap[data.url].width} x ${imageSizeMap[data.url].height}` }}
                </div>
              </template>
            </Uploader>
            <div v-if="(!isReadonly && (row.skcState === 0 || !row.skcState)) || !!goodsEditImg" class="tw-w-80px tw-mt-24px">
              <el-tooltip
                content="请先上传图片"
                :disabled="!!row.selectedPictures?.length"
                placement="top"
              >
                <el-button
                  type="primary"
                  text
                  :icon="Edit"
                  :disabled="!row.selectedPictures?.length"
                  @click="handleBatchEdit(row, $index)"
                >批量编辑</el-button>
              </el-tooltip>
              <el-button
                type="primary"
                text
                :icon="Plus"
                class="tw-ml-0!"
                @click="handleSelectImages(row)"
              >选择图片</el-button>
            </div>
          </div>
        </el-form-item>
      </template>
    </el-table-column>
  </el-table>

  <!-- 图片裁剪弹框 -->
  <ImageCropDialog
    v-model="showCropDialog"
    :images="cropImageList"
    @confirm="handleCropConfirm"
  />

  <SelectImagesDialog
    v-model:visible="showSelectImagesDialog"
    :image-list="currentRow.pictures || []"
    :default-selected-ids="selectedPicturesIds"
    @confirm="onImagesSelected"
  />
  <el-dialog
    v-model="showCropper"
    title="调整尺寸"
    width="980px"
  >
    <!-- <ImageCropperModal
      :image-list="cropImageList.map(v => v.url)"
      @cancel="showCropper = false"
      @confirm="handleCropConfirm"
    /> -->
    <ImageCropperModal
      v-if="showCropper"
      :aspectRatio="aspectRatio"
      :allowAdjustRatio="false"
      :maxImages="20"
      :maxFileSize="10"
      :presetImages="presetImages"
      :autoLoadPresets="true"
      @on-confirm="handleConfirm"
      @on-cancel="handleCancel"
      @on-upload="handleUpload"
      @on-crop-change="handleCropChange"
    />
  </el-dialog>

</template>

<script setup lang="ts">
import Uploader from '@/components/uploader';
import { IStyleOnShelvesDetailRes } from '@/modules/goods-manage/api/listing/type';
import { Edit, Plus } from '@element-plus/icons-vue';
import { computed, ref, watch } from 'vue';
import ImageCropDialog from './image-crop-dialog.vue';
import SelectImagesDialog from './images-select-dialog.vue';
import { IFile, IFileData } from '@/components/uploader/packages/types';
import { IFormDataSkcItem, IImageItem, useForm } from '../../hooks/use-form';
import { useContext } from '../../hooks/use-context';
import { useImageSize } from '../../hooks/use-image-size';
import inputSelect from '../input-select/index.vue';
import ImageCropperModal from '../imageCropperModal.vue';

defineProps<{
  /** 详情数据 */
  detailData: IStyleOnShelvesDetailRes;
}>();
const { isReadonly, goodsEditImg } = useContext();
const { formRef, formData, colorOptions, temuReviewDatas, detailData: skcImgList } = useForm();
const { imageSizeMap, getImageSize } = useImageSize();
const selectList = ref([
  {
    value: '占位',
  },
]);
const rules = {
  platformColor: [{ required: true, message: '请选择色值', trigger: 'change' }],
  selectedPictures: isReadonly && !goodsEditImg ? [] : [
    { required: true, message: '请上传上架轮播图', trigger: 'change' },
    {
      validator: (_rule: any, value: IFile[]) => {
        if (value.length < 3 || value.length > 10) {
          return new Error('上架轮播图数量需在3-10张之间');
        }
        return true;
      },
      trigger: 'change',
    },
    {
      validator: (_rule: any, value: IFile[]) => {
        for (let i = 0; i < value.length; i++) {
          const key = value[i].url;
          console.log('asg21asdga', key);
          if (Number(imageSizeMap[key]?.width) !== 1340 || Number(imageSizeMap[key].height) !== 1785) {
            return new Error('上架轮播图比例需要3：4,请点击批量编辑的操作');
          }
        }
        return true;
      },
      trigger: ['change', 'input'],
    },
  ],
};
const showCropper = ref(false);
const handleCropConfirms = (results: any[]) => {
  console.log('裁剪结果：', results);
  // 处理裁剪后的图片数据
};
// const colorOptions = ref([
//   { label: '红色', value: '红色' },
//   { label: '蓝色', value: '蓝色' },
//   { label: '绿色', value: '绿色' },
//   { label: '黄色', value: '黄色' },
//   { label: '黑色', value: '黑色' },
//   { label: '白色', value: '白色' },
// ]);

// watch(
//   () => temuReviewDatas.value?.skcReqs,
//   () => {
//     formData.value.skcList?.forEach((skc: any) => {
//       const item: any = (temuReviewDatas.value?.skcReqs ?? []).find(v => v.skcCode === skc.skcCode);
//       console.log('sg12asga12', item);
//       if (item) {
//         skc.platformColor = item?.platformColor ?? '';
//         skc.selectedPictures = (item?.images ?? []).map((url: string) => {
//           getImageSize(url);
//           return {
//             url,
//           };
//         });
//         skc.productSkcId = item.productSkcId;
//       }
//     });
//   },
//   { deep: true, immediate: true }
// );
// 监听图片列表变化，预加载尺寸信息
watch(
  () => formData.value.skcList,
  (newList) => {
    // if (temuReviewDatas.value?.skcReqs) return;
    newList?.forEach((skc) => {
      skc.selectedPictures?.forEach((pic) => {
        if (pic.url) {
          getImageSize(pic.url);
        }
      });
    });
  },
  { deep: true, immediate: true }
);
// 图片裁剪弹框
const showCropDialog = ref(false);
const showSelectImagesDialog = ref(false);
const currentRow = ref({} as IFormDataSkcItem);
const selectedPicturesIds = computed(() => {
  return currentRow.value.selectedPictures?.filter(item => item.pictureId).map(item => item.pictureId!) || [];
});
const cropImageList = computed(() => {
  return currentRow.value.selectedPictures || [];
});
const recordIndex = ref(0);


// 确认裁剪
const handleCropConfirm = (data: { url: string; originUrl?: string; }[]) => {
  // 更新图片列表，保留裁剪后的尺寸信息
  // if (editType.value === 'single') {
  //   currentRow.value.selectedPictures = currentRow.value.selectedPictures.map((v: IImageItem, index: number) => {
  //     if (index === (currentRow.value.selectedPictures.length - 1)) {
  //       return data[0];
  //     } else {
  //       return v;
  //     }
  //   });
  //   editType.value = '';
  // } else {
  //   currentRow.value.selectedPictures = data;
  // }
  currentRow.value.selectedPictures = JSON.parse(JSON.stringify(data));
  formData.value.skcList[recordIndex.value].selectedPictures = JSON.parse(JSON.stringify(data));
  setTimeout(() => {
    formRef.value?.clearValidate();
  });
};

const handleSelectImages = (row: IFormDataSkcItem) => {
  showSelectImagesDialog.value = true;
  row.pictures = row.pictures.filter(r => r.materialType === 0);
  row.selectedPictures = row.selectedPictures.map((v) => {
    return {
      url: row.pictures.some((v1: any) => v1.cropImgUrl === v.url) ? row.pictures?.find((v1: any) => v1.cropImgUrl === v.url)?.pictureUrl : v.url,
      pictureId: row.pictures?.find((v1: any) => (v1.cropImgUrl === v.url) || (v1.pictureUrl === v.url))?.pictureId ?? '',
    } as any;
  });
  currentRow.value = row;
};

const onImagesSelected = (pictureIds: string[]) => {
  if (currentRow.value) {
    const resultPictures: IImageItem[] = [];
    currentRow.value.selectedPictures.forEach((item) => {
      if (!item.pictureId || pictureIds.includes(item.pictureId)) {
        resultPictures.push(item);
      }
    });
    currentRow.value.pictures.forEach((item) => {
      if (pictureIds.includes(item.pictureId) && !resultPictures.find(pic => pic.pictureId === item.pictureId)) {
        // 将图片数据转成 IImageItem 结构，让 uploader 正常回显
        resultPictures.push({
          ...item,
          // 将裁剪后的图片优先使用
          url: item.cropImgUrl || item.pictureUrl,
          originUrl: item.pictureUrl,
        });
      }
    });
    currentRow.value.selectedPictures = resultPictures;
  }
};
const editType = ref<string>('');
let time: any = null;
// let urlList:IImageItem[] = [];
const handleBeforeUpload = (row: IFormDataSkcItem) => {
  currentRow.value.selectedPictures = row.selectedPictures;
  console.log('sgad12asgsa', currentRow.value);
  // setTimeout(() => {
  //   showCropDialog.value = true;
  // }, 800);
  // urlList.push(file);
  if (time) {
    clearTimeout(time);
    time = null;
  }
  time = setTimeout(() => {
    // currentRow.value.selectedPictures = urlList;
    // editType.value = 'single';
    showCropDialog.value = true;
  }, 800);
};
defineExpose({
  formRef,
});

// 图片裁剪相关参数
const aspectRatio = ref({ width: 1340, height: 1785 });
// 预设图片示例（可选）
const presetImages = ref<string[]>([]);
const handleConfirm = (images: any) => {
  currentRow.value.selectedPictures = JSON.parse(JSON.stringify(images.map((url: any) => {
    return {
      url: url.croppedUrl,
    };
  })));
  formData.value.skcList[recordIndex.value].selectedPictures = JSON.parse(JSON.stringify(images.map((url: any) => {
    return {
      url: url.croppedUrl,
    };
  })));
  setTimeout(() => {
    formRef.value?.clearValidate();
  });
  showCropper.value = false;
};

const handleCancel = () => {
  showCropper.value = false;
};

const handleUpload = () => {
  // console.log('上传图片:', images.length, '张')
};
const handleCropChange = () => {
  // console.log('裁剪区域变化:', currentImage)
};

// 批量编辑
const handleBatchEdit = (row: IFormDataSkcItem, index: number) => {
  recordIndex.value = index;
  currentRow.value = {
    ...row,
    selectedPictures: row.selectedPictures.map((v) => {
      return {
        url: row.pictures.some((v1: any) => v1.cropImgUrl === v.url) ? row.pictures?.find((v1: any) => v1.cropImgUrl === v.url)?.pictureUrl : v.url,
      } as any;
    }),
  };
  // showCropDialog.value = true;
  presetImages.value = row.selectedPictures.map((v) => {
    return row.pictures.some((v1: any) => v1.cropImgUrl === v.url) ? row.pictures?.find((v1: any) => v1.cropImgUrl === v.url)?.pictureUrl ?? '' : v.url || '';
  });
  showCropper.value = true;
};
</script>
<style scoped lang="scss">
.required-label::before {
  content: "*";
  color: red;
  margin-right: 2px;
}
.size-text {
  position: absolute;
  left: 0;
  bottom: 0;
  width: calc(100% - 10px);
  margin: 5px;
  border-radius: 0 0 4px 4px;
  background-color: rgba(0, 0, 0, 0.5);
  line-height: 20px;
  text-align: center;
  color: #fff;
}
</style>
