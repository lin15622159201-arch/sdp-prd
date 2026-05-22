<script lang="tsx">
import {
  defineComponent,
  computed,
  ref,
  nextTick,
  provide,
  reactive,
  toRefs,
  shallowRef
} from 'vue';
import { ElMessage, useFormItem } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

import { watchArray } from './hooks/watch-array';
import { useUploadH5 } from './hooks/use-upload-h5';
import promiseIterator from '@/core/utils/promise-iterator';
import FileList from './file-list.vue';
import UploadPaste from './upload-paste.vue';
import type {
  IFile,
  IFileData,
  IFakeFileData,
  TOnMove,
  TOnRemove,
  RenderFn,
  TOnPreview,
  TSetFileWrapperStyle,
} from './types';
import { uploaderKey } from './utils/token';
import logger from './utils/logger';
import useFileUploader from './hooks/use-file-uploader';
import { UploadStatus } from '@myna/file-uploader';
import type {
  PropType,
} from 'vue';
import type { UploadTask, SetFileDescription } from '@myna/file-uploader';
import { isEmpty, isExternal } from '@toy/utils';
import { hideFullScreenLoading, showFullScreenLoading } from '@/core/http/helper';
import { handleDropDirectories, isSupportDragUploadDir } from './hooks/drog-uplod-dir';

const isDev = process.env.NODE_ENV === 'development';

interface TipsItem {
  message: string;
  type?: 'success' | 'warning' | 'danger';
}

