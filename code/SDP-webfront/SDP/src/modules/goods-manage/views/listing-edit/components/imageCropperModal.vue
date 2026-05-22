<template>
  <div class="batch-image-crop">
    <!-- 顶部区域 - 尺寸比例显示 -->
    <div class="crop-header">
      <span class="header-label">temu 比例 3:4</span>
      <div class="size-inputs">
        <div class="size-input-group">
          <label>宽</label>
          <input 
            type="number" 
            :value="aspectRatio.width" 
            :readonly="!allowAdjustRatio"
            @input="updateWidth"
          />
        </div>
        <div class="size-input-group">
          <label>高</label>
          <input 
            type="number" 
            :value="aspectRatio.height" 
            :readonly="!allowAdjustRatio"
            @input="updateHeight"
          />
        </div>
      </div>
    </div>

    <!-- 中间区域 -->
    <div class="crop-content">
      <!-- 左侧裁剪区域 -->
      <div class="crop-area">
        <div
          v-if="!currentImage"
          class="upload-prompt"
          style="opacity: 0;"
        >
          <div class="upload-icon">📷</div>
          <p>请上传图片或拖拽图片到此处</p>
          <input 
            ref="fileInput"
            type="file" 
            multiple 
            accept="image/jpeg,image/jpg,image/png,image/webp"
            @change="handleFileSelect"
            style="display: none"
          />
          <el-button
            class="upload-btn"
            @click="triggerFileInput"
          >选择图片</el-button>
        </div>
        <div 
          v-else 
          class="crop-container"
          @drop.prevent="handleDrop"
          @dragover.prevent
        >
          <img 
            ref="cropperImage" 
            :src="currentImage.url" 
            alt="待裁剪图片"
          />
        </div>
      </div>

      <!-- 右侧图片列表 -->
      <div class="image-list">
        <div class="list-scroll">
          <div 
            v-for="image in images" 
            :key="image.id"
            class="image-item"
            :class="{ active: currentImage && currentImage.id === image.id }"
            @click="selectImage(image)"
          >
            <img :src="image.url" :alt="image.name" />
            <div class="image-info">
              <!-- <span class="image-name">{{ image.name }}</span> -->
              <span class="image-size">{{ image.width }}x{{ image.height }}</span>
            </div>
            <!-- <button class="delete-btn" @click.stop="removeImage(image.id)">×</button> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 底部区域 - 操作按钮 -->
    <div class="crop-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button @click="handleConfirm" type="primary">
        确定
      </el-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref, PropType, onMounted, watch, nextTick } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { baseUrlToHttpUrl } from '@/core/utils/image';
import { ElLoading } from 'element-plus';

