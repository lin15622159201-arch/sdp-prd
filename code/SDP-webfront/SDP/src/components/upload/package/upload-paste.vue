<script lang="tsx">
import { defineComponent, inject, ref, watch, TransitionGroup } from 'vue';
import { Close } from '@element-plus/icons-vue';
import File from './file.vue';
import Image from './image.vue';
import { uploaderKey, ImageEl } from './type';
import { random } from 'lodash-es';
import { usePreview } from './composables/use-preview';
import { ElMessage } from 'element-plus';

interface IFileListItem {
  url: string;
  id: string;
  type?: string;
  name?: string;
  file: File;
}

export default defineComponent({
  name: 'UploadPaste',
  components: {
    Close,
    File,
    TransitionGroup,
  },

  setup() {
    const { setImageRef, handlePreview } = usePreview();
    /** TODO 富文本删除 */
    const uploaderRef = inject(uploaderKey)!;
    const visible = ref(false);
    const pasteAreaRef = ref(null as unknown as HTMLDivElement);
    const fileList = ref<IFileListItem[]>([]);

    const uploadFiles = () => {
      const _list = fileList.value.map(item => item.file);
      uploaderRef.uploadFiles(_list as unknown as FileList);
      visible.value = false;
    };

    const handleFile = (files: FileList | null) => {
      if (files?.length) {
        if (uploaderRef.modelValue.length + fileList.value.length >= uploaderRef.limit) {
          ElMessage.warning(`上传文件数量不能超过${uploaderRef.limit}个`);
          return;
        }
        fileList.value = fileList.value.concat(
          Array.from(files).map((file: File) => {
            const id = `${Date.now()}_${random(0, 9999)}`;
            return {
              url: URL.createObjectURL(file),
              file,
              type: file.type,
              name: file.name,
              id,
            };
          }),
        );

        if (uploaderRef.pasteAutoUpload) {
          uploadFiles();
        }
      }
    };

    watch(visible, (val) => {
      if (!val) {
        fileList.value = [];
        pasteAreaRef.value.innerHTML = '';
      }
    });

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const items = e.clipboardData?.items;
      const files = Array.from(items || []);
      if (Array.isArray(files)) {
        const _list = files
          .map((item) => {
            const imageFile = item.getAsFile();
            return imageFile;
          })
          .filter(Boolean);
        handleFile(_list as unknown as FileList);
      }
    };

    const handleAreaDrop = (e: DragEvent) => {
      e.preventDefault();
      const { files } = e.dataTransfer!;
      handleFile(files);
    };

    // const handleKeydown = (e: KeyboardEvent) => {
    //   const isDel = (e.key === 'Backspace' || e.key === 'Delete')
    //     || (e.keyCode === 46 || e.keyCode === 8);

    //   if (isDel) {
    //     const selection = window.getSelection();

    //     if (!selection) return;
    //     const rangeAt = selection.getRangeAt(0);
    //     const el = rangeAt.startContainer.parentElement;

    //     console.log(el!.classList);
    //   }
    // };
    const handleDelete = (i: number) => {
      fileList.value.splice(i, 1);
    };
    return {
      fileList,
      pasteAreaRef,
      visible,
      uploaderRef,
      uploadFiles,

      handleIputDrop(e: DragEvent) {
        const { files } = e.dataTransfer!;
        if (files?.length) {
          uploaderRef.uploadFiles(files);
        }

        e.preventDefault();
      },
      handlePaste,
      handleAreaDrop,
      // handleKeydown,
      handleDelete,
      setImageRef,
      handlePreview,
    };
  },
  render() {
    const upLoadWrapClassName = `upload-wrap__${this.uploaderRef.size}`;
    const isImage = (row: IFileListItem) => {
      return row.type && row.type.indexOf('image/') !== -1;
    };
    const renderImageList = () => {
      let index = -1;
      return this.fileList.map((v, i) => {
        if (isImage(v)) {
          index += 1;
          return (
            <Image
              key={v.id}
              src={v.url}
              initialIndex={index}
              preview-src-list={this.fileList.filter(info => isImage(info)).map(item => item.url)}
              onPreview={() => this.handlePreview(i)}
              onDelete={() => this.handleDelete(i)}
              onSetImageRef={(el: ImageEl) => this.setImageRef(el, i)}
            />
          );
        }
        return <div key={v.id} />;
      });
    };
    const renderFileList = () => {
      return this.fileList.map((item, i) => {
        if (!isImage(item)) {
          return (
            <File
              name={item.name}
              url={item.url}
              onDelete={() => this.handleDelete(i)}
              key={item.id}
            />
          );
        }
        return <div key={item.id} />;
      });
    };
    return (
      <div
        class={['upload-wrap', upLoadWrapClassName]}
        v-show={!this.uploaderRef.disabled && !this.uploaderRef.disabled}
        onClick={() => {
          this.visible = true;
        }}
      >
        粘贴或拖放
        <input
          type='file'
          ref='inputRef'
          class='upload-input'
          multiple={this.uploaderRef.multiple}
          name={this.uploaderRef.name}
          onDrop={this.handleIputDrop}
          onClick={(e) => {
            e.preventDefault();
          }}
        />
        <el-dialog
          close-on-click-modal={false}
          append-to-body
          v-model={this.visible}
          width='500px'
          title='文件上传'
          close-on-press-escape
          v-slots={{
            footer: () => {
              if (this.uploaderRef.pasteAutoUpload) {
                return null;
              }
              return (
                <div>
                  <el-button
                    onClick={() => {
                      this.visible = false;
                    }}
                  >
                    取 消
                  </el-button>

                  <el-button
                    type='primary'
                    onClick={this.uploadFiles}
                  >
                    确 定
                  </el-button>
                </div>
              );
            },
          }}
        >
          <div
            ref='pasteAreaRef'
            class='paste-area'
            contenteditable
            placeholder='请粘贴文件，或者把文件拖入输入框'
            onPaste={this.handlePaste}
            onDrop={this.handleAreaDrop}
          />

          <h3
            class='tw-mt-[15px] tw-mb-[10px]'
            v-show={this.fileList.length}
          >
            待上传文件(
            {this.fileList.length}
            ) :
          </h3>

          <div class='tw-flex tw-flex-wrap'>
            <transition-group name='slide'>{renderImageList()}</transition-group>
          </div>

          <div>
            <transition-group name='slide'>{renderFileList()}</transition-group>
          </div>
        </el-dialog>
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
@use './uploader' as *;
.upload-wrap {
  border: 1px dashed #c0ccda;
  background: #fbfdff;
  color: #606266;
  flex-shrink: 0;
  border-radius: 6px;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
  &__medium {
    width: $sizeMedium;
    height: $sizeMediumHeight;
    line-height: $sizeMediumHeight;
  }
  &__small {
    width: $sizeSmall;
    height: $sizeSmall;
    line-height: $sizeSmall;
  }
  &__mini {
    width: $sizeMini;
    height: $sizeMini;
    line-height: $sizeMini;
  }
}
.paste-area {
  width: 100%;
  height: auto;
  padding: 15px;
  border: 1px solid #ddd;
  min-height: 90px;
  overflow-y: auto;
  border-radius: 5px;
  box-sizing: border-box;
  &:empty::before {
    content: attr(placeholder);
    color: #bbb;
  }
  &:focus {
    content: none;
  }
}
.upload-input {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 0;
  opacity: 0;
  z-index: 9;
  cursor: pointer;
}
.flex {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}
</style>
