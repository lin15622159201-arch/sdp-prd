<script lang="tsx">
import { defineComponent, inject, ref, watch } from 'vue';
import { Close } from '@element-plus/icons-vue';
import { uploaderKey } from './utils/token';
import type { IScope } from '@/components/image-viewer';
import ImageViewer from '@/components/image-viewer';

export default defineComponent({
  name: 'UploadPaste',
  components: {
    ImageViewer,
    [Close.name as string]: Close,
  },
  setup() {
    /** TODO 富文本删除 */
    const uploaderRef = inject(uploaderKey)!;
    const visible = ref(false);
    const pasteAreaRef = ref(null as unknown as HTMLDivElement);
    const fileList = ref<{ url: string; type?: string; name?: string; file: File; }[]>([]);

    const uploadFiles = () => {
      const _list = fileList.value.map(item => item.file);
      uploaderRef.uploadFiles(_list as unknown as FileList);
      visible.value = false;
    };

    const handleFile = (files: FileList | null) => {
      if (files?.length) {
        fileList.value = fileList.value.concat(
          Array.from(files).map((file: File) => {
            return {
              url: URL.createObjectURL(file),
              file,
              type: file.type,
              name: file.name,
            };
          }),
        );

        if (uploaderRef.pasteAutoUpload) {
          uploadFiles();
        }
      }
    };

    watch(
      visible,
      (val) => {
        if (!val) {
          fileList.value = [];
          pasteAreaRef.value.innerHTML = '';
        }
      },
    );

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const items = e.clipboardData?.items;
      const files = Array.from(items || []);

      if (Array.isArray(files)) {
        const _list = files.map((item) => {
          const imageFile = item.getAsFile();
          return imageFile;
        }).filter(Boolean);
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
      delFile(i: number) {
        fileList.value.splice(i, 1);
      },
    };
  },
  render() {
    const upLoadWrapClassName = `upload-wrap__${this.uploaderRef.size}`;

    return (
      <div
        class={
          ['upload-wrap', upLoadWrapClassName]
        }
        v-show={!this.uploaderRef.disabled}
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
          onClick={(e: any) => { e.preventDefault(); }}
        />

        <el-dialog
          close-on-click-modal={false}
          append-to-body
          v-model={this.visible}
          width='500px'
          title='文件上传'
          v-slots={{
            footer: () => {
              if (this.uploaderRef.pasteAutoUpload) {
                return null;
              }

              return (
                <div>
                  <el-button onClick={() => {
                    this.visible = false;
                  }}
                  >
                    取 消
                  </el-button>
                  <el-button type='primary' onClick={this.uploadFiles}>确 定</el-button>
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
          <h3 class='margin-top-15 margin-bottom-10' v-show={this.fileList.length}>
            待上传文件(
            {this.fileList.length}
            ) :
          </h3>
          {
            this.fileList.map((item, i) => {
              const treatAsImage = !item.type || item.type.indexOf('image/') === 0;

              return (
                <div
                  class={['file-list']}
                >
                  {
                    treatAsImage
                      ? (
                        <div class='file-list__image'>
                          <el-icon
                            onClick={() => this.delFile(i)}
                            class='del-file__btn'
                            color='#fff'
                          >
                            <close />
                          </el-icon>
                          <image-viewer
                            list={item.url}
                            v-slots={{
                              default({ view }: IScope) {
                                return (
                                  <el-image
                                    class='file-item__image img-thumbnail'
                                    fit='cover'
                                    src={item.url}
                                    onClick={() => view()}
                                  />
                                );
                              },
                            }}
                          />
                        </div>
                      )
                      : (
                        <el-tag
                          closable
                          onClose={() => this.delFile(i)}
                        >
                          { item.name || item.url}
                        </el-tag>
                      )
                  }
                </div>
              );
            })
          }
        </el-dialog>
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
@use './uploader' as *;
.upload-wrap {
  flex-shrink: 0;
  border: 1px dashed #c0ccda;
  background: #fbfdff;
  border-radius: 6px;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
  color: #606266;
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
  min-height: 60px;
  overflow-y: auto;
  border-radius: 5px;
  &:empty::before {
    content: attr(placeholder);
    color:#bbb;
  }
  &:focus {
    content:none;
  }
}
.upload-input {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 0;
  opacity: 0;
  z-index: 9;
  cursor: pointer;
}
.file-list {
  line-height: 1.5em;
  padding: 5px 0;
  &__image {
    position: relative;
    width: 200px;
    :deep(.el-image) {
      width: 100%;
    }
  }
  .del-file__btn {
    $width: 20px;

    display: flex;
    position: absolute;
    top: math.div($width, -2);
    right: math.div($width, -2);
    width: $width;
    height: $width;
    border-radius: math.div($width, 2);
    text-align: center;
    background: #e53e32;
    color: #fff;
    z-index: 9;
    cursor: pointer;
    justify-content: center;
    align-items: center;
  }
}
</style>