export default {
  name: 'BatchImageCrop',
  props: {
    // 裁剪比例
    aspectRatio: {
      type: Object,
      default: () => ({ width: 1340, height: 1785 })
    },
    // 是否允许调整比例
    allowAdjustRatio: {
      type: Boolean,
      default: false
    },
    // 最大上传数量
    maxImages: {
      type: Number,
      default: 20
    },
    // 单张图片最大大小（MB）
    maxFileSize: {
      type: Number,
      default: 10
    },
    // 预设图片列表
    presetImages: {
      type: Array as PropType<any>,
      default: () => []
    },
    // 是否自动加载预设图片
    autoLoadPresets: {
      type: Boolean,
      default: true
    }
  },
  emits: ['on-confirm', 'on-cancel', 'on-upload', 'on-crop-change', 'update:aspectRatio'],
  setup(props, { emit }) {
    const images = ref<any>([]);
    const currentImage = ref<any>(null);
    const cropperImage = ref<any>(null);
    const fileInput = ref<any>(null);
    let cropper: any = null;
    let imageId = 0;

    // 触发文件选择
    const triggerFileInput = () => {
      fileInput.value?.click();
    };

    // 处理文件选择
    const handleFileSelect = async (event: any) => {
      const files = Array.from(event.target.files);
      await loadImages(files);
      event.target.value = '';
    };

    // 处理拖拽上传
    const handleDrop = async (event: any) => {
      const files = Array.from(event.dataTransfer.files).filter((file: any) => file.type.startsWith('image/'));
      await loadImages(files);
    };

    // 加载图片
    const loadImages = async (files: any) => {
      if (images.value.length + files.length > props.maxImages) {
        return;
      }
      // eslint-disable-next-line
      for (const file of files) {
        // 检查文件大小
        // if (file.size > props.maxFileSize * 1024 * 1024) {
        //   continue;
        // }

        // 检查文件格式
        // if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        //   continue;
        // }
        try {
          /* eslint-disable no-await-in-loop */
          const imageData = await loadImageFile(file);
          images.value.push(imageData);
        } catch (error) {
          console.error('加载图片失败:', error);
        }
      }
      // 如果是第一次上传，自动选择第一张
      if (!currentImage.value && images.value.length > 0) {
        await nextTick();
        selectImage(images.value[0]);
      }
      emit('on-upload', images.value);
    };
    // 加载图片文件
    const loadImageFile = (file: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = new Image();
          imageId += 1;
          img.onload = () => {
            resolve({
              id: `img_${imageId}`,
              name: file.name,
              file,
              url: e.target.result,
              width: img.width,
              height: img.height,
              cropArea: null,
              croppedImage: null,
            });
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    // 加载预设图片
    const loadPresetImages = async () => {
      if (!props.autoLoadPresets || props.presetImages.length === 0) {
        return;
      }
      const loading = ElLoading.service({ fullscreen: true, text: '图片加载中，请稍后...' });
      // eslint-disable-next-line
      for (const url of props.presetImages) {
        try {
          /* eslint-disable no-await-in-loop */
          const response = await fetch(url as string);
          /* eslint-disable no-await-in-loop */
          const blob = await response.blob();
          imageId += 1;
          const fileName = url?.split('/').pop() || `preset_${imageId}.jpg`;
          const file = new File([blob], fileName, { type: blob.type });
          /* eslint-disable no-await-in-loop */
          const imageData = await loadImageFile(file);
          images.value.push(imageData);
        } catch (error) {
          console.error('加载预设图片失败:', url, error);
        }
      }
      // 初始化需要加载每张图片防止图片变形
      let i = images.value.length;
      async function _img() {
        await nextTick();
        setTimeout(() => {
          selectImage(images.value[i]);
          if (i !== 0) {
            i -= 1;
            _img();
          }
        });
      }
      _img();
      // if (images.value.length > 0) {
      //   await nextTick();
      //   selectImage(images.value[2]);
      // }
      loading.close();
    };

    // 选择图片
    const selectImage = async (image: any) => {
      // 保存当前图片的裁剪信息
      if (currentImage.value && cropper) {
        saveCropData();
      }

      currentImage.value = image;
      await nextTick();
      initCropper();
    };

    // 初始化裁剪器
    const initCropper = () => {
      if (cropper) {
        cropper.destroy();
      }

      if (!cropperImage.value || !currentImage.value) {
        return;
      }

      const aspectRatioValue = props.aspectRatio.width / props.aspectRatio.height;

      cropper = new Cropper(cropperImage.value, {
        aspectRatio: aspectRatioValue,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 0.96,
        restore: false,
        guides: true,
        center: true,
        highlight: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        data: currentImage.value.cropArea || undefined,
        ready() {
          const padding = 10;
          const container = cropper.getContainerData();
          const image = cropper.getImageData();
          const availableWidth = container.width - 2 * padding;
          const availableHeight = container.height - 2 * padding;
          const scaleX = availableWidth / image.width;
          const scaleY = availableHeight / image.height;
          const scale = Math.min(scaleX, scaleY);
          cropper.setCanvasData({
            // left: padding, // 图片左侧距离容器 10px
            top: padding,
            width: image.width * scale,
            height: image.height * scale
          });
          // 如果有保存的裁剪数据，恢复它（保留你原有逻辑）
          if (currentImage.value.cropArea) {
            cropper.setData(currentImage.value.cropArea);
          }
        },
        crop() {
          emit('on-crop-change', currentImage.value);
        }
      });
    };

    // 保存裁剪数据
    const saveCropData = () => {
      if (cropper && currentImage.value) {
        currentImage.value.cropArea = cropper.getData();
      }
    };

    // 移除图片
    const removeImage = (id: string) => {
      const index = images.value.findIndex((img: { id: string; }) => img.id === id);
      if (index === -1) return;

      images.value.splice(index, 1);

      // 如果删除的是当前图片
      if (currentImage.value?.id === id) {
        if (cropper) {
          cropper.destroy();
          cropper = null;
        }
        
        // 选择下一张或上一张
        if (images.value.length > 0) {
          const nextIndex = Math.min(index, images.value.length - 1);
          nextTick(() => selectImage(images.value[nextIndex]));
        } else {
          currentImage.value = null;
        }
      }
    };

    // 取消操作
    const handleCancel = () => {
      emit('on-cancel');
    };

    // 确定裁剪
    const handleConfirm = async () => {
      // 保存当前图片的裁剪信息
      if (currentImage.value && cropper) {
        saveCropData();
      }
      // 批量处理所有图片
      const croppedImages: any = [];
      const loading = ElLoading.service({ fullscreen: true, text: '图片裁剪中，请稍后...' });
      // eslint-disable-next-line
      for (const image of images.value) {
        try {
          /* eslint-disable no-await-in-loop */
          const croppedBlob: any = await cropImage(image);
          const url = await baseUrlToHttpUrl(croppedBlob);
          croppedImages.push({
            id: image.id,
            name: image.name,
            originalFile: image.file,
            croppedBlob,
            croppedUrl: url
          });
        } catch (error) {
          console.error('裁剪图片失败');
        }
      }
      loading.close();
      emit('on-confirm', croppedImages);
    };
    // 裁剪单张图片
    const cropImage = (imageData: any) => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx: any = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          const cropArea = imageData.cropArea || {
            x: 0,
            y: 0,
            width: img.width,
            height: img.height,
          };
          // 设置画布尺寸为目标裁剪尺寸
          canvas.width = props.aspectRatio.width;
          canvas.height = props.aspectRatio.height;
          // 计算裁剪区域的实际像素位置
          const scaleX = img.naturalWidth / img.width;
          const scaleY = img.naturalHeight / img.height;
          // 绘制裁剪后的图片
          ctx.drawImage(
            img,
            cropArea.x * scaleX,
            cropArea.y * scaleY,
            cropArea.width * scaleX,
            cropArea.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
          );
          const cropedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(cropedBase64);
        };
        img.onerror = reject;
        img.src = imageData.url;
      });
    };
    // 更新宽度
    const updateWidth = (event: any) => {
      if (props.allowAdjustRatio) {
        emit('update:aspectRatio', {
          ...props.aspectRatio,
          width: Number(event.target.value || 0)
        });
      }
    };

    // 更新高度
    const updateHeight = (event: any) => {
      if (props.allowAdjustRatio) {
        emit(
          'update:aspectRatio',
          {
            ...props.aspectRatio,
            height: Number(event.target.value || 0),
          }
        );
      }
    };

    onMounted(() => {
      loadPresetImages();
    });
    return {
      images,
      currentImage,
      cropperImage,
      fileInput,
      triggerFileInput,
      handleFileSelect,
      handleDrop,
      selectImage,
      removeImage,
      handleCancel,
      handleConfirm,
      updateWidth,
      updateHeight
    };
  }
};
</script>

