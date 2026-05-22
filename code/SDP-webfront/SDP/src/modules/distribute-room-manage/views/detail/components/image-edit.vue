<template>
  <el-dialog
    v-model="visibleRef"
    :title="title"
    :before-close="handleHideDialog"
    center
    :close-on-click-modal="false"
    custom-class="dialog-width-small"
    append-to-body
    @open="handleOpen"
  >
    <section
      class="sku-flower-images-edit"
    >
      <el-alert
        :title="`最多可以上传 ${limit} 张图片, 支持png、jpg、jpeg图片格式`"
        type="info"
        :closable="false"
        class="margin-bottom-15"
      />
      <uploader
        v-model="(fileList as any)"
        accept=".png,.jpg,.jpeg"
        :check-accept="true"
        :tips="`最多可以上传 ${limit} 张图片, 支持png、jpg、jpeg图片格式`"
        :limit="limit"
        :size-limit="sizeLimit"
        @update="handleUploadUpdate"
        @upload-paste="handleUploadUpdatePaste"
        @delete="handleDelete"
      />
    </section>
    <template #footer>
      <span
        class="dialog-footer"
      >
        <el-button @click="handleHideDialog">取消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import Uploader from '@/components/uploader';
import { cloneDeep } from 'lodash-es';

interface IImages {
  name?: string;
  url?: string;
  id?: string;
}

export default defineComponent({
  name: 'ImageEdit',
  components: {
    Uploader,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
      default: false,
    },
    // 标题
    title: {
      type: String,
      default: '图片编辑',
    },
    // 图片的张数限制
    limit: {
      type: Number,
      default: 1,
    },
    // 图片的大小限制
    sizeLimit: {
      type: String,
      default: '',
    },
    // 图片列表
    images: {
      type: Array,
      required: true,
      default: () => ([]),
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const fileList = ref<IImages[]>([]);
    const imageAfterEdit = ref([] as IImages[]);
    const deleteAttr = ref([] as IImages[]);

    const visibleRef = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    const handleUploadUpdate = (images: IImages[]) => {
      fileList.value = images;
      imageAfterEdit.value = images.map((item) => {
        item.name = item.name || '';
        return item;
      });
    };
    const handleUploadUpdatePaste = (image: IImages[]) => {
      const list = cloneDeep(fileList.value);
      const images = [list, image];
      handleUploadUpdate(images as IImages[]);
    };

    const handleDelete = (deleteItem: IImages) => {
      if (deleteItem.id) {
        // 已入库的图片, 非当前上传的图片
        deleteAttr.value.push(deleteItem);
      }
    };
    const handleSubmit = () => {
      const images = imageAfterEdit.value?.length > 0 ? imageAfterEdit.value : fileList.value;
      emit('change', images, deleteAttr.value);
    };
    const handleOpen = () => {
      imageAfterEdit.value = [];
      deleteAttr.value = [];
    };
    const handleHideDialog = () => {
      visibleRef.value = false;
    };

    watch(
      () => props.images,
      (newVal) => {
        fileList.value = [...newVal] as IImages[];
      },
    );

    return {
      handleUploadUpdate,
      handleUploadUpdatePaste,
      handleDelete,
      handleSubmit,
      handleOpen,
      handleHideDialog,
      visibleRef,
      fileList,
    };
  },

});
</script>

<style lang="scss">
  $size: 139px;
  $line-height: $size - 2;
  .sku-flower-images-edit {
    .upload {
      margin: -4px -8px;
      .image-item,
      .uploader,
      .uploader-by-paste {
        width: $size;
        height: $size;
        margin: 4px 8px;
      }
      .el-upload--picture-card {
        line-height: $line-height;
      }
      .el-upload--picture-card,
      .uploader-by-paste-handler {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