export default defineComponent({
  name: 'Uploader',
  components: {
    FileList,
    [Plus.name as string]: Plus,
  },
  props: {
    modelValue: {
      type: Array as PropType<(IFile | IFileData)[]>,
      default: () => ([]),
    },
    /**
     * 是否支持手机上传
     */
    uploadH5: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否可以查看大图
     */
    preview: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否可以移除
     */
    remove: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否显示粘贴上传
     */
    paste: {
      type: Boolean,
      default: true,
    },
    /**
     * 上传按钮的样式
     */
    uploaderStyle: {
      type: String as PropType<'button' | 'default'>,
      default: 'default',
    },
    /**
     * 是否粘贴、拖放到面板立即上传
     */
    pasteAutoUpload: {
      type: Boolean,
      default: false,
    },
    /**
     * 禁用编辑
     */
    disabled: {
      type: Boolean,
      default: () => null,
    },
    /**
     * 是否可以移动
     */
    move: {
      type: Boolean,
      default: true,
    },
    /**
     * 上传数量限制， 0为不限制
     */
    limit: {
      type: Number,
      default: 0,
    },
    /**
     * 是否支持多选文件
     */
    multiple: {
      type: Boolean,
      default: true,
    },
    /**
     * 样式大小
     */
    size: {
      type: String as PropType<'medium' | 'small' | 'mini' | 'tiny'>,
      validator: (val: string) => {
        return ['medium', 'small', 'mini', 'tiny'].includes(val);
      },
      default: 'small',
    },
    name: {
      type: String,
      default: 'file',
    },
    accept: {
      type: String,
      default: '',
    },
    beforeUpload: {
      type: Function,
      default: null,
    },
    // beforeUpload之后附加的校验
    appendUploadValidate: {
      type: Function as PropType<(file: File, fileDirMap?: Map<File, string>) => (Promise<boolean> | boolean)>,
      default: null,
    },
    /**
     * 文件超出个数限制时的钩子
     */
    onExceed: {
      type: Function,
      default: () => {
        ElMessage.warning('上传数量超过限制');
      },
    },
    onMove: {
      type: Function as PropType<TOnMove>,
      default: null,
    },
    onRemove: {
      type: Function as PropType<TOnRemove>,
      default: null,
    },
    onError: {
      type: Function,
      default: null,
    },
    onSuccess: {
      type: Function,
      default: null,
    },
    onPreview: {
      type: Function as PropType<TOnPreview>,
      default: null,
    },
    /**
     * 兼容旧方法，建议使用 accept
     */
    fileTypeLimit: {
      type: String,
    },
    sizeLimit: {
      type: [String, Number],
    },
    /**
     * 底部文案提示
     * tips: string | (string | TipsItem)[]
     *
     * interface TipsItem {
     *  message: string;
     *  type?: 'success' | 'warning' | 'danger';
     * }
     */
    tips: {
      type: [String, Array] as PropType<string | (string | TipsItem)[]>,
      default: '',
    },
    /**
     * 是否使用验证accept属性
     * 由于在部分系统、浏览器中是不会验证accept的正确性，用户还可以在选择时切换并使用全部文件类型
     */
    checkAccept: {
      type: Boolean,
      default: true,
    },
    /**
     * file-list的位置。
     * 只有 `prepend`、`after`。
     * 默认 prepend。
     */
    listPosition: {
      type: String,
      default: 'prepend',
      validator: (val: string) => {
        return ['prepend', 'after'].includes(val);
      },
    },
    /**
     * 结构，这里指的是上传框和文件列表，其中上传框和文件列表里面的排列方式不影响。
     * 上下（vertical），左右（horizontal）。
     * 默认左右。
     * 注：当listType为text时，只有上下（vertical）结构
     */
    structure: {
      type: String,
      default: '',
      validator: (val: string) => {
        return ['vertical', 'horizontal', ''].includes(val);
      },
    },
    /**
     * 文件列表的类型: picture-card text
     * 默认：picture-card
     */
    listType: {
      type: String,
      default: 'picture-card',
      validator: (val: string) => {
        return ['picture-card', 'text'].includes(val);
      },
    },
    /**
     * listType = 'text' 时列表有图片是否以 picture-card 形式显示
     * 默认 false
     */
    showListTypeImg: {
      type: Boolean,
      default: false,
    },
    /*
      排列方式
    */
    direction: {
      type: String as PropType<'row' | 'column'>,
      default: 'row',
    },
    /**
     * 是否使用组件的上传wrapper(就那个边框)
     * 默认为 true，不使用必须要有slot
     */
    useWrapper: {
      type: Boolean,
      default: true,
    },
    /**
     * 文件下载
     */
    download: {
      type: Boolean,
      default: false,
    },
    /**
     * 设置 fileDescription
     */
    setFileDescription: {
      type: Function as PropType<SetFileDescription>,
    },
    /**
     * 设置 file item 样式
     *
     * 使用场景针对特殊情况，如每项需要不同的特色样式
     */
    setFileWrapperStyle: {
      type: Function as PropType<TSetFileWrapperStyle>,
    },
    /**
     * 文件夹上传
     */
    isDirectory: {
      type: Boolean,
      default: false,
    },
    /**
     * 文件夹上传前触发校验
     */
    beforeDirDropUpload: {
      type: Function,
      default: null,
    },
  },
  emits: ['change', 'update:modelValue', 'delete'],
  setup(props, { emit }) {
    const { handleOpenUploadH5 } = useUploadH5(props, emit);
    const { form } = useFormItem();
    const isDisabled = computed(() => {
      if (!isEmpty(props.disabled)) return props.disabled;
      if (form && !isEmpty(form.disabled)) {
        return form.disabled;
      }
      return false;
    });
    const { fileUploader } = useFileUploader();
    let uploadTimes = 0;
    /**
     * 上传任务
     * 已上传完成会删除任务
     */
    const uploadTasksMap = shallowRef(new Map<string, UploadTask>());

    // const getFormFileData = (file: File) => {
    //   const formData = new FormData();
    //   formData.append('files', file, file.name);
    //   return formData;
    // };

    const triggerRef = computed({
      get() {
        return props.modelValue.map(it => it.url).join(',');
      },
      set() { /** * 不设置，用于触发验证 */ },
    });

    /**
     * 上传底部提示文案
     */
    const uploadTips = computed<TipsItem[]>(() => {
      const _list: (string | TipsItem)[] = Array.isArray(props.tips) ? props.tips : [props.tips];
      return _list.map((item) => {
        if (typeof item === 'string') {
          return {
            message: item,
          };
        }
        return item;
      });
    });

    const inputRef = ref<HTMLInputElement | null>(null);
    // 临时的列表
    const fakeList = ref<(IFakeFileData | null)[]>([]);
    // 是否需要显示临时列表
    const isShowFakeList = ref(false);
    // 用于显示文件的列表
    const showFilesList = computed(() => {
      return isShowFakeList.value
        ? props.modelValue.concat(fakeList.value.filter(Boolean) as IFakeFileData[])
        : props.modelValue;
    });

    // 自动适配 listPosition
    const selfListPosition = computed(() => {
      if (props.listPosition) {
        return props.listPosition;
      }

      if (props.listType === 'text') {
        return 'prepend';
      }
      return 'prepend';
    });

    const selfStructure = computed(() => {
      if (props.structure) {
        return props.structure;
      }

      if (props.listType === 'text') {
        return 'vertical';
      }
      return 'horizontal';
    });
    /**
     * 检测是否可以多选
     */
    const isMultiple = computed(() => {
      const { multiple, limit, modelValue } = props;
      if (multiple && limit) {
        // 当前数量大于限制两张才可以
        return limit - modelValue.length >= 2;
      }
      return multiple;
    });

    // 获取上传任务
    const getUploadTasks = () => {
      return Array.from(uploadTasksMap.value);
    };
    /**
     * 取消上传
     */
    const cancelUploadTask = () => {
      getUploadTasks()
        .forEach(([key, task]) => {
          task.pause();
          uploadTasksMap.value.delete(key);
        });
      fakeList.value = [];
      isShowFakeList.value = false;
    };

    /**
     * 上传
     */
    async function uploadFiles(files: FileList, fileDirMap?: Map<File, string>) {
      const {
        limit,
        modelValue: fileList,
        onExceed,
        beforeUpload,
        onError,
        onSuccess,
        setFileDescription,
        appendUploadValidate,
      } = props;

      const uploadingList = getUploadTasks()
        .map(([, task]) => {
          if (task.getStatus() === UploadStatus.uploading) {
            return task;
          }
          return null;
        })
        .filter((t): t is UploadTask => Boolean(t));

      if (limit && fileList.length + files.length + uploadingList.length > limit) {
        if (isDev) {
          logger.warn('上传数量超过限制');
        }
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
      uploadTimes += 1;
      try {
        let validFileList = await promiseIterator(postFileList, async (file) => {
          let beforeUploadRes = true;
          // 有上传前验证
          if (beforeUpload) {
            try {
              beforeUploadRes = await beforeUpload(file);
            } catch (e) {
              beforeUploadRes = false;
            }
          } else {
            // 兼容旧用法
            // 旧上传组件验证方式
            const filename = file.name;
            const fileTypeLimit = props.fileTypeLimit ? (props.fileTypeLimit.toLowerCase()).split('|') : [];
            const fileType = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();

            let isFileTye = true;
            // 校验文件 类型是否满足要起
            if (fileTypeLimit.length) {
              logger.warn('建议使用accept限制上传文件类型');
              isFileTye = fileTypeLimit.includes(fileType);
            }
            let isSizeLimit = true;
            if (props.sizeLimit) {
              isSizeLimit = file.size / 1024 / 1024 < parseFloat(`${props.sizeLimit}`);
            }

            if (!isFileTye) {
              ElMessage.warning(`请上传指定格式(${fileTypeLimit.join(',')})的文件`);
            } else if (!isSizeLimit) {
              ElMessage.warning(`上传文件大小不能超过 ${parseFloat(`${props.sizeLimit}`)}MB!`);
            }
            // 检测accept匹配，不通过静默不上传
            // 取消主动验证
            const passAccept = props.accept && props.checkAccept
              ? props.accept.split(',').some((match) => {
                const _match = match.trim();
                if (_match === '*') {
                  return true;
                }
                const _matchList = _match.split('/');
                // 文件类型
                const _fileType = _matchList[_matchList.length - 1];
                // 最后是*
                const isAll = _fileType === '*';

                if (isAll) {
                  const flag = _matchList[0] === file.type.split('/')[0];

                  return flag;
                }
                // 直接使用文件格式
                if (_fileType.startsWith('.')) {
                  let isPass = false;
                  const handleCheckedExtname = () => {
                    const __fileNameInfos = file.name?.split('.');
                    // 获取文件名称后缀
                    const nameType = __fileNameInfos[__fileNameInfos.length - 1] ?? '';
                    if (nameType) {
                      const flag = _fileType.slice(1).toLocaleLowerCase() === nameType.toLocaleLowerCase();
                      if (!flag) {
                        logger.warn(`accept验证失败：限制类型 - ${_fileType.slice(1)}; 文件类型 - ${nameType}`);
                      }
                      return flag;
                    }
                    return isPass;
                  };

                  if (file.type) {
                    const typeIndex = file.type.indexOf('/');
                    const thisFileType = typeIndex > -1
                      ? file.type.slice(typeIndex + 1)
                      : file.type;

                    isPass = _fileType.slice(1).toLocaleLowerCase() === thisFileType.toLocaleLowerCase();
                  } else {
                    // 没有 文件类型信息 直接检查文件后缀
                    return handleCheckedExtname();
                  }

                  if (!isPass) {
                    // 文件类型检测不通过 检测文件后缀
                    return handleCheckedExtname();
                  }

                  return isPass;
                }

                const flag = _match === file.type;

                if (!flag) {
                  logger.warn(`accept验证失败：限制类型 - ${_match}; 文件类型 - ${file.type}`);
                }
                return flag;
              })
              : true;

            // if (!passAccept) {
            //   ElMessage.warning(`请上传指定格式(${props.accept})的文件`);
            // }

            beforeUploadRes = isSizeLimit && isFileTye && passAccept;
          }
          if (beforeUploadRes && appendUploadValidate) {
            beforeUploadRes = await appendUploadValidate(file, fileDirMap);
          }
          if (beforeUploadRes) {
            // 有上传，可以显示临时数据
            isShowFakeList.value = true;
            const id = Math.floor(performance.now() * Math.random() * Math.random() * 10000000);
            fakeList.value.push({
              loading: true,
              name: file.name,
              size: `${file.size}`,
              type: file.type,
              // 表示这个占位的图
              fake: true,
              url: URL.createObjectURL(file),
              progress: '0',
              id,
              dir: fileDirMap?.get(file) ?? '',
            });

            return {
              file,
              id,
            };
          }
          return null;
        }) as { file: File; id: number; }[];
        validFileList = validFileList.filter(Boolean);

        if (!validFileList.length) {
          return;
        }

        isShowFakeList.value = true;
        const failIndexArr:number[] = [];
        showFullScreenLoading();
        // 使用 fileUploader.upload 任务管理，而非直接迭代上传
        const uploadTask = fileUploader.upload(validFileList.map(i => i.file), {
          setFileDescription(_file, _index) {
            if (typeof setFileDescription === 'function') {
              // 上传的fileDescription参数，正常情况下不建议使用
              return setFileDescription(_file, _index);
            }
            return undefined;
          },
          onProgress(progressData) {
            const { id } = validFileList[progressData.fileIndex];
            const listItem = fakeList.value.find(_i => _i?.id === id);

            if (listItem) {
              listItem!.progress = progressData.progress;
            }
          },
          onSuccess(res) {
            const { fileIndex } = res;
            const { id, file } = validFileList[fileIndex];
            const index = fakeList.value.findIndex(_i => _i?.id === id);
            const listItem = fakeList.value[index];

            if (listItem) {
              listItem!.progress = '100';
              listItem!.loading = false;
              const _fileRes = {
                name: res.fileName,
                url: res.url,
                size: validFileList[fileIndex].file.size,
                type: validFileList[fileIndex].file.type,
                id: listItem.id,
                file,
                dir: listItem.dir,
              };
              onSuccess?.(_fileRes, files, postFileList);
              // 将内存图换真实图
              fakeList.value.splice(index, 1, _fileRes);
            }
          },
          onFail(error, data) {
            failIndexArr.push(data.fileIndex);
            ElMessage.error(error.message);
          },
        });

        const key = `${uploadTimes}`;
        // 储存上传任务
        uploadTasksMap.value.set(key, uploadTask);

        await uploadTask
          .finally(() => {
            // 当任务成功就删除
            uploadTasksMap.value.delete(key);
            const data: IFileData[] = [];
            if (validFileList.length) {
              validFileList.forEach((v, i) => {
                const index = fakeList.value.findIndex(it => it?.id === v.id);
                if (!failIndexArr.includes(i)) {
                  const row = fakeList.value[index];
                  if (row) {
                    data.push(row);
                  }
                }
                fakeList.value.splice(index, 1);
              });
            }
            const returnData = props.modelValue.concat(data);
            emit('update:modelValue', returnData);
            emit('change', returnData);
            hideFullScreenLoading();
          });
      } catch (e) {
        logger.error(e);
        onError?.(e, files, postFileList);
      } finally {
        nextTick(() => {
          const hasUploading = getUploadTasks()
            .map(([, task]) => task.getStatus())
            .includes(UploadStatus.uploading);

          if (!hasUploading) {
            isShowFakeList.value = false;
            fakeList.value = [];
          }
        });
      }
    }

    /**
     * 处理文件选择
     */
    const handleFilePick = (files?: FileList | null, fileDirMap?: Map<File, string>) => {
      if (files?.length) {
        uploadFiles(files, fileDirMap);
      }

      nextTick(() => {
        const _inputRef = inputRef.value!;
        _inputRef.value = '';
      });
    };

    /**
     * 处理change事件
     * @description 文件夹上传不走这里
     */
    const handleInputChange = (e: Event) => {
      if (props.isDirectory) return;
      const { files } = e.target as HTMLInputElement;
      handleFilePick(files);
    };

    const uploaderRef = reactive({
      emit,
      inputRef,
      ...toRefs(props),
      disabled: isDisabled,
      uploadFiles,
    });

    provide(uploaderKey, uploaderRef);

    /**
     * 释放url对象
     */
    if (typeof URL.revokeObjectURL === 'function') {
      watchArray(fakeList, (_newList, _oldList, _added, removed) => {
        removed?.forEach((item) => {
          if (item && item.fake && item.url) {
            URL.revokeObjectURL(item.url);
          }
        });
      }, { deep: true });
    }

    // 粘贴文件链接
    const handlePasteLink = async (link: string) => {
      const blob: Blob = await fetch(link).then(res => res.blob());
      const filename = link.split('/').pop() || 'image.jpeg';
      const type = filename.split('.').pop() || 'jpeg';
      const file: File = new File([blob], filename, { type: `image/${type}` });
      await uploadFiles([file] as unknown as FileList);
    };

    // 粘贴文件
    const handlePasteFiles = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      const files = Array.from(items || []);
      if (Array.isArray(files)) {
        const _list = files.map((item) => {
          const imageFile = item.getAsFile();
          return imageFile;
        }).filter(Boolean);
        await uploadFiles(_list as unknown as FileList);
      }
    };

    let isUploading = false;
    // 点击粘贴
    const handlePaste = async (e: ClipboardEvent) => {
      if (!props.paste) return;
      // 防止重复上传
      if (isUploading) return;
      e.preventDefault();
      isUploading = true;
      try {
        const link = e.clipboardData?.getData('text/plain');
        if (link && isExternal(link)) {
          // 粘贴链接
          await handlePasteLink(link);
        } else {
          // 粘贴文件
          await handlePasteFiles(e);
        }
      } finally {
        isUploading = false;
      }
    };

    return {
      handleOpenUploadH5,
      isDisabled,
      inputRef,

      isMultiple,

      selfListPosition,

      selfStructure,

      showFilesList,

      handleInputChange,
      uploadFiles,
      handlePaste,

      handleInputDrop(e: DragEvent) {
        if (props.isDirectory && isSupportDragUploadDir()) {
          try {
            handleDropDirectories(e, handleFilePick, props.beforeDirDropUpload, props.accept);
          } catch (error) {
            console.error('uploaderr==', error);
            props.onError?.(e);
          }
        } else {
          const { files } = e.dataTransfer!;
          handleFilePick(files);
        }

        e.preventDefault();
      },

      uploadTips,

      triggerRef,

      getUploadTasks,

      cancelUploadTask,
    };
  },
  render() {
    const upLoadWrapClassName = `upload-wrap__${this.size}`;

    const hasTipRender = () => {
      return !!this.$slots.default;
    };

    const tipRender = () => {
      if (hasTipRender()) {
        return (
          <div class='tip-wrapper'>
            {
              this.$slots.default?.()
            }
          </div>
        );
      }
      return (
        <el-icon color='#8c939d' size={28}>
          <plus />
        </el-icon>
      );
    };

    const fileListRender = (_render: RenderFn) => {
      const style = {} as Record<string, string>;

      if (this.selfStructure === 'vertical') {
        style.overflow = 'hidden';
      }

      const slotsListRender = () => {
        /**
         * 说明：
         * selfListPosition 是指 file-list（图片列表）的位置
         * 如果 prepend 则在上传框后面，file-list（图片列表）在前面
         */
        return (
          <>
            {
              this.selfListPosition === 'after'
                ? _render()
                : null
            }
            {
              this.$slots?.list?.(this.showFilesList)
            }
            {
              this.selfListPosition === 'prepend'
                ? _render()
                : null
            }
          </>
        );
      };

      return (
        this.$slots.list
          ? slotsListRender()
          : (
            <file-list
              list={this.showFilesList}
              list-type={this.$props.listType}
              show-list-type-img={this.$props.showListTypeImg}
              style={style}
              v-slots={{
                [this.selfListPosition]: _render,
                'list-item': this.$slots?.['list-item'] || this.$slots?.listItem,
                'btn-block': this.$slots?.['btn-block'],
              }}
              setFileWrapperStyle={this.$props.setFileWrapperStyle}
            />
          )
      );
    };

    const uploaderRender = () => {
      const isButtonStyle = this.uploaderStyle === 'button';
      const inputNode = (
        <input
          type='file'
          ref='inputRef'
          class='upload-input'
          style={isButtonStyle ? { pointerEvents: 'none' } : {}}
          title=''
          onDrop={this.handleInputDrop}
          onChange={this.handleInputChange}
          multiple={this.isMultiple}
          name={this.name}
          accept={this.accept}
          disabled={this.isDisabled}
          {...({ webkitdirectory: this.isDirectory })}
        />
      );

      if (isButtonStyle) {
        // 只有一个上传输入框，并且是按钮样式，支持拖拽和粘贴
        return (
          <div
            class='tw-h-full tw-flex tw-items-center tw-justify-center'
            onPaste={this.handlePaste}
            onDragover={e => e.preventDefault()}
            onDrop={this.handleInputDrop}
            onClick={() => this.inputRef?.focus()}
          >
            {inputNode}
            <div>
              <p class='tw-mb-2'>
                {this.paste ? '粘贴、' : ''}
                拖放或
              </p>
              <el-button type='primary' disabled={this.isDisabled} onClick={() => this.inputRef?.click()}>点击上传</el-button>
            </div>
          </div>
        );
      }
      return (
        <>
          {inputNode}
          {/* 加号或默认插槽自定义样式 */}
          { tipRender() }
        </>
      );
    };

    const uploadWrapperRender = () => {
      const isEdit = !this.disabled && this.$props.limit > 0 && this.showFilesList.length < this.$props.limit;
      return [
        <div
          v-show={isEdit}
          class={['uploaders']}
        >
          <div
            class={
              ['upload-wrap', upLoadWrapClassName, 'handle-wrap']
            }
            v-show={!this.isDisabled}
          >
            { uploaderRender() }
          </div>
          {
            this.paste && this.uploaderStyle !== 'button'
              ? <UploadPaste class='handle-wrap' />
              : null
          }
        </div>,
      ];
    };

    const uploaderTipsWrapperRender = () => {
      /**
       * 判断是否使用自定义容器
       */
      return (
        !this.$props.useWrapper && hasTipRender()
          ? (
            <div class='auto-wrapper'>
              { uploaderRender() }
            </div>
          )
          : uploadWrapperRender()
      );
    };

    return (
      <div style='width:100%'>
        {this.uploadH5 && (
          <el-button
            class='tw-ml-5px'
            onClick={this.handleOpenUploadH5}
          >
            手机直传
          </el-button>
        )}
        <div class={['wrapper', this.direction]}>
          {
            /**
             * 用于触发 el-form 的表单验证(不显示)
             */
          }
          <el-input v-show={false} v-model={this.triggerRef} class='upload-trigger' />
          {
            fileListRender(uploaderTipsWrapperRender)
          }
          {
            this.$slots.under?.()
          }
        </div>
        {
          this.$slots.tips
            ? this.$slots.tips()
            : this.uploadTips.filter(Boolean).map((_tips, i) => {
              return (
                <div
                  key={i}
                  class={['upload-tips', _tips.type]}
                >
                  { _tips.message}
                </div>
              );
            })
        }
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
@use './uploader' as *;

// .handle-wrap + .handle-wrap {
//   margin-left: 10px;
// }
.wrapper {
  overflow: hidden;
}
:deep(.column){
  .file-list .file-item{
    float: none;
  }
  .uploaders{
    display: inline-block;
  }
  .file-item__mask{
    flex-direction: column;
  }
}
.auto-wrapper {
  display: inline-block;
  position: relative;
  width: 100%;
}
.uploaders {
  display: inline-flex;
  overflow: hidden;
  vertical-align: middle;
  &.float-left {
    float: left;
  }
}
.upload-tips {
  color: #909399;
  font-size: 12px;
  line-height: 1.5em;
  padding-top: 5px;
  &.success {
    color: #2DC873;
  }
  &.warning {
    color: #FF8300;
  }
  &.danger {
    color: #F55656;
  }
}
.tip-wrapper {
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
}
.upload-wrap {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 5px;
  border: 1px dashed #c0ccda;
  word-wrap: break-word;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #fbfdff;
  border-radius: 6px;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
  color: #606266;
  &:hover {
    border: 1px dashed #605CE5;
  }
  &__medium {
    width: $sizeMedium;
    height: $sizeMediumHeight;
  }
  &__small {
    width: $sizeSmall;
    height: $sizeSmall;
  }
  &__mini {
    width: $sizeMini;
    height: $sizeMini;
  }
  &__tiny {
    width: $tiny;
    height: $tiny;
  }
}
.wrapper:deep(ul) {
  padding: 0;
  margin: 0;
  li {
    list-style: none;
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
.upload-trigger {
  opacity: 0;
  position: absolute;
  left: -100%;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
<style lang="scss">
.el-form-item.is-error .upload-wrap {
  border-color: var(--el-color-error);
}
</style>