<style scoped>
.batch-image-crop {
  display: flex;
  flex-direction: column;
  height: 70vh;
  background-color: #f0f2f5;
}
.crop-header {
  display: flex;
  align-items: center;
  padding: 5px 24px;
  /* background-color: #e8e8e8;
  border-bottom: 1px solid #d9d9d9; */
}
.header-label {
  font-size: 16px;
  font-weight: 600;
  margin-right: 24px;
  color: #333;
}
.size-inputs {
  display: flex;
  gap: 16px;
}
.size-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.size-input-group label {
  font-size: 14px;
  color: #666;
}
.size-input-group input {
  width: 100px;
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f5f5f5;
}
.size-input-group input:read-only {
  cursor: not-allowed;
  color: #999;
}
.crop-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  gap: 16px;
  padding: 5px 10px;
}
.crop-area {
  flex: 0 0 80%;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9;
  overflow: hidden;
}
.upload-prompt {
  text-align: center;
  padding: 40px;
}
.upload-icon {
  font-size: 64px;
  margin-bottom: 16px;
}
.upload-prompt p {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
}
.upload-btn {
  padding: 10px 24px;
  background-color: #1890ff;
  border: none;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}
.upload-btn:hover {
  background-color: #40a9ff;
  transform: scale(1.05);
}
.crop-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
}
.crop-container img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}
.image-list {
  flex: 0 0 calc(22% - 32px);
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #d9d9d9;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #d9d9d9;
  background-color: #fafafa;
}
.list-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.add-more-btn {
  padding: 4px 12px;
  background-color: #fff;
  border: 1px solid #1890ff;
  color: #1890ff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.add-more-btn:hover {
  background-color: #e6f7ff;
}
.list-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}
.image-item {
  position: relative;
  margin-bottom: 8px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  /* background-color: #fafafa; */
}
.image-item:hover {
  /* background-color: #f0f0f0; */
}
.image-item.active {
  border-color: #1890ff;
  /* background-color: #e6f7ff; */
}
.image-item img {
  width: 100%;
  height: 120px;
  border-radius: 4px;
  object-fit: contain;
}
.image-info {
  margin-top: 8px;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  flex-direction: column;
  gap: 4px;
  background: rgba(0, 0, 0, .5);
  justify-content: center;
}
.image-name {
  font-size: 12px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.image-size {
  display: flex;
  justify-content: center;
  height: 20px;
  align-items: center;
  font-size: 11px;
  color: #fff;
}
.delete-btn {
  display: flex;
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  border: none;
  color: #fff;
  border-radius: 50%;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s;
}
.delete-btn:hover {
  background-color: #f5222d;
  transform: scale(1.1);
}
.crop-footer {
  display: flex;
  justify-content: right;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #d9d9d9;
}
.btn {
  padding: 10px 32px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}
.btn-cancel {
  background-color: #fff;
  border: 1px solid #d9d9d9;
  color: #333;
}
.btn-cancel:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}
.btn-confirm {
  background-color: #1890ff;
  color: #fff;
}
.btn-confirm:hover {
  background-color: #40a9ff;
  transform: scale(1.05);
}
.list-scroll::-webkit-scrollbar {
  width: 6px;
}
.list-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.list-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}
.list-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.img-ico {
  object-fit: contain;
}
</style>
