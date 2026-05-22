<script lang="tsx">
import { defineComponent, computed, ref, nextTick, reactive, provide, toRefs, TransitionGroup, Transition } from 'vue';
import { ElMessage, useFormItem } from 'element-plus';

import promiseIterator from '@/core/utils/promise-iterator';
import { uploadFile } from '@/api/open';
import { IFile, ImageEl, uploaderKey, baseProps } from './type';
import IconUpload from '@/assets/icon_upload.png';
import UploadPaste from './upload-paste.vue';
import { Plus } from '@element-plus/icons-vue';
import { random } from 'lodash-es';
import { usePreview } from './composables/use-preview';
import { useCompress } from './composables/use-compress';
import Image from './image.vue';
import File from './file.vue';
import { hideFullScreenLoading, showFullScreenLoading } from '@/core/http/helper';

export default defineComponent({
  name: 'Upload',
  components: {
    FileList,
    Plus,
    UploadPaste,
    TransitionGroup,
    Transition,
    File,
  },

  emits: ['change', 'update:modelValue', 'delete', 'upload'],
  props: baseProps,
  setup(props, { emit }) {
    const { handleCompress } = useCompress(props);
    const { setImageRef, handlePreview } = usePreview();
    const { formItem } = useFormItem();
    const getFormFileData = (file: File) => {
      const formData = new FormData();
      formData.append('files', file, file.name);
      return formData;
    };
    const inputRef = ref<HTMLInputElement | null>(null);
    // 临时的列表
    const fakeList = ref<IFile[]>([]);
    // 用于显示文件的列表
    const showFilesList = computed(() => {
      const { modelValue = [] } = props;
      return [
        ...modelValue.map(v => ({
          ...v,
          id: v.id || v.url,
        })),

        ...fakeList.value,
      ];
    });
    /**
     * 检测是否可以多选
     */
    const isMultiple = computed(() => {
      const { multiple, limit, modelValue } = props;
      if (multiple) {
        // 当前数量大于限制两张才可以
        return limit - modelValue.length >= 2;
      }
      return multiple;
    });
    // 上传文件前校验
    const sizeResult = ref<boolean[]>([]);
    const typeResult = ref<boolean[]>([]);
    const beforeUpload = (file: File) => {
      if (file.size / 1024 / 1024 > props.sizeLimit) {
        sizeResult.value.push(true);
        return false;
      }
      const { accept } = props;
      const types = accept.split(',').map(v => v.trim());
      if (
        types.includes('*') === false
        && types.includes(file.type) === false
        && types.some(v => file.name.indexOf(v) !== -1) === false
      ) {
        typeResult.value.push(true);
        return false;
      }
      return true;
    };
    /**
     * 上传
     */
    async function uploadFiles(files: FileList) {
      sizeResult.value = [];
      typeResult.value = [];
      const { limit, modelValue: fileList, onExceed } = props;
      if (fileList.length + files.length > limit) {
        onExceed(files, fileList);
        return;
      }
      let postFileList = Array.from(files);
      if (!postFileList.length) {
        return;
      }
      if (!isMultiple.value) {
        postFileList = postFileList.slice(0, 1);
      }
      try {
        showFullScreenLoading();
        const res = await promiseIterator(postFileList, async (file) => {
          // 是否压缩（只能是图片压缩）
          try {
            const _file = await handleCompress(file);
            let beforeUploadRes = true;
            beforeUploadRes = await beforeUpload(_file);
            if (beforeUploadRes) {
              // 当前的下标
              const index = fakeList.value.length;
              const id = `${Date.now()}_${random(0, 9999)}`;
              fakeList.value.push({
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(_file),
                id,
              });
              const { data } = await uploadFile(getFormFileData(_file), true, (e) => {
                const { loaded, total } = e;
                fakeList.value[index] = {
                  ...fakeList.value[index],
                  progress: Math.round((loaded / total!) * 100),
                };
              });

              const _fileRes = Object.assign(
                {
                  type: file.type,
                },
                data[0],
              );
              // 替换当前临时数据
              fakeList.value[index] = {
                ...fakeList.value[index],
                ..._fileRes,
              };

              // fakeList.value.splice(index, 1, _fileRes);
              return {
                ..._fileRes,
                id,
              };
            }
          } catch (error) {
            console.log('上传文件出错', error);
          }
          return null;
        });
        hideFullScreenLoading();
        // 避免promise.all多次触发ElMessage
        if (sizeResult.value.includes(true)) {
          ElMessage.warning(`上传图片大小不能超过 ${parseFloat(`${props.sizeLimit}`)}MB!`);
        }
        if (typeResult.value.includes(true)) {
          ElMessage.warning('文件格式有误');
        }
        const _fileDataList = res.filter(Boolean) as IFile[];
        if (_fileDataList.length === 0) return;
        const returnData = [...fileList, ..._fileDataList];
        emit('update:modelValue', returnData);
        fakeList.value = [];
        emit('upload', _fileDataList);
        emit('change', returnData);
        // 解决Value变更不会出发Form校验
        formItem?.validate('change');
      } catch (e) {
        console.log('上传文件失败', e);
      } finally {
        fakeList.value = [];
      }
    }
    /**
     * 处理文件选择
     */
    const handleFilePick = (files?: FileList | null) => {
      if (files?.length) {
        uploadFiles(files);
      }
      nextTick(() => {
        const _inputRef = inputRef.value!;
        _inputRef.value = '';
      });
    };
    /**
     * 处理change事件
     */
    const handleInputChange = (e: Event) => {
      const { files } = e.target as HTMLInputElement;
      handleFilePick(files);
    };
    const handleDelete = (index: number, e?: Event) => {
      e?.stopPropagation();
      const list = [...props.modelValue];
      const row = list.splice(index, 1);
      emit('update:modelValue', list);
      emit('delete', row, index);
      emit('change', list);
      // 解决Value变更不会出发Form校验
      formItem?.validate('change');
    };
    const handleDownload = (row: IFile) => {
      if (row.url) {
        const req = new XMLHttpRequest();
        req.open('GET', row.url, true);
        req.responseType = 'blob';
        req.onload = () => {
          const url = window.URL.createObjectURL(req.response);
          const a = document.createElement('a');
          a.href = url;
          a.download = row.name || row.url;
          a.click();
        };
        req.send();
      }
    };
    const handleInputDrop = (e: DragEvent) => {
      const { files } = e.dataTransfer!;
      handleFilePick(files);
      e.preventDefault();
    };
    const uploaderRef = reactive({
      emit,
      inputRef,
      ...toRefs(props),
      uploadFiles,
    });

    provide(uploaderKey, uploaderRef);
    const canUpload = computed(() => {
      const { disabled, limit } = props;
      return disabled === false && showFilesList.value.length < limit;
    });
    // 判断文件后缀是否是图片
    const suffixIsImage = (row: IFile) => {
      // if (row.type) {
      //   return row.type.indexOf('image') !== -1;
      // }
      const suffix = row.url.split('.').pop()!.toLowerCase();
      return ['jpeg', 'jpg', 'png', 'gif', 'webp'].includes(suffix);
    };
    return {
      suffixIsImage,
      canUpload,
      handleDownload,
      handlePreview,
      setImageRef,
      inputRef,
      isMultiple,
      showFilesList,
      handleInputChange,
      handleDelete,
      uploadFiles,
      handleInputDrop,
    };
  },
  render() {
    const FileInputEl = (
      <input
        type='file'
        ref='inputRef'
        class='input'
        onDrop={this.handleInputDrop}
        onChange={this.handleInputChange}
        multiple={this.isMultiple}
        name={this.name}
      />
    );

    const renderImageList = () => {
      let index = -1;
      return this.showFilesList.map((v, i) => {
        if (this.suffixIsImage(v)) {
          index += 1;
          return (
            <Image
              key={v.id}
              progress={v.progress}
              src={v.url}
              initialIndex={index}
              disabled={this.disabled}
              preview-src-list={this.showFilesList.filter(info => this.suffixIsImage(info)).map(item => item.url)}
              onPreview={() => this.handlePreview(i)}
              onDelete={() => this.handleDelete(i)}
              onSetImageRef={(el: ImageEl) => this.setImageRef(el, i)}
            />
          );
        }
        return <div key={v.id} />;
      });
    };
    return (
      <div class='upload-container'>
        {this.type === 'fileList' && (
          <>
            {!this.disabled && (
              <>
                <el-button
                  class='upload'
                  disabled={this.showFilesList.length >= this.limit}
                >
                  <div class='upload_button'>
                    <img
                      src={IconUpload}
                      alt=''
                      class='icon'
                    />

                    <div>上传文件</div>
                  </div>

                  {this.showFilesList.length < this.limit && FileInputEl}
                </el-button>
                <div class='tw-mt-[10px]'>
                  {this.paste && <UploadPaste />}
                </div>
              </>
            )}

            {this.tip && !this.disabled ? <div class='tip'>{this.tip}</div> : null}

            <div class='tw-flex tw-flex-wrap'>
              <transition-group name='slide'>{renderImageList()}</transition-group>
            </div>

            <div>
              <transition-group name='slide'>
                {this.showFilesList.map((v, i) => (!this.suffixIsImage(v) ? (
                  <File
                    name={v.name}
                    url={v.url}
                    disabled={this.disabled}
                    onDelete={() => this.handleDelete(i)}
                    key={v.id}
                    canDownload={this.canDownload}
                  />
                ) : (
                  <div key={v.id} />
                )))}
              </transition-group>
            </div>

            {this.showFilesList.length === 0 && this.disabled && <div class='error'>暂无数据</div>}
          </>
        )}

        {this.type === 'imageList' && (
          <>
            <div class='tw-flex tw-flex-wrap'>
              <transition-group name='slide'>{renderImageList()}</transition-group>

              {this.disabled && this.showFilesList.length === 0 && (
                <div class='image_item'>
                  <el-image
                    class='cover'
                    fit='cover'
                    src=''
                    v-slots={{
                      error: () => (
                        <div class='error'>
                          <div>暂无图片</div>
                        </div>
                      ),
                    }}
                  />
                </div>
              )}

              {this.canUpload && (
                <>
                  <div class='image_item upload'>
                    <el-icon class='icon'>
                      <plus />
                    </el-icon>

                    {FileInputEl}
                  </div>

                  {this.paste && <UploadPaste />}
                </>
              )}
            </div>

            {this.tip && !this.disabled ? <div class='tip'>{this.tip}</div> : null}
          </>
        )}
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.upload-container {
  text-align: left;
  .upload {
    position: relative;
    .upload_button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(0, 0, 0, 0.65) !important;
      .icon {
        width: 14px;
        height: 14px;
        margin-right: 4px;
      }
    }
  }
  .error {
    font-size: 12px;
    color: #666;
  }
  .input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .image_item {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 5px;
    margin-bottom: 5px;
    .cover {
      width: 100%;
      height: 100%;
    }
    .error {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #c0c4cc;
      background-color: #f5f7fa;
    }
    &.upload {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border: 1px dashed #999;
      transition: all 0.3s;
      .icon {
        font-size: 24px;
        color: #999;
        transition: all 0.3s;
      }
      &:hover {
        border-color: var(--el-color-primary);
        .icon {
          color: var(--el-color-primary);
        }
      }
    }
  }
  .tip {
    padding: 4px 0 10px;
    color: #b4b4b4;
    font-size: 12px;
    line-height: 17px;
    text-align: left;
    // padding-top: 10px;
  }
}
</style>
